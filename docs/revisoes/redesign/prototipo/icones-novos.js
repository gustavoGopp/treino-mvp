// Redesign (06/11/2026): os 24 desenhos de equipamento que faltam no app (src/features/onboarding/icones.tsx tem 25),
// no mesmo traço dos de hoje: área de 64 × 48, linha de 2,4, assento e encosto em retângulos de canto redondo, rolos em
// círculo e a linha do chão em y = 44. Também os 4 desenhos de "Onde você treina?". São proposta: cada um passa pela
// aprovação do Gustavo antes de ir para o app.
window.ICONES_NOVOS = {
  kettlebell: '<path d="M24 22C21 7 43 7 40 22"/><circle cx="32" cy="31" r="12"/><path d="M14 44h36"/>',
  caneleiras: '<rect x="6" y="20" width="34" height="14" rx="7"/><path d="M14 20v14M22 20v14M30 20v14M40 27h8"/><rect x="46" y="22" width="12" height="10" rx="2"/><path d="M6 44h52"/>',
  banco_scott: '<rect x="8" y="31" width="18" height="6" rx="3"/><path d="M17 37v7M10 44h44M44 21v23"/><rect x="31" y="11" width="24" height="7" rx="3" transform="rotate(32 43 14.5)"/>',
  banco_romano: '<path d="M10 42 44 16M6 44h52M44 16l8 28"/><rect x="38" y="8" width="18" height="7" rx="3" transform="rotate(-37 47 11.5)"/><circle cx="17" cy="33" r="3.5"/><circle cx="24" cy="38" r="3.5"/>',
  estacao_puxada: '<rect x="44" y="4" width="10" height="40" rx="1.5"/><path d="M49 8H22M22 8v8M8 16h28M47 26h4M47 30h4M47 34h4"/><rect x="14" y="33" width="18" height="5" rx="2.5"/><circle cx="29" cy="27" r="3"/><path d="M23 38v6M6 44h52"/>',
  estacao_remada: '<rect x="49" y="10" width="9" height="34" rx="1.5"/><rect x="6" y="31" width="28" height="5" rx="2.5"/><path d="M12 36v8M28 36v8M6 44h52M40 31 49 36"/><rect x="36" y="22" width="5" height="16" rx="2"/><path d="M51 18h5M51 24h5"/>',
  multifuncional: '<rect x="27" y="4" width="10" height="40" rx="1.5"/><path d="M6 8h52M8 8v8M56 8v12M29 22h6M29 28h6"/><rect x="6" y="31" width="17" height="5" rx="2.5"/><path d="M14 36v8"/><rect x="42" y="31" width="12" height="5" rx="2.5"/><circle cx="54" cy="40" r="3"/><path d="M6 44h52"/>',
  supino_maquina: '<rect x="8" y="30" width="18" height="6" rx="3"/><rect x="8" y="8" width="6" height="24" rx="3"/><path d="M17 36v8M10 44h44M50 4v40M50 10 36 20M36 14v12M14 20h14"/>',
  voador: '<rect x="26" y="6" width="12" height="22" rx="3"/><rect x="24" y="28" width="16" height="6" rx="3"/><path d="M32 34v10M22 44h20M26 12 14 10M38 12 50 10"/><rect x="9" y="8" width="5" height="18" rx="2.5"/><rect x="50" y="8" width="5" height="18" rx="2.5"/>',
  desenvolvimento_maquina: '<rect x="8" y="30" width="18" height="6" rx="3"/><rect x="8" y="14" width="6" height="18" rx="3"/><path d="M17 36v8M10 44h44M50 4v40M50 7H20M20 3v8M11 14V9"/>',
  remada_articulada: '<rect x="6" y="32" width="16" height="6" rx="3"/><path d="M14 38v6M6 44h48"/><rect x="26" y="12" width="6" height="20" rx="3"/><path d="M29 32v12M32 22h10M42 16v12M48 4v40"/>',
  graviton: '<path d="M12 44V4M42 44V4M8 6h38M8 6v6M46 6v6M12 28h30"/><rect x="18" y="23" width="18" height="6" rx="3"/><rect x="48" y="14" width="10" height="30" rx="1.5"/><path d="M50 20h6M50 26h6M50 32h6M6 44h52"/>',
  rosca_maquina: '<rect x="6" y="32" width="16" height="6" rx="3"/><path d="M14 38v6M6 44h44M38 26v18"/><rect x="24" y="18" width="22" height="6" rx="3" transform="rotate(-18 35 21)"/><path d="M46 16 54 8"/><circle cx="55" cy="7" r="3"/>',
  triceps_maquina: '<rect x="6" y="32" width="16" height="6" rx="3"/><path d="M14 38v6M6 44h44M36 20v24"/><rect x="24" y="14" width="22" height="6" rx="3"/><path d="M46 20 51 31"/><circle cx="52" cy="34" r="3"/>',
  abdominal_maquina: '<rect x="8" y="30" width="18" height="6" rx="3"/><rect x="8" y="8" width="6" height="24" rx="3"/><path d="M17 36v8M10 44h44M14 10h18M32 10v10M46 4v40M32 14h14"/><circle cx="32" cy="23" r="3"/>',
  hack: '<path d="M10 44 42 8M18 44 50 8M6 44h52"/><rect x="21" y="17" width="8" height="20" rx="3" transform="rotate(42 25 27)"/><rect x="38" y="37" width="18" height="5" rx="2" transform="rotate(-20 47 39.5)"/>',
  cadeira_abdutora_adutora: '<rect x="24" y="6" width="16" height="20" rx="3"/><rect x="20" y="26" width="24" height="6" rx="3"/><path d="M32 32v12M22 44h20M22 30 12 38M42 30 52 38"/><rect x="7" y="34" width="6" height="10" rx="2.5"/><rect x="51" y="34" width="6" height="10" rx="2.5"/>',
  gluteo_maquina: '<rect x="20" y="16" width="26" height="6" rx="3"/><path d="M28 22v22M42 22v22M22 44h26M20 19 10 28M48 8v14"/><rect x="5" y="26" width="7" height="12" rx="2.5"/><rect x="44" y="4" width="10" height="5" rx="2.5"/>',
  panturrilha_em_pe_maquina: '<path d="M20 44V8M44 44V8M8 44h48M20 10h24"/><rect x="17" y="12" width="12" height="5" rx="2.5"/><rect x="35" y="12" width="12" height="5" rx="2.5"/><rect x="24" y="37" width="16" height="7" rx="1"/>',
  panturrilha_sentada_maquina: '<rect x="6" y="26" width="18" height="6" rx="3"/><path d="M15 32v12M6 44h52M48 22v16"/><rect x="28" y="18" width="22" height="6" rx="3"/><rect x="36" y="38" width="14" height="6" rx="1"/>',
  suspensao: '<circle cx="32" cy="5" r="3"/><path d="M32 8v10M32 18 20 37M32 18 44 37"/><rect x="13" y="37" width="14" height="5" rx="2"/><rect x="37" y="37" width="14" height="5" rx="2"/>',
  mini_band: '<ellipse cx="32" cy="26" rx="24" ry="11"/><ellipse cx="32" cy="26" rx="17" ry="5.5"/><path d="M6 44h52"/>',
  roda_abdominal: '<circle cx="32" cy="28" r="13"/><circle cx="32" cy="28" r="3.5"/><path d="M10 28h9M45 28h9M10 23v10M54 23v10M6 44h52"/>',
  barra_hexagonal: '<path d="M22 14h20l9 12-9 12H22l-9-12z"/><path d="M4 26h9M51 26h9M27 21v10M37 21v10"/><rect x="2" y="16" width="4" height="20" rx="1.5"/><rect x="58" y="16" width="4" height="20" rx="1.5"/>',
};
// "Onde você treina?": 4 lugares, no mesmo traço e na mesma área de 64 × 48
window.ICONES_LUGAR = {
  academia: '<path d="M14 44V6M50 44V6M8 44h12M44 44h12M14 20h4M50 20h-4M4 18h56"/><rect x="5" y="11" width="5" height="14" rx="1.5"/><rect x="54" y="11" width="5" height="14" rx="1.5"/><path d="M20 44h24"/>',
  condominio: '<path d="M6 44V6h24v38M30 16h16v28M2 44h60"/><path d="M12 13h4M20 13h4M12 21h4M20 21h4M12 29h4M20 29h4"/><path d="M48 36h12M48 33v6M60 33v6" stroke-width="3"/>',
  casa: '<path d="M6 22 32 4l26 18M11 19v25h42V19M2 44h60"/><path d="M22 33h20M20 29v8M44 29v8" stroke-width="3.2"/>',
  corpo: '<rect x="10" y="40" width="44" height="4" rx="2"/><circle cx="32" cy="9" r="4.5"/><path d="M32 15v13" stroke-width="5"/><path d="M32 17 22 6M32 17 42 6M32 28l-7 12M32 28l7 12" stroke-width="3.6"/>', // opção D, aprovada em 06/11
};
