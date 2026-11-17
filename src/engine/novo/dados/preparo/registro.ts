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
import p23 from './crucifixo-invertido-polia.json';
import p24 from './crucifixo-polia.json';
import p25 from './desenvolvimento.json';
import p26 from './desenvolvimento-elastico.json';
import p27 from './desenvolvimento-unilateral-kettlebell.json';
import p28 from './elevacao-halteres.json';
import p29 from './elevacao-joelhos.json';
import p30 from './elevacao-joelhos-paralelas.json';
import p31 from './elevacao-lateral.json';
import p32 from './elevacao-lateral-elastico.json';
import p33 from './extensao-joelho-caneleira.json';
import p34 from './extensao-joelho-elastico.json';
import p35 from './extensao-triceps-peso-corpo.json';
import p36 from './face-pull.json';
import p37 from './face-pull-elastico.json';
import p38 from './flexao.json';
import p39 from './flexao-bola.json';
import p40 from './flexao-elastico.json';
import p41 from './flexao-fechada.json';
import p42 from './flexao-joelho-deslizante.json';
import p43 from './flexao-joelho-elastico.json';
import p44 from './flexao-joelho-suspensao.json';
import p45 from './flexao-pes-elevados.json';
import p46 from './goblet.json';
import p47 from './nordico.json';
import p48 from './panturrilha.json';
import p49 from './panturrilha-b.json';
import p50 from './panturrilha-chao.json';
import p51 from './panturrilha-degrau.json';
import p52 from './panturrilha-sentada-halter.json';
import p53 from './pike.json';
import p54 from './ponte-gluteo.json';
import p55 from './ponte-gluteo-halter.json';
import p56 from './ponte-kettlebell.json';
import p57 from './ponte-pes-bola.json';
import p58 from './puxada-elastico.json';
import p59 from './puxada-unilateral.json';
import p60 from './remada-apoiada.json';
import p61 from './remada-baixa.json';
import p62 from './remada-curvada-halteres.json';
import p63 from './remada-elastico.json';
import p64 from './remada-suspensao.json';
import p65 from './remada-unilateral.json';
import p66 from './remada-unilateral-kettlebell.json';
import p67 from './remada-unilateral-polia.json';
import p68 from './remada-unilateral-sem-banco.json';
import p69 from './roda-abdominal.json';
import p70 from './rosca-alternada.json';
import p71 from './rosca-elastico.json';
import p72 from './rosca-inclinada.json';
import p73 from './rosca-kettlebell.json';
import p74 from './rosca-martelo.json';
import p75 from './rosca-polia.json';
import p76 from './rosca-suspensao.json';
import p77 from './stiff.json';
import p78 from './stiff-elastico.json';
import p79 from './stiff-kettlebell.json';
import p80 from './stiff-unilateral.json';
import p81 from './supino-inclinado.json';
import p82 from './supino-reto.json';
import p83 from './triceps-corda.json';
import p84 from './triceps-elastico-acima.json';
import p85 from './triceps-frances.json';
import p86 from './triceps-frances-halter.json';
import p87 from './triceps-frances-kettlebell.json';
import p88 from './triceps-frances-polia-unilateral.json';
import p89 from './triceps-suspensao.json';
import p90 from './yt-suspensao.json';

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
  'crucifixo-invertido-polia': p23,
  'crucifixo-polia': p24,
  'desenvolvimento': p25,
  'desenvolvimento-elastico': p26,
  'desenvolvimento-unilateral-kettlebell': p27,
  'elevacao-halteres': p28,
  'elevacao-joelhos': p29,
  'elevacao-joelhos-paralelas': p30,
  'elevacao-lateral': p31,
  'elevacao-lateral-elastico': p32,
  'extensao-joelho-caneleira': p33,
  'extensao-joelho-elastico': p34,
  'extensao-triceps-peso-corpo': p35,
  'face-pull': p36,
  'face-pull-elastico': p37,
  'flexao': p38,
  'flexao-bola': p39,
  'flexao-elastico': p40,
  'flexao-fechada': p41,
  'flexao-joelho-deslizante': p42,
  'flexao-joelho-elastico': p43,
  'flexao-joelho-suspensao': p44,
  'flexao-pes-elevados': p45,
  'goblet': p46,
  'nordico': p47,
  'panturrilha': p48,
  'panturrilha-b': p49,
  'panturrilha-chao': p50,
  'panturrilha-degrau': p51,
  'panturrilha-sentada-halter': p52,
  'pike': p53,
  'ponte-gluteo': p54,
  'ponte-gluteo-halter': p55,
  'ponte-kettlebell': p56,
  'ponte-pes-bola': p57,
  'puxada-elastico': p58,
  'puxada-unilateral': p59,
  'remada-apoiada': p60,
  'remada-baixa': p61,
  'remada-curvada-halteres': p62,
  'remada-elastico': p63,
  'remada-suspensao': p64,
  'remada-unilateral': p65,
  'remada-unilateral-kettlebell': p66,
  'remada-unilateral-polia': p67,
  'remada-unilateral-sem-banco': p68,
  'roda-abdominal': p69,
  'rosca-alternada': p70,
  'rosca-elastico': p71,
  'rosca-inclinada': p72,
  'rosca-kettlebell': p73,
  'rosca-martelo': p74,
  'rosca-polia': p75,
  'rosca-suspensao': p76,
  'stiff': p77,
  'stiff-elastico': p78,
  'stiff-kettlebell': p79,
  'stiff-unilateral': p80,
  'supino-inclinado': p81,
  'supino-reto': p82,
  'triceps-corda': p83,
  'triceps-elastico-acima': p84,
  'triceps-frances': p85,
  'triceps-frances-halter': p86,
  'triceps-frances-kettlebell': p87,
  'triceps-frances-polia-unilateral': p88,
  'triceps-suspensao': p89,
  'yt-suspensao': p90,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
