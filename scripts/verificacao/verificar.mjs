// npm run verificar: roda, na ordem e parando no primeiro erro, exatamente o que a verificação automática do GitHub
// roda (o CI chama este mesmo comando). Se tudo passa, carimba a árvore de arquivos conferida em .verificacao/, e o
// portão do envio (portao-envio.mjs) sabe que aquele conteúdo já passou. Ver docs/verificacao/README.md.
import { spawnSync } from 'node:child_process';
import { aprovar, arvoreAtual, soTextoLivre } from './estado.mjs';
import { PASSOS } from './regras.mjs';

const noGitHub = !!process.env.CI;
const antes = arvoreAtual();
const tempos = [];

for (const passo of PASSOS) {
  const [cmd, ...args] = passo.comando;
  // Fora do GitHub, os testes de tela rodam sem gravar o rastro de cada teste (pesa no processador); para investigar
  // uma falha, rode o teste de novo com --trace on.
  if (!noGitHub && passo.nome.startsWith('telas')) args.push('--', '--trace', 'off');
  console.log(`\n▶ ${passo.nome}: ${[cmd, ...args].join(' ')}`);
  const inicio = performance.now();
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  tempos.push(`${passo.nome} ${Math.round((performance.now() - inicio) / 1000)} s`);
  if (r.status !== 0) {
    console.error(`\n✗ verificar: falhou em "${passo.nome}" (${tempos.join(' · ')}). Nada foi carimbado.`);
    process.exit(r.status ?? 1);
  }
}

// Carimba o que foi conferido (o retrato do começo). Se, durante a rodada, mudou só texto livre, o carimbo continua
// valendo para o retrato novo (estado.mjs, aprovadaQueCobre); se mudou código, a rodada não serve para ele.
const depois = arvoreAtual();
if (!soTextoLivre(antes, depois)) {
  console.error('\n✗ verificar: o código mudou enquanto a verificação rodava. Rode de novo para carimbar.');
  process.exit(1);
}
if (!noGitHub) aprovar(antes, 'verificar');
console.log(`\n✓ verificar: tudo passou (${tempos.join(' · ')}).${noGitHub ? '' : ` Retrato ${antes.slice(0, 10)} carimbado.`}`);
