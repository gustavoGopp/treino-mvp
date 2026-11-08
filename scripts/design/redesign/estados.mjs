// Redesign (06/11/2026): monta o estado guardado no aparelho de cada persona fictícia (tests/personas), com o programa
// gerado pelo gerador real e um histórico curto de treinos, para as capturas "antes" (antes.spec.ts) e as medidas de base.
// Nada aqui toca o app: é só uma ferramenta de documentação. Saída: reports/design/redesign/estados/<persona>.json
// Uso: node scripts/design/redesign/estados.mjs
import { build } from 'esbuild';
import { mkdirSync, writeFileSync } from 'node:fs';

const entrada = `
  export * from './tests/personas/index.ts';
  export { gerarPrograma } from './src/domain/gerador/index.ts';
  export { estadoSchema, VERSAO_ESTADO } from './src/storage/esquema.ts';
`;
const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' });
const M = await import('data:text/javascript;base64,' + Buffer.from(outputFiles[0].text).toString('base64'));

// Relógio parado: quinta-feira 05/11/2026, 12:00 em Brasília (o mesmo das capturas da revisão de design).
const AGORA = new Date('2026-11-05T15:00:00.000Z');
const dias = (n) => new Date(AGORA.getTime() - n * 86_400_000).toISOString();
const respostasNivel = { iniciante: { tempoContinuo: 'menos-6m', tecnica: 'sim' }, intermediario: { tempoContinuo: '6-24m', tecnica: 'sim' }, avancado: { tempoContinuo: 'mais-24m', tecnica: 'sim' } };

/** Uma sessão feita do dia `i` do programa há `haDias` dias, com as séries prescritas (carga plausível por tipo). */
function sessao(programa, i, haDias, localId) {
  const d = programa.dias[i % programa.dias.length];
  const inicio = dias(haDias);
  return {
    id: `s-${haDias}`,
    diaId: d.id,
    semana: 1,
    inicio,
    fim: new Date(Date.parse(inicio) + 48 * 60_000).toISOString(),
    localId,
    hojeFoi: 'normal',
    exercicios: d.exercicios.map((x) => ({
      exId: x.exId,
      series: Array.from({ length: x.series }, () => ({ carga: { tipo: 'kg', kg: 10 }, reps: Math.round((x.reps[0] + x.reps[1]) / 2), rir: 2 })),
    })),
  };
}

mkdirSync('reports/design/redesign/estados', { recursive: true });
const resumo = [];
for (const [chave, p] of Object.entries(M.PERSONAS)) {
  const perfil = p.perfil;
  const locais = chave === 'bruno' ? M.LOCAIS_DO_BRUNO : [{ id: 'local-1', nome: 'Meu local', inventario: p.inventario }];
  const r = M.gerarPrograma(perfil, p.inventario);
  if (r.status !== 'ok') throw new Error(`${chave}: programa bloqueado`);
  const programa = r.programa;
  // histórico: 2 semanas de treino (os dias do programa em sequência), a última sessão há 2 dias
  const n = Math.min(programa.dias.length * 2, 6);
  const historico = Array.from({ length: n }, (_, k) => sessao(programa, k, 2 + (n - 1 - k) * 3, locais[0].id)).sort((a, b) => a.inicio.localeCompare(b.inicio));
  const estado = {
    versao: M.VERSAO_ESTADO,
    avisoAceitoEm: dias(30),
    triagem: { respostas: perfil.triagem.respostas, ...(perfil.triagem.dores ? { dores: perfil.triagem.dores } : {}) },
    nivel: { respostas: { ...respostasNivel[perfil.nivel], semanasParado: perfil.semanasParado }, escolhido: perfil.nivel },
    rotina: { diasSemana: perfil.diasSemana, minutosSessao: perfil.minutosSessao, prioridades: perfil.prioridades, ...(perfil.objetivo ? { objetivo: perfil.objetivo } : {}) },
    locais,
    localPrincipalId: locais[0].id,
    restricoes: { evitarExercicios: perfil.evitarExercicios, evitarEquipamentos: perfil.evitarEquipamentos },
    programa: { programa, geradoEm: dias(30), localId: locais[0].id },
    historico,
  };
  const ok = M.estadoSchema.safeParse(estado);
  if (!ok.success) throw new Error(`${chave}: estado inválido: ${JSON.stringify(ok.error.issues.slice(0, 3))}`);
  writeFileSync(`reports/design/redesign/estados/${chave}.json`, JSON.stringify(estado));
  resumo.push(`${p.nome}: ${programa.divisao}, ${programa.dias.length} dias, ${programa.dias.map((d) => d.exercicios.length).join('/')} exercícios, ${historico.length} sessões`);
}
console.log(resumo.join('\n'));
