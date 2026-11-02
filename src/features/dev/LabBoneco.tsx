import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EX, VIEWS } from '../../engine';
import { ESTILOS, NOMES_ESTILO, montarSvgEstilo, type Estilo } from '../../engine/estilo';

// Laboratório do boneco (R4): o mesmo movimento nos 3 estilos (atual, A e B), animado, para o Gustavo
// decidir com os olhos. Só existe em desenvolvimento e nas prévias da Vercel (__LAB__ em vite.config.ts):
// fora do build de produção, sem link em nenhuma tela, e não lê nem grava os dados da pessoa.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
type Modo = 'tec' | 'mus';

const EXERCICIOS: { id: string; nome: string; nota?: string }[] = [
  { id: 'puxada-unilateral', nome: 'Puxada unilateral' },
  { id: 'goblet', nome: 'Agachamento goblet' },
  { id: 'face-pull', nome: 'Face pull', nota: 'De cima, no Boneco e na Silhueta, a corda e o cabo ficam mais leves e o rótulo sai de trás da caixa da fase.' },
];
const LEGENDA: Record<string, { p: string[]; s: string[]; nota: Record<string, string> }> = {
  'puxada-unilateral': {
    p: ['grande dorsal', 'redondo maior'],
    s: ['trapézio médio', 'trapézio inferior', 'romboides', 'deltoide posterior', 'bíceps'],
    nota: { posterior: 'De trás, o bíceps fica do outro lado do braço e não aparece.', lateral: 'De lado, os músculos entre a coluna e a escápula ficam escondidos.' },
  },
  goblet: {
    p: ['quadríceps'],
    s: ['glúteos', 'adutores'],
    nota: { lateral: 'De lado, os adutores (parte de dentro da coxa) ficam escondidos.', frontal: 'De frente, os glúteos ficam escondidos.' },
  },
};

const reduzMovimento = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function LabBoneco() {
  const [exId, setExId] = useState(EXERCICIOS[0]!.id);
  const ex: Animacao = EX.find((e: Animacao) => e.id === exId);
  const [vista, setVista] = useState<string>(ex.views[0]);
  const [modo, setModo] = useState<Modo>('tec');
  const [estilo, setEstilo] = useState<Estilo>('atual');
  const [tocando, setTocando] = useState(!reduzMovimento());
  const [lento, setLento] = useState(false);
  const [perto, setPerto] = useState(false);
  const vistaOk = ex.views.includes(vista) ? vista : ex.views[0];
  const modoOk: Modo = modo;

  const grande = useRef<SVGSVGElement>(null);
  const fase = useRef<HTMLDivElement>(null);
  const mini = useRef<(SVGSVGElement | null)[]>([]);
  const t = useRef(0);
  const estado = useRef({ ex, vista: vistaOk, modo: modoOk, estilo, tocando, lento, perto });
  estado.current = { ex, vista: vistaOk, modo: modoOk, estilo, tocando, lento, perto };

  useEffect(() => {
    let raf = 0;
    let ultimo = performance.now();
    const pintar = (el: SVGSVGElement | null, e: Estilo) => {
      if (!el) return null;
      const s = estado.current;
      const q = montarSvgEstilo(s.ex, s.vista, s.modo, t.current, 0, el.clientWidth || 120, e, s.perto);
      el.setAttribute('viewBox', q.viewBox);
      el.setAttribute('class', q.classe);
      el.innerHTML = q.html;
      return q;
    };
    const desenhar = (agora: number) => {
      const s = estado.current;
      const dt = Math.min(0.05, (agora - ultimo) / 1000);
      ultimo = agora;
      if (s.tocando) t.current += dt * (s.lento ? 0.35 : 1);
      const q = pintar(grande.current, s.estilo);
      ESTILOS.forEach((e, i) => pintar(mini.current[i] ?? null, e));
      if (q && fase.current) {
        fase.current.replaceChildren();
        const b = document.createElement('b');
        const sp = document.createElement('span');
        b.textContent = q.fase.label;
        sp.textContent = q.fase.tempo || '';
        fase.current.append(b, sp);
      }
      raf = requestAnimationFrame(desenhar);
    };
    raf = requestAnimationFrame(desenhar);
    return () => cancelAnimationFrame(raf);
  }, []);

  const leg = LEGENDA[exId];
  const nota = EXERCICIOS.find((e) => e.id === exId)?.nota;

  return (
    <div className="wrap dev lab">
      <header className="top">
        <div className="brand">
          <b>
            <Link to="/">Laboratório do boneco</Link>
          </b>
          <span>R4 · só para teste</span>
        </div>
        <p className="note">
          O mesmo movimento nos 3 estilos. O guia do app usa o Boneco (padrão); o Clássico e a Silhueta ficam em Meus dados.
        </p>
        <div className="chips" role="tablist" aria-label="Exercícios">
          {EXERCICIOS.map((e) => (
            <button
              key={e.id}
              className="chip"
              role="tab"
              aria-pressed={e.id === exId}
              onClick={() => {
                setExId(e.id);
                t.current = 0;
              }}
            >
              {e.nome}
            </button>
          ))}
        </div>
      </header>

      <section className="card" aria-label="Animação">
        <div className="seg lab-estilo" role="group" aria-label="Estilo">
          {ESTILOS.map((e) => (
            <button key={e} aria-pressed={e === estilo} onClick={() => setEstilo(e)}>
              {NOMES_ESTILO[e]}
            </button>
          ))}
        </div>
        <div className="stage" data-testid="palco-lab">
          <svg ref={grande} xmlns="http://www.w3.org/2000/svg" role="img" aria-label={`Animação no estilo ${NOMES_ESTILO[estilo]}`} />
          <div className="hud">
            <div className="phase" ref={fase}>
              <b>—</b>
              <span />
            </div>
          </div>
        </div>
        <div className="controls">
          <button className="ctl" aria-label={tocando ? 'Pausar' : 'Reproduzir'} onClick={() => setTocando(!tocando)}>
            {tocando ? '⏸' : '▶'}
          </button>
          <button className="ctl" aria-pressed={lento} aria-label="Câmera lenta" onClick={() => setLento(!lento)}>
            🐢 lento
          </button>
          <button className="ctl" aria-pressed={perto} onClick={() => setPerto(!perto)}>
            🔍 perto
          </button>
          <div className="seg" role="group" aria-label="Visão">
            {ex.views.map((v: string) => (
              <button key={v} aria-pressed={v === vistaOk} onClick={() => setVista(v)}>
                {VIEWS[v as keyof typeof VIEWS].name}
              </button>
            ))}
          </div>
        </div>
        <div className="modes lab-modos" role="group" aria-label="Informação">
          {(
            [
              ['tec', 'Técnica'],
              ['mus', 'Músculos'],
            ] as [Modo, string][]
          ).map(([m, nome]) => (
            <button key={m} aria-pressed={m === modoOk} onClick={() => setModo(m)}>
              {nome}
            </button>
          ))}
        </div>
      </section>

      <section className="box" aria-label="Os três estilos juntos">
        <h2>Os três juntos</h2>
        <div className="lab-tres">
          {ESTILOS.map((e, i) => (
            <button key={e} className="lab-mini" aria-pressed={e === estilo} onClick={() => setEstilo(e)}>
              <svg
                ref={(el) => {
                  mini.current[i] = el;
                }}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              />
              <span>{NOMES_ESTILO[e]}</span>
            </button>
          ))}
        </div>
        {modoOk === 'mus' && leg && (
          <div className="legend lab-legenda">
            <span>
              <i className="lab-cor p" /> principal: {leg.p.join(', ')}
            </span>
            <span>
              <i className="lab-cor s" /> secundários: {leg.s.join(', ')}
            </span>
            {leg.nota[vistaOk] && <span>{leg.nota[vistaOk]}</span>}
          </div>
        )}
        {nota && <p className="note">{nota}</p>}
        <p className="note">
          🔍 <b>perto</b> aproxima a câmera do corpo nos 3 estilos (sem a torre inteira), para separar o efeito do estilo do efeito do
          tamanho da figura.
        </p>
      </section>

      <section className="box">
        <h2>Três perguntas</h2>
        <ol className="note">
          <li>Qual explica melhor o movimento?</li>
          <li>Em qual dá para ver que músculo trabalha?</li>
          <li>Qual é mais agradável de ver?</li>
        </ol>
      </section>
    </div>
  );
}
