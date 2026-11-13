// O retrato medido (sessão "treino para todos", 12/11/2026): os 20 cuidados (cuidados.ts) em toda a população
// (populacao.ts), em duas contas: a grade inteira (cada combinação vale igual) e a ponderada (as combinações mais
// prováveis valem mais; os pesos são estimativa). Uso:
//   npx vite-node scripts/auditoria/retrato.ts --                        (a população inteira, em vários processos)
//   npx vite-node scripts/auditoria/retrato.ts -- --saida <pasta>        (onde gravar retrato.json e retrato.md)
//   npx vite-node scripts/auditoria/retrato.ts -- --motor <módulo>       (outro gerador: um protótipo com a mesma interface)
//   npx vite-node scripts/auditoria/retrato.ts -- --objetivo forca       (a população com outro objetivo, sem dor)
// Determinístico: sem relógio nem sorteio; os processos somam contagens e os exemplos são os de menor índice.
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { POR_ID } from '../../src/domain/biblioteca';
import type { contextoDeSelecao as Ctx, gerarPrograma as Gerar, Perfil, Programa } from '../../src/domain/gerador';
import { cuidadosQueFalham, MEDIDAS, MEDIDA_IDS, medirCuidados, type MedidaId } from './cuidados';
import { DORES_P, nomeDoCasoP, populacao, type CasoP } from './populacao';

const args = process.argv.slice(2);
const arg = (k: string) => (args.includes(k) ? args[args.indexOf(k) + 1] : undefined);
const parte = arg('--parte');
const saidaParcial = arg('--saida-parcial');
const processos = Math.max(1, Number(arg('--processos')) || Math.min(4, availableParallelism()));
const SAIDA = arg('--saida') ?? 'docs/revisoes/treino-para-todos/medidas/hoje';
const MOTOR = arg('--motor') ?? 'src/domain/gerador/index.ts';
const OBJETIVO = arg('--objetivo') as Perfil['objetivo'] | undefined;
/** Recorte para medidas rápidas de protótipo: só um nível (os índices dos casos não mudam). */
const SO_NIVEL = arg('--nivel');
const PIORES = 400;

type Motor = { gerarPrograma: typeof Gerar; contextoDeSelecao: typeof Ctx };
type Soma = Record<string, number>;
type Exemplo = { indice: number; caso: string; detalhe: string; programa: string };
type Pior = { indice: number; caso: string; chave: string; pontos: number; falhas: string[]; detalhes: string[]; programa: string };
/** `pioresPorMin`: os piores de cada duração (os de 30 min ocupam a lista geral inteira). */
type Acc = { n: Soma; w: Soma; exemplos: Record<string, Exemplo>; piores: Pior[]; pioresPorMin: Record<string, Pior[]> };
const A: Acc = { n: {}, w: {}, exemplos: {}, piores: [], pioresPorMin: {} };
const POR_MIN = 80;
const resumo = (p: Programa) => p.dias.map((d) => `${d.nome} (${d.minutosEstimados} min): ${d.exercicios.map((x) => `${x.exId} ${x.series}${x.dropSet ? '+drop' : ''}${x.supersetCom ? '+bi' : ''}`).join(', ')}`).join(' | ');

function medir(motor: Motor, caso: CasoP) {
  const semDor = caso.dor === 'sem dor';
  const recortes = [
    'todos',
    semDor ? 'semdor' : 'comdor',
    `dor:${caso.dor}`,
    `grupo:${caso.cen.grupo}`,
    `cen:${caso.cen.id}`,
    `nivel:${caso.pf.nivel}`,
    `min:${caso.pf.minutosSessao}`,
    `dias:${caso.pf.diasSemana}`,
    `foco:${caso.foco}`,
    `nivel×min:${caso.pf.nivel} ${caso.pf.minutosSessao}`,
    `nivel×dias:${caso.pf.nivel} ${caso.pf.diasSemana}`,
  ];
  const inc = (k: string, x = 1) => {
    for (const r of recortes) {
      const kk = `${r}|${k}`;
      A.n[kk] = (A.n[kk] ?? 0) + x;
      A.w[kk] = (A.w[kk] ?? 0) + x * caso.peso;
    }
  };
  const res = motor.gerarPrograma(caso.pf, caso.cen.inventario);
  inc('casos');
  if (res.status !== 'ok') {
    inc(res.status);
    return;
  }
  const p = res.programa;
  const c = medirCuidados(p, caso.pf, caso.cen.inventario, motor.contextoDeSelecao(caso.pf, caso.cen.inventario));
  const comDefeito = cuidadosQueFalham(c, 'defeito');
  const comNota = cuidadosQueFalham(c, 'nota');
  inc('programas');
  if (!comDefeito.size) inc('semDefeito');
  if (!comDefeito.size && !comNota.size) inc('semNada');
  for (const k of c.falhas) inc(`m:${k}`);
  // A régua oficial da G5 (regua.ts), na mesma população: defeitos e notas.
  if (!c.regua.defeitos.size) inc('reguaSemDefeito');
  for (const k of c.regua.defeitos) inc(`r:${k}`);
  for (const k of c.regua.notas) inc(`r:${k}`);
  inc('cartoes', c.regua.cartoesPorDia.reduce((t, x) => t + x, 0));
  for (const k of comDefeito) inc(`cd:${k}`);
  for (const k of new Set([...comDefeito, ...comNota])) inc(`c:${k}`);
  inc('cuidadosComDefeito', comDefeito.size);
  inc('uso', c.n.uso);
  inc('series', c.n.series);
  inc('exercicios', c.n.exercicios);
  inc('dias', p.dias.length);
  inc('distintos', c.n.distintos);
  inc('mediaPorMusculo', c.n.mediaPorMusculo);
  inc('abaixoDaFaixa', c.n.abaixoDaFaixa);
  inc('porAnimacao', c.n.porAnimacao);
  inc('porAlfabeto', c.n.porAlfabeto);
  inc('semProximoPasso', c.n.semProximoPasso);
  inc('prescricoes', c.n.prescricoes);
  // Uso de cada exercício (para os pedidos à animação): em quantos programas ele aparece.
  for (const id of new Set(p.dias.flatMap((d) => d.exercicios.map((x) => x.exId)))) {
    A.n[`uso|${id}`] = (A.n[`uso|${id}`] ?? 0) + 1;
    A.w[`uso|${id}`] = (A.w[`uso|${id}`] ?? 0) + caso.peso;
  }
  for (const k of c.falhas) {
    const chave = `${semDor ? 'semdor' : 'comdor'}|${k}`;
    if (!A.exemplos[chave] || A.exemplos[chave].indice > caso.indice) A.exemplos[chave] = { indice: caso.indice, caso: nomeDoCasoP(caso), detalhe: c.detalhe[k]!, programa: resumo(p) };
  }
  const pontos = comDefeito.size * 10 + comNota.size;
  const novoPior = (): Pior => ({
      indice: caso.indice,
      caso: nomeDoCasoP(caso),
      chave: `${caso.cen.id}|${caso.pf.diasSemana}|${caso.pf.minutosSessao}`,
      pontos,
      falhas: [...c.falhas].sort(),
      detalhes: [...c.falhas].sort().map((k) => `${k}: ${c.detalhe[k]}`),
      programa: resumo(p),
  });
  if (A.piores.length < PIORES || pontos > A.piores[A.piores.length - 1]!.pontos) {
    A.piores.push(novoPior());
    A.piores.sort((a, b) => b.pontos - a.pontos || a.indice - b.indice);
    A.piores.length = Math.min(A.piores.length, PIORES);
  }
  const lista = (A.pioresPorMin[String(caso.pf.minutosSessao)] ??= []);
  if (lista.length < POR_MIN || pontos > lista[lista.length - 1]!.pontos) {
    lista.push(novoPior());
    lista.sort((a, b) => b.pontos - a.pontos || a.indice - b.indice);
    lista.length = Math.min(lista.length, POR_MIN);
  }
}

function somar(a: Acc, b: Acc) {
  for (const [k, x] of Object.entries(b.n)) a.n[k] = (a.n[k] ?? 0) + x;
  for (const [k, x] of Object.entries(b.w)) a.w[k] = (a.w[k] ?? 0) + x;
  for (const [k, e] of Object.entries(b.exemplos)) if (!a.exemplos[k] || a.exemplos[k].indice > e.indice) a.exemplos[k] = e;
  a.piores = [...a.piores, ...b.piores].sort((x, y) => y.pontos - x.pontos || x.indice - y.indice).slice(0, PIORES);
  for (const [m, lista] of Object.entries(b.pioresPorMin ?? {})) a.pioresPorMin[m] = [...(a.pioresPorMin[m] ?? []), ...lista].sort((x, y) => y.pontos - x.pontos || x.indice - y.indice).slice(0, POR_MIN);
}

const casos = () => populacao(OBJETIVO ? { objetivo: OBJETIVO, dores: [DORES_P[0]!] } : {});

async function rodar(): Promise<Acc> {
  if (parte || processos === 1) {
    const motor = (await import(/* @vite-ignore */ resolve(MOTOR))) as Motor;
    const [i, n] = (parte ?? '0/1').split('/').map(Number) as [number, number];
    for (const c of casos()) if (c.indice % n === i && (!SO_NIVEL || c.pf.nivel === SO_NIVEL)) medir(motor, c);
    return A;
  }
  const pasta = join(tmpdir(), `retrato-${process.pid}`);
  mkdirSync(pasta, { recursive: true });
  const filhos = Array.from({ length: processos }, (_, i) => {
    const arquivo = join(pasta, `parte-${i}.json`);
    return new Promise<string>((ok, erro) => {
      const extra = [...(OBJETIVO ? ['--objetivo', OBJETIVO] : []), ...(SO_NIVEL ? ['--nivel', SO_NIVEL] : []), '--motor', MOTOR];
      const ch = spawn(process.execPath, [join('node_modules', '.bin', 'vite-node'), 'scripts/auditoria/retrato.ts', '--', '--parte', `${i}/${processos}`, '--saida-parcial', arquivo, ...extra], { stdio: ['ignore', 'inherit', 'inherit'] });
      ch.on('exit', (code) => (code === 0 ? ok(arquivo) : erro(new Error(`processo ${i} saiu com ${code}`))));
    });
  });
  const total: Acc = { n: {}, w: {}, exemplos: {}, piores: [], pioresPorMin: {} };
  for (const f of await Promise.all(filhos)) somar(total, JSON.parse(readFileSync(f, 'utf8')) as Acc);
  rmSync(pasta, { recursive: true, force: true });
  return total;
}

// ---------- saída ----------
const arred = (x: number, casas = 1) => Math.round(x * 10 ** casas) / 10 ** casas;
const pv = (x: number) => `${arred(100 * x).toFixed(1).replace('.', ',')}%`;
const num = (x: number, casas = 1) => arred(x, casas).toFixed(casas).replace('.', ',');
const ordenar = <T>(x: T): T =>
  Array.isArray(x)
    ? (x.map(ordenar) as T)
    : x && typeof x === 'object'
      ? (Object.fromEntries(Object.entries(x as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, ordenar(v)])) as T)
      : x;

async function main() {
  const acc = await rodar();
  if (saidaParcial) {
    writeFileSync(saidaParcial, JSON.stringify(acc));
    return;
  }
  // Os pesos somam 1 na população inteira; arredondados para o arquivo ser idêntico entre rodadas.
  for (const k of Object.keys(acc.w)) acc.w[k] = Math.round(acc.w[k]! * 1e9) / 1e9;
  mkdirSync(SAIDA, { recursive: true });
  const fr = (r: string, k: string) => {
    const d = acc.n[`${r}|programas`] ?? 0;
    return d ? (acc.n[`${r}|${k}`] ?? 0) / d : 0;
  };
  const fw = (r: string, k: string) => {
    const d = acc.w[`${r}|programas`] ?? 0;
    return d ? (acc.w[`${r}|${k}`] ?? 0) / d : 0;
  };
  const recortes = [...new Set(Object.keys(acc.n).filter((k) => !k.startsWith('uso|')).map((k) => k.split('|')[0]!))];
  const deDimensao = (dim: string) => recortes.filter((r) => r.startsWith(`${dim}:`));
  const DIMENSOES = ['grupo', 'nivel', 'min', 'dias', 'foco', 'dor'];
  /** O pior recorte de uma medida, entre as dimensões simples. */
  const pior = (k: string) =>
    DIMENSOES.flatMap(deDimensao)
      .map((r) => ({ r, x: fr(r, k) }))
      .sort((a, b) => b.x - a.x || a.r.localeCompare(b.r))[0]!;

  const L: string[] = [];
  const total = acc.n['todos|programas'] ?? 0;
  L.push(`# O retrato medido: os 20 cuidados em ${total.toLocaleString('pt-BR')} programas`);
  L.push('');
  L.push(`> Gerado por \`scripts/auditoria/retrato.ts\` (motor: \`${MOTOR}\`${OBJETIVO ? `; objetivo: ${OBJETIVO}` : ''}). Dados fictícios. Não editar à mão.`);
  L.push('');
  L.push(
    `**${(acc.n['todos|casos'] ?? 0).toLocaleString('pt-BR')} combinações**, ${total.toLocaleString('pt-BR')} programas (${(acc.n['todos|sem-exercicio'] ?? 0).toLocaleString('pt-BR')} sem exercício possível, ${(acc.n['todos|bloqueado'] ?? 0).toLocaleString('pt-BR')} bloqueadas). "Grade" = cada combinação vale igual. "Ponderada" = as combinações mais prováveis valem mais (pesos de \`scripts/auditoria/populacao.ts\`, **estimativa**).`,
  );
  L.push('');
  L.push('| | grade | ponderada |');
  L.push('| --- | ---: | ---: |');
  L.push(`| programas sem nenhum defeito | ${pv(fr('todos', 'semDefeito'))} | ${pv(fw('todos', 'semDefeito'))} |`);
  L.push(`| idem, sem dor | ${pv(fr('semdor', 'semDefeito'))} | ${pv(fw('semdor', 'semDefeito'))} |`);
  L.push(`| idem, com dor | ${pv(fr('comdor', 'semDefeito'))} | ${pv(fw('comdor', 'semDefeito'))} |`);
  L.push(`| programas sem defeito nem nota | ${pv(fr('todos', 'semNada'))} | ${pv(fw('todos', 'semNada'))} |`);
  L.push(`| uso do tempo (dia típico ÷ minutos pedidos) | ${pv(fr('todos', 'uso'))} | ${pv(fw('todos', 'uso'))} |`);
  L.push(`| séries por semana (média) | ${num(fr('todos', 'series'))} | ${num(fw('todos', 'series'))} |`);
  L.push(`| séries por músculo por semana (média, fora o abdômen) | ${num(fr('todos', 'mediaPorMusculo'))} | ${num(fw('todos', 'mediaPorMusculo'))} |`);
  L.push(`| músculos abaixo da faixa do nível (média por programa) | ${num(fr('todos', 'abaixoDaFaixa'))} | ${num(fw('todos', 'abaixoDaFaixa'))} |`);
  L.push(`| exercícios por dia (média) | ${num((acc.n['todos|exercicios'] ?? 0) / (acc.n['todos|dias'] ?? 1), 2)} | ${num((acc.w['todos|exercicios'] ?? 0) / (acc.w['todos|dias'] ?? 1), 2)} |`);
  L.push(`| escolhas decididas pela animação (% das prescrições) | ${pv((acc.n['todos|porAnimacao'] ?? 0) / (acc.n['todos|prescricoes'] ?? 1))} | ${pv((acc.w['todos|porAnimacao'] ?? 0) / (acc.w['todos|prescricoes'] ?? 1))} |`);
  L.push(`| escolhas decididas pela ordem alfabética (% das prescrições) | ${pv((acc.n['todos|porAlfabeto'] ?? 0) / (acc.n['todos|prescricoes'] ?? 1))} | ${pv((acc.w['todos|porAlfabeto'] ?? 0) / (acc.w['todos|prescricoes'] ?? 1))} |`);
  L.push('');
  L.push('## A régua oficial (G5) na mesma população');
  L.push('');
  L.push('| defeito ou nota | grade | ponderada | sem dor | com dor |');
  L.push('| --- | ---: | ---: | ---: | ---: |');
  L.push(`| **sem nenhum defeito da régua** | ${pv(fr('todos', 'reguaSemDefeito'))} | ${pv(fw('todos', 'reguaSemDefeito'))} | ${pv(fr('semdor', 'reguaSemDefeito'))} | ${pv(fr('comdor', 'reguaSemDefeito'))} |`);
  for (const k of ['A2', 'A3', 'A4', 'B1', 'C1', 'D1', 'D3', 'E1', 'seguranca', 'A1', 'A5', 'B2', 'B3', 'C2', 'G1'])
    L.push(`| ${k} | ${pv(fr('todos', `r:${k}`))} | ${pv(fw('todos', `r:${k}`))} | ${pv(fr('semdor', `r:${k}`))} | ${pv(fr('comdor', `r:${k}`))} |`);
  L.push(`| cartões de texto por dia (média) | ${num((acc.n['todos|cartoes'] ?? 0) / (acc.n['todos|dias'] ?? 1), 2)} | ${num((acc.w['todos|cartoes'] ?? 0) / (acc.w['todos|dias'] ?? 1), 2)} | | |`);
  L.push('');
  L.push('## Cada cuidado');
  L.push('');
  L.push('% dos programas que falham. "Pior grupo": o recorte (equipamento, nível, minutos, dias, foco ou dor) com a maior fatia na grade.');
  L.push('');
  L.push('| cuidado | medida | tipo | grade | ponderada | sem dor | com dor | pior grupo |');
  L.push('| ---: | --- | --- | ---: | ---: | ---: | ---: | --- |');
  for (const k of MEDIDA_IDS) {
    const m = MEDIDAS[k];
    const p = pior(`m:${k}`);
    L.push(`| ${m.cuidado} | \`${k}\` ${m.nome} | ${m.tipo} | ${pv(fr('todos', `m:${k}`))} | ${pv(fw('todos', `m:${k}`))} | ${pv(fr('semdor', `m:${k}`))} | ${pv(fr('comdor', `m:${k}`))} | ${p.r} (${pv(p.x)}) |`);
  }
  L.push('');
  L.push('### Por cuidado (falha em alguma medida do cuidado)');
  L.push('');
  L.push('| cuidado | com defeito: grade | ponderada | com defeito ou nota: grade | ponderada |');
  L.push('| ---: | ---: | ---: | ---: | ---: |');
  for (const c of [...new Set(MEDIDA_IDS.map((k) => MEDIDAS[k].cuidado))]) L.push(`| ${c} | ${pv(fr('todos', `cd:${c}`))} | ${pv(fw('todos', `cd:${c}`))} | ${pv(fr('todos', `c:${c}`))} | ${pv(fw('todos', `c:${c}`))} |`);
  L.push('');
  const COLUNAS: MedidaId[] = ['c03a', 'c03c', 'c04b', 'c04c', 'c05a', 'c06b', 'c08a', 'c09b', 'c12a', 'c13a', 'c14b', 'c15a', 'c17a'];
  const tabela = (titulo: string, rs: string[], nome: (r: string) => string = (r) => r.split(':').slice(1).join(':')) => {
    L.push(`## ${titulo}`);
    L.push('');
    L.push(`| recorte | programas | peso | sem defeito | ponderada | uso do tempo | séries por músculo | ${COLUNAS.join(' | ')} |`);
    L.push(`| --- | ---: | ---: | ---: | ---: | ---: | ---: | ${COLUNAS.map(() => '---:').join(' | ')} |`);
    for (const r of rs)
      L.push(
        `| ${nome(r)} | ${(acc.n[`${r}|programas`] ?? 0).toLocaleString('pt-BR')} | ${pv(acc.w[`${r}|casos`] ?? 0)} | ${pv(fr(r, 'semDefeito'))} | ${pv(fw(r, 'semDefeito'))} | ${pv(fr(r, 'uso'))} | ${num(fr(r, 'mediaPorMusculo'))} | ${COLUNAS.map((k) => pv(fr(r, `m:${k}`))).join(' | ')} |`,
      );
    L.push('');
  };
  L.push(`Nas tabelas por recorte: ${COLUNAS.map((k) => `\`${k}\` ${MEDIDAS[k].nome}`).join('; ')}.`);
  L.push('');
  tabela('Por grupo de equipamento', deDimensao('grupo'));
  tabela('Por nível', ['nivel:iniciante', 'nivel:intermediario', 'nivel:avancado']);
  tabela('Por minutos', deDimensao('min').sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1])));
  tabela('Por dias', deDimensao('dias').sort());
  tabela('Por foco', deDimensao('foco'));
  tabela('Por dor', deDimensao('dor'));
  tabela('Por nível e minutos', deDimensao('nivel×min').sort((a, b) => a.localeCompare(b, 'pt', { numeric: true })));
  tabela('Por nível e dias', deDimensao('nivel×dias').sort());
  tabela('Por cenário de equipamento', deDimensao('cen').sort((a, b) => fr(a, 'semDefeito') - fr(b, 'semDefeito') || a.localeCompare(b)));

  L.push('## Os piores perfis');
  L.push('');
  L.push('Os programas com mais cuidados em falta (10 pontos por cuidado com defeito, 1 por cuidado só com nota), um por cenário, dias e minutos, para não repetir o mesmo caso.');
  L.push('');
  const vistos = new Set<string>();
  const piores = acc.piores.filter((x) => (vistos.has(x.chave) ? false : (vistos.add(x.chave), true))).slice(0, 40);
  for (const [i, x] of piores.entries()) {
    L.push(`${i + 1}. **${x.caso}** (${x.pontos} pontos)`);
    L.push(`   - ${x.programa}`);
    for (const d of x.detalhes) L.push(`   - ${d}`);
  }
  L.push('');
  L.push('## Exemplos');
  L.push('');
  L.push('O 1º programa da população com cada medida em falta (sem dor; quando só aparece com dor, com dor).');
  L.push('');
  for (const k of MEDIDA_IDS) {
    const e = acc.exemplos[`semdor|${k}`] ?? acc.exemplos[`comdor|${k}`];
    if (!e) continue;
    L.push(`- \`${k}\` **${MEDIDAS[k].nome}**: ${e.caso}: ${e.detalhe}`);
    L.push(`  - ${e.programa}`);
  }
  L.push('');
  L.push('## Uso de cada exercício');
  L.push('');
  L.push('Em quantos programas o exercício aparece (grade e ponderada); os sem animação aprovada aparecem como cartão de texto.');
  L.push('');
  L.push('| exercício | animação | grade | ponderada |');
  L.push('| --- | --- | ---: | ---: |');
  const usos = Object.keys(acc.n).filter((k) => k.startsWith('uso|')).map((k) => k.slice(4));
  const wt = acc.w['todos|programas'] ?? 1;
  for (const id of usos.sort((a, b) => (acc.w[`uso|${b}`] ?? 0) - (acc.w[`uso|${a}`] ?? 0) || a.localeCompare(b)))
    L.push(`| ${id} | ${POR_ID[id]?.animacaoId ? 'sim' : '**cartão**'} | ${pv((acc.n[`uso|${id}`] ?? 0) / total)} | ${pv((acc.w[`uso|${id}`] ?? 0) / wt)} |`);
  L.push('');
  writeFileSync(join(SAIDA, 'retrato.md'), L.join('\n'));
  writeFileSync(join(SAIDA, 'retrato.json'), `${JSON.stringify(ordenar({ motor: MOTOR, objetivo: OBJETIVO ?? null, n: acc.n, w: acc.w, exemplos: acc.exemplos, piores: acc.piores, pioresPorMin: acc.pioresPorMin }), null, 1)}\n`);
  console.log(`${total} programas; sem defeito: grade ${pv(fr('todos', 'semDefeito'))}, ponderada ${pv(fw('todos', 'semDefeito'))}. Gravado em ${SAIDA}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
