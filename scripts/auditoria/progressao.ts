// Praticante simulado (auditoria do treino, Parte B, progressão). Uso: npm run auditoria:progressao
// Treina 16 semanas (2 sessões por semana do mesmo exercício) seguindo a sugestão do app a cada sessão, com os saltos
// reais de cada equipamento. A sugestão é a do app (sugerirProgressao + noInventario, como em sugestaoDoExercicio);
// só "o corpo" é um MODELO, sem pretensão de evidência:
// - [modelo] repetições até a falha pela fórmula de Epley invertida: rf = 30 × (1RM ÷ carga − 1);
// - [modelo] a pessoa vai até o RIR alvo (o menor da faixa), como o app pede ("busque +1 repetição"); perde 1 repetição
//   por série seguinte;
// - [modelo] o 1RM sobe 1% por semana (0,5% por sessão);
// - [modelo] placa da torre = 5 kg; trenó do leg press = 50 kg; peso do corpo = 75 kg; degrau da escada = +15% de esforço.
// Mede: quantas vezes a carga sobe, o vaivém (subir → voltar), a trava (meses sem subir enquanto a força cresce) e a
// sugestão de uma carga que a pessoa não tem. Gera docs/revisoes/auditoria/progressao.{md,json}.
import { writeFileSync, mkdirSync } from 'node:fs';
import { POR_ID } from '../../src/domain/biblioteca';
import { sugerirProgressao, valorDaCarga, type Carga, type SessaoExercicio } from '../../src/domain/progressao';
import { RIR } from '../../src/domain/regras';
import { noInventario, opcoesCarga, textoCarga } from '../../src/domain/sessao';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';

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

/** A carga existe? Halter, kettlebell e caneleira: na lista; barra: barra + pares da menor anilha. */
function existe(c: Carga, caso: Caso, lista: number[]): boolean {
  if (c.tipo !== 'kg') return true;
  if (lista.length) return lista.some((k) => Math.abs(k - c.kg) < 1e-9);
  if (caso.barraKg !== undefined) {
    const lados = (c.kg - caso.barraKg) / (2 * (caso.menorAnilha ?? 1));
    return Math.abs(lados - Math.round(lados)) < 1e-9 && lados >= 0;
  }
  return false; // sem lista e sem barra: o app sugere kg que o inventário não diz ter
}

const resultados = CASOS.map((caso) => {
  const e = POR_ID[caso.exId]!;
  const reps = e.faixaReps;
  const rir = (e.tipo === 'composto' ? RIR.composto : RIR.isolador).intermediario;
  const op = opcoesCarga(caso.exId, caso.inventario);
  const lista = op.lista ?? [];
  let forca = caso.forca;
  let carga = cargaInicial(caso, reps, rir[0]);
  const inicial = carga;
  const hist: SessaoExercicio[] = [];
  const acoes: string[] = [];
  const inexistentes: string[] = [];
  let ultimaSubida = 0;
  let maiorTrava = 0;
  const recorde = new Map<string, number>();
  for (let s = 1; s <= 32; s++) {
    const rf = 30 * (forca / efetiva(carga, caso) - 1);
    const series = [0, 1, 2].map((k) => {
      const feitas = Math.max(0, Math.min(30, Math.floor(rf - rir[0] - k)));
      // [modelo] a reserva informada vai até 5 (ninguém conta 20 repetições sobrando).
      return { carga, reps: feitas, rir: Math.min(5, Math.max(0, Math.floor(rf - k) - feitas)) };
    });
    hist.push({ series });
    const sug = sugerirProgressao(hist, { reps, rir }, op);
    const prox = sug.proxima ? noInventario(sug.proxima, op).carga : undefined;
    acoes.push(sug.acao);
    if (process.argv.includes(`--rastro=${caso.id}`))
      console.log(`${s}: ${textoCarga(carga, caso.exId)} × ${series.map((x) => `${x.reps}@${x.rir}`).join(' ')} → ${sug.acao} ${prox ? textoCarga(prox, caso.exId) : ''} (${sug.regraId})`);
    if (prox && !existe(prox, caso, lista) && inexistentes.length < 3) inexistentes.push(textoCarga(prox, caso.exId));
    // Progresso = subir a carga ou bater o recorde de repetições na carga atual (a dupla progressão).
    const total = series.reduce((t, x) => t + x.reps, 0);
    const chave = JSON.stringify(carga);
    if (total > (recorde.get(chave) ?? -1)) {
      recorde.set(chave, total);
      ultimaSubida = s;
    }
    if (prox && valorDaCarga(prox) > valorDaCarga(carga)) ultimaSubida = s;
    maiorTrava = Math.max(maiorTrava, s - ultimaSubida);
    if (prox) carga = prox;
    forca *= 1.005;
  }
  const subidas = acoes.filter((a) => a === 'subir').length;
  const voltas = acoes.filter((a) => a === 'voltar').length;
  return {
    id: caso.id,
    nome: caso.nome,
    exercicio: caso.exId,
    inicial: textoCarga(inicial, caso.exId),
    final: textoCarga(carga, caso.exId),
    forcaCresceu: '+17% (modelo)',
    subidas,
    voltas,
    maiorTravaEmSessoes: maiorTrava,
    acoes: Object.fromEntries([...new Set(acoes)].map((a) => [a, acoes.filter((x) => x === a).length])),
    cargaInexistente: inexistentes,
    veredito: inexistentes.length
      ? 'sugere carga que não existe'
      : voltas >= 2
        ? 'vaivém'
        : maiorTrava >= 8
          ? 'trava'
          : subidas === 0
            ? 'não sobe'
            : 'anda',
  };
});

const SAIDA = 'docs/revisoes/auditoria';
mkdirSync(SAIDA, { recursive: true });
writeFileSync(`${SAIDA}/progressao.json`, JSON.stringify(resultados, null, 1) + '\n');
const L = [
  '# Progressão com os saltos reais de cada equipamento (praticante simulado)',
  '',
  '> Gerado por `npm run auditoria:progressao`. A sugestão é a do app; o corpo é um modelo (Epley invertida, +1% de força por semana, 3 séries, 32 sessões em 16 semanas), descrito no topo de `scripts/auditoria/progressao.ts`. Serve para achar travas e vaivéns, não para prever ganho de ninguém.',
  '',
  '| caso | começo → fim | subidas | voltas | mais sessões sem progresso (nem carga nem repetições) | ações | carga que não existe | veredito |',
  '| --- | --- | ---: | ---: | ---: | --- | --- | --- |',
  ...resultados.map(
    (r) =>
      `| ${r.nome} | ${r.inicial} → ${r.final} | ${r.subidas} | ${r.voltas} | ${r.maiorTravaEmSessoes} | ${Object.entries(r.acoes)
        .map(([a, n]) => `${a} ${n}`)
        .join(', ')} | ${r.cargaInexistente.join(', ') || '—'} | **${r.veredito}** |`,
  ),
  '',
];
writeFileSync(`${SAIDA}/progressao.md`, L.join('\n'));
console.log(resultados.map((r) => `${r.id}: ${r.veredito} (${r.inicial} → ${r.final}; subir ${r.subidas}, voltar ${r.voltas}, trava ${r.maiorTravaEmSessoes})`).join('\n'));
