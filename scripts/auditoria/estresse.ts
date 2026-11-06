// Teste de estresse do gerador (auditoria do treino, Parte B). Uso:
//   npm run auditoria:estresse              (a grade inteira)
//   npm run auditoria:estresse -- --amostra 50   (1 caso a cada 50, para conferir rápido)
// Gera docs/revisoes/auditoria/estresse.json e estresse.md. Determinístico: a mesma grade dá os mesmos números.
// Só dados fictícios (scripts/auditoria/cenarios.ts).
import { writeFileSync, mkdirSync } from 'node:fs';
import { BIBLIOTECA, POR_ID, type Articulacao, type Musculo } from '../../src/domain/biblioteca';
import { SEM_EXERCICIO, ehAvisoDeMeta, musculosDoAviso, contextoDeSelecao, gerarPrograma, MUSCULOS_COM_META, NOME_MUSCULO, type Programa } from '../../src/domain/gerador';
import { DIVISOES, DIVISOES_OFERECIDAS } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { diaNoLocal } from '../../src/domain/locais';
import { NIVEIS, NIVEL_COMPLEXIDADE_MAX, VOLUME } from '../../src/domain/regras';
import { capacidades } from '../../src/domain/taxonomia/equipamentos';
import { CENARIO, CENARIOS, PARES_DE_LOCAIS, grade, nomeDoCaso, perfil, type Caso } from './cenarios';
import { articulacoesEsperadas } from './articulacoes';

const args = process.argv.slice(2);
const amostra = Number(args[args.indexOf('--amostra') + 1]) || 0;
const SAIDA = 'docs/revisoes/auditoria';

// ---------- acumuladores ----------
type Exemplo = { caso: string; programa: string; problema: string };
const exemplos: Record<string, Exemplo[]> = {};
const contagem: Record<string, number> = {};
function problema(id: string, caso: Caso | string, p: Programa | null, texto: string) {
  contagem[id] = (contagem[id] ?? 0) + 1;
  const lista = (exemplos[id] ??= []);
  // 3 exemplos por problema, de cenários diferentes quando der (o 1º de cada cenário, na ordem da grade).
  const nome = typeof caso === 'string' ? caso : nomeDoCaso(caso);
  const cen = nome.split(' · ')[0];
  if (lista.length < 3 && !lista.some((e) => e.caso.split(' · ')[0] === cen)) lista.push({ caso: nome, programa: p ? resumo(p) : '', problema: texto });
}
const resumo = (p: Programa) =>
  p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}${x.dropSet ? '+drop' : ''}`).join(', ')}`).join(' | ');

const porCenario = new Map<string, { programas: number; abaixo: Record<string, number>; abaixoPrio: Record<string, number>; somaVol: Record<string, number>; acimaMax: Record<string, number> }>();
const usosVaga = new Map<string, number>();
const usosAlt = new Map<string, number>();
const usosVagaPorCenario = new Map<string, Map<string, number>>();
const usosAltPorCenario = new Map<string, Set<string>>();
let programas = 0;
let bloqueados = 0;
const tempo = { dias: 0, acima: 0, acimaSemAviso: 0, sobraMuito: 0, sobraComAbaixoPorMinutos: 0 };
const sobraPorMinutos: Record<number, { programas: number; sobra: number; maxDia: number[] }> = {};
const balanco = { puxarSobreEmpurrar: [] as number[], posterioresSobreQuadriceps: [] as number[] };
const monotonia = { programas3dias: 0, exercicioEmTodosOsDias: 0, repeteComOpcaoParada: 0 };
const seguranca = { comDorExcluida: 0, violacao: 0, dorLeveSemLembrete: 0, dorLeveNaoPoupou: 0, articulacaoIncompleta: 0, avisoSemMotivo: 0 };
const ocorrenciasArticulacao = new Map<string, number>();
// Só os casos "limpos" (sem dor e com 45 min ou mais), para separar o limite do equipamento do efeito da dor e do tempo curto.
const limpo = new Map<string, { programas: number; abaixoPrio: Record<string, number>; prio: Record<string, number>; abaixoDemais: Record<string, number> }>();
// Motivo de cada aviso "abaixo da meta", por músculo (o texto do próprio app, agrupado).
const motivos = new Map<string, number>();
const motivoDe = (t: string) =>
  t.includes('por falta de tempo')
    ? 'corte de tempo'
    : t.includes('por causa da dor') || t.includes('a dor ')
      ? 'dor'
      : t.includes('nenhum exercício possível') || t.startsWith(SEM_EXERCICIO) || t.startsWith('Sem algo para puxar')
        ? 'nenhum exercício possível'
        : t.includes('cabem cerca de') || t.includes('cabem ~')
          ? 'minutos (exercícios por treino)'
          : t.includes('não tem vaga própria')
            ? 'divisão sem vaga própria'
            : t.includes('não cabe mais')
              ? 'divisão: séries por exercício e por sessão no teto'
              : 'outro';

// ---------- a grade ----------
const inicio = Date.now();
for (const caso of grade({ amostra })) {
  const pf = perfil({ nivel: caso.nivel, divisao: caso.divisao, minutos: caso.minutos, prioridades: caso.prioridade.grupos, dores: caso.dor.dores });
  const res = gerarPrograma(pf, caso.cenario.inventario);
  if (res.status !== 'ok') {
    bloqueados++;
    problema('bloqueado', caso, null, 'o gerador bloqueou o programa');
    continue;
  }
  const p = res.programa;
  programas++;
  const ctx = contextoDeSelecao(pf, caso.cenario.inventario);
  const cid = caso.cenario.id;
  const prio = new Set<Musculo>(caso.prioridade.grupos.flatMap((g) => ({ peito: ['peito'], costas: ['costas'], ombros: ['ombro_lateral'], bracos: ['biceps', 'triceps'], pernas: ['quadriceps', 'posteriores', 'panturrilha'], gluteos: ['gluteos'], abdomen: ['abdomen'] })[g] as Musculo[]));

  // Volume (volume.semanal.*)
  const c = porCenario.get(cid) ?? { programas: 0, abaixo: {}, abaixoPrio: {}, somaVol: {}, acimaMax: {} };
  porCenario.set(cid, c);
  c.programas++;
  for (const m of MUSCULOS_COM_META) {
    const v = p.volumeSemanal[m] ?? 0;
    const meta = p.metas[m] ?? 0;
    const limiar = prio.has(m) ? meta : Math.min(meta, VOLUME.minimoEficazPiso);
    c.somaVol[m] = (c.somaVol[m] ?? 0) + v;
    if (v < limiar) {
      c.abaixo[m] = (c.abaixo[m] ?? 0) + 1;
      if (prio.has(m)) c.abaixoPrio[m] = (c.abaixoPrio[m] ?? 0) + 1;
      if (!p.avisos.some((a) => a.texto.includes(NOME_MUSCULO[m]))) problema('volume.abaixo-sem-aviso', caso, p, `${NOME_MUSCULO[m]} com ${v} de ${meta} séries, sem aviso`);
      if (v === 0 && ['peito', 'costas', 'quadriceps', 'posteriores', 'gluteos'].includes(m) && !caso.dor.dores.length)
        problema(`volume.zero.${m}`, caso, p, `${NOME_MUSCULO[m]} com 0 série na semana, sem dor nenhuma`);
    }
    if (v > VOLUME.maximo[caso.nivel] && !prio.has(m)) {
      c.acimaMax[m] = (c.acimaMax[m] ?? 0) + 1;
      problema(`volume.excesso.${m}`, caso, p, `${NOME_MUSCULO[m]} sem prioridade com ${v} séries (máximo do nível ${VOLUME.maximo[caso.nivel]})`);
    }
    if (v > VOLUME.teto) problema('volume.acima-do-teto', caso, p, `${NOME_MUSCULO[m]} com ${v} séries`);
  }
  if (!caso.dor.dores.length && caso.minutos >= 45) {
    const l = limpo.get(cid) ?? { programas: 0, abaixoPrio: {}, prio: {}, abaixoDemais: {} };
    limpo.set(cid, l);
    l.programas++;
    for (const m of MUSCULOS_COM_META) {
      const v = p.volumeSemanal[m] ?? 0;
      if (prio.has(m)) {
        l.prio[m] = (l.prio[m] ?? 0) + 1;
        if (v < (p.metas[m] ?? 0)) l.abaixoPrio[m] = (l.abaixoPrio[m] ?? 0) + 1;
      } else if (v < Math.min(p.metas[m] ?? 0, VOLUME.minimoEficazPiso)) l.abaixoDemais[m] = (l.abaixoDemais[m] ?? 0) + 1;
    }
    for (const a of p.avisos.filter(ehAvisoDeMeta))
      for (const m of MUSCULOS_COM_META)
        if (musculosDoAviso(a).includes(m)) {
          const k = `${m}|${motivoDe(a.texto)}`;
          motivos.set(k, (motivos.get(k) ?? 0) + 1);
        }
  }
  // Equilíbrio: puxar × empurrar (séries dos padrões) e posteriores × quadríceps (volume semanal)
  const series = (padroes: string[]) => p.dias.flatMap((d) => d.exercicios).filter((x) => padroes.includes(x.padrao)).reduce((t, x) => t + x.series, 0);
  const emp = series(['empurrar-h', 'empurrar-v']);
  const pux = series(['puxar-h', 'puxar-v']);
  if (emp && pux) balanco.puxarSobreEmpurrar.push(pux / emp);
  if (emp > 0 && pux === 0 && !caso.dor.dores.length) problema('equilibrio.sem-puxar', caso, p, `${emp} séries de empurrar e nenhuma de puxar`);
  const q = p.volumeSemanal.quadriceps ?? 0;
  const pt = p.volumeSemanal.posteriores ?? 0;
  if (q && pt) balanco.posterioresSobreQuadriceps.push(pt / q);

  // Escolha: usos como vaga e como alternativa
  const uv = usosVagaPorCenario.get(cid) ?? new Map<string, number>();
  usosVagaPorCenario.set(cid, uv);
  const ua = usosAltPorCenario.get(cid) ?? new Set<string>();
  usosAltPorCenario.set(cid, ua);
  for (const x of p.dias.flatMap((d) => d.exercicios)) {
    usosVaga.set(x.exId, (usosVaga.get(x.exId) ?? 0) + 1);
    uv.set(x.exId, (uv.get(x.exId) ?? 0) + 1);
    for (const a of x.alternativas) {
      usosAlt.set(a, (usosAlt.get(a) ?? 0) + 1);
      ua.add(a);
    }
  }
  // Monotonia: com 3 dias ou mais, o mesmo exercício (fora o core) em todos os dias; e repetir quando havia outro
  // equivalente do mesmo nível da função possível e parado (selecao.funcao-da-vaga: variedade entre os dias).
  if (p.dias.length >= 3) {
    monotonia.programas3dias++;
    const dias = new Map<string, number>();
    for (const d of p.dias) for (const id of new Set(d.exercicios.map((x) => x.exId))) dias.set(id, (dias.get(id) ?? 0) + 1);
    const todos = [...dias].filter(([id, n]) => n === p.dias.length && POR_ID[id]!.padrao !== 'core');
    if (todos.length) {
      monotonia.exercicioEmTodosOsDias++;
      problema('monotonia.todos-os-dias', caso, p, `${todos.map(([id]) => id).join(', ')} em todos os ${p.dias.length} dias`);
    }
    const usadosNoPrograma = new Set(dias.keys());
    for (const [id, n] of dias) {
      if (n < 2) continue;
      const x = p.dias.flatMap((d) => d.exercicios).find((y) => y.exId === id)!;
      const f = x.funcao ? FUNCAO[x.funcao] : undefined;
      if (!f) continue;
      const nivel = f.niveis.findIndex((ids) => ids.includes(id));
      const parados = (f.niveis[nivel] ?? []).filter((o) => o !== id && ctx.naFuncao(f, o) && !usadosNoPrograma.has(o));
      if (parados.length) {
        monotonia.repeteComOpcaoParada++;
        problema('monotonia.repete-com-opcao', caso, p, `${id} em ${n} dias (${f.id}), com ${parados.join(', ')} do mesmo nível possível e sem uso`);
        break;
      }
    }
  }

  // Tempo (tempo.corte; tempo.exercicios-por-sessao)
  const maxDia = Math.max(...p.dias.map((d) => d.minutosEstimados));
  const s = (sobraPorMinutos[caso.minutos] ??= { programas: 0, sobra: 0, maxDia: [] });
  s.programas++;
  s.maxDia.push(maxDia);
  for (const d of p.dias) {
    tempo.dias++;
    if (d.minutosEstimados > caso.minutos) {
      tempo.acima++;
      if (!p.avisos.some((a) => a.regraId === 'tempo.corte' && a.texto.startsWith(`${d.nome}:`))) {
        tempo.acimaSemAviso++;
        problema('tempo.acima-sem-aviso', caso, p, `${d.nome}: ${d.minutosEstimados} min de ${caso.minutos}, sem aviso`);
      }
    }
  }
  if (maxDia < 0.7 * caso.minutos) {
    tempo.sobraMuito++;
    s.sobra++;
    const porMinutos = p.avisos.find((a) => a.texto.includes('cabem cerca de'));
    if (porMinutos) {
      tempo.sobraComAbaixoPorMinutos++;
      problema('tempo.sobra-com-meta-cortada', caso, p, `o dia mais longo tem ${maxDia} de ${caso.minutos} min, mas: "${porMinutos.texto}"`);
    } else if (caso.minutos >= 60 && p.avisos.some(ehAvisoDeMeta))
      problema('tempo.sobra-com-meta-abaixo', caso, p, `o dia mais longo tem ${maxDia} de ${caso.minutos} min e há músculo abaixo da meta`);
  }

  // Segurança (seguranca.dor.programa)
  const excluidas = new Set<Articulacao>(caso.dor.dores.filter((d) => d.nota > 5).map((d) => d.articulacao));
  const leves = caso.dor.dores.filter((d) => d.nota >= 3 && d.nota <= 5).map((d) => d.articulacao);
  if (excluidas.size) seguranca.comDorExcluida++;
  for (const d of p.dias)
    for (const x of d.exercicios) {
      const e = POR_ID[x.exId]!;
      const carrega = e.articulacoes.filter((a) => excluidas.has(a));
      if (carrega.length) {
        seguranca.violacao++;
        problema('seguranca.carrega-excluida', caso, p, `${x.exId} carrega ${carrega.join(', ')}`);
      }
      // Pelo padrão de movimento, o exercício carrega uma região com dor > 5 que o dado não marca?
      const faltando = articulacoesEsperadas(e).filter((a) => excluidas.has(a) && !e.articulacoes.includes(a));
      if (faltando.length) {
        seguranca.articulacaoIncompleta++;
        ocorrenciasArticulacao.set(`${x.exId}:${faltando.join('+')}`, (ocorrenciasArticulacao.get(`${x.exId}:${faltando.join('+')}`) ?? 0) + 1);
        problema(`seguranca.articulacao-incompleta.${faltando.join('+')}`, caso, p, `${x.exId} fica no programa com dor ${faltando.join(' e ')} > 5: o dado não marca essa região`);
      }
      for (const a of leves.filter((a) => e.articulacoes.includes(a))) {
        if (!x.porque.some((q) => q.regraId === 'seguranca.dor.programa' && q.texto.includes(a))) {
          seguranca.dorLeveSemLembrete++;
          problema('seguranca.dor-leve-sem-lembrete', caso, p, `${x.exId} carrega ${a} (dor ${caso.dor.dores.find((y) => y.articulacao === a)!.nota}) sem lembrete`);
        }
        const f = x.funcao ? FUNCAO[x.funcao] : undefined;
        if (f) {
          const nivel = f.niveis.findIndex((ids) => ids.includes(x.exId));
          const poupa = (f.niveis[nivel] ?? []).filter((o) => o !== x.exId && ctx.naFuncao(f, o) && !POR_ID[o]!.articulacoes.includes(a) && !d.exercicios.some((y) => y.exId === o));
          if (poupa.length) {
            seguranca.dorLeveNaoPoupou++;
            problema('seguranca.dor-leve-nao-poupou', caso, p, `${x.exId} carrega ${a} (dor leve), e ${poupa.join(', ')} poupava a região`);
          }
        }
      }
    }
  for (const a of excluidas)
    if (!p.avisos.some((x) => x.regraId === 'seguranca.dor.programa' && x.texto.includes(a))) {
      seguranca.avisoSemMotivo++;
      problema('seguranca.aviso-sem-motivo', caso, p, `dor no(a) ${a} sem o aviso da dor`);
    }
  // Dia sem exercício principal (selecao.dia-sem-principal)
  for (const d of p.dias)
    if (!d.exercicios.some((x) => x.padrao !== 'core')) problema('dia.so-core', caso, p, `${d.nome} só com abdominal`);
  if (!p.dias.every((d) => d.exercicios.length)) problema('dia.vazio', caso, p, 'um dia sem exercício');
}
const segundos = Math.round((Date.now() - inicio) / 1000);

// ---------- vagas sem opção: por cenário × função, com o nível da 1ª opção possível ----------
const resolucao: Record<string, Record<string, string>> = {};
for (const cen of CENARIOS)
  for (const nivel of NIVEIS) {
    const pf = perfil({ nivel, divisao: 'ct-abc', minutos: 60, prioridades: [], dores: [] });
    const ctx = contextoDeSelecao(pf, cen.inventario);
    for (const f of Object.values(FUNCAO)) {
      const r = ctx.resolver({ funcao: f.id });
      const opcoes = f.niveis.flat().filter((id) => ctx.naFuncao(f, id));
      const k = `${cen.id}|${nivel}`;
      (resolucao[k] ??= {})[f.id] = !r ? (f.seNada ? `nenhuma (vira ${f.seNada})` : 'nenhuma') : `${opcoes.length} (${r.funcao.id === f.id ? `nível ${r.nivel + 1}` : `via ${r.funcao.id}`})`;
    }
  }

// ---------- treino do dia num 2º local (local.treino-do-dia) ----------
const locais = { dias: 0, trocas: 0, vagasFora: 0, exemplos: [] as string[] };
for (const [a, b] of PARES_DE_LOCAIS)
  for (const nivel of NIVEIS) {
    const pf = perfil({ nivel, divisao: 'si-2x', minutos: 60, prioridades: [], dores: [] });
    const res = gerarPrograma(pf, CENARIO[a]!.inventario);
    if (res.status !== 'ok') continue;
    for (const d of res.programa.dias) {
      const n = diaNoLocal(d, pf, CENARIO[b]!.inventario);
      locais.dias++;
      locais.trocas += n.trocas.filter((t) => t.entrou).length;
      const fora = n.trocas.filter((t) => !t.entrou);
      locais.vagasFora += fora.length;
      if (fora.length && locais.exemplos.length < 6) locais.exemplos.push(`${a} → ${b} · ${nivel} · ${d.nome}: fora hoje ${fora.map((t) => `${t.vaga} (${t.motivo})`).join('; ')}`);
    }
  }

// ---------- exercícios que nunca aparecem ----------
const possiveisEm = (cid: string) => {
  const caps = capacidades(CENARIO[cid]!.inventario);
  return BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((x) => caps.has(x))) && e.complexidade <= NIVEL_COMPLEXIDADE_MAX.avancado).map((e) => e.id);
};
const nuncaPorCenario = Object.fromEntries(
  CENARIOS.map((c) => {
    const uv = usosVagaPorCenario.get(c.id) ?? new Map();
    const ua = usosAltPorCenario.get(c.id) ?? new Set();
    const poss = possiveisEm(c.id);
    return [c.id, { possiveis: poss.length, usados: poss.filter((id) => uv.has(id)).length, nuncaVaga: poss.filter((id) => !uv.has(id)), nuncaNemAlternativa: poss.filter((id) => !uv.has(id) && !ua.has(id)) }];
  }),
);

// ---------- saída ----------
const pct = (n: number, d: number) => (d ? Math.round((1000 * n) / d) / 10 : 0);
const mediana = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? Math.round(100 * s[Math.floor(s.length / 2)]!) / 100 : 0;
};
const quantil = (xs: number[], q: number) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? Math.round(100 * s[Math.floor(q * (s.length - 1))]!) / 100 : 0;
};
const ranking = [...usosVaga].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
const guia = (id: string) => (POR_ID[id]!.animacaoId ? 'animação' : '');
const json = {
  grade: { amostra: amostra || 1, programas, bloqueados, segundos: undefined as unknown },
  contagem,
  exemplos,
  volume: Object.fromEntries(
    [...porCenario].map(([cid, c]) => [
      cid,
      {
        programas: c.programas,
        abaixoPct: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, pct(c.abaixo[m] ?? 0, c.programas)])),
        abaixoPrioPct: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, c.abaixoPrio[m] ?? 0])),
        media: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, Math.round((10 * (c.somaVol[m] ?? 0)) / c.programas) / 10])),
        acimaDoMaximoSemPrioridade: c.acimaMax,
      },
    ]),
  ),
  equilibrio: {
    puxarSobreEmpurrar: { p10: quantil(balanco.puxarSobreEmpurrar, 0.1), mediana: mediana(balanco.puxarSobreEmpurrar), p90: quantil(balanco.puxarSobreEmpurrar, 0.9) },
    posterioresSobreQuadriceps: { p10: quantil(balanco.posterioresSobreQuadriceps, 0.1), mediana: mediana(balanco.posterioresSobreQuadriceps), p90: quantil(balanco.posterioresSobreQuadriceps, 0.9) },
  },
  escolha: {
    usosComoVaga: Object.fromEntries(ranking),
    usosComoAlternativa: Object.fromEntries([...usosAlt].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
    nuncaPorCenario,
    resolucao,
  },
  limpo: Object.fromEntries(
    [...limpo].map(([cid, l]) => [
      cid,
      {
        programas: l.programas,
        prioritarioAbaixoDaMetaPct: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, pct(l.abaixoPrio[m] ?? 0, l.prio[m] ?? 0)])),
        demaisAbaixoDe4Pct: Object.fromEntries(MUSCULOS_COM_META.map((m) => [m, pct(l.abaixoDemais[m] ?? 0, l.programas - (l.prio[m] ?? 0))])),
      },
    ]),
  ),
  motivosAbaixo: Object.fromEntries([...motivos].sort((a, b) => b[1] - a[1])),
  monotonia,
  tempo: { ...tempo, porMinutos: Object.fromEntries(Object.entries(sobraPorMinutos).map(([m, s]) => [m, { programas: s.programas, sobraMaisDe30pct: s.sobra, diaMaisLongoMediana: mediana(s.maxDia) }])) },
  seguranca: { ...seguranca, articulacaoIncompletaPorExercicio: Object.fromEntries([...ocorrenciasArticulacao].sort((a, b) => b[1] - a[1])) },
  locais,
};
mkdirSync(SAIDA, { recursive: true });
// O tempo de execução fica fora do arquivo, para a mesma grade gerar o mesmo arquivo.
delete (json.grade as { segundos?: unknown }).segundos;
writeFileSync(`${SAIDA}/estresse.json`, JSON.stringify(json, null, 1) + '\n');

// Markdown legível
const L: string[] = [];
const linha = (...xs: (string | number)[]) => L.push(`| ${xs.join(' | ')} |`);
L.push('# Teste de estresse do gerador (auditoria do treino)', '');
L.push(`> Gerado por \`npm run auditoria:estresse\`${amostra ? ` com \`--amostra ${amostra}\`` : ''}. Dados fictícios (\`scripts/auditoria/cenarios.ts\`). Não editar à mão.`, '');
L.push(`**${programas.toLocaleString('pt-BR')} programas** (${CENARIOS.length} cenários × 3 níveis × ${DIVISOES_OFERECIDAS.length} divisões de 2 a 6 dias × 8 durações de 20 a 150 min × 5 prioridades × 8 situações de dor${amostra ? `, 1 a cada ${amostra}` : ''}); ${bloqueados} bloqueados.`, '');
L.push('## Problemas encontrados (contagem de ocorrências)', '');
linha('problema', 'ocorrências');
linha('---', '---:');
for (const [id, n] of Object.entries(contagem).sort((a, b) => b[1] - a[1])) linha(`\`${id}\``, n.toLocaleString('pt-BR'));
L.push('', '## Volume: % dos programas com o músculo abaixo do limiar', '', 'Limiar: a meta, se o músculo é prioridade; senão, 4 séries (o piso do mínimo eficaz).', '');
linha('cenário', ...MUSCULOS_COM_META.map((m) => NOME_MUSCULO[m]));
linha('---', ...MUSCULOS_COM_META.map(() => '---:'));
for (const [cid, v] of Object.entries(json.volume)) linha(cid, ...MUSCULOS_COM_META.map((m) => `${v.abaixoPct[m]}%`));
L.push('', '### Sem dor e com 45 min ou mais', '', 'Prioritário abaixo da meta (% dos programas em que o músculo é prioridade) / demais abaixo de 4 séries (% dos outros).', '');
linha('cenário', ...MUSCULOS_COM_META.map((m) => NOME_MUSCULO[m]));
linha('---', ...MUSCULOS_COM_META.map(() => '---:'));
for (const [cid, v] of Object.entries(json.limpo)) linha(cid, ...MUSCULOS_COM_META.map((m) => `${v.prioritarioAbaixoDaMetaPct[m]}% / ${v.demaisAbaixoDe4Pct[m]}%`));
L.push('', '### Motivo do aviso "abaixo da meta" (sem dor, 45 min ou mais)', '');
linha('músculo', 'motivo', 'avisos');
linha('---', '---', '---:');
for (const [k, n] of Object.entries(json.motivosAbaixo)) linha(NOME_MUSCULO[k.split('|')[0] as Musculo], k.split('|')[1]!, n.toLocaleString('pt-BR'));
L.push('', '### Séries semanais, média por cenário', '');
linha('cenário', ...MUSCULOS_COM_META.map((m) => NOME_MUSCULO[m]));
linha('---', ...MUSCULOS_COM_META.map(() => '---:'));
for (const [cid, v] of Object.entries(json.volume)) linha(cid, ...MUSCULOS_COM_META.map((m) => String(v.media[m]).replace('.', ',')));
L.push('', '## Equilíbrio', '');
L.push(`- Séries de puxar ÷ séries de empurrar: mediana ${json.equilibrio.puxarSobreEmpurrar.mediana} (10% dos programas abaixo de ${json.equilibrio.puxarSobreEmpurrar.p10}, 10% acima de ${json.equilibrio.puxarSobreEmpurrar.p90}).`);
L.push(`- Posteriores ÷ quadríceps (volume semanal): mediana ${json.equilibrio.posterioresSobreQuadriceps.mediana} (p10 ${json.equilibrio.posterioresSobreQuadriceps.p10}, p90 ${json.equilibrio.posterioresSobreQuadriceps.p90}).`, '');
L.push('## Escolha', '', '### Os 25 exercícios que mais aparecem como vaga', '');
linha('exercício', 'vezes', 'guia');
linha('---', '---:', '---');
for (const [id, n] of ranking.slice(0, 25)) linha(id, n.toLocaleString('pt-BR'), guia(id) || 'sem animação');
L.push('', '### Possíveis que nunca aparecem como vaga, por cenário', '');
linha('cenário', 'possíveis', 'aparecem', 'nunca como vaga', 'nem como alternativa');
linha('---', '---:', '---:', '---', '---');
for (const [cid, v] of Object.entries(nuncaPorCenario)) linha(cid, v.possiveis, v.usados, v.nuncaVaga.join(', ') || '—', v.nuncaNemAlternativa.join(', ') || '—');
L.push('', '### Funções sem opção ou com uma só (nível intermediário, sem dor)', '');
const fids = Object.keys(FUNCAO);
linha('cenário', ...fids);
linha('---', ...fids.map(() => '---'));
for (const cen of CENARIOS) linha(cen.id, ...fids.map((f) => resolucao[`${cen.id}|intermediario`]![f]!));
L.push('', '## Monotonia', '');
L.push(`- Programas de 3 dias ou mais com um exercício (fora o abdominal) em **todos** os dias: ${monotonia.exercicioEmTodosOsDias.toLocaleString('pt-BR')} de ${monotonia.programas3dias.toLocaleString('pt-BR')} (${pct(monotonia.exercicioEmTodosOsDias, monotonia.programas3dias)}%).`);
L.push(`- Programas que repetem um exercício em 2 dias ou mais com outro do mesmo nível da função possível e sem uso: ${monotonia.repeteComOpcaoParada.toLocaleString('pt-BR')} (${pct(monotonia.repeteComOpcaoParada, monotonia.programas3dias)}%).`, '');
L.push('## Tempo', '');
L.push(`- Dias acima dos minutos: ${tempo.acima.toLocaleString('pt-BR')} de ${tempo.dias.toLocaleString('pt-BR')} (${pct(tempo.acima, tempo.dias)}%); **sem aviso: ${tempo.acimaSemAviso}**.`);
L.push(`- Programas cujo dia mais longo usa menos de 70% dos minutos: ${tempo.sobraMuito.toLocaleString('pt-BR')} (${pct(tempo.sobraMuito, programas)}%); destes, ${tempo.sobraComAbaixoPorMinutos.toLocaleString('pt-BR')} ainda dizem que a meta ficou de fora "porque cabem cerca de N exercícios".`, '');
linha('minutos', 'programas', 'dia mais longo (mediana, min)', 'sobra > 30%');
linha('---:', '---:', '---:', '---:');
for (const [m, v] of Object.entries(json.tempo.porMinutos)) linha(m, v.programas, v.diaMaisLongoMediana, `${pct(v.sobraMaisDe30pct, v.programas)}%`);
L.push('', '## Segurança', '');
L.push(`- Programas com uma região acima de 5: ${seguranca.comDorExcluida.toLocaleString('pt-BR')}. Exercício que carrega a região marcada no dado: **${seguranca.violacao}**.`);
L.push(`- Exercício que, pelo padrão de movimento, carrega a região com dor > 5, mas o dado não marca (fica no programa): ${seguranca.articulacaoIncompleta.toLocaleString('pt-BR')} ocorrências.`);
L.push(`- Dor de 3 a 5 sem lembrete: ${seguranca.dorLeveSemLembrete}; com um equivalente do mesmo nível que poupava a região e ficou de fora: ${seguranca.dorLeveNaoPoupou}.`, '');
linha('exercício : região que falta', 'ocorrências');
linha('---', '---:');
for (const [k, n] of [...ocorrenciasArticulacao].sort((a, b) => b[1] - a[1]).slice(0, 25)) linha(k, n.toLocaleString('pt-BR'));
L.push('', '## Treino do dia num 2º local', '');
L.push(`- ${locais.dias} dias testados, ${locais.trocas} trocas por equivalente, ${locais.vagasFora} vagas que ficaram de fora no dia.`);
for (const e of locais.exemplos) L.push(`  - ${e}`);
L.push('', '## Exemplos (3 por problema, de cenários diferentes)', '');
for (const [id, ex] of Object.entries(exemplos).sort()) {
  L.push(`### \`${id}\``, '');
  for (const e of ex) L.push(`- **${e.caso}**: ${e.problema}.`, `  - Programa: ${e.programa}`);
  L.push('');
}
writeFileSync(`${SAIDA}/estresse.md`, L.join('\n'));
console.log(`${programas} programas em ${segundos} s; ${Object.keys(contagem).length} tipos de problema. Saída em ${SAIDA}/estresse.{json,md}`);
void DIVISOES;
