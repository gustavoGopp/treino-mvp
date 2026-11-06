import { previaEstilo, quadro } from './quadroBoneco';
import type { Pedido } from './desenhoFora';

// Worker do Boneco (lote técnico do redesign, 06/11/2026): o motor calcula as miniaturas e as prévias aqui, fora da
// linha principal, e a tela recebe só o SVG pronto. No celular simulado, esse cálculo travava o programa por
// segundos (perfil do processador em docs/revisoes/redesign/medidas.md, lote técnico).
self.onmessage = (e: MessageEvent<{ n: number; pedido: Pedido }>) => {
  const { n, pedido } = e.data;
  const q = pedido.tipo === 'miniatura' ? quadro(pedido.animacaoId, pedido.estilo) : previaEstilo(pedido.estilo);
  self.postMessage({ n, q });
};
