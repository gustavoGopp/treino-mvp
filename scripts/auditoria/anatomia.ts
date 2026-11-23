// Tabela da anatomia (revisão de anatomia, Parte A). Uso: npm run auditoria:anatomia
// Para cada exercício com guia (animação ou cartão de texto), compara os músculos em três lugares:
//  1. a biblioteca (musculos.primarios/secundarios), que conta o volume;
//  2. os textos (target e feel do guia; target do cartão);
//  3. o desenho do Boneco (os `papeis` de cada animação do motor novo, src/engine/novo, lidos pela tabela dos músculos).
// As marcas são automáticas e servem de ponto de partida: cada uma é conferida à mão em docs/revisoes/anatomia.md.
// Lê a frequência de docs/revisoes/auditoria/estresse.json (rode o estresse antes). Gera docs/revisoes/anatomia/tabela.md.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { BIBLIOTECA, MUSCULOS, type Exercicio } from '../../src/domain/biblioteca';
import { NOME_MUSCULO } from '../../src/domain/gerador';
import { CARTOES, CONTEUDO } from '../../src/conteudo';
import { EXERCICIOS } from '../../src/engine/novo/app';
import { NAO_CONTADOS, NOME_FORMA, doDesenho, doTexto, ehMusculo, type Marca } from './anatomia-regras';

const est = JSON.parse(readFileSync('docs/revisoes/auditoria/estresse.json', 'utf8')) as {
  escolha: { usosComoVaga: Record<string, number> };
};
const vaga = est.escolha.usosComoVaga;
const mil = (n: number | undefined) => (n ?? 0).toLocaleString('pt-BR');

// ---------- comparação ----------
const nome = (m: Marca) => (ehMusculo(m) ? NOME_MUSCULO[m] : `_${m}_`);
const lista = (xs: Iterable<Marca>) => [...xs].map(nome).join(', ') || '—';
// de que parte o desenho fala, onde várias formas dão no mesmo grupo da biblioteca (as costas e o abdômen)
const formas = (xs: Set<string>) => [...xs].filter((f) => ['dorsal', 'trapezio', 'trapSup', 'trapMedInf', 'abdomen', 'obliquos'].includes(f)).map((f) => NOME_FORMA[f]);

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
  // O desenho é o do motor novo, que tem todas as animações do app (pacote D4, 23/11/2026).
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
    const ajudaQueConta = [...d.a].filter((m) => conta.has(m));
    if (ajudaQueConta.length) marcas.push(`**desenho mostra como "só ajuda" um músculo que a biblioteca conta**: ${lista(ajudaQueConta)}`);
    const desenhoAjuda = [...d.a].filter(ehMusculo);
    if (desenhoAjuda.length) marcas.push(`desenho mostra quem só ajuda, listrado (achado 8): ${lista(desenhoAjuda)}`);
    const naoContado = [...d.p, ...d.s, ...d.a].filter((m) => !ehMusculo(m));
    if (naoContado.length) marcas.push(`desenho mostra o que o gerador não conta: ${lista(naoContado)}`);
  }
  const textoAMais = [...tTF].filter((m) => ehMusculo(m) && !conta.has(m) && !d?.a.has(m));
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
  '**Como ler.** **P** = principal (conta 1 série); **S** = secundário (conta meia série, `volume.serie-indireta.peso`). No desenho (o do motor novo, desde 23/11/2026), o principal é vermelho, o secundário é laranja e o que só ajuda a firmar sai listrado. Os nomes em _itálico_ são músculos que o gerador não conta (aparecem só no texto ou no desenho). Os cartões não têm desenho: para eles, só a biblioteca × o `target`. As marcas em negrito pedem conferência; as outras são informação. O texto é lido por palavras-chave (`DICIONARIO` no script), por isso uma marca pode ser falso alarme: cada uma é conferida em `docs/revisoes/anatomia.md`.',
  '',
  '| # | exercício | guia | vaga | biblioteca P / S | `target` | `feel` | desenho P / S / só ajuda | marcas |',
  '| ---: | --- | --- | ---: | --- | --- | --- | --- | --- |',
];
linhas.forEach((l, i) => {
  const d = l.desenho;
  const desenho = d
    ? `${lista(d.p)}${formas(d.formasP).length ? ` (${formas(d.formasP).join(', ')})` : ''} / ${lista(d.s)}${formas(d.formasS).length ? ` (${formas(d.formasS).join(', ')})` : ''}${d.a.size ? ` / só ajuda: ${lista(d.a)}` : ''}`
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
  `| desenho mostra como "só ajuda" um músculo que a biblioteca conta | ${ids(conta('como "só ajuda"'))} |`,
  `| desenho mostra quem só ajuda, listrado (decidido no achado 8) | ${ids(conta('quem só ajuda'))} |`,
  `| texto cita músculo que a biblioteca não conta aqui | ${ids(conta('texto cita músculo'))} |`,
  `| S não citado no texto do guia | ${ids(conta('S não citado'))} |`,
  ...NAO_CONTADOS.map((n) => `| desenho mostra _${n}_ | ${ids(linhas.filter((l) => l.desenho && [...l.desenho.p, ...l.desenho.s, ...l.desenho.a].includes(n)))} |`),
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
const orfas = Object.keys(EXERCICIOS).filter((id) => !usadas.has(id));
L.push('## Animações sem exercício na biblioteca', '', orfas.length ? orfas.map((id: string) => `- \`${id}\``).join('\n') : 'Nenhuma.', '');

mkdirSync('docs/revisoes/anatomia', { recursive: true });
writeFileSync('docs/revisoes/anatomia/tabela.md', L.join('\n'));
console.log(`anatomia: ${linhas.length} exercícios com guia; ${linhas.filter((l) => !l.marcas.length).length} batem nos três lugares; ${linhas.filter((l) => l.marcas.some((m) => m.startsWith('**'))).length} com marca a conferir`);
