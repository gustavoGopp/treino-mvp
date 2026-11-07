import { r } from '../regras';

// Proteção contra perder os dados (R5c). Funções puras: a data de "agora" vem de fora.
// O lembrete de cópia segue dados.copia; o aviso do iPhone, dados.instalar-iphone.

export const REGRA_COPIA = r('dados.copia');
export const REGRA_INSTALAR = r('dados.instalar-iphone');

/** dados.copia: treinos terminados depois da última cópia para o início lembrar (escolha do projeto). */
export const TREINOS_PARA_LEMBRAR = 3;
/** dados.copia: dias desde a última cópia (e do "Agora não") antes de lembrar de novo (escolha do projeto). */
export const DIAS_PARA_LEMBRAR = 7;

const DIA_MS = 86_400_000;

/** Dias inteiros entre `desde` e `agora` (0 no mesmo dia, nunca negativo). Data ausente ou inválida = null. */
export function diasDesde(desde: string | undefined, agora: string): number | null {
  if (!desde) return null;
  const a = Date.parse(desde);
  const b = Date.parse(agora);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.max(0, Math.floor((b - a) / DIA_MS));
}

/** "hoje", "há 1 dia", "há N dias"; sem data, "nenhuma cópia ainda". */
export function textoUltimaCopia(desde: string | undefined, agora: string): string {
  const d = diasDesde(desde, agora);
  if (d === null) return 'nenhuma cópia ainda';
  return d === 0 ? 'hoje' : d === 1 ? 'há 1 dia' : `há ${d} dias`;
}

export type EntradaLembrete = {
  /** Data da última cópia exportada neste aparelho. */
  ultimaCopia?: string;
  /** Data do último "Agora não" no lembrete. */
  adiadoEm?: string;
  /** Datas de fim dos treinos terminados. */
  fins: (string | undefined)[];
  agora: string;
};

/**
 * dados.copia: lembrar de exportar quando há 3 ou mais treinos terminados depois da última cópia (ou desde o começo) e
 * a cópia tem mais de 7 dias (ou nunca houve). "Agora não" esconde por 7 dias.
 */
export function lembrarCopia({ ultimaCopia, adiadoEm, fins, agora }: EntradaLembrete): boolean {
  const adiado = diasDesde(adiadoEm, agora);
  if (adiado !== null && adiado < DIAS_PARA_LEMBRAR) return false;
  const copia = diasDesde(ultimaCopia, agora);
  if (copia !== null && copia < DIAS_PARA_LEMBRAR) return false;
  const corte = ultimaCopia ? Date.parse(ultimaCopia) : Number.NEGATIVE_INFINITY;
  const depois = fins.filter((f) => f && Date.parse(f) > corte).length;
  return depois >= TREINOS_PARA_LEMBRAR;
}

export type Navegador = {
  userAgent: string;
  /** navigator.maxTouchPoints: o iPad com iPadOS 13 ou mais se apresenta como Mac, mas tem toque. */
  maxTouchPoints: number;
  /** navigator.standalone (só no iOS) ou display-mode: standalone: o app foi aberto pela tela de início. */
  instalado: boolean;
};

/** iPhone, iPod ou iPad (inclusive o iPad que se apresenta como Mac). */
export function ehAppleMovel({ userAgent, maxTouchPoints }: Pick<Navegador, 'userAgent' | 'maxTouchPoints'>): boolean {
  return /iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
}

/** dados.instalar-iphone: avisar só no iPhone ou iPad aberto no navegador, fora da tela de início. */
export function avisarInstalar(n: Navegador): boolean {
  return ehAppleMovel(n) && !n.instalado;
}
