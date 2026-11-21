// Motor novo: duas conferências que valem para todas as animações (acréscimo de 19/11/2026, depois das auditorias de
// 18/11, que acharam peças pintadas por cima de partes do corpo que estão na frente delas, e cabos que atravessam o
// corpo, com a conferência dando 0 falha). Nada aqui muda o desenho: as duas medem o desenho que o app pinta.
//
// 1) Pintura. Em cada vista do exercício (e na de cada erro), num punhado de quadros da técnica e de cada erro, o quadro
//    é montado como no app: os itens do Boneco (desenharBoneco, com o `vies` do quadro naquela vista) e os do
//    equipamento realista (com o `dz` de cada peça), na ordem do pintor (camada, depois profundidade). Numa grade de
//    meio centímetro na tela, só onde há corpo, cada ponto recebe duas respostas:
//    - o que o pintor põe por cima: o item de maior ordem que cobre o ponto (o corpo cobre onde a malha das partes
//      desenhadas cobre; a peça, onde a forma 3D dela, projetada, cobre);
//    - o que está mesmo na frente: o que o raio de quem olha encontra primeiro (a pele, pela malha das partes, e as
//      peças pela forma 3D que o gerador realista guarda em cada item, `g3`).
//    Quando uma peça é pintada por cima e o corpo está na frente dela, ou o contrário, o ponto conta. Tolerâncias (o
//    contato, onde a pele encosta na peça): o ponto só conta se a parte que devia aparecer está mais de TOL_CONTATO cm
//    à frente da outra, medido ao longo do raio; a pele que afunda dentro da peça (o glúteo no assento) é contato, e
//    não conta; a mão não conta contra a peça que ela segura (a pegada a até RAIO_DA_PEGADA cm da peça). Um achado é
//    uma parte do corpo com pelo menos AREA_MINIMA cm² pintados do jeito errado contra uma peça, num quadro e numa vista.
//    Os furos de uma peça (acréscimo de 19/11/2026: a máscara do recorte do rolo, que a peça guarda em `Item.fora`)
//    contam: dentro deles a peça não é pintada por cima de nada, e a pele que aparece por um furo estando atrás da peça
//    é achado ('corpo-por-cima'), fora da beira do furo (um ponto da grade), por onde o furo passa da pele de propósito
//    para mostrar o traço do contorno. Antes, a conferência não via a máscara.
// 2) Fios dentro do corpo. Cabos, fitas, cordas e elásticos (os fios que a conferência declara, `prims` do tipo `fio`, e
//    as linhas que o desenho traça, fora as de detalhe que correm sobre a superfície de um sólido da própria peça):
//    pontos a cada meio centímetro, e quanto cada um entra na pele de cada parte do corpo. Conta o que passa de
//    TOL_FIO cm para dentro da pele. A exceção é onde o fio se prende: a mão (e o polegar), o pé e a canela até
//    PERTO_DO_TORNOZELO cm do tornozelo.
import { desenharBoneco, formaDoBoneco } from './boneco';
import { VISTAS, casco, contorno, desenharPrim } from './desenho';
import type { Camera, IdVista, Item, P2, Prim } from './desenho';
import { equipamentoRealista } from './equipamento';
import type { Lado } from './esqueleto';
import { duracao, instante } from './movimento';
import type { Exercicio, Quadro } from './movimento';
import type { Peca } from './pecas';
import { PINTOR_POR_PARES_LIGADO } from './pintor-ligado';
import { opcoesDe, ordenarPorPares, remendoDe } from './pintor-por-pares';
import { MAT } from './realista/base.mjs';
import type { Geometria3d } from './realista/base.mjs';
import type { Corpo } from './tabelas';
import { add, cross, dist, dot, len, mul, norm, sub } from './vec';
import type { V3 } from './vec';

/** Tamanho do ponto da grade na tela (cm). */
export const PASSO_DA_GRADE = 0.5;
/** Contato: a parte que devia aparecer tem de estar mais que isto (cm) à frente da outra, ao longo do raio. */
export const TOL_CONTATO = 1;
/** Uma parte do corpo conta como achado com pelo menos esta área (cm²) pintada do jeito errado contra uma peça. */
export const AREA_MINIMA = 1;
/** A peça que a mão segura: a que passa a até esta distância (cm) do centro da pegada. */
export const RAIO_DA_PEGADA = 4;
/** ...e, da mesma peça, o que fica a até esta distância (cm) da pegada (a cabeça do halter, a bola do kettlebell). */
export const PERTO_DA_PEGADA = 12;
/** Um fio conta quando a linha do meio dele entra mais que isto (cm) na pele. */
export const TOL_FIO = 1;
/** Onde o fio se prende no tornozelo: a canela, até esta distância (cm) do tornozelo, fica de fora (e o pé inteiro). */
export const PERTO_DO_TORNOZELO = 12;
/** Uma linha desenhada é detalhe (não fio) quando corre inteira a até isto (cm) de um sólido da mesma peça. */
const SOBRE_O_SOLIDO = 0.6;

/* ============================== a forma 3D de cada item ============================== */
interface Plano {
  n: V3;
  d: number;
}
type Forma =
  | { t: 'solido'; planos: Plano[]; pts: V3[] }
  | { t: 'fio'; pts: V3[]; r: number }
  | { t: 'esfera'; c: V3; r: number }
  | { t: 'placa'; pts: V3[]; n: V3; d: number };

const media = (P: V3[]): V3 => mul(P.reduce((a, p) => add(a, p), [0, 0, 0] as V3), 1 / P.length);
/** Os planos das faces de um sólido convexo, com a normal para fora (pelo centro de todos os pontos). */
function planos(faces: V3[][]): Plano[] {
  const cen = media(faces.flat());
  const out: Plano[] = [];
  for (const f of faces) {
    if (f.length < 3) continue;
    let n: V3 = [0, 0, 0];
    for (let k = 0; k < f.length; k++) {
      const a = f[k]!,
        b = f[(k + 1) % f.length]!;
      n = add(n, [(a[1] - b[1]) * (a[2] + b[2]), (a[2] - b[2]) * (a[0] + b[0]), (a[0] - b[0]) * (a[1] + b[1])]);
    }
    if (len(n) < 1e-9) continue;
    n = norm(n);
    let d = dot(n, media(f));
    if (dot(n, cen) > d) {
      n = mul(n, -1);
      d = -d;
    }
    out.push({ n, d });
  }
  return out;
}
const FORMAS = new WeakMap<object, Forma | null>();
/** A forma de um item do equipamento realista (pela `g3` que o gerador guarda); `null` = o item não tem forma (detalhe). */
function formaDoItem(it: Item): Forma | null {
  if (FORMAS.has(it)) return FORMAS.get(it)!;
  const g: Geometria3d | undefined = it.g3;
  let f: Forma | null = null;
  if (g && 'faces' in g) f = { t: 'solido', planos: planos(g.faces), pts: g.faces.flat() };
  else if (g && 'frente' in g) {
    const { frente, tras } = g;
    const n = frente.length;
    const lados = frente.map((p, i) => [p, frente[(i + 1) % n]!, tras[(i + 1) % n]!, tras[i]!]);
    f = { t: 'solido', planos: planos([frente, tras, ...lados]), pts: [...frente, ...tras] };
  } else if (g && 'esfera' in g) f = { t: 'esfera', c: g.esfera, r: g.r };
  else if (g && 'placa' in g) {
    const P = g.placa;
    const n = norm(cross(sub(P[1]!, P[0]!), sub(P[2]!, P[0]!)));
    f = len(n) > 0.5 ? { t: 'placa', pts: P, n, d: dot(n, P[0]!) } : null;
  } else if (g && 'fio' in g) f = { t: 'fio', pts: g.fio, r: g.w / 2 };
  FORMAS.set(it, f);
  return f;
}
/** A forma de uma peça simples da conferência (o desenho dos quadros sem `pecas`). */
function formaDoPrim(p: Prim): Forma | null {
  if (p.t === 'caixa') {
    const c = (sx: number, sy: number, sz: number): V3 => add(add(add(p.ref.o, mul(p.ref.x, sx * p.meias[0])), mul(p.ref.y, sy * p.meias[1])), mul(p.ref.z, sz * p.meias[2]));
    const faces: V3[][] = [];
    for (const s of [-1, 1]) {
      faces.push([c(s, -1, -1), c(s, 1, -1), c(s, 1, 1), c(s, -1, 1)]);
      faces.push([c(-1, s, -1), c(1, s, -1), c(1, s, 1), c(-1, s, 1)]);
      faces.push([c(-1, -1, s), c(1, -1, s), c(1, 1, s), c(-1, 1, s)]);
    }
    return { t: 'solido', planos: planos(faces), pts: faces.flat() };
  }
  if (p.t === 'esfera') return { t: 'esfera', c: p.c, r: p.r };
  if (p.t === 'fio') return { t: 'fio', pts: p.pts, r: p.larg / 2 };
  if (p.t === 'volume' || p.t === 'prisma') {
    // o casco dos anéis (cilindro) ou das duas tampas
    const aneis =
      p.t === 'volume'
        ? p.vol.aneis.map((an) => Array.from({ length: 16 }, (_, i): V3 => add(an.c, add(mul(an.x, an.a * Math.cos((i * Math.PI) / 8)), mul(an.z, (Math.sin((i * Math.PI) / 8) >= 0 ? an.f : an.b) * Math.sin((i * Math.PI) / 8))))))
        : [p.a, p.b].map((c) => Array.from({ length: p.lados }, (_, i): V3 => add(c, add(mul(p.x, p.ra * Math.cos((2 * Math.PI * i) / p.lados)), mul(p.z, p.rb * Math.sin((2 * Math.PI * i) / p.lados))))));
    const faces: V3[][] = [aneis[0]!, aneis[aneis.length - 1]!];
    for (let i = 0; i + 1 < aneis.length; i++) {
      const A = aneis[i]!,
        B = aneis[i + 1]!;
      for (let k = 0; k < A.length; k++) faces.push([A[k]!, A[(k + 1) % A.length]!, B[(k + 1) % A.length]!, B[k]!]);
    }
    return { t: 'solido', planos: planos(faces), pts: faces.flat() };
  }
  return null;
}
/** Distância (aproximada por baixo nos cantos) de um ponto à forma; negativa = dentro. */
function distanciaAForma(f: Forma, p: V3): number {
  if (f.t === 'solido') return Math.max(...f.planos.map((pl) => dot(pl.n, p) - pl.d));
  if (f.t === 'esfera') return dist(p, f.c) - f.r;
  const P = f.t === 'placa' ? [...f.pts, f.pts[0]!] : f.pts;
  let m = 1e9;
  for (let i = 0; i + 1 < P.length; i++) m = Math.min(m, distAoSegmento(p, P[i]!, P[i + 1]!));
  return m - (f.t === 'fio' ? f.r : 0);
}
function distAoSegmento(p: V3, a: V3, b: V3): number {
  const d = sub(b, a),
    l2 = dot(d, d);
  const t = l2 < 1e-12 ? 0 : Math.max(0, Math.min(1, dot(sub(p, a), d) / l2));
  return dist(p, add(a, mul(d, t)));
}

/* ============================== o pintor por pares (ver ./pintor-por-pares.ts) ============================== */
/** Um remendo do pintor por pares: o item `de` pintado de novo, só dentro de `dentro` e fora de `fora` (na tela). */
export interface RemendoDeEstudo {
  de: Item;
  dentro: P2[][];
  fora: P2[][];
}
/**
 * Um pintor de estudo (o pintor por pares, desligado no app): devolve a camada 1 na ordem dele. O que cada item é vem
 * do próprio item (`Item.pp`): o Boneco já diz as partes; as peças, a conferência diz aqui (desenha cada uma sozinha).
 */
export interface PintorDeEstudo {
  ordenar(itens: Item[]): Item[];
  remendoDe(it: Item): RemendoDeEstudo | undefined;
}
/** Uma pintura de um item: a ordem dela e, num remendo, o recorte. */
interface Ordem {
  k: number;
  rec?: RemendoDeEstudo;
}

/* ============================== as partes do Boneco ============================== */
interface Parte {
  grupo: string;
  nome: string;
  lado?: Lado;
  aneis: { c: V3; x: V3; z: V3; a: number; f: number; b: number }[];
}
const NOMES: Record<string, [string, string?, string?]> = {
  coxa: ['coxa', 'direita', 'esquerda'],
  canela: ['canela', 'direita', 'esquerda'],
  pe: ['pé', 'direito', 'esquerdo'],
  braco: ['braço', 'direito', 'esquerdo'],
  ante: ['antebraço', 'direito', 'esquerdo'],
  mao: ['mão', 'direita', 'esquerda'],
  polegar: ['polegar', 'direito', 'esquerdo'],
  cabeca: ['cabeça'],
  pescoco: ['pescoço'],
  tronco: ['tronco'],
  cintura: ['cintura'],
  emendaDaCintura: ['cintura'],
  pelve: ['bacia'],
};
/** O nome de uma parte em português, com o lado ("canela esquerda"). */
export function nomeDaParte(nome: string, lado?: Lado): string {
  const n = NOMES[nome] ?? [nome];
  return lado && n[1] ? `${n[0]} ${lado === 'R' ? n[1] : n[2]}` : n[0];
}
const DA_MAO = new Set(['mao', 'polegar']);

/* ============================== o quadro como o app pinta ============================== */
/** O ajuste de profundidade das partes num quadro, numa vista (como em ./cena.ts). */
const viesNaVista = (q: Quadro, vista: IdVista): Record<string, number> | undefined => (q.viesNaVista?.[vista] ? { ...q.vies, ...q.viesNaVista[vista] } : q.vies);
const ordem = (it: Item) => it.camada * 1e6 + it.d;
const NOMES_DAS_PECAS: Partial<Record<Peca['t'], string>> = { halter: 'halter', anilha: 'anilha', bancoReto: 'banco reto', torre: 'coluna de polia', estribo: 'estribo', cabo: 'cabo', colchonete: 'colchonete', kettlebell: 'kettlebell', elastico: 'elástico', pegador: 'pegador do elástico' };
const MATERIAIS: [string, string][] = Object.entries(MAT).map(([k, tons]) => [k, `stroke="${tons[3]}"`]);
/** O nome de um item do equipamento: a peça e o material (pelo traço do contorno). */
function nomeDoItem(peca: string, it: Item, f: Forma): string {
  if (f.t === 'fio') return `${peca} (traço)`;
  if (f.t === 'esfera' || f.t === 'placa') return peca;
  const mat = MATERIAIS.filter(([, s]) => it.s.includes(s)).map(([k]) => k);
  return mat.length ? `${peca} (${mat[mat.length - 1]})` : peca;
}
interface ItemDaPeca {
  it: Item;
  forma: Forma;
  nome: string;
  peca: number;
}
/** Se a peça vai para trás do corpo de propósito (ver AchadoDePintura.deProposito). */
function deProposito(x: ItemDaPeca, cam: Camera): AchadoDePintura['deProposito'] {
  if (x.it.camada < 1) return 'cenário';
  const f = x.forma;
  const P = f.t === 'esfera' ? [f.c] : f.pts;
  const natural = P.reduce((a, p) => a + dot(p, cam.para), 0) / P.length;
  return natural - x.it.d >= EMPURRADA ? 'empurrada' : undefined;
}
/** O equipamento do quadro na vista, peça por peça (a mesma lista que o app pinta, na mesma ordem). */
function equipamentoDoQuadro(q: Quadro, cam: Camera, prefixo: string): ItemDaPeca[] {
  const out: ItemDaPeca[] = [];
  if (q.pecas)
    q.pecas.forEach((p, i) => {
      const nome = p.t === 'propria' ? p.nome : (NOMES_DAS_PECAS[p.t] ?? p.t);
      for (const it of equipamentoRealista([p], cam, 'claro', `${prefixo}${i}-`).itens) {
        if (it.camada <= 0) continue;
        const forma = formaDoItem(it);
        if (forma) out.push({ it, forma, nome: nomeDoItem(nome, it, forma), peca: i });
      }
    });
  else
    q.prims.forEach((p, i) => {
      if (p.t === 'chao') return;
      const forma = formaDoPrim(p);
      if (forma) for (const it of desenharPrim(cam, p, 'volume')) out.push({ it, forma, nome: p.cls, peca: i });
    });
  return out;
}

/* ============================== 1) pintura ============================== */
export interface AchadoDePintura {
  /** 'peca-por-cima': a peça pintada por cima de uma parte do corpo que está na frente dela; 'corpo-por-cima': o contrário. */
  tipo: 'peca-por-cima' | 'corpo-por-cima';
  vista: IdVista;
  onde: string;
  parte: string;
  peca: string;
  /** Área pintada do jeito errado (cm²). */
  area: number;
  /** A maior distância, ao longo do raio, entre a parte que devia aparecer e a outra (cm). */
  frente: number;
  /** Os pontos da grade (centro, na tela) pintados do jeito errado, para a imagem do caso. */
  pontos?: [number, number][];
  /**
   * A peça vai para trás do corpo de propósito (o corpo por cima dela não é erro de ordem, e sim escolha declarada no
   * código da peça): 'cenário' = a peça marcada `cenario` (a coluna do búlgaro, a estrutura do suporte); 'empurrada' = a
   * peça pintada pelo menos EMPURRADA cm atrás da profundidade dela (as pontas da barra longa, `pontasAtras`).
   */
  deProposito?: 'cenário' | 'empurrada';
}
/** Uma peça pintada pelo menos isto (cm) atrás da profundidade do próprio centro foi empurrada para trás de propósito. */
export const EMPURRADA = 50;

/**
 * Num quadro e numa vista: as partes do corpo pintadas do jeito errado contra uma peça. `pontos` = guardar os pontos da
 * grade de cada achado (para a imagem).
 */
export function pinturaDoQuadro(q: Quadro, vista: IdVista, onde: string, prefixo: string, pontos = false, pintor?: PintorDeEstudo): AchadoDePintura[] {
  const cam = VISTAS[vista];
  const h = PASSO_DA_GRADE;
  const e = q.esq;
  // o Boneco como o app pinta, e a ordem de cada parte: a do último item que pinta o contorno dela
  const boneco = desenharBoneco(e, cam, { estilo: 'cinza', vies: viesNaVista(q, vista) });
  const forma = formaDoBoneco(e, { cabeloAtrasPrimeiro: dot(cam.para, e.cabeca.z) > 0.45 });
  const eq = equipamentoDoQuadro(q, cam, prefixo);
  if (!eq.length) return [];
  // com o pintor por pares, cada item diz de que peça do quadro é (desenhada sozinha, a peça diria 0)
  if (pintor) for (const x of eq) x.it = { ...x.it, pp: { k: 'peca', peca: x.peca } };
  // Estudo do pintor (acréscimo de 19/11, só com `pintor`; sem ele, nada muda): a ordem de cada item é a posição dele
  // na lista do pintor de estudo, e um remendo (o item pintado de novo, recortado) conta só dentro do recorte.
  const ordensDe = new Map<Item, Ordem[]>();
  if (pintor) {
    pintor.ordenar([...eq.map((x) => x.it), ...boneco]).forEach((it, r) => {
      const rec = pintor.remendoDe(it);
      const base = rec?.de ?? it;
      const l = ordensDe.get(base) ?? [];
      l.push({ k: 1e6 + r, rec });
      ordensDe.set(base, l);
    });
  }
  const ordens = (it: Item): Ordem[] => ordensDe.get(it) ?? [{ k: ordem(it) }];
  const partes: (Parte & { ordens: Ordem[] })[] = [];
  for (const g of forma.grupos)
    for (const v of g.volumes) {
      const fill = `d="${contorno(cam, v.vol, null, true).fill}"`;
      const dela = boneco.filter((it) => it.s.includes(fill));
      // a parte que o app não pinta (o braço de longe escondido atrás do corpo) fica de fora
      if (!dela.length) continue;
      partes.push({ grupo: g.id, nome: v.nome ?? g.id, lado: g.lado, aneis: v.vol.aneis, ordens: dela.flatMap(ordens) });
    }
  // a malha de cada parte, na tela: N pontos por anel, [x, y, profundidade]
  const tela = (p: V3): [number, number, number] => [dot(p, cam.dir), -dot(p, cam.cima), dot(p, cam.para)];
  const malhas = partes.map((pt) =>
    pt.aneis.map((an) => {
      const c = tela(an.c),
        X = [dot(an.x, cam.dir), -dot(an.x, cam.cima), dot(an.x, cam.para)],
        Z = [dot(an.z, cam.dir), -dot(an.z, cam.cima), dot(an.z, cam.para)];
      const anel: number[][] = [];
      for (let k = 0; k < N; k++) {
        const u = an.a * COS[k]!,
          w = (SEN[k]! >= 0 ? an.f : an.b) * SEN[k]!;
        anel.push([c[0] + u * X[0]! + w * Z[0]!, c[1] + u * X[1]! + w * Z[1]!, c[2] + u * X[2]! + w * Z[2]!]);
      }
      return { anel, c };
    }),
  );
  let x0 = 1e9,
    y0 = 1e9,
    x1 = -1e9,
    y1 = -1e9;
  for (const m of malhas)
    for (const { anel } of m)
      for (const p of anel) {
        x0 = Math.min(x0, p[0]!);
        y0 = Math.min(y0, p[1]!);
        x1 = Math.max(x1, p[0]!);
        y1 = Math.max(y1, p[1]!);
      }
  // a grade cobre só onde o corpo e alguma peça se encontram na tela
  let ex0 = 1e9,
    ey0 = 1e9,
    ex1 = -1e9,
    ey1 = -1e9;
  for (const x of eq) {
    const c = caixaNaTela(x, cam);
    if (!c) continue;
    ex0 = Math.min(ex0, c[0]);
    ey0 = Math.min(ey0, c[1]);
    ex1 = Math.max(ex1, c[2]);
    ey1 = Math.max(ey1, c[3]);
  }
  x0 = Math.max(x0, ex0) - 1;
  y0 = Math.max(y0, ey0) - 1;
  x1 = Math.min(x1, ex1);
  y1 = Math.min(y1, ey1);
  if (x1 < x0 || y1 < y0) return [];
  const W = Math.ceil((x1 + 1 - x0) / h),
    H = Math.ceil((y1 + 1 - y0) / h);
  const n = W * H;
  // o corpo: a pele mais perto de quem olha (zF, de que parte) e o item de maior ordem que cobre o ponto (kT, a
  // profundidade dele ali e de que parte)
  const G = grade(n);
  const { zF, kT, zT, vF, vT, eK, eKz, eF, eKi, eFi } = G;
  // o recorte de cada remendo, na grade (estudo do pintor)
  const mascaras = new Map<RemendoDeEstudo, Uint8Array>();
  const mascara = (rec: RemendoDeEstudo): Uint8Array => {
    let m = mascaras.get(rec);
    if (m) return m;
    m = new Uint8Array(n);
    const pinta = (P: P2[], v: number) => {
      const xs = P.map((p) => p[0]),
        ys = P.map((p) => p[1]);
      const i0 = Math.max(0, Math.floor((Math.min(...xs) - x0) / h)),
        i1 = Math.min(W - 1, Math.ceil((Math.max(...xs) - x0) / h)),
        j0 = Math.max(0, Math.floor((Math.min(...ys) - y0) / h)),
        j1 = Math.min(H - 1, Math.ceil((Math.max(...ys) - y0) / h));
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) if (dentroDoPoligono(x0 + (i + 0.5) * h, y0 + (j + 0.5) * h, P)) m![j * W + i] = v;
    };
    for (const P of rec.dentro) pinta(P, 1);
    for (const P of rec.fora) pinta(P, 0);
    mascaras.set(rec, m);
    return m;
  };
  /** A ordem de um item num ponto da grade: a maior das pinturas dele que cobrem o ponto. */
  const kNo = (os: Ordem[], ix: number) => {
    let k = -Infinity;
    for (const o of os) if (o.k > k && (!o.rec || mascara(o.rec)[ix])) k = o.k;
    return k;
  };
  const triangulo = (a: number[], b: number[], c: number[], vi: number, ks: Ordem[]) => {
    const ax = (a[0]! - x0) / h,
      ay = (a[1]! - y0) / h,
      bx = (b[0]! - x0) / h,
      by = (b[1]! - y0) / h,
      cx = (c[0]! - x0) / h,
      cy = (c[1]! - y0) / h;
    const area = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    if (Math.abs(area) < 1e-9) return;
    const i0 = Math.max(0, Math.floor(Math.min(ax, bx, cx))),
      i1 = Math.min(W - 1, Math.ceil(Math.max(ax, bx, cx))),
      j0 = Math.max(0, Math.floor(Math.min(ay, by, cy))),
      j1 = Math.min(H - 1, Math.ceil(Math.max(ay, by, cy)));
    for (let j = j0; j <= j1; j++) {
      const py = j + 0.5;
      for (let i = i0; i <= i1; i++) {
        const px = i + 0.5;
        const w0 = ((bx - px) * (cy - py) - (by - py) * (cx - px)) / area,
          w1 = ((cx - px) * (ay - py) - (cy - py) * (ax - px)) / area,
          w2 = 1 - w0 - w1;
        if (w0 < -1e-9 || w1 < -1e-9 || w2 < -1e-9) continue;
        const z = w0 * a[2]! + w1 * b[2]! + w2 * c[2]!;
        const ix = j * W + i;
        if (z > zF[ix]!) {
          zF[ix] = z;
          vF[ix] = vi;
        }
        const k = ks.length === 1 && !ks[0]!.rec ? ks[0]!.k : kNo(ks, ix);
        if (k > kT[ix]!) {
          kT[ix] = k;
          zT[ix] = z;
          vT[ix] = vi;
        } else if (k === kT[ix] && z > zT[ix]!) {
          zT[ix] = z;
          vT[ix] = vi;
        }
      }
    }
  };
  // só as faces viradas para quem olha (a malha é fechada pelas tampas: o raio entra sempre por uma delas)
  const virado = (a: number[], b: number[], c: number[], cen: number[]) => {
    const u0 = b[0]! - a[0]!,
      u1 = b[1]! - a[1]!,
      u2 = b[2]! - a[2]!,
      w0 = c[0]! - a[0]!,
      w1 = c[1]! - a[1]!,
      w2 = c[2]! - a[2]!;
    const n0 = u1 * w2 - u2 * w1,
      n1 = u2 * w0 - u0 * w2,
      n2 = u0 * w1 - u1 * w0;
    const fora = (a[0]! + b[0]! + c[0]!) / 3 - cen[0]! || 0,
      fora1 = (a[1]! + b[1]! + c[1]!) / 3 - cen[1]!,
      fora2 = (a[2]! + b[2]! + c[2]!) / 3 - cen[2]!;
    const s = n0 * fora + n1 * fora1 + n2 * fora2;
    return (s >= 0 ? n2 : -n2) > -1e-9;
  };
  malhas.forEach((m, vi) => {
    const k = partes[vi]!.ordens;
    for (let r = 0; r + 1 < m.length; r++) {
      const A = m[r]!.anel,
        B = m[r + 1]!.anel;
      const cen = [(m[r]!.c[0] + m[r + 1]!.c[0]) / 2, (m[r]!.c[1] + m[r + 1]!.c[1]) / 2, (m[r]!.c[2] + m[r + 1]!.c[2]) / 2];
      for (let s = 0; s < N; s++) {
        const t = (s + 1) % N;
        if (virado(A[s]!, A[t]!, B[t]!, cen)) triangulo(A[s]!, A[t]!, B[t]!, vi, k);
        if (virado(A[s]!, B[t]!, B[s]!, cen)) triangulo(A[s]!, B[t]!, B[s]!, vi, k);
      }
    }
    // as tampas das pontas
    for (const r of [0, m.length - 1]) {
      const { anel, c } = m[r]!;
      for (let s = 0; s < N; s++) triangulo(c, anel[s]!, anel[(s + 1) % N]!, vi, k);
    }
  });
  // os furos de uma peça (a máscara que o recorte do rolo põe nela, `Item.fora`; acréscimo de 19/11/2026), na grade:
  // dentro deles a peça não é pintada (nem no remendo dela, que leva a mesma máscara), mas continua onde está. 1 = no
  // furo; 2 = na beira dele (a um ponto da grade da borda): ali o furo passa da pele de propósito, para mostrar o traço do
  // contorno, e o que aparece é o traço, que a grade não vê (a pele que aparece por um furo só conta do lado de dentro)
  let furo: Uint8Array | null = null;
  const furosDe = new Map<number, Uint8Array>();
  const furosNaGrade = (F: P2[][]): Uint8Array => {
    const m = new Uint8Array(n);
    for (const P of F) {
      const xs = P.map((p) => p[0]),
        ys = P.map((p) => p[1]);
      const i0 = Math.max(0, Math.floor((Math.min(...xs) - x0) / h)),
        i1 = Math.min(W - 1, Math.ceil((Math.max(...xs) - x0) / h)),
        j0 = Math.max(0, Math.floor((Math.min(...ys) - y0) / h)),
        j1 = Math.min(H - 1, Math.ceil((Math.max(...ys) - y0) / h));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) if (dentroDoPoligono(x0 + (i + 0.5) * h, y0 + (j + 0.5) * h, P)) m[j * W + i] = 1;
    }
    for (let ix = 0; ix < n; ix++) {
      if (!m[ix]) continue;
      const i = ix % W,
        j = Math.floor(ix / W);
      for (let dj = -1; dj <= 1 && m[ix] === 1; dj++)
        for (let di = -1; di <= 1; di++) {
          const a = i + di,
            b = j + dj;
          if (a < 0 || b < 0 || a >= W || b >= H || !m[b * W + a]) {
            m[ix] = 3;
            break;
          }
        }
    }
    for (let ix = 0; ix < n; ix++) if (m[ix] === 3) m[ix] = 2;
    return m;
  };
  // as peças: o item de maior ordem que cobre o ponto (eK, a entrada dele e qual) e a peça mais perto de quem olha
  // (eF, a entrada e a saída dela e qual); num furo, a peça não cobre o ponto, mas pode estar na frente da pele que
  // aparece por ele (o achado 'corpo-por-cima')
  const marca = (ix: number, idx: number, ks: Ordem[], entra: number) => {
    const k = furo?.[ix] ? -Infinity : ks.length === 1 && !ks[0]!.rec ? ks[0]!.k : kNo(ks, ix);
    if (k > eK[ix]!) {
      eK[ix] = k;
      eKz[ix] = entra;
      eKi[ix] = idx;
    }
    if (entra > eF[ix]!) {
      eF[ix] = entra;
      eFi[ix] = idx;
    }
  };
  const caixaNaGrade = (xa: number, ya: number, xb: number, yb: number) => [Math.max(0, Math.floor((xa - x0) / h)), Math.min(W - 1, Math.ceil((xb - x0) / h)), Math.max(0, Math.floor((ya - y0) / h)), Math.min(H - 1, Math.ceil((yb - y0) / h))] as const;
  eq.forEach(({ it, forma: f }, idx) => {
    const k = ordens(it);
    furo = it.fora?.length ? furosNaGrade(it.fora) : null;
    if (furo) furosDe.set(idx, furo);
    if (f.t === 'solido') {
      // o sólido convexo: na tela, o contorno dele (o casco dos cantos); a entrada do raio é a face da frente mais perto
      const s = solidoNaTela(it, f, cam);
      if (!s) return;
      const [i0, i1, j0, j1] = caixaNaGrade(s.cx[0], s.cx[1], s.cx[2], s.cx[3]);
      const { casco: Hc, frente: pl } = s;
      for (let j = j0; j <= j1; j++) {
        const sy = y0 + (j + 0.5) * h;
        let xa = Infinity,
          xb = -Infinity;
        for (let q = 0; q < Hc.length; q++) {
          const A = Hc[q]!,
            B = Hc[(q + 1) % Hc.length]!;
          if ((A[1] < sy && B[1] < sy) || (A[1] > sy && B[1] > sy)) continue;
          const x = A[1] === B[1] ? A[0] : A[0] + ((sy - A[1]) * (B[0] - A[0])) / (B[1] - A[1]);
          xa = Math.min(xa, x, A[1] === B[1] ? B[0] : x);
          xb = Math.max(xb, x, A[1] === B[1] ? B[0] : x);
        }
        if (xa > xb) continue;
        const ia = Math.max(i0, Math.ceil((xa - x0) / h - 0.5)),
          ib = Math.min(i1, Math.floor((xb - x0) / h - 0.5));
        for (let i = ia; i <= ib; i++) {
          const ix = j * W + i;
          if (kT[ix] === -Infinity) continue;
          const sx = x0 + (i + 0.5) * h;
          let entra = Infinity;
          for (let q = 0; q < pl.length; q += 4) {
            const t = (pl[q + 3]! - sx * pl[q]! + sy * pl[q + 1]!) / pl[q + 2]!;
            if (t < entra) entra = t;
          }
          marca(ix, idx, k, entra);
        }
      }
    } else if (f.t === 'esfera') {
      const c = tela(f.c);
      const [i0, i1, j0, j1] = caixaNaGrade(c[0] - f.r, c[1] - f.r, c[0] + f.r, c[1] + f.r);
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) {
          const ix = j * W + i;
          if (kT[ix] === -Infinity) continue;
          const r2 = f.r * f.r - (x0 + (i + 0.5) * h - c[0]) ** 2 - (y0 + (j + 0.5) * h - c[1]) ** 2;
          if (r2 >= 0) marca(ix, idx, k, c[2] + Math.sqrt(r2));
        }
    } else if (f.t === 'placa') {
      const P = f.pts.map(tela);
      const c = dot(f.n, cam.para);
      if (Math.abs(c) < 1e-6) return;
      const [i0, i1, j0, j1] = caixaNaGrade(Math.min(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[0])), Math.max(...P.map((p) => p[1])));
      for (let j = j0; j <= j1; j++)
        for (let i = i0; i <= i1; i++) {
          const ix = j * W + i;
          if (kT[ix] === -Infinity) continue;
          const sx = x0 + (i + 0.5) * h,
            sy = y0 + (j + 0.5) * h;
          if (!dentroDoPoligono(sx, sy, P)) continue;
          const z = (f.d - sx * dot(f.n, cam.dir) + sy * dot(f.n, cam.cima)) / c;
          marca(ix, idx, k, z);
        }
    } else {
      // o fio: a faixa da largura do traço em volta da linha, na profundidade do ponto mais perto da linha
      const P = f.pts.map(tela);
      for (let s = 0; s + 1 < P.length; s++) {
        const A = P[s]!,
          B = P[s + 1]!;
        const [i0, i1, j0, j1] = caixaNaGrade(Math.min(A[0], B[0]) - f.r, Math.min(A[1], B[1]) - f.r, Math.max(A[0], B[0]) + f.r, Math.max(A[1], B[1]) + f.r);
        const dx = B[0] - A[0],
          dy = B[1] - A[1],
          l2 = dx * dx + dy * dy;
        for (let j = j0; j <= j1; j++)
          for (let i = i0; i <= i1; i++) {
            const ix = j * W + i;
            if (kT[ix] === -Infinity) continue;
            const sx = x0 + (i + 0.5) * h,
              sy = y0 + (j + 0.5) * h;
            const t = l2 < 1e-12 ? 0 : Math.max(0, Math.min(1, ((sx - A[0]) * dx + (sy - A[1]) * dy) / l2));
            if ((sx - A[0] - t * dx) ** 2 + (sy - A[1] - t * dy) ** 2 > f.r * f.r) continue;
            const z = A[2] + (B[2] - A[2]) * t;
            marca(ix, idx, k, z + f.r);
          }
      }
    }
  });
  // a peça que cada mão segura
  const naMao = new Map<string, boolean>();
  const perto = (j: number, lado: Lado, r: number) => distanciaAForma(eq[j]!.forma, e.lado[lado].pegada) <= r;
  const segura = (idx: number, lado: Lado) => {
    const ch = `${idx}${lado}`;
    let r = naMao.get(ch);
    if (r === undefined) naMao.set(ch, (r = perto(idx, lado, RAIO_DA_PEGADA) || (perto(idx, lado, PERTO_DA_PEGADA) && eq.some((x, j) => x.peca === eq[idx]!.peca && perto(j, lado, RAIO_DA_PEGADA)))));
    return r;
  };
  const achados = new Map<string, AchadoDePintura>();
  for (let ix = 0; ix < n; ix++) {
    if (kT[ix] === -Infinity || (eK[ix] === -Infinity && eF[ix] === -Infinity)) continue;
    const pecaPorCima = eK[ix]! > kT[ix]!,
      pecaNaFrente = eF[ix]! > zF[ix]!;
    let tipo: AchadoDePintura['tipo'], idx: number, vi: number, frente: number;
    if (pecaPorCima && !pecaNaFrente) {
      tipo = 'peca-por-cima';
      idx = eKi[ix]!;
      vi = vF[ix]!;
      frente = zF[ix]! - eKz[ix]!;
    } else if (!pecaPorCima && pecaNaFrente) {
      tipo = 'corpo-por-cima';
      idx = eFi[ix]!;
      if (furosDe.get(idx)?.[ix] === 2) continue;
      vi = vT[ix]!;
      frente = eF[ix]! - zF[ix]!;
    } else continue;
    if (frente <= TOL_CONTATO) continue;
    const pt = partes[vi]!;
    if (DA_MAO.has(pt.nome) && pt.lado && segura(idx, pt.lado)) continue;
    // o contato: o ponto da peça (ou da pele) que devia ficar escondido está encostado na outra, ou dentro dela (a
    // pele que afunda no assento, a ponta da almofada da rosca Scott afundada no peito): é a linha de contato ou a
    // sobreposição dos volumes, e não erro de pintura (quanto o corpo atravessa uma peça, a conferência dos objetos mede)
    const sx = x0 + ((ix % W) + 0.5) * h,
      sy = y0 + (Math.floor(ix / W) + 0.5) * h;
    const noRaio = (t: number) => add(add(mul(cam.dir, sx), mul(cam.cima, -sy)), mul(cam.para, t));
    if (tipo === 'peca-por-cima') {
      const p = noRaio(eKz[ix]!);
      if (partes.some((x) => folgaAteAParte(p, x) <= TOL_CONTATO)) continue;
    } else if (distanciaAForma(eq[idx]!.forma, noRaio(zF[ix]!)) <= TOL_CONTATO) continue;
    const ch = `${tipo}|${pt.nome}|${pt.lado ?? ''}|${eq[idx]!.nome}`;
    let a = achados.get(ch);
    if (!a) {
      const dp = tipo === 'corpo-por-cima' ? deProposito(eq[idx]!, cam) : undefined;
      achados.set(ch, (a = { tipo, vista, onde, parte: nomeDaParte(pt.nome, pt.lado), peca: eq[idx]!.nome, area: 0, frente: 0, ...(dp ? { deProposito: dp } : {}), ...(pontos ? { pontos: [] } : {}) }));
    }
    a.area += h * h;
    a.frente = Math.max(a.frente, frente);
    a.pontos?.push([x0 + ((ix % W) + 0.5) * h, y0 + (Math.floor(ix / W) + 0.5) * h]);
  }
  return [...achados.values()].filter((a) => a.area >= AREA_MINIMA - 1e-9);
}
const N = 16;
const COS = Array.from({ length: N }, (_, k) => Math.cos((2 * Math.PI * k) / N)),
  SEN = Array.from({ length: N }, (_, k) => Math.sin((2 * Math.PI * k) / N));
/** As tabelas da grade, guardadas de uma vez para a outra (só crescem). */
let GRADE: ReturnType<typeof novaGrade> | null = null;
const novaGrade = (n: number) => ({
  n,
  zF: new Float64Array(n),
  kT: new Float64Array(n),
  zT: new Float64Array(n),
  vF: new Int16Array(n),
  vT: new Int16Array(n),
  eK: new Float64Array(n),
  eKz: new Float64Array(n),
  eF: new Float64Array(n),
  eKi: new Int32Array(n),
  eFi: new Int32Array(n),
});
function grade(n: number) {
  if (!GRADE || GRADE.n < n) GRADE = novaGrade(Math.max(n, 1 << 16));
  const G = GRADE;
  for (const a of [G.zF, G.kT, G.zT, G.eK, G.eF]) a.fill(-Infinity, 0, n);
  for (const a of [G.vF, G.vT, G.eKi, G.eFi]) a.fill(-1, 0, n);
  return G;
}
/** A caixa de um item na tela. */
function caixaNaTela(x: ItemDaPeca, cam: Camera): [number, number, number, number] | null {
  const f = x.forma;
  if (f.t === 'solido') return solidoNaTela(x.it, f, cam)?.cx ?? null;
  const P = f.t === 'esfera' ? [f.c] : f.pts;
  const r = f.t === 'esfera' || f.t === 'fio' ? f.r : 0;
  const X = P.map((p) => dot(p, cam.dir)),
    Y = P.map((p) => -dot(p, cam.cima));
  return [Math.min(...X) - r, Math.min(...Y) - r, Math.max(...X) + r, Math.max(...Y) + r];
}
const NA_TELA = new WeakMap<Item, { cx: [number, number, number, number]; casco: P2[]; frente: Float64Array } | null>();
/** Um sólido na tela: a caixa e o contorno (casco dos cantos) e, das faces viradas para quem olha, [n·dir, n·cima, n·para, d]. */
function solidoNaTela(it: Item, f: Extract<Forma, { t: 'solido' }>, cam: Camera) {
  if (NA_TELA.has(it)) return NA_TELA.get(it)!;
  const P = f.pts.map((p): P2 => [dot(p, cam.dir), -dot(p, cam.cima)]);
  const fr = f.planos.filter((p) => dot(p.n, cam.para) > 1e-9);
  const r = fr.length
    ? {
        cx: [Math.min(...P.map((p) => p[0])), Math.min(...P.map((p) => p[1])), Math.max(...P.map((p) => p[0])), Math.max(...P.map((p) => p[1]))] as [number, number, number, number],
        casco: casco(P),
        frente: Float64Array.from(fr.flatMap((p) => [dot(p.n, cam.dir), dot(p.n, cam.cima), dot(p.n, cam.para), p.d])),
      }
    : null;
  NA_TELA.set(it, r);
  return r;
}
function dentroDoPoligono(x: number, y: number, P: number[][]): boolean {
  let dentro = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const a = P[i]!,
      b = P[j]!;
    if (a[1]! > y !== b[1]! > y && x < ((b[0]! - a[0]!) * (y - a[1]!)) / (b[1]! - a[1]!) + a[0]!) dentro = !dentro;
  }
  return dentro;
}

/* ============================== 2) fios dentro do corpo ============================== */
export interface AchadoDeFio {
  onde: string;
  fio: string;
  parte: string;
  /** Quanto a linha do meio do fio entra na pele (cm). */
  entra: number;
  /** Os pontos do fio que entram além da tolerância, para a imagem do caso. */
  pontos?: V3[];
}
const CAIXAS = new WeakMap<object, [V3, V3]>();
/** A caixa (no mundo) que contém uma parte do corpo. */
function caixaDaParte(pt: Parte): [V3, V3] {
  let c = CAIXAS.get(pt.aneis);
  if (c) return c;
  const lo: V3 = [1e9, 1e9, 1e9],
    hi: V3 = [-1e9, -1e9, -1e9];
  for (const an of pt.aneis) {
    const r = Math.max(an.a, an.f, an.b);
    for (let k = 0; k < 3; k++) {
      lo[k] = Math.min(lo[k]!, an.c[k]! - r);
      hi[k] = Math.max(hi[k]!, an.c[k]! + r);
    }
  }
  CAIXAS.set(pt.aneis, (c = [lo, hi]));
  return c;
}
/**
 * A folga de um ponto até a pele de uma parte (cm; negativa = dentro), pela seção oval de cada anel, ao longo da reta
 * do centro da seção ao ponto. Fora do comprimento da parte (além das pontas), conta a esfera do anel da ponta.
 */
function folgaAteAParte(p: V3, pt: Parte): number {
  const c0 = caixaDaParte(pt);
  const m = TOL_CONTATO + 1;
  if (p[0] < c0[0][0] - m || p[1] < c0[0][1] - m || p[2] < c0[0][2] - m || p[0] > c0[1][0] + m || p[1] > c0[1][1] + m || p[2] > c0[1][2] + m) return Infinity;
  let menor = Infinity;
  const A = pt.aneis;
  for (const an of [A[0]!, A[A.length - 1]!]) menor = Math.min(menor, dist(p, an.c) - Math.max(an.a, an.f, an.b));
  for (let i = 0; i + 1 < A.length; i++) {
    const a = A[i]!,
      b = A[i + 1]!;
    const d = sub(b.c, a.c),
      l2 = dot(d, d);
    if (l2 < 1e-9) continue;
    const t = dot(sub(p, a.c), d) / l2;
    if (t < 0 || t > 1) continue;
    const mx = (u: number, v: number) => u + (v - u) * t;
    const r = sub(p, add(a.c, mul(d, t)));
    const u = dot(r, norm(add(mul(a.x, 1 - t), mul(b.x, t)))),
      v = dot(r, norm(add(mul(a.z, 1 - t), mul(b.z, t))));
    const ra = mx(a.a, b.a),
      rv = v >= 0 ? mx(a.f, b.f) : mx(a.b, b.b);
    if (ra < 1e-6 || rv < 1e-6) continue;
    const rho = Math.hypot(u / ra, v / rv);
    menor = Math.min(menor, rho < 1e-6 ? -Math.min(ra, rv) : Math.hypot(u, v) * (1 - 1 / rho));
  }
  return menor;
}
/** Quanto um ponto entra numa parte do corpo (cm, pela seção oval de cada anel); 0 = fora. */
function entraNaParte(p: V3, pt: Parte, caixa: [V3, V3]): number {
  if (p[0] < caixa[0][0] || p[1] < caixa[0][1] || p[2] < caixa[0][2] || p[0] > caixa[1][0] || p[1] > caixa[1][1] || p[2] > caixa[1][2]) return 0;
  let pior = 0;
  const A = pt.aneis;
  for (let i = 0; i + 1 < A.length; i++) {
    const a = A[i]!,
      b = A[i + 1]!;
    const d = sub(b.c, a.c),
      l2 = dot(d, d);
    if (l2 < 1e-9) continue;
    const t = dot(sub(p, a.c), d) / l2;
    if (t < 0 || t > 1) continue;
    const mx = (u: number, v: number) => u + (v - u) * t;
    const c = add(a.c, mul(d, t)),
      x = norm(add(mul(a.x, 1 - t), mul(b.x, t))),
      z = norm(add(mul(a.z, 1 - t), mul(b.z, t)));
    const r = sub(p, c);
    const u = dot(r, x),
      v = dot(r, z);
    const ra = mx(a.a, b.a),
      rv = v >= 0 ? mx(a.f, b.f) : mx(a.b, b.b);
    if (ra < 1e-6 || rv < 1e-6) continue;
    const rho = Math.hypot(u / ra, v / rv);
    if (rho >= 1) continue;
    pior = Math.max(pior, rho < 1e-6 ? Math.min(ra, rv) : Math.hypot(u, v) * (1 / rho - 1));
  }
  return pior;
}
/** Os fios de um quadro: os que a conferência declara e as linhas que o desenho traça (fora as de detalhe). */
function fiosDoQuadro(q: Quadro, cam: Camera, prefixo: string): { nome: string; pts: V3[] }[] {
  const fios: { nome: string; pts: V3[] }[] = [];
  for (const p of q.prims) if (p.t === 'fio' && p.cls !== 'risco') fios.push({ nome: `fio "${p.cls}" da conferência`, pts: p.pts });
  const eq = equipamentoDoQuadro(q, cam, prefixo);
  for (const x of eq) {
    const g = x.it.g3;
    if (!g || !('fio' in g)) continue;
    // a linha de detalhe (o recartilhado da barra, as ranhuras da plataforma) corre sobre um sólido da mesma peça
    const solidos = eq.filter((y) => y.peca === x.peca && y.forma.t !== 'fio');
    const amostra = amostrar(g.fio, 1);
    if (solidos.length && amostra.every((p) => solidos.some((y) => distanciaAForma(y.forma, p) <= SOBRE_O_SOLIDO))) continue;
    fios.push({ nome: x.nome.replace(/ \(traço\)$/, '') + (x.forma.t === 'fio' ? ' (traço)' : ' (corda)'), pts: g.fio });
  }
  return fios;
}
function amostrar(P: V3[], passo: number): V3[] {
  const out: V3[] = [P[0]!];
  for (let i = 0; i + 1 < P.length; i++) {
    const a = P[i]!,
      b = P[i + 1]!;
    const k = Math.max(1, Math.ceil(dist(a, b) / passo));
    for (let j = 1; j <= k; j++) out.push(add(a, mul(sub(b, a), j / k)));
  }
  return out;
}
export function fiosNoCorpo(q: Quadro, onde: string, prefixo: string, pontos = false): AchadoDeFio[] {
  const e = q.esq;
  const fios = fiosDoQuadro(q, VISTAS.quina, prefixo);
  if (!fios.length) return [];
  const partes: Parte[] = [];
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      const nome = v.nome ?? g.id;
      // onde o fio se prende: a mão e o polegar (e o pé, mais adiante, com a canela perto do tornozelo)
      if (!DA_MAO.has(nome)) partes.push({ grupo: g.id, nome, lado: g.lado, aneis: v.vol.aneis });
    }
  const achados = new Map<string, AchadoDeFio>();
  for (const fio of fios)
    for (const p of amostrar(fio.pts, 0.5))
      for (const pt of partes) {
        if (pt.nome === 'pe') continue;
        if (pt.nome === 'canela' && pt.lado && dist(p, e.lado[pt.lado].tornozelo) <= PERTO_DO_TORNOZELO) continue;
        const entra = entraNaParte(p, pt, caixaDaParte(pt));
        if (entra <= TOL_FIO) continue;
        const ch = `${fio.nome}|${pt.nome}|${pt.lado ?? ''}`;
        let a = achados.get(ch);
        if (!a) achados.set(ch, (a = { onde, fio: fio.nome, parte: nomeDaParte(pt.nome, pt.lado), entra, ...(pontos ? { pontos: [] } : {}) }));
        a.entra = Math.max(a.entra, entra);
        a.pontos?.push(p);
      }
  return [...achados.values()];
}

/* ============================== 3) peso rígido dentro do corpo ============================== */
/** Um peso rígido conta quando entra mais que isto (cm) na pele (a pele cede um pouco onde a barra apoia nas costas). */
export const TOL_PESO = 1;
/** As peças que são peso rígido: as do motor e as de cena com estes nomes. */
const PESOS = new Set<string>(['halter', 'kettlebell', 'anilha']);
const PESOS_DE_CENA = /^(barra longa|barra W|barra hexagonal|barra do smith|barra-reta-polia)/;
export interface AchadoDePeso {
  onde: string;
  peso: string;
  parte: string;
  /** Quanto o peso entra na pele (cm). */
  entra: number;
  pontos?: V3[];
}
/** Pontos de dentro e da superfície de um sólido (os cantos, o eixo e o meio das faces), de uma esfera ou de um fio. */
function pontosDaForma(it: Item, f: Forma): V3[] {
  const g = it.g3;
  if (f.t === 'esfera') {
    const out: V3[] = [f.c];
    for (let i = 0; i < 26; i++) {
      const y = 1 - (2 * (i + 0.5)) / 26,
        r = Math.sqrt(1 - y * y),
        a = i * 2.39996;
      out.push(add(f.c, mul([r * Math.cos(a), y, r * Math.sin(a)], f.r)));
    }
    return out;
  }
  if (f.t !== 'solido') return amostrar(f.pts, 1);
  if (g && 'frente' in g) {
    const out: V3[] = [];
    const cF = media(g.frente),
      cT = media(g.tras);
    const k = Math.max(2, Math.ceil(dist(cF, cT)));
    for (let j = 0; j <= k; j++) {
      const t = j / k;
      out.push(add(cF, mul(sub(cT, cF), t)));
      for (let i = 0; i < g.frente.length; i++) out.push(add(g.frente[i]!, mul(sub(g.tras[i]!, g.frente[i]!), t)));
    }
    return out;
  }
  return [...f.pts, media(f.pts)];
}
/** Os pesos rígidos do quadro (halter, kettlebell, anilha, barras) e quanto cada um entra em cada parte do corpo, fora a mão e o polegar (onde a mão segura). */
export function pesoNoCorpo(q: Quadro, onde: string, prefixo: string, pontos = false): AchadoDePeso[] {
  if (!q.pecas) return [];
  const e = q.esq;
  const cam = VISTAS.quina;
  const pesos: { nome: string; pts: V3[] }[] = [];
  q.pecas.forEach((p, i) => {
    const nome = p.t === 'propria' ? p.nome : p.t;
    if (!(p.t === 'propria' ? PESOS_DE_CENA.test(p.nome) : PESOS.has(p.t))) return;
    const pts: V3[] = [];
    for (const it of equipamentoRealista([p], cam, 'claro', `${prefixo}${i}-`).itens) {
      const f = it.camada > 0 ? formaDoItem(it) : null;
      // os traços de detalhe (o recartilhado, a presilha) não são o volume do peso
      if (f && f.t !== 'fio') pts.push(...pontosDaForma(it, f));
    }
    if (pts.length) pesos.push({ nome: (NOMES_DAS_PECAS[p.t] ?? nome) as string, pts });
  });
  if (!pesos.length) return [];
  const partes: Parte[] = [];
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      const nome = v.nome ?? g.id;
      if (!DA_MAO.has(nome)) partes.push({ grupo: g.id, nome, lado: g.lado, aneis: v.vol.aneis });
    }
  const achados = new Map<string, AchadoDePeso>();
  for (const peso of pesos)
    for (const p of peso.pts)
      for (const pt of partes) {
        const entra = entraNaParte(p, pt, caixaDaParte(pt));
        if (entra <= TOL_PESO) continue;
        const ch = `${peso.nome}|${pt.nome}|${pt.lado ?? ''}`;
        let a = achados.get(ch);
        if (!a) achados.set(ch, (a = { onde, peso: peso.nome, parte: nomeDaParte(pt.nome, pt.lado), entra, ...(pontos ? { pontos: [] } : {}) }));
        a.entra = Math.max(a.entra, entra);
        a.pontos?.push(p);
      }
  return [...achados.values()];
}

/* ============================== os quadros e o resultado ============================== */
export interface QuadroMedido {
  q: Quadro;
  onde: string;
  vistas: IdVista[];
}
/**
 * Os quadros que as duas conferências medem: seis do ciclo da técnica (em tempos iguais, mais o do fim do movimento,
 * se ele não estiver entre os seis), nas vistas do exercício, e três de cada erro (u = 0, 0,5 e 1), nas vistas do
 * exercício e na do erro. `ciclo`: os quadros do ciclo que a conferência já montou (60 por segundo), para não montar
 * de novo; `doErro`: idem, os de cada erro.
 */
export function quadrosMedidos(ex: Exercicio, corpo: Corpo, ciclo?: Quadro[], doErro?: (erro: string, u: number) => Quadro | undefined): QuadroMedido[] {
  const F = ex.ficha;
  const T = duracao(F.fases);
  const vistas = ex.vistas as IdVista[];
  const n = ciclo?.length ?? 360;
  const us = Array.from({ length: n }, (_, i) => instante(F.fases, (i / n) * T).u);
  const escolha = Array.from({ length: 6 }, (_, k) => Math.floor((k * n) / 6));
  const fim = us.indexOf(Math.max(...us));
  if (!escolha.some((i) => Math.abs(us[i]! - us[fim]!) < 0.02)) escolha.push(fim);
  const v2 = (u: number) => u.toFixed(2).replace('.', ',');
  const out: QuadroMedido[] = escolha.map((i) => ({ q: ciclo?.[i] ?? ex.quadro(corpo, us[i]!), onde: `técnica, t = ${((i / n) * T).toFixed(2).replace('.', ',')} s (u = ${v2(us[i]!)})`, vistas }));
  for (const er of F.erros)
    for (const u of [0, 0.5, 1]) out.push({ q: doErro?.(er.id, u) ?? ex.quadro(corpo, u, er.id), onde: `erro "${er.titulo}", u = ${v2(u)}`, vistas: [...new Set<IdVista>([...vistas, er.vista as IdVista])] });
  return out;
}
export interface PinturaEFios {
  pintura: AchadoDePintura[];
  fios: AchadoDeFio[];
  pesos: AchadoDePeso[];
}
/** O pintor por pares, como o app o usa (./pintor-por-pares.ts), para a conferência medir a pintura com ele. */
export const PINTOR_POR_PARES: PintorDeEstudo = { ordenar: (itens) => ordenarPorPares(itens), remendoDe };
/** O pintor por pares com as opções de uma animação (o ajuste do ciclo, em ./pintor-ligado.ts). */
export const pintorPorParesDe = (id: string): PintorDeEstudo => ({ ordenar: (itens) => ordenarPorPares(itens, opcoesDe(id)), remendoDe });
/**
 * As duas conferências numa animação. A pintura é medida como o app pinta: com o pintor por pares nas animações em que
 * ele está ligado (./pintor-ligado.ts; etapa 2, 19/11/2026), e com o de hoje nas outras.
 */
export function medirPinturaEFios(ex: Exercicio, quadros: QuadroMedido[], pontos = false): PinturaEFios {
  const prefixo = `pintura-${ex.ficha.id}-`;
  const pintor = PINTOR_POR_PARES_LIGADO.has(ex.ficha.id) ? pintorPorParesDe(ex.ficha.id) : undefined;
  const pintura: AchadoDePintura[] = [];
  const fios: AchadoDeFio[] = [];
  const pesos: AchadoDePeso[] = [];
  for (const { q, onde, vistas } of quadros) {
    for (const vista of vistas) pintura.push(...pinturaDoQuadro(q, vista, onde, prefixo, pontos, pintor));
    fios.push(...fiosNoCorpo(q, onde, prefixo, pontos));
    pesos.push(...pesoNoCorpo(q, onde, prefixo, pontos));
  }
  return { pintura, fios, pesos };
}
const um = (x: number) => (Math.round(x * 10) / 10).toString().replace('.', ',');
/** O pior de cada (tipo, vista, parte, peça), em texto curto. */
export function resumoDaPintura(a: AchadoDePintura[]): string[] {
  const pior = new Map<string, AchadoDePintura & { quadros: number }>();
  for (const x of a) {
    const ch = `${x.tipo}|${x.vista}|${x.parte}|${x.peca}`;
    const y = pior.get(ch);
    if (!y) pior.set(ch, { ...x, quadros: 1 });
    else {
      y.quadros++;
      if (x.area > y.area) Object.assign(y, { ...x, quadros: y.quadros });
    }
  }
  return [...pior.values()]
    .sort((x, y) => y.area - x.area)
    .map((x) => `${VISTAS[x.vista].nome.toLowerCase()}: ${x.tipo === 'peca-por-cima' ? `${x.peca} pintado sobre ${x.parte} (a parte do corpo está na frente)` : `${x.parte} pintado sobre ${x.peca} (a peça está na frente)`} (${um(x.area)} cm², até ${um(x.frente)} cm à frente; pior em ${x.onde}; em ${x.quadros} quadro(s)${x.deProposito ? `; peça ${x.deProposito === 'cenário' ? 'de cenário' : 'empurrada para trás'} de propósito` : ''})`);
}
/** O pior de cada parte do corpo (os fios que entram nela, juntos: o cabo declarado e o traço desenhado são o mesmo). */
export function resumoDosFios(a: AchadoDeFio[]): string[] {
  const pior = new Map<string, AchadoDeFio & { fios: Set<string>; quadros: Set<string> }>();
  for (const x of a) {
    const y = pior.get(x.parte);
    if (!y) pior.set(x.parte, { ...x, fios: new Set([x.fio]), quadros: new Set([x.onde]) });
    else {
      y.fios.add(x.fio);
      y.quadros.add(x.onde);
      if (x.entra > y.entra) Object.assign(y, { entra: x.entra, onde: x.onde });
    }
  }
  return [...pior.values()].sort((x, y) => y.entra - x.entra).map((x) => `${[...x.fios].join(' e ')} entra ${um(x.entra)} cm em ${x.parte} (pior em ${x.onde}; em ${x.quadros.size} quadro(s))`);
}
/** O pior de cada (peso, parte do corpo). */
export function resumoDosPesos(a: AchadoDePeso[]): string[] {
  return resumoDosFios(a.map((x) => ({ onde: x.onde, fio: x.peso, parte: x.parte, entra: x.entra })));
}
