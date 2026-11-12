import { useEffect, useState } from 'react';
import type { Estilo } from '../../engine/estilo';

// Pede ao Worker do Boneco (boneco.worker.ts) um desenho parado, sem travar a tela. Sem Worker no navegador, o
// cálculo é feito aqui mesmo, com o motor carregado sob demanda. Cada resposta fica guardada pelo pedido.
export type Pedido =
  | { tipo: 'miniatura'; animacaoId: string; estilo: Estilo }
  | { tipo: 'previa'; estilo: Estilo }
  | { tipo: 'catalogo' }
  | { tipo: 'ficha'; animacaoId: string; estilo: Estilo }
  | { tipo: 'quadroGuia'; animacaoId: string; vista: string; modo: string; t: number; erro: number; largura: number; estilo: Estilo; tituloErro: string };
/** O que o guia precisa saber de uma animação, sem carregar o motor na tela (lote 2). */
export type Ficha = {
  id: string;
  views: string[];
  errors: { id: string; view: string }[];
  seq: { kind: string; dur: number; label: string }[];
  T: number;
  vistaMovimento: string;
  vistaMiniatura: string;
  instantesErro: number[];
};
export type Catalogo = { dias: { id: string; nome: string; ids: string[] }[]; todos: string[] };
export type Desenho = { viewBox: string; html: string; classe: string } | null;
/** Uma volta da animação do guia, calculada no Worker (lote 2). */
export type Ciclo = { id: number; animacaoId: string; vista: string; modo: string; erro: number; largura: number; estilo: Estilo; tituloErro: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QuadroGuia = any;

const prontos = new Map<string, Promise<unknown>>();
const esperando = new Map<number, (d: unknown) => void>();
let worker: Worker | null | undefined;
let n = 0;
let cicloPedido = 0;
let aoQuadroDoCiclo: ((i: number, q: QuadroGuia) => void) | null = null;

function oWorker(): Worker | null {
  if (worker === undefined) {
    try {
      worker = new Worker(new URL('./boneco.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = (e: MessageEvent<{ n: number; q: unknown } | { ciclo: number; i: number; q: QuadroGuia }>) => {
        if ('ciclo' in e.data) {
          if (e.data.ciclo === cicloPedido) aoQuadroDoCiclo?.(e.data.i, e.data.q);
          return;
        }
        esperando.get(e.data.n)?.(e.data.q);
        esperando.delete(e.data.n);
      };
    } catch {
      worker = null;
    }
  }
  return worker;
}

/** Pede ao Worker (ou, sem Worker, calcula aqui) a resposta de um pedido; respostas iguais ficam guardadas. */
export function pedirAoBoneco<T = unknown>(pedido: Pedido, guardar = true): Promise<T> {
  const chave = JSON.stringify(pedido);
  if (!guardar || !prontos.has(chave)) {
    const w = typeof Worker !== 'undefined' ? oWorker() : null;
    const resposta: Promise<unknown> = w
      ? new Promise((ok) => {
          esperando.set(++n, ok as (d: unknown) => void);
          w.postMessage({ n, pedido });
        })
      : import('./trabalhoBoneco').then((m) => m.responder(pedido));
    if (!guardar) return resposta as Promise<T>;
    prontos.set(chave, resposta);
    // uma resposta que falha (o motor não baixou) não fica guardada: o próximo pedido tenta de novo
    resposta.catch(() => {
      if (prontos.get(chave) === resposta) prontos.delete(chave);
    });
  }
  return prontos.get(chave)! as Promise<T>;
}

export function desenhar(pedido: Pedido): Promise<Desenho> {
  return pedirAoBoneco<Desenho>(pedido);
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

/**
 * Pede ao Worker a volta inteira da animação do guia; cada quadro pronto chega em aoQuadro(índice, quadro), na ordem
 * do tempo. Um pedido novo cancela o anterior. Sem Worker, devolve false e o guia calcula na própria tela.
 */
export function pedirCiclo(c: Omit<Ciclo, 'id'>, aoQuadro: (i: number, q: QuadroGuia) => void): boolean {
  const w = typeof Worker !== 'undefined' ? oWorker() : null;
  if (!w) return false;
  cicloPedido++;
  aoQuadroDoCiclo = aoQuadro;
  w.postMessage({ ciclo: { ...c, id: cicloPedido } });
  return true;
}

/** Para de receber os quadros do ciclo pedido (ao sair do guia). */
export function largarCiclo() {
  cicloPedido++;
  aoQuadroDoCiclo = null;
  // um ciclo sem exercício faz o Worker parar o que estava calculando
  worker?.postMessage({ ciclo: { id: cicloPedido, animacaoId: '', vista: '', modo: '', erro: 0, largura: 0, estilo: 'a', tituloErro: '' } });
}
