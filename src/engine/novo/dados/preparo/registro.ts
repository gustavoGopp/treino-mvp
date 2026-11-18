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
import p8 from './abducao-maquina.json';
import p9 from './abducao-mini-band.json';
import p10 from './abertura-elastico.json';
import p11 from './abertura-t-deitado.json';
import p12 from './aducao-caneleira.json';
import p13 from './aducao-deitado.json';
import p14 from './afundo.json';
import p15 from './afundo-kettlebell.json';
import p16 from './afundo-peso-corpo.json';
import p17 from './afundo-tras.json';
import p18 from './afundo-tras-peso-corpo.json';
import p19 from './agachamento-barra.json';
import p20 from './agachamento-elastico.json';
import p21 from './agachamento-halteres.json';
import p22 from './agachamento-peso-corpo.json';
import p23 from './agachamento-smith.json';
import p24 from './barra-fixa.json';
import p25 from './barra-fixa-negativa.json';
import p26 from './barra-fixa-supinada.json';
import p27 from './bulgaro.json';
import p28 from './bulgaro-peso-corpo.json';
import p29 from './bulgaro-suspensao.json';
import p30 from './caminhada-lateral-mini-band.json';
import p31 from './coice-caneleira.json';
import p32 from './coice-elastico.json';
import p33 from './crucifixo-elastico.json';
import p34 from './crucifixo-halteres.json';
import p35 from './crucifixo-inclinado-halteres.json';
import p36 from './crucifixo-inverso.json';
import p37 from './crucifixo-invertido-caneleira.json';
import p38 from './crucifixo-invertido-curvado.json';
import p39 from './crucifixo-invertido-polia.json';
import p40 from './crucifixo-invertido-sentado.json';
import p41 from './crucifixo-polia.json';
import p42 from './crucifixo-polia-baixo.json';
import p43 from './desenvolvimento.json';
import p44 from './desenvolvimento-barra.json';
import p45 from './desenvolvimento-elastico.json';
import p46 from './desenvolvimento-em-pe-halteres.json';
import p47 from './desenvolvimento-unilateral.json';
import p48 from './desenvolvimento-unilateral-kettlebell.json';
import p49 from './elevacao-halteres.json';
import p50 from './elevacao-joelhos.json';
import p51 from './elevacao-joelhos-paralelas.json';
import p52 from './elevacao-lateral.json';
import p53 from './elevacao-lateral-caneleira.json';
import p54 from './elevacao-lateral-deitado.json';
import p55 from './elevacao-lateral-elastico.json';
import p56 from './elevacao-lateral-unilateral.json';
import p57 from './elevacao-lateral-unilateral-elastico.json';
import p58 from './extensao-joelho-caneleira.json';
import p59 from './extensao-joelho-elastico.json';
import p60 from './extensao-joelho-mini-band.json';
import p61 from './extensao-triceps-peso-corpo.json';
import p62 from './face-pull.json';
import p63 from './face-pull-elastico.json';
import p64 from './face-pull-suspensao.json';
import p65 from './flexao.json';
import p66 from './flexao-bola.json';
import p67 from './flexao-elastico.json';
import p68 from './flexao-fechada.json';
import p69 from './flexao-joelho-deslizante.json';
import p70 from './flexao-joelho-elastico.json';
import p71 from './flexao-joelho-suspensao.json';
import p72 from './flexao-pes-elevados.json';
import p73 from './goblet.json';
import p74 from './goblet-kettlebell.json';
import p75 from './hip-thrust.json';
import p76 from './mergulho.json';
import p77 from './nordico.json';
import p78 from './panturrilha.json';
import p79 from './panturrilha-b.json';
import p80 from './panturrilha-chao.json';
import p81 from './panturrilha-degrau.json';
import p82 from './panturrilha-sentada-halter.json';
import p83 from './pike.json';
import p84 from './ponte-gluteo.json';
import p85 from './ponte-gluteo-halter.json';
import p86 from './ponte-kettlebell.json';
import p87 from './ponte-pes-bola.json';
import p88 from './pull-through.json';
import p89 from './puxada-barra-reta.json';
import p90 from './puxada-elastico.json';
import p91 from './puxada-unilateral.json';
import p92 from './remada-apoiada.json';
import p93 from './remada-baixa.json';
import p94 from './remada-barra.json';
import p95 from './remada-curvada-elastico.json';
import p96 from './remada-curvada-halteres.json';
import p97 from './remada-elastico.json';
import p98 from './remada-suspensao.json';
import p99 from './remada-unilateral.json';
import p100 from './remada-unilateral-elastico.json';
import p101 from './remada-unilateral-kettlebell.json';
import p102 from './remada-unilateral-polia.json';
import p103 from './remada-unilateral-sem-banco.json';
import p104 from './roda-abdominal.json';
import p105 from './rosca-alternada.json';
import p106 from './rosca-barra-w.json';
import p107 from './rosca-concentrada.json';
import p108 from './rosca-elastico.json';
import p109 from './rosca-inclinada.json';
import p110 from './rosca-kettlebell.json';
import p111 from './rosca-martelo.json';
import p112 from './rosca-martelo-elastico.json';
import p113 from './rosca-polia.json';
import p114 from './rosca-polia-costas.json';
import p115 from './rosca-scott-banco-inclinado.json';
import p116 from './rosca-suspensao.json';
import p117 from './stiff.json';
import p118 from './stiff-elastico.json';
import p119 from './stiff-kettlebell.json';
import p120 from './stiff-unilateral.json';
import p121 from './stiff-unilateral-kettlebell.json';
import p122 from './supino-barra.json';
import p123 from './supino-chao-halteres.json';
import p124 from './supino-inclinado.json';
import p125 from './supino-inclinado-polia.json';
import p126 from './supino-polia.json';
import p127 from './supino-reto.json';
import p128 from './supino-smith.json';
import p129 from './terra-hexagonal.json';
import p130 from './terra-romeno-barra.json';
import p131 from './triceps-barra-reta.json';
import p132 from './triceps-corda.json';
import p133 from './triceps-elastico-acima.json';
import p134 from './triceps-elastico-alto.json';
import p135 from './triceps-frances.json';
import p136 from './triceps-frances-halter.json';
import p137 from './triceps-frances-kettlebell.json';
import p138 from './triceps-frances-polia-unilateral.json';
import p139 from './triceps-frances-unilateral-halter.json';
import p140 from './triceps-suspensao.json';
import p141 from './triceps-testa-halteres.json';
import p142 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-invertido': p2,
  'abdominal-polia': p3,
  'abducao-caneleira': p4,
  'abducao-deitado': p5,
  'abducao-deitado-mini-band': p6,
  'abducao-elastico': p7,
  'abducao-maquina': p8,
  'abducao-mini-band': p9,
  'abertura-elastico': p10,
  'abertura-t-deitado': p11,
  'aducao-caneleira': p12,
  'aducao-deitado': p13,
  'afundo': p14,
  'afundo-kettlebell': p15,
  'afundo-peso-corpo': p16,
  'afundo-tras': p17,
  'afundo-tras-peso-corpo': p18,
  'agachamento-barra': p19,
  'agachamento-elastico': p20,
  'agachamento-halteres': p21,
  'agachamento-peso-corpo': p22,
  'agachamento-smith': p23,
  'barra-fixa': p24,
  'barra-fixa-negativa': p25,
  'barra-fixa-supinada': p26,
  'bulgaro': p27,
  'bulgaro-peso-corpo': p28,
  'bulgaro-suspensao': p29,
  'caminhada-lateral-mini-band': p30,
  'coice-caneleira': p31,
  'coice-elastico': p32,
  'crucifixo-elastico': p33,
  'crucifixo-halteres': p34,
  'crucifixo-inclinado-halteres': p35,
  'crucifixo-inverso': p36,
  'crucifixo-invertido-caneleira': p37,
  'crucifixo-invertido-curvado': p38,
  'crucifixo-invertido-polia': p39,
  'crucifixo-invertido-sentado': p40,
  'crucifixo-polia': p41,
  'crucifixo-polia-baixo': p42,
  'desenvolvimento': p43,
  'desenvolvimento-barra': p44,
  'desenvolvimento-elastico': p45,
  'desenvolvimento-em-pe-halteres': p46,
  'desenvolvimento-unilateral': p47,
  'desenvolvimento-unilateral-kettlebell': p48,
  'elevacao-halteres': p49,
  'elevacao-joelhos': p50,
  'elevacao-joelhos-paralelas': p51,
  'elevacao-lateral': p52,
  'elevacao-lateral-caneleira': p53,
  'elevacao-lateral-deitado': p54,
  'elevacao-lateral-elastico': p55,
  'elevacao-lateral-unilateral': p56,
  'elevacao-lateral-unilateral-elastico': p57,
  'extensao-joelho-caneleira': p58,
  'extensao-joelho-elastico': p59,
  'extensao-joelho-mini-band': p60,
  'extensao-triceps-peso-corpo': p61,
  'face-pull': p62,
  'face-pull-elastico': p63,
  'face-pull-suspensao': p64,
  'flexao': p65,
  'flexao-bola': p66,
  'flexao-elastico': p67,
  'flexao-fechada': p68,
  'flexao-joelho-deslizante': p69,
  'flexao-joelho-elastico': p70,
  'flexao-joelho-suspensao': p71,
  'flexao-pes-elevados': p72,
  'goblet': p73,
  'goblet-kettlebell': p74,
  'hip-thrust': p75,
  'mergulho': p76,
  'nordico': p77,
  'panturrilha': p78,
  'panturrilha-b': p79,
  'panturrilha-chao': p80,
  'panturrilha-degrau': p81,
  'panturrilha-sentada-halter': p82,
  'pike': p83,
  'ponte-gluteo': p84,
  'ponte-gluteo-halter': p85,
  'ponte-kettlebell': p86,
  'ponte-pes-bola': p87,
  'pull-through': p88,
  'puxada-barra-reta': p89,
  'puxada-elastico': p90,
  'puxada-unilateral': p91,
  'remada-apoiada': p92,
  'remada-baixa': p93,
  'remada-barra': p94,
  'remada-curvada-elastico': p95,
  'remada-curvada-halteres': p96,
  'remada-elastico': p97,
  'remada-suspensao': p98,
  'remada-unilateral': p99,
  'remada-unilateral-elastico': p100,
  'remada-unilateral-kettlebell': p101,
  'remada-unilateral-polia': p102,
  'remada-unilateral-sem-banco': p103,
  'roda-abdominal': p104,
  'rosca-alternada': p105,
  'rosca-barra-w': p106,
  'rosca-concentrada': p107,
  'rosca-elastico': p108,
  'rosca-inclinada': p109,
  'rosca-kettlebell': p110,
  'rosca-martelo': p111,
  'rosca-martelo-elastico': p112,
  'rosca-polia': p113,
  'rosca-polia-costas': p114,
  'rosca-scott-banco-inclinado': p115,
  'rosca-suspensao': p116,
  'stiff': p117,
  'stiff-elastico': p118,
  'stiff-kettlebell': p119,
  'stiff-unilateral': p120,
  'stiff-unilateral-kettlebell': p121,
  'supino-barra': p122,
  'supino-chao-halteres': p123,
  'supino-inclinado': p124,
  'supino-inclinado-polia': p125,
  'supino-polia': p126,
  'supino-reto': p127,
  'supino-smith': p128,
  'terra-hexagonal': p129,
  'terra-romeno-barra': p130,
  'triceps-barra-reta': p131,
  'triceps-corda': p132,
  'triceps-elastico-acima': p133,
  'triceps-elastico-alto': p134,
  'triceps-frances': p135,
  'triceps-frances-halter': p136,
  'triceps-frances-kettlebell': p137,
  'triceps-frances-polia-unilateral': p138,
  'triceps-frances-unilateral-halter': p139,
  'triceps-suspensao': p140,
  'triceps-testa-halteres': p141,
  'yt-suspensao': p142,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
