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
import p36 from './coice-maquina.json';
import p37 from './crucifixo-elastico.json';
import p38 from './crucifixo-halteres.json';
import p39 from './crucifixo-inclinado-halteres.json';
import p40 from './crucifixo-inverso.json';
import p41 from './crucifixo-invertido-caneleira.json';
import p42 from './crucifixo-invertido-curvado.json';
import p43 from './crucifixo-invertido-polia.json';
import p44 from './crucifixo-invertido-sentado.json';
import p45 from './crucifixo-polia.json';
import p46 from './crucifixo-polia-baixo.json';
import p47 from './desenvolvimento.json';
import p48 from './desenvolvimento-barra.json';
import p49 from './desenvolvimento-elastico.json';
import p50 from './desenvolvimento-em-pe-halteres.json';
import p51 from './desenvolvimento-maquina.json';
import p52 from './desenvolvimento-unilateral.json';
import p53 from './desenvolvimento-unilateral-kettlebell.json';
import p54 from './elevacao-halteres.json';
import p55 from './elevacao-joelhos.json';
import p56 from './elevacao-joelhos-paralelas.json';
import p57 from './elevacao-lateral.json';
import p58 from './elevacao-lateral-caneleira.json';
import p59 from './elevacao-lateral-deitado.json';
import p60 from './elevacao-lateral-elastico.json';
import p61 from './elevacao-lateral-unilateral.json';
import p62 from './elevacao-lateral-unilateral-elastico.json';
import p63 from './extensao-joelho-caneleira.json';
import p64 from './extensao-joelho-elastico.json';
import p65 from './extensao-joelho-mini-band.json';
import p66 from './extensao-triceps-peso-corpo.json';
import p67 from './face-pull.json';
import p68 from './face-pull-elastico.json';
import p69 from './face-pull-suspensao.json';
import p70 from './flexao.json';
import p71 from './flexao-bola.json';
import p72 from './flexao-elastico.json';
import p73 from './flexao-fechada.json';
import p74 from './flexao-joelho-deslizante.json';
import p75 from './flexao-joelho-elastico.json';
import p76 from './flexao-joelho-suspensao.json';
import p77 from './flexao-pes-elevados.json';
import p78 from './goblet.json';
import p79 from './goblet-kettlebell.json';
import p80 from './hack.json';
import p81 from './hip-thrust.json';
import p82 from './leg-press.json';
import p83 from './mergulho.json';
import p84 from './mesa-flexora.json';
import p85 from './nordico.json';
import p86 from './panturrilha.json';
import p87 from './panturrilha-b.json';
import p88 from './panturrilha-chao.json';
import p89 from './panturrilha-degrau.json';
import p90 from './panturrilha-leg-press.json';
import p91 from './panturrilha-sentada-halter.json';
import p92 from './pike.json';
import p93 from './ponte-gluteo.json';
import p94 from './ponte-gluteo-halter.json';
import p95 from './ponte-kettlebell.json';
import p96 from './ponte-pes-bola.json';
import p97 from './pull-through.json';
import p98 from './puxada-barra-reta.json';
import p99 from './puxada-elastico.json';
import p100 from './puxada-frente.json';
import p101 from './puxada-unilateral.json';
import p102 from './remada-apoiada.json';
import p103 from './remada-baixa.json';
import p104 from './remada-baixa-estacao.json';
import p105 from './remada-barra.json';
import p106 from './remada-curvada-elastico.json';
import p107 from './remada-curvada-halteres.json';
import p108 from './remada-elastico.json';
import p109 from './remada-suspensao.json';
import p110 from './remada-unilateral.json';
import p111 from './remada-unilateral-elastico.json';
import p112 from './remada-unilateral-kettlebell.json';
import p113 from './remada-unilateral-polia.json';
import p114 from './remada-unilateral-sem-banco.json';
import p115 from './roda-abdominal.json';
import p116 from './rosca-alternada.json';
import p117 from './rosca-barra-w.json';
import p118 from './rosca-concentrada.json';
import p119 from './rosca-elastico.json';
import p120 from './rosca-inclinada.json';
import p121 from './rosca-kettlebell.json';
import p122 from './rosca-martelo.json';
import p123 from './rosca-martelo-elastico.json';
import p124 from './rosca-polia.json';
import p125 from './rosca-polia-costas.json';
import p126 from './rosca-scott-banco-inclinado.json';
import p127 from './rosca-suspensao.json';
import p128 from './stiff.json';
import p129 from './stiff-elastico.json';
import p130 from './stiff-kettlebell.json';
import p131 from './stiff-unilateral.json';
import p132 from './stiff-unilateral-kettlebell.json';
import p133 from './supino-barra.json';
import p134 from './supino-chao-halteres.json';
import p135 from './supino-inclinado.json';
import p136 from './supino-inclinado-polia.json';
import p137 from './supino-maquina.json';
import p138 from './supino-polia.json';
import p139 from './supino-reto.json';
import p140 from './supino-smith.json';
import p141 from './terra-hexagonal.json';
import p142 from './terra-romeno-barra.json';
import p143 from './triceps-barra-reta.json';
import p144 from './triceps-corda.json';
import p145 from './triceps-elastico-acima.json';
import p146 from './triceps-elastico-alto.json';
import p147 from './triceps-frances.json';
import p148 from './triceps-frances-halter.json';
import p149 from './triceps-frances-kettlebell.json';
import p150 from './triceps-frances-polia-unilateral.json';
import p151 from './triceps-frances-unilateral-halter.json';
import p152 from './triceps-suspensao.json';
import p153 from './triceps-testa-halteres.json';
import p154 from './yt-suspensao.json';

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
  'coice-maquina': p36,
  'crucifixo-elastico': p37,
  'crucifixo-halteres': p38,
  'crucifixo-inclinado-halteres': p39,
  'crucifixo-inverso': p40,
  'crucifixo-invertido-caneleira': p41,
  'crucifixo-invertido-curvado': p42,
  'crucifixo-invertido-polia': p43,
  'crucifixo-invertido-sentado': p44,
  'crucifixo-polia': p45,
  'crucifixo-polia-baixo': p46,
  'desenvolvimento': p47,
  'desenvolvimento-barra': p48,
  'desenvolvimento-elastico': p49,
  'desenvolvimento-em-pe-halteres': p50,
  'desenvolvimento-maquina': p51,
  'desenvolvimento-unilateral': p52,
  'desenvolvimento-unilateral-kettlebell': p53,
  'elevacao-halteres': p54,
  'elevacao-joelhos': p55,
  'elevacao-joelhos-paralelas': p56,
  'elevacao-lateral': p57,
  'elevacao-lateral-caneleira': p58,
  'elevacao-lateral-deitado': p59,
  'elevacao-lateral-elastico': p60,
  'elevacao-lateral-unilateral': p61,
  'elevacao-lateral-unilateral-elastico': p62,
  'extensao-joelho-caneleira': p63,
  'extensao-joelho-elastico': p64,
  'extensao-joelho-mini-band': p65,
  'extensao-triceps-peso-corpo': p66,
  'face-pull': p67,
  'face-pull-elastico': p68,
  'face-pull-suspensao': p69,
  'flexao': p70,
  'flexao-bola': p71,
  'flexao-elastico': p72,
  'flexao-fechada': p73,
  'flexao-joelho-deslizante': p74,
  'flexao-joelho-elastico': p75,
  'flexao-joelho-suspensao': p76,
  'flexao-pes-elevados': p77,
  'goblet': p78,
  'goblet-kettlebell': p79,
  'hack': p80,
  'hip-thrust': p81,
  'leg-press': p82,
  'mergulho': p83,
  'mesa-flexora': p84,
  'nordico': p85,
  'panturrilha': p86,
  'panturrilha-b': p87,
  'panturrilha-chao': p88,
  'panturrilha-degrau': p89,
  'panturrilha-leg-press': p90,
  'panturrilha-sentada-halter': p91,
  'pike': p92,
  'ponte-gluteo': p93,
  'ponte-gluteo-halter': p94,
  'ponte-kettlebell': p95,
  'ponte-pes-bola': p96,
  'pull-through': p97,
  'puxada-barra-reta': p98,
  'puxada-elastico': p99,
  'puxada-frente': p100,
  'puxada-unilateral': p101,
  'remada-apoiada': p102,
  'remada-baixa': p103,
  'remada-baixa-estacao': p104,
  'remada-barra': p105,
  'remada-curvada-elastico': p106,
  'remada-curvada-halteres': p107,
  'remada-elastico': p108,
  'remada-suspensao': p109,
  'remada-unilateral': p110,
  'remada-unilateral-elastico': p111,
  'remada-unilateral-kettlebell': p112,
  'remada-unilateral-polia': p113,
  'remada-unilateral-sem-banco': p114,
  'roda-abdominal': p115,
  'rosca-alternada': p116,
  'rosca-barra-w': p117,
  'rosca-concentrada': p118,
  'rosca-elastico': p119,
  'rosca-inclinada': p120,
  'rosca-kettlebell': p121,
  'rosca-martelo': p122,
  'rosca-martelo-elastico': p123,
  'rosca-polia': p124,
  'rosca-polia-costas': p125,
  'rosca-scott-banco-inclinado': p126,
  'rosca-suspensao': p127,
  'stiff': p128,
  'stiff-elastico': p129,
  'stiff-kettlebell': p130,
  'stiff-unilateral': p131,
  'stiff-unilateral-kettlebell': p132,
  'supino-barra': p133,
  'supino-chao-halteres': p134,
  'supino-inclinado': p135,
  'supino-inclinado-polia': p136,
  'supino-maquina': p137,
  'supino-polia': p138,
  'supino-reto': p139,
  'supino-smith': p140,
  'terra-hexagonal': p141,
  'terra-romeno-barra': p142,
  'triceps-barra-reta': p143,
  'triceps-corda': p144,
  'triceps-elastico-acima': p145,
  'triceps-elastico-alto': p146,
  'triceps-frances': p147,
  'triceps-frances-halter': p148,
  'triceps-frances-kettlebell': p149,
  'triceps-frances-polia-unilateral': p150,
  'triceps-frances-unilateral-halter': p151,
  'triceps-suspensao': p152,
  'triceps-testa-halteres': p153,
  'yt-suspensao': p154,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
