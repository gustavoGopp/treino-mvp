import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CONTEUDO } from '../../conteudo';
import { DIAS, EX, VIEWS, montarSvg } from '../../engine';

// Tela do guia de execução: mesma interface do guia original (referencia/guia-execucao-fase1.html),
// sem o temporizador de descanso (que entra no M5). O motor não sabe de React: o palco só recebe o SVG.

type Modo = 'tec' | 'err' | 'mus' | 'traj';
const MODOS: [Modo, string][] = [
  ['tec', 'Técnica'],
  ['err', 'Erros'],
  ['mus', 'Músculos'],
  ['traj', 'Trajetória'],
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;

// Treinos do programa de referência + as animações novas (criadas depois do guia original), num grupo próprio.
const GRUPOS = [
  ...DIAS,
  ...(EX.length > 26 ? [{ id: 'novas', nome: 'Novas', ex: EX.slice(26) }] : []),
];

const reduzMovimento = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function Guia() {
  const { id } = useParams();
  const ex: Animacao | undefined = EX.find((e: Animacao) => e.id === id);
  if (!ex) return <Navigate to={`/guia/${EX[0]!.id}`} replace />;
  return <GuiaExercicio key={ex.id} ex={ex} />;
}

function GuiaExercicio({ ex }: { ex: Animacao }) {
  const txt = CONTEUDO[ex.id]!;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const dia = GRUPOS.find((d) => d.ex.includes(ex))!;
  const pos = dia.ex.indexOf(ex);

  // Parâmetros de URL fixam o quadro (usados pela regressão visual e para gerar imagens do devlog).
  const modoUrl = params.get('modo') as Modo | null;
  const [modo, setModo] = useState<Modo>(modoUrl && MODOS.some(([m]) => m === modoUrl) ? modoUrl : 'tec');
  const [erro, setErro] = useState(() => Math.max(0, Math.min(ex.errors.length - 1, Number(params.get('erro') ?? 0))));
  const [vista, setVista] = useState<string>(() => params.get('vista') ?? (modo === 'err' ? ex.errors[erro].view : ex.views[0]));
  const [tocando, setTocando] = useState(() => params.get('pausado') !== '1' && !reduzMovimento());
  const [lento, setLento] = useState(false);
  const t = useRef(Number(params.get('t') ?? 0));

  const svg = useRef<SVGSVGElement>(null);
  const fase = useRef<HTMLDivElement>(null);
  const resp = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const linha = useRef<HTMLDivElement>(null);
  const estado = useRef({ modo, erro, vista, tocando, lento });
  estado.current = { modo, erro, vista, tocando, lento };

  useEffect(() => {
    let raf = 0;
    let ultimo = performance.now();
    const desenhar = (agora: number) => {
      const s = estado.current;
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      if (s.tocando) t.current += dt * (s.lento ? 0.35 : 1);
      const el = svg.current;
      if (el) {
        const q = montarSvg(ex, s.vista, s.modo, t.current, s.erro, el.clientWidth);
        el.setAttribute('viewBox', q.viewBox);
        el.innerHTML = q.html;
        const nomeErro = txt.errors[s.erro]!.title;
        if (fase.current) {
          fase.current.replaceChildren();
          const b = document.createElement('b');
          const sp = document.createElement('span');
          if (s.modo === 'err') {
            b.style.color = 'var(--err)';
            b.textContent = `❌ ${nomeErro}`;
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
        if (cursor.current && linha.current) {
          const w = linha.current.clientWidth - 16;
          cursor.current.style.left = 8 + (w * (((t.current % ex.T) + ex.T) % ex.T)) / ex.T - 1 + 'px';
        }
      }
      raf = requestAnimationFrame(desenhar);
    };
    raf = requestAnimationFrame(desenhar);
    return () => cancelAnimationFrame(raf);
  }, [ex, txt]);

  const vistas: string[] = useMemo(() => (modo === 'err' ? [...new Set([vista, ...ex.views])] : ex.views), [modo, vista, ex]);
  const irPara = (i: number) => navigate(`/guia/${dia.ex[(i + dia.ex.length) % dia.ex.length]!.id}`);
  const trocarModo = (m: Modo) => {
    setModo(m);
    if (m === 'err') {
      setErro(0);
      setVista(ex.errors[0].view);
      t.current = 0;
    } else if (!ex.views.includes(vista)) setVista(ex.views[0]);
  };

  return (
    <div className="wrap">
      <header className="top">
        <div className="brand">
          <b>
            <Link to="/">Guia de execução</Link>
          </b>
          <span>Programa de referência · animações esquemáticas</span>
        </div>
        <nav className="days" aria-label="Treinos">
          {GRUPOS.map((d) => (
            <button key={d.id} className="day" aria-pressed={d === dia} onClick={() => navigate(`/guia/${d.ex[0]!.id}`)}>
              {d.nome}
            </button>
          ))}
        </nav>
        <div className="chips" role="tablist" aria-label="Exercícios">
          {dia.ex.map((e: Animacao, i: number) => (
            <button key={e.id} className="chip" role="tab" aria-pressed={e === ex} onClick={() => irPara(i)}>
              <i>{i + 1}</i>
              {CONTEUDO[e.id]!.short}
            </button>
          ))}
        </div>
      </header>

      <section className="exhead">
        <div className="n">{pos + 1}</div>
        <div>
          <h1>{txt.name}</h1>
          <div className="rx">{txt.rx}</div>
          <div className="tg">
            <b>Alvo:</b> {txt.target}
          </div>
        </div>
        <div className="nav">
          <button className="iconbtn" aria-label="Exercício anterior" onClick={() => irPara(pos - 1)}>
            ‹
          </button>
          <button className="iconbtn" aria-label="Próximo exercício" onClick={() => irPara(pos + 1)}>
            ›
          </button>
        </div>
      </section>

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
            <div key={i} className={`tseg ${g.kind}`} style={{ flexGrow: g.dur }}>
              {g.kind !== 'hold' && g.dur >= 0.8 ? g.label.split(' · ')[0].toLowerCase() : ''}
            </div>
          ))}
          <div className="tcur" ref={cursor} />
        </div>
        <div className="controls">
          <button className="ctl" aria-label={tocando ? 'Pausar' : 'Reproduzir'} onClick={() => setTocando(!tocando)}>
            {tocando ? '⏸' : '▶'}
          </button>
          <button
            className="ctl"
            aria-label="Voltar à posição inicial"
            onClick={() => {
              t.current = 0;
              setTocando(false);
            }}
          >
            ⏮
          </button>
          <button className="ctl" aria-pressed={lento} aria-label="Câmera lenta" onClick={() => setLento(!lento)}>
            🐢 lento
          </button>
          <div className="seg" role="group" aria-label="Visão">
            {vistas.map((v) => (
              <button key={v} aria-pressed={v === vista} onClick={() => setVista(v)}>
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
            modo={modo}
            erro={erro}
            txt={txt}
            onErro={(i) => {
              setErro(i);
              setVista(ex.errors[i].view);
              t.current = 0;
            }}
          />
        </div>
      </section>

      <section className="quick">
        <div className="box">
          <h2>3 cues</h2>
          <ol className="cues">
            {txt.cues.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
        </div>
        <Checklist key={ex.id} itens={txt.check} id={ex.id} />
      </section>

      <Detalhes txt={txt} />

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

function InfoModo({ modo, erro, txt, onErro }: { modo: Modo; erro: number; txt: (typeof CONTEUDO)[string]; onErro: (i: number) => void }) {
  if (modo === 'tec')
    return (
      <>
        <div className="legend">
          <span>
            <i className="sw" style={{ background: 'var(--guide)' }} />
            linhas de referência
          </span>
          <span>
            <i className="sw" style={{ background: 'var(--spine)' }} />
            coluna
          </span>
          <span>
            <i className="sw" style={{ background: 'var(--joint)' }} />
            articulações
          </span>
        </div>
        {txt.note && <div className="warnbox">{txt.note}</div>}
      </>
    );
  if (modo === 'err')
    return (
      <>
        <div className="errchips">
          {txt.errors.map((x, i) => (
            <button key={x.id} className="errchip" aria-pressed={i === erro} onClick={() => onErro(i)}>
              ❌ {x.title}
            </button>
          ))}
        </div>
        <div>{txt.errors[erro]!.desc}</div>
        <div className="legend">
          <span>
            <i className="sw" style={{ background: 'var(--err)' }} />
            erro
          </span>
          <span>
            <i className="sw" style={{ background: 'var(--ghost)' }} />
            execução correta
          </span>
        </div>
      </>
    );
  if (modo === 'mus')
    return (
      <>
        <div className="legend">
          <span>
            <i className="sw" style={{ background: 'var(--mus-p)' }} />
            alvo principal
          </span>
          <span>
            <i className="sw" style={{ background: 'var(--mus-s)' }} />
            secundários
          </span>
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
          <i className="sw" style={{ background: 'var(--path)' }} />
          trajetória da carga/mão (a seta mostra a fase concêntrica)
        </span>
        <span>
          <i className="sw" style={{ background: 'var(--path)', opacity: 0.55 }} />
          pontilhado: cotovelo ou ombro
        </span>
        <span>
          <i className="sw" style={{ background: 'var(--muted)' }} />
          contorno cinza: {txt.extLabels[0]}
        </span>
        <span>
          <i className="sw" style={{ background: 'var(--ghost)' }} />
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
    <div className="box">
      <h2>Checklist de 5 s</h2>
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
          Limpar checklist
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
    <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <details className="box" open>
        <summary>Setup</summary>
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
                <b>❌ {e.title}.</b> {e.desc}
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
