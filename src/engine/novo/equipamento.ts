// Motor novo: o equipamento das cenas com o mesmo desenho dos 49 cartões do app.
// Quem desenha é o gerador realista (./realista/base.mjs): 3D, materiais em quatro tons, estofado com costura, anilha
// com aro, pilha de placas. Aqui cada peça da cena (Peca) é montada com as medidas da tabela de objetos, na câmera da
// cena, e devolvida como itens de pintura, para se misturar com o Boneco na ordem certa de profundidade.
import type { Camera, Item } from './desenho';
import type { Peca, Torre } from './pecas';
import { centroDaRoldana } from './pecas';
import { MAT, cena as cenaRealista, mix, retArred } from './realista/base.mjs';
import type { CenaRealista } from './realista/base.mjs';
import { obj } from './tabelas';
import { add, comb, cross, dot, mul, norm, perp, sub } from './vec';
import type { V3 } from './vec';

const Y: V3 = [0, 1, 0];
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
export type Tema = 'claro' | 'escuro';
/** Os materiais do gerador realista (quatro tons cada), no tema da cena. */
export type Materiais = typeof MAT;
/** No tema escuro, o grafite e a borracha sumiriam no fundo: os materiais escuros sobem de tom. */
const MATERIAIS: Record<Tema, typeof MAT> = {
  claro: MAT,
  escuro: Object.fromEntries(Object.entries(MAT).map(([k, tons]) => [k, ['metal', 'ferro', 'anilha', 'borracha', 'placa'].includes(k) ? tons.map((t) => mix(t, '#aeb8c2', 0.38)) : tons])) as typeof MAT,
};

/* ============================== cada peça ============================== */
function halter(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'halter' }>): void {
  const u = norm(p.eixo),
    comp = obj('halter', 'comp'),
    cabo = obj('halter', 'caboComp');
  const P = (d: number) => add(p.centro, mul(u, d));
  // o cabo um pouco para trás na pintura, para a mão ficar por cima dele
  C.cilindro(P(-cabo / 2), P(cabo / 2), obj('halter', 'caboDiam') / 2, M.cromo, { lados: 10, dz: 6 });
  for (const s of [-1, 1]) C.cilindro(P((s * cabo) / 2), P((s * comp) / 2), obj('halter', 'cabecaLargura') / 2, M.ferro, { lados: 6 });
}
function anilha(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'anilha' }>): void {
  C.anilha([p.x, 0, p.z], [p.x, obj('anilhaCalcanhar', 'esp'), p.z], obj('anilhaCalcanhar', 'diam') / 2, M.anilha);
}
function bancoReto(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'bancoReto' }>, comSombra: boolean): void {
  const g = (id: string) => obj('bancoReto', id);
  const comp = g('comp'),
    alt = g('altura'),
    est = g('estofado'),
    tubo = g('tubo'),
    baseL = g('baseLarg') / 2;
  const yBaixo = alt - est;
  C.estofado([p.x0, yBaixo, p.z0], [0, 0, 1], Y, [1, 0, 0], comp, est, g('larg'));
  C.tubo([p.x0, yBaixo - tubo / 2, p.z0 - comp / 2 + 6], [p.x0, yBaixo - tubo / 2, p.z0 + comp / 2 - 6], tubo, tubo, M.metal);
  for (const s of [-1, 1]) {
    const z = p.z0 + s * (comp / 2 - 16);
    C.tubo([p.x0, tubo, z], [p.x0, yBaixo - tubo, z], tubo, tubo, M.metal);
    C.tubo([p.x0 - baseL, tubo / 2, z], [p.x0 + baseL, tubo / 2, z], tubo, tubo, M.metal);
    for (const sx of [-1, 1]) C.cilindro([p.x0 + sx * (baseL - 2), 0, z], [p.x0 + sx * (baseL - 2), 1.2, z], 3.2, M.borracha, { lados: 10 });
  }
  if (comSombra) C.sombra(p.x0, p.z0, baseL, comp / 2 + 8, 0.18);
}
function colchonete(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'colchonete' }>): void {
  const comp = obj('colchonete', 'comp'),
    larg = obj('colchonete', 'larg');
  C.prisma(retArred(larg, comp, 3, 3), [p.x0, 0, p.z0], [1, 0, 0], [0, 0, 1], [0, obj('colchonete', 'esp'), 0], M.plataforma);
}
/** A parte fixa da coluna de polia: base, estrutura, guias, trilho com furos e a viga de cima. */
function torreFixa(C: CenaRealista, M: typeof MAT, t: Torre, comSombra: boolean): void {
  const g = (id: string) => obj('torre', id);
  const alt = g('altura'),
    larg = g('colunaLarg'),
    prof = g('prof');
  const f = norm(t.frente),
    lado = norm(cross(f, Y));
  const P = (dl: number, dy: number, df: number): V3 => comb([1, t.base], [dl, lado], [dy, Y], [df, f]);
  const tubo = (a: V3, b: V3, w = 5) => C.tubo(a, b, w, w, M.metal);
  // base no chão e a estrutura que guarda a pilha (quatro colunas e a moldura de cima)
  C.prisma(retArred(larg + 8, prof * 0.84, 1.5, 3), P(0, 0, -prof * 0.1), lado, f, [0, 5, 0], M.metal);
  const cantos: [number, number][] = [-1, 1].flatMap((a) => [-1, 1].map((b): [number, number] => [a * (larg / 2 - 2.5), -prof * 0.12 + b * 10]));
  for (const [a, b] of cantos) tubo(P(a, 5, b), P(a, alt, b), 4.5);
  for (const b of [-1, 1]) tubo(P(-larg / 2 + 2.5, alt - 2.2, -prof * 0.12 + b * 10), P(larg / 2 - 2.5, alt - 2.2, -prof * 0.12 + b * 10), 4.5);
  for (const a of [-1, 1]) tubo(P(a * (larg / 2 - 2.5), alt - 2.2, -prof * 0.12 - 10), P(a * (larg / 2 - 2.5), alt - 2.2, -prof * 0.12 + 10), 4.5);
  // guias cromadas da pilha
  for (const a of [-1, 1]) C.cilindro(P(a * g('pilhaLarg') * 0.26, 5, -prof * 0.12), P(a * g('pilhaLarg') * 0.26, alt - 6, -prof * 0.12), 0.8, M.cromo, { lados: 8 });
  // trilho do carrinho, na frente, com os furos de regulagem, e as duas travessas que o prendem à estrutura
  const zt = prof * 0.08;
  tubo(P(0, 5, zt), P(0, alt - 4, zt), 5.5);
  tubo(P(0, alt - 4, zt), P(0, alt - 4, -prof * 0.12 + 10), 4);
  tubo(P(0, 8, zt), P(0, 8, -prof * 0.12 + 10), 4);
  const furos: V3[] = [];
  for (let y = g('poliaMin'); y <= g('poliaMax') + 0.1; y += (g('poliaMax') - g('poliaMin')) / 16) furos.push(P(0, y, zt + 2.9));
  C.furos(furos, lado, Y, 1);
  // a polia de cima, por onde o cabo desce para a pilha
  C.cilindro(P(-1.2, alt - 9, -prof * 0.12), P(1.2, alt - 9, -prof * 0.12), 4.2, M.metalClaro, { lados: 16 });
  if (comSombra) C.sombra(t.base[0] - f[0] * prof * 0.1, t.base[2] - f[2] * prof * 0.1, larg * 0.75, prof * 0.55, 0.18);
}
/** A parte que se mexe: a pilha (as placas de cima sobem com o cabo), a haste, o carrinho e a roldana. */
function torreMovel(C: CenaRealista, M: typeof MAT, t: Torre, subida: number): void {
  const g = (id: string) => obj('torre', id);
  const alt = g('altura'),
    prof = g('prof'),
    pl = g('pilhaLarg'),
    pe = g('placaEsp'),
    n = g('placas'),
    rr = g('roldanaDiam') / 2;
  const f = norm(t.frente),
    lado = norm(cross(f, Y));
  const P = (dl: number, dy: number, df: number): V3 => comb([1, t.base], [dl, lado], [dy, Y], [df, f]);
  const yb = 12,
    sobem = Math.max(3, Math.round(n * 0.4)),
    ficam = n - sobem;
  const tras = mul(f, -1);
  // a frente da pilha fica virada para a pessoa; `pilha` pede o canto de baixo, da frente, e as direções
  C.pilha(P(-pl / 2, yb, -prof * 0.12 + 6), lado, tras, pl, ficam * pe, 12, ficam);
  C.pilha(P(-pl / 2, yb + ficam * pe + subida, -prof * 0.12 + 6), lado, tras, pl, sobem * pe, 12, sobem);
  C.cilindro(P(0, yb + n * pe + subida, -prof * 0.12), P(0, alt - 12, -prof * 0.12), 0.8, M.cromo, { lados: 8 });
  // carrinho no trilho e a roldana, na altura pedida
  C.tubo(P(0, t.alturaDaPolia - 8, prof * 0.11), P(0, t.alturaDaPolia + 8, prof * 0.11), 9, 7, M.metalClaro);
  const c = centroDaRoldana(t);
  C.cilindro(add(c, mul(lado, -1.3)), add(c, mul(lado, 1.3)), rr, M.metalClaro, { lados: 18 });
  C.cilindro(add(c, mul(lado, -1.6)), add(c, mul(lado, 1.6)), rr * 0.3, M.borracha, { lados: 10 });
}
function estribo(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'estribo' }>): void {
  const u = norm(p.eixo),
    L = obj('estribo', 'pegadaComp') / 2;
  const a = add(p.pegada, mul(u, -L)),
    b = add(p.pegada, mul(u, L));
  const d = norm(perp(sub(p.elo, p.pegada), u));
  const h = obj('estribo', 'altura');
  // a pegada emborrachada (um pouco para trás na pintura: a mão fica por cima) e a fita até o elo do cabo
  C.cilindro(a, b, obj('estribo', 'pegadaDiam') / 2, M.borracha, { lados: 12, dz: 6 });
  C.polilinha([a, add(a, mul(d, h * 0.45)), p.elo, add(b, mul(d, h * 0.45)), b], M.borracha[1]!, 1.3);
  C.cilindro(add(p.elo, mul(d, -1.2)), add(p.elo, mul(d, 2.4)), 1.3, M.cromo, { lados: 10 });
}

/** As medidas do kettlebell que o desenho e as animações usam: a bola é uma esfera achatada na base. */
export function formaDoKettlebell() {
  const R = obj('kettlebell', 'corpoLarg') / 2,
    rBase = obj('kettlebell', 'baseDiam') / 2,
    rAlca = obj('kettlebell', 'alcaDiam') / 2;
  // a esfera encontra a base no raio da base: o centro dela fica a essa altura
  const centro = Math.sqrt(R * R - rBase * rBase);
  const topoDaBola = centro + R;
  return { R, rBase, rAlca, centro, topoDaBola, altura: obj('kettlebell', 'altura'), meiaAlca: obj('kettlebell', 'alcaLarg') / 2 };
}
function kettlebell(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'kettlebell' }>): void {
  const K = formaDoKettlebell();
  const u = norm(p.cima),
    l = norm(p.lado);
  const P = (h: number, x = 0): V3 => comb([1, p.base], [h, u], [x, l]);
  // A bola, como no cartão do app: uma esfera vista de qualquer lado é um círculo. Ela é desenhada lisa, com a luz
  // de cima e da esquerda, e cortada reta na base (a corda do círculo na altura da base).
  const c = C.P(P(K.centro)),
    base = C.P(P(0));
  for (const [h, x] of [[K.centro + K.R, 0], [K.centro, K.R], [K.centro, -K.R]] as [number, number][]) C.P(P(h, x));
  const dx = base[0] - c[0],
    dy = base[1] - c[1],
    ate = Math.hypot(dx, dy);
  const meiaCorda = Math.sqrt(Math.max(0, K.R * K.R - ate * ate));
  const gira = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
  // no tema escuro, a bola de ferro sumia no fundo: ela ganha um contorno claro, como o do corpo
  const escuro = M !== MAT,
    borda = escuro ? '#cfd8df' : M.ferro[3]!;
  const g = C.uid('kb');
  C.defs.push(`<radialGradient id="${g}" cx="${f1(c[0] - K.R * 0.38)}" cy="${f1(c[1] - K.R * 0.42)}" r="${f1(K.R * 1.45)}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${mix(M.ferro[2]!, '#ffffff', 0.18)}"/><stop offset="0.4" stop-color="${M.ferro[1]}"/><stop offset="1" stop-color="${M.ferro[0]}"/></radialGradient>`);
  C.bruto(
    c[2],
    `<g transform="translate(${f1(c[0])} ${f1(c[1])}) rotate(${f1(gira)})"><path d="M${f1(-meiaCorda)} ${f1(ate)}A${f1(K.R)} ${f1(K.R)} 0 1 1 ${f1(meiaCorda)} ${f1(ate)}Z" fill="url(#${g})" stroke="${borda}" stroke-width="${escuro ? 0.8 : 0.5}"/></g><ellipse cx="${f1(c[0] - K.R * 0.42)}" cy="${f1(c[1] - K.R * 0.44)}" rx="${f1(K.R * 0.22)}" ry="${f1(K.R * 0.13)}" transform="rotate(-35 ${f1(c[0] - K.R * 0.42)} ${f1(c[1] - K.R * 0.44)})" fill="#fff" opacity="0.26"/>`,
  );
  // a alça: duas hastes que saem da bola e a barra de cima (um pouco para trás na pintura: as mãos ficam por cima)
  const alto = K.altura - K.rAlca;
  const pe = K.centro + Math.sqrt(Math.max(0, K.R * K.R - K.meiaAlca * K.meiaAlca)) - 1;
  for (const s of [-1, 1]) C.cilindro(P(pe, s * K.meiaAlca), P(alto, s * K.meiaAlca), K.rAlca, M.ferro, { lados: 10, dz: 6 });
  C.cilindro(P(alto, -K.meiaAlca - K.rAlca * 0.6), P(alto, K.meiaAlca + K.rAlca * 0.6), K.rAlca, M.ferro, { lados: 10, dz: 6 });
}
/** A cor do elástico (a cor de ação do app, a mesma do estofado e da mini band dos cartões). */
const corDoElastico = (M: typeof MAT) => M.estofado[1]!;
function elastico(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'elastico' }>): void {
  // a borracha não muda de volume: esticada, o tubo afina na raiz quadrada do quanto esticou
  const d = obj('elastico', 'tuboDiam') / Math.sqrt(Math.max(1, p.estica));
  // cada trecho é pintado na sua profundidade: o que sobe pelo lado de perto fica na frente da perna, o do outro
  // lado fica atrás, e o que passa debaixo dos pés fica no chão
  const meio = Math.floor(p.pts.length / 2);
  for (const trecho of [p.pts.slice(0, meio), p.pts.slice(meio - 1, meio + 1), p.pts.slice(meio)]) {
    C.polilinha(trecho, M.estofado[3]!, d + 0.5);
    C.polilinha(trecho, corDoElastico(M), d);
  }
}
function pegador(C: CenaRealista, M: typeof MAT, p: Extract<Peca, { t: 'pegador' }>): void {
  const u = norm(p.eixo),
    L = obj('elastico', 'pegadorComp') / 2;
  const a = add(p.pegada, mul(u, -L)),
    b = add(p.pegada, mul(u, L));
  // a pegada (um pouco para trás na pintura: a mão fica por cima) e a fita em triângulo até a ponta do tubo
  C.cilindro(a, b, obj('elastico', 'pegadorDiam') / 2, M.borracha, { lados: 12, dz: 6 });
  C.polilinha([a, p.ponta, b], M.borracha[1]!, 1.1);
}

/* ============================== a cena ============================== */
/**
 * O desenho de uma peça só muda com a câmera, o tema e a própria peça. As peças paradas (banco, coluna, colchonete,
 * anilha) se repetem iguais em todos os quadros: o desenho fica guardado e não é refeito.
 */
const GUARDADO = new Map<string, { itens: Item[]; defs: string }>();
function desenhar(chave: string | null, cam: Camera, id: string, monta: (C: CenaRealista) => void): { itens: Item[]; defs: string } {
  const pronto = chave && GUARDADO.get(chave);
  if (pronto) return pronto;
  const cx: [number, number, number, number] = [1e9, 1e9, -1e9, -1e9];
  const C = cenaRealista(id, {
    P: (p) => {
      const q: V3 = [dot(p, cam.dir), -dot(p, cam.cima), -dot(p, cam.para)];
      cx[0] = Math.min(cx[0], q[0]);
      cx[1] = Math.min(cx[1], q[1]);
      cx[2] = Math.max(cx[2], q[0]);
      cx[3] = Math.max(cx[3], q[1]);
      return q;
    },
    rot: (v) => [dot(v, cam.dir), dot(v, cam.cima), -dot(v, cam.para)],
    s: 1,
  });
  monta(C);
  // a sombra (profundidade enorme no gerador) vai para a camada do chão; a caixa da peça entra no primeiro item
  const itens = C.itens.map((it, i): Item => ({ d: -it.z, camada: it.z > 1e8 ? 0 : 1, s: it.svg, ...(i === 0 ? { cx } : {}) }));
  const out = { itens, defs: C.defs.join('') };
  if (chave) GUARDADO.set(chave, out);
  return out;
}

/** O equipamento de um quadro, no desenho dos cartões do app. `id` distingue os filtros de sombra de cada <svg>. */
export function equipamentoRealista(pecas: Peca[], cam: Camera, tema: Tema, id: string): { itens: Item[]; defs: string } {
  const M = MATERIAIS[tema];
  // a sombra no chão só aparece nas vistas inclinadas: de perfil o chão é uma linha, e de cima, a pino, a sombra
  // ficava inteira debaixo da peça e sobrava em volta dela como uma mancha atrás do corpo
  const comSombra = Math.abs(cam.para[1]) > 0.1 && Math.abs(cam.para[1]) < 0.9;
  const itens: Item[] = [];
  let defs = '';
  const junta = (r: { itens: Item[]; defs: string }) => {
    itens.push(...r.itens);
    defs += r.defs;
  };
  pecas.forEach((p, i) => {
    const pid = `${id}${i}`;
    const fixa = (nome: string, dados: unknown) => `${nome}|${cam.nome}|${tema}|${pid}|${JSON.stringify(dados)}`;
    if (p.t === 'halter') junta(desenhar(null, cam, pid, (C) => halter(C, M, p)));
    else if (p.t === 'anilha') junta(desenhar(fixa('anilha', p), cam, pid, (C) => anilha(C, M, p)));
    else if (p.t === 'bancoReto') {
      const r = desenhar(fixa('banco', p), cam, pid, (C) => bancoReto(C, M, p, comSombra));
      if (!p.pontaNoQuadro) return junta(r);
      // só a ponta do banco conta para o enquadramento: a caixa na tela dos últimos `pontaNoQuadro` cm
      const cx: [number, number, number, number] = [1e9, 1e9, -1e9, -1e9];
      const zFim = p.z0 + obj('bancoReto', 'comp') / 2;
      for (const x of [-1, 1])
        for (const y of [0, obj('bancoReto', 'altura')])
          for (const z of [zFim - p.pontaNoQuadro, zFim]) {
            const q: V3 = [p.x0 + (x * obj('bancoReto', 'larg')) / 2, y, z];
            const tx = dot(q, cam.dir),
              ty = -dot(q, cam.cima);
            cx[0] = Math.min(cx[0], tx);
            cx[1] = Math.min(cx[1], ty);
            cx[2] = Math.max(cx[2], tx);
            cx[3] = Math.max(cx[3], ty);
          }
      const primeiro = r.itens.findIndex((it) => it.camada >= 1);
      junta({ itens: r.itens.map((it, i) => ({ ...it, cx: i === primeiro ? cx : undefined })), defs: r.defs });
    }
    else if (p.t === 'colchonete') junta(desenhar(fixa('colchonete', p), cam, pid, (C) => colchonete(C, M, p)));
    else if (p.t === 'torre') {
      const dePerfil = Math.abs(cam.para[0]) > 0.95;
      if (p.cenario && dePerfil) return;
      const a = desenhar(fixa('torre', p.torre), cam, pid, (C) => torreFixa(C, M, p.torre, comSombra)),
        b = desenhar(null, cam, `${pid}m`, (C) => torreMovel(C, M, p.torre, p.subida));
      // como cenário, a coluna vai para uma camada atrás do corpo (e do corpo tracejado dos erros) e fora do enquadramento
      const fundo = (r: { itens: Item[]; defs: string }) => (p.cenario ? { itens: r.itens.map((it) => (it.camada >= 1 ? { ...it, camada: 0.4 } : it)), defs: r.defs } : r);
      junta(fundo(a));
      junta(fundo(b));
    } else if (p.t === 'estribo') junta(desenhar(null, cam, pid, (C) => estribo(C, M, p)));
    else if (p.t === 'kettlebell') junta(desenhar(null, cam, pid, (C) => kettlebell(C, M, p)));
    else if (p.t === 'elastico') junta(desenhar(null, cam, pid, (C) => elastico(C, M, p)));
    else if (p.t === 'pegador') junta(desenhar(null, cam, pid, (C) => pegador(C, M, p)));
    else if (p.t === 'propria') {
      const r = desenhar(p.fixa === undefined ? null : fixa(p.nome, p.fixa), cam, pid, (C) => p.desenhar(C, M, { comSombra, tema }));
      junta(p.cenario ? { itens: r.itens.map((it) => (it.camada >= 1 ? { ...it, camada: 0.4 } : it)), defs: r.defs } : r);
    }
    else junta(desenhar(null, cam, pid, (C) => C.linha(p.a, p.b, tema === 'claro' ? '#1d2024' : '#aeb8c2', 0.8)));
  });
  return { itens, defs };
}
