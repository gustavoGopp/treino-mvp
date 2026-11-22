import { lazy, Suspense, useMemo, useState, type ReactNode } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { POR_ID, type Musculo } from '../../domain/biblioteca';
import { NOME_MUSCULO, ehAvisoDeMeta, type DiaPrograma, type ExercicioPrescrito } from '../../domain/gerador';
import { mensagemDeVolta, type MensagemDeVolta } from '../../domain/acompanhamento/volta';
import { opcoesDeAjuste, type Opcao } from '../../domain/gerador/opcoes';
import { diaEMes as dataCurta, faixaTexto as faixa, tempoNoRelogio as tempo } from '../../domain/numero';
import { avaliarTriagem, efeitoDaDor } from '../../domain/triagem';
import { EFEITO_DA_DOR, NOME_ARTICULACAO } from '../onboarding/articulacoes';
import { proximoDia, treinoFeito } from '../../domain/sessao';
import { linkDoGuia } from '../guia/link';
import { inventarioPrincipal, localDoPrograma, localDoTreino, perfilDe, primeiroPassoPendente, type Estado } from '../../storage/esquema';
import { kitTipicoDe } from '../../domain/taxonomia/atalhos';
import { alternarPreferencia, confirmarAvaliacaoDoAlerta, diaDoTreino, hojeDoEstado, iniciarSessao } from '../treino/acoes';
import { alertaPendente } from '../../domain/sessao';
import { Preferencias } from './Prefiro';
import { agoraIso, comProgramaNovo, fusoDoAparelho, mesmoConteudo, resultadoDoEstado, useApp } from '../app/estado';
import { AvisoInstalar, AvisoSalvar, LembreteCopia } from '../app/avisos';
import { Icone } from '../app/icones';
import { Marcar, NavInferior, Titulo, Topo } from '../app/ui';
import { Folha } from '../app/Folha';
import { Miniatura } from './Miniatura';
import { FaixaSemana } from '../acompanhamento/Semana';
import { SemanaLeve } from '../acompanhamento/SemanaLeve';
import { aceitarMargemTempo, recusarMargemTempo, semanaDoEstado, semanaLeveDoEstado, tempoDoEstado } from '../acompanhamento/acoes';
import { CartaoTexto, temCartao } from './CartaoTexto';

// A nota de montagem só baixa quando uma folha de exercício a pede: fora do pacote da tela do programa (limite de peso).
const NotaDoExercicio = lazy(() => import('../guia/NotaDoGuia').then((m) => ({ default: m.NotaDoExercicio })));

// Tela do treino: vai direto ao que importa (o treino de cada dia, com a imagem de cada exercício e
// séries × repetições em destaque). Ajustes, avisos e o porquê ficam um toque abaixo. Nada muda sem a escolha da pessoa.

/** O lugar de cada kit típico, para a linha "Montado para um kit típico de…" (o texto é decisão do Gustavo). */
const NOME_DO_KIT: Record<string, string> = { casa: 'casa', condominio: 'condomínio', academia: 'academia' };

const musculos = (ms: readonly Musculo[]) => ms.map((m) => NOME_MUSCULO[m]).join(', ');

export function Programa() {
  const { estado, atualizar, substituir } = useApp();
  const [aviso, setAviso] = useState('');
  // o cadastro de antes de gerar o programa de novo, para o "Desfazer" (ver `desfazerGeracao`)
  const [antesDeGerar, setAntesDeGerar] = useState<Estado | null>(null);
  const navigate = useNavigate();
  const [diaSel, setDiaSel] = useState(() => {
    const p = estado.programa?.programa;
    return p ? Math.max(0, p.dias.findIndex((d) => d.id === proximoDia(p, estado.historico).id)) : 0;
  });
  // a folha dos avisos ("Ver" na linha do aviso, ou "Ver ajustes possíveis" em "Sobre o programa")
  const [verAvisos, setVerAvisos] = useState(false);
  // a caixa "Confirmo que fui avaliado" do bloqueio depois de um sinal de alerta do coração
  const [avaliado, setAvaliado] = useState(false);
  // "Onde vou treinar hoje?" (R1b): o último local usado vem lembrado; a escolha continua visível.
  const [localHoje, setLocalHoje] = useState(() => localDoTreino(estado)?.id);
  const perfil = useMemo(() => perfilDe(estado), [estado]);
  const inventario = inventarioPrincipal(estado);
  const opcoes = useMemo(() => (perfil && inventario ? opcoesDeAjuste(perfil, inventario) : []), [perfil, inventario]);
  const gerado = useMemo(() => resultadoDoEstado(estado), [estado]);
  const atualizado = gerado?.status === 'ok' ? gerado.programa : null;

  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;

  const triagem = avaliarTriagem(perfil!.triagem);
  const salvo = estado.programa?.programa;

  // Sem exercício possível com o cadastro de hoje (a dor tirou todas as regiões): o programa salvo não é mostrado,
  // como na triagem que bloqueia, porque ele ainda traz os exercícios que a dor de hoje exclui.
  const semExercicio = gerado?.status === 'sem-exercicio' ? gerado.aviso : null;
  if (triagem.bloqueado || !salvo || semExercicio) {
    return (
      <div className="wrap app">
        <Topo direita={<Link to="/dados">Meus dados</Link>} />
        <main className="conteudo">
        <AvisoSalvar />
          <Titulo>Programa pausado</Titulo>
          <div className="warnbox seguranca">
            {semExercicio && !triagem.bloqueado ? (
              <p>
                {semExercicio.texto}
              </p>
            ) : (
              <p>
                {triagem.mensagem}
              </p>
            )}
          </div>
          <Link className="btn" to="/comecar/triagem">
            Rever a triagem
          </Link>
        </main>
      </div>
    );
  }

  const versaoNova = !!atualizado && !mesmoConteudo(atualizado, salvo);
  const regerar = (e: Estado): Estado => {
    return comProgramaNovo(e, agoraIso());
  };
  // "Desfazer" depois de gerar o programa de novo (pacote D2; decisão do Gustavo de 22/11/2026, a saída B): o programa
  // muda na hora, sem pergunta, e a mensagem oferece a volta. O que volta é o cadastro inteiro de antes do toque (o
  // programa, a rotina e o painel de ajustes). Vale enquanto a pessoa está nesta tela: fica na memória da tela, não nos
  // dados guardados (guardar o programa anterior pediria uma versão nova do estado).
  const desfazerGeracao = () => {
    if (!antesDeGerar || estado.sessaoAtual) return;
    substituir(antesDeGerar);
    setAntesDeGerar(null);
    setDiaSel(0);
    setAviso('Programa de antes de volta.');
  };

  const escolher = (o: Opcao) => {
    setVerAvisos(false);
    if (estado.sessaoAtual) return;
    if (o.id === 'manter') {
      atualizar((s) => ({ ...s, ajustes: { recolhido: true } }));
      setAviso('Programa mantido.');
      return;
    }
    setAntesDeGerar(estado);
    atualizar((s) =>
      regerar({
        ...s,
        rotina: {
          diasSemana: o.perfil.diasSemana,
          // A divisão escolhida só vale para o mesmo número de dias (divisao.recomendacao).
          ...(o.perfil.divisao ? { divisao: o.perfil.divisao } : {}),
          minutosSessao: o.perfil.minutosSessao,
          prioridades: o.perfil.prioridades,
          // O objetivo não muda com o ajuste (antes, sumia daqui e o programa voltava a "ganhar músculo" sem avisar).
          ...(s.rotina?.objetivo ? { objetivo: s.rotina.objetivo } : {}),
        },
        ajustes: undefined,
      }),
    );
    setDiaSel(0);
    setAviso(`Programa gerado de novo: ${o.titulo.charAt(0).toLowerCase() + o.titulo.slice(1)}.`);
  };

  // Mostra a prescrição desta semana (fases de readaptação e aprendizado mudam séries e RIR).
  const agora = agoraIso();
  const fuso = fusoDoAparelho();
  const hoje = hojeDoEstado(estado, agora, fuso)!;
  const diasDaSemana = hoje.dias;
  const diaDoPrograma = diasDaSemana[Math.min(diaSel, diasDaSemana.length - 1)]!;
  const locais = estado.locais ?? [];
  // O dia no local escolhido (local.treino-do-dia): as trocas e o motivo, antes de começar.
  const noLocal = locais.length > 1 ? diaDoTreino(estado, { id: agora, inicio: agora, diaId: diaDoPrograma.id, ...(localHoje ? { localId: localHoje } : {}), ...(hoje.semanaLeve ? { semanaLeve: true } : {}) }, fuso) : null;
  const dia = noLocal && !noLocal.noLocalDoPrograma ? noLocal.dia : diaDoPrograma;
  const nomeLocal = locais.find((l) => l.id === localHoje)?.nome;
  const preferir = (funcao: string, id: string) => {
    atualizar((s) => alternarPreferencia(s, funcao, id));
    setAviso('Preferência salva. Ela entra quando você atualizar o programa e nas trocas de local.');
  };
  const abaixo = salvo.avisos.filter(ehAvisoDeMeta).length;
  const volta = mensagemDeVolta(hoje);
  // Uma coisa de cada vez: na volta de uma pausa, a proposta do tempo espera o próximo treino.
  const tempoProposto = volta ? null : tempoDoEstado(estado, fuso);
  const feitos = new Set(estado.historico.flatMap((s) => s.exercicios.filter((e) => e.series.length).map((e) => e.exId)));
  const resumoSemana = estado.historico.some(treinoFeito) ? semanaDoEstado(estado, agora, fuso) : null;
  const prefixoAbas = prefixoComum(diasDaSemana.map((d) => d.nome));

  // Uma mensagem por vez (lote 4; agente 1, 4.5A): a dor fica sempre à vista; o resto entra numa fila, na ordem
  // abaixo. Na tela aparece só a 1ª, em 1 linha; "Ver" abre a folha com o bloco inteiro (os textos e os selos de
  // sempre) e, embaixo, os outros. No dia da volta de uma pausa, a volta é a mensagem do dia (só a versão nova fica).
  const leve = estado.sessaoAtual ? null : semanaLeveDoEstado(estado, agora, fuso);
  const fila: AvisoDaFila[] = [];
  // O resumo da dor da triagem (seguranca.dor.programa; lote 3 do redesign: saiu com o "Tudo certo?"): o 1º aviso do
  // programa novo, até o 1º treino. Depois ele segue nos avisos do programa, em "Sobre o programa".
  const doresTriagem = estado.triagem?.dores ?? [];
  if (doresTriagem.length && !estado.historico.some(treinoFeito))
    fila.push({
      id: 'dor-triagem',
      linha: `Pela triagem: ${doresTriagem.map((d) => `${NOME_ARTICULACAO[d.articulacao].toLowerCase()}${d.nota === undefined ? '' : ` (dor ${d.nota} hoje)`}`).join(', ')}.`,
      bloco: (
        <section className="box" aria-labelledby="dor-triagem">
          <h2 id="dor-triagem">
            Pela triagem
          </h2>
          <ul className="lista">
            {doresTriagem.map((d) => (
              <li key={d.articulacao}>
                {NOME_ARTICULACAO[d.articulacao]}, {d.nota === undefined ? 'sem a nota de hoje' : `dor ${d.nota} hoje`}: {EFEITO_DA_DOR[efeitoDaDor(d.nota)]}.
              </li>
            ))}
          </ul>
          {doresTriagem.some((d) => d.nota === undefined) && (
            <p className="ajuda">
              Para dar a nota de hoje, volte à <Link to="/comecar/triagem">triagem</Link>.
            </p>
          )}
        </section>
      ),
    });
  if (versaoNova && !estado.sessaoAtual)
    fila.push({
      id: 'versao',
      linha: 'Versão nova do programa.',
      acao: {
        rotulo: 'Atualizar',
        fazer: () => {
          setAntesDeGerar(estado);
          atualizar(regerar);
          setAviso('Programa atualizado com as regras novas.');
        },
      },
      bloco: null,
    });
  // "Montado para um kit típico" (lote M1 da análise crítica, 19/11/2026): o programa saiu na hora, de um atalho de
  // lugar, com pesos que o app supôs. A linha diz isso e leva ao ajuste, enquanto o equipamento for exatamente o do kit
  // e nenhum treino tiver sido feito; depois do 1º treino, a pessoa já esteve diante dos pesos e corrige por lá
  // ("Meus pesos são outros"). Nada é guardado: sai da comparação com o kit (kitTipicoDe).
  const localDoKit = localDoPrograma(estado);
  const kit = estado.historico.some(treinoFeito) ? undefined : kitTipicoDe(localDoKit?.inventario);
  if (kit && localDoKit && !estado.sessaoAtual)
    fila.push({
      id: 'kit',
      linha: `Montado para um kit típico de ${NOME_DO_KIT[kit]}.`,
      acao: { rotulo: 'Ajustar', fazer: () => navigate(`/locais/${localDoKit.id}`) },
      bloco: null,
    });
  if (!volta && !estado.sessaoAtual) {
    if (leve?.ativa) fila.push({ id: 'leve-ativa', linha: <b>Semana leve{leve.ate ? ` até ${dataCurta(leve.ate)}` : ''}</b>, bloco: <SemanaLeve partes={['ativa']} /> });
    if (leve?.mostrar) fila.push({ id: 'leve', linha: <b>Semana leve?</b>, bloco: <SemanaLeve partes={['oferta']} /> });
    if (tempoProposto)
      fila.push({
        id: 'tempo',
        linha: <b>O tempo dos seus treinos</b>,
        bloco: (
          <section className="box volta" aria-labelledby="tempo-real">
            <h2 id="tempo-real">O tempo dos seus treinos</h2>
            <p>
              {tempoProposto.texto}
            </p>
            <p className="ajuda">Com o ajuste, o que cabe nos seus minutos pode mudar; o programa só muda quando você atualizar.</p>
            <div className="opcoes linha">
              <button
                type="button"
                className="btn sec pequeno"
                onClick={() => {
                  atualizar((s) => aceitarMargemTempo(s, tempoProposto.margem, agoraIso()));
                  setAviso('Estimativa ajustada ao seu tempo real.');
                }}
              >
                Ajustar
              </button>
              <button type="button" className="btn sec pequeno" onClick={() => atualizar((s) => recusarMargemTempo(s, agoraIso()))}>
                Não
              </button>
            </div>
          </section>
        ),
      });
    if (opcoes.length > 0 && !estado.ajustes?.recolhido)
      fila.push({
        id: 'ajustes',
        linha: abaixo ? 'Músculos abaixo da meta.' : 'Treino passa do tempo.',
        rotuloVer: 'Ajustar',
        bloco: <Ajustes opcoes={opcoes} escolher={escolher} />,
      });
  }
  const [primeiro, ...outros] = fila;
  const naFolha = primeiro?.acao ? outros : fila;
  // seguranca.alerta.cardiovascular: depois de um sinal de alerta do coração, o treino só volta com a confirmação da avaliação
  const bloqueadoPorAlerta = !estado.sessaoAtual && alertaPendente(estado.historico, estado.respostas?.alertaAvaliadoEm);
  const iniciar = () => {
    atualizar((s) => iniciarSessao(s, agoraIso(), dia.id, localHoje, fusoDoAparelho()));
    navigate('/treino');
  };
  const mostrarVolta = volta && !estado.sessaoAtual;

  return (
    <div className="wrap app com-nav">
      <Topo />
      <main className="conteudo treino">
        <AvisoSalvar />
        <Titulo soLeitor>Seu treino</Titulo>
        {bloqueadoPorAlerta && (
          <section className="caixa-erro pilha" aria-labelledby="bloqueio-alerta">
            <h2 id="bloqueio-alerta">Treino pausado por segurança</h2>
            <p>O último treino foi encerrado por um sinal de alerta do coração. Só volte a treinar depois de uma avaliação.</p>
            <Marcar marcado={avaliado} aoMudar={setAvaliado}>
              Confirmo que fui avaliado e liberado por um médico
            </Marcar>
            <button type="button" className="btn" disabled={!avaliado} onClick={() => atualizar((s) => confirmarAvaliacaoDoAlerta(s, agoraIso()))}>
              Voltar a treinar
            </button>
          </section>
        )}

        <div className="abas" role="tablist" aria-label="Dias de treino">
          {diasDaSemana.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`aba-${d.id}`}
              aria-selected={d === diaDoPrograma}
              aria-controls={d === diaDoPrograma ? `painel-${d.id}` : undefined}
              tabIndex={d === diaDoPrograma ? 0 : -1}
              onClick={() => setDiaSel(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  const n = (i + (e.key === 'ArrowRight' ? 1 : diasDaSemana.length - 1)) % diasDaSemana.length;
                  setDiaSel(n);
                  document.getElementById(`aba-${diasDaSemana[n]!.id}`)?.focus();
                }
              }}
            >
              <b>
                {prefixoAbas && <span className="sr">{prefixoAbas}</span>}
                {d.nome.slice(prefixoAbas.length)}
              </b>
            </button>
          ))}
        </div>

        <section className="cartao-hoje" aria-labelledby="hoje-t">
          {mostrarVolta ? (
            <Volta
              m={volta}
              dia={diaDoPrograma}
              normal={salvo.dias.find((d) => d.id === diaDoPrograma.id) ?? diaDoPrograma}
              respondida={respondeuDepoisDoUltimoTreino(estado.respostas?.voltaLongaEm, estado.historico)}
              refazer={() => {
                atualizar((s) => ({ ...s, respostas: { ...s.respostas, voltaLongaEm: agoraIso() } }));
                navigate('/comecar/nivel?de=programa');
              }}
              agoraNao={() => {
                atualizar((s) => ({ ...s, respostas: { ...s.respostas, voltaLongaEm: agoraIso() } }));
                setAviso('Tudo bem: o programa segue, com a mesma volta leve.');
              }}
            />
          ) : (
            <>
              <h2 id="hoje-t">{dia.nome}</h2>
              <div className="numeros num">
                <div>
                  <b>{dia.exercicios.length}</b>
                  <span className="rotulo">exercícios</span>
                </div>
                <div>
                  <b>~{dia.minutosEstimados}</b>
                  <span className="rotulo">minutos</span>
                </div>
              </div>
            </>
          )}
          {!estado.sessaoAtual && locais.length > 1 && (
            <fieldset className="campo onde-hoje">
              <legend>Onde vou treinar hoje?</legend>
              <div className="opcoes">
                {locais.map((l) => (
                  <button key={l.id} type="button" className="btn sec pequeno" aria-pressed={l.id === localHoje} onClick={() => setLocalHoje(l.id)}>
                    {l.nome}
                  </button>
                ))}
              </div>
              {noLocal && !noLocal.noLocalDoPrograma && (
                <div className="box">
                  <p>
                    <b>Em {nomeLocal}:</b>{' '}
                    {noLocal.trocas.length ? 'o treino muda.' : 'o treino é o mesmo.'}
                  </p>
                  {noLocal.trocas.length > 0 && (
                    <details className="dobra">
                      <summary>{noLocal.trocas.length === 1 ? '1 troca' : `${noLocal.trocas.length} trocas`}</summary>
                      <ul className="trocas-local" aria-label={`Trocas em ${nomeLocal}`}>
                        {noLocal.trocas.map((t) => (
                          <li key={t.vaga}>{t.motivo.charAt(0).toUpperCase() + t.motivo.slice(1)}.</li>
                        ))}
                      </ul>
                      <p className="ajuda">Séries, RIR e descanso continuam os mesmos. Num aparelho novo, a 1ª série acerta a carga.</p>
                    </details>
                  )}
                </div>
              )}
              <Link className="link-sec" to="/locais">
                Meus locais
              </Link>
            </fieldset>
          )}
        </section>

        {resumoSemana && <FaixaSemana r={resumoSemana} />}
        {!estado.sessaoAtual && <SemanaLeve partes={['dor']} />}

        {primeiro && (
          <div className="aviso-linha">
            <p id="aviso-linha-t">{primeiro.linha}</p>
            {primeiro.acao ? (
              <button type="button" className="btn sec pequeno" onClick={primeiro.acao.fazer}>
                {primeiro.acao.rotulo}
              </button>
            ) : (
              <button type="button" className="btn sec pequeno" aria-haspopup="dialog" aria-describedby="aviso-linha-t" onClick={() => setVerAvisos(true)}>
                {primeiro.rotuloVer ?? 'Ver'}
              </button>
            )}
            {primeiro.acao && outros.length > 0 && (
              <button type="button" className="btn ter pequeno" aria-haspopup="dialog" onClick={() => setVerAvisos(true)}>
                {outros.length === 1 ? 'Mais 1 aviso' : `Mais ${outros.length} avisos`}
              </button>
            )}
          </div>
        )}
        {verAvisos && naFolha.length > 0 && (
          <Folha titulo={naFolha.length === 1 && naFolha[0]!.id === 'ajustes' ? 'Ajustes possíveis' : 'Avisos'} aoFechar={() => setVerAvisos(false)}>
            {naFolha.map((a, i) => (
              <div key={a.id} className={naFolha.length === 1 ? 'pilha so-um' : 'pilha'}>
                {i === 1 && naFolha === fila && <h3 className="rotulo">{outros.length === 1 ? 'Mais 1 aviso' : `Mais ${outros.length} avisos`}</h3>}
                {a.bloco}
              </div>
            ))}
          </Folha>
        )}

        <p role="status" className="status">
          {aviso}
        </p>
        {antesDeGerar && !estado.sessaoAtual && (
          <button type="button" className="link-botao desfazer-geracao" onClick={desfazerGeracao}>
            Desfazer
          </button>
        )}
        {versaoNova && estado.sessaoAtual && <p className="ajuda">O programa será atualizado depois do treino em andamento.</p>}

        <section className="painel-dia" role="tabpanel" id={`painel-${dia.id}`} aria-labelledby={`aba-${dia.id}`}>
          <ol className="cartoes-ex">
            {dia.exercicios.map((x) => (
              <LinhaExercicio
                key={x.exId}
                x={x}
                dia={dia.exercicios}
                diaId={dia.id}
                preferidos={estado.preferidos}
                aoPreferir={preferir}
                comHistorico={feitos.has(x.exId)}
              />
            ))}
          </ol>
        </section>

        {/* o convite para instalar (iPhone) vem depois dos exercícios: na 1ª tela, o treino de hoje */}
        <AvisoInstalar />

        {/* o lembrete de cópia (dados.copia). Sessão de textos (16/11/2026): "Como ler o seu treino" e "Sobre o programa"
            saíram daqui e moram em "Entenda o treino" (Meus dados) */}
        {!estado.sessaoAtual && <LembreteCopia estado={estado} />}


        {/* A ação principal fica presa embaixo, acima da barra, em qualquer estado (lote 4; agente 1, 4.2). */}
        {!bloqueadoPorAlerta && (
        <div className="acao-fixa">
          {estado.sessaoAtual ? (
            <Link className="btn" to="/treino">
              Continuar o treino em andamento
            </Link>
          ) : (
            <button type="button" className="btn" onClick={iniciar}>
              {/* um bloco só de texto: o botão é uma linha flexível, e pedaços soltos virariam colunas */}
              <span>
                Começar o treino<span className="sr"> {dia.nome}</span>
                {locais.length > 1 && nomeLocal ? ` em ${nomeLocal}` : ''}
              </span>
            </button>
          )}
        </div>
        )}
      </main>
      <NavInferior atual="treino" />
    </div>
  );
}

type AvisoDaFila = { id: string; linha: ReactNode; bloco: ReactNode; acao?: { rotulo: string; fazer: () => void }; /** o que o botão da linha diz quando abre a folha ("Ver", se nada for dito) */ rotuloVer?: string };

/** O começo comum dos nomes dos dias ("Corpo todo "), que sai das abas para elas caberem a 320 px; o leitor de tela lê o nome inteiro. */
function prefixoComum(nomes: string[]): string {
  if (nomes.length < 2) return '';
  const partes = nomes.map((n) => n.split(' '));
  let k = 0;
  while (partes.every((p) => p.length > k + 1 && p[k] === partes[0]![k])) k++;
  return k ? `${partes[0]!.slice(0, k).join(' ')} ` : '';
}

/** A pessoa já respondeu à proposta depois do último treino (a proposta não volta a cada abertura). */
const respondeuDepoisDoUltimoTreino = (em: string | undefined, historico: Estado['historico']) => {
  const fim = historico.filter(treinoFeito).at(-1)?.fim;
  return !!em && (!fim || Date.parse(em) > Date.parse(fim));
};

/**
 * A volta de uma pausa (readaptacao.durante-uso) é o próprio cartão de hoje (lote 4; agente 1, 4.4): o dia, as séries e a
 * reserva de hoje; a mensagem inteira, com o selo, fica no "por quê?".
 */
function Volta({
  m,
  dia,
  normal,
  respondida,
  refazer,
  agoraNao,
}: {
  m: MensagemDeVolta;
  dia: DiaPrograma;
  normal: DiaPrograma;
  respondida: boolean;
  refazer: () => void;
  agoraNao: () => void;
}) {
  const series = dia.exercicios.reduce((t, x) => t + x.series, 0);
  const total = normal.exercicios.reduce((t, x) => t + x.series, 0);
  const rirs = dia.exercicios.map((x) => x.rir);
  const rir: [number, number] = [Math.min(...rirs.map((x) => x[0])), Math.max(...rirs.map((x) => x[1]))];
  return (
    <>
      <h2 id="hoje-t">{m.titulo}</h2>
      <p className="apoio num">
        <b>{dia.nome}</b> · {dia.exercicios.length} exercícios · ~{dia.minutosEstimados} min
      </p>
      <dl className="volta-numeros">
        <div>
          <dt>Séries no {dia.nome}</dt>
          <dd>
            <span className="barra-volta" aria-hidden="true">
              <i style={{ width: `${Math.round((series / Math.max(1, total)) * 100)}%` }} />
            </span>
            {series} de {total}
          </dd>
        </div>
        <div>
          <dt>Reserva</dt>
          <dd>{faixa(rir)} repetições</dd>
        </div>
      </dl>
      {m.refazerNivel && !respondida && (
        <div className="opcoes linha">
          <button type="button" className="btn sec pequeno" onClick={refazer}>
            Refazer o nível
          </button>
          <button type="button" className="btn sec pequeno" onClick={agoraNao}>
            Agora não
          </button>
        </div>
      )}
    </>
  );
}

function Ajustes({ opcoes, escolher }: { opcoes: Opcao[]; escolher: (o: Opcao) => void }) {
  return (
    <section className="box ajustes" aria-labelledby="ajustes">
      <h2 id="ajustes">Ajustes possíveis</h2>
      <p className="ajuda">
        Tocar numa opção gera o programa de novo.
      </p>
      <ul className="opcoes-ajuste">
        {opcoes.map((o) => (
          <li key={o.id + o.titulo}>
            <button type="button" className="opcao-ajuste com-seta" onClick={() => escolher(o)}>
              <b>{o.titulo}</b>
              <span>{o.texto}</span>
              <Icone nome="chevron-right" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Uma linha da lista do dia: a imagem, o nome e "4 × 8–12" (lote 4; menos texto, seção 15). Um toque abre a folha do
 * exercício, com o resto que antes ficava em "Detalhes": reserva e descanso, o guia, a montagem segura, o porquê com os
 * selos, as alternativas, a preferência e a evolução.
 */
function LinhaExercicio({
  x,
  dia,
  diaId,
  preferidos,
  aoPreferir,
  comHistorico,
}: {
  comHistorico: boolean;
  x: ExercicioPrescrito & { noLugarDe?: string };
  dia: ExercicioPrescrito[];
  diaId: string;
  preferidos?: Record<string, string>;
  aoPreferir: (funcao: string, id: string) => void;
}) {
  const [aberta, setAberta] = useState(false);
  // a resposta do "Prefiro" aparece dentro da folha (a mensagem da página fica atrás do véu)
  const [preferiu, setPreferiu] = useState(false);
  const ex = POR_ID[x.exId];
  const par = x.supersetCom ? dia.find((y) => y.exId === x.supersetCom) : undefined;
  const prescricao = (
    <>
      {x.series} × {faixa(x.reps)}
      {x.unilateral && <small> cada lado</small>}
    </>
  );
  return (
    <li className="cartao-ex">
      <button type="button" className="cartao-ex-corpo" aria-haspopup="dialog" onClick={() => setAberta(true)}>
        <Miniatura animacaoId={x.animacaoId} temTexto={temCartao(x.exId)} />
        <span className="ex-texto">
          <b className="ex-nome">{x.nome}</b>
          <span className="series">{prescricao}</span>
        </span>
        <span className="seta" aria-hidden="true">
          <Icone nome="chevron-right" />
        </span>
      </button>
      {aberta && (
        <Folha titulo={x.nome} aoFechar={() => setAberta(false)}>
          <div className="ex-folha-topo">
            <Miniatura animacaoId={x.animacaoId} temTexto={temCartao(x.exId)} />
            <div>
              <p className="series">{prescricao}</p>
              <p className="sub-rx">
                <span className="nw">RIR {faixa(x.rir)}</span> <span className="nw">· descanso {tempo(x.descansoSeg)}</span>
                {par && <span className="nw"> · bi-set</span>}
                {x.dropSet && <span className="nw"> · última série em drop set</span>}
              </p>
            </div>
          </div>
          {x.animacaoId && (
            <Link className="btn sec" to={linkDoGuia(x.animacaoId, { de: 'programa', diaId, exId: x.exId, vaga: x.noLugarDe })}>
              Ver como fazer
            </Link>
          )}
          {par && <p>Bi-set com {par.nome.toLowerCase()}: alterne os dois e descanse depois da dupla.</p>}
          {!x.animacaoId && ex && !temCartao(x.exId) && (
            <p>
              Sem guia ainda. Trabalha {musculos(ex.musculos.primarios)}
              {ex.musculos.secundarios.length ? `; também ${musculos(ex.musculos.secundarios)}` : ''}. Se não conhece o exercício, prefira uma
              alternativa com guia.
            </p>
          )}
          {!x.animacaoId && <CartaoTexto exId={x.exId} />}
          {/* a montagem segura dos exercícios com travas ou ancoragem fica à vista também aqui (seguranca.montagem) */}
          {x.animacaoId && ex?.tags.includes('montagem') && (
            <Suspense fallback={null}>
              <NotaDoExercicio animacaoId={x.animacaoId} />
            </Suspense>
          )}
          {/* o que se faz na folha (trocar, preferir, ver a evolução) vem antes do que se lê (o porquê) */}
          {x.alternativas.length > 0 && (
            <details className="box dobra">
              <summary>Alternativas ({x.alternativas.length})</summary>
              <Alternativas ids={x.alternativas} diaId={diaId} vaga={x.noLugarDe ?? x.exId} />
              <Preferencias
                funcao={x.funcao}
                atual={x.exId}
                alternativas={x.alternativas}
                preferidos={preferidos}
                aoPreferir={(f, id) => {
                  aoPreferir(f, id);
                  setPreferiu(true);
                }}
              />
            </details>
          )}
          <p role="status" className="status">
            {preferiu ? 'Preferência salva. Ela entra quando você atualizar o programa e nas trocas de local.' : ''}
          </p>
          {comHistorico && (
            <Link className="btn ter" to={`/evolucao/${x.exId}?de=programa`}>
              Ver a evolução deste exercício
            </Link>
          )}
        </Folha>
      )}
    </li>
  );
}

/** Alternativas da mesma função. Sessão de textos (16/11/2026): ficam a um toque, dentro de "Alternativas (N)", todas de uma vez (antes, decisão de 01/11/2026: as 3 melhores à mostra e o resto em "ver mais"). */
function Alternativas({ ids, diaId, vaga }: { ids: string[]; diaId: string; vaga: string }) {
  // cada alternativa numa linha de toque inteira (48 px), com a seta quando leva ao guia dela
  const lista = (xs: string[]) => (
    <ul className="lista-alternativas">
      {xs.map((id) => {
        const alt = POR_ID[id];
        if (!alt) return null;
        return (
          <li key={id}>
            {alt.animacaoId ? (
              <Link to={linkDoGuia(alt.animacaoId, { de: 'programa', diaId, exId: alt.id, vaga })}>
                {alt.nome}
                <Icone nome="chevron-right" />
              </Link>
            ) : (
              <span>{alt.nome}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <div className="alternativas">
      <p className="rotulo">Se o equipamento estiver ocupado</p>
      {lista(ids)}
    </div>
  );
}
