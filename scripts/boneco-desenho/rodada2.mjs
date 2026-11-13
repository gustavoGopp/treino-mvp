// Rodada 2: os cinco conceitos que sobraram da rodada 1, cada um com variações de detalhe. Em cada faixa, a primeira
// célula é a base e as outras mudam uma coisa só: a cabeça, a mão, o traço (ou a junta) e a cor. Cada célula mostra a
// figura em pé e no fundo do agachamento com o músculo.
// Uso: node scripts/boneco-desenho/rodada2.mjs  → docs/revisoes/boneco-desenho/rodada-2/quadro.png
import { mkdirSync } from 'node:fs';
import { CONCEITOS, PAPEIS } from './conceitos.mjs';
import { figura, zerarFigura } from './figura.mjs';
import { fotografar, palco } from './foto.mjs';
import { POSES, pontos } from './poses.mjs';
import { zerarIds } from './tinta.mjs';

const SAIDA = 'docs/revisoes/boneco-desenho/rodada-2';
const empe = pontos(POSES.empe().esq, 'frontal'), agachado = pontos(POSES.agachamento().esq, 'lateral');
const HALTER = [[8.7, 52.1], [16.7, 84.2]];
const FUNDO = { claro: '#f7f9fa', escuro: '#10171b' }, CHAO = { claro: '#d5dce1', escuro: '#33414b' }, FERRO = { claro: '#27343f', escuro: '#cfd8de' };
const C = (n) => CONCEITOS.find((c) => c.n === n);
const comCores = (c, extra) => ({ ...c, cores: (t, b) => ({ ...(c.cores ? c.cores(t, b) : {}), ...extra(t) }) });
const claro = (t) => t === 'claro';
// a cor do app na roupa
const roupaDoApp = (t) => (claro(t) ? { roupa: '#3f3aa8', roupaSombra: '#302c86', short: '#1f2433', shortSombra: '#161a26' } : { roupa: '#8f97f0', roupaSombra: '#747cd6', short: '#c9cfe0', shortSombra: '#aab1c4' });

/** As variações de cada conceito: [letra, o que muda, ficha]. A é sempre a base. */
const VARIACOES = {
  1: [
    ['A', 'Base', C(1)],
    ['B', 'Cabeça: com cabelo', comCores({ ...C(1), cabelo: true }, (t) => ({ cabelo: claro(t) ? '#4b5a67' : '#c3ced6' }))],
    ['C', 'Mão: com polegar e dedos', { ...C(1), mao: 'polegar' }],
    ['D', 'Traço: fino', { ...C(1), contorno: 0.6 }],
    ['E', 'Cor: cinza quente, de short e tênis', comCores({ ...C(1), roupa: 'short', descalco: false, musculo: 'veu' }, (t) => (claro(t) ? { pele: '#ddd6cd', peleSombra: '#c2b9ae', contorno: '#2a2622', short: '#7d756c', calcado: '#3d3832' } : { pele: '#6f6860', peleSombra: '#57514a', contorno: '#f1eee9', short: '#3a3530', calcado: '#e3ddd5' }))],
  ],
  2: [
    ['A', 'Base', C(2)],
    ['B', 'Cabeça: de boné', { ...C(2), bone: true }],
    ['C', 'Mão: com polegar e dedos', { ...C(2), mao: 'polegar' }],
    ['D', 'Traço: contorno suave, na cor de cada parte', { ...C(2), contorno: 0.55, contornoNaCor: true, folga: 0 }],
    ['E', 'Cor: roupa na cor do app e outro tom de pele', comCores({ ...C(2), tom: 'morena' }, roupaDoApp)],
  ],
  3: [
    ['A', 'Base', C(3)],
    ['B', 'Cabeça: de boné', { ...C(3), bone: true }],
    ['C', 'Mão: com polegar e dedos', { ...C(3), mao: 'polegar' }],
    ['D', 'Traço: grosso', { ...C(3), contorno: 1.15 }],
    ['E', 'Cor: roupa na cor do app e outro tom de pele', comCores({ ...C(3), tom: 'morena' }, roupaDoApp)],
  ],
  6: [
    ['A', 'Base', C(6)],
    ['B', 'Cabeça: de boné', { ...C(6), bone: true }],
    ['C', 'Mão: com polegar e dedos', { ...C(6), mao: 'polegar' }],
    ['D', 'Junta: sem o pino, só as peças', { ...C(6), juntas: null }],
    ['E', 'Cor: roupa na cor do app e outro tom de pele', comCores({ ...C(6), tom: 'morena' }, roupaDoApp)],
  ],
  10: [
    ['A', 'Base', C(10)],
    ['B', 'Cabeça: de boné', { ...C(10), bone: true }],
    ['C', 'Mão: com polegar e dedos', { ...C(10), mao: 'polegar' }],
    ['D', 'Traço: contorno suave, na cor de cada parte', { ...C(10), contorno: 0.55, contornoNaCor: true, folga: 0 }],
    ['E', 'Cor: short na cor do app e outro tom de pele', comCores({ ...C(10), tom: 'morena' }, (t) => (claro(t) ? { short: '#3f3aa8', shortSombra: '#302c86' } : { short: '#8f97f0', shortSombra: '#747cd6' }))],
  ],
};

function celula(c, tema = 'claro') {
  const anilha = `<rect x="-15" y="0" width="22.8" height="2.4" rx="0.6" fill="${FERRO[tema]}"/>`;
  const emPe = `<g transform="translate(-48 0)">${figura(empe, 'frente', c, { tema })}</g>`;
  const agacha = `<g transform="translate(46 0)">${anilha}${figura(agachado, 'lado', c, { tema, halter: HALTER, papeis: PAPEIS.agachamento })}</g>`;
  return palco(emPe + agacha, [-88, -8, 180, 196], 236, { fundo: FUNDO[tema], chao: CHAO[tema], raio: 12 });
}

mkdirSync(SAIDA, { recursive: true });
zerarIds();
zerarFigura();
const ordem = [1, 2, 3, 6, 10];
const linhas = ordem.map((n) => {
  const c = C(n);
  const celulas = VARIACOES[n].map(([letra, muda, ficha]) => `<div class="cel"><div class="tit"><b>${n}${letra}</b> ${muda}</div>${celula(ficha)}</div>`).join('');
  return `<section><h2>${n} · ${c.nome}</h2><div class="lin">${celulas}<div class="cel"><div class="tit"><b>${n}A</b> no tema escuro</div>${celula(VARIACOES[n][0][2], 'escuro')}</div></div></section>`;
}).join('');
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:26px 28px 20px;background:#fff;color:#171b20;font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}.sub{color:#5b6570;margin:0 0 14px;font-size:15.5px;max-width:1300px}
section{border-top:1px solid #e3e6e9;padding:10px 0 12px}h2{font-size:19px;margin:0 0 8px}
.lin{display:flex;gap:10px}.cel{width:236px}.tit{font-size:12.6px;line-height:1.3;color:#464b51;min-height:34px;margin-bottom:4px}.tit b{color:#171b20;font-size:14px;margin-right:3px}
.pe{font-size:13px;color:#5b6570;margin:10px 0 0;max-width:1300px}
</style><h1>Rodada 2 · Os cinco que ficaram, com variações de detalhe</h1>
<p class="sub">Em cada faixa, a primeira figura (A) é a base da rodada 1. As outras mudam uma coisa só: a cabeça (B), a mão (C), o traço ou a junta (D) e a cor (E). Cada célula mostra a figura em pé e no fundo do agachamento, com o músculo. As variações podem ser combinadas: se gostar de duas, diga as duas letras.</p>
${linhas}
<p class="pe">O "outro tom de pele" da coluna E é só um exemplo: a ideia é a pessoa poder escolher o tom em "Meus dados". Nada está marcado: a escolha é sua.</p>`;
await fotografar(html, `${SAIDA}/quadro.png`, { largura: 1540, escala: 2 });
console.log('quadro da rodada 2');
