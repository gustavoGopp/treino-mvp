// Pranchas das perguntas de gosto da etapa 0: o boneco de prova com uma chave trocada de cada vez, para o Gustavo
// escolher olhando. Cada prancha mostra as opções uma embaixo da outra (boa de ver no celular), com a figura em pé de
// frente, o fundo do agachamento de lado com o halter, e a miniatura.
// Uso: node scripts/boneco-desenho/pares.mjs ['{"contorno":false,...}']  → docs/revisoes/boneco-desenho/gosto/par-N-*.png
// O JSON opcional é a base (o que já foi escolhido nas perguntas anteriores) e vale para as pranchas seguintes.
import { mkdirSync } from 'node:fs';
import { deFrente, deLado, paleta } from './boneco-prova.mjs';
import { fotografar, palco } from './foto.mjs';
import { POSES, pontos } from './poses.mjs';
import { zerarIds } from './tinta.mjs';

const BASE = { contorno: true, cabeca: 'cabelo', roupa: true, volume: false, proporcao: 'real', cor: 'cinza', tema: 'claro', ...JSON.parse(process.argv[2] ?? '{}') };
const so = process.argv[3] ? process.argv[3].split(',') : null;
const empe = pontos(POSES.empe().esq, 'frontal');
const agachado = pontos(POSES.agachamento().esq, 'lateral');
// o halter do goblet e a anilha sob os calcanhares, lidos da cena da sessão da animação nova (cm, de lado)
const HALTER = [[8.7, 52.1], [16.7, 84.2]];
const anilha = (C) => `<rect x="-15" y="0" width="22.8" height="2.4" rx="0.6" fill="${C.ferro}"/>`;

/** As duas poses lado a lado num palco só, e a miniatura do agachamento. */
function cena(o, extra = '') {
  const C = paleta(o);
  const emPe = `<g transform="translate(-62 0)">${deFrente(empe, { ...o, musculo: o.musculo ? 'frente' : null })}</g>`;
  const agacha = `<g transform="translate(52 0)">${anilha(C)}${deLado(agachado, { ...o, halter: HALTER })}</g>`;
  const grande = palco(emPe + agacha + extra, [-112, -10, 232, 200], 640, { fundo: C.fundo, chao: C.chao, raio: 14 });
  const mini = palco(`<g transform="translate(0 0)">${anilha(C)}${deLado(agachado, { ...o, halter: HALTER })}</g>`, [-68, -8, 136, 136], 96, { fundo: C.fundo, chao: C.chao, raio: 10 });
  return { grande, mini };
}
/** O mapa de músculos ao lado: o corpo parado, de frente e de costas, com o músculo pintado. */
function mapa(o) {
  const liso = o.mapa === 'atlas' ? { ...o, roupa: false, volume: false, cor: 'cinza', estiloMusculo: 'atlas' } : { ...o, roupa: false, cabeca: 'lisa', volume: false };
  const frente = `<g transform="translate(-30 0)">${deFrente(empe, { ...liso, musculo: 'frente' })}</g>`;
  const costas = `<g transform="translate(30 0)">${deFrente(empe, { ...liso, musculo: 'costas' })}</g>`;
  return palco(frente + costas, [-62, -8, 124, 196], 150, { fundo: 'none', raio: 0 });
}

const PARES = [
  { n: 1, slug: 'contorno', titulo: 'Com contorno ou sem contorno?', opcoes: [['A · com contorno', 'Uma linha escura em volta do corpo.', { contorno: true }], ['B · sem contorno', 'Só as formas preenchidas; uma folga clara separa o braço do corpo.', { contorno: false }]] },
  { n: 2, slug: 'cabeca', titulo: 'Cabeça lisa, com cabelo ou com rosto?', opcoes: [['A · cabeça lisa', 'Sem cabelo e sem rosto, como um manequim.', { cabeca: 'lisa' }], ['B · só o cabelo', 'O cabelo mostra para onde a pessoa olha; sem rosto.', { cabeca: 'cabelo' }], ['C · cabelo e rosto', 'Olhos, nariz e orelha bem simples.', { cabeca: 'rosto' }]] },
  { n: 3, slug: 'roupa', titulo: 'Com roupa ou sem roupa?', opcoes: [['A · com roupa', 'Regata, short e tênis em blocos de cor.', { roupa: true }], ['B · sem roupa', 'O corpo liso, de uma cor só, como um manequim.', { roupa: false }]] },
  { n: 4, slug: 'volume', titulo: 'Chapado ou com volume?', opcoes: [['A · chapado', 'Cada parte de uma cor só.', { volume: false }], ['B · com volume', 'Uma sombra leve em dois tons dá corpo às formas.', { volume: true }]] },
  { n: 5, slug: 'proporcao', titulo: 'Proporção real ou levemente estilizada?', opcoes: [['A · proporção real', 'As medidas de uma pessoa (cerca de 7,7 cabeças de altura).', { proporcao: 'real' }], ['B · levemente estilizada', 'Cabeça um pouco maior e membros mais cheios (cerca de 6,3 cabeças).', { proporcao: 'estilizada' }]] },
  { n: 6, slug: 'cor', titulo: 'Cinza neutro, cor de pele ou a cor do app?', opcoes: [['A · cinza neutro', 'Como hoje: não é a pele de ninguém.', { cor: 'cinza' }], ['B · cor de pele', 'Uma pessoa. Obriga a escolher um tom de pele (aqui, um tom médio).', { cor: 'pele' }], ['C · cor do app', 'O roxo-azulado dos botões: o boneco vira parte da marca.', { cor: 'marca' }]] },
  { n: 7, slug: 'traco', titulo: 'E se fosse um desenho de linha: traço fino ou traço grosso?', opcoes: [['A · traço fino', 'Só a linha, delicada, de desenho técnico; a roupa em blocos.', { cor: 'linha', contorno: true, esp: 0.6 }], ['B · traço grosso', 'Só a linha, firme, que aguenta o tamanho pequeno.', { cor: 'linha', contorno: true, esp: 1.5 }], ['C · fico com as formas preenchidas', 'O que você escolheu na pergunta 1, para comparar.', {}]] },
  { n: 8, slug: 'musculo', titulo: 'O músculo pintado no corpo ou num mapa ao lado?', opcoes: [['A · no próprio corpo', 'O músculo que trabalha aparece na figura que se mexe, por cima da roupa, como num diagrama.', { musculo: 'corpo' }], ['B · num mapa ao lado', 'A figura fica limpa; um corpo parado, de frente e de costas, mostra o músculo.', { musculo: null, mapa: true }]] },
  // pergunta extra, depois de o Gustavo dizer que a marcação do músculo não agradou (pouco definida, ou cor demais)
  { n: '8b', slug: 'musculo-forma', de: '8b', titulo: 'A marcação do músculo: três jeitos de consertar', sub: 'Nos três, o músculo ganhou forma de músculo, com borda e divisões. O que muda de um para o outro é quanta cor há em volta.', opcoes: [['A · forma definida, mesmas cores', 'Só o desenho do músculo mudou: a pessoa continua com a pele e a roupa coloridas.', { musculo: 'corpo', definido: true }], ['B · forma definida e roupa em cinza', 'A roupa fica calma; a cor viva sobra para o músculo.', { musculo: 'corpo', definido: true, roupaCalma: true }], ['C · forma definida e corpo todo neutro', 'Quando o músculo aparece, a figura inteira fica cinza: só o músculo tem cor.', { musculo: 'corpo', definido: true, cor: 'cinza' }]] },
  // segunda tentativa: maneiras diferentes de mostrar o músculo (e não variações da mesma)
  { n: '8c', slug: 'musculo-maneiras', de: '8c', titulo: 'Quatro maneiras diferentes de mostrar o músculo', sub: 'No agachamento: a frente da coxa é o músculo principal; o glúteo e a parte de dentro da coxa trabalham junto. Em todas, o músculo ganhou tons mais suaves e nunca fica por cima da roupa.', opcoes: [
    ['A · atlas leve', 'Quando o músculo aparece, a roupa some e o corpo mostra todos os grupos musculares de leve; os que trabalham ficam acesos.', { musculo: 'corpo', estiloMusculo: 'atlas', roupa: false, tenis: true }],
    ['B · tom sobre tom', 'A roupa some, e só os músculos que trabalham aparecem, num tom mais quente da própria pele, sem borda e sem linhas.', { musculo: 'corpo', estiloMusculo: 'tom', roupa: false, tenis: true }],
    ['C · por baixo da roupa', 'A pessoa continua vestida, mas a roupa fica clara e o músculo aparece por baixo dela.', { musculo: 'corpo', estiloMusculo: 'suave', roupa: 'veu' }],
    ['D · mapa ao lado', 'A figura fica limpa e vestida; o músculo aparece num corpo parado, de frente e de costas.', { musculo: null, mapa: 'atlas' }],
  ] },
];

mkdirSync('docs/revisoes/boneco-desenho/gosto', { recursive: true });
for (const par of PARES) {
  if (so && !so.includes(String(par.n))) continue;
  zerarIds();
  const cartoes = par.opcoes.map(([nome, frase, chave]) => {
    const o = { ...BASE, ...chave };
    const { grande, mini } = cena(o);
    const lado = o.mapa ? `<div class="mapa">${mapa(o)}<span>mapa de músculos</span></div>` : '';
    return `<section><h2>${nome}</h2><p>${frase}</p><div class="linha">${grande}<div class="col">${lado}<div class="mini">${mini}<span>miniatura</span></div></div></div></section>`;
  }).join('');
  const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:28px 30px 22px;background:#fff;color:#171b20;font:17px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif;width:840px}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}.sub{color:#5b6570;margin:0 0 18px;font-size:15px}
section{margin:0 0 20px}h2{font-size:21px;margin:0 0 2px}section p{margin:0 0 9px;color:#464b51;font-size:16px}
.linha{display:flex;gap:16px;align-items:flex-end}.col{display:flex;flex-direction:column;gap:14px;align-items:flex-start}
.mini span,.mapa span{display:block;font-size:13px;color:#5b6570;margin-top:5px}
.mapa{background:#f7f9fa;border-radius:10px;padding:6px 6px 8px}.mapa span{text-align:center}
.pe{font-size:13.5px;color:#5b6570;margin:0;border-top:1px solid #e3e6e9;padding-top:10px}
</style><h1>${par.de ?? `${par.n} de 8`} · ${par.titulo}</h1><p class="sub">${par.sub ?? 'Pergunta de gosto. O desenho é o mesmo nas opções; muda só uma coisa.'}</p>${cartoes}<p class="pe">Isto ainda não é proposta de boneco: é um desenho de prova, só para eu entender o seu gosto num ponto de cada vez.</p>`;
  await fotografar(html, `docs/revisoes/boneco-desenho/gosto/par-${par.n}-${par.slug}.png`, { largura: 900, escala: 2 });
  console.log(`par ${par.n} (${par.slug})`);
}
