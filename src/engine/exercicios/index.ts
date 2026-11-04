// @ts-nocheck
// Gerado por scripts/extrair-motor.mjs a partir de referencia/guia-execucao-fase1.html. Port mecânico: não editar à mão antes do M1 terminar.
import supinoInclinado from './supino-inclinado';
import barraFixa from './barra-fixa';
import remadaBaixa from './remada-baixa';
import crucifixoPolia from './crucifixo-polia';
import elevacaoLateral from './elevacao-lateral';
import facePull from './face-pull';
import abdominalPolia from './abdominal-polia';
import goblet from './goblet';
import stiff from './stiff';
import afundo from './afundo';
import panturrilha from './panturrilha';
import roscaPolia from './rosca-polia';
import tricepsCorda from './triceps-corda';
import supinoReto from './supino-reto';
import remadaApoiada from './remada-apoiada';
import desenvolvimento from './desenvolvimento';
import puxadaUnilateral from './puxada-unilateral';
import flexao from './flexao';
import elevacaoHalteres from './elevacao-halteres';
import elevacaoJoelhos from './elevacao-joelhos';
import bulgaro from './bulgaro';
import flexaoBola from './flexao-bola';
import panturrilhaB from './panturrilha-b';
import roscaInclinada from './rosca-inclinada';
import tricepsFrances from './triceps-frances';
// Animações novas (marco das animações), sempre depois das 25 do guia original (a 26ª, elevacao-lateral-b, era uma
// cópia da elevação lateral com outra prescrição e saiu na revisão de anatomia, 02/11/2026).
import remadaUnilateral from './remada-unilateral';
import panturrilhaChao from './panturrilha-chao';
import abdominalChao from './abdominal-chao';
import roscaAlternada from './rosca-alternada';
import tricepsFrancesHalter from './triceps-frances-halter';
import stiffUnilateral from './stiff-unilateral';
import agachamentoPesoCorpo from './agachamento-peso-corpo';
import afundoPesoCorpo from './afundo-peso-corpo';
import bulgaroPesoCorpo from './bulgaro-peso-corpo';
import barraFixaSupinada from './barra-fixa-supinada';
import ponteGluteo from './ponte-gluteo';
import flexaoFechada from './flexao-fechada';
import pike from './pike';
import flexaoJoelhoDeslizante from './flexao-joelho-deslizante';
import nordico from './nordico';
import remadaUnilateralSemBanco from './remada-unilateral-sem-banco';
import roscaMartelo from './rosca-martelo';
import tricepsFrancesPoliaUnilateral from './triceps-frances-polia-unilateral';
import remadaUnilateralPolia from './remada-unilateral-polia';
import crucifixoInvertidoPolia from './crucifixo-invertido-polia';
import remadaUnilateralKettlebell from './remada-unilateral-kettlebell';
import stiffKettlebell from './stiff-kettlebell';
import roscaKettlebell from './rosca-kettlebell';
import tricepsFrancesKettlebell from './triceps-frances-kettlebell';
import afundoKettlebell from './afundo-kettlebell';
import desenvolvimentoUnilateralKettlebell from './desenvolvimento-unilateral-kettlebell';
import ponteKettlebell from './ponte-kettlebell';
import remadaSuspensao from './remada-suspensao';
import roscaSuspensao from './rosca-suspensao';
import ytSuspensao from './yt-suspensao';
import tricepsSuspensao from './triceps-suspensao';
import flexaoJoelhoSuspensao from './flexao-joelho-suspensao';
import bulgaroSuspensao from './bulgaro-suspensao';
import abdominalBola from './abdominal-bola';
import pontePesBola from './ponte-pes-bola';
import elevacaoJoelhosParalelas from './elevacao-joelhos-paralelas';
import extensaoJoelhoCaneleira from './extensao-joelho-caneleira';
import abducaoCaneleira from './abducao-caneleira';
import aducaoCaneleira from './aducao-caneleira';
import abducaoMiniBand from './abducao-mini-band';
import rodaAbdominal from './roda-abdominal';

// Mesma ordem do guia original (a ordem define os treinos e a ordem de preparação).
export const EX = [
  supinoInclinado,
  barraFixa,
  remadaBaixa,
  crucifixoPolia,
  elevacaoLateral,
  facePull,
  abdominalPolia,
  goblet,
  stiff,
  afundo,
  panturrilha,
  roscaPolia,
  tricepsCorda,
  supinoReto,
  remadaApoiada,
  desenvolvimento,
  puxadaUnilateral,
  flexao,
  elevacaoHalteres,
  elevacaoJoelhos,
  bulgaro,
  flexaoBola,
  panturrilhaB,
  roscaInclinada,
  tricepsFrances,
  remadaUnilateral,
  panturrilhaChao,
  abdominalChao,
  roscaAlternada,
  tricepsFrancesHalter,
  stiffUnilateral,
  agachamentoPesoCorpo,
  afundoPesoCorpo,
  bulgaroPesoCorpo,
  barraFixaSupinada,
  ponteGluteo,
  flexaoFechada,
  pike,
  flexaoJoelhoDeslizante,
  nordico,
  remadaUnilateralSemBanco,
  roscaMartelo,
  tricepsFrancesPoliaUnilateral,
  remadaUnilateralPolia,
  crucifixoInvertidoPolia,
  remadaUnilateralKettlebell,
  stiffKettlebell,
  roscaKettlebell,
  tricepsFrancesKettlebell,
  afundoKettlebell,
  desenvolvimentoUnilateralKettlebell,
  ponteKettlebell,
  remadaSuspensao,
  roscaSuspensao,
  ytSuspensao,
  tricepsSuspensao,
  flexaoJoelhoSuspensao,
  bulgaroSuspensao,
  abdominalBola,
  pontePesBola,
  elevacaoJoelhosParalelas,
  extensaoJoelhoCaneleira,
  abducaoCaneleira,
  aducaoCaneleira,
  abducaoMiniBand,
  rodaAbdominal,
];
