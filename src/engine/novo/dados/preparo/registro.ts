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
import p6 from './abducao-deitado-mini-band.json';
import p7 from './abducao-elastico.json';
import p8 from './abducao-mini-band.json';
import p9 from './abertura-elastico.json';
import p10 from './abertura-t-deitado.json';
import p11 from './aducao-caneleira.json';
import p12 from './aducao-deitado.json';
import p13 from './afundo.json';
import p14 from './afundo-kettlebell.json';
import p15 from './afundo-peso-corpo.json';
import p16 from './afundo-tras.json';
import p17 from './afundo-tras-peso-corpo.json';
import p18 from './agachamento-elastico.json';
import p19 from './agachamento-halteres.json';
import p20 from './agachamento-peso-corpo.json';
import p21 from './barra-fixa.json';
import p22 from './barra-fixa-supinada.json';
import p23 from './bulgaro.json';
import p24 from './bulgaro-peso-corpo.json';
import p25 from './bulgaro-suspensao.json';
import p26 from './caminhada-lateral-mini-band.json';
import p27 from './coice-elastico.json';
import p28 from './crucifixo-elastico.json';
import p29 from './crucifixo-halteres.json';
import p30 from './crucifixo-inclinado-halteres.json';
import p31 from './crucifixo-inverso.json';
import p32 from './crucifixo-invertido-caneleira.json';
import p33 from './crucifixo-invertido-curvado.json';
import p34 from './crucifixo-invertido-polia.json';
import p35 from './crucifixo-invertido-sentado.json';
import p36 from './crucifixo-polia.json';
import p37 from './desenvolvimento.json';
import p38 from './desenvolvimento-elastico.json';
import p39 from './desenvolvimento-em-pe-halteres.json';
import p40 from './desenvolvimento-unilateral.json';
import p41 from './desenvolvimento-unilateral-kettlebell.json';
import p42 from './elevacao-halteres.json';
import p43 from './elevacao-joelhos.json';
import p44 from './elevacao-joelhos-paralelas.json';
import p45 from './elevacao-lateral.json';
import p46 from './elevacao-lateral-elastico.json';
import p47 from './elevacao-lateral-unilateral.json';
import p48 from './elevacao-lateral-unilateral-elastico.json';
import p49 from './extensao-joelho-caneleira.json';
import p50 from './extensao-joelho-elastico.json';
import p51 from './extensao-joelho-mini-band.json';
import p52 from './extensao-triceps-peso-corpo.json';
import p53 from './face-pull.json';
import p54 from './face-pull-elastico.json';
import p55 from './flexao.json';
import p56 from './flexao-bola.json';
import p57 from './flexao-elastico.json';
import p58 from './flexao-fechada.json';
import p59 from './flexao-joelho-deslizante.json';
import p60 from './flexao-joelho-elastico.json';
import p61 from './flexao-joelho-suspensao.json';
import p62 from './flexao-pes-elevados.json';
import p63 from './goblet.json';
import p64 from './goblet-kettlebell.json';
import p65 from './nordico.json';
import p66 from './panturrilha.json';
import p67 from './panturrilha-b.json';
import p68 from './panturrilha-chao.json';
import p69 from './panturrilha-degrau.json';
import p70 from './panturrilha-sentada-halter.json';
import p71 from './pike.json';
import p72 from './ponte-gluteo.json';
import p73 from './ponte-gluteo-halter.json';
import p74 from './ponte-kettlebell.json';
import p75 from './ponte-pes-bola.json';
import p76 from './puxada-elastico.json';
import p77 from './puxada-unilateral.json';
import p78 from './remada-apoiada.json';
import p79 from './remada-baixa.json';
import p80 from './remada-curvada-elastico.json';
import p81 from './remada-curvada-halteres.json';
import p82 from './remada-elastico.json';
import p83 from './remada-suspensao.json';
import p84 from './remada-unilateral.json';
import p85 from './remada-unilateral-elastico.json';
import p86 from './remada-unilateral-kettlebell.json';
import p87 from './remada-unilateral-polia.json';
import p88 from './remada-unilateral-sem-banco.json';
import p89 from './roda-abdominal.json';
import p90 from './rosca-alternada.json';
import p91 from './rosca-concentrada.json';
import p92 from './rosca-elastico.json';
import p93 from './rosca-inclinada.json';
import p94 from './rosca-kettlebell.json';
import p95 from './rosca-martelo.json';
import p96 from './rosca-martelo-elastico.json';
import p97 from './rosca-polia.json';
import p98 from './rosca-scott-banco-inclinado.json';
import p99 from './rosca-suspensao.json';
import p100 from './stiff.json';
import p101 from './stiff-elastico.json';
import p102 from './stiff-kettlebell.json';
import p103 from './stiff-unilateral.json';
import p104 from './stiff-unilateral-kettlebell.json';
import p105 from './supino-chao-halteres.json';
import p106 from './supino-inclinado.json';
import p107 from './supino-reto.json';
import p108 from './triceps-corda.json';
import p109 from './triceps-elastico-acima.json';
import p110 from './triceps-elastico-alto.json';
import p111 from './triceps-frances.json';
import p112 from './triceps-frances-halter.json';
import p113 from './triceps-frances-kettlebell.json';
import p114 from './triceps-frances-polia-unilateral.json';
import p115 from './triceps-frances-unilateral-halter.json';
import p116 from './triceps-suspensao.json';
import p117 from './triceps-testa-halteres.json';
import p118 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-invertido': p2,
  'abdominal-polia': p3,
  'abducao-caneleira': p4,
  'abducao-deitado': p5,
  'abducao-deitado-mini-band': p6,
  'abducao-elastico': p7,
  'abducao-mini-band': p8,
  'abertura-elastico': p9,
  'abertura-t-deitado': p10,
  'aducao-caneleira': p11,
  'aducao-deitado': p12,
  'afundo': p13,
  'afundo-kettlebell': p14,
  'afundo-peso-corpo': p15,
  'afundo-tras': p16,
  'afundo-tras-peso-corpo': p17,
  'agachamento-elastico': p18,
  'agachamento-halteres': p19,
  'agachamento-peso-corpo': p20,
  'barra-fixa': p21,
  'barra-fixa-supinada': p22,
  'bulgaro': p23,
  'bulgaro-peso-corpo': p24,
  'bulgaro-suspensao': p25,
  'caminhada-lateral-mini-band': p26,
  'coice-elastico': p27,
  'crucifixo-elastico': p28,
  'crucifixo-halteres': p29,
  'crucifixo-inclinado-halteres': p30,
  'crucifixo-inverso': p31,
  'crucifixo-invertido-caneleira': p32,
  'crucifixo-invertido-curvado': p33,
  'crucifixo-invertido-polia': p34,
  'crucifixo-invertido-sentado': p35,
  'crucifixo-polia': p36,
  'desenvolvimento': p37,
  'desenvolvimento-elastico': p38,
  'desenvolvimento-em-pe-halteres': p39,
  'desenvolvimento-unilateral': p40,
  'desenvolvimento-unilateral-kettlebell': p41,
  'elevacao-halteres': p42,
  'elevacao-joelhos': p43,
  'elevacao-joelhos-paralelas': p44,
  'elevacao-lateral': p45,
  'elevacao-lateral-elastico': p46,
  'elevacao-lateral-unilateral': p47,
  'elevacao-lateral-unilateral-elastico': p48,
  'extensao-joelho-caneleira': p49,
  'extensao-joelho-elastico': p50,
  'extensao-joelho-mini-band': p51,
  'extensao-triceps-peso-corpo': p52,
  'face-pull': p53,
  'face-pull-elastico': p54,
  'flexao': p55,
  'flexao-bola': p56,
  'flexao-elastico': p57,
  'flexao-fechada': p58,
  'flexao-joelho-deslizante': p59,
  'flexao-joelho-elastico': p60,
  'flexao-joelho-suspensao': p61,
  'flexao-pes-elevados': p62,
  'goblet': p63,
  'goblet-kettlebell': p64,
  'nordico': p65,
  'panturrilha': p66,
  'panturrilha-b': p67,
  'panturrilha-chao': p68,
  'panturrilha-degrau': p69,
  'panturrilha-sentada-halter': p70,
  'pike': p71,
  'ponte-gluteo': p72,
  'ponte-gluteo-halter': p73,
  'ponte-kettlebell': p74,
  'ponte-pes-bola': p75,
  'puxada-elastico': p76,
  'puxada-unilateral': p77,
  'remada-apoiada': p78,
  'remada-baixa': p79,
  'remada-curvada-elastico': p80,
  'remada-curvada-halteres': p81,
  'remada-elastico': p82,
  'remada-suspensao': p83,
  'remada-unilateral': p84,
  'remada-unilateral-elastico': p85,
  'remada-unilateral-kettlebell': p86,
  'remada-unilateral-polia': p87,
  'remada-unilateral-sem-banco': p88,
  'roda-abdominal': p89,
  'rosca-alternada': p90,
  'rosca-concentrada': p91,
  'rosca-elastico': p92,
  'rosca-inclinada': p93,
  'rosca-kettlebell': p94,
  'rosca-martelo': p95,
  'rosca-martelo-elastico': p96,
  'rosca-polia': p97,
  'rosca-scott-banco-inclinado': p98,
  'rosca-suspensao': p99,
  'stiff': p100,
  'stiff-elastico': p101,
  'stiff-kettlebell': p102,
  'stiff-unilateral': p103,
  'stiff-unilateral-kettlebell': p104,
  'supino-chao-halteres': p105,
  'supino-inclinado': p106,
  'supino-reto': p107,
  'triceps-corda': p108,
  'triceps-elastico-acima': p109,
  'triceps-elastico-alto': p110,
  'triceps-frances': p111,
  'triceps-frances-halter': p112,
  'triceps-frances-kettlebell': p113,
  'triceps-frances-polia-unilateral': p114,
  'triceps-frances-unilateral-halter': p115,
  'triceps-suspensao': p116,
  'triceps-testa-halteres': p117,
  'yt-suspensao': p118,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
