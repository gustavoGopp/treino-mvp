// Praticante simulado no cenário de equipamento mínimo (sessão de equipamento mínimo, Parte A). Uso:
//   npm run auditoria:minimo-progressao [-- --rastro=<caso>]
// Mesmo modelo de scripts/auditoria/progressao.ts: a sugestão é a do app (sugerirProgressao + noInventario); só "o corpo"
// é um MODELO, sem pretensão de evidência:
// - [modelo] repetições até a falha pela fórmula de Epley invertida: rf = 30 × (força ÷ carga − 1);
// - [modelo] a pessoa vai até o RIR alvo (o menor da faixa) e perde 1 repetição por série seguinte (3 séries);
// - [modelo] a força sobe 1% por semana (0,5% por sessão), 2 sessões por semana, 16 semanas;
// - [modelo] cada degrau da escada do peso do corpo e do elástico vale +15% de esforço;
// - dois começos: no início da faixa (a 1ª série dá o mínimo + 1) e no meio da faixa.
// Mede: em que semana a carga ou o degrau sobe pela 1ª vez, quantas vezes sobe, a maior trava (sessões sem subir e sem
// bater o recorde de repetições) e se o app sugere um degrau que a pessoa não tem (carga externa sem carga, elástico
// mais forte com uma intensidade só). Gera docs/revisoes/equipamento-minimo/progressao.{md,json}.
import { mkdirSync, writeFileSync } from 'node:fs';
import { POR_ID } from '../../src/domain/biblioteca';
import { ESCADA_PESO_CORPO, sugerirProgressao, valorDaCarga, type Carga, type SessaoExercicio } from '../../src/domain/progressao';
import { RIR } from '../../src/domain/regras';
import { noInventario, opcoesCarga, textoCarga } from '../../src/domain/sessao';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';

type Caso = { id: string; exId: string; inventario: Inventario; onde: string };
const DEGRAU = 1.15;
const VAZIO: Inventario = {};
const ELASTICO1: Inventario = { elasticos: { intensidades: 1 } };
const ELASTICO3: Inventario = { elasticos: { intensidades: 3 } };
const CASOS: Caso[] = [
  ...['flexao', 'agachamento-peso-corpo', 'afundo-peso-corpo', 'bulgaro-peso-corpo', 'ponte-gluteo', 'panturrilha-chao', 'abdominal-chao'].map((exId) => ({ id: exId, exId, inventario: VAZIO, onde: 'nada' })),
  ...['barra-fixa', 'barra-fixa-supinada', 'elevacao-joelhos'].map((exId) => ({ id: exId, exId, inventario: { barra_fixa: {} }, onde: 'barra fixa' })),
  ...['remada-elastico', 'puxada-elastico', 'flexao-elastico', 'agachamento-elastico', 'rosca-elastico', 'elevacao-lateral-elastico', 'stiff-elastico'].map((exId) => ({ id: `${exId}-1`, exId, inventario: ELASTICO1, onde: 'elástico de 1 intensidade' })),
  { id: 'remada-elastico-3', exId: 'remada-elastico', inventario: ELASTICO3, onde: 'elásticos de 3 intensidades' },
  { id: 'remada-suspensao', exId: 'remada-suspensao', inventario: { suspensao: {} }, onde: 'suspensão' },
  { id: 'mergulho', exId: 'mergulho', inventario: { paralelas: {} }, onde: 'paralelas' },
  { id: 'flexao-bola', exId: 'flexao-bola', inventario: { bola_suica: {} }, onde: 'bola suíça' },
  { id: 'panturrilha-step', exId: 'panturrilha', inventario: { step: {} }, onde: 'step' },
  { id: 'goblet-kettlebell', exId: 'goblet-kettlebell', inventario: { kettlebell: { pesosKg: [12] } }, onde: 'kettlebell de 12 kg' },
  ...['goblet', 'rosca-alternada', 'elevacao-halteres'].map((exId) => ({ id: `${exId}-par`, exId, inventario: { halteres_fixos: { minKg: 5, maxKg: 5, passoKg: 5 } }, onde: 'um par de halteres de 5 kg' })),
];

/** RIR alvo do intermediário, com a rir.carga-baixa (meio da faixa ≥ 15), como no gerador. */
function rirDe(exId: string): [number, number] {
  const e = POR_ID[exId]!;
  const base = e.tipo === 'composto' ? RIR.composto.intermediario : RIR.isolador.intermediario;
  const baixa = (e.faixaReps[0] + e.faixaReps[1]) / 2 >= RIR.cargaBaixa.repsMeio && base[1] > RIR.cargaBaixa.rirMax;
  return baixa ? [Math.min(base[0], RIR.cargaBaixa.rirMax - 1), RIR.cargaBaixa.rirMax] : base;
}
const efetiva = (c: Carga) => (c.tipo === 'degrau' ? DEGRAU ** c.degrau : c.tipo === 'kg' ? c.kg : 1);

/** O degrau sugerido existe para quem tem só este inventário? (o 4º degrau pede carga externa ou elástico mais forte) */
function degrauExiste(c: Carga, caso: Caso): boolean {
  if (c.tipo !== 'degrau' || c.degrau < ESCADA_PESO_CORPO.length - 1) return true;
  const temCarga = !!caso.inventario.halteres_fixos || !!caso.inventario.anilhas_e_manoplas || !!caso.inventario.kettlebell;
  return temCarga || (caso.inventario.elasticos?.intensidades ?? 0) > 1;
}

function simular(caso: Caso, comeco: 'inicio' | 'meio') {
  const e = POR_ID[caso.exId]!;
  const reps = e.faixaReps;
  const rir = rirDe(caso.exId);
  const op = opcoesCarga(caso.exId, caso.inventario);
  let carga: Carga = op.registro === 'kg' ? { tipo: 'kg', kg: op.lista![0]! } : { tipo: 'degrau', degrau: 0 };
  const alvoInicial = comeco === 'inicio' ? reps[0] + 1 : Math.round((reps[0] + reps[1]) / 2);
  // A força que dá `alvoInicial` repetições na 1ª série, deixando o RIR alvo de reserva.
  let forca = efetiva(carga) * (1 + (alvoInicial + rir[0]) / 30);
  const hist: SessaoExercicio[] = [];
  const acoes: string[] = [];
  const inexistente: string[] = [];
  let primeiraSubida: number | null = null;
  let subidas = 0;
  let ultimoProgresso = 0;
  let maiorTrava = 0;
  const recorde = new Map<string, number>();
  for (let s = 1; s <= 32; s++) {
    const rf = 30 * (forca / efetiva(carga) - 1);
    const series = [0, 1, 2].map((k) => {
      const feitas = Math.max(0, Math.min(40, Math.floor(rf - rir[0] - k)));
      return { carga, reps: feitas, rir: Math.min(5, Math.max(0, Math.floor(rf - k) - feitas)) };
    });
    hist.push({ series });
    const sug = sugerirProgressao(hist, { reps, rir }, op);
    const prox = sug.proxima ? noInventario(sug.proxima, op).carga : undefined;
    acoes.push(sug.acao);
    if (process.argv.includes(`--rastro=${caso.id}`))
      console.log(`${comeco} ${s}: ${textoCarga(carga, caso.exId)} × ${series.map((x) => `${x.reps}@${x.rir}`).join(' ')} → ${sug.acao} ${prox ? textoCarga(prox, caso.exId) : ''} (${sug.regraId})`);
    const total = series.reduce((t, x) => t + x.reps, 0);
    const chave = JSON.stringify(carga);
    if (total > (recorde.get(chave) ?? -1)) {
      recorde.set(chave, total);
      ultimoProgresso = s;
    }
    if (prox && valorDaCarga(prox) > valorDaCarga(carga)) {
      subidas++;
      primeiraSubida ??= Math.ceil(s / 2);
      ultimoProgresso = s;
      if (!degrauExiste(prox, caso) && inexistente.length < 1) inexistente.push(textoCarga(prox, caso.exId));
    }
    maiorTrava = Math.max(maiorTrava, s - ultimoProgresso);
    if (prox) carga = prox;
    forca *= 1.005;
  }
  const primeiraSerie = hist[0]!.series[0]!.reps;
  const unicaCarga = op.registro === 'kg' && op.lista!.length === 1;
  const noTopo = carga.tipo === 'degrau' ? carga.degrau === ESCADA_PESO_CORPO.length - 1 : carga.tipo === 'kg' && carga.kg === op.lista!.at(-1);
  return {
    comeco,
    faixa: `${reps[0]}–${reps[1]}`,
    rir: `${rir[0]}–${rir[1]}`,
    final: textoCarga(carga, caso.exId),
    /** A 1ª série precisa chegar ao topo + 2 (com 1 repetição a menos por série, a 3ª fica no topo) para subir. */
    repsNaPrimeiraSerie: `${primeiraSerie} → ${reps[1] + 2}`,
    estagnado: acoes.filter((a) => a === 'estagnado').length,
    ultimaRegra: sugerirProgressao(hist, { reps, rir }, op).regraId,
    primeiraSubidaNaSemana: primeiraSubida,
    subidas,
    maiorTravaEmSessoes: maiorTrava,
    noUltimoDegrau: noTopo,
    acoes: Object.fromEntries([...new Set(acoes)].sort().map((a) => [a, acoes.filter((x) => x === a).length])),
    degrauQueNaoExiste: inexistente,
    veredito: inexistente.length
      ? 'sugere o que a pessoa não tem'
      : unicaCarga
        ? 'sem carga maior: só a escada em texto'
        : subidas === 0 ? 'não sobe em 16 semanas' : maiorTrava >= 8 ? 'trava' : noTopo ? 'chega ao fim da escada' : 'anda',
  };
}

const resultados = CASOS.map((caso) => ({ id: caso.id, exercicio: caso.exId, nome: POR_ID[caso.exId]!.nome, onde: caso.onde, inicio: simular(caso, 'inicio'), meio: simular(caso, 'meio') }));

const SAIDA = 'docs/revisoes/equipamento-minimo';
mkdirSync(SAIDA, { recursive: true });
writeFileSync(`${SAIDA}/progressao.json`, JSON.stringify(resultados, null, 1) + '\n');
const sem = (n: number | null) => (n === null ? '—' : `semana ${n}`);
const L = [
  '# Progressão no cenário de equipamento mínimo (praticante simulado)',
  '',
  '> Gerado por `npm run auditoria:minimo-progressao`. A sugestão é a do app; o corpo é um modelo (Epley invertida, +1% de força por semana, 3 séries, 32 sessões em 16 semanas, cada degrau da escada = +15% de esforço), descrito no topo de `scripts/auditoria/minimo-progressao.ts`. Serve para achar travas, não para prever o ganho de ninguém. Não editar à mão.',
  '',
  `A escada do peso do corpo e do elástico é uma só para todos os exercícios (\`progressao.incremento.peso-corporal\`): ${ESCADA_PESO_CORPO.map((d, i) => `${i + 1}) ${d}`).join('; ')}. Ela só sobe de degrau com todas as séries no topo da faixa, no RIR alvo, em 2 sessões seguidas.`,
  '',
  '| exercício | onde | faixa | RIR | começo | 1ª série: hoje → para subir | 1ª subida | subidas em 16 semanas | "estagnado" (de 32) | maior trava (sessões) | fim | degrau que não existe | veredito |',
  '| --- | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |',
  ...resultados.flatMap((r) =>
    [r.inicio, r.meio].map(
      (x) =>
        `| ${r.nome} \`${r.exercicio}\` | ${r.onde} | ${x.faixa} | ${x.rir} | ${x.comeco === 'inicio' ? 'início da faixa' : 'meio da faixa'} | ${x.repsNaPrimeiraSerie} | ${sem(x.primeiraSubidaNaSemana)} | ${x.subidas} | ${x.estagnado} | ${x.maiorTravaEmSessoes} | ${x.final} | ${x.degrauQueNaoExiste.join(', ') || '—'} | **${x.veredito}** |`,
    ),
  ),
  '',
];
const todos = resultados.flatMap((r) => [r.inicio, r.meio]);
L.push(
  '## Resumo',
  '',
  `- Casos que não sobem nenhuma vez em 16 semanas: **${todos.filter((x) => x.subidas === 0).length} de ${todos.length}**.`,
  `- Sugestões "estagnado" (3 sessões sem melhora): ${todos.reduce((t, x) => t + x.estagnado, 0)} de ${todos.length * 32} sessões.`,
  `- Casos em que o app sugere um degrau que a pessoa não tem (carga externa sem carga; elástico mais forte com uma intensidade só): **${todos.filter((x) => x.degrauQueNaoExiste.length).length}**.`,
  `- Mediana da 1ª subida, entre os que sobem: semana ${(() => {
    const s = todos.flatMap((x) => (x.primeiraSubidaNaSemana ? [x.primeiraSubidaNaSemana] : [])).sort((a, b) => a - b);
    return s.length ? s[Math.floor(s.length / 2)] : '—';
  })()}.`,
  '',
);
writeFileSync(`${SAIDA}/progressao.md`, L.join('\n'));
console.log(resultados.map((r) => `${r.id}: ${r.inicio.veredito} / ${r.meio.veredito} (subidas ${r.inicio.subidas}/${r.meio.subidas})`).join('\n'));
