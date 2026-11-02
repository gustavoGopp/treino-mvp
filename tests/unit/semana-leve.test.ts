import { describe, expect, it } from 'vitest';
import { dorQueSeRepete, semanaLeveDeHoje } from '../../src/domain/acompanhamento/semana-leve';
import { hojeNoPrograma, type Sessao } from '../../src/domain/sessao';
import type { Estado } from '../../src/storage/esquema';
import { aceitarSemanaLeve, encerrarSemanaLeve, marcarHojeFoi, recusarSemanaLeve, semanaLeveDoEstado } from '../../src/features/acompanhamento/acoes';
import { iniciarSessao } from '../../src/features/treino/acoes';
import { bruno } from '../personas';
import { dia, estadoDe, serieTipica, treinar } from './apoio-treino';

// Semana leve sugerida (deload.semana-leve; pesquisa-v2/07, seção 6): os casos S1 a S5 do T6, o toque "hoje foi" e o
// aviso de dor, que soma à semana leve e nunca é substituído por ela.

const DIAS = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
const sugestao = (e: Estado, n: number) =>
  semanaLeveDeHoje(e.programa!.programa, e.historico, dia(n), {
    inventario: () => bruno.inventario,
    localDe: () => 'local-1',
    ...(e.semanaLeve ? { semanaLeve: e.semanaLeve } : {}),
  });
/** Uma semana inteira do Bruno, com a série de cada exercício dada pela semana. */
function semanaDe(e: Estado, w: number, serie = serieTipica, quantas?: (exId: string, prescritas: number) => number) {
  [0, 1, 3, 4].forEach((k, i) => (e = treinar(e, w * 7 + k, DIAS[i]!, 'local-1', serie, quantas)));
  return e;
}
const comHojeFoi = (e: Estado, k: number, v: 'leve' | 'normal' | 'pesado') => marcarHojeFoi(e, e.historico.at(k)!.id, v);

describe('os casos S1 a S5 do T6', () => {
  it('S1: 6 semanas seguidas, nada parado, sem cansaço → não sugere (antes do R2, sugeria por "6 semanas sem pausa")', () => {
    let e = estadoDe(bruno);
    // As repetições sobem 1 por semana (7 a 12): a dupla progressão anda, nada fica parado.
    for (let w = 0; w < 6; w++) e = semanaDe(e, w, (exId) => ({ ...serieTipica(exId), reps: 7 + w }));
    const s = sugestao(e, 6 * 7);
    expect(s.sugerir).toBe(false);
    expect(s.motivos).toEqual([]);
  });

  it('S2: 2 exercícios estagnados → sugere, com o motivo', () => {
    let e = estadoDe(bruno);
    for (let w = 0; w < 3; w++) e = semanaDe(e, w);
    const s = sugestao(e, 3 * 7);
    expect(s.sugerir).toBe(true);
    expect(s.motivos[0]).toMatch(/^\d+ exercícios sem progresso em 3 treinos$/);
    expect(s.texto).toMatch(/^Para descansar, não para crescer\./);
    expect(s.regraId).toBe('deload.semana-leve');
  });

  it('S3: "pesado demais" em 2 dos últimos 3 treinos → sugere', () => {
    let e = estadoDe(bruno);
    e = semanaDe(e, 0, (exId) => ({ ...serieTipica(exId), reps: 9 }));
    e = comHojeFoi(comHojeFoi(e, -1, 'pesado'), -3, 'pesado');
    const s = sugestao(e, 5);
    expect(s.sugerir).toBe(true);
    expect(s.motivos).toEqual(['"pesado demais" em 2 dos últimos 3 treinos']);
    // Um "pesado demais" só não basta; um "leve" ou "normal" não conta.
    const f = comHojeFoi(comHojeFoi(e, -1, 'pesado'), -2, 'normal');
    expect(sugestao(f, 5).sugerir).toBe(false);
  });

  it('S4: dor 4/10 no supino em 2 sessões seguidas → sugere a semana leve E mostra o aviso de dor e de avaliação', () => {
    let e = estadoDe(bruno);
    const comDor = (exId: string) => ({ ...serieTipica(exId), reps: 9, ...(exId === 'supino-reto' ? { dor: 4 } : {}) });
    e = treinar(e, 0, 'superior-a', 'local-1', comDor);
    e = treinar(e, 3, 'superior-a', 'local-1', comDor);
    const s = sugestao(e, 4);
    expect(dorQueSeRepete(e.historico)).toEqual(['supino-reto']);
    expect(s.sugerir).toBe(true);
    expect(s.motivos).toEqual(['dor de 3 a 5 no mesmo exercício em 2 treinos seguidos']);
    expect(s.dor).toMatchObject({ exIds: ['supino-reto'], regraId: 'seguranca.dor.escala' });
    expect(s.dor!.texto).toMatch(/procure avaliação profissional/);
    // A dor acima de 5 não é "dor que se repete" para a semana leve: ela já encerra o exercício (seguranca.dor.escala).
    let g = estadoDe(bruno);
    const forte = (exId: string) => ({ ...serieTipica(exId), ...(exId === 'supino-reto' ? { dor: 7 } : {}) });
    g = treinar(treinar(g, 0, 'superior-a', 'local-1', forte), 3, 'superior-a', 'local-1', forte);
    expect(dorQueSeRepete(g.historico)).toEqual([]);
  });

  it('S5: 2 exercícios estagnados na semana 2 depois de uma volta de pausa → não sugere', () => {
    let e = estadoDe(bruno);
    for (let w = 0; w < 2; w++) e = semanaDe(e, w);
    // Volta depois de 3 semanas (bloco novo) e 3 treinos parados na mesma carga, com as mesmas 2 séries.
    const duas = () => 2;
    for (let w = 5; w < 7; w++) e = semanaDe(e, w, serieTipica, duas);
    e = treinar(e, 7 * 7, 'superior-a', 'local-1', serieTipica, duas);
    const h = hojeNoPrograma(e.programa!.programa, e.historico, dia(7 * 7 + 1));
    expect(h.bloco.pausaDias).toBeDefined();
    expect(h.semana).toBe(3);
    const s = sugestao(e, 7 * 7 + 1);
    expect(s.motivos.length).toBeGreaterThan(0);
    expect(s.carencia).toBe(true);
    expect(s.sugerir).toBe(false);
    // Na semana 4 do bloco, a carência acaba.
    e = semanaDe(e, 8, serieTipica, duas);
    expect(sugestao(e, 9 * 7).sugerir).toBe(true);
  });
});

describe('a semana leve aceita', () => {
  const parado = () => {
    let e = estadoDe(bruno);
    for (let w = 0; w < 3; w++) e = semanaDe(e, w);
    return e;
  };

  it('é manual: só começa com o aceite, vale 7 dias, deixa a metade das séries com RIR 3–4, e o programa salvo não muda', () => {
    const e = parado();
    const n = 3 * 7;
    expect(semanaLeveDoEstado(e, dia(n))!.mostrar).toBe(true);
    const l = aceitarSemanaLeve(e, dia(n));
    expect(l.programa).toBe(e.programa);
    const h = hojeNoPrograma(l.programa!.programa, l.historico, dia(n + 1), { semanaLeve: l.semanaLeve! });
    expect(h.semanaLeve).toBe(true);
    expect(h.fase?.regraId).toBe('deload.semana-leve');
    const normal = l.programa!.programa.dias[0]!.exercicios;
    h.dias[0]!.exercicios.forEach((x, i) => {
      expect(x.series).toBe(Math.max(1, Math.round(normal[i]!.series * 0.5)));
      expect(x.rir).toEqual([3, 4]);
    });
    // O treino feito na semana leve fica marcado, e fora da dupla progressão.
    const t = iniciarSessao(l, dia(n + 1), 'superior-a');
    expect(t.sessaoAtual!.semanaLeve).toBe(true);
    expect(semanaLeveDoEstado(l, dia(n + 1))).toMatchObject({ ativa: true, mostrar: false, ate: '2026-11-01' });
    // No 8º dia, acabou.
    expect(hojeNoPrograma(l.programa!.programa, l.historico, dia(n + 7), { semanaLeve: l.semanaLeve! }).semanaLeve).toBe(false);
  });

  it('"Voltar ao normal" encerra antes; "Agora não" esconde a sugestão até o próximo treino', () => {
    const e = parado();
    const n = 3 * 7;
    const l = encerrarSemanaLeve(aceitarSemanaLeve(e, dia(n)), dia(n + 2));
    expect(semanaLeveDoEstado(l, dia(n + 3))!.ativa).toBe(false);
    // Depois de uma semana leve, 3 semanas sem sugerir de novo.
    expect(semanaLeveDoEstado(l, dia(n + 3))!.mostrar).toBe(false);
    const r = recusarSemanaLeve(e, dia(n));
    expect(semanaLeveDoEstado(r, dia(n))!.mostrar).toBe(false);
    const depois = treinar(r, n + 1, 'superior-a');
    expect(semanaLeveDoEstado(depois, dia(n + 2))!.mostrar).toBe(true);
  });

  it('o toque "hoje foi" não vem marcado; um toque marca e o mesmo toque desfaz', () => {
    const e = treinar(estadoDe(bruno), 0, 'superior-a');
    const id = e.historico[0]!.id;
    expect(e.historico[0]!.hojeFoi).toBeUndefined();
    const p = marcarHojeFoi(e, id, 'pesado');
    expect(p.historico[0]!.hojeFoi).toBe('pesado');
    expect(marcarHojeFoi(p, id, 'normal').historico[0]!.hojeFoi).toBe('normal');
    expect(marcarHojeFoi(p, id, 'pesado').historico[0]!.hojeFoi).toBeUndefined();
  });

  it('as sessões da semana leve ficam fora da dupla progressão: a sugestão depois dela olha os treinos de antes', () => {
    const e = parado();
    const l = aceitarSemanaLeve(e, dia(21));
    let v = l;
    [0, 1, 3, 4].forEach((k, i) => (v = treinar(v, 21 + k, DIAS[i]!, 'local-1', (exId) => ({ ...serieTipica(exId), reps: 6, rir: 4 }))));
    expect(v.historico.slice(-4).every((s: Sessao) => s.semanaLeve)).toBe(true);
    // Sem as sessões leves, os 3 treinos de antes seguem estagnados (a leve não "piorou" nada).
    expect(sugestao({ ...v, semanaLeve: undefined }, 26).motivos[0]).toMatch(/exercícios sem progresso/);
  });
});
