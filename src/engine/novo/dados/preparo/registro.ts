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
import p42 from './desenvolvimento-barra.json';
import p43 from './desenvolvimento-elastico.json';
import p44 from './desenvolvimento-em-pe-halteres.json';
import p45 from './desenvolvimento-unilateral.json';
import p46 from './desenvolvimento-unilateral-kettlebell.json';
import p47 from './elevacao-halteres.json';
import p48 from './elevacao-joelhos.json';
import p49 from './elevacao-joelhos-paralelas.json';
import p50 from './elevacao-lateral.json';
import p51 from './elevacao-lateral-caneleira.json';
import p52 from './elevacao-lateral-deitado.json';
import p53 from './elevacao-lateral-elastico.json';
import p54 from './elevacao-lateral-unilateral.json';
import p55 from './elevacao-lateral-unilateral-elastico.json';
import p56 from './extensao-joelho-caneleira.json';
import p57 from './extensao-joelho-elastico.json';
import p58 from './extensao-joelho-mini-band.json';
import p59 from './extensao-triceps-peso-corpo.json';
import p60 from './face-pull.json';
import p61 from './face-pull-elastico.json';
import p62 from './face-pull-suspensao.json';
import p63 from './flexao.json';
import p64 from './flexao-bola.json';
import p65 from './flexao-elastico.json';
import p66 from './flexao-fechada.json';
import p67 from './flexao-joelho-deslizante.json';
import p68 from './flexao-joelho-elastico.json';
import p69 from './flexao-joelho-suspensao.json';
import p70 from './flexao-pes-elevados.json';
import p71 from './goblet.json';
import p72 from './goblet-kettlebell.json';
import p73 from './hip-thrust.json';
import p74 from './mergulho.json';
import p75 from './nordico.json';
import p76 from './panturrilha.json';
import p77 from './panturrilha-b.json';
import p78 from './panturrilha-chao.json';
import p79 from './panturrilha-degrau.json';
import p80 from './panturrilha-sentada-halter.json';
import p81 from './pike.json';
import p82 from './ponte-gluteo.json';
import p83 from './ponte-gluteo-halter.json';
import p84 from './ponte-kettlebell.json';
import p85 from './ponte-pes-bola.json';
import p86 from './pull-through.json';
import p87 from './puxada-barra-reta.json';
import p88 from './puxada-elastico.json';
import p89 from './puxada-unilateral.json';
import p90 from './remada-apoiada.json';
import p91 from './remada-baixa.json';
import p92 from './remada-barra.json';
import p93 from './remada-curvada-elastico.json';
import p94 from './remada-curvada-halteres.json';
import p95 from './remada-elastico.json';
import p96 from './remada-suspensao.json';
import p97 from './remada-unilateral.json';
import p98 from './remada-unilateral-elastico.json';
import p99 from './remada-unilateral-kettlebell.json';
import p100 from './remada-unilateral-polia.json';
import p101 from './remada-unilateral-sem-banco.json';
import p102 from './roda-abdominal.json';
import p103 from './rosca-alternada.json';
import p104 from './rosca-barra-w.json';
import p105 from './rosca-concentrada.json';
import p106 from './rosca-elastico.json';
import p107 from './rosca-inclinada.json';
import p108 from './rosca-kettlebell.json';
import p109 from './rosca-martelo.json';
import p110 from './rosca-martelo-elastico.json';
import p111 from './rosca-polia.json';
import p112 from './rosca-polia-costas.json';
import p113 from './rosca-scott-banco-inclinado.json';
import p114 from './rosca-suspensao.json';
import p115 from './stiff.json';
import p116 from './stiff-elastico.json';
import p117 from './stiff-kettlebell.json';
import p118 from './stiff-unilateral.json';
import p119 from './stiff-unilateral-kettlebell.json';
import p120 from './supino-barra.json';
import p121 from './supino-chao-halteres.json';
import p122 from './supino-inclinado.json';
import p123 from './supino-inclinado-polia.json';
import p124 from './supino-polia.json';
import p125 from './supino-reto.json';
import p126 from './terra-hexagonal.json';
import p127 from './terra-romeno-barra.json';
import p128 from './triceps-barra-reta.json';
import p129 from './triceps-corda.json';
import p130 from './triceps-elastico-acima.json';
import p131 from './triceps-elastico-alto.json';
import p132 from './triceps-frances.json';
import p133 from './triceps-frances-halter.json';
import p134 from './triceps-frances-kettlebell.json';
import p135 from './triceps-frances-polia-unilateral.json';
import p136 from './triceps-frances-unilateral-halter.json';
import p137 from './triceps-suspensao.json';
import p138 from './triceps-testa-halteres.json';
import p139 from './yt-suspensao.json';

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
  'desenvolvimento-barra': p42,
  'desenvolvimento-elastico': p43,
  'desenvolvimento-em-pe-halteres': p44,
  'desenvolvimento-unilateral': p45,
  'desenvolvimento-unilateral-kettlebell': p46,
  'elevacao-halteres': p47,
  'elevacao-joelhos': p48,
  'elevacao-joelhos-paralelas': p49,
  'elevacao-lateral': p50,
  'elevacao-lateral-caneleira': p51,
  'elevacao-lateral-deitado': p52,
  'elevacao-lateral-elastico': p53,
  'elevacao-lateral-unilateral': p54,
  'elevacao-lateral-unilateral-elastico': p55,
  'extensao-joelho-caneleira': p56,
  'extensao-joelho-elastico': p57,
  'extensao-joelho-mini-band': p58,
  'extensao-triceps-peso-corpo': p59,
  'face-pull': p60,
  'face-pull-elastico': p61,
  'face-pull-suspensao': p62,
  'flexao': p63,
  'flexao-bola': p64,
  'flexao-elastico': p65,
  'flexao-fechada': p66,
  'flexao-joelho-deslizante': p67,
  'flexao-joelho-elastico': p68,
  'flexao-joelho-suspensao': p69,
  'flexao-pes-elevados': p70,
  'goblet': p71,
  'goblet-kettlebell': p72,
  'hip-thrust': p73,
  'mergulho': p74,
  'nordico': p75,
  'panturrilha': p76,
  'panturrilha-b': p77,
  'panturrilha-chao': p78,
  'panturrilha-degrau': p79,
  'panturrilha-sentada-halter': p80,
  'pike': p81,
  'ponte-gluteo': p82,
  'ponte-gluteo-halter': p83,
  'ponte-kettlebell': p84,
  'ponte-pes-bola': p85,
  'pull-through': p86,
  'puxada-barra-reta': p87,
  'puxada-elastico': p88,
  'puxada-unilateral': p89,
  'remada-apoiada': p90,
  'remada-baixa': p91,
  'remada-barra': p92,
  'remada-curvada-elastico': p93,
  'remada-curvada-halteres': p94,
  'remada-elastico': p95,
  'remada-suspensao': p96,
  'remada-unilateral': p97,
  'remada-unilateral-elastico': p98,
  'remada-unilateral-kettlebell': p99,
  'remada-unilateral-polia': p100,
  'remada-unilateral-sem-banco': p101,
  'roda-abdominal': p102,
  'rosca-alternada': p103,
  'rosca-barra-w': p104,
  'rosca-concentrada': p105,
  'rosca-elastico': p106,
  'rosca-inclinada': p107,
  'rosca-kettlebell': p108,
  'rosca-martelo': p109,
  'rosca-martelo-elastico': p110,
  'rosca-polia': p111,
  'rosca-polia-costas': p112,
  'rosca-scott-banco-inclinado': p113,
  'rosca-suspensao': p114,
  'stiff': p115,
  'stiff-elastico': p116,
  'stiff-kettlebell': p117,
  'stiff-unilateral': p118,
  'stiff-unilateral-kettlebell': p119,
  'supino-barra': p120,
  'supino-chao-halteres': p121,
  'supino-inclinado': p122,
  'supino-inclinado-polia': p123,
  'supino-polia': p124,
  'supino-reto': p125,
  'terra-hexagonal': p126,
  'terra-romeno-barra': p127,
  'triceps-barra-reta': p128,
  'triceps-corda': p129,
  'triceps-elastico-acima': p130,
  'triceps-elastico-alto': p131,
  'triceps-frances': p132,
  'triceps-frances-halter': p133,
  'triceps-frances-kettlebell': p134,
  'triceps-frances-polia-unilateral': p135,
  'triceps-frances-unilateral-halter': p136,
  'triceps-suspensao': p137,
  'triceps-testa-halteres': p138,
  'yt-suspensao': p139,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
