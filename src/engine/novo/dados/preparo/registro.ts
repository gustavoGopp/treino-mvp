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
import p14 from './aducao-maquina.json';
import p15 from './afundo.json';
import p16 from './afundo-kettlebell.json';
import p17 from './afundo-peso-corpo.json';
import p18 from './afundo-tras.json';
import p19 from './afundo-tras-peso-corpo.json';
import p20 from './agachamento-barra.json';
import p21 from './agachamento-elastico.json';
import p22 from './agachamento-halteres.json';
import p23 from './agachamento-peso-corpo.json';
import p24 from './agachamento-smith.json';
import p25 from './barra-fixa.json';
import p26 from './barra-fixa-negativa.json';
import p27 from './barra-fixa-supinada.json';
import p28 from './bulgaro.json';
import p29 from './bulgaro-peso-corpo.json';
import p30 from './bulgaro-suspensao.json';
import p31 from './cadeira-extensora.json';
import p32 from './cadeira-flexora.json';
import p33 from './caminhada-lateral-mini-band.json';
import p34 from './coice-caneleira.json';
import p35 from './coice-elastico.json';
import p36 from './crucifixo-elastico.json';
import p37 from './crucifixo-halteres.json';
import p38 from './crucifixo-inclinado-halteres.json';
import p39 from './crucifixo-inverso.json';
import p40 from './crucifixo-invertido-caneleira.json';
import p41 from './crucifixo-invertido-curvado.json';
import p42 from './crucifixo-invertido-polia.json';
import p43 from './crucifixo-invertido-sentado.json';
import p44 from './crucifixo-polia.json';
import p45 from './crucifixo-polia-baixo.json';
import p46 from './desenvolvimento.json';
import p47 from './desenvolvimento-barra.json';
import p48 from './desenvolvimento-elastico.json';
import p49 from './desenvolvimento-em-pe-halteres.json';
import p50 from './desenvolvimento-unilateral.json';
import p51 from './desenvolvimento-unilateral-kettlebell.json';
import p52 from './elevacao-halteres.json';
import p53 from './elevacao-joelhos.json';
import p54 from './elevacao-joelhos-paralelas.json';
import p55 from './elevacao-lateral.json';
import p56 from './elevacao-lateral-caneleira.json';
import p57 from './elevacao-lateral-deitado.json';
import p58 from './elevacao-lateral-elastico.json';
import p59 from './elevacao-lateral-unilateral.json';
import p60 from './elevacao-lateral-unilateral-elastico.json';
import p61 from './extensao-joelho-caneleira.json';
import p62 from './extensao-joelho-elastico.json';
import p63 from './extensao-joelho-mini-band.json';
import p64 from './extensao-triceps-peso-corpo.json';
import p65 from './face-pull.json';
import p66 from './face-pull-elastico.json';
import p67 from './face-pull-suspensao.json';
import p68 from './flexao.json';
import p69 from './flexao-bola.json';
import p70 from './flexao-elastico.json';
import p71 from './flexao-fechada.json';
import p72 from './flexao-joelho-deslizante.json';
import p73 from './flexao-joelho-elastico.json';
import p74 from './flexao-joelho-suspensao.json';
import p75 from './flexao-pes-elevados.json';
import p76 from './goblet.json';
import p77 from './goblet-kettlebell.json';
import p78 from './hip-thrust.json';
import p79 from './mergulho.json';
import p80 from './nordico.json';
import p81 from './panturrilha.json';
import p82 from './panturrilha-b.json';
import p83 from './panturrilha-chao.json';
import p84 from './panturrilha-degrau.json';
import p85 from './panturrilha-sentada-halter.json';
import p86 from './pike.json';
import p87 from './ponte-gluteo.json';
import p88 from './ponte-gluteo-halter.json';
import p89 from './ponte-kettlebell.json';
import p90 from './ponte-pes-bola.json';
import p91 from './pull-through.json';
import p92 from './puxada-barra-reta.json';
import p93 from './puxada-elastico.json';
import p94 from './puxada-unilateral.json';
import p95 from './remada-apoiada.json';
import p96 from './remada-baixa.json';
import p97 from './remada-barra.json';
import p98 from './remada-curvada-elastico.json';
import p99 from './remada-curvada-halteres.json';
import p100 from './remada-elastico.json';
import p101 from './remada-suspensao.json';
import p102 from './remada-unilateral.json';
import p103 from './remada-unilateral-elastico.json';
import p104 from './remada-unilateral-kettlebell.json';
import p105 from './remada-unilateral-polia.json';
import p106 from './remada-unilateral-sem-banco.json';
import p107 from './roda-abdominal.json';
import p108 from './rosca-alternada.json';
import p109 from './rosca-barra-w.json';
import p110 from './rosca-concentrada.json';
import p111 from './rosca-elastico.json';
import p112 from './rosca-inclinada.json';
import p113 from './rosca-kettlebell.json';
import p114 from './rosca-martelo.json';
import p115 from './rosca-martelo-elastico.json';
import p116 from './rosca-polia.json';
import p117 from './rosca-polia-costas.json';
import p118 from './rosca-scott-banco-inclinado.json';
import p119 from './rosca-suspensao.json';
import p120 from './stiff.json';
import p121 from './stiff-elastico.json';
import p122 from './stiff-kettlebell.json';
import p123 from './stiff-unilateral.json';
import p124 from './stiff-unilateral-kettlebell.json';
import p125 from './supino-barra.json';
import p126 from './supino-chao-halteres.json';
import p127 from './supino-inclinado.json';
import p128 from './supino-inclinado-polia.json';
import p129 from './supino-polia.json';
import p130 from './supino-reto.json';
import p131 from './supino-smith.json';
import p132 from './terra-hexagonal.json';
import p133 from './terra-romeno-barra.json';
import p134 from './triceps-barra-reta.json';
import p135 from './triceps-corda.json';
import p136 from './triceps-elastico-acima.json';
import p137 from './triceps-elastico-alto.json';
import p138 from './triceps-frances.json';
import p139 from './triceps-frances-halter.json';
import p140 from './triceps-frances-kettlebell.json';
import p141 from './triceps-frances-polia-unilateral.json';
import p142 from './triceps-frances-unilateral-halter.json';
import p143 from './triceps-suspensao.json';
import p144 from './triceps-testa-halteres.json';
import p145 from './yt-suspensao.json';

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
  'aducao-maquina': p14,
  'afundo': p15,
  'afundo-kettlebell': p16,
  'afundo-peso-corpo': p17,
  'afundo-tras': p18,
  'afundo-tras-peso-corpo': p19,
  'agachamento-barra': p20,
  'agachamento-elastico': p21,
  'agachamento-halteres': p22,
  'agachamento-peso-corpo': p23,
  'agachamento-smith': p24,
  'barra-fixa': p25,
  'barra-fixa-negativa': p26,
  'barra-fixa-supinada': p27,
  'bulgaro': p28,
  'bulgaro-peso-corpo': p29,
  'bulgaro-suspensao': p30,
  'cadeira-extensora': p31,
  'cadeira-flexora': p32,
  'caminhada-lateral-mini-band': p33,
  'coice-caneleira': p34,
  'coice-elastico': p35,
  'crucifixo-elastico': p36,
  'crucifixo-halteres': p37,
  'crucifixo-inclinado-halteres': p38,
  'crucifixo-inverso': p39,
  'crucifixo-invertido-caneleira': p40,
  'crucifixo-invertido-curvado': p41,
  'crucifixo-invertido-polia': p42,
  'crucifixo-invertido-sentado': p43,
  'crucifixo-polia': p44,
  'crucifixo-polia-baixo': p45,
  'desenvolvimento': p46,
  'desenvolvimento-barra': p47,
  'desenvolvimento-elastico': p48,
  'desenvolvimento-em-pe-halteres': p49,
  'desenvolvimento-unilateral': p50,
  'desenvolvimento-unilateral-kettlebell': p51,
  'elevacao-halteres': p52,
  'elevacao-joelhos': p53,
  'elevacao-joelhos-paralelas': p54,
  'elevacao-lateral': p55,
  'elevacao-lateral-caneleira': p56,
  'elevacao-lateral-deitado': p57,
  'elevacao-lateral-elastico': p58,
  'elevacao-lateral-unilateral': p59,
  'elevacao-lateral-unilateral-elastico': p60,
  'extensao-joelho-caneleira': p61,
  'extensao-joelho-elastico': p62,
  'extensao-joelho-mini-band': p63,
  'extensao-triceps-peso-corpo': p64,
  'face-pull': p65,
  'face-pull-elastico': p66,
  'face-pull-suspensao': p67,
  'flexao': p68,
  'flexao-bola': p69,
  'flexao-elastico': p70,
  'flexao-fechada': p71,
  'flexao-joelho-deslizante': p72,
  'flexao-joelho-elastico': p73,
  'flexao-joelho-suspensao': p74,
  'flexao-pes-elevados': p75,
  'goblet': p76,
  'goblet-kettlebell': p77,
  'hip-thrust': p78,
  'mergulho': p79,
  'nordico': p80,
  'panturrilha': p81,
  'panturrilha-b': p82,
  'panturrilha-chao': p83,
  'panturrilha-degrau': p84,
  'panturrilha-sentada-halter': p85,
  'pike': p86,
  'ponte-gluteo': p87,
  'ponte-gluteo-halter': p88,
  'ponte-kettlebell': p89,
  'ponte-pes-bola': p90,
  'pull-through': p91,
  'puxada-barra-reta': p92,
  'puxada-elastico': p93,
  'puxada-unilateral': p94,
  'remada-apoiada': p95,
  'remada-baixa': p96,
  'remada-barra': p97,
  'remada-curvada-elastico': p98,
  'remada-curvada-halteres': p99,
  'remada-elastico': p100,
  'remada-suspensao': p101,
  'remada-unilateral': p102,
  'remada-unilateral-elastico': p103,
  'remada-unilateral-kettlebell': p104,
  'remada-unilateral-polia': p105,
  'remada-unilateral-sem-banco': p106,
  'roda-abdominal': p107,
  'rosca-alternada': p108,
  'rosca-barra-w': p109,
  'rosca-concentrada': p110,
  'rosca-elastico': p111,
  'rosca-inclinada': p112,
  'rosca-kettlebell': p113,
  'rosca-martelo': p114,
  'rosca-martelo-elastico': p115,
  'rosca-polia': p116,
  'rosca-polia-costas': p117,
  'rosca-scott-banco-inclinado': p118,
  'rosca-suspensao': p119,
  'stiff': p120,
  'stiff-elastico': p121,
  'stiff-kettlebell': p122,
  'stiff-unilateral': p123,
  'stiff-unilateral-kettlebell': p124,
  'supino-barra': p125,
  'supino-chao-halteres': p126,
  'supino-inclinado': p127,
  'supino-inclinado-polia': p128,
  'supino-polia': p129,
  'supino-reto': p130,
  'supino-smith': p131,
  'terra-hexagonal': p132,
  'terra-romeno-barra': p133,
  'triceps-barra-reta': p134,
  'triceps-corda': p135,
  'triceps-elastico-acima': p136,
  'triceps-elastico-alto': p137,
  'triceps-frances': p138,
  'triceps-frances-halter': p139,
  'triceps-frances-kettlebell': p140,
  'triceps-frances-polia-unilateral': p141,
  'triceps-frances-unilateral-halter': p142,
  'triceps-suspensao': p143,
  'triceps-testa-halteres': p144,
  'yt-suspensao': p145,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
