// Tempo até o primeiro quadro ao abrir um exercício (fechamento das animações restantes, 20/11/2026).
// Mede o que o Worker do Boneco faz quando o guia abre um exercício (src/features/programa/trabalhoBoneco.ts): a ficha
// (`fichaDoMotorNovo`) e o primeiro quadro do guia (`quadroDoMotorNovo`, a primeira vista, modo Técnica, cinza, tema
// claro, t = 0), com o que vem calculado de antemão (dados/preparo) e, nas animações em que o pintor por pares está
// ligado (pintor-ligado.ts), com ele. Mede também a miniatura do cartão (`miniaturaDoMotorNovo`), numa página à parte.
//
// Cada medida é feita numa página nova do Chromium dos testes (o motor sem nada guardado, como na primeira vez que a
// pessoa abre a animação). Fica de fora o que vem antes no app: baixar e ler o arquivo do exercício e o resto do motor
// (aqui o motor inteiro é lido antes de o relógio começar).
//
// Uso: node scripts/animacao-nova/tempo-ate-o-primeiro-quadro.mjs [cpu] [voltas] [ids...]
//   cpu     1 = o computador como está (padrão); 4 = a CPU 4× mais lenta (o celular médio do Lighthouse), pelo CDP
//   voltas  quantas medidas por animação, cada uma numa página nova (padrão 3); vale a mediana de cada animação
// Imprime um JSON com a medida de cada animação e o resumo (mediana e pior caso) das 81 animações restantes (as de
// `ESPERAM_A_LIGACAO` e `EM_REVISAO`) e das 90 de antes. Não grava nada.
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { chromium } from 'playwright';
import { motorNovoTexto } from './empacotar.mjs';

const [cpuArg, voltasArg, ...pedidos] = process.argv.slice(2);
const CPU = Number(cpuArg ?? 1) || 1;
const VOLTAS = Number(voltasArg ?? 3) || 3;

const pacote = await motorNovoTexto(
  `export * from './src/engine/novo/app.ts'; export * from './src/engine/novo/ponte.ts'; export { opcoesDe, pintarPorPares } from './src/engine/novo/pintor-por-pares.ts'; export { PINTOR_POR_PARES_LIGADO } from './src/engine/novo/pintor-ligado.ts'; export { APROVADOS, ESPERAM_A_LIGACAO, EM_REVISAO } from './src/engine/novo/aprovados.ts';`,
);
const caminho = '/opt/pw-browsers/chromium';
const navegador = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
// o pacote é servido por um servidor local com cache, para o navegador não ler o motor do zero a cada página nova
// (o relógio só começa depois que ele foi lido; isto só encurta a medida inteira)
const servidor = createServer((req, res) => {
  if (req.url === '/motor.js') {
    res.writeHead(200, { 'content-type': 'text/javascript', 'cache-control': 'max-age=3600' });
    return void res.end(pacote);
  }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end('<!doctype html><title>tempo</title><script src="/motor.js"></script>');
});
await new Promise((ok) => servidor.listen(0, '127.0.0.1', ok));
const endereco = `http://127.0.0.1:${servidor.address().port}/`;
const contexto = await navegador.newContext();

async function pagina() {
  const p = await contexto.newPage();
  await p.goto(endereco);
  await p.waitForFunction(() => !!globalThis.MOTOR);
  if (CPU > 1) {
    const cdp = await p.context().newCDPSession(p);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU });
  }
  return p;
}

const p0 = await pagina();
const { ids, restantes } = await p0.evaluate(() => {
  const m = globalThis.MOTOR;
  return { ids: Object.keys(m.EXERCICIOS).sort(), restantes: [...m.ESPERAM_A_LIGACAO, ...Object.keys(m.EM_REVISAO)] };
});
await p0.close();
const alvo = pedidos.length ? pedidos : ids;

const mediana = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const r1 = (x) => Math.round(x * 10) / 10;

const medidas = {};
for (const id of alvo) {
  const guia = [],
    mini = [];
  for (let v = 0; v < VOLTAS; v++) {
    for (const tipo of ['guia', 'mini']) {
      const p = await pagina();
      const ms = await p.evaluate(
        ({ id, tipo }) => {
          const m = globalThis.MOTOR;
          const ex = m.EXERCICIOS[id];
          const a = performance.now();
          // como o Worker: o pintor por pares só é entregue ao motor numa animação em que ele está ligado
          if (m.PINTOR_POR_PARES_LIGADO.has(id)) m.registrarPintorPorPares((itens, id) => m.pintarPorPares(itens, m.opcoesDe(id)));
          if (tipo === 'guia') {
            const f = m.fichaDoMotorNovo(ex);
            const q = m.quadroDoMotorNovo(ex, f.vistaMovimento, 'tec', 0, -1, '', 'claro', 'cinza');
            if (!q.html) throw new Error(`${id}: quadro vazio`);
          } else {
            const q = m.miniaturaDoMotorNovo(ex, 'claro', 'cinza');
            if (!q.html) throw new Error(`${id}: miniatura vazia`);
          }
          return performance.now() - a;
        },
        { id, tipo },
      );
      (tipo === 'guia' ? guia : mini).push(ms);
      await p.close();
    }
  }
  medidas[id] = { guia: r1(mediana(guia)), miniatura: r1(mediana(mini)), restante: restantes.includes(id) };
  process.stderr.write(`${id}: ${medidas[id].guia} ms; miniatura ${medidas[id].miniatura} ms\n`);
}
await navegador.close();
servidor.close();

function resumo(lista) {
  if (!lista.length) return null;
  const pior = (k) => lista.reduce((a, b) => (b[1][k] > a[1][k] ? b : a));
  const g = pior('guia'),
    mi = pior('miniatura');
  return {
    animacoes: lista.length,
    guia: { mediana: r1(mediana(lista.map(([, x]) => x.guia))), pior: [g[0], g[1].guia] },
    miniatura: { mediana: r1(mediana(lista.map(([, x]) => x.miniatura))), pior: [mi[0], mi[1].miniatura] },
    acimaDe100ms: lista.filter(([, x]) => x.guia > 100).map(([id, x]) => [id, x.guia]),
  };
}
const todas = Object.entries(medidas);
console.log(
  JSON.stringify(
    {
      comoFoiMedido: `Chromium dos testes, CPU ${CPU}×, ${VOLTAS} medidas por animação (cada uma numa página nova), a mediana de cada animação; guia = ficha + primeiro quadro (primeira vista, Técnica, cinza, claro, t = 0); miniatura = o quadro parado do cartão`,
      restantes: resumo(todas.filter(([, x]) => x.restante)),
      antigas: resumo(todas.filter(([, x]) => !x.restante)),
      medidas,
    },
    null,
    1,
  ),
);
