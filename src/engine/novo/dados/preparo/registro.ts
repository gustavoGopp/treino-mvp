// Gerado por scripts/animacao-nova/preparo.mjs: não edite. Entrega ao motor, de uma vez, o que foi calculado de antemão
// para todos os exercícios (para os scripts e os testes; o app carrega o arquivo de cada exercício junto com ele).
import { registrarPreparo } from '../../preparo';
import type { Preparo } from '../../preparo';
import p0 from './abdominal-bola.json';
import p1 from './abdominal-chao.json';
import p2 from './abdominal-invertido.json';
import p3 from './abdominal-polia.json';
import p4 from './abducao-caneleira.json';
import p5 from './abducao-deitado.json';
import p6 from './abducao-mini-band.json';
import p7 from './abertura-t-deitado.json';
import p8 from './aducao-caneleira.json';
import p9 from './aducao-deitado.json';
import p10 from './afundo.json';
import p11 from './afundo-kettlebell.json';
import p12 from './afundo-peso-corpo.json';
import p13 from './afundo-tras-peso-corpo.json';
import p14 from './agachamento-elastico.json';
import p15 from './agachamento-peso-corpo.json';
import p16 from './barra-fixa.json';
import p17 from './barra-fixa-supinada.json';
import p18 from './bulgaro.json';
import p19 from './bulgaro-peso-corpo.json';
import p20 from './bulgaro-suspensao.json';
import p21 from './crucifixo-elastico.json';
import p22 from './crucifixo-halteres.json';
import p23 from './crucifixo-inclinado-halteres.json';
import p24 from './crucifixo-invertido-polia.json';
import p25 from './crucifixo-polia.json';
import p26 from './desenvolvimento.json';
import p27 from './desenvolvimento-elastico.json';
import p28 from './desenvolvimento-unilateral-kettlebell.json';
import p29 from './elevacao-halteres.json';
import p30 from './elevacao-joelhos.json';
import p31 from './elevacao-joelhos-paralelas.json';
import p32 from './elevacao-lateral.json';
import p33 from './elevacao-lateral-elastico.json';
import p34 from './extensao-joelho-caneleira.json';
import p35 from './extensao-joelho-elastico.json';
import p36 from './extensao-triceps-peso-corpo.json';
import p37 from './face-pull.json';
import p38 from './face-pull-elastico.json';
import p39 from './flexao.json';
import p40 from './flexao-bola.json';
import p41 from './flexao-elastico.json';
import p42 from './flexao-fechada.json';
import p43 from './flexao-joelho-deslizante.json';
import p44 from './flexao-joelho-elastico.json';
import p45 from './flexao-joelho-suspensao.json';
import p46 from './flexao-pes-elevados.json';
import p47 from './goblet.json';
import p48 from './nordico.json';
import p49 from './panturrilha.json';
import p50 from './panturrilha-b.json';
import p51 from './panturrilha-chao.json';
import p52 from './panturrilha-degrau.json';
import p53 from './panturrilha-sentada-halter.json';
import p54 from './pike.json';
import p55 from './ponte-gluteo.json';
import p56 from './ponte-gluteo-halter.json';
import p57 from './ponte-kettlebell.json';
import p58 from './ponte-pes-bola.json';
import p59 from './puxada-elastico.json';
import p60 from './puxada-unilateral.json';
import p61 from './remada-apoiada.json';
import p62 from './remada-baixa.json';
import p63 from './remada-curvada-halteres.json';
import p64 from './remada-elastico.json';
import p65 from './remada-suspensao.json';
import p66 from './remada-unilateral.json';
import p67 from './remada-unilateral-kettlebell.json';
import p68 from './remada-unilateral-polia.json';
import p69 from './remada-unilateral-sem-banco.json';
import p70 from './roda-abdominal.json';
import p71 from './rosca-alternada.json';
import p72 from './rosca-elastico.json';
import p73 from './rosca-inclinada.json';
import p74 from './rosca-kettlebell.json';
import p75 from './rosca-martelo.json';
import p76 from './rosca-polia.json';
import p77 from './rosca-suspensao.json';
import p78 from './stiff.json';
import p79 from './stiff-elastico.json';
import p80 from './stiff-kettlebell.json';
import p81 from './stiff-unilateral.json';
import p82 from './supino-inclinado.json';
import p83 from './supino-reto.json';
import p84 from './triceps-corda.json';
import p85 from './triceps-elastico-acima.json';
import p86 from './triceps-frances.json';
import p87 from './triceps-frances-halter.json';
import p88 from './triceps-frances-kettlebell.json';
import p89 from './triceps-frances-polia-unilateral.json';
import p90 from './triceps-suspensao.json';
import p91 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-invertido': p2,
  'abdominal-polia': p3,
  'abducao-caneleira': p4,
  'abducao-deitado': p5,
  'abducao-mini-band': p6,
  'abertura-t-deitado': p7,
  'aducao-caneleira': p8,
  'aducao-deitado': p9,
  'afundo': p10,
  'afundo-kettlebell': p11,
  'afundo-peso-corpo': p12,
  'afundo-tras-peso-corpo': p13,
  'agachamento-elastico': p14,
  'agachamento-peso-corpo': p15,
  'barra-fixa': p16,
  'barra-fixa-supinada': p17,
  'bulgaro': p18,
  'bulgaro-peso-corpo': p19,
  'bulgaro-suspensao': p20,
  'crucifixo-elastico': p21,
  'crucifixo-halteres': p22,
  'crucifixo-inclinado-halteres': p23,
  'crucifixo-invertido-polia': p24,
  'crucifixo-polia': p25,
  'desenvolvimento': p26,
  'desenvolvimento-elastico': p27,
  'desenvolvimento-unilateral-kettlebell': p28,
  'elevacao-halteres': p29,
  'elevacao-joelhos': p30,
  'elevacao-joelhos-paralelas': p31,
  'elevacao-lateral': p32,
  'elevacao-lateral-elastico': p33,
  'extensao-joelho-caneleira': p34,
  'extensao-joelho-elastico': p35,
  'extensao-triceps-peso-corpo': p36,
  'face-pull': p37,
  'face-pull-elastico': p38,
  'flexao': p39,
  'flexao-bola': p40,
  'flexao-elastico': p41,
  'flexao-fechada': p42,
  'flexao-joelho-deslizante': p43,
  'flexao-joelho-elastico': p44,
  'flexao-joelho-suspensao': p45,
  'flexao-pes-elevados': p46,
  'goblet': p47,
  'nordico': p48,
  'panturrilha': p49,
  'panturrilha-b': p50,
  'panturrilha-chao': p51,
  'panturrilha-degrau': p52,
  'panturrilha-sentada-halter': p53,
  'pike': p54,
  'ponte-gluteo': p55,
  'ponte-gluteo-halter': p56,
  'ponte-kettlebell': p57,
  'ponte-pes-bola': p58,
  'puxada-elastico': p59,
  'puxada-unilateral': p60,
  'remada-apoiada': p61,
  'remada-baixa': p62,
  'remada-curvada-halteres': p63,
  'remada-elastico': p64,
  'remada-suspensao': p65,
  'remada-unilateral': p66,
  'remada-unilateral-kettlebell': p67,
  'remada-unilateral-polia': p68,
  'remada-unilateral-sem-banco': p69,
  'roda-abdominal': p70,
  'rosca-alternada': p71,
  'rosca-elastico': p72,
  'rosca-inclinada': p73,
  'rosca-kettlebell': p74,
  'rosca-martelo': p75,
  'rosca-polia': p76,
  'rosca-suspensao': p77,
  'stiff': p78,
  'stiff-elastico': p79,
  'stiff-kettlebell': p80,
  'stiff-unilateral': p81,
  'supino-inclinado': p82,
  'supino-reto': p83,
  'triceps-corda': p84,
  'triceps-elastico-acima': p85,
  'triceps-frances': p86,
  'triceps-frances-halter': p87,
  'triceps-frances-kettlebell': p88,
  'triceps-frances-polia-unilateral': p89,
  'triceps-suspensao': p90,
  'yt-suspensao': p91,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
