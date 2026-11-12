/**
 * Número em pt-BR para os textos do app: vírgula decimal, até 2 casas, sem depender do idioma nem da versão do
 * navegador (`toLocaleString` depende dos dois, e o domínio é determinístico). Os números do app (cargas, séries,
 * minutos) ficam abaixo de mil, então não há separador de milhar.
 */
export const numeroBr = (n: number): string => String(Math.round(n * 100) / 100).replace('.', ',');
