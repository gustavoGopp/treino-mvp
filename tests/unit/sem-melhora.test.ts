import { describe, expect, it } from 'vitest';
import { gerarPrograma, hashDasEntradas } from '../../src/domain/gerador';
import { janelaDeEstagnacao, sugerirProgressao, sugerirSemanaLeve, type Carga, type SessaoExercicio } from '../../src/domain/progressao';
import { PROGRESSAO, type Nivel } from '../../src/domain/regras';
import { semanaLeveDeHoje } from '../../src/domain/acompanhamento/semana-leve';
import { hojeNoPrograma, opcoesDeHoje, sugestaoDoExercicio } from '../../src/domain/sessao';
import { PERSONAS } from '../personas';
import { PERSONAS_NOVAS } from '../personas/todos';
import { dia, estadoDe, serieTipica, treinar } from './apoio-treino';

// Sessão "treino para todos", etapa 2, pacote 5 (16/11/2026): o aviso de "sem melhora" (progressao.estagnacao).
// A janela cresce com o nível: 4 sessões para o iniciante, 8 para o intermediário, 16 para o avançado; o programa
// guarda o nível para o qual foi montado, e o programa antigo, sem nível, continua com 3. Só personas fictícias.

const kg = (k: number): Carga => ({ tipo: 'kg', kg: k });
const sessao = (c: Carga, reps: number[]): SessaoExercicio => ({ series: reps.map((r) => ({ carga: c, reps: r, rir: 1 })) });
const alvo = { reps: [8, 12] as [number, number], rir: [1, 2] as [number, number] };
const halter = { tipo: 'halter' as const, lista: [8, 9, 10, 12, 14, 16, 18] };
/** `n` sessões paradas: a mesma carga e as mesmas repetições. */
const paradas = (n: number) => Array.from({ length: n }, () => sessao(kg(12), [10, 9, 9]));
const TODAS = Object.values({ ...PERSONAS, ...PERSONAS_NOVAS });

describe('progressao.estagnacao: a janela do aviso de "sem melhora" cresce com o nível (pacote 5)', () => {
  it('a janela é de 4, 8 e 16 sessões; sem nível (programa guardado antes), 3', () => {
    expect(PROGRESSAO.janelaEstagnacao).toEqual({ iniciante: 4, intermediario: 8, avancado: 16 });
    expect((['iniciante', 'intermediario', 'avancado'] as Nivel[]).map((n) => janelaDeEstagnacao(n))).toEqual([4, 8, 16]);
    expect(janelaDeEstagnacao(undefined)).toBe(3);
  });

  it.each([
    [4, 'Quatro'],
    [8, 'Oito'],
    [16, 'Dezesseis'],
  ])('com a janela de %i: uma sessão a menos ainda é "manter"; na %i-ésima parada, o aviso', (janela, extenso) => {
    expect(sugerirProgressao(paradas(janela - 1), alvo, halter, janela)).toMatchObject({ acao: 'manter', regraId: 'progressao.manter' });
    const s = sugerirProgressao(paradas(janela), alvo, halter, janela);
    expect(s.acao).toBe('estagnado');
    expect(s.regraId).toBe('progressao.estagnacao');
    expect(s.motivo).toMatch(new RegExp(`^${extenso} sessões sem melhora: `));
  });

  it('sem a janela (como no programa antigo), continuam valendo 3 sessões, com o texto de antes', () => {
    expect(sugerirProgressao(paradas(2), alvo, halter).acao).toBe('manter');
    expect(sugerirProgressao(paradas(3), alvo, halter).motivo).toMatch(/^Três sessões sem melhora: /);
  });

  it('uma repetição a mais em qualquer sessão da janela já não é "sem melhora"', () => {
    const h = paradas(8);
    h[5] = sessao(kg(12), [10, 10, 9]);
    expect(sugerirProgressao(h, alvo, halter, 8).acao).toBe('manter');
    // (a melhora tem de ser sobre a 1ª sessão da janela: uma sessão pior no meio não conta como melhora)
    const pior = paradas(8);
    pior[5] = sessao(kg(12), [9, 9, 9]);
    expect(sugerirProgressao(pior, alvo, halter, 8).acao).toBe('estagnado');
  });

  it('a troca de carga dentro da janela zera a contagem', () => {
    const h = [...Array.from({ length: 4 }, () => sessao(kg(10), [10, 9, 9])), ...paradas(4)];
    expect(sugerirProgressao(h, alvo, halter, 8).acao).toBe('manter');
    expect(sugerirProgressao(h, alvo, halter, 4).acao).toBe('estagnado');
  });

  it('o exercício com 3 séries num dia e 2 no outro: as sessões são comparadas pelas séries em comum, e o aviso não pisca', () => {
    // as mesmas repetições por série, sempre; só o número de séries alterna (3, 2, 3, 2…)
    const alternadas = (n: number, comeca3: boolean) => Array.from({ length: n }, (_, i) => sessao(kg(12), (i % 2 === 0) === comeca3 ? [10, 9, 9] : [10, 9]));
    expect(sugerirProgressao(alternadas(8, true), alvo, halter, 8).acao).toBe('estagnado');
    expect(sugerirProgressao(alternadas(8, false), alvo, halter, 8).acao).toBe('estagnado'); // a janela começa no dia de 2 séries
    // uma repetição a mais numa das séries em comum continua contando como ganho
    const comGanho = alternadas(8, false);
    comGanho[5] = sessao(kg(12), [10, 10]);
    expect(sugerirProgressao(comGanho, alvo, halter, 8).acao).toBe('manter');
    // e o ganho só na 3ª série, que nem todas as sessões têm, não conta (a comparação é pelas duas em comum)
    const soNaTerceira = alternadas(8, true);
    soNaTerceira[2] = sessao(kg(12), [10, 9, 10]);
    expect(sugerirProgressao(soNaTerceira, alvo, halter, 8).acao).toBe('estagnado');
  });

  it('o motivo da semana leve diz a janela do nível', () => {
    const sinais = { exerciciosEstagnados: 2, pesadoNosUltimos3: 0, dorQueSeRepete: 0 };
    expect(sugerirSemanaLeve({ ...sinais, janela: 8 }).motivos).toEqual(['2 exercícios sem progresso em 8 treinos']);
    expect(sugerirSemanaLeve(sinais).motivos).toEqual(['2 exercícios sem progresso em 3 treinos']);
  });
});

describe('o programa guarda o nível para o qual foi montado (pacote 5)', () => {
  it('nas doze personas, o programa diz o nível do cadastro, e a prescrição de hoje leva o nível até a sugestão', () => {
    for (const p of TODAS) {
      const r = gerarPrograma(p.perfil, p.inventario);
      if (r.status !== 'ok') throw new Error(`${p.nome}: sem programa`);
      expect(r.programa.nivel, p.nome).toBe(p.perfil.nivel);
      const hoje = hojeNoPrograma(r.programa, [], dia(0));
      expect(hoje.nivel, p.nome).toBe(p.perfil.nivel);
      expect(opcoesDeHoje(hoje).nivel, p.nome).toBe(p.perfil.nivel);
      // o programa antigo, sem nível: a prescrição de hoje não inventa um
      const { nivel: _n, ...antigo } = r.programa;
      void _n;
      expect(hojeNoPrograma(antigo, [], dia(0)).nivel).toBeUndefined();
      expect(opcoesDeHoje(hojeNoPrograma(antigo, [], dia(0))).nivel).toBeUndefined();
    }
  });

  it('o hash das entradas é o mesmo que o programa guarda (a migração 8 → 9 usa essa conta)', () => {
    for (const p of TODAS) {
      const r = gerarPrograma(p.perfil, p.inventario);
      if (r.status !== 'ok') continue;
      expect(r.programa.entradasHash, p.nome).toBe(hashDasEntradas(p.perfil, p.inventario));
    }
  });

  it('o Bruno (intermediário), com tudo parado: nada de "sem melhora" na 7ª semana; na 8ª, o aviso; com o programa antigo, já na 3ª', () => {
    let e = estadoDe(PERSONAS.bruno);
    const programa = e.programa!.programa;
    expect(programa.nivel).toBe('intermediario');
    const x = programa.dias[0]!.exercicios[0]!;
    const sug = (ate: number, prog = programa) =>
      sugestaoDoExercicio(e.historico, x, PERSONAS.bruno.inventario, { local: { localId: 'local-1' }, ...opcoesDeHoje(hojeNoPrograma(prog, e.historico, dia(ate * 7))) });
    const { nivel: _n, ...antigo } = programa;
    void _n;
    for (let w = 0; w < 8; w++) {
      // (uma repetição abaixo do topo da faixa, para a sugestão não ser a de subir a carga)
      e = treinar(e, w * 7, programa.dias[0]!.id, 'local-1', (id) => ({ ...serieTipica(id), reps: x.reps[1] - 1 }));
      if (w === 2) expect(sug(3, antigo).acao).toBe('estagnado'); // o programa sem nível: 3 sessões, como antes
      if (w === 6) expect(sug(7).acao).not.toBe('estagnado');
    }
    const naOitava = sug(8);
    expect(naOitava.acao).toBe('estagnado');
    expect(naOitava.motivo).toMatch(/^Oito sessões sem melhora: /);
  });
});

// Pacote D3 (23/11/2026): uma vez parado, o aviso vinha em todo treino (17 de 48 sessões no simulador). Agora ele sai na
// sessão em que a janela enche e só volta depois de outra janela inteira parada.
describe('progressao.estagnacao: o aviso não se repete a cada treino (pacote D3)', () => {
  /** Em quais sessões (contadas de 1) o aviso sai, treinando `n` vezes parado. */
  const avisos = (h: SessaoExercicio[], janela: number) => h.map((_, i) => sugerirProgressao(h.slice(0, i + 1), alvo, halter, janela)).flatMap((x, i) => (x.acao === 'estagnado' ? [i + 1] : []));

  it.each([
    [3, [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]],
    [4, [4, 8, 12, 16, 20, 24, 28, 32, 36]],
    [8, [8, 16, 24, 32]],
    [16, [16, 32]],
  ])('com a janela de %i e 36 sessões paradas, o aviso sai só nas sessões %j', (janela, esperado) => {
    expect(avisos(paradas(36), janela)).toEqual(esperado);
  });

  it('no intervalo, a sugestão é a de sempre, com a marca de parado; antes de a janela encher, sem a marca', () => {
    expect(sugerirProgressao(paradas(7), alvo, halter, 8).parado).toBeUndefined();
    expect(sugerirProgressao(paradas(8), alvo, halter, 8)).toMatchObject({ acao: 'estagnado', parado: true });
    for (const n of [9, 12, 15]) expect(sugerirProgressao(paradas(n), alvo, halter, 8)).toEqual({ acao: 'manter', motivo: 'Mantenha a carga e busque +1 repetição.', regraId: 'progressao.manter', parado: true });
    expect(sugerirProgressao(paradas(16), alvo, halter, 8).acao).toBe('estagnado');
  });

  it('quem ganha uma repetição sai do parado; se parar de novo, o aviso só volta com outra janela cheia', () => {
    const h = [...paradas(5), ...Array.from({ length: 12 }, () => sessao(kg(12), [10, 10, 9]))];
    // parado da 4ª à 5ª; a 6ª ganha uma repetição; a janela de 4 volta a encher na 9ª (6ª a 9ª iguais)
    expect(avisos(h, 4)).toEqual([4, 9, 13, 17]);
    expect(sugerirProgressao(h.slice(0, 6), alvo, halter, 4).parado).toBeUndefined();
  });

  it('a troca de carga zera tudo: o aviso da carga nova sai quando a janela dela enche', () => {
    const h = [...paradas(6), ...Array.from({ length: 6 }, () => sessao(kg(10), [11, 10, 10]))];
    expect(avisos(h, 4)).toEqual([4, 10]);
  });

  it('a janela que alterna entre parada e não parada não faz o aviso piscar', () => {
    // 10, 9, 10, 9…: a janela que começa no 10 está parada (sessões 4, 6, 8…), a que começa no 9 não (5, 7, 9…);
    // sem a espera de uma janela, o aviso sairia em 4, 6, 8, 10, 12, 14 e 16
    const h = Array.from({ length: 16 }, (_, i) => sessao(kg(12), [i % 2 === 0 ? 10 : 9, 9, 9]));
    expect(avisos(h, 4)).toEqual([4, 8, 12, 16]);
  });

  it('a semana leve continua contando o exercício parado no intervalo entre dois avisos (o Bruno, na 10ª semana)', () => {
    let e = estadoDe(PERSONAS.bruno);
    const programa = e.programa!.programa;
    const d = programa.dias[0]!;
    const sug = (ate: number, i: number) => sugestaoDoExercicio(e.historico, d.exercicios[i]!, PERSONAS.bruno.inventario, { local: { localId: 'local-1' }, ...opcoesDeHoje(hojeNoPrograma(programa, e.historico, dia(ate * 7))) });
    const leve = (ate: number) => semanaLeveDeHoje(programa, e.historico, dia(ate * 7), { inventario: () => PERSONAS.bruno.inventario, localDe: () => 'local-1' });
    const acoes: string[] = [];
    for (let w = 0; w < 10; w++) {
      e = treinar(e, w * 7, d.id, 'local-1', (id) => ({ ...serieTipica(id), reps: (d.exercicios.find((x) => x.exId === id)?.reps[1] ?? 12) - 1 }));
      acoes.push(sug(w + 1, 0).acao);
    }
    // o aviso saiu uma vez, na 8ª sessão; na 9ª e na 10ª, "manter", ainda parado
    expect(acoes.map((a, i) => (a === 'estagnado' ? i + 1 : 0)).filter(Boolean)).toEqual([8]);
    expect(sug(10, 0)).toMatchObject({ acao: 'manter', parado: true });
    const s = leve(10);
    expect(s.motivos.some((m) => / exercícios sem progresso em 8 treinos$/.test(m))).toBe(true);
  });
});
