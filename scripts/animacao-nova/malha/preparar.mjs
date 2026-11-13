// Prepara a malha do corpo para o motor novo, a partir dos arquivos do MakeHuman (domínio público, CC0):
//   base.obj (malha hm08), default.mhskel (esqueleto) e default_weights.mhw (pesos de cada osso em cada ponto).
// Fonte: https://github.com/makehumancommunity/makehuman, pasta makehuman/data (3dobjs/ e rigs/). A licença CC0 está
// escrita no cabeçalho de cada arquivo e na seção C do LICENSE.md do repositório (lidos em 13/11/2026).
// Uso: node scripts/animacao-nova/malha/preparar.mjs <pasta com os três arquivos>
// Saída: src/engine/novo/dados/malha.json (pontos em cm, chão em y = 0; x = esquerda, y = cima, z = frente).
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const pasta = process.argv[2];
if (!pasta) throw new Error('informe a pasta com base.obj, default.mhskel e default_weights.mhw');
const ler = (n) => readFileSync(`${pasta}/${n}`);
const sha = (n) => createHash('sha256').update(ler(n)).digest('hex').slice(0, 16);

// ---------- malha ----------
const V = [];
const quads = [];
let grupo = '';
for (const linha of ler('base.obj').toString('utf8').split('\n')) {
  if (linha.startsWith('v ')) V.push(linha.split(/\s+/).slice(1, 4).map(Number));
  else if (linha.startsWith('g ')) grupo = linha.split(/\s+/)[1];
  else if (linha.startsWith('f ') && grupo === 'body') quads.push(linha.split(/\s+/).slice(1).filter(Boolean).map((p) => parseInt(p, 10) - 1));
}
const nCorpo = Math.max(...quads.flat()) + 1; // os pontos do corpo são os primeiros do arquivo
const chao = Math.min(...V.slice(0, nCorpo).map((v) => v[1]));
const cm = (v) => [v[0] * 10, (v[1] - chao) * 10, v[2] * 10];
const tri = [];
for (const q of quads) {
  tri.push(q[0], q[1], q[2]);
  if (q.length === 4) tri.push(q[0], q[2], q[3]);
}

// ---------- esqueleto: as articulações são a média de alguns pontos da malha ----------
const sk = JSON.parse(ler('default.mhskel').toString('utf8'));
const junta = (nome) => {
  const idx = sk.joints[nome];
  const s = [0, 0, 0];
  for (const i of idx) for (let k = 0; k < 3; k++) s[k] += V[i][k] / idx.length;
  return cm(s).map((x) => Math.round(x * 100) / 100);
};
const juntas = {};
for (const [nome, b] of Object.entries(sk.bones)) juntas[nome] = { de: junta(b.head), ate: junta(b.tail) };

// ---------- pesos: os 163 ossos do MakeHuman viram os segmentos do nosso esqueleto ----------
const SEGS = ['pelve', 'esp5', 'esp4', 'esp3', 'esp2', 'esp1', 'pesc1', 'pesc2', 'pesc3', 'cabeca'];
const DEDOS = [1, 2, 3, 4, 5].flatMap((i) => [1, 2, 3].map((j) => `f${i}${j}`));
for (const s of ['R', 'L']) SEGS.push(...['clav', 'escap', 'braco', 'ante1', 'ante2', 'mao', 'coxa', 'perna', 'pe', 'dedos', ...DEDOS].map((n) => n + s));
function segmentoDe(osso) {
  const lado = osso.endsWith('.L') ? 'L' : osso.endsWith('.R') ? 'R' : '';
  const b = osso.replace(/\.[LR]$/, '');
  if (b === 'root' || b === 'pelvis') return 'pelve';
  const esp = { spine05: 'esp5', spine04: 'esp4', spine03: 'esp3', spine02: 'esp2', spine01: 'esp1', neck01: 'pesc1', neck02: 'pesc2', neck03: 'pesc3', breast: 'esp2' }[b];
  if (esp) return esp;
  if (b === 'clavicle') return 'clav' + lado;
  if (b === 'shoulder01') return 'escap' + lado;
  if (b.startsWith('upperarm')) return 'braco' + lado;
  if (b === 'lowerarm01') return 'ante1' + lado;
  if (b === 'lowerarm02') return 'ante2' + lado;
  const dedo = /^finger(\d)-(\d)$/.exec(b);
  if (dedo) return `f${dedo[1]}${dedo[2]}${lado}`;
  if (b === 'wrist' || b.startsWith('metacarpal')) return 'mao' + lado;
  if (b.startsWith('upperleg')) return 'coxa' + lado;
  if (b.startsWith('lowerleg')) return 'perna' + lado;
  if (b === 'foot') return 'pe' + lado;
  if (b.startsWith('toe')) return 'dedos' + lado;
  return 'cabeca'; // cabeça, mandíbula, olhos e os ossos do rosto
}
const pesos = JSON.parse(ler('default_weights.mhw').toString('utf8')).weights;
const porPonto = Array.from({ length: nCorpo }, () => new Map());
for (const [osso, lista] of Object.entries(pesos)) {
  const s = SEGS.indexOf(segmentoDe(osso));
  if (s < 0) throw new Error(`osso sem segmento: ${osso}`);
  for (const [i, w] of lista) if (i < nCorpo) porPonto[i].set(s, (porPonto[i].get(s) ?? 0) + w);
}
const N_INF = 4;
const segIdx = new Uint8Array(nCorpo * N_INF),
  segPeso = new Uint8Array(nCorpo * N_INF);
let semPeso = 0;
porPonto.forEach((mapa, i) => {
  const ord = [...mapa.entries()].sort((a, b) => b[1] - a[1]).slice(0, N_INF);
  if (!ord.length) {
    semPeso++;
    ord.push([SEGS.indexOf('cabeca'), 1]);
  }
  const soma = ord.reduce((s, [, w]) => s + w, 0);
  let resto = 255;
  ord.forEach(([s, w], k) => {
    const q = k === ord.length - 1 ? resto : Math.round((w / soma) * 255);
    segIdx[i * N_INF + k] = s;
    segPeso[i * N_INF + k] = Math.max(0, Math.min(resto, q));
    resto -= segPeso[i * N_INF + k];
  });
});

// ---------- medidas da malha em repouso (para ajustar cada segmento à tabela do corpo) ----------
const P = V.slice(0, nCorpo).map(cm);
const dom = porPonto.map((mapa) => [...mapa.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 0);
const doTronco = new Set(['pelve', 'esp5', 'esp4', 'esp3', 'esp2', 'esp1'].map((n) => SEGS.indexOf(n)));
/** Largura (x) e profundidade (z) do tronco numa altura (cm), olhando só os pontos do tronco. */
const fatia = (y, segs = doTronco) => {
  const f = P.filter((p, i) => segs.has(dom[i]) && Math.abs(p[1] - y) < 1.2);
  const xs = f.map((p) => p[0]),
    zs = f.map((p) => p[2]);
  return { larg: Math.round((Math.max(...xs) - Math.min(...xs)) * 10) / 10, prof: Math.round((Math.max(...zs) - Math.min(...zs)) * 10) / 10 };
};
/** Raio médio de um membro (distância dos pontos ao eixo de–até) numa fração t do osso. */
const raio = (seg, de, ate, t) => {
  const s = SEGS.indexOf(seg);
  const u = ate.map((x, k) => x - de[k]),
    L = Math.hypot(...u),
    n = u.map((x) => x / L);
  const ds = [];
  P.forEach((p, i) => {
    if (dom[i] !== s) return;
    const d = p.map((x, k) => x - de[k]);
    const ao = d[0] * n[0] + d[1] * n[1] + d[2] * n[2];
    if (Math.abs(ao / L - t) < 0.06) ds.push(Math.hypot(d[0] - ao * n[0], d[1] - ao * n[1], d[2] - ao * n[2]));
  });
  return ds.length ? Math.round((ds.reduce((a, b) => a + b, 0) / ds.length) * 100) / 100 : 0;
};
const yQuadril = juntas['upperleg01.L'].de[1],
  yC7 = juntas.neck01.de[1];
const medidas = {
  quadrilAoC7: Math.round((yC7 - yQuadril) * 10) / 10,
  // frações da altura do quadril a C7 onde a tabela do corpo tem medida: nádega, cintura, peito
  nadega: fatia(yQuadril - 1.5, new Set(['pelve', 'coxaL', 'coxaR'].map((n) => SEGS.indexOf(n)))),
  cintura: fatia(yQuadril + (yC7 - yQuadril) * 0.26),
  peito: fatia(yQuadril + (yC7 - yQuadril) * 0.64),
  raioCoxa: raio('coxaL', juntas['upperleg01.L'].de, juntas['lowerleg01.L'].de, 0.2),
  raioCoxaBaixa: raio('coxaL', juntas['upperleg01.L'].de, juntas['lowerleg01.L'].de, 0.86),
  raioPanturrilha: raio('pernaL', juntas['lowerleg01.L'].de, juntas['foot.L'].de, 0.3),
  raioTornozelo: raio('pernaL', juntas['lowerleg01.L'].de, juntas['foot.L'].de, 0.9),
  raioBraco: raio('bracoL', juntas['upperarm01.L'].de, juntas['lowerarm01.L'].de, 0.5),
  raioAntebraco: raio('ante1L', juntas['lowerarm01.L'].de, juntas['wrist.L'].de, 0.25),
};

const pos = new Float32Array(nCorpo * 3);
for (let i = 0; i < nCorpo; i++) pos.set(cm(V[i]), i * 3);
const b64 = (a) => Buffer.from(a.buffer, a.byteOffset, a.byteLength).toString('base64');
const saida = {
  fonte: 'MakeHuman (makehumancommunity/makehuman, makehuman/data): 3dobjs/base.obj (malha hm08), rigs/default.mhskel e rigs/default_weights.mhw',
  licenca: 'CC0 1.0 (domínio público): declarada no cabeçalho dos arquivos e na seção C do LICENSE.md do repositório; lida em 13/11/2026',
  sha256: { 'base.obj': sha('base.obj'), 'default.mhskel': sha('default.mhskel'), 'default_weights.mhw': sha('default_weights.mhw') },
  pontos: nCorpo,
  triangulos: tri.length / 3,
  alturaCm: Math.round(Math.max(...V.slice(0, nCorpo).map((v) => (v[1] - chao) * 10)) * 10) / 10,
  segs: SEGS,
  influencias: N_INF,
  juntas,
  medidas,
  pos: b64(pos),
  tri: b64(new Uint16Array(tri)),
  segIdx: b64(segIdx),
  segPeso: b64(segPeso),
};
const arq = new URL('../../../src/engine/novo/dados/malha.json', import.meta.url);
writeFileSync(arq, JSON.stringify(saida));
console.log(JSON.stringify(medidas));
console.log(`malha: ${nCorpo} pontos, ${tri.length / 3} triângulos, altura ${saida.alturaCm} cm, ${semPeso} pontos sem peso; ${(JSON.stringify(saida).length / 1024).toFixed(0)} kB → ${arq.pathname}`);
