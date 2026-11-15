import { beforeAll, describe, expect, it, vi } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO, FUNCOES } from '../../src/domain/gerador/funcoes';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { medirRegua } from '../../scripts/auditoria/regua';
import { inventarioDe, perfilDe, type Pedido } from '../../scripts/auditoria/ver-lib';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';

// Sessão "treino para todos", etapa 2, pacote 2 (15/11/2026): a escolha entre exercícios equivalentes.
//  - selecao.funcao-da-vaga: no empate total, vale a ordem de referência da lista da função (dado curado em
//    funcoes.json), e não a ordem alfabética.
//  - selecao.funcao-da-vaga: com carga à vontade, o exercício de dois lados vem antes do de um lado só.
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
      expect(dd.filter((x) => !da.includes(x)), p.nome).toEqual([]);
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

  it('na vaga de agachar com halteres pesados, o goblet vem antes do búlgaro', () => {
    const ctx = ctxDe('halteres-banco');
    const n = FUNCAO.agachar!.niveis.findIndex((l) => l.includes('goblet'));
    expect(ctx.escolher(FUNCAO.agachar!, n, () => false, new Map())?.ex.id).toBe('goblet');
  });

  it('quem marcou "prefiro este" num exercício de um lado só continua com ele', () => {
    const semPreferencia = ctxDe('academia').escolher(FUNCAO['panturrilha-em-pe']!, 0, (id) => id !== 'panturrilha' && id !== 'panturrilha-bilateral-step', new Map());
    expect(semPreferencia?.ex.id).toBe('panturrilha-bilateral-step');
    const comPreferencia = ctxDe('academia', { preferidos: { 'panturrilha-em-pe': 'panturrilha' } }).escolher(
      FUNCAO['panturrilha-em-pe']!,
      0,
      (id) => id !== 'panturrilha' && id !== 'panturrilha-bilateral-step',
      new Map(),
    );
    expect(comPreferencia?.ex.id).toBe('panturrilha');
  });

  it('com pouca carga (halteres leves), nada muda: o exercício de um lado só continua valendo como degrau', () => {
    for (const nivel of ['iniciante', 'intermediario', 'avancado'] as const)
      for (const dias of ['2', '3', '4', '5']) {
        const pd = pedido({ cenario: 'banco+halteres-leves', nivel, dias });
        const [perfil, inventario] = [perfilDe(pd), inventarioDe(pd.cenario)];
        expect(ids(programa(gerarPrograma, perfil, inventario)), `${nivel}, ${dias} dias`).toEqual(ids(programa(antes, perfil, inventario)));
      }
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
      // O programa novo não tem mais exercícios de um lado só com carga à vontade do que o antigo.
      const umLado = (q: Programa) => ids(q).filter((id) => POR_ID[id]!.unilateral).length;
      expect(umLado(d), p.nome).toBeLessThanOrEqual(umLado(a));
    }
    expect(mudam).toBeGreaterThan(0);
  });
});
