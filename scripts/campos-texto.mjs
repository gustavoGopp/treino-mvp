// Campos de texto dos exercícios do guia original.
// Saem do motor de animação e vão para src/conteudo/exercicios/<id>.json.
// A prescrição legada (rx, sets, setLbl, setUnit, rest) saiu do conteúdo no R1: ela vem do programa da pessoa.
// Continua na lista para o extrair-motor tirá-la do motor; o extrair-conteudo não a grava mais.
export const LEGADO_PRESCRICAO = ['rx', 'sets', 'setLbl', 'setUnit', 'rest'];
export const CAMPOS_TEXTO = [
  'name', 'short', 'target', ...LEGADO_PRESCRICAO,
  'feel', 'feelNote', 'setupEq', 'setupBody', 'exec', 'range', 'breath', 'cues', 'check', 'vary', 'note', 'extLabels',
];
export const CAMPOS_TEXTO_ERRO = ['title', 'desc'];
