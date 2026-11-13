// Protótipo (sessão "treino para todos", etapa 1): as regras do app, com as mudanças em teste por cima.
// Nada aqui vale no app: src/domain/regras continua sendo a fonte. As constantes mudadas ficam em PROTOTIPO (abaixo).
import { SELOS as SELOS_DO_APP } from '../../../src/domain/regras';
export * from '../../../src/domain/regras';

/** Regras novas do protótipo (ainda fora de docs/pesquisa/regras.md), com o selo proposto. */
export const REGRAS_NOVAS: Record<string, string> = {};
export const SELOS: Record<string, string> = { ...SELOS_DO_APP, ...REGRAS_NOVAS };
export function r(id: string): string {
  if (!SELOS[id]) throw new Error(`regra inexistente: ${id}`);
  return id;
}

/**
 * As mudanças em teste, uma por nome. `PROT=usa-tempo,escolha` liga só essas; sem a variável, todas ligadas; `PROT=nada`
 * deixa o protótipo igual à `main` de antes da etapa 2 (o "antes" de todas as medidas); `PROT=app`, igual ao app de hoje.
 */
/** As regras do protótipo que já entraram no app (etapa 2): `PROT=app` liga só essas, e o protótipo fica igual ao app. */
export const ADOTADAS = ['usa-tempo'];
const LIGADAS = new Set((process.env.PROT ?? 'todas').split(',').flatMap((x) => (x.trim() === 'app' ? ADOTADAS : [x.trim()])));
export const prot = (nome: string) => LIGADAS.has('todas') || LIGADAS.has(nome);
