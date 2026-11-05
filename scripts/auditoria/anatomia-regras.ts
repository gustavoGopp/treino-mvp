// Regras de leitura da revisão de anatomia: que músculo cada palavra do texto e cada forma do desenho representa.
// Usadas pela tabela (scripts/auditoria/anatomia.ts) e pelo teste (tests/unit/anatomia.test.ts).
import { MUSCULOS, type Musculo } from '../../src/domain/biblioteca';
import { EX } from '../../src/engine';
import { listaDe } from '../../src/engine/estilo/musculos';

/** O que o gerador não conta como músculo (aparece só no texto ou no desenho). */
export type NaoContado = 'trapézio superior' | 'antebraço' | 'eretores (lombar)' | 'oblíquos';
export type Marca = Musculo | NaoContado;
export const NAO_CONTADOS: NaoContado[] = ['trapézio superior', 'antebraço', 'eretores (lombar)', 'oblíquos'];
export const ehMusculo = (m: Marca): m is Musculo => (MUSCULOS as readonly string[]).includes(m);

// ---------- 2. texto → músculo ----------
// Palavras do texto em pt-BR. A ordem não importa: um texto pode citar vários músculos.
export const DICIONARIO: [RegExp, Marca][] = [
  [/peit(o|oral)/i, 'peito'],
  [/costas|dorsal|lat[ií]ssimo|romboides|trap[eé]zio m[eé]dio|entre as esc[aá]pulas/i, 'costas'],
  [/deltoide anterior|frente( e lateral)? do ombro|ombro \(frente\)/i, 'ombro_anterior'],
  [/deltoide (anterior e )?lateral|lateral do ombro|ombro \(lateral\)/i, 'ombro_lateral'],
  [/deltoide posterior|tr[aá]s do ombro|ombro \(posterior\)/i, 'ombro_posterior'],
  [/b[ií]ceps|frente do bra[cç]o/i, 'biceps'],
  [/tr[ií]ceps|tr[aá]s do bra[cç]o/i, 'triceps'],
  [/quadr[ií]ceps|frente das? coxas?/i, 'quadriceps'],
  [/posteriores? da coxa|tr[aá]s da coxa/i, 'posteriores'],
  [/gl[uú]te/i, 'gluteos'],
  [/panturrilha|batata da perna|gastrocn[eê]mio|s[oó]leo/i, 'panturrilha'],
  [/abd[oô]m|abdominal|barriga/i, 'abdomen'],
  [/adutor|dentro da coxa/i, 'adutores'],
  [/trap[eé]zio(?! m[eé]dio)|pesco[cç]o/i, 'trapézio superior'],
  [/antebra[cç]o/i, 'antebraço'],
  [/lombar|eretor/i, 'eretores (lombar)'],
  [/obl[ií]quo/i, 'oblíquos'],
];
export const doTexto = (t: string | undefined): Set<Marca> => new Set(t ? DICIONARIO.filter(([r]) => r.test(t)).map(([, m]) => m) : []);

// ---------- 3. desenho → músculo ----------
export const FORMA: Record<string, Marca> = {
  dorsal: 'costas',
  redondoMaior: 'costas',
  romboides: 'costas',
  trapMedio: 'costas',
  trapInferior: 'costas',
  peitoralClav: 'peito',
  peitoralEst: 'peito',
  deltAnt: 'ombro_anterior',
  deltLat: 'ombro_lateral',
  deltPost: 'ombro_posterior',
  biceps: 'biceps',
  triceps: 'triceps',
  quadriceps: 'quadriceps',
  posteriores: 'posteriores',
  gluteos: 'gluteos',
  panturrilha: 'panturrilha',
  retoAbdominal: 'abdomen',
  adutores: 'adutores',
  trapSuperior: 'trapézio superior',
  antebraco: 'antebraço',
  eretores: 'eretores (lombar)',
  obliquos: 'oblíquos',
};
/** Nome curto da forma, para mostrar de que parte das costas o desenho fala. */
export const NOME_FORMA: Record<string, string> = {
  dorsal: 'dorsal',
  redondoMaior: 'redondo maior',
  romboides: 'romboides',
  trapMedio: 'trapézio médio',
  trapInferior: 'trapézio inferior',
  peitoralClav: 'peitoral (clavicular)',
  peitoralEst: 'peitoral (esternal)',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;
export function doDesenho(animacaoId: string) {
  const ex: Animacao = EX.find((e: Animacao) => e.id === animacaoId);
  const p = new Set<Marca>(),
    s = new Set<Marca>(),
    formasP = new Set<string>(),
    formasS = new Set<string>();
  for (const [forma, , tipo] of listaDe(ex) as [string, string, 'p' | 's'][]) {
    (tipo === 'p' ? p : s).add(FORMA[forma]!);
    (tipo === 'p' ? formasP : formasS).add(forma);
  }
  for (const m of p) s.delete(m); // o principal vence o secundário (o mesmo critério de listaDe)
  return { p, s, formasP, formasS };
}

/**
 * Achado 8 da revisão de anatomia (decisão do Gustavo, 02/11/2026): músculos que só ajudam ficam no desenho, em laranja,
 * sem contar no volume. Aqui, os que o gerador conta em outros exercícios e a biblioteca não lista para este.
 */
export const AJUDANTES: Record<string, Musculo[]> = {
  'elevacao-halteres': ['ombro_anterior'],
  'elevacao-lateral': ['ombro_anterior'],
  flexao: ['abdomen'],
  'triceps-frances': ['abdomen'],
  'flexao-bola': ['panturrilha'],
  // Catálogo completo (04/11/2026): na ponte com os pés na bola, os posteriores seguram o calcanhar na bola sem contar série (ficha).
  'ponte-pes-bola': ['posteriores'],
};

