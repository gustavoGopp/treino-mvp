// A biblioteca por músculo e por cenário (sessão "treino para todos"): quantos exercícios diretos são possíveis, e
// quantos deles estão no 1º nível de alguma função ("opção boa": a 1ª escolha da função, selecao.funcao-da-vaga).
// Uso: npx vite-node scripts/auditoria/biblioteca-cobertura.ts -- [--saida <arquivo.md>]
import { writeFileSync } from 'node:fs';
import { contextoDeSelecao, MUSCULOS_COM_META, NOME_MUSCULO_CURTO } from '../../src/domain/gerador';
import { FUNCOES } from '../../src/domain/gerador/funcoes';
import { NIVEIS } from '../../src/domain/regras';
import { perfil } from './cenarios';
import { CENARIOS_55 } from './cenarios-55';
import { pesoDoCenario } from './populacao';

const args = process.argv.slice(2);
const saida = args.includes('--saida') ? args[args.indexOf('--saida') + 1] : undefined;
const PRINCIPAIS = ['academia', 'academia+', 'bairro', 'bruno', 'condominio', 'condominio+', 'casa', 'casa+', 'halteres', 'halteres-banco', 'elasticos', 'diego', 'so:barra_fixa', 'so:kettlebell', 'so:suspensao', 'vazio'];
const L: string[] = ['# A biblioteca por músculo e por cenário de equipamento', '', '> Gerado por `scripts/auditoria/biblioteca-cobertura.ts`. Dados fictícios. Em cada célula: exercícios diretos possíveis para o músculo / quantos deles são 1ª escolha de alguma função. Nível intermediário, sem dor.', ''];
const linha = (id: string, nivel: (typeof NIVEIS)[number]) => {
  const cen = CENARIOS_55.find((c) => c.id === id)!;
  const ctx = contextoDeSelecao(perfil({ nivel, divisao: 'ct-abc', minutos: 60, prioridades: [], dores: [] }), cen.inventario);
  return MUSCULOS_COM_META.map((m) => {
    const diretos = ctx.possiveis.filter((e) => e.musculos.primarios.includes(m));
    const boas = diretos.filter((e) => FUNCOES.some((f) => f.musculo === m && f.niveis[0]!.includes(e.id) && ctx.naFuncao(f, e.id)));
    return { m, diretos: diretos.length, boas: boas.length };
  });
};
L.push(`| cenário | ${MUSCULOS_COM_META.map((m) => NOME_MUSCULO_CURTO[m]).join(' | ')} |`);
L.push(`| --- | ${MUSCULOS_COM_META.map(() => '---:').join(' | ')} |`);
for (const id of PRINCIPAIS) L.push(`| ${id} | ${linha(id, 'intermediario').map((x) => (x.diretos ? `${x.diretos} / ${x.boas}` : '**0**')).join(' | ')} |`);
L.push('', '## Onde falta exercício (os 55 cenários)', '', 'Em quantos dos 55 cenários o músculo fica sem nenhum exercício direto, com 1 só, e sem nenhuma 1ª escolha; "peso": a fatia estimada das pessoas nesses cenários (`populacao.ts`).', '');
L.push('| músculo | sem exercício: cenários | peso | 1 exercício só: cenários | peso | sem 1ª escolha: cenários | peso |', '| --- | ---: | ---: | ---: | ---: | ---: | ---: |');
const pv = (x: number) => `${(Math.round(1000 * x) / 10).toFixed(1).replace('.', ',')}%`;
const todas = CENARIOS_55.map((c) => ({ c, l: linha(c.id, 'intermediario') }));
for (const m of MUSCULOS_COM_META) {
  const de = (f: (x: { diretos: number; boas: number }) => boolean) => todas.filter((t) => f(t.l.find((x) => x.m === m)!));
  const [zero, um, semBoa] = [de((x) => x.diretos === 0), de((x) => x.diretos === 1), de((x) => x.boas === 0)];
  const peso = (ts: typeof todas) => pv(ts.reduce((t, x) => t + pesoDoCenario(x.c.id), 0));
  L.push(`| ${NOME_MUSCULO_CURTO[m]} | ${zero.length} | ${peso(zero)} | ${um.length} | ${peso(um)} | ${semBoa.length} | ${peso(semBoa)} |`);
}
L.push('', '## O iniciante perde opções pela complexidade?', '', '| cenário | músculos sem exercício: iniciante | intermediário |', '| --- | --- | --- |');
for (const id of PRINCIPAIS) {
  const z = (n: (typeof NIVEIS)[number]) => linha(id, n).filter((x) => !x.diretos).map((x) => NOME_MUSCULO_CURTO[x.m]).join(', ') || '—';
  L.push(`| ${id} | ${z('iniciante')} | ${z('intermediario')} |`);
}
L.push('');
if (saida) writeFileSync(saida, L.join('\n'));
console.log(L.join('\n'));
