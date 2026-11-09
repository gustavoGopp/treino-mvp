import { describe, expect, it } from 'vitest';
import { REGRAS } from '../../src/domain/regras/completas';
import { carregarFontes, fontesSchema } from '../../src/conteudo/fontes';
import fontesJson from '../../src/conteudo/fontes.json';

// Pedido ao domínio 1 do redesign: o selo de evidência abre as fontes da regra; nenhuma regra pode citar uma fonte
// que não esteja no arquivo.
describe('fontes das regras', () => {
  it('o arquivo passa no esquema', () => {
    expect(() => fontesSchema.parse(fontesJson)).not.toThrow();
  });
  it('toda fonte citada numa regra existe no arquivo', async () => {
    const fontes = await carregarFontes();
    const faltam = Object.values(REGRAS).flatMap((r) => r.fontes.filter((f) => !fontes[f]).map((f) => `${r.id}: ${f}`));
    expect(faltam).toEqual([]);
  });
  it('toda fonte tem link, menos as que não são publicação (o consenso do projeto e o livro da NSCA)', async () => {
    const fontes = await carregarFontes();
    expect(Object.entries(fontes).filter(([, f]) => !f.link).map(([k]) => k)).toEqual(['consenso-projeto', 'nsca2008']);
  });
});
