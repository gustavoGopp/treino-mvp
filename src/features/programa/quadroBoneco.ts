import { EX } from '../../engine';
import { montarPrevia, montarSvgEstilo, vistaDaMiniatura, type Estilo } from '../../engine/estilo';

// Os desenhos parados do Boneco: o quadro das miniaturas e a prévia de cada estilo. Funções puras sobre o motor
// (src/engine, sem mudança), chamadas no Worker (boneco.worker.ts) para não travar a tela.
//
// Quadro parado da animação, no modo "músculos" (sem textos, com os músculos trabalhados em destaque).
// O instante é o meio da segunda pausa do ciclo (posição contraída ou alongada), ou o meio do ciclo.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
const cache = new Map<string, { viewBox: string; html: string; classe: string }>();

export function instante(ex: Animacao): number {
  let t = 0;
  const pausas: number[] = [];
  for (const s of ex.seq as { kind: string; dur: number }[]) {
    if (s.kind === 'hold') pausas.push(t + s.dur / 2);
    t += s.dur;
  }
  return pausas[1] ?? t / 2;
}

// No boneco novo, a vista é a que mostra mais o músculo principal (vistaDaMiniatura); no clássico, a principal.
export function quadro(animacaoId: string, estilo: Estilo = 'atual') {
  const chave = animacaoId + '|' + estilo;
  if (!cache.has(chave)) {
    const ex: Animacao | undefined = EX.find((e: Animacao) => e.id === animacaoId);
    if (!ex) return null;
    const t = instante(ex);
    const q = montarSvgEstilo(ex, vistaDaMiniatura(ex, t, estilo), 'mus', t, 0, 120, estilo);
    cache.set(chave, { viewBox: q.viewBox, html: q.html, classe: q.classe });
  }
  return cache.get(chave)!;
}

/** A prévia de um estilo em "Meus dados": o agachamento goblet de lado, no fundo do movimento, modo músculos. */
const previas = new Map<Estilo, { viewBox: string; html: string; classe: string }>();
export function previaEstilo(e: Estilo) {
  if (!previas.has(e)) {
    const goblet: Animacao = EX.find((x: Animacao) => x.id === 'goblet');
    const fundo = goblet.seq[2];
    previas.set(e, montarPrevia(goblet, 'lateral', 'mus', fundo.t0 + fundo.dur / 2, e));
  }
  return previas.get(e)!;
}
