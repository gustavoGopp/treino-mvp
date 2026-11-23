// Campos de texto dos exercícios do guia original.
// Saem do motor de animação e vão para src/conteudo/exercicios/<id>.json.
// A prescrição legada (rx, sets, setLbl, setUnit, rest) saiu do conteúdo no R1: ela vem do programa da pessoa.
// Continua na lista só como registro (o roteiro que a tirava do motor de antes saiu no pacote D4); o extrair-conteudo não a grava.
export const LEGADO_PRESCRICAO = ['rx', 'sets', 'setLbl', 'setUnit', 'rest'];
export const CAMPOS_TEXTO = [
  'name', 'short', 'target', ...LEGADO_PRESCRICAO,
  'feel', 'feelNote', 'setupEq', 'setupBody', 'exec', 'range', 'breath', 'cues', 'check', 'vary', 'note', 'extLabels',
];
export const CAMPOS_TEXTO_ERRO = ['title', 'desc'];
