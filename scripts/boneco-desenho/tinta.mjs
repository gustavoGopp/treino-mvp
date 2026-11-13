// Ferramentas de desenho das pranchas do Boneco: curvas suaves a partir de pontos escolhidos à mão, membros que
// afinam com um perfil diferente de cada lado, e o truque do contorno único (um grupo de formas ganha uma linha só
// em volta, sem emendas por dentro). Tudo em centímetros, com y para cima; quem monta a prancha vira o eixo.
// Sem aleatoriedade: os mesmos pontos dão o mesmo desenho.

export const r1 = (n) => Math.round(n * 10) / 10;
export const soma = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const menos = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const vezes = (a, k) => [a[0] * k, a[1] * k];
export const tam = (a) => Math.hypot(a[0], a[1]);
export const uni = (a) => {
  const l = tam(a) || 1;
  return [a[0] / l, a[1] / l];
};
/** Giro de 90° no sentido anti-horário: num membro que aponta para baixo, é o lado da frente de quem olha para a direita. */
export const normal = (u) => [-u[1], u[0]];
export const entre = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/**
 * Curva suave que passa por todos os pontos (Catmull-Rom convertida em Bézier). Um ponto com um terceiro valor
 * 'c' vira canto vivo. Devolve o atributo `d` do caminho.
 */
export function suave(pts, fechado = true, k = 1 / 6) {
  const n = pts.length;
  const P = (i) => pts[fechado ? ((i % n) + n) % n : Math.max(0, Math.min(n - 1, i))];
  let d = `M${r1(pts[0][0])} ${r1(pts[0][1])}`;
  const fim = fechado ? n : n - 1;
  for (let i = 0; i < fim; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const c1 = p1[2] === 'c' ? p1 : [p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k];
    const c2 = p2[2] === 'c' ? p2 : [p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k];
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d + (fechado ? 'Z' : '');
}

/** Interpola o perfil [[t, frente, trás], ...] num t qualquer (linear entre as estações; a curva suaviza depois). */
function noPerfil(perfil, t) {
  if (t <= perfil[0][0]) return perfil[0];
  for (let i = 1; i < perfil.length; i++) {
    if (t <= perfil[i][0]) {
      const a = perfil[i - 1], b = perfil[i], u = (t - a[0]) / (b[0] - a[0] || 1);
      return [t, a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
    }
  }
  return perfil[perfil.length - 1];
}

/**
 * Um membro de `a` até `b` com perfil próprio de cada lado: [[t, frente, trás], ...], em cm, onde `frente` é o lado
 * da normal anti-horária (ver `normal`). Pontas: 'redonda' (uma calota do tamanho do membro ali) ou 'reta'.
 * Devolve os pontos do contorno (para `suave`), e não o caminho, para dar para emendar e recortar.
 */
export function membro(a, b, perfil, { ini = 'redonda', fim = 'redonda', gordura = 1, de = 0, ate = 1 } = {}) {
  const u = uni(menos(b, a)), n = normal(u), L = tam(menos(b, a));
  const est = perfil.filter((p) => p[0] > de && p[0] < ate).map((p) => p[0]);
  const ts = [de, ...est, ate];
  const em = (t, o) => soma(soma(a, vezes(u, t * L)), vezes(n, o));
  const frente = ts.map((t) => em(t, noPerfil(perfil, t)[1] * gordura));
  const tras = ts.map((t) => em(t, -noPerfil(perfil, t)[2] * gordura)).reverse();
  const calota = (t, sentido) => {
    const p = noPerfil(perfil, t), f = p[1] * gordura, tr = p[2] * gordura, r = (f + tr) / 2;
    const c = (f - tr) / 2; // o meio da calota acompanha o perfil torto
    const pts = [em(t, c + r * 0.72), em(t, c), em(t, c - r * 0.72)].map((q, i) => soma(q, vezes(u, sentido * r * (i === 1 ? 0.98 : 0.68))));
    return sentido > 0 ? pts : pts.reverse();
  };
  const canto = (p) => [p[0], p[1], 'c'];
  const out = [];
  if (ini === 'reta') frente[0] = canto(frente[0]);
  if (fim === 'reta') frente[frente.length - 1] = canto(frente[frente.length - 1]);
  if (fim === 'reta') tras[0] = canto(tras[0]);
  if (ini === 'reta') tras[tras.length - 1] = canto(tras[tras.length - 1]);
  out.push(...frente);
  if (fim === 'redonda') out.push(...calota(ate, 1));
  out.push(...tras);
  if (ini === 'redonda') out.push(...calota(de, -1));
  return out;
}

/**
 * Uma faixa ao longo de uma linha de vários pontos (a coluna, por exemplo), com a largura de cada lado dada pelo
 * perfil [[t, frente, trás], ...], t medido pelo comprimento. `frente` é o lado da normal anti-horária do sentido
 * em que a linha é percorrida. Pontas retas (são cobertas por outras partes).
 */
export function faixa(linha, perfil) {
  const acum = [0];
  for (let i = 1; i < linha.length; i++) acum.push(acum[i - 1] + tam(menos(linha[i], linha[i - 1])));
  const total = acum[acum.length - 1];
  const frente = [], tras = [];
  linha.forEach((p, i) => {
    const u = uni(menos(linha[Math.min(i + 1, linha.length - 1)], linha[Math.max(i - 1, 0)])), n = normal(u);
    const [, f, t] = noPerfil(perfil, acum[i] / total);
    frente.push(soma(p, vezes(n, f)));
    tras.push(soma(p, vezes(n, -t)));
  });
  const canto = (p) => [p[0], p[1], 'c'];
  frente[0] = canto(frente[0]);
  frente[frente.length - 1] = canto(frente[frente.length - 1]);
  tras[0] = canto(tras[0]);
  tras[tras.length - 1] = canto(tras[tras.length - 1]);
  return [...frente, ...tras.reverse()];
}

/** Põe um desenho feito em coordenadas próprias [ao longo, de lado] no lugar: origem `o`, eixo `ex` e eixo `ey` na tela. */
export const colocar = (pts, o, ex, ey, k = 1) => pts.map((p) => {
  const q = [o[0] + (p[0] * ex[0] + p[1] * ey[0]) * k, o[1] + (p[0] * ex[1] + p[1] * ey[1]) * k];
  return p[2] ? [q[0], q[1], p[2]] : q;
});

export const espelhar = (pts) => pts.map((p) => (p[2] ? [-p[0], p[1], p[2]] : [-p[0], p[1]])).reverse();

let conta = 0;
/** Zera a numeração dos recortes (para a mesma prancha sair sempre igual). */
export const zerarIds = () => {
  conta = 0;
};
const novoId = (p) => `${p}${++conta}`;

/** Mistura duas cores '#rrggbb': t = 0 dá a primeira, t = 1 dá a segunda. */
export function misturar(a, b, t) {
  const n = (h, i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16);
  return '#' + [0, 1, 2].map((i) => Math.round(n(a, i) + (n(b, i) - n(a, i)) * t).toString(16).padStart(2, '0')).join('');
}
/** Desenha `conteudo` só por fora das formas dadas. */
export function foraDe(ds, conteudo) {
  const id = novoId('for');
  return `<clipPath id="${id}"><path clip-rule="evenodd" d="M-999 -999H999V999H-999Z ${ds.join(' ')}"/></clipPath><g clip-path="url(#${id})">${conteudo}</g>`;
}
/** Desenha `conteudo` só por dentro das formas dadas (lista de caminhos). */
export function recorte(ds, conteudo) {
  const id = novoId('rec');
  return `<clipPath id="${id}">${ds.map((d) => `<path d="${d}"/>`).join('')}</clipPath><g clip-path="url(#${id})">${conteudo}</g>`;
}

/**
 * Um grupo de formas com um contorno só em volta: primeiro todas as formas com o traço (o dobro da espessura,
 * porque metade fica escondida), depois os preenchimentos por cima. O traço só sobra na borda de fora do conjunto.
 *  formas: [{ d, cor }]
 *  contorno: { cor, esp } ou null (sem contorno)
 *  semLinhaSobre: caminhos em cima dos quais o contorno deste grupo não aparece (ex.: a coxa saindo do quadril)
 *  preencher: função que devolve o preenchimento de cada forma (ver `comSombra`)
 *  linhaSoSobre: { cor, esp, sobre: [d...] }: no desenho sem contorno, uma linha de separação que só aparece onde o
 *    grupo passa por cima de outra parte do corpo (o braço na frente do tronco)
 */
export function grupo(formas, { contorno = null, semLinhaSobre = null, linhaSoSobre = null, preencher = null } = {}) {
  let s = '';
  const traco = (cor, esp) => formas.map((f) => `<path d="${f.d}" fill="${cor}" stroke="${cor}" stroke-width="${r1(esp * 2)}" stroke-linejoin="round"/>`).join('');
  if (contorno) {
    if (semLinhaSobre?.length) {
      const id = novoId('fora');
      s += `<clipPath id="${id}"><path clip-rule="evenodd" d="M-999 -999H999V999H-999Z ${semLinhaSobre.join(' ')}"/></clipPath><g clip-path="url(#${id})">${traco(contorno.cor, contorno.esp)}</g>`;
    } else s += traco(contorno.cor, contorno.esp);
  } else if (linhaSoSobre) {
    const id = novoId('sobre');
    s += `<clipPath id="${id}">${linhaSoSobre.sobre.map((d) => `<path d="${d}"/>`).join('')}</clipPath><g clip-path="url(#${id})">${traco(linhaSoSobre.cor, linhaSoSobre.esp)}</g>`;
  }
  s += formas.map(preencher ?? ((f) => `<path d="${f.d}" fill="${f.cor}"/>`)).join('');
  return s;
}

/**
 * Sombra própria em dois tons ("volume"), para usar como `preencher` de um grupo: dentro da forma, a parte que sobra
 * quando a própria forma é empurrada na direção da luz fica no tom escuro (`f.sombra`). `luz` é o deslocamento em cm.
 */
export const comSombra = (luz) => (f) => {
  const id = novoId('vol');
  return `<clipPath id="${id}"><path d="${f.d}"/></clipPath><g clip-path="url(#${id})"><path d="${f.d}" fill="${f.sombra ?? f.cor}"/><path d="${f.d}" fill="${f.cor}" transform="translate(${luz[0]} ${luz[1]})"/></g>`;
};
