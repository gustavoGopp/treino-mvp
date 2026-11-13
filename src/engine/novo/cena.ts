// Motor novo: monta um quadro (Boneco + objetos) numa vista e num modo, e calcula o enquadramento do ciclo.
import { DEFS_DO_BONECO, desenharBoneco } from './boneco';
import type { IdEstilo } from './boneco';
import { VISTAS, caixaDosItens, desenharPrim, naTela, pintar } from './desenho';
import type { Camera, IdVista, Item, P2 } from './desenho';
import { equipamentoRealista } from './equipamento';
import type { Tema } from './equipamento';
import { duracao, instante } from './movimento';
import { noRef } from './vec';
import type { V3 } from './vec';
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
  /** Equipamento: 'realista' (o desenho dos cartões do app; o padrão) ou 'simples' (as peças da conferência). */
  equipamento?: 'realista' | 'simples';
  /** O tema decide os tons do equipamento realista (as cores do corpo vêm do CSS). */
  tema?: Tema;
}
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();

/** Os filtros (sombra macia) que o equipamento realista do último quadro montado precisa dentro do <svg>. */
let DEFS = '';
/** O equipamento de um quadro: o desenho dos cartões, ou as peças simples quando pedido (ou quando o quadro não diz as peças). */
function equipamento(cam: Camera, q: Quadro, ex: Exercicio, o: OpcoesCena): Item[] {
  if (o.equipamento !== 'simples' && q.pecas) {
    const r = equipamentoRealista(q.pecas, cam, o.tema ?? 'claro', `${ex.ficha.id}-${o.vista}-`);
    DEFS += r.defs;
    return r.itens;
  }
  return q.prims.filter((p) => p.t !== 'chao').flatMap((p) => desenharPrim(cam, p, 'volume'));
}
function itensDoQuadro(cam: Camera, q: Quadro, ex: Exercicio, o: OpcoesCena, suf = ''): Item[] {
  const itens: Item[] = [];
  // o chão não é desenhado como placa: de perfil ele é a linha do chão (ver svgDaCena) e, de cima, é o próprio fundo
  if (suf !== '-f') itens.push(...equipamento(cam, q, ex, o));
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
    const errado = quadroDe(ex, o.corpo, u, o.erro);
    const def = ex.ficha.erros.find((e) => e.id === o.erro);
    const GRUPOS: Record<string, string[]> = { pernas: ['pernaR', 'pernaL'], bracos: ex.ficha.simetrico ? ['bracoR', 'bracoL'] : ['bracoR'], corpo: ['corpo'] };
    const erroEm = (def?.destaca ?? []).flatMap((g) => GRUPOS[g] ?? []);
    // o corpo errado, com a parte que erra em vermelho; o certo fica tracejado por trás
    const itens: Item[] = [...itensDoQuadro(cam, certo, ex, o, '-f').map((it) => ({ ...it, camada: 0.5 }))];
    itens.push(...equipamento(cam, errado, ex, o));
    const corpoErrado = desenharBoneco(errado.esq, cam, { estilo: o.boneco, mini: o.mini, erroEm, vies: errado.vies });
    itens.push(...corpoErrado);
    if (def) {
      // a linha do erro (cheia, vermelha) e a do movimento certo (tracejada), pelos mesmos pontos do corpo
      const doMeio: Record<string, (e: Quadro['esq']) => V3> = { pelve: (e) => e.pelve.o, lombar: (e) => e.nos[e.iT12]!.ref.o, c7: (e) => e.torax.o, cabeca: (e) => noRef(e.cabeca, [0, 6, 6]) };
      const lados: ('R' | 'L')[] = !ex.ficha.simetrico || Math.abs(cam.para[0]) > 0.7 ? ['R'] : ['R', 'L'];
      const ponto = (e: Quadro['esq'], nome: string, k: 'R' | 'L'): V3 => (doMeio[nome] ? doMeio[nome](e) : (e.lado[k] as unknown as Record<string, V3>)[nome]!);
      const linha = (e: Quadro['esq'], k: 'R' | 'L') => def.linha.map((nome) => naTela(cam, ponto(e, nome, k)));
      const pts = (P: P2[]) => P.map((p) => `${f1(p[0])},${f1(p[1])}`).join(' ');
      let s = '';
      for (const k of lados) s += `<polyline class="n-certo-l" points="${pts(linha(certo.esq, k))}"/>`;
      for (const k of lados) {
        const P = linha(errado.esq, k),
          f = naTela(cam, ponto(errado.esq, def.foco, k));
        s += `<polyline class="n-err-l" points="${pts(P)}"/><circle class="n-err-p" cx="${f1(f[0])}" cy="${f1(f[1])}" r="2.4"/>`;
      }
      if (!o.mini) {
        // o nome do erro fica fora do corpo, ao lado do ponto que erra, com um fio até ele
        const cx = caixaDosItens(corpoErrado);
        const focos = lados.map((k) => naTela(cam, ponto(errado.esq, def.foco, k)));
        const f = focos.reduce((a, b) => (b[0] > a[0] ? b : a));
        const tam = 9,
          larg = def.titulo.length * tam * 0.56;
        const x = cx[2] + 7,
          y = Math.min(f[1], cx[3] - 4);
        s += `<line class="n-err-fio" x1="${f1(f[0])}" y1="${f1(f[1])}" x2="${f1(x - 1.5)}" y2="${f1(y - tam * 0.3)}"/><text class="n-err-t" x="${f1(x)}" y="${f1(y)}" font-size="${tam}">${def.titulo}</text>`;
        itens.push({ d: 0, camada: 3, s, cx: [Math.min(cx[0], f[0]), y - tam, x + larg, y + 2] });
      } else itens.push({ d: 0, camada: 3, s });
    }
    return itens;
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
  DEFS = '';
  const corpo = pintar(itensDaCena(ex, t, { ...o, tema }));
  return `<svg class="novo boneco ${o.boneco}${tema === 'escuro' ? ' escuro' : ''}${o.mini ? ' mini' : ''}" viewBox="${vb.map(f1).join(' ')}">${DEFS_DO_BONECO}${DEFS ? `<defs>${DEFS}</defs>` : ''}${chao}${corpo}</svg>`;
}
export { pintar };
