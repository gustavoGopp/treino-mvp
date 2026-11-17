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
import p16 from './afundo-tras-peso-corpo.json';
import p17 from './agachamento-elastico.json';
import p18 from './agachamento-peso-corpo.json';
import p19 from './barra-fixa.json';
import p20 from './barra-fixa-supinada.json';
import p21 from './bulgaro.json';
import p22 from './bulgaro-peso-corpo.json';
import p23 from './bulgaro-suspensao.json';
import p24 from './caminhada-lateral-mini-band.json';
import p25 from './coice-elastico.json';
import p26 from './crucifixo-elastico.json';
import p27 from './crucifixo-halteres.json';
import p28 from './crucifixo-inclinado-halteres.json';
import p29 from './crucifixo-inverso.json';
import p30 from './crucifixo-invertido-curvado.json';
import p31 from './crucifixo-invertido-polia.json';
import p32 from './crucifixo-polia.json';
import p33 from './desenvolvimento.json';
import p34 from './desenvolvimento-elastico.json';
import p35 from './desenvolvimento-em-pe-halteres.json';
import p36 from './desenvolvimento-unilateral.json';
import p37 from './desenvolvimento-unilateral-kettlebell.json';
import p38 from './elevacao-halteres.json';
import p39 from './elevacao-joelhos.json';
import p40 from './elevacao-joelhos-paralelas.json';
import p41 from './elevacao-lateral.json';
import p42 from './elevacao-lateral-elastico.json';
import p43 from './elevacao-lateral-unilateral.json';
import p44 from './elevacao-lateral-unilateral-elastico.json';
import p45 from './extensao-joelho-caneleira.json';
import p46 from './extensao-joelho-elastico.json';
import p47 from './extensao-joelho-mini-band.json';
import p48 from './extensao-triceps-peso-corpo.json';
import p49 from './face-pull.json';
import p50 from './face-pull-elastico.json';
import p51 from './flexao.json';
import p52 from './flexao-bola.json';
import p53 from './flexao-elastico.json';
import p54 from './flexao-fechada.json';
import p55 from './flexao-joelho-deslizante.json';
import p56 from './flexao-joelho-elastico.json';
import p57 from './flexao-joelho-suspensao.json';
import p58 from './flexao-pes-elevados.json';
import p59 from './goblet.json';
import p60 from './nordico.json';
import p61 from './panturrilha.json';
import p62 from './panturrilha-b.json';
import p63 from './panturrilha-chao.json';
import p64 from './panturrilha-degrau.json';
import p65 from './panturrilha-sentada-halter.json';
import p66 from './pike.json';
import p67 from './ponte-gluteo.json';
import p68 from './ponte-gluteo-halter.json';
import p69 from './ponte-kettlebell.json';
import p70 from './ponte-pes-bola.json';
import p71 from './puxada-elastico.json';
import p72 from './puxada-unilateral.json';
import p73 from './remada-apoiada.json';
import p74 from './remada-baixa.json';
import p75 from './remada-curvada-elastico.json';
import p76 from './remada-curvada-halteres.json';
import p77 from './remada-elastico.json';
import p78 from './remada-suspensao.json';
import p79 from './remada-unilateral.json';
import p80 from './remada-unilateral-elastico.json';
import p81 from './remada-unilateral-kettlebell.json';
import p82 from './remada-unilateral-polia.json';
import p83 from './remada-unilateral-sem-banco.json';
import p84 from './roda-abdominal.json';
import p85 from './rosca-alternada.json';
import p86 from './rosca-elastico.json';
import p87 from './rosca-inclinada.json';
import p88 from './rosca-kettlebell.json';
import p89 from './rosca-martelo.json';
import p90 from './rosca-martelo-elastico.json';
import p91 from './rosca-polia.json';
import p92 from './rosca-scott-banco-inclinado.json';
import p93 from './rosca-suspensao.json';
import p94 from './stiff.json';
import p95 from './stiff-elastico.json';
import p96 from './stiff-kettlebell.json';
import p97 from './stiff-unilateral.json';
import p98 from './supino-chao-halteres.json';
import p99 from './supino-inclinado.json';
import p100 from './supino-reto.json';
import p101 from './triceps-corda.json';
import p102 from './triceps-elastico-acima.json';
import p103 from './triceps-elastico-alto.json';
import p104 from './triceps-frances.json';
import p105 from './triceps-frances-halter.json';
import p106 from './triceps-frances-kettlebell.json';
import p107 from './triceps-frances-polia-unilateral.json';
import p108 from './triceps-frances-unilateral-halter.json';
import p109 from './triceps-suspensao.json';
import p110 from './triceps-testa-halteres.json';
import p111 from './yt-suspensao.json';

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
  'afundo-tras-peso-corpo': p16,
  'agachamento-elastico': p17,
  'agachamento-peso-corpo': p18,
  'barra-fixa': p19,
  'barra-fixa-supinada': p20,
  'bulgaro': p21,
  'bulgaro-peso-corpo': p22,
  'bulgaro-suspensao': p23,
  'caminhada-lateral-mini-band': p24,
  'coice-elastico': p25,
  'crucifixo-elastico': p26,
  'crucifixo-halteres': p27,
  'crucifixo-inclinado-halteres': p28,
  'crucifixo-inverso': p29,
  'crucifixo-invertido-curvado': p30,
  'crucifixo-invertido-polia': p31,
  'crucifixo-polia': p32,
  'desenvolvimento': p33,
  'desenvolvimento-elastico': p34,
  'desenvolvimento-em-pe-halteres': p35,
  'desenvolvimento-unilateral': p36,
  'desenvolvimento-unilateral-kettlebell': p37,
  'elevacao-halteres': p38,
  'elevacao-joelhos': p39,
  'elevacao-joelhos-paralelas': p40,
  'elevacao-lateral': p41,
  'elevacao-lateral-elastico': p42,
  'elevacao-lateral-unilateral': p43,
  'elevacao-lateral-unilateral-elastico': p44,
  'extensao-joelho-caneleira': p45,
  'extensao-joelho-elastico': p46,
  'extensao-joelho-mini-band': p47,
  'extensao-triceps-peso-corpo': p48,
  'face-pull': p49,
  'face-pull-elastico': p50,
  'flexao': p51,
  'flexao-bola': p52,
  'flexao-elastico': p53,
  'flexao-fechada': p54,
  'flexao-joelho-deslizante': p55,
  'flexao-joelho-elastico': p56,
  'flexao-joelho-suspensao': p57,
  'flexao-pes-elevados': p58,
  'goblet': p59,
  'nordico': p60,
  'panturrilha': p61,
  'panturrilha-b': p62,
  'panturrilha-chao': p63,
  'panturrilha-degrau': p64,
  'panturrilha-sentada-halter': p65,
  'pike': p66,
  'ponte-gluteo': p67,
  'ponte-gluteo-halter': p68,
  'ponte-kettlebell': p69,
  'ponte-pes-bola': p70,
  'puxada-elastico': p71,
  'puxada-unilateral': p72,
  'remada-apoiada': p73,
  'remada-baixa': p74,
  'remada-curvada-elastico': p75,
  'remada-curvada-halteres': p76,
  'remada-elastico': p77,
  'remada-suspensao': p78,
  'remada-unilateral': p79,
  'remada-unilateral-elastico': p80,
  'remada-unilateral-kettlebell': p81,
  'remada-unilateral-polia': p82,
  'remada-unilateral-sem-banco': p83,
  'roda-abdominal': p84,
  'rosca-alternada': p85,
  'rosca-elastico': p86,
  'rosca-inclinada': p87,
  'rosca-kettlebell': p88,
  'rosca-martelo': p89,
  'rosca-martelo-elastico': p90,
  'rosca-polia': p91,
  'rosca-scott-banco-inclinado': p92,
  'rosca-suspensao': p93,
  'stiff': p94,
  'stiff-elastico': p95,
  'stiff-kettlebell': p96,
  'stiff-unilateral': p97,
  'supino-chao-halteres': p98,
  'supino-inclinado': p99,
  'supino-reto': p100,
  'triceps-corda': p101,
  'triceps-elastico-acima': p102,
  'triceps-elastico-alto': p103,
  'triceps-frances': p104,
  'triceps-frances-halter': p105,
  'triceps-frances-kettlebell': p106,
  'triceps-frances-polia-unilateral': p107,
  'triceps-frances-unilateral-halter': p108,
  'triceps-suspensao': p109,
  'triceps-testa-halteres': p110,
  'yt-suspensao': p111,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
