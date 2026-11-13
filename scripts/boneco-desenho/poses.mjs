// Posições das articulações (em cm, já projetadas na vista) das poses usadas nas pranchas do desenho do Boneco.
// Usa o esqueleto com medidas reais da sessão da animação nova (src/engine/novo), só para LER as poses: o desenho
// por cima delas é feito à mão em scripts/boneco-desenho/. Nada aqui muda o motor.
// Uso: node scripts/boneco-desenho/poses.mjs  → imprime o JSON das poses (x para a direita da tela, y para cima).
import { motorNovo } from '../animacao-nova/empacotar.mjs';

const { modulo: m } = await motorNovo();
const corpo = m.CORPOS.homem;
const r1 = (n) => Math.round(n * 10) / 10;
const r3 = (n) => Math.round(n * 1000) / 1000;

/** Projeta um ponto 3D na vista: [x na tela, altura, profundidade (maior = mais perto de quem olha)]. */
const proj = (cam, p) => [r1(p[0] * cam.dir[0] + p[1] * cam.dir[1] + p[2] * cam.dir[2]), r1(p[0] * cam.cima[0] + p[1] * cam.cima[1] + p[2] * cam.cima[2]), r1(p[0] * cam.para[0] + p[1] * cam.para[1] + p[2] * cam.para[2])];

export function pontos(esq, vista) {
  const cam = m.VISTAS[vista];
  const P = (p) => proj(cam, p);
  const lado = (k) => {
    const l = esq.lado[k];
    return {
      quadril: P(l.quadril), joelho: P(l.joelho), tornozelo: P(l.tornozelo), calcanhar: P(l.calcanhar), bola: P(l.bola), ponta: P(l.ponta),
      esterno: P(l.esternoclavicular), acromio: P(l.acromioclavicular), ombro: P(l.ombro), cotovelo: P(l.cotovelo), punho: P(l.punho), pegada: P(l.pegada),
    };
  };
  // direção, na tela, dos eixos de um referencial: "cima" (ao longo do osso) e "frente"
  const Dn = (d) => [r3(d[0] * cam.dir[0] + d[1] * cam.dir[1] + d[2] * cam.dir[2]), r3(d[0] * cam.cima[0] + d[1] * cam.cima[1] + d[2] * cam.cima[2])];
  const eixos = (ref) => ({ o: P(ref.o), x: Dn(ref.x), y: Dn(ref.y), z: Dn(ref.z) });
  return {
    vista,
    refs: { pelve: eixos(esq.pelve), torax: eixos(esq.torax), cabeca: eixos(esq.cabeca), maoR: eixos(esq.lado.R.mao), maoL: eixos(esq.lado.L.mao), peR: eixos(esq.lado.R.pe), peL: eixos(esq.lado.L.pe) },
    pelve: P(esq.pelve.o),
    coluna: esq.nos.map((n) => P(n.ref.o)),
    iT12: esq.iT12, iC7: esq.iC7, iCranio: esq.iCranio,
    torax: P(esq.torax.o),
    cabeca: P(esq.cabeca.o),
    R: lado('R'), L: lado('L'),
  };
}

export const POSES = {
  empe: () => ({ esq: m.resolver(corpo, m.poseEmPe(corpo)), prims: [] }),
  agachamento: () => m.goblet.quadro(corpo, 1),
  flexao: () => m.flexao.quadro(corpo, 1),
  supino: () => m.supinoReto.quadro(corpo, 1),
  puxada: () => m.puxadaUnilateral.quadro(corpo, 1),
};
export const motor = m;
export const corpoPadrao = corpo;

if (import.meta.url === `file://${process.argv[1]}`) {
  const pedidos = [['empe', 'frontal'], ['empe', 'lateral'], ['agachamento', 'lateral'], ['flexao', 'lateral']];
  const saida = {};
  for (const [pose, vista] of pedidos) saida[`${pose}:${vista}`] = pontos(POSES[pose]().esq, vista);
  saida.medidas = { estatura: corpo.m('estatura'), cabecaAltura: (() => { try { return corpo.m('cabeca.altura'); } catch { return null; } })() };
  console.log(JSON.stringify(saida));
}
