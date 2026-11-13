// Rodada 3: os dois finalistas nas poses difíceis, lado a lado num quadro só. Em pé de frente, de lado e de costas;
// braços acima da cabeça; agachamento; flexão; deitado no banco (supino); ajoelhado puxando um cabo; a mão segurando o
// halter e o pé apoiado, em tamanho grande; tema escuro e miniatura.
// Uso: node scripts/boneco-desenho/rodada3.mjs  → docs/revisoes/boneco-desenho/rodada-3/quadro.png
import { mkdirSync } from 'node:fs';
import { CONCEITOS, PAPEIS } from './conceitos.mjs';
import { maoNoHalter, peApoiado } from './detalhes.mjs';
import { figura, zerarFigura } from './figura.mjs';
import { fotografar, palco } from './foto.mjs';
import { POSES, corpoPadrao as corpo, motor as m, pontos } from './poses.mjs';
import { zerarIds } from './tinta.mjs';

const SAIDA = 'docs/revisoes/boneco-desenho/rodada-3';
const C = (n) => CONCEITOS.find((c) => c.n === n);
/** Os finalistas, com as variações escolhidas na rodada 2: D (traço) e C (mão com polegar e dedos). */
export const FINALISTAS = [
  { ...C(1), contorno: 0.6, mao: 'polegar', rotulo: '1 · Hoje, com corpo de gente', sub: 'Cinza, traço fino, sem roupa; o músculo aparece só quando trabalha.' },
  { ...C(10), contorno: 0.55, contornoNaCor: true, folga: 0, mao: 'polegar', rotulo: '10 · Atlas', sub: 'Cor de pele, contorno suave, de short; todos os grupos musculares sempre desenhados.' },
];
const ATLAS_SEM_CONTORNO = { ...C(10), mao: 'polegar' };

/* ----- as poses ----- */
const braco = (sx) => ({ pegada: [sx * 21, 207, 2], polo: [sx * 1, 0, 0.25], mao: { polegar: [-sx, 0, 0], forma: 'pegada' } });
const alto = m.resolver(corpo, { ...m.poseEmPe(corpo), braco: { R: braco(-1), L: braco(1) } });
const P = {
  frente: pontos(POSES.empe().esq, 'frontal'), lado: pontos(POSES.empe().esq, 'lateral'), alto: pontos(alto, 'frontal'),
  agach: pontos(POSES.agachamento().esq, 'lateral'), flex: pontos(POSES.flexao().esq, 'lateral'),
  supino: pontos(m.supinoReto.quadro(corpo, 1).esq, 'lateral'), puxada: pontos(m.puxadaUnilateral.quadro(corpo, 1).esq, 'lateral'),
};
const HALTER = [[8.7, 52.1], [16.7, 84.2]];
const PAPEL = { ...PAPEIS, supino: { peitoral: 'p', triceps: 's', deltoide: 's' }, puxada: { dorsal: 'p', biceps: 's', deltoide: 's', trapezio: 's' } };
const FUNDO = { claro: '#f7f9fa', escuro: '#10171b' }, CHAO = { claro: '#d5dce1', escuro: '#33414b' }, FERRO = { claro: '#27343f', escuro: '#cfd8de' }, PECA = { claro: ['#7f8b96', '#aab4bc'], escuro: ['#56656f', '#3d4b55'] };

/* ----- as peças de cena (medidas lidas das cenas da sessão da animação nova) ----- */
const anilha = (t) => `<rect x="-15" y="0" width="22.8" height="2.4" rx="0.6" fill="${FERRO[t]}"/>`;
const banco = (t) => `<rect x="-76" y="37.1" width="122" height="6.4" rx="2" fill="${PECA[t][0]}"/><g fill="${PECA[t][1]}"><rect x="-70" y="32.2" width="110" height="5"/><rect x="-62.5" y="0" width="5" height="34.6"/><rect x="27.5" y="0" width="5" height="34.6"/></g>`;
const tapete = (t) => `<rect x="-72" y="0" width="100" height="1.6" rx="0.8" fill="${PECA[t][1]}"/>`;
const discos = (K) => `<circle cx="-11" cy="76.7" r="6.9" fill="${K.ferro}"/><circle cx="-1.5" cy="76.7" r="6.9" fill="${K.ferro}"/>`;
const cabo = (K) => `<path d="M10 110.5L40.9 195.3" stroke="${K.ferro}" stroke-width="0.9"/><path d="M-1.7 99.2L10 110.5L9.6 94.3" fill="none" stroke="${K.ferro}" stroke-width="1.1" stroke-linejoin="round"/><path d="M-1.7 99.2L9.6 94.3" stroke="${K.aco}" stroke-width="3.2" stroke-linecap="round"/>`;

const ESC = 1.62; // px por cm no palco
const CAIXA = { empe: [-43, -8, 86, 196], alto: [-45, -8, 90, 234], agach: [-52, -8, 100, 138], flex: [-16, -8, 200, 72], supino: [-84, -8, 180, 104], puxada: [-72, -8, 132, 180] };
/** Uma pose de um finalista. tipo: frente | lado | costas | alto | agach | flex | supino | puxada. */
function pose(c, tipo, { tema = 'claro', mus = true, px = null, mini = false } = {}) {
  const t = tema, base = { tema };
  let svg, caixa;
  if (tipo === 'frente') [svg, caixa] = [figura(P.frente, 'frente', c, base), CAIXA.empe];
  else if (tipo === 'lado') [svg, caixa] = [figura(P.lado, 'lado', c, base), CAIXA.empe];
  else if (tipo === 'costas') [svg, caixa] = [figura(P.frente, 'costas', c, { ...base, papeis: mus ? PAPEL.puxada : null }), CAIXA.empe];
  else if (tipo === 'alto') [svg, caixa] = [figura(P.alto, 'frente', c, { ...base, halteresDeFrente: true }), CAIXA.alto];
  else if (tipo === 'agach') [svg, caixa] = [anilha(t) + figura(P.agach, 'lado', c, { ...base, halter: HALTER, papeis: mus ? PAPEL.agachamento : null }), mini ? [-68, -8, 136, 136] : CAIXA.agach];
  else if (tipo === 'flex') [svg, caixa] = [figura(P.flex, 'lado', c, { ...base, maoNoChao: true, papeis: mus ? PAPEL.flexao : null }), mini ? [-16, -70, 200, 200] : CAIXA.flex];
  else if (tipo === 'supino') [svg, caixa] = [banco(t) + figura(P.supino, 'lado', c, { ...base, pegada: true, papeis: mus ? PAPEL.supino : null, atrasDoBraco: discos }), mini ? [-84, -44, 180, 180] : CAIXA.supino];
  else [svg, caixa] = [tapete(t) + figura(P.puxada, 'lado', c, { ...base, pegada: true, papeis: mus ? PAPEL.puxada : null, atrasDoBraco: cabo }), CAIXA.puxada];
  return palco(svg, caixa, px ?? Math.round(caixa[2] * ESC), { fundo: FUNDO[t], chao: CHAO[t], raio: mini ? 9 : 12 });
}
/** O estilo do finalista para os desenhos grandes da mão e do pé. */
function estiloGrande(c) {
  const cinza = c.n === 1;
  return cinza
    ? { pele: '#d5dde3', contorno: { cor: '#1d2a36', esp: c.contorno }, ferro: '#27343f', aco: '#8a98a3', fundo: FUNDO.claro, descalco: true }
    : { pele: '#d9a47c', contorno: c.contorno ? { cor: 'propria', esp: c.contorno } : null, ferro: '#27343f', aco: '#8a98a3', fundo: FUNDO.claro, calcado: '#27343f', sola: '#8a98a3' };
}
const cel = (titulo, svg) => `<div class="cel"><div class="tit">${titulo}</div>${svg}</div>`;

function coluna(c, i) {
  const e = estiloGrande(c);
  const grande = (svg, caixa, chao) => palco(svg, caixa, 200, { fundo: FUNDO.claro, chao: chao ? CHAO.claro : null, raio: 12 });
  const extra = i === 1 ? cel('Sem o contorno suave (para comparar)', pose(ATLAS_SEM_CONTORNO, 'agach')) : '';
  return `<section><h2>${c.rotulo}</h2><p class="sub2">${c.sub}</p>
<div class="lin">${cel('Em pé, de frente', pose(c, 'frente'))}${cel('De lado', pose(c, 'lado'))}${cel('De costas, com o músculo', pose(c, 'costas'))}${cel('Braços acima da cabeça', pose(c, 'alto'))}</div>
<div class="lin">${cel('Agachamento, com o músculo', pose(c, 'agach'))}${cel('Flexão, com o músculo', pose(c, 'flex'))}</div>
<div class="lin">${cel('Deitado no banco (supino), com o músculo', pose(c, 'supino'))}${cel('Ajoelhado, puxando o cabo', pose(c, 'puxada'))}</div>
<div class="lin">${cel('A mão segurando o halter', grande(maoNoHalter(e), [-20, -10, 40, 40], false))}${cel('O pé apoiado', grande(peApoiado(e), [-11, -4, 40, 40], true))}${extra}</div>
<div class="lin">${cel('Tema escuro', pose(c, 'agach', { tema: 'escuro' }))}${cel('&nbsp;', pose(c, 'supino', { tema: 'escuro' }))}</div>
<div class="lin">${cel('Miniaturas (96 px)', `<div class="minis">${pose(c, 'agach', { px: 96, mini: true })}${pose(c, 'flex', { px: 96, mini: true })}${pose(c, 'supino', { px: 96, mini: true })}${pose(c, 'agach', { px: 96, mini: true, tema: 'escuro' })}${pose(c, 'supino', { px: 96, mini: true, tema: 'escuro' })}</div>`)}</div>
</section>`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(SAIDA, { recursive: true });
  zerarIds();
  zerarFigura();
  const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:26px 28px 20px;background:#fff;color:#171b20;font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}.sub{color:#5b6570;margin:0 0 14px;font-size:15.5px;max-width:1280px}
.duas{display:grid;grid-template-columns:1fr 1fr;column-gap:36px}section{border-top:2px solid #171b20;padding-top:10px}
h2{font-size:21px;margin:0 0 2px}.sub2{color:#464b51;font-size:13.5px;margin:0 0 10px;min-height:38px}
.lin{display:flex;gap:9px;align-items:flex-end;margin-bottom:12px;flex-wrap:wrap}.tit{font-size:12.2px;color:#464b51;margin-bottom:4px;line-height:1.25}
.minis{display:flex;gap:7px}.pe{font-size:13px;color:#5b6570;margin:8px 0 0;max-width:1280px}
</style><h1>Rodada 3 · Os dois finalistas nas poses difíceis</h1>
<p class="sub">Os dois usam o mesmo corpo, com as medidas reais, o traço fino e a mão com polegar e dedos que você escolheu. Muda o resto: cinza sem roupa, com o músculo aparecendo só quando trabalha (à esquerda), ou cor de pele, de short, com todos os grupos musculares sempre desenhados (à direita). Nada está marcado: a escolha é sua.</p>
<div class="duas">${FINALISTAS.map(coluna).join('')}</div>
<p class="pe">No músculo: cor cheia = principal; tom claro (ou laranja, no cinza) = também trabalha; listrado = só ajuda a firmar. No supino e no cabo, o membro do lado de longe aparece num tom próprio. O banco, o cabo e o tapete são peças simples, só para situar a pose.</p>`;
  await fotografar(html, `${SAIDA}/quadro.png`, { largura: 1420, escala: 2 });
  console.log('quadro da rodada 3');
}
