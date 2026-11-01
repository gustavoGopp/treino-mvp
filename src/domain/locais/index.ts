import { POR_ID, type Exercicio, type Musculo } from '../biblioteca';
import {
  contextoDeSelecao,
  lembretesDeDor,
  minutos,
  porqueDoExercicio,
  textoDor,
  type DiaPrograma,
  type ExercicioPrescrito,
  type Perfil,
  type Porque,
} from '../gerador';
import { FUNCAO, funcoesDoExercicio, type Funcao } from '../gerador/funcoes';
import { r } from '../regras';
import { capacidades, NOME_CAPACIDADE, type Capacidade, type Inventario } from '../taxonomia/equipamentos';

// Treino do dia num local que não é o do programa (local.treino-do-dia; pesquisa-v2/09).
// Cada vaga cujo exercício não é possível ali troca pelo equivalente possível da mesma função, com o mesmo
// desempate do gerador (contextoDeSelecao), e o motivo verdadeiro fica à mostra. A prescrição da vaga (séries,
// RIR, descanso) não muda; as repetições são as do exercício que entrou (como na troca pela alternativa).
// Sem equivalente, vale selecao.dia-sem-principal: outro músculo do dia, e nunca um dia sem exercício principal.

/** Exercício do dia no local; `noLugarDe` é o exercício do programa que ele substitui. */
export type ExercicioNoLocal = ExercicioPrescrito & { noLugarDe?: string };
export type Troca = {
  /** Exercício do programa (a vaga). */
  vaga: string;
  /** O que entrou; ausente = a vaga ficou de fora hoje. */
  entrou?: string;
  /** Motivo verdadeiro, curto: "aqui não tem polia alta: puxada unilateral → barra fixa". */
  motivo: string;
  regraId: string;
};
export type DiaNoLocal = { dia: Omit<DiaPrograma, 'exercicios'> & { exercicios: ExercicioNoLocal[] }; trocas: Troca[]; avisos: Porque[] };

const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const PODE_DROP: Exercicio['carga'][] = ['maquina', 'polia', 'anilha', 'halter', 'kettlebell'];

/** Por que o exercício não é possível neste local: a falta de equipamento, a dor ou o que a pessoa pediu para evitar. */
function motivoDaFalta(e: Exercicio, f: Funcao | undefined, perfil: Perfil, inventario: Inventario, ctx: ReturnType<typeof contextoDeSelecao>): string {
  if (perfil.evitarExercicios.includes(e.id)) return 'você pediu para evitar este exercício';
  if (ctx.carregaExcluida(e)) {
    const a = e.articulacoes.find((x) => ctx.regioesExcluidas.includes(x))!;
    return `por causa da dor ${textoDor(a, ctx.triagem.dores.find((d) => d.articulacao === a)?.nota)}`;
  }
  const brutas = capacidades(inventario);
  const faltas = (caps: Set<Capacidade>) =>
    e.requer.map((g) => g.filter((c) => !caps.has(c))).sort((a, b) => a.length - b.length || a.join().localeCompare(b.join()))[0] ?? [];
  // Sem a polia, o acessório que falta é detalhe: "aqui não tem polia alta", e não "polia alta nem corda".
  const ACESSORIOS: Capacidade[] = ['corda', 'triangulo', 'barra_reta_polia', 'estribo', 'tornozeleira'];
  const principais = (cs: Capacidade[]) => (cs.some((c) => !ACESSORIOS.includes(c)) ? cs.filter((c) => !ACESSORIOS.includes(c)) : cs);
  const falta = principais(faltas(ctx.caps));
  if (falta.length) {
    // O local tem, mas a pessoa pediu para evitar o equipamento.
    if (faltas(brutas).length === 0) return `você pediu para evitar ${falta.map((c) => NOME_CAPACIDADE[c]).join(' e ')}`;
    return `aqui não tem ${falta.map((c) => NOME_CAPACIDADE[c]).join(' nem ')}`;
  }
  const cond = (f?.condicoes?.[e.id] ?? []).filter((c) => !ctx.caps.has(c));
  if (cond.length) return `aqui não tem ${cond.map((c) => NOME_CAPACIDADE[c]).join(' nem ')}`;
  return 'não é possível aqui com o seu nível';
}

/**
 * O dia (já com a prescrição da semana) ajustado ao inventário do local. No próprio local do programa, nada muda
 * além das alternativas, que são recalculadas para o que existe ali ("pare e use a alternativa" só oferece o possível).
 */
export function diaNoLocal(dia: DiaPrograma, perfil: Perfil, inventario: Inventario): DiaNoLocal {
  const ctx = contextoDeSelecao(perfil, inventario);
  const trocas: Troca[] = [];
  const avisos: Porque[] = [];
  const funcaoDe = (x: ExercicioPrescrito): Funcao | undefined => (x.funcao ? FUNCAO[x.funcao] : funcoesDoExercicio(x.exId)[0]);
  const possivelAqui = (x: ExercicioPrescrito) => {
    const f = funcaoDe(x);
    return f ? ctx.naFuncao(f, x.exId) : ctx.possivel.has(x.exId);
  };

  const ficam = dia.exercicios.filter(possivelAqui);
  const usados = new Set(ficam.map((x) => x.exId));
  const musculosDoDia = new Set<Musculo>(dia.exercicios.flatMap((x) => (funcaoDe(x) ? [funcaoDe(x)!.musculo] : [])));
  const musculosPresentes = new Set<Musculo>(ficam.flatMap((x) => (funcaoDe(x) ? [funcaoDe(x)!.musculo] : [])));

  const entrar = (x: ExercicioPrescrito, e: Exercicio, f: Funcao, nivelFuncao: number, troca: Porque): ExercicioNoLocal => {
    const semDrop = x.dropSet && !PODE_DROP.includes(e.carga);
    const { dropSet, ...resto } = x;
    void dropSet;
    return {
      ...resto,
      ...(x.dropSet && !semDrop ? { dropSet: true } : {}),
      // Sem drop set possível no exercício que entrou, a queda volta a ser uma série normal (o volume fica).
      series: semDrop ? x.series + 1 : x.series,
      exId: e.id,
      nome: e.nome,
      padrao: e.padrao,
      tipo: e.tipo,
      funcao: f.id,
      reps: e.faixaReps,
      unilateral: e.unilateral,
      animacaoId: e.animacaoId,
      alternativas: ctx.alternativasDe(e, f),
      porque: [troca, ...porqueDoExercicio(e, f, nivelFuncao, perfil.nivel, ctx.preferido(f, e)), ...lembretesDeDor(e, ctx.triagem)],
      noLugarDe: x.exId,
    };
  };

  const novos = new Map<string, ExercicioNoLocal | null>();
  for (const x of dia.exercicios) {
    if (possivelAqui(x)) continue;
    const e = POR_ID[x.exId]!;
    const f = funcaoDe(x);
    const falta = motivoDaFalta(e, f, perfil, inventario, ctx);
    // 1) Equivalente da mesma função (todos os níveis) e, se nada, a função substituta (seNada).
    const funcoes = f ? [f, ...(f.seNada ? [FUNCAO[f.seNada]!] : [])] : [];
    let achado: { ex: Exercicio; nivelFuncao: number; f: Funcao } | null = null;
    for (const g of funcoes) {
      const a = ctx.escolher(g, 0, (id) => usados.has(id), new Map());
      if (a) {
        achado = { ...a, f: g };
        break;
      }
    }
    if (achado) {
      const motivo = `${falta}: ${minuscula(e.nome)} → ${minuscula(achado.ex.nome)}`;
      novos.set(x.exId, entrar(x, achado.ex, achado.f, achado.nivelFuncao, { regraId: r('local.treino-do-dia'), texto: `Neste local, ${motivo}. Mesma função, a mesma prescrição da vaga.` }));
      trocas.push({ vaga: x.exId, entrou: achado.ex.id, motivo, regraId: r('local.treino-do-dia') });
      usados.add(achado.ex.id);
      musculosPresentes.add(achado.f.musculo);
      continue;
    }
    // 2) selecao.dia-sem-principal: primeiro outro movimento do mesmo músculo; senão, outro músculo do dia que ainda
    //    não está no dia.
    const musculo = f?.musculo;
    const outros = ctx.possiveis
      .filter((y) => y.padrao !== 'core' && !usados.has(y.id))
      .flatMap((y) => {
        const g = funcoesDoExercicio(y.id).find((z) => ctx.naFuncao(z, y.id));
        if (!g) return [];
        const mesmo = g.musculo === musculo;
        return mesmo || (musculosDoDia.has(g.musculo) && !musculosPresentes.has(g.musculo)) ? [{ y, g, mesmo }] : [];
      })
      .sort((a, b) => Number(b.mesmo) - Number(a.mesmo) || ctx.comparar(new Map(), () => undefined)(a.y, b.y));
    const outro = outros[0];
    if (outro) {
      const nivelFuncao = outro.g.niveis.findIndex((n) => n.includes(outro.y.id));
      const onde = outro.mesmo ? 'mesmo músculo, outro movimento' : 'outro músculo do dia';
      const motivo = `${falta}, e nenhum equivalente de ${f ? minuscula(f.nome) : minuscula(e.nome)} é possível: no lugar de ${minuscula(e.nome)}, ${minuscula(outro.y.nome)} — ${onde}`;
      novos.set(x.exId, entrar(x, outro.y, outro.g, nivelFuncao, { regraId: r('selecao.dia-sem-principal'), texto: `Neste local, ${motivo}.` }));
      trocas.push({ vaga: x.exId, entrou: outro.y.id, motivo, regraId: r('selecao.dia-sem-principal') });
      usados.add(outro.y.id);
      musculosPresentes.add(outro.g.musculo);
      continue;
    }
    // 3) Nada possível: a vaga fica de fora hoje, com o motivo verdadeiro.
    const motivo = `${falta}, e nenhum exercício possível substitui ${minuscula(e.nome)}: a vaga fica de fora hoje`;
    novos.set(x.exId, null);
    trocas.push({ vaga: x.exId, motivo, regraId: r('local.treino-do-dia') });
    avisos.push({ regraId: r('local.treino-do-dia'), texto: `Neste local, ${motivo}.` });
  }

  let exercicios: ExercicioNoLocal[] = dia.exercicios.flatMap((x) => {
    if (!novos.has(x.exId)) {
      const f = funcaoDe(x);
      return [{ ...x, alternativas: f ? ctx.alternativasDe(POR_ID[x.exId]!, f) : x.alternativas }];
    }
    const n = novos.get(x.exId);
    return n ? [n] : [];
  });

  // Nenhum dia sem exercício principal (selecao.dia-sem-principal): se só sobrou abdominal, entra o melhor possível.
  if (!exercicios.some((x) => x.padrao !== 'core')) {
    const y = ctx.possiveis.filter((z) => z.padrao !== 'core' && !usados.has(z.id)).sort(ctx.comparar(new Map(), () => undefined))[0];
    const g = y && funcoesDoExercicio(y.id).find((z) => ctx.naFuncao(z, y.id));
    const base = dia.exercicios.find((x) => x.padrao !== 'core') ?? dia.exercicios[0];
    if (y && g && base) {
      const motivo = `neste local, nenhum exercício do dia é possível: entra ${minuscula(y.nome)}, para o dia não ficar sem exercício principal`;
      exercicios = [entrar({ ...base }, y, g, g.niveis.findIndex((n) => n.includes(y.id)), { regraId: r('selecao.dia-sem-principal'), texto: `${motivo}.` }), ...exercicios];
      trocas.push({ vaga: base.exId, entrou: y.id, motivo, regraId: r('selecao.dia-sem-principal') });
    }
  }

  // Supersérie: o par segue o exercício que entrou na vaga; se o par saiu, a supersérie se desfaz.
  const novoId = (id: string) => (novos.has(id) ? (novos.get(id)?.exId ?? null) : id);
  exercicios = exercicios.map((x) => {
    if (!x.supersetCom) return x;
    const par = novoId(x.supersetCom);
    const { supersetCom, ...resto } = x;
    void supersetCom;
    return par && exercicios.some((y) => y.exId === par) ? { ...resto, supersetCom: par } : resto;
  });

  return { dia: { ...dia, exercicios, minutosEstimados: minutos(exercicios) }, trocas, avisos };
}

/** O exercício exige só o que o local tem? (para a propriedade "nenhum exercício exige o que o local não tem") */
export const possivelNoLocal = (exId: string, inventario: Inventario) => {
  const caps = capacidades(inventario);
  return !!POR_ID[exId]?.requer.some((g) => g.every((c) => caps.has(c)));
};
