import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { COBERTURA, DE_13_11, NAO_ALCANCADOS, NOTAS, SAIRAM_DO_APP } from './cobertura';
import { FLUXOS, PASTA_DAS_PARTES, SAIDA, type Fluxo, type Parte, type Tela } from './colher';

// A montagem do inventário: junta as partes que cada teste guardou (colher.ts, PASTA_DAS_PARTES), numera as telas dentro de
// cada fluxo ("fluxo/NN-nome"), copia as capturas com o nome final e escreve colheita.json e cobertura.md na pasta de
// saída (colher.ts, SAIDA: docs/revisoes/textos/depois, ou a de INVENTARIO=<pasta>). Roda sozinha no fim do Playwright
// (globalTeardown); para montar de novo sem percorrer o app: npx vite-node scripts/textos/montar-agora.ts

const lerPartes = (projeto: string): Parte[] => {
  const pasta = resolve(PASTA_DAS_PARTES, projeto);
  if (!existsSync(pasta)) return [];
  return readdirSync(pasta)
    .map((chave) => resolve(pasta, chave, 'parte.json'))
    .filter(existsSync)
    .map((f) => JSON.parse(readFileSync(f, 'utf8')) as Parte)
    .sort((a, b) => a.ordem - b.ordem || a.chave.localeCompare(b.chave));
};

export default function montar() {
  const claro = lerPartes('claro');
  const escuro = lerPartes('escuro');
  const falhas: string[] = [];
  /** o que a saída diz e não é falha (as telas de 13/11 que saíram do app) */
  const avisos: string[] = [];
  for (const p of [...claro, ...escuro]) for (const f of p.falhas) falhas.push(`[${p.projeto}/${p.chave}] ${f}`);

  rmSync(resolve(SAIDA, 'capturas'), { recursive: true, force: true });
  const telas: Tela[] = [];
  /** "fluxo/nome" (sem número) → id */
  const idDoNome = new Map<string, string>();
  for (const fluxo of FLUXOS) {
    const doFluxo = claro.flatMap((p) => p.telas.filter((t) => t.fluxo === fluxo).map((t) => ({ p, t })));
    const casas = Math.max(2, String(doFluxo.length).length);
    for (const projeto of ['claro', 'escuro']) mkdirSync(resolve(SAIDA, 'capturas', projeto, fluxo), { recursive: true });
    doFluxo.forEach(({ p, t }, i) => {
      const chaveDoNome = `${fluxo}/${t.nome}`;
      if (idDoNome.has(chaveDoNome)) {
        falhas.push(`[montagem] ${chaveDoNome}: nome repetido em dois testes (${p.chave}); a 2ª colheita ficou de fora`);
        return;
      }
      const id = `${fluxo}/${String(i + 1).padStart(casas, '0')}-${t.nome}`;
      idDoNome.set(chaveDoNome, id);
      const origem = (projeto: string, sufixo = '') => resolve(PASTA_DAS_PARTES, projeto, p.chave, `${fluxo}--${t.nome}${sufixo}.png`);
      const destino = (projeto: string, sufixo = '') => resolve(SAIDA, 'capturas', projeto, `${id}${sufixo}.png`);
      for (const projeto of ['claro', 'escuro']) {
        if (existsSync(origem(projeto))) copyFileSync(origem(projeto), destino(projeto));
        else falhas.push(`[montagem] ${id}: sem a captura do projeto ${projeto}`);
      }
      const temInteira = t.inteira && existsSync(origem('claro', '-inteira'));
      if (temInteira) copyFileSync(origem('claro', '-inteira'), destino('claro', '-inteira'));
      const { nome, inteira, ...resto } = t;
      void nome;
      void inteira;
      telas.push({ id, ...resto, captura: `capturas/claro/${id}.png`, capturaInteira: temInteira ? `capturas/claro/${id}-inteira.png` : null });
    });
  }
  // o que o escuro fotografou e o claro não colheu
  const colhidas = new Set(claro.flatMap((p) => p.telas.map((t) => `${p.chave}|${t.fluxo}/${t.nome}`)));
  for (const p of escuro) for (const f of p.fotos) if (!colhidas.has(`${p.chave}|${f.fluxo}/${f.nome}`)) falhas.push(`[montagem] ${f.fluxo}/${f.nome}: fotografada no escuro (${p.chave}) e não colhida no claro`);

  // a versão do app colhido, como o próprio app a escreve em "Meus dados"
  const versao = telas.flatMap((t) => t.blocos).map((b) => /^Versão do app: (\S+), publicada em ([\d/]+)\./.exec(b.texto)).find(Boolean);
  const cabeca = { geradoEm: new Date().toISOString(), versaoDoApp: versao?.[1] ?? null, publicadaEm: versao?.[2] ?? null };
  // ---- cobertura.md ----
  const citadas = new Set<string>();
  // um nome com "*" vale por todas as telas colhidas que casam com ele
  const expandir = (n: string): string[] => {
    if (!n.includes('*')) return [n];
    const forma = new RegExp(`^${n.split('*').map((x) => x.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*')}$`);
    const achados = [...idDoNome.keys()].filter((k) => forma.test(k));
    return achados.length ? achados : [n];
  };
  // um nome terminado em "?" é de uma tela que pode não existir nesta versão do app (um bloco de saída): sem ela, a
  // célula diz isso e não há falha; qualquer outro nome que falte é falha
  const ids = (nomes: string[]) =>
    [...new Set(nomes.flatMap(expandir))]
      .map((citado) => {
        const opcional = citado.endsWith('?');
        const n = opcional ? citado.slice(0, -1) : citado;
        const id = idDoNome.get(n);
        if (id) citadas.add(id);
        else if (!opcional) falhas.push(`[cobertura] a tabela cita "${n}", que não está na colheita`);
        return id ? `\`${id}\`` : opcional ? `*não existe nesta versão do app: ${n}*` : `**não colhido: ${n}**`;
      })
      .join('<br>');
  const celula = (t: string) => t.replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const linhas: string[] = [];
  linhas.push('# Inventário dos textos: cobertura', '');
  linhas.push(`Gerado por \`scripts/textos/montar.ts\` a partir da colheita (\`colheita.json\`) e da tabela escrita à mão em \`scripts/textos/cobertura.ts\`. Não edite este arquivo: mude a tabela e monte de novo (\`npx vite-node scripts/textos/montar-agora.ts\`).`, '');
  linhas.push('## Como ler', '');
  for (const n of NOTAS) linhas.push(`- ${n}`);
  linhas.push('');
  const TIPOS = ['rota', 'folha', 'bloco que abre', 'por quê', 'aviso condicional', 'estado vazio', 'carregando', 'erro ou validação', 'resposta de uma ação'] as const;
  linhas.push('## O que há no código e onde está na colheita', '');
  const arquivos = [...new Set(COBERTURA.map((c) => c.fonte.split(':')[0]!))];
  for (const arquivo of arquivos) {
    linhas.push(`### \`${arquivo}\``, '', '| Linha | O que é | Tipo | Na colheita |', '|---|---|---|---|');
    for (const c of COBERTURA.filter((x) => x.fonte.split(':')[0] === arquivo))
      linhas.push(`| ${c.fonte.split(':')[1] ?? ''} | ${celula(c.item)}${c.nota ? ` *(${celula(c.nota)})*` : ''} | ${c.tipo} | ${ids(c.telas)} |`);
    linhas.push('');
  }
  linhas.push('## Não alcançados', '');
  if (NAO_ALCANCADOS.length) {
    linhas.push('| Onde | O que é | Texto (copiado do código-fonte) | Por que não foi alcançado |', '|---|---|---|---|');
    for (const n of NAO_ALCANCADOS) linhas.push(`| \`${n.fonte}\` | ${celula(n.item)} | ${celula(n.texto)} | ${celula(n.motivo)} |`);
  } else linhas.push('Nenhum.');
  linhas.push('');
  const soltas = telas.filter((t) => !citadas.has(t.id));
  if (soltas.length) {
    linhas.push('## Telas colhidas que a tabela não cita', '');
    for (const t of soltas) linhas.push(`- \`${t.id}\`: ${t.titulo}`);
    linhas.push('');
  }
  const soma = (ts: Tela[]) => ts.reduce((n, t) => n + t.palavrasNaTela, 0);
  const milhar = (n: number) => n.toLocaleString('pt-BR');
  // ---- a mesma régua, as mesmas 41 telas: 13/11 (depois da etapa 1) e hoje ----
  const arquivoDe1311 = resolve(process.cwd(), 'docs/revisoes/frontend-novo/textos/medidas-de-texto.json');
  if (existsSync(arquivoDe1311)) {
    const antes = (JSON.parse(readFileSync(arquivoDe1311, 'utf8')) as { enxuta: Record<string, { palavrasNaTela: number; palavrasAVista: number }> }).enxuta;
    linhas.push('## As 41 telas de 13/11, com a mesma régua', '');
    linhas.push('`palavrasNaTela` de `docs/revisoes/frontend-novo/textos/medidas-de-texto.json` (a medida "enxuta", depois da etapa 1) e da tela de hoje que refaz o mesmo caminho.', '');
    linhas.push('| Tela de 13/11 | Tela de hoje | 13/11 | Hoje | Diferença |', '|---|---|---|---|---|');
    let [somaAntes, somaHoje] = [0, 0];
    const sairam: string[] = [];
    for (const [velha, nova] of DE_13_11) {
      const hoje = telas.find((t) => t.id === idDoNome.get(nova));
      const a = antes[velha]?.palavrasNaTela;
      // a tela que saiu do app de propósito (SAIRAM_DO_APP) não é cobrada: fica na tabela como "saiu do app", fora da soma
      if (nova in SAIRAM_DO_APP) {
        if (hoje) falhas.push(`[montagem] comparação com 13/11: ${nova} está em SAIRAM_DO_APP (cobertura.ts), mas foi colhida; tire a marca`);
        else {
          sairam.push(nova);
          linhas.push(`| ${velha} | *saiu do app* (\`${nova}\`) | ${a ?? '?'} | — | saiu |`);
          continue;
        }
      }
      if (!hoje || a === undefined) {
        falhas.push(`[montagem] comparação com 13/11: falta ${!hoje ? nova : velha}`);
        continue;
      }
      somaAntes += a;
      somaHoje += hoje.palavrasNaTela;
      const d = hoje.palavrasNaTela - a;
      linhas.push(`| ${velha} | \`${hoje.id}\` | ${a} | ${hoje.palavrasNaTela} | ${d === 0 ? '=' : d > 0 ? `+${d}` : d} |`);
    }
    linhas.push(`| **Soma**${sairam.length ? ` (sem ${sairam.length === 1 ? 'a tela que saiu' : `as ${sairam.length} telas que saíram`} do app)` : ''} | | **${milhar(somaAntes)}** | **${milhar(somaHoje)}** | ${somaHoje - somaAntes === 0 ? '=' : somaHoje - somaAntes > 0 ? `+${somaHoje - somaAntes}` : somaHoje - somaAntes} |`, '');
    if (sairam.length) {
      linhas.push('Saíram do app (não entram na soma):', '');
      for (const n of sairam) linhas.push(`- \`${n}\`: ${SAIRAM_DO_APP[n]}.`);
      linhas.push('');
      avisos.push(`comparação com 13/11: ${sairam.length === 1 ? '1 tela saiu' : `${sairam.length} telas saíram`} do app (não é falha): ${sairam.join(', ')}`);
    }
  }

  linhas.push('## Totais', '');
  linhas.push(`- Telas colhidas: **${telas.length}**, do app na versão \`${cabeca.versaoDoApp ?? 'desconhecida'}\` (publicada em ${cabeca.publicadaEm ?? '?'}; colheita de ${cabeca.geradoEm.slice(0, 10)}).`);
  linhas.push(`- Soma de \`palavrasNaTela\`: **${milhar(soma(telas))}** (a mesma frase conta de novo em cada tela ou folha em que aparece).`);
  linhas.push(`- Linhas da tabela de cobertura: ${COBERTURA.length} (por tipo: ${TIPOS.map((t) => `${t} ${COBERTURA.filter((c) => c.tipo === t).length}`).join(', ')}); não alcançados: ${NAO_ALCANCADOS.length}.`);
  linhas.push(`- Falhas anotadas na colheita: ${falhas.length} (em \`colheita.json\`, campo \`falhas\`).`, '');
  const tabela = (titulo: string, grupos: [string, Tela[]][]) => {
    linhas.push(`| ${titulo} | Telas | palavrasNaTela (soma) | Folhas | Blocos abertos | Estados vazios, erros e avisos |`, '|---|---|---|---|---|---|');
    for (const [nome, ts] of grupos)
      linhas.push(`| ${nome} | ${ts.length} | ${milhar(soma(ts))} | ${ts.filter((t) => t.tipo === 'folha').length} | ${ts.filter((t) => t.tipo === 'bloco aberto').length} | ${ts.filter((t) => ['estado vazio', 'erro', 'aviso', 'carregando'].includes(t.tipo)).length} |`);
    linhas.push('');
  };
  tabela('Fluxo', FLUXOS.map((f): [string, Tela[]] => [f, telas.filter((t) => t.fluxo === f)]));
  const personas = [...new Set(telas.map((t) => t.persona))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  tabela('Persona', personas.map((p): [string, Tela[]] => [p, telas.filter((t) => t.persona === p)]));

  mkdirSync(SAIDA, { recursive: true });
  writeFileSync(resolve(SAIDA, 'colheita.json'), JSON.stringify({ ...cabeca, telas, falhas }, null, 1) + '\n');
  writeFileSync(resolve(SAIDA, 'cobertura.md'), linhas.join('\n'));
  const porFluxo = FLUXOS.map((f: Fluxo) => `${f} ${telas.filter((t) => t.fluxo === f).length}`).join(', ');
  console.log(`[inventário] ${telas.length} telas (${porFluxo}); ${milhar(soma(telas))} palavras; ${falhas.length} falhas`);
  for (const a of avisos) console.log(`  [montagem] ${a}`);
  for (const f of falhas) console.log(`  falha: ${f}`);
}
