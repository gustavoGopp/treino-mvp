import { beforeAll, describe, expect, it, vi } from 'vitest';
import { contextoDeSelecao, gerarPrograma, MUSCULOS_COM_META, type Perfil, type Programa } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { medirRegua } from '../../scripts/auditoria/regua';
import { inventarioDe, perfilDe, type Pedido } from '../../scripts/auditoria/ver-lib';

// tempo.exercicios-do-iniciante (18/11/2026, sessão "treino para todos"; decisão do Gustavo em 18/11): o iniciante de 3
// dias de até 60 min fica com até 6 exercícios por treino (7 com o 2º exercício do foco, o abdômen ou a panturrilha), se
// isso não custar outra coisa. Com o limite, o lugar que a dor esvaziou vai primeiro para o foco abaixo da meta, e o
// porquê diz o limite. O "antes" é o protótipo (scripts/auditoria/prototipo) com todas as regras adotadas menos estas
// três. Só perfis fictícios.

// As grades deste arquivo geram centenas de programas duas vezes (antes e depois): mais folga que os 5 s do padrão.
vi.setConfig({ testTimeout: 60_000 });

const pedido = (p: Partial<Pedido> & { cenario: string }): Pedido => ({ nivel: 'iniciante', dias: '3', min: 60, focos: [], dores: [], semanasParado: 0, ...p });
const programa = (gerar: typeof gerarPrograma, perfil: Perfil, inventario: Inventario): Programa => {
  const r = gerar(perfil, inventario);
  if (r.status !== 'ok') throw new Error('sem programa');
  return r.programa;
};
const ids = (p: Programa) => p.dias.flatMap((d) => d.exercicios.map((x) => x.exId));
const resumo = (p: Programa) => p.dias.map((d) => d.exercicios.map((x) => `${x.exId} ${x.series}`).join(', ')).join(' | ');
const defeitos = (p: Programa, perfil: Perfil, inventario: Inventario) => [...medirRegua(p, perfil, contextoDeSelecao(perfil, inventario)).defeitos].sort();
const textoDoLimite = (p: Programa) => p.porque.find((q) => q.regraId === 'tempo.exercicios-do-iniciante');
const carregarAntes = async () => {
  vi.stubEnv('PROT', 'app,-ini-6-3x60,-ini-6-foco,-ini-6-texto');
  vi.resetModules();
  const m = (await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma };
  vi.unstubAllEnvs();
  return m.gerarPrograma;
};

/** Iniciantes de 3 dias de 60 min: cinco lugares, cinco focos, sem dor e com dor forte no cotovelo, no joelho ou no ombro. */
const GRADE = ['academia', 'condominio', 'halteres-banco', 'casa', 'casa+'].flatMap((cenario) =>
  ([[], ['peito'], ['gluteos'], ['pernas'], ['peito', 'costas']] as Pedido['focos'][]).flatMap((focos) =>
    ([[], [{ articulacao: 'cotovelo', nota: 7 }], [{ articulacao: 'joelho', nota: 7 }], [{ articulacao: 'ombro', nota: 7 }]] as Pedido['dores'][]).map((dores) => pedido({ cenario, focos, dores })),
  ),
);
const nome = (pd: Pedido) => `${pd.cenario}, foco ${pd.focos.join('+') || 'nenhum'}, dor ${pd.dores.map((d) => `${d.articulacao} ${d.nota}`).join('+') || 'nenhuma'}`;

describe('tempo.exercicios-do-iniciante: até 6 exercícios por treino para o iniciante de 3 dias de até 60 min', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes();
  });
  const pares = () =>
    GRADE.map((pd) => {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      return { pd, perfil, inventario, a: programa(antes, perfil, inventario), d: programa(gerarPrograma, perfil, inventario) };
    });

  it('com o limite, nenhum dia passa de 7 exercícios, e o 7º só entra pelo foco, pelo abdômen ou pela panturrilha', () => {
    let comLimite = 0;
    const fora: string[] = [];
    for (const { pd, d } of pares()) {
      if (!textoDoLimite(d)) continue;
      comLimite++;
      for (const dia of d.dias) {
        if (dia.exercicios.length > 7) fora.push(`${nome(pd)}: ${dia.nome} com ${dia.exercicios.length}`);
        if (dia.exercicios.length === 7) {
          const peloFocoOuProtegido = dia.exercicios.some((x) => x.porque.some((q) => q.regraId === 'volume.prioridade.segundo-exercicio' || q.regraId === 'tempo.musculo-protegido'));
          if (!peloFocoOuProtegido) fora.push(`${nome(pd)}: ${dia.nome} com 7 sem o foco nem o protegido`);
        }
      }
    }
    expect(fora).toEqual([]);
    // O limite age na maior parte da grade (sem ele, cabem 8 por treino em 60 min).
    expect(comLimite).toBeGreaterThan(GRADE.length / 2);
  });

  it('nenhum programa da grade ganha um defeito da régua, e na grade a semana tem menos exercícios diferentes', () => {
    const novos: string[] = [];
    let [menos, mais, totalAntes, totalDepois] = [0, 0, 0, 0];
    for (const { pd, perfil, inventario, a, d } of pares()) {
      const [da, dd] = [defeitos(a, perfil, inventario), defeitos(d, perfil, inventario)];
      for (const x of dd) if (!da.includes(x)) novos.push(`${nome(pd)}: ${x}`);
      const [na, nd] = [new Set(ids(a)).size, new Set(ids(d)).size];
      totalAntes += na;
      totalDepois += nd;
      if (nd < na) menos++;
      if (nd > na) mais++;
    }
    expect(novos).toEqual([]);
    // Com menos lugares por dia, a variedade entre os dias às vezes muda e a semana ganha 1 ou 2 exercícios diferentes
    // (6 programas desta grade, medido em 18/11/2026); no total, e na maioria dos que mudam, ela tem menos.
    expect(totalDepois).toBeLessThan(totalAntes);
    expect(menos).toBeGreaterThan(mais * 3);
  });

  it('nenhum músculo que tinha série fica sem nenhuma', () => {
    const fora: string[] = [];
    for (const { pd, a, d } of pares())
      for (const m of MUSCULOS_COM_META) if ((a.volumeSemanal[m] ?? 0) > 0 && !(d.volumeSemanal[m] ?? 0)) fora.push(`${nome(pd)}: ${m}`);
    expect(fora).toEqual([]);
  });

  it('o porquê diz o limite: caberiam cerca de 8, mas quem está começando fica com cerca de 6 (no máximo 7)', () => {
    const pd = pedido({ cenario: 'academia' });
    const d = programa(gerarPrograma, perfilDe(pd), inventarioDe(pd.cenario));
    expect(textoDoLimite(d)?.texto).toBe('Com 60 min por treino caberiam cerca de 8 exercícios, mas quem está começando fica com cerca de 6 (no máximo 7), para aprender bem cada um.');
    expect(d.porque.some((q) => q.regraId === 'tempo.exercicios-por-sessao')).toBe(false);
    expect(Math.max(...d.dias.map((x) => x.exercicios.length))).toBeLessThanOrEqual(7);
  });

  it('com dor forte no cotovelo e foco em peito, o peito chega à meta como sem o limite (o lugar da dor vai para o foco)', () => {
    const fora: string[] = [];
    for (const cenario of ['academia', 'condominio', 'casa', 'casa+', 'halteres-banco'])
      for (const focos of [['peito'], ['peito', 'costas']] as Pedido['focos'][]) {
        const pd = pedido({ cenario, focos, dores: [{ articulacao: 'cotovelo', nota: 7 }] });
        const [perfil, inventario] = [perfilDe(pd), inventarioDe(cenario)];
        const [a, d] = [programa(antes, perfil, inventario), programa(gerarPrograma, perfil, inventario)];
        if ((d.volumeSemanal.peito ?? 0) < Math.min(10, a.volumeSemanal.peito ?? 0)) fora.push(`${nome(pd)}: peito ${a.volumeSemanal.peito} → ${d.volumeSemanal.peito}`);
      }
    expect(fora).toEqual([]);
  });

  it('fora do recorte nada muda: iniciante de 2 ou 4 dias, de 45 ou 75 min, e o intermediário de 3 dias de 60 min', () => {
    const fora: string[] = [];
    const outros: Pedido[] = ['academia', 'casa+'].flatMap((cenario) => [
      pedido({ cenario, dias: '2' }),
      pedido({ cenario, dias: '4' }),
      pedido({ cenario, min: 45 }),
      pedido({ cenario, min: 75 }),
      pedido({ cenario, nivel: 'intermediario' }),
      pedido({ cenario, nivel: 'intermediario', focos: ['peito'], dores: [{ articulacao: 'cotovelo', nota: 7 }] }),
    ]);
    for (const pd of outros) {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      const [a, d] = [programa(antes, perfil, inventario), programa(gerarPrograma, perfil, inventario)];
      if (resumo(a) !== resumo(d)) fora.push(`${pd.nivel}, ${pd.dias} dias de ${pd.min} min, ${nome(pd)}`);
      if (textoDoLimite(d)) fora.push(`${pd.nivel}, ${pd.dias} dias de ${pd.min} min: o texto do limite apareceu`);
    }
    expect(fora).toEqual([]);
  });
});
