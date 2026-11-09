// Lê um export do app ("Meus dados" → "Guardar uma cópia") e imprime o que a frente D mediu no simulador, agora com
// o uso real: os tipos de sugestão, os "estagnados", as semanas leves e as calibrações longas (R5a; d-longo-prazo.md,
// opção 1e). Nada sai do computador: o script só lê o arquivo e imprime números. Nunca versione um export real.
//
// Uso: npx vite-node scripts/export/ler-export.ts -- caminho/do/export.json
//      (com --json, imprime o resumo em JSON, para colar só os números agregados no devlog, se o Gustavo quiser)
import { readFileSync } from 'node:fs';
import { semanaLeveDoEstado } from '../../src/features/acompanhamento/acoes';
import { diaDoTreino, inventarioDoTreino, opcoesDaCarga } from '../../src/features/treino/acoes';
import { prescricaoDaVaga, semanaLocal, diaLocal, sugestaoDoExercicio, treinoFeito, type Sessao } from '../../src/domain/sessao';
import { importarJson } from '../../src/storage/arquivo';
import type { Estado } from '../../src/storage/esquema';

export type ResumoDoExport = {
  treinos: number;
  /** Sessões guardadas sem nenhuma série (antes do R5a, "Começar" + "Terminar" sem querer). */
  semSerie: number;
  semanasComTreino: number;
  /** Quantas vezes cada sugestão apareceu, na hora de cada exercício feito (subir, manter, estagnado, calibrar…). */
  sugestoes: Record<string, number>;
  /** Maior sequência de "estagnado" seguidos num mesmo exercício. */
  estagnadoSeguidoMax: number;
  /** Exercícios que ficaram estagnados em algum momento. */
  exerciciosEstagnados: number;
  /** Semanas (do calendário) em que a semana leve estava sugerida em algum treino. */
  semanasComSemanaLeveSugerida: number;
  /** Treinos feitos durante uma semana leve aceita. */
  treinosEmSemanaLeve: number;
  /** Séries de acerto da calibração e exercícios com mais de 3 sessões seguidas só de acerto. */
  seriesDeAcerto: number;
  calibracoesLongas: number;
  calibracaoSeguidaMax: number;
  /** Séries com nota de dor (3 a 5 e acima de 5) e exercícios interrompidos. */
  dor3a5: number;
  dorAcima5: number;
  interrompidos: number;
};

/** O resumo de um estado exportado: refaz, treino a treino, o que o app mostrou naquele dia. Função pura. */
export function resumirExport(e: Estado): ResumoDoExport {
  const feitos = e.historico.filter(treinoFeito);
  const sugestoes: Record<string, number> = {};
  const estagSeguido: Record<string, number> = {};
  const calSeguida: Record<string, number> = {};
  let estagnadoSeguidoMax = 0;
  let calibracaoSeguidaMax = 0;
  const estagnados = new Set<string>();
  const longas = new Set<string>();
  const semanasLeve = new Set<number>();
  for (let k = 0; k < e.historico.length; k++) {
    const s: Sessao = e.historico[k]!;
    if (!treinoFeito(s)) continue;
    const antes: Estado = { ...e, historico: e.historico.slice(0, k), sessaoAtual: undefined };
    if (e.programa && semanaLeveDoEstado(antes, s.inicio)?.sugerir) semanasLeve.add(semanaLocal(diaLocal(s.inicio)));
    const dia = e.programa ? diaDoTreino(antes, s)?.dia : undefined;
    const inv = inventarioDoTreino(antes, s);
    const opc = opcoesDaCarga(antes, s);
    for (const feito of s.exercicios) {
      if (!feito.series.length) continue;
      const vaga = dia?.exercicios.find((x) => (x.noLugarDe ?? x.exId) === (feito.noLugarDe ?? feito.exId));
      if (vaga) {
        const x = feito.exId === vaga.exId ? vaga : prescricaoDaVaga(vaga, feito.exId);
        const sug = sugestaoDoExercicio(antes.historico, x, inv, opc);
        sugestoes[sug.acao] = (sugestoes[sug.acao] ?? 0) + 1;
        estagSeguido[feito.exId] = sug.acao === 'estagnado' ? (estagSeguido[feito.exId] ?? 0) + 1 : 0;
        if (sug.acao === 'estagnado') estagnados.add(feito.exId);
        estagnadoSeguidoMax = Math.max(estagnadoSeguidoMax, estagSeguido[feito.exId]!);
      }
      const soAcerto = feito.series.every((x) => x.calibracao);
      calSeguida[feito.exId] = soAcerto ? (calSeguida[feito.exId] ?? 0) + 1 : 0;
      if (calSeguida[feito.exId]! > 3) longas.add(feito.exId);
      calibracaoSeguidaMax = Math.max(calibracaoSeguidaMax, calSeguida[feito.exId]!);
    }
  }
  const series = feitos.flatMap((s) => s.exercicios.flatMap((x) => x.series));
  return {
    treinos: feitos.length,
    semSerie: e.historico.length - feitos.length,
    semanasComTreino: new Set(feitos.map((s) => semanaLocal(diaLocal(s.inicio)))).size,
    sugestoes,
    estagnadoSeguidoMax,
    exerciciosEstagnados: estagnados.size,
    semanasComSemanaLeveSugerida: semanasLeve.size,
    treinosEmSemanaLeve: feitos.filter((s) => s.semanaLeve).length,
    seriesDeAcerto: series.filter((x) => x.calibracao).length,
    calibracoesLongas: longas.size,
    calibracaoSeguidaMax,
    dor3a5: series.filter((x) => (x.dor ?? 0) >= 3 && (x.dor ?? 0) <= 5).length,
    dorAcima5: series.filter((x) => (x.dor ?? 0) > 5).length,
    interrompidos: feitos.flatMap((s) => s.exercicios).filter((x) => x.interrompido).length,
  };
}

/** O texto do resumo, em pt-BR. */
export function textoDoResumo(r: ResumoDoExport): string {
  const total = Object.values(r.sugestoes).reduce((a, b) => a + b, 0);
  const pct = (n: number) => (total ? `${Math.round((n / total) * 100)}%` : '—');
  const linhas = [
    `Treinos feitos: ${r.treinos} em ${r.semanasComTreino} semanas (sessões sem série guardadas: ${r.semSerie})`,
    `Sugestões (${total}): ${Object.entries(r.sugestoes)
      .sort((a, b) => b[1] - a[1])
      .map(([k, n]) => `${k} ${n} (${pct(n)})`)
      .join(' · ')}`,
    `"Estagnado": ${r.sugestoes.estagnado ?? 0} vezes, em ${r.exerciciosEstagnados} exercícios; no máximo ${r.estagnadoSeguidoMax} seguidos no mesmo exercício`,
    `Semana leve: sugerida em ${r.semanasComSemanaLeveSugerida} semanas; ${r.treinosEmSemanaLeve} treinos feitos em semana leve`,
    `Calibração: ${r.seriesDeAcerto} séries de acerto; ${r.calibracoesLongas} exercícios com mais de 3 sessões seguidas só de acerto (máximo ${r.calibracaoSeguidaMax})`,
    `Dor: ${r.dor3a5} séries com nota de 3 a 5, ${r.dorAcima5} acima de 5; ${r.interrompidos} exercícios interrompidos`,
  ];
  return linhas.join('\n');
}

/** Lê o texto de um export (o mesmo formato da importação, com a migração de versão). */
export function lerExport(texto: string): ResumoDoExport {
  const r = importarJson(texto);
  if (!r.ok) throw new Error(r.erro);
  return resumirExport(r.estado);
}

// Só roda como script (no teste, o Vitest importa o arquivo). O vite-node tira o nome do script dos argumentos.
const comoScript = !process.env.VITEST;
const caminho = comoScript ? process.argv.slice(2).find((a) => !a.startsWith('--')) : undefined;
if (comoScript && !caminho) console.log('Uso: npx vite-node scripts/export/ler-export.ts -- caminho/do/export.json [--json]');
if (caminho) {
  const r = lerExport(readFileSync(caminho, 'utf8'));
  console.log(process.argv.includes('--json') ? JSON.stringify(r, null, 2) : textoDoResumo(r));
}
