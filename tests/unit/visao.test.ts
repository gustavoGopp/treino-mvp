import { describe, expect, it } from 'vitest';
import { ITEM_IDS } from '../../src/domain/taxonomia/equipamentos';
import { aplicarConfirmados, ESQUEMA_RESPOSTA, instrucoes, marcacaoInicial, validarSugestoes } from '../../src/domain/visao';

describe('visão: validação da resposta do modelo', () => {
  it('o esquema só aceita ids da taxonomia', () => {
    expect(ESQUEMA_RESPOSTA.properties.itens.items.properties.itemId.enum).toEqual(ITEM_IDS);
    for (const id of ITEM_IDS) expect(instrucoes()).toContain(id);
  });

  it('descarta ids fora da taxonomia, formato errado e resposta que não é objeto', () => {
    expect(validarSugestoes(null)).toEqual([]);
    expect(validarSugestoes({ itens: 'x' })).toEqual([]);
    expect(
      validarSugestoes({
        itens: [
          { itemId: 'barra_w', confianca: 'alta', evidencia: 'foto 1' },
          { itemId: 'nave_espacial', confianca: 'alta', evidencia: '' },
          { itemId: 'step', confianca: 'certeza' },
          'lixo',
        ],
      }),
    ).toEqual([{ itemId: 'barra_w', confianca: 'alta', evidencia: 'foto 1' }]);
  });

  it('junta repetidos ficando com a maior confiança, na ordem da taxonomia', () => {
    const r = validarSugestoes({
      itens: [
        { itemId: 'step', confianca: 'baixa', evidencia: 'a' },
        { itemId: 'barra_fixa', confianca: 'media', evidencia: 'b' },
        { itemId: 'step', confianca: 'alta', evidencia: 'c' },
      ],
    });
    expect(r.map((s) => [s.itemId, s.confianca])).toEqual([
      ['barra_fixa', 'media'],
      ['step', 'alta'],
    ]);
  });

  it('mantém só atributos válidos para o item', () => {
    const r = validarSugestoes({
      itens: [
        { itemId: 'halteres_fixos', confianca: 'alta', evidencia: '', atributos: { minKg: 2, maxKg: 20, passoKg: 2 } },
        { itemId: 'polia_simples', confianca: 'media', evidencia: '', atributos: { minKg: 2 } },
      ],
    });
    expect(r.find((s) => s.itemId === 'halteres_fixos')!.atributos).toEqual({ minKg: 2, maxKg: 20, passoKg: 2 });
    expect(r.find((s) => s.itemId === 'polia_simples')!.atributos).toBeUndefined();
  });
});

describe('visão: confirmação', () => {
  it('alta já vem marcada, média pergunta, baixa vem desmarcada', () => {
    expect(['alta', 'media', 'baixa'].map((c) => marcacaoInicial(c as 'alta'))).toEqual(['marcado', 'perguntar', 'desmarcado']);
  });

  it('só entra no inventário o que a pessoa confirmou, sem sobrescrever o que ela já tinha', () => {
    const sug = validarSugestoes({
      itens: [
        { itemId: 'halteres_fixos', confianca: 'alta', evidencia: '', atributos: { minKg: 2, maxKg: 20, passoKg: 2 } },
        { itemId: 'banco_reto', confianca: 'media', evidencia: '' },
        { itemId: 'step', confianca: 'baixa', evidencia: '' },
      ],
    });
    const inv = aplicarConfirmados({ banco_reto: {}, halteres_fixos: { minKg: 1, maxKg: 10, passoKg: 1 } }, sug, ['halteres_fixos', 'banco_reto']);
    expect(inv).toEqual({ banco_reto: {}, halteres_fixos: { minKg: 1, maxKg: 10, passoKg: 1 } });
    expect(aplicarConfirmados({}, sug, ['halteres_fixos'])).toEqual({ halteres_fixos: { minKg: 2, maxKg: 20, passoKg: 2 } });
  });
});
