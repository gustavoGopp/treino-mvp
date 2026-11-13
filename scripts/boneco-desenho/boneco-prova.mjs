// O "boneco de prova": uma figura simples, desenhada à mão sobre as articulações do esqueleto de medidas reais, que
// serve só para as perguntas de gosto da etapa 0 (contorno, rosto, roupa, volume, proporção, cor, traço, músculo).
// NÃO é proposta de boneco: é o mesmo desenho com uma chave de cada vez, para o Gustavo comparar olhando.
// Os perfis (largura de cada parte, de cada lado) foram escolhidos à mão a partir das larguras medidas no corpo de
// referência; estão em cm.
import { DE_COSTAS, DE_FRENTE, DE_LADO, afastamento, montar } from './musculos-prova.mjs';
import { colocar, comSombra, entre, espelhar, faixa, foraDe, grupo, membro, menos, misturar, normal, r1, recorte, soma, suave, tam, uni, vezes } from './tinta.mjs';

/* ============================== perfis de lado: [t, frente, trás] ============================== */
const COXA_L = [[0, 10.4, 8.7], [0.25, 10.8, 8.2], [0.5, 9.5, 7.2], [0.75, 7.7, 6.3], [1, 6.2, 6.0]];
const CANELA_L = [[0, 5.4, 6.4], [0.12, 4.5, 7.7], [0.3, 3.3, 8.9], [0.5, 2.9, 7.5], [0.7, 2.7, 5.2], [0.88, 2.9, 4.2], [1, 3.3, 4.1]];
const BRACO_L = [[0, 6.4, 6.0], [0.18, 6.3, 5.7], [0.45, 5.2, 5.4], [0.75, 4.8, 4.6], [1, 4.3, 4.0]];
const ANTE_L = [[0, 4.5, 3.7], [0.2, 5.4, 3.8], [0.5, 4.0, 3.5], [0.8, 2.8, 2.7], [1, 2.5, 2.4]];
// tronco: da base do pescoço (C7) até o fim da lombar; a coluna corre rente às costas
const TRONCO_L = [[0, 11.5, 1.6], [0.1, 14.6, 1.9], [0.2, 18.8, 1.7], [0.32, 21.6, 1.3], [0.5, 22.4, 1.0], [0.68, 20.6, 1.0], [0.85, 18.9, 1.6], [1, 19.0, 2.6]];
const PESCOCO_L = [[0, 9.2, -0.4], [0.5, 9.3, 1.2], [1, 11.2, 1.6]];
// desenhos em coordenadas próprias [para a frente, para cima]
const PELVE_L = [[-6.5, 13, 'c'], [-9.4, 7], [-10.1, 0.5], [-9, -5.2], [-5, -9], [1.5, -9.8], [8, -8], [12.2, -2.5], [13.6, 5], [14.2, 12.5, 'c']];
const CABECA_L = [[9.2, 13], [14.2, 11.6], [17.6, 8], [18.8, 3.6], [18.9, -0.5], [18.3, -4.6], [16.9, -8.2], [14.2, -9.9], [11, -9.2], [7.6, -6.4], [4, -4.2], [0.6, -2.6], [-0.9, 2.5], [0.3, 7.6], [4, 11.6]];
const CABELO_L = [[9.4, 13.6], [14.4, 12.1], [17.4, 9.2], [15.2, 8.6], [12.4, 7.2], [10.2, 4.4], [9.6, 1.2], [7.2, 0.2], [5.4, -2.2], [3.2, -4.6], [0.2, -3.2], [-1.5, 2.5], [-0.3, 8], [3.8, 12.2]];
// [do calcanhar para a ponta, para cima]
const TENIS_L = [[-1.3, 1.2], [-1.4, 5.5], [-0.3, 9.2], [2.2, 11.2], [6, 11.6], [10.2, 10.6], [13.8, 8.2], [18.5, 6.2], [23.5, 4.6], [26.8, 2.9], [27.4, 1.0], [26, 0, 'c'], [0.3, 0, 'c']];
// [do punho para a ponta dos dedos, para o lado do polegar]
const MAO_PEGADA = [[0, 2.6], [3, 4], [7.5, 4.3], [10, 2.5], [10.3, -1], [8.5, -3.8], [4, -4.2], [0, -2.7]];
const MAO_SOLTA = [[0, 2.5], [3.5, 3.9], [7, 4.8], [9.6, 5.6], [10.6, 4.4], [9.4, 3.2], [13, 3.2], [17, 2.2], [18.4, 0], [17, -2.4], [12, -3.6], [6, -3.9], [0, -2.5]];

/* ============================== perfis de frente (lado direito do corpo): [t, dentro, fora] ============================== */
const COXA_F = [[0, 8.2, 8.0], [0.25, 8.3, 8.6], [0.5, 7.7, 7.9], [0.75, 6.4, 6.2], [1, 5.4, 5.0]];
const CANELA_F = [[0, 5.3, 5.0], [0.15, 5.9, 5.2], [0.32, 6.2, 5.6], [0.55, 5.0, 4.7], [0.75, 3.2, 3.6], [1, 2.9, 3.4]];
const BRACO_F = [[0, 5.6, 6.2], [0.2, 5.4, 5.9], [0.5, 4.7, 4.6], [0.8, 4.5, 3.8], [1, 4.2, 3.7]];
const ANTE_F = [[0, 4.3, 4.0], [0.2, 5.0, 4.3], [0.45, 4.6, 3.4], [0.75, 3.1, 2.2], [1, 2.5, 1.8]];
const MAO_F = [[0, 2.0], [4, 2.9], [9, 3.1], [13.2, 2.6], [15.6, 1.2], [16.2, -0.4], [14.6, -2.0], [9, -2.7], [3, -2.5], [0, -2.0]];
// metade direita, de cima para baixo, em pé (x negativo = lado direito do corpo, à esquerda de quem olha)
const TRONCO_F = [[-5.2, 152.5], [-9.5, 150.2], [-15.2, 147.6], [-18.6, 144.6], [-18.2, 139.5], [-16, 134], [-15.2, 129], [-14.3, 123], [-13.5, 117.5], [-13.5, 112], [-14.5, 106.5], [-15.6, 101.5], [-16.2, 96, 'c']];
const PELVE_F = [[-12.6, 105, 'c'], [-15.4, 101], [-16.8, 95], [-16.6, 88], [-12, 83], [-5, 80.4], [0, 79.6]];
const SHORT_F = [[-12.4, 106, 'c'], [-15.4, 102], [-17, 96], [-17.9, 88], [-17.7, 80], [-17.1, 71.5, 'c'], [-0.9, 71.5, 'c'], [-0.5, 77], [0, 80.6]];
const TENIS_F = [[-15.8, 0, 'c'], [-16.3, 3], [-14.9, 6.8], [-12.2, 9.6], [-8.4, 10.5], [-5.4, 9], [-4, 5.6], [-3.6, 2.6], [-4, 0, 'c']];
// cabeça de frente: metade direita, em torno da base do crânio [x, y]
const CABECA_F = [[0, 13], [-4.6, 12.3], [-7.6, 9.2], [-8.6, 4.6], [-8.4, 0], [-7.5, -4.4], [-5.3, -8], [-2.4, -9.7], [0, -10]];
const CABELO_F = [[0, 13.8], [-4.9, 13], [-8.2, 9.7], [-9.2, 4.4], [-8.2, 3], [-7.2, 6.3], [-3.9, 8.4], [0, 9]];

/* ============================== cores ============================== */
const FUNDO = { claro: '#f7f9fa', escuro: '#10171b' };
/** As cores do boneco de prova conforme a cor pedida, o tema e se há contorno (sem contorno, o corpo precisa de mais peso). */
export function paleta({ cor = 'cinza', tema = 'claro', contorno = true, roupaCalma = false }) {
  const claro = tema === 'claro';
  const base = {
    cinza: claro
      ? contorno ? { pele: '#d5dde3', peleSombra: '#b3bfc8', roupa: '#94a2ae', roupaSombra: '#7b8a97', short: '#5b6a78', shortSombra: '#4a5865', calcado: '#3f4d5a', cabelo: '#3f4d5a' } : { pele: '#93a0ab', peleSombra: '#7b8994', roupa: '#5f6e7b', roupaSombra: '#4d5b67', short: '#34424e', shortSombra: '#28353f', calcado: '#2d3a45', cabelo: '#2d3a45' }
      : contorno ? { pele: '#5e6e7a', peleSombra: '#4a5863', roupa: '#3d4b56', roupaSombra: '#313d47', short: '#2a353e', shortSombra: '#212a32', calcado: '#c3ced6', cabelo: '#c3ced6' } : { pele: '#8d9ba6', peleSombra: '#73818c', roupa: '#b9c4cc', roupaSombra: '#9eaab4', short: '#dfe6ea', shortSombra: '#c3ced6', calcado: '#eef2f5', cabelo: '#eef2f5' },
    pele: claro
      ? { pele: '#d9a47c', peleSombra: '#bd865f', roupa: '#55708c', roupaSombra: '#435b74', short: '#2c3d50', shortSombra: '#22303f', calcado: '#27343f', cabelo: '#2b2420' }
      : { pele: '#c9966f', peleSombra: '#a87852', roupa: '#8fa5ba', roupaSombra: '#748a9f', short: '#dfe6ea', shortSombra: '#c3ced6', calcado: '#e7eef2', cabelo: '#1d1815' },
    marca: claro
      ? { pele: '#9a97e6', peleSombra: '#7b77d0', roupa: '#5a55c4', roupaSombra: '#4843a8', short: '#3f3aa8', shortSombra: '#302c86', calcado: '#2a2675', cabelo: '#2a2675' }
      : { pele: '#7f86e6', peleSombra: '#646bcb', roupa: '#a9b3ff', roupaSombra: '#8d97ea', short: '#dfe3ff', shortSombra: '#c9cfff', calcado: '#e8eaff', cabelo: '#e8eaff' },
    // desenho de linha: o corpo fica da cor do fundo e quem desenha é o traço; a roupa entra em blocos
    linha: claro
      ? { pele: FUNDO.claro, peleSombra: '#e3e8ec', roupa: '#e3e8ec', roupaSombra: '#cfd7dd', short: '#4b5a67', shortSombra: '#3a4853', calcado: '#2d3a45', cabelo: '#2d3a45' }
      : { pele: FUNDO.escuro, peleSombra: '#1c262d', roupa: '#27323b', roupaSombra: '#1c262d', short: '#c3ced6', shortSombra: '#a9b5be', calcado: '#e7eef2', cabelo: '#e7eef2' },
  }[cor];
  // roupa calma: a roupa vai para tons de cinza, e a cor viva fica só no músculo (e na pele)
  if (roupaCalma) Object.assign(base, claro ? { roupa: '#aab4bc', roupaSombra: '#929da6', short: '#6a7682', shortSombra: '#57626d', calcado: '#3d4954' } : { roupa: '#5d6975', roupaSombra: '#4a5560', short: '#9aa6b0', shortSombra: '#808c96', calcado: '#dfe6ea' });
  // músculo: "parado" = os grupos que não trabalham, quase da cor do corpo; "suave" = o que trabalha, em tons menos
  // gritantes (o secundário é um tom claro do principal); "tom" = um tom mais quente da própria pele, sem borda
  const mus = cor === 'pele'
    ? { musculoParado: claro ? '#dfad87' : '#cf9c75', linhaMus: claro ? '#c08b64' : '#a67750', suaveP: '#cb5747', suavePb: '#a43d2d', suaveS: '#eaa594', suaveSb: '#c77f6c', tomP: '#c25a43', tomS: '#d18766', linhaRoupa: claro ? '#b98660' : '#a07250' }
    : { musculoParado: claro ? '#a1adb7' : '#99a6b0', linhaMus: claro ? '#7a8792' : '#6f7d88', suaveP: '#d8483e', suavePb: '#a52f28', suaveS: '#ecaa50', suaveSb: '#b77c26', tomP: '#d8483e', tomS: '#ecaa50', linhaRoupa: claro ? '#75828d' : '#6f7d88' };
  // roupa em véu: no modo Músculos, a regata e o short ficam claros, meio caminho entre o tecido e a pele
  const veu = { roupaVeu: misturar(base.pele, claro ? '#aeb7bf' : '#5d6975', 0.5), shortVeu: misturar(base.pele, claro ? '#6a7682' : '#9aa6b0', 0.5) };
  return { ...base, ...mus, ...veu, musPb: claro ? '#a31d17' : '#b9342c', musSb: claro ? '#b76d0e' : '#c07f1e', fundo: FUNDO[tema], contorno: claro ? '#1d2a36' : '#e7eef2', ferro: claro ? '#27343f' : '#cfd8de', aco: '#8a98a3', chao: claro ? '#d5dce1' : '#33414b', musP: claro ? '#d62e26' : '#f45248', musS: claro ? '#ec961c' : '#f5aa3c', rosto: claro ? '#1d2a36' : '#10171b' };
}

/* ============================== ajudas ============================== */
const p2 = (v) => [v[0], v[1]];
const D = (pts, fechado = true) => suave(pts, fechado);
/** Lê uma coluna do perfil ([t, frente, trás] ou [t, dentro, fora]) num t qualquer. */
const noPerfilDe = (perfil, t, i) => {
  for (let k = 1; k < perfil.length; k++) if (t <= perfil[k][0]) return perfil[k - 1][i] + ((perfil[k][i] - perfil[k - 1][i]) * (t - perfil[k - 1][0])) / (perfil[k][0] - perfil[k - 1][0]);
  return perfil[perfil.length - 1][i];
};
/** Um músculo: a forma em cor sólida, com a borda num tom mais escuro da mesma cor, e as divisões por dentro. */
const musculo = (pts, cor, borda, divisoes = []) => `<path d="${suave(pts)}" fill="${cor}" stroke="${borda}" stroke-width="0.5" stroke-linejoin="round"/>${divisoes.map((l) => `<path d="${suave(l, false)}" fill="none" stroke="${borda}" stroke-width="0.45" stroke-linecap="round"/>`).join('')}`;
/** No goblet: o quadríceps é o principal; o glúteo e os adutores trabalham junto. */
const PAPEL = { quadriceps: 'p', gluteo: 's', adutores: 's' };
const DO_BRACO = ['triceps', 'biceps', 'deltoide', 'antebraco'];
/**
 * Pinta os músculos de uma lista (de `montar`) numa das maneiras em estudo:
 *  'solido'   = só os que trabalham, em vermelho e laranja sólidos com borda escura (como o boneco de hoje)
 *  'atlas'    = todos os grupos desenhados de leve, e os que trabalham acesos em tons mais suaves
 *  'tom'      = só os que trabalham, num tom mais quente da própria pele, sem borda nem divisões
 *  'contorno' = só os que trabalham, marcados por uma linha colorida em volta, sem preenchimento
 *  'suave'    = só os que trabalham, nos tons suaves do atlas, com borda e divisões
 * `veus` = peças de roupa que viraram um véu claro ({ ds, cor }): o músculo aparece por baixo delas.
 */
function pintarMusculos(formas, o, C, veus = []) {
  const est = o.estiloMusculo, papel = o.ativos ?? PAPEL;
  const linha = (d, cor, esp) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${esp}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cheio = (f, cor, borda) => `<path d="${suave(f.pts)}" fill="${cor}" stroke="${borda}" stroke-width="0.4" stroke-linejoin="round"/>${f.div.map((l) => linha(suave(l, false), borda, 0.35)).join('')}`;
  let parados = '', ativos = '';
  for (const f of formas) {
    const r = papel[f.id], d = suave(f.pts);
    if (est === 'atlas' && !r) parados += cheio(f, C.musculoParado, C.linhaMus);
    else if (!r) continue;
    else if (est === 'atlas' || est === 'suave') {
      const cor = r === 'p' ? C.suaveP : C.suaveS, borda = r === 'p' ? C.suavePb : C.suaveSb;
      // por baixo da roupa: fora da roupa na cor cheia; dentro de cada peça, misturado com a cor do tecido
      if (veus.length) ativos += foraDe(veus.flatMap((v) => v.ds), cheio(f, cor, borda)) + veus.map((v) => recorte(v.ds, cheio(f, misturar(cor, v.cor, 0.38), misturar(borda, v.cor, 0.38)))).join('');
      else ativos += cheio(f, cor, borda);
    } else if (est === 'tom') ativos += `<path d="${d}" fill="${r === 'p' ? C.tomP : C.tomS}"/>`;
    else if (est === 'contorno') ativos += linha(d, r === 'p' ? C.musP : C.musS, 0.95);
    else if (est === 'solido') ativos += musculo(f.pts, r === 'p' ? C.musP : C.musS, r === 'p' ? C.musPb : C.musSb, f.div);
  }
  return parados + ativos;
}
const emMembro = (a, b, t, o) => {
  const u = uni(menos(b, a)), n = normal(u);
  return soma(entre(a, b, t), vezes(n, o));
};
/** Proporção levemente estilizada: corpo um pouco menor e cabeça maior (de 7,7 para cerca de 6,3 cabeças), membros mais cheios. */
export function estilizar(p, k = 0.967) {
  const anda = (v) => {
    if (Array.isArray(v)) return v.length === 3 && typeof v[0] === 'number' ? [v[0] * k, v[1] * k, v[2] * k] : v.map(anda);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([c, x]) => [c, c === 'x' || c === 'y' || c === 'z' ? x : anda(x)]));
    return v;
  };
  return anda(p);
}
const forma = (o) => (o.proporcao === 'estilizada' ? { k: 0.967, gordura: 1.12, cabeca: 1.22, extremo: 1.14 } : { k: 1, gordura: 1, cabeca: 1, extremo: 1 });

/** O grupo com contorno único (ou a linha de separação, no desenho sem contorno) e, se pedido, a sombra em dois tons. */
function pintar(formas, o, C, extra, luz) {
  const op = { ...extra };
  if (o.contorno) {
    op.contorno = { cor: C.contorno, esp: o.esp ?? 1.15 };
    delete op.linhaSoSobre;
  } else delete op.semLinhaSobre;
  if (o.volume) op.preencher = comSombra(luz);
  return grupo(formas, op);
}

/* ============================== de lado (olhando para a direita) ============================== */
/**
 * O boneco de prova visto de lado, a partir dos pontos de `poses.mjs`. Devolve o SVG (em cm, y para cima).
 * opções: contorno, esp, cabeca ('lisa' | 'cabelo' | 'rosto'), roupa, volume, proporcao, cor, tema, musculo, halter
 */
export function deLado(pose, o = {}) {
  const F = forma(o), p = o.proporcao === 'estilizada' ? estilizar(pose, F.k) : pose;
  const C = paleta(o), R = p.R, g = F.gordura * F.k;
  const J = (n) => p2(R[n]);
  const pelePar = { cor: C.pele, sombra: C.peleSombra };
  // roupa: true = blocos de cor; 'linha' = só a linha da barra, com o corpo à mostra; false = sem roupa
  //        'veu' = a roupa fica clara e o músculo aparece por baixo dela
  const vestido = o.roupa === true || o.roupa === 'veu', veu = o.roupa === 'veu', calcado = !!o.roupa || !!o.tenis;
  const roupaPar = veu ? { cor: C.roupaVeu, sombra: C.roupaVeu } : vestido ? { cor: C.roupa, sombra: C.roupaSombra } : pelePar;
  const shortPar = veu ? { cor: C.shortVeu, sombra: C.shortVeu } : vestido ? { cor: C.short, sombra: C.shortSombra } : pelePar;
  const luz = [1.9, 2.4];

  const espinha = p.coluna.slice(0, p.iC7 + 1).map(p2).reverse();
  const tronco = D(faixa(espinha, TRONCO_L.map(([t, f, tr]) => [t, f * g, tr * g])));
  // um ponto do tronco: t ao longo da coluna (da base do pescoço ao fim da lombar) e d para a frente
  const noTronco = (pt) => {
    const acum = [0];
    for (let i = 1; i < espinha.length; i++) acum.push(acum[i - 1] + tam(menos(espinha[i], espinha[i - 1])));
    const alvo = Math.max(0, Math.min(1, pt[0])) * acum[acum.length - 1];
    let i = 1;
    while (i < espinha.length - 1 && acum[i] < alvo) i++;
    const u = (alvo - acum[i - 1]) / (acum[i] - acum[i - 1] || 1);
    const n = normal(uni(menos(espinha[Math.min(i + 1, espinha.length - 1)], espinha[Math.max(i - 2, 0)])));
    return soma(entre(espinha[i - 1], espinha[i], u), vezes(n, afastamento(TRONCO_L, g, pt)));
  };
  const pescoco = D(faixa(p.coluna.slice(p.iC7, p.iCranio + 1).map(p2).reverse(), PESCOCO_L.map(([t, f, tr]) => [t, f * g, tr * g])));
  const rc = p.refs.cabeca, rp = p.refs.pelve;
  const cabeca = D(colocar(CABECA_L, p2(rc.o), rc.z, rc.y, F.cabeca * F.k));
  const cabelo = D(colocar(CABELO_L, p2(rc.o), rc.z, rc.y, F.cabeca * F.k));
  const pelve = D(colocar(PELVE_L, p2(rp.o), rp.z, rp.y, g));
  const coxa = D(membro(J('quadril'), J('joelho'), COXA_L, { gordura: g }));
  const canela = D(membro(J('joelho'), J('tornozelo'), CANELA_L, { gordura: g }));
  const short = D(membro(J('quadril'), J('joelho'), COXA_L, { gordura: g * 1.07, ate: 0.44, fim: 'reta' }));
  const uPe = uni(menos(J('ponta'), J('calcanhar')));
  const pe = D(colocar(TENIS_L, J('calcanhar'), uPe, normal(uPe), F.extremo * F.k * (calcado ? 1 : 0.93)));
  const novo = o.musculo && o.estiloMusculo;
  const onde = { membros: { coxa: [J('quadril'), J('joelho'), COXA_L, g], canela: [J('joelho'), J('tornozelo'), CANELA_L, g], braco: [J('ombro'), J('cotovelo'), BRACO_L, g], ante: [J('cotovelo'), J('punho'), ANTE_L, g] }, tronco: noTronco, pelve: { o: p2(rp.o), ex: rp.z, ey: rp.y, k: g } };
  const musculos = novo ? montar(DE_LADO, onde) : [];
  const DO_TRONCO = ['peitoral', 'abdomen', 'dorsal'];
  const veus = veu ? [{ ds: [tronco], cor: C.roupaVeu }, { ds: [pelve, short], cor: C.shortVeu }] : [];
  const braco = D(membro(J('ombro'), J('cotovelo'), BRACO_L, { gordura: g }));
  const ante = D(membro(J('cotovelo'), J('punho'), ANTE_L, { gordura: g }));
  const rm = p.refs.maoR, dedos = [-rm.y[0], -rm.y[1]];
  const uMao = uni(dedos[0] || dedos[1] ? dedos : menos(J('pegada'), J('punho')));
  const mao = D(colocar(o.halter ? MAO_PEGADA : MAO_SOLTA, J('punho'), uMao, normal(uMao), F.extremo * F.k));

  // tronco, pescoço, cabeça e quadril: um grupo só, com um contorno em volta
  const corpo = [{ d: pescoco, ...pelePar }, { d: tronco, ...roupaPar }, { d: pelve, ...shortPar }, { d: cabeca, ...pelePar }];
  if (o.cabeca !== 'lisa' && o.cabeca) corpo.push({ d: cabelo, cor: C.cabelo, sombra: C.cabelo });
  let s = pintar(corpo, o, C, {}, luz);
  if (novo) s += pintarMusculos(musculos.filter((m) => DO_TRONCO.includes(m.id)), o, C, veus);
  // rosto mínimo: olho, nariz e orelha
  if (o.cabeca === 'rosto') {
    const k = F.cabeca * F.k, em = (z, y) => colocar([[z, y]], p2(rc.o), rc.z, rc.y, k)[0];
    const olho = em(15.3, 2.3), n1 = em(18.5, 1.6), n2 = em(20.4, -1.7), n3 = em(18.5, -2.7), or = em(7.4, 0.4);
    s += `<path d="M${r1(n1[0])} ${r1(n1[1])}L${r1(n2[0])} ${r1(n2[1])}L${r1(n3[0])} ${r1(n3[1])}Z" fill="${C.pele}" stroke="${o.contorno ? C.contorno : C.pele}" stroke-width="${o.contorno ? (o.esp ?? 1.15) * 0.9 : 0.3}" stroke-linejoin="round" paint-order="stroke"/>`;
    s += `<path d="M${r1(n1[0])} ${r1(n1[1])}L${r1(n3[0])} ${r1(n3[1])}" stroke="${C.pele}" stroke-width="1.6"/>`;
    s += `<circle cx="${r1(olho[0])}" cy="${r1(olho[1])}" r="${r1(0.85 * k)}" fill="${C.rosto}"/>`;
    s += `<ellipse cx="${r1(or[0])}" cy="${r1(or[1])}" rx="${r1(1.3 * k)}" ry="${r1(2.3 * k)}" fill="${C.peleSombra}"/>`;
  }
  // a perna: sai do quadril sem emenda, mas ganha linha onde passa na frente do tronco (no agachamento)
  const perna = [{ d: coxa, ...pelePar }, { d: canela, ...pelePar }, { d: pe, cor: calcado ? C.calcado : C.pele, sombra: calcado ? C.calcado : C.peleSombra }];
  if (vestido) perna.push({ d: short, ...shortPar });
  const sobreCorpo = { cor: C.fundo, esp: 0.75, sobre: [tronco, pescoco] };
  s += pintar(perna, o, C, { semLinhaSobre: [pelve], linhaSoSobre: sobreCorpo }, luz);
  if (novo) s += pintarMusculos(musculos.filter((m) => !DO_TRONCO.includes(m.id) && !DO_BRACO.includes(m.id)), o, C, veus);
  // roupa em linha: só a barra do short e a da regata, por cima do corpo
  if (o.roupa === 'linha') {
    const a = J('quadril'), b = J('joelho'), q1 = emMembro(a, b, 0.44, noPerfilDe(COXA_L, 0.44, 1) * g), q2 = emMembro(a, b, 0.44, -noPerfilDe(COXA_L, 0.44, 2) * g);
    const c1 = noTronco([0.985, 'f-0.0']), c2 = noTronco([0.985, 't-0.0']);
    s += recorte([tronco, pelve, coxa], `<path d="M${r1(q1[0])} ${r1(q1[1])}L${r1(q2[0])} ${r1(q2[1])}M${r1(c1[0])} ${r1(c1[1])}L${r1(c2[0])} ${r1(c2[1])}" fill="none" stroke="${C.linhaRoupa}" stroke-width="0.55" stroke-linecap="round"/>`);
  }
  // músculo no corpo: frente da coxa em vermelho (principal) e glúteo em laranja (secundário), cor sólida
  if (novo) {
    // já pintado acima
  } else if (o.musculo && o.definido) {
    // forma de músculo: o quadríceps ocupa a frente e o lado da coxa, do quadril até acima do joelho, com a divisão
    // entre o reto femoral (em cima) e o vasto lateral; o glúteo cobre a parte de trás do quadril
    const a = J('quadril'), b = J('joelho'), M = (t, d) => emMembro(a, b, t, d), fr = (t) => noPerfilDe(COXA_L, t, 1) * g;
    const quad = [M(0.06, 2.6 * g), M(0.1, fr(0.1) - 3.6), M(0.18, fr(0.18) - 1.1), ...[0.3, 0.45, 0.6, 0.74, 0.86].map((t) => M(t, fr(t) - 0.9)), M(0.94, 3.4 * g), M(0.975, 1.2 * g), M(0.94, -1.0 * g), ...[[0.8, -2.0], [0.62, -2.8], [0.44, -2.9], [0.27, -2.2]].map(([t, d]) => M(t, d * g)), M(0.13, -0.4 * g)];
    const div = [[0.13, 4.4], [0.3, 4.5], [0.5, 4.1], [0.7, 3.5], [0.87, 2.7]].map(([t, d]) => M(t, fr(t) - d * g));
    const glu = colocar([[-6.6, 9.6], [-9.2, 6.2], [-9.9, 0.6], [-9.0, -4.6], [-5.2, -8.0], [0.2, -7.8], [2.6, -4.6], [2.2, 0.2], [-1.0, 4.6], [-4.2, 8.2]], p2(rp.o), rp.z, rp.y, g);
    s += musculo(glu, C.musS, C.musSb) + musculo(quad, C.musP, C.musPb, [div]);
  } else if (o.musculo) {
    const a = J('quadril'), b = J('joelho');
    const fr = (t) => noPerfilDe(COXA_L, t, 1) * g;
    const quad = [emMembro(a, b, 0.13, 4.2 * g), ...[0.22, 0.36, 0.5, 0.64, 0.78, 0.88].map((t) => emMembro(a, b, t, fr(t) - 1.4)), emMembro(a, b, 0.95, 2.6), emMembro(a, b, 0.9, -0.6), ...[0.74, 0.56, 0.38].map((t) => emMembro(a, b, t, -2.2 * g)), emMembro(a, b, 0.2, -0.4)];
    const glu = colocar([[-9.6, 6.5], [-10.3, 0.5], [-9, -5.3], [-4.8, -8.6], [0.6, -7.4], [2, -1.5], [-0.6, 5], [-5.2, 8.4]], p2(rp.o), rp.z, rp.y, g);
    const borda = o.contorno ? `stroke="${C.contorno}" stroke-width="0.55" stroke-linejoin="round"` : '';
    s += `<path d="${D(glu)}" fill="${C.musS}" ${borda}/><path d="${D(quad)}" fill="${C.musP}" ${borda}/>`;
  }
  // halter do goblet (em pé, na frente do peito) e as anilhas sob os calcanhares
  if (o.halter) {
    const [a, b] = o.halter.map((q) => p2(o.proporcao === 'estilizada' ? vezes(q, F.k) : q));
    const u = uni(menos(b, a)), L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const ret = (t0, t1, w, rx) => {
      const c = entre(a, b, (t0 + t1) / 2), ang = (Math.atan2(u[1], u[0]) * 180) / Math.PI, comp = (t1 - t0) * L;
      return `<rect x="${r1(-comp / 2)}" y="${r1(-w / 2)}" width="${r1(comp)}" height="${r1(w)}" rx="${rx}" transform="translate(${r1(c[0])} ${r1(c[1])}) rotate(${r1(ang)})"`;
    };
    const cont = o.contorno ? ` stroke="${C.contorno}" stroke-width="${o.esp ?? 1.15}" stroke-linejoin="round"` : '';
    s += `${ret(0.25, 0.75, 3.2, 1)} fill="${C.aco}"${cont}/>${ret(0, 0.31, 13.4, 2.4)} fill="${C.ferro}"${cont}/>${ret(0.69, 1, 13.4, 2.4)} fill="${C.ferro}"${cont}/>`;
  }
  // o braço de perto por cima de tudo, com a mão
  const bracoG = [{ d: braco, ...pelePar }, { d: ante, ...pelePar }, { d: mao, ...pelePar }];
  s += pintar(bracoG, o, C, { linhaSoSobre: { cor: C.fundo, esp: 0.75, sobre: [tronco, pescoco, pelve, coxa, canela, short] } }, luz);
  if (novo) s += pintarMusculos(musculos.filter((m) => DO_BRACO.includes(m.id)), o, C);
  return s;
}

/* ============================== de frente, em pé ============================== */
export function deFrente(pose, o = {}) {
  const F = forma(o), p = o.proporcao === 'estilizada' ? estilizar(pose, F.k) : pose;
  const C = paleta(o), R = p.R, g = F.gordura * F.k, k = F.k;
  const J = (n) => p2(R[n]);
  const pelePar = { cor: C.pele, sombra: C.peleSombra };
  const vestido = o.roupa === true || o.roupa === 'veu', veu = o.roupa === 'veu', calcado = !!o.roupa || !!o.tenis, deCostas = o.musculo === 'costas';
  const roupaPar = veu ? { cor: C.roupaVeu, sombra: C.roupaVeu } : vestido ? { cor: C.roupa, sombra: C.roupaSombra } : pelePar;
  const shortPar = veu ? { cor: C.shortVeu, sombra: C.shortVeu } : vestido ? { cor: C.short, sombra: C.shortSombra } : pelePar;
  const luz = [-2.0, 2.3];
  const E = (pts) => pts.map((q) => (q[2] ? [q[0] * k * (o.proporcao === 'estilizada' ? 1.06 : 1), q[1] * k, q[2]] : [q[0] * k * (o.proporcao === 'estilizada' ? 1.06 : 1), q[1] * k]));
  const inteiro = (metade) => D([...metade, ...espelhar(metade).slice(metade[metade.length - 1][0] === 0 ? 1 : 0, metade[0][0] === 0 ? -1 : undefined)]);

  const tronco = inteiro(E(TRONCO_F));
  const pelve = inteiro(E(vestido ? SHORT_F : PELVE_F));
  const rc = p.refs.cabeca, kc = F.cabeca * k;
  const cab = (pts) => pts.map((q) => [rc.o[0] + q[0] * kc, rc.o[1] + q[1] * kc]);
  const cabeca = inteiro(cab(CABECA_F));
  const cabelo = deCostas ? inteiro(cab(CABECA_F.map(([x, y]) => [x * 1.05, y > -4 ? y * 1.04 : y * 0.62]))) : inteiro(cab(CABELO_F));
  const pescoco = D([[-5.4 * g, 158 * k, 'c'], [-5.5 * g, 152.5 * k], [-6.6 * g, 148.6 * k, 'c'], [6.6 * g, 148.6 * k, 'c'], [5.5 * g, 152.5 * k], [5.4 * g, 158 * k, 'c']]);
  const decote = D(E([[-6, 153, 'c'], [-5.5, 150], [-3.4, 147.5], [0, 146.5], [3.4, 147.5], [5.5, 150], [6, 153, 'c']]));
  // os braços um pouco afastados do corpo (6°), para o vão entre o braço e a cintura aparecer
  const abrir = (q) => {
    const o0 = J('ombro'), a = (-6 * Math.PI) / 180, dx = q[0] - o0[0], dy = q[1] - o0[1];
    return [o0[0] + dx * Math.cos(a) - dy * Math.sin(a), o0[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  };
  const cot = abrir(J('cotovelo')), pun = abrir(J('punho')), peg = abrir(J('pegada'));
  const lado = (esp) => {
    const m = (pts) => (esp ? espelhar(pts) : pts);
    const coxa = D(m(membro(J('quadril'), J('joelho'), COXA_F, { gordura: g })));
    const canela = D(m(membro(J('joelho'), J('tornozelo'), CANELA_F, { gordura: g })));
    const pe = D(m(E(TENIS_F).map((q) => (q[2] ? [q[0], q[1] * F.extremo, q[2]] : [q[0], q[1] * F.extremo]))));
    const braco = D(m(membro(J('ombro'), cot, BRACO_F, { gordura: g })));
    const ante = D(m(membro(cot, pun, ANTE_F, { gordura: g })));
    const uMao = uni(menos(peg, pun));
    const mao = D(m(colocar(MAO_F, pun, uMao, normal(uMao), F.extremo * k)));
    return { coxa, canela, pe, braco, ante, mao };
  };
  const d = lado(false), e = lado(true);

  const corpo = [];
  for (const l of [d, e]) corpo.push({ d: l.coxa, ...pelePar }, { d: l.canela, ...pelePar }, { d: l.pe, cor: calcado ? C.calcado : C.pele, sombra: calcado ? C.calcado : C.peleSombra });
  corpo.push({ d: pescoco, ...pelePar }, { d: tronco, ...roupaPar }, { d: pelve, ...shortPar });
  if (vestido && !deCostas) corpo.push({ d: decote, ...pelePar });
  corpo.push({ d: cabeca, ...pelePar });
  if (o.cabeca && o.cabeca !== 'lisa') corpo.push({ d: cabelo, cor: C.cabelo, sombra: C.cabelo });
  let s = '';
  // orelhas atrás da cabeça
  if (o.cabeca === 'rosto') for (const sx of [-1, 1]) s += `<ellipse cx="${r1(rc.o[0] + sx * 8.1 * kc)}" cy="${r1(rc.o[1] + 0.6 * kc)}" rx="${r1(1.5 * kc)}" ry="${r1(2.5 * kc)}" fill="${C.pele}" ${o.contorno ? `stroke="${C.contorno}" stroke-width="${o.esp ?? 1.15}"` : ''}/>`;
  s += pintar(corpo, o, C, {}, luz);
  const novo = o.musculo && o.estiloMusculo;
  const onde = { membros: { coxa: [J('quadril'), J('joelho'), COXA_F, g], canela: [J('joelho'), J('tornozelo'), CANELA_F, g], braco: [J('ombro'), cot, BRACO_F, g], ante: [cot, pun, ANTE_F, g] }, abs: E, espelhar: true };
  const musculos = novo ? montar(deCostas ? DE_COSTAS : DE_FRENTE, onde) : [];
  if (novo) s += pintarMusculos(musculos.filter((m) => !DO_BRACO.includes(m.id)), o, C, veu ? [{ ds: [tronco], cor: C.roupaVeu }, { ds: [pelve], cor: C.shortVeu }] : []);
  if (o.roupa === 'linha') {
    // só a barra do short, o cós e o decote, em linha fina por cima do corpo
    const y1 = r1(71.5 * k), y2 = r1(105 * k), dec = deCostas ? '' : `<path d="${suave(E([[-6, 152], [-5.5, 150], [-3.4, 147.5], [0, 146.5], [3.4, 147.5], [5.5, 150], [6, 152]]), false)}"/>`;
    s += recorte([tronco, pelve, d.coxa, e.coxa], `<g fill="none" stroke="${C.linhaRoupa}" stroke-width="0.55" stroke-linecap="round"><path d="M-30 ${y1}H30M-30 ${y2}H30"/>${dec}</g>`);
  }
  if (o.cabeca === 'rosto' && !deCostas) {
    const x0 = rc.o[0], y0 = rc.o[1];
    for (const sx of [-1, 1]) s += `<circle cx="${r1(x0 + sx * 3.1 * kc)}" cy="${r1(y0 + 1.0 * kc)}" r="${r1(0.85 * kc)}" fill="${C.rosto}"/>`;
    s += `<path d="M${r1(x0 - 1.9 * kc)} ${r1(y0 - 5.2 * kc)}Q${r1(x0)} ${r1(y0 - 6.3 * kc)} ${r1(x0 + 1.9 * kc)} ${r1(y0 - 5.2 * kc)}" fill="none" stroke="${C.rosto}" stroke-width="0.7" stroke-linecap="round"/>`;
  }
  if (novo) {
    // já pintado acima
  } else if (o.musculo && o.definido) {
    if (o.musculo === 'costas') {
      // glúteos vistos de trás
      const g1 = [[-0.5, 9.2], [-6.4, 7.6], [-8.2, 1.5], [-7.4, -5.6], [-2.6, -8.6], [4.6, -7.6], [6.6, -2], [6.4, 5], [3.6, 8.6]].map(([x, y]) => [-7.7 * k + x * g, 91.2 * k + y * g]);
      s += musculo(g1, C.musS, C.musSb) + musculo(espelhar(g1), C.musS, C.musSb);
    } else {
      // de frente: o quadríceps com as três partes que se veem (a faixa do meio, o lado de fora e a "gota" de dentro,
      // perto do joelho), e os adutores na parte de dentro da coxa, em laranja
      const a = J('quadril'), b = J('joelho'), M = (t, d) => emMembro(a, b, t, d);
      const den = (t) => noPerfilDe(COXA_F, t, 1) * g, fora = (t) => noPerfilDe(COXA_F, t, 2) * g;
      const quad = [M(0.12, -2.0 * g), ...[0.2, 0.35, 0.5].map((t) => M(t, -(fora(t) - 0.9))), M(0.68, -(fora(0.68) - 0.8)), M(0.82, -(fora(0.82) - 0.7)), M(0.9, -3.0 * g), M(0.945, -0.4 * g), M(0.92, 2.6 * g), M(0.84, den(0.84) - 0.7), M(0.72, den(0.72) - 1.0), M(0.58, 4.7 * g), M(0.42, 3.5 * g), M(0.26, 1.9 * g), M(0.15, 0.4 * g)];
      const d1 = [M(0.17, -2.7 * g), M(0.5, -3.0 * g), M(0.86, -1.9 * g)], d2 = [M(0.2, 0.3 * g), M(0.55, 1.7 * g), M(0.86, 1.3 * g)];
      const adut = [M(0.09, 2.0 * g), M(0.3, 3.6 * g), M(0.5, 5.2 * g), M(0.6, den(0.6) - 0.7), M(0.42, den(0.42) - 0.6), M(0.22, den(0.22) - 0.6), M(0.08, den(0.08) - 1.2)];
      s += musculo(adut, C.musS, C.musSb) + musculo(espelhar(adut), C.musS, C.musSb) + musculo(quad, C.musP, C.musPb, [d1, d2]) + musculo(espelhar(quad), C.musP, C.musPb, [espelhar(d1), espelhar(d2)]);
    }
  } else if (o.musculo) {
    const borda = o.contorno ? `stroke="${C.contorno}" stroke-width="0.55" stroke-linejoin="round"` : '';
    if (o.musculo === 'costas') {
      for (const sx of [-1, 1]) s += `<ellipse cx="${r1(sx * 7.6 * k)}" cy="${r1(91.5 * k)}" rx="${r1(7.2 * g)}" ry="${r1(8.6 * g)}" fill="${C.musS}" ${borda}/>`;
    } else {
      const q = membro(J('quadril'), J('joelho'), COXA_F.map(([t, a, b]) => [t, a - 1.9, b - 1.6]), { gordura: g, de: 0.2, ate: 0.86 });
      s += `<path d="${D(q)}" fill="${C.musP}" ${borda}/><path d="${D(espelhar(q))}" fill="${C.musP}" ${borda}/>`;
    }
  }
  // os braços por cima, cada um com o seu contorno
  for (const l of [d, e]) s += pintar([{ d: l.braco, ...pelePar }, { d: l.ante, ...pelePar }, { d: l.mao, ...pelePar }], o, C, { linhaSoSobre: { cor: C.fundo, esp: 0.75, sobre: [tronco, pelve, d.coxa, e.coxa] } }, luz);
  if (novo) s += pintarMusculos(musculos.filter((m) => DO_BRACO.includes(m.id)), o, C);
  return s;
}
