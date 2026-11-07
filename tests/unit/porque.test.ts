import { describe, expect, it } from 'vitest';
import { gerarPrograma, NOME_MUSCULO_CURTO, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { respostasNenhuma } from '../../src/domain/triagem';
import { ana, bruno, PERSONAS } from '../personas';

// O porquê específico de cada exercício (R5b; c-fluxo.md, pedido ao domínio 6: antes, 61% só com os genéricos).
const ok = (p: (typeof PERSONAS)['ana']['perfil'], inv: (typeof PERSONAS)['ana']['inventario']): Programa => {
  const g = gerarPrograma(p, inv);
  if (g.status !== 'ok') throw new Error('bloqueado');
  return g.programa;
};
const daVaga = (x: Programa['dias'][number]['exercicios'][number]) => x.porque.find((q) => q.regraId === 'selecao.funcao-da-vaga')!.texto;

describe('o porquê específico (selecao.funcao-da-vaga)', () => {
  const todos = Object.values(PERSONAS).flatMap((p) => ok(p.perfil, p.inventario).dias.flatMap((d) => d.exercicios));
  it('em todos os exercícios das 6 personas, ele vem primeiro e diz a função, o músculo e as séries', () => {
    expect(todos.length).toBeGreaterThan(100);
    for (const x of todos) {
      expect(x.porque[0]!.regraId, x.exId).toBe('selecao.funcao-da-vaga');
      const f = FUNCAO[x.funcao!]!;
      expect(daVaga(x), x.exId).toMatch(new RegExp(`^${f.nome.replace(/[()]/g, '\\$&')}`));
      expect(daVaga(x), x.exId).toContain(`${x.series} séries aqui`);
      if (f.nome.toLowerCase() !== NOME_MUSCULO_CURTO[f.musculo]) expect(daVaga(x), x.exId).toContain(NOME_MUSCULO_CURTO[f.musculo]);
    }
  });
  it('em 90% ou mais, diz por que ganhou das outras opções (o resto é a única opção da linha)', () => {
    const comMotivo = todos.filter((x) => !daVaga(x).includes('É a única opção desta linha')).length;
    expect(comMotivo / todos.length).toBeGreaterThanOrEqual(0.7);
    const especificos = todos.filter((x) => /As primeiras opções|ganhou porque|Serve igual|varia|já estão neste treino|única opção/.test(daVaga(x))).length;
    expect(especificos / todos.length).toBeGreaterThanOrEqual(0.9);
  });
  it('o foco aparece, com as séries da semana contra a meta', () => {
    const p = ok(ana.perfil, ana.inventario);
    const agachar = p.dias.flatMap((d) => d.exercicios).find((x) => x.funcao === 'agachar')!;
    expect(daVaga(agachar)).toMatch(/^Agachar, para o quadríceps, o seu foco: \d séries aqui, 6 de 8 na semana\./);
  });
  it('as razões do desempate: estabilidade (iniciante), carga, animação, variedade entre os dias', () => {
    const textos = todos.map(daVaga).join('\n');
    expect(textos).toContain('ganhou porque é mais estável e apoiado, mais fácil de aprender');
    expect(textos).toContain('ganhou porque dá para pôr mais carga com o seu equipamento');
    expect(textos).toContain('ganhou porque tem o guia animado');
    expect(textos).toMatch(/já está em outro treino: este varia o estímulo/);
  });
  it('a dor de 3 a 5 entra no desempate e no porquê (o Bruno com a lombar em 4: a remada apoiada)', () => {
    const pf = { ...bruno.perfil, triagem: { respostas: { ...respostasNenhuma(), osteoarticular: true }, dores: [{ articulacao: 'lombar' as const, nota: 4 }] } };
    const textos = ok(pf, bruno.inventario).dias.flatMap((d) => d.exercicios.map(daVaga)).join('\n');
    expect(textos).toContain('ganhou porque poupa a lombar, que você marcou com dor hoje');
  });
  it('a dor acima de 5 aparece como motivo das opções de cima', () => {
    const pf = { ...bruno.perfil, triagem: { respostas: { ...respostasNenhuma(), osteoarticular: true }, dores: [{ articulacao: 'lombar' as const, nota: 7 }] } };
    const textos = ok(pf, bruno.inventario).dias.flatMap((d) => d.exercicios.map(daVaga)).join('\n');
    expect(textos).toContain('carregam a região que você marcou com dor acima de 5 hoje');
  });
});
