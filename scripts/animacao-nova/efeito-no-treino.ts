// O que muda no treino gerado quando um lote de exercícios ganha animação (frente das animações restantes, 17/11/2026).
// O gerador usa "tem o guia animado" (animacaoId) como último critério de desempate entre exercícios equivalentes
// (src/domain/gerador/index.ts). Este script liga, só na memória, o animacaoId dos exercícios de cada lote (somando os
// lotes anteriores) e compara os programas das personas e de uma amostra da grade do estresse com os de hoje.
// Uso: npx vite-node scripts/animacao-nova/efeito-no-treino.ts -- [--amostra N] [--ate <lote>] [--saida <arquivo.json>]
// Os lotes vêm de docs/revisoes/animacoes-restantes/lotes.json. Não grava nada em src/; só lê.
import { readFileSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA, POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, type Programa } from '../../src/domain/gerador';
import { PERSONAS, LOCAIS_DO_BRUNO } from '../../tests/personas';
import { grade, perfil, nomeDoCaso } from '../auditoria/cenarios';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const amostra = Number(arg('--amostra') ?? 20);
const ate = arg('--ate');
const saida = arg('--saida');

type Lote = { id: string; nome: string; ids: string[] };
const LOTES = (JSON.parse(readFileSync('docs/revisoes/animacoes-restantes/lotes.json', 'utf8')) as { lotes: Lote[] }).lotes;
for (const l of LOTES) for (const id of l.ids) if (!POR_ID[id] || POR_ID[id]!.animacaoId) throw new Error(`${l.id}: ${id} não é um exercício sem animação`);

type Caso = { nome: string; gerar: () => ReturnType<typeof gerarPrograma> };
const casos: Caso[] = [];
for (const [k, p] of Object.entries(PERSONAS)) casos.push({ nome: `persona ${k}`, gerar: () => gerarPrograma(p.perfil, p.inventario) });
for (const [i, l] of LOCAIS_DO_BRUNO.entries()) casos.push({ nome: `persona bruno, local ${i + 1}`, gerar: () => gerarPrograma(PERSONAS.bruno.perfil, l.inventario) });
for (const c of grade({ amostra })) {
  const pf = perfil({ nivel: c.nivel, divisao: c.divisao, minutos: c.minutos, prioridades: c.prioridade.grupos, dores: c.dor.dores });
  casos.push({ nome: nomeDoCaso(c), gerar: () => gerarPrograma(pf, c.cenario.inventario) });
}

const resumo = (p: Programa) => p.dias.map((d) => d.exercicios.map((x) => x.exId));
const rodar = () => casos.map((c) => {
  const r = c.gerar();
  return r.status === 'ok' ? resumo(r.programa) : null;
});

const base = rodar();
const original = new Map(BIBLIOTECA.map((e) => [e.id, e.animacaoId]));
const resultado: unknown[] = [];
for (const lote of LOTES) {
  for (const id of lote.ids) POR_ID[id]!.animacaoId = id;
  const agora = rodar();
  let mudou = 0;
  const trocas = new Map<string, number>();
  const personas: string[] = [];
  agora.forEach((p, i) => {
    const b = base[i];
    if (JSON.stringify(p) === JSON.stringify(b)) return;
    mudou++;
    const antes = new Set((b ?? []).flat());
    const depois = new Set((p ?? []).flat());
    const saiu = [...antes].filter((x) => !depois.has(x));
    const entrou = [...depois].filter((x) => !antes.has(x));
    const chave = `${saiu.join('+') || '(ordem)'} → ${entrou.join('+') || '(ordem)'}`;
    trocas.set(chave, (trocas.get(chave) ?? 0) + 1);
    if (casos[i]!.nome.startsWith('persona')) personas.push(`${casos[i]!.nome}: ${chave}`);
  });
  const linha = {
    lote: lote.id,
    nome: lote.nome,
    casos: casos.length,
    mudaram: mudou,
    porcento: Math.round((1000 * mudou) / casos.length) / 10,
    personas,
    trocas: [...trocas].sort((a, b) => b[1] - a[1]).slice(0, 12),
  };
  resultado.push(linha);
  console.log(`\n## ${lote.id} (${lote.nome}), somado aos anteriores: ${mudou} de ${casos.length} programas mudam (${linha.porcento}%)`);
  for (const p of personas) console.log(`  ${p}`);
  for (const [t, n] of linha.trocas) console.log(`  ${n}× ${t}`);
  if (lote.id === ate) break;
}
for (const [id, a] of original) POR_ID[id]!.animacaoId = a;
if (saida) writeFileSync(saida, JSON.stringify(resultado, null, 1));
