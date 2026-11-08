import { describe, expect, it } from 'vitest';
import { POR_ID } from '../../src/domain/biblioteca';
import { contextoDeSelecao, gerarPrograma, GRUPOS, seriesDeVolume, volumePorMusculo, type Grupo, type Perfil, type Programa } from '../../src/domain/gerador';
import { OPCOES_POR_DIAS, type DiasSemana } from '../../src/domain/gerador/divisoes';
import { FUNCAO } from '../../src/domain/gerador/funcoes';
import { VOLUME, type Nivel } from '../../src/domain/regras';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { CENARIOS, perfil } from '../../scripts/auditoria/cenarios';

// R5a, os ajustes do gerador (docs/revisoes/proximos-passos/a-qualidade.md, pacote A; b-monte-e-avaliador.md, pedidos
// 2 a 4), numa amostra da grade reduzida: os cenários comuns, 3 níveis, 2 a 6 dias, 30 a 90 min, focos variados, sem dor.
const NIVEIS: Nivel[] = ['iniciante', 'intermediario', 'avancado'];
const FOCOS: Grupo[][] = [[], ['gluteos'], ['pernas', 'gluteos'], ['ombros'], ['peito', 'costas']];
const CENS: { id: string; inventario: Inventario }[] = [
  ...['academia', 'condominio', 'casa+', 'halteres-banco', 'elasticos'].map((id) => CENARIOS.find((c) => c.id === id)!),
  { id: 'vazio', inventario: {} },
];
type Caso = { cen: string; inv: Inventario; pf: Perfil; p: Programa };
const AMOSTRA: Caso[] = [];
for (const c of CENS)
  for (const nivel of NIVEIS)
    for (const d of [2, 3, 4, 5, 6] as DiasSemana[])
      for (const minutos of [30, 60, 90])
        for (const prioridades of FOCOS) {
          const pf = perfil({ nivel, divisao: OPCOES_POR_DIAS[d][0]!, minutos, prioridades, dores: [] });
          delete pf.divisao; // a divisão fica livre, para divisao.sem-puxar valer (o Corpo todo 6x)
          const r = gerarPrograma(pf, c.inventario);
          if (r.status === 'ok') AMOSTRA.push({ cen: c.id, inv: c.inventario, pf, p: r.programa });
        }
const nome = (x: Caso) => `${x.cen} ${x.pf.nivel} ${x.p.divisao} ${x.pf.minutosSessao} min ${x.pf.prioridades.join('+') || 'sem foco'}`;
const AFUNDOS = new Set(FUNCAO['afundo']!.niveis.flat());

describe('R5a: ajustes do gerador', () => {
  it('a amostra cobre os casos de cada ajuste', () => {
    expect(AMOSTRA.length).toBe(CENS.length * NIVEIS.length * 5 * 3 * FOCOS.length);
    expect(AMOSTRA.some((x) => x.p.divisaoId === 'ct-6x')).toBe(true);
    expect(AMOSTRA.some((x) => x.p.divisaoId === 'ct-ab')).toBe(true);
  });

  it('volume.sessao.teto: nenhum músculo passa de 10 séries numa sessão, contando as indiretas (meia série)', () => {
    for (const x of AMOSTRA)
      for (const d of x.p.dias) {
        const v = volumePorMusculo(d.exercicios.map((e) => ({ ex: POR_ID[e.exId]!, series: seriesDeVolume(e) })));
        for (const [m, n] of Object.entries(v)) expect(n, `${nome(x)}: ${d.nome}, ${m}`).toBeLessThanOrEqual(VOLUME.sessaoTeto);
      }
  });

  it('selecao.gluteo: com a ponte possível, a semana tem extensão de quadril (ponte, hip thrust, coice) ou o dobrar o quadril (stiff)', () => {
    const quadril = new Set([...FUNCAO['extensao-quadril']!.niveis.flat(), ...FUNCAO['dobrar-quadril']!.niveis.flat()]);
    let casos = 0;
    for (const x of AMOSTRA) {
      if (!contextoDeSelecao(x.pf, x.inv).naFuncao(FUNCAO['extensao-quadril']!, 'ponte-gluteo')) continue;
      casos++;
      expect(x.p.dias.some((d) => d.exercicios.some((e) => quadril.has(e.exId))), nome(x)).toBe(true);
    }
    expect(casos).toBeGreaterThan(100);
    // O caso do pedido: Corpo todo A/B sem nada e sem foco em glúteo (antes, só agachar e afundo para o glúteo).
    const ab = AMOSTRA.find((x) => x.cen === 'vazio' && x.p.divisaoId === 'ct-ab' && !x.pf.prioridades.includes('gluteos'))!;
    expect(ab.p.dias.flatMap((d) => d.exercicios.map((e) => e.exId))).toContain('ponte-gluteo');
  });

  it('selecao.funcao-da-vaga: um afundo por dia, havendo outra opção (o búlgaro na vaga de agachar não ganha um afundo ao lado)', () => {
    for (const x of AMOSTRA) for (const d of x.p.dias) expect(d.exercicios.filter((e) => AFUNDOS.has(e.exId)).length, `${nome(x)}: ${d.nome}`).toBeLessThanOrEqual(1);
    // O caso medido: condomínio, intermediário, Superior/Inferior: a extensora vazia recebia o afundo para trás.
    const pf = perfil({ nivel: 'intermediario', divisao: 'si-2x', minutos: 60, prioridades: [], dores: [] });
    const r = gerarPrograma(pf, CENARIOS.find((c) => c.id === 'condominio')!.inventario);
    const inf = r.status === 'ok' ? r.programa.dias.find((d) => d.id === 'inferior-a')! : null;
    expect(inf!.exercicios.map((e) => e.exId)).toEqual(expect.arrayContaining(['bulgaro', 'goblet']));
    expect(inf!.exercicios.map((e) => e.exId)).not.toContain('afundo-tras');
  });

  it('divisao.sem-puxar: no Corpo todo 6x sem nada, com 60 min ou mais, o pike entra (complemento dos dias A, C e E) e o ombro lateral não fica a zero', () => {
    const seis = AMOSTRA.filter((x) => x.cen === 'vazio' && x.p.divisaoId === 'ct-6x' && x.pf.minutosSessao >= 60);
    expect(seis.length).toBeGreaterThan(0);
    for (const x of seis) {
      const comPike = ['corpo-a', 'corpo-c', 'corpo-e'].filter((id) => x.p.dias.find((d) => d.id === id)!.exercicios.some((e) => e.exId === 'pike'));
      expect(comPike.length, nome(x)).toBeGreaterThanOrEqual(1);
      expect(x.p.volumeSemanal.ombro_lateral ?? 0, nome(x)).toBeGreaterThan(0);
    }
  });

  it('os grupos de foco da amostra existem', () => {
    for (const f of FOCOS.flat()) expect(GRUPOS[f]).toBeDefined();
  });
});
