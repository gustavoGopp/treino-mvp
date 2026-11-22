import { useEffect, useRef, useState } from 'react';
import { NotaDoGuia } from '../guia/NotaDoGuia';
import type { ConteudoExercicio } from '../../conteudo/schema';
import { NOME_DA_VISTA } from '../../engine/novo/vistas';
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

/**
 * O palco tem dois tamanhos (lote M2 da análise crítica, adiantado a pedido do Gustavo em 22/11/2026: "quando clicar
 * você consegue entrar já na animação"):
 * - **de repouso**, na tela da série: o Boneco no que sobra da tela, e um toque nele o amplia (`aoAmpliar`). Antes, o
 *   toque só pausava, e para ver grande a pessoa saía do treino;
 * - **ampliado** (`ampliado`), numa folha por cima do treino: o desenho com metade da tela ou mais, as quatro abas, a
 *   legenda e a pausa num botão próprio. O treino (e o descanso, se houver) segue por baixo.
 * Só um dos dois desenha por vez (o Worker calcula uma volta de cada vez): o de repouso fica `parado` enquanto o
 * ampliado está aberto.
 * A nota do exercício (`comNota`): desde a ligação das 81 animações (22/11/2026), a montagem segura dos exercícios que
 * eram cartão de texto é a nota do guia. Ela aparece sempre no palco ampliado, e no de repouso quando a tela pede
 * (exercício com travas ou ancoragem: seguranca.montagem, "antes da série").
 */
export function PalcoTreino({
  animacaoId,
  ampliado = false,
  aoAmpliar,
  parado = false,
  comNota = ampliado,
}: {
  animacaoId: string;
  ampliado?: boolean;
  aoAmpliar?: () => void;
  parado?: boolean;
  comNota?: boolean;
}) {
  const estilo = useEstiloBoneco();
  const [txt, setTxt] = useState<ConteudoExercicio | null>(null);
  const [ficha, setFicha] = useState<Ficha | null>(null);
  // o guia não chegou (sem rede e sem o arquivo guardado, versão nova publicada): a tela diz e deixa tentar de novo
  const [falhou, setFalhou] = useState(false);
  const [tentativa, setTentativa] = useState(0);
  const [modo, setModo] = useState<ModoDoGuia>('tec');
  const [tocando, setTocando] = useState(() => !reduzMovimento());
  const [desenhou, setDesenhou] = useState(false);
  // Só no ampliado (pedido do Gustavo em 22/11/2026: "que apareça aquelas opções tanto de velocidade quanto de ângulo
  // para entender melhor"): a câmera lenta e o ângulo, como no guia completo. Sem escolha, o ângulo é o de cada aba.
  const [lento, setLento] = useState(false);
  const [vistaEscolhida, setVistaEscolhida] = useState<string | null>(null);

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
  const estado = useRef({ modo, tocando, lento, vistaEscolhida });
  estado.current = { modo, tocando, lento, vistaEscolhida };

  // O laço da animação: o mesmo desenho da tela do guia. Tocando, a volta inteira chega do Worker quadro a quadro
  // (30 por segundo de animação); pausado, só o quadro do instante exato; fora da tela, nada é desenhado.
  useEffect(() => {
    if (!ficha || !txt || parado) return;
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
      // a câmera lenta anda a 35% da velocidade, como no guia completo
      if (s.tocando) t.current += dt * (s.lento ? 0.35 : 1);
      const el = svg.current;
      if (!el || !visivel || document.hidden || !largura) return;
      const vista = s.vistaEscolhida ?? vistaDo(s.modo, ficha);
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
        // régua cara-humana, cortes aprovados pelo Gustavo em 22/11/2026: "Descida", sem o termo técnico ("· excêntrica"), que continua no guia completo
        fase.current.textContent = q.fase.label.split(' · ')[0];
      }
    };
    raf = requestAnimationFrame(desenhar);
    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      io?.disconnect();
      largarCiclo();
    };
  }, [ficha, txt, estilo, parado]);

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
    // cada aba abre no ângulo dela; a escolha de ângulo vale até trocar de aba
    setVistaEscolhida(null);
    // o modo Erros abre no instante em que o certo e o errado mais se afastam, como na tela do guia
    if (m === 'err' && ficha) t.current = ficha.instantesErro[0] ?? 0;
  };

  const desenho = (
    <>
      <span className={`stage${desenhou ? '' : ' esperando'}`}>
        <svg ref={svg} role="img" aria-label={txt ? `O Boneco fazendo ${txt.name.toLowerCase()}` : 'O Boneco fazendo o exercício'} />
      </span>
      <span className="fase-do-movimento" ref={fase} aria-hidden="true" />
    </>
  );
  return (
    <section className={`palco-treino${ampliado ? ' palco-ampliado' : ''}`} aria-label={ampliado ? 'Guia de execução, ampliado' : 'Guia de execução'} aria-busy={!desenhou}>
      {ampliado ? (
        <div className="palco-btn palco-grande">
          {desenho}
          <button type="button" className="pausa-do-guia" aria-label={tocando ? 'Pausar o guia' : 'Tocar o guia'} onClick={() => setTocando((v) => !v)}>
            <Icone nome={tocando ? 'pause' : 'play'} />
          </button>
        </div>
      ) : (
        <button type="button" className="palco-btn" aria-label="Ampliar o guia" aria-haspopup="dialog" onClick={aoAmpliar}>
          {desenho}
          <Icone nome="maximize-2" className="toca" />
        </button>
      )}
      {ampliado && ficha && (
        <div className="controles-do-guia">
          <button type="button" className="chip" aria-pressed={lento} onClick={() => setLento((v) => !v)}>
            <Icone nome="turtle" /> Lento
          </button>
          <div className="angulos" role="group" aria-label="Ângulo">
            {[...new Set([...ficha.views, vistaEscolhida ?? vistaDo(modo, ficha)])].map((v) => (
              <button key={v} type="button" className="chip" aria-pressed={v === (vistaEscolhida ?? vistaDo(modo, ficha))} onClick={() => setVistaEscolhida(v)}>
                {NOME_DA_VISTA[v] ?? v}
              </button>
            ))}
          </div>
        </div>
      )}
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
      {comNota && txt?.note && <NotaDoGuia nota={txt.note} />}
    </section>
  );
}
