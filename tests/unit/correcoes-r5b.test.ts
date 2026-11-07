import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, seriesDeVolume, volumePorMusculo, type Programa } from '../../src/domain/gerador';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { VOLUME } from '../../src/domain/regras';
import { gradeReduzida } from '../../scripts/auditoria/grade-reduzida';
import { CENARIO, perfil } from '../../scripts/auditoria/cenarios';
import { respostasNenhuma } from '../../src/domain/triagem';

// As 3 correções do gerador que o avaliador achou (R5b; b-monte-e-avaliador.md, pedidos ao domínio 2 a 4).
// Medidas antes e depois em docs/revisoes/r5b/medidas.md.
const casos = [...gradeReduzida()].map((c) => {
  const g = gerarPrograma(c.perfil, c.inventario);
  if (g.status !== 'ok') throw new Error(`bloqueado: ${c.nome}`);
  return { ...c, p: g.programa };
});
const ids = (f: string) => new Set(FUNCAO[f]!.niveis.flat());

describe('correções do R5b no gerador (grade reduzida, 5.850 programas)', { timeout: 60_000 }, () => {
  it('volume.sessao.teto conta as indiretas: nenhum dia com mais de 10 séries fracionadas de um músculo', () => {
    for (const c of casos)
      for (const d of c.p.dias) {
        const v = volumePorMusculo(d.exercicios.map((x) => ({ ex: POR_ID[x.exId]!, series: seriesDeVolume(x) })));
        for (const [m, n] of Object.entries(v)) expect(n, `${c.nome} · ${d.nome} · ${m}`).toBeLessThanOrEqual(VOLUME.sessaoTeto);
      }
  });
  it('selecao.gluteo: com a ponte possível, o glúteo tem extensão de quadril ou stiff na semana', () => {
    const ext = new Set([...ids('extensao-quadril'), ...ids('dobrar-quadril')]);
    for (const c of casos) {
      const ctx = contextoDeSelecao(c.perfil, c.inventario);
      if (!ctx.possiveis.some((e) => ids('extensao-quadril').has(e.id))) continue;
      expect(c.p.dias.some((d) => d.exercicios.some((x) => ext.has(x.exId))), c.nome).toBe(true);
    }
  });
  it('selecao.agachar-e-afundo: num dia com a vaga de afundo, a de agachar não fica com um afundo havendo agachamento no mesmo nível', () => {
    for (const c of casos) {
      const ctx = contextoDeSelecao(c.perfil, c.inventario);
      for (const d of c.p.dias) {
        const ag = d.exercicios.find((x) => x.funcao === 'agachar');
        if (!ag || POR_ID[ag.exId]!.padrao !== 'afundo' || !d.exercicios.some((x) => x.funcao === 'afundo')) continue;
        const nivel = FUNCAO.agachar!.niveis.findIndex((n) => n.includes(ag.exId));
        const deAgachar = FUNCAO.agachar!.niveis[nivel]!.filter((id) => POR_ID[id]!.padrao === 'agachar' && ctx.naFuncao(FUNCAO.agachar!, id) && ctx.possivel.has(id));
        expect(deAgachar, `${c.nome} · ${d.nome}`).toEqual([]);
      }
    }
  });
  it('o porquê diz quando o agachamento entrou por causa do afundo do dia', () => {
    const inv = CENARIO['condominio']!.inventario;
    const pf = { ...perfil({ nivel: 'iniciante', divisao: 'classica-3', minutos: 60, prioridades: [], dores: [] }), triagem: { respostas: respostasNenhuma() } };
    const g = gerarPrograma(pf, inv);
    const p = (g as { programa: Programa }).programa;
    const pernas = p.dias.find((d) => d.exercicios.some((x) => x.funcao === 'afundo'))!;
    const ag = pernas.exercicios.find((x) => x.funcao === 'agachar')!;
    expect(POR_ID[ag.exId]!.padrao).toBe('agachar');
    expect(ag.porque.some((q) => q.regraId === 'selecao.agachar-e-afundo')).toBe(true);
  });
});
