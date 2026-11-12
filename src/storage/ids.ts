import { BIBLIOTECA } from '../domain/biblioteca';

// Ids de exercício no estado guardado. O id de um exercício fica no histórico, no treino aberto, no programa salvo,
// em "algo a evitar" e em "prefiro este". Antes, o esquema recusava qualquer id fora da biblioteca: bastava um
// exercício ser renomeado ou sair para o estado inteiro de quem o registrou ficar ilegível (auditoria de 12/11/2026).
// Agora a carga acerta os ids antes de validar, e um teste do repositório (tests/repo/ids-biblioteca.test.ts) falha se
// um id publicado sair da biblioteca sem entrar aqui.

/**
 * Ids que já saíram da biblioteca: id antigo → id novo (renomeado) ou null (removido sem substituto).
 * Hoje está vazio: nenhum id publicado saiu.
 */
export const IDS_ANTIGOS: Record<string, string | null> = {};

const IDS_DA_BIBLIOTECA: ReadonlySet<string> = new Set(BIBLIOTECA.map((e) => e.id));

type Obj = Record<string, unknown>;
const obj = (v: unknown): v is Obj => !!v && typeof v === 'object' && !Array.isArray(v);

/**
 * Acerta os ids de exercício de um estado bruto (já na versão atual, ainda sem validar):
 * - o id renomeado troca para o novo, em todo lugar;
 * - no histórico e no treino aberto, o exercício de id desconhecido sai da lista e fica guardado, inteiro, em
 *   `foraDaBiblioteca` da própria sessão: o registro não se perde e continua no arquivo de exportação;
 * - em "algo a evitar" e "prefiro este", o id desconhecido sai (não há mais o que evitar ou preferir);
 * - no programa salvo, a alternativa desconhecida sai; se um exercício prescrito é desconhecido, o programa salvo
 *   sai, e o app gera outro ao abrir (ele é derivado do cadastro).
 * Nada é inventado, e o que tem formato inesperado fica como está, para o esquema recusar.
 */
export function acertarIds(dados: Obj, antigos: Record<string, string | null> = IDS_ANTIGOS, conhecidos: ReadonlySet<string> = IDS_DA_BIBLIOTECA): Obj {
  const novo = (id: unknown): string | undefined => {
    if (typeof id !== 'string') return undefined;
    const trocado = antigos[id] ?? id;
    return conhecidos.has(trocado) ? trocado : undefined;
  };

  const sessao = (s: unknown): unknown => {
    if (!obj(s) || !Array.isArray(s.exercicios)) return s;
    const ficam: unknown[] = [];
    const fora: unknown[] = Array.isArray(s.foraDaBiblioteca) ? [...s.foraDaBiblioteca] : [];
    for (const e of s.exercicios) {
      if (!obj(e) || typeof e.exId !== 'string') {
        ficam.push(e);
        continue;
      }
      const exId = novo(e.exId);
      if (!exId) {
        fora.push(e);
        continue;
      }
      const { noLugarDe, ...resto } = e;
      const original = novo(noLugarDe);
      ficam.push({ ...resto, exId, ...(original ? { noLugarDe: original } : {}) });
    }
    return { ...s, exercicios: ficam, ...(fora.length ? { foraDaBiblioteca: fora } : {}) };
  };

  const saida: Obj = { ...dados };
  if (Array.isArray(dados.historico)) saida.historico = dados.historico.map(sessao);
  if (obj(dados.sessaoAtual)) saida.sessaoAtual = sessao(dados.sessaoAtual);

  if (obj(dados.restricoes) && Array.isArray(dados.restricoes.evitarExercicios))
    saida.restricoes = { ...dados.restricoes, evitarExercicios: [...new Set(dados.restricoes.evitarExercicios.map(novo).filter((x) => x !== undefined))] };

  if (obj(dados.preferidos)) {
    const p = Object.entries(dados.preferidos).flatMap(([funcao, id]) => (novo(id) ? [[funcao, novo(id)] as const] : []));
    if (p.length) saida.preferidos = Object.fromEntries(p);
    else delete saida.preferidos;
  }

  const guardado = dados.programa;
  if (obj(guardado) && obj(guardado.programa) && Array.isArray(guardado.programa.dias)) {
    let legivel = true;
    const dias = guardado.programa.dias.map((d) => {
      if (!obj(d) || !Array.isArray(d.exercicios)) return d;
      return {
        ...d,
        exercicios: d.exercicios.map((x) => {
          if (!obj(x) || typeof x.exId !== 'string') return x;
          const exId = novo(x.exId);
          if (!exId) legivel = false;
          const alternativas = Array.isArray(x.alternativas) ? x.alternativas.map(novo).filter((a) => a !== undefined) : x.alternativas;
          // o par do superset é outro exercício do mesmo dia: se foi renomeado, acompanha
          const par = typeof x.supersetCom === 'string' ? { supersetCom: novo(x.supersetCom) ?? x.supersetCom } : {};
          return { ...x, exId: exId ?? x.exId, alternativas, ...par };
        }),
      };
    });
    if (legivel) saida.programa = { ...guardado, programa: { ...guardado.programa, dias } };
    else delete saida.programa;
  }
  return saida;
}
