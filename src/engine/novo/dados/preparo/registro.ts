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
import p22 from './crucifixo-invertido-polia.json';
import p23 from './crucifixo-polia.json';
import p24 from './desenvolvimento.json';
import p25 from './desenvolvimento-elastico.json';
import p26 from './desenvolvimento-unilateral-kettlebell.json';
import p27 from './elevacao-halteres.json';
import p28 from './elevacao-joelhos.json';
import p29 from './elevacao-joelhos-paralelas.json';
import p30 from './elevacao-lateral.json';
import p31 from './elevacao-lateral-elastico.json';
import p32 from './extensao-joelho-caneleira.json';
import p33 from './extensao-joelho-elastico.json';
import p34 from './extensao-triceps-peso-corpo.json';
import p35 from './face-pull.json';
import p36 from './face-pull-elastico.json';
import p37 from './flexao.json';
import p38 from './flexao-bola.json';
import p39 from './flexao-elastico.json';
import p40 from './flexao-fechada.json';
import p41 from './flexao-joelho-deslizante.json';
import p42 from './flexao-joelho-elastico.json';
import p43 from './flexao-joelho-suspensao.json';
import p44 from './flexao-pes-elevados.json';
import p45 from './goblet.json';
import p46 from './nordico.json';
import p47 from './panturrilha.json';
import p48 from './panturrilha-b.json';
import p49 from './panturrilha-chao.json';
import p50 from './panturrilha-degrau.json';
import p51 from './panturrilha-sentada-halter.json';
import p52 from './pike.json';
import p53 from './ponte-gluteo.json';
import p54 from './ponte-gluteo-halter.json';
import p55 from './ponte-kettlebell.json';
import p56 from './ponte-pes-bola.json';
import p57 from './puxada-elastico.json';
import p58 from './puxada-unilateral.json';
import p59 from './remada-apoiada.json';
import p60 from './remada-baixa.json';
import p61 from './remada-curvada-halteres.json';
import p62 from './remada-elastico.json';
import p63 from './remada-suspensao.json';
import p64 from './remada-unilateral.json';
import p65 from './remada-unilateral-kettlebell.json';
import p66 from './remada-unilateral-polia.json';
import p67 from './remada-unilateral-sem-banco.json';
import p68 from './roda-abdominal.json';
import p69 from './rosca-alternada.json';
import p70 from './rosca-elastico.json';
import p71 from './rosca-inclinada.json';
import p72 from './rosca-kettlebell.json';
import p73 from './rosca-martelo.json';
import p74 from './rosca-polia.json';
import p75 from './rosca-suspensao.json';
import p76 from './stiff.json';
import p77 from './stiff-elastico.json';
import p78 from './stiff-kettlebell.json';
import p79 from './stiff-unilateral.json';
import p80 from './supino-inclinado.json';
import p81 from './supino-reto.json';
import p82 from './triceps-corda.json';
import p83 from './triceps-elastico-acima.json';
import p84 from './triceps-frances.json';
import p85 from './triceps-frances-halter.json';
import p86 from './triceps-frances-kettlebell.json';
import p87 from './triceps-frances-polia-unilateral.json';
import p88 from './triceps-suspensao.json';
import p89 from './yt-suspensao.json';

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
  'crucifixo-invertido-polia': p22,
  'crucifixo-polia': p23,
  'desenvolvimento': p24,
  'desenvolvimento-elastico': p25,
  'desenvolvimento-unilateral-kettlebell': p26,
  'elevacao-halteres': p27,
  'elevacao-joelhos': p28,
  'elevacao-joelhos-paralelas': p29,
  'elevacao-lateral': p30,
  'elevacao-lateral-elastico': p31,
  'extensao-joelho-caneleira': p32,
  'extensao-joelho-elastico': p33,
  'extensao-triceps-peso-corpo': p34,
  'face-pull': p35,
  'face-pull-elastico': p36,
  'flexao': p37,
  'flexao-bola': p38,
  'flexao-elastico': p39,
  'flexao-fechada': p40,
  'flexao-joelho-deslizante': p41,
  'flexao-joelho-elastico': p42,
  'flexao-joelho-suspensao': p43,
  'flexao-pes-elevados': p44,
  'goblet': p45,
  'nordico': p46,
  'panturrilha': p47,
  'panturrilha-b': p48,
  'panturrilha-chao': p49,
  'panturrilha-degrau': p50,
  'panturrilha-sentada-halter': p51,
  'pike': p52,
  'ponte-gluteo': p53,
  'ponte-gluteo-halter': p54,
  'ponte-kettlebell': p55,
  'ponte-pes-bola': p56,
  'puxada-elastico': p57,
  'puxada-unilateral': p58,
  'remada-apoiada': p59,
  'remada-baixa': p60,
  'remada-curvada-halteres': p61,
  'remada-elastico': p62,
  'remada-suspensao': p63,
  'remada-unilateral': p64,
  'remada-unilateral-kettlebell': p65,
  'remada-unilateral-polia': p66,
  'remada-unilateral-sem-banco': p67,
  'roda-abdominal': p68,
  'rosca-alternada': p69,
  'rosca-elastico': p70,
  'rosca-inclinada': p71,
  'rosca-kettlebell': p72,
  'rosca-martelo': p73,
  'rosca-polia': p74,
  'rosca-suspensao': p75,
  'stiff': p76,
  'stiff-elastico': p77,
  'stiff-kettlebell': p78,
  'stiff-unilateral': p79,
  'supino-inclinado': p80,
  'supino-reto': p81,
  'triceps-corda': p82,
  'triceps-elastico-acima': p83,
  'triceps-frances': p84,
  'triceps-frances-halter': p85,
  'triceps-frances-kettlebell': p86,
  'triceps-frances-polia-unilateral': p87,
  'triceps-suspensao': p88,
  'yt-suspensao': p89,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
