// Motor novo: monta um quadro (corpo + objetos) numa vista e num modo, e calcula o enquadramento do ciclo.
import { corpo3d } from './corpo3d';
import { VISTAS, caixaDosItens, desenharCorpo, desenharPrim, naTela, pintar } from './desenho';
import type { Camera, Estilo, IdVista, Item, P2 } from './desenho';
import { duracao, instante } from './movimento';
import type { Exercicio, Quadro } from './movimento';
import type { Corpo } from './tabelas';

export type Modo = 'tec' | 'mus' | 'traj' | 'err';
export interface OpcoesCena {
  corpo: Corpo;
  vista: IdVista;
  estilo: Estilo;
  modo: Modo;
  erro?: string;
}
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

function itensDoQuadro(cam: Camera, q: Quadro, estilo: Estilo, suf = ''): Item[] {
  const itens: Item[] = [];
  if (!suf) for (const p of q.prims) itens.push(...desenharPrim(cam, p, estilo));
  itens.push(...desenharCorpo(cam, corpo3d(q.esq), { estilo, suf, vies: q.vies }).itens);
  return itens;
}
/** Linha da trajetória de um ponto ao longo da fase concêntrica (ou do ciclo), já na tela. */
function trajetoria(cam: Camera, ex: Exercicio, corpo: Corpo, ponto: string, n = 24): P2[] {
  const le = ex.trajetorias[ponto]!;
  const out: P2[] = [];
  for (let i = 0; i <= n; i++) out.push(naTela(cam, le(ex.quadro(corpo, i / n))));
  return out;
}
export function itensDaCena(ex: Exercicio, t: number, o: OpcoesCena): Item[] {
  const cam = VISTAS[o.vista];
  const { u } = instante(ex.ficha.fases, t);
  const certo = ex.quadro(o.corpo, u);
  if (o.modo === 'err' && o.erro) {
    // o certo em fantasma (contorno), o errado por cima, em cor de erro
    const errado = ex.quadro(o.corpo, u, o.erro);
    return [...itensDoQuadro(cam, certo, o.estilo, '-f').map((it) => ({ ...it, camada: 0.5 })), ...itensDoQuadro(cam, errado, o.estilo).map((it) => ({ ...it, s: it.s.replace(/class="n-([cps]l?)"/g, 'class="n-$1-e"') }))];
  }
  const itens = itensDoQuadro(cam, certo, o.estilo);
  if (o.modo === 'traj') {
    const nomes = Object.keys(ex.trajetorias);
    nomes.forEach((nome, i) => {
      const P = trajetoria(cam, ex, o.corpo, nome);
      const comp = P.reduce((s, p, j) => (j ? s + Math.hypot(p[0] - P[j - 1]![0], p[1] - P[j - 1]![1]) : 0), 0);
      if (comp < 2) return;
      const fim = P[P.length - 1]!;
      itens.push({ d: 0, camada: 3, s: `<polyline class="n-traj${i ? ' n-traj2' : ''}" points="${P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ')}"/><circle class="n-traj-p" cx="${f1(P[0]![0])}" cy="${f1(P[0]![1])}" r="1.6"/><circle class="n-traj-p" cx="${f1(fim[0])}" cy="${f1(fim[1])}" r="1.6"/>` });
    });
  }
  return itens;
}
/** Caixa de visualização do exercício numa vista: cabe o ciclo inteiro (e os erros dessa vista), na proporção 4:3. */
export function enquadrar(ex: Exercicio, o: Omit<OpcoesCena, 'modo' | 'erro'>, margem = 0.06): [number, number, number, number] {
  const T = duracao(ex.ficha.fases);
  const c: [number, number, number, number] = [1e9, 1e9, -1e9, -1e9];
  const junta = (itens: Item[]) => {
    const k = caixaDosItens(itens.filter((it) => it.camada >= 1));
    c[0] = Math.min(c[0], k[0]);
    c[1] = Math.min(c[1], k[1]);
    c[2] = Math.max(c[2], k[2]);
    c[3] = Math.max(c[3], k[3]);
  };
  for (let i = 0; i < 12; i++) junta(itensDaCena(ex, (i / 12) * T, { ...o, modo: 'tec' }));
  for (const e of ex.ficha.erros) if (e.vista === o.vista) for (let i = 0; i < 6; i++) junta(itensDaCena(ex, (i / 6) * T, { ...o, modo: 'err', erro: e.id }));
  let w = c[2] - c[0],
    h = c[3] - c[1];
  let x0 = c[0] - w * margem,
    y0 = c[1] - h * margem * 1.5;
  w *= 1 + 2 * margem;
  h *= 1 + 2.5 * margem;
  if (w / h > 4 / 3) {
    const nh = (w * 3) / 4;
    y0 -= (nh - h) * 0.6;
    h = nh;
  } else {
    const nw = (h * 4) / 3;
    x0 -= (nw - w) / 2;
    w = nw;
  }
  return [x0, y0, w, h];
}
export function svgDaCena(ex: Exercicio, t: number, o: OpcoesCena, vb: [number, number, number, number]): string {
  return `<svg class="novo" viewBox="${vb.map(f1).join(' ')}">${pintar(itensDaCena(ex, t, o))}</svg>`;
}
export { pintar };
