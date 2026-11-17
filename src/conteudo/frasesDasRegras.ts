import { z } from 'zod';
import { umaVezSeDerCerto } from '../domain/umaVez';

// A frase de cada regra em linguagem simples (sessão de textos, 17/11/2026; pedido do Gustavo). O texto técnico de cada
// regra (src/domain/regras/regras.json) foi escrito para quem desenvolve: tem siglas de etapas, nomes de arquivos e a
// história das decisões, e o que a regra faz costuma estar em `valores`, que a tela não mostra. Aqui cada regra tem um
// título curto e uma frase para quem treina, tirados só do texto e dos valores dela: a regra não muda, e nenhum número
// muda (tests/repo/frases-das-regras.test.ts confere). O nível de evidência e as fontes continuam vindo da regra.
// O arquivo só é baixado quando a pessoa abre um selo ou o catálogo (import dinâmico).
export const fraseDaRegraSchema = z
  .object({
    titulo: z.string().min(3).max(70),
    frase: z.string().min(10),
  })
  .strict();
export const frasesDasRegrasSchema = z.record(z.string().regex(/^[a-z0-9.-]+$/), fraseDaRegraSchema);
export type FraseDaRegra = z.infer<typeof fraseDaRegraSchema>;

/** As frases, baixadas uma vez; se a importação falhar, a próxima chamada tenta de novo. */
export const carregarFrasesDasRegras: () => Promise<Record<string, FraseDaRegra>> = umaVezSeDerCerto(() =>
  import('./frases-das-regras.json').then((m) => frasesDasRegrasSchema.parse(m.default)),
);
