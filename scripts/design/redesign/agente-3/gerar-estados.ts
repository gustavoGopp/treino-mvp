// Agente 3 do redesign (06/11/2026): gera o estado salvo de cada persona fictícia (tests/personas) pelo próprio
// domínio, para o Playwright injetar no IndexedDB e abrir o treino sem passar pelo cadastro.
// Também imprime um mapa do que cada treino pede da tela (tipo de carga, drop set, cartão de texto, sem guia).
// Uso: npx vite-node scripts/design/redesign/agente-3/gerar-estados.ts
// Saída: reports/design/redesign/agente-3/estados/<persona>.json e mapa.json (fora do git).
import { mkdirSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA } from '../../../../src/domain/biblioteca';
import { opcoesCarga } from '../../../../src/domain/sessao';
import { CARTOES } from '../../../../src/conteudo';
import type { Estado } from '../../../../src/storage/esquema';
import { LOCAIS_DO_BRUNO, PERSONAS, type Persona } from '../../../../tests/personas';
import { dia, estadoDe, treinar } from '../../../../tests/unit/apoio-treino';

const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const DIR = 'reports/design/redesign/agente-3/estados';
mkdirSync(DIR, { recursive: true });

/** Estado com o aviso aceito (o cadastro completo), para o app abrir direto no programa. */
function completo(p: Persona, locais?: Estado['locais']): Estado {
  const e = estadoDe(p, locais);
  return { ...e, avisoAceitoEm: dia(-1) };
}

/** Uma semana de treinos (todos os dias do programa), para o treino seguinte vir com a sugestão de carga. */
function comHistorico(e: Estado): Estado {
  const dias = e.programa!.programa.dias.map((d) => d.id);
  let s = e;
  // os treinos ficam em dias passados perto de hoje: até 6 dias antes de agora, para não cair em pausa
  const hoje = Math.floor((Date.now() - Date.UTC(2026, 9, 5)) / 86_400_000);
  dias.forEach((d, i) => (s = treinar(s, hoje - dias.length + i, d)));
  return s;
}

const mapa: Record<string, unknown> = {};
for (const [chave, p] of Object.entries(PERSONAS)) {
  const locais = chave === 'bruno' ? LOCAIS_DO_BRUNO : undefined;
  const e = completo(p, locais);
  writeFileSync(`${DIR}/${chave}.json`, JSON.stringify(e));
  writeFileSync(`${DIR}/${chave}-historico.json`, JSON.stringify(comHistorico(e)));
  const inv = p.inventario;
  mapa[chave] = e.programa!.programa.dias.map((d) => ({
    dia: d.nome,
    id: d.id,
    minutos: d.minutosEstimados,
    exercicios: d.exercicios.map((x) => {
      const op = opcoesCarga(x.exId, inv);
      return {
        exId: x.exId,
        nome: x.nome,
        series: x.series,
        reps: x.reps,
        rir: x.rir,
        descansoSeg: x.descansoSeg,
        unilateral: x.unilateral,
        dropSet: !!x.dropSet,
        registro: op.registro,
        lista: op.lista?.length,
        animacao: !!x.animacaoId,
        cartao: !x.animacaoId && !!CARTOES[x.exId],
        semGuia: !x.animacaoId && !CARTOES[x.exId],
        alternativas: x.alternativas.length,
        cargaBiblioteca: POR_ID[x.exId]?.carga,
      };
    }),
  }));
}
writeFileSync(`${DIR}/mapa.json`, JSON.stringify(mapa, null, 1));
for (const [k, dias] of Object.entries(mapa) as [string, { dia: string; exercicios: Record<string, unknown>[] }[]][]) {
  console.log(`\n== ${k}`);
  for (const d of dias) {
    console.log(` ${d.dia}:`);
    for (const x of d.exercicios)
      console.log(
        `   ${x.nome} · ${x.series}×${(x.reps as number[]).join('–')} · ${x.registro}${x.lista ? `(${x.lista})` : ''}${x.unilateral ? ' · unilateral' : ''}${x.dropSet ? ' · DROP SET' : ''}${x.cartao ? ' · CARTÃO' : ''}${x.semGuia ? ' · SEM GUIA' : ''}`,
      );
  }
}
