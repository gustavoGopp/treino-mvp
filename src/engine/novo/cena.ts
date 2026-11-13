// Motor novo: monta um quadro (Boneco + objetos) numa vista e num modo, e calcula o enquadramento do ciclo.
import { DEFS_DO_BONECO, desenharBoneco } from './boneco';
import type { IdEstilo } from './boneco';
import { VISTAS, caixaDosItens, desenharPrim, naTela, pintar } from './desenho';
import type { Camera, IdVista, Item, P2 } from './desenho';
import { duracao, instante } from './movimento';
import type { Exercicio, Quadro } from './movimento';
import type { Corpo } from './tabelas';

export type Modo = 'tec' | 'mus' | 'traj' | 'err';
export interface OpcoesCena {
  corpo: Corpo;
  vista: IdVista;
  /** Qual dos dois desenhos aprovados: 'cinza' (padrão) ou 'pele'. */
  boneco: IdEstilo;
  modo: Modo;
  erro?: string;
  /** Miniatura: sem as linhas do corpo, sem as divisões do músculo e sem o polegar. */
  mini?: boolean;
}
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

function itensDoQuadro(cam: Camera, q: Quadro, ex: Exercicio, o: OpcoesCena, suf = ''): Item[] {
  const itens: Item[] = [];
  // o chão não é desenhado como placa: de perfil ele é a linha do chão (ver svgDaCena) e, de cima, é o próprio fundo
  if (suf !== '-f') for (const p of q.prims) if (p.t !== 'chao') itens.push(...desenharPrim(cam, p, 'prancha'));
  itens.push(...desenharBoneco(q.esq, cam, { estilo: o.boneco, papeis: o.modo === 'mus' ? ex.papeis : undefined, mini: o.mini, suf, vies: q.vies }));
  return itens;
}
/**
 * O quadro do movimento em u, guardado: u é arredondado a 1/400 do percurso (menos de 0,3 cm no movimento mais longo),
 * para a animação não refazer a cada volta do ciclo a conta que posiciona o corpo. O mesmo u dá sempre o mesmo quadro.
 */
const QUADROS = new WeakMap<Exercicio, WeakMap<Corpo, Map<string, Quadro>>>();
function quadroDe(ex: Exercicio, corpo: Corpo, u: number, erro?: string): Quadro {
  let porCorpo = QUADROS.get(ex);
  if (!porCorpo) QUADROS.set(ex, (porCorpo = new WeakMap()));
  let m = porCorpo.get(corpo);
  if (!m) porCorpo.set(corpo, (m = new Map()));
  const k = Math.round(u * 400),
    chave = `${erro ?? ''}|${k}`;
  let q = m.get(chave);
  if (!q) m.set(chave, (q = ex.quadro(corpo, k / 400, erro)));
  return q;
}
/** Linha da trajetória de um ponto ao longo da fase concêntrica (ou do ciclo), já na tela. */
function trajetoria(cam: Camera, ex: Exercicio, corpo: Corpo, ponto: string, n = 24): P2[] {
  const le = ex.trajetorias[ponto]!;
  const out: P2[] = [];
  for (let i = 0; i <= n; i++) out.push(naTela(cam, le(quadroDe(ex, corpo, i / n))));
  return out;
}
export function itensDaCena(ex: Exercicio, t: number, o: OpcoesCena): Item[] {
  const cam = VISTAS[o.vista];
  const { u } = instante(ex.ficha.fases, t);
  const certo = quadroDe(ex, o.corpo, u);
  if (o.modo === 'err' && o.erro) {
    // o certo em fantasma (contorno tracejado, por trás) e o errado por cima, na cor de erro
    const errado = quadroDe(ex, o.corpo, u, o.erro);
    return [...itensDoQuadro(cam, certo, ex, o, '-f').map((it) => ({ ...it, camada: 0.5 })), ...itensDoQuadro(cam, errado, ex, o, '-e')];
  }
  const itens = itensDoQuadro(cam, certo, ex, o);
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
/**
 * Caixa de visualização do exercício numa vista: cabe o ciclo inteiro (e os erros dessa vista), na proporção pedida
 * (4:3 no palco, 1:1 na miniatura).
 */
export function enquadrar(ex: Exercicio, o: Omit<OpcoesCena, 'modo' | 'erro'>, margem = 0.06, proporcao = 4 / 3): [number, number, number, number] {
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
  if (w / h > proporcao) {
    const nh = w / proporcao;
    y0 -= (nh - h) * 0.6;
    h = nh;
  } else {
    const nw = h * proporcao;
    x0 -= (nw - w) / 2;
    w = nw;
  }
  return [x0, y0, w, h];
}
/** O <svg> de um quadro. `tema`: 'claro' ou 'escuro'. As classes levam as cores (ver cssDoBoneco e estilo.css). */
export function svgDaCena(ex: Exercicio, t: number, o: OpcoesCena, vb: [number, number, number, number], tema: 'claro' | 'escuro' = 'claro'): string {
  // a linha do chão (y = 0), nas vistas em que o chão fica de perfil
  const chao = VISTAS[o.vista].para[1] === 0 ? `<line class="n-chao-l" x1="${f1(vb[0])}" y1="0" x2="${f1(vb[0] + vb[2])}" y2="0"/>` : '';
  return `<svg class="novo boneco ${o.boneco}${tema === 'escuro' ? ' escuro' : ''}${o.mini ? ' mini' : ''}" viewBox="${vb.map(f1).join(' ')}">${DEFS_DO_BONECO}${chao}${pintar(itensDaCena(ex, t, o))}</svg>`;
}
export { pintar };
