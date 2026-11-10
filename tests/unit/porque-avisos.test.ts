import { describe, expect, it } from 'vitest';
import { resumoDaSemana } from '../../src/domain/acompanhamento/semana';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS, type DiasSemana } from '../../src/domain/gerador/divisoes';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIOS, perfil } from '../../scripts/auditoria/cenarios';
import { ana, bruno, carla, PERSONAS } from '../personas';

// R5b, o porquê e os avisos (docs/revisoes/proximos-passos/c-fluxo.md, pedidos ao domínio 4 e 6; regra
// acompanhamento.mensagens: "fato + próximo passo").
const ok = (pf: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(pf, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
/** Os 4 textos genéricos que todo exercício tem, e o texto genérico da vaga de antes do R5b. */
const GENERICOS = new Set(['selecao.equivalencia', 'reps.faixa.por-tipo', 'rir.alvo', 'descanso.por-tipo']);
const especifico = (q: { regraId: string; texto: string }) => !GENERICOS.has(q.regraId) && !(q.regraId === 'selecao.funcao-da-vaga' && /a que melhor cabe|a melhor para esta função/.test(q.texto));
/** O próximo passo de um aviso: o que fazer, inclusive "não precisa fazer nada". */
const PROXIMO_PASSO = /[Nn]ão precisa fazer nada|[Ee]scolh|Reserve|Procure|atualize|aumente/;

describe('o porquê específico de cada exercício', () => {
  it('em todos os exercícios das 6 personas, o 1º porquê diz a vaga, o músculo, as séries da semana e por que ganhou (aceite: ≥ 90%)', () => {
    let n = 0;
    for (const p of Object.values(PERSONAS))
      for (const d of ok(p.perfil, p.inventario).dias)
        for (const x of d.exercicios) {
          n++;
          expect(x.porque.some(especifico), `${p.nome} ${d.nome} ${x.exId}`).toBe(true);
          expect(x.porque[0]!.texto, `${p.nome} ${x.exId}`).toMatch(/^Vaga de .+, para (o|a|os|as) .+: \d+ das [\d,]+ séries da semana/);
        }
    expect(n).toBeGreaterThan(100);
  });
  it('diz quando o músculo é foco, e a meta só quando ele fica abaixo do limiar dos avisos', () => {
    const carlaPeito = ok(carla.perfil, carla.inventario).dias.flatMap((d) => d.exercicios).find((x) => x.funcao === 'empurrar-horizontal')!;
    expect(carlaPeito.porque[0]!.texto).toMatch(/para o peito, o seu foco: \d+ das \d+ séries da semana\./);
    const anaQuad = ok(ana.perfil, ana.inventario).dias.flatMap((d) => d.exercicios).find((x) => x.funcao === 'agachar')!;
    expect(anaQuad.porque[0]!.texto).toMatch(/para o quadríceps, o seu foco: \d+ das 6 séries da semana \(a meta é 10\)\./);
  });
  it('por que ganhou: o nível de cima sem equipamento (e, entre os que sobram, por quê), a melhor opção, o critério do desempate ou a equivalência', () => {
    const textos = Object.values(PERSONAS).flatMap((p) => ok(p.perfil, p.inventario).dias.flatMap((d) => d.exercicios.map((x) => x.porque[0]!.texto)));
    expect(textos.some((t) => t.includes('pedem equipamento que você não tem; esta é a melhor que sobra.'))).toBe(true);
    expect(textos.some((t) => /pedem equipamento que você não tem\. Entre as que sobram, (ganhou|equivale|ficou)/.test(t))).toBe(true);
    expect(textos.some((t) => /É a melhor opção desta vaga no seu equipamento; .+ fica como alternativa./.test(t))).toBe(true);
    expect(textos.some((t) => /Ganhou de .+ porque (tem o guia animado|é mais estável e apoiado)/.test(t))).toBe(true);
    expect(textos.some((t) => /Equivale a .+ como alternativa\./.test(t))).toBe(true);
  });
  it('com dor, o porquê diz que as opções de cima saíram por causa da dor', () => {
    const pf: Perfil = { ...bruno.perfil, triagem: { respostas: { ...bruno.perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'ombro', nota: 7 }] } };
    const textos = ok(pf, bruno.inventario).dias.flatMap((d) => d.exercicios.map((x) => x.porque[0]!.texto));
    expect(textos.some((t) => t.includes('saíram por causa da dor'))).toBe(true);
  });
});

describe('os avisos do programa dizem o fato e o próximo passo (acompanhamento.mensagens)', () => {
  it('todos os avisos das 6 personas (eram 2 de 20 com o próximo passo)', () => {
    let n = 0;
    for (const p of Object.values(PERSONAS))
      for (const a of ok(p.perfil, p.inventario).avisos) {
        n++;
        expect(a.texto, `${p.nome}: ${a.regraId}`).toMatch(PROXIMO_PASSO);
      }
    expect(n).toBeGreaterThanOrEqual(20);
  });
  it('em todos os avisos de uma amostra com dor, sem equipamento e com pouco tempo', () => {
    const vistos = new Set<string>();
    for (const c of CENARIOS.filter((_, i) => i % 2 === 0))
      for (const dias of [2, 4, 6] as DiasSemana[])
        for (const minutos of [30, 60])
          for (const dores of [[], [{ articulacao: 'joelho' as const, nota: 7 }], [{ articulacao: 'ombro' as const, nota: 7 }]]) {
            const pf = perfil({ nivel: 'intermediario', divisao: OPCOES_POR_DIAS[dias][0]!, minutos, prioridades: ['peito', 'pernas'], dores });
            for (const a of ok(pf, c.inventario).avisos) {
              vistos.add(a.regraId);
              expect(a.texto, `${c.id} ${dias} dias ${minutos} min: ${a.regraId}`).toMatch(PROXIMO_PASSO);
            }
          }
    expect(vistos.size).toBeGreaterThanOrEqual(8);
  }, 30_000);
});

describe('a semana com a meta do programa (c-fluxo.md, pedido ao domínio 7)', () => {
  it('quando o programa planeja menos que a meta, a semana diz quanto ele planeja e o motivo; quando não, nada a mais', () => {
    // A Ana como intermediária (sem a fase de aprendizado, em que a meta da semana é a prescrita).
    const pf: Perfil = { ...ana.perfil, nivel: 'intermediario' };
    const prog = ok(pf, ana.inventario);
    const r = resumoDaSemana(prog, [], '2026-11-09T12:00:00.000Z', { planejados: 3 });
    expect(r.metaPrescrita).toBe(false);
    const abaixo = r.musculos.filter((m) => m.planejado !== undefined);
    expect(abaixo.length).toBeGreaterThan(0);
    for (const m of abaixo) {
      expect(m.planejado).toBe(Math.round((prog.volumeSemanal[m.musculo] ?? 0) * 10) / 10);
      expect(m.planejado!).toBeLessThan(m.meta);
      expect(['falta tempo', 'a divisão não tem mais lugar', 'os seus focos dividem o tempo', 'sem exercício no seu equipamento', 'não coube mais nos seus dias']).toContain(m.motivo);
    }
    expect(abaixo.some((m) => m.motivo === 'falta tempo' || m.motivo === 'a divisão não tem mais lugar')).toBe(true);
    const carlaR = resumoDaSemana(ok(carla.perfil, carla.inventario), [], '2026-11-09T12:00:00.000Z', { planejados: 5 });
    expect(carlaR.musculos.filter((m) => m.planejado !== undefined)).toEqual([]);
  });
});
