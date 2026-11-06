import { EX } from '../../engine';
import { montarSvgEstilo } from '../../engine/estilo';
import { responder } from './trabalhoBoneco';
import type { Ciclo, Pedido } from './desenhoFora';

// Worker do Boneco (lote técnico do redesign, 06/11/2026): o motor (sem mudança) roda aqui, fora da linha principal,
// e a tela recebe só o resultado pronto (trabalhoBoneco.ts). Lote 2: também a volta inteira da animação do guia,
// quadro a quadro (30 por segundo de animação), na ordem do tempo; um pedido novo cancela o anterior.
let cicloAtual = 0;

self.onmessage = (e: MessageEvent<{ n: number; pedido: Pedido } | { ciclo: Ciclo }>) => {
  if ('ciclo' in e.data) return void calcularCiclo(e.data.ciclo);
  self.postMessage({ n: e.data.n, q: responder(e.data.pedido) });
};

async function calcularCiclo(c: Ciclo) {
  cicloAtual = c.id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ex: any = EX.find((x: { id: string }) => x.id === c.animacaoId);
  if (!ex) return;
  const total = Math.ceil(ex.T * 30);
  for (let i = 0; i < total; i++) {
    if (cicloAtual !== c.id) return;
    const q = montarSvgEstilo(ex, c.vista, c.modo, i / 30, c.erro, c.largura, c.estilo, false, { tituloErro: c.tituloErro });
    self.postMessage({ ciclo: c.id, i, q });
    // devolve a vez para o Worker ouvir um pedido novo (que cancela este)
    await new Promise((ok) => setTimeout(ok, 0));
  }
}
