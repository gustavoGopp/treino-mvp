import { useEffect, useRef, useState } from 'react';
import { useEstiloBoneco } from '../app/estiloBoneco';
import { largarCiclo, pedirAoBoneco, pedirCiclo, type Ficha, type QuadroGuia } from '../programa/desenhoFora';

// O Boneco da abertura (lote M1 da análise crítica, 19/11/2026): "o Boneco em movimento (é o produto)", como o
// diagnóstico do redesenho já pedia. É o desenho do motor, sem mudança: os quadros de uma volta chegam do Worker do
// Boneco, como no palco do treino (PalcoTreino.tsx), só que sem modos, sem legenda e sem toque. O motor é baixado
// depois que a tela já apareceu, fora do pacote inicial (tests/e2e/orcamento.spec.ts). Com movimento reduzido, fica o
// quadro parado. Se o motor não chegar (sem rede na 1ª visita), o lugar fica vazio e a tela segue inteira.

/** A animação mostrada: o agachamento goblet, o primeiro exercício de muita gente no app. */
const ANIMACAO = 'goblet';

const reduzMovimento = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function BonecoAbertura() {
  const estilo = useEstiloBoneco();
  const [ficha, setFicha] = useState<Ficha | null>(null);
  const [desenhou, setDesenhou] = useState(false);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let vivo = true;
    // no celular mais baixo o Boneco não aparece (styles.css): aí o motor nem é baixado
    if (!svg.current?.clientWidth) return;
    pedirAoBoneco<Ficha | null>({ tipo: 'ficha', animacaoId: ANIMACAO, estilo }).then(
      (f) => vivo && setFicha(f),
      () => undefined,
    );
    return () => {
      vivo = false;
    };
  }, [estilo]);

  useEffect(() => {
    if (!ficha) return;
    let raf = 0;
    let vivo = true;
    let largura = svg.current?.clientWidth ?? 0;
    let pedido = 0;
    let anterior = -1;
    const inicio = performance.now();
    const quadros = new Map<number, QuadroGuia>();
    const vista = ficha.vistaMovimento;
    const pintar = (q: QuadroGuia) => {
      const el = svg.current;
      if (!el || !q) return;
      el.setAttribute('viewBox', q.viewBox);
      if (q.classe) el.setAttribute('class', q.classe);
      else el.removeAttribute('class');
      el.innerHTML = q.html;
      setDesenhou(true);
    };
    // o quadro parado chega primeiro (e é o único com movimento reduzido ou sem Worker)
    void pedirAoBoneco<QuadroGuia>({ tipo: 'quadroGuia', animacaoId: ficha.id, vista, modo: 'tec', t: 0, erro: 0, largura, estilo, tituloErro: '' }).then(
      (q) => vivo && anterior < 0 && pintar(q),
      () => undefined,
    );
    const desenhar = (agora: number) => {
      raf = requestAnimationFrame(desenhar);
      const el = svg.current;
      if (!el || document.hidden) return;
      const l = el.clientWidth;
      if (l && l !== pedido) {
        pedido = largura = l;
        quadros.clear();
        if (!pedirCiclo({ animacaoId: ficha.id, vista, modo: 'tec', erro: 0, largura, estilo, tituloErro: '' }, (i, q) => quadros.set(i, q))) return cancelAnimationFrame(raf);
      }
      const ciclo = (((agora - inicio) / 1000) % ficha.T + ficha.T) % ficha.T;
      let i = Math.floor(ciclo * 30);
      while (i >= 0 && !quadros.has(i)) i--;
      if (i < 0 || i === anterior) return;
      anterior = i;
      pintar(quadros.get(i));
    };
    if (!reduzMovimento()) raf = requestAnimationFrame(desenhar);
    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      largarCiclo();
    };
  }, [ficha, estilo]);

  return (
    <div className={`boneco-abertura stage${desenhou ? '' : ' esperando'}`}>
      {/* "slice": o desenho enche a altura da coluna e sobra para os lados (o quadro do motor é largo; o Boneco, estreito) */}
      <svg ref={svg} role="img" aria-label="O Boneco do app fazendo um agachamento" preserveAspectRatio="xMidYMid slice" />
    </div>
  );
}
