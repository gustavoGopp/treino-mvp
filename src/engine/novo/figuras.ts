// Motor novo: variações de figura para o quadro de opções do boneco. Todas partem do mesmo esqueleto resolvido;
// muda só a forma: pictograma, boneco de cápsulas, e o esqueleto à mostra (para o modelo "vidro").
import { corpo3d } from './corpo3d';
import type { Anel, Volume } from './corpo3d';
import type { Prim } from './desenho';
import { LADOS } from './esqueleto';
import type { Esq, Lado } from './esqueleto';
import { cilindro } from './pecas';
import { add, mul, noRef } from './vec';
import type { Ref, V3 } from './vec';

function ovo(r: Ref, c: V3, rx: number, ry: number, rz: number, afina: number): Volume {
  const aneis: Anel[] = [];
  for (let i = 0; i <= 10; i++) {
    const t = -Math.PI / 2 + (Math.PI * i) / 10;
    const k = Math.max(0.06, Math.cos(t)) * (1 - afina * Math.max(0, -Math.sin(t)));
    aneis.push({ c: add(c, mul(r.y, ry * Math.sin(t))), x: r.x, z: r.z, a: rx * k, f: rz * k, b: rz * k });
  }
  return { aneis };
}
const doLado = (id: string): Lado | null => (/[RL]$/.test(id) && !id.startsWith('orelha') && !id.startsWith('olho') ? (id.slice(-1) as Lado) : null);

/**
 * Pictograma: formas simples e chapadas, a cabeça é uma bola solta do corpo (sem pescoço), sem rosto e sem dedos
 * separados à vista. `longe` clareia o braço e a perna do lado de trás.
 */
export function pictograma(e: Esq, longe: Lado | null = null, realce: Record<string, string> = {}): Prim[] {
  const c3 = corpo3d(e),
    m = (id: string) => e.corpo.m(id);
  const out: Prim[] = [];
  for (const p of c3.partes) {
    if (/^(cabeca|nariz|orelha|olho)/.test(p.id)) continue;
    const lado = doLado(p.id);
    const base = p.id.replace(/[RL]$/, '');
    const cls = realce[base] ?? (lado && lado === longe ? 'peleLonge' : 'pele');
    // do tronco, só o primeiro volume (sem o pescoço)
    for (const v of p.id === 'tronco' ? p.volumes.slice(0, 1) : p.volumes) out.push({ t: 'volume', vol: v, cls });
  }
  for (const j of c3.juntas) {
    const lado = doLado(j.id);
    const base = j.b.replace(/[RL]$/, '');
    out.push({ t: 'esfera', c: j.c, r: j.r * 0.97, cls: realce[base] ?? (lado && lado === longe ? 'peleLonge' : 'pele') });
  }
  // cabeça: uma bola, com uma folga acima dos ombros
  const r = (m('cabeca.altura') + m('cabeca.comp')) / 4;
  out.push({ t: 'esfera', c: noRef(e.cabeca, [0, m('cabeca.tragionAoTopo') - r + 2.5, 1]), r, cls: 'pele' });
  return out;
}

/** Boneco de cápsulas: o corpo inteiro numa peça só (tronco, pescoço, membros fundidos nas articulações) e a cabeça lisa. */
export function capsulas(e: Esq, longe: Lado | null = null, realce: Record<string, string> = {}): Prim[] {
  const c3 = corpo3d(e),
    m = (id: string) => e.corpo.m(id);
  const out: Prim[] = [];
  for (const p of c3.partes) {
    if (/^(cabeca|nariz|orelha|olho)/.test(p.id)) continue;
    const lado = doLado(p.id);
    const base = p.id.replace(/[RL]$/, '');
    for (const v of p.volumes) out.push({ t: 'volume', vol: v, cls: realce[base] ?? (lado && lado === longe ? 'peleLonge' : 'pele') });
  }
  for (const j of c3.juntas) {
    const lado = doLado(j.id);
    const base = j.b.replace(/[RL]$/, '');
    out.push({ t: 'esfera', c: j.c, r: j.r, cls: realce[base] ?? (lado && lado === longe ? 'peleLonge' : 'pele') });
  }
  const topo = m('cabeca.tragionAoTopo'),
    alt = m('cabeca.altura');
  out.push({ t: 'volume', vol: ovo(e.cabeca, noRef(e.cabeca, [0, topo - alt / 2, 1]), m('cabeca.largura') / 2, alt / 2, m('cabeca.comp') / 2, 0.28), cls: 'pele' });
  return out;
}

/** O esqueleto simplificado (para desenhar por cima de um corpo claro): coluna, costelas de cima, bacia, ossos longos e articulações. */
export function ossos(e: Esq): Prim[] {
  const out: Prim[] = [];
  const osso = (a: V3, b: V3, r = 1.15) => out.push({ t: 'volume', vol: cilindro(a, b, r), cls: 'junta' });
  const bola = (c: V3, r = 2.1) => out.push({ t: 'esfera', c, r, cls: 'cabelo' });
  // coluna: de L5–S1 à base do crânio, pelos nós
  const nos = e.nos.map((n) => n.ref.o);
  for (let i = 0; i < nos.length - 1; i++) osso(nos[i]!, nos[i + 1]!, 1.25);
  const cabeca = noRef(e.cabeca, [0, e.corpo.m('cabeca.tragionAoTopo') * 0.45, 1.5]);
  out.push({ t: 'esfera', c: cabeca, r: e.corpo.m('cabeca.largura') * 0.4, cls: 'junta' });
  // bacia
  const base = nos[0]!;
  for (const k of LADOS) {
    const L = e.lado[k];
    osso(base, L.quadril, 1.4);
    osso(L.esternoclavicular, L.acromioclavicular, 0.95);
    osso(L.acromioclavicular, L.ombro, 0.95);
    osso(L.escapula.raiz, L.escapula.anguloInferior, 0.8);
    osso(L.escapula.raiz, L.acromioclavicular, 0.8);
    osso(L.ombro, L.cotovelo);
    osso(L.cotovelo, L.punho, 0.95);
    osso(L.punho, L.pegada, 0.8);
    osso(L.quadril, L.joelho, 1.35);
    osso(L.joelho, L.tornozelo, 1.2);
    osso(L.calcanhar, L.tornozelo, 0.9);
    osso(L.tornozelo, L.bola, 0.9);
    osso(L.bola, L.ponta, 0.8);
    for (const p of [L.ombro, L.cotovelo, L.punho, L.quadril, L.joelho, L.tornozelo]) bola(p);
  }
  osso(e.lado.R.quadril, e.lado.L.quadril, 1.4);
  // esterno: da junção das clavículas para baixo, à frente do tórax
  const meio = mul(add(e.lado.R.esternoclavicular, e.lado.L.esternoclavicular), 0.5);
  osso(meio, add(meio, mul(e.torax.y, -15)), 1.0);
  return out;
}
