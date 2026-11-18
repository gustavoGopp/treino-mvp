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
import p27 from './coice-caneleira.json';
import p28 from './coice-elastico.json';
import p29 from './crucifixo-elastico.json';
import p30 from './crucifixo-halteres.json';
import p31 from './crucifixo-inclinado-halteres.json';
import p32 from './crucifixo-inverso.json';
import p33 from './crucifixo-invertido-caneleira.json';
import p34 from './crucifixo-invertido-curvado.json';
import p35 from './crucifixo-invertido-polia.json';
import p36 from './crucifixo-invertido-sentado.json';
import p37 from './crucifixo-polia.json';
import p38 from './desenvolvimento.json';
import p39 from './desenvolvimento-elastico.json';
import p40 from './desenvolvimento-em-pe-halteres.json';
import p41 from './desenvolvimento-unilateral.json';
import p42 from './desenvolvimento-unilateral-kettlebell.json';
import p43 from './elevacao-halteres.json';
import p44 from './elevacao-joelhos.json';
import p45 from './elevacao-joelhos-paralelas.json';
import p46 from './elevacao-lateral.json';
import p47 from './elevacao-lateral-caneleira.json';
import p48 from './elevacao-lateral-deitado.json';
import p49 from './elevacao-lateral-elastico.json';
import p50 from './elevacao-lateral-unilateral.json';
import p51 from './elevacao-lateral-unilateral-elastico.json';
import p52 from './extensao-joelho-caneleira.json';
import p53 from './extensao-joelho-elastico.json';
import p54 from './extensao-joelho-mini-band.json';
import p55 from './extensao-triceps-peso-corpo.json';
import p56 from './face-pull.json';
import p57 from './face-pull-elastico.json';
import p58 from './flexao.json';
import p59 from './flexao-bola.json';
import p60 from './flexao-elastico.json';
import p61 from './flexao-fechada.json';
import p62 from './flexao-joelho-deslizante.json';
import p63 from './flexao-joelho-elastico.json';
import p64 from './flexao-joelho-suspensao.json';
import p65 from './flexao-pes-elevados.json';
import p66 from './goblet.json';
import p67 from './goblet-kettlebell.json';
import p68 from './nordico.json';
import p69 from './panturrilha.json';
import p70 from './panturrilha-b.json';
import p71 from './panturrilha-chao.json';
import p72 from './panturrilha-degrau.json';
import p73 from './panturrilha-sentada-halter.json';
import p74 from './pike.json';
import p75 from './ponte-gluteo.json';
import p76 from './ponte-gluteo-halter.json';
import p77 from './ponte-kettlebell.json';
import p78 from './ponte-pes-bola.json';
import p79 from './pull-through.json';
import p80 from './puxada-barra-reta.json';
import p81 from './puxada-elastico.json';
import p82 from './puxada-unilateral.json';
import p83 from './remada-apoiada.json';
import p84 from './remada-baixa.json';
import p85 from './remada-curvada-elastico.json';
import p86 from './remada-curvada-halteres.json';
import p87 from './remada-elastico.json';
import p88 from './remada-suspensao.json';
import p89 from './remada-unilateral.json';
import p90 from './remada-unilateral-elastico.json';
import p91 from './remada-unilateral-kettlebell.json';
import p92 from './remada-unilateral-polia.json';
import p93 from './remada-unilateral-sem-banco.json';
import p94 from './roda-abdominal.json';
import p95 from './rosca-alternada.json';
import p96 from './rosca-concentrada.json';
import p97 from './rosca-elastico.json';
import p98 from './rosca-inclinada.json';
import p99 from './rosca-kettlebell.json';
import p100 from './rosca-martelo.json';
import p101 from './rosca-martelo-elastico.json';
import p102 from './rosca-polia.json';
import p103 from './rosca-polia-costas.json';
import p104 from './rosca-scott-banco-inclinado.json';
import p105 from './rosca-suspensao.json';
import p106 from './stiff.json';
import p107 from './stiff-elastico.json';
import p108 from './stiff-kettlebell.json';
import p109 from './stiff-unilateral.json';
import p110 from './stiff-unilateral-kettlebell.json';
import p111 from './supino-chao-halteres.json';
import p112 from './supino-inclinado.json';
import p113 from './supino-reto.json';
import p114 from './triceps-barra-reta.json';
import p115 from './triceps-corda.json';
import p116 from './triceps-elastico-acima.json';
import p117 from './triceps-elastico-alto.json';
import p118 from './triceps-frances.json';
import p119 from './triceps-frances-halter.json';
import p120 from './triceps-frances-kettlebell.json';
import p121 from './triceps-frances-polia-unilateral.json';
import p122 from './triceps-frances-unilateral-halter.json';
import p123 from './triceps-suspensao.json';
import p124 from './triceps-testa-halteres.json';
import p125 from './yt-suspensao.json';

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
  'coice-caneleira': p27,
  'coice-elastico': p28,
  'crucifixo-elastico': p29,
  'crucifixo-halteres': p30,
  'crucifixo-inclinado-halteres': p31,
  'crucifixo-inverso': p32,
  'crucifixo-invertido-caneleira': p33,
  'crucifixo-invertido-curvado': p34,
  'crucifixo-invertido-polia': p35,
  'crucifixo-invertido-sentado': p36,
  'crucifixo-polia': p37,
  'desenvolvimento': p38,
  'desenvolvimento-elastico': p39,
  'desenvolvimento-em-pe-halteres': p40,
  'desenvolvimento-unilateral': p41,
  'desenvolvimento-unilateral-kettlebell': p42,
  'elevacao-halteres': p43,
  'elevacao-joelhos': p44,
  'elevacao-joelhos-paralelas': p45,
  'elevacao-lateral': p46,
  'elevacao-lateral-caneleira': p47,
  'elevacao-lateral-deitado': p48,
  'elevacao-lateral-elastico': p49,
  'elevacao-lateral-unilateral': p50,
  'elevacao-lateral-unilateral-elastico': p51,
  'extensao-joelho-caneleira': p52,
  'extensao-joelho-elastico': p53,
  'extensao-joelho-mini-band': p54,
  'extensao-triceps-peso-corpo': p55,
  'face-pull': p56,
  'face-pull-elastico': p57,
  'flexao': p58,
  'flexao-bola': p59,
  'flexao-elastico': p60,
  'flexao-fechada': p61,
  'flexao-joelho-deslizante': p62,
  'flexao-joelho-elastico': p63,
  'flexao-joelho-suspensao': p64,
  'flexao-pes-elevados': p65,
  'goblet': p66,
  'goblet-kettlebell': p67,
  'nordico': p68,
  'panturrilha': p69,
  'panturrilha-b': p70,
  'panturrilha-chao': p71,
  'panturrilha-degrau': p72,
  'panturrilha-sentada-halter': p73,
  'pike': p74,
  'ponte-gluteo': p75,
  'ponte-gluteo-halter': p76,
  'ponte-kettlebell': p77,
  'ponte-pes-bola': p78,
  'pull-through': p79,
  'puxada-barra-reta': p80,
  'puxada-elastico': p81,
  'puxada-unilateral': p82,
  'remada-apoiada': p83,
  'remada-baixa': p84,
  'remada-curvada-elastico': p85,
  'remada-curvada-halteres': p86,
  'remada-elastico': p87,
  'remada-suspensao': p88,
  'remada-unilateral': p89,
  'remada-unilateral-elastico': p90,
  'remada-unilateral-kettlebell': p91,
  'remada-unilateral-polia': p92,
  'remada-unilateral-sem-banco': p93,
  'roda-abdominal': p94,
  'rosca-alternada': p95,
  'rosca-concentrada': p96,
  'rosca-elastico': p97,
  'rosca-inclinada': p98,
  'rosca-kettlebell': p99,
  'rosca-martelo': p100,
  'rosca-martelo-elastico': p101,
  'rosca-polia': p102,
  'rosca-polia-costas': p103,
  'rosca-scott-banco-inclinado': p104,
  'rosca-suspensao': p105,
  'stiff': p106,
  'stiff-elastico': p107,
  'stiff-kettlebell': p108,
  'stiff-unilateral': p109,
  'stiff-unilateral-kettlebell': p110,
  'supino-chao-halteres': p111,
  'supino-inclinado': p112,
  'supino-reto': p113,
  'triceps-barra-reta': p114,
  'triceps-corda': p115,
  'triceps-elastico-acima': p116,
  'triceps-elastico-alto': p117,
  'triceps-frances': p118,
  'triceps-frances-halter': p119,
  'triceps-frances-kettlebell': p120,
  'triceps-frances-polia-unilateral': p121,
  'triceps-frances-unilateral-halter': p122,
  'triceps-suspensao': p123,
  'triceps-testa-halteres': p124,
  'yt-suspensao': p125,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
