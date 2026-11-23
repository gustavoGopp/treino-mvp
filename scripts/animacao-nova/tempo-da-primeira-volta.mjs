// Tempo da primeira volta de cada animação (pacote D4, 23/11/2026): quanto custa cada pose e cada quadro na primeira
// vez que o ciclo passa, quando nada está guardado, e quanto custa na segunda volta, com os quadros já guardados.
// É a medida que decide se vale calcular mais coisa de antemão (scripts/animacao-nova/preparo.mjs): em 16/11/2026, seis
// animações levavam de 12 a 27 ms por pose no computador (docs/backlog.md, "Da animação nova").
//
// Para cada animação, numa página nova do Chromium dos testes (o motor sem nada guardado), com o que vem calculado de
// antemão (dados/preparo) e, onde ele está ligado, o pintor por pares:
//   pose    o tempo de `ex.quadro(corpo, u)` (a pose do corpo e das peças), em 60 pontos do ciclo, antes de qualquer desenho
//   quadro  o tempo de `quadroDoMotorNovo` (pose e desenho) na primeira vista, modo Técnica, nos 60 tempos de um ciclo
//   de novo o mesmo quadro, pedido outra vez (a segunda volta)
//
// Uso: node scripts/animacao-nova/tempo-da-primeira-volta.mjs [cpu] [ids...]
//   cpu  1 = o computador como está (padrão); 4 = a CPU 4× mais lenta (o celular médio do Lighthouse), pelo CDP
// Imprime um JSON: a medida de cada animação (mediana e pior caso, em ms) e as dez mais pesadas. Não grava nada.
import { existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { chromium } from 'playwright';
import { motorNovoTexto } from './empacotar.mjs';

const [cpuArg, ...pedidos] = process.argv.slice(2);
const CPU = Number(cpuArg ?? 1) || 1;
const N = 60;

const pacote = await motorNovoTexto(
  `export * from './src/engine/novo/app.ts'; export * from './src/engine/novo/ponte.ts'; import { registrarPintorPorPares } from './src/engine/novo/ponte.ts'; import { pintarPorPares } from './src/engine/novo/pintor-por-pares.ts'; registrarPintorPorPares((itens) => pintarPorPares(itens));`,
);
const caminho = '/opt/pw-browsers/chromium';
const navegador = await chromium.launch({ ...(existsSync(caminho) ? { executablePath: caminho } : {}), args: ['--no-sandbox'] });
// o pacote é servido por um servidor local com cache, para o navegador não ler o motor do zero a cada página nova
const servidor = createServer((req, res) => {
  if (req.url === '/motor.js') {
    res.writeHead(200, { 'content-type': 'text/javascript', 'cache-control': 'max-age=3600' });
    return void res.end(pacote);
  }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end('<!doctype html><title>primeira volta</title><script src="/motor.js"></script>');
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
const ids = await p0.evaluate(() => Object.keys(globalThis.MOTOR.EXERCICIOS).sort());
await p0.close();
const alvo = pedidos.length ? pedidos : ids;
const r1 = (x) => Math.round(x * 10) / 10;

const medidas = {};
for (const id of alvo) {
  const p = await pagina();
  medidas[id] = await p.evaluate(
    ({ id, n }) => {
      const m = globalThis.MOTOR;
      const ex = m.EXERCICIOS[id];
      const F = m.fichaDoMotorNovo(ex);
      const mede = (f) => {
        const t0 = performance.now();
        f();
        return performance.now() - t0;
      };
      const resumo = (xs) => {
        const s = [...xs].sort((a, b) => a - b);
        return { mediana: s[Math.floor(s.length / 2)], pior: s[s.length - 1], soma: xs.reduce((a, b) => a + b, 0) };
      };
      const pose = Array.from({ length: n }, (_, k) => mede(() => ex.quadro(m.CORPOS.homem, k / (n - 1))));
      const quadro = Array.from({ length: n }, (_, k) => mede(() => m.quadroDoMotorNovo(ex, F.views[0], 'tec', (k / n) * F.T, 0, '')));
      const deNovo = Array.from({ length: n }, (_, k) => mede(() => m.quadroDoMotorNovo(ex, F.views[0], 'tec', (k / n) * F.T, 0, '')));
      return { pose: resumo(pose), quadro: resumo(quadro), deNovo: resumo(deNovo) };
    },
    { id, n: N },
  );
  await p.close();
}
await navegador.close();
servidor.close();

const linha = (id) => {
  const x = medidas[id];
  return { id, poseMediana: r1(x.pose.mediana), posePior: r1(x.pose.pior), quadroMediana: r1(x.quadro.mediana), quadroPior: r1(x.quadro.pior), voltaInteira: Math.round(x.quadro.soma), segundaVolta: Math.round(x.deNovo.soma) };
};
const todas = alvo.map(linha);
const mediana = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];
console.log(
  JSON.stringify(
    {
      cpu: CPU,
      animacoes: todas.length,
      quadrosPorVolta: N,
      resumo: {
        poseMediana: r1(mediana(todas.map((x) => x.poseMediana))),
        quadroMediana: r1(mediana(todas.map((x) => x.quadroMediana))),
        voltaInteiraMediana: mediana(todas.map((x) => x.voltaInteira)),
        segundaVoltaMediana: mediana(todas.map((x) => x.segundaVolta)),
      },
      maisPesadasNaPose: [...todas].sort((a, b) => b.poseMediana - a.poseMediana).slice(0, 10),
      maisPesadasNoQuadro: [...todas].sort((a, b) => b.quadroMediana - a.quadroMediana).slice(0, 10),
      pedidas: pedidos.length ? todas : undefined,
    },
    null,
    1,
  ),
);
