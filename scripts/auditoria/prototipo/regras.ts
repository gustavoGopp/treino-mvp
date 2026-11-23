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
 * Desde o pacote 0 (14/11/2026) há uma ressalva: o protótipo lê a biblioteca do app, e nela os exercícios com o joelho
 * apoiado já carregam o joelho; para os perfis com dor no joelho, o "antes" de verdade é um worktree da `main`.
 */
/** As regras do protótipo que já entraram no app (etapa 2): `PROT=app` liga só essas, e o protótipo fica igual ao app. */
export const ADOTADAS = ['usa-tempo', 'joelho', 'dor-musculo', 'sem-repetir', 'dor', 'dor-sem-custo', 'dor-ct6', 'curto', 'tec-juntos', 'esc-referencia', 'esc-dois-lados', 'fadiga', 'd1-foco', 'corte-lado', 'ultimo-recurso', 'tec-lombar', 'iniciante-simples', 'ini-sem-custo', 'ombro-barra', 'ini-6-3x60', 'ini-6-foco', 'ini-6-texto', 'd3-outros', 'd3-degrau', 'dc-inclinado', 'dc-polia', 'dc-aducao', 'dc-panturrilha', 'dc-sem-puxar', 'dc-aprendizado'];
const PEDIDAS = (process.env.PROT ?? 'todas').split(',').map((x) => x.trim());
/** `PROT=app,-usa-tempo`: as adotadas menos uma (o "antes" do teste de cada regra, com as outras já no lugar). */
const TIRADAS = new Set(PEDIDAS.filter((x) => x.startsWith('-')).map((x) => x.slice(1)));
const LIGADAS = new Set(PEDIDAS.filter((x) => !x.startsWith('-')).flatMap((x) => (x === 'app' ? ADOTADAS : [x])).filter((x) => !TIRADAS.has(x)));
export const prot = (nome: string) => LIGADAS.has('todas') || LIGADAS.has(nome);
