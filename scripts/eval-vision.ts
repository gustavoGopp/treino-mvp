// Mede o acerto da visão com as fotos reais da academia (privado/, fora do git) contra o gabarito.
// Critérios do plano (seção a.3): recall ≥ 85% e precisão ≥ 90% nos itens com confiança alta.
// Itens de "nao_tem" que aparecem como alta contam como falso positivo grave.
// Uso (na máquina que tem privado/ e ANTHROPIC_API_KEY): npx tsx scripts/eval-vision.ts [modelo ...]
// Gasta dinheiro de verdade: uma chamada por modelo com todas as fotos.
import Anthropic from '@anthropic-ai/sdk';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { reconhecer } from '../api/_lib/modelo';
import { validarSugestoes } from '../src/domain/visao';

const MODELOS = process.argv.slice(2).length ? process.argv.slice(2) : ['claude-haiku-5-5', 'claude-sonnet-5-5', 'claude-opus-5-5'];
// US$ por milhão de tokens (entrada, saída), conferidos na referência da API em 01/11/2026.
const PRECO: Record<string, [number, number]> = { 'claude-haiku-5-5': [0.1, 0.5], 'claude-sonnet-5-5': [2, 10], 'claude-opus-5-5': [4, 20] };

const pasta = 'privado';
if (!existsSync(join(pasta, 'gabarito.json'))) throw new Error('falta privado/gabarito.json (roda só na máquina que tem privado/)');
const gabarito = JSON.parse(readFileSync(join(pasta, 'gabarito.json'), 'utf8')) as { tem: unknown[]; nao_tem: unknown[] };
const ids = (xs: unknown[]) => xs.map((x) => (typeof x === 'string' ? x : ((x as { id?: string; itemId?: string }).id ?? (x as { itemId?: string }).itemId)) as string);
const tem = new Set(ids(gabarito.tem));
const naoTem = new Set(ids(gabarito.nao_tem));

// Mesmo preparo do aparelho: lado maior ≤ 1568 px, JPEG novo sem metadados (ffmpeg).
const fotosOrig = readdirSync(pasta).filter((f) => /\.(jpe?g|png|heic)$/i.test(f)).sort().slice(0, 5);
const tmp = mkdtempSync(join(tmpdir(), 'eval-vision-'));
const fotos = fotosOrig.map((f, i) => {
  const saida = join(tmp, `foto-${i + 1}.jpg`);
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(pasta, f), '-vf', "scale='if(gt(iw,ih),min(1568,iw),-2)':'if(gt(iw,ih),-2,min(1568,ih))'", '-map_metadata', '-1', '-q:v', '3', saida]);
  return readFileSync(saida).toString('base64');
});

const client = new Anthropic();
const linhas: string[] = [];
for (const modelo of MODELOS) {
  const t0 = Date.now();
  const { json, uso } = await reconhecer(client, fotos, modelo);
  const seg = (Date.now() - t0) / 1000;
  const sug = validarSugestoes(json);
  const alta = new Set(sug.filter((s) => s.confianca === 'alta').map((s) => s.itemId as string));
  const acertos = [...alta].filter((id) => tem.has(id)).length;
  const recall = tem.size ? acertos / tem.size : 0;
  const precisao = alta.size ? acertos / alta.size : 0;
  const graves = [...alta].filter((id) => naoTem.has(id));
  const [pIn, pOut] = PRECO[modelo] ?? [NaN, NaN];
  const custo = (uso.input * pIn + uso.output * pOut) / 1e6;
  const passa = recall >= 0.85 && precisao >= 0.9 && graves.length === 0;
  linhas.push(
    `| ${modelo} | ${(recall * 100).toFixed(0)}% | ${(precisao * 100).toFixed(0)}% | ${graves.join(', ') || '—'} | ${custo.toFixed(4)} | ${seg.toFixed(1)} s | ${passa ? 'sim' : 'não'} |`,
  );
  console.log(modelo, { recall, precisao, graves, custo, seg, faltaram: [...tem].filter((id) => !alta.has(id)) });
}
const relatorio = [
  `# Eval da visão (${new Date().toISOString().slice(0, 10)}): ${fotos.length} fotos, ${tem.size} itens no gabarito`,
  '',
  '| Modelo | Recall (alta) | Precisão (alta) | Falsos positivos graves | Custo (US$) | Tempo | Passa? |',
  '|---|---|---|---|---|---|---|',
  ...linhas,
  '',
  'Escolha pelo plano: o modelo mais barato que passa. Resultado agregado pode ir para o devlog; as fotos nunca.',
].join('\n');
writeFileSync(join(pasta, `eval-vision-${new Date().toISOString().slice(0, 10)}.md`), relatorio + '\n');
console.log('\n' + relatorio);
