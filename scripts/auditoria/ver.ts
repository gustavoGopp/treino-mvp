// Mostra o programa que o gerador dá a um perfil fictício, em texto curto (sessão "treino para todos", 12/11/2026).
// Uso: npx vite-node scripts/auditoria/ver.ts -- <cenário> <nível> <dias|divisão> <min> [focos|-] [objetivo|-] [dor|-] [semanasParado]
//   cenário: um id de scripts/auditoria/cenarios-55.ts (ex.: academia, casa, vazio, so:barra_fixa, halteres-banco)
//   focos: lista com vírgulas (ex.: peito,costas); dor: lista "articulação:nota" (ex.: ombro:7,joelho:4)
// Só dados fictícios. Não grava nada.
import type { Articulacao } from '../../src/domain/biblioteca';
import { gerarPrograma, type Grupo, type Objetivo } from '../../src/domain/gerador';
import type { Nivel } from '../../src/domain/regras';
import { inventarioDe, perfilDe, textoDoPrograma, type Pedido } from './ver-lib';

const args = process.argv.slice(2).filter((a) => a !== '--');
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
  const r = gerarPrograma(perfilDe(pedido), inventarioDe(cenario));
  if (r.status !== 'ok') console.log(r.status, r.status === 'sem-exercicio' ? r.aviso.texto : r.triagem.motivos?.join('; '));
  else console.log(textoDoPrograma(r.programa));
} else console.log('Uso: npx vite-node scripts/auditoria/ver.ts -- <cenário> <nível> <dias|divisão> <min> [focos|-] [objetivo|-] [dor|-] [semanasParado]');
