import { describe, expect, it } from 'vitest';
import { gerarPrograma, hashDasEntradas } from '../../src/domain/gerador';
import { janelaDeEstagnacao, sugerirProgressao, sugerirSemanaLeve, type Carga, type SessaoExercicio } from '../../src/domain/progressao';
import { PROGRESSAO, type Nivel } from '../../src/domain/regras';
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
