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
import p21 from './agachamento-smith.json';
import p22 from './barra-fixa.json';
import p23 from './barra-fixa-negativa.json';
import p24 from './barra-fixa-supinada.json';
import p25 from './bulgaro.json';
import p26 from './bulgaro-peso-corpo.json';
import p27 from './bulgaro-suspensao.json';
import p28 from './caminhada-lateral-mini-band.json';
import p29 from './coice-caneleira.json';
import p30 from './coice-elastico.json';
import p31 from './crucifixo-elastico.json';
import p32 from './crucifixo-halteres.json';
import p33 from './crucifixo-inclinado-halteres.json';
import p34 from './crucifixo-inverso.json';
import p35 from './crucifixo-invertido-caneleira.json';
import p36 from './crucifixo-invertido-curvado.json';
import p37 from './crucifixo-invertido-polia.json';
import p38 from './crucifixo-invertido-sentado.json';
import p39 from './crucifixo-polia.json';
import p40 from './crucifixo-polia-baixo.json';
import p41 from './desenvolvimento.json';
import p42 from './desenvolvimento-elastico.json';
import p43 from './desenvolvimento-em-pe-halteres.json';
import p44 from './desenvolvimento-unilateral.json';
import p45 from './desenvolvimento-unilateral-kettlebell.json';
import p46 from './elevacao-halteres.json';
import p47 from './elevacao-joelhos.json';
import p48 from './elevacao-joelhos-paralelas.json';
import p49 from './elevacao-lateral.json';
import p50 from './elevacao-lateral-caneleira.json';
import p51 from './elevacao-lateral-deitado.json';
import p52 from './elevacao-lateral-elastico.json';
import p53 from './elevacao-lateral-unilateral.json';
import p54 from './elevacao-lateral-unilateral-elastico.json';
import p55 from './extensao-joelho-caneleira.json';
import p56 from './extensao-joelho-elastico.json';
import p57 from './extensao-joelho-mini-band.json';
import p58 from './extensao-triceps-peso-corpo.json';
import p59 from './face-pull.json';
import p60 from './face-pull-elastico.json';
import p61 from './face-pull-suspensao.json';
import p62 from './flexao.json';
import p63 from './flexao-bola.json';
import p64 from './flexao-elastico.json';
import p65 from './flexao-fechada.json';
import p66 from './flexao-joelho-deslizante.json';
import p67 from './flexao-joelho-elastico.json';
import p68 from './flexao-joelho-suspensao.json';
import p69 from './flexao-pes-elevados.json';
import p70 from './goblet.json';
import p71 from './goblet-kettlebell.json';
import p72 from './mergulho.json';
import p73 from './nordico.json';
import p74 from './panturrilha.json';
import p75 from './panturrilha-b.json';
import p76 from './panturrilha-chao.json';
import p77 from './panturrilha-degrau.json';
import p78 from './panturrilha-sentada-halter.json';
import p79 from './pike.json';
import p80 from './ponte-gluteo.json';
import p81 from './ponte-gluteo-halter.json';
import p82 from './ponte-kettlebell.json';
import p83 from './ponte-pes-bola.json';
import p84 from './pull-through.json';
import p85 from './puxada-barra-reta.json';
import p86 from './puxada-elastico.json';
import p87 from './puxada-unilateral.json';
import p88 from './remada-apoiada.json';
import p89 from './remada-baixa.json';
import p90 from './remada-curvada-elastico.json';
import p91 from './remada-curvada-halteres.json';
import p92 from './remada-elastico.json';
import p93 from './remada-suspensao.json';
import p94 from './remada-unilateral.json';
import p95 from './remada-unilateral-elastico.json';
import p96 from './remada-unilateral-kettlebell.json';
import p97 from './remada-unilateral-polia.json';
import p98 from './remada-unilateral-sem-banco.json';
import p99 from './roda-abdominal.json';
import p100 from './rosca-alternada.json';
import p101 from './rosca-concentrada.json';
import p102 from './rosca-elastico.json';
import p103 from './rosca-inclinada.json';
import p104 from './rosca-kettlebell.json';
import p105 from './rosca-martelo.json';
import p106 from './rosca-martelo-elastico.json';
import p107 from './rosca-polia.json';
import p108 from './rosca-polia-costas.json';
import p109 from './rosca-scott-banco-inclinado.json';
import p110 from './rosca-suspensao.json';
import p111 from './stiff.json';
import p112 from './stiff-elastico.json';
import p113 from './stiff-kettlebell.json';
import p114 from './stiff-unilateral.json';
import p115 from './stiff-unilateral-kettlebell.json';
import p116 from './supino-chao-halteres.json';
import p117 from './supino-inclinado.json';
import p118 from './supino-inclinado-polia.json';
import p119 from './supino-polia.json';
import p120 from './supino-reto.json';
import p121 from './supino-smith.json';
import p122 from './triceps-barra-reta.json';
import p123 from './triceps-corda.json';
import p124 from './triceps-elastico-acima.json';
import p125 from './triceps-elastico-alto.json';
import p126 from './triceps-frances.json';
import p127 from './triceps-frances-halter.json';
import p128 from './triceps-frances-kettlebell.json';
import p129 from './triceps-frances-polia-unilateral.json';
import p130 from './triceps-frances-unilateral-halter.json';
import p131 from './triceps-suspensao.json';
import p132 from './triceps-testa-halteres.json';
import p133 from './yt-suspensao.json';

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
  'agachamento-smith': p21,
  'barra-fixa': p22,
  'barra-fixa-negativa': p23,
  'barra-fixa-supinada': p24,
  'bulgaro': p25,
  'bulgaro-peso-corpo': p26,
  'bulgaro-suspensao': p27,
  'caminhada-lateral-mini-band': p28,
  'coice-caneleira': p29,
  'coice-elastico': p30,
  'crucifixo-elastico': p31,
  'crucifixo-halteres': p32,
  'crucifixo-inclinado-halteres': p33,
  'crucifixo-inverso': p34,
  'crucifixo-invertido-caneleira': p35,
  'crucifixo-invertido-curvado': p36,
  'crucifixo-invertido-polia': p37,
  'crucifixo-invertido-sentado': p38,
  'crucifixo-polia': p39,
  'crucifixo-polia-baixo': p40,
  'desenvolvimento': p41,
  'desenvolvimento-elastico': p42,
  'desenvolvimento-em-pe-halteres': p43,
  'desenvolvimento-unilateral': p44,
  'desenvolvimento-unilateral-kettlebell': p45,
  'elevacao-halteres': p46,
  'elevacao-joelhos': p47,
  'elevacao-joelhos-paralelas': p48,
  'elevacao-lateral': p49,
  'elevacao-lateral-caneleira': p50,
  'elevacao-lateral-deitado': p51,
  'elevacao-lateral-elastico': p52,
  'elevacao-lateral-unilateral': p53,
  'elevacao-lateral-unilateral-elastico': p54,
  'extensao-joelho-caneleira': p55,
  'extensao-joelho-elastico': p56,
  'extensao-joelho-mini-band': p57,
  'extensao-triceps-peso-corpo': p58,
  'face-pull': p59,
  'face-pull-elastico': p60,
  'face-pull-suspensao': p61,
  'flexao': p62,
  'flexao-bola': p63,
  'flexao-elastico': p64,
  'flexao-fechada': p65,
  'flexao-joelho-deslizante': p66,
  'flexao-joelho-elastico': p67,
  'flexao-joelho-suspensao': p68,
  'flexao-pes-elevados': p69,
  'goblet': p70,
  'goblet-kettlebell': p71,
  'mergulho': p72,
  'nordico': p73,
  'panturrilha': p74,
  'panturrilha-b': p75,
  'panturrilha-chao': p76,
  'panturrilha-degrau': p77,
  'panturrilha-sentada-halter': p78,
  'pike': p79,
  'ponte-gluteo': p80,
  'ponte-gluteo-halter': p81,
  'ponte-kettlebell': p82,
  'ponte-pes-bola': p83,
  'pull-through': p84,
  'puxada-barra-reta': p85,
  'puxada-elastico': p86,
  'puxada-unilateral': p87,
  'remada-apoiada': p88,
  'remada-baixa': p89,
  'remada-curvada-elastico': p90,
  'remada-curvada-halteres': p91,
  'remada-elastico': p92,
  'remada-suspensao': p93,
  'remada-unilateral': p94,
  'remada-unilateral-elastico': p95,
  'remada-unilateral-kettlebell': p96,
  'remada-unilateral-polia': p97,
  'remada-unilateral-sem-banco': p98,
  'roda-abdominal': p99,
  'rosca-alternada': p100,
  'rosca-concentrada': p101,
  'rosca-elastico': p102,
  'rosca-inclinada': p103,
  'rosca-kettlebell': p104,
  'rosca-martelo': p105,
  'rosca-martelo-elastico': p106,
  'rosca-polia': p107,
  'rosca-polia-costas': p108,
  'rosca-scott-banco-inclinado': p109,
  'rosca-suspensao': p110,
  'stiff': p111,
  'stiff-elastico': p112,
  'stiff-kettlebell': p113,
  'stiff-unilateral': p114,
  'stiff-unilateral-kettlebell': p115,
  'supino-chao-halteres': p116,
  'supino-inclinado': p117,
  'supino-inclinado-polia': p118,
  'supino-polia': p119,
  'supino-reto': p120,
  'supino-smith': p121,
  'triceps-barra-reta': p122,
  'triceps-corda': p123,
  'triceps-elastico-acima': p124,
  'triceps-elastico-alto': p125,
  'triceps-frances': p126,
  'triceps-frances-halter': p127,
  'triceps-frances-kettlebell': p128,
  'triceps-frances-polia-unilateral': p129,
  'triceps-frances-unilateral-halter': p130,
  'triceps-suspensao': p131,
  'triceps-testa-halteres': p132,
  'yt-suspensao': p133,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
