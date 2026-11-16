import { animacao, responder } from './trabalhoBoneco';
import type { Ciclo, Pedido } from './desenhoFora';

// Worker do Boneco (lote técnico do redesign, 06/11/2026): o motor roda aqui, fora da linha principal, e a tela recebe
// só o resultado pronto (trabalhoBoneco.ts). Lote 2: também a volta inteira da animação do guia, quadro a quadro (30
// por segundo de animação), na ordem do tempo; um pedido novo cancela o anterior.
let cicloAtual = 0;

self.onmessage = (e: MessageEvent<{ n: number; pedido: Pedido } | { ciclo: Ciclo }>) => {
  if ('ciclo' in e.data) return void calcularCiclo(e.data.ciclo);
  // a resposta pode demorar (o motor carrega o exercício só quando é pedido)
  const n = e.data.n;
  void responder(e.data.pedido).then(
    (q) => self.postMessage({ n, q }),
    () => self.postMessage({ n, q: null }),
  );
};

async function calcularCiclo(c: Ciclo) {
  cicloAtual = c.id;
  const ex = await animacao(c.animacaoId);
  if (!ex || cicloAtual !== c.id) return;
  const ponte = await import('../../engine/novo/ponte');
  const T = ponte.fichaDoMotorNovo(ex).T;
  for (let i = 0; i < Math.ceil(T * 30); i++) {
    if (cicloAtual !== c.id) return;
    self.postMessage({ ciclo: c.id, i, q: ponte.quadroDoMotorNovo(ex, c.vista, c.modo, i / 30, c.erro, c.tituloErro, c.tema, c.estilo) });
    // devolve a vez entre um quadro e outro, para um pedido novo (outra vista, outro modo) cancelar este
    await new Promise((ok) => setTimeout(ok, 0));
  }
}
