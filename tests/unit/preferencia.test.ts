import { describe, expect, it } from 'vitest';
import { gerarPrograma, type Perfil, type Programa } from '../../src/domain/gerador';
import type { Inventario } from '../../src/domain/taxonomia/equipamentos';
import { carla, PERSONAS } from '../personas';

// selecao.preferencia (R1b; pesquisa-v2/09): "prefiro este" entre equivalentes da mesma função.
const ok = (perfil: Perfil, inv: Inventario): Programa => {
  const r = gerarPrograma(perfil, inv);
  if (r.status !== 'ok') throw new Error('bloqueado');
  return r.programa;
};
const agachar = (p: Programa) => p.dias.flatMap((d) => d.exercicios).filter((x) => x.funcao === 'agachar');

describe('selecao.preferencia', () => {
  it('Carla: sem preferência, a vaga de agachar fica com o agachamento livre (ordem alfabética entre 4 sem animação)', () => {
    expect(agachar(ok(carla.perfil, carla.inventario)).map((x) => x.exId)).toEqual(['agachamento-barra']);
  });

  it('Carla com "prefiro o leg press": ele entra no lugar do agachamento livre, e o porquê diz', () => {
    const p = ok({ ...carla.perfil, preferidos: { agachar: 'leg-press' } }, carla.inventario);
    const [x] = agachar(p);
    expect(x?.exId).toBe('leg-press');
    expect(x?.porque.some((q) => q.regraId === 'selecao.preferencia')).toBe(true);
    expect(x?.alternativas).toContain('agachamento-barra');
    // Só a vaga de agachar muda.
    const antes = ok(carla.perfil, carla.inventario);
    const fora = (q: Programa) => q.dias.map((d) => d.exercicios.filter((y) => y.funcao !== 'agachar').map((y) => `${y.exId} ${y.series}`));
    expect(fora(p)).toEqual(fora(antes));
  });

  it('sem preferência (vazia ou ausente), o programa de cada persona sai idêntico, inclusive o hash', () => {
    for (const persona of Object.values(PERSONAS)) {
      const base = ok(persona.perfil, persona.inventario);
      expect(ok({ ...persona.perfil }, persona.inventario)).toEqual(base);
    }
  });

  it('a preferência vale por função: preferir o leg press na panturrilha em pé não mexe no agachar', () => {
    const p = ok({ ...carla.perfil, preferidos: { 'panturrilha-em-pe': 'panturrilha-leg-press' } }, carla.inventario);
    expect(agachar(p).map((x) => x.exId)).toEqual(['agachamento-barra']);
  });

  it('nunca passa por cima da segurança: dor no joelho acima de 5 tira o leg press preferido igual', () => {
    const perfil: Perfil = {
      ...carla.perfil,
      preferidos: { agachar: 'leg-press' },
      triagem: { respostas: { ...carla.perfil.triagem.respostas, osteoarticular: true }, dores: [{ articulacao: 'joelho', nota: 7 }] },
    };
    const p = ok(perfil, carla.inventario);
    expect(p.dias.flatMap((d) => d.exercicios).some((x) => x.exId === 'leg-press')).toBe(false);
  });

  it('não sobe de nível: preferir um exercício de nível 2 não tira o de nível 1 possível', () => {
    const p = ok({ ...carla.perfil, preferidos: { agachar: 'goblet' } }, carla.inventario);
    expect(agachar(p).map((x) => x.exId)).toEqual(['agachamento-barra']);
  });
});
