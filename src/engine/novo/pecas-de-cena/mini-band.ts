// Peça de cena: a mini band, o elástico curto em laço (medidas em ../dados/objetos/mini-band.json), em volta das duas
// coxas. Parte do cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `mini_band`): a faixa larga e chata
// na cor de ação, com a borda escura e um brilho claro. Aqui ela é uma faixa esticada por fora das duas coxas, logo
// acima dos joelhos: em cada corte perpendicular às coxas, o contorno dela é o fecho das duas seções da pele (assenta
// por fora de cada coxa e vai reta, por cima e por baixo, de uma à outra). Como a coxa engrossa do joelho para o
// quadril, a borda de trás da faixa fica mais larga e mais alta que a da frente: é o que deixa a faixa aparecer como
// faixa (e não como um fio) para quem olha de frente. Ela tem a largura de fábrica ao longo da coxa e estreita ao
// esticar (a borracha não muda de volume: esticada λ vezes, a largura cai na raiz de λ, como o elástico longo).
// Cada pedaço só é pintado se quem olha o vê: o que assenta numa coxa aparece do lado dela virado para quem olha, e o
// que passa por trás de um joelho, de uma canela ou da outra coxa fica escondido (o corpo é pintado parte por parte,
// cada parte numa profundidade só, e não daria conta de uma faixa que abraça as duas pernas).
import { pontosDoBoneco } from '../boneco';
import type { Prim } from '../desenho';
import type { Esq, Lado } from '../esqueleto';
import type { PecaPropria } from '../pecas';
import type { Material } from '../realista/base.mjs';
import { mix } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { add, cross, dist, dot, mul, norm, perp, sub } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('miniBand', id);
/** A cor de ação do cartão (traço, sombra, meio, luz). */
const ACAO: Material = ['#16124A', '#211D66', '#3F3AA8', '#7E7ADB'];
/** Quanto a faixa vem para a frente na ordem da pintura (cm): mais que o comprimento de uma coxa, para ficar por cima da pele em que assenta seja qual for a profundidade em que a perna é pintada. */
const POR_CIMA = 60;
/** Quantos pontos tem cada volta da faixa. */
const N = 72;
type P2 = [number, number];

export interface Laco {
  /** A linha do meio da faixa (fechada: o último ponto liga no primeiro) e as duas bordas, a do lado do joelho e a do lado do quadril, ponto a ponto. */
  pts: V3[];
  bordas: [V3[], V3[]];
  /** A direção das coxas, do joelho para o quadril. */
  eixo: V3;
  /** Comprimento da volta do meio (cm) e quanto ela está esticada (1 = em repouso). */
  comp: number;
  estica: number;
  /** A largura da faixa esticada (cm). */
  larg: number;
  /** O centro da seção de cada coxa por onde a faixa passa. */
  centros: Record<Lado, V3>;
  /** Em que coxa cada ponto da volta assenta (nenhuma: o trecho reto entre as duas). */
  assenta: (Lado | undefined)[];
  /** As pernas, como bolas por dentro da pele: o que esconde a faixa de quem olha. */
  pernas: { c: V3; r: number; parte: 'coxa' | 'canela'; lado: Lado }[];
  /** Em que parte da perna a faixa assenta (por omissão, nas coxas; `lacoNasCanelas`, nas canelas). */
  parte?: 'coxa' | 'canela';
}

/** As pontas do eixo de uma parte da perna: a coxa do joelho ao quadril, a canela do joelho ao tornozelo. */
const eixoDaParte = (e: Esq, parte: 'coxa' | 'canela', k: Lado): [V3, V3] => [e.lado[k].joelho, parte === 'coxa' ? e.lado[k].quadril : e.lado[k].tornozelo];

/** Os anéis da pele da coxa ou da canela de cada perna (12 pontos por anel, na mesma ordem em todos), a partir do joelho. */
function aneisDaPerna(e: Esq, parte: 'coxa' | 'canela'): Record<Lado, V3[][]> {
  const out: Record<Lado, V3[][]> = { R: [], L: [] };
  const pts = pontosDoBoneco(e).filter((x) => x.parte === parte);
  for (let i = 0; i + 12 <= pts.length; i += 12) {
    const anel = pts.slice(i, i + 12).map((x) => x.p);
    const c = mul(
      anel.reduce((a, p) => add(a, p), [0, 0, 0] as V3),
      1 / 12,
    );
    // de que perna é o anel: a do eixo (joelho ao quadril) mais perto do centro dele
    const longe = (k: Lado) => {
      const [de, ate] = eixoDaParte(e, parte, k);
      const ax = norm(sub(ate, de));
      const v = sub(c, de);
      return dist(v, mul(ax, dot(v, ax)));
    };
    out[longe('R') <= longe('L') ? 'R' : 'L'].push(anel);
  }
  for (const k of ['R', 'L'] as const) {
    const [de, ate] = eixoDaParte(e, parte, k);
    const ax = norm(sub(ate, de));
    out[k].sort((a, b) => dot(sub(a[0]!, de), ax) - dot(sub(b[0]!, de), ax));
  }
  return out;
}

/** Bolas por dentro da pele de uma parte da perna, uma a cada ~2 cm: o centro de cada anel e a menor distância dele à pele. */
function bolasDaPerna(e: Esq, parte: 'coxa' | 'canela'): Laco['pernas'] {
  const out: Laco['pernas'] = [];
  const A = aneisDaPerna(e, parte);
  for (const lado of ['R', 'L'] as const) {
    const aneis = A[lado].map((anel) => {
      const c = mul(
        anel.reduce((a, p) => add(a, p), [0, 0, 0] as V3),
        1 / 12,
      );
      return { c, r: Math.min(...anel.map((p) => dist(p, c))) };
    });
    for (let i = 0; i + 1 < aneis.length; i++) {
      const a = aneis[i]!,
        b = aneis[i + 1]!;
      const n = Math.max(1, Math.ceil(dist(a.c, b.c) / 2));
      for (let j = 0; j < n; j++)
        out.push({
          c: add(a.c, mul(sub(b.c, a.c), j / n)),
          r: a.r + ((b.r - a.r) * j) / n,
          parte,
          lado,
        });
    }
  }
  return out;
}

/** O fecho convexo de pontos do plano, no sentido anti-horário (cadeia monótona). */
function fecho(pts: P2[]): P2[] {
  const P = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const vira = (o: P2, a: P2, b: P2) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const meia = (lista: P2[]) => {
    const h: P2[] = [];
    for (const p of lista) {
      while (h.length >= 2 && vira(h[h.length - 2]!, h[h.length - 1]!, p) <= 0) h.pop();
      h.push(p);
    }
    h.pop();
    return h;
  };
  return [...meia(P), ...meia(P.reverse())];
}

/** A curva fechada e lisa que passa pelos pontos (Catmull-Rom), com `n` pontos por trecho. */
function lisa(pts: P2[], n: number): P2[] {
  const out: P2[] = [];
  const m = pts.length;
  for (let i = 0; i < m; i++) {
    const [p0, p1, p2, p3] = [pts[(i + m - 1) % m]!, pts[i]!, pts[(i + 1) % m]!, pts[(i + 2) % m]!];
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const c = (k: 0 | 1) => 0.5 * (2 * p1[k] + (p2[k] - p0[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (3 * p1[k] - p0[k] - 3 * p2[k] + p3[k]) * t * t * t);
      out.push([c(0), c(1)]);
    }
  }
  return out;
}

/** O centro da seção da coxa `k` a `acima` cm do joelho, e a direção dela (do joelho para o quadril). */
export function secaoDaCoxa(e: Esq, k: Lado, acima: number): { c: V3; eixo: V3 } {
  const X = e.lado[k];
  const eixo = norm(sub(X.quadril, X.joelho));
  return { c: add(X.joelho, mul(eixo, acima)), eixo };
}

/** A faixa em volta das duas coxas, com o meio dela a `acima` cm dos joelhos. */
export function lacoNasCoxas(e: Esq, acima: number): Laco {
  const R = secaoDaCoxa(e, 'R', acima),
    L = secaoDaCoxa(e, 'L', acima);
  const eixo = norm(add(R.eixo, L.eixo));
  const meio = mul(add(R.c, L.c), 0.5);
  // no plano perpendicular às coxas: e1 do centro da direita para o da esquerda, e2 para cima
  const e1 = norm(sub(sub(L.c, R.c), mul(eixo, dot(sub(L.c, R.c), eixo))));
  let e2 = cross(eixo, e1);
  if (e2[1] < 0) e2 = mul(e2, -1);
  const aneis = aneisDaPerna(e, 'coxa');
  const folga = g('esp') / 2;
  /** A volta da faixa no corte a `s` cm do meio dela (para o lado do quadril): o fecho das duas seções da pele. */
  const volta = (s: number, assenta?: (Lado | undefined)[]): V3[] => {
    const o = add(meio, mul(eixo, s));
    const secoes: P2[] = [];
    const dono = new Map<P2, Lado>();
    for (const k of ['R', 'L'] as const) {
      const A = aneis[k];
      const d = (p: V3) => dot(sub(p, o), eixo);
      const corte: P2[] = [];
      for (let j = 0; j < 12; j++) {
        // a linha da pele que corre ao longo da coxa cruza o corte entre dois anéis vizinhos
        let i = 0;
        while (i < A.length - 2 && d(A[i + 1]![j]!) < 0) i++;
        const a = A[i]![j]!,
          b = A[i + 1]![j]!;
        const t = (0 - d(a)) / (d(b) - d(a) || 1);
        const p = sub(add(a, mul(sub(b, a), t)), o);
        corte.push([dot(p, e1), dot(p, e2)]);
      }
      const curva = lisa(corte, 6);
      for (const p of curva) dono.set(p, k);
      secoes.push(...curva);
    }
    const H = fecho(secoes);
    // o ponto do fecho em cada direção a partir do meio das duas coxas (o mesmo número de pontos em toda volta)
    const pts: V3[] = [];
    for (let j = 0; j < N; j++) {
      const a = (2 * Math.PI * j) / N,
        dx = Math.cos(a),
        dy = Math.sin(a);
      let r = 0,
        onde: Lado | undefined;
      for (let i = 0; i < H.length; i++) {
        const p = H[i]!,
          q = H[(i + 1) % H.length]!;
        const ex = q[0] - p[0],
          ey = q[1] - p[1];
        const den = dx * ey - dy * ex;
        if (Math.abs(den) < 1e-9) continue;
        const t = (p[0] * ey - p[1] * ex) / den,
          w = (p[0] * dy - p[1] * dx) / den;
        if (t > r && w >= -1e-9 && w <= 1 + 1e-9) {
          r = t;
          // um lado do fecho com as duas pontas na mesma coxa assenta nela; de uma coxa à outra, é o trecho reto
          onde = dono.get(p) === dono.get(q) ? dono.get(p) : undefined;
        }
      }
      r += folga;
      assenta?.push(onde);
      pts.push(add(o, add(mul(e1, r * dx), mul(e2, r * dy))));
    }
    return pts;
  };
  const assenta: (Lado | undefined)[] = [];
  const pts = volta(0, assenta);
  let comp = 0;
  for (let i = 0; i < N; i++) comp += dist(pts[i]!, pts[(i + 1) % N]!);
  const estica = comp / g('comp');
  const larg = g('larg') / Math.sqrt(Math.max(1, estica));
  return {
    pts,
    bordas: [volta(-larg / 2), volta(larg / 2)],
    eixo,
    comp,
    estica,
    larg,
    centros: { R: R.c, L: L.c },
    assenta,
    pernas: [...bolasDaPerna(e, 'coxa'), ...bolasDaPerna(e, 'canela')],
  };
}

/** A curva fechada e lisa que passa pelos pontos do espaço (Catmull-Rom), com `n` pontos por trecho. */
function lisa3(pts: V3[], n: number): V3[] {
  const out: V3[] = [];
  const m = pts.length;
  for (let i = 0; i < m; i++) {
    const [p0, p1, p2, p3] = [pts[(i + m - 1) % m]!, pts[i]!, pts[(i + 1) % m]!, pts[(i + 2) % m]!];
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const c = (k: 0 | 1 | 2) => 0.5 * (2 * p1[k] + (p2[k] - p0[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t * t + (3 * p1[k] - p0[k] - 3 * p2[k] + p3[k]) * t * t * t);
      out.push([c(0), c(1), c(2)]);
    }
  }
  return out;
}

/**
 * A faixa em volta das duas canelas, com o meio dela a `acima` cm do centro de cada tornozelo (a mini band "nos
 * tornozelos"). Diferente das coxas, as duas canelas podem ficar longe de paralelas (uma perna estende e a outra fica
 * no chão; deitado de lado, a de baixo dobrada): cada canela é cortada na perpendicular dela mesma, e a faixa é o
 * fecho das duas seções visto no plano que passa pelos dois centros. Onde assenta numa canela, a faixa segue a pele
 * dela, com a largura ao longo dela; entre as duas, vai reta, torcendo de uma direção à outra.
 */
export function lacoNasCanelas(e: Esq, acima: number): Laco {
  const aneis = aneisDaPerna(e, 'canela');
  const folga = g('esp') / 2;
  const secao = (k: Lado) => {
    const X = e.lado[k];
    const ax = norm(sub(X.tornozelo, X.joelho));
    const s = dist(X.joelho, X.tornozelo) - acima;
    const A = aneis[k];
    const d = (p: V3) => dot(sub(p, X.joelho), ax) - s;
    const corte: V3[] = [];
    for (let j = 0; j < 12; j++) {
      // a linha da pele que corre ao longo da canela cruza o corte entre dois anéis vizinhos
      let i = 0;
      while (i < A.length - 2 && d(A[i + 1]![j]!) < 0) i++;
      const a = A[i]![j]!,
        b = A[i + 1]![j]!;
      const t = (0 - d(a)) / (d(b) - d(a) || 1);
      corte.push(add(a, mul(sub(b, a), t)));
    }
    return { c: add(X.joelho, mul(ax, s)), ax, pts: lisa3(corte, 6) };
  };
  const S = { R: secao('R'), L: secao('L') };
  const meio = mul(add(S.R.c, S.L.c), 0.5);
  // o plano da faixa: e1 do centro da direita para o da esquerda; o eixo médio das canelas, sem a parte ao longo de e1
  const e1 = norm(sub(S.L.c, S.R.c));
  const eixo = norm(perp(add(S.R.ax, S.L.ax), e1));
  let e2 = cross(eixo, e1);
  if (e2[1] < 0) e2 = mul(e2, -1);
  const no2 = (p: V3): P2 => [dot(sub(p, meio), e1), dot(sub(p, meio), e2)];
  const dono = new Map<P2, { k: Lado; p: V3 }>();
  const todos: P2[] = [];
  for (const k of ['R', 'L'] as const)
    for (const p of S[k].pts) {
      const q = no2(p);
      dono.set(q, { k, p });
      todos.push(q);
    }
  const H = fecho(todos);
  const pts: V3[] = [],
    larguras: V3[] = [],
    assenta: (Lado | undefined)[] = [];
  for (let j = 0; j < N; j++) {
    const a = (2 * Math.PI * j) / N,
      dx = Math.cos(a),
      dy = Math.sin(a);
    let r = 0,
      ponto: V3 = meio,
      ax: V3 = eixo,
      onde: Lado | undefined;
    for (let i = 0; i < H.length; i++) {
      const p = H[i]!,
        q = H[(i + 1) % H.length]!;
      const ex = q[0] - p[0],
        ey = q[1] - p[1];
      const den = dx * ey - dy * ex;
      if (Math.abs(den) < 1e-9) continue;
      const t = (p[0] * ey - p[1] * ex) / den,
        w = (p[0] * dy - p[1] * dx) / den;
      if (t > r && w >= -1e-9 && w <= 1 + 1e-9) {
        r = t;
        const P = dono.get(p)!,
          Q = dono.get(q)!;
        ponto = add(P.p, mul(sub(Q.p, P.p), w));
        ax = norm(add(mul(S[P.k].ax, 1 - w), mul(S[Q.k].ax, w)));
        onde = P.k === Q.k ? P.k : undefined;
      }
    }
    pts.push(add(ponto, add(mul(e1, folga * dx), mul(e2, folga * dy))));
    larguras.push(ax);
    assenta.push(onde);
  }
  let comp = 0;
  for (let i = 0; i < N; i++) comp += dist(pts[i]!, pts[(i + 1) % N]!);
  const estica = comp / g('comp');
  const larg = g('larg') / Math.sqrt(Math.max(1, estica));
  return {
    pts,
    bordas: [pts.map((p, i) => add(p, mul(larguras[i]!, -larg / 2))), pts.map((p, i) => add(p, mul(larguras[i]!, larg / 2)))],
    eixo,
    comp,
    estica,
    larg,
    centros: { R: S.R.c, L: S.L.c },
    assenta,
    pernas: [...bolasDaPerna(e, 'coxa'), ...bolasDaPerna(e, 'canela')],
    parte: 'canela',
  };
}

/** A faixa ao longo da volta, assentada nas coxas, com a largura ao longo delas (estreita ao esticar). */
export function miniBand(l: Laco): { prims: Prim[]; peca: PecaPropria } {
  const [frente, tras] = l.bordas;
  return {
    prims: [{ t: 'fio', pts: [...l.pts, l.pts[0]!], larg: g('esp'), cls: 'fita' }],
    peca: {
      t: 'propria',
      nome: 'mini-band',
      desenhar(C, _M, o) {
        const M = o.tema === 'claro' ? ACAO : ACAO.map((t) => mix(t, '#aeb8c2', 0.25));
        const f1 = (n: number) => (Math.round(n * 100) / 100).toString();
        const meio = mul(
          l.pts.reduce((acc, p) => add(acc, p), [0, 0, 0] as V3),
          1 / N,
        );
        // a direção de quem olha, no mundo (a profundidade da peça cresce para longe de quem olha)
        const z0 = C.P([0, 0, 0])[2];
        const olho = norm([z0 - C.P([1, 0, 0])[2], z0 - C.P([0, 1, 0])[2], z0 - C.P([0, 0, 1])[2]]);
        /** Há uma perna entre o ponto e quem olha? (`menos`: a coxa em que o pedaço assenta não conta) */
        const escondido = (p: V3, menos?: Lado) =>
          l.pernas.some((b) => {
            if (b.parte === (l.parte ?? 'coxa') && b.lado === menos) return false;
            const v = sub(b.c, p);
            const t = dot(v, olho);
            return t > 0 && dist(v, mul(olho, t)) < b.r * 0.94;
          });
        for (let i = 0; i < N; i++) {
          const j = (i + 1) % N;
          // o pedaço da faixa: um quadrilátero da borda da frente à de trás (o traço da mesma cor fecha a fresta
          // entre ele e o vizinho)
          const cantos = [frente[i]!, frente[j]!, tras[j]!, tras[i]!];
          const Q = cantos.map((p) => C.P(p));
          // a face clara de fora, a de dentro mais escura: o lado da faixa virado para quem olha
          const centro = mul(
            cantos.reduce((acc, p) => add(acc, p), [0, 0, 0] as V3),
            0.25,
          );
          const normal = norm(cross(sub(frente[j]!, frente[i]!), sub(tras[i]!, frente[i]!)));
          const paraFora = dot(normal, sub(centro, meio)) >= 0 ? normal : mul(normal, -1);
          const luz = dot(paraFora, olho) > 0;
          // assentado numa coxa, o pedaço só aparece do lado dela virado para quem olha
          const naCoxa = l.assenta[i] !== undefined && l.assenta[i] === l.assenta[j] ? l.assenta[i] : undefined;
          if ((naCoxa && !luz) || escondido(centro, naCoxa)) continue;
          // por cima das pernas (o que elas escondem já saiu acima); entre os pedaços, o de trás primeiro
          const z = Q.reduce((s, q) => s + q[2], 0) / 4 - POR_CIMA;
          const d = `M${Q.map((q) => f1(q[0]) + ' ' + f1(q[1])).join('L')}Z`;
          C.bruto(z, `<path d="${d}" fill="${luz ? M[2] : M[1]}" stroke="${luz ? M[2] : M[1]}" stroke-width="0.6" stroke-linejoin="round"/>`);
          // o pedaço, para a conferência da pintura (não muda o desenho)
          C.geo({ placa: cantos });
          // as bordas da faixa (o traço escuro) e um brilho no meio
          const linha = (p: V3, q: V3) => {
            const P = C.P(p),
              R = C.P(q);
            return `M${f1(P[0])} ${f1(P[1])}L${f1(R[0])} ${f1(R[1])}`;
          };
          C.bruto(z - 0.01, `<path d="${linha(frente[i]!, frente[j]!)}${linha(tras[i]!, tras[j]!)}" stroke="${M[0]}" stroke-width="0.45" fill="none" stroke-linecap="round"/>`);
          const perto = (a: V3, b: V3) => add(mul(a, 0.6), mul(b, 0.4));
          if (luz) C.bruto(z - 0.02, `<path d="${linha(perto(frente[i]!, tras[i]!), perto(frente[j]!, tras[j]!))}" stroke="${M[3]}" stroke-width="0.35" fill="none" opacity="0.7"/>`);
        }
      },
    },
  };
}
