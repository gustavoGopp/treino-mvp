// Os grupos musculares do boneco de prova, desenhados à mão por cima de cada parte do corpo, de lado, de frente e de
// costas. Cada músculo é uma lista de pontos presos à parte em que fica (coxa, canela, braço, antebraço, tronco,
// quadril), para acompanhar a pose. São formas simplificadas (a forma geral do músculo, sem fibras): servem para o
// Gustavo comparar maneiras de mostrar o músculo que trabalha, e não como atlas de anatomia.
//
// Como ler um ponto [t, d]: t é a posição ao longo da parte (0 = começo, 1 = fim) e d é o afastamento do eixo, em cm
// (positivo = lado da frente, de lado; lado de dentro, de frente). 'f-0.9' quer dizer "na superfície da frente, 0,9 cm
// para dentro"; 't-0.9' o mesmo na de trás; 'd-0.9' e 'o-0.9' valem para dentro e fora, na vista de frente.
import { colocar, entre, espelhar, menos, normal, soma, uni, vezes } from './tinta.mjs';

const naColuna = (perfil, t, i) => {
  const u = Math.max(perfil[0][0], Math.min(perfil[perfil.length - 1][0], t));
  for (let k = 1; k < perfil.length; k++) if (u <= perfil[k][0]) return perfil[k - 1][i] + ((perfil[k][i] - perfil[k - 1][i]) * (u - perfil[k - 1][0])) / (perfil[k][0] - perfil[k - 1][0]);
  return perfil[perfil.length - 1][i];
};
/** O afastamento em cm de um ponto [t, d], dado o perfil da parte e o quanto ela foi engordada. */
export function afastamento(perfil, g, [t, d]) {
  if (typeof d === 'number') return d * g;
  const lado = d[0], folga = parseFloat(d.slice(1));
  const positivo = lado === 'f' || lado === 'd';
  const sup = naColuna(perfil, t, positivo ? 1 : 2) * g + folga;
  return positivo ? sup : -sup;
}
/** Um ponto num membro reto que vai de `a` a `b`. */
export function noMembro([a, b, perfil, g], pt) {
  const u = uni(menos(b, a)), n = normal(u);
  return soma(entre(a, b, pt[0]), vezes(n, afastamento(perfil, g, pt)));
}

/* ============================== de lado ============================== */
export const DE_LADO = [
  { id: 'peitoral', em: 'tronco', pts: [[0.14, 13.2], [0.2, 17.6], [0.3, 'f-0.9'], [0.4, 'f-0.9'], [0.47, 'f-2.6'], [0.44, 14.6], [0.34, 11.6], [0.22, 10.8]] },
  { id: 'abdomen', em: 'tronco', pts: [[0.52, 'f-1.0'], [0.64, 'f-0.9'], [0.78, 'f-0.9'], [0.9, 'f-0.9'], [0.985, 'f-1.2'], [0.985, 13.6], [0.8, 13.2], [0.64, 14.4], [0.52, 16.0]] },
  { id: 'dorsal', em: 'tronco', pts: [[0.26, 5.4], [0.3, 9.6], [0.44, 9.8], [0.6, 7.6], [0.8, 3.6], [0.86, 0.8], [0.6, 0.2], [0.4, 0.4]] },
  { id: 'gluteo', em: 'pelve', pts: [[-6.6, 9.6], [-9.2, 6.2], [-9.9, 0.6], [-9.0, -4.6], [-5.2, -8.0], [0.2, -7.8], [2.6, -4.6], [2.2, 0.2], [-1.0, 4.6], [-4.2, 8.2]] },
  { id: 'posteriores', em: 'coxa', pts: [[0.14, -3.4], [0.3, 't-0.9'], [0.5, 't-0.9'], [0.7, 't-0.9'], [0.86, 't-1.0'], [0.93, -2.8], [0.78, -3.3], [0.6, -4.0], [0.42, -4.1], [0.26, -3.7]] },
  { id: 'quadriceps', em: 'coxa', pts: [[0.06, 2.6], [0.1, 'f-3.6'], [0.18, 'f-1.1'], [0.3, 'f-0.9'], [0.45, 'f-0.9'], [0.6, 'f-0.9'], [0.74, 'f-0.9'], [0.86, 'f-0.9'], [0.94, 3.4], [0.975, 1.2], [0.94, -1.0], [0.8, -2.0], [0.62, -2.8], [0.44, -2.9], [0.27, -2.2], [0.13, -0.4]], div: [[[0.13, 'f-4.4'], [0.3, 'f-4.5'], [0.5, 'f-4.1'], [0.7, 'f-3.5'], [0.87, 'f-2.7']]] },
  { id: 'panturrilha', em: 'canela', pts: [[0.05, -2.6], [0.14, 't-0.8'], [0.3, 't-0.8'], [0.46, 't-0.9'], [0.6, -4.2], [0.56, -2.0], [0.4, -1.6], [0.2, -1.6]] },
  // os do braço vão por cima do tronco, junto com o braço
  { id: 'triceps', em: 'braco', pts: [[0.3, -1.4], [0.45, 't-0.8'], [0.65, 't-0.7'], [0.85, 't-0.7'], [0.96, -1.6], [0.8, -0.6], [0.5, -0.6]] },
  { id: 'biceps', em: 'braco', pts: [[0.36, 1.0], [0.5, 'f-0.8'], [0.7, 'f-0.7'], [0.88, 'f-0.9'], [0.96, 1.2], [0.8, 0.4], [0.55, 0.4]] },
  { id: 'deltoide', em: 'braco', pts: [[-0.2, 0.3], [-0.12, 5.2], [0.05, 5.8], [0.2, 5.0], [0.34, 2.6], [0.46, 0.2], [0.34, -2.6], [0.2, -4.8], [0.05, -5.4], [-0.12, -4.8]] },
];

/* ============================== de frente e de costas (lado direito do corpo; o esquerdo é o espelho) ============================== */
export const DE_FRENTE = [
  { id: 'trapezio', em: 'abs', pts: [[-5.7, 151.3], [-10, 149.9], [-14.4, 147.6], [-9, 146.3], [-5.6, 147.2]] },
  { id: 'peitoral', em: 'abs', pts: [[-0.8, 143.2], [-7, 144.4], [-13.6, 142.8], [-16.4, 138.4], [-14.8, 133.4], [-10.5, 129.8], [-5, 128.8], [-0.8, 130.2]] },
  { id: 'obliquos', em: 'abs', pts: [[-6.3, 126.2], [-13.4, 125.6], [-13.0, 117.6], [-13.4, 109.4], [-12.2, 104.6], [-6.2, 105.2], [-6.8, 116]] },
  { id: 'abdomen', em: 'abs', unico: true, pts: [[-4.8, 127.2], [0, 127.6], [4.8, 127.2], [5.3, 116], [4.4, 105], [0, 102.8], [-4.4, 105], [-5.3, 116]], div: [[[0, 127.2], [0, 103.4]], [[-4.9, 121.6], [4.9, 121.6]], [[-5.1, 115.8], [5.1, 115.8]], [[-4.9, 110], [4.9, 110]]] },
  { id: 'adutores', em: 'coxa', pts: [[0.09, 2.0], [0.3, 3.6], [0.5, 5.2], [0.6, 'd-0.7'], [0.42, 'd-0.6'], [0.22, 'd-0.6'], [0.08, 'd-1.2']] },
  { id: 'quadriceps', em: 'coxa', pts: [[0.12, -2.0], [0.2, 'o-0.9'], [0.35, 'o-0.9'], [0.5, 'o-0.9'], [0.68, 'o-0.8'], [0.82, 'o-0.7'], [0.9, -3.0], [0.945, -0.4], [0.92, 2.6], [0.84, 'd-0.7'], [0.72, 'd-1.0'], [0.58, 4.7], [0.42, 3.5], [0.26, 1.9], [0.15, 0.4]], div: [[[0.17, -2.7], [0.5, -3.0], [0.86, -1.9]], [[0.2, 0.3], [0.55, 1.7], [0.86, 1.3]]] },
  { id: 'tibial', em: 'canela', pts: [[0.08, -2.2], [0.2, 'o-0.7'], [0.38, 'o-0.7'], [0.56, 'o-1.2'], [0.64, -1.6], [0.5, -0.6], [0.3, -0.4], [0.14, -0.6]] },
  { id: 'panturrilha', em: 'canela', pts: [[0.1, 3.4], [0.2, 'd-0.7'], [0.36, 'd-0.7'], [0.5, 'd-1.0'], [0.5, 2.6], [0.3, 2.4], [0.14, 2.2]] },
  { id: 'biceps', em: 'braco', pts: [[0.3, 0.6], [0.42, 'd-1.0'], [0.6, 'd-0.7'], [0.78, 'd-0.9'], [0.92, 1.4], [0.9, -1.2], [0.74, -2.4], [0.55, -2.6], [0.4, -1.8]] },
  { id: 'deltoide', em: 'braco', pts: [[-0.14, 3.6], [-0.2, -1], [-0.1, -5.0], [0.06, 'o-0.6'], [0.2, 'o-0.6'], [0.42, -3.0], [0.3, -0.4], [0.16, 2.2], [0.02, 4.2]] },
  { id: 'antebraco', em: 'ante', pts: [[0.04, 0], [0.12, 'd-0.8'], [0.3, 'd-0.8'], [0.55, 'd-0.9'], [0.72, 1.2], [0.72, -0.8], [0.5, 'o-0.8'], [0.28, 'o-0.8'], [0.1, 'o-1.0']] },
];
export const DE_COSTAS = [
  { id: 'trapezio', em: 'abs', unico: true, pts: [[0, 153.4], [-5.6, 151], [-14.8, 147.2], [-9.5, 141.5], [-4, 133], [0, 126.5], [4, 133], [9.5, 141.5], [14.8, 147.2], [5.6, 151]] },
  { id: 'dorsal', em: 'abs', pts: [[-5.4, 132.5], [-10.6, 140], [-15.8, 137.5], [-14.6, 128], [-13, 119], [-9, 111.5], [-2.2, 108], [-1.4, 118], [-2.4, 126.4]] },
  { id: 'gluteo', em: 'abs', pts: [[-8.2, 100.4], [-14.1, 98.8], [-15.9, 92.7], [-15.1, 85.6], [-10.3, 82.6], [-3.1, 83.6], [-1.1, 89.2], [-1.3, 96.2], [-4.1, 99.8]] },
  { id: 'posteriores', em: 'coxa', pts: [[0.2, 'o-1.4'], [0.4, 'o-1.2'], [0.6, 'o-1.0'], [0.8, 'o-1.0'], [0.9, -1.5], [0.9, 1.5], [0.8, 'd-1.0'], [0.6, 'd-1.2'], [0.4, 'd-1.6'], [0.22, 'd-2.4']], div: [[[0.26, 0], [0.88, 0]]] },
  { id: 'panturrilha', em: 'canela', pts: [[0.06, -1.6], [0.16, 'o-0.7'], [0.34, 'o-0.7'], [0.52, 'o-1.2'], [0.6, -0.8], [0.6, 0.8], [0.5, 'd-1.0'], [0.34, 'd-0.7'], [0.16, 'd-0.7'], [0.06, 1.6]], div: [[[0.1, 0], [0.56, 0]]] },
  { id: 'triceps', em: 'braco', pts: [[0.3, 0.4], [0.42, 'd-1.0'], [0.62, 'd-0.8'], [0.84, 'd-1.0'], [0.92, 0.6], [0.9, -1.4], [0.72, 'o-0.8'], [0.52, 'o-0.8'], [0.4, -2.4]] },
  { id: 'deltoide', em: 'braco', pts: [[-0.14, 3.6], [-0.2, -1], [-0.1, -5.0], [0.06, 'o-0.6'], [0.2, 'o-0.6'], [0.42, -3.0], [0.3, -0.4], [0.16, 2.2], [0.02, 4.2]] },
  { id: 'antebraco', em: 'ante', pts: [[0.04, 0], [0.12, 'd-0.8'], [0.3, 'd-0.8'], [0.55, 'd-0.9'], [0.72, 1.2], [0.72, -0.8], [0.5, 'o-0.8'], [0.28, 'o-0.8'], [0.1, 'o-1.0']] },
];

/**
 * Põe os músculos de uma lista no lugar. `onde` diz como achar cada parte:
 *  membros: { coxa: [a, b, perfil, g], canela: ..., braco: ..., ante: ... }
 *  tronco: função ([t, d]) → ponto (de lado, o tronco é curvo)
 *  pelve: { o, ex, ey, k } (de lado)
 *  abs: função (pontos em cm, em pé) → pontos (de frente: escala da proporção)
 *  espelhar: true para devolver também o lado esquerdo (vistas de frente e de costas)
 * Devolve [{ id, pts, div }], na ordem da lista.
 */
export function montar(lista, onde) {
  const out = [];
  for (const m of lista) {
    let f;
    if (m.em === 'tronco') f = (q) => onde.tronco(q);
    else if (m.em === 'pelve') f = (q) => colocar([q], onde.pelve.o, onde.pelve.ex, onde.pelve.ey, onde.pelve.k)[0];
    else if (m.em === 'abs') f = (q) => onde.abs([q])[0];
    else f = (q) => noMembro(onde.membros[m.em], q);
    const pts = m.pts.map(f), div = (m.div ?? []).map((l) => l.map(f));
    out.push({ id: m.id, pts, div });
    if (onde.espelhar && !m.unico) out.push({ id: m.id, pts: espelhar(pts), div: div.map((l) => espelhar(l)) });
  }
  return out;
}
