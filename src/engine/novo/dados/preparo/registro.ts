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
import p18 from './agachamento-barra.json';
import p19 from './agachamento-elastico.json';
import p20 from './agachamento-halteres.json';
import p21 from './agachamento-peso-corpo.json';
import p22 from './agachamento-smith.json';
import p23 from './barra-fixa.json';
import p24 from './barra-fixa-negativa.json';
import p25 from './barra-fixa-supinada.json';
import p26 from './bulgaro.json';
import p27 from './bulgaro-peso-corpo.json';
import p28 from './bulgaro-suspensao.json';
import p29 from './caminhada-lateral-mini-band.json';
import p30 from './coice-caneleira.json';
import p31 from './coice-elastico.json';
import p32 from './crucifixo-elastico.json';
import p33 from './crucifixo-halteres.json';
import p34 from './crucifixo-inclinado-halteres.json';
import p35 from './crucifixo-inverso.json';
import p36 from './crucifixo-invertido-caneleira.json';
import p37 from './crucifixo-invertido-curvado.json';
import p38 from './crucifixo-invertido-polia.json';
import p39 from './crucifixo-invertido-sentado.json';
import p40 from './crucifixo-polia.json';
import p41 from './crucifixo-polia-baixo.json';
import p42 from './desenvolvimento.json';
import p43 from './desenvolvimento-barra.json';
import p44 from './desenvolvimento-elastico.json';
import p45 from './desenvolvimento-em-pe-halteres.json';
import p46 from './desenvolvimento-unilateral.json';
import p47 from './desenvolvimento-unilateral-kettlebell.json';
import p48 from './elevacao-halteres.json';
import p49 from './elevacao-joelhos.json';
import p50 from './elevacao-joelhos-paralelas.json';
import p51 from './elevacao-lateral.json';
import p52 from './elevacao-lateral-caneleira.json';
import p53 from './elevacao-lateral-deitado.json';
import p54 from './elevacao-lateral-elastico.json';
import p55 from './elevacao-lateral-unilateral.json';
import p56 from './elevacao-lateral-unilateral-elastico.json';
import p57 from './extensao-joelho-caneleira.json';
import p58 from './extensao-joelho-elastico.json';
import p59 from './extensao-joelho-mini-band.json';
import p60 from './extensao-triceps-peso-corpo.json';
import p61 from './face-pull.json';
import p62 from './face-pull-elastico.json';
import p63 from './face-pull-suspensao.json';
import p64 from './flexao.json';
import p65 from './flexao-bola.json';
import p66 from './flexao-elastico.json';
import p67 from './flexao-fechada.json';
import p68 from './flexao-joelho-deslizante.json';
import p69 from './flexao-joelho-elastico.json';
import p70 from './flexao-joelho-suspensao.json';
import p71 from './flexao-pes-elevados.json';
import p72 from './goblet.json';
import p73 from './goblet-kettlebell.json';
import p74 from './hip-thrust.json';
import p75 from './mergulho.json';
import p76 from './nordico.json';
import p77 from './panturrilha.json';
import p78 from './panturrilha-b.json';
import p79 from './panturrilha-chao.json';
import p80 from './panturrilha-degrau.json';
import p81 from './panturrilha-sentada-halter.json';
import p82 from './pike.json';
import p83 from './ponte-gluteo.json';
import p84 from './ponte-gluteo-halter.json';
import p85 from './ponte-kettlebell.json';
import p86 from './ponte-pes-bola.json';
import p87 from './pull-through.json';
import p88 from './puxada-barra-reta.json';
import p89 from './puxada-elastico.json';
import p90 from './puxada-unilateral.json';
import p91 from './remada-apoiada.json';
import p92 from './remada-baixa.json';
import p93 from './remada-barra.json';
import p94 from './remada-curvada-elastico.json';
import p95 from './remada-curvada-halteres.json';
import p96 from './remada-elastico.json';
import p97 from './remada-suspensao.json';
import p98 from './remada-unilateral.json';
import p99 from './remada-unilateral-elastico.json';
import p100 from './remada-unilateral-kettlebell.json';
import p101 from './remada-unilateral-polia.json';
import p102 from './remada-unilateral-sem-banco.json';
import p103 from './roda-abdominal.json';
import p104 from './rosca-alternada.json';
import p105 from './rosca-barra-w.json';
import p106 from './rosca-concentrada.json';
import p107 from './rosca-elastico.json';
import p108 from './rosca-inclinada.json';
import p109 from './rosca-kettlebell.json';
import p110 from './rosca-martelo.json';
import p111 from './rosca-martelo-elastico.json';
import p112 from './rosca-polia.json';
import p113 from './rosca-polia-costas.json';
import p114 from './rosca-scott-banco-inclinado.json';
import p115 from './rosca-suspensao.json';
import p116 from './stiff.json';
import p117 from './stiff-elastico.json';
import p118 from './stiff-kettlebell.json';
import p119 from './stiff-unilateral.json';
import p120 from './stiff-unilateral-kettlebell.json';
import p121 from './supino-barra.json';
import p122 from './supino-chao-halteres.json';
import p123 from './supino-inclinado.json';
import p124 from './supino-inclinado-polia.json';
import p125 from './supino-polia.json';
import p126 from './supino-reto.json';
import p127 from './supino-smith.json';
import p128 from './terra-hexagonal.json';
import p129 from './terra-romeno-barra.json';
import p130 from './triceps-barra-reta.json';
import p131 from './triceps-corda.json';
import p132 from './triceps-elastico-acima.json';
import p133 from './triceps-elastico-alto.json';
import p134 from './triceps-frances.json';
import p135 from './triceps-frances-halter.json';
import p136 from './triceps-frances-kettlebell.json';
import p137 from './triceps-frances-polia-unilateral.json';
import p138 from './triceps-frances-unilateral-halter.json';
import p139 from './triceps-suspensao.json';
import p140 from './triceps-testa-halteres.json';
import p141 from './yt-suspensao.json';

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
  'agachamento-barra': p18,
  'agachamento-elastico': p19,
  'agachamento-halteres': p20,
  'agachamento-peso-corpo': p21,
  'agachamento-smith': p22,
  'barra-fixa': p23,
  'barra-fixa-negativa': p24,
  'barra-fixa-supinada': p25,
  'bulgaro': p26,
  'bulgaro-peso-corpo': p27,
  'bulgaro-suspensao': p28,
  'caminhada-lateral-mini-band': p29,
  'coice-caneleira': p30,
  'coice-elastico': p31,
  'crucifixo-elastico': p32,
  'crucifixo-halteres': p33,
  'crucifixo-inclinado-halteres': p34,
  'crucifixo-inverso': p35,
  'crucifixo-invertido-caneleira': p36,
  'crucifixo-invertido-curvado': p37,
  'crucifixo-invertido-polia': p38,
  'crucifixo-invertido-sentado': p39,
  'crucifixo-polia': p40,
  'crucifixo-polia-baixo': p41,
  'desenvolvimento': p42,
  'desenvolvimento-barra': p43,
  'desenvolvimento-elastico': p44,
  'desenvolvimento-em-pe-halteres': p45,
  'desenvolvimento-unilateral': p46,
  'desenvolvimento-unilateral-kettlebell': p47,
  'elevacao-halteres': p48,
  'elevacao-joelhos': p49,
  'elevacao-joelhos-paralelas': p50,
  'elevacao-lateral': p51,
  'elevacao-lateral-caneleira': p52,
  'elevacao-lateral-deitado': p53,
  'elevacao-lateral-elastico': p54,
  'elevacao-lateral-unilateral': p55,
  'elevacao-lateral-unilateral-elastico': p56,
  'extensao-joelho-caneleira': p57,
  'extensao-joelho-elastico': p58,
  'extensao-joelho-mini-band': p59,
  'extensao-triceps-peso-corpo': p60,
  'face-pull': p61,
  'face-pull-elastico': p62,
  'face-pull-suspensao': p63,
  'flexao': p64,
  'flexao-bola': p65,
  'flexao-elastico': p66,
  'flexao-fechada': p67,
  'flexao-joelho-deslizante': p68,
  'flexao-joelho-elastico': p69,
  'flexao-joelho-suspensao': p70,
  'flexao-pes-elevados': p71,
  'goblet': p72,
  'goblet-kettlebell': p73,
  'hip-thrust': p74,
  'mergulho': p75,
  'nordico': p76,
  'panturrilha': p77,
  'panturrilha-b': p78,
  'panturrilha-chao': p79,
  'panturrilha-degrau': p80,
  'panturrilha-sentada-halter': p81,
  'pike': p82,
  'ponte-gluteo': p83,
  'ponte-gluteo-halter': p84,
  'ponte-kettlebell': p85,
  'ponte-pes-bola': p86,
  'pull-through': p87,
  'puxada-barra-reta': p88,
  'puxada-elastico': p89,
  'puxada-unilateral': p90,
  'remada-apoiada': p91,
  'remada-baixa': p92,
  'remada-barra': p93,
  'remada-curvada-elastico': p94,
  'remada-curvada-halteres': p95,
  'remada-elastico': p96,
  'remada-suspensao': p97,
  'remada-unilateral': p98,
  'remada-unilateral-elastico': p99,
  'remada-unilateral-kettlebell': p100,
  'remada-unilateral-polia': p101,
  'remada-unilateral-sem-banco': p102,
  'roda-abdominal': p103,
  'rosca-alternada': p104,
  'rosca-barra-w': p105,
  'rosca-concentrada': p106,
  'rosca-elastico': p107,
  'rosca-inclinada': p108,
  'rosca-kettlebell': p109,
  'rosca-martelo': p110,
  'rosca-martelo-elastico': p111,
  'rosca-polia': p112,
  'rosca-polia-costas': p113,
  'rosca-scott-banco-inclinado': p114,
  'rosca-suspensao': p115,
  'stiff': p116,
  'stiff-elastico': p117,
  'stiff-kettlebell': p118,
  'stiff-unilateral': p119,
  'stiff-unilateral-kettlebell': p120,
  'supino-barra': p121,
  'supino-chao-halteres': p122,
  'supino-inclinado': p123,
  'supino-inclinado-polia': p124,
  'supino-polia': p125,
  'supino-reto': p126,
  'supino-smith': p127,
  'terra-hexagonal': p128,
  'terra-romeno-barra': p129,
  'triceps-barra-reta': p130,
  'triceps-corda': p131,
  'triceps-elastico-acima': p132,
  'triceps-elastico-alto': p133,
  'triceps-frances': p134,
  'triceps-frances-halter': p135,
  'triceps-frances-kettlebell': p136,
  'triceps-frances-polia-unilateral': p137,
  'triceps-frances-unilateral-halter': p138,
  'triceps-suspensao': p139,
  'triceps-testa-halteres': p140,
  'yt-suspensao': p141,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
