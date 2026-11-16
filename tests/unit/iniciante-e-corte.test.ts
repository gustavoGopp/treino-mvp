import { beforeAll, describe, expect, it, vi } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { carregaLombar, contextoDeSelecao, gerarPrograma, seriesDeVolume, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { medirRegua } from '../../scripts/auditoria/regua';
import { inventarioDe, perfilDe, type Pedido } from '../../scripts/auditoria/ver-lib';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';

// Sessão "treino para todos", etapa 2, pacote 4 (16/11/2026): o corte de tempo revisto e o iniciante.
//  - tempo.corte (degrau 1b): no dia que não cabe no tempo, o exercício de um lado só dá lugar ao equivalente de dois
//    lados do mesmo nível da função, antes de qualquer técnica ou corte.
//  - tempo.superserie: a dupla de dois exercícios que carregam a lombar sem apoio é o último recurso do corte.
//  - selecao.pratica-do-iniciante: o iniciante repete o exercício que já está na semana, se isso não custar outra coisa.
// O "antes" de cada regra é o protótipo (scripts/auditoria/prototipo) com todas as adotadas menos ela. Só personas e
// perfis fictícios.

// As grades deste arquivo geram centenas de programas duas vezes (antes e depois): mais folga que os 5 s do padrão.
vi.setConfig({ testTimeout: 30_000 });

const TODAS = Object.values({ ...PERSONAS, ...PERSONAS_NOVAS });
const pedido = (p: Partial<Pedido> & { cenario: string }): Pedido => ({ nivel: 'intermediario', dias: '3', min: 60, focos: [], dores: [], semanasParado: 0, ...p });
const programa = (gerar: typeof gerarPrograma, perfil: Perfil, inventario: Inventario): Programa => {
  const r = gerar(perfil, inventario);
  if (r.status !== 'ok') throw new Error('sem programa');
  return r.programa;
};
const todos = (p: Programa) => p.dias.flatMap((d) => d.exercicios);
const ids = (p: Programa) => todos(p).map((x) => x.exId);
const carregarAntes = async (prot: string) => {
  vi.stubEnv('PROT', prot);
  vi.resetModules();
  const m = (await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma };
  vi.unstubAllEnvs();
  return m.gerarPrograma;
};
const defeitos = (p: Programa, perfil: Perfil, inventario: Inventario) => [...medirRegua(p, perfil, contextoDeSelecao(perfil, inventario)).defeitos].sort();
const series = (p: Programa) => todos(p).reduce((t, x) => t + seriesDeVolume(x), 0);
const acimaDoTempo = (p: Programa, min: number) => p.dias.filter((d) => d.minutosEstimados > 1.1 * min).length;

describe('tempo.corte, degrau 1b: dois lados no lugar de um lado só quando o dia não cabe (pacote 4)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-corte-lado');
  });
  /** Treinos curtos, onde o corte age: quatro lugares, três níveis, 2 a 4 dias, 30 e 45 min, sem foco e com foco em pernas. */
  const GRADE = ['academia', 'condominio', 'halteres', 'casa+'].flatMap((cenario) =>
    (['iniciante', 'intermediario', 'avancado'] as const).flatMap((nivel) =>
      ['2', '3', '4'].flatMap((dias) => [30, 45].flatMap((min) => ([[], ['pernas'], ['peito', 'costas']] as Pedido['focos'][]).map((focos) => pedido({ cenario, nivel, dias, min, focos })))),
    ),
  );
  /** O exemplo medido: avançado, academia completa, 3 dias de 30 min, quer peito e costas. */
  const EXEMPLO = pedido({ cenario: 'academia', nivel: 'avancado', dias: '3', min: 30, focos: ['peito', 'costas'] });
  const pares = () =>
    GRADE.map((pd) => {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      return { pd, perfil, inventario, a: programa(antes, perfil, inventario), d: programa(gerarPrograma, perfil, inventario), nome: `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias de ${pd.min} min, foco ${pd.focos.join('+') || 'nenhum'}` };
    });

  it('na grade de treinos curtos, a troca acontece, e nenhum programa passa a ter mais dias acima de 110% do tempo', () => {
    let comTroca = 0;
    let melhoram = 0;
    for (const { pd, a, d, nome } of pares()) {
      if (todos(d).some((x) => x.porque.some((q) => q.regraId === 'tempo.corte'))) comTroca++;
      expect(acimaDoTempo(d, pd.min), nome).toBeLessThanOrEqual(acimaDoTempo(a, pd.min));
      if (acimaDoTempo(d, pd.min) < acimaDoTempo(a, pd.min)) melhoram++;
    }
    expect(comTroca).toBeGreaterThan(0);
    expect(melhoram).toBeGreaterThan(0);
    const [perfil, inventario] = [perfilDe(EXEMPLO), inventarioDe(EXEMPLO.cenario)];
    expect(acimaDoTempo(programa(antes, perfil, inventario), 30)).toBeGreaterThan(0);
    expect(acimaDoTempo(programa(gerarPrograma, perfil, inventario), 30)).toBe(0);
  });

  it('o exercício que entra é de dois lados, do mesmo nível da mesma função, e traz o porquê com o nome de quem saiu', () => {
    let vistos = 0;
    for (const { d, perfil, inventario, nome } of pares()) {
      const ctx = contextoDeSelecao(perfil, inventario);
      for (const x of todos(d)) {
        const q = x.porque.find((y) => y.regraId === 'tempo.corte');
        if (!q) continue;
        vistos++;
        expect(POR_ID[x.exId]!.unilateral, nome).toBe(false);
        expect(q.texto).toMatch(/^Entrou no lugar de .+ para o treino caber no tempo: trabalha os dois lados de uma vez, e cada série leva metade do tempo\.$/);
        // quem saiu é do mesmo nível da função de quem entrou, e de um lado só
        const f = FUNCAO[x.funcao!]!;
        const nivel = f.niveis.find((l) => l.includes(ctx.noLugarDe(x.exId)))!;
        const saiu = nivel.map((id) => POR_ID[id]!).find((e) => q.texto.startsWith(`Entrou no lugar de ${e.nome.toLowerCase()} para`));
        expect(saiu, `${nome}: ${q.texto}`).toBeDefined();
        expect(saiu!.unilateral).toBe(true);
      }
    }
    expect(vistos).toBeGreaterThan(0);
  });

  it('a troca não tira série da semana, não repete o exercício em todos os dias e não cria defeito da régua', () => {
    for (const { a, d, perfil, inventario, nome } of pares()) {
      expect(series(d), nome).toBeGreaterThanOrEqual(series(a));
      const [da, dd] = [defeitos(a, perfil, inventario), defeitos(d, perfil, inventario)];
      expect(dd.filter((x) => !da.includes(x)), nome).toEqual([]);
    }
  });

  it('com a troca, menos treinos precisam de dupla: na grade inteira, o nº de exercícios em bi-set cai', () => {
    // (não é programa a programa: num dia que ainda não cabe depois da troca, as duplas podem ser outras)
    const emDupla = (p: Programa) => todos(p).filter((x) => x.supersetCom).length;
    const [antesTotal, depoisTotal] = pares().reduce(([ta, td], { a, d }) => [ta + emDupla(a), td + emDupla(d)], [0, 0]);
    expect(depoisTotal).toBeLessThan(antesTotal);
  });

  it('o dia que já cabia no tempo não muda (a troca é um degrau do corte, e não uma regra de escolha)', () => {
    for (const cenario of ['academia', 'halteres'])
      for (const dias of ['3', '4']) {
        const pd = pedido({ cenario, dias, min: 90 });
        const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
        expect(ids(programa(gerarPrograma, perfil, inventario)), `${cenario}, ${dias} dias de 90 min`).toEqual(ids(programa(antes, perfil, inventario)));
      }
  });

  it('nas personas, não aparece defeito da régua que não havia', () => {
    for (const p of TODAS) {
      const [a, d] = [programa(antes, p.perfil, p.inventario), programa(gerarPrograma, p.perfil, p.inventario)];
      const [da, dd] = [defeitos(a, p.perfil, p.inventario), defeitos(d, p.perfil, p.inventario)];
      expect(dd.filter((x) => !da.includes(x)), p.nome).toEqual([]);
    }
  });
});

describe('tempo.superserie: a dupla de dois exercícios que carregam a lombar é o último recurso (pacote 4)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-tec-lombar');
  });
  /** Os pares em dupla de um programa em que os dois exercícios carregam a lombar sem apoio. */
  const duplasDeLombar = (p: Programa) =>
    p.dias.flatMap((d) => d.exercicios.filter((x) => x.supersetCom && carregaLombar(POR_ID[x.exId]!) && carregaLombar(POR_ID[x.supersetCom]!))).length / 2;
  /** Treinos curtos com peso livre, onde essas duplas apareciam. */
  const GRADE = ['academia', 'halteres', 'casa+', 'bairro'].flatMap((cenario) =>
    (['intermediario', 'avancado'] as const).flatMap((nivel) =>
      ['2', '3', '4'].flatMap((dias) => [30, 45].flatMap((min) => ([[], ['costas'], ['pernas']] as Pedido['focos'][]).map((focos) => pedido({ cenario, nivel, dias, min, focos })))),
    ),
  );
  const pares = () =>
    GRADE.map((pd) => {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      return { pd, perfil, inventario, a: programa(antes, perfil, inventario), d: programa(gerarPrograma, perfil, inventario), nome: `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias de ${pd.min} min, foco ${pd.focos.join('+') || 'nenhum'}` };
    });

  it('nenhum programa ganha uma dupla de lombar, e na grade elas caem', () => {
    let [ta, td] = [0, 0];
    for (const { a, d, nome } of pares()) {
      expect(duplasDeLombar(d), nome).toBeLessThanOrEqual(duplasDeLombar(a));
      ta += duplasDeLombar(a);
      td += duplasDeLombar(d);
    }
    expect(ta).toBeGreaterThan(0);
    expect(td).toBeLessThan(ta);
  });

  it('tirar a dupla não custa: nenhum dia a mais acima de 110% do tempo, nenhuma série a menos por causa disso e nenhum defeito novo', () => {
    for (const { pd, a, d, perfil, inventario, nome } of pares()) {
      expect(acimaDoTempo(d, pd.min), nome).toBeLessThanOrEqual(acimaDoTempo(a, pd.min));
      const [da, dd] = [defeitos(a, perfil, inventario), defeitos(d, perfil, inventario)];
      expect(dd.filter((x) => !da.includes(x)), nome).toEqual([]);
    }
  });

  it('onde a dupla de lombar continua, é porque já existia (o último recurso), e o programa é o mesmo de antes', () => {
    for (const { a, d, nome } of pares()) if (duplasDeLombar(d) > 0) expect(ids(d), nome).toEqual(ids(a));
  });

  it('nas personas, não aparece defeito da régua que não havia', () => {
    for (const p of TODAS) {
      const [a, d] = [programa(antes, p.perfil, p.inventario), programa(gerarPrograma, p.perfil, p.inventario)];
      const [da, dd] = [defeitos(a, p.perfil, p.inventario), defeitos(d, p.perfil, p.inventario)];
      expect(dd.filter((x) => !da.includes(x)), p.nome).toEqual([]);
    }
  });
});

describe('selecao.pratica-do-iniciante: prática antes de variedade, sem custo (pacote 4)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-iniciante-simples');
  });
  const diferentes = (p: Programa) => new Set(ids(p)).size;
  const fracos = (p: Programa) => p.dias.filter((d) => d.exercicios.length < 3 || !d.exercicios.some((x) => x.tipo === 'composto')).length;
  const grade = (niveis: Pedido['nivel'][]) =>
    ['academia', 'condominio', 'halteres-banco', 'casa+', 'elasticos'].flatMap((cenario) =>
      niveis.flatMap((nivel) => ['2', '3', '4', '5'].flatMap((dias) => [30, 45, 60].map((min) => pedido({ cenario, nivel, dias, min })))),
    );
  const pares = (niveis: Pedido['nivel'][]) =>
    grade(niveis).map((pd) => {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      return { pd, perfil, inventario, a: programa(antes, perfil, inventario), d: programa(gerarPrograma, perfil, inventario), nome: `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias de ${pd.min} min` };
    });

  it('o iniciante fica com menos exercícios diferentes na semana, e nenhum programa fica com mais', () => {
    let [ta, td] = [0, 0];
    for (const { a, d, nome } of pares(['iniciante'])) {
      expect(diferentes(d), nome).toBeLessThanOrEqual(diferentes(a));
      ta += diferentes(a);
      td += diferentes(d);
    }
    expect(td).toBeLessThan(ta);
  });

  it('o exemplo: iniciante na academia, 3 dias de 60 min, faz a mesma puxada nos dias em que puxa de cima', () => {
    const pd = pedido({ cenario: 'academia', nivel: 'iniciante', dias: '3', min: 60 });
    const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
    const puxadas = (p: Programa) => new Set(todos(p).filter((x) => x.funcao === 'puxar-vertical').map((x) => x.exId));
    expect(puxadas(programa(antes, perfil, inventario)).size).toBeGreaterThan(1);
    expect(puxadas(programa(gerarPrograma, perfil, inventario)).size).toBe(1);
  });

  it('nunca em todos os dias havendo outro do mesmo nível (o defeito B1 da régua não aparece)', () => {
    for (const { d, perfil, inventario, nome } of pares(['iniciante'])) expect(defeitos(d, perfil, inventario), nome).not.toContain('B1');
  });

  it('só vale se não custar: nenhum dia a mais acima de 110% do tempo, nenhum dia fraco a mais e nenhum defeito novo', () => {
    for (const { pd, a, d, perfil, inventario, nome } of pares(['iniciante'])) {
      expect(acimaDoTempo(d, pd.min), nome).toBeLessThanOrEqual(acimaDoTempo(a, pd.min));
      expect(fracos(d), nome).toBeLessThanOrEqual(fracos(a));
      const [da, dd] = [defeitos(a, perfil, inventario), defeitos(d, perfil, inventario)];
      expect(dd.filter((x) => !da.includes(x)), nome).toEqual([]);
    }
  });

  it('as séries da semana não caem por causa da regra', () => {
    for (const { a, d, nome } of pares(['iniciante'])) expect(series(d), nome).toBeGreaterThanOrEqual(series(a) - 2);
  });

  it('o intermediário e o avançado não mudam', () => {
    for (const { a, d, nome } of pares(['intermediario', 'avancado'])) expect(ids(d), nome).toEqual(ids(a));
  });

  it('nas personas, não aparece defeito da régua que não havia', () => {
    for (const p of TODAS) {
      const [a, d] = [programa(antes, p.perfil, p.inventario), programa(gerarPrograma, p.perfil, p.inventario)];
      const [da, dd] = [defeitos(a, p.perfil, p.inventario), defeitos(d, p.perfil, p.inventario)];
      expect(dd.filter((x) => !da.includes(x)), p.nome).toEqual([]);
    }
  });
});
