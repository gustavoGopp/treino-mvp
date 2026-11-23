import { beforeAll, describe, expect, it, vi } from 'vitest';
import { POR_ID, type Musculo } from '../../src/domain/biblioteca';
import { GRUPOS, gerarPrograma, seriesDeVolume, volumePorMusculo, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { VOLUME } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';

// Pacote D3 (23/11/2026), item 2: tempo.sobra-series com 3 grupos de foco ou mais. O foco fica na meta, e "6 abaixo do
// foco" dava a própria meta de quem não é foco: o tempo que sobrava nos dias de pernas não virava série (o Bruno: 39 min
// em 70, pernas com 8 séries). Agora quem não é foco sobe até o mínimo do nível, com o foco mais fraco pelo menos 1,3 vez
// acima. O "antes" é o protótipo com todas as regras adotadas menos esta (PROT=app,-d3-outros). Só personas fictícias.

const TODAS = { ...PERSONAS, ...PERSONAS_NOVAS };
const FOCOS: Grupo[][] = [[], ['peito'], ['gluteos', 'costas'], ['peito', 'costas', 'ombros'], ['peito', 'costas', 'ombros', 'bracos'], ['pernas', 'gluteos', 'abdomen']];
const MINUTOS = [45, 60, 90];
type Caso = { nome: string; perfil: Perfil; inventario: Inventario };
const CASOS: Caso[] = Object.values(TODAS).flatMap((p) => [
  { nome: p.nome, perfil: p.perfil, inventario: p.inventario },
  ...MINUTOS.flatMap((minutosSessao) =>
    FOCOS.map((prioridades) => ({
      nome: `${p.nome}, ${minutosSessao} min, foco ${prioridades.join('+') || 'nenhum'}`,
      perfil: { ...p.perfil, minutosSessao, prioridades, divisao: undefined },
      inventario: p.inventario,
    })),
  ),
]);
const programa = (gerar: typeof gerarPrograma, c: Caso): Programa | null => {
  const r = gerar(c.perfil, c.inventario);
  return r.status === 'ok' ? r.programa : null;
};
const volume = (p: Programa) => volumePorMusculo(p.dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) }))));
const semSeries = (p: Programa) => p.dias.map((d) => d.exercicios.map((x) => `${x.exId}${x.supersetCom ? '+bi' : ''}${x.dropSet ? '+drop' : ''}`));
const comSeries = (p: Programa) => p.dias.map((d) => d.exercicios.map((x) => `${x.exId} ${x.series}`));

describe('tempo.sobra-series com 3 grupos de foco ou mais: quem não é foco sobe até o mínimo do nível (pacote D3)', { timeout: 60_000 }, () => {
  let pares: { c: Caso; a: Programa; d: Programa }[];
  beforeAll(async () => {
    const prototipo = async (prot: string) => {
      vi.stubEnv('PROT', prot);
      vi.resetModules();
      return ((await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma }).gerarPrograma;
    };
    const [igualAoApp, antes] = [await prototipo('app'), await prototipo('app,-d3-outros')];
    // O protótipo com tudo ligado tem de dar o programa do app para servir de "antes". Em poucos casos fora das personas
    // (o Diego com 45 min e foco em pernas, glúteos e abdômen, por exemplo) ele já não dava na `main`, por regras de
    // antes deste pacote (docs/backlog.md, "Do pacote D3"): esses ficam de fora da comparação.
    pares = CASOS.flatMap((c) => {
      const [p, a, d] = [programa(igualAoApp, c), programa(antes, c), programa(gerarPrograma, c)];
      return p && a && d && JSON.stringify(p) === JSON.stringify(d) ? [{ c, a, d }] : [];
    });
  });
  const mudou = (x: { a: Programa; d: Programa }) => JSON.stringify(comSeries(x.a)) !== JSON.stringify(comSeries(x.d));

  it('a regra mexe em parte dos casos com 3 grupos ou mais, e em nenhum com 2 ou menos', () => {
    expect(pares.length).toBeGreaterThan(200);
    expect(pares.filter((x) => x.c.perfil.prioridades.length > VOLUME.focosComSobra && mudou(x)).length).toBeGreaterThan(10);
    for (const x of pares.filter((y) => y.c.perfil.prioridades.length <= VOLUME.focosComSobra)) expect(x.d, x.c.nome).toEqual(x.a);
  });

  it('para o iniciante nada muda: o mínimo do nível (6) já é a meta de quem não é foco', () => {
    for (const x of pares.filter((y) => y.c.perfil.nivel === 'iniciante')) expect(comSeries(x.d), x.c.nome).toEqual(comSeries(x.a));
  });

  it('os exercícios e as técnicas são os mesmos; só as séries sobem, até 4 por exercício, e o dia cabe nos minutos', () => {
    for (const { c, a, d } of pares.filter(mudou)) {
      expect(semSeries(d), c.nome).toEqual(semSeries(a));
      d.dias.forEach((dia, i) =>
        dia.exercicios.forEach((x, j) => {
          const antes = a.dias[i]!.exercicios[j]!.series;
          expect(x.series, `${c.nome}: ${x.exId}`).toBeGreaterThanOrEqual(antes);
          if (x.series > antes) {
            expect(x.series, `${c.nome}: ${x.exId}`).toBeLessThanOrEqual(VOLUME.seriesPorExercicio.max);
            expect(dia.minutosEstimados, `${c.nome}: ${dia.nome}`).toBeLessThanOrEqual(c.perfil.minutosSessao);
          }
        }),
      );
    }
  });

  it('a série a mais vai para um músculo que não é foco e estava abaixo do mínimo do nível; nenhum foco perde série', () => {
    for (const { c, a, d } of pares.filter(mudou)) {
      const foco = new Set<Musculo>(c.perfil.prioridades.flatMap((g) => GRUPOS[g]));
      const [va, vd] = [volume(a), volume(d)];
      for (const m of foco) expect(vd[m] ?? 0, `${c.nome}: ${m}`).toBeGreaterThanOrEqual(va[m] ?? 0);
      d.dias.forEach((dia, i) =>
        dia.exercicios.forEach((x, j) => {
          if (x.series <= a.dias[i]!.exercicios[j]!.series) return;
          const alvos = POR_ID[x.exId]!.musculos.primarios.filter((m) => !foco.has(m));
          expect(alvos.some((m) => (va[m] ?? 0) < VOLUME.minimo[c.perfil.nivel]), `${c.nome}: ${x.exId}`).toBe(true);
        }),
      );
    }
  });

  it('o Bruno (4 grupos de superiores, 4 dias de 70 min): as pernas saem de 8 para 9 séries e o dia de pernas, de 39 para 47 min; o peito (12) fica 1,3 vez acima', () => {
    const b = pares.find((x) => x.c.nome === 'Bruno')!;
    const [va, vd] = [volume(b.a), volume(b.d)];
    expect([va.quadriceps, va.posteriores, va.gluteos, va.panturrilha]).toEqual([8, 8, 7, 6]);
    expect([vd.quadriceps, vd.posteriores, vd.gluteos, vd.panturrilha]).toEqual([9, 9, 9, 8]);
    expect([b.a.dias[1]!.minutosEstimados, b.d.dias[1]!.minutosEstimados]).toEqual([39, 47]);
    // o foco não mudou, e o mais fraco dos que têm meta (o peito, com 12) fica pelo menos 1,3 vez acima das pernas
    for (const m of ['peito', 'costas', 'ombro_lateral', 'biceps', 'triceps'] as Musculo[]) expect(vd[m], m).toBe(va[m]);
    expect(vd.peito! / vd.quadriceps!).toBeGreaterThanOrEqual(VOLUME.destaqueDoFoco);
  });

  it('o texto do programa diz o que foi feito', () => {
    const b = pares.find((x) => x.c.nome === 'Bruno')!;
    expect(b.d.porque.find((q) => q.regraId === 'tempo.sobra-series')?.texto).toBe(
      'O tempo que sobrava nos treinos virou série, sem passar o foco da meta de ~12 séries por semana: com mais de 2 grupos de foco, o tempo se divide. Os outros músculos sobem até ~10 séries por semana, sem encostar no foco.',
    );
  });
});
