// Rodada 1: o quadro com os onze conceitos, cada um numa faixa, ao lado do boneco de hoje, e uma prancha maior por
// conceito. Poses: em pé de frente, o fundo do agachamento de lado com o halter, e a flexão embaixo. O músculo aparece
// no agachamento e na flexão. Tema claro e tema escuro; tamanho de palco e miniatura.
// Uso: node scripts/boneco-desenho/rodada1.mjs  → docs/revisoes/boneco-desenho/rodada-1/quadro.png e prancha-NN-*.png
import { build } from 'esbuild';
import { mkdirSync, readFileSync } from 'node:fs';
import { CONCEITOS, PAPEIS } from './conceitos.mjs';
import { figura, zerarFigura } from './figura.mjs';
import { fotografar, palco } from './foto.mjs';
import { POSES, pontos } from './poses.mjs';
import { zerarIds } from './tinta.mjs';

const SAIDA = 'docs/revisoes/boneco-desenho/rodada-1';
const empe = pontos(POSES.empe().esq, 'frontal'), agachado = pontos(POSES.agachamento().esq, 'lateral'), flexao = pontos(POSES.flexao().esq, 'lateral');
const HALTER = [[8.7, 52.1], [16.7, 84.2]];
const FUNDO = { claro: '#f7f9fa', escuro: '#10171b' }, CHAO = { claro: '#d5dce1', escuro: '#33414b' }, FERRO = { claro: '#27343f', escuro: '#cfd8de' };

/* ----- o boneco de hoje, tirado do motor do app (só leitura) ----- */
const css = readFileSync('src/styles.css', 'utf8');
const { outputFiles } = await build({ stdin: { contents: `export * from './src/engine/index.ts'; export { montarSvgEstilo } from './src/engine/estilo/index.ts';`, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false });
const hoje = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));
// o motor de hoje desenha em cm, com o chão em y = 0 e o y para baixo: a caixa enquadra o corpo como nas outras faixas
const svgHoje = (id, vista, modo, t, caixa) => {
  const ex = hoje.EX.find((e) => e.id === id), q = hoje.montarSvgEstilo(ex, vista, modo, t, 0, 300, 'a2', false, {});
  return `<svg class="${q.classe}" viewBox="${caixa}" preserveAspectRatio="xMidYMid meet">${q.html}</svg>`;
};
const ESCURO_HOJE = '--stage:#10171b;--fig:#e7eef2;--fig-far:#4f5e69;--torso:#5d6e7a;--joint:#2bb3a6;--eq:#2a353e;--eq-dark:#53626d;--cable:#a3b3bf;--ea-pele:#56656f;--ea-pele-longe:#2c3740;--ea-cont-longe:#4f5e69';
const HOJE = {
  empe: svgHoje('goblet', 'frontal', 'tec', 0.2, '-43 -188 86 196'), agach: svgHoje('goblet', 'lateral', 'tec', 3.1, '-45 -130 100 138'), agachMus: svgHoje('goblet', 'lateral', 'mus', 3.1, '-45 -130 100 138'), flexMus: svgHoje('flexao', 'lateral', 'mus', 2.6, '-146 -64 200 72'),
  agachMini: svgHoje('goblet', 'lateral', 'mus', 3.1, '-63 -128 136 136'),
};

/* ----- as células de um conceito ----- */
const sombraNoChao = (cx, rx) => `<ellipse cx="${cx}" cy="-0.6" rx="${rx}" ry="2.3" fill="#000" opacity="0.11"/>`;
/** Uma pose de um conceito num palco de `px` de largura. tipo: 'empe' | 'agach' | 'flex'; mus = mostra o músculo. */
function celula(c, tipo, { tema = 'claro', mus = false, px, mini = false } = {}) {
  const anilha = `<rect x="-15" y="0" width="22.8" height="2.4" rx="0.6" fill="${FERRO[tema]}"/>`;
  const op = { fundo: FUNDO[tema], chao: CHAO[tema], raio: mini ? 9 : 12 };
  if (tipo === 'empe') return palco((c.sombraNoChao ? sombraNoChao(0, 17) : '') + figura(empe, 'frente', c, { tema, papeis: mus ? PAPEIS.agachamento : null }), mini ? [-98, -8, 196, 196] : [-43, -8, 86, 196], px, op);
  if (tipo === 'agach') return palco((c.sombraNoChao ? sombraNoChao(4, 23) : '') + anilha + figura(agachado, 'lado', c, { tema, halter: HALTER, papeis: mus ? PAPEIS.agachamento : null }), mini ? [-68, -8, 136, 136] : [-52, -8, 100, 138], px, op);
  return palco((c.sombraNoChao ? sombraNoChao(75, 82) : '') + figura(flexao, 'lado', c, { tema, maoNoChao: true, papeis: mus ? PAPEIS.flexao : null }), mini ? [-16, -70, 200, 200] : [-16, -8, 200, 72], px, op);
}
const A = 236; // altura das células do palco, em px
const L = { empe: Math.round((A * 86) / 196), agach: Math.round((A * 100) / 138), flex: 330 };
function faixa(c, { tema = 'claro' } = {}) {
  return `<div class="bd-cel">${celula(c, 'empe', { tema, px: L.empe })}</div><div class="bd-cel">${celula(c, 'agach', { tema, px: L.agach })}</div><div class="bd-cel">${celula(c, 'agach', { tema, mus: true, px: L.agach })}</div><div class="bd-cel bd-meio">${celula(c, 'flex', { tema, mus: true, px: L.flex })}</div>`;
}
const minis = (c) => `<div class="bd-minis">${celula(c, 'agach', { mus: true, px: 96, mini: true })}${celula(c, 'agach', { tema: 'escuro', mus: true, px: 96, mini: true })}</div>`;
const hojeCel = (svg, w, h, escuro = false) => `<div class="bd-hoje${escuro ? ' bd-esc' : ''}" style="width:${w}px;height:${h}px;${escuro ? ESCURO_HOJE : ''}">${svg}</div>`;
const faixaHoje = () => `<div class="bd-cel">${hojeCel(HOJE.empe, L.empe, A)}</div><div class="bd-cel">${hojeCel(HOJE.agach, L.agach, A)}</div><div class="bd-cel">${hojeCel(HOJE.agachMus, L.agach, A)}</div><div class="bd-cel bd-meio">${hojeCel(HOJE.flexMus, L.flex, 119)}</div>`;
const minisHoje = () => `<div class="bd-minis">${hojeCel(HOJE.agachMini, 96, 96)}${hojeCel(HOJE.agachMini, 96, 96, true)}</div>`;

const ESTILO = `${css}
body{margin:0;padding:26px 28px 20px;background:#fff;color:#171b20;font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}.bd-sub{color:#5b6570;margin:0 0 16px;font-size:15.5px;max-width:1180px}
.bd-cab,.bd-lin{display:grid;grid-template-columns:232px ${L.empe}px ${L.agach}px ${L.agach}px ${L.flex}px ${L.agach}px 96px;column-gap:9px;align-items:center}
.bd-cab{font-size:13px;font-weight:700;border-bottom:2px solid #171b20;padding-bottom:6px;margin-bottom:8px;align-items:end}
.bd-lin{padding:7px 0;border-bottom:1px solid #e3e6e9}
.bd-rot b{display:block;font-size:17px;line-height:1.2;margin-bottom:4px}.bd-rot span{display:block;font-size:12.6px;line-height:1.32;color:#464b51;padding-right:8px}
.bd-cel.bd-meio{display:flex;align-items:center}.bd-minis{display:flex;flex-direction:column;gap:6px}
.bd-hoje{border-radius:12px;overflow:hidden;background:#f7f9fa;display:flex;align-items:center;justify-content:center}.bd-hoje.bd-esc{background:#10171b}
.bd-hoje svg{width:100%;height:100%;background:var(--stage)}.bd-hoje svg text,.bd-hoje svg .gd{display:none}
.bd-pe{font-size:13px;color:#5b6570;margin:12px 0 0;max-width:1180px}`;
const cabecalho = `<div class="bd-cab"><div></div><div>Em pé</div><div>Agachamento</div><div>Com o músculo</div><div>Flexão, com o músculo</div><div>Tema escuro</div><div>Miniatura</div></div>`;

mkdirSync(SAIDA, { recursive: true });
zerarIds();
zerarFigura();
const linhas = CONCEITOS.map((c) => `<div class="bd-lin"><div class="bd-rot"><b>${c.n} · ${c.nome}</b><span>${c.frase}</span></div>${faixa(c)}<div class="bd-cel">${celula(c, 'agach', { tema: 'escuro', mus: true, px: L.agach })}</div>${minis(c)}</div>`).join('');
const quadro = `<!doctype html><meta charset="utf-8"><style>${ESTILO}</style><h1>Rodada 1 · Onze jeitos de desenhar o Boneco</h1>
<p class="bd-sub">Cada faixa é um conceito, nas mesmas três poses: em pé, o fundo do agachamento com o halter e a flexão embaixo. Todos usam as mesmas medidas do corpo; muda só o desenho. A primeira faixa é o boneco que está no app hoje, para comparar. Não há nada marcado: a escolha é sua.</p>
${cabecalho}<div class="bd-lin"><div class="bd-rot"><b>Hoje</b><span>O boneco que está no app.</span></div>${faixaHoje()}<div class="bd-cel">${hojeCel(HOJE.agachMus, L.agach, A, true)}</div>${minisHoje()}</div>${linhas}
<p class="bd-pe">No músculo: cor cheia com divisões = principal; tom claro = também trabalha; listrado = só ajuda a firmar. Nos conceitos com roupa, a roupa fica clara quando o músculo aparece, e ele se vê por baixo dela. No conceito 5 não há forma de músculo: a parte do corpo que trabalha fica inteira colorida.</p>`;
await fotografar(quadro, `${SAIDA}/quadro.png`, { largura: 1440, escala: 2 });
console.log('quadro');

// uma prancha maior por conceito: o conceito nos dois temas, ao lado do boneco de hoje
for (const c of CONCEITOS) {
  zerarIds();
  zerarFigura();
  const html = `<!doctype html><meta charset="utf-8"><style>${ESTILO}
.bd-cab,.bd-lin{grid-template-columns:96px ${L.empe}px ${L.agach}px ${L.agach}px ${L.flex}px 96px}.bd-lin{border-bottom:0}.bd-rot b{font-size:14px}</style>
<h1>${c.n} · ${c.nome}</h1><p class="bd-sub">${c.frase}</p>
<div class="bd-cab"><div></div><div>Em pé</div><div>Agachamento</div><div>Com o músculo</div><div>Flexão, com o músculo</div><div>Miniatura</div></div>
<div class="bd-lin"><div class="bd-rot"><b>Hoje</b></div>${faixaHoje()}<div class="bd-minis">${hojeCel(HOJE.agachMini, 96, 96)}</div></div>
<div class="bd-lin"><div class="bd-rot"><b>Tema claro</b></div>${faixa(c)}<div class="bd-minis">${celula(c, 'agach', { mus: true, px: 96, mini: true })}${celula(c, 'flex', { mus: true, px: 96, mini: true })}</div></div>
<div class="bd-lin"><div class="bd-rot"><b>Tema escuro</b></div>${faixa(c, { tema: 'escuro' })}<div class="bd-minis">${celula(c, 'agach', { tema: 'escuro', mus: true, px: 96, mini: true })}${celula(c, 'flex', { tema: 'escuro', mus: true, px: 96, mini: true })}</div></div>`;
  await fotografar(html, `${SAIDA}/prancha-${String(c.n).padStart(2, '0')}-${c.id}.png`, { largura: 1160, escala: 2 });
  console.log(`prancha ${c.n}`);
}
