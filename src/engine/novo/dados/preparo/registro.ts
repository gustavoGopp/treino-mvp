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
import p32 from './crucifixo-invertido-curvado.json';
import p33 from './crucifixo-invertido-polia.json';
import p34 from './crucifixo-polia.json';
import p35 from './desenvolvimento.json';
import p36 from './desenvolvimento-elastico.json';
import p37 from './desenvolvimento-em-pe-halteres.json';
import p38 from './desenvolvimento-unilateral.json';
import p39 from './desenvolvimento-unilateral-kettlebell.json';
import p40 from './elevacao-halteres.json';
import p41 from './elevacao-joelhos.json';
import p42 from './elevacao-joelhos-paralelas.json';
import p43 from './elevacao-lateral.json';
import p44 from './elevacao-lateral-deitado.json';
import p45 from './elevacao-lateral-elastico.json';
import p46 from './elevacao-lateral-unilateral.json';
import p47 from './elevacao-lateral-unilateral-elastico.json';
import p48 from './extensao-joelho-caneleira.json';
import p49 from './extensao-joelho-elastico.json';
import p50 from './extensao-joelho-mini-band.json';
import p51 from './extensao-triceps-peso-corpo.json';
import p52 from './face-pull.json';
import p53 from './face-pull-elastico.json';
import p54 from './flexao.json';
import p55 from './flexao-bola.json';
import p56 from './flexao-elastico.json';
import p57 from './flexao-fechada.json';
import p58 from './flexao-joelho-deslizante.json';
import p59 from './flexao-joelho-elastico.json';
import p60 from './flexao-joelho-suspensao.json';
import p61 from './flexao-pes-elevados.json';
import p62 from './goblet.json';
import p63 from './goblet-kettlebell.json';
import p64 from './nordico.json';
import p65 from './panturrilha.json';
import p66 from './panturrilha-b.json';
import p67 from './panturrilha-chao.json';
import p68 from './panturrilha-degrau.json';
import p69 from './panturrilha-sentada-halter.json';
import p70 from './pike.json';
import p71 from './ponte-gluteo.json';
import p72 from './ponte-gluteo-halter.json';
import p73 from './ponte-kettlebell.json';
import p74 from './ponte-pes-bola.json';
import p75 from './puxada-elastico.json';
import p76 from './puxada-unilateral.json';
import p77 from './remada-apoiada.json';
import p78 from './remada-baixa.json';
import p79 from './remada-curvada-elastico.json';
import p80 from './remada-curvada-halteres.json';
import p81 from './remada-elastico.json';
import p82 from './remada-suspensao.json';
import p83 from './remada-unilateral.json';
import p84 from './remada-unilateral-elastico.json';
import p85 from './remada-unilateral-kettlebell.json';
import p86 from './remada-unilateral-polia.json';
import p87 from './remada-unilateral-sem-banco.json';
import p88 from './roda-abdominal.json';
import p89 from './rosca-alternada.json';
import p90 from './rosca-elastico.json';
import p91 from './rosca-inclinada.json';
import p92 from './rosca-kettlebell.json';
import p93 from './rosca-martelo.json';
import p94 from './rosca-martelo-elastico.json';
import p95 from './rosca-polia.json';
import p96 from './rosca-scott-banco-inclinado.json';
import p97 from './rosca-suspensao.json';
import p98 from './stiff.json';
import p99 from './stiff-elastico.json';
import p100 from './stiff-kettlebell.json';
import p101 from './stiff-unilateral.json';
import p102 from './stiff-unilateral-kettlebell.json';
import p103 from './supino-chao-halteres.json';
import p104 from './supino-inclinado.json';
import p105 from './supino-reto.json';
import p106 from './triceps-corda.json';
import p107 from './triceps-elastico-acima.json';
import p108 from './triceps-elastico-alto.json';
import p109 from './triceps-frances.json';
import p110 from './triceps-frances-halter.json';
import p111 from './triceps-frances-kettlebell.json';
import p112 from './triceps-frances-polia-unilateral.json';
import p113 from './triceps-frances-unilateral-halter.json';
import p114 from './triceps-suspensao.json';
import p115 from './triceps-testa-halteres.json';
import p116 from './yt-suspensao.json';

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
  'crucifixo-invertido-curvado': p32,
  'crucifixo-invertido-polia': p33,
  'crucifixo-polia': p34,
  'desenvolvimento': p35,
  'desenvolvimento-elastico': p36,
  'desenvolvimento-em-pe-halteres': p37,
  'desenvolvimento-unilateral': p38,
  'desenvolvimento-unilateral-kettlebell': p39,
  'elevacao-halteres': p40,
  'elevacao-joelhos': p41,
  'elevacao-joelhos-paralelas': p42,
  'elevacao-lateral': p43,
  'elevacao-lateral-deitado': p44,
  'elevacao-lateral-elastico': p45,
  'elevacao-lateral-unilateral': p46,
  'elevacao-lateral-unilateral-elastico': p47,
  'extensao-joelho-caneleira': p48,
  'extensao-joelho-elastico': p49,
  'extensao-joelho-mini-band': p50,
  'extensao-triceps-peso-corpo': p51,
  'face-pull': p52,
  'face-pull-elastico': p53,
  'flexao': p54,
  'flexao-bola': p55,
  'flexao-elastico': p56,
  'flexao-fechada': p57,
  'flexao-joelho-deslizante': p58,
  'flexao-joelho-elastico': p59,
  'flexao-joelho-suspensao': p60,
  'flexao-pes-elevados': p61,
  'goblet': p62,
  'goblet-kettlebell': p63,
  'nordico': p64,
  'panturrilha': p65,
  'panturrilha-b': p66,
  'panturrilha-chao': p67,
  'panturrilha-degrau': p68,
  'panturrilha-sentada-halter': p69,
  'pike': p70,
  'ponte-gluteo': p71,
  'ponte-gluteo-halter': p72,
  'ponte-kettlebell': p73,
  'ponte-pes-bola': p74,
  'puxada-elastico': p75,
  'puxada-unilateral': p76,
  'remada-apoiada': p77,
  'remada-baixa': p78,
  'remada-curvada-elastico': p79,
  'remada-curvada-halteres': p80,
  'remada-elastico': p81,
  'remada-suspensao': p82,
  'remada-unilateral': p83,
  'remada-unilateral-elastico': p84,
  'remada-unilateral-kettlebell': p85,
  'remada-unilateral-polia': p86,
  'remada-unilateral-sem-banco': p87,
  'roda-abdominal': p88,
  'rosca-alternada': p89,
  'rosca-elastico': p90,
  'rosca-inclinada': p91,
  'rosca-kettlebell': p92,
  'rosca-martelo': p93,
  'rosca-martelo-elastico': p94,
  'rosca-polia': p95,
  'rosca-scott-banco-inclinado': p96,
  'rosca-suspensao': p97,
  'stiff': p98,
  'stiff-elastico': p99,
  'stiff-kettlebell': p100,
  'stiff-unilateral': p101,
  'stiff-unilateral-kettlebell': p102,
  'supino-chao-halteres': p103,
  'supino-inclinado': p104,
  'supino-reto': p105,
  'triceps-corda': p106,
  'triceps-elastico-acima': p107,
  'triceps-elastico-alto': p108,
  'triceps-frances': p109,
  'triceps-frances-halter': p110,
  'triceps-frances-kettlebell': p111,
  'triceps-frances-polia-unilateral': p112,
  'triceps-frances-unilateral-halter': p113,
  'triceps-suspensao': p114,
  'triceps-testa-halteres': p115,
  'yt-suspensao': p116,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
