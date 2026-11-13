// A figura das pranchas dos conceitos (etapa 3): o mesmo corpo de medidas reais, desenhado de jeitos diferentes
// conforme o conceito. Cada conceito é uma ficha (ver conceitos.mjs) que diz a linguagem das formas (curva, recorte,
// barra), se há contorno ou folga, a roupa, as juntas, a sombra e como o músculo aparece. Os perfis das partes do corpo
// e os grupos musculares vêm do desenho de prova (boneco-prova.mjs e musculos-prova.mjs), feitos à mão.
// Vistas: 'lado' (olhando para a direita), 'frente' e 'costas' (em pé). Tudo em cm, y para cima.
import { ANTE_F, ANTE_L, BRACO_F, BRACO_L, CABECA_F, CABECA_L, CABELO_F, CABELO_L, CANELA_F, CANELA_L, COXA_F, COXA_L, MAO_F, MAO_PEGADA, MAO_SOLTA, PELVE_F, PELVE_L, PESCOCO_L, SHORT_F, TENIS_F, TENIS_L, TRONCO_F, TRONCO_L } from './boneco-prova.mjs';
import { DE_COSTAS, DE_FRENTE, DE_LADO, afastamento, montar } from './musculos-prova.mjs';
import { colocar, comSombra, entre, espelhar, faixa, foraDe, grupo, membro, menos, misturar, normal, r1, recorte, soma, suave, tam, uni, vezes } from './tinta.mjs';

const p2 = (v) => [v[0], v[1]];
const pt = (p) => `${r1(p[0])} ${r1(p[1])}`;
// tons de pele (ideia 28: a pessoa escolhe em "Meus dados"); o padrão é o 'media'
const PELES = {
  clara: { claro: { pele: '#efc8a8', peleSombra: '#d5a683', peleLuz: '#f8ddc5', linhaMus: '#d0a07c', musculoParado: '#f4d2b6' }, escuro: { pele: '#e6bd9c', peleSombra: '#c59a78', peleLuz: '#f1d2b8', linhaMus: '#c39874', musculoParado: '#ecc6a7' } },
  morena: { claro: { pele: '#b97f57', peleSombra: '#9a643f', peleLuz: '#cd966e', linhaMus: '#9c6742', musculoParado: '#c48a62', cabelo: '#1f1a17', musS: '#e39f8c', musSb: '#b8705c' }, escuro: { pele: '#b47a53', peleSombra: '#93603c', peleLuz: '#c8926a', linhaMus: '#97633f', musculoParado: '#bf855d', cabelo: '#6b5546', musS: '#e39f8c', musSb: '#b8705c' } },
  escura: { claro: { pele: '#7f5237', peleSombra: '#653f28', peleLuz: '#97664a', linhaMus: '#643f29', musculoParado: '#8b5c40', cabelo: '#17120f', musP: '#de5d4b', musPb: '#b23f2f', musS: '#d99380', musSb: '#b06a57', musA: '#d08571' }, escuro: { pele: '#8a5b3f', peleSombra: '#6e452d', peleLuz: '#a17053', linhaMus: '#6d4630', musculoParado: '#966548', cabelo: '#57463b', musP: '#de5d4b', musPb: '#b23f2f', musS: '#d99380', musSb: '#b06a57', musA: '#d08571' } },
};
// boné: [para a frente, para cima] a partir da base do crânio (de lado) e metade direita (de frente)
const BONE_L = [[-1.2, 4.2], [-0.4, 8.4], [3.6, 12.5], [9.2, 14.1], [14.6, 12.7], [18.2, 8.9], [19.2, 6.2], [10, 6.0], [3, 4.4]];
const ABA_L = [[17.4, 7.9], [24.4, 6.1], [25.1, 4.9], [19, 4.9], [17.6, 5.6]];
const BONE_F = [[0, 14.2], [-5, 13.4], [-8.6, 10], [-9.4, 5.3], [-4, 6.3], [0, 6.7]];
const ABA_F = [[-6.9, 6.5], [-4.2, 4.5], [0, 3.9], [4.2, 4.5], [6.9, 6.5], [0, 7.1]];
// polegar por cima da mão que segura (de lado) e da mão solta (de frente), e as linhas dos dedos
const POLEGAR_L = [[1.2, 3.0], [4.6, 6.0], [8.2, 6.6], [9.6, 5.2], [7, 4.0], [3.6, 2.0]];
const DEDOS_L = [[[7.2, 2.4], [9.8, 1.8]], [[7.5, 0], [10.3, -0.5]], [[7.1, -2.4], [9.5, -3.1]]];
const POLEGAR_F = [[1.6, 1.4], [5, 3.5], [8.4, 4.1], [9.3, 2.9], [6.4, 1.9], [3, 0.5]];
// mão espalmada no chão, vista de lado: [do punho para a ponta dos dedos, para cima]
const MAO_CHAO = [[-1.6, 1.9], [3, 2.1], [9, 0.7], [16, -0.9], [18.6, -1.7], [18.4, -2.3, 'c'], [-1.6, -2.3, 'c']];

/* ============================== construtores de forma ============================== */
/** Polígono com os cantos levemente arredondados (papel recortado). */
function poli(pts, r = 1.1) {
  const n = pts.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = pts[(i + n - 1) % n], b = pts[i], c = pts[(i + 1) % n];
    const ab = tam(menos(a, b)), cb = tam(menos(c, b)), k = Math.min(r, ab / 2.2, cb / 2.2);
    const e = soma(b, vezes(uni(menos(a, b)), k)), s = soma(b, vezes(uni(menos(c, b)), k));
    d += `${i ? 'L' : 'M'}${pt(e)}Q${pt(b)} ${pt(s)}`;
  }
  return d + 'Z';
}
/** Barra de pontas redondas, de `a` a `b`, com meia-largura `w`. */
function capsula(a, b, w) {
  const u = uni(menos(b, a)), n = normal(u);
  const p1 = soma(a, vezes(n, w)), q1 = soma(b, vezes(n, w)), q2 = soma(b, vezes(n, -w)), p4 = soma(a, vezes(n, -w));
  return `M${pt(p1)}L${pt(q1)}A${r1(w)} ${r1(w)} 0 0 0 ${pt(q2)}L${pt(p4)}A${r1(w)} ${r1(w)} 0 0 0 ${pt(p1)}Z`;
}
const circulo = (c, r) => `M${r1(c[0] - r)} ${r1(c[1])}A${r1(r)} ${r1(r)} 0 1 0 ${r1(c[0] + r)} ${r1(c[1])}A${r1(r)} ${r1(r)} 0 1 0 ${r1(c[0] - r)} ${r1(c[1])}Z`;
/** Um membro de papel recortado: três estações de cada lado e as pontas em bico chanfrado. */
function membroReto(a, b, perfil, g, { de = 0, ate = 1, fim = 'bico' } = {}) {
  const u = uni(menos(b, a)), n = normal(u), L = tam(menos(b, a));
  const em = (t, o) => soma(soma(a, vezes(u, t * L)), vezes(n, o));
  const f = (t) => afastamento(perfil, g, [t, 'f+0']), tr = (t) => afastamento(perfil, g, [t, 't+0']);
  const ts = [de, (de + ate) / 2, ate];
  const bico = (t, s) => em(t + (s * ((f(t) - tr(t)) / 2) * 0.55) / L, (f(t) + tr(t)) / 2);
  const pts = ts.map((t) => em(t, f(t)));
  if (fim === 'bico') pts.push(bico(ate, 1));
  pts.push(...ts.slice().reverse().map((t) => em(t, tr(t))));
  pts.push(bico(de, -1));
  return pts;
}
/** Tira os pontos intermediários de um desenho feito para curvas: sobra um polígono de poucos lados. */
const rarear = (pts, passo = 2) => pts.filter((_, i) => i % passo === 0);

/* ============================== cores ============================== */
const FUNDO = { claro: '#f7f9fa', escuro: '#10171b' };
/** Cores comuns a todos os conceitos; cada conceito acrescenta ou troca as suas em `cores(tema)`. */
function paleta(c, tema) {
  const claro = tema === 'claro';
  const base = {
    fundo: FUNDO[tema], chao: claro ? '#d5dce1' : '#33414b', ferro: claro ? '#27343f' : '#cfd8de', aco: '#8a98a3',
    contorno: claro ? '#1d2a36' : '#e7eef2',
    pele: claro ? '#d9a47c' : '#cf9a72', peleSombra: claro ? '#bd865f' : '#a87852', peleLuz: claro ? '#e7b993' : '#dcae88',
    cabelo: claro ? '#2b2420' : '#8b6f5a',
    roupa: claro ? '#55708c' : '#7f96ad', roupaSombra: claro ? '#435b74' : '#667c93', short: claro ? '#2c3d50' : '#a9b8c6', shortSombra: claro ? '#22303f' : '#8c9cab',
    calcado: claro ? '#27343f' : '#e7eef2', sola: claro ? '#8a98a3' : '#8a98a3',
    musP: '#cb5747', musPb: '#a43d2d', musS: '#eaa594', musSb: '#c77f6c', musA: '#d98a76',
    linhaMus: claro ? '#c08b64' : '#a67750', musculoParado: claro ? '#dfad87' : '#d5a27b',
    pino: claro ? '#5d4a3c' : '#2a1f18',
  };
  const C = { ...base, ...(c.tom ? PELES[c.tom][tema] : {}), ...(c.cores ? c.cores(tema, base) : {}) };
  C.bone ??= C.short;
  // a roupa em véu (quando o músculo aparece por baixo dela): meio caminho entre o tecido calmo e a pele
  C.roupaVeu ??= misturar(C.pele, claro ? '#aeb7bf' : '#5d6975', 0.5);
  C.shortVeu ??= misturar(C.pele, claro ? '#6a7682' : '#3d4954', 0.5);
  return C;
}

/* ============================== músculos ============================== */
const DO_BRACO = ['triceps', 'biceps', 'deltoide', 'antebraco'];
const DO_TRONCO = ['peitoral', 'abdomen', 'dorsal', 'obliquos', 'trapezio'];
/**
 * Pinta os músculos. `papeis` diz quem trabalha: 'p' principal (cor cheia, borda e divisões), 's' secundário (tom
 * claro, borda), 'a' só ajuda (listras). `parados`: 'nada' | 'linhas' | 'cheio' (os grupos que não trabalham).
 * `veus`: peças de roupa em véu ({ ds, cor }), debaixo das quais o músculo aparece misturado com o tecido.
 * `soFora`: caminhos (roupa opaca) fora dos quais os músculos parados podem aparecer.
 */
function musculos(formas, papeis, C, { parados = 'nada', veus = [], soFora = null, fino = 1 } = {}) {
  const linha = (d, cor, esp) => `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${r1(esp * fino)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const cheio = (f, cor, borda, div = true) => `<path d="${suave(f.pts)}" fill="${cor}" stroke="${borda}" stroke-width="${r1(0.4 * fino)}" stroke-linejoin="round"/>${div ? f.div.map((l) => linha(suave(l, false), borda, 0.35)).join('') : ''}`;
  let quietos = '', ativos = '';
  for (const f of formas) {
    const r = papeis?.[f.id];
    if (!r) {
      if (parados === 'cheio') quietos += cheio(f, C.musculoParado, C.linhaMus);
      else if (parados === 'linhas') quietos += linha(suave(f.pts), C.linhaMus, 0.4) + f.div.map((l) => linha(suave(l, false), C.linhaMus, 0.3)).join('');
      continue;
    }
    const desenhar = (mist) => {
      const m = (cor) => (mist ? misturar(cor, mist, 0.38) : cor);
      if (r === 'p') return cheio(f, m(C.musP), m(C.musPb));
      if (r === 's') return cheio(f, m(C.musS), m(C.musSb), false);
      // só ajuda: listras na cor do secundário, com a borda tracejada
      const id = `lis${musculos.n++}`;
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="2.4" height="2.4" patternTransform="rotate(45)"><rect width="1.1" height="2.4" fill="${m(C.musA)}"/></pattern><path d="${suave(f.pts)}" fill="url(#${id})" stroke="${m(C.musSb)}" stroke-width="${r1(0.4 * fino)}" stroke-dasharray="1.4 1.1" stroke-linejoin="round"/>`;
    };
    if (veus.length) ativos += foraDe(veus.flatMap((v) => v.ds), desenhar(null)) + veus.map((v) => recorte(v.ds, desenhar(v.cor))).join('');
    else ativos += desenhar(null);
  }
  if (quietos && soFora?.length) quietos = foraDe(soFora, quietos);
  return quietos + ativos;
}
musculos.n = 0;
/** Zera a numeração das listras (para a mesma prancha sair sempre igual). */
export const zerarFigura = () => {
  musculos.n = 0;
  degrade.n = 0;
};

/* ============================== preenchimentos ============================== */
/** Degradê suave por parte ("massa leve"): da luz, em cima, para a sombra, embaixo. */
function degrade(f) {
  const id = `dg${degrade.n++}`;
  return `<linearGradient id="${id}" gradientUnits="objectBoundingBox" x1="0.15" y1="1" x2="0.85" y2="0"><stop offset="0" stop-color="${f.sombra ?? f.cor}"/><stop offset="0.55" stop-color="${f.cor}"/><stop offset="1" stop-color="${f.luz ?? f.cor}"/></linearGradient><path d="${f.d}" fill="url(#${id})"/>`;
}
degrade.n = 0;

/** Um grupo de formas pintado conforme o conceito: contorno único, ou folga clara sobre o que já está desenhado. */
function pintar(formas, c, C, { sobre = [], semLinhaSobre = null, luz = [1.9, 2.4] } = {}) {
  const op = {};
  if (c.contorno) {
    op.contorno = { cor: c.contornoNaCor ? 'propria' : C.contorno, esp: c.contorno };
    if (semLinhaSobre) op.semLinhaSobre = semLinhaSobre;
  } else if (c.folga && sobre.length) op.linhaSoSobre = { cor: C.fundo, esp: c.folga, sobre };
  if (c.sombra === 'recortada') op.preencher = comSombra(luz);
  else if (c.sombra === 'degrade') op.preencher = degrade;
  return grupo(formas, op);
}
/** Marca de junta: 'pino' (ponto escuro, de marionete) ou 'mira' (círculo com cruz, de prancheta). */
function junta(tipo, p, C) {
  if (tipo === 'pino') return `<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="1.45" fill="${C.pino}"/><circle cx="${r1(p[0] - 0.35)}" cy="${r1(p[1] + 0.35)}" r="0.45" fill="${C.peleLuz}"/>`;
  return `<g fill="none" stroke="${C.mira ?? C.contorno}" stroke-width="0.4"><circle cx="${r1(p[0])}" cy="${r1(p[1])}" r="2.1" fill="${C.fundo}"/><path d="M${r1(p[0] - 3.2)} ${r1(p[1])}H${r1(p[0] + 3.2)}M${r1(p[0])} ${r1(p[1] - 3.2)}V${r1(p[1] + 3.2)}"/></g>`;
}
/** O halter do goblet, em pé na frente do peito (de lado). */
function halter(par, c, C) {
  const [a, b] = par, u = uni(menos(b, a)), L = tam(menos(b, a)), ang = (Math.atan2(u[1], u[0]) * 180) / Math.PI;
  const ret = (t0, t1, w, rx) => {
    const m = entre(a, b, (t0 + t1) / 2), comp = (t1 - t0) * L;
    return `<rect x="${r1(-comp / 2)}" y="${r1(-w / 2)}" width="${r1(comp)}" height="${r1(w)}" rx="${rx}" transform="translate(${pt(m)}) rotate(${r1(ang)})"`;
  };
  const cont = c.contorno ? ` stroke="${C.contorno}" stroke-width="${c.contorno}" stroke-linejoin="round"` : '';
  return `${ret(0.25, 0.75, 3.2, 1)} fill="${C.aco}"${cont}/>${ret(0, 0.31, 13.4, c.forma === 'recorte' ? 1 : 2.4)} fill="${C.ferro}"${cont}/>${ret(0.69, 1, 13.4, c.forma === 'recorte' ? 1 : 2.4)} fill="${C.ferro}"${cont}/>`;
}

/* ============================== a figura ============================== */
/**
 * Desenha a figura.
 *  pose: os pontos de poses.mjs na vista certa ('lateral' para 'lado'; 'frontal' para 'frente' e 'costas')
 *  vista: 'lado' | 'frente' | 'costas'
 *  c: a ficha do conceito
 *  o: { tema, papeis (quem trabalha; sem isso, não mostra músculo), halter: [a, b], maoNoChao }
 */
export function figura(pose, vista, c, o = {}) {
  const tema = o.tema ?? 'claro', C = paleta(c, tema);
  const esc = { corpo: 1, cabeca: 1, extremo: 1, gordura: 1, ...(c.escala ?? {}) };
  const p = esc.corpo === 1 ? pose : escalar(pose, esc.corpo);
  const g = esc.gordura * esc.corpo;
  const mostra = !!o.papeis;
  // a roupa: no modo Músculos, se o conceito mostra o músculo por baixo da roupa, ela vira véu
  // cada peça de roupa só vira véu quando há um músculo que trabalha debaixo dela; fora disso é roupa de verdade,
  // opaca, e nada aparece por baixo (na rodada 3, o short em véu sem motivo deixava os glúteos marcados de costas)
  const ativo = (ids) => mostra && ids.some((id) => o.papeis[id]);
  const veuRegata = c.musculo === 'veu' && c.roupa === 'regata-short' && ativo(['peitoral', 'abdomen', 'dorsal', 'obliquos', 'trapezio']);
  const veuShort = c.musculo === 'veu' && !!c.roupa && ativo(['gluteo', 'quadriceps', 'adutores', 'posteriores']);
  const temRegata = c.roupa === 'regata-short', temShort = !!c.roupa;
  const par = (cor, sombra, luz) => ({ cor, sombra: sombra ?? cor, luz: luz ?? cor });
  const pelePar = par(C.pele, C.peleSombra, C.peleLuz);
  const regataPar = !temRegata ? pelePar : veuRegata ? par(C.roupaVeu) : par(C.roupa, C.roupaSombra, C.roupaLuz);
  const shortPar = !temShort ? pelePar : veuShort ? par(C.shortVeu) : par(C.short, C.shortSombra, C.shortLuz);
  const pePar = c.descalco ? pelePar : par(C.calcado);
  const cabeloPar = par(C.cabelo);
  const R = p.R, J = (n) => p2(R[n]);
  const curva = (pts) => (c.forma === 'recorte' ? poli(rarear(pts.map((q) => [q[0], q[1]]))) : suave(pts));
  const parte = (a, b, perfil, nome, op = {}) => {
    if (c.forma === 'barra') return capsula(op.de ? entre(a, b, op.de) : a, op.ate ? entre(a, b, op.ate) : b, (c.barras[nome] ?? 5) * g * (op.gordura ?? 1));
    if (c.forma === 'recorte') return poli(membroReto(a, b, perfil, g * (op.gordura ?? 1), op));
    return suave(membro(a, b, perfil, { ...op, gordura: g * (op.gordura ?? 1) }));
  };
  const parados = c.definicao ?? 'nada';
  const fino = 1;
  // no pictograma não há forma de músculo: a parte do corpo que trabalha fica inteira na cor do músculo
  const zonaDe = (ids, padrao) => {
    if (c.forma !== 'barra' || !mostra) return padrao;
    const r = ids.map((id) => o.papeis[id]).find(Boolean);
    return r === 'p' ? par(C.musP) : r === 's' ? par(C.musS) : r === 'a' ? par(C.musA) : padrao;
  };
  const Z = { coxa: zonaDe(['quadriceps'], pelePar), short: zonaDe(['quadriceps'], shortPar), pelve: zonaDe(['gluteo'], shortPar), tronco: zonaDe(['peitoral', 'dorsal'], regataPar), braco: zonaDe(['triceps', 'biceps', 'deltoide'], pelePar) };
  let s = '';

  if (vista === 'lado') {
    const espinha = p.coluna.slice(0, p.iC7 + 1).map(p2).reverse();
    const acum = [0];
    for (let i = 1; i < espinha.length; i++) acum.push(acum[i - 1] + tam(menos(espinha[i], espinha[i - 1])));
    const noTronco = (q) => {
      const alvo = Math.max(0, Math.min(1, q[0])) * acum[acum.length - 1];
      let i = 1;
      while (i < espinha.length - 1 && acum[i] < alvo) i++;
      const u = (alvo - acum[i - 1]) / (acum[i] - acum[i - 1] || 1);
      const n = normal(uni(menos(espinha[Math.min(i + 1, espinha.length - 1)], espinha[Math.max(i - 2, 0)])));
      return soma(entre(espinha[i - 1], espinha[i], u), vezes(n, afastamento(TRONCO_L, g, q)));
    };
    const rc = p.refs.cabeca, rp = p.refs.pelve, kc = esc.cabeca * esc.corpo;
    const perfilG = (perfil) => perfil.map(([t, f, tr]) => [t, f * g, tr * g]);
    let tronco, pelve, pescoco, cabeca, cabelo;
    if (c.forma === 'barra') {
      // tronco e bacia como duas barras emendadas (a de cima com a cor da regata, a de baixo com a do short); a
      // cabeça é um círculo solto
      tronco = capsula(noTronco([0.1, 9.6]), noTronco([0.8, 9.3]), c.barras.tronco * g);
      pelve = capsula(noTronco([0.84, 9.2]), soma(p2(rp.o), vezes(rp.y, -0.5)), c.barras.tronco * g * 0.98);
      pescoco = null;
      cabeca = circulo(soma(soma(p2(rc.o), vezes(rc.z, 9.6 * kc)), vezes(rc.y, 3.2 * kc)), c.barras.cabeca * kc);
      cabelo = null;
    } else {
      tronco = curva(faixa(espinha, perfilG(TRONCO_L)));
      pescoco = curva(faixa(p.coluna.slice(p.iC7, p.iCranio + 1).map(p2).reverse(), perfilG(PESCOCO_L)));
      cabeca = c.forma === 'recorte' ? poli(rarear(colocar(CABECA_L, p2(rc.o), rc.z, rc.y, kc), 2), 1.6) : suave(colocar(CABECA_L, p2(rc.o), rc.z, rc.y, kc));
      cabelo = c.forma === 'recorte' ? poli(colocar([[9.4, 13.8], [16.6, 10.4], [12.2, 7.4], [9.8, 1.4], [5.6, -1.6], [2.6, -4.8], [-0.4, -3.4], [-1.7, 3], [1.6, 10.6]], p2(rc.o), rc.z, rc.y, kc), 1) : suave(colocar(CABELO_L, p2(rc.o), rc.z, rc.y, kc));
      pelve = curva(colocar(PELVE_L, p2(rp.o), rp.z, rp.y, g));
    }
    const coxa = parte(J('quadril'), J('joelho'), COXA_L, 'coxa');
    const canela = parte(J('joelho'), J('tornozelo'), CANELA_L, 'canela');
    const short = parte(J('quadril'), J('joelho'), COXA_L, 'coxa', { gordura: 1.07, ate: 0.44, fim: 'reta' });
    const uPe = uni(menos(J('ponta'), J('calcanhar')));
    const pePts = colocar(TENIS_L, J('calcanhar'), uPe, normal(uPe), esc.extremo * esc.corpo * (c.descalco ? 0.93 : 1));
    const pe = c.forma === 'recorte' ? poli(rarear(pePts, 2), 1) : suave(pePts);
    const sola = !c.descalco && c.sola ? suave(colocar([[-1.2, 1.3], [27.3, 1.3], [26, 0, 'c'], [0.3, 0, 'c']], J('calcanhar'), uPe, normal(uPe), esc.extremo * esc.corpo)) : null;
    const braco = parte(J('ombro'), J('cotovelo'), BRACO_L, 'braco');
    const maoNoChao = !!o.maoNoChao;
    const fimDoAnte = c.forma === 'barra' && !maoNoChao ? J('pegada') : J('punho');
    const ante = parte(J('cotovelo'), fimDoAnte, ANTE_L, 'ante');
    const rm = p.refs.maoR, dedos = [-rm.y[0], -rm.y[1]];
    const uMao = maoNoChao ? [1, 0] : uni(dedos[0] || dedos[1] ? dedos : menos(J('pegada'), J('punho')));
    const segura = !!o.halter || !!o.pegada;
    const maoPts = colocar(maoNoChao ? MAO_CHAO : segura ? MAO_PEGADA : MAO_SOLTA, J('punho'), uMao, normal(uMao), esc.extremo * esc.corpo);
    const mao = c.forma === 'barra' && !maoNoChao ? null : c.forma === 'recorte' ? poli(maoNoChao ? maoPts.map((q) => [q[0], q[1]]) : rarear(maoPts, 2), 0.9) : suave(maoPts);

    const onde = { membros: { coxa: [J('quadril'), J('joelho'), COXA_L, g], canela: [J('joelho'), J('tornozelo'), CANELA_L, g], braco: [J('ombro'), J('cotovelo'), BRACO_L, g], ante: [J('cotovelo'), J('punho'), ANTE_L, g] }, tronco: noTronco, pelve: { o: p2(rp.o), ex: rp.z, ey: rp.y, k: g } };
    const todos = c.forma === 'barra' ? [] : montar(DE_LADO, onde);
    const veus = [...(veuRegata ? [{ ds: [tronco], cor: C.roupaVeu }] : []), ...(veuShort ? [{ ds: [pelve, short], cor: C.shortVeu }] : [])];
    const roupaOpaca = [...(temRegata && !veuRegata ? [tronco] : []), ...(temShort && !veuShort ? [pelve, short] : [])];
    const mus = (ids) => (mostra || parados !== 'nada' ? musculos(todos.filter(ids), o.papeis, C, { parados, veus, soFora: roupaOpaca, fino }) : '');
    const desenhadas = [];
    const grupoDe = (formas, extra = {}) => {
      const fs = formas.filter((f) => f.d);
      const out = pintar(fs, c, C, { sobre: desenhadas.slice(), ...extra });
      desenhadas.push(...fs.map((f) => f.d));
      return out;
    };

    // o lado de longe: quando o braço ou a perna do outro lado não coincide com o de perto, ele é desenhado antes,
    // num tom próprio (mais claro no cinza, como no boneco de hoje; mais escuro na cor de pele)
    const JL = (n) => p2(p.L[n]);
    const difere = (ns) => ns.some((n) => tam(menos(JL(n), J(n))) > 1.5);
    const longePar = par(C.peleLonge ?? C.peleSombra);
    if (c.forma !== 'barra' && difere(['quadril', 'joelho', 'tornozelo'])) {
      const uPeL = uni(menos(JL('ponta'), JL('calcanhar')));
      s += grupoDe([{ d: parte(JL('quadril'), JL('joelho'), COXA_L, 'coxa'), ...longePar }, { d: parte(JL('joelho'), JL('tornozelo'), CANELA_L, 'canela'), ...longePar }, { d: suave(colocar(TENIS_L, JL('calcanhar'), uPeL, normal(uPeL), esc.extremo * esc.corpo * (c.descalco ? 0.93 : 1))), ...(c.descalco ? longePar : pePar) }]);
    }
    if (c.forma !== 'barra' && difere(['ombro', 'cotovelo', 'punho'])) {
      const rl = p.refs.maoL, dl = [-rl.y[0], -rl.y[1]], uL = uni(dl[0] || dl[1] ? dl : menos(JL('pegada'), JL('punho')));
      s += grupoDe([{ d: parte(JL('ombro'), JL('cotovelo'), BRACO_L, 'braco'), ...longePar }, { d: parte(JL('cotovelo'), JL('punho'), ANTE_L, 'ante'), ...longePar }, { d: suave(colocar(MAO_SOLTA, JL('punho'), uL, normal(uL), esc.extremo * esc.corpo)), ...longePar }]);
    }
    if (c.pecas) {
      // marionete: cada peça com a sua folga, e o pino nas juntas
      s += grupoDe([{ d: pescoco, ...pelePar }]) + grupoDe([{ d: tronco, ...Z.tronco }]) + grupoDe([{ d: cabeca, ...pelePar }, ...(c.cabelo ? [{ d: cabelo, ...cabeloPar }] : [])]);
      s += grupoDe([{ d: pelve, ...Z.pelve }]);
      s += mus((m) => DO_TRONCO.includes(m.id));
      s += grupoDe([{ d: coxa, ...Z.coxa }, ...(temShort ? [{ d: short, ...Z.short }] : [])]) + grupoDe([{ d: canela, ...pelePar }]) + grupoDe([{ d: pe, ...pePar }]);
    } else {
      const corpo = [{ d: pescoco, ...pelePar }, { d: tronco, ...Z.tronco }, { d: pelve, ...Z.pelve }, { d: cabeca, ...pelePar }];
      if (c.cabelo && cabelo) corpo.push({ d: cabelo, ...cabeloPar });
      if (c.forma === 'barra') {
        s += grupoDe([{ d: cabeca, ...pelePar }]) + grupoDe([{ d: tronco, ...Z.tronco }, { d: pelve, ...Z.pelve }]);
      } else s += grupoDe(corpo);
      s += mus((m) => DO_TRONCO.includes(m.id));
      const perna = [{ d: coxa, ...Z.coxa }, { d: canela, ...pelePar }, { d: pe, ...pePar }];
      if (sola) perna.push({ d: sola, ...par(C.sola) });
      if (temShort) perna.push({ d: short, ...Z.short });
      s += pintar(perna, c, C, { sobre: [tronco, pescoco].filter(Boolean), semLinhaSobre: c.forma === 'barra' ? null : [pelve] });
      desenhadas.push(coxa, canela, pe, short);
    }
    if (c.bone) s += pintar([{ d: suave(colocar(BONE_L, p2(rc.o), rc.z, rc.y, kc)), ...par(C.bone) }, { d: suave(colocar(ABA_L, p2(rc.o), rc.z, rc.y, kc)), ...par(C.bone) }], c, C, { sobre: [cabeca, cabelo].filter(Boolean) });
    s += mus((m) => !DO_TRONCO.includes(m.id) && !DO_BRACO.includes(m.id));
    if (o.halter) s += halter(o.halter.map((q) => vezes(q, esc.corpo)), c, C);
    if (o.atrasDoBraco) s += o.atrasDoBraco(C);
    if (c.pecas) s += grupoDe([{ d: braco, ...pelePar }]) + grupoDe([{ d: ante, ...pelePar }]) + grupoDe([{ d: mao, ...pelePar }]);
    else s += grupoDe([{ d: braco, ...Z.braco }, { d: ante, ...pelePar }, { d: mao, ...pelePar }]);
    if (c.mao === 'polegar' && mao && !maoNoChao && segura) {
      const km = esc.extremo * esc.corpo, la = (pts) => colocar(pts, J('punho'), uMao, normal(uMao), km);
      s += pintar([{ d: suave(la(POLEGAR_L)), ...pelePar }], c, C, { sobre: [mao] });
      s += DEDOS_L.map((l) => `<path d="${suave(la(l), false)}" fill="none" stroke="${C.peleSombra}" stroke-width="0.45" stroke-linecap="round"/>`).join('');
    }
    s += mus((m) => DO_BRACO.includes(m.id));
    if (c.juntas) for (const n of c.juntas === 'pino' ? ['quadril', 'joelho', 'tornozelo', 'ombro', 'cotovelo', 'punho'] : ['quadril', 'joelho', 'ombro', 'cotovelo']) s += junta(c.juntas, J(n), C);
    return s;
  }

  /* ----- de frente e de costas, em pé ----- */
  const k = esc.corpo, deCostas = vista === 'costas';
  const E = (pts) => pts.map((q) => (q[2] ? [q[0] * k * (esc.largura ?? 1), q[1] * k, q[2]] : [q[0] * k * (esc.largura ?? 1), q[1] * k]));
  const inteiro = (metade) => [...metade, ...espelhar(metade).slice(metade[metade.length - 1][0] === 0 ? 1 : 0, metade[0][0] === 0 ? -1 : undefined)];
  const rc = p.refs.cabeca, kc = esc.cabeca * k;
  const cab = (pts) => pts.map((q) => [rc.o[0] + q[0] * kc, rc.o[1] + q[1] * kc]);
  let tronco, pelve, cabeca, cabelo, pescoco, decote;
  if (c.forma === 'barra') {
    tronco = poli(E([[-16.5, 146.5], [16.5, 146.5], [13.2, 106], [-13.2, 106]]), 4.5);
    pelve = poli(E([[-13.2, 110], [13.2, 110], [15.4, 86], [-15.4, 86]]), 4);
    cabeca = circulo([rc.o[0], rc.o[1] + 3.2 * kc], c.barras.cabeca * kc);
    cabelo = null;
    pescoco = null;
    decote = null;
  } else {
    tronco = curva(inteiro(E(TRONCO_F)));
    pelve = curva(inteiro(E(temShort ? SHORT_F : PELVE_F)));
    cabeca = c.forma === 'recorte' ? poli(rarear(inteiro(cab(CABECA_F)), 2), 1.6) : suave(inteiro(cab(CABECA_F)));
    const cabeloF = deCostas ? CABECA_F.map(([x, y]) => [x * 1.05, y > -4 ? y * 1.04 : y * 0.62]) : CABELO_F;
    cabelo = c.forma === 'recorte' ? poli(inteiro(cab(deCostas ? rarear(cabeloF, 2) : [[0, 13.9], [-6.2, 12.2], [-9.2, 4.6], [-8.2, 3.2], [-6, 7.4], [0, 9]])), 1) : suave(inteiro(cab(cabeloF)));
    pescoco = suave([[-5.4 * g, 158 * k, 'c'], [-5.5 * g, 152.5 * k], [-6.6 * g, 148.6 * k, 'c'], [6.6 * g, 148.6 * k, 'c'], [5.5 * g, 152.5 * k], [5.4 * g, 158 * k, 'c']]);
    decote = suave(E([[-6, 153, 'c'], [-5.5, 150], [-3.4, 147.5], [0, 146.5], [3.4, 147.5], [5.5, 150], [6, 153, 'c']]));
  }
  const abrir = (q) => {
    const o0 = J('ombro'), a = (-6 * Math.PI) / 180, dx = q[0] - o0[0], dy = q[1] - o0[1];
    return [o0[0] + dx * Math.cos(a) - dy * Math.sin(a), o0[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  };
  const pendurado = R.punho[1] < R.ombro[1] - 15;
  const cot = pendurado ? abrir(J('cotovelo')) : J('cotovelo'), pun = pendurado ? abrir(J('punho')) : J('punho'), peg = pendurado ? abrir(J('pegada')) : J('pegada');
  const lado = (espelha) => {
    const m = (q) => (espelha ? [-q[0], q[1]] : q);
    // de frente, 'dentro' e 'fora' trocam de lado no espelho: o perfil é lido ao contrário
    const prf = (perfil) => (espelha ? perfil.map(([t, a, b]) => [t, b, a]) : perfil);
    const A = (n) => m(J(n));
    const coxa = parte(A('quadril'), A('joelho'), prf(COXA_F), 'coxa');
    const canela = parte(A('joelho'), A('tornozelo'), prf(CANELA_F), 'canela');
    const shortPerna = c.forma === 'barra' && temShort ? parte(A('quadril'), A('joelho'), prf(COXA_F), 'coxa', { ate: 0.42, gordura: 1.04 }) : null;
    const kPe = c.forma === 'barra' ? 0.78 : 1;
    const pePts0 = E(TENIS_F).map((q) => (q[2] ? [q[0], q[1] * esc.extremo * kPe, q[2]] : [q[0], q[1] * esc.extremo * kPe]));
    const pePts = espelha ? espelhar(pePts0) : pePts0;
    const pe = c.forma === 'recorte' ? poli(pePts.map((q) => [q[0], q[1]]), 1.2) : suave(pePts);
    const braco = parte(A('ombro'), m(cot), prf(BRACO_F), 'braco');
    const ante = parte(m(cot), m(c.forma === 'barra' ? peg : pun), prf(ANTE_F), 'ante');
    const uMao = uni(menos(m(peg), m(pun)));
    const maoPts = colocar(o.halteresDeFrente ? MAO_PEGADA : espelha ? MAO_F.map(([x, y]) => [x, -y]) : MAO_F, m(pun), uMao, normal(uMao), esc.extremo * k);
    const mao = c.forma === 'barra' ? null : c.forma === 'recorte' ? poli(rarear(maoPts, 2), 0.9) : suave(maoPts);
    const naMao = (pts) => colocar(espelha ? pts.map(([x, y]) => [x, -y]) : pts, m(pun), uMao, normal(uMao), esc.extremo * k);
    const polegar = c.mao === 'polegar' && mao && !o.halteresDeFrente ? suave(naMao(POLEGAR_F)) : null;
    const dedo = polegar ? suave(naMao([[9.6, 0.5], [15.6, 0.2]]), false) : null;
    return { coxa, canela, pe, braco, ante, mao, shortPerna, polegar, dedo };
  };
  const d = lado(false), e = lado(true);
  const desenhadas = [];
  const grupoDe = (formas, extra = {}) => {
    const fs = formas.filter((f) => f.d);
    const out = pintar(fs, c, C, { sobre: desenhadas.slice(), luz: [-2.0, 2.3], ...extra });
    desenhadas.push(...fs.map((f) => f.d));
    return out;
  };
  const onde = { membros: { coxa: [J('quadril'), J('joelho'), COXA_F, g], canela: [J('joelho'), J('tornozelo'), CANELA_F, g], braco: [J('ombro'), cot, BRACO_F, g], ante: [cot, pun, ANTE_F, g] }, abs: E, espelhar: true };
  const todos = c.forma === 'barra' ? [] : montar(deCostas ? DE_COSTAS : DE_FRENTE, onde);
  const veus = [...(veuRegata ? [{ ds: [tronco], cor: C.roupaVeu }] : []), ...(veuShort ? [{ ds: [pelve], cor: C.shortVeu }] : [])];
  const roupaOpaca = [...(temRegata && !veuRegata ? [tronco] : []), ...(temShort && !veuShort ? [pelve] : [])];
  const mus = (ids) => (mostra || parados !== 'nada' ? musculos(todos.filter(ids), o.papeis, C, { parados, veus, soFora: roupaOpaca, fino }) : '');

  if (c.pecas || c.forma === 'barra') {
    if (c.forma === 'barra') {
      for (const l of [d, e]) s += grupoDe([{ d: l.canela, ...pelePar }, { d: l.pe, ...pePar }]) + grupoDe([{ d: l.coxa, ...Z.coxa }, { d: l.shortPerna, ...Z.short }]);
      s += pintar([{ d: pelve, ...Z.pelve }, { d: tronco, ...Z.tronco }], c, C, { sobre: [], luz: [-2.0, 2.3] });
      desenhadas.push(pelve, tronco);
    } else {
      for (const l of [d, e]) s += grupoDe([{ d: l.pe, ...pePar }]) + grupoDe([{ d: l.canela, ...pelePar }]) + grupoDe([{ d: l.coxa, ...Z.coxa }, { d: l.shortPerna, ...Z.short }]);
      s += grupoDe([{ d: pescoco, ...pelePar }]) + grupoDe([{ d: pelve, ...Z.pelve }]) + grupoDe([{ d: tronco, ...Z.tronco }, ...(temRegata && !deCostas && decote ? [{ d: decote, ...pelePar }] : [])]);
    }
    s += grupoDe([{ d: cabeca, ...pelePar }, ...(c.cabelo && cabelo ? [{ d: cabelo, ...cabeloPar }] : [])]);
  } else {
    const corpo = [];
    for (const l of [d, e]) corpo.push({ d: l.coxa, ...pelePar }, { d: l.canela, ...pelePar }, { d: l.pe, ...pePar });
    corpo.push({ d: pescoco, ...pelePar }, { d: tronco, ...regataPar }, { d: pelve, ...shortPar });
    if (temRegata && !deCostas) corpo.push({ d: decote, ...pelePar });
    corpo.push({ d: cabeca, ...pelePar });
    if (c.cabelo) corpo.push({ d: cabelo, ...cabeloPar });
    s += grupoDe(corpo);
  }
  if (c.bone) s += pintar([{ d: suave(inteiro(cab(BONE_F))), ...par(C.bone) }, ...(deCostas ? [] : [{ d: suave(cab(ABA_F)), ...par(C.bone) }])], c, C, { sobre: [cabeca, cabelo].filter(Boolean), luz: [-2.0, 2.3] });
  if (c.rostoDeFrente && !deCostas) for (const sx of [-1, 1]) s += `<circle cx="${r1(rc.o[0] + sx * 3.2 * kc)}" cy="${r1(rc.o[1] + 0.6 * kc)}" r="${r1(0.8 * kc)}" fill="${C.cabelo}"/>`;
  s += mus((m) => !DO_BRACO.includes(m.id));
  if (o.halteresDeFrente) for (const sx of [1, -1]) s += halter([[sx * peg[0] - 14.2, peg[1]], [sx * peg[0] + 14.2, peg[1]]], c, C);
  for (const l of [d, e]) {
    if (c.pecas) s += grupoDe([{ d: l.braco, ...pelePar }]) + grupoDe([{ d: l.ante, ...pelePar }]) + grupoDe([{ d: l.mao, ...pelePar }]);
    else s += pintar([{ d: l.braco, ...Z.braco }, { d: l.ante, ...pelePar }, { d: l.mao, ...pelePar }].filter((f) => f.d), c, C, { sobre: desenhadas.slice(), luz: [-2.0, 2.3] });
    if (l.polegar) s += pintar([{ d: l.polegar, ...pelePar }], c, C, { sobre: [l.mao], luz: [-2.0, 2.3] }) + `<path d="${l.dedo}" fill="none" stroke="${C.peleSombra}" stroke-width="0.45" stroke-linecap="round"/>`;
  }
  s += mus((m) => DO_BRACO.includes(m.id));
  if (c.juntas) for (const sx of [1, -1]) for (const q of [J('quadril'), J('joelho'), ...(c.juntas === 'pino' ? [J('tornozelo')] : []), J('ombro'), cot, ...(c.juntas === 'pino' ? [pun] : [])]) s += junta(c.juntas, [sx * q[0], q[1]], C);
  return s;
}

/** Encolhe ou estica a pose inteira em torno do chão (proporção compacta). */
function escalar(p, k) {
  const anda = (v) => {
    if (Array.isArray(v)) return v.length === 3 && typeof v[0] === 'number' ? [v[0] * k, v[1] * k, v[2] * k] : v.map(anda);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([n, x]) => [n, n === 'x' || n === 'y' || n === 'z' ? x : anda(x)]));
    return v;
  };
  return anda(p);
}
