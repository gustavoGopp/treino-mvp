import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { faixaTexto as faixa, tempoNoRelogio as tempo } from '../../domain/numero';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CONTEUDO } from '../../conteudo';
import { prescricaoNoGuia } from '../../domain/sessao';
import { hojeDoEstado, hojeDoTreino } from '../treino/acoes';
import { VIEWS } from '../../engine/desenho';
import type { Estilo } from '../../engine/estilo';
import { SO_AJUDA } from '../../engine/estilo/musculos';
import { largarCiclo, pedirAoBoneco, pedirCiclo, type Catalogo, type Ficha, type QuadroGuia } from '../programa/desenhoFora';
import { useEstiloBoneco } from '../app/estiloBoneco';
import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { lerContexto, linkDoGuia } from './link';
import { useTelaAcesa } from '../treino/Temporizador';
import { Icone } from '../app/icones';
import { Selo } from '../app/ui';

// Tela do guia de execução: mesma interface do guia original (referencia/guia-execucao-fase1.html),
// sem o temporizador de descanso (que entra no M5). O motor não sabe de React: o palco só recebe o SVG.
// Aberto pelo programa ou pelo treino (R1), o guia mostra a prescrição da pessoa naquela semana e os
// exercícios do dia dela. Sem contexto, é o catálogo das animações, sem prescrição nenhuma.

type Modo = 'tec' | 'err' | 'mus' | 'traj';
const MODOS: [Modo, string][] = [
  ['tec', 'Técnica'],
  ['err', 'Erros'],
  ['mus', 'Músculos'],
  ['traj', 'Trajetória'],
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;

type Grupo = { id: string; nome: string; ex: string[] };
// Treinos do programa de referência + as animações novas (criadas depois do guia original), num grupo próprio.
const gruposDo = (c: Catalogo): Grupo[] => [
  ...c.dias.map((d) => ({ id: d.id, nome: d.nome, ex: d.ids })),
  ...(c.todos.length > 25 ? [{ id: 'novas', nome: 'Novas', ex: c.todos.slice(25) }] : []),
];

/** O catálogo e a ficha da animação, pedidos ao Worker do Boneco (lote 2: o motor não carrega na tela). */
function useDoBoneco<T>(pedido: Parameters<typeof pedirAoBoneco>[0] | null): T | undefined {
  const chave = pedido ? JSON.stringify(pedido) : '';
  const [r, setR] = useState<{ chave: string; v: T } | null>(null);
  useEffect(() => {
    if (!pedido) return;
    let vivo = true;
    pedirAoBoneco<T>(pedido).then((v) => vivo && setR({ chave, v }));
    return () => {
      vivo = false;
    };
    // a chave resume o pedido
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);
  return r && r.chave === chave ? r.v : undefined;
}


/** No checklist, o "RIR do seu programa" vira o RIR desta semana; sem esse item, ele entra no fim. */
function checklistComRir(itens: string[], rir: string): string[] {
  const trocado = itens.map((i) =>
    i === 'Carga para o RIR do seu programa' ? `Carga para RIR ${rir}` : i === 'Parar no RIR do seu programa' ? `Parar com RIR ${rir}` : i,
  );
  return trocado.some((i, k) => i !== itens[k]) ? trocado : [...itens, `Carga para RIR ${rir}`];
}

const reduzMovimento = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function Guia() {
  const { id } = useParams();
  const [params] = useSearchParams();
  // aberto pelo treino, o guia faz parte do treino: a tela continua acesa
  useTelaAcesa(lerContexto(params)?.de === 'treino');
  const estilo = useEstiloBoneco();
  const catalogo = useDoBoneco<Catalogo>({ tipo: 'catalogo' });
  const valido = !!catalogo && !!id && catalogo.todos.includes(id);
  const ex = useDoBoneco<Ficha | null>(valido ? { tipo: 'ficha', animacaoId: id!, estilo } : null);
  if (catalogo && !valido) return <Navigate to={`/guia/${catalogo.todos[0]}`} replace />;
  // até a ficha chegar (do Worker, em milissegundos): o fundo da tela e o palco vazio, do mesmo tamanho
  if (!catalogo || !ex)
    return (
      <div className="wrap guia" aria-busy="true">
        <main className="conteudo-guia">
          <section className="card" aria-label="Animação">
            <div className="stage" />
          </section>
        </main>
      </div>
    );
  return <GuiaExercicio key={`${ex.id}-${estilo}`} ex={ex} grupos={gruposDo(catalogo)} />;
}

function GuiaExercicio({ ex, grupos }: { ex: Ficha; grupos: Grupo[] }) {
  const txt = CONTEUDO[ex.id]!;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const app = useApp();

  // Prescrição da pessoa: a semana vem do treino em andamento (aberto pelo treino) ou do calendário do programa.
  const ctx = lerContexto(params);
  const programa = app.estado.programa?.programa;
  const sessao = app.estado.sessaoAtual;
  const hoje = ctx?.de === 'treino' && sessao && sessao.diaId === ctx.diaId ? hojeDoTreino(app.estado, sessao, fusoDoAparelho()) : hojeDoEstado(app.estado, agoraIso(), fusoDoAparelho());
  const minha = ctx && programa && hoje ? prescricaoNoGuia(programa, ctx, hoje) : null;
  const meus =
    minha && ctx
      ? minha.dia.exercicios
          .map((x) => (ctx.vaga && x.exId === ctx.vaga ? minha.x : x))
          .filter((x, i, xs) => x.animacaoId && xs.findIndex((y) => y.animacaoId === x.animacaoId) === i).map((x) => ({ x, ex: x.animacaoId as string }))
      : [];
  // Na troca pela alternativa, ela continua no lugar da vaga ao navegar pelo dia.
  const linkMeu = (exId: string, animacaoId: string) =>
    linkDoGuia(animacaoId, { de: ctx!.de, diaId: ctx!.diaId, exId, ...(ctx!.vaga && exId === ctx!.exId ? { vaga: ctx!.vaga } : {}) });
  const dia = minha
    ? { id: minha.dia.id, nome: minha.dia.nome, ex: meus.map((m) => m.ex) }
    : (grupos.find((d) => d.ex.includes(ex.id)) ?? grupos[0]!);
  const pos = Math.max(0, dia.ex.indexOf(ex.id));

  // Parâmetros de URL fixam o quadro (usados pela regressão visual e para gerar imagens do devlog).
  const estilo = useEstiloBoneco();
  const modoUrl = params.get('modo') as Modo | null;
  const [modo, setModo] = useState<Modo>(modoUrl && MODOS.some(([m]) => m === modoUrl) ? modoUrl : 'tec');
  const [erro, setErro] = useState(() => Math.max(0, Math.min(ex.errors.length - 1, Number(params.get('erro') ?? 0))));
  // R4 (decisão do Gustavo, 05/11/2026): no Boneco, o modo Técnica abre na vista em que o movimento é maior
  const [vista, setVista] = useState<string>(() => params.get('vista') ?? (modo === 'err' ? ex.errors[erro]!.view : modo === 'tec' ? ex.vistaMovimento : ex.views[0]!));
  const [tocando, setTocando] = useState(() => params.get('pausado') !== '1' && !reduzMovimento());
  const [lento, setLento] = useState(false);
  // R4 (05/11/2026): no Boneco, o modo Erros abre no instante em que o certo e o errado mais se afastam.
  const inicioDoErro = (i: number) => ex.instantesErro[i] ?? 0;
  const t = useRef(Number(params.get('t') ?? (modo === 'err' ? inicioDoErro(erro) : 0)));

  const svg = useRef<SVGSVGElement>(null);
  const fase = useRef<HTMLDivElement>(null);
  const resp = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const linha = useRef<HTMLDivElement>(null);
  const estado = useRef({ modo, erro, vista, tocando, lento, estilo });
  estado.current = { modo, erro, vista, tocando, lento, estilo };

  // O laço da animação (redesign, lote 2: desempenho sem mudar o motor). Antes, o SVG inteiro era refeito na tela
  // cerca de 60 vezes por segundo, mesmo pausado, e o motor preparava os 82 exercícios na linha principal. Agora o
  // motor fica no Worker do Boneco: tocando, a volta inteira chega de lá quadro a quadro (30 por segundo de animação)
  // e fica o quadro mais recente já pronto; pausado, o Worker manda só o quadro do instante exato; fora da tela, nada
  // é desenhado. A largura vem de um ResizeObserver e o cursor da linha do tempo anda por transform.
  useEffect(() => {
    let raf = 0;
    let ultimo = performance.now();
    let chaveAnterior = '';
    let hudAnterior = '';
    let largura = svg.current?.clientWidth ?? 0;
    let larguraLinha = linha.current?.clientWidth ?? 0;
    let visivel = true;
    let combinacao = '';
    let doWorker = false;
    const quadros = new Map<number, QuadroGuia>();
    const avulsos = new Map<string, QuadroGuia>();
    const pedidos = new Set<string>();
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            largura = svg.current?.clientWidth ?? largura;
            larguraLinha = linha.current?.clientWidth ?? larguraLinha;
          })
        : null;
    if (svg.current) ro?.observe(svg.current);
    if (linha.current) ro?.observe(linha.current);
    const io =
      typeof IntersectionObserver !== 'undefined' && svg.current
        ? new IntersectionObserver(([e]) => {
            visivel = !!e?.isIntersecting;
          })
        : null;
    if (svg.current) io?.observe(svg.current);
    // um quadro avulso (o instante exato, pausado, ou o 1º de uma combinação nova): pedido uma vez, guardado ao chegar
    const avulso = (s: typeof estado.current, instante: number, chave: string) => {
      const q = avulsos.get(chave);
      if (q || pedidos.has(chave)) return q;
      pedidos.add(chave);
      void pedirAoBoneco<QuadroGuia>(
        { tipo: 'quadroGuia', animacaoId: ex.id, vista: s.vista, modo: s.modo, t: instante, erro: s.erro, largura, estilo: s.estilo, tituloErro: txt.errors[s.erro]!.title },
        false,
      ).then((r) => {
        if (avulsos.size > 300) avulsos.clear();
        avulsos.set(chave, r);
      });
      return undefined;
    };
    const desenhar = (agora: number) => {
      raf = requestAnimationFrame(desenhar);
      const s = estado.current;
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      if (s.tocando) t.current += dt * (s.lento ? 0.35 : 1);
      const el = svg.current;
      if (!el || !visivel || document.hidden || !largura) return;
      const ciclo = ((t.current % ex.T) + ex.T) % ex.T;
      const c = `${s.vista}|${s.modo}|${s.erro}|${s.estilo}|${largura}`;
      if (c !== combinacao) {
        combinacao = c;
        quadros.clear();
        doWorker = pedirCiclo({ animacaoId: ex.id, vista: s.vista, modo: s.modo, erro: s.erro, largura, estilo: s.estilo, tituloErro: txt.errors[s.erro]!.title }, (i, q) => quadros.set(i, q));
      }
      let q: QuadroGuia | undefined;
      let chave: string;
      if (s.tocando && doWorker) {
        // o quadro do instante, ou o mais recente já pronto antes dele; nenhum ainda: o 1º, avulso
        let i = Math.floor(ciclo * 30);
        while (i >= 0 && !quadros.has(i)) i--;
        chave = i >= 0 ? `${c}|q${i}` : `${c}|0.0000`;
        q = i >= 0 ? quadros.get(i) : avulso(s, 0, chave);
      } else {
        // pausado (ou sem Worker): o instante exato, ou o quadro de 1/30 s quando toca
        const instante = s.tocando ? Math.floor(ciclo * 30) / 30 : t.current;
        chave = `${c}|${instante.toFixed(4)}`;
        q = avulso(s, instante, chave);
      }
      if (cursor.current) cursor.current.style.transform = `translateX(${((larguraLinha - 16) * ciclo) / ex.T}px)`;
      if (!q || chave === chaveAnterior) return;
      chaveAnterior = chave;
      el.setAttribute('viewBox', q.viewBox);
      if (q.classe) el.setAttribute('class', q.classe);
      else el.removeAttribute('class');
      el.innerHTML = q.html;
      const nomeErro = txt.errors[s.erro]!.title;
      const hud = `${s.modo}|${nomeErro}|${q.fase.label}|${q.fase.tempo}|${q.fase.breath}`;
      if (hud !== hudAnterior) {
        hudAnterior = hud;
        if (fase.current) {
          fase.current.replaceChildren();
          const b = document.createElement('b');
          const sp = document.createElement('span');
          if (s.modo === 'err') {
            b.className = 'erro-no-palco';
            b.textContent = nomeErro;
            sp.textContent = q.fase.label;
          } else {
            b.textContent = q.fase.label;
            sp.textContent = q.fase.tempo || '';
          }
          fase.current.append(b, sp);
        }
        if (resp.current) {
          resp.current.textContent = q.fase.breath;
          resp.current.className = 'breath' + (q.fase.breath === 'INSPIRA' ? ' in' : q.fase.breath === 'FIRME' ? ' hold' : '');
        }
      }
    };
    raf = requestAnimationFrame(desenhar);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      largarCiclo();
    };
  }, [ex, txt]);

  // Movimento reduzido ligado depois de abrir: a animação para.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const mudou = () => mq.matches && setTocando(false);
    mq.addEventListener?.('change', mudou);
    return () => mq.removeEventListener?.('change', mudou);
  }, []);

  const vistas: string[] = useMemo(() => (modo === 'err' ? [...new Set([vista, ...ex.views])] : ex.views), [modo, vista, ex]);
  const irPara = (i: number) => {
    const n = (i + dia.ex.length) % dia.ex.length;
    navigate(minha ? linkMeu(meus[n]!.x.exId, meus[n]!.x.animacaoId!) : `/guia/${dia.ex[n]!}`);
  };
  // Design v2 (opção 2 dos adutores): o modo Músculos abre na vista em que o músculo principal aparece mais, a mesma
  // regra da miniatura (vistaDaMiniatura), a menos que a pessoa já tenha escolhido uma vista neste exercício.
  const vistaManual = useRef<string | null>(null);
  useEffect(() => {
    vistaManual.current = null;
  }, [ex]);
  const escolherVista = (v: string) => {
    vistaManual.current = v;
    setVista(v);
  };
  const trocarModo = (m: Modo) => {
    setModo(m);
    if (m === 'mus' && !vistaManual.current && estilo !== 'atual') setVista(ex.vistaMiniatura);
    else if (m === 'err') {
      setErro(0);
      setVista(ex.errors[0]!.view);
      t.current = inicioDoErro(0);
    } else if (m === 'tec' && !vistaManual.current && estilo !== 'atual') setVista(ex.vistaMovimento);
    else if (!ex.views.includes(vista)) setVista(ex.views[0]!);
  };

  return (
    <div className="wrap guia">
      {/* Redesign, lote 2: o palco no topo. Aberto pelo treino, o cabeçalho é o do treino: voltar e "Senti algo" (que
          volta ao treino com a folha aberta, para a segurança ter uma lógica só). No catálogo, os dias e os exercícios. */}
      <header className="top">
        {minha ? (
          <div className="brand cab-treino">
            <Link className="topo-volta" to={ctx!.de === 'treino' ? '/treino' : '/programa'}>
              <Icone nome="chevron-left" />
              Voltar {ctx!.de === 'treino' ? 'ao treino' : 'ao programa'}
            </Link>
            {ctx!.de === 'treino' && (
              <button type="button" className="alerta-topo" onClick={() => navigate('/treino?sentir=1')}>
                <Icone nome="triangle-alert" />
                Senti algo
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="brand">
              <b>
                <Link to="/">Guia de execução</Link>
              </b>
              <span>Catálogo de exercícios · animações esquemáticas</span>
            </div>
            <nav className="days" aria-label="Treinos">
              {grupos.map((d) => (
                <button key={d.id} className="day" aria-pressed={d === dia} onClick={() => navigate(`/guia/${d.ex[0]!}`)}>
                  {d.nome}
                </button>
              ))}
            </nav>
            <div className="chips" role="group" aria-label="Exercícios">
              {dia.ex.map((e: string, i: number) => (
                <button key={e} className="chip" aria-pressed={e === ex.id} onClick={() => irPara(i)}>
                  <i>{i + 1}</i>
                  {CONTEUDO[e]!.short}
                </button>
              ))}
            </div>
          </>
        )}
      </header>
      <main className="conteudo-guia">
        <section className="card" aria-label="Animação">
          <div className="stage" data-testid="palco">
            <svg ref={svg} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Animação do exercício" />
            <div className="hud">
              <div className="phase" ref={fase}>
                <b>—</b>
                <span />
              </div>
              <div className="breath" ref={resp}>
                EXPIRA
              </div>
            </div>
            <div className="errbanner" />
          </div>
          <div className="timeline" ref={linha}>
            {ex.seq.map((g: Animacao, i: number) => (
              <div key={i} className={`tseg ${g.kind}`} style={{ '--peso': g.dur } as CSSProperties}>
                {g.kind !== 'hold' && g.dur >= 0.8 ? g.label.split(' · ')[0].toLowerCase() : ''}
              </div>
            ))}
            <div className="tcur" ref={cursor} />
          </div>
          <div className="controls">
            <button className="ctl" aria-label={tocando ? 'Pausar' : 'Reproduzir'} onClick={() => setTocando(!tocando)}>
              <Icone nome={tocando ? 'pause' : 'play'} />
            </button>
            <button
              className="ctl"
              aria-label="Voltar à posição inicial"
              onClick={() => {
                t.current = 0;
                setTocando(false);
              }}
            >
              <Icone nome="skip-back" />
            </button>
            <button className="ctl" aria-pressed={lento} onClick={() => setLento(!lento)}>
              <Icone nome="turtle" /> Lento
            </button>
            <div className="seg" role="group" aria-label="Visão">
              {vistas.map((v) => (
                <button key={v} aria-pressed={v === vista} onClick={() => escolherVista(v)}>
                  {VIEWS[v as keyof typeof VIEWS].name}
                </button>
              ))}
            </div>
          </div>
          <div className="modes" role="group" aria-label="Informação">
            {MODOS.map(([m, nome]) => (
              <button key={m} aria-pressed={m === modo} onClick={() => trocarModo(m)}>
                {nome}
              </button>
            ))}
          </div>
          <div className="modeinfo">
            <InfoModo
              soAjuda={!!SO_AJUDA[ex.id]?.length}
              estilo={estilo}
              modo={modo}
              erro={erro}
              txt={txt}
              onErro={(i) => {
                setErro(i);
                setVista(ex.errors[i]!.view);
                t.current = inicioDoErro(i);
              }}
            />
          </div>
        </section>

        {txt.note && <NotaDoGuia nota={txt.note} />}

        <section className="exhead">
          <div className="exhead-topo">
            <p className="rotulo">
              Exercício {pos + 1} de {dia.ex.length}
            </p>
            <div className="nav">
              <button className="iconbtn" aria-label="Exercício anterior" onClick={() => irPara(pos - 1)}>
                <Icone nome="chevron-left" />
              </button>
              <button className="iconbtn" aria-label="Próximo exercício" onClick={() => irPara(pos + 1)}>
                <Icone nome="chevron-right" />
              </button>
            </div>
          </div>
          <div>
            <h1>{txt.name}</h1>
            {minha ? (
              <div className="rx" data-testid="prescricao">
                {[
                  `Semana ${minha.semana}: ${minha.x.series} × ${faixa(minha.x.reps)}${minha.x.unilateral ? ' cada lado' : ''}`,
                  `RIR ${faixa(minha.x.rir)}`,
                  `descanso ${tempo(minha.x.descansoSeg)}`,
                  ...(minha.fase?.rir ? [minha.fase.regraId === 'iniciante.fase-aprendizado' ? 'fase de aprendizado' : 'volta da pausa'] : []),
                ].map((t, i) => (
                  <span key={t}>
                    {i > 0 && ' · '}
                    <span className="nw">{t}</span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="rx">As séries, as repetições e o RIR vêm do seu programa.</div>
            )}
            <div className="tg">
              <b>Alvo:</b> {txt.target}
            </div>
          </div>
        </section>

        <section className="quick">
          <div className="bloco-guia">
            <h2 className="rotulo">As 3 dicas</h2>
            <ol className="cues">
              {txt.cues.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </div>
          <Checklist key={ex.id} itens={minha ? checklistComRir(txt.check, faixa(minha.x.rir)) : txt.check} id={ex.id} />
        </section>

        <Detalhes txt={txt} />
      </main>

      <footer>
        <div className="box">
          <h2>Segurança</h2>
          <p>Dor muscular de treino é esperada: queimação durante a série e dolorimento difuso por 1–3 dias.</p>
          <p>
            <b>Pare o exercício</b> e procure avaliação (fisioterapeuta ou médico do esporte) se aparecer dor articular forte ou em
            pontada, formigamento, perda de força incomum ou sensação de lesão. Nesses casos, não continue achando que é normal.
          </p>
          <p className="note">
            As animações usam um modelo simplificado com medidas aproximadas e não substituem uma avaliação presencial. A sensação
            muscular sozinha não prova que a execução está certa: confira também setup, trajetória e amplitude.
          </p>
        </div>
      </footer>
    </div>
  );
}

function InfoModo({
  soAjuda,
  estilo,
  modo,
  erro,
  txt,
  onErro,
}: {
  soAjuda: boolean;
  estilo: Estilo;
  modo: Modo;
  erro: number;
  txt: (typeof CONTEUDO)[string];
  onErro: (i: number) => void;
}) {
  const classico = estilo === 'atual';
  if (modo === 'tec')
    return (
      <>
        <div className="legend">
          <span>
            <i className="sw c-guide" />
            linhas de referência
          </span>
          {classico && (
            <span>
              <i className="sw c-spine" />
              coluna
            </span>
          )}
          {estilo !== 'b' && (
            <span>
              <i className="sw c-joint" />
              articulações
            </span>
          )}
        </div>
      </>
    );
  if (modo === 'err')
    return (
      <>
        <div className="errchips">
          {txt.errors.map((x, i) => (
            <button key={x.id} className="errchip" aria-pressed={i === erro} onClick={() => onErro(i)}>
              {x.title}
            </button>
          ))}
        </div>
        <div>{txt.errors[erro]!.desc}</div>
        {estilo === 'a' ? (
          // R4 (05/11/2026): no Boneco, o certo é a figura cheia e só a parte que erra aparece em vermelho tracejado
          <div className="legend">
            <span>
              <i className="sw c-pele contorno" />
              execução correta
            </span>
            <span>
              <i className="sw c-err" />
              a parte que erra (tracejado)
            </span>
          </div>
        ) : (
          <div className="legend">
            <span>
              <i className="sw c-err" />
              erro
            </span>
            <span>
              <i className="sw c-ghost" />
              execução correta
            </span>
          </div>
        )}
      </>
    );
  if (modo === 'mus')
    return (
      <>
        <div className="legend">
          <span>
            <i className={`sw ${classico ? 'c-mus-p' : 'c-m-p'}`} />
            alvo principal
          </span>
          <span>
            <i className={`sw ${classico ? 'c-mus-s' : 'c-m-s'}`} />
            {classico ? 'secundários' : 'também trabalha (conta meia série)'}
          </span>
          {soAjuda && !classico && (
            <span>
              <i className="sw listras" />
              só ajuda a firmar
            </span>
          )}
        </div>
        <div>
          <b>Onde sentir:</b> {txt.feel}
        </div>
        <div className="note">{txt.feelNote}</div>
      </>
    );
  return (
    <>
      <div className="legend">
        <span>
          <i className="sw c-path" />
          trajetória da carga/mão (a seta mostra a fase concêntrica)
        </span>
        <span>
          <i className="sw c-path meio" />
          pontilhado: cotovelo ou ombro
        </span>
        <span>
          <i className="sw c-muted" />
          contorno cinza: {txt.extLabels[0]}
        </span>
        <span>
          <i className="sw c-ghost" />
          contorno verde: {txt.extLabels[1]}
        </span>
      </div>
      <div className="note">{txt.range[txt.range.length - 1]}</div>
    </>
  );
}

function Checklist({ itens, id }: { itens: string[]; id: string }) {
  const [marcados, setMarcados] = useState(() => itens.map(() => false));
  return (
    <div className="bloco-guia">
      <h2 className="rotulo">Confira em 5 segundos</h2>
      <div className="check">
        {itens.map((c, i) => (
          <label key={c} htmlFor={`ck-${id}-${i}`}>
            <input
              type="checkbox"
              id={`ck-${id}-${i}`}
              checked={marcados[i]}
              onChange={(e) => setMarcados(marcados.map((m, j) => (j === i ? e.target.checked : m)))}
            />
            {c}
          </label>
        ))}
        <button className="reset" onClick={() => setMarcados(itens.map(() => false))}>
          Desmarcar tudo
        </button>
      </div>
    </div>
  );
}

const Lista = ({ itens }: { itens: string[] }) => (
  <ul>
    {itens.map((x) => (
      <li key={x}>{x}</li>
    ))}
  </ul>
);

function Detalhes({ txt }: { txt: (typeof CONTEUDO)[string] }) {
  return (
    <section className="secao-guia">
      <details className="box" open>
        <summary>Montagem</summary>
        <div className="dbody">
          <h3>Equipamento</h3>
          <Lista itens={txt.setupEq} />
          <h3>Corpo</h3>
          <Lista itens={txt.setupBody} />
        </div>
      </details>
      <details className="box">
        <summary>Execução e tempo</summary>
        <div className="dbody">
          <div className="steps">
            {txt.exec.map(([k, titulo, d]) => (
              <div className="step" key={titulo}>
                <i className={`dot ${k}`} />
                <b>{titulo}</b>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </details>
      <details className="box">
        <summary>Amplitude</summary>
        <div className="dbody">
          <Lista itens={txt.range} />
        </div>
      </details>
      <details className="box">
        <summary>Respiração</summary>
        <div className="dbody">
          <p>{txt.breath}</p>
        </div>
      </details>
      <details className="box">
        <summary>Onde sentir</summary>
        <div className="dbody">
          <p>{txt.feel}</p>
          <p className="note">{txt.feelNote}</p>
        </div>
      </details>
      <details className="box">
        <summary>Erros comuns</summary>
        <div className="dbody">
          <ul>
            {txt.errors.map((e) => (
              <li key={e.id}>
                <b>{e.title}.</b> {e.desc}
              </li>
            ))}
          </ul>
          <p className="note">Toque em “Erros” acima da animação para ver cada um.</p>
        </div>
      </details>
      <details className="box">
        <summary>O que varia de pessoa para pessoa</summary>
        <div className="dbody">
          <p>{txt.vary}</p>
        </div>
      </details>
    </section>
  );
}

/**
 * A nota do exercício (montagem segura ou segurança), à vista em todos os modos, logo abaixo do palco (lote 2). Os
 * textos marcam o título com <b>…</b>: só essa marca vira negrito; todo o resto é texto, sem HTML livre.
 */
function NotaDoGuia({ nota }: { nota: string }) {
  const partes = nota.split(/<b>(.*?)<\/b>/);
  return (
    <div className="warnbox nota-guia">
      {partes.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}
      {/montagem segura/i.test(nota) && <Selo id="seguranca.montagem" />}
    </div>
  );
}
