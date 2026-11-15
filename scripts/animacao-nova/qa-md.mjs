// Monta docs/revisoes/animacao-nova/qa.md: os vinte cuidados (prompt-continuacao.md, seção 2B), animação por animação.
// Cada célula diz COMO o cuidado foi conferido naquela animação, e não só que foi: medido pela conferência automática
// (prototipos/conferencia.json), visto a olho nos quadros grandes, ou herdado do corpo e do traço aprovados.
// Uso: node scripts/animacao-nova/qa-md.mjs   (depois de npm run conferir:animacao)
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { motorNovo } from './empacotar.mjs';

const DIR = 'docs/revisoes/animacao-nova';
const conf = JSON.parse(readFileSync(`${DIR}/prototipos/conferencia.json`, 'utf8'));
const { modulo: m } = await motorNovo(`export * from './src/engine/novo/app.ts'; export { APROVADOS } from './src/engine/novo/aprovados.ts';`);
const corpo = m.CORPOS.homem;

// o estado e o lote de cada animação, do andamento
const andamento = Object.fromEntries(
  readFileSync(`${DIR}/andamento.md`, 'utf8')
    .split('\n')
    .map((l) => /^\| (\d) \| `([^`]+)` \| (.*) \|$/.exec(l))
    .filter(Boolean)
    .map((r) => [r[2], { lote: r[1], estado: r[3] }]),
);
// os erros que o app lista para cada exercício
const errosDoApp = Object.fromEntries(
  readdirSync('src/conteudo/exercicios')
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(`src/conteudo/exercicios/${f}`, 'utf8')))
    .map((j) => [j.id, (j.errors ?? []).map((e) => e.title)]),
);

const ids = Object.keys(m.EXERCICIOS).sort();
const faltam = ids.filter((id) => !conf[id]);
if (faltam.length) throw new Error(`sem conferência (rode npm run conferir:animacao): ${faltam.join(', ')}`);

const notas = [];
const linhas = [];
const conta = { M: 0, 'M!': 0, O: 0, C: 0, '–': 0, '✗': 0 };
for (const id of ids) {
  const itens = conf[id].itens;
  const doGrupo = (...gs) => itens.filter((i) => gs.includes(i.grupo));
  const nota = (cuidado, texto) => notas.push({ id, cuidado, texto });
  /** Medido: sem aviso, `M`; com aviso, `M!` e a nota do que a conferência avisou; sem item medido, o que vier em `senao`. */
  const medido = (cuidado, lista, senao = 'O') => {
    if (!lista.length) return senao;
    if (lista.some((i) => i.nivel === 'falha')) {
      for (const i of lista.filter((x) => x.nivel === 'falha')) nota(cuidado, `FALHA: ${i.oQue} → ${i.medido}`);
      return '✗';
    }
    const avisos = lista.filter((i) => i.nivel === 'aviso');
    for (const i of avisos) nota(cuidado, `${i.oQue} → ${i.medido}`);
    return avisos.length ? 'M!' : 'M';
  };
  const ex = m.EXERCICIOS[id];
  const q = ex.quadro(corpo, 0);
  // tem objeto na cena? (peças e cabos; o chão é só um plano)
  const temObjeto = (q.pecas?.length ?? 0) + (q.fios?.length ?? 0) + (q.cargas?.length ?? 0) > 0;
  const musculos = doGrupo('Músculos');
  const doApp = errosDoApp[id] ?? [];
  const desenhados = ex.ficha.erros.map((e) => e.titulo);
  const semDesenho = doApp.filter((t) => !desenhados.includes(t));
  for (const t of semDesenho) nota(14, `o erro "${t}" do app não foi desenhado (é erro de ritmo; o motor novo ainda não muda o tempo das fases por erro): nesse erro o app mostra o movimento certo`);
  const A = m.APROVADOS[id];
  const quem = !A ? 'não aprovada' : A.como === 'na folha' ? 'G (folha)' : A.como === 'nos quadros' ? 'G (quadros)' : 'D';
  const c = [
    medido(1, doGrupo('Ficha')),
    medido(2, doGrupo('Amplitudes', 'Proporções')),
    medido(3, doGrupo('Ritmo')),
    medido(4, doGrupo('Equilíbrio', 'Cabos')),
    medido(5, doGrupo('Contatos', 'Chão', 'Objetos')),
    'C',
    'O',
    medido(
      8,
      musculos.filter((i) => !i.oQue.startsWith('quanto do músculo principal')),
    ),
    'C',
    // a vista padrão do modo Músculos sai da medida de quanto do principal aparece em cada vista
    musculos.some((i) => i.oQue.startsWith('quanto do músculo principal')) ? 'M' : 'O',
    'O',
    temObjeto ? 'O' : '–',
    temObjeto ? 'O' : '–',
    semDesenho.length ? '✗' : desenhados.length ? 'M' : '–',
    'O',
    'C',
    'O',
    'O',
    medido(19, doGrupo('Ciclo')),
    quem,
  ];
  for (const x of c.slice(0, 19)) conta[x]++;
  const onde = existsSync(`${DIR}/quadros/${id}.png`) ? `[quadros](quadros/${id}.png)` : `[folha](prototipos/folha-${id}.png)`;
  linhas.push(`| \`${id}\` | ${andamento[id]?.lote ?? '?'} | ${c.join(' | ')} | ${onde} |`);
}

const CUIDADOS = [
  'O movimento nasce nas articulações certas, na ordem certa',
  'Nenhuma articulação dobra para onde não dobra, nem além do que dobra',
  'O ritmo é o do exercício, sem movimento de robô nem de mola',
  'O peso aparece (equilíbrio, halter na vertical, cabo reto, elástico que afina)',
  'Os contatos são firmes (mão, pé, costas no banco)',
  'A mão e o pé são desenhados de verdade',
  'A cabeça e o olhar seguem a técnica',
  'O músculo está no lugar certo, com a forma certa',
  'Principal, secundário e "só ajuda" se distinguem sem depender só da cor',
  'A vista padrão de cada modo é escolhida por medida',
  'Nada importante fica escondido',
  'O objeto é reconhecível',
  'O objeto funciona',
  'O erro aparece como erro de verdade, medido contra o certo',
  'Rótulos e setas fora do corpo, sem se sobrepor',
  'Um traço só',
  'Legível na miniatura, a 320 px, nos temas claro e escuro',
  'O quadro parado também ensina',
  'O ciclo fecha sem tranco',
  'Conferido a olho em tamanho grande, por quem fez e por um revisor',
];
const COMO = [
  'regras da ficha do movimento, medidas quadro a quadro (grupo "Ficha" da conferência)',
  'amplitudes de cada articulação contra as tabelas (CDC, AAOS) e comprimento dos ossos (grupos "Amplitudes" e "Proporções")',
  'maior salto de velocidade entre dois quadros (grupo "Ritmo")',
  'centro de massa sobre o apoio e quanto o cabo ou o elástico estica (grupos "Equilíbrio" e "Cabos"); onde nenhum dos dois se aplica (deitado, pendurado, sem cabo), a olho',
  'pontos presos que não saem do lugar, nada abaixo do chão, o corpo não atravessa peça (grupos "Contatos", "Chão" e "Objetos")',
  'vem do corpo aprovado em 13/11/2026 (mão com dedos e polegar, pé com calcanhar); as pegadas de cada animação entram no cuidado 5',
  'a olho, nos quadros grandes',
  'o realçado é o do conteúdo do app (grupo "Músculos"); a forma e o lugar vêm do corpo aprovado e da auditoria de anatomia',
  'vem do desenho aprovado: o secundário leva listras além da cor',
  'área do músculo principal virada para quem olha, em cada vista (grupo "Músculos")',
  'a olho, nos quadros grandes; onde uma vista esconde, a segunda vista resolve',
  'a olho, na cena; "–" onde a cena não tem objeto',
  'a olho, no movimento (o cabo acompanha a mão, a roda gira, o banco inclina); "–" onde a cena não tem objeto',
  'cada erro do app tem o seu desenho, com o certo tracejado atrás (teste tests/unit/motor-novo-ponte.test.ts)',
  'a olho, nos quadros grandes (no máximo dois rótulos por vista)',
  'vem do motor: a mesma espessura de linha e a mesma luz em tudo',
  'a olho: o quadro do tema escuro em cada imagem de quadros e as miniaturas de 96 px na folha',
  'a olho: os quadros de começo, meio e fim',
  'o último quadro emenda no primeiro (grupo "Ciclo")',
  'quem viu: G (folha) = o Gustavo aprovou na folha; G (quadros) = o Gustavo aprovou vendo os quadros grandes; D = feita por um subagente, conferida quadro a quadro por quem integrou e aprovada por delegação do Gustavo (15/11/2026)',
];

const porAnim = new Map();
for (const n of notas) porAnim.set(n.id, [...(porAnim.get(n.id) ?? []), n]);
// os avisos que se repetem em quase todas ficam fora da lista por animação, contados uma vez só
const repetidos = (n) => n.cuidado === 8 || /sem número na ficha da técnica/.test(n.texto);
const total = ids.length;
const md = `# Os vinte cuidados, animação por animação

Gerado por \`scripts/animacao-nova/qa-md.mjs\` a partir da conferência automática (\`prototipos/conferencia.json\`), da lista de aprovadas (\`src/engine/novo/aprovados.ts\`) e do andamento. São ${total} animações.

Cada célula diz **como** o cuidado foi conferido naquela animação:

- **M**: medido pela conferência automática, sem falha nem aviso.
- **M!**: medido, com um aviso (a lista está no fim).
- **O**: visto a olho nos quadros grandes (a última coluna leva à imagem).
- **C**: vale para todas, porque vem do corpo ou do traço aprovados.
- **–**: não se aplica a essa animação.
- **✗**: não cumprido (explicado no fim).

Contagem das ${total * 19} células dos cuidados 1 a 19: ${Object.entries(conta)
  .filter(([, v]) => v)
  .map(([k, v]) => `${k} ${v}`)
  .join(', ')}.

## O que cada cuidado pede e como foi conferido

| nº | Cuidado | Como foi conferido |
|---|---|---|
${CUIDADOS.map((c, i) => `| ${i + 1} | ${c} | ${COMO[i]} |`).join('\n')}

O que **não** foi feito: não houve um revisor independente animação por animação (cuidado 20). A revisão independente (\`revisao-independente/\`) foi do corpo e das regras do motor. Nas animações marcadas com D, quem fez foi um subagente e quem conferiu foi quem integrou; o Gustavo viu só as de maior risco.

## A tabela

| Animação | Lote | ${CUIDADOS.map((_, i) => i + 1).join(' | ')} | Imagem |
|---|---|${CUIDADOS.map(() => '---').join('|')}|---|
${linhas.join('\n')}

## Os avisos e o que não foi cumprido

Dois avisos aparecem em quase todas e não entram na lista abaixo:

- **Cuidado 1, linhas provisórias** (${notas.filter((n) => /sem número na ficha da técnica/.test(n.texto)).length} animações): linhas da ficha do movimento que são escolha de desenho, sem número na ficha da técnica. Estão listadas, animação por animação, em \`prototipos/conferencia.md\`.
- **Cuidado 8, diferenças de músculo aceitas** (${new Set(notas.filter((n) => n.cuidado === 8).map((n) => n.id)).size} animações): o desenho realça um músculo dentro de um grupo que o conteúdo trata como um só, ou não tem o músculo separado (por exemplo, o glúteo médio). Estão em \`prototipos/conferencia.md\` e nos \`pedidos-ao-conteudo.md\`.

Os demais:

${
  [...porAnim.entries()]
    .map(([id, ns]) => [id, ns.filter((n) => !repetidos(n))])
    .filter(([, ns]) => ns.length)
    .map(([id, ns]) => `- \`${id}\`\n${ns.map((n) => `  - cuidado ${n.cuidado}: ${n.texto}`).join('\n')}`)
    .join('\n') || '(nenhum)'
}

## O que o andamento registra de cada uma

${ids.map((id) => `- \`${id}\`: ${andamento[id]?.estado ?? '(sem linha no andamento)'}`).join('\n')}
`;
writeFileSync(`${DIR}/qa.md`, md);
console.log(`qa.md: ${total} animações; ${JSON.stringify(conta)}; notas ${notas.length}`);
