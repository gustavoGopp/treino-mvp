import { EX } from '../../engine';
import { montarSvgEstilo } from '../../engine/estilo';
import { doMotorNovo, responder } from './trabalhoBoneco';
import type { Ciclo, Pedido } from './desenhoFora';

// Worker do Boneco (lote técnico do redesign, 06/11/2026): o motor (sem mudança) roda aqui, fora da linha principal,
// e a tela recebe só o resultado pronto (trabalhoBoneco.ts). Lote 2: também a volta inteira da animação do guia,
// quadro a quadro (30 por segundo de animação), na ordem do tempo; um pedido novo cancela o anterior.
let cicloAtual = 0;

self.onmessage = (e: MessageEvent<{ n: number; pedido: Pedido } | { ciclo: Ciclo }>) => {
  if ('ciclo' in e.data) return void calcularCiclo(e.data.ciclo);
  // a resposta pode demorar (o motor novo carrega o exercício só quando é pedido)
  const n = e.data.n;
  void Promise.resolve(responder(e.data.pedido)).then(
    (q) => self.postMessage({ n, q }),
    () => self.postMessage({ n, q: null }),
  );
};

async function calcularCiclo(c: Ciclo) {
  cicloAtual = c.id;
  // exercício refeito e aprovado: a volta inteira sai do motor novo
  const novo = await doMotorNovo(c.animacaoId, c.estilo);
  if (cicloAtual !== c.id) return;
  if (novo) {
    const ponte = await import('../../engine/novo/ponte');
    const T = ponte.fichaDoMotorNovo(novo).T;
    for (let i = 0; i < Math.ceil(T * 30); i++) {
      if (cicloAtual !== c.id) return;
      self.postMessage({ ciclo: c.id, i, q: ponte.quadroDoMotorNovo(novo, c.vista, c.modo, i / 30, c.erro, c.tituloErro, c.tema) });
      await new Promise((ok) => setTimeout(ok, 0));
    }
    return;
  }
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
