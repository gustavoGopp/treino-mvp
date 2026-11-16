import { gerarPrograma } from '../../src/domain/gerador';
import { opcoesDeAjuste } from '../../src/domain/gerador/opcoes';
import { inventarioSchema } from '../../src/domain/taxonomia/equipamentos';
import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { temCartao } from '../../src/conteudo/cartoes';
import { PERSONAS } from '../../tests/personas';

for (const [nome, p] of Object.entries(PERSONAS)) {
  const inv = inventarioSchema.parse(p.inventario);
  for (const sp of [0, p.perfil.semanasParado]) {
    const r = gerarPrograma({ ...p.perfil, semanasParado: sp }, inv);
    if (r.status !== 'ok') {
      console.log(nome, r.status);
      continue;
    }
    const pr = r.programa;
    console.log(`\n== ${nome} parado=${sp}: ${pr.divisao} | avisos ${pr.avisos.length} | fases ${pr.fases.length} | porque ${pr.porque.length} | ajustes ${opcoesDeAjuste({ ...p.perfil, semanasParado: sp }, inv).length}`);
    for (const d of pr.dias) console.log('  ', d.id, d.nome, d.exercicios.map((x) => `${x.exId}${x.animacaoId ? '' : temCartao(x.exId) ? '[TXT]' : '[SEM]'}${x.supersetCom ? '[BI]' : ''}${x.dropSet ? '[DROP]' : ''}`).join(', '));
    if (sp === p.perfil.semanasParado) break;
  }
}
const sem = BIBLIOTECA.filter((e) => !e.animacaoId);
console.log('\nsem animação:', sem.length, 'sem cartão:', sem.filter((e) => !temCartao(e.id)).map((e) => e.id));
console.log('cargas:', [...new Set(BIBLIOTECA.map((e) => e.carga))]);

const POR = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
for (const [nome, p] of Object.entries(PERSONAS)) {
  const inv = inventarioSchema.parse(p.inventario);
  const r = gerarPrograma({ ...p.perfil, semanasParado: 0 }, inv);
  if (r.status !== 'ok') continue;
  for (const d of r.programa.dias)
    for (const [i, x] of d.exercicios.entries()) {
      const tipos = x.alternativas.map((a) => POR[a]?.carga).filter((c) => c === 'assistida' || c === 'anilha');
      if (!x.alternativas.length || tipos.length || ['anilha', 'assistida', 'barra', 'maquina', 'polia', 'kettlebell', 'caneleira'].includes(POR[x.exId]!.carga))
        console.log(nome, d.nome, i + 1, x.nome, `[${POR[x.exId]!.carga}]`, 'alts:', x.alternativas.length, x.alternativas.filter((a) => ['assistida', 'anilha'].includes(POR[a]!.carga)).map((a) => `${POR[a]!.nome}[${POR[a]!.carga}]`).join('; '));
    }
}
