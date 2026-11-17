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
import p32 from './crucifixo-invertido-polia.json';
import p33 from './crucifixo-polia.json';
import p34 from './desenvolvimento.json';
import p35 from './desenvolvimento-elastico.json';
import p36 from './desenvolvimento-unilateral-kettlebell.json';
import p37 from './elevacao-halteres.json';
import p38 from './elevacao-joelhos.json';
import p39 from './elevacao-joelhos-paralelas.json';
import p40 from './elevacao-lateral.json';
import p41 from './elevacao-lateral-elastico.json';
import p42 from './elevacao-lateral-unilateral-elastico.json';
import p43 from './extensao-joelho-caneleira.json';
import p44 from './extensao-joelho-elastico.json';
import p45 from './extensao-joelho-mini-band.json';
import p46 from './extensao-triceps-peso-corpo.json';
import p47 from './face-pull.json';
import p48 from './face-pull-elastico.json';
import p49 from './flexao.json';
import p50 from './flexao-bola.json';
import p51 from './flexao-elastico.json';
import p52 from './flexao-fechada.json';
import p53 from './flexao-joelho-deslizante.json';
import p54 from './flexao-joelho-elastico.json';
import p55 from './flexao-joelho-suspensao.json';
import p56 from './flexao-pes-elevados.json';
import p57 from './goblet.json';
import p58 from './nordico.json';
import p59 from './panturrilha.json';
import p60 from './panturrilha-b.json';
import p61 from './panturrilha-chao.json';
import p62 from './panturrilha-degrau.json';
import p63 from './panturrilha-sentada-halter.json';
import p64 from './pike.json';
import p65 from './ponte-gluteo.json';
import p66 from './ponte-gluteo-halter.json';
import p67 from './ponte-kettlebell.json';
import p68 from './ponte-pes-bola.json';
import p69 from './puxada-elastico.json';
import p70 from './puxada-unilateral.json';
import p71 from './remada-apoiada.json';
import p72 from './remada-baixa.json';
import p73 from './remada-curvada-elastico.json';
import p74 from './remada-curvada-halteres.json';
import p75 from './remada-elastico.json';
import p76 from './remada-suspensao.json';
import p77 from './remada-unilateral.json';
import p78 from './remada-unilateral-elastico.json';
import p79 from './remada-unilateral-kettlebell.json';
import p80 from './remada-unilateral-polia.json';
import p81 from './remada-unilateral-sem-banco.json';
import p82 from './roda-abdominal.json';
import p83 from './rosca-alternada.json';
import p84 from './rosca-elastico.json';
import p85 from './rosca-inclinada.json';
import p86 from './rosca-kettlebell.json';
import p87 from './rosca-martelo.json';
import p88 from './rosca-martelo-elastico.json';
import p89 from './rosca-polia.json';
import p90 from './rosca-scott-banco-inclinado.json';
import p91 from './rosca-suspensao.json';
import p92 from './stiff.json';
import p93 from './stiff-elastico.json';
import p94 from './stiff-kettlebell.json';
import p95 from './stiff-unilateral.json';
import p96 from './supino-chao-halteres.json';
import p97 from './supino-inclinado.json';
import p98 from './supino-reto.json';
import p99 from './triceps-corda.json';
import p100 from './triceps-elastico-acima.json';
import p101 from './triceps-elastico-alto.json';
import p102 from './triceps-frances.json';
import p103 from './triceps-frances-halter.json';
import p104 from './triceps-frances-kettlebell.json';
import p105 from './triceps-frances-polia-unilateral.json';
import p106 from './triceps-suspensao.json';
import p107 from './triceps-testa-halteres.json';
import p108 from './yt-suspensao.json';

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
  'crucifixo-invertido-polia': p32,
  'crucifixo-polia': p33,
  'desenvolvimento': p34,
  'desenvolvimento-elastico': p35,
  'desenvolvimento-unilateral-kettlebell': p36,
  'elevacao-halteres': p37,
  'elevacao-joelhos': p38,
  'elevacao-joelhos-paralelas': p39,
  'elevacao-lateral': p40,
  'elevacao-lateral-elastico': p41,
  'elevacao-lateral-unilateral-elastico': p42,
  'extensao-joelho-caneleira': p43,
  'extensao-joelho-elastico': p44,
  'extensao-joelho-mini-band': p45,
  'extensao-triceps-peso-corpo': p46,
  'face-pull': p47,
  'face-pull-elastico': p48,
  'flexao': p49,
  'flexao-bola': p50,
  'flexao-elastico': p51,
  'flexao-fechada': p52,
  'flexao-joelho-deslizante': p53,
  'flexao-joelho-elastico': p54,
  'flexao-joelho-suspensao': p55,
  'flexao-pes-elevados': p56,
  'goblet': p57,
  'nordico': p58,
  'panturrilha': p59,
  'panturrilha-b': p60,
  'panturrilha-chao': p61,
  'panturrilha-degrau': p62,
  'panturrilha-sentada-halter': p63,
  'pike': p64,
  'ponte-gluteo': p65,
  'ponte-gluteo-halter': p66,
  'ponte-kettlebell': p67,
  'ponte-pes-bola': p68,
  'puxada-elastico': p69,
  'puxada-unilateral': p70,
  'remada-apoiada': p71,
  'remada-baixa': p72,
  'remada-curvada-elastico': p73,
  'remada-curvada-halteres': p74,
  'remada-elastico': p75,
  'remada-suspensao': p76,
  'remada-unilateral': p77,
  'remada-unilateral-elastico': p78,
  'remada-unilateral-kettlebell': p79,
  'remada-unilateral-polia': p80,
  'remada-unilateral-sem-banco': p81,
  'roda-abdominal': p82,
  'rosca-alternada': p83,
  'rosca-elastico': p84,
  'rosca-inclinada': p85,
  'rosca-kettlebell': p86,
  'rosca-martelo': p87,
  'rosca-martelo-elastico': p88,
  'rosca-polia': p89,
  'rosca-scott-banco-inclinado': p90,
  'rosca-suspensao': p91,
  'stiff': p92,
  'stiff-elastico': p93,
  'stiff-kettlebell': p94,
  'stiff-unilateral': p95,
  'supino-chao-halteres': p96,
  'supino-inclinado': p97,
  'supino-reto': p98,
  'triceps-corda': p99,
  'triceps-elastico-acima': p100,
  'triceps-elastico-alto': p101,
  'triceps-frances': p102,
  'triceps-frances-halter': p103,
  'triceps-frances-kettlebell': p104,
  'triceps-frances-polia-unilateral': p105,
  'triceps-suspensao': p106,
  'triceps-testa-halteres': p107,
  'yt-suspensao': p108,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
