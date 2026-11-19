// Desenvolvimento na máquina, no motor novo. Os números vêm da ficha (../dados/movimentos/desenvolvimento-maquina.json);
// a máquina, de ../pecas-de-cena/desenvolvimento-maquina.ts (o eixo alto atrás do encosto, os braços que vêm dele para a
// frente com os pegadores atravessados na ponta); o corpo sentado nela e as mãos presas nos pegadores, do núcleo
// ./maquina-de-empurrar.ts (o mesmo do supino na máquina).
//
// Sentado, as costas no encosto, os pés no chão. O assento é regulado para o pegador ficar logo acima da linha dos
// ombros, embaixo, e os braços da máquina começam onde o cotovelo dobra 142° (o dos desenvolvimentos aprovados com a
// carga perto dos ombros). As mãos empurram os pegadores, que andam num arco em volta do eixo (sobem quase na vertical
// e se aproximam), até o cotovelo quase estender (12°), sobre os ombros, e descem.
import ficha from '../dados/movimentos/desenvolvimento-maquina.json';
import { daFicha, fichaSchema } from '../movimento';
import type { Exercicio, Quadro } from '../movimento';
import { DESENVOLVIMENTO_NA_MAQUINA } from '../pecas-de-cena/desenvolvimento-maquina';
import type { Corpo } from '../tabelas';
import { mix } from '../vec';
import { anguloComCotovelo, quadroNaMaquina, regular } from './maquina-de-empurrar';
import type { DesvioDeEmpurrar, OpcoesDeEmpurrar } from './maquina-de-empurrar';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);
const rad = Math.PI / 180;
const a = f('cotovelos.aFrente') * rad;
const O: OpcoesDeEmpurrar = {
  modelo: DESENVOLVIMENTO_NA_MAQUINA,
  amassa: f('assento.amassa'),
  lombar: f('lombar.sentado'),
  pescoco: f('pescoco.compensa'),
  pesMeia: f('pes.meiaDistancia'),
  joelho: f('joelho'),
  prot: 0,
  elev: 0,
  // o cotovelo para fora, um pouco à frente e para baixo
  polo: [-Math.cos(a), -f('cotovelos.desce'), Math.sin(a)],
  alvo: (_corpo, e) => ({ y: e.lado.R.acromioclavicular[1] + f('pegador.acimaDoOmbro'), z: 0 }),
  cotoveloEmCima: f('cotovelo.emCima'),
  cotoveloEmbaixo: f('cotovelo.embaixo'),
};

function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
  const R = regular(corpo, O, F.id);
  let de = R.inicio,
    ate = R.fim;
  let dv: DesvioDeEmpurrar = {};
  if (erro === 'arco') {
    // a lombar arqueia enquanto sobe; em cima, os braços da máquina param onde o cotovelo quase estende com o tronco
    // arqueado
    const cheio: DesvioDeEmpurrar = { lombar: f('erro.arco.lombar'), toracica: f('erro.arco.toracica'), frente: f('erro.arco.bacia') };
    ate = anguloComCotovelo(corpo, O, F.id, R, f('cotovelo.emCima'), cheio, 'arco');
    // o alto das costas e a parte de trás dos ombros ficam no encosto: o corpo vem para a frente o que eles entrariam a
    // mais (a auditoria de 18/11/2026: os braços entravam 3,2 cm nele)
    dv = { lombar: cheio.lombar! * u, toracica: cheio.toracica! * u, frente: cheio.frente! * u, encostoAte: f('erro.arco.ombroNoEncosto') };
  }
  if (erro === 'curta') de = mix(R.inicio, R.fim, f('erro.curta.fracao'));
  return quadroNaMaquina(corpo, O, F.id, R, mix(de, ate, u), f('placas'), dv);
}

export const desenvolvimentoMaquina: Exercicio = {
  ficha: F,
  vistas: ['lateral', 'frontal'],
  quadro,
  // a ficha da técnica: a frente do ombro (principal); a lateral do ombro e o tríceps (secundários)
  papeis: { deltAnt: 'p', deltLat: 's', triceps: 's' },
  trajetorias: { 'mão': (q) => q.esq.lado.R.pegada },
};
