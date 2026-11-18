// Confere o texto do guia animado dos exercícios dos lotes já escritos (docs/revisoes/animacoes-restantes/textos/<id>.json),
// preparado antes da ligação (plano.md, seção 6). Lê a pasta inteira; cada arquivo tem de ser de um lote de LOTES
// (lotes.json), e cada exercício desses lotes tem de ter o seu arquivo. Para cada arquivo:
// 1. valida com o formato do texto do guia (conteudoExercicioSchema) mais o campo `carga` do cartão;
// 2. confere que os campos do cartão (src/conteudo/exercicios/<id>.json) estão iguais, inclusive `carga`, e que a
//    montagem do cartão virou a nota "Montagem segura" (e só ela);
// 3. confere que os títulos dos erros batem, na ordem, com os da ficha de movimento da animação
//    (src/engine/novo/dados/movimentos/<id>.json), menos os erros sem desenho da lista SEM_DESENHO do teste da ponte.
// Uso: npx vite-node scripts/animacao-nova/conferir-textos-restantes.ts
// Só lê; não grava nada.
import { readFileSync, readdirSync } from 'node:fs';
import { z } from 'zod';
import { cartaoTextoSchema, conteudoExercicioSchema } from '../../src/conteudo/schema';

const PASTA = 'docs/revisoes/animacoes-restantes/textos';
const LOTES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'B1'];
const CAMPOS_DO_CARTAO = ['id', 'name', 'short', 'target', 'setupEq', 'setupBody', 'exec', 'range', 'cues', 'errors', 'carga'] as const;

const textoDoGuia = conteudoExercicioSchema.extend({ carga: z.string().min(1) }).strict();

type Lote = { id: string; ids: string[] };
const lotes = (JSON.parse(readFileSync('docs/revisoes/animacoes-restantes/lotes.json', 'utf8')) as { lotes: Lote[] }).lotes;
const esperados = lotes.filter((l) => LOTES.includes(l.id)).flatMap((l) => l.ids);

// a lista SEM_DESENHO vem do próprio teste, para não haver duas listas
const teste = readFileSync('tests/unit/motor-novo-ponte.test.ts', 'utf8');
const literal = /const SEM_DESENHO: Record<string, string\[\]> = (\{[^\n]*\});/.exec(teste)?.[1];
if (!literal) throw new Error('não achei a lista SEM_DESENHO em tests/unit/motor-novo-ponte.test.ts');
const SEM_DESENHO = JSON.parse(literal.replace(/'/g, '"')) as Record<string, string[]>;

const lerJson = (arquivo: string): unknown => JSON.parse(readFileSync(arquivo, 'utf8'));
const igual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

const problemas: string[] = [];
const arquivos = readdirSync(PASTA).filter((a) => a.endsWith('.json'));
const ids = arquivos.map((a) => a.replace(/\.json$/, ''));
for (const id of esperados) if (!ids.includes(id)) problemas.push(`${id}: falta o arquivo do texto do guia`);
for (const id of ids) if (!esperados.includes(id)) problemas.push(`${id}: não é dos lotes ${LOTES.join(', ')}`);

for (const id of ids.filter((i) => esperados.includes(i))) {
  const bruto = lerJson(`${PASTA}/${id}.json`);
  const texto = textoDoGuia.safeParse(bruto);
  if (!texto.success) {
    problemas.push(`${id}: formato: ${texto.error.issues.map((i) => `${i.path.join('.')} ${i.message}`).join('; ')}`);
    continue;
  }
  const t = texto.data;
  if (t.id !== id) problemas.push(`${id}: o id do arquivo é ${t.id}`);

  const cartao = cartaoTextoSchema.parse(lerJson(`src/conteudo/exercicios/${id}.json`));
  for (const campo of CAMPOS_DO_CARTAO) if (!igual(t[campo], cartao[campo])) problemas.push(`${id}: o campo ${campo} difere do cartão`);
  // a ordem dos campos do cartão também é a mesma (a animação desenha os erros na ordem do texto)
  const ordem = Object.keys(bruto as object).filter((k) => (CAMPOS_DO_CARTAO as readonly string[]).includes(k));
  const ordemCartao = Object.keys(cartao).filter((k) => (CAMPOS_DO_CARTAO as readonly string[]).includes(k));
  if (!igual(ordem, ordemCartao)) problemas.push(`${id}: a ordem dos campos do cartão mudou`);

  if (cartao.montagem) {
    if (!t.note?.startsWith('<b>Montagem segura:</b> ')) problemas.push(`${id}: o cartão tem montagem e a nota não começa com "<b>Montagem segura:</b>"`);
  } else if (t.note) problemas.push(`${id}: o cartão não tem montagem e o texto tem nota`);

  const movimento = lerJson(`src/engine/novo/dados/movimentos/${id}.json`) as { erros: { titulo: string }[] };
  const semDesenho = SEM_DESENHO[id] ?? [];
  const doTexto = t.errors.map((e) => e.title).filter((titulo) => !semDesenho.includes(titulo));
  const daAnimacao = movimento.erros.map((e) => e.titulo);
  if (!igual(doTexto, daAnimacao)) problemas.push(`${id}: erros do texto [${doTexto.join(' | ')}] ≠ da animação [${daAnimacao.join(' | ')}]`);
  for (const titulo of semDesenho) if (!t.errors.some((e) => e.title === titulo)) problemas.push(`${id}: o erro sem desenho "${titulo}" não está no texto`);
}

if (problemas.length) {
  console.error(`${problemas.length} problema(s):\n${problemas.map((p) => `- ${p}`).join('\n')}`);
  process.exit(1);
}
console.log(`ok: ${ids.length} textos do guia conferidos (de ${esperados.length} dos lotes ${LOTES.join(', ')}): formato, campos do cartão e erros da animação.`);
