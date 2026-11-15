import { DIAS, EX } from '../../engine';
import { instanteDoErro, montarSvgEstilo, vistaDaMiniatura, vistaDoMovimento } from '../../engine/estilo';
import { instante, previaEstilo, quadro } from './quadroBoneco';
import type { Pedido } from './desenhoFora';
import { APROVADOS } from '../../engine/novo/aprovados';
import type { Exercicio as ExercicioNovo } from '../../engine/novo/movimento';

// O que o Worker do Boneco responde (lote técnico e lote 2 do redesign). Funções puras sobre o motor (src/engine, sem
// mudança). O motor prepara os 82 exercícios quando é carregado; no celular simulado isso travava o guia por
// segundos. Por isso o guia não carrega o motor na tela: pede aqui a ficha do exercício, o catálogo e cada quadro.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Animacao = any;

// ----- o motor novo (animação nova): só para os exercícios refeitos e aprovados pelo Gustavo -----
// Cada exercício novo é um arquivo (src/engine/novo/exercicios/<id>.ts), carregado só quando é pedido; o resto do
// motor novo (a ponte) também só é carregado no primeiro pedido. Para os outros exercícios, e para quem escolheu a
// silhueta ('b'), o motor de hoje responde como sempre.
const ARQUIVOS = import.meta.glob<Record<string, unknown>>('../../engine/novo/exercicios/*.ts');
const novos = new Map<string, Promise<ExercicioNovo | undefined>>();
const aPonte = () => import('../../engine/novo/ponte');

/** O exercício no motor novo, se foi refeito e aprovado e o estilo é o do Boneco; senão, undefined (vale o de hoje). */
export function doMotorNovo(animacaoId: string, estilo: string): Promise<ExercicioNovo | undefined> | undefined {
  if (estilo === 'b' || estilo === 'atual' || !(animacaoId in APROVADOS)) return undefined;
  const carregar = ARQUIVOS[`../../engine/novo/exercicios/${animacaoId}.ts`];
  if (!carregar) return undefined;
  if (!novos.has(animacaoId))
    novos.set(
      animacaoId,
      carregar().then(
        (m) => Object.values(m).find((x): x is ExercicioNovo => !!x && typeof x === 'object' && (x as ExercicioNovo).ficha?.id === animacaoId),
        () => undefined,
      ),
    );
  return novos.get(animacaoId);
}

/** A resposta de um pedido: do motor novo (quando o exercício foi refeito e aprovado) ou do motor de hoje. */
export function responder(p: Pedido): unknown {
  if (p.tipo === 'miniatura' || p.tipo === 'ficha' || p.tipo === 'quadroGuia') {
    const novo = doMotorNovo(p.animacaoId, p.estilo);
    if (novo)
      return novo.then(async (ex) => {
        if (!ex) return responderComOMotorDeHoje(p);
        const ponte = await aPonte();
        if (p.tipo === 'miniatura') return ponte.miniaturaDoMotorNovo(ex, p.tema);
        if (p.tipo === 'ficha') return ponte.fichaDoMotorNovo(ex);
        return ponte.quadroDoMotorNovo(ex, p.vista, p.modo, p.t, p.erro, p.tituloErro, p.tema);
      });
  }
  return responderComOMotorDeHoje(p);
}

function responderComOMotorDeHoje(p: Pedido): unknown {
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
