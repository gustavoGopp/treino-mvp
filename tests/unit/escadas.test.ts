import { describe, expect, it } from 'vitest';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { sugerirProgressao, type Carga, type SessaoExercicio } from '../../src/domain/progressao';
import { ESCADAS, escadaDe, nomeDoDegrau } from '../../src/domain/progressao/escadas';
import { opcoesCarga, textoCarga } from '../../src/domain/sessao';

// Escada por exercício (progressao.escada-por-exercicio), elástico pelas intensidades (progressao.escada-elastico),
// critério do degrau (progressao.criterio-degrau) e fim da escada (equipamento.fim-da-escada). Sessão de equipamento
// mínimo, 03/11/2026: na auditoria, com a escada genérica e faixas largas, a flexão ficava 16 semanas sem subir.
const d = (n: number): Carga => ({ tipo: 'degrau', degrau: n });
const sessao = (c: Carga, reps: number[], rir = 1): SessaoExercicio => ({ series: reps.map((r) => ({ carga: c, reps: r, rir })) });

describe('escada por exercício', () => {
  it('a flexão segue a escada aprovada (equipamento.flexao-por-supino): descida lenta, pés elevados, déficit', () => {
    expect(escadaDe('flexao')).toEqual(['mais repetições', 'descida de 3 s', 'pés elevados (declinada; sem degrau, cama ou sofá: descida de 4 s)', 'pés elevados com descida de 3 s (sem apoio: descida de 5 s)', 'mãos em dois apoios (déficit) ou pausa de 2 s embaixo']);
    expect(opcoesCarga('flexao', {}).degraus).toEqual(escadaDe('flexao'));
    expect(textoCarga(d(2), 'flexao')).toBe('peso do corpo · pés elevados (declinada; sem degrau, cama ou sofá: descida de 4 s)');
  });
  it('nenhuma escada pede carga externa nem um elástico que a pessoa não tem (o app não sugere compra)', () => {
    for (const [id, degraus] of Object.entries(ESCADAS))
      for (const t of degraus) expect(t, id).not.toMatch(/carga externa|mais forte|mochila|halter|compr/i);
    for (const e of BIBLIOTECA.filter((x) => x.carga === 'peso-corpo' || x.carga === 'elastico'))
      for (const t of escadaDe(e.id, { elasticos: { intensidades: 1 } })) expect(t, e.id).not.toMatch(/carga externa|mais forte|intensidade 2/i);
  });
  it('elástico: sobe pelas intensidades informadas, 3 degraus em cada', () => {
    expect(escadaDe('remada-elastico', { elasticos: { intensidades: 1 } })).toEqual(['mais repetições', 'mais esticado (um passo mais longe)', 'mais esticado, com descida de 3 s']);
    const tres = escadaDe('remada-elastico', { elasticos: { intensidades: 3 } });
    expect(tres).toHaveLength(9);
    expect(tres[3]).toBe('intensidade 2');
    expect(tres[8]).toBe('intensidade 3, mais esticado, com descida de 3 s');
    expect(nomeDoDegrau('remada-elastico', 3)).toBe('intensidade 2');
    expect(textoCarga(d(3), 'remada-elastico')).toBe('elástico · intensidade 2');
  });
  it('sem escada própria, a genérica', () => {
    expect(escadaDe('hiperextensao')).toHaveLength(4);
    expect(escadaDe(undefined)[0]).toBe('mais repetições');
  });
});

describe('critério do degrau e fim da escada', () => {
  const alvo = { reps: [8, 15] as [number, number], rir: [1, 2] as [number, number] };
  const o = opcoesCarga('flexao', {});
  it('sobe com a 1ª série no topo e as outras a até 2 repetições dele, em 2 sessões (progressao.criterio-degrau)', () => {
    const h = [sessao(d(0), [15, 14, 13]), sessao(d(0), [15, 14, 13])];
    expect(sugerirProgressao(h, alvo, o)).toMatchObject({ acao: 'subir', proxima: d(1) });
  });
  it('a 3ª série 3 abaixo do topo ainda não sobe', () => {
    const h = [sessao(d(0), [15, 13, 12]), sessao(d(0), [15, 13, 12])];
    expect(sugerirProgressao(h, alvo, o).acao).not.toBe('subir');
  });
  it('no kg, continua pedindo todas as séries no topo', () => {
    const kg = (k: number): Carga => ({ tipo: 'kg', kg: k });
    const h = [sessao(kg(10), [15, 14, 13]), sessao(kg(10), [15, 14, 13])];
    expect(sugerirProgressao(h, alvo, { tipo: 'halter', lista: [10, 12] }).acao).toBe('manter');
  });
  it('no último degrau, o aviso é sutil, na própria sugestão, e não sugere compra (equipamento.fim-da-escada)', () => {
    const ultimo = d(escadaDe('flexao').length - 1);
    const s = sugerirProgressao([sessao(ultimo, [15, 14, 13]), sessao(ultimo, [15, 14, 13])], alvo, o);
    expect(s).toMatchObject({ acao: 'manter', regraId: 'equipamento.fim-da-escada' });
    expect(s.motivo).not.toMatch(/compr|halter|elástico/i);
  });
});

describe('degraus que pedem um móvel (decisão do Gustavo em 04/11/2026)', () => {
  it('todo degrau com cadeira, sofá, cama, degrau ou apoio traz a alternativa para quem não tem', () => {
    for (const [id, degraus] of Object.entries(ESCADAS))
      for (const t of degraus) if (/cadeira|sofá|cama|degrau|apoio|elevados/.test(t)) expect(t, id).toMatch(/\(sem |; sem | ou /);
  });
});
