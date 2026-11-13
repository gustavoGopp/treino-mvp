// A mão e o pé em tamanho grande, para a rodada 3: como a mão segura o halter (pegada neutra, vista de lado) e como
// o pé apoia no chão. São desenhos próprios, feitos à mão em cm, pintados no estilo de cada finalista.
import { grupo, misturar, suave } from './tinta.mjs';

/** estilo: { pele, peleSombra, contorno: { cor, esp } | null, ferro, aco, fundo, calcado, sola, descalco, linha } */
const op = (e) => (e.contorno ? { contorno: e.contorno } : {});

/** A mão fechada em volta do cabo do halter, vista de lado (o braço desce de cima). */
export function maoNoHalter(e) {
  const antebraco = suave([[-4.9, 26, 'c'], [-4.4, 15], [-3.5, 7.4], [3.4, 7.4], [4.5, 15], [5.5, 26, 'c']]);
  const punho = suave([[-3.5, 7.8], [-4.7, 5.6], [-5.2, 2.6], [-5.1, -1.0], [-4.3, -3.4], [-2.4, -4.3], [0, -4.4], [2.4, -4.2], [4.0, -3.3], [5.0, -0.8], [5.1, 2.6], [4.6, 5.6], [3.4, 7.8]]);
  const polegar = suave([[2.4, 5.6], [5.0, 4.9], [6.5, 2.4], [6.2, -0.4], [4.9, -1.7], [3.9, -0.4], [4.2, 2.0], [3.0, 3.6]]);
  const linha = e.linha ?? misturar(e.pele, '#16202a', 0.4);
  const dedos = [[[-2.6, 3.0], [-2.75, -0.5], [-2.35, -3.9]], [[-0.1, 3.3], [-0.1, -0.5], [0, -4.2]], [[2.3, 3.0], [2.5, -0.4], [2.2, -3.6]]].map((l) => `<path d="${suave(l, false)}" fill="none" stroke="${linha}" stroke-width="0.4" stroke-linecap="round"/>`).join('');
  const cont = e.contorno ? ` stroke="${e.contorno.cor === 'propria' ? misturar(e.ferro, '#16202a', 0.42) : e.contorno.cor}" stroke-width="${e.contorno.esp}" stroke-linejoin="round"` : '';
  const ferro = `<rect x="-9.5" y="-1.5" width="19" height="3" rx="0.8" fill="${e.aco}"${cont}/><rect x="6.4" y="-6.7" width="9.4" height="13.4" rx="2" fill="${e.ferro}"${cont}/><rect x="-15.8" y="-6.7" width="9.4" height="13.4" rx="2" fill="${e.ferro}"${cont}/>`;
  const pele = { cor: e.pele };
  return ferro + grupo([{ d: antebraco, ...pele }, { d: punho, ...pele }], op(e)) + dedos + grupo([{ d: polegar, ...pele }], e.contorno ? op(e) : { linhaSoSobre: { cor: e.fundo, esp: 0.5, sobre: [punho] } });
}

/** O pé apoiado no chão, visto de lado: descalço (finalista 1) ou de tênis (finalista 10). */
export function peApoiado(e) {
  const canela = [[-3.6, 30, 'c'], [-3.9, 19], [-2.6, 11], [3.6, 11], [3.4, 19], [3.9, 30, 'c']];
  const linha = e.linha ?? misturar(e.pele, '#16202a', 0.4);
  if (e.descalco) {
    const pe = suave([[-2.9, 9.6], [-4.4, 5.2], [-4.6, 2.2], [-3.2, 0.3], [0, 0, 'c'], [5, 0.1], [9, 1.3], [13, 0.5], [17.5, 0, 'c'], [22.6, 0, 'c'], [24.6, 0.9], [24.4, 2.4], [21.2, 3.5], [15.6, 5.3], [9.6, 8.2], [4.6, 10.6], [3.4, 12]]);
    const dedao = `<path d="${suave([[19.2, 4.1], [20.4, 2.2], [20.2, 0.3]], false)}" fill="none" stroke="${linha}" stroke-width="0.4" stroke-linecap="round"/><path d="${suave([[-1.6, 7.4], [0.2, 6.4], [1.6, 7.2]], false)}" fill="none" stroke="${linha}" stroke-width="0.4" stroke-linecap="round"/>`;
    return grupo([{ d: suave(canela), cor: e.pele }, { d: pe, cor: e.pele }], op(e)) + dedao;
  }
  const tenis = suave([[-4.4, 2.6], [-4.6, 6.8], [-3.5, 10.4], [-1, 12.2], [2.6, 12.6], [6.6, 11.6], [10.2, 9.2], [15, 7.2], [20, 5.6], [23.4, 3.9], [24.2, 2.6, 'c'], [-4.4, 2.6, 'c']]);
  const sola = suave([[-4.6, 2.9, 'c'], [24.4, 2.9, 'c'], [25, 1.4], [23.6, 0, 'c'], [-3.4, 0, 'c'], [-4.8, 1.2]]);
  const cano = `<path d="${suave([[-3.2, 10.6], [0.4, 9.2], [4.6, 10.2]], false)}" fill="none" stroke="${e.linhaTenis ?? '#8a98a3'}" stroke-width="0.45" stroke-linecap="round"/>` + [[7.2, 10.4, 9.4, 7.6], [10.4, 8.6, 12.4, 6.0], [13.6, 7.2, 15.4, 4.9]].map(([x1, y1, x2, y2]) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${e.linhaTenis ?? '#8a98a3'}" stroke-width="0.45" stroke-linecap="round"/>`).join('');
  return grupo([{ d: suave(canela), cor: e.pele }], op(e)) + grupo([{ d: tenis, cor: e.calcado }, { d: sola, cor: e.sola }], op(e)) + cano;
}
