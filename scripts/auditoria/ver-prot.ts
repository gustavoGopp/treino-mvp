// Como scripts/auditoria/ver.ts, mas lado a lado: o gerador do app e o protótipo (scripts/auditoria/prototipo).
// Uso: [PROT=...] npx vite-node scripts/auditoria/ver-prot.ts -- <cenário> <nível> <dias|divisão> <min> [focos|-] [objetivo|-] [dor|-] [semanasParado] [--so-novo]
import type { Articulacao } from '../../src/domain/biblioteca';
import { gerarPrograma, type Grupo, type Objetivo } from '../../src/domain/gerador';
import type { Nivel } from '../../src/domain/regras';
import { gerarPrograma as gerarNovo } from './prototipo/gerador';
import { inventarioDe, perfilDe, textoDoPrograma, type Pedido } from './ver-lib';

const bruto = process.argv.slice(2).filter((a) => a !== '--');
const soNovo = bruto.includes('--so-novo');
const args = bruto.filter((a) => !a.startsWith('--'));
if (args.length >= 4) {
  const [cenario, nivel, dias, min, focos = '-', objetivo = '-', dor = '-', parado = '0'] = args as [string, Nivel, string, string, string?, string?, string?, string?];
  const pedido: Pedido = {
    cenario,
    nivel,
    dias,
    min: Number(min),
    focos: focos === '-' ? [] : (focos.split(',') as Grupo[]),
    ...(objetivo !== '-' ? { objetivo: objetivo as Objetivo } : {}),
    dores: dor === '-' ? [] : dor.split(',').map((d) => ({ articulacao: d.split(':')[0] as Articulacao, nota: Number(d.split(':')[1]) })),
    semanasParado: Number(parado),
  };
  const a = gerarPrograma(perfilDe(pedido), inventarioDe(cenario));
  const b = gerarNovo(perfilDe(pedido), inventarioDe(cenario));
  if (!soNovo) console.log(`===== HOJE\n${a.status === 'ok' ? textoDoPrograma(a.programa) : a.status}`);
  console.log(`\n===== PROTÓTIPO\n${b.status === 'ok' ? textoDoPrograma(b.programa as never) : b.status}`);
} else console.log('Uso: npx vite-node scripts/auditoria/ver-prot.ts -- <cenário> <nível> <dias|divisão> <min> [focos|-] [objetivo|-] [dor|-] [semanasParado] [--so-novo]');
