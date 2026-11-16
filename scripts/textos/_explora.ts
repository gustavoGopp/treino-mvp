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
