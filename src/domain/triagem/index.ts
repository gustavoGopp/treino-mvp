import type { Articulacao } from '../biblioteca';
import { r } from '../regras';

// Triagem de prontidão no estilo do PAR-Q+ (seguranca.triagem). As perguntas são próprias do app:
// o texto oficial do PAR-Q+ só entra depois de confirmada a licença (seguranca.triagem.texto).
// O app não diagnostica (seguranca.sem-diagnostico).

export const PERGUNTAS = [
  { id: 'coracao', texto: 'Algum médico já disse que você tem problema no coração ou pressão alta?' },
  { id: 'peito', texto: 'Você sente dor no peito em repouso, no dia a dia ou quando faz esforço?' },
  { id: 'tontura', texto: 'Nos últimos 12 meses, você perdeu o equilíbrio por tontura ou desmaiou?' },
  { id: 'doenca-cronica', texto: 'Você tem alguma doença crônica diagnosticada além de problema no coração ou pressão alta?' },
  { id: 'medicamento', texto: 'Você toma remédio receitado para alguma doença crônica?' },
  {
    id: 'osteoarticular',
    texto: 'Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar com exercício?',
  },
  { id: 'supervisao', texto: 'Algum médico já disse que você só deveria fazer exercício com acompanhamento?' },
  { id: 'gravidez', texto: 'Você está grávida ou teve bebê nos últimos 6 meses?' },
  { id: 'doenca-aguda', texto: 'Você está com febre, gripe forte ou se recuperando de alguma doença agora?' },
] as const;

export type PerguntaId = (typeof PERGUNTAS)[number]['id'];
export type Respostas = Record<PerguntaId, boolean>;

/** "Nenhuma se aplica a mim" (seguranca.triagem.nenhuma): "não" em todas; a pessoa ainda vê e confirma. */
export const respostasNenhuma = (): Respostas => Object.fromEntries(PERGUNTAS.map((p) => [p.id, false])) as Respostas;

/**
 * Região marcada na pergunta osteoarticular, com a nota da dor de hoje (0 a 10). É o único lugar onde a dor
 * é perguntada no cadastro (R1). Sem nota = dado antigo (antes da versão 5), tratado como antes: exclui a região.
 */
export type DorRegiao = { articulacao: Articulacao; nota?: number };

export type Triagem = {
  respostas: Respostas;
  /** Regiões marcadas, com a dor de hoje (seguranca.dor.programa). */
  dores?: DorRegiao[];
  /** A pessoa confirmou que foi avaliada e liberada por um profissional. */
  liberacaoConfirmada?: boolean;
};

export type ResultadoTriagem = {
  bloqueado: boolean;
  motivos: PerguntaId[];
  /** Dor de hoje > 5, ou sem nota: os exercícios que carregam a região saem. */
  regioesExcluidas: Articulacao[];
  /** Dor de hoje de 3 a 5: no desempate, o gerador prefere os que poupam a região. */
  regioesDorLeve: Articulacao[];
  /** Todas as regiões marcadas, com a nota (para o lembrete e para o motivo dos avisos). */
  dores: DorRegiao[];
  mensagem: string;
  regraId: string;
};

export type EfeitoDor = 'exclui' | 'prefere-outros' | 'lembrete';

/** O que a nota de hoje faz no programa (seguranca.dor.programa). */
export function efeitoDaDor(nota: number | undefined): EfeitoDor {
  if (nota === undefined || nota > 5) return 'exclui';
  if (nota >= 3) return 'prefere-outros';
  return 'lembrete';
}

function porDor(dores: DorRegiao[] | undefined) {
  const lista = [...(dores ?? [])].sort((a, b) => a.articulacao.localeCompare(b.articulacao));
  const de = (e: EfeitoDor) => lista.filter((d) => efeitoDaDor(d.nota) === e).map((d) => d.articulacao);
  return { dores: lista, regioesExcluidas: de('exclui'), regioesDorLeve: de('prefere-outros') };
}

export function avaliarTriagem(t: Triagem): ResultadoTriagem {
  const sins = PERGUNTAS.map((p) => p.id).filter((id) => t.respostas[id]);
  const soOsteo = sins.length === 1 && sins[0] === 'osteoarticular';
  const dor = porDor(t.dores);

  // Sem "sim": nada a excluir, salvo dores que vieram de um estado antigo (migração 4 → 5), que continuam valendo.
  if (sins.length === 0)
    return { bloqueado: false, motivos: [], ...dor, mensagem: 'Tudo certo para começar.', regraId: r('seguranca.triagem') };

  if (soOsteo && dor.dores.length)
    return {
      bloqueado: false,
      motivos: sins,
      ...dor,
      mensagem:
        'Vamos montar o programa pela dor de hoje: acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o app prefere outros. Se a dor aparecer ou piorar, procure avaliação profissional.',
      regraId: r('seguranca.triagem.osteoarticular'),
    };

  if (t.liberacaoConfirmada)
    return {
      bloqueado: false,
      motivos: sins,
      ...dor,
      mensagem: 'Liberação confirmada. Siga as orientações do profissional que te avaliou.',
      regraId: r('seguranca.triagem'),
    };

  return {
    bloqueado: true,
    motivos: sins,
    regioesExcluidas: [],
    regioesDorLeve: [],
    dores: dor.dores,
    mensagem:
      'Antes de começar, procure um médico ou profissional de Educação Física. O programa automático fica disponível quando você confirmar que foi avaliado e liberado.',
    regraId: r('seguranca.triagem'),
  };
}

export type AcaoDor = { acao: 'seguir' | 'ajustar' | 'encerrar-exercicio'; mensagem: string; regraId: string };

/** Dor relatada numa série, de 0 a 10 (seguranca.dor.escala). Dor aguda encerra o exercício em qualquer nota. */
export function avaliarDor(nota: number, aguda = false): AcaoDor {
  const regraId = r('seguranca.dor.escala');
  if (aguda || nota > 5)
    return {
      acao: 'encerrar-exercicio',
      mensagem: 'Pare este exercício e use a alternativa. Se a dor continuar ou voltar, procure avaliação profissional.',
      regraId,
    };
  if (nota >= 3)
    return {
      acao: 'ajustar',
      mensagem: 'Reduza a carga em 10–20%, encurte a amplitude ou desacelere. Se a dor não diminuir, troque pela alternativa.',
      regraId,
    };
  return { acao: 'seguir', mensagem: 'Pode seguir.', regraId };
}

export type Sinal = 'peito' | 'falta-de-ar' | 'tontura' | 'palpitacao' | 'dor-articular-aguda' | 'formigamento' | 'perda-de-forca';

/** Sinais de alerta durante o treino (seguranca.alerta.*). */
export function avaliarSinal(s: Sinal): { acao: 'encerrar-sessao' | 'encerrar-exercicio'; mensagem: string; regraId: string } {
  if (s === 'peito' || s === 'falta-de-ar' || s === 'tontura' || s === 'palpitacao')
    return {
      acao: 'encerrar-sessao',
      mensagem: 'Pare o treino agora e descanse. Se o sintoma não passar em poucos minutos, ligue para o SAMU (192).',
      regraId: r('seguranca.alerta.cardiovascular'),
    };
  return {
    acao: 'encerrar-exercicio',
    mensagem: 'Pare este exercício e use a alternativa. Se o sintoma continuar, procure avaliação profissional.',
    regraId: r('seguranca.alerta.musculoesqueletico'),
  };
}
