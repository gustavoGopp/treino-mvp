import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { gerarPrograma } from '../../src/domain/gerador';
import { exportarJson, importarJson, nomeDoArquivo } from '../../src/storage/arquivo';
import { estadoSchema, estadoVazio, perfilDe, primeiroPassoPendente, VERSAO_ESTADO, type Estado } from '../../src/storage/esquema';
import { migrar, type Migracao } from '../../src/storage/migracao';
import { capacidades } from '../../src/domain/taxonomia/equipamentos';
import { avaliarTriagem } from '../../src/domain/triagem';
import { PERSONAS, type Persona } from '../personas';

const DATA = '2026-10-31T12:00:00.000Z';

/** O mesmo estado no formato de antes do R1b (versão 5 ou anterior): um inventário só, no topo. */
function antesDosLocais(e: Estado): Record<string, unknown> {
  const { locais, ...resto } = JSON.parse(JSON.stringify(e)) as Estado;
  return { ...resto, ...(locais?.[0] ? { inventario: locais[0].inventario } : {}) };
}
const inv = (e: Estado) => e.locais![0]!.inventario;

/** Estado completo montado a partir de uma persona fictícia, como se ela tivesse feito o onboarding. */
function estadoDe(p: Persona): Estado {
  const { perfil } = p;
  const r = gerarPrograma(perfil, p.inventario);
  if (r.status !== 'ok') throw new Error('persona bloqueada');
  return {
    versao: VERSAO_ESTADO,
    avisoAceitoEm: DATA,
    triagem: perfil.triagem,
    nivel: { respostas: { tempoContinuo: '6-24m', semanasParado: perfil.semanasParado, tecnica: 'sim' }, escolhido: perfil.nivel },
    rotina: {
      diasSemana: perfil.diasSemana,
      ...(perfil.divisao ? { divisao: perfil.divisao } : {}),
      minutosSessao: perfil.minutosSessao,
      prioridades: perfil.prioridades,
    },
    locais: [{ id: 'local-1', nome: 'Meu local', inventario: p.inventario }],
    restricoes: { evitarExercicios: perfil.evitarExercicios, evitarEquipamentos: perfil.evitarEquipamentos },
    programa: { programa: r.programa, geradoEm: DATA },
    historico: [
      {
        id: 's1',
        diaId: r.programa.dias[0]!.id,
        semana: 1,
        inicio: DATA,
        fim: DATA,
        exercicios: [{ exId: r.programa.dias[0]!.exercicios[0]!.exId, series: [{ carga: { tipo: 'kg', kg: 10 }, reps: 10, rir: 2 }] }],
      },
    ],
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
    expect(gerarPrograma(perfil, inv(e)).status).toBe('ok');
  });
});

describe('migração', () => {
  it('rejeita dados sem versão, de versão mais nova ou fora do formato', () => {
    expect(migrar(null)).toMatchObject({ ok: false });
    expect(migrar([])).toMatchObject({ ok: false });
    expect(migrar({})).toMatchObject({ ok: false, erro: expect.stringContaining('versão') });
    expect(migrar({ versao: VERSAO_ESTADO + 1 })).toMatchObject({ ok: false, erro: expect.stringContaining('mais nova') });
    expect(migrar({ versao: VERSAO_ESTADO, historico: [], rotina: { diasSemana: 7, minutosSessao: 50, prioridades: [] } })).toMatchObject({
      ok: false,
      erro: expect.stringContaining('rotina.diasSemana'),
    });
  });

  it('aplica as migrações em sequência até a versão atual', () => {
    // Cenário fictício: a versão 1 guardava "aceite"; a 2 renomeia para "avisoAceitoEm"; a 3 cria "ajustes".
    const migracoes: Record<number, Migracao> = {
      1: ({ aceite, ...resto }) => ({ ...resto, avisoAceitoEm: aceite }),
      2: (anterior) => ({ ...anterior, historico: [], ajustes: { recolhido: false } }),
    };
    const v3 = estadoSchema.extend({ versao: z.literal(3) }) as unknown as typeof estadoSchema;
    expect(migrar({ versao: 1, aceite: DATA }, migracoes, 3, v3)).toEqual({
      ok: true,
      estado: { versao: 3, avisoAceitoEm: DATA, historico: [], ajustes: { recolhido: false } },
    });
    expect(migrar({ versao: 2, avisoAceitoEm: DATA }, migracoes, 3, v3)).toMatchObject({ ok: true, estado: { ajustes: { recolhido: false } } });
    expect(migrar({ versao: 1, aceite: DATA }, {}, 3, v3)).toMatchObject({ ok: false, erro: expect.stringContaining('versão 1') });
  });

  it('versão 1 (antes do M5) ganha o histórico vazio e continua com o programa', () => {
    const e = estadoDe(PERSONAS.ana);
    const { historico, ...v1 } = antesDosLocais(e);
    void historico;
    const r = migrar({ ...v1, versao: 1 });
    expect(r).toEqual({ ok: true, estado: { ...e, historico: [] } });
  });

  it('versão 2 (antes do R0b) vira a atual sem inventar divisão: a rotina e o programa salvo ficam iguais', () => {
    const e = estadoDe(PERSONAS.bruno);
    // Programa salvo antes do R0b: sem divisaoId nem funcao nas vagas.
    const { divisaoId, ...programaAntigo } = e.programa!.programa;
    void divisaoId;
    const antigo = {
      ...e,
      versao: 2,
      programa: { ...e.programa!, programa: { ...programaAntigo, dias: programaAntigo.dias.map((d) => ({ ...d, exercicios: d.exercicios.map(({ funcao, ...x }) => (void funcao, x)) })) } },
    };
    const r = migrar({ ...antesDosLocais(antigo as Estado), versao: 2 });
    expect(r).toEqual({ ok: true, estado: { ...antigo, versao: VERSAO_ESTADO } });
    if (!r.ok) return;
    expect(r.estado.rotina!.divisao).toBeUndefined();
    expect(perfilDe(r.estado)!.divisao).toBeUndefined();
  });

  it('versão 3 → 4 (R0c): a polia simples regulável vira "altura: regulavel"; a fixa fica sem altura, sem inventar', () => {
    const e = estadoDe(PERSONAS.ana);
    const v3 = (alturaRegulavel: boolean) => ({
      ...antesDosLocais(e),
      versao: 3,
      inventario: { ...inv(e), polia_simples: { alturaRegulavel, placas: 12 } },
    });
    const regulavel = migrar(v3(true));
    expect(regulavel).toMatchObject({ ok: true, estado: { versao: VERSAO_ESTADO, locais: [{ inventario: { polia_simples: { altura: 'regulavel', placas: 12 } } }] } });
    if (regulavel.ok) {
      expect(inv(regulavel.estado).polia_simples).toEqual({ altura: 'regulavel', placas: 12 });
      expect([...capacidades(inv(regulavel.estado))]).toEqual(expect.arrayContaining(['polia', 'polia_alta', 'polia_baixa']));
    }
    const fixa = migrar(v3(false));
    expect(fixa.ok && inv(fixa.estado).polia_simples).toEqual({ placas: 12 });
    // Até a pessoa dizer a altura, a polia fixa só dá "polia", que nenhum exercício pede (exatamente como na versão 3).
    if (fixa.ok) {
      const caps = capacidades(inv(fixa.estado));
      expect(caps.has('polia')).toBe(true);
      expect(caps.has('polia_alta') || caps.has('polia_baixa')).toBe(false);
    }
    // Sem polia simples, nada muda.
    expect(migrar({ ...antesDosLocais(e), versao: 3 })).toEqual({ ok: true, estado: e });
  });

  it('versão 4 → 5 (R1): a dor vai para um lugar só, a triagem, sem inventar nota nem resposta', () => {
    const e = estadoDe(PERSONAS.bruno);
    const v4 = {
      ...antesDosLocais(e),
      versao: 4,
      triagem: { respostas: { ...e.triagem!.respostas, osteoarticular: true }, regioes: ['joelho', 'ombro'] },
      restricoes: { ...e.restricoes, dores: [{ articulacao: 'ombro', intensidade: 4 }, { articulacao: 'lombar', intensidade: 7 }] },
    };
    const r = migrar(v4);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    // Joelho: só na triagem, sem nota (continua excluído, como antes). Ombro: a nota de "Restrições" vem junto.
    // Lombar: só em "Restrições", com a nota dela. A resposta osteoarticular não muda.
    expect(r.estado.triagem).toEqual({
      respostas: { ...e.triagem!.respostas, osteoarticular: true },
      dores: [{ articulacao: 'joelho' }, { articulacao: 'lombar', nota: 7 }, { articulacao: 'ombro', nota: 4 }],
    });
    expect(r.estado.restricoes).toEqual({ evitarExercicios: e.restricoes!.evitarExercicios, evitarEquipamentos: e.restricoes!.evitarEquipamentos });
    const t = avaliarTriagem(perfilDe(r.estado)!.triagem);
    expect(t.regioesExcluidas).toEqual(['joelho', 'lombar']);
    expect(t.regioesDorLeve).toEqual(['ombro']);
    // Quem não tinha dor nenhuma continua sem dor, e a resposta "não" fica "não".
    const semDor = migrar({ ...antesDosLocais(e), versao: 4, restricoes: { ...e.restricoes, dores: [] } });
    expect(semDor.ok && semDor.estado.triagem).toEqual(e.triagem);
    // Dor só em "Restrições", com "não" na pergunta osteoarticular: a nota segue valendo, e a resposta não é trocada.
    const soRestricoes = migrar({ ...antesDosLocais(e), versao: 4, restricoes: { ...e.restricoes, dores: [{ articulacao: 'punho', intensidade: 2 }] } });
    expect(soRestricoes.ok && soRestricoes.estado.triagem).toEqual({ ...e.triagem, dores: [{ articulacao: 'punho', nota: 2 }] });
  });

  it('versão 3 guarda a divisão escolhida e aceita 6 dias; ela chega ao gerador pelo perfil', () => {
    const e = estadoDe(PERSONAS.carla);
    const comDivisao: Estado = { ...e, rotina: { ...e.rotina!, diasSemana: 6, divisao: 'si-3x' } };
    expect(migrar(JSON.parse(JSON.stringify(comDivisao)))).toEqual({ ok: true, estado: comDivisao });
    expect(perfilDe(comDivisao)).toMatchObject({ diasSemana: 6, divisao: 'si-3x' });
    const r = gerarPrograma(perfilDe(comDivisao)!, inv(comDivisao));
    expect(r.status === 'ok' && r.programa.divisaoId).toBe('si-3x');
    expect(migrar({ ...JSON.parse(JSON.stringify(e)), rotina: { ...e.rotina, divisao: 'abcdef' } })).toMatchObject({ ok: false });
  });

  it('versão 5 → 6 (R1b): o inventário vira o 1º local, "Meu local", sem perder nenhum atributo e sem inventar nada', () => {
    for (const p of Object.values(PERSONAS)) {
      const e = estadoDe(p);
      const v5 = { ...antesDosLocais(e), versao: 5 } as unknown as Record<string, unknown> & { inventario: unknown };
      const r = migrar(v5);
      expect(r).toEqual({ ok: true, estado: e });
      if (!r.ok) continue;
      expect(r.estado.locais).toEqual([{ id: 'local-1', nome: 'Meu local', inventario: v5.inventario }]);
      // Todos os atributos do inventário, sem tirar nem pôr.
      expect(r.estado.locais![0]!.inventario).toStrictEqual(v5.inventario);
      // Nada inventado: sem principal, sem último local, sem preferência; as sessões antigas ficam sem local.
      expect(r.estado.localPrincipalId).toBeUndefined();
      expect(r.estado.ultimoLocalId).toBeUndefined();
      expect(r.estado.preferidos).toBeUndefined();
      expect(r.estado.historico.every((s) => s.localId === undefined)).toBe(true);
      // O programa sai igual, montado para o 1º local.
      const g = gerarPrograma(perfilDe(r.estado)!, inv(r.estado));
      const semHash = ({ entradasHash, ...p }: { entradasHash: string }) => (void entradasHash, p);
      expect(g.status === 'ok' && semHash(g.programa)).toEqual(semHash(e.programa!.programa));
    }
    // Quem ainda não tinha cadastrado o equipamento continua sem local.
    const { inventario, ...semInv } = antesDosLocais(estadoDe(PERSONAS.ana));
    void inventario;
    const r = migrar({ ...semInv, versao: 5 });
    expect(r.ok && r.estado.locais).toBeUndefined();
    expect(r.ok && primeiroPassoPendente(r.estado)?.id).toBe('inventario');
  });

  it('um arquivo exportado na versão 5 é importado já com o 1º local', () => {
    const e = estadoDe(PERSONAS.carla);
    const arquivo = JSON.stringify({ app: 'treino-mvp', exportadoEm: DATA, estado: { ...antesDosLocais(e), versao: 5 } });
    expect(importarJson(arquivo)).toEqual({ ok: true, estado: e });
  });

  it('dois locais, preferência e local da sessão passam pela exportação e voltam iguais', () => {
    const e: Estado = {
      ...estadoDe(PERSONAS.bruno),
      locais: [
        { id: 'local-1', nome: 'Prédio', inventario: PERSONAS.bruno.inventario },
        { id: 'local-2', nome: 'Academia do bairro', inventario: { halteres_fixos: { minKg: 2, maxKg: 30, passoKg: 2 }, barra_fixa: {} } },
      ],
      localPrincipalId: 'local-1',
      ultimoLocalId: 'local-2',
      preferidos: { agachar: 'leg-press' },
    };
    e.historico = e.historico.map((s) => ({ ...s, localId: 'local-2', exercicios: s.exercicios.map((x) => ({ ...x, series: x.series.map((y) => ({ ...y, calibracao: true })) })) }));
    expect(importarJson(exportarJson(e, DATA))).toEqual({ ok: true, estado: e });
    // Ids de local repetidos são recusados.
    expect(migrar({ ...e, locais: [e.locais![0], e.locais![0]] })).toMatchObject({ ok: false });
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
    const e = { ...estadoDe(PERSONAS.ana), locais: [{ id: 'local-1', nome: 'Meu local', inventario: { halteres_fixos: { minKg: 1, maxKg: 12, passoKg: 1 }, nave_espacial: {} } }] };
    expect(importarJson(JSON.stringify({ app: 'treino-mvp', estado: e }))).toMatchObject({ ok: false });
  });

  it('dá ao arquivo um nome com a data', () => {
    expect(nomeDoArquivo(new Date(DATA))).toBe('treino-mvp-2026-10-31.json');
  });
});
