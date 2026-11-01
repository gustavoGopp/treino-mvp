// Coloca no app uma animação aprovada pelo Gustavo (ritual em docs/pesquisa/animacoes/README.md):
// 1) move o motor e o texto da pasta revisao/; 2) põe na lista EX (depois das existentes);
// 3) liga o exercício da biblioteca à animação. Depois: ATUALIZAR_NOVAS=1 npx playwright test --project=motor
// Uso: node scripts/aprovar-animacao.mjs <id-da-animacao> <id-do-exercicio-na-biblioteca>
import { existsSync, readFileSync, renameSync, writeFileSync } from 'node:fs';

const [id, exercicio] = process.argv.slice(2);
if (!id || !exercicio) throw new Error('uso: node scripts/aprovar-animacao.mjs <animacao> <exercicio-da-biblioteca>');
const de = (p) => `src/${p}/revisao/${id}`;
for (const [orig, dest] of [
  [`${de('engine/exercicios')}.ts`, `src/engine/exercicios/${id}.ts`],
  [`${de('conteudo')}.json`, `src/conteudo/exercicios/${id}.json`],
]) {
  if (!existsSync(orig)) throw new Error(`não achei ${orig}`);
  writeFileSync(dest, readFileSync(orig, 'utf8').replaceAll("from '../../", "from '../").replace('Animação nova (em revisão).', 'Animação nova (aprovada).'));
  renameSync(orig, `/tmp/${id}-${Date.now()}-${dest.split('/').pop()}`);
}

const indice = 'src/engine/exercicios/index.ts';
const nomeVar = id.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
let s = readFileSync(indice, 'utf8');
if (!s.includes(`from './${id}'`)) {
  s = s.replace(/(\nimport [a-zA-Z]+ from '\.\/[a-z-]+';)(?![\s\S]*\nimport [a-zA-Z]+ from)/, `$1\nimport ${nomeVar} from './${id}';`);
  s = s.replace(/\n\];\s*$/, `\n  ${nomeVar},\n];\n`);
  writeFileSync(indice, s);
}

const bib = 'src/domain/biblioteca/exercicios.json';
const dados = JSON.parse(readFileSync(bib, 'utf8'));
const alvo = dados.find((e) => e.id === exercicio);
if (!alvo) throw new Error(`exercício ${exercicio} não está na biblioteca`);
alvo.animacaoId = id;
writeFileSync(bib, JSON.stringify(dados, null, 1));
console.log(`${id} aprovado e ligado a ${exercicio}. Agora: ATUALIZAR_NOVAS=1 npx playwright test --project=motor`);
