import { BIBLIOTECA, MUSCULOS, type Articulacao, type Exercicio, type Musculo, type Padrao } from '../biblioteca';
import { DESCANSO, READAPTACAO, RIR, TEMPO, VOLUME, NIVEL_COMPLEXIDADE_MAX, r, type Nivel } from '../regras';
import { capacidades, cargaMaxHalter, ITENS, type Inventario, type ItemId } from '../taxonomia/equipamentos';
import { avaliarTriagem, type ResultadoTriagem, type Triagem } from '../triagem';
import { DIVISOES, type Vaga } from './divisoes';

// Gerador de programa: função pura e determinística (mesma entrada → mesma saída).
// Cada decisão grava o id da regra de docs/pesquisa/regras.md que a justifica.

export const GRUPOS = {
  peito: ['peito'],
  costas: ['costas'],
  ombros: ['ombro_lateral'],
  bracos: ['biceps', 'triceps'],
  pernas: ['quadriceps', 'posteriores', 'panturrilha'],
  gluteos: ['gluteos'],
  abdomen: ['abdomen'],
} as const satisfies Record<string, readonly Musculo[]>;
export type Grupo = keyof typeof GRUPOS;

export type Perfil = {
  nivel: Nivel;
  /** Semanas sem treinar antes de começar (readaptacao.gatilho). */
  semanasParado: number;
  diasSemana: 2 | 3 | 4 | 5;
  minutosSessao: number;
  prioridades: Grupo[];
  evitarExercicios: string[];
  evitarEquipamentos: ItemId[];
  dores: { articulacao: Articulacao; intensidade: number }[];
  triagem: Triagem;
};

export type Porque = { regraId: string; texto: string };

export type ExercicioPrescrito = {
  exId: string;
  nome: string;
  padrao: Padrao;
  tipo: Exercicio['tipo'];
  series: number;
  reps: [number, number];
  rir: [number, number];
  descansoSeg: number;
  unilateral: boolean;
  animacaoId: string | null;
  supersetCom?: string;
  alternativas: string[];
  porque: Porque[];
};

export type DiaPrograma = { id: string; nome: string; exercicios: ExercicioPrescrito[]; minutosEstimados: number };

export type Fase = { semanas: string; fatorSeries: number; rir: [number, number] | null; texto: string; regraId: string };

export type Programa = {
  versao: 1;
  entradasHash: string;
  divisao: string;
  dias: DiaPrograma[];
  volumeSemanal: Partial<Record<Musculo, number>>;
  metas: Partial<Record<Musculo, number>>;
  fases: Fase[];
  avisos: Porque[];
  porque: Porque[];
  regioesExcluidas: Articulacao[];
};

export type Resultado = { status: 'bloqueado'; triagem: ResultadoTriagem } | { status: 'ok'; programa: Programa; triagem: ResultadoTriagem };

const MUSCULOS_COM_META = MUSCULOS.filter((m) => m !== 'ombro_anterior');

export function gerarPrograma(perfil: Perfil, inventarioOriginal: Inventario): Resultado {
  const triagem = avaliarTriagem(perfil.triagem);
  if (triagem.bloqueado) return { status: 'bloqueado', triagem };

  const nivel = perfil.nivel;
  const inventario = semItens(inventarioOriginal, perfil.evitarEquipamentos);
  const caps = capacidades(inventario);
  const regioesExcluidas = [
    ...new Set([...triagem.regioesExcluidas, ...perfil.dores.filter((d) => d.intensidade > 5).map((d) => d.articulacao)]),
  ].sort();
  const dorLeve = new Set(perfil.dores.filter((d) => d.intensidade >= 3 && d.intensidade <= 5).map((d) => d.articulacao));
  const prioritarios = new Set<Musculo>(perfil.prioridades.flatMap((g) => GRUPOS[g]));
  const avisos: Porque[] = [];

  // 1. Exercícios possíveis
  const possiveis = BIBLIOTECA.filter(
    (e) =>
      e.requer.some((grupo) => grupo.every((c) => caps.has(c))) &&
      !perfil.evitarExercicios.includes(e.id) &&
      e.complexidade <= NIVEL_COMPLEXIDADE_MAX[nivel] &&
      !e.articulacoes.some((a) => regioesExcluidas.includes(a)),
  );

  const pontuar = (e: Exercicio, vaga: Vaga) => {
    let p = -e.ordem; // preferência fixa da biblioteca
    p += 10 * (vaga.prefere ?? []).filter((t) => e.tags.includes(t)).length;
    if (nivel === 'iniciante' && e.tags.some((t) => t === 'estavel' || t === 'apoiado' || t === 'maquina')) p += 3; // selecao.estabilidade
    if (e.tags.includes('alongado')) p += 0.5; // selecao.comprimento-longo (só desempate)
    if (e.musculos.primarios.some((m) => prioritarios.has(m))) p += 5; // ordem.sessao: prioridade do usuário
    if (e.articulacoes.some((a) => dorLeve.has(a))) p -= 5;
    return p;
  };
  const melhor = (cands: Exercicio[], vaga: Vaga) =>
    [...cands].sort((a, b) => pontuar(b, vaga) - pontuar(a, vaga) || a.id.localeCompare(b.id))[0];

  // 2. Divisão e 4. preenchimento das vagas
  const divisao = DIVISOES[perfil.diasSemana];
  const usados = new Set<string>();
  const lacunas = new Set<Padrao>();
  type Item = { ex: Exercicio; vaga: Vaga; series: number; ordemVaga: number };
  const dias = divisao.dias.map((dia) => {
    const itens: Item[] = [];
    dia.vagas.forEach((vaga, ordemVaga) => {
      let escolhido: Exercicio | undefined;
      for (const padrao of [vaga.padrao, vaga.alternativa].filter((p): p is Padrao => !!p)) {
        const doPadrao = possiveis.filter((e) => e.padrao === padrao && !itens.some((i) => i.ex.id === e.id));
        const novos = vaga.repetir ? doPadrao : doPadrao.filter((e) => !usados.has(e.id));
        escolhido = melhor(novos.length ? novos : doPadrao, { ...vaga, padrao });
        if (escolhido) break;
        lacunas.add(padrao);
      }
      if (!escolhido) return;
      usados.add(escolhido.id);
      itens.push({ ex: escolhido, vaga, series: VOLUME.seriesPorExercicio.min, ordemVaga });
    });
    return { dia, itens };
  });

  if (lacunas.has('puxar-v'))
    avisos.push({
      regraId: r('equipamento.sem-puxada-vertical'),
      texto: 'Sem barra fixa nem polia alta: o volume de costas vem de remadas. É uma lacuna conhecida; a evidência para substituir a puxada é fraca.',
    });
  const temMaquinaDePerna = caps.has('leg_press') || caps.has('rack');
  if (!temMaquinaDePerna && cargaMaxHalter(inventario) < 20)
    avisos.push({
      regraId: r('equipamento.escada-carga-leve'),
      texto: 'Carga limitada para pernas: o programa usa exercícios unilaterais, repetições mais altas (até ~30) e técnicas de dificuldade antes de pedir mais carga. Quadríceps e posteriores tendem a crescer menos que numa academia completa.',
    });

  // 3. Metas de volume e distribuição das séries
  const metas: Partial<Record<Musculo, number>> = {};
  for (const m of MUSCULOS_COM_META)
    metas[m] = prioritarios.has(m) ? VOLUME.alvo[nivel] : m === 'abdomen' ? VOLUME.minimoEficazPiso : VOLUME.minimoEficaz;

  const todos = dias.flatMap((d, di) => d.itens.map((it) => ({ it, di })));
  const volume = () => volumePorMusculo(todos.map(({ it }) => ({ ex: it.ex, series: it.series })));
  const volumeNoDia = (di: number, m: Musculo) =>
    volumePorMusculo(dias[di]!.itens.map((it) => ({ ex: it.ex, series: it.series })))[m] ?? 0;
  for (;;) {
    const v = volume();
    const candidatos = MUSCULOS_COM_META.map((m) => {
      const vagas = todos.filter(
        ({ it, di }) =>
          it.ex.musculos.primarios.includes(m) && it.series < VOLUME.seriesPorExercicio.max && volumeNoDia(di, m) + 1 <= VOLUME.sessaoTeto,
      );
      return { m, deficit: ((metas[m] ?? 0) - (v[m] ?? 0)) / (metas[m] ?? 1), vagas };
    }).filter((c) => c.deficit > 0 && c.vagas.length);
    if (!candidatos.length) break;
    candidatos.sort((a, b) => b.deficit - a.deficit || MUSCULOS.indexOf(a.m) - MUSCULOS.indexOf(b.m));
    const { vagas } = candidatos[0]!;
    vagas.sort((a, b) => a.it.series - b.it.series || a.di - b.di || a.it.ordemVaga - b.it.ordemVaga);
    vagas[0]!.it.series++;
  }

  // 6. Ordem dentro da sessão (ordem.sessao)
  for (const d of dias)
    d.itens.sort((a, b) => {
      const k = (i: Item) => [
        i.ex.padrao === 'core' ? 1 : 0,
        i.ex.tipo === 'composto' ? 0 : 1,
        i.ex.musculos.primarios.some((m) => prioritarios.has(m)) ? 0 : 1,
      ];
      const [ka, kb] = [k(a), k(b)];
      for (let j = 0; j < ka.length; j++) if (ka[j] !== kb[j]) return ka[j]! - kb[j]!;
      return a.ordemVaga - b.ordemVaga;
    });

  // 7. Prescrição
  const prescrever = (it: Item): ExercicioPrescrito => {
    const e = it.ex;
    const composto = e.tipo === 'composto';
    return {
      exId: e.id,
      nome: e.nome,
      padrao: e.padrao,
      tipo: e.tipo,
      series: it.series,
      reps: e.faixaReps,
      rir: composto ? RIR.composto[nivel] : RIR.isolador[nivel],
      descansoSeg: composto ? DESCANSO.composto[nivel] : DESCANSO.isolador[nivel],
      unilateral: e.unilateral,
      animacaoId: e.animacaoId,
      alternativas: alternativas(e, possiveis, it.vaga, pontuar),
      porque: porqueDoExercicio(e, it.vaga, nivel),
    };
  };
  let programaDias: DiaPrograma[] = dias.map(({ dia, itens }) => {
    const exercicios = itens.map(prescrever);
    return { id: dia.id, nome: dia.nome, exercicios, minutosEstimados: minutos(exercicios) };
  });

  // 5. Orçamento de tempo (tempo.corte)
  programaDias = cortarTempo(programaDias, perfil.minutosSessao, metas, nivel, avisos);

  const volumeSemanal = volumePorMusculo(
    programaDias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID_BIB[x.exId]!, series: x.series }))),
  );

  return {
    status: 'ok',
    triagem,
    programa: {
      versao: 1,
      entradasHash: hash(JSON.stringify([perfil, inventarioOriginal])),
      divisao: divisao.nome,
      dias: programaDias,
      volumeSemanal,
      metas,
      fases: fases(perfil),
      avisos,
      porque: [
        { regraId: r('frequencia.musculo'), texto: `${divisao.nome}: cada grupo treina cerca de 2x por semana.` },
        {
          regraId: r('volume.semanal.alvo'),
          texto: `Grupos prioritários com ~${VOLUME.alvo[nivel]} séries semanais; os demais no mínimo eficaz (${VOLUME.minimoEficaz}).`,
        },
        { regraId: r('volume.serie-indireta.peso'), texto: 'Séries indiretas (ex.: remada para o bíceps) contam como meia série.' },
        { regraId: r('rir.serie-efetiva'), texto: `Só contam séries de trabalho com até ${RIR.serieEfetivaMax} repetições de reserva.` },
      ],
      regioesExcluidas,
    },
  };
}

const POR_ID_BIB: Record<string, Exercicio> = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));

export function volumePorMusculo(lista: { ex: Exercicio; series: number }[]): Partial<Record<Musculo, number>> {
  const v: Partial<Record<Musculo, number>> = {};
  for (const { ex, series } of lista) {
    for (const m of ex.musculos.primarios) v[m] = (v[m] ?? 0) + series;
    for (const m of ex.musculos.secundarios) v[m] = (v[m] ?? 0) + series * VOLUME.pesoIndireta;
  }
  return v;
}

function semItens(inv: Inventario, evitar: ItemId[]): Inventario {
  return Object.fromEntries(Object.entries(inv).filter(([k]) => !evitar.includes(k as ItemId) && k in ITENS)) as Inventario;
}

function alternativas(e: Exercicio, possiveis: Exercicio[], vaga: Vaga, pontuar: (e: Exercicio, v: Vaga) => number) {
  return possiveis
    .filter((x) => x.padrao === e.padrao && x.id !== e.id)
    .map((x) => ({ x, p: pontuar(x, vaga) + (x.carga !== e.carga ? 1 : 0) }))
    .sort((a, b) => b.p - a.p || a.x.id.localeCompare(b.x.id))
    .slice(0, 2)
    .map(({ x }) => x.id);
}

function porqueDoExercicio(e: Exercicio, vaga: Vaga, nivel: Nivel): Porque[] {
  const p: Porque[] = [];
  const tags = new Set(e.tags.filter((t) => (vaga.prefere ?? []).includes(t)));
  if (tags.has('inclinado')) p.push({ regraId: r('selecao.peitoral-inclinado'), texto: 'Variação inclinada para a parte de cima do peitoral.' });
  if (tags.has('acima-cabeca'))
    p.push({ regraId: r('selecao.triceps-acima-cabeca'), texto: 'Braço acima da cabeça para alongar a cabeça longa do tríceps.' });
  if (tags.has('sentada')) p.push({ regraId: r('selecao.flexora-sentada'), texto: 'Flexão de joelho sentada, com o posterior mais alongado.' });
  if (e.padrao === 'panturrilha' && e.tags.includes('alongado'))
    p.push({ regraId: r('selecao.panturrilha-alongada'), texto: 'Ênfase no alongamento: calcanhar abaixo do apoio e pausa embaixo.' });
  else if (e.tags.includes('alongado') && !tags.has('acima-cabeca'))
    p.push({ regraId: r('selecao.comprimento-longo'), texto: 'Carga com o músculo alongado (critério de desempate).' });
  if (nivel === 'iniciante' && e.tags.some((t) => t === 'estavel' || t === 'apoiado' || t === 'maquina'))
    p.push({ regraId: r('selecao.estabilidade'), texto: 'Exercício estável e apoiado, mais fácil de aprender.' });
  p.push({
    regraId: r('reps.faixa.por-tipo'),
    texto: e.tipo === 'composto' ? 'Multiarticular: faixa de repetições mais baixa.' : 'Isolador: faixa de repetições mais alta.',
  });
  p.push({ regraId: r('rir.alvo'), texto: 'Terminar a série perto da falha, sem precisar chegar nela.' });
  p.push({ regraId: r('descanso.por-tipo'), texto: 'Descanso suficiente para manter as repetições nas séries seguintes.' });
  return p;
}

// Duração estimada (tempo.serie, tempo.transicao, tempo.aquecimento, tempo.colchao, tempo.superserie).
export function minutos(exs: ExercicioPrescrito[]): number {
  let seg = 0;
  const aquecidos = new Set<string>();
  const serie = (x: ExercicioPrescrito) => (((x.reps[0] + x.reps[1]) / 2) * TEMPO.segPorRep + TEMPO.preparoSerie) * (x.unilateral ? 2 : 1);
  exs.forEach((x, i) => {
    const par = x.supersetCom ? exs.find((y) => y.exId === x.supersetCom) : undefined;
    if (par && exs.indexOf(par) < i) return; // já contado junto com o par
    if (i > 0) seg += TEMPO.transicao;
    const e = POR_ID_BIB[x.exId]!;
    if (x.tipo === 'composto' && !e.musculos.primarios.some((m) => aquecidos.has(m))) {
      seg += TEMPO.aquecimento;
      e.musculos.primarios.forEach((m) => aquecidos.add(m));
    }
    if (par) {
      const n = Math.max(x.series, par.series);
      seg += n * (serie(x) + serie(par) + TEMPO.superserieEntre) + (n - 1) * Math.max(x.descansoSeg, par.descansoSeg);
    } else seg += x.series * serie(x) + (x.series - 1) * x.descansoSeg;
  });
  return Math.round((seg * (1 + TEMPO.colchao)) / 60);
}

function cortarTempo(
  dias: DiaPrograma[],
  limite: number,
  metas: Partial<Record<Musculo, number>>,
  nivel: Nivel,
  avisos: Porque[],
): DiaPrograma[] {
  const recalcular = (d: DiaPrograma) => ({ ...d, minutosEstimados: minutos(d.exercicios) });
  const volume = () => volumePorMusculo(dias.flatMap((d) => d.exercicios.map((x) => ({ ex: POR_ID_BIB[x.exId]!, series: x.series }))));
  const piso = (m: Musculo) => Math.min(metas[m] ?? 0, VOLUME.minimo[nivel], VOLUME.minimoEficaz);
  const usados = new Set<string>();

  for (let di = 0; di < dias.length; di++) {
    let d = dias[di]!;
    // 1) menos exercícios: tira o isolador cujo músculo continua acima do piso sem ele
    while (d.minutosEstimados > limite) {
      const v = volume();
      const removivel = d.exercicios
        .filter((x) => x.tipo === 'isolador' && POR_ID_BIB[x.exId]!.musculos.primarios.every((m) => (v[m] ?? 0) - x.series >= Math.max(piso(m), metas[m] ?? 0)))
        .at(-1);
      if (!removivel) break;
      d = recalcular({ ...d, exercicios: d.exercicios.filter((x) => x !== removivel) });
      dias[di] = d;
      usados.add('corte');
    }
    // 2) só aquecimento específico: já é o que o modelo de tempo considera.
    // 3) supersérie entre isoladores de músculos que não competem
    if (d.minutosEstimados > limite) {
      const exs = d.exercicios.map((x) => ({ ...x }));
      const livres = exs.filter((x) => x.tipo === 'isolador' && x.padrao !== 'core');
      for (let i = 0; i + 1 < livres.length; i += 2) {
        const [a, b] = [livres[i]!, livres[i + 1]!];
        const ma = POR_ID_BIB[a.exId]!.musculos.primarios, mb = POR_ID_BIB[b.exId]!.musculos.primarios;
        if (ma.some((m) => mb.includes(m))) continue;
        a.supersetCom = b.exId;
        b.supersetCom = a.exId;
      }
      d = recalcular({ ...d, exercicios: exs });
      dias[di] = d;
      if (exs.some((x) => x.supersetCom)) usados.add('superserie');
    }
    // 4) drop set / rest-pause: só sugerido no texto (não muda a contagem de séries).
    // 5) por último, menos séries, sem descer do piso de manutenção
    while (d.minutosEstimados > limite) {
      const v = volume();
      const alvo = [...d.exercicios]
        .filter((x) => x.series > 2 && POR_ID_BIB[x.exId]!.musculos.primarios.every((m) => (v[m] ?? 0) - 1 >= piso(m)))
        .sort((a, b) => b.series - a.series)[0];
      if (!alvo) break;
      d = recalcular({ ...d, exercicios: d.exercicios.map((x) => (x === alvo ? { ...x, series: x.series - 1 } : x)) });
      dias[di] = d;
      usados.add('series');
    }
    if (d.minutosEstimados > limite)
      avisos.push({
        regraId: r('tempo.corte'),
        texto: `${d.nome}: estimativa de ${d.minutosEstimados} min, acima dos ${limite} min disponíveis mesmo depois dos cortes.`,
      });
  }
  if (usados.size)
    avisos.push({
      regraId: r('tempo.corte'),
      texto: 'Para caber no tempo: ' + [usados.has('corte') && 'menos exercícios', usados.has('superserie') && 'superséries entre músculos que não competem', usados.has('series') && 'menos séries'].filter(Boolean).join(', ') + '.',
    });
  return dias;
}

function fases(p: Perfil): Fase[] {
  if (p.semanasParado >= READAPTACAO.semanasProtocolo)
    return [
      { semanas: '1', fatorSeries: READAPTACAO.semana1.fatorSeries, rir: READAPTACAO.semana1.rir, texto: 'Cerca de metade das séries, RIR 3–4 e carga 10–20% abaixo da última registrada.', regraId: r('readaptacao.semana1') },
      { semanas: '2', fatorSeries: READAPTACAO.semana2.fatorSeries, rir: READAPTACAO.semana2.rir, texto: 'Cerca de 3/4 das séries, RIR 2–3.', regraId: r('readaptacao.semana2') },
      { semanas: '3+', fatorSeries: 1, rir: null, texto: 'Programa completo; as cargas desta semana viram a referência.', regraId: r('readaptacao.semana3') },
    ];
  if (p.semanasParado >= READAPTACAO.semanasNormal)
    return [{ semanas: '1ª sessão', fatorSeries: 1, rir: null, texto: 'Primeira sessão de cada treino com 1 repetição a mais de reserva.', regraId: r('readaptacao.gatilho') }];
  if (p.nivel === 'iniciante')
    return [
      { semanas: '1–2', fatorSeries: VOLUME.minimo.iniciante / VOLUME.alvo.iniciante, rir: [3, 4], texto: 'Fase de aprendizado: foco na técnica, volume no mínimo e RIR 3–4.', regraId: r('iniciante.fase-aprendizado') },
      { semanas: '3+', fatorSeries: 1, rir: null, texto: 'Programa completo.', regraId: r('iniciante.fase-aprendizado') },
    ];
  return [];
}

/** Séries e RIR da semana, aplicando a fase (readaptação ou aprendizado). */
export function prescricaoDaSemana(programa: Programa, semana: number): DiaPrograma[] {
  const fase = programa.fases.find((f) => {
    const [a, b] = f.semanas.split(/[–+]/);
    const ini = Number(a);
    if (Number.isNaN(ini)) return false;
    if (f.semanas.endsWith('+')) return semana >= ini;
    return semana >= ini && semana <= Number(b || a);
  });
  if (!fase || fase.fatorSeries === 1) return programa.dias;
  return programa.dias.map((d) => ({
    ...d,
    exercicios: d.exercicios.map((x) => ({ ...x, series: Math.max(1, Math.round(x.series * fase.fatorSeries)), rir: fase.rir ?? x.rir })),
  }));
}

function hash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}
