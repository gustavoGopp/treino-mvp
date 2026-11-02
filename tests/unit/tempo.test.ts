import { describe, expect, it } from 'vitest';
import { calibracaoDoTempo } from '../../src/domain/acompanhamento/tempo';
import { gerarPrograma, minutos } from '../../src/domain/gerador';
import { perfilDe, type Estado } from '../../src/storage/esquema';
import { aceitarMargemTempo, recusarMargemTempo, tempoDoEstado } from '../../src/features/acompanhamento/acoes';
import { gerarDoEstado } from '../../src/features/app/estado';
import { bruno } from '../personas';
import { estadoDe, treinar } from './apoio-treino';

// Calibração do tempo (tempo.calibracao; pesquisa-v2/05, seção 5): depois de 3 treinos, o tempo real ajusta a margem.

/** O último treino passa a durar `fator` × o estimado sem a margem. */
function comDuracao(e: Estado, fator: number): Estado {
  const s = e.historico.at(-1)!;
  const dia = e.programa!.programa.dias.find((d) => d.id === s.diaId)!;
  const fim = new Date(Date.parse(s.inicio) + Math.round(minutos(dia.exercicios, 0) * fator) * 60_000).toISOString();
  return { ...e, historico: [...e.historico.slice(0, -1), { ...s, fim }] };
}
const DIAS = ['superior-a', 'inferior-a', 'superior-b', 'inferior-b'];
function treinos(fatores: number[], e = estadoDe(bruno)): Estado {
  fatores.forEach((f, i) => (e = comDuracao(treinar(e, i * 2, DIAS[i % 4]!), f)));
  return e;
}

describe('tempo.calibracao', () => {
  it('com menos de 3 treinos, nada é proposto', () => {
    const e = treinos([1.4, 1.4]);
    expect(calibracaoDoTempo(e.programa!.programa, e.historico)).toBeNull();
  });

  it('depois de 3 treinos mais longos que o previsto, propõe a margem pessoal (a mediana do real ÷ estimado)', () => {
    const e = treinos([1.3, 1.35, 1.3]);
    const c = calibracaoDoTempo(e.programa!.programa, e.historico)!;
    expect(c.sessoes).toBe(3);
    expect(c.margem).toBeCloseTo(0.3, 1);
    expect(c.diferenca).toBeGreaterThanOrEqual(5);
    expect(c.texto).toMatch(/^Seus treinos levam cerca de \d+ min a mais que o previsto \(nos últimos 3\)\. Ajustar a estimativa do tempo\?$/);
    expect(c.regraId).toBe('tempo.calibracao');
  });

  it('diferença pequena (menos de 5 min) ou já ajustada: nada é proposto', () => {
    const e = treinos([1.12, 1.1, 1.08]);
    expect(calibracaoDoTempo(e.programa!.programa, e.historico)).toBeNull();
    const f = treinos([1.3, 1.3, 1.3]);
    expect(calibracaoDoTempo(f.programa!.programa, f.historico, { margemAtual: 0.3 })).toBeNull();
  });

  it('treino com menos de 80% das séries feitas não entra na conta', () => {
    let e = estadoDe(bruno);
    for (let i = 0; i < 3; i++) e = comDuracao(treinar(e, i * 2, DIAS[i]!, 'local-1', undefined, () => 1), 0.6);
    expect(calibracaoDoTempo(e.programa!.programa, e.historico)).toBeNull();
  });

  it('nada muda sem o aceite: o programa só muda depois do "Ajustar" e da atualização; "Não" esconde até o próximo treino', () => {
    const e = treinos([1.3, 1.35, 1.3]);
    expect(perfilDe(e)!.margemTempo).toBeUndefined();
    const prop = tempoDoEstado(e)!;
    const a = aceitarMargemTempo(e, prop.margem, '2026-10-20T10:00:00.000Z');
    expect(a.programa).toBe(e.programa);
    expect(perfilDe(a)!.margemTempo).toBe(prop.margem);
    // O programa gerado com a margem pessoal é outro (com mais margem, cabe menos nos 70 min): ele só entra quando a
    // pessoa toca em "Atualizar", no aviso "Há uma versão nova do seu programa".
    const novo = gerarDoEstado(a)!;
    expect(novo).not.toEqual(e.programa!.programa);
    expect(novo.dias.every((d) => d.minutosEstimados <= 70 || novo.avisos.some((x) => x.regraId === 'tempo.corte'))).toBe(true);
    expect(tempoDoEstado(a)).toBeNull();
    const n = recusarMargemTempo(e, '2026-10-20T10:00:00.000Z');
    expect(tempoDoEstado(n)).toBeNull();
    expect(tempoDoEstado(comDuracao(treinar(n, 20, 'inferior-b'), 1.3))).not.toBeNull();
  });

  it('sem margem pessoal, o gerador sai idêntico; com a margem de 10%, também (é o padrão)', () => {
    const p = gerarPrograma(bruno.perfil, bruno.inventario);
    const q = gerarPrograma({ ...bruno.perfil, margemTempo: 0.1 }, bruno.inventario);
    const sem = (r: typeof p) => (r.status === 'ok' ? { ...r.programa, entradasHash: '' } : null);
    expect(sem(q)).toEqual(sem(p));
  });
});
