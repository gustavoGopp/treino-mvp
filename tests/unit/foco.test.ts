import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import type { Musculo } from '../../src/domain/biblioteca';
import { GRUPOS, gerarPrograma, metasDoPerfil, musculosDoAviso, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { DIVISOES, OPCOES_POR_DIAS } from '../../src/domain/gerador/divisoes';
import { notaDoFoco } from '../../src/domain/gerador/opcoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { VOLUME } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { carla } from '../personas';
import { gael, iara, PERSONAS_18 } from '../personas/regua';

// R5d, "o foco que aparece" (08/11/2026): volume.prioridade.foco-primeiro, volume.prioridade.segundo-exercicio e a meta
// do foco do iniciante (volume.semanal.alvo). Só personas fictícias.

const ok = (p: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(p, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const INFERIORES: Musculo[] = ['quadriceps', 'posteriores', 'gluteos', 'panturrilha'];

describe('a meta do foco (volume.semanal.alvo)', () => {
  it('o foco do iniciante tem meta 10 (era 8); os outros ficam em 6 e o abdômen em 4', () => {
    const m = metasDoPerfil('iniciante', ['peito']);
    expect(m.peito).toBe(10);
    expect(m.costas).toBe(VOLUME.minimoEficaz);
    expect(m.abdomen).toBe(VOLUME.minimoEficazPiso);
    expect(metasDoPerfil('intermediario', ['peito']).peito).toBe(12);
    expect(metasDoPerfil('avancado', ['peito']).peito).toBe(14);
  });
  it('a fase de aprendizado continua com 3/4 das séries (6 de 8, como antes do R5d)', () => {
    const p = ok(iara.perfil, iara.inventario);
    expect(p.fases[0]!.fatorSeries).toBe(0.75);
  });
});

describe('o foco usa o tempo primeiro (volume.prioridade.foco-primeiro)', () => {
  it('o caso que motivou o R5d (sem nada, foco nos superiores, 60 min): peito e tríceps acima das pernas, que ficam no piso', () => {
    for (const dias of [3, 4] as const) {
      const v = ok({ ...gael.perfil, diasSemana: dias, divisao: OPCOES_POR_DIAS[dias][0] }, gael.inventario).volumeSemanal;
      for (const foco of ['peito', 'triceps'] as Musculo[])
        for (const outro of ['quadriceps', 'posteriores'] as Musculo[]) expect(v[foco] ?? 0, `${dias} dias: ${foco} × ${outro}`).toBeGreaterThan(v[outro] ?? 0);
      for (const outro of ['quadriceps', 'posteriores'] as Musculo[]) {
        expect(v[outro] ?? 0, `${dias} dias: ${outro}`).toBeGreaterThanOrEqual(VOLUME.minimoEficazPiso);
        expect(v[outro] ?? 0, `${dias} dias: ${outro}`).toBeLessThanOrEqual(VOLUME.minimoEficaz + 2);
      }
    }
  });
  it('sem foco, o tempo que sobra continua levando todos ao alvo de antes (8 no iniciante, decisão de 06/11)', () => {
    const p = ok(iara.perfil, iara.inventario);
    expect(p.volumeSemanal.quadriceps).toBe(8);
    expect(p.porque.find((q) => q.regraId === 'tempo.sobra-series')?.texto).toMatch(/sobem até ~8/);
  });
  it('com foco, o texto do tempo que sobra diz que ele foi para o foco', () => {
    const textos = Object.values(PERSONAS_18).flatMap((x) =>
      (Object.keys(GRUPOS) as Grupo[]).flatMap((g) => ok({ ...x.perfil, prioridades: [g] }, x.inventario).porque.filter((q) => q.regraId === 'tempo.sobra-series').map((q) => q.texto)),
    );
    // Com foco sem exercício possível (costas sem nada para puxar), o tempo segue para todos, como sem foco.
    const doFoco = textos.filter((t) => /virou série para o foco, até ~\d+ séries por semana; os outros músculos ficam com ~6\./.test(t));
    expect(doFoco.length).toBeGreaterThan(0);
    for (const t of textos) expect(t).toMatch(/para o foco|sobem até ~\d+ séries/);
  });
});

describe('o 2º exercício do foco (volume.prioridade.segundo-exercicio)', { timeout: 60_000 }, () => {
  // As 18 personas com cada foco de um grupo e com o foco delas, nos minutos delas e com 30 e 60.
  const casos: { nome: string; perfil: Perfil; inv: Inventario }[] = [];
  for (const [nome, x] of Object.entries(PERSONAS_18))
    for (const prioridades of [x.perfil.prioridades, ...(Object.keys(GRUPOS) as Grupo[]).map((g) => [g])])
      for (const minutosSessao of [x.perfil.minutosSessao, 30, 60])
        casos.push({ nome: `${nome}/${prioridades.join('+') || 'sem foco'}/${minutosSessao}min`, inv: x.inventario, perfil: { ...x.perfil, prioridades, minutosSessao } });

  it('a Carla (avançada, foco nas pernas): a panturrilha sentada entra a mais, num dia de pernas, e diz por quê', () => {
    const p = ok(carla.perfil, carla.inventario);
    const extra = p.dias.flatMap((d) => d.exercicios.map((x) => ({ d, x }))).filter(({ x }) => x.porque.some((q) => q.regraId === 'volume.prioridade.segundo-exercicio'));
    expect(extra.map(({ x }) => x.exId)).toContain('panturrilha-sentada');
    expect(extra.find(({ x }) => x.exId === 'panturrilha-sentada')!.d.nome).toBe('Inferior');
    expect(p.volumeSemanal.panturrilha).toBe(14);
  });
  it('só entra para um músculo do foco, nunca num dia de outra região, e o dia não passa de 110% dos minutos', () => {
    let vistos = 0;
    for (const c of casos) {
      const prio = new Set<Musculo>(c.perfil.prioridades.flatMap((g) => GRUPOS[g]));
      const p = ok(c.perfil, c.inv);
      for (const d of p.dias)
        for (const x of d.exercicios) {
          if (!x.porque.some((q) => q.regraId === 'volume.prioridade.segundo-exercicio')) continue;
          vistos++;
          const e = POR_ID[x.exId]!;
          expect(e.musculos.primarios.some((m) => prio.has(m)), `${c.nome}: ${x.exId}`).toBe(true);
          const inferior = e.musculos.primarios.some((m) => INFERIORES.includes(m));
          // O dia é da mesma região, ou o modelo do dia tem uma vaga do músculo (o Inferior B tem a elevação lateral para o foco nos ombros).
          const doModelo = DIVISOES[p.divisaoId!].dias.find((z) => z.id === d.id)!.vagas.some((w) => e.musculos.primarios.includes(FUNCAO[w.funcao]!.musculo));
          if (e.padrao !== 'core' && !doModelo)
            expect(
              d.exercicios.some((y) => y !== x && POR_ID[y.exId]!.padrao !== 'core' && POR_ID[y.exId]!.musculos.primarios.some((m) => INFERIORES.includes(m)) === inferior),
              `${c.nome}: ${x.exId} em ${d.nome}`,
            ).toBe(true);
          expect(d.minutosEstimados, `${c.nome}: ${d.nome}`).toBeLessThanOrEqual(Math.round(1.1 * c.perfil.minutosSessao));
        }
    }
    expect(vistos).toBeGreaterThan(10);
  });
  it('nunca repete um exercício no mesmo dia nem passa do teto semanal de 20', () => {
    for (const c of casos) {
      const p = ok(c.perfil, c.inv);
      for (const d of p.dias) expect(new Set(d.exercicios.map((x) => x.exId)).size, `${c.nome}: ${d.nome}`).toBe(d.exercicios.length);
      for (const [m, n] of Object.entries(p.volumeSemanal)) expect(n, `${c.nome}: ${m}`).toBeLessThanOrEqual(VOLUME.teto);
    }
  });
});

describe('a barra só na descida antes da barra para o iniciante (selecao.barra-negativa-iniciante)', () => {
  const soBarra: Inventario = { barra_fixa: {} };
  const ids = (p: Programa) => p.dias.flatMap((d) => d.exercicios.map((x) => x.exId));
  it('o iniciante só com barra fixa recebe a negativa, e não a barra', () => {
    for (const prioridades of [[], ['costas']] as Grupo[][])
      for (const dias of [2, 3, 4, 5, 6] as const) {
        const p = ok({ ...gael.perfil, nivel: 'iniciante', prioridades, diasSemana: dias, divisao: OPCOES_POR_DIAS[dias][0] }, soBarra);
        expect(ids(p), `${dias} dias`).toContain('barra-fixa-negativa');
        expect(ids(p).filter((id) => id === 'barra-fixa' || id === 'barra-fixa-supinada'), `${dias} dias`).toEqual([]);
        // A barra fixa fica nas alternativas da negativa: é para onde a escada leva.
        expect(p.dias.flatMap((d) => d.exercicios).find((x) => x.exId === 'barra-fixa-negativa')!.alternativas).toContain('barra-fixa');
      }
  });
  it('o intermediário continua com a barra fixa', () => {
    expect(ids(ok({ ...gael.perfil, prioridades: ['costas'] }, soBarra))).toContain('barra-fixa');
  });
});

describe('os avisos de lacuna dizem o que o programa tem (R5-CL; conferido no R5d)', () => {
  it('nenhum músculo com exercício direto no programa aparece como "sem exercício"; "só com remadas" nunca vem com puxada', () => {
    const invs: Inventario[] = [{}, { elasticos: { intensidades: 3 } }, { barra_fixa: {} }, { halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 } }, { suspensao: {} }];
    for (const inv of invs)
      for (const nivel of ['iniciante', 'intermediario', 'avancado'] as const)
        for (const dias of [2, 3, 4, 5, 6] as const)
          for (const prioridades of [[], ['costas'], ['peito', 'costas', 'ombros', 'bracos']] as Grupo[][]) {
            const p = ok({ ...gael.perfil, nivel, prioridades, diasSemana: dias, divisao: OPCOES_POR_DIAS[dias][0] }, inv);
            const nome = `${JSON.stringify(inv)}/${nivel}/${dias}d/${prioridades.join('+')}`;
            const diretos = new Set(p.dias.flatMap((d) => d.exercicios.flatMap((x) => POR_ID[x.exId]!.musculos.primarios)));
            for (const a of p.avisos.filter((x) => x.regraId === 'equipamento.sem-ancoragem' || x.texto.startsWith('Sem exercício possível')))
              for (const m of musculosDoAviso(a)) expect(diretos.has(m), `${nome}: ${a.texto}`).toBe(false);
            if (p.avisos.some((a) => /só com remadas/.test(a.texto))) expect(p.dias.some((d) => d.exercicios.some((x) => x.padrao === 'puxar-v')), nome).toBe(false);
          }
  });
});

describe('escolha até 2 grupos de foco (volume.prioridade.ate-dois)', () => {
  it('sem nota com até 2 grupos (braços conta 2); com mais, a nota não bloqueia e diz por quê', () => {
    expect(notaDoFoco([])).toBeNull();
    expect(notaDoFoco(['peito'])).toBeNull();
    expect(notaDoFoco(['peito', 'costas'])).toBeNull();
    expect(notaDoFoco(['bracos'])).toBeNull();
    expect(notaDoFoco(['peito', 'costas', 'ombros'])).toMatch(/^Com mais de 2 grupos, o foco se divide e cada um cresce menos\. Dá para seguir assim/);
    expect(notaDoFoco(['peito', 'bracos'])).toMatch(/^"Braços" conta como 2: bíceps e tríceps\./);
    expect(notaDoFoco(['pernas'])).toMatch(/^"Pernas" conta como 3: frente da coxa, posterior e panturrilha\. Com isso, o foco se divide/);
    expect(notaDoFoco(['peito', 'costas', 'pernas'])).toMatch(/"Pernas" conta como 3/);
  });
});
