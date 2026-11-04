import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { escadaDe, nomeDoDegrau } from '../../src/domain/progressao/escadas';
import { type Nivel } from '../../src/domain/regras';
import { opcoesCarga, textoCarga } from '../../src/domain/sessao';
import { capacidades, cargasCaneleiras, type Inventario } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';

// Decisões da sessão de catálogo (docs/pesquisa-v2/11-catalogo-completo.md; Gustavo, 04/11/2026).
const perfil = (nivel: Nivel): Perfil => ({
  nivel,
  semanasParado: 0,
  diasSemana: 3,
  divisao: 'ct-abc',
  minutosSessao: 45,
  prioridades: [],
  evitarExercicios: [],
  evitarEquipamentos: [],
  triagem: { respostas: respostasNenhuma() },
});
const gerar = (pf: Perfil, inv: Inventario) => {
  const r = gerarPrograma(pf, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};

describe('correções do doc 11', () => {
  it('tecnica.parcial-alongada: só o avançado recebe o texto da parcial alongada', () => {
    const tem = (n: Nivel) => gerar(perfil(n), {}).porque.some((q) => q.regraId === 'tecnica.parcial-alongada');
    expect(tem('avancado')).toBe(true);
    expect(tem('intermediario')).toBe(false);
    expect(tem('iniciante')).toBe(false);
  });
  it('complexidades revistas (B.2.2) e a lombar na elevação de joelhos', () => {
    expect(POR_ID['remada-invertida']!.complexidade).toBe(1);
    expect(POR_ID['crucifixo-halteres']!.complexidade).toBe(2);
    expect(POR_ID['agachamento-smith']!.complexidade).toBe(1);
    expect(POR_ID['elevacao-joelhos']!.articulacoes).toContain('lombar');
  });
});

describe('itens e exercícios do catálogo (Gustavo, 04/11/2026; doc 11, B.2.3 a B.3.2)', () => {
  const exercicios = (p: Programa) => p.dias.flatMap((d) => d.exercicios);
  /** O exercício aparece no programa, como vaga ou como alternativa. */
  const aparece = (p: Programa, id: string) => exercicios(p).some((x) => x.exId === id || x.alternativas.includes(id));
  const comDorLombar = (pf: Perfil, nota: number): Perfil => ({
    ...pf,
    triagem: { respostas: { ...respostasNenhuma(), osteoarticular: true }, dores: [{ articulacao: 'lombar', nota }] },
  });

  it('equipamento.caneleira: só caneleiras, a vaga da extensora deixa de ficar vazia, depois da cadeira extensora', () => {
    const p = gerar(perfil('intermediario'), { caneleiras: { pesosKg: [3, 1, 2, 1] } });
    const x = exercicios(p).find((y) => y.funcao === 'extensora');
    expect(x?.exId).toBe('extensao-joelho-caneleira');
    // O porquê cita o lado curto (o peso pesa mais com o joelho esticado).
    expect(x!.porque.find((q) => q.regraId === 'equipamento.caneleira')?.texto).toMatch(/joelho esticado/);
    expect(FUNCAO['extensora']!.niveis).toEqual([['cadeira-extensora'], ['extensao-joelho-caneleira']]);
    expect(FUNCAO['aducao']!.niveis).toEqual([['aducao-maquina'], ['aducao-caneleira']]);
    // A carga sobe pela lista dos pesos de caneleira, como o kettlebell.
    expect(cargasCaneleiras({ caneleiras: { pesosKg: [3, 1, 2, 1] } })).toEqual([1, 2, 3]);
    expect(opcoesCarga('extensao-joelho-caneleira', { caneleiras: { pesosKg: [3, 1, 2] } })).toMatchObject({ registro: 'kg', lista: [1, 2, 3] });
  });

  it('equipamento.mini-band: só mini-band, a abdução entra com ela, e a escada usa as intensidades da mini-band', () => {
    const inv: Inventario = { mini_band: { intensidades: 3 } };
    const p = gerar({ ...perfil('intermediario'), minutosSessao: 60, prioridades: ['gluteos'] }, inv);
    expect(exercicios(p).find((x) => x.funcao === 'abducao')?.exId).toBe('abducao-mini-band');
    const escada = escadaDe('abducao-mini-band', inv);
    expect(escada).toHaveLength(9);
    expect(escada[3]).toBe('intensidade 2');
    expect(escada[8]).toBe('intensidade 3, pausa de 2 s com a faixa esticada, com descida de 3 s');
    // Item próprio: as intensidades dos elásticos longos não contam, e a mini-band não abre os exercícios deles.
    expect(escadaDe('abducao-mini-band', { elasticos: { intensidades: 5 }, mini_band: { intensidades: 2 } })).toHaveLength(6);
    expect(escadaDe('remada-elastico', { elasticos: { intensidades: 1 }, mini_band: { intensidades: 4 } })).toHaveLength(3);
    expect(opcoesCarga('abducao-mini-band', inv).degraus).toEqual(escada);
    expect(nomeDoDegrau('abducao-mini-band', 3)).toBe('intensidade 2');
    expect(textoCarga({ tipo: 'degrau', degrau: 0 }, 'abducao-mini-band')).toBe('faixa curta');
    expect(textoCarga({ tipo: 'degrau', degrau: 3 }, 'abducao-mini-band')).toBe('faixa curta · intensidade 2');
    expect(capacidades(inv).has('elastico')).toBe(false);
  });

  it('só polia dupla: puxar horizontal, ombro posterior e tríceps acima da cabeça têm opção (B.2.4)', () => {
    const p = gerar(perfil('intermediario'), { estacao_polia_dupla: {} });
    const porFuncao = new Map(exercicios(p).map((x) => [x.funcao, x.exId]));
    expect(porFuncao.get('puxar-horizontal')).toBe('remada-unilateral-polia');
    expect(porFuncao.get('ombro-posterior')).toBe('crucifixo-invertido-polia');
    expect(porFuncao.get('triceps-acima-cabeca')).toBe('triceps-frances-polia-unilateral');
  });

  it('equipamento.roda-abdominal: o iniciante não recebe a roda; fora dele, ela é alternativa no abdômen; com dor lombar acima de 5, sai', () => {
    const inv: Inventario = { roda_abdominal: {} };
    expect(aparece(gerar(perfil('iniciante'), inv), 'roda-abdominal')).toBe(false);
    const p = gerar(perfil('intermediario'), inv);
    expect(aparece(p, 'roda-abdominal')).toBe(true);
    // Alternativa, sem tirar o abdominal no chão.
    expect(exercicios(p).some((x) => x.exId === 'abdominal-chao')).toBe(true);
    expect(exercicios(p).find((x) => x.exId === 'roda-abdominal')?.porque.some((q) => q.regraId === 'equipamento.roda-abdominal')).toBe(true);
    expect(aparece(gerar(comDorLombar(perfil('intermediario'), 7), inv), 'roda-abdominal')).toBe(false);
  });

  it('a flexão de joelho na suspensão fica no nível 4 e não tira a deslizante nem o nórdico do intermediário (B.2.4)', () => {
    const nivelDe = (id: string) => FUNCAO['flexao-joelho']!.niveis.findIndex((n) => n.includes(id));
    expect(nivelDe('flexao-joelho-suspensao')).toBe(nivelDe('flexao-joelho-deslizante'));
    expect(nivelDe('flexao-joelho-suspensao')).toBe(nivelDe('nordico'));
    const p = gerar(perfil('intermediario'), { suspensao: {} });
    const vagas = exercicios(p).filter((x) => x.funcao === 'flexao-joelho');
    expect(vagas.length).toBeGreaterThan(0);
    for (const x of vagas) expect([x.exId, ...x.alternativas]).toEqual(expect.arrayContaining(['flexao-joelho-deslizante', 'nordico', 'flexao-joelho-suspensao']));
  });
});
