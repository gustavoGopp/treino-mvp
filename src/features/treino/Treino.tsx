import { useEffect, useLayoutEffect, useMemo, useRef, useState, useId } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { POR_ID } from '../../domain/biblioteca';
import { ALTERNATIVAS_A_MOSTRA, type ExercicioPrescrito } from '../../domain/gerador';
import { linkDoGuia } from '../guia/link';
import { ESCADA_PESO_CORPO, haCargaMenor, type Carga, type SerieRegistrada } from '../../domain/progressao';
import { faixaTexto as faixa, numeroBr, tempoNoRelogio as tempo, textoDoRir } from '../../domain/numero';
import { RIR } from '../../domain/regras';
import { degrauInicial } from '../../domain/progressao/escadas';
import { cargasHalter, comHalterMaisPesado, MENOR_ANILHA_PADRAO_KG } from '../../domain/taxonomia/equipamentos';
import { Numero, numeroOu } from '../app/ui';
import { ValorPorToque } from '../onboarding/Inventario';
import { CartaoTexto, temCartao } from '../programa/CartaoTexto';
import {
  avaliarSerieDeCalibracao,
  calibracaoNaSessao,
  opcoesCarga,
  precisaAquecer,
  prescricaoDaVaga,
  sugestaoDoExercicio,
  textoCarga,
  ultimaSerie,
  type OpcoesSugestao,
} from '../../domain/sessao';
import type { Inventario } from '../../domain/taxonomia/equipamentos';
import { avaliarDor, avaliarSinal, type Sinal } from '../../domain/triagem';
import type { Estado } from '../../storage/esquema';
import { AvisoSalvar } from '../app/avisos';
import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { Folha } from '../app/Folha';
import { Icone } from '../app/icones';
import { Titulo } from '../app/ui';
import { Miniatura } from '../programa/Miniatura';
import { BotaoPrefiro } from '../programa/Prefiro';
import { alternarPreferencia, anotarDor, descartarSessao, desfazerSerie, diaDoTreino, interromperExercicio, corrigirHalterMaisPesado, inventarioDoTreino, opcoesDaCarga, registrarSerie, semSerie, terminarSessao, trocarExercicio } from './acoes';
import { PalcoTreino } from './PalcoTreino';
import { PainelDescanso, useDescanso, useTelaAcesa } from './Temporizador';

// Treino em andamento: um exercício por vez, séries registradas com um toque, descanso entre séries,
// troca pela alternativa e o botão "Senti algo" (dor e sinais de alerta). Decisões: docs/pesquisa/10-decisoes-m5.md.

const RIRS = [0, 1, 2, 3, 4] as const;

// O exercício aberto no treino em andamento, lembrado só nesta aba (sessionStorage): não é dado de treino nem de saúde.
const CHAVE_ABERTO = 'treino-mvp:exercicio-aberto';
function lerExercicioAberto(sessaoId: string): number | null {
  try {
    const v = JSON.parse(sessionStorage.getItem(CHAVE_ABERTO) ?? 'null') as { sessaoId?: unknown; indice?: unknown } | null;
    return v && v.sessaoId === sessaoId && typeof v.indice === 'number' && Number.isInteger(v.indice) && v.indice >= 0 ? v.indice : null;
  } catch {
    return null;
  }
}
function gravarExercicioAberto(sessaoId: string, indice: number): void {
  try {
    sessionStorage.setItem(CHAVE_ABERTO, JSON.stringify({ sessaoId, indice }));
  } catch {
    /* sem armazenamento: vale a regra do primeiro exercício incompleto */
  }
}

/** Prescrição de um item da sessão: a do programa, ou a da vaga que a alternativa ocupou. */
type Item = { x: ExercicioPrescrito; feito: { exId: string; series: SerieRegistrada[]; interrompido?: boolean; noLugarDe?: string } };

export function Treino() {
  const { estado, atualizar, erroAoSalvar } = useApp();
  const navigate = useNavigate();
  const descanso = useDescanso(estado.sessaoAtual?.id);
  useTelaAcesa();
  const sessao = estado.sessaoAtual;
  const programa = estado.programa?.programa;
  // O dia no local do treino (local.treino-do-dia): as vagas que não são possíveis ali já vêm trocadas, com o motivo.
  const doTreino = useMemo(() => (sessao ? diaDoTreino(estado, sessao, fusoDoAparelho()) : null), [estado, sessao]);
  const dia = doTreino?.dia ?? null;
  const vagaDe = (exId: string) => dia?.exercicios.find((x) => (x.noLugarDe ?? x.exId) === exId);
  // Ao voltar para um treino em andamento, abre o primeiro exercício que ainda não terminou.
  // Na mesma aba (ida ao guia e volta), abre o exercício que estava aberto: antes, "Senti algo" tocado no guia do 4º
  // exercício voltava para o 1º ainda incompleto e interrompia o exercício errado.
  const [indice, setIndice] = useState(() => {
    const aberto = sessao ? lerExercicioAberto(sessao.id) : null;
    if (sessao && aberto !== null && aberto < sessao.exercicios.length) return aberto;
    const meta = (exId: string) => vagaDe(exId)?.series ?? 1;
    const i = sessao?.exercicios.findIndex((e) => !e.interrompido && e.series.length < meta(e.noLugarDe ?? e.exId)) ?? 0;
    return Math.max(0, i);
  });
  const sessaoId = sessao?.id;
  useEffect(() => {
    if (sessaoId) gravarExercicioAberto(sessaoId, indice);
  }, [sessaoId, indice]);
  // "Senti algo" tocado no guia aberto pelo treino volta aqui com a folha aberta (?sentir=1): uma lógica de segurança só.
  const [params, setParams] = useSearchParams();
  const [painel, setPainel] = useState<'nenhum' | 'trocar' | 'sentir' | 'mais' | 'terminar'>(() => (params.get('sentir') === '1' ? 'sentir' : 'nenhum'));
  useEffect(() => {
    if (params.has('sentir')) setParams({}, { replace: true });
  }, [params, setParams]);
  const [aviso, setAviso] = useState<{ texto: string; regraId: string } | null>(null);
  // "Desfazer" por 5 s depois de salvar a série (redesign, lote 2): o toque errado em "Série feita" se corrige na hora.
  const [salva, setSalva] = useState<{ indice: number; numero: number } | null>(null);
  // Frontend novo (12/11/2026): o descanso toma a tela, com o relógio grande; "Mudar" (ou a faixa do descanso) alterna
  // para os números da série sem parar o relógio. O que está preenchido para a próxima série (o rascunho) vale nas duas
  // vistas: "Série N feita" na tela do descanso registra o mesmo que "Série feita" no registro.
  const [verSerie, setVerSerie] = useState(false);
  // o Boneco ampliado, por cima do treino (um toque no palco abre; lote M2, adiantado em 22/11/2026)
  const [guiaAmpliado, setGuiaAmpliado] = useState(false);
  // Aberto sozinho, na 1ª vez da pessoa naquele exercício (ideia B do estudo da tela do treino, escolhida pelo Gustavo
  // em 22/11/2026): a folha ganha o botão "Entendi", que leva ao registro.
  const [guiaDaPrimeiraVez, setGuiaDaPrimeiraVez] = useState(false);
  const [rascunho, setRascunho] = useState<Rascunho | null>(null);
  // logo depois de salvar, "Série N feita" aparece no lugar exato de "Série feita": por 1 s o botão não responde,
  // para um toque duplo não registrar a série seguinte (revisão do bloco 2, item 2)
  const [recemSalva, setRecemSalva] = useState(false);
  useEffect(() => {
    if (!recemSalva) return;
    const t = setTimeout(() => setRecemSalva(false), 1000);
    return () => clearTimeout(t);
  }, [recemSalva]);
  const noRelogio = descanso.ativo && !verSerie;
  const preso = usePainelPreso(`${noRelogio}`);
  useEffect(() => {
    if (!salva) return;
    const t = setTimeout(() => setSalva(null), 5000);
    return () => clearTimeout(t);
  }, [salva]);
  if (!sessao || !programa || !dia || !doTreino) return <Navigate to="/programa" replace />;
  const inventario = inventarioDoTreino(estado, sessao);
  const opcoesCargaHoje = opcoesDaCarga(estado, sessao, fusoDoAparelho());

  // A vaga de cada item: a do dia no local; numa troca pela alternativa, a prescrição da vaga com a alternativa.
  const itens: Item[] = sessao.exercicios.map((feito) => {
    const vaga = vagaDe(feito.noLugarDe ?? feito.exId) ?? dia.exercicios[0]!;
    return { x: feito.exId === vaga.exId ? vaga : prescricaoDaVaga(vaga, feito.exId), feito };
  });
  const i = Math.min(indice, itens.length - 1);
  const { x, feito } = itens[i]!;
  const completo = feito.series.length >= x.series || !!feito.interrompido;
  const vaga = vagaDe(feito.noLugarDe ?? feito.exId);
  const trocaDoLocal = doTreino.trocas.find((t) => t.vaga === feito.noLugarDe && t.entrou === feito.exId);
  const ultimo = i === itens.length - 1;
  // a calibração da série que vem (progressao.calibracao), mostrada acima do painel
  const calNaSessao = calibracaoNaSessao(estado.historico, x, inventario, feito.series, opcoesCargaHoje);

  const fecharGuia = () => {
    setGuiaAmpliado(false);
    setGuiaDaPrimeiraVez(false);
  };
  // A 1ª vez da pessoa neste exercício: nunca fez uma série dele, em nenhum treino guardado nem neste.
  const nuncaFez = !feito.series.length && !estado.historico.some((s) => s.exercicios.some((e) => e.exId === x.exId && e.series.length > 0));
  const irPara = (n: number) => {
    fecharGuia();
    setIndice(n);
    setVerSerie(true);
    setRascunho(null);
    setSalva(null);
    setPainel('nenhum');
    setAviso(null);
    window.scrollTo?.(0, 0);
  };
  const terminar = (porAlerta = false, alerta?: 'cauda-equina') => {
    descanso.parar();
    atualizar((s) => terminarSessao(s, agoraIso(), porAlerta, alerta));
    navigate('/treino/fim', { replace: true });
  };
  // as séries já feitas neste exercício: à vista no registro e, durante o descanso, na tela do relógio
  const seriesFeitas = feito.series.length > 0 && (
    <ol className="series-feitas" aria-label="Séries feitas">
      {feito.series.map((s, n) => (
        <li key={n}>
          <span className="n">{n + 1}ª</span> {textoCarga(s.carga, feito.exId)} × {s.reps} · RIR {textoDoRir(s.rir, RIR.registroMax)}
          {s.calibracao ? ' · acerto da carga' : ''}
          {s.dor ? ` · dor ${s.dor}` : ''}
          {s.quedas?.length ? ` · quedas: ${s.quedas.map((q) => `${textoCarga(q.carga, feito.exId)} × ${q.reps}`).join(', ')}` : ''}
        </li>
      ))}
    </ol>
  );
  const desfazerSalva = () => {
    if (!salva) return;
    atualizar((s) => desfazerSerie(s, salva.indice));
    descanso.parar();
    setSalva(null);
    setIndice(salva.indice);
  };
  // Terminar pede confirmação, menos quando tudo já foi feito (redesign, lote 2). Os alertas de segurança encerram direto.
  const pedirTerminar = () => (itens.every((t) => t.feito.series.length >= t.x.series || t.feito.interrompido) ? terminar() : setPainel('terminar'));
  const feita = (serie: SerieRegistrada) => {
    // Série de acerto da calibração (progressao.calibracao): fica no histórico, fora da dupla progressão.
    const cal = calibracaoNaSessao(estado.historico, x, inventario, feito.series, opcoesCargaHoje);
    const acerto = cal.calibrando && !avaliarSerieDeCalibracao(serie, x, inventario, opcoesCargaHoje).perto;
    // A nota de dor dada antes da 1ª série está guardada no exercício e passa para esta série (registrarSerie).
    atualizar((s) => registrarSerie(s, i, acerto ? { ...serie, calibracao: true } : serie));
    setSalva({ indice: i, numero: feito.series.length + 1 });
    setRecemSalva(true);
    setVerSerie(false);
    if (feito.series.length + 1 < x.series) descanso.iniciar(x.descansoSeg);
    else if (!ultimo) descanso.iniciar(x.descansoSeg);
    window.scrollTo?.(0, 0);
  };

  return (
    <div className={`wrap app treino-tela${noRelogio && descanso.resta <= 0 ? ' invertida' : ''}${!noRelogio && !preso.solto ? ' presa' : ''}`}>
      {/* Cabeçalho do treino: voltar ao início sem perder nada, o guia completo, as outras opções e "Senti algo" sempre à vista. */}
      <header className="top">
        <div className="brand cab-treino">
          <Link to="/programa" className="volta-inicio" aria-label="Voltar ao início; o treino fica salvo">
            <Icone nome="x" />
          </Link>
          {/* menos texto (lote 2): só "1 de 6" à vista; o nome do treino fica para o leitor de tela */}
          <span className="onde-treino">
            <span className="sr">{dia.nome}, exercício </span>
            {i + 1} de {itens.length}
          </span>
          {x.animacaoId && (
            <Link className="iconbtn" aria-label="Ver como fazer" to={linkDoGuia(x.animacaoId, { de: 'treino', diaId: sessao.diaId, exId: x.exId, vaga: feito.noLugarDe })}>
              <Icone nome="book-open" />
            </Link>
          )}
          <button type="button" className="mais-op" aria-label="Mais opções: anterior, próximo, trocar, terminar" aria-haspopup="dialog" onClick={() => setPainel('mais')}>
            <Icone nome="ellipsis" />
          </button>
          <button type="button" className="alerta-topo" aria-expanded={painel === 'sentir'} onClick={() => setPainel(painel === 'sentir' ? 'nenhum' : 'sentir')}>
            <Icone nome="triangle-alert" />
            Senti algo
          </button>
        </div>
        {/* onde a pessoa está no treino: um traço por exercício */}
        <ol className="prog-treino" aria-hidden="true">
          {itens.map((t, n) => (
            <li key={n} className={t.feito.series.length >= t.x.series || t.feito.interrompido ? 'feito' : n === i ? 'atual' : undefined} />
          ))}
        </ol>
      </header>
      <main className="conteudo sessao">
        <AvisoSalvar />
        {/* a orientação de segurança (dor, sinal de alerta) fica sempre à vista, na série e no descanso */}
        {aviso && painel === 'nenhum' && (
          <div className="warnbox aviso-seguranca" role="alert">
            {aviso.texto}
          </div>
        )}
        {noRelogio && (
          <PainelDescanso
            d={descanso}
            acao={
              completo ? (
                <button type="button" className="btn" disabled={recemSalva} onClick={() => irPara(i + 1)}>
                  Próximo exercício
                </button>
              ) : (
                rascunho?.pronto ? (
                  <button type="button" className="btn salvar" disabled={recemSalva} onClick={() => feita(rascunho.serie())}>
                    Série {feito.series.length + 1} feita
                  </button>
                ) : (
                  <button type="button" className="btn" disabled={recemSalva} onClick={() => setVerSerie(true)}>
                    Preencher a série {feito.series.length + 1}
                  </button>
                )
              )
            }
          >
            <div className="tabela-descanso">
              <div className="aseguir">
                {/* régua cara-humana, cortes aprovados pelo Gustavo em 22/11/2026: sem animação, a caixa "guia em texto" guardava o lugar de um
                    desenho que não existe; no descanso fica só o que vem a seguir */}
                {(completo ? itens[i + 1]?.x : x)?.animacaoId && <Miniatura animacaoId={(completo ? itens[i + 1]?.x : x)!.animacaoId} />}
                <div className="txt">
                  {completo ? (
                    <>
                      <span className="rotulo">A seguir · exercício {i + 2} de {itens.length}</span>
                      <b>{itens[i + 1]?.x.nome}</b>
                    </>
                  ) : (
                    <>
                      <span className="rotulo">
                        A seguir · <span className="nw">série {feito.series.length + 1} de {x.series}</span>
                      </span>
                      <b>
                        {rascunho?.carga ? `${textoCarga(rascunho.carga, x.exId)} × ${rascunho.reps}` : 'Falta escolher a carga'}
                        {rascunho?.pronto && <small> · RIR {textoDoRir(rascunho.serie().rir, RIR.registroMax)}</small>}
                      </b>
                      <span className="apoio">{x.nome}</span>
                    </>
                  )}
                </div>
                {!completo && rascunho?.pronto && (
                  <button type="button" className="link-botao" onClick={() => setVerSerie(true)}>
                    Mudar
                  </button>
                )}
              </div>
              {seriesFeitas && <div className="feitas-linha">{seriesFeitas}</div>}
              <p className="salva-linha" role="status">
                {salva && (
                  <>
                    <span>
                      <Icone nome="check" />
                      {erroAoSalvar ? `Série ${salva.numero} anotada, mas não salva` : `Série ${salva.numero} salva`}
                    </span>
                    <button type="button" className="link-botao" onClick={desfazerSalva}>
                      Desfazer
                    </button>
                  </>
                )}
              </p>
            </div>
          </PainelDescanso>
        )}

        <div className="guia-do-treino" hidden={noRelogio}>
          {descanso.ativo && (
            <button type="button" className="faixa-descanso" onClick={() => setVerSerie(false)}>
              <span>{descanso.resta <= 0 ? 'Hora da próxima série' : 'Descanso'}</span>
              <span className="num">{descanso.resta <= 0 ? `+${tempo(Math.floor(-descanso.resta))}` : tempo(Math.ceil(descanso.resta))}</span>
            </button>
          )}
          {salva && !descanso.ativo && (
            <div className="desfazer" role="status">
              <span>{erroAoSalvar ? `Série ${salva.numero} anotada, mas não salva` : `Série ${salva.numero} salva`}</span>
              <button type="button" onClick={desfazerSalva}>
                Desfazer
              </button>
            </div>
          )}
          {x.animacaoId ? (
            <PalcoTreino key={x.animacaoId} animacaoId={x.animacaoId} aoAmpliar={() => setGuiaAmpliado(true)} parado={guiaAmpliado} />
          ) : (
            <CartaoTexto exId={x.exId} />
          )}
          {!x.animacaoId && !temCartao(x.exId) && (
            <p className="ajuda">Sem guia ainda. Se não conhece este exercício, troque por um com guia em "Trocar exercício".</p>
          )}
          {trocaDoLocal ? (
            <p className="ajuda troca-local">
              {trocaDoLocal.motivo.charAt(0).toUpperCase() + trocaDoLocal.motivo.slice(1)}.
            </p>
          ) : (
            feito.noLugarDe && <p className="ajuda">No lugar de {POR_ID[feito.noLugarDe]?.nome.toLowerCase()}, só neste treino.</p>
          )}
        </div>

        {/* o nome, as séries feitas, os números, a reserva e o botão: um bloco só, preso embaixo, perto do polegar */}
        <div ref={preso.ref} className={`registro-bloco${preso.solto ? ' solto' : ''}`} hidden={noRelogio}>
          <div className="ex-sessao">
            <Titulo key={x.exId}>{x.nome}</Titulo>
            <p className={x.dropSet ? 'meta' : 'meta sr'}>
              {x.series} × {faixa(x.reps)}
              {x.unilateral ? ' cada lado' : ''}
              {x.dropSet && (
                <>
                  {' '}
                  · última série em drop set
                </>
              )}
            </p>
          </div>

          {!noRelogio && seriesFeitas}

          {feito.interrompido ? (
            <div className="warnbox">
              Exercício encerrado. Troque pela alternativa ou siga para o próximo.
            </div>
          ) : !completo ? (
            <>
              {feito.series.length === 0 && (
                <div className="dicas-serie">
                  <Sugestao x={x} estado={estado} inventario={inventario} opcoes={opcoesCargaHoje} />
                  {/* régua cara-humana, cortes aprovados pelo Gustavo em 22/11/2026: o lembrete do aquecimento aparece uma vez, no 1º exercício do treino, e
                      não em cada exercício que abre um grupo (tempo.aquecimento; a regra inteira está em "Entenda o treino") */}
                  {i === 0 && precisaAquecer(dia, dia.exercicios.findIndex((y) => y === vaga)) && (
                    <p className="dica">
                      Aqueça antes: 1–2 séries leves, sem contar.
                    </p>
                  )}
                </div>
              )}
              {(calNaSessao.calibrando || calNaSessao.fim) && calNaSessao.ultima && (
                <p className="dica calibracao" role="status">
                  {calNaSessao.ultima.motivo}
                </p>
              )}
              <RegistroSerie
                key={`${i}-${feito.exId}-${feito.series.length}`}
                x={x}
                numero={feito.series.length + 1}
                anteriores={feito.series}
                aoFazer={feita}
                aoRascunho={setRascunho}
                estado={estado}
                inventario={inventario}
                opcoes={opcoesCargaHoje}
                aoPesosOutros={(maxKg) => atualizar((s) => corrigirHalterMaisPesado(s, s.sessaoAtual, maxKg))}
              />
            </>
          ) : (
            <p className="status-ok">Séries completas.</p>
          )}

          {completo && (
            <nav className="nav-sessao" aria-label="Exercícios">
              {ultimo ? (
                <button type="button" className="btn" onClick={pedirTerminar}>
                  Terminar treino
                </button>
              ) : (
                <button type="button" className="btn" onClick={() => irPara(i + 1)}>
                  Próximo exercício
                </button>
              )}
            </nav>
          )}
        </div>

        {painel === 'trocar' && (
          <Folha titulo="Trocar só neste treino por:" aoFechar={() => setPainel('nenhum')} livre={() => document.querySelector<HTMLElement>('.alerta-topo')} fecharAoTocarLivre={false}>
            {aviso && (
              <div className="warnbox" role="alert">
                {aviso.texto}
              </div>
            )}
            <Trocar
              atual={feito.exId}
              funcao={vaga?.funcao}
              preferidos={estado.preferidos}
              aoPreferir={(funcao, id) => atualizar((s) => alternarPreferencia(s, funcao, id))}
              alternativas={vaga?.alternativas ?? []}
              aoTrocar={(alt) => {
                atualizar((s) => trocarExercicio(s, i, alt));
                if (feito.series.length) setIndice(i + 1);
                setPainel('nenhum');
                setAviso(null);
              }}
            />
          </Folha>
        )}
        {painel === 'sentir' && (
          <Folha titulo="O que você sentiu?" aoFechar={() => setPainel('nenhum')} livre={() => document.querySelector<HTMLElement>('.alerta-topo')} fecharAoTocarLivre={false}>
            <Sentir
              aoDor={(nota) => {
                // A carga de agora: a da última série feita ou, antes da 1ª, a da última vez. Sem carga menor para
                // usar (a placa 1, o halter mais leve), a orientação não manda reduzir.
                const cargaAgora = feito.series.at(-1)?.carga ?? ultimaSerie(estado.historico, x.exId, opcoesCargaHoje.local)?.carga;
                const r = avaliarDor(nota, false, cargaAgora ? haCargaMenor(cargaAgora, opcoesCarga(x.exId, inventario)) : true);
                // A nota fica guardada (seguranca.dor.escala; R5a): na última série feita ou, sem série, no exercício
                // (e passa para a próxima série; se a dor encerra o exercício antes dela, a nota fica nele).
                let guardada = '';
                if (nota > 0) {
                  atualizar((s) => anotarDor(s, i, nota).estado);
                  guardada = feito.series.length
                    ? ` Nota ${nota} guardada na série ${feito.series.length}.`
                    : r.acao === 'encerrar-exercicio'
                      ? ` Nota ${nota} guardada neste exercício.`
                      : ` Nota ${nota} guardada na próxima série que você registrar.`;
                }
                setAviso({ texto: r.mensagem + guardada, regraId: r.regraId });
                if (r.acao === 'encerrar-exercicio') {
                  atualizar((s) => interromperExercicio(s, i));
                  descanso.parar();
                  setPainel('trocar');
                } else setPainel('nenhum');
              }}
              aoSinal={(sinal) => {
                const r = avaliarSinal(sinal);
                if (r.acao === 'encerrar-sessao') {
                  terminar(true, sinal === 'cauda-equina' ? sinal : undefined);
                  return;
                }
                setAviso({ texto: r.mensagem, regraId: r.regraId });
                atualizar((s) => interromperExercicio(s, i));
                descanso.parar();
                setPainel('trocar');
              }}
            />
          </Folha>
        )}

        {guiaAmpliado && x.animacaoId && painel === 'nenhum' && (
          <Folha titulo={x.nome} aoFechar={fecharGuia} livre={() => document.querySelector<HTMLElement>('.alerta-topo')} fecharAoTocarLivre={false}>
            <PalcoTreino key={`grande-${x.animacaoId}`} animacaoId={x.animacaoId} ampliado />
            {guiaDaPrimeiraVez && (
              <button type="button" className="btn entendi" onClick={fecharGuia}>
                Entendi
              </button>
            )}
          </Folha>
        )}
        <PrimeiraVez
          chave={`${sessao.id}:${x.exId}`}
          quando={!!x.animacaoId && nuncaFez && !feito.interrompido && !noRelogio && painel === 'nenhum'}
          abrir={() => {
            setGuiaDaPrimeiraVez(true);
            setGuiaAmpliado(true);
          }}
        />

        {painel === 'mais' && (
          <Folha titulo="Mais opções" aoFechar={() => setPainel('nenhum')} livre={() => document.querySelector<HTMLElement>('.alerta-topo')} fecharAoTocarLivre={false}>
            <div className="dois">
              <button type="button" className="btn sec" disabled={i === 0} onClick={() => irPara(i - 1)}>
                <Icone nome="chevron-left" />
                Anterior
              </button>
              <button type="button" className="btn sec" disabled={ultimo} onClick={() => irPara(i + 1)}>
                Próximo
                <Icone nome="chevron-right" />
              </button>
            </div>
            <button type="button" className="btn sec" onClick={() => setPainel('trocar')}>
              Trocar exercício
            </button>
            {feito.series.length > 0 && (
              <button
                type="button"
                className="btn sec"
                onClick={() => {
                  atualizar((s) => desfazerSerie(s, i));
                  setPainel('nenhum');
                }}
              >
                Desfazer a última série
              </button>
            )}
            <button type="button" className="btn ter" onClick={() => setPainel('terminar')}>
              Terminar o treino agora
            </button>
          </Folha>
        )}
        {painel === 'terminar' && (
          <Folha titulo="Terminar o treino agora?" aoFechar={() => setPainel('nenhum')} livre={() => document.querySelector<HTMLElement>('.alerta-topo')} fecharAoTocarLivre={false} rotuloFechar="Voltar">
            {semSerie(estado) ? (
              // registro.treino-feito (R5a): sem nenhuma série, o treino não conta e o dia não muda; descartar é a saída principal.
              <p>
                Nenhuma série registrada: este treino não conta, e o próximo continua sendo este dia.
              </p>
            ) : (
              <p>
                {itens.filter((t) => t.feito.series.length >= t.x.series || t.feito.interrompido).length} de {itens.length} exercícios feitos. O que foi registrado fica salvo.
              </p>
            )}
            <button type="button" className="btn" onClick={() => setPainel('nenhum')}>
              Continuar treinando
            </button>
            {semSerie(estado) ? (
              <>
                <button
                  type="button"
                  className="btn sec"
                  onClick={() => {
                    descanso.parar();
                    atualizar((s) => descartarSessao(s));
                    navigate('/programa', { replace: true });
                  }}
                >
                  Descartar este treino
                </button>
                <button type="button" className="btn ter" onClick={() => terminar()}>
                  Guardar mesmo assim
                </button>
              </>
            ) : (
              <button type="button" className="btn sec" onClick={() => terminar()}>
                Terminar o treino
              </button>
            )}
          </Folha>
        )}
      </main>
    </div>
  );

}

// A sugestão do dia em uma linha (redesign, lote 2; regra de menos texto, proposta.md seção 15): de relance, a carga
// de hoje; o motivo que o domínio escreveu, com o selo da regra, fica no "por quê?". O texto da regra não muda.
function Sugestao({ x, estado, inventario, opcoes }: { x: ExercicioPrescrito; estado: Estado; inventario: Inventario; opcoes: OpcoesSugestao }) {
  const s = sugestaoDoExercicio(estado.historico, x, inventario, opcoes);
  // 1ª vez (ou 1ª vez nesta máquina neste local): calibração na 1ª série (progressao.calibracao).
  if (s.acao === 'calibrar' && !s.proxima)
    return (
      <p className="dica">
        <b>1ª vez: comece leve.</b>
      </p>
    );
  return (
    <p className="dica">
      <b>{s.proxima ? `Hoje: ${textoCarga(s.proxima, x.exId)}` : 'Hoje: mesma carga'}</b>
    </p>
  );
}

/** O que está preenchido para a série que vem: vale no registro e no botão "Série N feita" da tela do descanso. */
type Rascunho = { carga?: Carga; reps: number; pronto: boolean; serie: () => SerieRegistrada };

/**
 * O bloco do registro (o nome, os números, a reserva e o botão) fica preso embaixo, perto do polegar. Quando ele passa
 * de 75% da altura da tela (zoom ou letra muito grande), volta para o fluxo da página, para não esconder o resto.
 * Enquanto está preso, a folga de rolagem do foco do teclado é a altura dele (WCAG 2.4.11).
 */
function usePainelPreso(chave: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [solto, setSolto] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const medir = () => {
      const h = el.getBoundingClientRect().height;
      const soltar = h > window.innerHeight * 0.75;
      setSolto(soltar);
      document.documentElement.style.scrollPaddingBottom = soltar || !h ? '' : `${Math.ceil(h) + 16}px`;
    };
    medir();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(medir) : null;
    ro?.observe(el);
    window.addEventListener('resize', medir);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', medir);
      document.documentElement.style.scrollPaddingBottom = '';
    };
  }, [chave]);
  return { ref, solto };
}

/**
 * Na 1ª vez da pessoa num exercício, o guia grande abre sozinho, uma vez (ideia B do estudo da tela do treino,
 * escolhida pelo Gustavo em 22/11/2026): quem nunca fez o movimento vê primeiro o Boneco, e "Entendi" leva ao registro.
 * "Uma vez" vale por treino e por exercício, e fica na memória da aba (sessionStorage): voltar do guia completo ou
 * recarregar a página não abre de novo. Não é dado de treino e não entra na cópia de segurança.
 */
function PrimeiraVez({ chave, quando, abrir }: { chave: string; quando: boolean; abrir: () => void }) {
  const aoAbrir = useRef(abrir);
  aoAbrir.current = abrir;
  useEffect(() => {
    if (!quando) return;
    const k = `treino-mvp:guia-visto:${chave}`;
    try {
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, '1');
    } catch {
      // sem a memória da aba (modo restrito): abre a cada chegada ao exercício, que é o lado seguro
    }
    aoAbrir.current();
  }, [chave, quando]);
  return null;
}

/** Menos e mais, lado a lado, embaixo do número: os dois alvos grandes da série. */
function MenosMais({
  rotuloMenos,
  rotuloMais,
  semMenos,
  semMais,
  aoMenos,
  aoMais,
}: {
  rotuloMenos: string;
  rotuloMais: string;
  semMenos?: boolean;
  semMais?: boolean;
  aoMenos: () => void;
  aoMais: () => void;
}) {
  return (
    <div className="stepper">
      <button type="button" aria-label={rotuloMenos} disabled={semMenos} onClick={aoMenos}>
        <Icone nome="minus" />
      </button>
      <button type="button" aria-label={rotuloMais} disabled={semMais} onClick={aoMais}>
        <Icone nome="plus" />
      </button>
    </div>
  );
}

function RegistroSerie({
  x,
  numero,
  anteriores,
  aoFazer,
  aoRascunho,
  estado,
  inventario,
  opcoes,
  aoPesosOutros,
}: {
  x: ExercicioPrescrito;
  numero: number;
  anteriores: SerieRegistrada[];
  aoFazer: (s: SerieRegistrada) => void;
  aoRascunho?: (r: Rascunho | null) => void;
  estado: Estado;
  inventario: Inventario;
  opcoes: OpcoesSugestao;
  /** "Meus pesos são outros": grava no local o halter mais pesado que a pessoa disse ter. */
  aoPesosOutros?: (maxKg: number) => void;
}) {
  const op = opcoesCarga(x.exId, inventario);
  const cal = calibracaoNaSessao(estado.historico, x, inventario, anteriores, opcoes);
  const ultima = anteriores.at(-1) ?? ultimaSerie(estado.historico, x.exId, opcoes.local);
  const sugerida = anteriores.length === 0 ? sugestaoDoExercicio(estado.historico, x, inventario, opcoes).proxima : cal.ultima?.proxima;
  const cargaInicial: Carga | undefined =
    (sugerida && sugerida.tipo === op.registro ? sugerida : undefined) ??
    (ultima && ultima.carga.tipo === op.registro ? ultima.carga : undefined) ??
    // progressao.degrau-inicial (R5d): na 1ª vez, o degrau de partida segue o nível.
    (op.registro === 'degrau' ? { tipo: 'degrau', degrau: degrauInicial(x.exId, estado.nivel?.escolhido ?? 'iniciante', inventario) } : undefined);
  const [carga, setCarga] = useState<Carga | undefined>(cargaInicial);
  const [reps, setReps] = useState<number>(ultima?.reps ?? x.reps[0]);
  const [rir, setRir] = useState<number | undefined>(anteriores.at(-1)?.rir);
  const pronto = !!carga && rir !== undefined && reps >= 0;
  // Drop set na última série (tempo.drop-set): as quedas ficam registradas, fora da progressão.
  const comQuedas = !!x.dropSet && numero === x.series;
  const [quedas, setQuedas] = useState<{ carga?: Carga; reps: number }[]>([
    { reps: 0 },
    { reps: 0 },
  ]);
  const quedasFeitas = quedas.filter((q): q is { carga: Carga; reps: number } => !!q.carga && q.reps > 0);
  // a reserva-alvo de hoje marcada nos próprios botões (no lugar de uma frase); 4 vale "4 ou mais"
  const naMeta = (n: number) => n >= x.rir[0] && (n <= x.rir[1] || (n === 4 && x.rir[1] >= 4));
  const uid = useId();
  // "Meus pesos são outros" (lote M1 da análise crítica): só onde a lista vem de halteres fixos, que podem ter vindo do
  // kit típico de um atalho. Halter de montar, kettlebell e caneleira saem do que a própria pessoa contou.
  const halterFixo = op.tipo === 'halter' && inventario.halteres_fixos && !inventario.anilhas_e_manoplas ? inventario.halteres_fixos : undefined;
  const pesosOutros =
    halterFixo && aoPesosOutros
      ? {
          maxAtualKg: halterFixo.maxKg,
          gravar: (maxKg: number) => {
            aoPesosOutros(maxKg);
            // a carga escolhida que saiu da lista volta a "escolha": o app não adivinha a nova
            const nova = cargasHalter(comHalterMaisPesado(inventario, maxKg));
            if (carga?.tipo === 'kg' && !nova.some((v) => Math.abs(v - carga.kg) < 1e-9)) setCarga(undefined);
          },
        }
      : undefined;

  // o que está preenchido sobe para a tela do treino, que o usa no botão "Série N feita" do descanso
  const montar = useRef<() => SerieRegistrada>(() => ({ carga: carga!, reps, rir: rir! }));
  montar.current = () => ({ carga: carga!, reps, rir: rir!, ...(comQuedas && quedasFeitas.length ? { quedas: quedasFeitas } : {}) });
  useEffect(() => {
    aoRascunho?.({ carga, reps, pronto, serie: () => montar.current() });
    // só quando o que aparece na tela do descanso muda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carga, reps, pronto]);
  useEffect(() => () => aoRascunho?.(null), [aoRascunho]);

  return (
    <section className="registro" aria-label={`Série ${numero}`}>
      <div className="serie-tit">
        <h2>
          <span className="nw">Série {numero} de {x.series}</span> ·{' '}
          <span className="nw">
            {faixa(x.reps)}
            {x.unilateral && <span> cada lado</span>}
          </span>
        </h2>
        {/* régua cara-humana, cortes aprovados pelo Gustavo em 22/11/2026: os quadradinhos repetiam "Série N de M", que está escrito ao lado */}
      </div>
      <div className="colunas">
        <ControleCarga registro={op.registro} cargas={op.lista} placasMax={op.placasMax} menorAnilhaKg={op.menorAnilhaKg} degraus={op.degraus} valor={carga} aoMudar={setCarga} pesosOutros={pesosOutros} />
        <div className="coluna" role="group" aria-labelledby={`${uid}-reps`}>
          <span className="rotulo-curto" id={`${uid}-reps`}>
            Repetições
          </span>
          <output className="valor-grande" aria-live="polite">
            {reps}
          </output>
          <MenosMais rotuloMenos="Menos uma repetição" rotuloMais="Mais uma repetição" semMenos={reps <= 0} aoMenos={() => setReps((r) => Math.max(0, r - 1))} aoMais={() => setReps((r) => r + 1)} />
        </div>
      </div>
      <fieldset className="campo rir">
        <legend className="sr">Quantas ainda conseguiria? (RIR)</legend>
        <div className="rir-pe">
          <span className="rir-pergunta" aria-hidden="true">
            Quantas ainda conseguiria?
          </span>
          <span className="rir-meta" id={`rir-meta-${numero}`}>
            meta<span className="sr"> de hoje:</span> {faixa(x.rir)}
          </span>
        </div>
        <div className="chips-valor">
          {RIRS.map((n) => (
            <label key={n} className="chip-valor">
              <input type="radio" name={`rir-${numero}`} checked={rir === n} onChange={() => setRir(n)} aria-describedby={naMeta(n) ? `rir-meta-${numero}` : undefined} />
              <span>
                {n === RIR.registroMax ? (
                  <>
                    {n}
                    <span className="sr"> ou mais</span>
                    <span aria-hidden="true">+</span>
                  </>
                ) : (
                  n
                )}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {comQuedas && (
        <fieldset className="campo quedas">
          <legend>Drop set (opcional)</legend>
          <p className="ajuda">
            Sem descansar, tire 20–30% da carga e faça mais repetições. Repita uma vez.
          </p>
          {quedas.map((q, n) => (
            <div key={n} className="queda">
              <span className="rotulo-curto">Queda {n + 1}</span>
              <div className="colunas">
                <ControleCarga
                  registro={op.registro}
                  cargas={op.lista}
                  placasMax={op.placasMax}
                  menorAnilhaKg={op.menorAnilhaKg}
                  valor={q.carga}
                  aoMudar={(c) => setQuedas((qs) => qs.map((y, k) => (k === n ? { ...y, carga: c } : y)))}
                />
                <div className="coluna" role="group" aria-label={`Repetições da queda ${n + 1}`}>
                  <span className="rotulo-curto">Repetições</span>
                  <output className="valor-grande" aria-live="polite">
                    {q.reps}
                  </output>
                  <MenosMais
                    rotuloMenos={`Menos uma repetição na queda ${n + 1}`}
                    rotuloMais={`Mais uma repetição na queda ${n + 1}`}
                    semMenos={q.reps <= 0}
                    aoMenos={() => setQuedas((qs) => qs.map((y, k) => (k === n ? { ...y, reps: Math.max(0, y.reps - 1) } : y)))}
                    aoMais={() => setQuedas((qs) => qs.map((y, k) => (k === n ? { ...y, reps: y.reps + 1 } : y)))}
                  />
                </div>
              </div>
            </div>
          ))}
        </fieldset>
      )}
      <button type="button" className="btn salvar" disabled={!pronto} aria-describedby={pronto ? undefined : `${uid}-falta`} onClick={() => pronto && aoFazer(montar.current())}>
        {/* sessão de textos (16/11/2026): o tempo do descanso saiu do botão; o relógio o mostra logo depois do toque */}
        Série feita
      </button>
      {!pronto && (
        <p className="falta" id={`${uid}-falta`}>
          {!carga && rir === undefined ? 'Falta escolher a carga e quantas ainda conseguiria.' : !carga ? 'Falta escolher a carga.' : 'Falta dizer quantas ainda conseguiria.'}
        </p>
      )}
    </section>
  );
}

/** O valor da opção "Meus pesos são outros…" na lista de cargas (não é uma carga). */
const OUTROS_PESOS = 'outros';
/** [opinião] Os pesos comuns de um halter mais pesado, de casa à academia; qualquer outro vai em "Outro". */
const HALTER_MAIS_PESADO = [4, 5, 6, 8, 10, 12, 14, 16, 20, 30] as const;

const nomeDoDegrau = (t: string) => (t ? t[0]!.toUpperCase() + t.slice(1) : t);

/** A carga: o número grande com a unidade pequena, e menos e mais embaixo. O tipo de registro vem do equipamento. */
function ControleCarga({
  registro,
  cargas,
  placasMax,
  menorAnilhaKg,
  degraus,
  valor,
  aoMudar,
  pesosOutros,
}: {
  /** A saída "Meus pesos são outros" da lista de halteres: o mais pesado suposto hoje e como gravar o certo. */
  pesosOutros?: { maxAtualKg: number; gravar: (maxKg: number) => void };
  registro: Carga['tipo'];
  cargas?: number[];
  placasMax?: number;
  menorAnilhaKg?: number;
  /** Degraus do exercício (progressao.escada-por-exercicio); sem eles, a escada genérica. */
  degraus?: string[];
  valor: Carga | undefined;
  aoMudar: (c: Carga) => void;
}) {
  // Um id por controle: no drop set há três na tela (a série e as duas quedas), e com o id fixo o rótulo de todos
  // apontava para o 1º.
  const uid = useId();
  const idRotulo = `${uid}-rotulo`;
  const idCarga = `${uid}-carga`;
  const [corrigindo, setCorrigindo] = useState(false);
  const [maisPesado, setMaisPesado] = useState('');
  // Carga livre (decisão do Gustavo de 22/11/2026): onde não há lista (anilhas, barra), tocar no número abre
  // um campo para digitar a carga usada, qualquer que seja; o menos e o mais continuam para o ajuste de um toque.
  const [digitando, setDigitando] = useState(false);
  const [digitado, setDigitado] = useState('');
  const numeroLivre = (k: number | undefined, rotulo: string, campo: string, gravar: (n: number) => void, id?: string) => (
    <>
      <button
        type="button"
        className="valor-grande valor-livre"
        aria-label={rotulo}
        aria-haspopup="dialog"
        onClick={() => {
          setDigitado(k === undefined ? '' : String(k));
          setDigitando(true);
        }}
      >
        <output id={id} className="carga-valor" aria-live="polite">
          {numero(k === undefined ? undefined : numeroBr(k), 'kg')}
        </output>
      </button>
      {digitando && (
        <Folha titulo="Carga" aoFechar={() => setDigitando(false)}>
          <form
            className="form"
            onSubmit={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              const n = numeroOu(digitado);
              if (n === undefined || n < 0 || n > 1000) return;
              gravar(Math.round(n * 100) / 100);
              setDigitando(false);
            }}
          >
            <Numero rotulo={campo} valor={digitado} aoMudar={setDigitado} min={0} sufixo="kg" />
            <button type="submit" className="btn" disabled={numeroOu(digitado) === undefined}>
              Pronto
            </button>
          </form>
        </Folha>
      )}
    </>
  );
  const numero = (n: number | string | undefined, unidade?: string) =>
    n === undefined ? (
      '—'
    ) : (
      <>
        {n}
        {unidade && <small> {unidade}</small>}
      </>
    );
  if (registro === 'anilha') {
    // progressao.incremento.maquina-anilha: a carga é guardada em kg de anilhas de cada lado e mostrada pelo total dos
    // dois lados (decisão do Gustavo de 22/11/2026); o menos e o mais andam de par em par da menor anilha.
    const porLado = valor?.tipo === 'anilha' ? valor.kgPorLado : undefined;
    const k = porLado === undefined ? undefined : Math.round(2 * porLado * 100) / 100;
    const passo = menorAnilhaKg ?? MENOR_ANILHA_PADRAO_KG;
    const mudar = (dir: 1 | -1) => aoMudar({ tipo: 'anilha', kgPorLado: Math.max(0, Math.round(((porLado ?? 0) + dir * passo) * 100) / 100) });
    return (
      <div className="coluna" role="group" aria-labelledby={idRotulo}>
        <span className="rotulo-curto" id={idRotulo}>
          Anilhas (total)
        </span>
        {numeroLivre(k, 'Digitar o total de anilhas', 'Total de anilhas, somando os dois lados', (n) => aoMudar({ tipo: 'anilha', kgPorLado: Math.round((n / 2) * 100) / 100 }))}
        <MenosMais rotuloMenos="Menos um par de anilhas" rotuloMais="Mais um par de anilhas" semMenos={k === undefined || k <= 0} aoMenos={() => mudar(-1)} aoMais={() => mudar(1)} />
      </div>
    );
  }
  if (registro === 'contrapeso') {
    // progressao.incremento.assistido: mais placa = mais ajuda (fica mais fácil).
    const p = valor?.tipo === 'contrapeso' ? valor.placa : undefined;
    const max = placasMax ?? 30;
    return (
      <div className="coluna" role="group" aria-labelledby={idRotulo}>
        <span className="rotulo-curto" id={idRotulo}>
          Contrapeso (placa)
        </span>
        <output className="valor-grande carga-valor" aria-live="polite">
          {numero(p)}
        </output>
        <MenosMais

          rotuloMenos="Menos contrapeso (mais difícil)"
          rotuloMais="Mais contrapeso (mais fácil)"
          semMenos={!p || p <= 1}
          semMais={!!p && p >= max}
          aoMenos={() => p && aoMudar({ tipo: 'contrapeso', placa: p - 1 })}
          aoMais={() => aoMudar({ tipo: 'contrapeso', placa: (p ?? 0) + 1 })}
        />
        <p className="ajuda">Aqui é ao contrário: mais placa = mais ajuda. Para progredir, tire uma placa.</p>
      </div>
    );
  }
  if (registro === 'degrau') {
    const d = valor?.tipo === 'degrau' ? valor.degrau : 0;
    return (
      <label className="coluna dificuldade">
        <span className="rotulo-curto">Dificuldade</span>
        <span className="valor-texto com-lista">
          <span aria-hidden="true">{nomeDoDegrau((degraus ?? ESCADA_PESO_CORPO)[d] ?? '')}</span>
          <Icone nome="chevron-down" />
          <select value={d} onChange={(e) => aoMudar({ tipo: 'degrau', degrau: Number(e.target.value) })}>
            {(degraus ?? ESCADA_PESO_CORPO).map((t, n) => (
              <option key={n} value={n}>
                {nomeDoDegrau(t)}
              </option>
            ))}
          </select>
        </span>
      </label>
    );
  }
  if (registro === 'placa') {
    const p = valor?.tipo === 'placa' ? valor.placa : undefined;
    const max = placasMax ?? 30;
    return (
      <div className="coluna" role="group" aria-labelledby={idRotulo}>
        <span className="rotulo-curto" id={idRotulo}>
          Placa
        </span>
        <output className="valor-grande carga-valor" aria-live="polite">
          {numero(p)}
        </output>
        <MenosMais

          rotuloMenos="Placa anterior"
          rotuloMais="Próxima placa"
          semMenos={!p || p <= 1}
          semMais={!!p && p >= max}
          aoMenos={() => p && aoMudar({ tipo: 'placa', placa: p - 1 })}
          aoMais={() => aoMudar({ tipo: 'placa', placa: (p ?? 0) + 1 })}
        />
      </div>
    );
  }
  // kg: halter só com as cargas do inventário; barra e máquina, de 2,5 em 2,5.
  const k = valor?.tipo === 'kg' ? valor.kg : undefined;
  const lista = cargas?.length ? cargas : undefined;
  const passo = (dir: 1 | -1) => {
    if (lista) {
      const pos = k === undefined ? (dir > 0 ? -1 : lista.length) : lista.findIndex((v) => Math.abs(v - k) < 1e-9);
      const n = lista[Math.max(0, Math.min(lista.length - 1, pos + dir))];
      if (n !== undefined) aoMudar({ tipo: 'kg', kg: n });
    } else aoMudar({ tipo: 'kg', kg: Math.max(0, Math.round(((k ?? 0) + dir * 2.5) * 10) / 10) });
  };
  return (
    <div className="coluna">
      <label className="rotulo-curto" htmlFor={idCarga}>
        Carga
      </label>
      {lista ? (
        // o número grande é o que se vê; por cima dele, invisível, o seletor do aparelho: um toque no número abre a
        // lista das cargas que a pessoa tem, para escolher qualquer uma de uma vez
        <span className={`valor-grande com-lista${k === undefined ? ' vazio' : ''}`}>
          <span aria-hidden="true">{numero(k === undefined ? undefined : numeroBr(k), 'kg')}</span>
          {k === undefined && (
            <small className="escolha" aria-hidden="true">
              {' '}
              escolha
            </small>
          )}
          {/* a seta diz que o número abre a lista das cargas */}
          <Icone nome="chevron-down" className="abre-lista" />
          <select
            id={idCarga}
            className="carga-valor"
            value={k ?? ''}
            onChange={(e) => {
              if (e.target.value === OUTROS_PESOS) {
                setMaisPesado('');
                setCorrigindo(true);
              } else aoMudar({ tipo: 'kg', kg: Number(e.target.value) });
            }}
          >
            <option value="" disabled>
              Escolha
            </option>
            {lista.map((v) => (
              <option key={v} value={v}>
                {numeroBr(v)} kg
              </option>
            ))}
            {pesosOutros && <option value={OUTROS_PESOS}>Meus pesos são outros…</option>}
          </select>
        </span>
      ) : (
        numeroLivre(k, 'Digitar a carga', 'Carga usada', (n) => aoMudar({ tipo: 'kg', kg: n }), idCarga)
      )}
      <MenosMais rotuloMenos="Menos carga" rotuloMais="Mais carga" semMenos={k === undefined || (lista ? k <= lista[0]! : k <= 0)} aoMenos={() => passo(-1)} aoMais={() => passo(1)} />
      {corrigindo && pesosOutros && (
        <Folha titulo="Seus halteres" aoFechar={() => setCorrigindo(false)}>
          <p>
            O app supôs halteres até {numeroBr(pesosOutros.maxAtualKg)} kg. Diga o seu mais pesado, e a lista de cargas se ajusta.
          </p>
          <ValorPorToque legenda="Qual é o seu halter mais pesado?" valores={HALTER_MAIS_PESADO} valor={maisPesado} aoMudar={setMaisPesado} />
          <button
            type="button"
            className="btn"
            disabled={!((numeroOu(maisPesado) ?? 0) > 0)}
            onClick={() => {
              pesosOutros.gravar(numeroOu(maisPesado)!);
              setCorrigindo(false);
            }}
          >
            Guardar
          </button>
          <p className="ajuda">
            Para dizer peso por peso, ou mudar outro equipamento, use “Meus locais”, em Meus dados. Se o programa mudar por causa disso, ele avisa depois do treino.
          </p>
        </Folha>
      )}
    </div>
  );
}

function Trocar({
  alternativas,
  aoTrocar,
  atual,
  funcao,
  preferidos,
  aoPreferir,
}: {
  alternativas: string[];
  aoTrocar: (id: string) => void;
  atual: string;
  funcao?: string;
  preferidos?: Record<string, string>;
  aoPreferir: (funcao: string, id: string) => void;
}) {
  if (!alternativas.length) return <p className="ajuda">Este exercício não tem alternativa com o seu equipamento.</p>;
  const botao = (id: string) => (
    <div key={id} className="alternativa">
      <button type="button" className="opcao-ajuste" onClick={() => aoTrocar(id)}>
        <b>{POR_ID[id]?.nome}</b>
      </button>
      <BotaoPrefiro funcao={funcao} id={id} atual={atual} alternativas={alternativas} preferidos={preferidos} aoPreferir={aoPreferir} />
    </div>
  );
  const resto = alternativas.slice(ALTERNATIVAS_A_MOSTRA);
  return (
    <section className="trocar" aria-label="Trocar exercício">
      <div className="pilha">{alternativas.slice(0, ALTERNATIVAS_A_MOSTRA).map(botao)}</div>
      {resto.length > 0 && (
        <details className="ver-mais">
          <summary>Ver mais {resto.length === 1 ? '1 opção' : `${resto.length} opções`}</summary>
          <div className="pilha">{resto.map(botao)}</div>
        </details>
      )}
      <BotaoPrefiro funcao={funcao} id={atual} atual={atual} alternativas={alternativas} preferidos={preferidos} aoPreferir={aoPreferir} />
    </section>
  );
}

const SINAIS: { id: Sinal; texto: string }[] = [
  { id: 'peito', texto: 'Dor, pressão ou aperto no peito' },
  { id: 'falta-de-ar', texto: 'Falta de ar fora do normal' },
  { id: 'tontura', texto: 'Tontura ou quase desmaio' },
  { id: 'palpitacao', texto: 'Coração batendo muito irregular' },
  { id: 'cauda-equina', texto: 'Dormência entre as pernas ou descontrole da urina ou das fezes' },
  { id: 'dor-articular-aguda', texto: 'Dor aguda ou em pontada numa articulação' },
  { id: 'formigamento', texto: 'Formigamento ou dormência' },
  { id: 'perda-de-forca', texto: 'Perda de força estranha' },
];

function Sentir({ aoDor, aoSinal }: { aoDor: (nota: number) => void; aoSinal: (s: Sinal) => void }) {
  return (
    <section className="sentir" aria-label="Senti algo">
      {(['encerrar-sessao', 'encerrar-exercicio'] as const).map((acao) => {
        const sinais = SINAIS.filter((s) => (avaliarSinal(s.id).acao === 'encerrar-sessao') === (acao === 'encerrar-sessao'));
        if (!sinais.length) return null;
        return (
          <div key={acao} className="grupo-sinais" role="group" aria-label={acao === 'encerrar-sessao' ? 'Encerra o treino de hoje' : 'Encerra este exercício'}>
            <p className="rotulo" aria-hidden="true">
              {acao === 'encerrar-sessao' ? 'Encerra o treino de hoje' : 'Encerra este exercício'}
            </p>
            <div className="pilha">
              {sinais.map((s) => (
                <button key={s.id} type="button" className="opcao-ajuste" onClick={() => aoSinal(s.id)}>
                  <b>{s.texto}</b>
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <fieldset className="campo">
        <legend>Ou dê uma nota para a dor (0 a 10)</legend>
        <div className="chips-valor">
          {Array.from({ length: 11 }, (_, n) => (
            <button key={n} type="button" className="chip-valor" onClick={() => aoDor(n)}>
              {n}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="ajuda">
        O app não diagnostica.
      </p>
    </section>
  );
}
