import { readFileSync } from 'node:fs';
import { MEDIDAS, type MedidaId } from './cuidados';
const b = JSON.parse(readFileSync(process.argv[2]!, 'utf8')) as { piores: { caso: string; pontos: number; falhas: MedidaId[]; detalhes: string[]; programa: string }[] };
const vistos = new Set<string>();
const out: string[] = [];
let n = 0;
for (const p of b.piores) {
  const [cen, , dias, min, , dor] = p.caso.split(' · ') as [string, string, string, string, string, string];
  const grupo = cen.startsWith('so:') ? 'item' : cen.replace('+', '');
  const k = `${grupo}|${dor === 'sem dor' || dor.endsWith(' 4') ? 'sem' : 'dor'}|${dias}`;
  if (vistos.has(k)) continue;
  vistos.add(k);
  n++;
  const defeitos = p.falhas.filter((f) => MEDIDAS[f].tipo === 'defeito');
  out.push(`${n}. **${p.caso}**`);
  out.push(`   - O que recebe: ${p.programa}`);
  out.push(`   - Defeitos: ${p.detalhes.filter((d) => defeitos.includes(d.split(':')[0] as MedidaId)).map((d) => { const [k2, ...r] = d.split(': '); return `${MEDIDAS[k2 as MedidaId].nome} (${r.join(': ')})`; }).join('; ')}.`);
  out.push(`   - Notas: ${p.falhas.filter((f) => MEDIDAS[f].tipo === 'nota').map((f) => MEDIDAS[f].nome).join('; ')}.`);
  if (n >= 20) break;
}
console.log(out.join('\n'));
