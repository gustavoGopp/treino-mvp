import { describe, expect, it } from 'vitest';
import { avaliar, avisadoPeloGerador, completar, familiasCobertas, type Achado, type Avaliacao, type ProgramaParaAvaliar } from '../../src/domain/avaliador';
import { contextoDeSelecao, gerarPrograma, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS, type DiasSemana } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { type Nivel } from '../../src/domain/regras';
import { REGRAS } from '../../src/domain/regras/completas';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIO, perfil } from '../../scripts/auditoria/cenarios';
import { ana, bruno, carla, diego, elisa, fabio, PERSONAS } from '../personas';
import { PUBLICADOS } from './programas-publicados';

// O avaliador de programas (R5b; regra avaliador.gravidade). Cada tipo de achado tem um caso que o mostra; os programas
// do gerador vêm da grade reduzida (scripts/auditoria/cenarios.ts) ou das personas; os publicados, de programas-publicados.ts.

const ok = (pf: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(pf, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
/** Um perfil da grade reduzida: a divisão recomendada dos dias, sem dor. */
const daGrade = (nivel: Nivel, dias: DiasSemana, minutos: number, prioridades: Grupo[] = []) => {
  const pf = perfil({ nivel, divisao: OPCOES_POR_DIAS[dias][0]!, minutos, prioridades, dores: [] });
  delete pf.divisao;
  return pf;
};
const academia = CENARIO['academia']!.inventario;
const doTipo = (a: Avaliacao, tipo: Achado['tipo'], gravidade?: Achado['gravidade']) => a.achados.filter((x) => x.tipo === tipo && (!gravidade || x.gravidade === gravidade));
const um = (a: Avaliacao, tipo: Achado['tipo'], gravidade?: Achado['gravidade']) => {
  const xs = doTipo(a, tipo, gravidade);
  expect(xs, `${tipo} ${gravidade ?? ''}: ${a.achados.map((x) => `${x.gravidade} ${x.tipo}`).join(', ')}`).toHaveLength(1);
  return xs[0]!;
};
/** Os publicados, com o perfil da frente B: o inventário da Carla, intermediário, 60 min, sem foco. */
const publicado = (id: string) => {
  const p = PUBLICADOS.find((x) => x.id === id)!;
  const pf: Perfil = { ...carla.perfil, nivel: 'intermediario', minutosSessao: 60, prioridades: [], diasSemana: p.programa.dias.length as DiasSemana };
  return avaliar(p.programa, pf, carla.inventario);
};
const dia = (id: string, exs: [string, number][]) => ({ id, nome: `Dia ${id}`, exercicios: exs.map(([exId, series]) => ({ exId, series })) });

describe('avaliador: veredito e forma (avaliador.gravidade)', () => {
  it('"está bom" quando não há segurança, alerta nem ajuste: o Bruno e a Carla', () => {
    for (const p of [bruno, carla]) {
      const a = avaliar(ok(p.perfil, p.inventario), p.perfil, p.inventario);
      expect(a.veredito, p.nome).toBe('bom');
      expect(a.resumo).toBe('Está bom: nada a ajustar.');
    }
  });
  it('"limite" quando só o equipamento ou o tempo impedem: a Elisa, o Diego e o Fábio, e o texto diz que não precisa fazer nada', () => {
    for (const p of [elisa, diego, fabio]) {
      const a = avaliar(ok(p.perfil, p.inventario), p.perfil, p.inventario);
      expect(a.veredito, p.nome).toBe('limite');
      for (const x of a.achados.filter((y) => y.gravidade === 'limite')) expect(x.passo, x.texto).toMatch(/^Não precisa fazer nada/);
    }
  });
  it('mesma entrada, mesma saída (determinístico)', () => {
    for (const p of Object.values(PERSONAS)) {
      const prog = ok(p.perfil, p.inventario);
      expect(avaliar(prog, p.perfil, p.inventario)).toEqual(avaliar(prog, p.perfil, p.inventario));
    }
    const p = PUBLICADOS[2]!;
    expect(publicado(p.id)).toEqual(publicado(p.id));
  });
  it('todo achado tem uma regra de regras.md, o selo dela, o fato e o próximo passo (acompanhamento.mensagens)', () => {
    const todas = [...Object.values(PERSONAS).map((p) => avaliar(ok(p.perfil, p.inventario), p.perfil, p.inventario)), ...PUBLICADOS.map((p) => publicado(p.id))];
    let n = 0;
    for (const a of todas)
      for (const x of a.achados) {
        n++;
        expect(REGRAS[x.regraId], x.regraId).toBeDefined();
        expect(x.selo).toBe(REGRAS[x.regraId]!.selo);
        expect(x.texto.length, x.texto).toBeGreaterThan(10);
        expect(x.passo.length, x.texto).toBeGreaterThan(10);
        expect(x.itens.length).toBeGreaterThan(0);
      }
    expect(n).toBeGreaterThan(40);
  });
  it('achados iguais saem numa linha: as 5 séries de Schoenfeld em 7 exercícios × 3 dias viram 1 achado com 21 itens', () => {
    const x = um(publicado('schoenfeld-5'), 'series-por-exercicio');
    expect(x.itens).toHaveLength(21);
    expect(x.texto).toMatch(/^7 exercícios com mais de 4 séries/);
  });
  it('a tabela por músculo traz séries, meta, piso, dias e funções; empurrar e puxar; os minutos de cada dia', () => {
    const a = publicado('thomas');
    const biceps = a.musculos.find((m) => m.musculo === 'biceps')!;
    expect(biceps).toMatchObject({ series: 13.5, meta: 6, piso: 4, dias: 1 });
    expect(a.empurrar).toBe(12);
    expect(a.puxar).toBe(9);
    expect(a.minutos.map((m) => m.minutos)).toEqual([70, 53, 70]);
  });
});

describe('avaliador: segurança e possibilidade (bloqueia ou alerta forte)', () => {
  it('seguranca.dor.programa: o programa do Bruno sem dor, com o ombro em 7 hoje, fica bloqueado, numa linha só, com a alternativa e a avaliação profissional', () => {
    const prog = ok(bruno.perfil, bruno.inventario);
    const comDor: Perfil = { ...bruno.perfil, triagem: { respostas: { ...bruno.perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'ombro', nota: 7 }] } };
    const a = avaliar(prog, comDor, bruno.inventario);
    expect(a.veredito).toBe('bloqueado');
    const x = um(a, 'dor', 'seguranca');
    expect(x.regraId).toBe('seguranca.dor.programa');
    expect(x.itens.length).toBeGreaterThan(5);
    expect(x.texto).toMatch(/carregam a região marcada com dor no ombro \(7 hoje\)/);
    expect(x.passo).toMatch(/no lugar: .* → /);
    expect(x.passo).toMatch(/Procure avaliação profissional\.$/);
    expect(a.resumo).toMatch(/^Segurança primeiro/);
  });
  it('seguranca.triagem: um "sim" sem liberação bloqueia', () => {
    const pf: Perfil = { ...carla.perfil, triagem: { respostas: { ...carla.perfil.triagem.respostas, coracao: true } } };
    const a = avaliar(ok(carla.perfil, carla.inventario), pf, carla.inventario);
    expect(a.veredito).toBe('bloqueado');
    expect(um(a, 'triagem', 'seguranca').passo).toMatch(/confirme a liberação/);
  });
  it('equipamento que o local não tem: alerta forte, com a troca por um do equipamento (o programa da Carla na casa da Ana)', () => {
    const a = avaliar(ok(carla.perfil, carla.inventario), { ...carla.perfil }, ana.inventario);
    expect(a.veredito).toBe('ajustar');
    const x = um(a, 'equipamento', 'alerta');
    expect(x.regraId).toBe('avaliador.gravidade');
    expect(x.passo).toMatch(/ → /);
    expect(doTipo(a, 'dor')).toHaveLength(0);
  });
  it('exercício marcado para evitar: alerta forte', () => {
    const prog = ok(carla.perfil, carla.inventario);
    const id = prog.dias[0]!.exercicios[0]!.exId;
    const x = um(avaliar(prog, { ...carla.perfil, evitarExercicios: [id] }, carla.inventario), 'evitado', 'alerta');
    expect(x.passo).toMatch(/Restrições/);
  });
  it('selecao.complexidade-nivel: o mergulho nas paralelas para o iniciante é alerta forte, não bloqueio', () => {
    const pf: Perfil = { ...carla.perfil, nivel: 'iniciante' };
    const a = avaliar({ dias: [dia('a', [['mergulho', 3], ['supino-reto', 3], ['puxada-frente', 3]])] }, pf, carla.inventario);
    const x = um(a, 'complexidade', 'alerta');
    expect(x.regraId).toBe('selecao.complexidade-nivel');
    expect(a.veredito).toBe('ajustar');
  });
});

describe('avaliador: séries, sessão, semana e frequência', () => {
  it('volume.series-por-exercicio: acima de 4 e abaixo de 2', () => {
    expect(um(publicado('thomas'), 'series-por-exercicio').texto).toMatch(/7 exercícios com mais de 4 séries: supino reto com halteres \(6\)/);
    const a = avaliar({ dias: [dia('a', [['supino-reto', 1], ['puxada-frente', 3]])] }, { ...carla.perfil, minutosSessao: 60 }, carla.inventario);
    expect(doTipo(a, 'series-por-exercicio')[0]!.texto).toMatch(/com 1 série/);
  });
  it('volume.sessao.teto e frequencia.musculo: o tríceps com 15 e o bíceps com 13,5 num dia só (Thomas)', () => {
    const a = publicado('thomas');
    expect(um(a, 'sessao').itens).toEqual(['A (peito, ombro e tríceps): tríceps 15', 'B (costas e bíceps): bíceps 13,5']);
    expect(um(a, 'frequencia').itens).toEqual(['bíceps (13,5 em 1 dia)', 'tríceps (15 em 1 dia)']);
  });
  it('volume.semanal.teto-padrao (ajustar) e volume.semanal.maximo (só informação): quadríceps 27 e costas 18 (Schoenfeld, 3 séries)', () => {
    const a = publicado('schoenfeld-3');
    expect(um(a, 'teto', 'ajustar').itens).toEqual(['quadríceps 27']);
    expect(um(a, 'maximo', 'info').itens).toEqual(['costas 18']);
  });
  it('abaixo do piso com um ajuste possível: subir uma série (o abdômen de Thomas) ou trocar o que sobra (posteriores e panturrilha a zero em Schoenfeld)', () => {
    expect(um(publicado('thomas'), 'abaixo-do-piso', 'ajustar').passo).toMatch(/^Suba 1 série em abdominal no chão/);
    const x = doTipo(publicado('schoenfeld-3'), 'abaixo-do-piso', 'ajustar').find((y) => y.regraId === 'volume.semanal.minimo-eficaz')!;
    expect(x.itens).toEqual(['posteriores da coxa 0 de 4', 'panturrilha 0 de 4']);
    expect(x.passo).toMatch(/^Troque cadeira extensora por flexão de joelho/);
  });
  it('abaixo do piso sem lugar é limite, e sem exercício possível também, com o motivo (equipamento ou dor)', () => {
    const lim = avaliar(ok(daGrade('iniciante', 2, 30), academia), daGrade('iniciante', 2, 30), academia);
    const piso = doTipo(lim, 'abaixo-do-piso', 'limite').find((x) => x.regraId === 'volume.semanal.minimo-eficaz')!;
    expect(piso.texto).toMatch(/não cabe mais em 2 treinos de 30 min/);
    expect(um(avaliar(ok(elisa.perfil, elisa.inventario), elisa.perfil, elisa.inventario), 'sem-exercicio', 'limite').texto).toBe('O seu equipamento não tem exercício para costas, ombro lateral e bíceps.');
    const comDor: Perfil = { ...fabio.perfil, triagem: { respostas: { ...fabio.perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'ombro', nota: 8 }] } };
    const prog = ok(comDor, fabio.inventario);
    expect(doTipo(avaliar(prog, comDor, fabio.inventario), 'sem-exercicio').some((x) => /por causa da dor/.test(x.texto))).toBe(true);
  });
  it('volume.semanal.alvo: o foco abaixo da meta pede a série que cabe (a panturrilha da Ana) ou vira limite quando não cabe', () => {
    const a = avaliar(ok(ana.perfil, ana.inventario), ana.perfil, ana.inventario);
    expect(um(a, 'abaixo-da-meta', 'ajustar').passo).toMatch(/^Suba 1 série em panturrilha no degrau/);
    expect(um(a, 'abaixo-da-meta', 'limite').passo).toMatch(/mais minutos, mais dias ou menos grupos de foco/);
  });
});

describe('avaliador: funções que se complementam e isoladores obrigatórios (pela tabela de funções)', () => {
  it('selecao.exercicios-por-musculo: peito, costas e quadríceps com uma função só (Carneiro), com o que acrescentar ou trocar', () => {
    const x = um(publicado('carneiro'), 'funcoes', 'ajustar');
    expect(x.musculos).toEqual(['peito', 'costas', 'quadriceps']);
    expect(x.passo).toMatch(/Acrescente supino inclinado/);
  });
  it('sem outra função no equipamento, é limite (o Fábio: costas só com a barra fixa)', () => {
    const a = avaliar(ok(fabio.perfil, fabio.inventario), fabio.perfil, fabio.inventario);
    expect(um(a, 'funcoes', 'limite').texto).toMatch(/costas só com puxar de cima/);
  });
  it('sem lugar nos dias, é limite (academia, 3 dias de 30 min)', () => {
    const pf = daGrade('iniciante', 3, 30);
    expect(um(avaliar(ok(pf, academia), pf, academia), 'funcoes', 'limite').texto).toMatch(/não cabe mais em 3 treinos de 30 min/);
  });
  it('a flexão em duas vagas: conta como 2 funções do peito sem banco inclinável, e como 1 com ele (decisão do R5b)', () => {
    const exs = [{ exId: 'flexao' }, { exId: 'flexao' }];
    const nivelEm = (inv: Inventario) => {
      const ctx = contextoDeSelecao(carla.perfil, inv);
      return (fid: string) => FUNCAO[fid]!.niveis.findIndex((ids) => ids.some((id) => ctx.naFuncao(FUNCAO[fid]!, id)));
    };
    expect(familiasCobertas('peito', exs, nivelEm({}))).toEqual(['empurrar reto', 'empurrar inclinado']);
    expect(familiasCobertas('peito', exs, nivelEm(carla.inventario))).toEqual(['empurrar reto']);
    // O mesmo exercício uma vez só cobre uma família; o supino reto na vaga inclinada vale sem banco inclinável (a Ana).
    expect(familiasCobertas('peito', [{ exId: 'flexao' }], nivelEm({}))).toHaveLength(1);
    expect(familiasCobertas('peito', [{ exId: 'supino-reto' }, { exId: 'supino-reto' }], nivelEm(ana.inventario))).toHaveLength(2);
  });
  it('a barra só na descida do iniciante vale como a barra fixa que ela substitui (o Diego tem as costas em 2 funções)', () => {
    const a = avaliar(ok(diego.perfil, diego.inventario), diego.perfil, diego.inventario);
    expect(a.musculos.find((m) => m.musculo === 'costas')!.funcoes).toBe(2);
    expect(doTipo(a, 'funcoes')).toHaveLength(0);
  });
  it('selecao.isolador-obrigatorio: a extensora que falta em Thomas entra no lugar do 2º agachar do dia; sem lugar, é limite', () => {
    expect(um(publicado('thomas'), 'obrigatorio', 'ajustar').passo).toBe('Troque leg press por cadeira extensora em C (pernas).');
    const pf = daGrade('iniciante', 2, 30);
    expect(um(avaliar(ok(pf, academia), pf, academia), 'obrigatorio', 'limite').itens).toEqual(['tríceps acima da cabeça', 'extensora']);
  });
});

describe('avaliador: equilíbrios, tempo e ordem', () => {
  it('avaliador.empurrar-puxar: acima de 1,5 com lugar pede séries de puxar; sem lugar é limite; sem como puxar, nada', () => {
    const muito: ProgramaParaAvaliar = { dias: [dia('a', [['supino-reto', 4], ['desenvolvimento', 4], ['voador', 3], ['remada-baixa', 2]])] };
    const a = avaliar(muito, { ...carla.perfil, minutosSessao: 75, diasSemana: 2 }, carla.inventario);
    const x = um(a, 'empurrar-puxar', 'ajustar');
    expect(x.itens).toEqual(['empurrar 11 × puxar 2']);
    expect(x.passo).toMatch(/^Suba 1 série em remada baixa/);
    const pf = daGrade('iniciante', 2, 30, ['peito']);
    expect(um(avaliar(ok(pf, academia), pf, academia), 'empurrar-puxar', 'limite').passo).toMatch(/escolha também costas/);
    expect(doTipo(avaliar(ok(elisa.perfil, elisa.inventario), elisa.perfil, elisa.inventario), 'empurrar-puxar')).toHaveLength(0);
  });
  it('volume.equilibrio-coxa: sem exercício direto de posteriores (Schoenfeld), com a troca', () => {
    const x = um(publicado('schoenfeld-3'), 'coxa', 'ajustar');
    expect(x.texto).toMatch(/nenhum exercício direto para a parte de trás da coxa/);
    expect(x.passo).toMatch(/flexão de joelho/);
  });
  it('tempo.corte: acima de 110% com corte possível é ajustar (o bi-set de Thomas); muito acima, o passo geral; até 110%, limite; sem corte, limite', () => {
    expect(um(publicado('thomas'), 'tempo', 'ajustar').passo).toMatch(/em sequência \(bi-set\)/);
    expect(um(publicado('schoenfeld-5'), 'tempo', 'ajustar').texto).toMatch(/^Bem mais longo que os 60 min/);
    const d = avaliar(ok(diego.perfil, diego.inventario), diego.perfil, diego.inventario);
    expect(um(d, 'tempo', 'limite').passo).toMatch(/fica dentro de 10% a mais/);
    const pf = daGrade('iniciante', 2, 30);
    expect(doTipo(avaliar(ok(pf, academia), pf, academia), 'tempo', 'limite').some((x) => /segura o mínimo de cada músculo/.test(x.texto))).toBe(true);
  });
  it('ordem.sessao: isolador antes de um exercício grande é só informação', () => {
    expect(um(publicado('thomas'), 'ordem', 'info').itens).toEqual(['C (pernas)']);
  });
});

describe('avaliador: os 4 programas publicados reproduzem os achados do protótipo (b-monte-e-avaliador.md, seção 2)', () => {
  const regras = (id: string) => new Set(publicado(id).achados.filter((x) => x.gravidade !== 'info').map((x) => x.regraId));
  it('Thomas e Burns 2016 (ABC): séries demais, sessão, frequência, abdômen, extensora, tempo; a ordem só informa', () => {
    expect([...regras('thomas')]).toEqual(
      expect.arrayContaining(['volume.series-por-exercicio', 'volume.sessao.teto', 'frequencia.musculo', 'volume.semanal.abdomen', 'selecao.isolador-obrigatorio', 'tempo.corte']),
    );
  });
  it('Schoenfeld 2019, 3 séries: quadríceps acima do teto; posteriores, panturrilha e abdômen a zero; uma função no peito e no glúteo; isoladores; coxa', () => {
    expect([...regras('schoenfeld-3')]).toEqual(
      expect.arrayContaining(['volume.semanal.teto-padrao', 'volume.semanal.minimo-eficaz', 'volume.semanal.abdomen', 'selecao.exercicios-por-musculo', 'selecao.isolador-obrigatorio', 'volume.equilibrio-coxa']),
    );
  });
  it('Schoenfeld 2019, 5 séries: 5 séries num exercício, quadríceps com 15 numa sessão, dias de ~95 min em 60', () => {
    const a = publicado('schoenfeld-5');
    expect(um(a, 'sessao').itens).toEqual(['Corpo todo A: quadríceps 15', 'Corpo todo B: quadríceps 15', 'Corpo todo C: quadríceps 15']);
    expect(a.minutos.map((m) => m.minutos)).toEqual([95, 95, 95]);
  });
  it('Carneiro 2024: 10 séries num exercício; peito, costas e quadríceps com uma função; sem extensora nem tríceps acima da cabeça', () => {
    const a = publicado('carneiro');
    expect(um(a, 'series-por-exercicio').texto).toMatch(/supino reto com barra \(10\)/);
    expect(um(a, 'obrigatorio', 'ajustar').itens).toEqual(['tríceps acima da cabeça', 'extensora']);
  });
  it('todos ficam em "ajustar" e nenhum é bloqueado', () => {
    for (const p of PUBLICADOS) expect(publicado(p.id).veredito, p.id).toBe('ajustar');
  });
});

describe('avaliador: peças', () => {
  it('completar: um exercício digitado (id e séries) ganha a prescrição do app (prescrever)', () => {
    const ctx = contextoDeSelecao(carla.perfil, carla.inventario);
    const x = completar({ exId: 'cadeira-extensora', series: 3 }, ctx);
    expect(x).toMatchObject({ exId: 'cadeira-extensora', series: 3, tipo: 'isolador', funcao: 'extensora', descansoSeg: 75 });
    expect(x.reps[0]).toBeLessThan(x.reps[1]);
  });
  it('avisadoPeloGerador: o foco abaixo da meta da Ana o gerador avisa; uma função só, não', () => {
    const prog = ok(ana.perfil, ana.inventario);
    const nomes = Object.fromEntries(prog.dias.map((d) => [d.id, d.nome]));
    const a = avaliar(prog, ana.perfil, ana.inventario);
    expect(avisadoPeloGerador(um(a, 'abaixo-da-meta', 'ajustar'), prog.avisos, nomes)).toBe(true);
    expect(avisadoPeloGerador(um(publicado('carneiro'), 'funcoes'), [], {})).toBe(false);
  });
});
