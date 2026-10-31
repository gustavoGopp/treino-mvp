import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { gerarPrograma } from '../../src/domain/gerador';
import { exportarJson, importarJson, nomeDoArquivo } from '../../src/storage/arquivo';
import { estadoSchema, estadoVazio, perfilDe, primeiroPassoPendente, type Estado } from '../../src/storage/esquema';
import { migrar, type Migracao } from '../../src/storage/migracao';
import { PERSONAS, type Persona } from '../personas';

const DATA = '2026-10-31T12:00:00.000Z';

/** Estado completo montado a partir de uma persona fictícia, como se ela tivesse feito o onboarding. */
function estadoDe(p: Persona): Estado {
  const { perfil } = p;
  const r = gerarPrograma(perfil, p.inventario);
  if (r.status !== 'ok') throw new Error('persona bloqueada');
  return {
    versao: 1,
    avisoAceitoEm: DATA,
    triagem: perfil.triagem,
    nivel: { respostas: { tempoContinuo: '6-24m', semanasParado: perfil.semanasParado, tecnica: 'sim' }, escolhido: perfil.nivel },
    rotina: { diasSemana: perfil.diasSemana, minutosSessao: perfil.minutosSessao, prioridades: perfil.prioridades },
    inventario: p.inventario,
    restricoes: { evitarExercicios: perfil.evitarExercicios, evitarEquipamentos: perfil.evitarEquipamentos, dores: perfil.dores },
    programa: { programa: r.programa, geradoEm: DATA },
  };
}

describe('esquema do estado', () => {
  it.each(Object.keys(PERSONAS))('aceita o estado completo e o programa gerado para %s', (nome) => {
    const e = estadoDe(PERSONAS[nome as keyof typeof PERSONAS]);
    expect(estadoSchema.parse(e)).toEqual(e);
  });

  it('remonta o mesmo perfil que gerou o programa', () => {
    for (const p of Object.values(PERSONAS)) expect(perfilDe(estadoDe(p))).toEqual(p.perfil);
  });

  it('perfil fica nulo enquanto falta um passo, e o passo pendente segue a ordem do onboarding', () => {
    const e = estadoDe(PERSONAS.ana);
    expect(primeiroPassoPendente(estadoVazio())?.id).toBe('aviso');
    expect(primeiroPassoPendente({ ...e, rotina: undefined })?.id).toBe('rotina');
    expect(perfilDe({ ...e, restricoes: undefined })).toBeNull();
    expect(primeiroPassoPendente(e)).toBeNull();
  });

  it('guarda a liberação da triagem só com a data, e a repassa ao gerador', () => {
    const e = estadoDe(PERSONAS.ana);
    const triagem = { ...e.triagem!, respostas: { ...e.triagem!.respostas, coracao: true }, liberacaoConfirmada: true, liberacaoConfirmadaEm: DATA };
    const perfil = perfilDe({ ...e, triagem })!;
    expect(perfil.triagem.liberacaoConfirmada).toBe(true);
    expect(gerarPrograma(perfil, e.inventario!).status).toBe('ok');
  });
});

describe('migração', () => {
  it('rejeita dados sem versão, de versão mais nova ou fora do formato', () => {
    expect(migrar(null)).toMatchObject({ ok: false });
    expect(migrar([])).toMatchObject({ ok: false });
    expect(migrar({})).toMatchObject({ ok: false, erro: expect.stringContaining('versão') });
    expect(migrar({ versao: 2 })).toMatchObject({ ok: false, erro: expect.stringContaining('mais nova') });
    expect(migrar({ versao: 1, rotina: { diasSemana: 7, minutosSessao: 50, prioridades: [] } })).toMatchObject({
      ok: false,
      erro: expect.stringContaining('rotina.diasSemana'),
    });
  });

  it('aplica as migrações em sequência até a versão atual', () => {
    // Cenário fictício: a versão 1 guardava "aceite"; a 2 renomeia para "avisoAceitoEm"; a 3 cria "ajustes".
    const migracoes: Record<number, Migracao> = {
      1: ({ aceite, ...resto }) => ({ ...resto, avisoAceitoEm: aceite }),
      2: (anterior) => ({ ...anterior, ajustes: { recolhido: false } }),
    };
    const v3 = estadoSchema.extend({ versao: z.literal(3) }) as unknown as typeof estadoSchema;
    expect(migrar({ versao: 1, aceite: DATA }, migracoes, 3, v3)).toEqual({
      ok: true,
      estado: { versao: 3, avisoAceitoEm: DATA, ajustes: { recolhido: false } },
    });
    expect(migrar({ versao: 2, avisoAceitoEm: DATA }, migracoes, 3, v3)).toMatchObject({ ok: true, estado: { ajustes: { recolhido: false } } });
    expect(migrar({ versao: 1, aceite: DATA }, {}, 3, v3)).toMatchObject({ ok: false, erro: expect.stringContaining('versão 1') });
  });

  it('na versão atual, devolve o estado validado', () => {
    const e = estadoDe(PERSONAS.bruno);
    expect(migrar(JSON.parse(JSON.stringify(e)))).toEqual({ ok: true, estado: e });
  });
});

describe('exportação e importação', () => {
  it('exportar e importar devolve o mesmo estado', () => {
    for (const p of Object.values(PERSONAS)) {
      const e = estadoDe(p);
      expect(importarJson(exportarJson(e, DATA))).toEqual({ ok: true, estado: e });
    }
  });

  it('recusa arquivo que não é JSON, de outro app ou com item fora da taxonomia', () => {
    expect(importarJson('{')).toMatchObject({ ok: false, erro: expect.stringContaining('JSON') });
    expect(importarJson(JSON.stringify({ app: 'outro', estado: {} }))).toMatchObject({ ok: false, erro: expect.stringContaining('treino-mvp') });
    const e = { ...estadoDe(PERSONAS.ana), inventario: { halteres_fixos: { minKg: 1, maxKg: 12, passoKg: 1 }, nave_espacial: {} } };
    expect(importarJson(JSON.stringify({ app: 'treino-mvp', estado: e }))).toMatchObject({ ok: false });
  });

  it('dá ao arquivo um nome com a data', () => {
    expect(nomeDoArquivo(new Date(DATA))).toBe('treino-mvp-2026-10-31.json');
  });
});
