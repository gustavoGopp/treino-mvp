// Gera a tabela do corpo do motor novo (src/engine/novo/dados/corpo-<id>.json) a partir das médias do ANSUR II.
// Uso: node scripts/animacao-nova/gerar-corpo.mjs [homem|mulher] [imcNormal|todos]
// Cada linha da tabela sai com o tipo: "medida" (lida na fonte), "derivada" (conta feita aqui, com a fórmula escrita)
// ou "provisoria" (ainda sem fonte lida: escolha de desenho a conferir na etapa 2; a conferência lista todas).
import { readFileSync, writeFileSync } from 'node:fs';

const sexo = process.argv[2] ?? 'homem';
const recorte = process.argv[3] ?? 'imcNormal';
const ansur = JSON.parse(readFileSync(new URL('./dados/ansur2-medias.json', import.meta.url), 'utf8'));
const A = ansur[recorte][sexo];
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

const medidas = {};
/** Medida lida no ANSUR II (coluna do CSV). */
const m = (id, coluna, nota = '') => (medidas[id] = { v: A[coluna], un: 'cm', tipo: 'medida', fonte: 'ansur2', onde: `coluna ${coluna}`, ...(nota && { nota }) }).v;
/** Medida derivada: conta feita com outras linhas (a fórmula vai escrita). */
const d = (id, valor, formula, fonte = 'ansur2', un = 'cm') => (medidas[id] = { v: un === 'cm' ? r2(valor) : valor, un, tipo: 'derivada', fonte, onde: formula }).v;
/** Medida de outra fonte lida (artigo, livro). */
const f = (id, valor, un, fonte, onde, nota = '') => (medidas[id] = { v: valor, un, tipo: 'medida', fonte, onde, ...(nota && { nota }) }).v;
/** Provisória: ainda sem fonte lida; entra na lista "a conferir" da conferência. */
const p = (id, valor, un, porque) => (medidas[id] = { v: valor, un, tipo: 'provisoria', fonte: 'a-conferir', onde: porque }).v;

// ---------- alturas em pé ----------
const H = m('estatura', 'stature');
const yMaleolo = m('altura.maleolo', 'lateralmalleolusheight', 'altura do eixo do tornozelo (Dempster, via NASA RP-1024: nível da ponta do maléolo lateral)');
const yJoelho = m('altura.joelho', 'lateralfemoralepicondyleheight', 'altura do eixo do joelho (passa pelos epicôndilos)');
const yTroc = m('altura.trocanter', 'trochanterionheight', 'altura do centro do quadril (Dempster, via NASA RP-1024: nível da ponta do trocânter maior)');
const yCrista = m('altura.cristaIliaca', 'iliocristaleheight');
const yCintura = m('altura.cintura', 'waistheightomphalion');
const yCostela10 = m('altura.costela10', 'tenthribheight');
const yPeito = m('altura.peito', 'chestheight');
const yAxila = m('altura.axila', 'axillaheight');
m('altura.supraesternal', 'suprasternaleheight');
const yAcromio = m('altura.acromio', 'acromialheight');
const yC7 = m('altura.cervical', 'cervicaleheight', 'ponta do processo espinhoso de C7, na pele');
const yVirilha = m('altura.virilha', 'crotchheight');
const yNadega = m('altura.nadega', 'buttockheight');
m('altura.punho', 'wristheight');
const tragion = m('cabeca.tragionAoTopo', 'tragiontopofhead');

// ---------- membros ----------
d('perna.comp', yJoelho - yMaleolo, 'altura.joelho − altura.maleolo');
d('coxa.comp', yTroc - yJoelho, 'altura.trocanter − altura.joelho');
const acrRad = m('braco.acromioRadial', 'acromionradialelength');
f('braco.comp', sexo === 'homem' ? 30.5 : 27.8, 'cm', 'nasa-rp1024', 'cap. IV, tabela 4: elo do braço, percentil 50', 'do centro do ombro ao centro do cotovelo; população projetada, não o mesmo recorte do ANSUR');
d('ombro.centroAbaixoDoAcromio', acrRad + 0.8 - medidas['braco.comp'].v, 'braco.acromioRadial + 0,8 (eixo do cotovelo 8 mm acima do radial: Dempster via NASA RP-1024) − braco.comp', 'ansur2+nasa-rp1024');
m('antebraco.comp', 'radialestylionlength', 'do radial ao estiloide: usado como distância do eixo do cotovelo ao centro do punho');
m('mao.comp', 'handlength');
m('mao.palma', 'palmlength');
m('mao.largura', 'handbreadth');
d('mao.punhoAoCentroDaPegada', A.forearmcenterofgriplength - A.radialestylionlength - 1.0, 'forearmcenterofgriplength − radialestylionlength − 1,0 (recuo do olécrano atrás do eixo: provisório)');
const peComp = m('pe.comp', 'footlength');
m('pe.calcanharABola', 'balloffootlength', 'do calcanhar às cabeças dos metatarsos: onde o pé dobra');
m('pe.largura', 'footbreadthhorizontal');
m('pe.larguraCalcanhar', 'heelbreadth');
p('pe.calcanharAoTornozelo', r1(peComp * 0.25), 'cm', 'posição do tornozelo ao longo do pé (25% do comprimento): sem fonte lida');
m('tornozelo.larguraMaleolos', 'bimalleolarbreadth');

// ---------- larguras e profundidades do tronco ----------
const biacromial = m('largura.biacromial', 'biacromialbreadth');
m('largura.bideltoide', 'bideltoidbreadth');
m('largura.peito', 'chestbreadth');
m('prof.peito', 'chestdepth');
m('largura.cintura', 'waistbreadth');
m('prof.cintura', 'waistdepth');
m('largura.quadril', 'hipbreadth');
m('prof.nadega', 'buttockdepth');
m('largura.bicristal', 'bicristalbreadth');
m('ombro.compDoOmbro', 'shoulderlength', 'do lado do pescoço ao acrômio, pela pele');

// ---------- circunferências → raio médio (C / 2π) ----------
const raio = (id, coluna, nota) => {
  m(`circ.${id}`, coluna, nota);
  return d(`raio.${id}`, A[coluna] / (2 * Math.PI), `circ.${id} / 2π`);
};
raio('pescoco', 'neckcircumference');
raio('pescocoBase', 'neckcircumferencebase');
raio('bracoFletido', 'bicepscircumferenceflexed', 'bíceps contraído, cotovelo a 90°: é o braço no fim da rosca');
raio('antebraco', 'forearmcircumferenceflexed');
raio('punho', 'wristcircumference');
raio('coxa', 'thighcircumference', 'na dobra do glúteo');
raio('coxaBaixa', 'lowerthighcircumference', 'logo acima do joelho');
raio('panturrilha', 'calfcircumference', 'no ponto mais largo');
raio('tornozelo', 'anklecircumference', 'no ponto mais fino');
p('raio.bracoRelaxadoSobreFletido', 0.93, 'razão', 'o ANSUR II só mede o braço contraído; a razão relaxado/contraído ainda não tem fonte lida');

// ---------- cabeça ----------
m('cabeca.comp', 'headlength', 'da testa à nuca');
m('cabeca.largura', 'headbreadth');
m('cabeca.mentoAoNasio', 'mentonsellionlength', 'do queixo à raiz do nariz');
m('cabeca.larguraDoRosto', 'bizygomaticbreadth');
m('cabeca.orelhaAltura', 'earlength');
f('cabeca.alturaSobreEstatura', 0.13, 'fração da estatura', 'drillis-contini-via-cnb2025', 'figura 1 (cota vertical da cabeça; fonte secundária)', 'do queixo ao topo');
d('cabeca.altura', 0.13 * H, 'cabeca.alturaSobreEstatura × estatura', 'drillis-contini-via-cnb2025');
d('altura.baseDoCranio', H - tragion, 'estatura − cabeca.tragionAoTopo (a articulação da cabeça com o pescoço fica perto da altura do tragion)');

// ---------- esqueleto interno (o que as medidas de fora não dão) ----------
p('quadril.meiaDistancia', sexo === 'homem' ? 8.7 : 8.4, 'cm', 'metade da distância entre os dois centros do quadril: a conferir (Bell 1990, Harrington 2007 ou modelo OpenSim)');
d('ombro.meiaDistancia', biacromial / 2 - 2.0, 'largura.biacromial / 2 − 2,0 (centro do ombro para dentro da borda do acrômio: provisório)');
p('ombro.centroAFrente', 0, 'cm', 'centro do ombro sobre a linha do quadril, de lado (linha de prumo da postura: a conferir)');
p('l5s1.acima', 12.0, 'cm', 'altura de L5–S1 acima do centro do quadril: a conferir (crista ilíaca − 1 vértebra lombar)');
p('l5s1.atras', 4.5, 'cm', 'recuo de L5–S1 atrás do centro do quadril: a conferir');
f('coluna.lombarGray', 18, 'cm', 'gray1918', 'coluna vertebral, comprimentos por região', 'a conferir no texto (pesquisa 03)');
f('coluna.toracicaGray', 28, 'cm', 'gray1918', 'idem');
f('coluna.cervicalGray', 12.5, 'cm', 'gray1918', 'idem');
p('coluna.lordoseLombar', 50, 'graus', 'curva lombar em pé de L1 a L5 (Vialle 2005 dá 60 de lordose máxima incluindo o sacro): a conferir');
p('coluna.cifoseToracica', 40, 'graus', 'curva torácica em pé: sem fonte lida');
p('coluna.lordoseCervical', 30, 'graus', 'curva cervical em pé: sem fonte lida');
f('clavicula.retracaoRepouso', 23, 'graus', 'ludewig2009', 'fig. 5-A (repouso)');
f('clavicula.elevacaoRepouso', 11, 'graus', 'ludewig2009', 'fig. 5-A (repouso)');
f('clavicula.retracaoNaElevacao', 16, 'graus', 'ludewig2009', 'fig. 5-A: aumento do repouso à elevação máxima do braço');
f('clavicula.elevacaoNaElevacao', 6, 'graus', 'ludewig2009', 'fig. 5-A: aumento do repouso à elevação máxima do braço');
f('escapula.rotacaoParaCimaRepouso', 11, 'graus', 'ludewig2009', 'fig. 5-C (repouso)');
f('escapula.rotacaoParaCimaNaElevacao', 39, 'graus', 'ludewig2009', 'fig. 5-C: aumento do repouso à elevação máxima do braço');
f('escapula.rotacaoInternaRepouso', 37, 'graus', 'ludewig2009', 'fig. 5-C (repouso): o plano da escápula');
p('clavicula.comp', 15.0, 'cm', 'comprimento da clavícula: a conferir (pesquisa 03)');
p('esterno.meiaDistanciaDasClaviculas', 2.5, 'cm', 'da linha do meio até a articulação da clavícula com o esterno: sem fonte lida');
p('escapula.altura', 15.5, 'cm', 'do ângulo superior ao inferior: a conferir (pesquisa 03)');
p('escapula.largura', 10.5, 'cm', 'da borda medial à cavidade do ombro: a conferir (pesquisa 03)');

// ---------- seções do corpo (anéis): meia-largura (a), raio para a frente (f) e para trás (b), em cm ----------
// t = posição ao longo do segmento (0 = junta de cima, 1 = junta de baixo). Onde há circunferência medida, o anel
// respeita o perímetro; a divisão entre frente e trás e os anéis intermediários são escolha de desenho (tipo "desenho").
const R = (id) => medidas[id].v;
const sec = (t, a, fr, b, origem, tipo = 'medida') => ({ t, a: r2(a), f: r2(fr), b: r2(b), tipo, origem });
const rB = R('raio.bracoFletido') * R('raio.bracoRelaxadoSobreFletido');
const rO = R('largura.bideltoide') / 2 - R('ombro.meiaDistancia');
const secoes = {
  braco: [
    sec(0, rO * 0.98, rO, rO, 'ombro: largura.bideltoide / 2 − ombro.meiaDistancia', 'derivada'),
    sec(0.2, rO * 0.9, rO * 0.98, rO * 0.94, 'deltoide, descendo para o braço', 'desenho'),
    sec(0.42, rB * 0.9, rB * 1.08, rB * 1.02, 'raio.bracoFletido × razão relaxado/contraído; mais fundo que largo', 'derivada'),
    sec(0.8, 3.7, 3.9, 4.0, 'acima do cotovelo', 'desenho'),
    sec(1, 4.1, 3.3, 3.9, 'cotovelo (epicôndilos)', 'desenho'),
  ],
  antebraco: [
    sec(0, 4.1, 3.6, 3.9, 'cotovelo', 'desenho'),
    sec(0.2, R('raio.antebraco') * 1.06, R('raio.antebraco') * 0.94, R('raio.antebraco') * 0.94, 'circ.antebraco (ponto mais largo)'),
    sec(0.6, 3.5, 3.0, 3.0, 'meio do antebraço', 'desenho'),
    sec(1, R('raio.punho') * 1.15, R('raio.punho') * 0.83, R('raio.punho') * 0.83, 'circ.punho, seção oval'),
  ],
  coxa: [
    sec(0, R('raio.coxa') * 0.96, R('raio.coxa'), R('raio.coxa') * 0.98, 'na altura do quadril', 'desenho'),
    sec(0.14, R('raio.coxa') * 0.95, R('raio.coxa') * 1.05, R('raio.coxa'), 'circ.coxa (dobra do glúteo)'),
    sec(0.5, R('raio.coxa') * 0.82, R('raio.coxa') * 0.92, R('raio.coxa') * 0.8, 'meio da coxa', 'desenho'),
    sec(0.86, R('raio.coxaBaixa') * 0.98, R('raio.coxaBaixa') * 1.04, R('raio.coxaBaixa') * 0.98, 'circ.coxaBaixa'),
    sec(1, 5.3, 5.5, 5.0, 'joelho (côndilos e patela)', 'desenho'),
  ],
  perna: [
    sec(0, 5.3, 5.2, 5.0, 'joelho', 'desenho'),
    sec(0.3, R('raio.panturrilha') * 0.95, R('raio.panturrilha') * 0.8, R('raio.panturrilha') * 1.22, 'circ.panturrilha: a barriga da perna fica atrás'),
    sec(0.7, 4.0, 3.5, 4.2, 'abaixo da panturrilha', 'desenho'),
    sec(0.93, R('raio.tornozelo') * 0.98, R('raio.tornozelo'), R('raio.tornozelo') * 1.04, 'circ.tornozelo (ponto mais fino)'),
    sec(1, R('tornozelo.larguraMaleolos') / 2, 3.3, 3.7, 'tornozelo.larguraMaleolos'),
  ],
  pescoco: [
    sec(0, R('raio.pescocoBase') * 1.05, R('raio.pescocoBase') * 0.95, R('raio.pescocoBase') * 0.95, 'circ.pescocoBase'),
    sec(0.5, R('raio.pescoco'), R('raio.pescoco'), R('raio.pescoco'), 'circ.pescoco'),
    sec(1, R('raio.pescoco') * 0.98, R('raio.pescoco'), R('raio.pescoco'), 'sob o queixo', 'desenho'),
  ],
};
// Tronco: anéis presos à pelve (pos = altura em relação ao centro do quadril) e à coluna (alt = altura em pé).
// O centro do anel é a linha da coluna; `tras` é a fração da profundidade que fica atrás dela (escolha de desenho).
const tr = (alt, larg, prof, tras, origem, tipo = 'medida') => ({ alt: r1(alt), a: r2(larg / 2), prof: r2(prof), tras, tipo, origem });
const tronco = [
  tr(yVirilha, 17, 14, 0.52, 'altura.virilha; largura e profundidade de desenho (entre as coxas)', 'desenho'),
  tr(yNadega, R('largura.quadril'), R('prof.nadega'), 0.5, 'largura.quadril e prof.nadega em altura.nadega'),
  tr((yCrista + yTroc) / 2 + 3, (R('largura.quadril') + R('largura.cintura')) / 2 - 1, (R('prof.nadega') + R('prof.cintura')) / 2 - 0.5, 0.4, 'entre o quadril e a cintura', 'desenho'),
  tr(yCintura, R('largura.cintura'), R('prof.cintura'), 0.36, 'largura.cintura e prof.cintura em altura.cintura'),
  tr(yCostela10, (R('largura.cintura') + R('largura.peito')) / 2, (R('prof.cintura') + R('prof.peito')) / 2, 0.33, 'altura.costela10; média de cintura e peito', 'derivada'),
  tr(yPeito, R('largura.peito'), R('prof.peito'), 0.3, 'largura.peito e prof.peito em altura.peito'),
  tr(yAxila, R('largura.peito') + 3, R('prof.peito') - 1.5, 0.31, 'altura.axila; largura de desenho (dobras do peitoral e do dorsal)', 'desenho'),
  tr(yAcromio - 2.5, biacromial - 6, 15.5, 0.36, 'abaixo do acrômio; largura.biacromial − 6', 'desenho'),
  tr(yC7 - 1.5, R('raio.pescocoBase') * 2.5, 13.2, 0.42, 'base do pescoço (trapézio)', 'desenho'),
];

const corpo = {
  id: `ansur2-${sexo}-${recorte === 'imcNormal' ? 'imc-normal' : 'todos'}`,
  populacao: `ANSUR II (militares dos EUA, 2012), ${sexo === 'homem' ? 'homens' : 'mulheres'}${recorte === 'imcNormal' ? ', IMC de 18,5 a 24,9' : ''}; n = ${A._n}; média de cada medida`,
  fontes: {
    ansur2: 'Gordon CC et al. 2012 Anthropometric Survey of U.S. Army Personnel (ANSUR II). CSV públicos: https://www.openlab.psu.edu/ansur2/ (médias calculadas em 12/11/2026; scripts/animacao-nova/dados/ansur2-medias.json)',
    'nasa-rp1024': 'NASA Reference Publication 1024, Anthropometric Source Book, vol. I (1978), cap. IV. https://ntrs.nasa.gov/citations/19790003563',
    'drillis-contini-via-cnb2025': 'Drillis & Contini 1966, lido na figura reproduzida por Almeida et al., 11º Congresso Nacional de Biomecânica, 2025 (fonte secundária)',
    ludewig2009: 'Ludewig PM et al. Motion of the shoulder complex during multiplanar humeral elevation. J Bone Joint Surg Am 2009;91(2):378-389 (lido no PMC por resumo automático: conferir os números)',
    gray1918: 'Gray H. Anatomy of the Human Body, 20ª ed., 1918 (domínio público)',
    'a-conferir': 'Sem fonte lida ainda: valor provisório, listado pela conferência',
  },
  medidas,
  secoes,
  tronco,
};
const saida = new URL(`../../src/engine/novo/dados/corpo-${sexo}.json`, import.meta.url);
writeFileSync(saida, JSON.stringify(corpo, null, 1) + '\n');
const tipos = Object.values(medidas).reduce((s, x) => ((s[x.tipo] = (s[x.tipo] ?? 0) + 1), s), {});
console.log(`${corpo.id}: ${Object.keys(medidas).length} medidas`, tipos, `→ ${saida.pathname}`);
