// Redesign, lote 5 (08/11/2026): 3 estilos candidatos para os desenhos de equipamento, em 8 amostras.
// A = "Linha detalhada" (só traço na cor do texto), B = A + uma pessoa neutra usando o aparelho,
// C = "Preenchido" (formas chapadas em 2 tons). viewBox 0 0 96 72, chão em y = 66.
// Cada aparelho é descrito UMA vez como uma lista de peças (tubo, estofado, pilha de placas, anilha...);
// o estilo só muda como cada peça é pintada. Assim o estilo escolhido se estende aos 49 itens e vira JSX.
// Tons (definidos por quem usa o desenho, com valor padrão):
//   currentColor   traço e estrutura (cinza do texto no cartão desmarcado, cor de ação no marcado)
//   --dz-claro     estofados no estilo C (tom mais claro do currentColor)
//   --dz-pessoa    a pessoa do estilo B (tom claro e neutro)
//   --dz-sup       a superfície do cartão (usada para uma peça esconder o que está atrás dela)

export const VIEWBOX = '0 0 96 72';
export const RAIZ = `viewBox="${VIEWBOX}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;

// ---------- geometria ----------
const r = (n) => Math.round(n * 10) / 10;
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => mul(a, 1 / len(a));
const perp = (a) => [a[1], -a[0]]; // gira 90° no sentido anti-horário da tela (para "cima" de um vetor que vai para a direita)
const pt = (p) => `${r(p[0])} ${r(p[1])}`;
const path = (...pts) => 'M' + pts.map(pt).join('L');
// joelho/cotovelo: dado o início (a), o fim (b) e os dois comprimentos, o lado (+1/-1) escolhe a dobra
function junta(a, b, l1, l2, lado = 1) {
  const d = sub(b, a);
  const D = Math.min(len(d), l1 + l2 - 0.01);
  const u = unit(d);
  const x = (l1 * l1 - l2 * l2 + D * D) / (2 * D);
  const h = Math.sqrt(Math.max(0, l1 * l1 - x * x));
  return add(add(a, mul(u, x)), mul(perp(u), h * lado));
}
// ponto ao longo de uma reta (origem o, direção unitária u) com deslocamento normal n
const ao = (o, u, s, k = 0) => add(add(o, mul(u, s)), mul(perp(u), k));

// ---------- peças ----------
const SUP = 'var(--dz-sup, #fff)';
const CLARO = 'var(--dz-claro, #b9bbbf)';
const PESSOA = 'var(--dz-pessoa, #c3c5c9)';

// retângulo arredondado entre dois pontos (eixo longo de a até b), com espessura e
function barraRect(a, b, e, attrs) {
  const c = mul(add(a, b), 0.5);
  const L = len(sub(b, a)) + e; // inclui as pontas arredondadas
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  return `<rect x="${r(c[0] - L / 2)}" y="${r(c[1] - e / 2)}" width="${r(L)}" height="${r(e)}" rx="${r(e / 2.2)}"${
    Math.abs(ang) > 0.01 ? ` transform="rotate(${r(ang)} ${pt(c)})"` : ''
  } ${attrs}/>`;
}

const PECA = {
  // tubo da estrutura
  tubo: (est, d, peso = 1) =>
    est === 'C' ? `<path d="${d}" stroke-width="${r(4.2 * peso)}"/>` : `<path d="${d}"${peso !== 1 ? ` stroke-width="${r(2.2 * peso)}"` : ''}/>`,
  // cabo de aço, pino: traço fino
  fino: (est, d) => `<path d="${d}" stroke-width="${est === 'C' ? 1.6 : 1.3}"/>`,
  // pegador (manopla)
  pega: (est, d) => `<path d="${d}" stroke-width="${est === 'C' ? 3.6 : 2.6}"/>`,
  // estofado (banco, encosto, apoio): no C, chapado no tom claro; no A/B, contorno que esconde o que está atrás
  estofado: (est, a, b, e) =>
    est === 'C' ? barraRect(a, b, e, `fill="${CLARO}" stroke="none"`) : barraRect(a, b, e, `style="fill:${SUP}"`),
  // estofado retangular dado pela caixa (encosto largo)
  caixa: (est, x, y, w, h, rx = 3) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${est === 'C' ? `fill="${CLARO}" stroke="none"` : `style="fill:${SUP}"`}/>`,
  // rolo estofado (apoio dos tornozelos)
  rolo: (est, c, raio) =>
    `<circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio)}" ${est === 'C' ? `fill="${CLARO}" stroke="none"` : `style="fill:${SUP}"`}/>`,
  // chapa de metal (plataforma, carrinho)
  chapa: (est, a, b, e) =>
    est === 'C' ? barraRect(a, b, e, `fill="currentColor" stroke="none"`) : barraRect(a, b, e, `style="fill:${SUP}"`),
  // forma sólida qualquer (corpo do kettlebell, coluna)
  solido: (est, d, extra = '') =>
    est === 'C' ? `<path d="${d}" fill="currentColor" stroke="none" ${extra}/>` : `<path d="${d}" style="fill:${SUP}" ${extra}/>`,
  // pilha de placas de peso
  pilha: (est, x, y, w, h, n) => {
    const linhas = Array.from({ length: n - 1 }, (_, i) => `M${r(x)} ${r(y + ((i + 1) * h) / n)}h${r(w)}`).join('');
    return est === 'C'
      ? `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" rx="1" fill="currentColor" stroke="none"/><path d="${linhas}" stroke="${CLARO}" stroke-width="1.2"/>`
      : `<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" rx="1" style="fill:${SUP}"/><path d="${linhas}" stroke-width="1.2"/>`;
  },
  // anilha vista de lado (disco com furo)
  anilha: (est, c, raio) =>
    est === 'C'
      ? `<circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio)}" fill="currentColor" stroke="none"/><circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio * 0.32)}" fill="${CLARO}" stroke="none"/>`
      : `<circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio)}" style="fill:${SUP}"/><circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio * 0.32)}"/>`,
  // roldana
  polia: (est, c, raio = 2.6) =>
    est === 'C'
      ? `<circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio + 0.6)}" fill="currentColor" stroke="none"/>`
      : `<circle cx="${r(c[0])}" cy="${r(c[1])}" r="${r(raio)}" style="fill:${SUP}"/>`,
  // trecho livre já pronto por estilo
  livre: (est, porEstilo) => porEstilo[est] ?? porEstilo.A ?? '',
};

// pessoa neutra: membros em cápsula (traço grosso arredondado) e cabeça redonda, num tom claro e liso
function pessoa(j) {
  const seg = (a, b, w) => (a && b ? `<path d="${path(a, b)}" stroke-width="${w}"/>` : '');
  const partes = [
    // membros do lado de trás primeiro (mesmo tom: a sobreposição some)
    seg(j.ombro2, j.cotovelo2, 5.6),
    seg(j.cotovelo2, j.mao2, 5),
    seg(j.quadril2, j.joelho2, 7.6),
    seg(j.joelho2, j.tornozelo2, 6.2),
    seg(j.tornozelo2, j.pe2, 4.4),
    seg(j.quadrilPerna ?? j.quadril, j.joelho, 7.6),
    seg(j.joelho, j.tornozelo, 6.2),
    seg(j.tornozelo, j.pe, 4.4),
    seg(j.ombro, j.quadril, j.tronco ?? 9.5),
    seg(j.ombroBraco ?? j.ombro, j.cotovelo, 5.6),
    seg(j.cotovelo, j.mao, 5),
  ];
  const cab = `<circle cx="${r(j.cabeca[0])}" cy="${r(j.cabeca[1])}" r="${j.raio ?? 5.4}" fill="${PESSOA}" stroke="none"/>`;
  return `<g stroke="${PESSOA}" stroke-linecap="round">${partes.join('')}</g>${cab}`;
}

function montar(est, pecas) {
  return pecas
    .filter(Boolean)
    .map(([tipo, ...args]) => PECA[tipo](est, ...args))
    .join('');
}

// ---------- os 8 aparelhos ----------
// Cada um: { fundo: [peças atrás da pessoa], frente: [peças na frente], pessoa: juntas, soA/soB/soC: peças só daquele estilo }
const APARELHOS = {};

// 1. Leg press 45°: trilho inclinado, carrinho com plataforma para os pés e anilha, banco reclinado embaixo.
{
  const O = [38, 64];
  const u = unit([1, -1]);
  const R = (s, k = 0) => ao(O, u, s, k); // k > 0 = para cima/esquerda do trilho
  const quadril = [30, 49];
  const tornozelo = add(R(30, 12), mul(u, -3));
  const joelho = junta(quadril, tornozelo, 20, 18, 1);
  const ombro = [17, 35];
  APARELHOS.leg_press = {
    fundo: [
      ['tubo', 'M12 66H88'],
      ['tubo', path(R(0), R(64))],
      ['tubo', 'M84 18V66'],
      ['tubo', path(R(52), [84, 40])],
      ['tubo', 'M31 56V66'],
      ['tubo', 'M17 46L21 66'],
      ['chapa', R(28, 3.5), R(50, 3.5), 5],
      ['anilha', R(42, 10), 7.5],
      ['chapa', R(28, 0), R(28, 21), 3.6],
      ['estofado', [22, 57], [40, 53], 5.4],
      ['estofado', [23, 53.5], [10, 39], 5.4],
    ],
    pessoa: {
      cabeca: [12.5, 28.5],
      ombro,
      quadril,
      joelho,
      tornozelo,
      pe: add(tornozelo, mul(perp(u), 5)),
      cotovelo: [24, 44],
      mao: [33, 49.5],
    },
    frente: [['pega', 'M33 51l5 -2']],
  };
}

// 2. Polia dupla (crossover), de frente: duas torres com pilha de placas, roldana regulável, cabos e pegadores.
{
  const torre = (esp) => {
    const X = (x) => (esp ? 96 - x : x);
    return [
      ['tubo', `M${X(5)} 66H${X(25)}`],
      ['tubo', `M${X(7)} 6V66M${X(21)} 6V66M${X(7)} 6H${X(21)}`],
      ['pilha', Math.min(X(9.5), X(18.5)), 44, 9, 18, 5],
      ['fino', `M${X(14)} 44V10`],
      ['tubo', `M${X(27)} 8V66`, 0.9],
      ['livre', { A: `<path d="M${X(27)} 24v0M${X(27)} 34v0M${X(27)} 44v0M${X(27)} 54v0" stroke-width="3"/>`, C: '' }],
    ];
  };
  const polE = [30.5, 18];
  const polD = [65.5, 18];
  const maoE = [39, 41];
  const maoD = [57, 41];
  APARELHOS.estacao_polia_dupla = {
    fundo: [
      ...torre(false),
      ...torre(true),
      ['tubo', 'M7 6H89'],
      ['chapa', [27, 15], [27, 21], 3.4],
      ['chapa', [69, 15], [69, 21], 3.4],
      ['polia', polE, 2.4],
      ['polia', polD, 2.4],
    ],
    soA: [
      ['fino', path(polE, [37, 46])],
      ['fino', path(polD, [59, 46])],
      ['pega', 'M35 47l4 2M61 47l-4 2'],
    ],
    soC: [
      ['fino', path(polE, [37, 46])],
      ['fino', path(polD, [59, 46])],
      ['pega', 'M35 47l4 2M61 47l-4 2'],
    ],
    pessoa: {
      cabeca: [48, 16],
      ombro: [48, 26],
      quadril: [48, 42],
      tronco: 12,
      ombro2: [43, 26],
      cotovelo2: [40, 34],
      mao2: maoE,
      ombroBraco: [53, 26],
      cotovelo: [56, 34],
      mao: maoD,
      quadril2: [45.5, 44],
      joelho2: [44.5, 55],
      tornozelo2: [44, 65],
      joelho: [51.5, 55],
      tornozelo: [52, 65],
    },
    frenteB: [
      ['fino', path(polE, maoE)],
      ['fino', path(polD, maoD)],
      ['pega', `M${pt(add(maoE, [-1.5, -1.5]))}l3 3M${pt(add(maoD, [1.5, -1.5]))}l-3 3`],
    ],
  };
}

// 3. Graviton, de lado: coluna com pilha, barra fixa no alto, paralelas no meio, apoio de joelhos na alavanca, degrau.
{
  APARELHOS.graviton = {
    fundo: [
      ['tubo', 'M28 66H90'],
      ['tubo', 'M68 4V66M88 4V66M68 4H88'],
      ['pilha', 71, 44, 14, 18, 5],
      ['fino', 'M78 44V8'],
      ['tubo', 'M68 7H40'],
      ['pega', 'M40 7l-6 5'],
      ['tubo', 'M68 31H50'],
      ['pega', 'M50 31h-7'],
      ['tubo', 'M68 56L49 51'],
      ['polia', [68, 56], 2.2],
      ['estofado', [31, 50.5], [50, 50.5], 5.6],
      ['tubo', 'M34 61H48M41 61V66'],
    ],
    pessoa: {
      cabeca: [44.5, 18],
      ombro: [44, 26],
      quadril: [43, 39],
      joelho: [44, 46.5],
      tornozelo: [32, 46.5],
      pe: [28, 45.5],
      cotovelo: [39.5, 17],
      mao: [35.5, 9.5],
    },
    frente: [['pega', 'M40 7l-6 5']],
  };
}

// 4. Hack: trilho inclinado atrás das costas, encosto e apoios de ombro que deslizam, plataforma dos pés embaixo.
{
  const O = [64, 62];
  const u = unit([-44, -50]); // sobe para a esquerda
  const R = (s, k = 0) => ao(O, u, s, k); // k > 0 = para cima/direita do trilho
  const quadril = R(20, 10);
  const ombro = R(40, 10);
  const tornozelo = [74, 59.5];
  const joelho = junta(quadril, tornozelo, 20, 18, 1);
  APARELHOS.hack = {
    fundo: [
      ['tubo', 'M10 66H90'],
      ['tubo', path(R(-4), R(64))],
      ['tubo', `M18 ${r(R(64)[1] - 2)}V66`],
      ['tubo', path(R(30), [30, 66])],
      ['chapa', R(10, 2.6), R(48, 2.6), 3],
      ['anilha', R(20, 1), 7],
      ['estofado', R(14, 6), R(42, 6), 5.4],
      ['estofado', R(45.5, 6.5), R(45.5, 17), 5],
      ['chapa', [66, 62.5], [84, 57], 3.6],
      ['tubo', 'M78 59V66'],
    ],
    pessoa: {
      cabeca: R(50.5, 8.5),
      ombro,
      quadril,
      joelho,
      tornozelo,
      pe: [80, 57.5],
      cotovelo: R(31, 16),
      mao: R(43, 19),
    },
    frente: [],
    frenteB: [['pega', `M${pt(R(43, 17))}l3 3`]],
  };
}

// 5. Banco Scott: banquinho, apoio inclinado e largo para os braços, suporte com a barra (2 anilhas, em 3/4) na ponta.
{
  const a = [37, 24];
  const b = [57, 43];
  const u = unit(sub(b, a));
  const n = perp(u); // "para cima" do apoio
  const anilha = [68, 50];
  const longe = add(anilha, [5, -4]);
  APARELHOS.banco_scott = {
    fundo: [
      ['tubo', 'M8 66H84'],
      ['tubo', 'M22 49V66'],
      ['tubo', 'M50 42V66'],
      ['tubo', path(add(b, mul(n, -4)), [62, 56], [62, 66])],
      ['pega', path([59, 53], [65, 53])],
      ['estofado', [14, 46.5], [30, 46.5], 6],
      ['estofado', a, b, 8.5],
      ['anilha', longe, 7],
      ['fino', path(anilha, longe)],
    ],
    pessoa: {
      cabeca: [32, 11],
      ombro: [35, 20],
      quadril: [23, 40],
      joelho: [40, 44],
      tornozelo: [40, 62],
      pe: [44, 63.5],
      cotovelo: add(add(a, mul(u, 15)), mul(n, 7.6)),
      mao: [65, 46],
    },
    frente: [['anilha', anilha, 7]],
  };
}

// 6. Cadeira abdutora e adutora, de frente: encosto alto, assento, almofadas por fora dos joelhos nos braços que abrem,
// barra dos pés e o alto da pilha de placas atrás do encosto.
{
  const lado = (esp) => {
    const X = (x) => (esp ? 96 - x : x);
    return [
      ['tubo', `M48 53L${X(22)} 49`],
      ['caixa', Math.min(X(16), X(23)), 37, 7, 17, 3],
      ['pega', `M${X(31)} 41V33`],
    ];
  };
  APARELHOS.cadeira_abdutora_adutora = {
    fundo: [
      ['pilha', 40, 2, 16, 8, 3],
      ['tubo', 'M26 66H70M48 47V66'],
      ['tubo', 'M31 61H65'],
      ['caixa', 39, 12, 18, 29, 5],
      ['caixa', 30, 40, 36, 7, 3],
      ...lado(false),
      ...lado(true),
    ],
    pessoa: {
      cabeca: [48, 13],
      ombro: [48, 22],
      quadril: [48, 37],
      tronco: 13,
      ombro2: [43.5, 23],
      cotovelo2: [36, 30],
      mao2: [31.5, 35],
      ombroBraco: [52.5, 23],
      cotovelo: [60, 30],
      mao: [64.5, 35],
      quadril2: [43, 41],
      joelho2: [27.5, 45],
      tornozelo2: [30, 59],
      pe2: [27, 60.5],
      quadrilPerna: [53, 41],
      joelho: [68.5, 45],
      tornozelo: [66, 59],
      pe: [69, 60.5],
    },
    frente: [],
  };
}

// 7. Banco romano 45° (hiperextensão): viga inclinada, apoio do quadril no alto, rolos para os tornozelos, plataforma dos pés.
{
  const O = [16, 64];
  const u = unit([1, -1]);
  const R = (s, k = 0) => ao(O, u, s, k); // k > 0 = para cima/esquerda
  const quadril = R(47, 9.6);
  const tornozelo = R(14, 8.2);
  const joelho = add(mul(tornozelo, 0.48), mul(quadril, 0.52));
  APARELHOS.banco_romano = {
    fundo: [
      ['tubo', 'M8 66H84'],
      ['tubo', path(R(0), R(58))],
      ['tubo', path(R(50), [68, 66])],
      ['chapa', R(8, 0), R(8, 15), 3.4],
      ['estofado', R(40, 3.6), R(56, 3.6), 6],
      ['tubo', path(R(17, 0), R(17, 12.5))],
      ['rolo', R(17, 3.6), 3.2],
    ],
    pessoa: {
      cabeca: [64.5, 50.5],
      ombro: [60, 42.5],
      quadril,
      joelho,
      tornozelo,
      pe: R(10.5, 12),
      cotovelo: [57.5, 49],
      mao: [61, 56],
    },
    frente: [['rolo', R(17, 12.6), 3.2]],
  };
}

// 8. Kettlebell: corpo redondo de base achatada e alça larga; um menor ao lado dá a ideia de vários pesos.
function kettlebell(cx, cyBase, k) {
  // k = escala; medidas do grande (raio 17, base em y = cyBase)
  const R0 = 17 * k;
  const cy = cyBase - 14 * k; // centro do corpo
  const yb = cyBase; // base reta
  const hb = Math.sqrt(R0 * R0 - (yb - cy) * (yb - cy)); // meia largura da base
  const ang = (50 * Math.PI) / 180;
  const ex = R0 * Math.sin(ang);
  const ey = cy - R0 * Math.cos(ang);
  const ix = 8.5 * k;
  const iy = cy - Math.sqrt(R0 * R0 - ix * ix);
  const corpo = `M${r(cx - hb)} ${r(yb)}A${r(R0)} ${r(R0)} 0 1 1 ${r(cx + hb)} ${r(yb)}Z`;
  const alcaFora = `M${r(cx - ex)} ${r(ey)}C${r(cx - ex - 3 * k)} ${r(ey - 10 * k)} ${r(cx - ex - 1 * k)} ${r(ey - 21 * k)} ${r(cx - 6 * k)} ${r(ey - 22 * k)}H${r(cx + 6 * k)}C${r(cx + ex + 1 * k)} ${r(ey - 21 * k)} ${r(cx + ex + 3 * k)} ${r(ey - 10 * k)} ${r(cx + ex)} ${r(ey)}`;
  const alcaDentro = `M${r(cx - ix)} ${r(iy)}C${r(cx - ix - 1.5 * k)} ${r(iy - 7 * k)} ${r(cx - ix + 0.5 * k)} ${r(iy - 14.5 * k)} ${r(cx - 4 * k)} ${r(iy - 15 * k)}H${r(cx + 4 * k)}C${r(cx + ix - 0.5 * k)} ${r(iy - 14.5 * k)} ${r(cx + ix + 1.5 * k)} ${r(iy - 7 * k)} ${r(cx + ix)} ${r(iy)}`;
  // alça cheia (para o C): contorno de fora e volta pelo de dentro
  const dentroInvertido = `L${r(cx + ix)} ${r(iy)}C${r(cx + ix + 1.5 * k)} ${r(iy - 7 * k)} ${r(cx + ix - 0.5 * k)} ${r(iy - 14.5 * k)} ${r(cx + 4 * k)} ${r(iy - 15 * k)}H${r(cx - 4 * k)}C${r(cx - ix + 0.5 * k)} ${r(iy - 14.5 * k)} ${r(cx - ix - 1.5 * k)} ${r(iy - 7 * k)} ${r(cx - ix)} ${r(iy)}Z`;
  return {
    A: `<path d="${corpo}" style="fill:${SUP}"/><path d="${alcaFora}"/><path d="${alcaDentro}"/>`,
    C: `<path d="${alcaFora}${dentroInvertido}" fill="currentColor" stroke="none"/><path d="${corpo}" fill="currentColor" stroke="none"/><path d="M${r(cx - hb * 0.9)} ${r(yb - 2.2 * k)}H${r(cx + hb * 0.9)}" stroke="${CLARO}" stroke-width="${r(1.4 * k + 0.4)}"/>`,
  };
}
{
  const grande = kettlebell(36, 65, 1);
  const peq = kettlebell(74, 65, 0.6);
  const noAr = kettlebell(59, 48, 0.55);
  APARELHOS.kettlebell = {
    soA: [['tubo', 'M8 66H90', 0.6], ['livre', grande], ['livre', peq]],
    soC: [['tubo', 'M8 66H90', 0.6], ['livre', grande], ['livre', peq]],
    soB: [['tubo', 'M8 66H90', 0.6]],
    pessoa: {
      cabeca: [33, 15],
      ombro: [33, 24],
      quadril: [32, 42],
      joelho: [33, 54],
      tornozelo: [32, 65],
      pe: [37, 65.5],
      quadril2: [31, 42],
      joelho2: [29, 54],
      tornozelo2: [27, 65],
      pe2: [32, 65.5],
      cotovelo: [45, 26],
      mao: [58, 28],
    },
    frenteB: [['livre', noAr]],
  };
}

// ---------- saída ----------
function estilos(ap) {
  const A = montar('A', [...(ap.fundo ?? []), ...(ap.soA ?? []), ...(ap.frente ?? [])]);
  const j = ap.pessoa;
  const B =
    montar('A', [...(ap.fundo ?? []), ...(ap.soB ?? [])]) +
    pessoa(j) +
    montar('A', [...(ap.frente ?? []), ...(ap.frenteB ?? [])]);
  const C = montar('C', [...(ap.fundo ?? []), ...(ap.soC ?? []), ...(ap.frente ?? [])]);
  return { A, B, C };
}

export const DESENHOS = Object.fromEntries(Object.entries(APARELHOS).map(([id, ap]) => [id, estilos(ap)]));

export const NOMES = {
  leg_press: { curto: 'Leg press', completo: 'Leg press' },
  estacao_polia_dupla: { curto: 'Polia dupla (crossover)', completo: 'Estação de polia dupla (crossover) com altura regulável' },
  graviton: { curto: 'Graviton', completo: 'Graviton (barra e mergulho assistidos)' },
  hack: { curto: 'Hack ou pendular', completo: 'Hack ou agachamento pendular' },
  banco_scott: { curto: 'Banco Scott', completo: 'Banco Scott' },
  cadeira_abdutora_adutora: { curto: 'Abdutora e adutora', completo: 'Cadeira abdutora e adutora (ou máquina de abdução em pé)' },
  banco_romano: { curto: 'Banco romano ou GHD', completo: 'Banco romano (hiperextensão) ou GHD' },
  kettlebell: { curto: 'Kettlebell', completo: 'Kettlebell' },
};
