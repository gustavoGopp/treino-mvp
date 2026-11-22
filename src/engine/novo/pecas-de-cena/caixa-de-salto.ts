// Peça de cena: a caixa de salto de madeira (caixa pliométrica), de pé no lado mais alto, para a barra fixa só na
// descida (o apoio firme para chegar ao alto sem pular). Não há cartão de equipamento dela no app; o desenho segue o
// das caixas de compensado: um bloco de madeira clara, de cantos levemente arredondados, com o recorte de alça perto do
// alto, dos dois lados. Medidas em ../dados/objetos/caixa-de-salto.json.
//
// A caixa fica centrada em x = 0, com a face de trás (a que fica virada para a pessoa) em z = zTras, e vai para a frente
// (+z). O tampo fica na altura da tabela.
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { mix, retArred } from '../realista/base.mjs';
import type { Material } from '../realista/base.mjs';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('caixaDeSalto', id);
/** A altura do tampo (cm). */
export const alturaDaCaixa = () => g('altura');

/** O compensado claro (quatro tons: sombra, meio, luz, traço) e o recorte da alça, escuro. */
const MADEIRA: Material = ['#8E6B43', '#B88F5F', '#DDBD8E', '#5E4527'];
const RECORTE: Material = ['#3B2C1A', '#4A3822', '#5A4429', '#20170C'];
const doTema = (m: Material, tema: 'claro' | 'escuro'): Material => (tema === 'claro' ? m : (m.map((t) => mix(t, '#5b6670', 0.35)) as unknown as Material));

export function caixaDeSalto(zTras: number): { prims: Prim[]; peca: PecaPropria } {
  const H = g('altura'),
    L = g('larg'),
    P = g('prof'),
    esp = g('esp');
  const zC = zTras + P / 2;
  // para a conferência: o volume inteiro da caixa (os pés apoiam no tampo; o resto do corpo não pode entrar nela)
  const prims: Prim[] = [{ t: 'caixa', ref: { ...REF0, o: [0, H / 2, zC] }, meias: [L / 2, H / 2, P / 2], cls: 'obj', vies: -1 }];
  const peca: PecaPropria = {
    t: 'propria',
    nome: 'caixa de salto',
    fixa: { zTras },
    desenhar(C, _M, o) {
      const M = doTema(MADEIRA, o.tema),
        R = doTema(RECORTE, o.tema);
      // o bloco: o perfil de cima (de lado a lado × de trás para a frente), com os cantos do compensado levemente
      // arredondados, extrudado do chão até o tampo
      C.prisma(retArred(L, P, esp, 3), [0, 0, zC], [1, 0, 0], [0, 0, 1], [0, H, 0], M);
      // o recorte da alça, perto do alto, nas duas faces dos lados (só um pouco para fora da face, para aparecer)
      for (const s of [-1, 1]) {
        const x: V3 = [s * (L / 2 + 0.05), H - 12, zC];
        C.prisma(retArred(g('alcaLarg'), g('alcaAlt'), g('alcaAlt') / 2, 3), x, [0, 0, 1], [0, 1, 0], [s * 0.2, 0, 0], R);
      }
      if (o.comSombra) C.sombra(0, zC, L / 2 + 3, P / 2 + 3, 0.18);
    },
  };
  return { prims, peca };
}
