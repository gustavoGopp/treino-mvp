// Mapa e teste de estresse do cenário de equipamento mínimo (sessão de equipamento mínimo, Parte A). Uso:
//   npm run auditoria:minimo                 (a grade inteira)
//   npm run auditoria:minimo -- --amostra 50 (1 caso a cada 50, para conferir rápido)
// Gera docs/revisoes/equipamento-minimo/{estresse,cobertura}.{md,json}. Determinístico: a mesma grade dá os mesmos
// arquivos. Só dados fictícios (scripts/auditoria/minimo-cenarios.ts).
import { mkdirSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA, MUSCULOS, POR_ID, type Articulacao, type Musculo, type Padrao } from '../../src/domain/biblioteca';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { SEM_EXERCICIO, ehAvisoDeMeta, musculosDoAviso, contextoDeSelecao, gerarPrograma, MUSCULOS_COM_META, NOME_MUSCULO, type Programa } from '../../src/domain/gerador';
import { DIVISAO_IDS, DIVISOES, type DivisaoId } from '../../src/domain/gerador/divisoes';
import { FUNCAO, FUNCOES } from '../../src/domain/gerador/funcoes';
import { exerciciosPorSessao, NIVEIS, NIVEL_COMPLEXIDADE_MAX, VOLUME, type Nivel } from '../../src/domain/regras';
import { capacidades } from '../../src/domain/taxonomia/equipamentos';
import { MINUTOS, PRIORIDADES, perfil } from './cenarios';
import { CENARIOS_MIN, chaveDaClasse, DORES_MIN, type CenarioMin } from './minimo-cenarios';
import { articulacoesEsperadas } from './articulacoes';

const args = process.argv.slice(2);
const amostra = Number(args[args.indexOf('--amostra') + 1]) || 0;
const SAIDA = 'docs/revisoes/equipamento-minimo';

// ---------- classes de cenários (mesmas capacidades = mesmo programa) ----------
const classes = new Map<string, CenarioMin[]>();
for (const c of CENARIOS_MIN) {
  const k = chaveDaClasse(c.inventario);
  classes.set(k, [...(classes.get(k) ?? []), c]);
}
const REPRESENTANTES = [...classes.values()].map((cs) => cs[0]!);
const membros = (c: CenarioMin) => classes.get(chaveDaClasse(c.inventario))!;

type Caso = { cenario: CenarioMin; nivel: Nivel; divisao: DivisaoId; minutos: number; prioridade: (typeof PRIORIDADES)[number]; dor: (typeof DORES_MIN)[number] };
function* grade(): Generator<Caso> {
  let i = 0;
  for (const cenario of REPRESENTANTES)
    for (const nivel of NIVEIS)
      for (const divisao of DIVISAO_IDS)
        for (const minutos of MINUTOS)
          for (const prioridade of PRIORIDADES)
            for (const dor of DORES_MIN) {
              if (amostra && Math.imul(i++, 2654435761) >>> 0 >= 2 ** 32 / amostra) continue;
              yield { cenario, nivel, divisao, minutos, prioridade, dor };
            }
}
const nomeDoCaso = (c: Caso) =>
  `${c.cenario.id} · ${c.nivel} · ${DIVISOES[c.divisao].nome} (${DIVISOES[c.divisao].diasSemana} dias) · ${c.minutos} min · prioridade ${c.prioridade.id} · ${c.dor.id}`;
const resumo = (p: Programa) =>
  p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}`).join(', ') || '—'}`).join(' | ');
const GRUPO_MUSCULOS: Record<string, Musculo[]> = { peito: ['peito'], costas: ['costas'], ombros: ['ombro_lateral'], bracos: ['biceps', 'triceps'], pernas: ['quadriceps', 'posteriores', 'panturrilha'], gluteos: ['gluteos'], abdomen: ['abdomen'] };

// ---------- acumuladores ----------
type Exemplo = { caso: string; programa: string; problema: string };
const exemplos: Record<string, Exemplo[]> = {};
const contagem: Record<string, number> = {};
function problema(id: string, caso: Caso, p: Programa, texto: string) {
  contagem[id] = (contagem[id] ?? 0) + 1;
  const lista = (exemplos[id] ??= []);
  if (lista.length < 3 && !lista.some((e) => e.caso.split(' · ')[0] === caso.cenario.id)) lista.push({ caso: nomeDoCaso(caso), programa: resumo(p), problema: texto });
}

/** Como o app trata uma vaga ativa sem exercício possível por falta de equipamento. */
type Tratamento = 'aviso da vaga' | 'só aviso do músculo' | 'músculo coberto por outra vaga' | 'músculo sem meta: nada' | 'nada';
type Acc = {
  programas: number;
  semDor: number;
  zeroSemDor: Partial<Record<Musculo, number>>;
  soma: Partial<Record<Musculo, number>>;
  abaixoDe4SemDor: Partial<Record<Musculo, number>>;
  vagas: Record<string, Partial<Record<Tratamento, number>>>;
  semPuxar: number;
  semPosteriores: number;
  avisoSemPuxadaComPuxarZerado: number;
  avisoCompra: number;
  motivoFalso: number;
  abaixoSemAviso: number;
  guia: { animacao: number; cartao: number; nada: number };
  dor: Record<string, { programas: number; soCore: number; superiorSemSuperior: number; vazio: number; violacao: number; incompleta: number; exercicios: Set<string> }>;
  tempo: Record<number, { programas: number; exercicios: number; dias: number; maxDia: number[]; sobra: number; series: number; noTeto: number }>;
};
const acc = new Map<string, Acc>();
const novo = (): Acc => ({
  programas: 0,
  semDor: 0,
  zeroSemDor: {},
  soma: {},
  abaixoDe4SemDor: {},
  vagas: {},
  semPuxar: 0,
  semPosteriores: 0,
  avisoSemPuxadaComPuxarZerado: 0,
  avisoCompra: 0,
  motivoFalso: 0,
  abaixoSemAviso: 0,
  guia: { animacao: 0, cartao: 0, nada: 0 },
  dor: {},
  tempo: {},
});
const guiaDe = (exId: string) => {
  const e = POR_ID[exId]!;
  return e.animacaoId && e.animacaoId in CONTEUDO ? 'animacao' : exId in CARTOES ? 'cartao' : 'nada';
};
const PUXAR: Padrao[] = ['puxar-h', 'puxar-v'];
const EMPURRAR: Padrao[] = ['empurrar-h', 'empurrar-v'];
const JOELHO: Padrao[] = ['agachar', 'afundo', 'isolador-quadriceps'];
const QUADRIL: Padrao[] = ['dobrar-quadril', 'extensao-quadril', 'flexao-joelho'];
const SUPERIORES: Padrao[] = ['empurrar-h', 'empurrar-v', 'puxar-h', 'puxar-v', 'isolador-peito', 'isolador-ombro-lateral', 'isolador-ombro-posterior', 'isolador-biceps', 'isolador-triceps'];
const COMPRA = /\b(compr|adquir)/i;

const inicio = Date.now();
let programas = 0;
for (const caso of grade()) {
  const pf = perfil({ nivel: caso.nivel, divisao: caso.divisao, minutos: caso.minutos, prioridades: caso.prioridade.grupos, dores: caso.dor.dores });
  const res = gerarPrograma(pf, caso.cenario.inventario);
  if (res.status !== 'ok') continue;
  const p = res.programa;
  programas++;
  const ctx = contextoDeSelecao(pf, caso.cenario.inventario);
  const a = acc.get(caso.cenario.id) ?? novo();
  acc.set(caso.cenario.id, a);
  a.programas++;
  const semDor = !caso.dor.dores.length;
  const prio = new Set<Musculo>(caso.prioridade.grupos.flatMap((g) => GRUPO_MUSCULOS[g]!));
  const exs = p.dias.flatMap((d) => d.exercicios);

  // Volume
  for (const m of MUSCULOS_COM_META) {
    const v = p.volumeSemanal[m] ?? 0;
    a.soma[m] = (a.soma[m] ?? 0) + v;
    if (semDor) {
      if (v === 0) {
        a.zeroSemDor[m] = (a.zeroSemDor[m] ?? 0) + 1;
        if (['costas', 'ombro_lateral', 'ombro_posterior', 'biceps', 'triceps', 'posteriores', 'peito', 'quadriceps', 'gluteos'].includes(m))
          problema(`volume.zero.${m}`, caso, p, `${NOME_MUSCULO[m]} com 0 série na semana, sem dor nenhuma`);
      }
      if (v < VOLUME.minimoEficazPiso) a.abaixoDe4SemDor[m] = (a.abaixoDe4SemDor[m] ?? 0) + 1;
    }
    // Todo músculo abaixo do limiar tem aviso (o mesmo limiar de avisosDeMeta: a meta, se prioridade; senão, 4).
    const limiar = prio.has(m) ? (p.metas[m] ?? 0) : Math.min(p.metas[m] ?? 0, VOLUME.minimoEficazPiso);
    if (v < limiar && !p.avisos.some((x) => x.texto.includes(NOME_MUSCULO[m] + ' '))) {
      a.abaixoSemAviso++;
      problema('volume.abaixo-sem-aviso', caso, p, `${NOME_MUSCULO[m]} com ${v} de ${p.metas[m]} séries, sem aviso`);
    }
  }
  if (semDor) a.semDor++;

  // Vagas sem opção por falta de equipamento: o que o app diz
  const grupos = new Set(caso.prioridade.grupos);
  const divisao = DIVISOES[p.divisaoId!];
  const vistas = new Set<string>();
  for (const dia of divisao.dias)
    for (const vaga of dia.vagas) {
      if (vaga.prioridade && !vaga.prioridade.some((g) => grupos.has(g))) continue;
      if (vistas.has(vaga.funcao) || ctx.resolver(vaga) || ctx.perdidaPorDor(vaga)) continue;
      vistas.add(vaga.funcao);
      const f = FUNCAO[vaga.funcao]!;
      const m = f.musculo;
      const temMeta = (MUSCULOS_COM_META as readonly Musculo[]).includes(m);
      const avisoVaga = !!f.lacuna && p.avisos.some((x) => x.texto.startsWith(`Sem ${f.lacuna!.falta}:`));
      const avisoMusculo = p.avisos.some((x) => ehAvisoDeMeta(x) && musculosDoAviso(x).includes(m));
      const limiar = prio.has(m) ? (p.metas[m] ?? 0) : Math.min(p.metas[m] ?? 0, VOLUME.minimoEficazPiso);
      const t: Tratamento = avisoVaga
        ? 'aviso da vaga'
        : avisoMusculo
          ? 'só aviso do músculo'
          : !temMeta
            ? 'músculo sem meta: nada'
            : (p.volumeSemanal[m] ?? 0) >= limiar
              ? 'músculo coberto por outra vaga'
              : 'nada';
      const reg = (a.vagas[f.id] ??= {});
      reg[t] = (reg[t] ?? 0) + 1;
      if (t === 'só aviso do músculo') problema(`vaga.so-aviso-do-musculo.${f.id}`, caso, p, `a vaga "${f.nome}" não tem exercício possível e some do dia; só o aviso de ${NOME_MUSCULO[m]} aparece`);
      // A adução é complemento opcional, sem meta (selecao.aducao-complemento): ficar fora sem aviso é o esperado.
      if (t === 'músculo sem meta: nada' && f.id !== 'aducao') problema(`vaga.sem-aviso.${f.id}`, caso, p, `a vaga "${f.nome}" some do dia sem aviso nenhum (${NOME_MUSCULO[m]} não tem meta própria)`);
      if (t === 'nada') problema(`vaga.sem-aviso.${f.id}`, caso, p, `a vaga "${f.nome}" some e ${NOME_MUSCULO[m]} fica abaixo sem aviso`);
    }
  // O motivo "nenhum exercício possível" é verdadeiro? E algum aviso diz o que comprar?
  for (const x of p.avisos) {
    if (COMPRA.test(x.texto)) a.avisoCompra++;
    if (!(x.regraId === 'equipamento.sem-ancoragem' || x.texto.startsWith(SEM_EXERCICIO))) continue;
    for (const m of musculosDoAviso(x))
      if (ctx.possiveis.some((e) => e.musculos.primarios.includes(m))) {
        a.motivoFalso++;
        problema('aviso.motivo-falso', caso, p, `diz "nenhum exercício possível" para ${NOME_MUSCULO[m]}, mas há`);
      }
  }

  // Equilíbrio
  const series = (ps: Padrao[]) => exs.filter((x) => ps.includes(x.padrao)).reduce((t, x) => t + x.series, 0);
  if (semDor) {
    const [emp, pux, joe, qua] = [series(EMPURRAR), series(PUXAR), series(JOELHO), series(QUADRIL)];
    if (emp > 0 && pux === 0) {
      a.semPuxar++;
      problema('equilibrio.sem-puxar', caso, p, `${emp} séries de empurrar e nenhuma de puxar`);
      if (p.avisos.some((x) => x.regraId === 'equipamento.sem-puxada-vertical')) a.avisoSemPuxadaComPuxarZerado++;
    }
    if (joe > 0 && (p.volumeSemanal.posteriores ?? 0) === 0) {
      a.semPosteriores++;
      problema('equilibrio.sem-posteriores', caso, p, `${joe} séries de joelho (agachar, afundo), ${qua} de quadril e 0 de posteriores da coxa`);
    }
  }

  // Guia
  for (const x of exs) a.guia[guiaDe(x.exId)]++;

  // Tempo (só sem dor, para separar o efeito do equipamento)
  if (semDor) {
    const t = (a.tempo[caso.minutos] ??= { programas: 0, exercicios: 0, dias: 0, maxDia: [], sobra: 0, series: 0, noTeto: 0 });
    t.programas++;
    t.dias += p.dias.length;
    t.exercicios += exs.length;
    t.series += exs.reduce((s, x) => s + x.series, 0);
    t.noTeto += exs.filter((x) => x.series >= VOLUME.seriesPorExercicio.max).length;
    const maxDia = Math.max(...p.dias.map((d) => d.minutosEstimados));
    t.maxDia.push(maxDia);
    if (maxDia < 0.7 * caso.minutos) {
      t.sobra++;
      if (caso.minutos <= 30) problema('tempo.sobra-em-treino-curto', caso, p, `o dia mais longo usa ${maxDia} de ${caso.minutos} min (cabem ~${exerciciosPorSessao(caso.minutos)} exercícios; o dia tem ${Math.max(...p.dias.map((d) => d.exercicios.length))})`);
    }
  }

  // Segurança
  const excluidas = new Set<Articulacao>(caso.dor.dores.filter((d) => d.nota > 5).map((d) => d.articulacao));
  const s = (a.dor[caso.dor.id] ??= { programas: 0, soCore: 0, superiorSemSuperior: 0, vazio: 0, violacao: 0, incompleta: 0, exercicios: new Set() });
  s.programas++;
  for (const x of exs) s.exercicios.add(x.exId);
  for (const d of p.dias) {
    if (!d.exercicios.length) {
      s.vazio++;
      problema('dia.vazio', caso, p, `${d.nome} sem exercício`);
    } else if (!d.exercicios.some((x) => x.padrao !== 'core')) {
      s.soCore++;
      problema('dia.so-core', caso, p, `${d.nome} só com abdominal`);
    } else if (/Superior|Empurrar|Puxar|Peito|Costas|Ombro|Braço/.test(d.nome) && !d.exercicios.some((x) => SUPERIORES.includes(x.padrao))) {
      s.superiorSemSuperior++;
      problema('dia.superior-sem-superior', caso, p, `${d.nome} sem nenhum exercício de tronco ou braço (${d.exercicios.map((x) => x.exId).join(', ')})`);
    }
    for (const x of d.exercicios) {
      const e = POR_ID[x.exId]!;
      if (e.articulacoes.some((r) => excluidas.has(r))) {
        s.violacao++;
        problema('seguranca.carrega-excluida', caso, p, `${x.exId} carrega uma região com dor > 5`);
      }
      const falta = articulacoesEsperadas(e).filter((r) => excluidas.has(r) && !e.articulacoes.includes(r));
      if (falta.length) {
        s.incompleta++;
        problema(`seguranca.articulacao-incompleta.${falta.join('+')}`, caso, p, `${x.exId} fica com dor ${falta.join(' e ')} > 5: o dado não marca a região`);
      }
    }
  }
}
const segundos = Math.round((Date.now() - inicio) / 1000);

// ---------- cobertura (sem dor, por nível) ----------
const possiveisNo = (c: CenarioMin, nivel: Nivel) => {
  const caps = capacidades(c.inventario);
  return BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((x) => caps.has(x))) && e.complexidade <= NIVEL_COMPLEXIDADE_MAX[nivel]);
};
const cobertura = REPRESENTANTES.map((c) => {
  const porNivel = Object.fromEntries(
    NIVEIS.map((nivel) => {
      const ctx = contextoDeSelecao(perfil({ nivel, divisao: 'ct-abc', minutos: 60, prioridades: [], dores: [] }), c.inventario);
      const funcoes = Object.fromEntries(
        FUNCOES.map((f) => {
          const r = ctx.resolver({ funcao: f.id });
          const n = f.niveis.flat().filter((id) => ctx.naFuncao(f, id)).length;
          return [f.id, r ? (r.funcao.id === f.id ? n : `via ${r.funcao.id}`) : 0];
        }),
      );
      return [nivel, { exercicios: possiveisNo(c, nivel).map((e) => e.id), funcoes }];
    }),
  );
  const av = possiveisNo(c, 'avancado');
  const porMusculo = Object.fromEntries(MUSCULOS.map((m) => [m, av.filter((e) => e.musculos.primarios.includes(m)).length]));
  return { id: c.id, nome: c.nome, membros: membros(c).map((x) => x.id), porMusculo, porNivel };
});

// ---------- saída ----------
const pct = (n: number, d: number) => (d ? Math.round((1000 * n) / d) / 10 : 0);
const pv = (n: number) => `${String(n).replace('.', ',')}%`;
const mediana = (xs: number[]) => {
  const s = [...xs].sort((x, y) => x - y);
  return s.length ? s[Math.floor(s.length / 2)]! : 0;
};
const virg = (n: number) => String(Math.round(n * 10) / 10).replace('.', ',');
const json = {
  grade: { amostra: amostra || 1, programas, cenarios: CENARIOS_MIN.length, classes: REPRESENTANTES.length },
  classes: REPRESENTANTES.map((c) => ({ representante: c.id, membros: membros(c).map((x) => x.id) })),
  contagem,
  porCenario: Object.fromEntries(
    REPRESENTANTES.map((c) => {
      const a = acc.get(c.id) ?? novo();
      return [
        c.id,
        {
          programas: a.programas,
          mediaSeries: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, Math.round((10 * (a.soma[m] ?? 0)) / (a.programas || 1)) / 10])),
          zeroSemDorPct: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, pct(a.zeroSemDor[m] ?? 0, a.semDor)])),
          abaixoDe4SemDorPct: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, pct(a.abaixoDe4SemDor[m] ?? 0, a.semDor)])),
          vagasSemOpcao: a.vagas,
          semPuxarPct: pct(a.semPuxar, a.semDor),
          semPosterioresPct: pct(a.semPosteriores, a.semDor),
          avisoSemPuxadaComPuxarZerado: a.avisoSemPuxadaComPuxarZerado,
          avisosQueSugeremCompra: a.avisoCompra,
          motivoFalso: a.motivoFalso,
          abaixoDoLimiarSemAviso: a.abaixoSemAviso,
          guia: { ...a.guia, semNadaPct: pct(a.guia.nada, a.guia.animacao + a.guia.cartao + a.guia.nada), animacaoPct: pct(a.guia.animacao, a.guia.animacao + a.guia.cartao + a.guia.nada) },
          dor: Object.fromEntries(
            Object.entries(a.dor).map(([k, s]) => [k, { programas: s.programas, diasSoCore: s.soCore, diasDeSuperiorSemSuperior: s.superiorSemSuperior, diasVazios: s.vazio, violacao: s.violacao, articulacaoIncompleta: s.incompleta, exercicios: [...s.exercicios].sort() }]),
          ),
          tempo: Object.fromEntries(
            Object.entries(a.tempo).map(([m, t]) => [
              m,
              {
                programas: t.programas,
                exerciciosPorDia: Math.round((10 * t.exercicios) / (t.dias || 1)) / 10,
                cabem: exerciciosPorSessao(Number(m)),
                seriesPorExercicio: Math.round((10 * t.series) / (t.exercicios || 1)) / 10,
                noTetoDeSeriesPct: pct(t.noTeto, t.exercicios),
                diaMaisLongoMediana: mediana(t.maxDia),
                sobraMaisDe30Pct: pct(t.sobra, t.programas),
              },
            ]),
          ),
        },
      ];
    }),
  ),
  cobertura,
  exemplos,
};
mkdirSync(SAIDA, { recursive: true });
writeFileSync(`${SAIDA}/estresse.json`, JSON.stringify(json, null, 1) + '\n');

// Markdown: estresse
const L: string[] = [];
const linha = (...xs: (string | number)[]) => L.push(`| ${xs.join(' | ')} |`);
const pc = json.porCenario;
const ids = REPRESENTANTES.map((c) => c.id);
const nomeClasse = (id: string) => {
  const ms = membros(CENARIOS_MIN.find((c) => c.id === id)!);
  return ms.length > 1 ? `${id} (= ${ms.length - 1} outros)` : id;
};
L.push('# Teste de estresse do cenário de equipamento mínimo', '');
L.push(`> Gerado por \`npm run auditoria:minimo\`${amostra ? ` com \`--amostra ${amostra}\`` : ''}. Dados fictícios (\`scripts/auditoria/minimo-cenarios.ts\`). Não editar à mão.`, '');
L.push(
  `**${programas.toLocaleString('pt-BR')} programas**: ${CENARIOS_MIN.length} cenários (o inventário vazio, os ${CENARIOS_MIN.filter((c) => c.tipo === 'item').length} itens sozinhos e ${CENARIOS_MIN.filter((c) => c.tipo === 'par').length} pares de casa), que dão **${REPRESENTANTES.length} programas diferentes** (cenários com as mesmas capacidades geram o mesmo programa e rodam uma vez), × 3 níveis × ${DIVISAO_IDS.length} divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor${amostra ? `, 1 a cada ${amostra}` : ''}.`,
  '',
);
L.push('## Classes de cenários', '', 'Os itens que, sozinhos, não abrem nenhum exercício a mais que o inventário vazio ficam na classe do vazio.', '');
linha('classe', 'cenários');
linha('---', '---');
for (const c of REPRESENTANTES) linha(c.id, membros(c).map((x) => x.id).join(', '));
L.push('', '## Problemas encontrados (contagem de ocorrências)', '');
linha('problema', 'ocorrências');
linha('---', '---:');
for (const [id, n] of Object.entries(contagem).sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]))) linha(`\`${id}\``, n.toLocaleString('pt-BR'));
L.push('', '## Volume: séries semanais, média por cenário (todas as situações)', '');
linha('cenário', ...MUSCULOS_COM_META.map((m) => NOME_MUSCULO[m]));
linha('---', ...MUSCULOS_COM_META.map(() => '---:'));
for (const id of ids) linha(nomeClasse(id), ...MUSCULOS_COM_META.map((m) => virg(pc[id]!.mediaSeries[m]!)));
L.push('', '### Sem dor: % dos programas com o músculo em 0 série na semana', '');
linha('cenário', ...MUSCULOS_COM_META.map((m) => NOME_MUSCULO[m]));
linha('---', ...MUSCULOS_COM_META.map(() => '---:'));
for (const id of ids) linha(nomeClasse(id), ...MUSCULOS_COM_META.map((m) => pv(pc[id]!.zeroSemDorPct[m])));
L.push('', '## O que o app diz quando a vaga fica sem opção', '');
L.push(
  'Por programa e por função da divisão que ficou sem exercício possível por falta de equipamento (não por dor). "Aviso da vaga" = o texto da `lacuna` da função ("Sem cadeira extensora: …"). "Só aviso do músculo" = a vaga some e só aparece "Abaixo da meta semanal: costas 0 de 6". "Coberto" = outra vaga deu volume ao músculo. "Sem meta: nada" = o ombro anterior e os adutores não têm meta, então nada aparece.',
  '',
);
linha('cenário', 'função', 'aviso da vaga', 'só aviso do músculo', 'coberto por outra vaga', 'sem meta: nada', 'nada');
linha('---', '---', '---:', '---:', '---:', '---:', '---:');
for (const id of ids)
  for (const [f, t] of Object.entries(pc[id]!.vagasSemOpcao).sort())
    linha(nomeClasse(id), f, t['aviso da vaga'] ?? 0, t['só aviso do músculo'] ?? 0, t['músculo coberto por outra vaga'] ?? 0, t['músculo sem meta: nada'] ?? 0, t.nada ?? 0);
L.push('', `- Avisos que sugerem comprar algo, em todos os cenários: **${ids.reduce((t, id) => t + pc[id]!.avisosQueSugeremCompra, 0)}**.`);
L.push(`- "Nenhum exercício possível" dito para um músculo que tinha exercício possível: **${ids.reduce((t, id) => t + pc[id]!.motivoFalso, 0)}**.`);
L.push(`- Músculo com meta abaixo do limiar (a meta, se prioridade; senão, 4 séries) sem aviso: **${ids.reduce((t, id) => t + pc[id]!.abaixoDoLimiarSemAviso, 0)}**.`);
L.push(`- Programas sem nenhuma série de puxar com o aviso \`equipamento.sem-puxada-vertical\`: **${ids.reduce((t, id) => t + pc[id]!.avisoSemPuxadaComPuxarZerado, 0)}** (ele só dispara quando a puxada cai para uma remada).`, '');
L.push('## Equilíbrio (sem dor)', '');
linha('cenário', 'empurra e não puxa', 'joelho sem posteriores da coxa');
linha('---', '---:', '---:');
for (const id of ids) linha(nomeClasse(id), pv(pc[id]!.semPuxarPct), pv(pc[id]!.semPosterioresPct));
L.push('', '## Tempo (sem dor)', '', 'Exercícios por dia no programa × os que cabem nos minutos (`tempo.exercicios-por-sessao`), séries por exercício e o dia mais longo.', '');
linha('cenário', 'minutos', 'cabem', 'exercícios por dia', 'séries por exercício', 'no teto de 4 séries', 'dia mais longo (mediana, min)', 'sobra > 30%');
linha('---', '---:', '---:', '---:', '---:', '---:', '---:', '---:');
for (const id of ids)
  for (const m of ['20', '30', '45', '60', '90']) {
    const t = pc[id]!.tempo[m];
    if (t) linha(nomeClasse(id), m, t.cabem, virg(t.exerciciosPorDia), virg(t.seriesPorExercicio), pv(t.noTetoDeSeriesPct), t.diaMaisLongoMediana, pv(t.sobraMaisDe30Pct));
  }
L.push('', '## Guia: prescrições com animação, só cartão e sem nada', '');
linha('cenário', 'com animação', 'só cartão de texto', 'sem guia nenhum');
linha('---', '---:', '---:', '---:');
for (const id of ids) {
  const g = pc[id]!.guia;
  const tot = g.animacao + g.cartao + g.nada || 1;
  linha(nomeClasse(id), pv(pct(g.animacao, tot)), pv(pct(g.cartao, tot)), pv(pct(g.nada, tot)));
}
L.push('', '## Segurança: o que sobra com dor, no inventário vazio e com um aparelho só', '');
linha('cenário', 'dor', 'dias só com abdominal', 'dias de superior sem tronco nem braço', 'dias vazios', 'carrega a região', 'região que o dado não marca', 'exercícios que sobram');
linha('---', '---', '---:', '---:', '---:', '---:', '---:', '---');
for (const id of ids)
  for (const [d, s] of Object.entries(pc[id]!.dor))
    if (d !== 'sem dor' && d !== 'ombro 4') linha(nomeClasse(id), d, s.diasSoCore, s.diasDeSuperiorSemSuperior, s.diasVazios, s.violacao, s.articulacaoIncompleta, s.exercicios.join(', ') || '—');
L.push('', '## Exemplos (3 por problema, de cenários diferentes)', '');
for (const [id, ex] of Object.entries(exemplos).sort()) {
  L.push(`### \`${id}\``, '');
  for (const e of ex) L.push(`- **${e.caso}**: ${e.problema}.`, `  - Programa: ${e.programa}`);
  L.push('');
}
writeFileSync(`${SAIDA}/estresse.md`, L.join('\n'));

// Markdown: cobertura
const C: string[] = [
  '# Mapa da cobertura do cenário de equipamento mínimo',
  '',
  '> Gerado por `npm run auditoria:minimo`. Quantos exercícios da biblioteca cada cenário abre, sem dor. **0** = nenhum; **1** = depende de um exercício só. Não editar à mão.',
  '',
  '## Por músculo (exercícios com o músculo como principal, nível avançado)',
  '',
];
const marca = (n: number | string) => (n === 0 ? '**0**' : n === 1 ? '**1**' : String(n));
const ms = MUSCULOS.filter((m) => m !== 'ombro_anterior');
C.push(`| cenário | total | ${ms.map((m) => NOME_MUSCULO[m]).join(' | ')} |`, `| --- | ---: | ${ms.map(() => '---:').join(' | ')} |`);
for (const c of cobertura) C.push(`| ${nomeClasse(c.id)} | ${c.porNivel.avancado!.exercicios.length} | ${ms.map((m) => marca(c.porMusculo[m]!)).join(' | ')} |`);
for (const nivel of NIVEIS) {
  C.push('', `## Por função (a vaga do gerador), nível ${nivel}`, '', 'Exercícios possíveis na função (somando os níveis); "via" = a função vazia usa outra no lugar (`seNada`).', '');
  C.push(`| cenário | ${FUNCOES.map((f) => f.id).join(' | ')} | sem opção |`, `| --- | ${FUNCOES.map(() => '---:').join(' | ')} | ---: |`);
  for (const c of cobertura) {
    const fs = c.porNivel[nivel]!.funcoes;
    C.push(`| ${nomeClasse(c.id)} | ${FUNCOES.map((f) => marca(fs[f.id]!)).join(' | ')} | ${Object.values(fs).filter((v) => v === 0).length} |`);
  }
}
C.push('', '## Exercícios possíveis por cenário (iniciante)', '');
for (const c of cobertura) C.push(`- **${nomeClasse(c.id)}** (${c.porNivel.iniciante!.exercicios.length}): ${c.porNivel.iniciante!.exercicios.join(', ')}.`);
C.push('', '## Cenários', '');
for (const c of CENARIOS_MIN) C.push(`- **${c.id}**: ${c.nome}.`);
C.push('');
writeFileSync(`${SAIDA}/cobertura.md`, C.join('\n'));
console.log(`${programas} programas (${REPRESENTANTES.length} classes) em ${segundos} s; ${Object.keys(contagem).length} tipos de problema. Saída em ${SAIDA}/`);
