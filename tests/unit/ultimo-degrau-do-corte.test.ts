import { beforeAll, describe, expect, it, vi } from 'vitest';
import { POR_ID, type Musculo } from '../../src/domain/biblioteca';
import { cortarTempo, gerarPrograma, minutos, razaoCoxa, seriesDeVolume, volumePorMusculo, type DiaPrograma, type ExercicioPrescrito, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { LIMITE_DO_DIA, VOLUME } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';

// Pacote D3 (23/11/2026), item 3: o último degrau de tempo.corte. O dia que, depois de toda a escada, ainda passa de 110%
// dos minutos perde séries também abaixo do mínimo do nível do foco, uma por vez, só até caber em 110%, sem descer do
// piso de 4 por músculo nem de 2 séries por exercício. O caso que deu origem: pernas sem equipamento com dor forte no
// ombro (51 a 54 min em 45). O "antes" é o protótipo com as regras adotadas menos esta (PROT=app,-d3-degrau).

const volume = (dias: DiaPrograma[]) => volumePorMusculo(dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) }))));
const acima = (p: Programa, min: number) => p.dias.filter((d) => d.minutosEstimados > LIMITE_DO_DIA * min).length;
const comDorNoOmbro = (perfil: Perfil): Perfil => ({
  ...perfil,
  triagem: { ...perfil.triagem, respostas: { ...perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'ombro', nota: 7 }] },
});
const ok = (gerar: typeof gerarPrograma, perfil: Perfil, inventario: Inventario): Programa => {
  const r = gerar(perfil, inventario);
  if (r.status !== 'ok') throw new Error(`sem programa: ${r.status}`);
  return r.programa;
};
/** Quem quer pernas e glúteos, 2 dias, com dor forte no ombro, sem equipamento (ou só com o Smith, que sai com a dor). */
const semEquipamento = (nivel: Perfil['nivel'], minutosSessao: number): Perfil =>
  comDorNoOmbro({ ...PERSONAS.ana.perfil, nivel, semanasParado: 0, diasSemana: 2, minutosSessao, prioridades: ['pernas', 'gluteos'], divisao: undefined, evitarExercicios: [], evitarEquipamentos: [] });

describe('tempo.corte, último degrau: o dia que ainda passa de 110% perde séries do foco abaixo do mínimo do nível (pacote D3)', { timeout: 60_000 }, () => {
  let antes: typeof gerarPrograma;
  beforeAll(async () => {
    vi.stubEnv('PROT', 'app,-d3-degrau');
    vi.resetModules();
    antes = ((await import('../../scripts/auditoria/prototipo/gerador')) as unknown as { gerarPrograma: typeof gerarPrograma }).gerarPrograma;
  });

  it.each([
    ['intermediario', 45, 51, 48],
    ['avancado', 45, 54, 48],
    ['intermediario', 30, 34, 32],
  ] as const)('pernas sem equipamento com dor forte no ombro (%s, %i min): o dia mais longo vai de %i para %i min', (nivel, min, de, para) => {
    for (const inventario of [{}, { smith: {} }] as Inventario[]) {
      const [a, d] = [ok(antes, semEquipamento(nivel, min), inventario), ok(gerarPrograma, semEquipamento(nivel, min), inventario)];
      expect(Math.max(...a.dias.map((x) => x.minutosEstimados))).toBe(de);
      expect(Math.max(...d.dias.map((x) => x.minutosEstimados))).toBe(para);
      expect(acima(a, min)).toBeGreaterThan(0);
      expect(acima(d, min)).toBe(0);
      // os exercícios são os mesmos; só saem séries, nunca abaixo de 2 por exercício
      expect(d.dias.map((x) => x.exercicios.map((y) => y.exId))).toEqual(a.dias.map((x) => x.exercicios.map((y) => y.exId)));
      for (const x of d.dias.flatMap((y) => y.exercicios)) expect(x.series).toBeGreaterThanOrEqual(VOLUME.seriesPorExercicio.min);
      // nenhum músculo cruza o piso de 4 por causa do degrau, e a coxa continua na faixa
      const [va, vd] = [volume(a.dias), volume(d.dias)];
      for (const m of Object.keys(va) as Musculo[]) if ((va[m] ?? 0) >= VOLUME.minimoEficazPiso) expect(vd[m] ?? 0, m).toBeGreaterThanOrEqual(VOLUME.minimoEficazPiso);
      expect(razaoCoxa(vd)).toBeLessThanOrEqual(VOLUME.coxa[1]);
      // o programa diz o que foi feito: menos séries, e o foco abaixo da meta por falta de tempo
      expect(d.avisos.some((q) => q.regraId === 'tempo.corte' && /^Para caber no tempo: .*menos séries/.test(q.texto))).toBe(true);
    }
  });

  it('o aviso do dia mostra os minutos de depois do degrau', () => {
    const d = ok(gerarPrograma, semEquipamento('intermediario', 45), {});
    const longo = d.dias.find((x) => x.minutosEstimados > 45)!;
    expect(d.avisos.map((q) => q.texto)).toContain(`${longo.nome}: deve levar ~48 min, mais que os 45 min que você tem. Reserve uns minutos a mais nesse dia, ou escolha 50 min na rotina.`);
    expect(d.avisos.some((q) => /deve levar ~51 min/.test(q.texto))).toBe(false);
  });

  describe('nas 12 personas e nas variações de tempo e de foco', () => {
    const TODAS = { ...PERSONAS, ...PERSONAS_NOVAS };
    const FOCOS: Grupo[][] = [[], ['pernas'], ['pernas', 'gluteos'], ['peito', 'costas', 'ombros', 'bracos']];
    const casos = Object.values(TODAS).flatMap((p) => [
      { nome: p.nome, perfil: p.perfil, inventario: p.inventario },
      ...[30, 45].flatMap((minutosSessao) =>
        FOCOS.map((prioridades) => ({ nome: `${p.nome}, ${minutosSessao} min, foco ${prioridades.join('+') || 'nenhum'}`, perfil: { ...p.perfil, minutosSessao, prioridades, divisao: undefined }, inventario: p.inventario })),
      ),
    ]);
    let pares: { nome: string; min: number; a: Programa; d: Programa }[];
    beforeAll(() => {
      pares = casos.flatMap((c) => {
        const [a, d] = [antes(c.perfil, c.inventario), gerarPrograma(c.perfil, c.inventario)];
        return a.status === 'ok' && d.status === 'ok' ? [{ nome: c.nome, min: c.perfil.minutosSessao, a: a.programa, d: d.programa }] : [];
      });
    });

    it('quem não tinha dia acima de 110% fica com o programa igual', () => {
      const sem = pares.filter((x) => acima(x.a, x.min) === 0);
      expect(sem.length).toBeGreaterThan(50);
      for (const x of sem) expect(x.d.dias, x.nome).toEqual(x.a.dias);
    });

    it('quem tinha não fica com mais dias acima, e nenhum músculo cruza o piso de 4', () => {
      const com = pares.filter((x) => acima(x.a, x.min) > 0);
      expect(com.length).toBeGreaterThan(3);
      expect(com.some((x) => acima(x.d, x.min) < acima(x.a, x.min))).toBe(true);
      for (const x of com) {
        expect(acima(x.d, x.min), x.nome).toBeLessThanOrEqual(acima(x.a, x.min));
        const [va, vd] = [volume(x.a.dias), volume(x.d.dias)];
        const mesmos = JSON.stringify(x.d.dias.map((y) => y.exercicios.map((z) => z.exId))) === JSON.stringify(x.a.dias.map((y) => y.exercicios.map((z) => z.exId)));
        if (mesmos) for (const m of Object.keys(va) as Musculo[]) if ((va[m] ?? 0) >= VOLUME.minimoEficazPiso) expect(vd[m] ?? 0, `${x.nome}: ${m}`).toBeGreaterThanOrEqual(VOLUME.minimoEficazPiso);
      }
    });
  });
});

// O degrau direto num dia montado à mão: tudo no foco, e o foco no mínimo do nível.
describe('tempo.corte, último degrau, num dia montado à mão', () => {
  const px = (exId: string, series: number): ExercicioPrescrito => {
    const e = POR_ID[exId]!;
    const funcao = Object.values(FUNCAO).find((f) => f.niveis.flat().includes(exId))!.id;
    return { exId, nome: e.nome, padrao: e.padrao, tipo: e.tipo, funcao, series, reps: e.faixaReps, rir: [1, 2], descansoSeg: e.tipo === 'composto' ? 105 : 75, unilateral: e.unilateral, animacaoId: e.animacaoId, alternativas: [], porque: [] };
  };
  // O peito é o foco e está no mínimo do nível (10 séries na semana): 8 no dia A e 2 no dia B. O dia B tem também uma
  // remada, para a semana não ter folga (o dia típico perto dos minutos); `diaCurto` é o dia B sem ela.
  const [diaA, diaB] = [[px('supino-reto', 4), px('crucifixo-polia', 4)], [px('supino-inclinado', 2), px('remada-baixa', 3)]];
  const diaCurto = [px('supino-inclinado', 2)];
  const metas = { peito: 12 } as Partial<Record<Musculo, number>>;
  const foco = new Set<Musculo>(['peito']);
  const semana = (b = diaB): DiaPrograma[] => [diaA, b].map((exs, i) => ({ id: `d${i}`, nome: `Dia ${i}`, exercicios: exs.map((x) => ({ ...x })), minutosEstimados: minutos(exs) }));
  // (ninguém pode drop set; a dupla, se houver, é a mesma com e sem o degrau)
  const cortar = (limite: number, ultimoDegrau: boolean, b = diaB) => cortarTempo(semana(b), limite, metas, 'intermediario', foco, [], () => false, undefined, false, undefined, false, ultimoDegrau);
  const resumo = (ds: DiaPrograma[]) => ds.map((d) => d.exercicios.map((x) => `${x.exId} ${x.series}`));

  it('a semana montada à mão tem o peito no mínimo do nível, e por isso os degraus de antes não tiram nada', () => {
    expect(volume(semana()).peito).toBe(VOLUME.minimo.intermediario);
  });

  it('o dia a 120% do tempo perde séries só até caber em 110%, e só com o degrau ligado', () => {
    const limite = Math.floor(minutos(diaA) / 1.2);
    expect(minutos(diaB)).toBeLessThanOrEqual(limite);
    // sem o degrau (a montagem que as comparações entre montagens e divisões veem), o dia fica como estava
    const semDegrau = cortar(limite, false);
    expect(semDegrau[0]!.minutosEstimados).toBeGreaterThan(LIMITE_DO_DIA * limite);
    const [a] = cortar(limite, true);
    expect(a!.minutosEstimados).toBeLessThanOrEqual(LIMITE_DO_DIA * limite);
    // parou assim que coube: saíram 2 séries (8 → 6), e não as 4 que o piso de 4 deixaria sair; com uma a menos não cabia
    expect(a!.exercicios.reduce((t, x) => t + x.series, 0)).toBe(6);
    expect(Math.min(...a!.exercicios.map((_, i) => minutos(a!.exercicios.map((y, j) => (j === i ? { ...y, series: y.series + 1 } : y)))))).toBeGreaterThan(LIMITE_DO_DIA * limite);
    expect(a!.exercicios.map((x) => x.exId)).toEqual(['supino-reto', 'crucifixo-polia']);
    // fora o degrau, o corte é o mesmo
    expect(resumo(cortar(limite, true)).slice(1)).toEqual(resumo(semDegrau).slice(1));
    for (const x of a!.exercicios) expect(x.series).toBeGreaterThanOrEqual(VOLUME.seriesPorExercicio.min);
    const peito = volume(cortar(limite, true)).peito!;
    expect(peito).toBeLessThan(VOLUME.minimo.intermediario);
    expect(peito).toBeGreaterThanOrEqual(VOLUME.minimoEficazPiso);
  });

  it('com folga na semana (o dia típico abaixo de 85% dos minutos), o foco não desce do mínimo do nível, e nada sai', () => {
    const limite = Math.floor(minutos(diaA) / 1.2);
    // dois dias, o típico é a média: com o dia B curto, fica abaixo de 85% mesmo depois do degrau
    expect((LIMITE_DO_DIA * limite + minutos(diaCurto)) / 2).toBeLessThan(0.85 * limite);
    const d = cortar(limite, true, diaCurto);
    expect(d[0]!.minutosEstimados).toBeGreaterThan(LIMITE_DO_DIA * limite);
    expect(volume(d).peito).toBe(VOLUME.minimo.intermediario);
  });

  it('se nem tirando tudo o que pode o dia couber em 110%, nada sai', () => {
    const d = cortar(8, true);
    expect(d[0]!.minutosEstimados).toBeGreaterThan(LIMITE_DO_DIA * 8);
    // (os degraus de antes podem cortar a remada do dia B, que não é foco; o último degrau não tira nada)
    expect(resumo(d)).toEqual(resumo(cortar(8, false)));
    expect(resumo(d)[0]).toEqual(resumo(semana())[0]);
  });
});
