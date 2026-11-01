import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BIBLIOTECA } from '../../domain/biblioteca';
import { ALTERNATIVAS_A_MOSTRA, type ExercicioPrescrito } from '../../domain/gerador';
import { linkDoGuia } from '../guia/link';
import { ESCADA_PESO_CORPO, type Carga, type SerieRegistrada } from '../../domain/progressao';
import { MENOR_ANILHA_PADRAO_KG } from '../../domain/taxonomia/equipamentos';
import { CartaoTexto } from '../programa/CartaoTexto';
import {
  avaliarSerieDeCalibracao,
  calibracaoNaSessao,
  opcoesCarga,
  precisaAquecer,
  prescricaoDaVaga,
  REGRA_AQUECIMENTO,
  sugestaoDoExercicio,
  textoCarga,
  ultimaSerie,
  type OpcoesSugestao,
} from '../../domain/sessao';
import { FUNCAO } from '../../domain/gerador/funcoes';
import type { Inventario } from '../../domain/taxonomia/equipamentos';
import { avaliarDor, avaliarSinal, type Sinal } from '../../domain/triagem';
import type { Estado } from '../../storage/esquema';
import { agoraIso, useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';
import { Miniatura } from '../programa/Miniatura';
import { alternarPreferencia, desfazerSerie, diaDoTreino, interromperExercicio, inventarioDoTreino, opcoesDaCarga, registrarSerie, terminarSessao, trocarExercicio } from './acoes';
import { PainelDescanso, useDescanso } from './Temporizador';

// Treino em andamento: um exercício por vez, séries registradas com um toque, descanso entre séries,
// troca pela alternativa e o botão "Senti algo" (dor e sinais de alerta). Decisões: docs/pesquisa/10-decisoes-m5.md.

const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const faixa = ([a, b]: [number, number]) => (a === b ? `${a}` : `${a}–${b}`);
const tempo = (seg: number) => (seg % 60 ? `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}` : `${seg / 60} min`);
const RIRS = [0, 1, 2, 3, 4] as const;

/** Prescrição de um item da sessão: a do programa, ou a da vaga que a alternativa ocupou. */
type Item = { x: ExercicioPrescrito; feito: { exId: string; series: SerieRegistrada[]; interrompido?: boolean; noLugarDe?: string } };

export function Treino() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const descanso = useDescanso();
  const sessao = estado.sessaoAtual;
  const programa = estado.programa?.programa;
  // O dia no local do treino (local.treino-do-dia): as vagas que não são possíveis ali já vêm trocadas, com o motivo.
  const doTreino = useMemo(() => (sessao ? diaDoTreino(estado, sessao) : null), [estado, sessao]);
  const dia = doTreino?.dia ?? null;
  const vagaDe = (exId: string) => dia?.exercicios.find((x) => (x.noLugarDe ?? x.exId) === exId);
  // Ao voltar para um treino em andamento, abre o primeiro exercício que ainda não terminou.
  const [indice, setIndice] = useState(() => {
    const meta = (exId: string) => vagaDe(exId)?.series ?? 1;
    const i = sessao?.exercicios.findIndex((e) => !e.interrompido && e.series.length < meta(e.noLugarDe ?? e.exId)) ?? 0;
    return Math.max(0, i);
  });
  const [painel, setPainel] = useState<'nenhum' | 'trocar' | 'sentir'>('nenhum');
  const [aviso, setAviso] = useState<{ texto: string; regraId: string } | null>(null);
  if (!sessao || !programa || !dia || !doTreino) return <Navigate to="/programa" replace />;
  const inventario = inventarioDoTreino(estado, sessao);
  const opcoesCargaHoje = opcoesDaCarga(estado, sessao);

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

  const irPara = (n: number) => {
    setIndice(n);
    setPainel('nenhum');
    setAviso(null);
    window.scrollTo?.(0, 0);
  };
  const terminar = (porAlerta = false) => {
    descanso.parar();
    atualizar((s) => terminarSessao(s, agoraIso(), porAlerta));
    navigate('/treino/fim', { replace: true });
  };
  const feita = (serie: SerieRegistrada) => {
    // Série de acerto da calibração (progressao.calibracao): fica no histórico, fora da dupla progressão.
    const cal = calibracaoNaSessao(estado.historico, x, inventario, feito.series, opcoesCargaHoje);
    const acerto = cal.calibrando && !avaliarSerieDeCalibracao(serie, x, inventario, opcoesCargaHoje).perto;
    atualizar((s) => registrarSerie(s, i, acerto ? { ...serie, calibracao: true } : serie));
    if (feito.series.length + 1 < x.series) descanso.iniciar(x.descansoSeg);
    else if (!ultimo) descanso.iniciar(x.descansoSeg);
  };

  return (
    <div className="wrap app">
      <Topo
        direita={
          <button type="button" className="link-sec" onClick={() => terminar()}>
            Terminar treino
          </button>
        }
      />
      <main className="conteudo sessao">
        <div className="progresso">
          <span>
            {dia.nome} · exercício {i + 1} de {itens.length}
          </span>
          <div className="barra" aria-hidden="true">
            <i style={{ width: `${((i + (completo ? 1 : 0)) / itens.length) * 100}%` }} />
          </div>
        </div>

        <div className="ex-sessao">
          <Miniatura animacaoId={x.animacaoId} />
          <div>
            <Titulo>{x.nome}</Titulo>
            <p className="meta">
              Meta: {x.series} × {faixa(x.reps)}
              {x.unilateral ? ' (cada lado)' : ''} · RIR {faixa(x.rir)}
              {x.dropSet && (
                <>
                  {' '}
                  · última série em drop set <Selo id="tempo.drop-set" />
                </>
              )}
            </p>
            {x.animacaoId && (
              <Link className="link-guia" to={linkDoGuia(x.animacaoId, { de: 'treino', diaId: sessao.diaId, exId: x.exId, vaga: feito.noLugarDe })}>
                Ver como fazer
              </Link>
            )}
          </div>
        </div>
        {!x.animacaoId && <CartaoTexto exId={x.exId} />}
        {trocaDoLocal ? (
          <p className="ajuda troca-local">
            Neste local, {trocaDoLocal.motivo}. <Selo id={trocaDoLocal.regraId} />
          </p>
        ) : (
          feito.noLugarDe && <p className="ajuda">No lugar de {POR_ID[feito.noLugarDe]?.nome.toLowerCase()}, só neste treino.</p>
        )}

        {feito.series.length === 0 && <Sugestao x={x} estado={estado} inventario={inventario} opcoes={opcoesCargaHoje} />}
        {precisaAquecer(dia, dia.exercicios.findIndex((y) => y === vaga)) && feito.series.length === 0 && (
          <p className="fase">
            Antes: 1–2 séries leves de aquecimento, sem contar. <Selo id={REGRA_AQUECIMENTO} />
          </p>
        )}

        {feito.series.length > 0 && (
          <ol className="series-feitas" aria-label="Séries feitas">
            {feito.series.map((s, n) => (
              <li key={n}>
                <span className="n">{n + 1}</span> {textoCarga(s.carga, feito.exId)} × {s.reps} · RIR {s.rir === 4 ? '4+' : s.rir}
                {s.calibracao ? ' · acerto da carga' : ''}
                {s.dor ? ` · dor ${s.dor}` : ''}
                {s.quedas?.length ? ` · quedas: ${s.quedas.map((q) => `${textoCarga(q.carga, feito.exId)} × ${q.reps}`).join(', ')}` : ''}
              </li>
            ))}
            <li>
              <button type="button" className="link-sec" onClick={() => atualizar((s) => desfazerSerie(s, i))}>
                Desfazer a última série
              </button>
            </li>
          </ol>
        )}

        {aviso && (
          <div className="warnbox" role="alert">
            {aviso.texto} <Selo id={aviso.regraId} />
          </div>
        )}

        {feito.interrompido ? (
          <div className="warnbox">
            Exercício encerrado. Se quiser, troque pela alternativa abaixo ou siga para o próximo.
          </div>
        ) : !completo ? (
          <RegistroSerie
            key={`${i}-${feito.exId}-${feito.series.length}`}
            x={x}
            numero={feito.series.length + 1}
            anteriores={feito.series}
            aoFazer={feita}
            estado={estado}
            inventario={inventario}
            opcoes={opcoesCargaHoje}
          />
        ) : (
          <p className="status-ok">Séries completas.</p>
        )}

        <div className="acoes-sessao">
          <button type="button" className="btn sec pequeno" aria-expanded={painel === 'trocar'} onClick={() => setPainel(painel === 'trocar' ? 'nenhum' : 'trocar')}>
            Trocar exercício
          </button>
          <button type="button" className="btn sec pequeno alerta" aria-expanded={painel === 'sentir'} onClick={() => setPainel(painel === 'sentir' ? 'nenhum' : 'sentir')}>
            Senti algo
          </button>
        </div>

        {painel === 'trocar' && (
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
        )}
        {painel === 'sentir' && (
          <Sentir
            aoDor={(nota) => {
              const r = avaliarDor(nota);
              setAviso({ texto: r.mensagem, regraId: r.regraId });
              if (r.acao === 'encerrar-exercicio') {
                atualizar((s) => interromperExercicio(s, i));
                descanso.parar();
                setPainel('trocar');
              } else setPainel('nenhum');
            }}
            aoSinal={(sinal) => {
              const r = avaliarSinal(sinal);
              if (r.acao === 'encerrar-sessao') {
                terminar(true);
                return;
              }
              setAviso({ texto: r.mensagem, regraId: r.regraId });
              atualizar((s) => interromperExercicio(s, i));
              descanso.parar();
              setPainel('trocar');
            }}
          />
        )}

        <nav className="nav-sessao" aria-label="Exercícios">
          <button type="button" className="btn sec" disabled={i === 0} onClick={() => irPara(i - 1)}>
            ‹ Anterior
          </button>
          {ultimo ? (
            <button type="button" className="btn" onClick={() => terminar()}>
              Terminar treino
            </button>
          ) : (
            <button type="button" className={completo ? 'btn' : 'btn sec'} onClick={() => irPara(i + 1)}>
              Próximo ›
            </button>
          )}
        </nav>
      </main>
      <PainelDescanso d={descanso} />
    </div>
  );

}

function Sugestao({ x, estado, inventario, opcoes }: { x: ExercicioPrescrito; estado: Estado; inventario: Inventario; opcoes: OpcoesSugestao }) {
  const s = sugestaoDoExercicio(estado.historico, x, inventario, opcoes);
  // 1ª vez (ou 1ª vez nesta máquina neste local): calibração na 1ª série (progressao.calibracao).
  if (s.acao === 'calibrar' && !s.proxima)
    return (
      <div className="sugestao calibracao">
        <b>Calibração da carga</b>
        <span>
          {s.motivo} A meta é {faixa(x.reps)} repetições com {faixa(x.rir)} de reserva. <Selo id={s.regraId} />
        </span>
      </div>
    );
  return (
    <div className="sugestao">
      <b>{s.proxima ? `Hoje: ${textoCarga(s.proxima, x.exId)}` : 'Hoje: mesma carga'}</b>
      <span>
        {s.motivo} <Selo id={s.regraId} />
      </span>
    </div>
  );
}

function RegistroSerie({
  x,
  numero,
  anteriores,
  aoFazer,
  estado,
  inventario,
  opcoes,
}: {
  x: ExercicioPrescrito;
  numero: number;
  anteriores: SerieRegistrada[];
  aoFazer: (s: SerieRegistrada) => void;
  estado: Estado;
  inventario: Inventario;
  opcoes: OpcoesSugestao;
}) {
  const op = opcoesCarga(x.exId, inventario);
  const cal = calibracaoNaSessao(estado.historico, x, inventario, anteriores, opcoes);
  const ultima = anteriores.at(-1) ?? ultimaSerie(estado.historico, x.exId, opcoes.local);
  const sugerida = anteriores.length === 0 ? sugestaoDoExercicio(estado.historico, x, inventario, opcoes).proxima : cal.ultima?.proxima;
  const cargaInicial: Carga | undefined =
    (sugerida && sugerida.tipo === op.registro ? sugerida : undefined) ??
    (ultima && ultima.carga.tipo === op.registro ? ultima.carga : undefined) ??
    (op.registro === 'degrau' ? { tipo: 'degrau', degrau: 0 } : undefined);
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

  return (
    <section className="registro" aria-label={`Série ${numero}`}>
      <h2>
        Série {numero} de {x.series}
      </h2>
      {cal.calibrando && cal.ultima && (
        <p className="fase calibracao" role="status">
          Calibração: {cal.ultima.motivo} <Selo id={cal.ultima.regraId} />
        </p>
      )}
      <ControleCarga registro={op.registro} cargas={op.lista} placasMax={op.placasMax} menorAnilhaKg={op.menorAnilhaKg} valor={carga} aoMudar={setCarga} />
      <div className="linha-registro">
        <span className="rotulo-curto" id={`reps-${numero}`}>
          Repetições{x.unilateral ? ' (cada lado)' : ''}
        </span>
        <div className="stepper" role="group" aria-labelledby={`reps-${numero}`}>
          <button type="button" aria-label="Menos uma repetição" disabled={reps <= 0} onClick={() => setReps((r) => Math.max(0, r - 1))}>
            −
          </button>
          <output aria-live="polite">{reps}</output>
          <button type="button" aria-label="Mais uma repetição" onClick={() => setReps((r) => r + 1)}>
            +
          </button>
        </div>
      </div>
      <fieldset className="campo">
        <legend>Quantas repetições ainda conseguiria? (RIR)</legend>
        <p className="ajuda">A maioria das pessoas acha que tem menos reserva do que tem. <Selo id="rir.leitura" /></p>
        <div className="chips-valor">
          {RIRS.map((n) => (
            <label key={n} className="chip-valor">
              <input type="radio" name={`rir-${numero}`} checked={rir === n} onChange={() => setRir(n)} />
              <span>{n === 4 ? '4 ou mais' : n}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {comQuedas && (
        <fieldset className="campo quedas">
          <legend>Drop set (opcional)</legend>
          <p className="ajuda">
            Logo depois da série, sem descansar: tire cerca de 20–30% da carga e faça mais repetições; repita uma vez. Anote as quedas se quiser.
            <Selo id="tempo.drop-set" />
          </p>
          {quedas.map((q, n) => (
            <div key={n} className="queda">
              <span className="rotulo-curto">Queda {n + 1}</span>
              <ControleCarga
                registro={op.registro}
                cargas={op.lista}
                placasMax={op.placasMax}
                menorAnilhaKg={op.menorAnilhaKg}
                valor={q.carga}
                aoMudar={(c) => setQuedas((qs) => qs.map((y, k) => (k === n ? { ...y, carga: c } : y)))}
              />
              <div className="stepper" role="group" aria-label={`Repetições da queda ${n + 1}`}>
                <button
                  type="button"
                  aria-label={`Menos uma repetição na queda ${n + 1}`}
                  disabled={q.reps <= 0}
                  onClick={() => setQuedas((qs) => qs.map((y, k) => (k === n ? { ...y, reps: Math.max(0, y.reps - 1) } : y)))}
                >
                  −
                </button>
                <output aria-live="polite">{q.reps}</output>
                <button
                  type="button"
                  aria-label={`Mais uma repetição na queda ${n + 1}`}
                  onClick={() => setQuedas((qs) => qs.map((y, k) => (k === n ? { ...y, reps: y.reps + 1 } : y)))}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </fieldset>
      )}
      <button
        type="button"
        className="btn"
        disabled={!pronto}
        onClick={() => carga && rir !== undefined && aoFazer({ carga, reps, rir, ...(comQuedas && quedasFeitas.length ? { quedas: quedasFeitas } : {}) })}
      >
        Série feita · descansar {tempo(x.descansoSeg)}
      </button>
    </section>
  );
}

function ControleCarga({
  registro,
  cargas,
  placasMax,
  menorAnilhaKg,
  valor,
  aoMudar,
}: {
  registro: Carga['tipo'];
  cargas?: number[];
  placasMax?: number;
  menorAnilhaKg?: number;
  valor: Carga | undefined;
  aoMudar: (c: Carga) => void;
}) {
  if (registro === 'anilha') {
    // progressao.incremento.maquina-anilha: kg de anilhas de cada lado, de menor anilha em menor anilha.
    const k = valor?.tipo === 'anilha' ? valor.kgPorLado : undefined;
    const passo = menorAnilhaKg ?? MENOR_ANILHA_PADRAO_KG;
    const mudar = (dir: 1 | -1) => aoMudar({ tipo: 'anilha', kgPorLado: Math.max(0, Math.round(((k ?? 0) + dir * passo) * 100) / 100) });
    return (
      <div className="linha-registro">
        <span className="rotulo-curto" id="carga-rotulo">
          Anilhas por lado
        </span>
        <div className="stepper" role="group" aria-labelledby="carga-rotulo">
          <button type="button" aria-label="Menos anilha de cada lado" disabled={k === undefined || k <= 0} onClick={() => mudar(-1)}>
            −
          </button>
          <output aria-live="polite">{k === undefined ? '—' : `${k.toLocaleString('pt-BR')} kg`}</output>
          <button type="button" aria-label="Mais anilha de cada lado" onClick={() => mudar(1)}>
            +
          </button>
        </div>
        <p className="ajuda">Sem contar o peso do trenó ou da barra da máquina.</p>
      </div>
    );
  }
  if (registro === 'contrapeso') {
    // progressao.incremento.assistido: mais placa = mais ajuda (fica mais fácil).
    const p = valor?.tipo === 'contrapeso' ? valor.placa : undefined;
    const max = placasMax ?? 30;
    return (
      <div className="linha-registro">
        <span className="rotulo-curto" id="carga-rotulo">
          Contrapeso (placa)
        </span>
        <div className="stepper" role="group" aria-labelledby="carga-rotulo">
          <button type="button" aria-label="Menos contrapeso (mais difícil)" disabled={!p || p <= 1} onClick={() => p && aoMudar({ tipo: 'contrapeso', placa: p - 1 })}>
            −
          </button>
          <output aria-live="polite">{p ?? '—'}</output>
          <button type="button" aria-label="Mais contrapeso (mais fácil)" disabled={!!p && p >= max} onClick={() => aoMudar({ tipo: 'contrapeso', placa: (p ?? 0) + 1 })}>
            +
          </button>
        </div>
        <p className="ajuda">Aqui é ao contrário: mais placa = mais ajuda. Para progredir, tire uma placa.</p>
      </div>
    );
  }
  if (registro === 'degrau') {
    const d = valor?.tipo === 'degrau' ? valor.degrau : 0;
    return (
      <label className="campo">
        <span className="rotulo-curto">Dificuldade</span>
        <select value={d} onChange={(e) => aoMudar({ tipo: 'degrau', degrau: Number(e.target.value) })}>
          {ESCADA_PESO_CORPO.map((t, n) => (
            <option key={n} value={n}>
              {t[0]!.toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </label>
    );
  }
  if (registro === 'placa') {
    const p = valor?.tipo === 'placa' ? valor.placa : undefined;
    const max = placasMax ?? 30;
    return (
      <div className="linha-registro">
        <span className="rotulo-curto" id="carga-rotulo">
          Placa
        </span>
        <div className="stepper" role="group" aria-labelledby="carga-rotulo">
          <button type="button" aria-label="Placa anterior" disabled={!p || p <= 1} onClick={() => p && aoMudar({ tipo: 'placa', placa: p - 1 })}>
            −
          </button>
          <output aria-live="polite">{p ?? '—'}</output>
          <button type="button" aria-label="Próxima placa" disabled={!!p && p >= max} onClick={() => aoMudar({ tipo: 'placa', placa: (p ?? 0) + 1 })}>
            +
          </button>
        </div>
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
    <div className="linha-registro">
      <label className="rotulo-curto" htmlFor="carga-kg">
        Carga
      </label>
      <div className="stepper">
        <button type="button" aria-label="Menos carga" disabled={k === undefined || (lista ? k <= lista[0]! : k <= 0)} onClick={() => passo(-1)}>
          −
        </button>
        {lista ? (
          <select id="carga-kg" value={k ?? ''} onChange={(e) => aoMudar({ tipo: 'kg', kg: Number(e.target.value) })}>
            <option value="" disabled>
              Escolha
            </option>
            {lista.map((v) => (
              <option key={v} value={v}>
                {v.toLocaleString('pt-BR')} kg
              </option>
            ))}
          </select>
        ) : (
          <output id="carga-kg" aria-live="polite">
            {k === undefined ? '—' : `${k.toLocaleString('pt-BR')} kg`}
          </output>
        )}
        <button type="button" aria-label="Mais carga" onClick={() => passo(1)}>
          +
        </button>
      </div>
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
      <BotaoPrefiro funcao={funcao} id={id} atual={atual} preferidos={preferidos} aoPreferir={aoPreferir} />
    </div>
  );
  const resto = alternativas.slice(ALTERNATIVAS_A_MOSTRA);
  return (
    <section className="box" aria-label="Trocar exercício">
      <h2>Trocar só neste treino por:</h2>
      <BotaoPrefiro funcao={funcao} id={atual} atual={atual} preferidos={preferidos} aoPreferir={aoPreferir} rotulo={`Prefiro o atual (${POR_ID[atual]?.nome.toLowerCase()})`} />
      <div className="pilha">{alternativas.slice(0, ALTERNATIVAS_A_MOSTRA).map(botao)}</div>
      {resto.length > 0 && (
        <details className="ver-mais">
          <summary>Ver mais {resto.length === 1 ? '1 opção' : `${resto.length} opções`}</summary>
          <div className="pilha">{resto.map(botao)}</div>
        </details>
      )}
    </section>
  );
}

/**
 * "Prefiro este" (selecao.preferencia): só entre equivalentes do mesmo nível da função. Vale nos próximos programas e
 * nas trocas entre locais; tocar de novo desfaz. Nada vem preferido.
 */
export function BotaoPrefiro({
  funcao,
  id,
  atual,
  preferidos,
  aoPreferir,
  rotulo,
}: {
  funcao?: string;
  id: string;
  atual: string;
  preferidos?: Record<string, string>;
  aoPreferir: (funcao: string, id: string) => void;
  rotulo?: string;
}) {
  const f = funcao ? FUNCAO[funcao] : undefined;
  const nivel = (x: string) => f?.niveis.findIndex((n) => n.includes(x)) ?? -1;
  if (!f || nivel(id) < 0 || nivel(id) !== nivel(atual)) return null;
  const marcado = preferidos?.[f.id] === id;
  return (
    <button type="button" className="link-sec prefiro" aria-pressed={marcado} onClick={() => aoPreferir(f.id, id)}>
      {marcado ? `Você prefere ${id === atual ? 'o atual' : 'este'} · desfazer` : (rotulo ?? 'Prefiro este')}
    </button>
  );
}

const SINAIS: { id: Sinal; texto: string }[] = [
  { id: 'peito', texto: 'Dor, pressão ou aperto no peito' },
  { id: 'falta-de-ar', texto: 'Falta de ar fora do normal' },
  { id: 'tontura', texto: 'Tontura ou quase desmaio' },
  { id: 'palpitacao', texto: 'Coração batendo muito irregular' },
  { id: 'dor-articular-aguda', texto: 'Dor aguda ou em pontada numa articulação' },
  { id: 'formigamento', texto: 'Formigamento ou dormência' },
  { id: 'perda-de-forca', texto: 'Perda de força estranha' },
];

function Sentir({ aoDor, aoSinal }: { aoDor: (nota: number) => void; aoSinal: (s: Sinal) => void }) {
  return (
    <section className="box sentir" aria-label="Senti algo">
      <h2>O que você sentiu?</h2>
      <div className="pilha">
        {SINAIS.map((s) => (
          <button key={s.id} type="button" className="opcao-ajuste" onClick={() => aoSinal(s.id)}>
            <b>{s.texto}</b>
          </button>
        ))}
      </div>
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
        O app não diagnostica. <Selo id="seguranca.sem-diagnostico" />
      </p>
    </section>
  );
}
