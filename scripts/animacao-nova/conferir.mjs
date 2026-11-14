// npm run conferir:animacao: a conferência automática das animações do motor novo.
// Percorre todos os quadros de cada animação e escreve o relatório, por exercício, em cm e graus.
// Sai com erro (código 1) se houver alguma falha. Uso: node scripts/animacao-nova/conferir.mjs [id]
import { mkdirSync, writeFileSync } from 'node:fs';
import { motorNovo } from './empacotar.mjs';

const { modulo: m } = await motorNovo();
const corpo = m.CORPOS.homem;
const todos = [m.goblet, m.supinoReto, m.puxadaUnilateral, m.flexao];
const alvo = process.argv[2];
const lista = alvo ? todos.filter((e) => e.ficha.id === alvo) : todos;
const SINAL = { ok: 'ok', aviso: 'AVISO', falha: 'FALHA' };
let md = `# Conferência automática das animações novas\n\nGerado por \`npm run conferir:animacao\` (60 quadros por segundo, ciclo inteiro). Corpo: ${corpo.populacao}.\n\n`;
md += `"ok" = dentro do limite; "AVISO" = possível, mas fora da média ou ainda provisório (precisa do ok do Gustavo); "FALHA" = não pode ir para o app.\n\n`;
let falhas = 0;
const resumo = [];
const json = {};
for (const ex of lista) {
  const r = m.conferir(ex, corpo);
  json[r.id] = r;
  falhas += r.falhas;
  resumo.push(`| ${r.id} | ${r.quadros} | ${r.itens.length} | ${r.falhas} | ${r.avisos} |`);
  md += `## ${ex.ficha.nome} (\`${r.id}\`)\n\n${r.quadros} quadros conferidos. ${r.falhas} falha(s), ${r.avisos} aviso(s).\n\n`;
  md += `Ângulos no ciclo (lado direito, graus): ${Object.entries(r.angulos).map(([k, [a, b]]) => `${k} ${a.toFixed(0)} a ${b.toFixed(0)}`).join('; ')}.\n\n`;
  md += `| grupo | o que foi medido | resultado | limite | |\n|---|---|---|---|---|\n`;
  for (const i of r.itens) md += `| ${i.grupo} | ${i.oQue} | ${i.medido} | ${i.limite} | ${SINAL[i.nivel]} |\n`;
  md += '\n';
  console.log(`${r.id.padEnd(20)} ${r.quadros} quadros  falhas ${r.falhas}  avisos ${r.avisos}`);
  for (const i of r.itens.filter((x) => x.nivel !== 'ok')) console.log(`   ${SINAL[i.nivel]}  ${i.grupo}: ${i.oQue} → ${i.medido}`);
}
const pv = m.provisorios(corpo);
md = md.replace('\n\n"ok"', `\n\n| animação | quadros | itens | falhas | avisos |\n|---|---|---|---|---|\n${resumo.join('\n')}\n\n"ok"`);
md += `## Medidas ainda provisórias nas tabelas\n\nEstas linhas ainda não têm fonte lida. Não são falha de uma animação, e sim pendência das tabelas: cada uma precisa de fonte (ou do ok do Gustavo como escolha de desenho) antes do critério de pronto.\n\n### Corpo (${pv.corpo.length})\n${pv.corpo.map((x) => `- ${x}`).join('\n')}\n\n### Objetos (${pv.objetos.length})\n${pv.objetos.map((x) => `- ${x}`).join('\n')}\n`;
if (!alvo) {
  mkdirSync('docs/revisoes/animacao-nova/prototipos', { recursive: true });
  writeFileSync('docs/revisoes/animacao-nova/prototipos/conferencia.md', md);
  writeFileSync('docs/revisoes/animacao-nova/prototipos/conferencia.json', JSON.stringify(json, null, 1));
  console.log('relatório: docs/revisoes/animacao-nova/prototipos/conferencia.md');
}
console.log(`provisórias: corpo ${pv.corpo.length}, objetos ${pv.objetos.length}`);
process.exit(falhas ? 1 : 0);
