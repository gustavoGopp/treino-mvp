// O que o pacote do app leva dos dados do motor do Boneco (src/engine/novo/dados/): só o que o desenho lê.
//
// Cada tabela e cada ficha de movimento traz, ao lado do número, de onde ele saiu: a fonte, a página, o que a ficha da
// técnica pede, o que muda em cada erro. Isso serve à conferência, às folhas e aos testes, que leem os arquivos
// inteiros; no celular, o motor só lê o número (`corpo.m()`, `obj()`, `daFicha()`), as fases, os erros e os rótulos.
// No build, o Vite passa cada arquivo por `enxugar` (vite.config.ts), que troca esses textos por "-" (as tabelas
// continuam válidas: a validação pede um texto, não um texto longo) e mantém as chaves (a tabela confere que cada
// fonte citada existe).
//
// O que garante que nada do desenho muda: tests/motor/motor-novo.spec.ts monta o motor com esta mesma função e
// compara os quadros com a linha de base das animações aprovadas e a ficha que as telas recebem com a do motor inteiro.
//
// Medida (pacote D4, 23/11/2026, kB comprimidos): cada ficha de movimento vai de 2,4 para 1,0 em média; a tabela do
// corpo do homem, de 5,5 para 1,8, e a da mulher, de 4,2 para 1,7. Os objetos já eram enxugados desde 20/11/2026.

/** Os arquivos de dados do motor que o build enxuga. */
export const DADOS_ENXUGADOS = /src\/engine\/novo\/dados\/(objetos\.json|objetos\/[^/]+\.json|corpo-(homem|mulher)\.json|segmentos\.json|boneco\.json|movimentos\/[^/]+\.json)$/;

const semTexto = (fontes) => Object.fromEntries(Object.keys(fontes).map((k) => [k, '-']));

function objetos(t) {
  t.fontes = semTexto(t.fontes);
  for (const ob of Object.values(t.objetos)) {
    ob.nome = '-';
    for (const m of Object.values(ob.medidas)) {
      m.onde = '-';
      delete m.nota;
    }
  }
  return t;
}

function corpo(t) {
  t.fontes = semTexto(t.fontes);
  t.populacao = '-';
  for (const m of Object.values(t.medidas)) {
    m.onde = '-';
    delete m.nota;
  }
  for (const secoes of Object.values(t.secoes)) for (const s of secoes) s.origem = '-';
  for (const anel of t.tronco) anel.origem = '-';
  return t;
}

function segmentos(t) {
  t.fonte = '-';
  t.nota = '-';
  return t;
}

function boneco(t) {
  t.origem = '-';
  t.comoLer = {};
  return t;
}

function movimento(t) {
  t.fichaDaTecnica = '-';
  t.fontes = semTexto(t.fontes);
  for (const linha of Object.values(t.param)) linha.o = '-';
  for (const regra of t.regras) regra.pede = '-';
  for (const erro of t.erros) erro.oQueMuda = '-';
  return t;
}

/**
 * O JSON de um arquivo de dados do motor, sem os textos que o desenho não lê. Devolve `null` para os outros arquivos.
 * `caminho` é o caminho do arquivo (com barras normais); `texto`, o conteúdo dele.
 */
export function enxugar(caminho, texto) {
  const m = DADOS_ENXUGADOS.exec(caminho.split('?')[0].replace(/\\/g, '/'));
  if (!m) return null;
  const t = JSON.parse(texto);
  const qual = m[1];
  const limpo = qual.startsWith('objetos') ? objetos(t) : qual.startsWith('corpo-') ? corpo(t) : qual === 'segmentos.json' ? segmentos(t) : qual === 'boneco.json' ? boneco(t) : movimento(t);
  return JSON.stringify(limpo);
}
