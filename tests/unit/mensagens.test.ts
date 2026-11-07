import { describe, expect, it } from 'vitest';
import { ARTICULACOES } from '../../src/domain/biblioteca';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import { respostasNenhuma } from '../../src/domain/triagem';
import { gradeReduzida } from '../../scripts/auditoria/grade-reduzida';
import { PERSONAS } from '../personas';

// acompanhamento.mensagens: todo aviso do programa diz o fato e o próximo passo, inclusive "não precisa fazer nada"
// quando a causa é o equipamento (R5b; c-fluxo.md, pedido ao domínio 4: antes, 2 de 20 avisos das personas).
const PROXIMO_PASSO = [
  /Não precisa fazer nada/,
  /atualize a nota na triagem/,
  /Procure avaliação profissional/,
  /dá para (mudar|trocar) em Meus dados, "Mudar a rotina ou a divisão"/,
  /escolher mais minutos em Meus dados/,
  /escolha (um grupo só|1 ou 2 grupos), ou aumente os minutos ou os dias/,
  /dá para escolher uma duração menor sem perder nada/,
];
const temProximoPasso = (texto: string) => PROXIMO_PASSO.some((re) => re.test(texto));
const ok = (p: Perfil, inv: Parameters<typeof gerarPrograma>[1]): Programa | null => {
  const g = gerarPrograma(p, inv);
  return g.status === 'ok' ? g.programa : null;
};

describe('avisos do programa: fato + próximo passo (acompanhamento.mensagens)', { timeout: 120_000 }, () => {
  it('as 6 personas: 20 de 20 avisos com o próximo passo', () => {
    const avisos = Object.values(PERSONAS).flatMap((p) => ok(p.perfil, p.inventario)!.avisos);
    expect(avisos).toHaveLength(20);
    expect(avisos.filter((a) => !temProximoPasso(a.texto)).map((a) => a.texto)).toEqual([]);
  });
  it('a grade reduzida e as personas com dor: todo aviso tem o próximo passo', () => {
    const programas: Programa[] = [];
    for (const c of gradeReduzida()) programas.push(ok(c.perfil, c.inventario)!);
    for (const pe of Object.values(PERSONAS))
      for (const articulacao of ARTICULACOES)
        for (const nota of [4, 7]) {
          const p = ok({ ...pe.perfil, triagem: { respostas: { ...respostasNenhuma(), osteoarticular: true }, dores: [{ articulacao, nota }] } }, pe.inventario);
          if (p) programas.push(p);
        }
    const sem = new Map<string, string>();
    for (const p of programas) for (const a of p.avisos) if (!temProximoPasso(a.texto)) sem.set(a.regraId, a.texto);
    expect([...sem]).toEqual([]);
  });
});
