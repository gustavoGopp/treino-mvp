// Rodada 4: versões mais evoluídas dos dois finalistas, que seguem como referência. O Gustavo disse que o 1 (cinza)
// "tá bom, mas ainda tá muito simples" (teme que não seja preciso na hora de ver um treino) e que no 10 (Atlas) os
// glúteos ficam marcados demais de costas e a figura parece sem o short. Cada finalista ganha duas versões novas.
// Uso: node scripts/boneco-desenho/rodada4.mjs  → docs/revisoes/boneco-desenho/rodada-4/quadro.png
import { mkdirSync } from 'node:fs';
import { zerarFigura } from './figura.mjs';
import { fotografar } from './foto.mjs';
import { FINALISTAS, pose } from './rodada3.mjs';
import { zerarIds } from './tinta.mjs';

const SAIDA = 'docs/revisoes/boneco-desenho/rodada-4';
const [F1, F10] = FINALISTAS;
const claro = (t) => t === 'claro';
const comCores = (c, extra) => ({ ...c, cores: (t, b) => ({ ...(c.cores ? c.cores(t, b) : {}), ...extra(t) }) });

export const VERSOES = [
  { cod: '1', nome: 'Referência', frase: 'O finalista da rodada 3: cinza, traço fino, sem roupa; o músculo só quando trabalha.', c: F1 },
  { cod: '1.1', nome: 'Com as linhas do corpo', frase: 'O mesmo, com os grupos musculares e a rótula desenhados em linha fina: o corpo ganha referências para se ler a inclinação do tronco e a posição do joelho.',
    c: comCores({ ...F1, definicao: 'linhas' }, (t) => ({ linhaMus: claro(t) ? '#9fabb5' : '#43515b' })) },
  { cod: '1.2', nome: 'Com as linhas, de short e tênis', frase: 'O 1.1 com short, tênis e cabelo: o short separa o quadril da coxa, o tênis mostra o apoio do pé e o cabelo mostra para onde a cabeça olha.',
    c: comCores({ ...F1, definicao: 'linhas', roupa: 'short', descalco: false, sola: true, cabelo: true, musculo: 'veu' }, (t) => (claro(t) ? { linhaMus: '#9fabb5', short: '#6c7986', calcado: '#3f4d5a', sola: '#aab4bc', cabelo: '#4b5a67' } : { linhaMus: '#43515b', short: '#2c3740', calcado: '#c3ced6', sola: '#7d8c97', cabelo: '#c3ced6' })) },
  { cod: '10', nome: 'Referência', frase: 'O finalista da rodada 3: cor de pele, contorno suave, de short; todos os grupos musculares sempre desenhados. O short já aparece corrigido (opaco).', c: F10 },
  { cod: '10.1', nome: 'Mais calmo, com o short de verdade', frase: 'Os grupos musculares só em linha fina, sem o tom mais claro por dentro; o short fica opaco e só deixa ver o músculo quando ele trabalha por baixo.',
    c: { ...F10, definicao: 'linhas' } },
  { cod: '10.2', nome: 'Mais calmo, com traço escuro', frase: 'O 10.1 com o traço fino escuro do boneco cinza no lugar do contorno suave: as bordas ficam mais nítidas.',
    c: comCores({ ...F10, definicao: 'linhas', contornoNaCor: false, contorno: 0.5 }, (t) => ({ contorno: claro(t) ? '#3a2b22' : '#f1e6dc' })) },
];

const COLUNAS = [['Em pé, de frente', 'frente', {}], ['De costas', 'costas', { mus: false }], ['Agachamento', 'agach', { mus: false }], ['Com o músculo', 'agach', {}], ['Supino, com o músculo', 'supino', {}], ['No cabo, com o músculo', 'puxada', {}]];
const ESCALA = 1.32;
const L = { frente: 86, costas: 86, agach: 100, supino: 180, puxada: 132 };

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(SAIDA, { recursive: true });
  zerarIds();
  zerarFigura();
  const grade = `210px ${COLUNAS.map(([, tipo]) => `${Math.round(L[tipo] * ESCALA)}px`).join(' ')} 96px`;
  const linhas = VERSOES.map((v, i) => `<div class="lin${i === 3 ? ' nova' : ''}"><div class="rot"><b>${v.cod} · ${v.nome}</b><span>${v.frase}</span></div>${COLUNAS.map(([, tipo, op]) => `<div>${pose(v.c, tipo, { ...op, px: Math.round(L[tipo] * ESCALA) })}</div>`).join('')}<div class="minis">${pose(v.c, 'agach', { px: 96, mini: true })}${pose(v.c, 'agach', { px: 96, mini: true, tema: 'escuro' })}</div></div>`).join('');
  const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;padding:26px 28px 20px;background:#fff;color:#171b20;font:15px/1.4 system-ui,-apple-system,"Segoe UI",sans-serif}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.01em}.sub{color:#5b6570;margin:0 0 14px;font-size:15.5px;max-width:1240px}
.cab,.lin{display:grid;grid-template-columns:${grade};column-gap:9px;align-items:end}
.cab{font-size:12.6px;font-weight:700;border-bottom:2px solid #171b20;padding-bottom:6px}
.lin{padding:9px 0;border-bottom:1px solid #e3e6e9;align-items:center}.lin.nova{border-top:2px solid #171b20}
.rot b{display:block;font-size:16px;line-height:1.2;margin-bottom:4px}.rot span{display:block;font-size:12.4px;line-height:1.32;color:#464b51;padding-right:8px}
.minis{display:flex;flex-direction:column;gap:6px}.pe{font-size:13px;color:#5b6570;margin:10px 0 0;max-width:1240px}
</style><h1>Rodada 4 · Os dois finalistas, mais desenvolvidos</h1>
<p class="sub">Os dois seguem como referência (1 e 10). Cada um ganhou duas versões que atacam o ponto fraco que você apontou: o cinza estava simples demais para ser preciso, e no de cor de pele os glúteos ficavam marcados e ele parecia sem o short. Nada está marcado: a escolha é sua.</p>
<div class="cab"><div></div>${COLUNAS.map(([t]) => `<div>${t}</div>`).join('')}<div>Miniatura</div></div>${linhas}
<p class="pe">De costas e no agachamento sem o músculo, a figura aparece como no modo Técnica do guia. Nas versões com short, ele é opaco; só fica claro, deixando ver o músculo, quando o músculo que trabalha está debaixo dele (no agachamento).</p>`;
  await fotografar(html, `${SAIDA}/quadro.png`, { largura: 1400, escala: 2 });
  console.log('quadro da rodada 4');
}
