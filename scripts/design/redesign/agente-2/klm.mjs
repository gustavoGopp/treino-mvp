// Agente 2 (cadastro): estimativa do tempo de uma pessoa pelo modelo KLM (Keystroke-Level Model), a partir das
// medidas de cadastro.spec.ts (reports/design/redesign/agente-2/cadastro-<projeto>.json).
// Uso: node scripts/design/redesign/agente-2/klm.mjs [pixel7|pequeno]
//
// Operadores (ver o relatório, seção 2):
//  M = 1,35 s por decisão (preparo mental; Card, Moran e Newell 1980). Uma decisão = cada pergunta respondida
//      (legenda distinta) + cada botão tocado.
//  T = 0,5 s por toque (mirar e tocar com o dedo) [premissa do agente: entre 0,08 s de El Batran e Dunlop 2014, apontar
//      a partir da posição de descanso, e 1,1 s do P de Card et al., apontar com o mouse]. Sensibilidade: 0,2 e 1,1 s.
//  K = 0,36 s por caractere no teclado do celular [Holleis et al. 2007, valor visto em material de aula; não conferido no original].
//  S = 0,5 s por gesto de rolagem, 1 gesto por altura de tela rolada [premissa do agente].
//  R = troca de tela medida (resposta-<projeto>.json), uma por tela; a geração do programa, medida à parte.
//  Leitura (fora do KLM): palavras visíveis ao abrir ÷ 238 palavras/min (Brysbaert 2019, leitura silenciosa, inglês).
import { readFileSync } from 'node:fs';

const projeto = process.argv[2] ?? 'pixel7';
const base = 'reports/design/redesign/agente-2';
const dados = JSON.parse(readFileSync(`${base}/cadastro-${projeto}.json`, 'utf8'));
let resp = { trocaDeTelaMs: 0, gerarProgramaMs: [0] };
try {
  resp = JSON.parse(readFileSync(`${base}/resposta-${projeto}.json`, 'utf8'));
} catch {
  /* sem a medida de resposta: R = 0 */
}
const R = resp.trocaDeTelaMs / 1000;
const G = Math.max(...resp.gerarProgramaMs) / 1000;
const M = 1.35, K = 0.36, S = 0.5, PPM = 238;

const klm = (telas, T) =>
  telas.reduce((s, t) => s + t.decisoes * M + t.toques * T + t.caracteres * K + Math.ceil(t.rolagem) * S + (t.toques ? R : 0), 0);
const leitura = (telas) => telas.reduce((s, t) => s + (t.palavrasAoAbrir / PPM) * 60, 0);
const f = (x) => x.toFixed(0);

const ordem = ['ana', 'bruno', 'carla', 'diego', 'elisa', 'fabio', 'bruno-ombro', 'bruno-bloqueio'];
console.log(`Projeto: ${projeto} · R (troca de tela) = ${R.toFixed(2)} s · geração do programa = ${G.toFixed(2)} s`);
console.log('| Persona | Toques fora do equip. | Toques no equip. | Caracteres | Telas | Rolagem (alturas) | Robô (s) | KLM fora do equip. (s) [T=0,2–1,1] | KLM total (s) | + leitura (s) |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
for (const p of [...dados].sort((a, b) => ordem.indexOf(a.persona) - ordem.indexOf(b.persona))) {
  const telas = p.telas.filter((t) => !['programa', 'locais'].includes(t.tela));
  const cad = telas.filter((t) => t.tela !== 'local-2');
  const fora = cad.filter((t) => t.tela !== 'equipamento');
  const eq = cad.filter((t) => t.tela === 'equipamento');
  const soma = (xs, k) => xs.reduce((s, t) => s + t[k], 0);
  const rol = soma(cad, 'rolagem');
  const nomes = new Set(cad.map((t) => t.tela));
  console.log(
    `| ${p.persona} | ${soma(fora, 'toques')} | ${soma(eq, 'toques')} | ${soma(cad, 'caracteres')} | ${nomes.size} | ${rol.toFixed(1)} | ${(p.totalMs / 1000).toFixed(1)} | ${f(klm(fora, 0.5))} [${f(klm(fora, 0.2))}–${f(klm(fora, 1.1))}] | ${f(klm(cad, 0.5) + G)} | ${f(klm(cad, 0.5) + G + leitura(cad))} |`,
  );
  if (p.telas.some((t) => t.tela === 'local-2')) {
    const l2 = p.telas.filter((t) => t.tela === 'local-2');
    console.log(`|  ↳ 2º local (${p.persona}) | — | ${soma(l2, 'toques')} | ${soma(l2, 'caracteres')} | 1 | ${soma(l2, 'rolagem').toFixed(1)} | — | — | ${f(klm(l2, 0.5))} | — |`);
  }
}
console.log('\nPor tela (persona, tela: toques / decisões / rolagem / palavras / KLM s):');
for (const p of dados)
  console.log(
    `${p.persona}: ` +
      p.telas
        .filter((t) => t.tela !== 'programa')
        .map((t) => `${t.tela} ${t.toques}/${t.decisoes}/${t.rolagem}/${t.palavrasAoAbrir}/${f(klm([t], 0.5))}`)
        .join(' · '),
  );
