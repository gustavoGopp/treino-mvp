import { inventarioSchema } from '../../../src/domain/taxonomia/equipamentos';
import type { Estado } from '../../../src/storage/esquema';
import { PERSONAS } from '../../personas';
import { estadoDe } from '../../unit/apoio-treino';

// O estado salvo de cada persona fictícia, com o cadastro feito e o programa do gerador, sem histórico (R5a). O
// inventário passa pelo esquema do app antes de gerar, como no cadastro: sem isso, o app vê "uma versão nova".
// Uso (o e2e chama): npx vite-node tests/e2e/apoio/estados-personas.ts → JSON { ana: Estado, ... } na saída.
const estados: Record<string, Estado> = {};
for (const [nome, p] of Object.entries(PERSONAS)) {
  const inventario = inventarioSchema.parse(p.inventario);
  estados[nome] = { ...estadoDe({ ...p, inventario }), avisoAceitoEm: '2026-10-01T10:00:00.000Z' };
}
process.stdout.write(JSON.stringify(estados));
