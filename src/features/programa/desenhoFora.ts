import { useEffect, useState } from 'react';
import type { Estilo } from '../../engine/estilo';

// Pede ao Worker do Boneco (boneco.worker.ts) um desenho parado, sem travar a tela. Sem Worker no navegador, o
// cálculo é feito aqui mesmo, com o motor carregado sob demanda. Cada resposta fica guardada pelo pedido.
export type Pedido = { tipo: 'miniatura'; animacaoId: string; estilo: Estilo } | { tipo: 'previa'; estilo: Estilo };
export type Desenho = { viewBox: string; html: string; classe: string } | null;

const prontos = new Map<string, Promise<Desenho>>();
const esperando = new Map<number, (d: Desenho) => void>();
let worker: Worker | null | undefined;
let n = 0;

function oWorker(): Worker | null {
  if (worker === undefined) {
    try {
      worker = new Worker(new URL('./boneco.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (e: MessageEvent<{ n: number; q: Desenho }>) => {
        esperando.get(e.data.n)?.(e.data.q);
        esperando.delete(e.data.n);
      };
    } catch {
      worker = null;
    }
  }
  return worker;
}

export function desenhar(pedido: Pedido): Promise<Desenho> {
  const chave = JSON.stringify(pedido);
  if (!prontos.has(chave)) {
    const w = typeof Worker !== 'undefined' ? oWorker() : null;
    const resposta: Promise<Desenho> = w
      ? new Promise((ok) => {
          esperando.set(++n, ok);
          w.postMessage({ n, pedido });
        })
      : import('./quadroBoneco').then((m) => (pedido.tipo === 'miniatura' ? m.quadro(pedido.animacaoId, pedido.estilo) : m.previaEstilo(pedido.estilo)));
    prontos.set(chave, resposta);
  }
  return prontos.get(chave)!;
}

/** O desenho pedido, ou null enquanto ele não chega (fica no lugar um quadro vazio, do mesmo tamanho). */
export function useDesenho(pedido: Pedido | null): Desenho {
  const chave = pedido ? JSON.stringify(pedido) : '';
  const [d, setD] = useState<{ chave: string; q: Desenho }>({ chave: '', q: null });
  useEffect(() => {
    if (!pedido) return;
    let vivo = true;
    desenhar(pedido).then((q) => vivo && setD({ chave, q }));
    return () => {
      vivo = false;
    };
    // a chave resume o pedido
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chave]);
  return d.chave === chave ? d.q : null;
}
