import { useMemo, useState, type ReactNode } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BIBLIOTECA, type Musculo } from '../../domain/biblioteca';
import { ALTERNATIVAS_A_MOSTRA, NOME_MUSCULO, ehAvisoDeMeta, type DiaPrograma, type ExercicioPrescrito, type Programa as TipoPrograma } from '../../domain/gerador';
import { mensagemDeVolta, type MensagemDeVolta } from '../../domain/acompanhamento/volta';
import { opcoesDeAjuste, type Opcao } from '../../domain/gerador/opcoes';
import { NOME_NIVEL } from '../../domain/nivel';
import { avaliarTriagem, efeitoDaDor } from '../../domain/triagem';
import { EFEITO_DA_DOR, NOME_ARTICULACAO } from '../onboarding/articulacoes';
import { proximoDia, treinoFeito } from '../../domain/sessao';
import { linkDoGuia } from '../guia/link';
import { inventarioPrincipal, localDoTreino, perfilDe, primeiroPassoPendente, type Estado } from '../../storage/esquema';
import { alternarPreferencia, diaDoTreino, hojeDoEstado, iniciarSessao } from '../treino/acoes';
import { Preferencias } from './Prefiro';
import { agoraIso, comProgramaNovo, fusoDoAparelho, gerarDoEstado, mesmoConteudo, useApp } from '../app/estado';
import { AvisoInstalar, LembreteCopia } from '../app/avisos';
import { NavInferior, PorQue, Selo, Titulo, Topo } from '../app/ui';
import { ComoLer } from './ComoLer';
import { Folha } from '../app/Folha';
import { Miniatura } from './Miniatura';
import { FaixaSemana } from '../acompanhamento/Semana';
import { SemanaLeve } from '../acompanhamento/SemanaLeve';
import { aceitarMargemTempo, recusarMargemTempo, semanaDoEstado, semanaLeveDoEstado, tempoDoEstado } from '../acompanhamento/acoes';
import { CartaoTexto, temCartao } from './CartaoTexto';
import { ComoEsta } from './ComoEsta';
import type { Perfil } from '../../domain/gerador';
import type { Inventario } from '../../domain/taxonomia/equipamentos';

// Tela do treino: vai direto ao que importa (o treino de cada dia, com a imagem de cada exercício e
// séries × repetições em destaque). Ajustes, avisos e o porquê ficam um toque abaixo. Nada muda sem a escolha da pessoa.

const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const tempo = (seg: number) => (seg % 60 ? `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}` : `${seg / 60} min`);
const faixa = ([a, b]: [number, number]) => (a === b ? `${a}` : `${a}–${b}`);
const musculos = (ms: readonly Musculo[]) => ms.map((m) => NOME_MUSCULO[m]).join(', ');
const dataCurta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

export function Programa() {
  const { estado, atualizar } = useApp();
  const [aviso, setAviso] = useState('');
  const navigate = useNavigate();
  const [diaSel, setDiaSel] = useState(() => {
    const p = estado.programa?.programa;
    return p ? Math.max(0, p.dias.findIndex((d) => d.id === proximoDia(p, estado.historico).id)) : 0;
  });
  // a folha dos avisos ("Ver" na linha do aviso, ou "Ver ajustes possíveis" em "Sobre o programa")
  const [verAvisos, setVerAvisos] = useState(false);
  // "Onde vou treinar hoje?" (R1b): o último local usado vem lembrado; a escolha continua visível.
  const [localHoje, setLocalHoje] = useState(() => localDoTreino(estado)?.id);
  const perfil = useMemo(() => perfilDe(estado), [estado]);
  const inventario = inventarioPrincipal(estado);
  const opcoes = useMemo(() => (perfil && inventario ? opcoesDeAjuste(perfil, inventario) : []), [perfil, inventario]);
  const atualizado = useMemo(() => gerarDoEstado(estado), [estado]);

  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;

  const triagem = avaliarTriagem(perfil!.triagem);
  const salvo = estado.programa?.programa;

  if (triagem.bloqueado || !salvo) {
    return (
      <div className="wrap app">
        <Topo direita={<Link to="/dados">Meus dados</Link>} />
        <main className="conteudo">
          <Titulo>Programa pausado</Titulo>
          <div className="warnbox">
            {triagem.mensagem} <Selo id={triagem.regraId} />
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

  const escolher = (o: Opcao) => {
    setVerAvisos(false);
    if (o.id === 'manter') {
      atualizar((s) => ({ ...s, ajustes: { recolhido: true } }));
      setAviso('Programa mantido.');
      return;
    }
    atualizar((s) =>
      regerar({
        ...s,
        rotina: {
          diasSemana: o.perfil.diasSemana,
          // A divisão escolhida só vale para o mesmo número de dias (divisao.recomendacao).
          ...(o.perfil.divisao ? { divisao: o.perfil.divisao } : {}),
          minutosSessao: o.perfil.minutosSessao,
          prioridades: o.perfil.prioridades,
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
  const semana = hoje.semana;
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
  const faseAtual = salvo.fases[0];
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
            Pela triagem <Selo id="seguranca.dor.programa" />
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
  if (versaoNova)
    fila.push({
      id: 'versao',
      linha: 'Há uma versão nova do seu programa.',
      acao: {
        rotulo: 'Atualizar',
        fazer: () => {
          atualizar(regerar);
          setAviso('Programa atualizado com as regras novas.');
        },
      },
      bloco: null,
    });
  if (!volta && !estado.sessaoAtual) {
    if (leve?.ativa) fila.push({ id: 'leve-ativa', linha: <b>Semana leve{leve.ate ? ` até ${dataCurta(leve.ate)}` : ''}</b>, bloco: <SemanaLeve partes={['ativa']} /> });
    if (leve?.mostrar) fila.push({ id: 'leve', linha: <b>Semana leve? (opcional)</b>, bloco: <SemanaLeve partes={['oferta']} /> });
    if (tempoProposto)
      fila.push({
        id: 'tempo',
        linha: <b>O tempo dos seus treinos</b>,
        bloco: (
          <section className="box volta" aria-labelledby="tempo-real">
            <h2 id="tempo-real">O tempo dos seus treinos</h2>
            <p>
              {tempoProposto.texto} <Selo id={tempoProposto.regraId} />
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
        linha: `${abaixo ? 'Alguns músculos ficaram abaixo da meta.' : 'Algum treino passa do tempo.'} Dá para ajustar.`,
        bloco: <Ajustes opcoes={opcoes} escolher={escolher} />,
      });
  }
  const [primeiro, ...outros] = fila;
  const naFolha = primeiro?.acao ? outros : fila;
  const iniciar = () => {
    atualizar((s) => iniciarSessao(s, agoraIso(), dia.id, localHoje, fusoDoAparelho()));
    navigate('/treino');
  };
  const mostrarVolta = volta && !estado.sessaoAtual;

  return (
    <div className="wrap app com-nav">
      <Topo />
      <main className="conteudo treino">
        <Titulo>Seu treino</Titulo>

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
              <p className="rotulo">Hoje</p>
              <h2 id="hoje-t">{dia.nome}</h2>
              <p className="apoio num">
                {dia.exercicios.length} exercícios · ~{dia.minutosEstimados} min
              </p>
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
                    {noLocal.trocas.length ? 'o que muda neste treino.' : 'tudo do programa é possível aqui.'} <Selo id="local.treino-do-dia" />
                  </p>
                  {noLocal.trocas.length > 0 && (
                    <ul className="trocas-local" aria-label={`Trocas em ${nomeLocal}`}>
                      {noLocal.trocas.map((t) => (
                        <li key={t.vaga}>{t.motivo.charAt(0).toUpperCase() + t.motivo.slice(1)}.</li>
                      ))}
                    </ul>
                  )}
                  <p className="ajuda">Séries, RIR e descanso de cada vaga continuam os mesmos. Num aparelho novo, a 1ª série acerta a carga.</p>
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
            <p>{primeiro.linha}</p>
            {primeiro.acao ? (
              <button type="button" className="btn sec pequeno" onClick={primeiro.acao.fazer}>
                {primeiro.acao.rotulo}
              </button>
            ) : (
              <button type="button" className="btn sec pequeno" aria-haspopup="dialog" onClick={() => setVerAvisos(true)}>
                Ver
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
          <Folha titulo="Avisos" aoFechar={() => setVerAvisos(false)}>
            {naFolha.map((a, i) => (
              <div key={a.id} className="pilha">
                {i === 1 && naFolha === fila && <h3 className="rotulo">{outros.length === 1 ? 'Mais 1 aviso' : `Mais ${outros.length} avisos`}</h3>}
                {a.bloco}
              </div>
            ))}
          </Folha>
        )}

        <p role="status" className="status">
          {aviso}
        </p>
        <AvisoInstalar />

        <div className="abas" role="tablist" aria-label="Dias de treino">
          {diasDaSemana.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`aba-${d.id}`}
              aria-selected={d === diaDoPrograma}
              aria-controls={`painel-${d.id}`}
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
              {prefixoAbas && <span className="sr">{prefixoAbas}</span>}
              {d.nome.slice(prefixoAbas.length)}
            </button>
          ))}
        </div>

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

        {/* R5c (B2; treino.leitura): o vocabulário do treino, aberto até o 1º treino; e o lembrete de cópia (dados.copia) */}
        <ComoLer aberto={!estado.historico.some((h) => h.fim)} iniciante={perfil!.nivel === 'iniciante'} />
        {!estado.sessaoAtual && <LembreteCopia estado={estado} />}

        <Sobre
          programa={salvo}
          perfil={perfil!}
          inventario={inventario}
          semana={semana}
          fase={hoje.fase ?? faseAtual}
          reabrirAjustes={
            opcoes.length > 0 && !!estado.ajustes?.recolhido
              ? () => {
                  atualizar((s) => ({ ...s, ajustes: { recolhido: false } }));
                  setVerAvisos(true);
                }
              : undefined
          }
        />

        {/* A ação principal fica presa embaixo, acima da barra, em qualquer estado (lote 4; agente 1, 4.2). */}
        <div className="acao-fixa">
          {estado.sessaoAtual ? (
            <Link className="btn" to="/treino">
              Continuar o treino em andamento
            </Link>
          ) : (
            <button type="button" className="btn" onClick={iniciar}>
              Começar o treino {dia.nome}
              {locais.length > 1 && nomeLocal ? ` em ${nomeLocal}` : ''}
            </button>
          )}
        </div>
      </main>
      <NavInferior atual="treino" />
    </div>
  );
}

type AvisoDaFila = { id: string; linha: ReactNode; bloco: ReactNode; acao?: { rotulo: string; fazer: () => void } };

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
      <p className="apoio">
        <PorQue regras={[m.regraId]} titulo={m.titulo}>
          <p>{m.texto}</p>
        </PorQue>
      </p>
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
        Toque numa opção para gerar o programa de novo. Nada muda sem a sua escolha. <Selo id="tempo.corte" />
      </p>
      <ul className="opcoes-ajuste">
        {opcoes.map((o) => (
          <li key={o.id + o.titulo}>
            <button type="button" className="opcao-ajuste" onClick={() => escolher(o)}>
              <b>{o.titulo}</b>
              <span>{o.texto}</span>
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
          ›
        </span>
      </button>
      {aberta && (
        <Folha titulo={x.nome} aoFechar={() => setAberta(false)}>
          <div className="ex-folha-topo">
            <Miniatura animacaoId={x.animacaoId} temTexto={temCartao(x.exId)} />
            <div>
              <p className="series">{prescricao}</p>
              <p className="sub-rx">
                RIR {faixa(x.rir)} · descanso {tempo(x.descansoSeg)}
                {par && ' · bi-set'}
                {x.dropSet && ' · última série em drop set'}
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
          <h3 className="rotulo">Por que este exercício</h3>
          <ul className="lista">
            {x.porque.map((q) => (
              <li key={q.regraId}>
                {q.texto} <Selo id={q.regraId} />
              </li>
            ))}
          </ul>
          {x.alternativas.length > 0 && <Alternativas ids={x.alternativas} diaId={diaId} vaga={x.noLugarDe ?? x.exId} />}
          <Preferencias funcao={x.funcao} atual={x.exId} alternativas={x.alternativas} preferidos={preferidos} aoPreferir={aoPreferir} />
          {comHistorico && (
            <Link className="btn ter" to={`/evolucao/${x.exId}`}>
              Ver a evolução deste exercício
            </Link>
          )}
        </Folha>
      )}
    </li>
  );
}

/** "Sobre o programa" (lote 4): o resumo da rotina, a fase, os avisos e o porquê, numa folha a um toque. */
function Sobre({
  programa,
  perfil,
  inventario,
  semana,
  fase,
  reabrirAjustes,
}: {
  programa: TipoPrograma;
  perfil: Perfil;
  inventario: Inventario | null | undefined;
  semana: number;
  fase?: TipoPrograma['fases'][number];
  reabrirAjustes?: () => void;
}) {
  const [aberta, setAberta] = useState(false);
  const linhas = (Object.entries(programa.metas) as [Musculo, number][]).map(([m, meta]) => ({ m, meta, v: programa.volumeSemanal[m] ?? 0 }));
  return (
    <>
      <button type="button" className="linha-sobre" aria-haspopup="dialog" onClick={() => setAberta(true)}>
        Sobre o programa
        <span className="seta" aria-hidden="true">
          ›
        </span>
      </button>
      {aberta && (
        <Folha titulo="Sobre o programa" aoFechar={() => setAberta(false)}>
          <ul className="fichas" aria-label="Resumo">
            <li>{perfil.diasSemana}x por semana</li>
            <li>até {perfil.minutosSessao} min</li>
            <li>{NOME_NIVEL[perfil.nivel]}</li>
          </ul>
          {fase && (
            <p className="fase">
              <b>Você está na semana {semana}.</b> {fase.texto} <Selo id={fase.regraId} />
            </p>
          )}
          <p>
            <b>{programa.divisao}.</b>
          </p>
          {inventario && <ComoEsta programa={programa} perfil={perfil} inventario={inventario} />}
          {programa.avisos.length > 0 && <h3>Avisos</h3>}
          {programa.avisos.map((a, i) => (
            <div key={i} className="warnbox">
              {a.texto} <Selo id={a.regraId} />
            </div>
          ))}
          {programa.fases.length > 0 && (
            <>
              <h3>Fases</h3>
              <ul className="lista">
                {programa.fases.map((f) => (
                  <li key={f.semanas}>
                    <b>{/^\d/.test(f.semanas) ? `Semana ${f.semanas}` : f.semanas}:</b> {f.texto} <Selo id={f.regraId} />
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3>Por que este programa</h3>
          <ul className="lista">
            {programa.porque.map((q) => (
              <li key={q.regraId}>
                {q.texto} <Selo id={q.regraId} />
              </li>
            ))}
          </ul>
          <h3>Séries por músculo na semana</h3>
          <p className="ajuda">
            Séries indiretas contam como meia série. <Selo id="volume.serie-indireta.peso" />
          </p>
          <table className="vol">
            <thead>
              <tr>
                <th scope="col">Músculo</th>
                <th scope="col">Meta</th>
                <th scope="col">Programa</th>
              </tr>
            </thead>
            <tbody>
              {linhas.map(({ m, meta, v }) => (
                <tr key={m} className={v < meta ? 'abaixo' : undefined}>
                  <th scope="row">{NOME_MUSCULO[m]}</th>
                  <td>{meta}</td>
                  <td>
                    {v.toLocaleString('pt-BR')}
                    {v < meta && <span className="sr"> (abaixo da meta)</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reabrirAjustes && (
            <button
              type="button"
              className="btn sec"
              onClick={() => {
                setAberta(false);
                reabrirAjustes();
              }}
            >
              Ver ajustes possíveis
            </button>
          )}
        </Folha>
      )}
    </>
  );
}

/** Alternativas da mesma função: as 3 melhores à mostra e o resto em "ver mais" (decisão de 01/11/2026). */
function Alternativas({ ids, diaId, vaga }: { ids: string[]; diaId: string; vaga: string }) {
  const nome = (id: string) => {
    const alt = POR_ID[id];
    if (!alt) return null;
    return alt.animacaoId ? (
      <Link to={linkDoGuia(alt.animacaoId, { de: 'programa', diaId, exId: alt.id, vaga })}>{alt.nome.toLowerCase()}</Link>
    ) : (
      alt.nome.toLowerCase()
    );
  };
  const lista = (xs: string[]) =>
    xs.map((id, i) => (
      <span key={id}>
        {i > 0 && (i === xs.length - 1 ? ' ou ' : ', ')}
        {nome(id)}
      </span>
    ));
  const [mostra, resto] = [ids.slice(0, ALTERNATIVAS_A_MOSTRA), ids.slice(ALTERNATIVAS_A_MOSTRA)];
  return (
    <div className="alternativas">
      <p>Se o equipamento estiver ocupado: {lista(mostra)}.</p>
      {resto.length > 0 && (
        <details className="ver-mais">
          <summary>Ver mais {resto.length === 1 ? '1 opção' : `${resto.length} opções`}</summary>
          <p>{lista(resto)}.</p>
        </details>
      )}
    </div>
  );
}
