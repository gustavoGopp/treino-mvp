import { describe, expect, it } from 'vitest';
import { gerarPrograma, nadaParaPuxar, prescricaoDaSemana, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
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

  it('só vale se não custar: com dor forte no joelho, a divisão de corpo todo, que cabe no tempo, continua', () => {
    // Sem a trava, o Empurrar deixava de ser fraco, a troca de divisão pela dor não acontecia, e o dia de Pernas ficava
    // com 39 min em 30 (o dia acima de 110% subia em 28 a 34 programas da população).
    const p = ok(perfil({ nivel: 'intermediario', dias: 5, min: 30, focos: ['gluteos'], dores: [{ articulacao: 'joelho', nota: 7 }] }), ana.inventario);
    expect(Math.max(...p.dias.map((d) => d.minutosEstimados))).toBeLessThanOrEqual(33);
  });

  it('com tempo, o dia que já tem a vaga de empurrar horizontal não ganha dois supinos retos', () => {
    const p = ok(perfil({ nivel: 'intermediario', dias: 5, min: 60 }), ana.inventario);
    for (const d of p.dias) expect(d.exercicios.filter((x) => x.exId === 'supino-reto').length).toBeLessThanOrEqual(1);
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
