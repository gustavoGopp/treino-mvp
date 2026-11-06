import { DIAS, EX } from '../../engine';
import { instanteDoErro, montarSvgEstilo, vistaDaMiniatura, vistaDoMovimento } from '../../engine/estilo';
import { instante, previaEstilo, quadro } from './quadroBoneco';
import type { Pedido } from './desenhoFora';

// O que o Worker do Boneco responde (lote técnico e lote 2 do redesign). Funções puras sobre o motor (src/engine, sem
// mudança). O motor prepara os 82 exercícios quando é carregado; no celular simulado isso travava o guia por
// segundos. Por isso o guia não carrega o motor na tela: pede aqui a ficha do exercício, o catálogo e cada quadro.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;

export function responder(p: Pedido): unknown {
  switch (p.tipo) {
    case 'miniatura':
      return quadro(p.animacaoId, p.estilo);
    case 'previa':
      return previaEstilo(p.estilo);
    case 'catalogo':
      return { dias: DIAS.map((d) => ({ id: d.id, nome: d.nome, ids: d.ex.map((e: Animacao) => e.id as string) })), todos: EX.map((e: Animacao) => e.id as string) };
    case 'ficha': {
      const ex: Animacao = EX.find((e: Animacao) => e.id === p.animacaoId);
      if (!ex) return null;
      return {
        id: ex.id,
        views: ex.views,
        errors: ex.errors.map((e: Animacao) => ({ id: e.id, view: e.view })),
        seq: ex.seq.map((g: Animacao) => ({ kind: g.kind, dur: g.dur, label: g.label })),
        T: ex.T,
        vistaMovimento: vistaDoMovimento(ex, p.estilo),
        vistaMiniatura: vistaDaMiniatura(ex, instante(ex), p.estilo),
        instantesErro: ex.errors.map((_: unknown, i: number) => (p.estilo !== 'atual' ? instanteDoErro(ex, i) : 0)),
      };
    }
    case 'quadroGuia': {
      const ex: Animacao = EX.find((e: Animacao) => e.id === p.animacaoId);
      if (!ex) return null;
      return montarSvgEstilo(ex, p.vista, p.modo, p.t, p.erro, p.largura, p.estilo, false, { tituloErro: p.tituloErro });
    }
  }
}
