// Estudo do pintor (19/11/2026): mede o protótipo desligado src/engine/novo/pintor-por-pares.ts contra o pintor de
// hoje. Não muda nada do app: o pintor de estudo só entra no pacote que este script monta (um plugin troca, só para
// src/engine/novo/cena.ts, o `pintar`, o `desenharBoneco` e o `equipamentoRealista` pelas versões do estudo).
// Relatório: docs/revisoes/animacao-nova/estudo-do-pintor.md.
//
// Uso: node scripts/animacao-nova/estudo-do-pintor.mjs <passo> [ids...]
//   conferencia  a conferência da pintura (src/engine/novo/conferir-pintura.ts) com o pintor de hoje, com a ordem por
//                pares e com a ordem por pares e os remendos (grava node_modules/.tmp/estudo-do-pintor/*.json)
//   desenho      o desenho de cada animação, nos quadros que a conferência mede, nos dois pintores: o SVG e, quando o
//                SVG muda, os pixels (a fração da figura que muda)
//   tempo        o tempo de montar um quadro (svgDaCena), nos dois pintores
//   tamanho      quanto o pintor de estudo somaria ao pacote do motor (comprimido)
//   imagens      antes e depois dos casos (docs/revisoes/animacao-nova/estudo-do-pintor/), cada um id:vista:u[:erro]
//   resumo       as tabelas do relatório, a partir do que os outros passos gravaram
// SEM_CONTATO=1 mede a variante rejeitada (o contato também decide).
import { build } from 'esbuild';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright';

const [passo, ...ids] = process.argv.slice(2);
// SEM_CONTATO=1: a variante em que o contato (o ponto escondido encostado no outro, ou dentro dele) também decide
const CONTATO = !process.env.SEM_CONTATO;
const SUF = CONTATO ? '' : '-sem-contato';
const TMP = 'node_modules/.tmp/estudo-do-pintor';
mkdirSync(TMP, { recursive: true });
const NOVO = resolve('src/engine/novo');

/** Só para cena.ts: o pintor, o Boneco e o equipamento do estudo (o resto do motor é o mesmo). */
const PINTOR_DE_ESTUDO = {
  name: 'pintor-de-estudo',
  setup(b) {
    const troca = { './desenho': 'pintarPorPares as pintar', './boneco': 'desenharBonecoMarcado as desenharBoneco', './equipamento': 'equipamentoMarcado as equipamentoRealista' };
    b.onResolve({ filter: /^\.\/(desenho|boneco|equipamento)$/ }, (a) => (a.importer === `${NOVO}/cena.ts` ? { path: a.path, namespace: 'estudo' } : undefined));
    b.onLoad({ filter: /.*/, namespace: 'estudo' }, (a) => ({
      contents: `export * from '${NOVO}/${a.path.slice(2)}.ts'; export { ${troca[a.path]} } from '${NOVO}/pintor-por-pares.ts';`,
      loader: 'ts',
      resolveDir: NOVO,
    }));
  },
};
let n = 0;
async function motor(estudo) {
  const entrada = `export * from './src/engine/novo/index.ts'; export { APROVADOS, EM_REVISAO } from './src/engine/novo/aprovados.ts'; export * as PP from './src/engine/novo/pintor-por-pares.ts';`;
  const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, loader: { '.json': 'json' }, plugins: estudo ? [PINTOR_DE_ESTUDO] : [] });
  const arq = `${TMP}/motor-${estudo ? 'estudo' : 'hoje'}-${process.pid}-${n++}.mjs`;
  writeFileSync(arq, outputFiles[0].text);
  const m = await import(pathToFileURL(resolve(arq)).href);
  if (estudo) Object.assign(m.PP.PINTOR_POR_PARES, { ligado: true, opcoes: { ...m.PP.PADRAO, contato: CONTATO } });
  return m;
}
const grupoDe = (m, id) => (m.EM_REVISAO[id] ? 'revisao' : m.APROVADOS[id] ? (m.APROVADOS[id].em < '2026-11-17' ? 'antiga' : 'sessao') : 'outra');
/** O instante t do ciclo em que o quadro u aparece no app (como em conferencia-de-pintura.mjs). */
function tempoDe(m, ex, u) {
  const T = m.duracao(ex.ficha.fases);
  let melhor = 0,
    dif = 1e9;
  for (let i = 0; i <= 2000; i++) {
    const t = (i / 2000) * T;
    const d = Math.abs(m.instante(ex.ficha.fases, t).u - u);
    if (d < dif - 1e-9) [melhor, dif] = [t, d];
  }
  return melhor;
}
/** Os quadros que a conferência mede, como pedidos de desenho: (vista, t, modo, erro). */
function pedidos(m, ex) {
  const T = m.duracao(ex.ficha.fases);
  const out = [];
  for (let k = 0; k < 6; k++) for (const vista of ex.vistas) out.push({ vista, t: (k / 6) * T, modo: 'tec' });
  for (const er of ex.ficha.erros)
    for (const u of [0, 0.5, 1]) {
      const t = tempoDe(m, ex, u);
      for (const vista of new Set([...ex.vistas, er.vista])) out.push({ vista, t, modo: 'err', erro: er.id });
    }
  return out;
}

/* ============================== conferência ============================== */
if (passo === 'conferencia') {
  const m = await motor(false);
  const PP = m.PP;
  const corpo = m.CORPOS.homem;
  const lista = ids.length ? ids : Object.keys(m.EXERCICIOS).sort();
  for (const modo of process.env.MODOS ? process.env.MODOS.split(',') : ['hoje', 'pares', 'remendos']) {
    const opcoes = { ...PP.PADRAO, remendos: modo === 'remendos', contato: CONTATO };
    const pintor = modo === 'hoje' ? undefined : { marcarBoneco: PP.marcarBoneco, marcarPeca: PP.marcarPeca, ordenar: (it) => PP.ordenarPorPares(it, opcoes), remendoDe: PP.remendoDe };
    const out = [];
    let remendos = 0;
    const t0 = performance.now();
    for (const id of lista) {
      const ex = m.EXERCICIOS[id];
      const pintura = [];
      for (const { q, onde, vistas } of m.quadrosMedidos(ex, corpo))
        for (const v of vistas) {
          pintura.push(...m.pinturaDoQuadro(q, v, onde, `pintura-${id}-`, false, pintor));
          if (pintor) remendos += PP.ULTIMA.remendos;
        }
      out.push({ id, grupo: grupoDe(m, id), pintura: pintura.filter((a) => !a.deProposito) });
    }
    writeFileSync(`${TMP}/conferencia-${modo}${modo === 'hoje' ? '' : SUF}.json`, JSON.stringify(out));
    const com = out.filter((x) => x.pintura.length).length,
      ach = out.reduce((s, x) => s + x.pintura.length, 0),
      area = out.reduce((s, x) => s + x.pintura.reduce((t, a) => t + a.area, 0), 0);
    console.log(`${modo.padEnd(9)} ${com} animações com achado, ${ach} achados, ${area.toFixed(0)} cm², ${remendos} remendos (${((performance.now() - t0) / 1000).toFixed(0)} s)`);
  }
}

/* ============================== desenho ============================== */
if (passo === 'desenho') {
  const [h, e] = [await motor(false), await motor(true)];
  const corpo = h.CORPOS.homem;
  const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + h.cssDoBoneco();
  const caminho = '/opt/pw-browsers/chromium';
  const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
  const pg = await nav.newPage();
  await pg.setContent('<canvas id="a" width="480" height="360"></canvas><canvas id="b" width="480" height="360"></canvas>');
  // compara dois SVG desenhados a 480 × 360: quantos pixels mudam (algum canal mais que 8 em 255) e quantos são figura
  const comparar = (a, b) =>
    pg.evaluate(
      async ([a, b]) => {
        const img = async (s, c) => {
          const im = new Image();
          im.src = URL.createObjectURL(new Blob([s], { type: 'image/svg+xml' }));
          await im.decode();
          const x = document.getElementById(c).getContext('2d', { willReadFrequently: true });
          x.clearRect(0, 0, 480, 360);
          x.drawImage(im, 0, 0, 480, 360);
          URL.revokeObjectURL(im.src);
          return x.getImageData(0, 0, 480, 360).data;
        };
        const [A, B] = [await img(a, 'a'), await img(b, 'b')];
        let muda = 0,
          figura = 0;
        for (let i = 0; i < A.length; i += 4) {
          // o fundo do quadro claro é #f7f9fa
          if (Math.abs(A[i] - 247) + Math.abs(A[i + 1] - 249) + Math.abs(A[i + 2] - 250) > 12) figura++;
          if (Math.max(Math.abs(A[i] - B[i]), Math.abs(A[i + 1] - B[i + 1]), Math.abs(A[i + 2] - B[i + 2])) > 8) muda++;
        }
        return { muda, figura };
      },
      [a, b],
    );
  const comEstilo = (s) => s.replace('<svg ', `<svg xmlns="http://www.w3.org/2000/svg" `).replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
  const lista = ids.length ? ids : Object.keys(h.EXERCICIOS).sort();
  const out = [];
  const t0 = performance.now();
  for (const id of lista) {
    const exH = h.EXERCICIOS[id],
      exE = e.EXERCICIOS[id];
    const linhas = [];
    for (const p of pedidos(h, exH)) {
      const o = { corpo, vista: p.vista, boneco: 'cinza', modo: p.modo, erro: p.erro };
      const vb = h.enquadrar(exH, { corpo, vista: p.vista, boneco: 'cinza' });
      const a = h.svgDaCena(exH, p.t, o, vb),
        b = e.svgDaCena(exE, p.t, { ...o, corpo: e.CORPOS.homem }, vb);
      if (a === b) {
        linhas.push({ ...p, igual: true });
        continue;
      }
      const r = await comparar(comEstilo(a), comEstilo(b));
      linhas.push({ ...p, igual: false, ...r });
    }
    const v = (l) => l.filter((x) => !x.igual && x.muda > 0);
    out.push({ id, grupo: grupoDe(h, id), linhas });
    const mudam = v(linhas);
    console.log(`${id.padEnd(40)} ${grupoDe(h, id).padEnd(8)} quadros ${linhas.length}, SVG igual ${linhas.filter((x) => x.igual).length}, pixels mudam em ${mudam.length}; pior ${mudam.length ? Math.max(...mudam.map((x) => (100 * x.muda) / x.figura)).toFixed(2) : '0'}% da figura`);
  }
  writeFileSync(`${TMP}/desenho${SUF}${ids.length ? '-parcial' : ''}.json`, JSON.stringify(out));
  await nav.close();
  console.log(`${((performance.now() - t0) / 1000).toFixed(0)} s`);
}

/* ============================== tempo ============================== */
if (passo === 'tempo') {
  const [h, e] = [await motor(false), await motor(true)];
  const lista = ids.length ? ids : Object.keys(h.EXERCICIOS).sort();
  const res = { hoje: 0, estudo: 0, quadros: 0, porId: [] };
  for (const id of lista) {
    const tempos = {};
    for (const [nome, m] of [
      ['hoje', h],
      ['estudo', e],
    ]) {
      const ex = m.EXERCICIOS[id],
        corpo = m.CORPOS.homem;
      const T = m.duracao(ex.ficha.fases);
      // 24 quadros do ciclo, na primeira vista (a que o app abre), no modo Técnica; uma volta para aquecer
      const vb = m.enquadrar(ex, { corpo, vista: ex.vistas[0], boneco: 'cinza' });
      const um = (k) => m.svgDaCena(ex, (k / 24) * T, { corpo, vista: ex.vistas[0], boneco: 'cinza', modo: 'tec' }, vb);
      for (let k = 0; k < 24; k++) um(k);
      const t0 = performance.now();
      for (let r = 0; r < 3; r++) for (let k = 0; k < 24; k++) um(k);
      tempos[nome] = (performance.now() - t0) / 72;
    }
    res.hoje += tempos.hoje;
    res.estudo += tempos.estudo;
    res.quadros++;
    res.porId.push({ id, ...tempos });
    console.log(`${id.padEnd(40)} hoje ${tempos.hoje.toFixed(2)} ms  estudo ${tempos.estudo.toFixed(2)} ms  (${(tempos.estudo / tempos.hoje).toFixed(2)}×)`);
  }
  // só a ordem (sem marcar): os itens do quadro já marcados, ordenados de novo
  const PP = e.PP;
  let soOrdem = 0,
    soMarcar = 0,
    nq = 0;
  for (const id of lista) {
    const ex = e.EXERCICIOS[id],
      corpo = e.CORPOS.homem;
    const cam = e.VISTAS[ex.vistas[0]];
    for (let k = 0; k < 8; k++) {
      const q = ex.quadro(corpo, k / 8);
      const t0 = performance.now();
      const bon = PP.desenharBonecoMarcado(q.esq, cam, { estilo: 'cinza' });
      const eq = q.pecas ? PP.equipamentoMarcado(q.pecas, cam, 'claro', `t-${id}-`).itens : [];
      const t1 = performance.now();
      e.desenharBoneco(q.esq, cam, { estilo: 'cinza' });
      if (q.pecas) e.equipamentoRealista(q.pecas, cam, 'claro', `t-${id}-`);
      const t2 = performance.now();
      PP.ordenarPorPares([...eq, ...bon]);
      const t3 = performance.now();
      soMarcar += t1 - t0 - (t2 - t1);
      soOrdem += t3 - t2;
      nq++;
    }
  }
  res.soOrdem = soOrdem / nq;
  res.soMarcar = soMarcar / nq;
  writeFileSync(`${TMP}/tempo${SUF}${ids.length ? '-parcial' : ''}.json`, JSON.stringify(res));
  console.log(`média por quadro: hoje ${(res.hoje / res.quadros).toFixed(2)} ms, estudo ${(res.estudo / res.quadros).toFixed(2)} ms; só a ordem ${res.soOrdem.toFixed(2)} ms, só as marcas ${res.soMarcar.toFixed(2)} ms`);
}

/* ============================== tamanho ============================== */
if (passo === 'tamanho') {
  const pacote = async (entrada) => {
    const { outputFiles } = await build({ stdin: { contents: entrada, resolveDir: process.cwd(), loader: 'ts' }, bundle: true, format: 'esm', write: false, minify: true, loader: { '.json': 'json' } });
    const t = outputFiles[0].text;
    return { bruto: t.length, gz: gzipSync(t).length };
  };
  // o motor sem os dados de cada exercício (o que todo exercício usa): cena, Boneco, equipamento, desenho
  const base = await pacote(`export { svgAnimado, svgDaCena, enquadrar } from './src/engine/novo/cena.ts';`);
  // com o pintor por pares e as marcas que o estudo usa; e só o pintor (numa ligação de verdade, o Boneco e o
  // equipamento diriam o que cada item é ao montá-lo, sem as marcas por comparação de texto do estudo)
  const com = await pacote(`export { svgAnimado, svgDaCena, enquadrar } from './src/engine/novo/cena.ts'; export { pintarPorPares, desenharBonecoMarcado, equipamentoMarcado } from './src/engine/novo/pintor-por-pares.ts';`);
  const so = await pacote(`export { svgAnimado, svgDaCena, enquadrar } from './src/engine/novo/cena.ts'; export { pintarPorPares, marcarPeca } from './src/engine/novo/pintor-por-pares.ts';`);
  const r = { base, com, so, soma: { bruto: com.bruto - base.bruto, gz: com.gz - base.gz }, somaSo: { bruto: so.bruto - base.bruto, gz: so.gz - base.gz } };
  writeFileSync(`${TMP}/tamanho.json`, JSON.stringify(r));
  console.log(r);
}

/* ============================== imagens ============================== */
if (passo === 'imagens') {
  const [h, e] = [await motor(false), await motor(true)];
  const corpo = h.CORPOS.homem;
  const css = readFileSync('src/engine/novo/estilo.css', 'utf8') + h.cssDoBoneco();
  const pasta = 'docs/revisoes/animacao-nova/estudo-do-pintor';
  mkdirSync(pasta, { recursive: true });
  const caminho = '/opt/pw-browsers/chromium';
  const nav = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
  const pg = await nav.newPage({ viewport: { width: 1240, height: 800 }, deviceScaleFactor: 1 });
  // cada caso: id:vista:u[:erro]:legenda
  for (const caso of ids) {
    const [id, vista, u, erro] = caso.split(':');
    const exH = h.EXERCICIOS[id],
      exE = e.EXERCICIOS[id];
    const t = tempoDe(h, exH, Number(u));
    const o = { corpo, vista, boneco: 'cinza', modo: erro ? 'err' : 'tec', erro: erro || undefined };
    const vb = h.enquadrar(exH, { corpo, vista, boneco: 'cinza' });
    const a = h.svgDaCena(exH, t, o, vb),
      b = e.svgDaCena(exE, t, { ...o, corpo: e.CORPOS.homem }, vb);
    // os achados da conferência no quadro, nos dois pintores (em magenta)
    const PP = h.PP;
    const pintor = { marcarBoneco: PP.marcarBoneco, marcarPeca: PP.marcarPeca, ordenar: (it) => PP.ordenarPorPares(it, { ...PP.PADRAO, contato: CONTATO }), remendoDe: PP.remendoDe };
    const q = exH.quadro(corpo, Number(u), erro || undefined);
    const ach = (p) => h.pinturaDoQuadro(q, vista, '', `img-${id}-`, true, p).filter((x) => !x.deProposito);
    const marcas = (l) => `<g fill="#ff00aa" opacity="0.55">${l.flatMap((x) => x.pontos).map(([x, y]) => `<rect x="${(x - 0.25).toFixed(2)}" y="${(y - 0.25).toFixed(2)}" width="0.5" height="0.5"/>`).join('')}</g></svg>`;
    const [la, lb] = [ach(undefined), ach(pintor)];
    const area = (l) => l.reduce((s, x) => s + x.area, 0).toFixed(1).replace('.', ',');
    const html = `<!doctype html><meta charset="utf-8"><style>${css}body{margin:12px;font:14px system-ui;background:#fff;width:1216px}h1{font-size:16px;margin:0 0 8px}div.l{display:flex;gap:16px}figure{margin:0;width:600px}svg{width:600px;height:450px;border-radius:8px;display:block;border:1px solid #ddd}figcaption{color:#333;margin-top:4px}</style><h1>${id}, ${h.VISTAS[vista].nome.toLowerCase()}, ${erro ? `erro "${exH.ficha.erros.find((x) => x.id === erro).titulo}", ` : ''}u = ${u}</h1><div class="l"><figure>${a}<figcaption>pintor de hoje</figcaption></figure><figure>${b}<figcaption>ordem por pares com remendos</figcaption></figure></div><div class="l" style="margin-top:10px"><figure>${a.replace(/<\/svg>$/, marcas(la))}<figcaption>hoje: em magenta, o que a conferência acha (${la.length} achados, ${area(la)} cm²)</figcaption></figure><figure>${b.replace(/<\/svg>$/, marcas(lb))}<figcaption>por pares: ${lb.length} achados, ${area(lb)} cm²</figcaption></figure></div>`;
    await pg.setContent(html);
    const arq = `${pasta}/${id}-${vista}${SUF}.png`;
    await pg.screenshot({ path: arq, fullPage: true });
    console.log(arq, la.length, lb.length);
  }
  await nav.close();
}

/* ============================== resumo (as tabelas do relatório) ============================== */
if (passo === 'resumo') {
  const ler = (f) => (existsSync(`${TMP}/${f}`) ? JSON.parse(readFileSync(`${TMP}/${f}`, 'utf8')) : null);
  const hoje = ler('conferencia-hoje.json');
  const chave = (x) => `${x.tipo}|${x.vista}|${x.onde}|${x.parte}|${x.peca}`;
  const NOMES = { antiga: 'aprovadas antes de 17/11', sessao: 'aprovadas desde 17/11', revisao: 'em revisão', outra: 'fora das listas' };
  const pc = (x) => `${x.toFixed(x < 0.1 ? 2 : 1).replace('.', ',')}%`;
  const um = (x) => Math.round(x).toLocaleString('pt-BR');
  let md = '';
  for (const [nome, suf] of [
    ['A proposta: ordem por pares e remendos', ''],
    ['A variante em que o contato também decide (rejeitada)', '-sem-contato'],
  ]) {
    const pares = ler(`conferencia-pares${suf}.json`),
      rem = ler(`conferencia-remendos${suf}.json`),
      des = ler(`desenho${suf}.json`);
    if (!hoje || !rem) continue;
    md += `\n#### ${nome}\n\n| grupo | animações | com achado hoje | com achado, só pares | com achado, pares e remendos | achados hoje | somem | aparecem | área hoje (cm²) | área depois (cm²) | desenho muda | muda 1% ou mais da figura |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
    const linhas = [];
    const G = {};
    hoje.forEach((x, i) => {
      const y = rem[i],
        p = pares?.[i],
        d = des?.find((z) => z.id === x.id);
      const ka = new Set(x.pintura.map(chave)),
        kb = new Set(y.pintura.map(chave));
      const somem = [...ka].filter((k) => !kb.has(k)).length,
        aparecem = [...kb].filter((k) => !ka.has(k)).length;
      const mudam = d ? d.linhas.filter((l) => !l.igual && l.muda > 0) : [];
      const pior = mudam.length ? Math.max(...mudam.map((l) => (100 * l.muda) / l.figura)) : 0;
      const vistas = {};
      for (const l of mudam) vistas[l.vista] = Math.max(vistas[l.vista] ?? 0, (100 * l.muda) / l.figura);
      const l = { id: x.id, grupo: x.grupo, antes: x.pintura.length, pares: p?.pintura.length, depois: y.pintura.length, somem, aparecem, aA: x.pintura.reduce((s, a) => s + a.area, 0), aD: y.pintura.reduce((s, a) => s + a.area, 0), quadros: d?.linhas.length ?? 0, mudam: mudam.length, pior, vistas };
      linhas.push(l);
      const g = (G[x.grupo] ??= { n: 0, comA: 0, comP: 0, comB: 0, ach: 0, somem: 0, aparecem: 0, aA: 0, aD: 0, muda: 0, muda1: 0 });
      g.n++;
      if (l.antes) g.comA++;
      if (l.pares) g.comP++;
      if (l.depois) g.comB++;
      g.ach += l.antes;
      g.somem += somem;
      g.aparecem += aparecem;
      g.aA += l.aA;
      g.aD += l.aD;
      if (mudam.length) g.muda++;
      if (pior >= 1) g.muda1++;
    });
    const T = Object.values(G).reduce((t, g) => Object.fromEntries(Object.entries(g).map(([k, v]) => [k, (t[k] ?? 0) + v])), {});
    for (const [g, x] of [...Object.entries(G), ['total', T]]) md += `| ${NOMES[g] ?? g} | ${x.n} | ${x.comA} | ${x.comP} | ${x.comB} | ${x.ach} | ${x.somem} | ${x.aparecem} | ${um(x.aA)} | ${um(x.aD)} | ${des ? x.muda : '—'} | ${des ? x.muda1 : '—'} |\n`;
    const semAchado = linhas.filter((l) => !l.antes);
    md += `\nNas ${semAchado.length} animações sem achado hoje, o desenho muda em ${semAchado.filter((l) => l.mudam).length} (em ${semAchado.filter((l) => l.pior >= 1).length}, 1% ou mais da figura num quadro).\n`;
    if (suf) continue;
    md += `\n<details><summary>Por animação (${nome})</summary>\n\n| animação | grupo | achados hoje | só pares | pares e remendos | somem | aparecem | cm² hoje | cm² depois | quadros que mudam | pior quadro (fração da figura) | vistas que mudam (pior) |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
    for (const l of linhas.filter((l) => l.antes || l.depois || l.mudam)) md += `| \`${l.id}\` | ${NOMES[l.grupo] ?? l.grupo} | ${l.antes} | ${l.pares ?? '—'} | ${l.depois} | ${l.somem} | ${l.aparecem} | ${um(l.aA)} | ${um(l.aD)} | ${l.mudam} de ${l.quadros} | ${pc(l.pior)} | ${Object.entries(l.vistas).sort((a, b) => b[1] - a[1]).map(([v, f]) => `${v} ${pc(f)}`).join(', ')} |\n`;
    md += `\n</details>\n`;
  }
  writeFileSync(`${TMP}/resumo.md`, md);
  console.log(md);
}
