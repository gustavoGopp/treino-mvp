// Crucifixo com halteres no banco plano, no motor novo. Os números vêm da ficha
// (../dados/movimentos/crucifixo-halteres.json); o arco dos braços, do núcleo ./crucifixo-deitado.ts. O corpo deita no
// banco reto como no supino reto aprovado (./supino-reto.ts): o topo da cabeça a `cabeca.folgaNoBanco` cm da ponta do
// banco, os pés firmes no chão. O que se resolve, em vez de receber pronto (como no supino inclinado,
// ./supino-inclinado.ts): a bacia inclina e o quadril desce até as costas e o glúteo apoiarem no estofado (que amassa
// `apoio.amassa` cm), e o pescoço dobra, dentro de uma faixa confortável, até a nuca apoiar. A ficha pede escápulas
// encostadas no banco: no supino reto, com a bacia fixa, as costas ficavam 2,6 cm e a cabeça 7,7 cm acima dele.
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import ficha from '../dados/movimentos/crucifixo-halteres.json';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Exercicio } from '../movimento';
import { bancoReto, chao } from '../pecas';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { noRef } from '../vec';
import { crucifixoDeitado } from './crucifixo-deitado';
import type { Deitado } from './crucifixo-deitado';

const F = fichaSchema.parse(ficha);
const f = daFicha(F);

const SEM_BRACO: PoseBraco = { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } };
const COSTAS = new Set(['tronco']);
const GLUTEO = new Set(['pelve']);
const CABECA = new Set(['cabeca']);

interface Pose {
  y: number;
  frente: number;
  cervical: number;
}

function deitar(corpo: Corpo): Deitado {
  const m = (id: string) => corpo.m(id);
  const zPelve = f('deitado.pelve.z');
  const w = f('pes.meiaDistancia');
  const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, zPelve + m('coxa.comp') + f('pes.alemDaCoxa')], dir: [sinal(k) * 0.2, 0, 1] }, polo: [sinal(k) * 0.35, 1, 0.4] });
  const pernas = { R: perna('R'), L: perna('L') };
  const tronco = (p: Pose) => resolverTronco(corpo, { pelve: [0, p.y, zPelve], frente: p.frente, lombar: f('deitado.lombar'), cervical: p.cervical, cabeca: f('deitado.cabeca') });
  const corpoTodo = (p: Pose): Esq => resolverMembros(tronco(p), { R: SEM_BRACO, L: SEM_BRACO }, pernas);
  const topo = obj('bancoReto', 'altura');
  /** Quanto a parte entra no estofado (cm; positivo = dentro), só nos pontos sobre o tampo (a largura do banco). */
  const fundo = (e: Esq, partes: Set<string>) => {
    let r = -Infinity;
    for (const { p, parte } of pontosDoBoneco(e)) if (partes.has(parte) && Math.abs(p[0]) <= obj('bancoReto', 'larg') / 2) r = Math.max(r, topo - p[1]);
    return r;
  };
  const amassa = f('apoio.amassa');
  // a conta demorada (centenas de poses) vem guardada para o corpo do app: ../calibragens.ts
  const pose = calibragem(corpo, `${F.id}:deitado`, (): Pose => {
    let p: Pose = { y: topo + m('prof.nadega') / 2, frente: -90, cervical: 0 };
    for (let i = 0; i < 4; i++) {
      p = { ...p, frente: resolver1((fr) => fundo(corpoTodo({ ...p, frente: fr }), COSTAS) - amassa, -70, -110, 22) };
      p = { ...p, y: resolver1((y) => fundo(corpoTodo({ ...p, y }), GLUTEO) - amassa, topo + 40, topo, 22) };
    }
    const cervical = resolver1((c) => fundo(corpoTodo({ ...p, cervical: c }), CABECA) - amassa, f('deitado.cervical.max'), f('deitado.cervical.min'), 22);
    return { ...p, cervical: Math.max(f('deitado.cervical.min'), Math.min(f('deitado.cervical.max'), cervical)) };
  });
  const t = tronco(pose);
  // o banco é posto pela cabeça, como no supino reto
  const zTopoDaCabeca = noRef(t.cabeca, [0, m('cabeca.tragionAoTopo'), 0])[2];
  const zBanco = zTopoDaCabeca - f('cabeca.folgaNoBanco') + obj('bancoReto', 'comp') / 2;
  return { t, pernas, prims: [chao(-110, 110, -90, 130), ...bancoReto(0, zBanco)], pecas: [{ t: 'bancoReto', x0: 0, z0: zBanco, atras: BANCO_ATRAS }] };
}
/**
 * O banco vai para trás na pintura (cm de profundidade). Os pés passam além da ponta do banco, na frente do pé e da
 * travessa dele, e a perna de perto é pintada no item do corpo (pela média do tronco, que fica em cima do meio do banco):
 * de três quartos ela ficava atrás do pé do banco, 27 cm mais perto de quem olha; de frente (nos erros), as duas pernas
 * ficavam atrás das travessas e das sapatas. A estrutura vai para trás de tudo o que se cruza com ela (de frente, a
 * travessa de perto era pintada 61,3 cm à frente das pernas; 70 deixa 8,5 de folga). O estofado vai só o bastante para
 * ficar atrás do corpo deitado nele de três quartos (era pintado 6,4 cm à frente), mas continua à frente do braço de
 * longe, que passa atrás dele (pintado 5 cm atrás do corpo): com 9 cm, 2,5 de folga para os dois lados. A regra
 * crucifixo-halteres-banco-pintado-no-lugar mede, nos dois lados e nas três vistas.
 */
const BANCO_ATRAS = { estofado: 9, estrutura: 70 };

const { quadro } = crucifixoDeitado(F, deitar);

export const crucifixoHalteres: Exercicio = {
  ficha: F,
  vistas: ['cima', 'quina'], // abre de cima, como os outros crucifixos (decisão do Gustavo de 05/11/2026: de cima se vê o arco das mãos e o cotovelo fixo; de três quartos o braço de perto aponta para quem olha)
  quadro,
  // o peito (principal) e a frente do ombro (secundário): a ficha da técnica e a biblioteca
  papeis: { peitoral: 'p', deltAnt: 's' },
  trajetorias: { halter: (q) => q.marcas.halter!, cotovelo: (q) => q.esq.lado.R.cotovelo },
};
