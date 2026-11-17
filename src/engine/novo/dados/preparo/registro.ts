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
import p30 from './crucifixo-invertido-polia.json';
import p31 from './crucifixo-polia.json';
import p32 from './desenvolvimento.json';
import p33 from './desenvolvimento-elastico.json';
import p34 from './desenvolvimento-unilateral-kettlebell.json';
import p35 from './elevacao-halteres.json';
import p36 from './elevacao-joelhos.json';
import p37 from './elevacao-joelhos-paralelas.json';
import p38 from './elevacao-lateral.json';
import p39 from './elevacao-lateral-elastico.json';
import p40 from './elevacao-lateral-unilateral-elastico.json';
import p41 from './extensao-joelho-caneleira.json';
import p42 from './extensao-joelho-elastico.json';
import p43 from './extensao-joelho-mini-band.json';
import p44 from './extensao-triceps-peso-corpo.json';
import p45 from './face-pull.json';
import p46 from './face-pull-elastico.json';
import p47 from './flexao.json';
import p48 from './flexao-bola.json';
import p49 from './flexao-elastico.json';
import p50 from './flexao-fechada.json';
import p51 from './flexao-joelho-deslizante.json';
import p52 from './flexao-joelho-elastico.json';
import p53 from './flexao-joelho-suspensao.json';
import p54 from './flexao-pes-elevados.json';
import p55 from './goblet.json';
import p56 from './nordico.json';
import p57 from './panturrilha.json';
import p58 from './panturrilha-b.json';
import p59 from './panturrilha-chao.json';
import p60 from './panturrilha-degrau.json';
import p61 from './panturrilha-sentada-halter.json';
import p62 from './pike.json';
import p63 from './ponte-gluteo.json';
import p64 from './ponte-gluteo-halter.json';
import p65 from './ponte-kettlebell.json';
import p66 from './ponte-pes-bola.json';
import p67 from './puxada-elastico.json';
import p68 from './puxada-unilateral.json';
import p69 from './remada-apoiada.json';
import p70 from './remada-baixa.json';
import p71 from './remada-curvada-elastico.json';
import p72 from './remada-curvada-halteres.json';
import p73 from './remada-elastico.json';
import p74 from './remada-suspensao.json';
import p75 from './remada-unilateral.json';
import p76 from './remada-unilateral-elastico.json';
import p77 from './remada-unilateral-kettlebell.json';
import p78 from './remada-unilateral-polia.json';
import p79 from './remada-unilateral-sem-banco.json';
import p80 from './roda-abdominal.json';
import p81 from './rosca-alternada.json';
import p82 from './rosca-elastico.json';
import p83 from './rosca-inclinada.json';
import p84 from './rosca-kettlebell.json';
import p85 from './rosca-martelo.json';
import p86 from './rosca-martelo-elastico.json';
import p87 from './rosca-polia.json';
import p88 from './rosca-scott-banco-inclinado.json';
import p89 from './rosca-suspensao.json';
import p90 from './stiff.json';
import p91 from './stiff-elastico.json';
import p92 from './stiff-kettlebell.json';
import p93 from './stiff-unilateral.json';
import p94 from './supino-chao-halteres.json';
import p95 from './supino-inclinado.json';
import p96 from './supino-reto.json';
import p97 from './triceps-corda.json';
import p98 from './triceps-elastico-acima.json';
import p99 from './triceps-elastico-alto.json';
import p100 from './triceps-frances.json';
import p101 from './triceps-frances-halter.json';
import p102 from './triceps-frances-kettlebell.json';
import p103 from './triceps-frances-polia-unilateral.json';
import p104 from './triceps-suspensao.json';
import p105 from './triceps-testa-halteres.json';
import p106 from './yt-suspensao.json';

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
  'crucifixo-invertido-polia': p30,
  'crucifixo-polia': p31,
  'desenvolvimento': p32,
  'desenvolvimento-elastico': p33,
  'desenvolvimento-unilateral-kettlebell': p34,
  'elevacao-halteres': p35,
  'elevacao-joelhos': p36,
  'elevacao-joelhos-paralelas': p37,
  'elevacao-lateral': p38,
  'elevacao-lateral-elastico': p39,
  'elevacao-lateral-unilateral-elastico': p40,
  'extensao-joelho-caneleira': p41,
  'extensao-joelho-elastico': p42,
  'extensao-joelho-mini-band': p43,
  'extensao-triceps-peso-corpo': p44,
  'face-pull': p45,
  'face-pull-elastico': p46,
  'flexao': p47,
  'flexao-bola': p48,
  'flexao-elastico': p49,
  'flexao-fechada': p50,
  'flexao-joelho-deslizante': p51,
  'flexao-joelho-elastico': p52,
  'flexao-joelho-suspensao': p53,
  'flexao-pes-elevados': p54,
  'goblet': p55,
  'nordico': p56,
  'panturrilha': p57,
  'panturrilha-b': p58,
  'panturrilha-chao': p59,
  'panturrilha-degrau': p60,
  'panturrilha-sentada-halter': p61,
  'pike': p62,
  'ponte-gluteo': p63,
  'ponte-gluteo-halter': p64,
  'ponte-kettlebell': p65,
  'ponte-pes-bola': p66,
  'puxada-elastico': p67,
  'puxada-unilateral': p68,
  'remada-apoiada': p69,
  'remada-baixa': p70,
  'remada-curvada-elastico': p71,
  'remada-curvada-halteres': p72,
  'remada-elastico': p73,
  'remada-suspensao': p74,
  'remada-unilateral': p75,
  'remada-unilateral-elastico': p76,
  'remada-unilateral-kettlebell': p77,
  'remada-unilateral-polia': p78,
  'remada-unilateral-sem-banco': p79,
  'roda-abdominal': p80,
  'rosca-alternada': p81,
  'rosca-elastico': p82,
  'rosca-inclinada': p83,
  'rosca-kettlebell': p84,
  'rosca-martelo': p85,
  'rosca-martelo-elastico': p86,
  'rosca-polia': p87,
  'rosca-scott-banco-inclinado': p88,
  'rosca-suspensao': p89,
  'stiff': p90,
  'stiff-elastico': p91,
  'stiff-kettlebell': p92,
  'stiff-unilateral': p93,
  'supino-chao-halteres': p94,
  'supino-inclinado': p95,
  'supino-reto': p96,
  'triceps-corda': p97,
  'triceps-elastico-acima': p98,
  'triceps-elastico-alto': p99,
  'triceps-frances': p100,
  'triceps-frances-halter': p101,
  'triceps-frances-kettlebell': p102,
  'triceps-frances-polia-unilateral': p103,
  'triceps-suspensao': p104,
  'triceps-testa-halteres': p105,
  'yt-suspensao': p106,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
