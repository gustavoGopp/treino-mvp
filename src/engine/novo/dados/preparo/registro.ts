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
import p50 from './desenvolvimento-maquina.json';
import p51 from './desenvolvimento-unilateral.json';
import p52 from './desenvolvimento-unilateral-kettlebell.json';
import p53 from './elevacao-halteres.json';
import p54 from './elevacao-joelhos.json';
import p55 from './elevacao-joelhos-paralelas.json';
import p56 from './elevacao-lateral.json';
import p57 from './elevacao-lateral-caneleira.json';
import p58 from './elevacao-lateral-deitado.json';
import p59 from './elevacao-lateral-elastico.json';
import p60 from './elevacao-lateral-unilateral.json';
import p61 from './elevacao-lateral-unilateral-elastico.json';
import p62 from './extensao-joelho-caneleira.json';
import p63 from './extensao-joelho-elastico.json';
import p64 from './extensao-joelho-mini-band.json';
import p65 from './extensao-triceps-peso-corpo.json';
import p66 from './face-pull.json';
import p67 from './face-pull-elastico.json';
import p68 from './face-pull-suspensao.json';
import p69 from './flexao.json';
import p70 from './flexao-bola.json';
import p71 from './flexao-elastico.json';
import p72 from './flexao-fechada.json';
import p73 from './flexao-joelho-deslizante.json';
import p74 from './flexao-joelho-elastico.json';
import p75 from './flexao-joelho-suspensao.json';
import p76 from './flexao-pes-elevados.json';
import p77 from './goblet.json';
import p78 from './goblet-kettlebell.json';
import p79 from './hip-thrust.json';
import p80 from './mergulho.json';
import p81 from './nordico.json';
import p82 from './panturrilha.json';
import p83 from './panturrilha-b.json';
import p84 from './panturrilha-chao.json';
import p85 from './panturrilha-degrau.json';
import p86 from './panturrilha-sentada-halter.json';
import p87 from './pike.json';
import p88 from './ponte-gluteo.json';
import p89 from './ponte-gluteo-halter.json';
import p90 from './ponte-kettlebell.json';
import p91 from './ponte-pes-bola.json';
import p92 from './pull-through.json';
import p93 from './puxada-barra-reta.json';
import p94 from './puxada-elastico.json';
import p95 from './puxada-unilateral.json';
import p96 from './remada-apoiada.json';
import p97 from './remada-baixa.json';
import p98 from './remada-barra.json';
import p99 from './remada-curvada-elastico.json';
import p100 from './remada-curvada-halteres.json';
import p101 from './remada-elastico.json';
import p102 from './remada-suspensao.json';
import p103 from './remada-unilateral.json';
import p104 from './remada-unilateral-elastico.json';
import p105 from './remada-unilateral-kettlebell.json';
import p106 from './remada-unilateral-polia.json';
import p107 from './remada-unilateral-sem-banco.json';
import p108 from './roda-abdominal.json';
import p109 from './rosca-alternada.json';
import p110 from './rosca-barra-w.json';
import p111 from './rosca-concentrada.json';
import p112 from './rosca-elastico.json';
import p113 from './rosca-inclinada.json';
import p114 from './rosca-kettlebell.json';
import p115 from './rosca-martelo.json';
import p116 from './rosca-martelo-elastico.json';
import p117 from './rosca-polia.json';
import p118 from './rosca-polia-costas.json';
import p119 from './rosca-scott-banco-inclinado.json';
import p120 from './rosca-suspensao.json';
import p121 from './stiff.json';
import p122 from './stiff-elastico.json';
import p123 from './stiff-kettlebell.json';
import p124 from './stiff-unilateral.json';
import p125 from './stiff-unilateral-kettlebell.json';
import p126 from './supino-barra.json';
import p127 from './supino-chao-halteres.json';
import p128 from './supino-inclinado.json';
import p129 from './supino-inclinado-polia.json';
import p130 from './supino-maquina.json';
import p131 from './supino-polia.json';
import p132 from './supino-reto.json';
import p133 from './supino-smith.json';
import p134 from './terra-hexagonal.json';
import p135 from './terra-romeno-barra.json';
import p136 from './triceps-barra-reta.json';
import p137 from './triceps-corda.json';
import p138 from './triceps-elastico-acima.json';
import p139 from './triceps-elastico-alto.json';
import p140 from './triceps-frances.json';
import p141 from './triceps-frances-halter.json';
import p142 from './triceps-frances-kettlebell.json';
import p143 from './triceps-frances-polia-unilateral.json';
import p144 from './triceps-frances-unilateral-halter.json';
import p145 from './triceps-suspensao.json';
import p146 from './triceps-testa-halteres.json';
import p147 from './yt-suspensao.json';

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
  'desenvolvimento-maquina': p50,
  'desenvolvimento-unilateral': p51,
  'desenvolvimento-unilateral-kettlebell': p52,
  'elevacao-halteres': p53,
  'elevacao-joelhos': p54,
  'elevacao-joelhos-paralelas': p55,
  'elevacao-lateral': p56,
  'elevacao-lateral-caneleira': p57,
  'elevacao-lateral-deitado': p58,
  'elevacao-lateral-elastico': p59,
  'elevacao-lateral-unilateral': p60,
  'elevacao-lateral-unilateral-elastico': p61,
  'extensao-joelho-caneleira': p62,
  'extensao-joelho-elastico': p63,
  'extensao-joelho-mini-band': p64,
  'extensao-triceps-peso-corpo': p65,
  'face-pull': p66,
  'face-pull-elastico': p67,
  'face-pull-suspensao': p68,
  'flexao': p69,
  'flexao-bola': p70,
  'flexao-elastico': p71,
  'flexao-fechada': p72,
  'flexao-joelho-deslizante': p73,
  'flexao-joelho-elastico': p74,
  'flexao-joelho-suspensao': p75,
  'flexao-pes-elevados': p76,
  'goblet': p77,
  'goblet-kettlebell': p78,
  'hip-thrust': p79,
  'mergulho': p80,
  'nordico': p81,
  'panturrilha': p82,
  'panturrilha-b': p83,
  'panturrilha-chao': p84,
  'panturrilha-degrau': p85,
  'panturrilha-sentada-halter': p86,
  'pike': p87,
  'ponte-gluteo': p88,
  'ponte-gluteo-halter': p89,
  'ponte-kettlebell': p90,
  'ponte-pes-bola': p91,
  'pull-through': p92,
  'puxada-barra-reta': p93,
  'puxada-elastico': p94,
  'puxada-unilateral': p95,
  'remada-apoiada': p96,
  'remada-baixa': p97,
  'remada-barra': p98,
  'remada-curvada-elastico': p99,
  'remada-curvada-halteres': p100,
  'remada-elastico': p101,
  'remada-suspensao': p102,
  'remada-unilateral': p103,
  'remada-unilateral-elastico': p104,
  'remada-unilateral-kettlebell': p105,
  'remada-unilateral-polia': p106,
  'remada-unilateral-sem-banco': p107,
  'roda-abdominal': p108,
  'rosca-alternada': p109,
  'rosca-barra-w': p110,
  'rosca-concentrada': p111,
  'rosca-elastico': p112,
  'rosca-inclinada': p113,
  'rosca-kettlebell': p114,
  'rosca-martelo': p115,
  'rosca-martelo-elastico': p116,
  'rosca-polia': p117,
  'rosca-polia-costas': p118,
  'rosca-scott-banco-inclinado': p119,
  'rosca-suspensao': p120,
  'stiff': p121,
  'stiff-elastico': p122,
  'stiff-kettlebell': p123,
  'stiff-unilateral': p124,
  'stiff-unilateral-kettlebell': p125,
  'supino-barra': p126,
  'supino-chao-halteres': p127,
  'supino-inclinado': p128,
  'supino-inclinado-polia': p129,
  'supino-maquina': p130,
  'supino-polia': p131,
  'supino-reto': p132,
  'supino-smith': p133,
  'terra-hexagonal': p134,
  'terra-romeno-barra': p135,
  'triceps-barra-reta': p136,
  'triceps-corda': p137,
  'triceps-elastico-acima': p138,
  'triceps-elastico-alto': p139,
  'triceps-frances': p140,
  'triceps-frances-halter': p141,
  'triceps-frances-kettlebell': p142,
  'triceps-frances-polia-unilateral': p143,
  'triceps-frances-unilateral-halter': p144,
  'triceps-suspensao': p145,
  'triceps-testa-halteres': p146,
  'yt-suspensao': p147,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
