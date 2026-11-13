// Compara dois geradores caso a caso (sessão "treino para todos", etapa 2): em quais perfis da população um defeito
// aparece no "depois" sem existir no "antes", e em quais some. Serve para achar o mecanismo de cada piora antes de uma
// regra entrar ("nenhum defeito pior em nenhum grupo"). Uso:
//   npx vite-node scripts/auditoria/novos-defeitos.ts -- --antes <gerador.ts> --depois <gerador.ts> [--passo 23] [--desde 0]
//     [--exemplos 3] [--so A2,C1] [--cuidados] [--notas] [--indice 11658]
// `--passo N` mede um caso a cada N (amostra fixa: sem sorteio). Sem `--cuidados`, só os 9 defeitos da régua oficial;
// com `--notas`, também as notas da régua e dos cuidados.
import { resolve } from 'node:path';
import type { contextoDeSelecao as Ctx, gerarPrograma as Gerar, Programa } from '../../src/domain/gerador';
import { MEDIDAS, medirCuidados, type MedidaId } from './cuidados';
import { nomeDoCasoP, populacao } from './populacao';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
type Motor = { gerarPrograma: typeof Gerar; contextoDeSelecao: typeof Ctx };
const carregar = async (p: string) => (await import(/* @vite-ignore */ resolve(p))) as Motor;
const [antes, depois] = [await carregar(arg('--antes') ?? 'src/domain/gerador/index.ts'), await carregar(arg('--depois') ?? 'src/domain/gerador/index.ts')];
const PASSO = Number(arg('--passo')) || 23;
const DESDE = Number(arg('--desde')) || 0;
const EXEMPLOS = Number(arg('--exemplos') ?? 3);
const SO = arg('--so')?.split(',');
const COM_CUIDADOS = args.includes('--cuidados');
const COM_NOTAS = args.includes('--notas');
const INDICE = arg('--indice') !== undefined ? Number(arg('--indice')) : undefined;

const resumo = (p: Programa) =>
  p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}${x.dropSet ? '+drop' : ''}${x.supersetCom ? '+bi' : ''}`).join(', ')}`).join('\n      ');

type Linha = { novos: number; somem: number; pesoNovos: number; pesoSomem: number; exemplos: string[] };
const T: Record<string, Linha> = {};
const linha = (k: string) => (T[k] ??= { novos: 0, somem: 0, pesoNovos: 0, pesoSomem: 0, exemplos: [] });
let medidos = 0;
let diferentes = 0;
for (const caso of populacao()) {
  if (INDICE !== undefined ? caso.indice !== INDICE : caso.indice % PASSO !== DESDE % PASSO) continue;
  const [ra, rb] = [antes.gerarPrograma(caso.pf, caso.cen.inventario), depois.gerarPrograma(caso.pf, caso.cen.inventario)];
  medidos++;
  if (ra.status !== 'ok' || rb.status !== 'ok') {
    if (ra.status !== rb.status) linha(`status ${ra.status} → ${rb.status}`).novos++;
    continue;
  }
  const [ca, cb] = [
    medirCuidados(ra.programa, caso.pf, caso.cen.inventario, antes.contextoDeSelecao(caso.pf, caso.cen.inventario)),
    medirCuidados(rb.programa, caso.pf, caso.cen.inventario, depois.contextoDeSelecao(caso.pf, caso.cen.inventario)),
  ];
  const chaves = (c: typeof ca) =>
    new Set<string>([
      ...[...c.regua.defeitos].map((d) => `régua ${d}`),
      ...(COM_NOTAS ? [...c.regua.notas].map((d) => `régua nota ${d}`) : []),
      ...(COM_CUIDADOS || COM_NOTAS ? [...c.falhas].filter((k) => (MEDIDAS[k].tipo === 'defeito' ? COM_CUIDADOS : COM_NOTAS)).map((k) => `${k} ${MEDIDAS[k].nome}`) : []),
    ]);
  const [da, db] = [chaves(ca), chaves(cb)];
  if (INDICE !== undefined) console.log(`${nomeDoCasoP(caso)}\n  antes [${[...da].join(', ')}]:\n      ${resumo(ra.programa)}\n  depois [${[...db].join(', ')}]:\n      ${resumo(rb.programa)}`);
  if (resumo(ra.programa) !== resumo(rb.programa)) diferentes++;
  for (const k of db)
    if (!da.has(k) && (!SO || SO.some((s) => k.includes(s)))) {
      const l = linha(k);
      l.novos++;
      l.pesoNovos += caso.peso;
      if (l.exemplos.length < EXEMPLOS) {
        const id = k.split(' ')[0] as MedidaId;
        l.exemplos.push(`  ${nomeDoCasoP(caso)} [${caso.indice}]${cb.detalhe[id] ? `\n    detalhe: ${cb.detalhe[id]}` : ''}\n    antes:\n      ${resumo(ra.programa)}\n    depois:\n      ${resumo(rb.programa)}`);
      }
    }
  for (const k of da)
    if (!db.has(k) && (!SO || SO.some((s) => k.includes(s)))) {
      const l = linha(k);
      l.somem++;
      l.pesoSomem += caso.peso;
    }
}
console.log(`${medidos} casos medidos (1 a cada ${PASSO}); ${diferentes} programas diferentes.`);
for (const [k, l] of Object.entries(T).sort((a, b) => b[1].novos - a[1].novos)) {
  console.log(`\n${k}: aparece em ${l.novos}, some em ${l.somem} (saldo ${l.novos - l.somem})`);
  for (const e of l.exemplos) console.log(e);
}
