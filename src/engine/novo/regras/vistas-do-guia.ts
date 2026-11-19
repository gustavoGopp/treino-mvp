// Regras comuns que olham o que o guia mostra, em cada vista que ele mostra (as do exercício e as dos erros), no ciclo e
// em cada erro: o que a conferência pelos quadros do ciclo não via (auditoria de 18/11/2026). Cada uma vale só nos
// exercícios que a ligam na ficha; elas precisam do exercício, que a conferência passa à regra desde 19/11/2026.
//  - `cabeca-aparece-em-cada-vista` (G3 a G6): o Boneco pinta o corpo com um contorno só, por fora; quando a cabeça fica
//    dentro da silhueta do tronco na tela e mais perto de quem olha (de cima, em pé), nenhuma linha a separa dos ombros e
//    ela some (sobrava o calombo do rosto). O remédio é a opção `cabeca` do Boneco (acréscimo de 18/11), ligada no quadro
//    naquela vista (`vies` ou `viesNaVista`).
//  - `rotulos-sem-linhas-cruzadas` (M5): as linhas dos rótulos de técnica não se cruzam (cada texto parecia apontar para
//    o ponto do outro).
//  - `cabos-fora-do-corpo-nos-erros` (M6 a M8): nos erros, o cabo continua sendo um cabo: não atravessa o corpo.
import { formaDoBoneco } from '../boneco';
import { enquadrar, svgDaCena } from '../cena';
import { f1 } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { VISTAS, casco, naTela } from '../desenho';
import type { Camera, IdVista, P2 } from '../desenho';
import type { Esq } from '../esqueleto';
import { duracao } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { add, comb, dist, dot, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** As vistas que o guia mostra: as do exercício e as dos erros. */
const vistasDoGuia = (ex: Exercicio): IdVista[] => [...new Set<IdVista>([...(ex.vistas as IdVista[]), ...ex.ficha.erros.map((er) => er.vista as IdVista)])];
/**
 * Os quadros que o guia mostra em cada vista: o ciclo (5 instantes) em todas, e cada erro na vista dele (no começo, no
 * meio, no fim e no instante do erro).
 */
function quadrosDoGuia(ex: Exercicio, corpo: Corpo): { vista: IdVista; q: Quadro }[] {
  const casos: { vista: IdVista; q: Quadro }[] = [];
  for (const u of [0, 0.25, 0.5, 0.75, 1]) {
    const q = ex.quadro(corpo, u);
    for (const vista of vistasDoGuia(ex)) casos.push({ vista, q });
  }
  for (const er of ex.ficha.erros) for (const u of [...new Set([0, 0.5, 1, er.instante])]) casos.push({ vista: er.vista as IdVista, q: ex.quadro(corpo, u, er.id) });
  return casos;
}
const SEM_EXERCICIO = { medido: 'a regra precisa do exercício (a conferência o passa)', ok: false };

/* ============================== a cabeça ============================== */
/** As peças do tronco que formam a silhueta em que a cabeça pode sumir. */
const DO_TRONCO = new Set(['pescoco', 'tronco', 'cintura', 'emendaDaCintura', 'pelve']);

function dentroDoCasco(q: P2, H: P2[]): boolean {
  if (H.length < 3) return false;
  let giro = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]!,
      b = H[(i + 1) % H.length]!;
    const c = (b[0] - a[0]) * (q[1] - a[1]) - (b[1] - a[1]) * (q[0] - a[0]);
    if (Math.abs(c) < 1e-9) continue;
    if (giro && Math.sign(c) !== giro) return false;
    giro = Math.sign(c);
  }
  return true;
}

/**
 * A cabeça numa vista:
 *  - `angulo`: o ângulo entre o eixo do tórax (para cima, rumo à cabeça) e a direção de quem olha (graus; 0 = quem olha
 *    vê o corpo pela cabeça, ao longo do tronco, e ela fica sobre os ombros na tela; 90 = de frente, de lado ou de trás);
 *  - `dentro`: a fração do contorno da cabeça na tela (o casco dos pontos da pele, de 0,5 em 0,5 cm) que cai dentro
 *    da silhueta do tronco (a união dos cascos de cada par de anéis vizinhos do pescoço, do tronco, da cintura e da
 *    bacia): é o trecho do contorno que o contorno único do Boneco não desenha;
 *  - `aFrente`: quanto o ponto da cabeça mais perto de quem olha fica à frente do ponto do tronco mais perto (cm).
 */
export function cabecaNaVista(e: Esq, cam: Camera): { angulo: number; dentro: number; aFrente: number } {
  const corpo = formaDoBoneco(e).grupos.find((g) => g.id === 'corpo')!;
  const cascos: P2[][] = [];
  const cabeca: V3[] = [];
  let tronco = -1e9;
  for (const v of corpo.volumes) {
    const aneis = v.vol.aneis.map((a) =>
      Array.from({ length: 12 }, (_, i): V3 => {
        const th = (i * Math.PI) / 6,
          sn = Math.sin(th);
        return comb([1, a.c], [a.a * Math.cos(th), a.x], [(sn >= 0 ? a.f : a.b) * sn, a.z]);
      }),
    );
    if (v.nome === 'cabeca') cabeca.push(...aneis.flat());
    else if (DO_TRONCO.has(v.nome ?? '')) {
      for (const p of aneis.flat()) tronco = Math.max(tronco, dot(p, cam.para));
      for (let i = 0; i + 1 < aneis.length; i++) cascos.push(casco([...aneis[i]!, ...aneis[i + 1]!].map((p) => naTela(cam, p))));
    }
  }
  const angulo = (Math.acos(Math.max(-1, Math.min(1, dot(norm(e.torax.y), cam.para)))) * 180) / Math.PI;
  const H = casco(cabeca.map((p) => naTela(cam, p)));
  let n = 0,
    d = 0;
  for (let i = 0; i < H.length; i++) {
    const a = H[i]!,
      b = H[(i + 1) % H.length]!;
    const passos = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.5));
    for (let j = 0; j < passos; j++) {
      const p: P2 = [a[0] + ((b[0] - a[0]) * j) / passos, a[1] + ((b[1] - a[1]) * j) / passos];
      n++;
      if (cascos.some((C) => dentroDoCasco(p, C))) d++;
    }
  }
  const aFrente = Math.max(...cabeca.map((p) => dot(p, cam.para))) - tronco;
  return { angulo, dentro: d / n, aFrente };
}

/**
 * A cabeça some quando quem olha vê o corpo pela cabeça (o eixo do tórax a até 30° da direção de quem olha), ela fica
 * mais perto de quem olha que o tronco e mais de um terço do contorno dela (35%) cai dentro da silhueta dele: na tela,
 * ela fica sobre os ombros e o contorno único do corpo não a desenha. De frente, de lado, de trás e de três quartos em pé
 * (de 76° a 90°), só o queixo ou a nuca encostam na silhueta (cerca de 20% do contorno) e a cabeça se lê; também com o
 * corpo inclinado para trás, visto de trás (o Y na suspensão, a 26°, com 23% do contorno dentro).
 */
export const LIMITE_ANGULO = 30;
export const LIMITE_DENTRO = 0.35;

/** Em cada vista do guia, onde a cabeça sumiria no contorno do tronco ela tem de ganhar o contorno próprio. */
function cabecaAparece(ex: Exercicio, corpo: Corpo): { medido: string; ok: boolean } {
  const porVista = new Map<IdVista, { angulo: number; dentro: number; aFrente: number; somem: number; comContorno: number; n: number }>();
  for (const { vista, q } of quadrosDoGuia(ex, corpo)) {
    const m = cabecaNaVista(q.esq, VISTAS[vista]);
    const somem = m.angulo <= LIMITE_ANGULO && m.dentro >= LIMITE_DENTRO && m.aFrente > 0;
    const contorno = ({ ...q.vies, ...q.viesNaVista?.[vista] }.cabeca ?? 0) > 0;
    const v = porVista.get(vista) ?? { angulo: 1e9, dentro: 0, aFrente: -1e9, somem: 0, comContorno: 0, n: 0 };
    v.angulo = Math.min(v.angulo, m.angulo);
    v.dentro = Math.max(v.dentro, m.dentro);
    v.aFrente = Math.max(v.aFrente, m.aFrente);
    v.n++;
    if (somem) {
      v.somem++;
      if (contorno) v.comContorno++;
    }
    porVista.set(vista, v);
  }
  const partes = [...porVista].map(
    ([vista, v]) =>
      `${vista}: o tronco visto a ${f1(v.angulo)}° do eixo dele (no mínimo), até ${f1(v.dentro * 100)}% do contorno da cabeça dentro da silhueta do tronco, a cabeça até ${f1(v.aFrente)} cm mais perto de quem olha que o tronco; ${v.somem ? `sumiria em ${v.somem} de ${v.n} quadros, com contorno próprio em ${v.comContorno}` : 'não some'}`,
  );
  return { medido: partes.join('; '), ok: [...porVista.values()].every((v) => v.comContorno === v.somem) };
}

/* ============================== rótulos ============================== */
type Seg = [number, number, number, number];
/** Se dois segmentos na tela se cruzam (fora das pontas). */
function cruzam(a: Seg, b: Seg): boolean {
  const o = (px: number, py: number, qx: number, qy: number, rx: number, ry: number) => (qx - px) * (ry - py) - (qy - py) * (rx - px);
  const d1 = o(b[0], b[1], b[2], b[3], a[0], a[1]),
    d2 = o(b[0], b[1], b[2], b[3], a[2], a[3]),
    d3 = o(a[0], a[1], a[2], a[3], b[0], b[1]),
    d4 = o(a[0], a[1], a[2], a[3], b[2], b[3]);
  return d1 * d2 < 0 && d3 * d4 < 0;
}
/**
 * Em cada vista do exercício com dois rótulos de técnica ou mais, em 24 instantes do ciclo, as linhas que ligam cada
 * texto ao ponto dele, como o guia as desenha (o quadro do guia, o desenho cinza): nenhuma cruza outra.
 */
function rotulosSemCruzar(ex: Exercicio, corpo: Corpo): { medido: string; ok: boolean } {
  const T = duracao(ex.ficha.fases);
  const partes: string[] = [];
  let ruins = 0;
  for (const vista of ex.vistas as IdVista[]) {
    if (ex.ficha.rotulos.filter((r) => r.vista === vista).length < 2) continue;
    const o = { corpo, vista, boneco: 'cinza' as const };
    const vb = enquadrar(ex, o);
    let n = 0;
    for (let i = 0; i < 24; i++) {
      const svg = svgDaCena(ex, (i / 24) * T, { ...o, modo: 'tec' }, vb);
      const linhas: Seg[] = [...svg.matchAll(/<line class="n-rot-fio" x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"\/>/g)].map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])]);
      let cruza = false;
      for (let a = 0; a < linhas.length; a++) for (let b = a + 1; b < linhas.length; b++) if (cruzam(linhas[a]!, linhas[b]!)) cruza = true;
      if (cruza) n++;
    }
    ruins += n;
    partes.push(`${vista}: as linhas se cruzam em ${n} de 24 instantes`);
  }
  return { medido: partes.length ? partes.join('; ') : 'nenhuma vista tem dois rótulos', ok: ruins === 0 };
}

/* ============================== cabos ============================== */
/**
 * Quanto os pontos entram no corpo (cm; positivo = dentro), por parte (com o lado): o anel de cada volume do Boneco,
 * interpolado entre os dois anéis vizinhos em que o ponto cai, e a elipse dele na direção do ponto. `fora` deixa partes
 * de fora (as mãos que seguram o cabo).
 */
function entraNoCorpo(e: Esq, pts: V3[], fora: (parte: string, lado: string | undefined, p: V3) => boolean): Map<string, number> {
  const out = new Map<string, number>();
  for (const g of formaDoBoneco(e).grupos)
    for (const v of g.volumes) {
      const parte = v.nome ?? g.id;
      const nome = g.lado ? `${parte}:${g.lado}` : parte;
      const A = v.vol.aneis;
      for (let i = 0; i + 1 < A.length; i++) {
        const a0 = A[i]!,
          a1 = A[i + 1]!;
        const ax = sub(a1.c, a0.c),
          L2 = dot(ax, ax);
        if (L2 < 1e-9) continue;
        for (const p of pts) {
          const s = dot(sub(p, a0.c), ax) / L2;
          if (s < 0 || s > 1 || fora(parte, g.lado, p)) continue;
          const c = add(a0.c, mul(ax, s));
          const x = norm(add(mul(a0.x, 1 - s), mul(a1.x, s))),
            z = norm(add(mul(a0.z, 1 - s), mul(a1.z, s)));
          const ra = a0.a + (a1.a - a0.a) * s,
            rf = a0.f + (a1.f - a0.f) * s,
            rb = a0.b + (a1.b - a0.b) * s;
          const d = sub(p, c);
          const u = dot(d, x),
            w = dot(d, z);
          const h = Math.hypot(u, w);
          const rho = h < 1e-9 ? Math.min(ra, rf, rb) : 1 / Math.hypot(u / h / ra, w / h / (w >= 0 ? rf : rb));
          out.set(nome, Math.max(out.get(nome) ?? -1e9, rho - h));
        }
      }
    }
  return out;
}
/**
 * Em cada erro (6 instantes: 0, 1/4, 1/2, 3/4, 1 e o instante do erro), cada cabo e cada fita do engate (os fios do
 * quadro, fora os riscos da pilha), de meio em meio centímetro, contra o corpo: não entram mais de 0,5 cm em parte
 * nenhuma. Ficam de fora as mãos que seguram (a até 30 cm da ponta de um cabo) e, delas, o antebraço a até 8 cm do
 * punho (a mão fecha em volta da peça), como na regra do cabo no ciclo (`polia-braco-cabos-livres-do-corpo`).
 */
function cabosForaNosErros(ex: Exercicio, corpo: Corpo): { medido: string; ok: boolean } {
  const partes: string[] = [];
  let pior = -1e9;
  for (const er of ex.ficha.erros) {
    let m = -1e9,
      onde = '';
    for (const u of [...new Set([0, 0.25, 0.5, 0.75, 1, er.instante])]) {
      const q = ex.quadro(corpo, u, er.id);
      const pontas = Object.entries(q.marcas)
        .filter(([k]) => k.endsWith('.ponta'))
        .map(([, p]) => p);
      const maos = (['R', 'L'] as const).filter((k) => pontas.some((p) => dist(q.esq.lado[k].pegada, p) < 30));
      const fora = (parte: string, lado: string | undefined, p: V3) => {
        const k = maos.find((x) => x === lado);
        return !!k && (parte === 'mao' || parte === 'polegar' || (parte === 'ante' && dist(p, q.esq.lado[k].punho) < 8));
      };
      for (const pr of q.prims) {
        if (pr.t !== 'fio' || pr.cls === 'risco') continue;
        const pts: V3[] = [];
        for (let i = 0; i + 1 < pr.pts.length; i++) {
          const a = pr.pts[i]!,
            b = pr.pts[i + 1]!;
          const k = Math.max(1, Math.ceil(dist(a, b) / 0.5));
          for (let j = 0; j <= k; j++) pts.push(add(a, mul(sub(b, a), j / k)));
        }
        for (const [nome, d] of entraNoCorpo(q.esq, pts, fora))
          if (d > m) {
            m = d;
            onde = `${pr.cls === 'cabo' ? 'o cabo' : 'a fita do engate'}, ${nome}`;
          }
      }
    }
    pior = Math.max(pior, m);
    partes.push(`${er.titulo}: ${m > 0 ? `entra até ${f1(m)} cm (${onde})` : `passa a no mínimo ${f1(-m)} cm da pele (${onde})`}`);
  }
  return { medido: partes.join('; '), ok: pior <= 0.5 };
}

export const REGRAS_VISTAS_DO_GUIA: Record<string, Regra> = {
  'cabeca-aparece-em-cada-vista': (_q, corpo, ex) => (ex ? cabecaAparece(ex, corpo) : SEM_EXERCICIO),
  'rotulos-sem-linhas-cruzadas': (_q, corpo, ex) => (ex ? rotulosSemCruzar(ex, corpo) : SEM_EXERCICIO),
  'cabos-fora-do-corpo-nos-erros': (_q, corpo, ex) => (ex ? cabosForaNosErros(ex, corpo) : SEM_EXERCICIO),
};
