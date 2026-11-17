import { BIBLIOTECA } from '../../src/domain/biblioteca';
import { inventarioSchema } from '../../src/domain/taxonomia/equipamentos';
import type { Estado } from '../../src/storage/esquema';
import { LOCAIS_DO_BRUNO, PERSONAS } from '../../tests/personas';
import { estadoDe, programaDe } from '../../tests/unit/apoio-treino';

// O estado salvo de cada persona fictícia (tests/personas), com o cadastro feito e o programa do gerador, sem
// histórico: o mesmo de tests/e2e/apoio/estados-personas.ts, e mais o Bruno com os 2 locais fictícios dele, voltando de
// 12 semanas parado (o que a persona diz, e que o estado de teste comum não leva). O inventário passa pelo esquema do
// app antes de gerar, como no cadastro: sem isso, o app vê "uma versão nova". Junto vai o tipo de carga de cada
// exercício, para o roteiro montar um histórico fictício com a carga certa (o Playwright não lê o JSON da biblioteca).
// Uso (o roteiro chama): npx vite-node scripts/textos/estados.ts → JSON { estados, cargas } na saída.
const ACEITE = '2026-10-01T10:00:00.000Z';
const estados: Record<string, Estado> = {};
for (const [nome, p] of Object.entries(PERSONAS)) {
  const inventario = inventarioSchema.parse(p.inventario);
  estados[nome] = { ...estadoDe({ ...p, inventario }), avisoAceitoEm: ACEITE };
}

const bruno = PERSONAS.bruno;
const locais = LOCAIS_DO_BRUNO.map((l) => ({ ...l, inventario: inventarioSchema.parse(l.inventario) }));
const base = estadoDe({ ...bruno, inventario: locais[0]!.inventario }, locais);
estados['bruno-2-locais'] = {
  ...base,
  avisoAceitoEm: ACEITE,
  nivel: { ...base.nivel!, respostas: { ...base.nivel!.respostas, semanasParado: bruno.perfil.semanasParado } },
  programa: { ...base.programa!, programa: programaDe(bruno.perfil, locais[0]!.inventario) },
};

const cargas = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e.carga]));
process.stdout.write(JSON.stringify({ estados, cargas }));
