import { describe, expect, it } from 'vitest';
import { avaliar, avisosDoAvaliador, textoDaAvaliacao, type Avaliacao, type ProgramaParaAvaliar } from '../../src/domain/avaliador';
import { COMPLEMENTOS } from '../../src/domain/avaliador/complementos';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import { REGRAS } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { respostasNenhuma } from '../../src/domain/triagem';
import { ana, bruno, carla, elisa } from '../personas';
import { CARNEIRO_5, inventarioDosPublicados, perfilDosPublicados, SCHOENFELD_3, SCHOENFELD_5, THOMAS_ABC, type ProgramaPublicado } from '../publicados';

// O avaliador de programas (R5b; src/domain/avaliador). Cada regra que ele confere tem um caso aqui.

const gerado = (p: Perfil, inv: Inventario): Programa => {
  const g = gerarPrograma(p, inv);
  if (g.status !== 'ok') throw new Error('bloqueado');
  return g.programa;
};
const dePublicado = (p: ProgramaPublicado) => avaliar(p.programa, perfilDosPublicados(p.programa.dias.length), inventarioDosPublicados);
const achado = (a: Avaliacao, tipo: string) => a.achados.find((x) => x.tipo === tipo || x.tipo.startsWith(`${tipo}:`));
const comDor = (p: Perfil, articulacao: 'ombro' | 'joelho' | 'lombar', nota: number): Perfil => ({
  ...p,
  triagem: { respostas: { ...respostasNenhuma(), osteoarticular: true }, dores: [{ articulacao, nota }] },
});
const ex = (exId: string, series = 3) => ({ exId, series });
const base = perfilDosPublicados(3);
const academia = inventarioDosPublicados;

describe('o avaliador: veredito, selo, determinismo', () => {
  it('o programa gerado do Bruno está bom; a mesma entrada dá a mesma saída', () => {
    const p = gerado(bruno.perfil, bruno.inventario);
    const a = avaliar(p, bruno.perfil, bruno.inventario);
    expect(a.veredito).toBe('bom');
    expect(a.achados.filter((x) => x.gravidade !== 'info')).toEqual([]);
    expect(avaliar(p, bruno.perfil, bruno.inventario)).toEqual(a);
  });
  it('todo achado tem uma regra de regras.md, com o selo dela, e sai na ordem das gravidades', () => {
    for (const p of [SCHOENFELD_3, SCHOENFELD_5, THOMAS_ABC, CARNEIRO_5]) {
      const a = dePublicado(p);
      for (const x of a.achados) {
        expect(REGRAS[x.regraId], x.regraId).toBeDefined();
        expect(x.selo).toBe(REGRAS[x.regraId]!.selo);
        expect(x.texto.length).toBeGreaterThan(20);
      }
      const ordem = a.achados.map((x) => ['seguranca', 'alerta', 'ajustar', 'limite', 'info'].indexOf(x.gravidade));
      expect(ordem).toEqual([...ordem].sort((x, y) => x - y));
    }
  });
  it('o veredito: só limite vira "limite"; nada vira "bom"; ajustar ou alerta vira "ajustar"; segurança vira "bloqueado"', () => {
    expect(avaliar(gerado(ana.perfil, ana.inventario), ana.perfil, ana.inventario).veredito).toBe('limite');
    expect(dePublicado(THOMAS_ABC).veredito).toBe('ajustar');
    const bloq = avaliar({ dias: [{ nome: 'A', exercicios: [ex('supino-reto')] }] }, { ...base, triagem: { respostas: { ...respostasNenhuma(), coracao: true } } }, academia);
    expect(bloq.veredito).toBe('bloqueado');
  });
  it('o texto simples tem o veredito, a tabela, os equilíbrios, o tempo e um achado por linha', () => {
    const t = textoDaAvaliacao(dePublicado(THOMAS_ABC));
    expect(t).toMatch(/^Veredito: dá para ajustar/);
    expect(t).toContain('Empurrar 12 × puxar 9');
    expect(t).toContain('Tempo: A ~66 min');
    expect(t).toContain('AJUSTAR [volume.series-por-exercicio · moderada]');
  });
});

describe('segurança e alertas (avaliador.gravidade; só a segurança bloqueia)', () => {
  it('seguranca.triagem: um "sim" sem liberação bloqueia', () => {
    const a = avaliar({ dias: [{ nome: 'A', exercicios: [ex('supino-reto')] }] }, { ...base, triagem: { respostas: { ...respostasNenhuma(), coracao: true } } }, academia);
    expect(achado(a, 'triagem')).toMatchObject({ gravidade: 'seguranca', regraId: 'seguranca.triagem' });
  });
  it('seguranca.dor.programa: o Bruno marca dor 7 no ombro e mantém o programa antigo com um desenvolvimento a mais: uma linha só, com a alternativa e a avaliação profissional', () => {
    const p = gerado(bruno.perfil, bruno.inventario);
    const editado = { dias: p.dias.map((d, i) => (i === 0 ? { ...d, exercicios: [...d.exercicios, { exId: 'desenvolvimento', series: 3 }] } : d)) };
    const a = avaliar(editado, comDor(bruno.perfil, 'ombro', 7), bruno.inventario);
    expect(a.veredito).toBe('bloqueado');
    const dor = a.achados.filter((x) => x.gravidade === 'seguranca');
    expect(dor).toHaveLength(1);
    expect(dor[0]!.itens.length).toBeGreaterThan(10);
    expect(dor[0]!.texto).toMatch(/^\d+ exercícios carregam a região com dor no ombro \(7 hoje\)/);
    expect(dor[0]!.texto).toContain('Procure avaliação profissional');
    expect(dor[0]!.itens.some((i) => i.includes('no lugar:'))).toBe(true);
  });
  it('o programa que o gerador monta com a mesma dor não tem nenhum achado de segurança', () => {
    const pf = comDor(bruno.perfil, 'ombro', 7);
    expect(avaliar(gerado(pf, bruno.inventario), pf, bruno.inventario).achados.filter((x) => x.gravidade === 'seguranca')).toEqual([]);
  });
  it('alerta (sem bloquear): equipamento fora do local, equipamento evitado, exercício evitado, complexidade acima do nível, exercício fora da biblioteca', () => {
    const prog: ProgramaParaAvaliar = { dias: [{ nome: 'A', exercicios: [ex('supino-maquina'), ex('supino-reto'), ex('crucifixo-polia'), ex('mergulho'), ex('nao-existe')] }] };
    const pf: Perfil = { ...base, nivel: 'iniciante', evitarEquipamentos: ['halteres_fixos'], evitarExercicios: ['crucifixo-polia'] };
    const a = avaliar(prog, pf, { halteres_fixos: academia.halteres_fixos, banco_regulavel: academia.banco_regulavel, estacao_polia_dupla: academia.estacao_polia_dupla, paralelas: academia.paralelas });
    expect(a.veredito).toBe('ajustar');
    expect(achado(a, 'equipamento')).toMatchObject({ gravidade: 'alerta', regraId: 'equipamento.capacidades' });
    expect(achado(a, 'equipamento')!.itens).toEqual(['supino sentado na máquina']);
    expect(achado(a, 'equipamento-evitado')).toMatchObject({ gravidade: 'alerta', itens: ['supino reto com halteres'] });
    expect(achado(a, 'evitado')).toMatchObject({ gravidade: 'alerta', itens: ['crucifixo na polia (crossover)'] });
    expect(achado(a, 'complexidade')).toMatchObject({ gravidade: 'alerta', regraId: 'selecao.complexidade-nivel' });
    expect(achado(a, 'fora-da-biblioteca')).toMatchObject({ gravidade: 'alerta', itens: ['nao-existe'] });
    expect(a.achados.some((x) => x.gravidade === 'seguranca')).toBe(false);
  });
});

describe('séries (volume.*; frequencia.musculo)', () => {
  it('volume.series-por-exercicio: o programa de 5 séries de Schoenfeld dá 21 exercícios acima de 4 numa linha só, por exercício', () => {
    const a = dePublicado(SCHOENFELD_5);
    const x = achado(a, 'series-acima')!;
    expect(x.itens).toHaveLength(7);
    expect(x.itens.every((i) => i.endsWith('5 séries (nos 3 dias)'))).toBe(true);
    expect(x.texto).toContain('Divida as séries entre 2 exercícios da mesma função, ou entre 2 dias');
  });
  it('volume.series-por-exercicio: uma série só também é achado', () => {
    const a = avaliar({ dias: [{ nome: 'A', exercicios: [ex('supino-reto', 1)] }, { nome: 'B', exercicios: [ex('supino-reto', 1)] }] }, base, academia);
    expect(achado(a, 'serie-unica')).toMatchObject({ gravidade: 'ajustar', itens: ['supino reto com halteres (nos 2 dias)'] });
  });
  it('volume.sessao.teto e frequencia.musculo: Thomas e Burns põem 15 séries de tríceps e 13,5 de bíceps num dia', () => {
    const a = dePublicado(THOMAS_ABC);
    expect(achado(a, 'sessao-teto')!.itens).toEqual(['tríceps 15 (A)', 'bíceps 13,5 (B)']);
    expect(achado(a, 'frequencia')!.itens).toEqual(['bíceps 13,5 em 1 dia', 'tríceps 15 em 1 dia']);
  });
  it('volume.semanal.teto-padrao (ajustar) e volume.semanal.maximo (só informação)', () => {
    const a = dePublicado(SCHOENFELD_3);
    expect(achado(a, 'teto-semanal')).toMatchObject({ gravidade: 'ajustar', itens: ['quadríceps 27'] });
    expect(achado(a, 'maximo-nivel')).toMatchObject({ gravidade: 'info', itens: ['costas 18'] });
  });
});

describe('a meta da semana (volume.semanal.alvo, minimo-eficaz, abdomen): ajustar só quando dá', () => {
  it('limite pelo equipamento: a Elisa, sem nada, não tem costas, ombros nem bíceps, e não precisa fazer nada', () => {
    const a = avaliar(gerado(elisa.perfil, elisa.inventario), elisa.perfil, elisa.inventario);
    expect(achado(a, 'meta-equipamento')).toMatchObject({ gravidade: 'limite', musculos: ['costas', 'ombro_lateral', 'ombro_posterior', 'biceps'] });
    expect(achado(a, 'meta-equipamento')!.texto).toContain('Não precisa fazer nada');
  });
  it('limite pela dor: sem equipamento e com dor 7 no joelho, o quadríceps fica sem exercício', () => {
    const pf = comDor(elisa.perfil, 'joelho', 7);
    const a = avaliar(gerado(pf, elisa.inventario), pf, elisa.inventario);
    expect(achado(a, 'meta-dor')!.musculos).toContain('quadriceps');
    expect(achado(a, 'meta-dor')!.texto).toContain('atualize a nota na triagem');
  });
  it('limite pelo tempo: a Ana fica abaixo da meta das pernas com 3 × 45 min', () => {
    const a = avaliar(gerado(ana.perfil, ana.inventario), ana.perfil, ana.inventario);
    expect(achado(a, 'meta-tempo')).toMatchObject({ gravidade: 'limite', musculos: ['quadriceps', 'posteriores', 'panturrilha'] });
    expect(achado(a, 'meta-tempo')!.texto).toContain('mais minutos por treino, mais um dia ou menos grupos de foco');
  });
  it('ajustar com uma série a mais: o abdômen de Thomas e Burns', () => {
    expect(achado(dePublicado(THOMAS_ABC), 'meta-cabe')!.texto).toBe('Abaixo da meta, e cabe mais: abdômen 3 de 4 (suba 1 série em abdominal no chão (crunch), no treino B).');
  });
  it('ajustar com um exercício novo: a panturrilha da Carla cabe num dia de pernas', () => {
    const a = avaliar(gerado(carla.perfil, carla.inventario), carla.perfil, carla.inventario);
    expect(achado(a, 'meta-cabe')!.texto).toMatch(/^Abaixo da meta, e cabe mais: panturrilha 12 de 14 \(acrescente .+ no treino (Inferior|Pernas)\)\.$/);
  });
  it('ajustar com uma troca: em Schoenfeld (3 séries), um exercício de costas dá lugar à flexora, outro à panturrilha', () => {
    const a = dePublicado(SCHOENFELD_3);
    const trocas = a.achados.filter((x) => x.tipo === 'meta-troca');
    expect(trocas.flatMap((x) => x.musculos)).toEqual(['posteriores', 'panturrilha', 'abdomen']);
    const saem = trocas.flatMap((x) => x.itens.map((i) => i.match(/troque (.+) por/)![1]));
    expect(saem).toHaveLength(3);
    expect(new Set(saem).size).toBe(3); // cada troca tira um exercício diferente
  });
  it('ajustar passando séries de um músculo acima do máximo: Schoenfeld (5 séries), com quadríceps em 45', () => {
    expect(achado(dePublicado(SCHOENFELD_5), 'meta-excesso')!.texto).toContain('quadríceps tem 45');
  });
});

describe('funções que se complementam (selecao.exercicios-por-musculo; selecao.gluteo), pela tabela de funções', () => {
  it('os grupos usam funções de funcoes.json e cobrem os 5 músculos grandes', () => {
    expect(COMPLEMENTOS.map((c) => c.musculo)).toEqual(['peito', 'costas', 'quadriceps', 'posteriores', 'gluteos']);
  });
  it('ajustar com troca: dois exercícios de agachar no quadríceps de Carneiro', () => {
    expect(achado(dePublicado(CARNEIRO_5), 'funcoes:quadriceps')!.texto).toContain('troque agachamento livre com barra (profundo) por afundo');
  });
  it('ajustar acrescentando: peito e costas de Carneiro só com uma função', () => {
    const a = dePublicado(CARNEIRO_5);
    expect(achado(a, 'funcoes:peito')!.texto).toMatch(/Uma função só: peito só com empurrar horizontal\. .*acrescente supino inclinado/);
    expect(achado(a, 'funcoes:costas')!.texto).toMatch(/acrescente .*pux/);
  });
  it('limite pelo equipamento (Elisa: posteriores só com flexão de joelho) e pelo tempo (Schoenfeld com 60 min)', () => {
    expect(achado(avaliar(gerado(elisa.perfil, elisa.inventario), elisa.perfil, elisa.inventario), 'funcoes-equipamento')!.itens).toEqual(['posteriores da coxa só com flexão de joelho']);
    expect(dePublicado(SCHOENFELD_3).achados.filter((x) => x.tipo === 'funcoes-tempo').map((x) => [x.regraId, x.itens])).toEqual([
      ['selecao.exercicios-por-musculo', ['peito só com empurrar horizontal']],
      ['selecao.gluteo', ['glúteos só com agachar ou afundo']],
    ]);
  });
  it('decisão do R5b: a mesma flexão em duas vagas conta 2 funções do peito quando é o que a tabela escolhe para a outra vaga', () => {
    const prog: ProgramaParaAvaliar = { dias: [{ nome: 'A', exercicios: [ex('flexao')] }, { nome: 'B', exercicios: [ex('flexao')] }] };
    const semNada = avaliar(prog, { ...base, nivel: 'iniciante' }, {});
    expect(semNada.musculos.find((l) => l.musculo === 'peito')!.funcoes).toEqual(['empurrar horizontal', 'empurrar inclinado']);
    // Na academia, com banco inclinável, a vaga de inclinado escolheria o supino inclinado: a 2ª flexão não conta.
    const naAcademia = avaliar(prog, base, academia);
    expect(naAcademia.musculos.find((l) => l.musculo === 'peito')!.funcoes).toEqual(['empurrar horizontal']);
    // Uma flexão só (uma vez na semana) nunca conta duas vezes.
    const umaVez = avaliar({ dias: [{ nome: 'A', exercicios: [ex('flexao')] }] }, { ...base, nivel: 'iniciante' }, {});
    expect(umaVez.musculos.find((l) => l.musculo === 'peito')!.funcoes).toHaveLength(1);
  });
});

describe('isoladores, equilíbrios, tempo e ordem', () => {
  it('selecao.isolador-obrigatorio: ajustar em Carneiro (tríceps acima da cabeça e extensora), limite em Schoenfeld (sem minutos)', () => {
    expect(achado(dePublicado(CARNEIRO_5), 'isolador')!.itens.map((i) => i.split(' (')[0])).toEqual(['tríceps acima da cabeça', 'extensora']);
    expect(achado(dePublicado(SCHOENFELD_3), 'isolador-tempo')!.gravidade).toBe('limite');
  });
  it('avaliador.equilibrio.empurrar-puxar: acima de 1,5 é ajustar; sem nada para puxar, nenhum achado', () => {
    const prog: ProgramaParaAvaliar = { dias: [{ nome: 'A', exercicios: [ex('supino-reto'), ex('desenvolvimento'), ex('remada-baixa')] }] };
    const a = avaliar(prog, base, academia);
    expect(achado(a, 'empurrar-puxar')!.texto).toMatch(/^Empurrar 6 × puxar 3 séries por semana \(2 para 1\)/);
    expect(avaliar({ dias: [{ nome: 'A', exercicios: [ex('flexao'), ex('pike')] }] }, base, {}).achados.some((x) => x.tipo === 'empurrar-puxar')).toBe(false);
    expect(avaliar({ dias: [{ nome: 'A', exercicios: [ex('supino-reto'), ex('remada-baixa', 2)] }] }, base, academia).achados.some((x) => x.tipo === 'empurrar-puxar')).toBe(false);
  });
  it('avaliador.equilibrio.coxa: sem exercício direto de posteriores, ou fora de 0,5 a 2', () => {
    expect(achado(dePublicado(SCHOENFELD_3), 'coxa')!.texto).toContain('sem nenhum exercício direto de posteriores');
    const desequilibrado = avaliar({ dias: [{ nome: 'A', exercicios: [ex('leg-press', 4), ex('agachamento-smith', 4), ex('cadeira-flexora', 2)] }] }, base, academia);
    expect(achado(desequilibrado, 'coxa')!.texto).toContain('Some séries de posteriores');
    const equilibrado = avaliar({ dias: [{ nome: 'A', exercicios: [ex('leg-press', 3), ex('cadeira-flexora', 3)] }] }, base, academia);
    expect(achado(equilibrado, 'coxa')).toBeUndefined();
  });
  it('tempo.corte: ajustar quando dá para cortar sem deixar músculo abaixo da meta (Thomas); limite quando não dá (Ana)', () => {
    expect(achado(dePublicado(THOMAS_ABC), 'tempo')!.itens[0]).toMatch(/^A ~66 min \(para caber: tire/);
    expect(achado(avaliar(gerado(ana.perfil, ana.inventario), ana.perfil, ana.inventario), 'tempo-limite')!.itens).toEqual(['Corpo todo C ~46 min']);
  });
  it('tempo.corte nunca manda tirar um isolador obrigatório', () => {
    for (const p of [SCHOENFELD_5, THOMAS_ABC]) for (const i of achado(dePublicado(p), 'tempo')!.itens) expect(i).not.toMatch(/tire (cadeira extensora|panturrilha|tríceps francês)/);
  });
  it('ordem.sessao é só informação', () => {
    expect(achado(dePublicado(THOMAS_ABC), 'ordem')).toMatchObject({ gravidade: 'info', itens: ['C'] });
  });
});

describe('os 4 programas publicados (b-monte-e-avaliador.md, seção 2): o avaliador acha o que o protótipo achou', () => {
  const regras = (p: ProgramaPublicado) => new Set(dePublicado(p).achados.filter((x) => x.gravidade !== 'info').map((x) => x.regraId));
  it('Schoenfeld 2019, 3 séries: quadríceps acima de 20; posteriores, panturrilha e abdômen sem série; uma função no peito e no glúteo; isoladores; a coxa', () => {
    expect([...regras(SCHOENFELD_3)].sort()).toEqual(
      ['avaliador.equilibrio.coxa', 'selecao.exercicios-por-musculo', 'selecao.gluteo', 'selecao.isolador-obrigatorio', 'volume.semanal.abdomen', 'volume.semanal.minimo-eficaz', 'volume.semanal.teto-padrao'].sort(),
    );
  });
  it('Schoenfeld 2019, 5 séries: 21 exercícios com 5 séries, quadríceps com 15 numa sessão, dias de ~90 min em 60', () => {
    const a = dePublicado(SCHOENFELD_5);
    expect(regras(SCHOENFELD_5)).toEqual(new Set([...regras(SCHOENFELD_3), 'volume.series-por-exercicio', 'volume.sessao.teto', 'frequencia.musculo', 'tempo.corte']));
    expect(a.dias.map((d) => d.minutos)).toEqual([90, 90, 90]);
  });
  it('Thomas e Burns 2016: 6 a 9 séries num exercício, bíceps e tríceps num dia só, sem extensora, abdômen com 3, dias acima de 60 min', () => {
    expect([...regras(THOMAS_ABC)].sort()).toEqual(
      ['frequencia.musculo', 'selecao.isolador-obrigatorio', 'tempo.corte', 'volume.semanal.abdomen', 'volume.series-por-exercicio', 'volume.sessao.teto'].sort(),
    );
  });
  it('Carneiro 2024: 10 séries num exercício; peito, costas e quadríceps com uma função só; sem extensora nem tríceps acima da cabeça', () => {
    expect([...regras(CARNEIRO_5)].sort()).toEqual(['selecao.exercicios-por-musculo', 'selecao.isolador-obrigatorio', 'volume.series-por-exercicio'].sort());
  });
});

describe('avisosDoAvaliador: o que o gerador ainda não avisa, com o próximo passo pela rotina', () => {
  it('converte só os tipos que o gerador não avisa, com "Mudar a rotina"', () => {
    const a = dePublicado(SCHOENFELD_3);
    const avisos = avisosDoAvaliador(a, { diasSemana: 3, minutosSessao: 60 });
    expect(avisos.map((x) => x.regraId)).toEqual(['avaliador.equilibrio.coxa']);
    expect(avisos[0]!.texto).toMatch(/^Frente × trás da coxa fora do equilíbrio: quadríceps × posteriores 27 × 0 séries por semana\. Com 3 treinos de 60 min, .*Mudar a rotina ou a divisão/);
  });
  it('funções, isoladores e empurrar ÷ puxar, cada um com o fato e a rotina como próximo passo', () => {
    const doCarneiro = avisosDoAvaliador(dePublicado(CARNEIRO_5), { diasSemana: 5, minutosSessao: 60 });
    expect(doCarneiro.map((x) => x.texto.split('. Com')[0])).toEqual([
      'Uma função só na semana: peito só com empurrar horizontal',
      'Uma função só na semana: costas só com puxar horizontal (remada)',
      'Uma função só na semana: quadríceps só com agachar',
      'Fica de fora o isolador que cobre o que os multiarticulares não cobrem: tríceps acima da cabeça (tríceps francês na polia com corda) e extensora (cadeira extensora)',
    ]);
    const empurra = avaliar({ dias: [{ nome: 'A', exercicios: [ex('supino-reto'), ex('desenvolvimento'), ex('remada-baixa')] }] }, base, academia);
    expect(avisosDoAvaliador(empurra, { diasSemana: 1 as Perfil['diasSemana'], minutosSessao: 60 }).find((x) => x.regraId === 'avaliador.equilibrio.empurrar-puxar')!.texto).toMatch(
      /^Mais empurrar que puxar: 6 × 3 séries por semana\. Com 1 treino de 60 min/,
    );
  });
});
