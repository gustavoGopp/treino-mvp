// Páginas para a revisão cega de um pacote da etapa 2 (sessão "treino para todos"): para cada perfil fictício de uma
// lista, a semana de dois geradores, embaralhadas por um hash fixo (sem sorteio) e sem dizer qual é qual. Uso:
//   npx vite-node --root / $PWD/scripts/auditoria/paginas-cegas.ts -- --perfis <perfis.json> --antes <gerador.ts>
//     --depois <gerador.ts> --saida <pasta> [--rodada p0] [--prefixo P]
// `perfis.json`: [{ "id": "k1", "descricao": "…", "pedido": { cenario, nivel, dias, min, focos, dores, semanasParado } }]
// (o `pedido` é o de scripts/auditoria/ver-lib.ts). Grava <pasta>/<P>NN.md e <pasta>/chave.json.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { gerarPrograma } from '../../src/domain/gerador';
import { semanaDe, semanaEmTexto } from './exemplos';
import { inventarioDe, perfilDe, type Pedido } from './ver-lib';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
type Gerar = typeof gerarPrograma;
const carregar = async (caminho: string) => ((await import(/* @vite-ignore */ resolve(caminho))) as { gerarPrograma: Gerar }).gerarPrograma;
const [antes, depois] = [await carregar(arg('--antes')!), await carregar(arg('--depois')!)];
const perfis = JSON.parse(readFileSync(arg('--perfis')!, 'utf8')) as { id: string; descricao: string; pedido: Pedido }[];
const saida = arg('--saida')!;
const RODADA = arg('--rodada') ?? '';
const PREFIXO = arg('--prefixo') ?? 'P';

/** Hash fixo (FNV-1a), o mesmo de exemplos.ts. */
const hash = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

mkdirSync(saida, { recursive: true });
const paginas = perfis.flatMap((p) => {
  const [perfil, inventario] = [perfilDe(p.pedido), inventarioDe(p.pedido.cenario)];
  return ([['antes', antes], ['depois', depois]] as const).map(([versao, gerar]) => {
    const r = gerar(perfil, inventario);
    return { p, versao, texto: r.status === 'ok' ? semanaEmTexto(semanaDe(r.programa), false) : 'O app não montou programa.' };
  });
});
const ordem = [...paginas].sort((a, b) => hash(`${a.p.id}:${a.versao}:cega${RODADA}`) - hash(`${b.p.id}:${b.versao}:cega${RODADA}`));
const chave: Record<string, { pessoa: string; versao: string }> = {};
ordem.forEach((pg, i) => {
  const cod = `${PREFIXO}${String(i + 1).padStart(2, '0')}`;
  chave[cod] = { pessoa: pg.p.id, versao: pg.versao };
  writeFileSync(join(saida, `${cod}.md`), `# Semana ${cod}\n\n**A pessoa:** ${pg.p.descricao}\n\n${pg.texto}\n`);
});
writeFileSync(join(saida, 'chave.json'), `${JSON.stringify(chave, null, 1)}\n`);
const iguais = perfis.filter((p) => new Set(paginas.filter((x) => x.p.id === p.id).map((x) => x.texto)).size === 1).map((p) => p.id);
console.log(`${ordem.length} páginas em ${saida}; perfis com as duas páginas iguais: ${iguais.join(', ') || 'nenhum'}`);
