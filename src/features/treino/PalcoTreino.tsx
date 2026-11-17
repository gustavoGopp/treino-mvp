import { useEffect, useRef, useState } from 'react';
import type { ConteudoExercicio } from '../../conteudo/schema';
import { useEstiloBoneco } from '../app/estiloBoneco';
import { Icone } from '../app/icones';
import { largarCiclo, pedirAoBoneco, pedirCiclo, type Ficha, type QuadroGuia } from '../programa/desenhoFora';

// O guia dentro do treino (frontend novo, 12/11/2026; docs/revisoes/frontend-novo/proposta.md, seção 10): o Boneco
// animado é a peça central da tela da série, com os 4 modos e a legenda de cada um logo abaixo. O desenho é o do motor,
// sem mudança: os quadros chegam do Worker do Boneco, como na tela do guia (Guia.tsx), que continua existindo para o
// texto completo (montagem, checklist, todos os erros, vistas e câmera lenta).

export type ModoDoGuia = 'tec' | 'err' | 'mus' | 'traj';
const MODOS: [ModoDoGuia, string][] = [
  ['tec', 'Técnica'],
  ['err', 'Erros'],
  ['mus', 'Músculos'],
  ['traj', 'Trajetória'],
];

// O texto do guia do exercício da vez (dicas, 1º erro, onde sentir), baixado só quando a tela precisa dele. A tela do
// treino não carrega os textos de todos os exercícios: se um arquivo falhar, o palco avisa e o registro segue de pé.
const TEXTOS = import.meta.glob<{ default: ConteudoExercicio }>('../../conteudo/exercicios/*.json');
const carregarTexto = (id: string) => TEXTOS[`../../conteudo/exercicios/${id}.json`]?.().then((m) => m.default) ?? Promise.reject(new Error(`sem texto para ${id}`));

const reduzMovimento = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** A vista de cada modo: a mesma regra com que a tela do guia abre cada um. */
function vistaDo(modo: ModoDoGuia, ficha: Ficha): string {
  if (modo === 'err') return ficha.errors[0]!.view;
  if (modo === 'mus') return ficha.vistaMiniatura;
  return ficha.vistaMovimento;
}

export function PalcoTreino({ animacaoId }: { animacaoId: string }) {
  const estilo = useEstiloBoneco();
  const [txt, setTxt] = useState<ConteudoExercicio | null>(null);
  const [ficha, setFicha] = useState<Ficha | null>(null);
  // o guia não chegou (sem rede e sem o arquivo guardado, versão nova publicada): a tela diz e deixa tentar de novo
  const [falhou, setFalhou] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [modo, setModo] = useState<ModoDoGuia>('tec');
  const [tocando, setTocando] = useState(() => !reduzMovimento());
  const [desenhou, setDesenhou] = useState(false);

  useEffect(() => {
    let vivo = true;
    setFicha(null);
    setTxt(null);
    setFalhou(false);
    setDesenhou(false);
    setModo('tec');
    const falha = () => vivo && setFalhou(true);
    pedirAoBoneco<Ficha | null>({ tipo: 'ficha', animacaoId, estilo }).then((f) => vivo && (f ? setFicha(f) : setFalhou(true)), falha);
    carregarTexto(animacaoId).then((x) => vivo && setTxt(x), falha);
    // o Worker do Boneco que não responde não devolve erro: depois de 10 s sem a ficha, a tela para de esperar
    const prazo = setTimeout(() => vivo && setFicha((f) => (f ? f : (setFalhou(true), f))), 10_000);
    return () => {
      vivo = false;
      clearTimeout(prazo);
    };
  }, [animacaoId, estilo, tentativa]);

  const svg = useRef<SVGSVGElement>(null);
  const fase = useRef<HTMLSpanElement>(null);
  const t = useRef(0);
  const estado = useRef({ modo, tocando });
  estado.current = { modo, tocando };

  // O laço da animação: o mesmo desenho da tela do guia. Tocando, a volta inteira chega do Worker quadro a quadro
  // (30 por segundo de animação); pausado, só o quadro do instante exato; fora da tela, nada é desenhado.
  useEffect(() => {
    if (!ficha || !txt) return;
    let raf = 0;
    let ultimo = performance.now();
    let chaveAnterior = '';
    let faseAnterior = '';
    let largura = svg.current?.clientWidth ?? 0;
    let visivel = true;
    let combinacao = '';
    let doWorker = false;
    const quadros = new Map<number, QuadroGuia>();
    const avulsos = new Map<string, QuadroGuia>();
    const pedidos = new Set<string>();
    const tituloErro = txt.errors[0]!.title;
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => (largura = svg.current?.clientWidth ?? largura)) : null;
    if (svg.current) ro?.observe(svg.current);
    const io = typeof IntersectionObserver !== 'undefined' && svg.current ? new IntersectionObserver(([e]) => (visivel = !!e?.isIntersecting)) : null;
    if (svg.current) io?.observe(svg.current);
    const avulso = (m: ModoDoGuia, vista: string, instante: number, chave: string) => {
      const q = avulsos.get(chave);
      if (q || pedidos.has(chave)) return q;
      pedidos.add(chave);
      void pedirAoBoneco<QuadroGuia>({ tipo: 'quadroGuia', animacaoId: ficha.id, vista, modo: m, t: instante, erro: 0, largura, estilo, tituloErro }, false).then((r) => {
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
      if (s.tocando) t.current += dt;
      const el = svg.current;
      if (!el || !visivel || document.hidden || !largura) return;
      const vista = vistaDo(s.modo, ficha);
      const ciclo = ((t.current % ficha.T) + ficha.T) % ficha.T;
      const c = `${vista}|${s.modo}|${estilo}|${largura}`;
      if (c !== combinacao) {
        combinacao = c;
        quadros.clear();
        doWorker = pedirCiclo({ animacaoId: ficha.id, vista, modo: s.modo, erro: 0, largura, estilo, tituloErro }, (i, q) => quadros.set(i, q));
      }
      let q: QuadroGuia | undefined;
      let chave: string;
      if (s.tocando && doWorker) {
        let i = Math.floor(ciclo * 30);
        while (i >= 0 && !quadros.has(i)) i--;
        chave = i >= 0 ? `${c}|q${i}` : `${c}|0.0000`;
        q = i >= 0 ? quadros.get(i) : avulso(s.modo, vista, 0, chave);
      } else {
        const instante = s.tocando ? Math.floor(ciclo * 30) / 30 : t.current;
        chave = `${c}|${instante.toFixed(4)}`;
        q = avulso(s.modo, vista, instante, chave);
      }
      if (!q || chave === chaveAnterior) return;
      if (!chaveAnterior) setDesenhou(true);
      chaveAnterior = chave;
      el.setAttribute('viewBox', q.viewBox);
      if (q.classe) el.setAttribute('class', q.classe);
      else el.removeAttribute('class');
      el.innerHTML = q.html;
      if (fase.current && q.fase.label !== faseAnterior) {
        faseAnterior = q.fase.label;
        fase.current.textContent = q.fase.label;
      }
    };
    raf = requestAnimationFrame(desenhar);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      largarCiclo();
    };
  }, [ficha, txt, estilo]);

  // Movimento reduzido ligado depois de abrir: a animação para.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return;
    const mudou = () => mq.matches && setTocando(false);
    mq.addEventListener?.('change', mudou);
    return () => mq.removeEventListener?.('change', mudou);
  }, []);

  if (falhou)
    return (
      <section className="palco-treino palco-falhou" aria-label="Guia de execução">
        <p className="ajuda" role="status">
          O guia animado não carregou agora. O registro da série continua funcionando.
        </p>
        <button type="button" className="btn sec pequeno" onClick={() => setTentativa((n) => n + 1)}>
          Tentar de novo
        </button>
      </section>
    );
  const trocarModo = (m: ModoDoGuia) => {
    setModo(m);
    // o modo Erros abre no instante em que o certo e o errado mais se afastam, como na tela do guia
    if (m === 'err' && ficha) t.current = ficha.instantesErro[0] ?? 0;
  };

  return (
    <section className="palco-treino" aria-label="Guia de execução" aria-busy={!desenhou}>
      <button type="button" className="palco-btn" aria-label={tocando ? 'Pausar o guia' : 'Tocar o guia'} onClick={() => setTocando((v) => !v)}>
        <span className={`stage${desenhou ? '' : ' esperando'}`}>
          <svg ref={svg} role="img" aria-label={txt ? `O Boneco fazendo ${txt.name.toLowerCase()}` : 'O Boneco fazendo o exercício'} />
        </span>
        <span className="fase-do-movimento" ref={fase} aria-hidden="true" />
        <Icone nome={tocando ? 'pause' : 'play'} className="toca" />
      </button>
      <div className="modos-treino" role="group" aria-label="O que o guia mostra">
        {MODOS.map(([m, rotulo]) => (
          <button key={m} type="button" aria-pressed={modo === m} onClick={() => trocarModo(m)}>
            {rotulo}
          </button>
        ))}
      </div>
      <p className="legenda-do-modo">
        {txt && modo === 'tec' && txt.cues.join(' ')}
        {txt && modo === 'err' && (
          <>
            <b>{txt.errors[0]!.title}.</b> {txt.errors[0]!.desc}
          </>
        )}
        {txt && modo === 'mus' && (
          <>
            <b>Onde sentir:</b> {txt.feel}
          </>
        )}
        {modo === 'traj' && 'Trajetória da carga/mão (a seta mostra a fase concêntrica).'}
      </p>
    </section>
  );
}
