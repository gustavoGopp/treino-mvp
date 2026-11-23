import { describe, expect, it } from 'vitest';
import { cortarTempo, gerarPrograma, nadaParaPuxar, prescricaoDaSemana, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { inventarioDe } from '../../scripts/auditoria/ver-lib';
import { hojeNoPrograma, type Sessao } from '../../src/domain/sessao';
import { opcoesDeDivisao } from '../../src/domain/gerador/divisoes';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';
import { ana, bruno } from '../personas';
import { dia, programaDe, serieTipica } from './apoio-treino';

// Os itens que a conferência regra por regra (pacote D1, 22/11/2026) deixou para o pacote D3, feitos em 23/11/2026
// (`docs/revisoes/melhorias/d3-conferencia/README.md`). Cada bloco prende o exemplo que o conferente rodou.

type Dor = { articulacao: 'ombro' | 'joelho' | 'cotovelo' | 'lombar' | 'quadril' | 'punho' | 'tornozelo'; nota: number };
const perfil = (o: { nivel: Perfil['nivel']; dias: Perfil['diasSemana']; min: number; focos?: Grupo[]; dores?: Dor[]; parado?: number; divisao?: Perfil['divisao'] }): Perfil => ({
  nivel: o.nivel,
  semanasParado: o.parado ?? 0,
  diasSemana: o.dias,
  ...(o.divisao ? { divisao: o.divisao } : {}),
  minutosSessao: o.min,
  prioridades: o.focos ?? [],
  evitarExercicios: [],
  evitarEquipamentos: [],
  triagem: { respostas: { ...respostasNenhuma(), osteoarticular: !!o.dores?.length }, ...(o.dores?.length ? { dores: o.dores } : {}) },
});
const ok = (p: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(p, inv);
  if (r.status !== 'ok') throw new Error(`sem programa: ${r.status}`);
  return r.programa;
};

describe('selecao.peitoral-inclinado: o 2º empurrar olha a vaga que coube no dia, e não a do modelo', () => {
  // Halteres de 1 a 12 kg e banco reto (sem banco inclinável). Com 30 min, a vaga de empurrar horizontal do dia de
  // Empurrar é complemento e não cabe; antes, ela ainda "existia" e o dia saía com crucifixo, elevação e tríceps.
  it.each([5, 6] as const)('com %i dias de 30 min, todo dia de Empurrar tem um supino ou uma flexão', (dias) => {
    for (const nivel of ['iniciante', 'intermediario', 'avancado'] as const) {
      const p = ok(perfil({ nivel, dias, min: 30 }), ana.inventario);
      const empurrar = p.dias.filter((d) => d.nome.startsWith('Empurrar'));
      expect(empurrar.length).toBeGreaterThan(0);
      for (const d of empurrar) expect(d.exercicios.some((x) => x.tipo === 'composto' && x.padrao === 'empurrar-h')).toBe(true);
    }
  });

  it('com tempo, o dia que já tem a vaga de empurrar horizontal não ganha dois supinos retos', () => {
    const p = ok(perfil({ nivel: 'intermediario', dias: 5, min: 60 }), ana.inventario);
    for (const d of p.dias) expect(d.exercicios.filter((x) => x.exId === 'supino-reto').length).toBeLessThanOrEqual(1);
  });
});

describe('selecao.estabilidade: a polia conta como estável, como a regra lista', () => {
  // Polia dupla, halteres e banco regulável (o inventário do Bruno), iniciante de 4 dias de 60 min: antes, a vaga de
  // crucifixo ia para o crucifixo com halteres, "mais estável e apoiado" que o crucifixo na polia, que vem antes na lista.
  it('o iniciante com polia recebe o crucifixo na polia, e o porquê não diz "apoiado" de um exercício de polia', () => {
    const p = ok(perfil({ nivel: 'iniciante', dias: 4, min: 60 }), bruno.inventario);
    const cruci = p.dias.flatMap((d) => d.exercicios).filter((x) => x.funcao === 'crucifixo');
    expect(cruci.map((x) => x.exId)).toContain('crucifixo-polia');
    expect(cruci.map((x) => x.exId)).not.toContain('crucifixo-halteres');
    for (const x of p.dias.flatMap((d) => d.exercicios).filter((y) => y.exId.includes('polia')))
      for (const q of x.porque) expect(q.texto).not.toMatch(/estável e apoiado/);
  });

  it('o intermediário não muda: o desempate é só do iniciante', () => {
    const p = ok(perfil({ nivel: 'intermediario', dias: 4, min: 60 }), bruno.inventario);
    expect(p.dias.flatMap((d) => d.exercicios).some((x) => x.exId === 'crucifixo-polia')).toBe(true);
  });
});

describe('selecao.panturrilha-alongada: a panturrilha no chão nunca entra no lugar do degrau', () => {
  // Sem equipamento, foco em pernas: o degrau da escada (o calcanhar desce) vem antes do chão (o calcanhar não desce).
  // Antes, a variedade entre os dias e o dia que a dor esvaziou punham a do chão num dia sem o degrau (o iniciante de 3
  // dias de 60 min tinha o Corpo todo A só com a do chão). Ao lado do degrau, no mesmo dia, ela pode entrar: é o 2º
  // exercício do foco (tirá-la dali deixava o foco abaixo da meta com tempo sobrando, o C1 da régua, em 674 programas).
  const semDegrauNoDia = (p: Programa) => p.dias.filter((d) => d.exercicios.some((x) => x.exId === 'panturrilha-chao') && !d.exercicios.some((x) => x.exId === 'panturrilha-degrau'));
  it.each([
    ['iniciante', 3, 60, []],
    ['intermediario', 3, 60, []],
    ['intermediario', 2, 60, []],
    ['intermediario', 4, 60, [{ articulacao: 'ombro', nota: 7 }]],
  ] as const)('%s, %i dias de %i min', (nivel, dias, min, dores) => {
    const p = ok(perfil({ nivel, dias, min, focos: ['pernas'], dores: [...dores] }), {});
    expect(p.dias.flatMap((d) => d.exercicios.map((x) => x.exId))).toContain('panturrilha-degrau');
    expect(semDegrauNoDia(p).map((d) => d.nome)).toEqual([]);
  });

  it('o exemplo do iniciante: o degrau nos três dias, sem a do chão', () => {
    const p = ok(perfil({ nivel: 'iniciante', dias: 3, min: 60, focos: ['pernas'] }), {});
    for (const d of p.dias) expect(d.exercicios.map((x) => x.exId), d.nome).toContain('panturrilha-degrau');
    expect(p.dias.flatMap((d) => d.exercicios).some((x) => x.exId === 'panturrilha-chao')).toBe(false);
  });

  it('com dor forte no tornozelo o degrau sai, e o chão continua sendo a alternativa possível', () => {
    const p = ok(perfil({ nivel: 'intermediario', dias: 3, min: 60, focos: ['pernas'], dores: [{ articulacao: 'tornozelo', nota: 7 }] }), {});
    expect(p.dias.flatMap((d) => d.exercicios).some((x) => x.exId === 'panturrilha-degrau')).toBe(false);
  });
});

describe('tempo.sobra-series: a trava do iniciante vale também nos dias com vaga vazia', () => {
  // Iniciante sem foco, sem equipamento, 2 dias de 60 min (a persona Iara): os dias têm vaga sem exercício possível (as
  // costas), e o 1º passo do tempo que sobra subia os isoladores até 4 séries (a flexão de joelho deslizante com 4 nos dois
  // dias: 8 séries de posteriores com meta de 6).
  it('nenhum isolador passa da meta pela sobra: só os multiarticulares sobem, até 3 séries', () => {
    const p = ok(perfil({ nivel: 'iniciante', dias: 2, min: 60 }), {});
    const flexoes = p.dias.flatMap((d) => d.exercicios).filter((x) => x.exId === 'flexao-joelho-deslizante');
    expect(flexoes.length).toBe(2);
    expect(flexoes.reduce((t, x) => t + x.series, 0)).toBeLessThanOrEqual(p.metas.posteriores ?? 0);
    for (const x of p.dias.flatMap((d) => d.exercicios)) if (x.tipo === 'composto') expect(x.series, x.exId).toBeLessThanOrEqual(4);
    expect(p.porque.some((q) => q.regraId === 'tempo.sobra-series' && /sobem até ~8/.test(q.texto))).toBe(false);
  });
});

describe('readaptacao.gatilho: o RIR +1 da pausa de 2 semanas do cadastro vale na 1ª volta pelo programa', () => {
  // Intermediário que disse no cadastro "parei há umas 2 semanas": a 1ª sessão de cada dia leva RIR +1. Antes, todo dia
  // ainda não feito no 1º bloco levava o RIR +1, e quem mudava a rotina 10 semanas depois recebia o +1 nos dias novos.
  const tres = programaDe(perfil({ nivel: 'intermediario', dias: 3, min: 60, parado: 2 }), bruno.inventario);
  const quatro = programaDe(perfil({ nivel: 'intermediario', dias: 4, min: 60, parado: 2 }), bruno.inventario);
  const sessao = (n: number, diaId: string, p: Programa): Sessao => {
    const d = p.dias.find((x) => x.id === diaId)!;
    return { id: dia(n), diaId, semana: 1, inicio: dia(n), fim: dia(n, 11), exercicios: d.exercicios.map((x) => ({ exId: x.exId, series: [serieTipica(x.exId)] })) };
  };

  it('na 1ª volta, os dias ainda não feitos levam o +1', () => {
    expect(tres.fases.map((f) => f.regraId)).toEqual(['readaptacao.gatilho']);
    const h = hojeNoPrograma(tres, [sessao(0, tres.dias[0]!.id, tres)], dia(2));
    expect(h.rirMais1).toEqual(tres.dias.slice(1).map((d) => d.id));
  });

  it('10 semanas depois, com a rotina trocada para 4 dias, nenhum dia novo leva o +1', () => {
    const historico = Array.from({ length: 30 }, (_, i) => sessao(Math.floor(i / 3) * 7 + (i % 3) * 2, tres.dias[i % 3]!.id, tres));
    expect(quatro.dias.some((d) => tres.dias.some((x) => x.id === d.id))).toBe(false);
    const h = hojeNoPrograma(quatro, historico, dia(71));
    expect(h.rirMais1).toEqual([]);
  });
});

describe('divisao.sem-puxar: a tela marca a recomendada como o gerador escolhe', () => {
  const soBanco: Inventario = { banco_reto: {} };
  it('só com o banco reto, nada puxa', () => {
    expect(nadaParaPuxar(perfil({ nivel: 'iniciante', dias: 4, min: 45 }), soBanco)).toBe(true);
    expect(nadaParaPuxar(perfil({ nivel: 'iniciante', dias: 4, min: 45 }), ana.inventario)).toBe(false);
  });

  it('com 4 dias, a recomendada é o Corpo todo 4x, a mesma que o programa usa', () => {
    const opcoes = opcoesDeDivisao(4, 10, true);
    expect(opcoes.filter((o) => o.recomendada).map((o) => o.id)).toEqual(['ct-4x']);
    expect(opcoes.find((o) => o.id === 'ct-4x')!.descricao).toMatch(/sem exercício de puxar no seu equipamento/);
    expect(ok(perfil({ nivel: 'iniciante', dias: 4, min: 45 }), soBanco).divisaoId).toBe('ct-4x');
    // sem a falta de puxar, nada muda
    expect(opcoesDeDivisao(4, 10).filter((o) => o.recomendada).map((o) => o.id)).toEqual(['si-2x']);
  });

  it('com 6 dias, nenhuma das oferecidas é a recomendada, e o aviso de quem escolheu manda deixar o app escolher', () => {
    expect(opcoesDeDivisao(6, 10, true).some((o) => o.recomendada)).toBe(false);
    const p = ok(perfil({ nivel: 'iniciante', dias: 6, min: 45, divisao: 'ppl-2x' }), soBanco);
    const aviso = p.avisos.find((a) => a.regraId === 'divisao.sem-puxar')!;
    expect(aviso.texto).toMatch(/toque em “Deixar o app escolher” na rotina\.$/);
    expect(ok(perfil({ nivel: 'iniciante', dias: 6, min: 45 }), soBanco).divisaoId).toBe('ct-6x');
    // com 4 dias, a tela tem o corpo todo: o aviso continua mandando escolhê-lo
    const q = ok(perfil({ nivel: 'iniciante', dias: 4, min: 45, divisao: 'si-2x' }), soBanco);
    expect(q.avisos.find((a) => a.regraId === 'divisao.sem-puxar')!.texto).toMatch(/escolha Corpo todo na rotina\.$/);
  });
});

describe('iniciante.fase-aprendizado: o iniciante com pausa de 2 semanas tem a fase de aprendizado', () => {
  // "Menos de 6 meses" de treino e "parei há umas 2 semanas": antes, só o RIR +1 na 1ª sessão de cada dia, com o programa
  // completo e superséries desde a semana 1.
  it('as semanas 1 e 2 com RIR 3–4, 3/4 das séries e sem supersérie', () => {
    const p = programaDe(perfil({ nivel: 'iniciante', dias: 2, min: 30, parado: 2 }), inventarioDe('academia+'));
    expect(p.fases.map((f) => f.regraId)).toEqual(['iniciante.fase-aprendizado', 'iniciante.fase-aprendizado']);
    for (const s of [1, 2]) for (const x of prescricaoDaSemana(p, s).flatMap((d) => d.exercicios)) expect([x.rir, x.supersetCom]).toEqual([[3, 4], undefined]);
  });

  it('o intermediário com a mesma pausa continua com o RIR +1 da 1ª sessão', () => {
    const p = programaDe(perfil({ nivel: 'intermediario', dias: 2, min: 30, parado: 2 }), inventarioDe('academia+'));
    expect(p.fases.map((f) => f.regraId)).toEqual(['readaptacao.gatilho']);
  });
});

describe('tempo.superserie: o iniciante não tem dupla nas semanas 1 e 2 de uma volta de pausa', () => {
  // Iniciante, 2 dias de 30 min, academia completa, "parei há 3 meses": antes, a semana 1 saía com leg press e supino em dupla.
  const p = programaDe(perfil({ nivel: 'iniciante', dias: 2, min: 30, parado: 12 }), inventarioDe('academia+'));
  const duplas = (s: number) => prescricaoDaSemana(p, s).flatMap((d) => d.exercicios).filter((x) => x.supersetCom).length;

  it('a volta do cadastro: sem dupla nas semanas 1 e 2; a partir da 3ª, como no programa', () => {
    expect(p.fases[0]!.regraId).toBe('readaptacao.semana1');
    expect(p.dias.flatMap((d) => d.exercicios).some((x) => x.supersetCom)).toBe(true);
    expect([duplas(1), duplas(2)]).toEqual([0, 0]);
    expect(duplas(3)).toBeGreaterThan(0);
  });

  it('o intermediário segue com a dupla na volta (a regra é só do iniciante)', () => {
    const q = programaDe(perfil({ nivel: 'intermediario', dias: 2, min: 30, parado: 12 }), inventarioDe('academia+'));
    const total = q.dias.flatMap((d) => d.exercicios).filter((x) => x.supersetCom).length;
    expect(prescricaoDaSemana(q, 1).flatMap((d) => d.exercicios).filter((x) => x.supersetCom).length).toBe(total);
  });
});

describe('selecao.aducao-complemento: a adução entra por último e sai primeiro', () => {
  const todos = (p: Programa) => p.dias.flatMap((d) => d.exercicios);
  it('iniciante sem equipamento, 3 dias de 75 min, pernas e glúteos: a adução não toma o lugar do abdominal', () => {
    // Antes, o Corpo todo B tinha a adução deitado de lado e não tinha o abdominal.
    const p = ok(perfil({ nivel: 'iniciante', dias: 3, min: 75, focos: ['pernas', 'gluteos'] }), {});
    for (const d of p.dias) expect(d.exercicios.some((x) => x.padrao === 'core'), d.nome).toBe(true);
    expect(todos(p).filter((x) => x.padrao === 'core').length).toBeGreaterThanOrEqual(3);
  });

  it('no corte de tempo, a adução sai antes do abdominal (academia, corpo todo 4x, pernas, de 90 para 60 min)', () => {
    const pf = perfil({ nivel: 'intermediario', dias: 4, min: 90, focos: ['pernas'], divisao: 'ct-4x' });
    const p = ok(pf, inventarioDe('academia'));
    const comAducao = p.dias.filter((d) => d.exercicios.some((x) => x.funcao === 'aducao'));
    expect(comAducao.length).toBeGreaterThan(0);
    const cortados = cortarTempo(structuredClone(p.dias), 60, p.metas, 'intermediario', new Set(['quadriceps', 'posteriores', 'panturrilha']), [], () => false, undefined, false, undefined, false, false, true);
    for (const [i, d] of cortados.entries()) {
      const antes = p.dias[i]!.exercicios;
      const saiuAbdominal = antes.some((x) => x.padrao === 'core') && !d.exercicios.some((x) => x.padrao === 'core');
      if (saiuAbdominal) expect(d.exercicios.some((x) => x.funcao === 'aducao'), d.nome).toBe(false);
    }
    // e alguma adução saiu
    expect(cortados.flatMap((d) => d.exercicios).filter((x) => x.funcao === 'aducao').length).toBeLessThan(comAducao.length);
  });
});
