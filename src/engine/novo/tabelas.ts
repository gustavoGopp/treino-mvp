// Motor novo: as tabelas de medidas (corpo, objetos, amplitudes), validadas com zod na carga.
// Regra do bloco A: nenhum número do corpo ou de objeto fica solto no código do desenho; o código lê daqui.
import { z } from 'zod';
import homem from './dados/corpo-homem.json';
import mulher from './dados/corpo-mulher.json';
import objetosJson from './dados/objetos.json';
import segmentosJson from './dados/segmentos.json';

const TIPO = z.enum(['medida', 'derivada', 'provisoria', 'desenho']);
const medida = z.object({
  v: z.number(),
  un: z.string().min(1),
  tipo: TIPO,
  fonte: z.string().min(1),
  onde: z.string().min(1),
  nota: z.string().optional(),
});
const secao = z.object({ t: z.number().min(0).max(1), a: z.number().positive(), f: z.number().positive(), b: z.number().positive(), tipo: TIPO, origem: z.string().min(1) });
const anelTronco = z.object({ alt: z.number(), a: z.number().positive(), prof: z.number().positive(), tras: z.number().min(0).max(1), tipo: TIPO, origem: z.string().min(1) });
const corpoSchema = z
  .object({
    id: z.string(),
    populacao: z.string(),
    fontes: z.record(z.string()),
    medidas: z.record(medida),
    secoes: z.record(z.array(secao).min(2)),
    tronco: z.array(anelTronco).min(4),
  })
  .superRefine((c, ctx) => {
    for (const [id, m] of Object.entries(c.medidas)) if (!m.fonte.split('+').every((f) => f in c.fontes)) ctx.addIssue({ code: 'custom', message: `medida ${id}: fonte "${m.fonte}" não está na lista de fontes` });
  });

export type Medida = z.infer<typeof medida>;
export type Secao = z.infer<typeof secao>;
export type AnelTronco = z.infer<typeof anelTronco>;
export interface Corpo extends z.infer<typeof corpoSchema> {
  /** Valor de uma medida da tabela (erro se não existir: nenhum número de fora da tabela). */
  m(id: string): number;
}

function carregar(dados: unknown): Corpo {
  const c = corpoSchema.parse(dados);
  return {
    ...c,
    m(id) {
      const x = c.medidas[id];
      if (!x) throw new Error(`medida "${id}" não está na tabela do corpo ${c.id}`);
      return x.v;
    },
  };
}

export const CORPOS = { homem: carregar(homem), mulher: carregar(mulher) };
export type IdCorpo = keyof typeof CORPOS;

/* ---------- objetos ---------- */
const objetosSchema = z
  .object({ fontes: z.record(z.string()), objetos: z.record(z.object({ nome: z.string(), medidas: z.record(medida) })) })
  .superRefine((o, ctx) => {
    for (const [id, ob] of Object.entries(o.objetos)) for (const [k, m] of Object.entries(ob.medidas)) if (!(m.fonte in o.fontes)) ctx.addIssue({ code: 'custom', message: `objeto ${id}.${k}: fonte "${m.fonte}" não está na lista` });
  });
export const OBJETOS = objetosSchema.parse(objetosJson);
/** Medida de um objeto da tabela, em cm (erro se não existir). A cena e o cartão de equipamento leem a mesma linha. */
export function obj(id: string, medidaId: string): number {
  const m = OBJETOS.objetos[id]?.medidas[medidaId];
  if (!m) throw new Error(`medida "${medidaId}" do objeto "${id}" não está na tabela de objetos`);
  return m.v;
}

/* ---------- massa de cada segmento (para o equilíbrio) ---------- */
const seg = z.object({ extremos: z.string(), massa: z.number(), cm: z.number() });
const segmentosSchema = z.object({ fonte: z.string().min(1), nota: z.string(), homem: z.record(seg), mulher: z.record(seg) });
export const SEGMENTOS = segmentosSchema.parse(segmentosJson);
