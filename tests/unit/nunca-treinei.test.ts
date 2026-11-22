import { describe, expect, it } from 'vitest';
import { gerarPrograma, prescricaoDaSemana } from '../../src/domain/gerador';
import { classificarNivel, PAUSAS, RESPOSTAS_DE_QUEM_NUNCA_TREINOU } from '../../src/domain/nivel';
import { inventarioDoKit } from '../../src/features/onboarding/inventarioForm';
import { inventarioDe, perfilDe, type Pedido } from '../../scripts/auditoria/ver-lib';

// "Nunca treinei" (lote M1 da análise crítica, 19/11/2026). Antes, quem nunca treinou marcava "parei há mais de 6 meses"
// e caía na volta de pausa: metade das séries, 2 viravam 1 no arredondamento, e o programa falava da "carga que você
// usava antes da pausa". O aceite do lote: quem escolhe "Nunca treinei" nunca recebe exercício com 1 série. Só perfis
// fictícios.

const nunca = RESPOSTAS_DE_QUEM_NUNCA_TREINOU;
const nivel = classificarNivel(nunca).nivel;
/** Os quatro lugares do cadastro, com o kit que cada atalho dá, e as personas de casa e de prédio. */
const LUGARES = {
  academia: inventarioDoKit('academia')!,
  condominio: inventarioDoKit('condominio')!,
  casa: inventarioDoKit('casa')!,
  corpo: inventarioDoKit('corpo')!,
  'halteres-banco': inventarioDe('halteres-banco'),
};
const GRADE = Object.entries(LUGARES).flatMap(([lugar, inventario]) =>
  ['2', '3', '4', '5', '6'].flatMap((dias) =>
    [30, 45, 60, 90].flatMap((min) =>
      ([[], ['pernas', 'gluteos']] as Pedido['focos'][]).map((focos) => ({ lugar, inventario, pd: { cenario: lugar, nivel, dias, min, focos, dores: [], semanasParado: nunca.semanasParado } satisfies Pedido })),
    ),
  ),
);

describe('quem nunca treinou entra na fase de aprendizado, não na volta de pausa', () => {
  it('em nenhuma semana, em nenhum lugar, recebe exercício com 1 série', () => {
    const fora: string[] = [];
    for (const { lugar, inventario, pd } of GRADE) {
      const r = gerarPrograma(perfilDe(pd), inventario);
      if (r.status !== 'ok') throw new Error(`sem programa: ${lugar}`);
      for (const semana of [1, 2, 3])
        for (const d of prescricaoDaSemana(r.programa, semana))
          for (const x of d.exercicios) if (x.series < 2) fora.push(`${lugar}, ${pd.dias} dias de ${pd.min} min, semana ${semana}: ${x.nome} com ${x.series} série`);
    }
    expect(fora).toEqual([]);
  });

  it('as fases são as do aprendizado, e nenhum texto do programa fala de pausa', () => {
    for (const { inventario, pd } of GRADE.filter((g) => g.pd.dias === '3' && g.pd.min === 45)) {
      const r = gerarPrograma(perfilDe(pd), inventario);
      if (r.status !== 'ok') throw new Error('sem programa');
      expect(r.programa.fases.map((f) => f.regraId)).toEqual(['iniciante.fase-aprendizado', 'iniciante.fase-aprendizado']);
      expect(JSON.stringify([r.programa.fases, r.programa.avisos, r.programa.porque])).not.toMatch(/antes da pausa|readapta/i);
    }
  });

  it('o caminho antigo ("parei há mais de 6 meses") dava 1 série: é o que a resposta nova evita', () => {
    const semanas = PAUSAS.find((p) => p.id === 'mais-6-meses')!.semanas;
    const r = gerarPrograma(perfilDe({ cenario: 'condominio', nivel: 'iniciante', dias: '3', min: 45, focos: [], dores: [], semanasParado: semanas }), LUGARES.condominio);
    if (r.status !== 'ok') throw new Error('sem programa');
    expect(prescricaoDaSemana(r.programa, 1).flatMap((d) => d.exercicios).some((x) => x.series === 1)).toBe(true);
  });
});
