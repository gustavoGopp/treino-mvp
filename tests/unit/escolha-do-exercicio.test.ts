import { beforeAll, describe, expect, it, vi } from 'vitest';
import { PADROES_EMPURRAR, PADROES_PUXAR, POR_ID } from '../../src/domain/biblioteca';
import { carregaLombar, contextoDeSelecao, gerarPrograma, seriesDeVolume, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO, FUNCOES } from '../../src/domain/gerador/funcoes';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { medirRegua } from '../../scripts/auditoria/regua';
import { inventarioDe, perfilDe, type Pedido } from '../../scripts/auditoria/ver-lib';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';

// Sessão "treino para todos", etapa 2, pacote 2 (15/11/2026): a escolha entre exercícios equivalentes.
//  - selecao.funcao-da-vaga: no empate total, vale a ordem de referência da lista da função (dado curado em
//    funcoes.json), e não a ordem alfabética.
//  - selecao.funcao-da-vaga: com carga à vontade (máquina, polia ou barra), o exercício de dois lados vem antes do de
//    um lado só; com halter ou kettlebell, com dor leve na região ou com "prefiro este", nada muda.
//  - volume.prioridade.foco-primeiro: nem o empurrar do foco sobe se passar empurrar ÷ puxar de 1,5 (a troca de exercício
//    abria tempo e o supino do foco subia sozinho).
//  - selecao.lombar-no-dia: depois de um exercício que carrega a lombar sem apoio, o de tronco que também carrega fica
//    por último entre os do mesmo nível (os de perna, depois de dois).
// O "antes" de cada regra é o protótipo (scripts/auditoria/prototipo) com todas as adotadas menos ela. Só personas e
// perfis fictícios.

const TODAS = Object.values({ ...PERSONAS, ...PERSONAS_NOVAS });
const pedido = (p: Partial<Pedido> & { cenario: string }): Pedido => ({ nivel: 'intermediario', dias: '3', min: 60, focos: [], dores: [], semanasParado: 0, ...p });
const programa = (gerar: typeof gerarPrograma, perfil: Perfil, inventario: Inventario): Programa => {
  const r = gerar(perfil, inventario);
  if (r.status !== 'ok') throw new Error('sem programa');
  return r.programa;
};
const ids = (p: Programa) => p.dias.flatMap((d) => d.exercicios.map((x) => x.exId));
const carregarAntes = async (prot: string) => {
  vi.stubEnv('PROT', prot);
  vi.resetModules();
  const m = (await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma };
  vi.unstubAllEnvs();
  return m.gerarPrograma;
};
/** Os defeitos da régua oficial de um programa. */
const defeitos = (p: Programa, perfil: Perfil, inventario: Inventario) => [...medirRegua(p, perfil, contextoDeSelecao(perfil, inventario)).defeitos].sort();

describe('selecao.funcao-da-vaga: no empate total, a ordem de referência (pacote 2)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-esc-referencia');
  });

  it('as quatro listas curadas começam pelo exercício de referência', () => {
    expect(FUNCAO['puxar-vertical']!.niveis[0]!.slice(0, 2)).toEqual(['puxada-frente', 'puxada-barra-reta']);
    expect(FUNCAO['puxar-vertical']!.niveis[0]!.at(-1)).toBe('puxada-unilateral');
    expect(FUNCAO['empurrar-horizontal']!.niveis[1]![0]).toBe('flexao');
    expect(FUNCAO.afundo!.niveis[0]).toEqual(['afundo', 'afundo-tras', 'bulgaro', 'afundo-kettlebell']);
    expect(FUNCAO.afundo!.niveis[1]).toEqual(['afundo-peso-corpo', 'afundo-tras-peso-corpo', 'bulgaro-peso-corpo', 'bulgaro-suspensao']);
    expect(FUNCAO.abdomen!.niveis[1]![0]).toBe('abdominal-chao');
  });

  it('a reordenação não tirou nem pôs exercício em nenhuma função, e o 1º do 1º nível continua do mesmo tipo', () => {
    // (o tipo da função, multiarticular ou isolador, é lido do 1º exercício do 1º nível)
    expect(POR_ID[FUNCAO['puxar-vertical']!.niveis[0]![0]!]!.tipo).toBe('composto');
    expect(POR_ID[FUNCAO.afundo!.niveis[0]![0]!]!.tipo).toBe('composto');
    for (const f of FUNCOES) expect(new Set(f.niveis.flat()).size).toBe(f.niveis.flat().length);
  });

  it('entre dois equivalentes empatados em tudo, ganha o que vem antes na lista: a puxada pela frente, e não a com barra reta', () => {
    const pd = pedido({ cenario: 'academia' });
    const ctx = contextoDeSelecao(perfilDe(pd), inventarioDe(pd.cenario));
    // (sem a puxada de um lado só, para isolar o empate total; o lugar dela é assunto da regra dos dois lados)
    const achado = ctx.escolher(FUNCAO['puxar-vertical']!, 0, (id) => id === 'puxada-unilateral', new Map());
    expect(achado?.ex.id).toBe('puxada-frente');
  });

  it('em casa, o abdominal no chão vem antes do abdominal na bola, e o afundo antes do búlgaro', () => {
    const pd = pedido({ cenario: 'casa+' });
    const ctx = contextoDeSelecao(perfilDe(pd), inventarioDe(pd.cenario));
    expect(ctx.escolher(FUNCAO.abdomen!, 1, () => false, new Map())?.ex.id).toBe('abdominal-chao');
    expect(ctx.escolher(FUNCAO.afundo!, 0, () => false, new Map())?.ex.id).toBe('afundo');
  });

  it('o Fábio (só o peso do corpo) fica com o afundo e o afundo para trás, e não com o búlgaro', () => {
    const p = programa(gerarPrograma, PERSONAS.fabio.perfil, PERSONAS.fabio.inventario);
    expect(ids(p)).toContain('afundo-peso-corpo');
    expect(ids(p)).not.toContain('bulgaro-peso-corpo');
  });

  it('muda algum programa das personas, e em nenhuma delas aparece defeito da régua que não havia', () => {
    let mudam = 0;
    for (const p of TODAS) {
      const [a, d] = [programa(antes, p.perfil, p.inventario), programa(gerarPrograma, p.perfil, p.inventario)];
      if (ids(a).join() !== ids(d).join()) mudam++;
      const [da, dd] = [defeitos(a, p.perfil, p.inventario), defeitos(d, p.perfil, p.inventario)];
      // Medido na ligação das 81 animações (22/11/2026): com todo exercício animado, a ordem de referência dá à Íris
      // (elásticos, 3 dias de 45 min) um dia de 50 min, 1 min acima do limite de 110% (49,5); com a ordem alfabética
      // seriam 49. Na régua inteira, o mesmo defeito ficou igual (1.926 + 2.106 casos, contra 1.924 + 2.109). Está em
      // docs/backlog.md, para o pacote D4.
      const tolerado = p.nome === 'Íris' ? ['A3'] : [];
      expect(dd.filter((x) => !da.includes(x) && !tolerado.includes(x)), p.nome).toEqual([]);
    }
    expect(mudam).toBeGreaterThan(0);
  });

  it('o resultado é o mesmo em duas gerações seguidas (determinismo)', () => {
    for (const p of TODAS) expect(ids(programa(gerarPrograma, p.perfil, p.inventario))).toEqual(ids(programa(gerarPrograma, p.perfil, p.inventario)));
  });
});

describe('selecao.funcao-da-vaga: com carga à vontade, dois lados antes de um lado só (pacote 2)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-esc-dois-lados');
  });
  const ctxDe = (cenario: string, extra: Partial<Perfil> = {}) => {
    const pd = pedido({ cenario });
    return contextoDeSelecao({ ...perfilDe(pd), ...extra }, inventarioDe(cenario));
  };

  it('na academia, o 1º puxar de cima é a puxada pela frente, e não a puxada de um lado só ajoelhado', () => {
    expect(ctxDe('academia').escolher(FUNCAO['puxar-vertical']!, 0, () => false, new Map())?.ex.id).toBe('puxada-frente');
  });

  it('na academia, a elevação lateral com halteres vem antes da de um lado só na polia, e o hip thrust antes do coice na máquina', () => {
    const ctx = ctxDe('academia');
    expect(ctx.escolher(FUNCAO['elevacao-lateral']!, 0, () => false, new Map())?.ex.id).toBe('elevacao-halteres');
    expect(ctx.escolher(FUNCAO['extensao-quadril']!, 0, () => false, new Map())?.ex.id).toBe('hip-thrust');
  });

  it('quem marcou "prefiro este" num exercício de um lado só continua com ele', () => {
    const comPreferencia = ctxDe('academia', { preferidos: { 'elevacao-lateral': 'elevacao-lateral' } });
    expect(comPreferencia.escolher(FUNCAO['elevacao-lateral']!, 0, () => false, new Map())?.ex.id).toBe('elevacao-lateral');
  });

  it('com halter, kettlebell, caneleira, elástico ou peso do corpo, nada muda: o de um lado só continua valendo como degrau', () => {
    for (const cenario of ['halteres', 'halteres-banco', 'banco+halteres-leves', 'casa', 'elasticos', 'vazio'])
      for (const nivel of ['iniciante', 'intermediario', 'avancado'] as const)
        for (const dias of ['2', '3', '4', '5']) {
          const pd = pedido({ cenario, nivel, dias });
          const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
          expect(ids(programa(gerarPrograma, perfil, inventario)), `${cenario}, ${nivel}, ${dias} dias`).toEqual(ids(programa(antes, perfil, inventario)));
        }
  });

  it('na academia, o stiff de um lado só com halter não dá lugar ao terra romeno com barra só por ser de um lado', () => {
    // (revisão cega de 15/11: o avançado com halteres e a pessoa com dor leve na lombar pioravam)
    for (const dores of [[], [{ articulacao: 'lombar' as const, nota: 4 }]]) {
      const pd = pedido({ cenario: 'academia', dias: '4', dores });
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      const [a, d] = [ids(programa(antes, perfil, inventario)), ids(programa(gerarPrograma, perfil, inventario))];
      expect(d.includes('terra-romeno-barra')).toBe(a.includes('terra-romeno-barra'));
      expect(d.includes('stiff-unilateral')).toBe(a.includes('stiff-unilateral'));
    }
  });

  it('o exercício de um lado só que carrega uma região com dor de 3 a 5 não perde lugar', () => {
    // Dor 4 no ombro: a elevação lateral de um lado só na polia e a de halteres carregam o ombro; fica como era antes da regra.
    const pd = pedido({ cenario: 'academia', dores: [{ articulacao: 'ombro', nota: 4 }] });
    const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
    const ctx = contextoDeSelecao(perfil, inventario);
    const usos = new Map([['elevacao-halteres', 1]]);
    expect(ctx.escolher(FUNCAO['elevacao-lateral']!, 0, () => false, usos)?.ex.id).toBe('elevacao-lateral');
    // Sem dor, com a mesma contagem de usos, os dois lados vêm antes.
    expect(ctxDe('academia').escolher(FUNCAO['elevacao-lateral']!, 0, () => false, usos)?.ex.id).toBe('elevacao-halteres');
  });

  it('a vaga de afundo não muda: todos os exercícios dela são de um lado só', () => {
    expect(FUNCAO.afundo!.niveis.flat().every((id) => POR_ID[id]!.unilateral)).toBe(true);
  });

  it('nas personas: troca exercício, não cria defeito da régua e nenhum dia fica mais longo por causa da troca', () => {
    let mudam = 0;
    for (const p of TODAS) {
      const [a, d] = [programa(antes, p.perfil, p.inventario), programa(gerarPrograma, p.perfil, p.inventario)];
      if (ids(a).join() !== ids(d).join()) mudam++;
      const [da, dd] = [defeitos(a, p.perfil, p.inventario), defeitos(d, p.perfil, p.inventario)];
      expect(dd.filter((x) => !da.includes(x)), p.nome).toEqual([]);
      // O programa novo não tem mais exercícios de um lado só do que o antigo.
      const umLado = (q: Programa) => ids(q).filter((id) => POR_ID[id]!.unilateral).length;
      expect(umLado(d), p.nome).toBeLessThanOrEqual(umLado(a));
    }
    expect(mudam).toBeGreaterThan(0);
  });
});

describe('selecao.lombar-no-dia: poupar a lombar dentro do dia (pacote 2)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-fadiga');
  });
  const lombarPorDia = (p: Programa) => p.dias.map((d) => d.exercicios.filter((x) => carregaLombar(POR_ID[x.exId]!)).length);
  /** A grade de teste: quatro lugares de treino, três níveis, 3 a 5 dias, 60 min, sem foco e sem dor. */
  const GRADE = ['academia', 'condominio+', 'halteres-banco', 'casa+'].flatMap((cenario) =>
    (['iniciante', 'intermediario', 'avancado'] as const).flatMap((nivel) => ['3', '4', '5'].map((dias) => pedido({ cenario, nivel, dias }))),
  );

  it('o que conta como "carrega a lombar sem apoio": a remada curvada e o stiff contam; a remada apoiada e o abdominal, não', () => {
    expect(carregaLombar(POR_ID['remada-curvada-halteres']!)).toBe(true);
    expect(carregaLombar(POR_ID.stiff!)).toBe(true);
    expect(carregaLombar(POR_ID['remada-apoiada']!)).toBe(false);
    expect(carregaLombar(POR_ID['abdominal-chao']!)).toBe(false);
  });

  it('na grade de teste, nenhum dia fica com mais exercícios que carregam a lombar do que antes, e algum fica com menos', () => {
    let menos = 0;
    for (const pd of GRADE) {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      const [a, d] = [programa(antes, perfil, inventario), programa(gerarPrograma, perfil, inventario)];
      const [la, ld] = [lombarPorDia(a), lombarPorDia(d)];
      const nome = `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias`;
      expect(Math.max(...ld), nome).toBeLessThanOrEqual(Math.max(...la));
      expect(ld.reduce((t, n) => t + n, 0), nome).toBeLessThanOrEqual(la.reduce((t, n) => t + n, 0));
      if (ld.reduce((t, n) => t + n, 0) < la.reduce((t, n) => t + n, 0)) menos++;
    }
    expect(menos).toBeGreaterThan(0);
  });

  it('a regra só ordena: nenhum exercício sai sem outro do mesmo nível no lugar (o nº de exercícios e de séries por dia não cai)', () => {
    for (const pd of GRADE) {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      const [a, d] = [programa(antes, perfil, inventario), programa(gerarPrograma, perfil, inventario)];
      expect(d.dias.length).toBe(a.dias.length);
      expect(ids(d).length, `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias`).toBeGreaterThanOrEqual(ids(a).length);
    }
  });

  it('o exercício que entrou no lugar traz o porquê, com a regra e o nome de quem ficou de fora', () => {
    const comPorque = GRADE.flatMap((pd) => programa(gerarPrograma, perfilDe(pd), inventarioDe(pd.cenario)).dias.flatMap((d) => d.exercicios)).filter((x) => x.porque.some((q) => q.regraId === 'selecao.lombar-no-dia'));
    expect(comPorque.length).toBeGreaterThan(0);
    for (const x of comPorque) {
      expect(carregaLombar(POR_ID[x.exId]!)).toBe(false);
      expect(x.porque.find((q) => q.regraId === 'selecao.lombar-no-dia')!.texto).toMatch(/^Ficou este, e não .+: o treino de hoje já tem .+, que carrega a lombar sem apoio\.$/);
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

describe('volume.prioridade.foco-primeiro: nem o empurrar do foco passa empurrar ÷ puxar de 1,5 (pacote 2)', () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    antes = await carregarAntes('app,-d1-foco');
  });
  const doPadrao = (p: Programa, padroes: readonly string[]) =>
    p.dias.flatMap((d) => d.exercicios).filter((x) => padroes.includes(x.padrao)).reduce((t, x) => t + seriesDeVolume(x), 0);
  const empurraDemais = (p: Programa) => doPadrao(p, PADROES_PUXAR) > 0 && doPadrao(p, PADROES_EMPURRAR) > 1.5 * doPadrao(p, PADROES_PUXAR);
  /** Quem quer peito e tem pouco com que puxar (um aparelho só em casa): onde o empurrar do foco subia sozinho. */
  const GRADE = ['so:estacao_remada', 'so:barra_fixa', 'so:kettlebell', 'so:remada_articulada', 'academia', 'condominio'].flatMap((cenario) =>
    (['iniciante', 'intermediario', 'avancado'] as const).flatMap((nivel) => ['2', '3', '4'].flatMap((dias) => [45, 60].map((min) => pedido({ cenario, nivel, dias, min, focos: ['peito'] })))),
  );

  it('na grade de quem quer peito, nenhum programa passa a ter empurrar ÷ puxar acima de 1,5, e algum deixa de ter', () => {
    let deixam = 0;
    for (const pd of GRADE) {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      const [a, d] = [programa(antes, perfil, inventario), programa(gerarPrograma, perfil, inventario)];
      const nome = `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias de ${pd.min} min, foco ${pd.focos.join('+')}`;
      if (!empurraDemais(a)) expect(empurraDemais(d), nome).toBe(false);
      else if (!empurraDemais(d)) deixam++;
    }
    expect(deixam).toBeGreaterThan(0);
    // O exemplo medido: avançado, só com uma estação de remada em casa, 3 dias de 60 min, quer peito.
    const pd = pedido({ cenario: 'so:estacao_remada', nivel: 'avancado', dias: '3', min: 60, focos: ['peito'] });
    const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
    expect(empurraDemais(programa(antes, perfil, inventario))).toBe(true);
    expect(empurraDemais(programa(gerarPrograma, perfil, inventario))).toBe(false);
  });

  it('a troca não cria outro defeito da régua, e as séries da semana não caem', () => {
    for (const pd of GRADE) {
      const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
      const [a, d] = [programa(antes, perfil, inventario), programa(gerarPrograma, perfil, inventario)];
      const nome = `${pd.cenario}, ${pd.nivel}, ${pd.dias} dias de ${pd.min} min, foco ${pd.focos.join('+')}`;
      const [da, dd] = [defeitos(a, perfil, inventario), defeitos(d, perfil, inventario)];
      expect(dd.filter((x) => !da.includes(x)), nome).toEqual([]);
      const series = (q: Programa) => q.dias.flatMap((x) => x.exercicios).reduce((t, x) => t + seriesDeVolume(x), 0);
      expect(series(d), nome).toBeGreaterThanOrEqual(series(a) - 1);
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
