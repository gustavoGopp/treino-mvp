import { POR_ID, type Musculo } from '../biblioteca';
import { FUNCAO, funcoesDoExercicio } from './funcoes';

// As famílias de funções que se complementam em cada músculo grande (selecao.exercicios-por-musculo), pela tabela de
// funções. Usadas pelo gerador (a 2ª família, R5b) e pelo avaliador, para os dois medirem do mesmo jeito.

/**
 * selecao.exercicios-por-musculo: as famílias de funções que se complementam em cada músculo grande; o músculo pede 2
 * famílias diferentes na semana. No glúteo (selecao.gluteo), agachar e afundo são uma família só (o joelho dobra nos
 * dois), e o dobrar o quadril conta como extensão de quadril.
 */
export const FAMILIAS: Partial<Record<Musculo, { nome: string; funcoes: string[] }[]>> = {
  peito: [
    { nome: 'empurrar reto', funcoes: ['empurrar-horizontal'] },
    { nome: 'empurrar inclinado', funcoes: ['empurrar-inclinado'] },
    { nome: 'crucifixo', funcoes: ['crucifixo'] },
  ],
  costas: [
    { nome: 'puxar de cima (puxada ou barra)', funcoes: ['puxar-vertical'] },
    { nome: 'remada', funcoes: ['puxar-horizontal'] },
  ],
  quadriceps: [
    { nome: 'agachar', funcoes: ['agachar'] },
    { nome: 'afundo', funcoes: ['afundo'] },
    { nome: 'extensora', funcoes: ['extensora'] },
  ],
  posteriores: [
    { nome: 'flexão de joelho', funcoes: ['flexao-joelho'] },
    { nome: 'dobrar o quadril', funcoes: ['dobrar-quadril'] },
  ],
  gluteos: [
    { nome: 'agachar ou afundo', funcoes: ['agachar', 'afundo'] },
    { nome: 'extensão de quadril', funcoes: ['extensao-quadril', 'dobrar-quadril'] },
    { nome: 'abdução', funcoes: ['abducao'] },
  ],
};
/** O exercício conta para o músculo: é principal nele, ou (no glúteo) é de agachar, afundo ou dobrar o quadril. */
export function contaPara(m: Musculo, id: string): boolean {
  const e = POR_ID[id]!;
  if (e.musculos.primarios.includes(m)) return true;
  return m === 'gluteos' && (e.musculos.secundarios.includes('gluteos') || e.musculos.primarios.includes('gluteos'));
}

/** As funções próprias de um exercício: entre as funções em que ele aparece, as do nível mais alto (o índice menor). */
const PROPRIAS = new Map<string, string[]>();
export function funcoesProprias(id: string): string[] {
  const memo = PROPRIAS.get(id);
  if (memo) return memo;
  const nivelEm = funcoesDoExercicio(id).map((f) => ({ f: f.id, n: f.niveis.findIndex((ids) => ids.includes(id)) }));
  const menor = Math.min(...nivelEm.map((x) => x.n));
  const out = nivelEm.filter((x) => x.n === menor).map((x) => x.f);
  PROPRIAS.set(id, out);
  return out;
}
/**
 * As famílias de funções que o programa cobre num músculo grande (selecao.exercicios-por-musculo), pela tabela de funções,
 * como o gerador: um exercício cobre a sua função própria e, nas outras, só no nível igual ou acima do melhor nível possível no
 * equipamento (`melhorNivel`; a vaga só desce de nível quando o de cima não é possível). Cada vaga (cada vez que um
 * exercício aparece na semana) cobre uma família, e vale a maior cobertura possível. Assim, sem banco inclinável, a
 * flexão (ou o supino reto) na vaga inclinada conta como a 2ª função do peito, como no gerador
 * (selecao.peitoral-inclinado: "senão, 2º empurrar"); com o banco, não conta (decisão do R5b). Sem `melhorNivel`, vale
 * qualquer nível.
 */
export function familiasCobertas(
  m: Musculo,
  exs: { exId: string }[],
  melhorNivel: (funcao: string) => number = () => Infinity,
  /** O exercício que este substitui (a barra só na descida do iniciante substitui a barra fixa; selecao.barra-negativa-iniciante). */
  noLugarDe: (id: string) => string = (id) => id,
): string[] {
  const familias = FAMILIAS[m];
  if (!familias) return [];
  const cobre = (id: string, fid: string) => {
    const nivelDe = (x: string) => FUNCAO[fid]!.niveis.findIndex((ids) => ids.includes(x));
    const n = Math.min(...[nivelDe(id), nivelDe(noLugarDe(id))].map((k) => (k < 0 ? Infinity : k)));
    const melhor = melhorNivel(fid);
    // Vale na função própria (a do nível mais alto em que aparece) e, nas outras, no nível igual ou acima do melhor possível.
    return n !== Infinity && (n <= (melhor < 0 ? 0 : melhor) || funcoesProprias(id).includes(fid));
  };
  const de = exs
    .filter((x) => POR_ID[x.exId] && contaPara(m, x.exId))
    .map((x) => familias.map((f, i) => (f.funcoes.some((fid) => cobre(x.exId, fid)) ? i : -1)).filter((i) => i >= 0))
    .filter((is) => is.length);
  let melhor: number[] = [];
  const busca = (k: number, usadas: number[]) => {
    if (usadas.length > melhor.length) melhor = [...usadas];
    if (k >= de.length || melhor.length === familias.length) return;
    for (const i of de[k]!) if (!usadas.includes(i)) busca(k + 1, [...usadas, i]);
    busca(k + 1, usadas);
  };
  busca(0, []);
  return familias.filter((_, i) => melhor.includes(i)).map((f) => f.nome);
}


/** avaliador.empurrar-puxar: as funções de cada lado do ombro (empurrar ÷ puxar até 1,5). */
export const FUNCOES_EMPURRAR = ['empurrar-horizontal', 'empurrar-inclinado', 'empurrar-vertical', 'crucifixo'];
export const FUNCOES_PUXAR = ['puxar-vertical', 'puxar-horizontal', 'ombro-posterior'];
/** O exercício está em alguma das funções (em qualquer nível). */
export const ehDe = (funcoes: string[]) => (id: string) => funcoes.some((f) => FUNCAO[f]!.niveis.some((n) => n.includes(id)));
export const ehEmpurrar = ehDe(FUNCOES_EMPURRAR);
export const ehPuxar = ehDe(FUNCOES_PUXAR);
/** avaliador.empurrar-puxar: o limite (o mesmo da régua da G5, D1, e do gerador desde o R5d). */
export const EMPURRAR_PUXAR_MAX = 1.5;
