import { describe, expect, it } from 'vitest';
import frases from '../../src/conteudo/frases-das-regras.json';
import { frasesDasRegrasSchema } from '../../src/conteudo/frasesDasRegras';
import regras from '../../src/domain/regras/regras.json';

// A frase em linguagem simples de cada regra (src/conteudo/frases-das-regras.json) é só outra redação: a regra não muda.
// Estes testes seguram o que dá para conferir sem ler: toda regra tem a sua frase, nenhuma frase traz o jargão de quem
// desenvolve, e nenhum número aparece numa frase sem estar no texto ou nos valores da regra dela.
const palavras = (t: string) => t.trim().split(/\s+/).length;
const JARGAO = /\bR\d+[a-z]?\b|\bR5-[A-Za-z]+|pesquisa-v2|\.md\b|`|\*\*|\d{2}\/\d{2}\/\d{4}|\bGustavo\b|\brégua\b|\bauditoria\b|\bG\d\b|—/;
/** Os números de um texto: "1.500" e "1,5" viram "1500" e "1.5"; o número de um passo ("1)", "2)") não conta. */
const numeros = (t: string) =>
  [...t.replace(/(\d)\.(\d{3})\b/g, '$1$2').replace(/(^|\s)\d+\)\s+(?=[a-zà-ú“])/g, ' ').matchAll(/\d+(?:[.,]\d+)?/g)].map((m) => m[0].replace(',', '.'));
// Números que a frase escreve em algarismo e a regra escreve por extenso, ou que vêm de uma conta que a regra dá em
// palavras. Cada exceção diz de onde o número vem.
const EXCECOES: Record<string, string[]> = {};
// Regras com muitos passos, faixas ou condições de dor, em que a frase curta deixava de fora um limite que muda o que a
// pessoa entende (revisão independente de 17/11/2026). Nas de segurança, privacidade e dados, nada pode sair.
const LONGAS = [
  'deload.semana-leve',
  'readaptacao.durante-uso',
  'readaptacao.semana1',
  'avaliador.gravidade',
  'progressao.calibracao',
  'selecao.gluteo',
  'selecao.dia-sem-principal',
  'selecao.funcao-da-vaga',
];

const porId = new Map(regras.map((r) => [r.id, r]));
const lista = Object.entries(frasesDasRegrasSchema.parse(frases));

describe('frases das regras em linguagem simples', () => {
  it('toda regra tem a sua frase, e não há frase de regra que não existe', () => {
    expect(Object.keys(frases).sort()).toEqual(regras.map((r) => r.id).sort());
  });

  it('o título tem até 8 palavras, sem dois-pontos e sem ponto final', () => {
    const fora = lista.filter(([, f]) => palavras(f.titulo) > 8 || /[:.]$|: /.test(f.titulo)).map(([id, f]) => `${id}: ${f.titulo}`);
    expect(fora).toEqual([]);
  });

  it('a frase tem até 80 palavras; as de segurança, privacidade e dados, e as regras de muitos passos, até 220', () => {
    const limite = (id: string) => (/^(seguranca|privacidade|dados|visao)\./.test(id) || LONGAS.includes(id) ? 220 : 80);
    const fora = lista.filter(([id, f]) => palavras(f.frase) > limite(id)).map(([id, f]) => `${id}: ${palavras(f.frase)}`);
    expect(fora).toEqual([]);
  });

  it('nenhuma frase traz o jargão de quem desenvolve (siglas de etapa, arquivos, datas de decisão)', () => {
    const fora = lista.filter(([, f]) => JARGAO.test(f.titulo) || JARGAO.test(f.frase)).map(([id, f]) => `${id}: ${JARGAO.exec(`${f.titulo} ${f.frase}`)?.[0]}`);
    expect(fora).toEqual([]);
  });

  it('todo número de uma frase está no texto ou nos valores da regra dela', () => {
    const fora: string[] = [];
    for (const [id, f] of lista) {
      const r = porId.get(id)!;
      const daRegra = new Set(numeros(`${r.regra} ${JSON.stringify(r.valores)}`));
      const novos = [...new Set(numeros(`${f.titulo} ${f.frase}`))].filter((n) => !daRegra.has(n) && !(EXCECOES[id] ?? []).includes(n));
      if (novos.length) fora.push(`${id}: ${novos.join(', ')}`);
    }
    expect(fora).toEqual([]);
  });
});
