import { describe, expect, it } from 'vitest';
import { prescricaoDaSemana } from '../../src/domain/gerador';
import { sugestaoDoExercicio, textoCarga, ultimaSerie, type Sessao } from '../../src/domain/sessao';
import type { Estado } from '../../src/storage/esquema';
import { diaDoTreino, hojeDoEstado, inventarioDoTreino, opcoesDaCarga } from '../../src/features/treino/acoes';
import { ana, bruno, carla, diego, LOCAIS_DO_BRUNO, type Persona } from '../personas';
import { dia, estadoDe, treinar } from './apoio-treino';

// Snapshots do R2 (revistos pelo Gustavo): o treino de cada persona na volta de 30 dias sem treinar, antes e depois do
// R2. "Antes" refaz a conta antiga: a semana do calendário desde a 1ª sessão e a carga da última vez, sem pausa.
// Os programas salvos não mudam (os snapshots do gerador continuam iguais).

const faixa = ([a, b]: [number, number]) => (a === b ? `${a}` : `${a}–${b}`);

function cenario(p: Persona, locais?: Estado['locais'], localDe: (n: number) => string = () => 'local-1', voltaEm = 'local-1') {
  let e = estadoDe(p, locais);
  const dias = e.programa!.programa.dias.map((d) => d.id);
  // 2 semanas com todos os dias do programa, em dias seguidos a partir da segunda-feira.
  const quando = [0, 7].flatMap((w) => dias.map((_, i) => w + i));
  quando.forEach((n, i) => (e = treinar(e, n, dias[i % dias.length]!, localDe(n))));
  const fim = quando.at(-1)!;
  const hoje = fim + 30;
  return { e, hoje, voltaEm };
}

function treinoDeHoje(e: Estado, hoje: number, localId: string) {
  const programa = e.programa!.programa;
  const h = hojeDoEstado(e, dia(hoje))!;
  // Antes do R2: semana do calendário desde a 1ª sessão; a fase só vinha do cadastro; a carga, a da última vez.
  const semanaAntiga = Math.floor((Date.parse(dia(hoje)) - Date.parse(e.historico[0]!.inicio)) / 86_400_000 / 7) + 1;
  const antigos = prescricaoDaSemana(programa, semanaAntiga);
  return programa.dias.map((d) => {
    const s = { id: dia(hoje), inicio: dia(hoje), diaId: d.id, localId };
    const agora = diaDoTreino(e, s)!.dia;
    const antes = antigos.find((x) => x.id === d.id)!;
    const op = opcoesDaCarga(e, s);
    const total = (xs: { series: number }[]) => xs.reduce((t, x) => t + x.series, 0);
    const cargas = agora.exercicios.map((x) => {
      const ult = ultimaSerie(e.historico, x.exId, op.local);
      const sug = sugestaoDoExercicio(e.historico, x, inventarioDoTreino(e, s), op);
      const depois = sug.acao === 'calibrar' && !sug.proxima ? 'calibra na 1ª série' : textoCarga(sug.proxima ?? ult!.carga, x.exId);
      return `${x.nome}: ${ult ? textoCarga(ult.carga, x.exId) : '—'} → ${depois}`;
    });
    return {
      dia: d.nome,
      antes: `semana ${semanaAntiga}: ${total(antes.exercicios)} séries, RIR ${[...new Set(antes.exercicios.map((x) => faixa(x.rir)))].join(' e ')}, a mesma carga`,
      depois: `semana ${h.semana} (${h.fase?.regraId ?? 'programa completo'}): ${total(agora.exercicios)} séries, RIR ${[...new Set(agora.exercicios.map((x) => faixa(x.rir)))].join(' e ')}`,
      cargas,
    };
  });
}

describe('snapshots do R2: o treino de cada persona na volta de 30 dias', () => {
  it.each([
    ['Ana', () => cenario(ana)],
    ['Carla', () => cenario(carla)],
    ['Diego', () => cenario(diego)],
    ['Bruno, de volta na academia do bairro', () => cenario(bruno, LOCAIS_DO_BRUNO, (n) => (n === 8 ? 'local-2' : 'local-1'), 'local-2')],
  ] as const)('%s', (_nome, montar) => {
    const { e, hoje, voltaEm } = montar();
    const h = hojeDoEstado(e, dia(hoje))!;
    expect(h.bloco).toMatchObject({ pausaDias: 30, reducao: 0.1 });
    expect(treinoDeHoje(e, hoje, voltaEm)).toMatchSnapshot();
  });

  it('nenhum histórico é apagado: a volta só lê o que já existe', () => {
    const { e } = cenario(bruno, LOCAIS_DO_BRUNO, (n) => (n === 8 ? 'local-2' : 'local-1'));
    const antes = JSON.stringify(e.historico as Sessao[]);
    treinoDeHoje(e, 41, 'local-2');
    expect(JSON.stringify(e.historico)).toBe(antes);
  });
});
