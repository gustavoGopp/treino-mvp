/**
 * Desempate de texto que não depende do idioma do aparelho: compara pelo código dos caracteres. `localeCompare` sem
 * idioma usa o do navegador, e a mesma entrada podia sair em outra ordem noutro aparelho (o gerador é determinístico).
 * Para os ids de hoje (minúsculas sem acento), a ordem é a mesma de antes.
 */
export const ordemFixa = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);
