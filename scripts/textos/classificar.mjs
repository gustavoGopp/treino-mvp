// Inventário do texto do app (sessão de textos, 16/11/2026): pega a colheita (colheita.json, feita pelo roteiro
// inventario.spec.ts com o app rodando) e diz, de cada texto, DE QUEM ele é e PARA QUE serve.
//
//   node scripts/textos/classificar.mjs [pasta do inventário]      (padrão: docs/revisoes/textos/inventario)
//
// Saídas, na mesma pasta: inventario.csv (uma linha por texto por tela), textos-unicos.csv
// (cada texto uma vez, com as telas em que aparece) e inventario.md (o resumo por tela e por fluxo).
//
// DE QUEM É: procura o texto no código. `tela` = escrito em src/features; `domínio` = frases e nomes que vêm das regras
// e dos dados (src/domain); `conteúdo` = fichas dos exercícios e fontes (src/conteudo); `jurídico` = termos e
// privacidade (Termos.tsx, privacidade.tsx); `motor` = rótulos do desenho (src/engine). Texto montado na hora
// ("1 de 3") não existe inteiro no código: vale o pedaço de 3 palavras seguidas que mais aparece.
//
// PARA QUE SERVE: primeiro o que foi decidido à mão, texto por texto (funcoes-a-mao.json, `exatos`); depois regras pela peça
// (botão, opção, título) e por palavras (dor, médico → segurança; aparelho, cópia → privacidade); por fim, os padrões
// escritos à mão para o que nenhuma regra pegou (`padroes`). A coluna `como` diz
// se a função veio da mão ou de qual regra, para ninguém confundir palpite de script com decisão.

import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PASTA = resolve(process.argv[2] ?? 'docs/revisoes/textos/inventario');
const colheita = JSON.parse(readFileSync(join(PASTA, 'colheita.json'), 'utf8'));
const aMaoCaminho = resolve('scripts/textos/funcoes-a-mao.json');
const aMaoArquivo = existsSync(aMaoCaminho) ? JSON.parse(readFileSync(aMaoCaminho, 'utf8')) : {};
const aMao = aMaoArquivo.exatos ?? {};
const aMaoPadroes = (aMaoArquivo.padroes ?? []).map(([re, funcao]) => [new RegExp(re, 'i'), funcao]);

// ---------- de quem é ----------
const arquivos = (pasta, filtro) => {
  const saida = [];
  const anda = (p) => {
    for (const f of readdirSync(p)) {
      const c = join(p, f);
      if (statSync(c).isDirectory()) anda(c);
      else if (filtro(c)) saida.push(c);
    }
  };
  if (existsSync(pasta)) anda(pasta);
  return saida;
};
const ehCodigo = (c) => /\.(tsx?|json|css)$/.test(c);
const JURIDICO = ['src/features/termos/Termos.tsx', 'src/features/app/privacidade.tsx'].map((c) => resolve(c));
const DONOS = {
  jurídico: JURIDICO,
  conteúdo: arquivos('src/conteudo', ehCodigo),
  domínio: arquivos('src/domain', ehCodigo),
  motor: arquivos('src/engine', (c) => /\.(ts|json)$/.test(c)),
  tela: arquivos('src/features', ehCodigo).filter((c) => !JURIDICO.includes(c)),
};
const semAcento = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '');
const palavrasDe = (t) => semAcento(t.toLowerCase()).split(/[^a-z0-9]+/).filter(Boolean);
const ngramas = (ps, n) => {
  const s = [];
  for (let i = 0; i + n <= ps.length; i++) s.push(ps.slice(i, i + n).join(' '));
  return s;
};
/** As cadeias de texto de um JSON, uma a uma (o valor inteiro é sinal forte de que o texto é um dado). */
const cadeias = (v, saida = []) => {
  if (typeof v === 'string') saida.push(v);
  else if (v && typeof v === 'object') for (const x of Object.values(v)) cadeias(x, saida);
  return saida;
};
const corpos = {};
for (const [dono, lista] of Object.entries(DONOS)) {
  const tri = new Set();
  const inteiras = new Set();
  let corrido = '';
  for (const c of lista) {
    const bruto = readFileSync(c, 'utf8');
    if (c.endsWith('.json')) {
      try {
        for (const s of cadeias(JSON.parse(bruto))) {
          inteiras.add(palavrasDe(s).join(' '));
          for (const g of ngramas(palavrasDe(s), 3)) tri.add(g);
          corrido += ' | ' + palavrasDe(s).join(' ');
        }
        continue;
      } catch {
        // JSON que não lê: cai no texto bruto
      }
    }
    // no código, {' '} e as quebras de linha do JSX somem; o resto vira uma fita de palavras
    const ps = palavrasDe(bruto.replace(/\{' '\}/g, ' '));
    for (const g of ngramas(ps, 3)) tri.add(g);
    corrido += ' | ' + ps.join(' ');
    // as cadeias entre aspas e o texto solto do JSX, inteiros (um nome de equipamento, o rótulo de um botão)
    for (const m of bruto.matchAll(/'((?:[^'\\\n]|\\.)+)'|"((?:[^"\\\n]|\\.)+)"|`((?:[^`\\]|\\.)+)`|>([^<>{}]+)</g)) {
      const t = palavrasDe(m[1] ?? m[2] ?? m[3] ?? m[4] ?? '').join(' ');
      if (t) inteiras.add(t);
    }
  }
  corpos[dono] = { tri, inteiras, corrido };
}
const ORDEM_LONGO = ['jurídico', 'conteúdo', 'domínio', 'motor', 'tela'];
const memoDono = new Map();
function donoDe(texto) {
  if (memoDono.has(texto)) return memoDono.get(texto);
  const ps = palavrasDe(texto);
  let r = { dono: 'tela', como: 'sem par no código (montado na hora)' };
  if (ps.length === 0) r = { dono: 'tela', como: 'só sinais' };
  else if (ps.every((p) => /^\d+$/.test(p) || p.length <= 2)) r = { dono: 'tela', como: 'número montado na hora' };
  else {
    const frase = ps.join(' ');
    // 1º: o texto existe inteiro no código de alguém. Dado (nome de exercício, de equipamento, dica da ficha) ganha da
    // tela, que muitas vezes só repete o nome; o jurídico ganha de todos.
    const inteiro = ['jurídico', 'domínio', 'conteúdo', 'tela', 'motor'].find((d) => corpos[d].inteiras.has(frase));
    if (inteiro) r = { dono: inteiro, como: 'existe inteiro no código' };
    else if (ps.length < 3) {
      r = { dono: 'tela', como: 'curto, montado na tela' };
    } else {
      const gs = ngramas(ps, 3);
      let melhor = null;
      for (const d of ORDEM_LONGO) {
        const parte = gs.filter((g) => corpos[d].tri.has(g)).length / gs.length;
        if (!melhor || parte > melhor.parte + 1e-9) melhor = { d, parte };
      }
      if (melhor && melhor.parte >= 0.34) r = { dono: melhor.d, como: melhor.parte >= 0.999 ? 'achado no código' : `${Math.round(melhor.parte * 100)}% achado no código (o resto é montado)` };
    }
  }
  memoDono.set(texto, r);
  return r;
}

// ---------- para que serve ----------
export const FUNCOES = ['ação', 'opção', 'título ou rótulo', 'estado', 'número', 'segurança', 'definição', 'justificativa', 'privacidade', 'instrução', 'descreve o que já se vê', 'a decidir'];
const RE_SEGURANCA = /\b(dor(es)?|tontura|formigamento|desmai\w*|mal-estar|falta de ar|les[ãa]o|les[õo]es|sinal de alerta|sinais de alerta|m[ée]dic\w*|avalia[çc][ãa]o|libera[çc][ãa]o|diagnostic\w*|profissional|emerg[êe]ncia|pare\b|interromp\w*|press[ãa]o alta|cora[çc][ãa]o|gravidez|gr[áa]vida|cirurgia|perda de for[çc]a)/i;
const RE_PRIVACIDADE = /\b(aparelho|navegador|c[óo]pia|exporta\w*|importa\w*|apagar (todos|tudo)|seus dados|meus dados|os dados|servidor|lgpd|privacidade|metadados|gps|termos de uso|foto(s)? (é|são|fica|ficam|sai|vai)|c[óo]digo de convite)/i;
const RE_NUMERO = /^[\s\d×x.,:;/%+\-−–·()]*(\d[\s\d×x.,:;/%+\-−–·()]*)(kg|min|s|seg|rep|reps|repeti[çc][õo]es|s[ée]ries?|de|rir|dias?|semanas?|treinos?|x|a|h)?[\s\d×x.,:;/%+\-−–·()a-zçõãé]{0,14}$/i;
const RE_SELO = /^(evid[êe]ncia (robusta|moderada)|apoiado por um estudo|um estudo|consenso( de treinadores)?|robusta|moderada|fonte)\b/i;

function funcaoDe(b, tela) {
  if (aMao[b.texto]) return { funcao: aMao[b.texto], como: 'à mão' };
  const t = b.texto;
  const papel = (b.papel ?? '').toLowerCase();
  const tag = (b.tag ?? '').toLowerCase();
  const classes = b.classes ?? '';
  const n = palavrasDe(t).length;
  if (/\bselo\b/.test(classes) || RE_SELO.test(t)) return { funcao: 'justificativa', como: 'regra: selo de evidência' };
  if (RE_SEGURANCA.test(t) && !['radio', 'checkbox', 'option'].includes(papel) && n > 2) return { funcao: 'segurança', como: 'regra: palavra de segurança' };
  if (['button', 'link', 'tab', 'menuitem'].includes(papel) || tag === 'summary') return { funcao: 'ação', como: 'regra: é botão, link, aba ou bloco que abre' };
  if (['radio', 'checkbox', 'option', 'switch'].includes(papel)) return { funcao: 'opção', como: 'regra: é uma opção de escolha' };
  if (RE_PRIVACIDADE.test(t) && n > 3) return { funcao: 'privacidade', como: 'regra: palavra de privacidade' };
  if (papel === 'heading' || /^h[1-6]$/.test(tag) || tag === 'legend') return { funcao: 'título ou rótulo', como: 'regra: é título ou pergunta' };
  if (n <= 6 && RE_NUMERO.test(t)) return { funcao: 'número', como: 'regra: é número' };
  if (tag === 'dt' || tag === 'dd') return { funcao: 'definição', como: 'regra: lista de definições' };
  if (/\bporque\b/.test(classes) || /^por qu[eê]/i.test(b.contexto ?? '') || /^por qu[eê]/i.test(tela.titulo ?? '')) return { funcao: 'justificativa', como: 'regra: está num "por quê"' };
  if (['alert', 'status'].includes(papel) || /\b(caixa-erro|status|aviso)\b/.test(classes)) return { funcao: 'estado', como: 'regra: aviso de estado ou erro' };
  const aberto = b.blocoAberto ?? '';
  const contexto = b.contexto ?? '';
  const titulo = tela.titulo ?? '';
  if (/\bregra\b/.test(classes) || /de onde vem isto/i.test(contexto) || /\((19|20)\d{2}[a-z]?\)|\(s\.d\.\)|pesquisa-v2|consenso-projeto/.test(t)) return { funcao: 'justificativa', como: 'regra: texto da regra ou fonte' };
  if (/\b(falta|erro|com-falta)\b/.test(classes) || /^falta /i.test(t)) return { funcao: 'estado', como: 'regra: o que falta ou o que deu errado' };
  if (/^por que/i.test(aberto) || /^(fontes|por qu[eê])/i.test(contexto)) return { funcao: 'justificativa', como: 'regra: está num bloco de porquês' };
  if (/\bwarnbox\b/.test(classes) || /^(avisos|limites|fases)/i.test(aberto) || /\bfase\b/.test(classes)) return { funcao: 'estado', como: 'regra: aviso, limite ou fase do programa' };
  if (/\bm-(sem-treino|crescendo|na-meta|mantendo|abaixo)\b|\bresumo-(ex|evolucao)\b|\bsub-rx\b|\bnum\b|\brir-meta\b/.test(classes)) return { funcao: 'número', como: 'regra: número do treino ou da semana' };
  if (/\d/.test(t) && n <= 6 && palavrasDe(t).filter((p) => /^\d/.test(p)).length * 2 >= n) return { funcao: 'número', como: 'regra: é número' };
  if (/\b(rotulo|rotulo-curto|busca|rir-pergunta)\b/.test(classes) || ['th', 'label', 'caption', 'columnheader', 'rowheader'].includes(tag) || ['columnheader', 'rowheader'].includes(papel)) return { funcao: 'título ou rótulo', como: 'regra: é rótulo de campo ou de coluna' };
  if (/^(saúde|refazer a triagem)/i.test(titulo) && b.dono === 'domínio') return { funcao: 'segurança', como: 'regra: pergunta da triagem' };
  if (tela.fluxo === 'guia' || /como fazer|posição, execução|montagem/i.test(aberto + ' ' + contexto + ' ' + titulo) || /\b(cue|dica|erro-item|passo|legenda-do-modo|cartao-texto)\b/.test(classes) || b.dono === 'motor') return { funcao: 'instrução', como: 'regra: texto de execução' };
  if (b.dono === 'jurídico') return { funcao: 'privacidade', como: 'regra: texto dos termos ou da privacidade' };
  const padrao = aMaoPadroes.find(([re]) => re.test(t));
  if (padrao) return { funcao: padrao[1], como: 'à mão (padrão)' };
  // nome de exercício ou de equipamento: é o próprio item da lista
  if ((b.dono === 'domínio' || b.dono === 'conteúdo') && n <= 12 && !/[.?!]$/.test(t.trim())) return { funcao: 'título ou rótulo', como: 'regra: nome de exercício ou de equipamento' };
  return { funcao: 'a decidir', como: 'sem regra' };
}

// ---------- monta ----------
const linhas = [];
for (const tela of colheita.telas) {
  for (const b of tela.blocos ?? []) {
    const d = donoDe(b.texto);
    Object.assign(b, { dono: d.dono, comoDono: d.como });
    const f = funcaoDe(b, tela);
    Object.assign(b, { funcao: f.funcao, comoFuncao: f.como });
    linhas.push({ tela: tela.id, fluxo: tela.fluxo, persona: tela.persona, tipo: tela.tipo, ...b });
  }
}
const soma = (xs, f) => xs.reduce((a, x) => a + f(x), 0);
const por = (xs, chave) => {
  const m = new Map();
  for (const x of xs) m.set(chave(x), [...(m.get(chave(x)) ?? []), x]);
  return m;
};
const csv = (v) => `"${String(v ?? '').replace(/"/g, '""').replace(/\s+/g, ' ')}"`;

writeFileSync(
  join(PASTA, 'inventario.csv'),
  ['tela,fluxo,persona,tipo,palavras,dono,funcao,como_funcao,peca,a_vista,dentro_de,contexto,texto', ...linhas.map((l) => [l.tela, l.fluxo, l.persona, l.tipo, l.palavras, l.dono, l.funcao, l.comoFuncao, l.papel || l.tag, l.aVista ? 'sim' : 'não', l.dentroDe, l.contexto, l.texto].map(csv).join(','))].join('\n') + '\n',
);
const unicos = [...por(linhas, (l) => l.texto).entries()].map(([texto, ls]) => ({ texto, palavras: ls[0].palavras, dono: ls[0].dono, funcao: ls[0].funcao, como: ls[0].comoFuncao, vezes: ls.length, telas: [...new Set(ls.map((l) => l.tela))] }));
unicos.sort((a, b) => b.palavras * b.vezes - a.palavras * a.vezes);
writeFileSync(
  join(PASTA, 'textos-unicos.csv'),
  ['palavras,vezes,telas,dono,funcao,como_funcao,texto,onde', ...unicos.map((u) => [u.palavras, u.vezes, u.telas.length, u.dono, u.funcao, u.como, u.texto, u.telas.slice(0, 6).join(' · ') + (u.telas.length > 6 ? ` · e mais ${u.telas.length - 6}` : '')].map(csv).join(','))].join('\n') + '\n',
);

const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : '0%');
const total = soma(linhas, (l) => l.palavras);
const tabela = (cab, ls) => [`| ${cab.join(' | ')} |`, `|${cab.map(() => '---').join('|')}|`, ...ls.map((l) => `| ${l.join(' | ')} |`)].join('\n');
const FLUXOS = [...new Set(colheita.telas.map((t) => t.fluxo))];
const md = [];
md.push('# Inventário do texto do app');
md.push('');
md.push(`> Gerado por \`scripts/textos/classificar.mjs\` a partir de \`colheita.json\` (${colheita.geradoEm ?? 'sem data'}). Não edite à mão: rode o roteiro e o script de novo.`);
md.push('');
md.push(`**${colheita.telas.length} telas, folhas e estados colhidos; ${linhas.length} textos (${unicos.length} diferentes); ${total} palavras somadas** (a mesma frase conta de novo em cada tela em que aparece; as palavras de textos diferentes somam ${soma(unicos, (u) => u.palavras)}).`);
md.push('');
md.push('## Por fluxo');
md.push('');
md.push(tabela(['Fluxo', 'Telas', 'Palavras', 'Média por tela', 'Maior tela'], FLUXOS.map((f) => {
  const ts = colheita.telas.filter((t) => t.fluxo === f);
  const maior = [...ts].sort((a, b) => b.palavrasNaTela - a.palavrasNaTela)[0];
  return [f, ts.length, soma(ts, (t) => t.palavrasNaTela), Math.round(soma(ts, (t) => t.palavrasNaTela) / ts.length), `${maior.titulo} (${maior.palavrasNaTela})`];
})));
md.push('');
md.push('## Para que serve o texto (todas as telas somadas)');
md.push('');
md.push(tabela(['Função', 'Textos', 'Palavras', 'Parte', 'Decididos à mão'], FUNCOES.map((f) => {
  const ls = linhas.filter((l) => l.funcao === f);
  return [f, ls.length, soma(ls, (l) => l.palavras), pct(soma(ls, (l) => l.palavras), total), ls.filter((l) => l.comoFuncao.startsWith('à mão')).length];
}).filter((l) => l[1] > 0)));
md.push('');
md.push('## De quem é o texto');
md.push('');
md.push(tabela(['Dono', 'Textos', 'Palavras', 'Parte'], Object.keys(DONOS).map((d) => {
  const ls = linhas.filter((l) => l.dono === d);
  return [d, ls.length, soma(ls, (l) => l.palavras), pct(soma(ls, (l) => l.palavras), total)];
})));
md.push('');
for (const f of FLUXOS) {
  md.push(`## ${f}`);
  md.push('');
  md.push(tabela(['Tela', 'O que é', 'Quem vê', 'Palavras', 'À vista', 'Blocos longos', 'Selos', 'Do que é feito (palavras por função)'], colheita.telas.filter((t) => t.fluxo === f).map((t) => {
    const fs = [...por(t.blocos ?? [], (b) => b.funcao).entries()].map(([k, bs]) => [k, soma(bs, (b) => b.palavras)]).sort((a, b) => b[1] - a[1]);
    return [`\`${t.id}\` ${t.titulo}`, t.tipo, t.persona, t.palavrasNaTela, t.palavrasAVista, t.blocosLongos?.length ?? 0, t.selos ?? 0, fs.map(([k, n]) => `${k} ${n}`).join(', ')];
  })));
  md.push('');
}
md.push('## Os 60 textos que mais pesam (palavras × vezes em que aparecem)');
md.push('');
md.push(tabela(['Palavras', 'Vezes', 'Dono', 'Função', 'Texto', 'Onde'], unicos.slice(0, 60).map((u) => [u.palavras, u.vezes, u.dono, u.funcao, u.texto.replace(/\|/g, '/').replace(/\s+/g, ' ').slice(0, 160) + (u.texto.length > 160 ? '…' : ''), u.telas[0] + (u.telas.length > 1 ? ` e mais ${u.telas.length - 1}` : '')])));
md.push('');
const semNome = colheita.telas.flatMap((t) => (t.nomesAcessiveis ?? []).filter((n) => n.origem === 'SEM NOME').map((n) => [t.id, n.tag, n.papel]));
md.push('## Controles sem nome acessível');
md.push('');
md.push(semNome.length ? tabela(['Tela', 'Peça', 'Papel'], semNome) : 'Nenhum.');
md.push('');
if (colheita.falhas?.length) md.push('## Passos da colheita que falharam', '', ...colheita.falhas.map((f) => `- ${f}`), '');
writeFileSync(join(PASTA, 'inventario.md'), md.join('\n'));
const aDecidir = unicos.filter((u) => u.funcao === 'a decidir');
console.log(`${colheita.telas.length} telas · ${linhas.length} textos (${unicos.length} diferentes) · ${total} palavras · a decidir: ${aDecidir.length} textos diferentes`);
