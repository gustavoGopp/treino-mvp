import { ordemFixa } from '../ordem';
import type { Articulacao } from '../biblioteca';
import { porCento } from '../numero';
import { DOR, r } from '../regras';

// Triagem de prontidão no estilo do PAR-Q+ (seguranca.triagem). As perguntas são próprias do app:
// o texto oficial do PAR-Q+ só entra depois de confirmada a licença (seguranca.triagem.texto).
// O app não diagnostica (seguranca.sem-diagnostico).

/**
 * As 10 perguntas (desde o lote M6, 22/11/2026: coração e pressão alta são duas; seguranca.triagem.pressao). `curta` é o texto da pergunta geral da triagem (lote 3 do redesign; seguranca.triagem.nenhuma): a
 * condição em poucas palavras, sem mudar o conteúdo; a pergunta inteira fica a um toque e reaparece na tela do "sim".
 */
export const PERGUNTAS = [
  { id: 'coracao', curta: 'Problema no coração', texto: 'Algum médico já disse que você tem problema no coração?' },
  { id: 'pressao', curta: 'Pressão alta', texto: 'Algum médico já disse que você tem pressão alta?' },
  { id: 'peito', curta: 'Dor no peito', texto: 'Você sente dor no peito em repouso, no dia a dia ou quando faz esforço?' },
  { id: 'tontura', curta: 'Perdeu o equilíbrio por tontura, ou desmaiou, no último ano', texto: 'Nos últimos 12 meses, você perdeu o equilíbrio por tontura ou desmaiou?' },
  { id: 'doenca-cronica', curta: 'Outra doença crônica', texto: 'Você tem alguma doença crônica diagnosticada além de problema no coração ou pressão alta?' },
  { id: 'medicamento', curta: 'Remédio para doença crônica', texto: 'Você toma remédio receitado para alguma doença crônica?' },
  {
    id: 'osteoarticular',
    curta: 'Problema em osso, articulação, músculo ou tendão',
    texto: 'Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar com exercício?',
  },
  { id: 'supervisao', curta: 'Médico pediu exercício só com acompanhamento', texto: 'Algum médico já disse que você só deveria fazer exercício com acompanhamento?' },
  { id: 'gravidez', curta: 'Gravidez, ou bebê nos últimos 6 meses', texto: 'Você está grávida ou teve bebê nos últimos 6 meses?' },
  { id: 'doenca-aguda', curta: 'Febre, gripe forte ou se recuperando de doença', texto: 'Você está com febre, gripe forte ou se recuperando de alguma doença agora?' },
] as const;

export type PerguntaId = (typeof PERGUNTAS)[number]['id'];
/**
 * As respostas "sim ou não" guardadas são as 9 de sempre. A pressão alta não entra aqui: o "sim" dela é a presença do
 * seguimento (`Triagem.pressao`). Assim o cadastro de quem não tem pressão alta fica idêntico ao de antes do M6 (o mesmo
 * resumo das entradas, o mesmo programa), e o "sim" antigo em "coração ou pressão alta" continua valendo como coração.
 */
export type RespostaId = Exclude<PerguntaId, 'pressao'>;
export const RESPOSTA_IDS = PERGUNTAS.map((p) => p.id).filter((id): id is RespostaId => id !== 'pressao');
export type Respostas = Record<RespostaId, boolean>;

/** "Não, nenhuma" (seguranca.triagem.nenhuma): "não" em todas. */
export const respostasNenhuma = (): Respostas => Object.fromEntries(RESPOSTA_IDS.map((id) => [id, false])) as Respostas;

/**
 * O seguimento de quem marcou pressão alta (seguranca.triagem.pressao; consenso, sem revisão de profissional de saúde).
 * Perguntas próprias do app. `soRemedioDaPressao` só é perguntado a quem também marcou o remédio contínuo.
 */
export type Pressao = { controlada: 'sim' | 'nao' | 'nao-sei'; restricao: boolean; soRemedioDaPressao?: boolean };

/** Textos do seguimento da pressão. TEXTO DE SEGURANÇA: só muda com a revisão do Gustavo. */
export const SEGUIMENTO_PRESSAO = {
  controlada: 'A sua pressão está controlada?',
  controladaAjuda: 'Controlada: o médico disse que está, ou as medidas recentes ficam abaixo de 160 por 90 (16 por 9).',
  restricao: 'Algum médico pediu para você evitar ou limitar exercício?',
  remedio: 'O remédio é só o da pressão?',
} as const;

/** Os cuidados de quem treina com a pressão alta controlada (seguranca.triagem.pressao). TEXTO DE SEGURANÇA. */
export const CUIDADOS_PRESSAO = [
  'Fique no esforço moderado: termine cada série com pelo menos 2 repetições sobrando, mesmo que o treino peça menos.',
  'Respire o tempo todo. Não prenda o ar para fazer força.',
  'Pare o treino se vier tontura, dor no peito, falta de ar fora do normal ou palpitação. Se não passar em poucos minutos, ligue para o SAMU (192).',
  'Se a pressão sair do controle ou o médico mudar a orientação, refaça a triagem.',
] as const;

/**
 * Região marcada na pergunta osteoarticular, com a nota da dor de hoje (0 a 10). É o único lugar onde a dor
 * é perguntada no cadastro (R1). Sem nota = dado antigo (antes da versão 5), tratado como antes: exclui a região.
 */
export type DorRegiao = { articulacao: Articulacao; nota?: number };

export type Triagem = {
  respostas: Respostas;
  /** Regiões marcadas, com a dor de hoje (seguranca.dor.programa). */
  dores?: DorRegiao[];
  /** Presente = "sim" em pressão alta, com as respostas do seguimento (seguranca.triagem.pressao). */
  pressao?: Pressao;
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
  /** Pressão alta marcada e programa liberado: os cuidados ficam à vista (seguranca.triagem.pressao). */
  cuidadosPressao: boolean;
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
  const lista = [...(dores ?? [])].sort((a, b) => ordemFixa(a.articulacao, b.articulacao));
  const de = (e: EfeitoDor) => lista.filter((d) => efeitoDaDor(d.nota) === e).map((d) => d.articulacao);
  return { dores: lista, regioesExcluidas: de('exclui'), regioesDorLeve: de('prefere-outros') };
}

export function avaliarTriagem(t: Triagem): ResultadoTriagem {
  const sins = PERGUNTAS.map((p) => p.id).filter((id) => (id === 'pressao' ? !!t.pressao : t.respostas[id]));
  const cuidadosPressao = !!t.pressao;
  const soOsteo = sins.length === 1 && sins[0] === 'osteoarticular';
  const dor = porDor(t.dores);

  // Sem "sim": nada a excluir, salvo dores que vieram de um estado antigo (migração 4 → 5), que continuam valendo.
  if (sins.length === 0)
    return { bloqueado: false, motivos: [], ...dor, cuidadosPressao: false, mensagem: 'Tudo certo para começar.', regraId: r('seguranca.triagem') };

  if (soOsteo && dor.dores.length)
    return {
      bloqueado: false,
      motivos: sins,
      ...dor,
      cuidadosPressao: false,
      mensagem:
        'Vamos montar o programa pela dor de hoje: acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o app prefere outros. Se a dor aparecer ou piorar, procure avaliação profissional.',
      regraId: r('seguranca.triagem.osteoarticular'),
    };

  // Pressão alta controlada, sem restrição do médico, e nenhum outro "sim" além do remédio da própria pressão: libera
  // com cuidados (seguranca.triagem.pressao). Qualquer outra resposta, inclusive "não sei", cai no bloqueio de sempre.
  const soPressao = !!t.pressao && sins.every((id) => id === 'pressao' || id === 'medicamento');
  if (soPressao && t.pressao!.controlada === 'sim' && !t.pressao!.restricao && (!t.respostas.medicamento || t.pressao!.soRemedioDaPressao === true))
    return {
      bloqueado: false,
      motivos: sins,
      ...dor,
      cuidadosPressao: true,
      mensagem: 'Pode seguir, com cuidados: esforço moderado, respirar sem prender o ar e parar ao primeiro sinal.',
      regraId: r('seguranca.triagem.pressao'),
    };

  if (t.liberacaoConfirmada)
    return {
      bloqueado: false,
      motivos: sins,
      ...dor,
      cuidadosPressao,
      mensagem: 'Liberação confirmada. Siga as orientações do profissional que te avaliou.',
      regraId: r('seguranca.triagem'),
    };

  return {
    bloqueado: true,
    motivos: sins,
    regioesExcluidas: [],
    regioesDorLeve: [],
    dores: dor.dores,
    cuidadosPressao: false,
    mensagem:
      'Antes de começar, procure um médico ou profissional de Educação Física. O programa automático fica disponível quando você confirmar que foi avaliado e liberado.',
    regraId: r('seguranca.triagem'),
  };
}

export type AcaoDor = { acao: 'seguir' | 'ajustar' | 'encerrar-exercicio'; mensagem: string; regraId: string };

/**
 * Dor relatada numa série, de 0 a 10 (seguranca.dor.escala). Dor aguda encerra o exercício em qualquer nota.
 * `haCargaMenor`: se existe uma carga menor que a de agora neste equipamento; sem ela (a placa 1, o halter mais leve),
 * o texto não manda reduzir a carga.
 */
export function avaliarDor(nota: number, aguda = false, haCargaMenor = true): AcaoDor {
  const regraId = r('seguranca.dor.escala');
  if (aguda || nota > DOR.ajustarAte)
    return {
      acao: 'encerrar-exercicio',
      mensagem: 'Pare este exercício e use a alternativa. Se a dor continuar ou voltar, procure avaliação profissional.',
      regraId,
    };
  if (nota >= DOR.ajustarDe)
    return {
      acao: 'ajustar',
      mensagem: haCargaMenor
        ? `Reduza a carga em ${porCento(DOR.reducaoCarga[0])}–${porCento(DOR.reducaoCarga[1])}%, encurte a amplitude ou desacelere. Se a dor não diminuir, troque pela alternativa.`
        : 'Não há carga menor aqui: encurte a amplitude ou desacelere. Se a dor não diminuir, troque pela alternativa.',
      regraId,
    };
  return { acao: 'seguir', mensagem: 'Pode seguir.', regraId };
}

export type Sinal = 'peito' | 'falta-de-ar' | 'tontura' | 'palpitacao' | 'cauda-equina' | 'dor-articular-aguda' | 'estalo-com-dor' | 'dor-irradiada' | 'formigamento' | 'perda-de-forca';

/** Sinais de alerta durante o treino (seguranca.alerta.*). */
export function avaliarSinal(s: Sinal): { acao: 'encerrar-sessao' | 'encerrar-exercicio'; mensagem: string; regraId: string } {
  // Sinais de cauda equina pedem atendimento urgente (seguranca.alerta.musculoesqueletico; tabela 2 de aafp2015): o treino
  // acaba e a orientação é ir a um pronto-socorro. Até 17/11/2026 a regra dizia isso e nenhuma tela mostrava o sinal.
  if (s === 'cauda-equina')
    return {
      acao: 'encerrar-sessao',
      mensagem: 'Pare o treino. Esse sinal pede atendimento urgente: procure um pronto-socorro agora.',
      regraId: r('seguranca.alerta.musculoesqueletico'),
    };
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
