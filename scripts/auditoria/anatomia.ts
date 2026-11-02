// Tabela da anatomia (revisão de anatomia, Parte A). Uso: npm run auditoria:anatomia
// Para cada exercício com guia (animação ou cartão de texto), compara os músculos em três lugares:
//  1. a biblioteca (musculos.primarios/secundarios), que conta o volume;
//  2. os textos (target e feel do guia; target do cartão);
//  3. o desenho do Boneco (listaDe em src/engine/estilo/musculos.ts, a partir de ex.muscles).
// As marcas são automáticas e servem de ponto de partida: cada uma é conferida à mão em docs/revisoes/anatomia.md.
// Lê a frequência de docs/revisoes/auditoria/estresse.json (rode o estresse antes). Gera docs/revisoes/anatomia/tabela.md.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA, MUSCULOS, type Exercicio, type Musculo } from '../../src/domain/biblioteca';
import { NOME_MUSCULO } from '../../src/domain/gerador';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { EX } from '../../src/engine';
import { listaDe } from '../../src/engine/estilo/musculos';

const est = JSON.parse(readFileSync('docs/revisoes/auditoria/estresse.json', 'utf8')) as {
  escolha: { usosComoVaga: Record<string, number> };
};
const vaga = est.escolha.usosComoVaga;
const mil = (n: number | undefined) => (n ?? 0).toLocaleString('pt-BR');

/** O que o gerador não conta como músculo (aparece só no texto ou no desenho). */
type NaoContado = 'trapézio superior' | 'antebraço' | 'eretores (lombar)' | 'oblíquos';
type Marca = Musculo | NaoContado;
const NAO_CONTADOS: NaoContado[] = ['trapézio superior', 'antebraço', 'eretores (lombar)', 'oblíquos'];
const ehMusculo = (m: Marca): m is Musculo => (MUSCULOS as readonly string[]).includes(m);

// ---------- 2. texto → músculo ----------
// Palavras do texto em pt-BR. A ordem não importa: um texto pode citar vários músculos.
const DICIONARIO: [RegExp, Marca][] = [
  [/peit(o|oral)/i, 'peito'],
  [/costas|dorsal|lat[ií]ssimo|romboides|trap[eé]zio m[eé]dio|entre as esc[aá]pulas/i, 'costas'],
  [/deltoide anterior|frente( e lateral)? do ombro|ombro \(frente\)/i, 'ombro_anterior'],
  [/deltoide (anterior e )?lateral|lateral do ombro|ombro \(lateral\)/i, 'ombro_lateral'],
  [/deltoide posterior|tr[aá]s do ombro|ombro \(posterior\)/i, 'ombro_posterior'],
  [/b[ií]ceps|frente do bra[cç]o/i, 'biceps'],
  [/tr[ií]ceps|tr[aá]s do bra[cç]o/i, 'triceps'],
  [/quadr[ií]ceps|frente das? coxas?/i, 'quadriceps'],
  [/posteriores? da coxa|tr[aá]s da coxa/i, 'posteriores'],
  [/gl[uú]te/i, 'gluteos'],
  [/panturrilha|batata da perna|gastrocn[eê]mio|s[oó]leo/i, 'panturrilha'],
  [/abd[oô]m|abdominal|barriga/i, 'abdomen'],
  [/adutor|dentro da coxa/i, 'adutores'],
  [/trap[eé]zio(?! m[eé]dio)|pesco[cç]o/i, 'trapézio superior'],
  [/antebra[cç]o/i, 'antebraço'],
  [/lombar|eretor/i, 'eretores (lombar)'],
  [/obl[ií]quo/i, 'oblíquos'],
];
const doTexto = (t: string | undefined): Set<Marca> => new Set(t ? DICIONARIO.filter(([r]) => r.test(t)).map(([, m]) => m) : []);

// ---------- 3. desenho → músculo ----------
const FORMA: Record<string, Marca> = {
  dorsal: 'costas',
  redondoMaior: 'costas',
  romboides: 'costas',
  trapMedio: 'costas',
  trapInferior: 'costas',
  peitoralClav: 'peito',
  peitoralEst: 'peito',
  deltAnt: 'ombro_anterior',
  deltLat: 'ombro_lateral',
  deltPost: 'ombro_posterior',
  biceps: 'biceps',
  triceps: 'triceps',
  quadriceps: 'quadriceps',
  posteriores: 'posteriores',
  gluteos: 'gluteos',
  panturrilha: 'panturrilha',
  retoAbdominal: 'abdomen',
  adutores: 'adutores',
  trapSuperior: 'trapézio superior',
  antebraco: 'antebraço',
  eretores: 'eretores (lombar)',
  obliquos: 'oblíquos',
};
/** Nome curto da forma, para mostrar de que parte das costas o desenho fala. */
const NOME_FORMA: Record<string, string> = {
  dorsal: 'dorsal',
  redondoMaior: 'redondo maior',
  romboides: 'romboides',
  trapMedio: 'trapézio médio',
  trapInferior: 'trapézio inferior',
  peitoralClav: 'peitoral (clavicular)',
  peitoralEst: 'peitoral (esternal)',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
function doDesenho(animacaoId: string) {
  const ex: Animacao = EX.find((e: Animacao) => e.id === animacaoId);
  const p = new Set<Marca>(),
    s = new Set<Marca>(),
    formasP = new Set<string>(),
    formasS = new Set<string>();
  for (const [forma, , tipo] of listaDe(ex) as [string, string, 'p' | 's'][]) {
    (tipo === 'p' ? p : s).add(FORMA[forma]!);
    (tipo === 'p' ? formasP : formasS).add(forma);
  }
  for (const m of p) s.delete(m); // o principal vence o secundário (o mesmo critério de listaDe)
  return { p, s, formasP, formasS };
}

// ---------- comparação ----------
const nome = (m: Marca) => (ehMusculo(m) ? NOME_MUSCULO[m] : `_${m}_`);
const lista = (xs: Iterable<Marca>) => [...xs].map(nome).join(', ') || '—';
const formas = (xs: Set<string>) => [...xs].filter((f) => FORMA[f] === 'costas' || FORMA[f] === 'peito').map((f) => NOME_FORMA[f]);

type Linha = {
  e: Exercicio;
  guia: 'animação' | 'cartão';
  target: string;
  feel: string;
  feelNote: string;
  desenho: ReturnType<typeof doDesenho> | null;
  marcas: string[];
};

const linhas: Linha[] = [];
for (const e of BIBLIOTECA) {
  const anim = e.animacaoId && CONTEUDO[e.animacaoId] ? e.animacaoId : null;
  const cartao = CARTOES[e.id];
  if (!anim && !cartao) continue;
  const texto = anim ? CONTEUDO[anim]! : cartao!;
  const feel = anim ? CONTEUDO[anim]!.feel : '';
  const feelNote = anim ? CONTEUDO[anim]!.feelNote : '';
  const P = new Set<Marca>(e.musculos.primarios),
    S = new Set<Marca>(e.musculos.secundarios),
    conta = new Set<Marca>([...P, ...S]);
  const tT = doTexto(texto.target),
    tF = doTexto(feel),
    tTF = new Set([...tT, ...tF]);
  const d = anim ? doDesenho(anim) : null;
  const marcas: string[] = [];

  // principal: biblioteca × texto × desenho
  const pSemTexto = [...P].filter((m) => !tT.has(m));
  if (pSemTexto.length) marcas.push(`**P fora do \`target\`**: ${lista(pSemTexto)}`);
  if (d) {
    const pDesenhoAMais = [...d.p].filter((m) => !P.has(m));
    const pSemDesenho = [...P].filter((m) => !d.p.has(m));
    if (pDesenhoAMais.length) marcas.push(`**P≠ desenho**: o desenho realça como principal ${lista(pDesenhoAMais)}`);
    if (pSemDesenho.length) marcas.push(`**P≠ desenho**: o principal ${lista(pSemDesenho)} não é principal no desenho`);
    const sSemDesenho = [...S].filter((m) => !d.p.has(m) && !d.s.has(m));
    if (sSemDesenho.length) marcas.push(`**S falta no desenho**: ${lista(sSemDesenho)}`);
    const desenhoAMais = [...d.p, ...d.s].filter((m) => ehMusculo(m) && !conta.has(m));
    if (desenhoAMais.length) marcas.push(`**desenho mostra músculo que a biblioteca não conta aqui**: ${lista(desenhoAMais)}`);
    const naoContado = [...d.p, ...d.s].filter((m) => !ehMusculo(m));
    if (naoContado.length) marcas.push(`desenho mostra o que o gerador não conta: ${lista(naoContado)}`);
  }
  const textoAMais = [...tTF].filter((m) => ehMusculo(m) && !conta.has(m));
  if (textoAMais.length) marcas.push(`**texto cita músculo que a biblioteca não conta aqui**: ${lista(textoAMais)}`);
  if (anim) {
    const sSemTexto = [...S].filter((m) => !tTF.has(m));
    if (sSemTexto.length) marcas.push(`S não citado no \`target\` nem no \`feel\`: ${lista(sSemTexto)}`);
  }
  linhas.push({ e, guia: anim ? 'animação' : 'cartão', target: texto.target, feel, feelNote, desenho: d, marcas });
}
linhas.sort((a, b) => (vaga[b.e.id] ?? 0) - (vaga[a.e.id] ?? 0) || a.e.id.localeCompare(b.e.id));

// ---------- saída ----------
const esc = (t: string) => t.replace(/\|/g, '\\|');
const L: string[] = [
  '# Tabela da anatomia (revisão de anatomia, Parte A)',
  '',
  `> Gerado por \`npm run auditoria:anatomia\` a partir dos dados (biblioteca, textos e desenho). Não editar à mão. ${linhas.length} exercícios com guia (${linhas.filter((l) => l.guia === 'animação').length} com animação, ${linhas.filter((l) => l.guia === 'cartão').length} com cartão de texto), do mais prescrito ao menos ("vaga" = vezes prescrito no teste de estresse).`,
  '',
  '**Como ler.** **P** = principal (conta 1 série); **S** = secundário (conta meia série, `volume.serie-indireta.peso`). No desenho, o principal é vermelho e o secundário, laranja. Os nomes em _itálico_ são músculos que o gerador não conta (aparecem só no texto ou no desenho). Os cartões não têm desenho: para eles, só a biblioteca × o `target`. As marcas em negrito pedem conferência; as outras são informação. O texto é lido por palavras-chave (`DICIONARIO` no script), por isso uma marca pode ser falso alarme: cada uma é conferida em `docs/revisoes/anatomia.md`.',
  '',
  '| # | exercício | guia | vaga | biblioteca P / S | `target` | `feel` | desenho P / S | marcas |',
  '| ---: | --- | --- | ---: | --- | --- | --- | --- | --- |',
];
linhas.forEach((l, i) => {
  const d = l.desenho;
  const desenho = d
    ? `${lista(d.p)}${formas(d.formasP).length ? ` (${formas(d.formasP).join(', ')})` : ''} / ${lista(d.s)}${formas(d.formasS).length ? ` (${formas(d.formasS).join(', ')})` : ''}`
    : '— (sem desenho)';
  L.push(
    `| ${i + 1} | **${l.e.nome}** \`${l.e.id}\` | ${l.guia} | ${mil(vaga[l.e.id])} | ${lista(l.e.musculos.primarios)} / ${lista(l.e.musculos.secundarios)} | ${esc(l.target)} | ${esc(l.feel) || '—'} | ${desenho} | ${l.marcas.map(esc).join('<br>') || 'bate'} |`,
  );
});

// resumo das marcas
const conta = (prefixo: string) => linhas.filter((l) => l.marcas.some((m) => m.includes(prefixo)));
const ids = (ls: Linha[]) => ls.map((l) => `\`${l.e.id}\``).join(', ') || '—';
L.push(
  '',
  '## Resumo das marcas',
  '',
  '| marca | exercícios |',
  '| --- | --- |',
  `| bate nos três lugares | ${linhas.filter((l) => !l.marcas.length).length} |`,
  `| P fora do \`target\` | ${ids(conta('P fora do'))} |`,
  `| P≠ desenho | ${ids(conta('P≠ desenho'))} |`,
  `| S falta no desenho | ${ids(conta('S falta no desenho'))} |`,
  `| desenho mostra músculo que a biblioteca não conta aqui | ${ids(conta('desenho mostra músculo'))} |`,
  `| texto cita músculo que a biblioteca não conta aqui | ${ids(conta('texto cita músculo'))} |`,
  `| S não citado no texto do guia | ${ids(conta('S não citado'))} |`,
  ...NAO_CONTADOS.map((n) => `| desenho mostra _${n}_ | ${ids(linhas.filter((l) => l.desenho && [...l.desenho.p, ...l.desenho.s].includes(n)))} |`),
  '',
);

// toda a biblioteca, por músculo (para os pontos 5 e 6 da revisão)
L.push(
  '## Toda a biblioteca, por músculo',
  '',
  `Os ${BIBLIOTECA.length} exercícios, com e sem guia. Entre parênteses, as vezes prescrito no teste de estresse.`,
  '',
  '| músculo | principal em | secundário em |',
  '| --- | --- | --- |',
);
const porVaga = (es: Exercicio[]) =>
  [...es]
    .sort((a, b) => (vaga[b.id] ?? 0) - (vaga[a.id] ?? 0) || a.id.localeCompare(b.id))
    .map((e) => `\`${e.id}\` (${mil(vaga[e.id])})`)
    .join(', ') || '—';
for (const m of MUSCULOS)
  L.push(`| ${NOME_MUSCULO[m]} | ${porVaga(BIBLIOTECA.filter((e) => e.musculos.primarios.includes(m)))} | ${porVaga(BIBLIOTECA.filter((e) => e.musculos.secundarios.includes(m)))} |`);
L.push('');

// animações que nenhum exercício usa
const usadas = new Set(BIBLIOTECA.map((e) => e.animacaoId).filter(Boolean));
const orfas = EX.map((e: Animacao) => e.id as string).filter((id: string) => !usadas.has(id));
L.push('## Animações sem exercício na biblioteca', '', orfas.length ? orfas.map((id: string) => `- \`${id}\``).join('\n') : 'Nenhuma.', '');

mkdirSync('docs/revisoes/anatomia', { recursive: true });
writeFileSync('docs/revisoes/anatomia/tabela.md', L.join('\n'));
console.log(`anatomia: ${linhas.length} exercícios com guia; ${linhas.filter((l) => !l.marcas.length).length} batem nos três lugares; ${linhas.filter((l) => l.marcas.some((m) => m.startsWith('**'))).length} com marca a conferir`);
