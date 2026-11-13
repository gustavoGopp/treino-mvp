import { beforeAll, describe, expect, it, vi } from 'vitest';
import { POR_ID, PADROES_EMPURRAR, PADROES_PUXAR, type Musculo } from '../../src/domain/biblioteca';
import { GRUPOS, gerarPrograma, metasDoPerfil, seriesDeVolume, volumePorMusculo, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { VOLUME } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS, marina } from '../personas/todos';

// Sessão "treino para todos", etapa 2, pacote 1 (13/11/2026): o 2º passo de tempo.sobra-series. O tempo que sobra vira
// série em todos os dias, com o programa já montado, cortado e completado. O "antes" é o protótipo com tudo desligado
// (scripts/auditoria/prototipo, PROT=nada), que é o gerador da `main` de antes da etapa 2. Só personas fictícias.

const TODAS = { ...PERSONAS, ...PERSONAS_NOVAS };
const FOCOS: Grupo[][] = [[], ['peito'], ['gluteos', 'costas'], ['peito', 'costas', 'ombros', 'bracos']];
const MINUTOS = [30, 60, 90];
type Caso = { nome: string; perfil: Perfil; inventario: Inventario };
/** As 12 personas como são, e cada uma com 3 durações × 4 escolhas de foco (sem a divisão escolhida à mão). */
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
const diretas = (p: Programa, m: Musculo) =>
  p.dias.flatMap((d) => d.exercicios).filter((x) => POR_ID[x.exId]!.musculos.primarios.includes(m)).reduce((t, x) => t + seriesDeVolume(x), 0);
const doPadrao = (p: Programa, padroes: readonly string[]) =>
  p.dias.flatMap((d) => d.exercicios).filter((x) => padroes.includes(x.padrao)).reduce((t, x) => t + seriesDeVolume(x), 0);
const series = (p: Programa) => p.dias.flatMap((d) => d.exercicios).reduce((t, x) => t + x.series, 0);

describe('tempo.sobra-series, 2º passo: o tempo que sobra vira série em todos os dias', { timeout: 60_000 }, () => {
  let antes: typeof gerarPrograma;
  let pares: { c: Caso; a: Programa; d: Programa }[];
  beforeAll(async () => {
    vi.stubEnv('PROT', 'nada');
    vi.resetModules();
    antes = ((await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma }).gerarPrograma;
    pares = CASOS.flatMap((c) => {
      const [a, d] = [programa(antes, c), programa(gerarPrograma, c)];
      return a && d ? [{ c, a, d }] : [];
    });
  });

  it('os casos de teste existem e a regra mexe em boa parte deles', () => {
    expect(pares.length).toBeGreaterThan(100);
    expect(pares.filter((x) => series(x.d) > series(x.a)).length).toBeGreaterThan(40);
  });

  it('os exercícios de cada dia são os mesmos, na mesma ordem, com as mesmas técnicas: só as séries sobem', () => {
    for (const { c, a, d } of pares) {
      expect(d.dias.map((x) => x.exercicios.map((e) => `${e.exId}${e.supersetCom ? '+bi' : ''}${e.dropSet ? '+drop' : ''}`)), c.nome).toEqual(
        a.dias.map((x) => x.exercicios.map((e) => `${e.exId}${e.supersetCom ? '+bi' : ''}${e.dropSet ? '+drop' : ''}`)),
      );
      d.dias.forEach((dia, i) => dia.exercicios.forEach((e, j) => expect(e.series, `${c.nome}: ${dia.nome}, ${e.exId}`).toBeGreaterThanOrEqual(a.dias[i]!.exercicios[j]!.series)));
    }
  });

  it('o dia em que as séries subiram cabe nos minutos, com no máximo 4 séries por exercício', () => {
    for (const { c, a, d } of pares)
      d.dias.forEach((dia, i) => {
        const subiu = dia.exercicios.some((e, j) => e.series > a.dias[i]!.exercicios[j]!.series);
        if (!subiu) return;
        expect(dia.minutosEstimados, `${c.nome}: ${dia.nome}`).toBeLessThanOrEqual(c.perfil.minutosSessao);
        for (const e of dia.exercicios) expect(e.series).toBeLessThanOrEqual(VOLUME.seriesPorExercicio.max);
      });
  });

  it('o dia que precisou de bi-set ou drop set para caber fica como está', () => {
    let comTecnica = 0;
    for (const { c, a, d } of pares)
      d.dias.forEach((dia, i) => {
        if (!dia.exercicios.some((e) => e.supersetCom || e.dropSet)) return;
        comTecnica++;
        expect(dia.exercicios.map((e) => e.series), `${c.nome}: ${dia.nome}`).toEqual(a.dias[i]!.exercicios.map((e) => e.series));
      });
    expect(comTecnica).toBeGreaterThan(10);
  });

  it('nenhum músculo que subiu passa do máximo do nível, nem o foco', () => {
    for (const { c, a, d } of pares) {
      const [va, vd] = [volume(a), volume(d)];
      for (const m of Object.keys(vd) as Musculo[]) if ((vd[m] ?? 0) > (va[m] ?? 0)) expect(vd[m], `${c.nome}: ${m}`).toBeLessThanOrEqual(VOLUME.maximo[c.perfil.nivel]);
    }
  });

  it('sem foco, o músculo que subiu por série direta estava abaixo do alvo do nível (8, 12, 14)', () => {
    for (const { c, a, d } of pares.filter((x) => !x.c.perfil.prioridades.length)) {
      const va = volume(a);
      for (const m of Object.keys(va) as Musculo[]) {
        if (diretas(d, m) > diretas(a, m)) expect(va[m], `${c.nome}: ${m}`).toBeLessThan(VOLUME.sobraAte[c.perfil.nivel]);
      }
    }
  });

  it('com 3 grupos de foco ou mais, o foco só sobe por série direta se estava abaixo da meta', () => {
    const muitos = pares.filter((x) => x.c.perfil.prioridades.length > VOLUME.focosComSobra);
    expect(muitos.length).toBeGreaterThan(20);
    for (const { c, a, d } of muitos) {
      const metas = metasDoPerfil(c.perfil.nivel, c.perfil.prioridades);
      const va = volume(a);
      for (const m of c.perfil.prioridades.flatMap((g) => GRUPOS[g])) {
        if (diretas(d, m) > diretas(a, m)) expect(Math.min(va[m] ?? 0, diretas(a, m)), `${c.nome}: ${m}`).toBeLessThan(metas[m] ?? 0);
      }
    }
  });

  it('empurrar ÷ puxar não passa de 1,5 por causa das séries novas', () => {
    for (const { c, a, d } of pares) {
      const [ea, pa, ed, pd] = [doPadrao(a, PADROES_EMPURRAR), doPadrao(a, PADROES_PUXAR), doPadrao(d, PADROES_EMPURRAR), doPadrao(d, PADROES_PUXAR)];
      if (!pd || ed <= ea) continue;
      expect(ed, `${c.nome}: empurrar ${ea}→${ed}, puxar ${pa}→${pd}`).toBeLessThanOrEqual(1.5 * pd);
    }
  });

  it('a Marina (intermediária, academia, 4 dias de 60 min, sem foco) deixa de receber 2 séries de tudo', () => {
    const [a, d] = [programa(antes, marina)!, programa(gerarPrograma, marina)!];
    // Antes: dias de 37 a 46 min. Depois: todos acima de 85% dos 60 min, e nenhum acima deles.
    expect(Math.max(...a.dias.map((x) => x.minutosEstimados))).toBeLessThan(0.8 * 60);
    for (const dia of d.dias) {
      expect(dia.minutosEstimados).toBeGreaterThanOrEqual(0.85 * 60);
      expect(dia.minutosEstimados).toBeLessThanOrEqual(60);
    }
    expect(series(d)).toBeGreaterThan(series(a) + 15);
    const [va, vd] = [volume(a), volume(d)];
    for (const m of ['peito', 'costas', 'quadriceps', 'posteriores'] as Musculo[]) {
      expect(vd[m]).toBeGreaterThan(va[m]!);
      expect(vd[m]).toBeLessThanOrEqual(VOLUME.maximo.intermediario);
    }
    expect(d.porque.find((q) => q.regraId === 'volume.semanal.alvo')?.texto).toMatch(/até ~12 séries por semana cada, o alvo do seu nível/);
    expect(d.porque.find((q) => q.regraId === 'tempo.sobra-series')?.texto).toMatch(/O tempo que sobrava nos treinos virou série: cada músculo sobe até ~12/);
  });

  it('os textos dizem o que foi feito: com 1 foco, o foco primeiro; com 4 focos, o foco na meta', () => {
    const texto = (prioridades: Grupo[]) =>
      programa(gerarPrograma, { nome: 'Marina', perfil: { ...marina.perfil, prioridades }, inventario: marina.inventario })!.porque.find((q) => q.regraId === 'tempo.sobra-series')?.texto;
    expect(texto(['peito'])).toMatch(/virou série primeiro para o foco \(até ~16 séries por semana\)/);
    expect(programa(gerarPrograma, { nome: 'Marina', perfil: { ...marina.perfil, prioridades: ['peito'] }, inventario: marina.inventario })!.porque.find((q) => q.regraId === 'volume.semanal.alvo')?.texto).toMatch(
      /Os outros músculos ficam com ~6 ou mais/,
    );
    // Com 4 grupos de foco e 90 min: o foco fica na meta, e os dias de pernas ficam curtos de propósito; o aviso diz isso.
    const quatro = programa(gerarPrograma, { nome: 'Marina', perfil: { ...marina.perfil, minutosSessao: 90, prioridades: ['peito', 'costas', 'ombros', 'bracos'] }, inventario: marina.inventario })!;
    expect(quatro.porque.find((q) => q.regraId === 'tempo.sobra-series')?.texto).toMatch(/sem passar o foco da meta de ~12 séries por semana: com mais de 2 grupos de foco/);
    expect(quatro.avisos.find((q) => q.regraId === 'tempo.sobra')?.texto).toMatch(/o foco já recebeu o tempo que rende, e os outros músculos ficam abaixo dele de propósito\. Dá para escolher uma duração menor sem perder nada\.$/);
  });

  it('tempo.sobra: quando as séries chegam ao alvo e o tempo ainda sobra, o app diz a duração real e sugere o foco', () => {
    // A Marina como iniciante, com 90 min e sem foco: o alvo do iniciante (8) não enche 90 min.
    const p = programa(gerarPrograma, { nome: 'Marina iniciante', perfil: { ...marina.perfil, nivel: 'iniciante', minutosSessao: 90 }, inventario: marina.inventario })!;
    const tipico = [...p.dias.map((x) => x.minutosEstimados)].sort((x, y) => x - y)[Math.floor((p.dias.length - 1) / 2)]!;
    const aviso = p.avisos.find((q) => q.regraId === 'tempo.sobra');
    expect(tipico).toBeLessThan(0.7 * 90);
    expect(aviso?.texto).toMatch(/^O seu treino completo dura cerca de \d+ min: as séries já chegaram ao que rende bem no nível iniciante\. Dá para escolher uma duração menor sem perder nada; para usar mais tempo, escolha um grupo de foco\.$/);
    // Com 45 min, que as séries do alvo enchem, o mesmo perfil não recebe o aviso.
    expect(programa(gerarPrograma, { nome: 'Marina iniciante', perfil: { ...marina.perfil, nivel: 'iniciante', minutosSessao: 45 }, inventario: marina.inventario })!.avisos.some((q) => q.regraId === 'tempo.sobra')).toBe(false);
  });

  it('com 30 min, o exercício protegido que não é do foco continua com 2 séries (tempo.musculo-protegido)', () => {
    let vistos = 0;
    for (const { c, d } of pares.filter((x) => x.c.perfil.minutosSessao === 30))
      for (const e of d.dias.flatMap((x) => x.exercicios))
        if (e.porque.some((q) => q.regraId === 'tempo.musculo-protegido') && !POR_ID[e.exId]!.musculos.primarios.some((m) => c.perfil.prioridades.some((g) => (GRUPOS[g] as readonly string[]).includes(m)))) {
          vistos++;
          expect(seriesDeVolume(e), `${c.nome}: ${e.exId}`).toBe(2);
        }
    expect(vistos).toBeGreaterThan(5);
  });

  // Medido na revisão cega de 13/11/2026 (docs/revisoes/treino-para-todos/pacote-1.md): subir tudo até encher a hora
  // baixou a nota de 2 de 5 iniciantes; só os exercícios grandes, até 3 séries, não baixou a de nenhum.
  it('para o iniciante, fora do foco, só os multiarticulares sobem, e até 3 séries', () => {
    let subiram = 0;
    for (const { c, a, d } of pares.filter((x) => x.c.perfil.nivel === 'iniciante')) {
      const foco = new Set<string>(c.perfil.prioridades.flatMap((g) => GRUPOS[g]));
      d.dias.forEach((dia, i) =>
        dia.exercicios.forEach((e, j) => {
          const antesDela = a.dias[i]!.exercicios[j]!.series;
          if (e.series <= antesDela || POR_ID[e.exId]!.musculos.primarios.some((m) => foco.has(m))) return;
          subiram++;
          expect(e.tipo, `${c.nome}: ${dia.nome}, ${e.exId}`).toBe('composto');
          expect(e.series, `${c.nome}: ${dia.nome}, ${e.exId}`).toBeLessThanOrEqual(VOLUME.sobraDoIniciante);
        }),
      );
    }
    expect(subiram).toBeGreaterThan(10);
  });
  it('o Leandro (iniciante, academia, 3 dias de 60 min) ganha uma série nos exercícios grandes e fica com folga no dia', () => {
    const [a, d] = [programa(antes, PERSONAS_NOVAS.leandro)!, programa(gerarPrograma, PERSONAS_NOVAS.leandro)!];
    expect(series(d)).toBeGreaterThan(series(a));
    for (const dia of d.dias) expect(dia.minutosEstimados).toBeLessThanOrEqual(0.95 * 60);
    expect(d.porque.find((q) => q.regraId === 'tempo.sobra-series')?.texto).toMatch(/virou uma série a mais nos exercícios grandes \(até 3 por exercício\)/);
    expect(d.porque.find((q) => q.regraId === 'volume.semanal.alvo')?.texto).toMatch(/cada músculo fica com ~6 séries por semana.*os exercícios grandes ganham uma série a mais/);
  });

  it('é determinístico: a mesma entrada dá o mesmo programa', () => {
    for (const c of CASOS.slice(0, 30)) expect(gerarPrograma(c.perfil, c.inventario)).toEqual(gerarPrograma(c.perfil, c.inventario));
  });
});
