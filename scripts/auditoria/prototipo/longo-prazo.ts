// PROTÓTIPO (sessão "treino para todos", etapa 1): o que a pessoa ouve em 24 semanas, hoje e com o aviso de platô pelo
// ritmo esperado do nível. Mesmo praticante simulado de scripts/auditoria/progressao.ts (o corpo é um MODELO, sem
// pretensão de evidência), em 3 ritmos de ganho de força: [modelo] iniciante +1% por semana, intermediário +0,4%,
// avançado +0,15% (a ordem de grandeza segue steele2023: +30 a 50% no 1º ano, achatando em 1 a 2 anos).
// Hoje: "estagnado" depois de 3 sessões seguidas com a mesma carga, sem melhora. Protótipo: a janela cresce com o
// nível (iniciante 3, intermediário 5, avançado 8 sessões; consenso, sem ensaio). Não muda nada em src/domain.
// Uso: npx vite-node scripts/auditoria/prototipo/longo-prazo.ts -- [--saida <pasta>]
import { mkdirSync, writeFileSync } from 'node:fs';
import { POR_ID } from '../../../src/domain/biblioteca';
import { sugerirProgressao, valorDaCarga, type Carga, type SessaoExercicio, type Sugestao } from '../../../src/domain/progressao';
import { RIR, type Nivel } from '../../../src/domain/regras';
import { noInventario, opcoesCarga } from '../../../src/domain/sessao';
import type { Inventario } from '../../../src/domain/taxonomia/equipamentos';

type Caso = { id: string; nome: string; exId: string; inventario: Inventario; forca: number; barraKg?: number; menorAnilha?: number; /** kg do corpo que o exercício já move (panturrilha). */ corpoKg?: number };
const KG_PLACA = 5;
const TRENO = 50;
const CORPO = 75;
const DEGRAU = 1.15;

const CASOS: Caso[] = [
  { id: 'halter-1kg', nome: 'Supino com halteres fixos de 1 a 12 kg, de 1 em 1 kg', exId: 'supino-reto', inventario: { halteres_fixos: { minKg: 1, maxKg: 12, passoKg: 1 }, banco_reto: {} }, forca: 14 },
  { id: 'halter-2kg', nome: 'Supino com halteres fixos de 2 a 40 kg, de 2 em 2 kg', exId: 'supino-reto', inventario: { halteres_fixos: { minKg: 2, maxKg: 40, passoKg: 2 }, banco_reto: {} }, forca: 24 },
  { id: 'halter-esparso', nome: 'Supino com só 2 pares de halteres (5 e 10 kg)', exId: 'supino-reto', inventario: { halteres_fixos: { minKg: 5, maxKg: 10, passoKg: 5 }, banco_reto: {} }, forca: 9 },
  {
    id: 'manoplas',
    nome: 'Goblet com halteres montáveis de casa (2 a 18 kg)',
    exId: 'goblet',
    inventario: { anilhas_e_manoplas: { manoplas: 2, manoplaKg: 2, anilhas: [{ kg: 1, qtd: 4 }, { kg: 2, qtd: 4 }, { kg: 5, qtd: 4 }] } },
    forca: 26,
  },
  { id: 'kettlebell', nome: 'Goblet com kettlebells de 8, 12 e 16 kg', exId: 'goblet-kettlebell', inventario: { kettlebell: { pesosKg: [8, 12, 16] } }, forca: 17 },
  { id: 'barra-2kg', nome: 'Agachamento com barra, menor anilha de 2 kg', exId: 'agachamento-barra', inventario: { barra_longa: { pesoBarraKg: 20, menorAnilhaKg: 2 }, rack_de_agachamento: {} }, forca: 80, barraKg: 20, menorAnilha: 2 },
  { id: 'barra-5kg', nome: 'Agachamento com barra, menor anilha de 5 kg', exId: 'agachamento-barra', inventario: { barra_longa: { pesoBarraKg: 20, menorAnilhaKg: 5 }, rack_de_agachamento: {} }, forca: 80, barraKg: 20, menorAnilha: 5 },
  { id: 'barra-1kg', nome: 'Rosca com barra W, anilhas de 1 kg', exId: 'rosca-barra-w', inventario: { barra_w: {} }, forca: 30, barraKg: 10, menorAnilha: 1 },
  { id: 'leg-press', nome: 'Leg press, menor anilha de 5 kg', exId: 'leg-press', inventario: { leg_press: { menorAnilhaKg: 5 } }, forca: 160 },
  { id: 'placa-pesada', nome: 'Cadeira extensora (torre de 15 placas)', exId: 'cadeira-extensora', inventario: { cadeira_extensora: { placas: 15 } }, forca: 60 },
  { id: 'placa-leve', nome: 'Elevação lateral na polia (torre de 15 placas)', exId: 'elevacao-lateral', inventario: { estacao_polia_dupla: { placas: 15 } }, forca: 14 },
  { id: 'graviton', nome: 'Barra fixa no graviton (contrapeso, 10 placas)', exId: 'barra-fixa-graviton', inventario: { graviton: { placas: 10 } }, forca: 70 },
  { id: 'peso-corpo', nome: 'Flexão de braço (peso do corpo, escada de dificuldade)', exId: 'flexao', inventario: {}, forca: 1.35 },
  { id: 'elastico', nome: 'Remada com elástico (3 intensidades)', exId: 'remada-elastico', inventario: { elasticos: { intensidades: 3 } }, forca: 1.4 },
  { id: 'panturrilha-sem-halter', nome: 'Panturrilha no chão, para quem não tem halteres (só elásticos)', exId: 'panturrilha-chao', inventario: { elasticos: { intensidades: 3 } }, forca: 120, corpoKg: 75 },
];

/** Carga efetiva em kg do modelo (ou em "esforço relativo" no degrau). */
function efetiva(c: Carga, caso: Caso): number {
  switch (c.tipo) {
    case 'kg':
      return c.kg + (caso.corpoKg ?? 0);
    case 'placa':
      return c.placa * KG_PLACA;
    case 'anilha':
      return TRENO + 2 * c.kgPorLado;
    case 'contrapeso':
      return CORPO - c.placa * KG_PLACA;
    case 'degrau':
      return DEGRAU ** c.degrau;
  }
}
/** Primeira carga: a maior do que existe em que a 1ª série passa do mínimo da faixa (como depois da calibração). */
function cargaInicial(caso: Caso, reps: [number, number], rir: number): Carga {
  const op = opcoesCarga(caso.exId, caso.inventario);
  const cabe = (c: Carga) => 30 * (caso.forca / efetiva(c, caso) - 1) - rir >= reps[0] + 1;
  const cands: Carga[] =
    op.registro === 'kg'
      ? op.lista?.length
        ? op.lista.map((kg) => ({ tipo: 'kg', kg }))
        : Array.from({ length: 80 }, (_, i) => ({ tipo: 'kg', kg: (caso.barraKg ?? 0) + i * 2.5 }))
      : op.registro === 'placa'
        ? Array.from({ length: op.placasMax ?? 20 }, (_, i) => ({ tipo: 'placa', placa: i + 1 }))
        : op.registro === 'anilha'
          ? Array.from({ length: 40 }, (_, i) => ({ tipo: 'anilha', kgPorLado: i * (op.menorAnilhaKg ?? 2) }))
          : op.registro === 'contrapeso'
            ? Array.from({ length: op.placasMax ?? 10 }, (_, i) => ({ tipo: 'contrapeso', placa: (op.placasMax ?? 10) - i }))
            : [0, 1, 2, 3].map((degrau) => ({ tipo: 'degrau', degrau }));
  if (op.registro === 'kg' && !op.lista?.length && caso.corpoKg !== undefined) return { tipo: 'kg', kg: 0 };
  return [...cands].sort((a, b) => valorDaCarga(b) - valorDaCarga(a)).find(cabe) ?? cands[0]!;
}

const RITMO: Record<Nivel, number> = { iniciante: 0.01, intermediario: 0.004, avancado: 0.0015 };
const JANELAS: Record<string, Record<Nivel, number>> = { 'janela 3, 5, 8': { iniciante: 3, intermediario: 5, avancado: 8 }, 'janela 4, 8, 16': { iniciante: 4, intermediario: 8, avancado: 16 } };
const SESSOES = 48; // 24 semanas, 2 sessões por semana do mesmo exercício
const total = (s: SessaoExercicio) => s.series.reduce((t, x) => t + x.reps, 0);

/** O aviso de platô do protótipo: só depois de `janela` sessões com a mesma carga sem bater o total de repetições. */
function comJanela(sug: Sugestao, hist: SessaoExercicio[], janela: number): Sugestao {
  if (sug.acao !== 'estagnado' || janela <= 3) return sug;
  const ult = hist.slice(-janela);
  const mesma = ult.length === janela && ult.every((s) => JSON.stringify(s.series[0]?.carga) === JSON.stringify(ult[0]!.series[0]?.carga));
  const parado = mesma && Math.max(...ult.slice(1).map(total)) <= total(ult[0]!);
  return parado ? sug : { acao: 'manter', motivo: 'Mantenha a carga e busque +1 repetição.', regraId: 'progressao.manter' };
}

function simular(caso: Caso, nivel: Nivel, janela: number) {
  const e = POR_ID[caso.exId]!;
  const reps = e.faixaReps;
  const rir = (e.tipo === 'composto' ? RIR.composto : RIR.isolador)[nivel];
  const op = opcoesCarga(caso.exId, caso.inventario);
  let forca = caso.forca;
  let carga = cargaInicial(caso, reps, rir[0]);
  const hist: SessaoExercicio[] = [];
  const acoes: Record<string, number> = {};
  for (let s = 1; s <= SESSOES; s++) {
    const rf = 30 * (forca / efetiva(carga, caso) - 1);
    const series = [0, 1, 2].map((k) => {
      const feitas = Math.max(0, Math.min(30, Math.floor(rf - rir[0] - k)));
      return { carga, reps: feitas, rir: Math.min(5, Math.max(0, Math.floor(rf - k) - feitas)) };
    });
    hist.push({ series });
    const bruta = sugerirProgressao(hist, { reps, rir }, op);
    const sug = comJanela(bruta, hist, janela);
    acoes[sug.acao] = (acoes[sug.acao] ?? 0) + 1;
    const prox = sug.proxima ? noInventario(sug.proxima, op).carga : undefined;
    if (prox) carga = prox;
    forca *= 1 + RITMO[nivel] / 2;
  }
  return acoes;
}

const NIVEIS: Nivel[] = ['iniciante', 'intermediario', 'avancado'];
const VARIANTES = ['hoje (3 sessões)', ...Object.keys(JANELAS)];
const janelaDe = (v: string, n: Nivel) => JANELAS[v]?.[n] ?? 3;
const media = (xs: number[]) => (xs.reduce((t, x) => t + x, 0) / xs.length).toFixed(1).replace('.', ',');
const res = NIVEIS.map((nivel) => ({ nivel, porVariante: VARIANTES.map((v) => CASOS.map((caso) => simular(caso, nivel, janelaDe(v, nivel)))) }));
const L = [
  '# O que a pessoa ouve em 24 semanas: o aviso de "sem melhora" hoje e com a janela pelo nível',
  '',
  '> Gerado por `scripts/auditoria/prototipo/longo-prazo.ts`. O corpo é um modelo (Epley invertida; força +1%, +0,4% e +0,15% por semana para iniciante, intermediário e avançado; 3 séries; 48 sessões do mesmo exercício em 24 semanas; 15 casos de equipamento). Serve para comparar as regras, não para prever o ganho de ninguém.',
  '',
  'Em quantas das 48 sessões de um exercício a pessoa lê "três sessões sem melhora" (média dos 15 casos), e quantas vezes a carga sobe.',
  '',
  `| nível | ${VARIANTES.map((v) => `"sem melhora": ${v}`).join(' | ')} | a carga sobe (igual nas três) |`,
  `| --- | ${VARIANTES.map(() => '---:').join(' | ')} | ---: |`,
  ...res.map((r) => `| ${r.nivel} | ${r.porVariante.map((xs) => media(xs.map((a) => a.estagnado ?? 0))).join(' | ')} | ${media(r.porVariante[0]!.map((a) => a.subir ?? 0))} |`),
  '',
  '## Por caso (hoje)',
  '',
  '| nível | caso | "sem melhora" em 48 sessões | a carga sobe |',
  '| --- | --- | ---: | ---: |',
  ...res.flatMap((r) => CASOS.map((c, i) => `| ${r.nivel} | ${c.nome} | ${r.porVariante[0]![i]!.estagnado ?? 0} | ${r.porVariante[0]![i]!.subir ?? 0} |`)),
  '',
];
const args = process.argv.slice(2);
const saida = args.includes('--saida') ? args[args.indexOf('--saida') + 1]! : 'docs/revisoes/treino-para-todos/medidas';
mkdirSync(saida, { recursive: true });
writeFileSync(`${saida}/longo-prazo.md`, L.join('\n'));
console.log(L.slice(4, 12).join('\n'));
