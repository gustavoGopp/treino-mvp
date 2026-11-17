// Os piores perfis de um retrato, em Markdown, para o diagnóstico (sessão "treino para todos").
// Uso: npx vite-node scripts/auditoria/piores.ts -- <retrato.json> [geral|por-min]
//   geral: 20 dos piores, um por tipo de equipamento, dias e presença de dor forte;
//   por-min: os 3 piores de 45, 60, 75 e 90 min, um por tipo de equipamento e presença de dor forte.
import { readFileSync } from 'node:fs';
import { MEDIDAS, type MedidaId } from './cuidados';

type Pior = { caso: string; pontos: number; falhas: MedidaId[]; detalhes: string[]; programa: string };
const args = process.argv.slice(2).filter((a) => a !== '--');
const b = JSON.parse(readFileSync(args[0]!, 'utf8')) as { piores: Pior[]; pioresPorMin?: Record<string, Pior[]> };
const modo = args[1] ?? 'geral';

const partes = (p: Pior) => {
  const [cen, , dias, , , dor] = p.caso.split(' · ') as [string, string, string, string, string, string];
  return { grupo: cen.startsWith('so:') ? 'um aparelho só' : cen.replace('+', ''), dias, dorForte: !(dor === 'sem dor' || dor.endsWith(' 4')) };
};
const texto = (n: number, p: Pior): string[] => {
  const defeitos = p.falhas.filter((f) => MEDIDAS[f].tipo === 'defeito');
  const detalhe = (d: string) => {
    const [k, ...r] = d.split(': ');
    return `${MEDIDAS[k as MedidaId].nome} (${r.join(': ')})`;
  };
  return [
    `${n}. **${p.caso}**`,
    `   - O que recebe: ${p.programa}`,
    `   - Defeitos: ${p.detalhes.filter((d) => defeitos.includes(d.split(':')[0] as MedidaId)).map(detalhe).join('; ') || 'nenhum'}.`,
    `   - Notas: ${p.falhas.filter((f) => MEDIDAS[f].tipo === 'nota').map((f) => MEDIDAS[f].nome).join('; ') || 'nenhuma'}.`,
  ];
};
function escolher(lista: Pior[], quantos: number, chave: (p: Pior) => string): Pior[] {
  const vistos = new Set<string>();
  const out: Pior[] = [];
  for (const p of lista) {
    const k = chave(p);
    if (vistos.has(k)) continue;
    vistos.add(k);
    out.push(p);
    if (out.length >= quantos) break;
  }
  return out;
}

const L: string[] = [];
if (modo === 'geral') escolher(b.piores, 20, (p) => `${partes(p).grupo}|${partes(p).dorForte}|${partes(p).dias}`).forEach((p, i) => L.push(...texto(i + 1, p)));
else
  for (const min of ['45', '60', '75', '90']) {
    L.push(`**${min} minutos**`, '');
    escolher(b.pioresPorMin?.[min] ?? [], 3, (p) => `${partes(p).grupo}|${partes(p).dorForte}`).forEach((p, i) => L.push(...texto(i + 1, p)));
    L.push('');
  }
console.log(L.join('\n'));
