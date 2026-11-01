import type { ReactNode } from 'react';
import type { ItemId } from '../../domain/taxonomia/equipamentos';

// Desenhos simples dos equipamentos (64 × 48, traço na cor do texto). Ajudam quem não sabe o nome do aparelho.
// Chão em y = 44. Só formas geométricas: nada de foto nem de marca.

const P = (d: string) => <path d={d} />;
const halter = (x: number, y: number, w = 22) => (
  <g>
    <rect x={x} y={y - 6} width="5" height="12" rx="1.5" />
    <rect x={x + w - 5} y={y - 6} width="5" height="12" rx="1.5" />
    <line x1={x + 5} y1={y} x2={x + w - 5} y2={y} />
  </g>
);
const anilha = (x: number, y: number, r: number) => (
  <g>
    <circle cx={x} cy={y} r={r} />
    <circle cx={x} cy={y} r={r * 0.28} />
  </g>
);

// Os equipamentos novos do R0c ainda não têm desenho: o cartão mostra só o nome (pesquisa-v2/08, seção 8).
export const ICONES: Partial<Record<ItemId, ReactNode>> = {
  halteres_fixos: (
    <>
      {halter(8, 18, 26)}
      {halter(28, 32, 28)}
      {P('M6 44h52')}
    </>
  ),
  anilhas_e_manoplas: (
    <>
      {anilha(20, 26, 14)}
      {P('M38 30h20M40 26v8M56 26v8')}
      {P('M6 44h52')}
    </>
  ),
  banco_reto: (
    <>
      <rect x="8" y="20" width="48" height="7" rx="3" />
      {P('M14 27v17M50 27v17M10 44h8M46 44h8')}
    </>
  ),
  banco_regulavel: (
    <>
      <rect x="6" y="28" width="22" height="6" rx="3" />
      {P('M30 31l20-22')}
      <rect x="26" y="15" width="30" height="6" rx="3" transform="rotate(-48 41 18)" />
      {P('M16 34v10M44 34v10M10 44h40M30 31v13')}
    </>
  ),
  estacao_polia_dupla: (
    <>
      <rect x="6" y="4" width="8" height="40" rx="1.5" />
      <rect x="50" y="4" width="8" height="40" rx="1.5" />
      {P('M14 6h36')}
      <circle cx="17" cy="14" r="2.5" />
      <circle cx="47" cy="14" r="2.5" />
      {P('M17 16.5 26 30M47 16.5 38 30M24 30h4M36 30h4')}
    </>
  ),
  polia_simples: (
    <>
      <rect x="10" y="4" width="14" height="40" rx="1.5" />
      {P('M13 24h8M13 28h8M13 32h8M13 36h8M13 40h8M17 8v16')}
      <circle cx="30" cy="8" r="3" />
      {P('M24 6h6M30 11v19M25 30h10M6 44h40')}
    </>
  ),
  acessorio_polia_corda: (
    <>
      <circle cx="32" cy="8" r="3" />
      {P('M32 11v6M32 17 20 38M32 17l12 21')}
      <circle cx="20" cy="40" r="3" />
      <circle cx="44" cy="40" r="3" />
    </>
  ),
  acessorio_polia_triangulo: (
    <>
      <circle cx="32" cy="8" r="3" />
      {P('M32 11v5M32 16 18 38h28Z')}
    </>
  ),
  acessorio_polia_barra_reta: (
    <>
      <circle cx="32" cy="10" r="3" />
      {P('M32 13v13M8 28h48')}
      <rect x="8" y="25" width="10" height="6" rx="2" />
      <rect x="46" y="25" width="10" height="6" rx="2" />
    </>
  ),
  acessorio_polia_estribo: (
    <>
      <circle cx="32" cy="8" r="3" />
      {P('M32 11v4M20 34a12 18 0 0 1 24 0M18 34h28')}
      <rect x="20" y="32" width="24" height="5" rx="2" />
    </>
  ),
  acessorio_polia_tornozeleira: (
    <>
      <circle cx="32" cy="8" r="3" />
      {P('M32 11v7')}
      <rect x="14" y="20" width="36" height="18" rx="9" />
      {P('M24 20v18M40 20v18')}
    </>
  ),
  barra_fixa: (
    <>
      {P('M10 44V8M54 44V8M6 10h52')}
      <rect x="22" y="7" width="20" height="6" rx="2" />
    </>
  ),
  barra_longa: (
    <>
      {P('M4 24h56')}
      <rect x="8" y="12" width="5" height="24" rx="1.5" />
      <rect x="14" y="16" width="4" height="16" rx="1.5" />
      <rect x="51" y="12" width="5" height="24" rx="1.5" />
      <rect x="46" y="16" width="4" height="16" rx="1.5" />
      {P('M6 44h52')}
    </>
  ),
  barra_w: (
    <>
      {P('M6 24h10l4-5 6 10 6-10 6 10 6-10 4 5h10')}
      <rect x="6" y="17" width="4" height="14" rx="1.5" />
      <rect x="54" y="17" width="4" height="14" rx="1.5" />
      {P('M6 44h52')}
    </>
  ),
  rack_de_agachamento: (
    <>
      {P('M14 44V6M50 44V6M8 44h12M44 44h12M14 20h4M50 20h-4M6 18h52')}
      <rect x="6" y="12" width="4" height="12" rx="1" />
      <rect x="54" y="12" width="4" height="12" rx="1" />
    </>
  ),
  smith: (
    <>
      <rect x="10" y="4" width="44" height="40" rx="2" />
      {P('M20 4v40M44 4v40M6 22h52')}
      <rect x="17" y="19" width="6" height="6" rx="1" />
      <rect x="41" y="19" width="6" height="6" rx="1" />
    </>
  ),
  leg_press: (
    <>
      {P('M6 44h52M30 44 54 14')}
      <rect x="6" y="34" width="16" height="6" rx="3" />
      <rect x="4" y="16" width="6" height="20" rx="3" transform="rotate(-25 7 26)" />
      <rect x="40" y="18" width="14" height="5" rx="2" transform="rotate(-50 47 20)" />
      {P('M14 40v4')}
    </>
  ),
  cadeira_extensora: (
    <>
      <rect x="10" y="26" width="24" height="6" rx="3" />
      <rect x="10" y="6" width="6" height="22" rx="3" />
      {P('M34 29 46 40')}
      <circle cx="47" cy="40" r="3.5" />
      {P('M20 32v12M12 44h30')}
    </>
  ),
  mesa_flexora: (
    <>
      <rect x="6" y="20" width="40" height="6" rx="3" transform="rotate(-6 26 23)" />
      {P('M46 22 54 14')}
      <circle cx="55" cy="13" r="3.5" />
      {P('M14 26v18M38 24v20M8 44h40')}
    </>
  ),
  cadeira_flexora: (
    <>
      <rect x="8" y="26" width="24" height="6" rx="3" />
      <rect x="8" y="6" width="6" height="22" rx="3" />
      <rect x="18" y="18" width="16" height="5" rx="2.5" />
      {P('M32 29h14')}
      <circle cx="50" cy="31" r="3.5" />
      {P('M18 32v12M10 44h30')}
    </>
  ),
  paralelas: (
    <>
      {P('M8 18h22M34 26h22M12 18v26M26 18v26M38 26v18M52 26v18M6 44h52')}
    </>
  ),
  elasticos: (
    <>
      <ellipse cx="20" cy="24" rx="12" ry="16" />
      {P('M40 10c8 6 8 22 0 28M52 10c-8 6-8 22 0 28')}
      <rect x="36" y="4" width="20" height="5" rx="2.5" />
      <rect x="36" y="39" width="20" height="5" rx="2.5" />
    </>
  ),
  step: (
    <>
      {P('M8 34h48l-4-10H12Z')}
      <rect x="12" y="34" width="8" height="10" rx="1.5" />
      <rect x="44" y="34" width="8" height="10" rx="1.5" />
    </>
  ),
  bola_suica: (
    <>
      <circle cx="32" cy="24" r="19" />
      {P('M15 18c10 6 24 6 34 0M15 31c10-6 24-6 34 0')}
      {P('M10 44h44')}
    </>
  ),
  esteira: (
    <>
      {P('M6 40 40 36M6 44h44')}
      <rect x="4" y="37" width="40" height="5" rx="2.5" transform="rotate(-6 24 39)" />
      {P('M40 36 50 8M50 8h8M48 18h-12')}
    </>
  ),
};

export function IconeEquipamento({ id }: { id: ItemId }) {
  if (!ICONES[id]) return null;
  return (
    <svg viewBox="0 0 64 48" className="icone-eq" aria-hidden="true" focusable="false">
      {ICONES[id]}
    </svg>
  );
}
