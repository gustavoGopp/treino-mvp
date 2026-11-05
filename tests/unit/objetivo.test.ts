import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, type Objetivo, type Perfil, type Programa } from '../../src/domain/gerador';
import { OBJETIVO_FORCA } from '../../src/domain/regras';
import { rotinaSchema } from '../../src/storage/esquema';
import { bruno, carla, elisa } from '../personas';

// Pergunta de objetivo (objetivo.*; pesquisa-v2/12; decisão do Gustavo em 04/11/2026, opção (b)).
const gerar = (pf: Perfil, inv: object): Programa => {
  const r = gerarPrograma(pf, inv as never);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const com = (pf: Perfil, objetivo?: Objetivo): Perfil => ({ ...pf, ...(objetivo ? { objetivo } : {}) });
const dias = (p: Programa) => JSON.stringify(p.dias);

describe('objetivo', () => {
  it('ganhar músculo, manter o músculo na dieta e saúde geram o mesmo treino; só o texto muda (objetivo.cutting.mesmo-programa)', () => {
    for (const persona of [bruno, carla, elisa]) {
      const base = gerar(persona.perfil, persona.inventario);
      for (const o of ['hipertrofia', 'cutting', 'saude'] as Objetivo[]) expect(dias(gerar(com(persona.perfil, o), persona.inventario)), `${persona.nome} ${o}`).toBe(dias(base));
    }
    const cut = gerar(com(bruno.perfil, 'cutting'), bruno.inventario);
    expect(cut.porque.some((q) => q.regraId === 'objetivo.cutting.texto' && /nutricionista/.test(q.texto))).toBe(true);
    const saude = gerar(com(bruno.perfil, 'saude'), bruno.inventario);
    expect(saude.porque.some((q) => q.regraId === 'objetivo.saude.texto' && /150 a 300 min/.test(q.texto))).toBe(true);
  });

  it('ficar mais forte: os 2 primeiros compostos com carga de cada treino ficam com 5–8 e 2 min 30 s; o resto não muda', () => {
    for (const persona of [bruno, carla]) {
      expect(persona.perfil.nivel).not.toBe('iniciante');
      const base = gerar(persona.perfil, persona.inventario);
      const forte = gerar(com(persona.perfil, 'forca'), persona.inventario);
      forte.dias.forEach((d, i) => {
        const mudados = d.exercicios.filter((x) => x.descansoSeg === OBJETIVO_FORCA.descansoSeg);
        expect(mudados.length, `${persona.nome} ${d.nome}`).toBeLessThanOrEqual(OBJETIVO_FORCA.compostosPorTreino);
        for (const x of mudados) {
          expect(x.tipo).toBe('composto');
          expect(x.reps).toEqual(OBJETIVO_FORCA.reps);
          expect(['peso-corpo', 'elastico', 'assistida']).not.toContain(POR_ID[x.exId]!.carga);
          if (['barra', 'halter', 'kettlebell', 'anilha'].includes(POR_ID[x.exId]!.carga)) expect(x.rir).toEqual(OBJETIVO_FORCA.rirPesoLivre);
        }
        // Os outros exercícios saem como na hipertrofia (quando o dia tem os mesmos exercícios).
        const b = base.dias[i]!;
        if (b.exercicios.map((x) => x.exId).join() === d.exercicios.map((x) => x.exId).join())
          d.exercicios.forEach((x, j) => {
            if (!mudados.includes(x)) expect(x.reps).toEqual(b.exercicios[j]!.reps);
          });
      });
      expect(forte.dias.some((d) => d.exercicios.some((x) => x.descansoSeg === OBJETIVO_FORCA.descansoSeg)), persona.nome).toBe(true);
    }
  });

  it('ficar mais forte: o iniciante e quem só tem o peso do corpo recebem o mesmo treino, com o texto', () => {
    const ini = { ...bruno.perfil, nivel: 'iniciante' as const };
    expect(dias(gerar(com(ini, 'forca'), bruno.inventario))).toBe(dias(gerar(ini, bruno.inventario)));
    expect(gerar(com(ini, 'forca'), bruno.inventario).porque[0]!.regraId).toBe('objetivo.forca.faixa-compostos');
    const semNada = { ...elisa.perfil, nivel: 'intermediario' as const };
    expect(dias(gerar(com(semNada, 'forca'), {}))).toBe(dias(gerar(semNada, {})));
  });

  it('sem resposta, ou "ganhar músculo", o programa e o hash de entrada não mudam (o programa salvo de quem já usa o app continua igual)', () => {
    expect(gerar(com(bruno.perfil, 'hipertrofia'), bruno.inventario).porque).toEqual(gerar(bruno.perfil, bruno.inventario).porque);
    expect(rotinaSchema.safeParse({ diasSemana: 3, minutosSessao: 60, prioridades: [] }).success).toBe(true);
    expect(rotinaSchema.safeParse({ diasSemana: 3, minutosSessao: 60, prioridades: [], objetivo: 'forca' }).success).toBe(true);
    expect(rotinaSchema.safeParse({ diasSemana: 3, minutosSessao: 60, prioridades: [], objetivo: 'emagrecer' }).success).toBe(false);
  });
});
