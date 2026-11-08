// Desenhos dos lugares, num arquivo próprio: a boas-vindas os usa e fica no pacote inicial, que tem orçamento de 150 kB.
/**
 * Os 4 lugares de "Onde você treina?" (redesign, lote 3; aprovados com a apresentação B em 06/11/2026), no mesmo traço e
 * área dos desenhos de equipamento. O Corpo livre é a opção D (braços para cima, no tapete).
 */
export const ICONES_LUGAR = {
  academia: (
    <>
      <path d="M14 44V6M50 44V6M8 44h12M44 44h12M14 20h4M50 20h-4M4 18h56" />
      <rect x="5" y="11" width="5" height="14" rx="1.5" />
      <rect x="54" y="11" width="5" height="14" rx="1.5" />
      <path d="M20 44h24" />
    </>
  ),
  condominio: (
    <>
      <path d="M6 44V6h24v38M30 16h16v28M2 44h60" />
      <path d="M12 13h4M20 13h4M12 21h4M20 21h4M12 29h4M20 29h4" />
      <path d="M48 36h12M48 33v6M60 33v6" strokeWidth="3" />
    </>
  ),
  casa: (
    <>
      <path d="M6 22 32 4l26 18M11 19v25h42V19M2 44h60" />
      <path d="M22 33h20M20 29v8M44 29v8" strokeWidth="3.2" />
    </>
  ),
  corpo: (
    <>
      <rect x="10" y="40" width="44" height="4" rx="2" />
      <circle cx="32" cy="9" r="4.5" />
      <path d="M32 15v13" strokeWidth="5" />
      <path d="M32 17 22 6M32 17 42 6M32 28l-7 12M32 28l7 12" strokeWidth="3.6" />
    </>
  ),
} as const;
export type Lugar = keyof typeof ICONES_LUGAR;

export function IconeLugar({ lugar }: { lugar: Lugar }) {
  return (
    <svg viewBox="0 0 64 48" className="icone-eq icone-lugar" aria-hidden="true">
      {ICONES_LUGAR[lugar]}
    </svg>
  );
}
