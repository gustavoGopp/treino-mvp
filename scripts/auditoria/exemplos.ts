// As pessoas-exemplo da sessão "treino para todos" (12/11/2026): para cada uma, a semana que o app dá hoje e a semana
// do protótipo, em linguagem simples. Uso:
//   npx vite-node scripts/auditoria/exemplos.ts -- --saida <pasta>      (um JSON com as duas semanas de cada pessoa)
//   npx vite-node scripts/auditoria/exemplos.ts -- --cega <pasta>       (páginas embaralhadas para a revisão cega + chave)
//   ... --antes <gerador.ts> --depois <gerador.ts>   (etapa 2: os dois geradores a comparar; sem eles, o app e o protótipo.
//       Para a `main`, um worktree dela fora do repositório e `npx vite-node --root / <caminho inteiro deste script>`.)
// Só personas fictícias (tests/personas). A ordem das páginas da revisão cega é fixa (sem sorteio): vem de um hash do nome.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { POR_ID } from '../../src/domain/biblioteca';
import { gerarPrograma, MUSCULOS_COM_META, NOME_MUSCULO_CURTO, seriesDeVolume, type Perfil, type Programa } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { PERSONAS, type Persona } from '../../tests/personas';
import { PERSONAS_NOVAS } from '../../tests/personas/todos';
import { perfilDe, inventarioDe, type Pedido } from './ver-lib';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
type Gerar = typeof gerarPrograma;
const carregar = async (caminho: string | undefined, padrao: () => Promise<{ gerarPrograma: unknown }>) =>
  (caminho ? ((await import(/* @vite-ignore */ resolve(caminho))) as { gerarPrograma: unknown }) : await padrao()).gerarPrograma as Gerar;
const gerarAntes = await carregar(arg('--antes'), async () => ({ gerarPrograma }));
const gerarNovo = await carregar(arg('--depois'), () => import('./prototipo/gerador'));

export type Caso = { id: string; nome: string; descricao: string; perfil: Perfil; inventario: Inventario };
const persona = (id: string, p: Persona): Caso => ({ id, nome: p.nome, descricao: p.descricao, perfil: p.perfil, inventario: p.inventario });
const perfilFicticio = (id: string, nome: string, descricao: string, pedido: Pedido): Caso => ({ id, nome, descricao, perfil: perfilDe(pedido), inventario: inventarioDe(pedido.cenario) });

/** As 12 pessoas dos exemplos: as 6 personas do projeto e as 6 novas. */
export const DOZE: Caso[] = [...Object.entries(PERSONAS), ...Object.entries(PERSONAS_NOVAS)].map(([id, p]) => persona(id, p));
/** Mais 6 perfis para a revisão cega, tirados dos piores grupos do retrato e do caso mais comum. */
export const EXTRAS: Caso[] = [
  perfilFicticio('x1', 'Perfil X1', 'Iniciante; em casa, com halteres montáveis (2 a 18 kg) e elásticos; 2 dias de 30 min; sem grupo de foco.', { cenario: 'casa', nivel: 'iniciante', dias: '2', min: 30, focos: [], dores: [], semanasParado: 0 }),
  perfilFicticio('x2', 'Perfil X2', 'Avançado; academia completa; 5 dias de 90 min; sem grupo de foco.', { cenario: 'academia', nivel: 'avancado', dias: '5', min: 90, focos: [], dores: [], semanasParado: 0 }),
  perfilFicticio('x3', 'Perfil X3', 'Intermediária; academia completa; 4 dias de 60 min; marcou dor no ombro, nota 7 hoje; sem grupo de foco.', { cenario: 'academia', nivel: 'intermediario', dias: '4', min: 60, focos: [], dores: [{ articulacao: 'ombro', nota: 7 }], semanasParado: 0 }),
  perfilFicticio('x4', 'Perfil X4', 'Iniciante; em casa, sem equipamento nenhum; 3 dias de 45 min; quer glúteos.', { cenario: 'vazio', nivel: 'iniciante', dias: '3', min: 45, focos: ['gluteos'], dores: [], semanasParado: 0 }),
  perfilFicticio('x5', 'Perfil X5', 'Intermediário; academia do condomínio (multifuncional com puxador e remada, halteres de 2 a 20 kg, banco regulável, bola); 3 dias de 60 min; quer peito e costas.', { cenario: 'condominio', nivel: 'intermediario', dias: '3', min: 60, focos: ['peito', 'costas'], dores: [], semanasParado: 0 }),
  perfilFicticio('x6', 'Perfil X6', 'Avançada; halteres de 1 a 12 kg e banco reto; 4 dias de 75 min; quer pernas.', { cenario: 'halteres-banco', nivel: 'avancado', dias: '4', min: 75, focos: ['pernas'], dores: [], semanasParado: 0 }),
];

const tempo = (seg: number) => (seg % 60 ? `${Math.floor(seg / 60)} min ${seg % 60} s` : `${seg / 60} min`);
const fmt = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');

export type Semana = {
  divisao: string;
  dias: { nome: string; minutos: number; linhas: string[] }[];
  series: Record<string, number>;
  totalSeries: number;
  totalMin: number;
  exercicios: number;
  avisos: string[];
};

export function semanaDe(p: Programa): Semana {
  return {
    divisao: p.divisao,
    dias: p.dias.map((d) => ({
      nome: d.nome,
      minutos: d.minutosEstimados,
      linhas: d.exercicios.map((x) => {
        const e = POR_ID[x.exId]!;
        const extra = [x.supersetCom ? `em dupla com ${POR_ID[x.supersetCom]!.nome.toLowerCase()}, sem descanso entre os dois` : '', x.dropSet ? 'a última série continua com menos peso, sem descanso (drop set)' : ''].filter(Boolean);
        return `${x.series} × ${x.reps[0]} a ${x.reps[1]} · ${e.nome}${x.unilateral ? ' (cada lado)' : ''} · parar com ${x.rir[0]} a ${x.rir[1]} de sobra · descanso ${tempo(x.descansoSeg)}${extra.length ? ` · ${extra.join('; ')}` : ''}`;
      }),
    })),
    series: Object.fromEntries(MUSCULOS_COM_META.map((m) => [NOME_MUSCULO_CURTO[m], Math.round((p.volumeSemanal[m] ?? 0) * 10) / 10])),
    totalSeries: p.dias.flatMap((d) => d.exercicios).reduce((t, x) => t + seriesDeVolume(x), 0),
    totalMin: p.dias.reduce((t, d) => t + d.minutosEstimados, 0),
    exercicios: new Set(p.dias.flatMap((d) => d.exercicios.map((x) => x.exId))).size,
    avisos: p.avisos.map((a) => a.texto),
  };
}

export const semanaEmTexto = (s: Semana, comAvisos = true): string =>
  [
    `Divisão: ${s.divisao}`,
    ...s.dias.flatMap((d) => ['', `**${d.nome}** (cerca de ${d.minutos} min)`, ...d.linhas.map((l) => `- ${l}`)]),
    '',
    `Séries por semana: ${Object.entries(s.series).map(([m, n]) => `${m} ${fmt(n)}`).join(' · ')}`,
    `Na semana: ${s.totalSeries} séries, ${s.exercicios} exercícios diferentes, cerca de ${s.totalMin} min de treino.`,
    ...(comAvisos && s.avisos.length ? ['', 'O que o app avisa:', ...s.avisos.map((a) => `- ${a}`)] : []),
  ].join('\n');

export function asDuas(c: Caso): { hoje: Semana | null; nova: Semana | null } {
  const a = gerarAntes(c.perfil, c.inventario);
  const b = gerarNovo(c.perfil, c.inventario);
  return { hoje: a.status === 'ok' ? semanaDe(a.programa) : null, nova: b.status === 'ok' ? semanaDe(b.programa) : null };
}

/** Hash fixo (FNV-1a) para embaralhar sem sorteio. */
const hash = (s: string) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

const RODADA = arg('--rodada') ?? '';
const saida = arg('--saida');
const cega = arg('--cega');
if (saida) {
  mkdirSync(saida, { recursive: true });
  const dados = DOZE.map((c) => ({ id: c.id, nome: c.nome, descricao: c.descricao, ...asDuas(c) }));
  writeFileSync(join(saida, 'semanas.json'), `${JSON.stringify(dados, null, 1)}\n`);
  for (const d of dados) writeFileSync(join(saida, `${d.id}.txt`), `# ${d.nome}\n${d.descricao}\n\n## HOJE\n${d.hoje ? semanaEmTexto(d.hoje) : 'sem programa'}\n\n## PROPOSTA\n${d.nova ? semanaEmTexto(d.nova) : 'sem programa'}\n`);
  console.log(`${dados.length} pessoas em ${saida}`);
}
if (cega) {
  mkdirSync(cega, { recursive: true });
  const paginas = [...DOZE, ...EXTRAS].flatMap((c) => {
    const { hoje, nova } = asDuas(c);
    return [
      { caso: c, versao: 'hoje', semana: hoje },
      { caso: c, versao: 'proposta', semana: nova },
    ];
  });
  const ordem = [...paginas].sort((a, b) => hash(`${a.caso.id}:${a.versao}:cega${RODADA}`) - hash(`${b.caso.id}:${b.versao}:cega${RODADA}`));
  const chave: Record<string, { pessoa: string; versao: string }> = {};
  ordem.forEach((pg, i) => {
    const cod = `S${String(i + 1).padStart(2, '0')}`;
    chave[cod] = { pessoa: pg.caso.id, versao: pg.versao };
    // A pessoa aparece sem o nome: só a descrição (o nome ligaria as duas versões da mesma pessoa de forma óbvia demais).
    writeFileSync(join(cega, `${cod}.md`), `# Semana ${cod}\n\n**A pessoa:** ${pg.caso.descricao}\n\n${pg.semana ? semanaEmTexto(pg.semana, false) : 'O app não montou programa.'}\n`);
  });
  writeFileSync(join(cega, 'chave.json'), `${JSON.stringify(chave, null, 1)}\n`);
  console.log(`${ordem.length} páginas em ${cega}`);
}
