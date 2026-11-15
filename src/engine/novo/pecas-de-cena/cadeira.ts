// Peça de cena: a cadeira firme do búlgaro com o peso do corpo (de madeira, quatro pés, sem rodinhas, não dobrável),
// com o encosto do lado de lá e encostada na parede, como pede a montagem segura da ficha da técnica
// (docs/pesquisa/animacoes/bulgaro-peso-corpo.md). As medidas são as da tabela (../dados/objetos/cadeira.json); não há
// cartão de equipamento da cadeira no app (ela não é equipamento da lista), então o desenho segue o dos bancos: o
// mesmo gerador realista, tampo e pés retos, em tons de madeira escura.
import type { Prim } from '../desenho';
import type { Materiais } from '../equipamento';
import type { PecaPropria } from '../pecas';
import { mix } from '../realista/base.mjs';
import type { CenaRealista, Material } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('cadeira', id);
/** A madeira escura da cadeira (quatro tons: sombra, meio, luz, traço), clareada no tema escuro como o grafite. */
const MADEIRA: Material = ['#3A2A1F', '#5C4433', '#8A6A52', '#1E140D'];
/** A parede, clara e sem detalhe, para não disputar com o corpo nem com a cadeira. */
const PAREDE: Material = ['#C9CED4', '#D9DDE2', '#E6E9EC', '#A9B0B8'];
const PAREDE_ESCURA: Material = ['#3A4048', '#424952', '#4B535D', '#5C6570'];
const madeira = (tema: 'claro' | 'escuro'): Material => (tema === 'claro' ? MADEIRA : MADEIRA.map((t) => mix(t, '#aeb8c2', 0.3)));

/** Onde a cadeira fica: o meio da borda da frente do assento (x, z) e a parede, se houver, logo atrás do encosto. */
export interface Cadeira {
  x0: number;
  /** z da borda da frente do assento (o lado virado para a pessoa, em +z). */
  zBorda: number;
}

/** As partes da cadeira, nas medidas da tabela: o tampo, os quatro pés, as travessas e o encosto. */
function partes(c: Cadeira) {
  const alt = g('assentoAltura'),
    esp = g('assentoEsp'),
    larg = g('assentoLarg') / 2,
    pe = g('peLado');
  const zFrente = c.zBorda,
    // o assento vai da borda da frente até o encosto (a profundidade útil da ficha); os pés de trás ficam sob o encosto
    zEncosto = c.zBorda - g('assentoProf') - pe / 2,
    // o alto do encosto se inclina para trás até a profundidade total da ficha
    zTopo = c.zBorda - g('prof') + pe / 2;
  const xPe = larg - pe / 2 - 0.5;
  return { alt, esp, larg, pe, zFrente, zEncosto, zTopo, xPe, topo: g('altura') };
}

/** Onde fica a parede: logo atrás do alto do encosto (a cadeira encostada nela). */
export const zDaParede = (c: Cadeira) => partes(c).zTopo - g('peLado') / 2 - 0.5;

export function cadeira(c: Cadeira): { prims: Prim[]; peca: PecaPropria } {
  const P = partes(c);
  const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });
  const zMeio = (P.zFrente + P.zEncosto - P.pe / 2) / 2,
    meiaProf = (P.zFrente - (P.zEncosto - P.pe / 2)) / 2;
  // para a conferência: o tampo (onde o pé apoia e a canela pode encostar) e os pés
  const prims: Prim[] = [caixa([c.x0, P.alt - P.esp / 2, zMeio], [P.larg, P.esp / 2, meiaProf], 'obj', 0.5)];
  for (const sx of [-1, 1])
    for (const z of [P.zFrente - P.pe / 2, P.zEncosto]) prims.push(caixa([c.x0 + sx * P.xPe, (P.alt - P.esp) / 2, z], [P.pe / 2, (P.alt - P.esp) / 2, P.pe / 2], 'esc', -0.6));

  const peca: PecaPropria = {
    t: 'propria',
    nome: 'cadeira',
    fixa: c,
    desenhar(C: CenaRealista, _M: Materiais, o) {
      const W = madeira(o.tema);
      const Y: V3 = [0, 1, 0];
      const x = (s: number) => c.x0 + s * P.xPe;
      // pés da frente, retos, até o tampo
      for (const s of [-1, 1]) C.tubo([x(s), 0, P.zFrente - P.pe / 2], [x(s), P.alt - P.esp, P.zFrente - P.pe / 2], P.pe, P.pe, W, { up: [0, 0, 1] });
      // pés de trás: sobem inteiros e viram as hastes do encosto, inclinadas para trás
      for (const s of [-1, 1]) {
        C.tubo([x(s), 0, P.zEncosto], [x(s), P.alt, P.zEncosto], P.pe, P.pe, W, { up: [0, 0, 1] });
        C.tubo([x(s), P.alt, P.zEncosto], [x(s), P.topo, P.zTopo], P.pe, P.pe, W, { up: [0, 0, 1] });
      }
      // travessas entre os pés, perto do chão e logo abaixo do tampo
      for (const y of [16, P.alt - P.esp - 4]) {
        for (const z of [P.zFrente - P.pe / 2, P.zEncosto]) C.tubo([x(-1), y, z], [x(1), y, z], 2.4, 3.2, W, { up: Y });
        for (const s of [-1, 1]) C.tubo([x(s), y, P.zFrente - P.pe / 2], [x(s), y, P.zEncosto], 2.4, 3.2, W, { up: Y });
      }
      // o encosto: uma tábua larga no alto, entre as hastes
      const t = (P.topo - 6 - P.alt) / (P.topo - P.alt),
        b = (P.topo - 22 - P.alt) / (P.topo - P.alt);
      const zEm = (f: number) => P.zEncosto + (P.zTopo - P.zEncosto) * f;
      C.tubo([c.x0, P.topo - 22, zEm(b)], [c.x0, P.topo - 6, zEm(t)], 2 * P.xPe, 2, W, { up: [0, 0, 1] });
      // o tampo do assento por cima de tudo
      C.tubo([c.x0, P.alt - P.esp / 2, P.zFrente], [c.x0, P.alt - P.esp / 2, P.zEncosto - P.pe / 2], 2 * P.larg, P.esp, W, { up: Y });
      if (o.comSombra) C.sombra(c.x0, zMeio, P.larg + 4, meiaProf + 6, 0.18);
    },
  };
  return { prims, peca };
}

/**
 * A parede em que a cadeira encosta, como cenário (pintada atrás do corpo e fora do enquadramento). Só aparece de
 * perfil: de frente ela cobriria o fundo inteiro. A altura desenhada (`alt`) é só a do trecho que pode caber no quadro.
 */
export function parede(c: Cadeira, alt = 260): PecaPropria {
  const zp = zDaParede(c);
  return {
    t: 'propria',
    nome: 'parede',
    fixa: { c, alt },
    cenario: true,
    desenhar(C: CenaRealista, _M: Materiais, o) {
      // de perfil, andar de lado (em x) não muda nada na tela
      const a = C.P([c.x0, 0, zp]),
        b = C.P([c.x0 + 1, 0, zp]);
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) > 0.3) return;
      C.tubo([c.x0, 0, zp - 4], [c.x0, alt, zp - 4], 120, 8, o.tema === 'claro' ? PAREDE : PAREDE_ESCURA, { up: [0, 0, 1] });
    },
  };
}
