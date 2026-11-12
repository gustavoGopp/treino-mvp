import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, type Objetivo, type Perfil, type Programa } from '../../src/domain/gerador';
import { OBJETIVO_FORCA } from '../../src/domain/regras';
import { perfilDe, rotinaSchema, VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
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
    // só o texto muda: o volume, as metas, as fases e os avisos também são os mesmos
    for (const o of ['cutting', 'saude'] as Objetivo[]) {
      const { porque: _p, entradasHash: _h, ...resto } = gerar(com(bruno.perfil, o), bruno.inventario);
      const { porque: _p0, entradasHash: _h0, ...base } = gerar(bruno.perfil, bruno.inventario);
      void [_p, _h, _p0, _h0];
      expect(resto).toEqual(base);
    }
    const cut = gerar(com(bruno.perfil, 'cutting'), bruno.inventario);
    expect(cut.porque.some((q) => q.regraId === 'objetivo.cutting.texto' && /nutricionista/.test(q.texto))).toBe(true);
    const saude = gerar(com(bruno.perfil, 'saude'), bruno.inventario);
    expect(saude.porque.some((q) => q.regraId === 'objetivo.saude.texto' && /150 a 300 min/.test(q.texto))).toBe(true);
  });

  it('ficar mais forte: os 2 primeiros compostos com carga de cada treino ficam com 5–8 e 2 min 30 s; o resto não muda', () => {
    const comCarga = (exId: string) => !['peso-corpo', 'elastico', 'assistida'].includes(POR_ID[exId]!.carga);
    for (const persona of [bruno, carla]) {
      expect(persona.perfil.nivel).not.toBe('iniciante');
      const base = gerar(persona.perfil, persona.inventario);
      const forte = gerar(com(persona.perfil, 'forca'), persona.inventario);
      expect(forte.dias.map((d) => d.exercicios.map((x) => x.exId))).toEqual(base.dias.map((d) => d.exercicios.map((x) => x.exId)));
      forte.dias.forEach((d, i) => {
        // quem muda: exatamente os 2 primeiros compostos com carga do dia, na ordem do treino
        const esperados = d.exercicios.filter((x) => x.tipo === 'composto' && comCarga(x.exId)).slice(0, OBJETIVO_FORCA.compostosPorTreino).map((x) => x.exId);
        const mudados = d.exercicios.filter((x) => x.porque.some((q) => q.regraId === 'objetivo.forca.faixa-compostos'));
        expect(mudados.map((x) => x.exId), `${persona.nome} ${d.nome}`).toEqual(esperados);
        for (const x of mudados) {
          expect(x.reps).toEqual(OBJETIVO_FORCA.reps);
          expect(x.descansoSeg).toBe(OBJETIVO_FORCA.descansoSeg);
          if (['barra', 'halter', 'kettlebell', 'anilha'].includes(POR_ID[x.exId]!.carga)) expect(x.rir).toEqual(OBJETIVO_FORCA.rirPesoLivre);
          expect(x.porque.at(-1)!.texto).toContain('5 a 8 repetições e descanso de 2 min 30 s');
        }
        // o resto não muda: a faixa de repetições, a reserva e o descanso são os da hipertrofia. As séries e as técnicas
        // de tempo (supersérie, drop set) podem mudar, porque o descanso maior dos 2 primeiros disputa os minutos do dia.
        const faixa = (x: Programa['dias'][number]['exercicios'][number]) => ({ exId: x.exId, tipo: x.tipo, reps: x.reps, rir: x.rir, descansoSeg: x.descansoSeg, unilateral: x.unilateral });
        d.exercicios.forEach((x, j) => {
          if (!mudados.includes(x)) expect(faixa(x), `${persona.nome} ${d.nome} ${x.exId}`).toEqual(faixa(base.dias[i]!.exercicios[j]!));
        });
      });
      expect(forte.dias.every((d) => d.exercicios.some((x) => x.descansoSeg === OBJETIVO_FORCA.descansoSeg)), persona.nome).toBe(true);
    }
  });

  it('ficar mais forte: o iniciante e quem só tem o peso do corpo recebem o mesmo treino, com o texto', () => {
    const ini = { ...bruno.perfil, nivel: 'iniciante' as const };
    expect(dias(gerar(com(ini, 'forca'), bruno.inventario))).toBe(dias(gerar(ini, bruno.inventario)));
    expect(gerar(com(ini, 'forca'), bruno.inventario).porque[0]!.regraId).toBe('objetivo.forca.faixa-compostos');
    const semNada = { ...elisa.perfil, nivel: 'intermediario' as const };
    expect(dias(gerar(com(semNada, 'forca'), {}))).toBe(dias(gerar(semNada, {})));
    // os dois recebem o texto do objetivo, que diz o que muda (ou que ainda não muda)
    expect(gerar(com(semNada, 'forca'), {}).porque[0]!.regraId).toBe('objetivo.forca.faixa-compostos');
    expect(gerar(com(ini, 'forca'), bruno.inventario).porque[0]!.texto).toMatch(/no começo, o treino é o mesmo/);
  });

  it('sem resposta, ou "ganhar músculo", o programa e o hash de entrada não mudam (o programa salvo de quem já usa o app continua igual)', () => {
    // O perfil que o app monta do estado não leva "ganhar músculo": é o mesmo de quem nunca respondeu.
    const estado = (objetivo?: Objetivo): Estado => ({
      versao: VERSAO_ESTADO,
      triagem: bruno.perfil.triagem,
      nivel: { respostas: { tempoContinuo: '6-24m', semanasParado: 0, tecnica: 'sim' }, escolhido: bruno.perfil.nivel },
      rotina: { diasSemana: bruno.perfil.diasSemana, minutosSessao: bruno.perfil.minutosSessao, prioridades: bruno.perfil.prioridades, ...(objetivo ? { objetivo } : {}) },
      locais: [{ id: 'local-1', nome: 'Meu local', inventario: bruno.inventario }],
      historico: [],
    });
    const semResposta = perfilDe(estado())!;
    expect(perfilDe(estado('hipertrofia'))).toEqual(semResposta);
    expect(semResposta).not.toHaveProperty('objetivo');
    const a = gerar(semResposta, bruno.inventario);
    const b = gerar(perfilDe(estado('hipertrofia'))!, bruno.inventario);
    expect(b).toEqual(a);
    expect(b.entradasHash).toBe(a.entradasHash);
    // já outro objetivo muda o hash: o app oferece atualizar o programa
    expect(gerar(perfilDe(estado('forca'))!, bruno.inventario).entradasHash).not.toBe(a.entradasHash);
    expect(rotinaSchema.safeParse({ diasSemana: 3, minutosSessao: 60, prioridades: [] }).success).toBe(true);
    expect(rotinaSchema.safeParse({ diasSemana: 3, minutosSessao: 60, prioridades: [], objetivo: 'forca' }).success).toBe(true);
    expect(rotinaSchema.safeParse({ diasSemana: 3, minutosSessao: 60, prioridades: [], objetivo: 'emagrecer' }).success).toBe(false);
  });
});
