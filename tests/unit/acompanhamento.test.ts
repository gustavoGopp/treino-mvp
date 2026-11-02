import { describe, expect, it } from 'vitest';
import { mensagemDeVolta, tempoDaPausa } from '../../src/domain/acompanhamento/volta';
import { estadoDoMusculo, resumoDaSemana, seriesEfetivas, TEXTO_ESTADO, type ResumoDaSemana } from '../../src/domain/acompanhamento/semana';
import { hojeNoPrograma, type Sessao } from '../../src/domain/sessao';
import type { Estado } from '../../src/storage/esquema';
import { hojeDoEstado } from '../../src/features/treino/acoes';
import { bruno, LOCAIS_DO_BRUNO } from '../personas';
import { dia, estadoDe, treinar } from './apoio-treino';

// "A sua semana" e as mensagens (acompanhamento.semana e acompanhamento.mensagens; pesquisa-v2/07, seção 4): os casos
// W1 a W7 do T6, a semana com vários locais e as mensagens sem culpa.

const DIAS = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
const semana = (e: Estado, n: number, extra: { revisaoRespondidaEm?: string } = {}) =>
  resumoDaSemana(e.programa!.programa, e.historico, dia(n), { planejados: e.rotina!.diasSemana, ...extra });
const musculo = (r: ResumoDaSemana, m: string) => r.musculos.find((x) => x.musculo === m)!;
const sessao = (n: number, exercicios: Sessao['exercicios'], diaId = 'superior-a'): Sessao => ({ id: dia(n), diaId, semana: 1, inicio: dia(n), fim: dia(n, 11), exercicios });
const series = (exId: string, k: number, rir = 2) => ({ exId, series: Array.from({ length: k }, () => ({ carga: { tipo: 'kg' as const, kg: 10 }, reps: 10, rir })) });
/** Todas as mensagens são sem culpa (acompanhamento.mensagens). */
const SEM_CULPA = /falh|perd(eu|ido)|dever|devia|morte|morr|risco|outras pessoas|atrasad|dívida/i;

describe('os casos W1 a W7 do T6', () => {
  it('W1 (critério 6): o Bruno planeja 4 e faz 4; peito com as séries efetivas na meta de 12', () => {
    let e = estadoDe(bruno);
    [0, 1, 3, 4].forEach((n, i) => (e = treinar(e, n, DIAS[i]!)));
    const r = semana(e, 5);
    expect([r.feitos, r.planejados]).toEqual([4, 4]);
    expect(r.treinos.every((t) => t.feito)).toBe(true);
    expect(musculo(r, 'peito').meta).toBe(12);
    expect(musculo(r, 'peito').feitas).toBeGreaterThanOrEqual(12);
    expect(musculo(r, 'peito').estado).toBe('na-meta');
    expect(r.mensagem).toMatch(/^Semana completa: 4 de 4\./);
    expect(r.mensagem).toMatch(/ (Todos os músculos|[A-ZÍÔ].*) na meta\.$/);
    expect(r.metaPrescrita).toBe(false);
    expect(r.segunda).toBe('2026-10-05');
    expect(r.domingo).toBe('2026-10-11');
  });

  it('W2 (critério 6): 2 de 4 na quinta; peito 6 de 12 "crescendo", bíceps 3 de 12 "mantendo", com o próximo treino e nenhuma cor de alerta', () => {
    const e = estadoDe(bruno);
    e.historico = [sessao(0, [series('supino-reto', 6)]), sessao(1, [series('rosca-inclinada', 3)], 'inferior-a')];
    const r = semana(e, 3);
    expect([r.feitos, r.planejados]).toEqual([2, 4]);
    expect(musculo(r, 'peito')).toMatchObject({ feitas: 6, meta: 12, estado: 'crescendo' });
    expect(musculo(r, 'biceps')).toMatchObject({ feitas: 3, meta: 12, estado: 'mantendo' });
    expect(r.mensagem).toBe('2 de 4 treinos. Se der, o Superior B cabe até domingo.');
    expect(r.treinos.map((t) => [t.nome, t.feito])).toEqual([
      ['Superior A', true],
      ['Inferior A', true],
      ['Superior B', false],
      ['Inferior B', false],
    ]);
    expect(new Set(r.musculos.map((m) => m.estado))).toEqual(new Set(['crescendo', 'mantendo', 'sem-treino']));
  });

  it('W3: uma série com RIR 5 não conta; a remada soma 0,5 ao bíceps (série indireta)', () => {
    const v = seriesEfetivas([sessao(0, [series('supino-reto', 1, 5), series('remada-apoiada', 1)])]);
    expect(v.peito).toBeUndefined();
    expect(v.biceps).toBe(0.5);
    expect(v.costas).toBe(1);
    // Amplitude encurtada não conta; o drop set conta 2, como na meta; a série de acerto com RIR ≤ 4 conta.
    const e = (x: object) => seriesEfetivas([sessao(0, [{ exId: 'supino-reto', series: [{ carga: { tipo: 'kg', kg: 10 }, reps: 10, rir: 2, ...x }] }])]).peito;
    expect(e({ amplitudeCompleta: false })).toBeUndefined();
    expect(e({ quedas: [{ carga: { tipo: 'kg', kg: 8 }, reps: 6 }] })).toBe(2);
    expect(e({ calibracao: true })).toBe(1);
    expect(e({ calibracao: true, rir: 6 })).toBeUndefined();
  });

  it('W4: na semana 1 da volta, a meta da semana é o prescrito; quem faz tudo fica "na meta"', () => {
    let e = estadoDe(bruno);
    [0, 1, 3, 4].forEach((n, i) => (e = treinar(e, n, DIAS[i]!)));
    const n = 4 + 24; // 24 dias depois, numa segunda-feira
    [0, 1, 3, 4].forEach((k, i) => (e = treinar(e, n + k, DIAS[i]!)));
    const r = semana(e, n + 5);
    expect(hojeDoEstado(e, dia(n + 5))!.fase?.regraId).toBe('readaptacao.semana1');
    expect(r.metaPrescrita).toBe(true);
    expect(musculo(r, 'peito').meta).toBeLessThan(12);
    expect(r.musculos.every((m) => m.estado === 'na-meta')).toBe(true);
  });

  it('W5: a semana termina com 0 treinos → nenhum aviso; "6 das últimas 8 semanas" vira "5 das últimas 8"', () => {
    let e = estadoDe(bruno);
    // 8 semanas, com treino em 6 (sem treino nas semanas 2 e 5), uma vez por semana.
    [0, 1, 3, 4, 6, 7].forEach((w) => (e = treinar(e, w * 7, DIAS[w % 4]!)));
    const r8 = semana(e, 8 * 7);
    expect(r8.feitos).toBe(0);
    expect(r8.mensagem).toBe('Nova semana. O próximo treino é o Superior A.');
    expect([r8.comTreino, r8.semanas.length]).toEqual([6, 8]);
    // A semana 8 termina sem treino.
    const r9 = semana(e, 9 * 7);
    expect([r9.comTreino, r9.semanas.length]).toEqual([5, 8]);
    expect(r9.mensagem).toMatch(/^Nova semana/);
    // A semana de hoje só entra quando tem treino: o número não cai no meio da semana.
    expect(semana(e, 9 * 7 + 3).comTreino).toBe(5);
    // Com treino na semana de hoje, a janela passa a ser ela e as 7 anteriores (semanas 2 a 9): 5 de 8, a última cheia.
    e = treinar(e, 9 * 7 + 3, 'superior-b');
    const r = semana(e, 9 * 7 + 4);
    expect([r.comTreino, r.semanas.length, r.semanas.at(-1)]).toEqual([5, 8, true]);
  });

  it('W6: 3 das últimas 4 semanas com 2 de 4 treinos → oferece um programa de 2 ou 3 dias; sem aceite, nada muda', () => {
    let e = estadoDe(bruno);
    for (let w = 0; w < 4; w++) {
      e = treinar(e, w * 7, 'superior-a');
      e = treinar(e, w * 7 + 2, 'inferior-a');
      if (w === 3) {
        e = treinar(e, w * 7 + 3, 'superior-b');
        e = treinar(e, w * 7 + 4, 'inferior-b');
      }
    }
    const antes = JSON.stringify(e);
    const r = semana(e, 28);
    expect(r.revisao).toMatchObject({ opcoes: [2, 3], regraId: 'acompanhamento.mensagens' });
    expect(r.revisao!.texto).toBe('Nas últimas 4 semanas você treinou cerca de 2 vezes por semana. Quer um programa de 2 ou 3 dias? Ele cabe melhor e rende o mesmo por treino.');
    expect(JSON.stringify(e)).toBe(antes);
    // "Manter" esconde a oferta por 4 semanas.
    expect(semana(e, 28, { revisaoRespondidaEm: dia(27) }).revisao).toBeUndefined();
    expect(semana(e, 28 + 28, { revisaoRespondidaEm: dia(27) }).revisao).toBeDefined();
    // Com 2 das 4 semanas abaixo, nada é oferecido.
    let f = estadoDe(bruno);
    for (let w = 0; w < 4; w++) for (const [k, d] of [[0, 'superior-a'], [1, 'inferior-a'], ...(w < 2 ? [[3, 'superior-b'], [4, 'inferior-b']] : [])] as [number, string][]) f = treinar(f, w * 7 + k, d);
    expect(semana(f, 28).revisao).toBeUndefined();
  });

  it('W7: 1 treino na semana → "já conta"; os músculos sem treino ficam "ainda não treinou nesta semana", sem alerta', () => {
    const e = treinar(estadoDe(bruno), 0, 'superior-a');
    const r = semana(e, 2);
    expect(r.mensagem).toBe('1 treino nesta semana. Já conta: um treino por semana mantém o que você ganhou. Se der, o Inferior A cabe até domingo.');
    expect(musculo(r, 'quadriceps').estado).toBe('sem-treino');
    expect(TEXTO_ESTADO['sem-treino']).toBe('ainda não treinou nesta semana');
    // No domingo, o próximo treino "cabe hoje".
    expect(semana(e, 6).mensagem).toMatch(/cabe hoje\.$/);
  });
});

describe('a semana em vários locais', () => {
  it('conta o treino feito em qualquer local, inclusive o exercício que entrou na troca de local (a barra fixa no lugar da puxada)', () => {
    let e = estadoDe(bruno, LOCAIS_DO_BRUNO);
    e = treinar(e, 0, 'superior-a', 'local-1');
    e = treinar(e, 1, 'superior-a', 'local-2');
    const r = semana(e, 2);
    expect(r.feitos).toBe(2);
    expect(e.historico[1]!.exercicios.some((x) => x.exId === 'barra-fixa' && x.noLugarDe === 'puxada-unilateral')).toBe(true);
    const so = (k: number) => seriesEfetivas([e.historico[k]!]).costas;
    expect(musculo(r, 'costas').feitas).toBeCloseTo(so(0)! + so(1)!, 5);
  });

  it('conta a alternativa feita no lugar do exercício (o que foi feito de verdade)', () => {
    const v = seriesEfetivas([sessao(0, [{ ...series('crucifixo-halteres', 3), noLugarDe: 'crucifixo-polia' }])]);
    expect(v.peito).toBe(3);
  });
});

describe('estados e mensagens sem culpa (acompanhamento.mensagens)', () => {
  it('os 4 estados', () => {
    expect(estadoDoMusculo(0, 12)).toBe('sem-treino');
    expect(estadoDoMusculo(1, 12)).toBe('mantendo');
    expect(estadoDoMusculo(3.5, 12)).toBe('mantendo');
    expect(estadoDoMusculo(4, 12)).toBe('crescendo');
    expect(estadoDoMusculo(12, 12)).toBe('na-meta');
    expect(estadoDoMusculo(2, 2)).toBe('na-meta');
  });

  it('a mensagem de volta: 14–20 dias, 21–56, 57–182 e mais de 182, sem culpa', () => {
    let e = estadoDe(bruno);
    [0, 1, 3, 4].forEach((n, i) => (e = treinar(e, n, DIAS[i]!)));
    const m = (d: number) => mensagemDeVolta(hojeNoPrograma(e.programa!.programa, e.historico, dia(4 + d)));
    expect(m(13)).toBeNull();
    expect(m(16)!.texto).toBe('Faz 16 dias do último treino. No 1º treino de cada dia, 1 repetição a mais de reserva; a carga é a mesma.');
    expect(m(22)!.titulo).toBe('Bem-vindo de volta!');
    expect(m(22)!.texto).toBe('Faz 22 dias do último treino. Estas 2 semanas vão mais leves, para o corpo se readaptar sem dor. O músculo não some em 3 semanas. A carga começa 10% abaixo da última vez e já vem preenchida.');
    expect(m(70)!.texto).toMatch(/^Faz 10 semanas do último treino\. .*15% abaixo/);
    expect(m(200)!.refazerNivel).toBe(true);
    expect(m(200)!.texto).toMatch(/^Faz 6 meses do último treino\. .*Quer refazer o nível\? Leva 1 minuto\.$/);
    for (const d of [14, 16, 20, 21, 22, 30, 56, 57, 70, 182, 183, 200, 400, 900]) expect(m(d)!.texto).not.toMatch(SEM_CULPA);
    expect(tempoDaPausa(800)).toBe('2 anos');
  });

  it('nenhuma mensagem da semana tem culpa, em qualquer quantidade de treinos', () => {
    for (let k = 0; k <= 4; k++) {
      let e = estadoDe(bruno);
      for (let i = 0; i < k; i++) e = treinar(e, i, DIAS[i]!);
      for (const n of [k, 6]) {
        const r = semana(e, n);
        expect(r.mensagem).not.toMatch(SEM_CULPA);
        r.musculos.forEach((x) => expect(TEXTO_ESTADO[x.estado]).not.toMatch(SEM_CULPA));
      }
    }
  });
});
