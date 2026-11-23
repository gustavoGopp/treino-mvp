// Gera public/sons/fim-descanso.wav: os mesmos três bipes que o descanso tocava pelo Web Audio (880, 880 e 1175 Hz,
// a 0,35 s um do outro), agora como arquivo. Lote M4 (22/11/2026): no iPhone, o som gerado pelo site é calado pela
// chave do silencioso, e o som de arquivo não é (docs/revisoes/analise-critica/mercado.md, "Som com o iPhone no silencioso").
// Sem sorteio e sem data: rodar de novo dá o mesmo arquivo, byte a byte. Uso: node scripts/som/gerar-fim-descanso.mjs
import { writeFileSync } from 'node:fs';

const TAXA = 22050; // Hz; basta para tons de até 1175 Hz
const DUR = 1.05; // s
const PICO = 0.8;
const BIPES = [
  { em: 0, hz: 880 },
  { em: 0.35, hz: 880 },
  { em: 0.7, hz: 1175 },
];
const SOBE = 0.02; // s até o pico
const SOME = 0.26; // s em que o bipe já sumiu (queda exponencial, como no Web Audio de antes)

const n = Math.round(TAXA * DUR);
const pcm = new Int16Array(n);
for (let i = 0; i < n; i++) {
  const t = i / TAXA;
  let v = 0;
  for (const b of BIPES) {
    const d = t - b.em;
    if (d < 0 || d > 0.3) continue;
    const ganho = d < SOBE ? d / SOBE : Math.pow(0.0001, (d - SOBE) / (SOME - SOBE));
    v += PICO * ganho * Math.sin(2 * Math.PI * b.hz * d);
  }
  pcm[i] = Math.round(Math.max(-1, Math.min(1, v)) * 32767);
}

const dados = Buffer.from(pcm.buffer);
const cab = Buffer.alloc(44);
cab.write('RIFF', 0);
cab.writeUInt32LE(36 + dados.length, 4);
cab.write('WAVEfmt ', 8);
cab.writeUInt32LE(16, 16);
cab.writeUInt16LE(1, 20); // PCM
cab.writeUInt16LE(1, 22); // mono
cab.writeUInt32LE(TAXA, 24);
cab.writeUInt32LE(TAXA * 2, 28);
cab.writeUInt16LE(2, 32);
cab.writeUInt16LE(16, 34);
cab.write('data', 36);
cab.writeUInt32LE(dados.length, 40);
writeFileSync(new URL('../../public/sons/fim-descanso.wav', import.meta.url), Buffer.concat([cab, dados]));
console.log(`public/sons/fim-descanso.wav: ${44 + dados.length} bytes`);
