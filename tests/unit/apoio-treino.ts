import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import type { Carga, SerieRegistrada } from '../../src/domain/progressao';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
import { diaDoTreino, iniciarSessao, registrarSerie, terminarSessao } from '../../src/features/treino/acoes';
import type { Persona } from '../personas';

// Apoio dos testes do acompanhamento (R2): uma persona fictícia com o cadastro feito e treinos de verdade, pelas
// mesmas ações que a tela usa. As datas são fixas: o dia 0 é a segunda-feira 05/10/2026.

export const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
/** Dia n a partir da segunda-feira 05/10/2026, às h horas (UTC). */
export const dia = (n: number, h = 10) => new Date(Date.UTC(2026, 9, 5) + n * 86_400_000 + h * 3_600_000).toISOString();

export function programaDe(perfil: Perfil, inv: Inventario): Programa {
  const r = gerarPrograma(perfil, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
}

export function estadoDe(p: Persona, locais = [{ id: 'local-1', nome: 'Meu local', inventario: p.inventario }]): Estado {
  return {
    versao: VERSAO_ESTADO,
    triagem: p.perfil.triagem,
    nivel: { respostas: { tempoContinuo: '6-24m', semanasParado: 0, tecnica: 'sim' }, escolhido: p.perfil.nivel },
    rotina: { diasSemana: p.perfil.diasSemana, minutosSessao: p.perfil.minutosSessao, prioridades: p.perfil.prioridades },
    restricoes: { evitarExercicios: [], evitarEquipamentos: p.perfil.evitarEquipamentos },
    locais,
    programa: { programa: programaDe({ ...p.perfil, semanasParado: 0 }, p.inventario), geradoEm: dia(-1), localId: 'local-1' },
    historico: [],
  };
}

/** Uma série de trabalho típica para cada tipo de carga. */
export const serieTipica = (exId: string): SerieRegistrada => {
  const c = POR_ID[exId]!.carga;
  const carga: Carga =
    c === 'polia' || c === 'maquina'
      ? { tipo: 'placa', placa: 8 }
      : c === 'anilha'
        ? { tipo: 'anilha', kgPorLado: 20 }
        : c === 'assistida'
          ? { tipo: 'contrapeso', placa: 3 }
          : c === 'peso-corpo' || c === 'elastico'
            ? { tipo: 'degrau', degrau: 2 }
            : c === 'barra'
              ? { tipo: 'kg', kg: 40 }
              : { tipo: 'kg', kg: 10 };
  return { carga, reps: 10, rir: 2 };
};

/** Faz o treino inteiro de um dia: as séries pedidas em cada exercício. */
export function treinar(e: Estado, n: number, diaId: string, localId = 'local-1', serie = serieTipica, quantas?: (exId: string, prescritas: number) => number): Estado {
  let s = iniciarSessao(e, dia(n), diaId, localId);
  s.sessaoAtual!.exercicios.forEach((x, i) => {
    const d = diaDoTreino(s, s.sessaoAtual!)!.dia.exercicios.find((y) => y.exId === x.exId)!;
    const quantidade = quantas ? quantas(x.exId, d.series) : d.series;
    for (let k = 0; k < quantidade; k++) s = registrarSerie(s, i, serie(x.exId));
  });
  return terminarSessao(s, dia(n, 11));
}

