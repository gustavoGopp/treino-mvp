// Regras de leitura da revisão de anatomia: que músculo cada palavra do texto e cada forma do desenho representa.
// Usadas pela tabela (scripts/auditoria/anatomia.ts) e pelo teste (tests/unit/anatomia.test.ts).
import { MUSCULOS, type Musculo } from '../../src/domain/biblioteca';
import { EXERCICIOS } from '../../src/engine/novo/app';
import { MUSCULOS as GRUPOS_DO_DESENHO } from '../../src/engine/novo/tabela-musculos';

/** O que o gerador não conta como músculo (aparece só no texto ou no desenho). */
export type NaoContado = 'trapézio superior' | 'antebraço' | 'eretores (lombar)' | 'oblíquos' | 'tibial anterior';
export type Marca = Musculo | NaoContado;
export const NAO_CONTADOS: NaoContado[] = ['trapézio superior', 'antebraço', 'eretores (lombar)', 'oblíquos', 'tibial anterior'];
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
// Desde o pacote D4 (23/11/2026) o desenho lido é o do motor novo (src/engine/novo), o único que o app mostra: cada
// animação diz quem trabalha (`papeis`: 'p' principal, 's' secundário, 'a' só ajuda a firmar, que sai listrado), e a
// tabela dos músculos do motor (dados/musculos.json, campo `conteudo`) diz a que grupo da biblioteca cada forma
// corresponde. As formas que a tabela não liga a nenhum grupo da biblioteca são as que o gerador não conta.
const SEM_GRUPO: Record<string, NaoContado> = { antebraco: 'antebraço', tibial: 'tibial anterior' };
/** Os grupos (ou o músculo não contado) que cada forma do desenho representa. */
export const FORMA: Record<string, Marca[]> = Object.fromEntries(
  Object.entries(GRUPOS_DO_DESENHO.grupos).map(([id, g]) => [id, g.conteudo.length ? (g.conteudo as Musculo[]) : [SEM_GRUPO[id]!]]),
);
/** Nome da forma, para mostrar de que parte das costas, do ombro ou do abdômen o desenho fala. */
export const NOME_FORMA: Record<string, string> = Object.fromEntries(Object.entries(GRUPOS_DO_DESENHO.grupos).map(([id, g]) => [id, g.nome.toLowerCase()]));

export function doDesenho(animacaoId: string) {
  const ex = EXERCICIOS[animacaoId];
  if (!ex) throw new Error(`a animação "${animacaoId}" não está no motor novo`);
  const p = new Set<Marca>(),
    s = new Set<Marca>(),
    a = new Set<Marca>(),
    formasP = new Set<string>(),
    formasS = new Set<string>(),
    formasA = new Set<string>();
  for (const [chave, papel] of Object.entries(ex.papeis)) {
    const forma = chave.split(':')[0]!; // `dorsal:R` = só o lado direito
    const marcas = FORMA[forma];
    if (!marcas) throw new Error(`${animacaoId}: a forma "${forma}" não está na tabela dos músculos`);
    for (const m of marcas) (papel === 'p' ? p : papel === 's' ? s : a).add(m);
    (papel === 'p' ? formasP : papel === 's' ? formasS : formasA).add(forma);
  }
  // o principal vence o secundário, e os dois vencem o "só ajuda"
  for (const m of p) s.delete(m);
  for (const m of [...p, ...s]) a.delete(m);
  return { p, s, a, formasP, formasS, formasA };
}
