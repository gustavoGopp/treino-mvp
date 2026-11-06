// Redesign (06/11/2026): copia o conjunto de referência das capturas "antes" (o que se vê sem rolar) para
// docs/revisoes/redesign/antes/, versionado. O conjunto completo (6 personas, página inteira) fica em reports/ (fora do git).
// Regra: cadastro e todas as telas da Ana, claro e escuro (Pixel 7); a 360 px, só cadastro, treino e guia; mais as telas
// que só existem em outras personas (o cartão de texto da Elisa, os locais do Bruno).
// Uso: node scripts/design/redesign/referencia.mjs
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';

const ORIGEM = 'reports/design/redesign/antes';
const DESTINO = 'docs/revisoes/redesign/antes';
const regras = [
  { proj: 'claro', persona: 'cadastro', filtro: () => true },
  { proj: 'escuro', persona: 'cadastro', filtro: () => true },
  { proj: 'claro', persona: 'ana', filtro: () => true },
  { proj: 'escuro', persona: 'ana', filtro: () => true },
  { proj: 'pequeno', persona: 'cadastro', filtro: () => true },
  { proj: 'pequeno', persona: 'ana', filtro: (n) => /^1[1-6]/.test(n) },
  { proj: 'claro', persona: 'elisa', filtro: (n) => n.startsWith('16d') },
  { proj: 'claro', persona: 'bruno', filtro: (n) => /^(10|2[12])/.test(n) },
];
let n = 0;
let kB = 0;
for (const { proj, persona, filtro } of regras) {
  const dir = `${ORIGEM}/${proj}/${persona}`;
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((f) => f.endsWith('-relance.png') && filtro(f))) {
    const destino = `${DESTINO}/${proj}`;
    mkdirSync(destino, { recursive: true });
    const nome = `${persona}-${f.replace('-relance', '')}`;
    copyFileSync(`${dir}/${f}`, `${destino}/${nome}`);
    n++;
    kB += statSync(`${destino}/${nome}`).size / 1024;
  }
}
console.log(`${n} imagens, ${Math.round(kB)} kB`);
