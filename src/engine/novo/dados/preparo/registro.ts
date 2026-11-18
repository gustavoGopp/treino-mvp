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
import p26 from './barra-fixa-graviton.json';
import p27 from './barra-fixa-negativa.json';
import p28 from './barra-fixa-supinada.json';
import p29 from './bulgaro.json';
import p30 from './bulgaro-peso-corpo.json';
import p31 from './bulgaro-suspensao.json';
import p32 from './cadeira-extensora.json';
import p33 from './cadeira-flexora.json';
import p34 from './caminhada-lateral-mini-band.json';
import p35 from './coice-caneleira.json';
import p36 from './coice-elastico.json';
import p37 from './coice-maquina.json';
import p38 from './crucifixo-elastico.json';
import p39 from './crucifixo-halteres.json';
import p40 from './crucifixo-inclinado-halteres.json';
import p41 from './crucifixo-inverso.json';
import p42 from './crucifixo-invertido-caneleira.json';
import p43 from './crucifixo-invertido-curvado.json';
import p44 from './crucifixo-invertido-polia.json';
import p45 from './crucifixo-invertido-sentado.json';
import p46 from './crucifixo-polia.json';
import p47 from './crucifixo-polia-baixo.json';
import p48 from './desenvolvimento.json';
import p49 from './desenvolvimento-barra.json';
import p50 from './desenvolvimento-elastico.json';
import p51 from './desenvolvimento-em-pe-halteres.json';
import p52 from './desenvolvimento-maquina.json';
import p53 from './desenvolvimento-unilateral.json';
import p54 from './desenvolvimento-unilateral-kettlebell.json';
import p55 from './elevacao-halteres.json';
import p56 from './elevacao-joelhos.json';
import p57 from './elevacao-joelhos-paralelas.json';
import p58 from './elevacao-lateral.json';
import p59 from './elevacao-lateral-caneleira.json';
import p60 from './elevacao-lateral-deitado.json';
import p61 from './elevacao-lateral-elastico.json';
import p62 from './elevacao-lateral-unilateral.json';
import p63 from './elevacao-lateral-unilateral-elastico.json';
import p64 from './extensao-joelho-caneleira.json';
import p65 from './extensao-joelho-elastico.json';
import p66 from './extensao-joelho-mini-band.json';
import p67 from './extensao-triceps-peso-corpo.json';
import p68 from './face-pull.json';
import p69 from './face-pull-elastico.json';
import p70 from './face-pull-suspensao.json';
import p71 from './flexao.json';
import p72 from './flexao-bola.json';
import p73 from './flexao-elastico.json';
import p74 from './flexao-fechada.json';
import p75 from './flexao-joelho-deslizante.json';
import p76 from './flexao-joelho-elastico.json';
import p77 from './flexao-joelho-suspensao.json';
import p78 from './flexao-pes-elevados.json';
import p79 from './goblet.json';
import p80 from './goblet-kettlebell.json';
import p81 from './hack.json';
import p82 from './hip-thrust.json';
import p83 from './leg-press.json';
import p84 from './mergulho.json';
import p85 from './mergulho-graviton.json';
import p86 from './mesa-flexora.json';
import p87 from './nordico.json';
import p88 from './panturrilha.json';
import p89 from './panturrilha-b.json';
import p90 from './panturrilha-chao.json';
import p91 from './panturrilha-degrau.json';
import p92 from './panturrilha-em-pe-maquina.json';
import p93 from './panturrilha-leg-press.json';
import p94 from './panturrilha-sentada.json';
import p95 from './panturrilha-sentada-halter.json';
import p96 from './pike.json';
import p97 from './ponte-gluteo.json';
import p98 from './ponte-gluteo-halter.json';
import p99 from './ponte-kettlebell.json';
import p100 from './ponte-pes-bola.json';
import p101 from './pull-through.json';
import p102 from './puxada-barra-reta.json';
import p103 from './puxada-elastico.json';
import p104 from './puxada-frente.json';
import p105 from './puxada-unilateral.json';
import p106 from './remada-apoiada.json';
import p107 from './remada-baixa.json';
import p108 from './remada-baixa-estacao.json';
import p109 from './remada-barra.json';
import p110 from './remada-curvada-elastico.json';
import p111 from './remada-curvada-halteres.json';
import p112 from './remada-elastico.json';
import p113 from './remada-suspensao.json';
import p114 from './remada-unilateral.json';
import p115 from './remada-unilateral-elastico.json';
import p116 from './remada-unilateral-kettlebell.json';
import p117 from './remada-unilateral-polia.json';
import p118 from './remada-unilateral-sem-banco.json';
import p119 from './roda-abdominal.json';
import p120 from './rosca-alternada.json';
import p121 from './rosca-barra-w.json';
import p122 from './rosca-concentrada.json';
import p123 from './rosca-elastico.json';
import p124 from './rosca-inclinada.json';
import p125 from './rosca-kettlebell.json';
import p126 from './rosca-martelo.json';
import p127 from './rosca-martelo-elastico.json';
import p128 from './rosca-polia.json';
import p129 from './rosca-polia-costas.json';
import p130 from './rosca-scott-banco-inclinado.json';
import p131 from './rosca-suspensao.json';
import p132 from './stiff.json';
import p133 from './stiff-elastico.json';
import p134 from './stiff-kettlebell.json';
import p135 from './stiff-unilateral.json';
import p136 from './stiff-unilateral-kettlebell.json';
import p137 from './supino-barra.json';
import p138 from './supino-chao-halteres.json';
import p139 from './supino-inclinado.json';
import p140 from './supino-inclinado-polia.json';
import p141 from './supino-maquina.json';
import p142 from './supino-polia.json';
import p143 from './supino-reto.json';
import p144 from './supino-smith.json';
import p145 from './terra-hexagonal.json';
import p146 from './terra-romeno-barra.json';
import p147 from './triceps-barra-reta.json';
import p148 from './triceps-corda.json';
import p149 from './triceps-elastico-acima.json';
import p150 from './triceps-elastico-alto.json';
import p151 from './triceps-frances.json';
import p152 from './triceps-frances-halter.json';
import p153 from './triceps-frances-kettlebell.json';
import p154 from './triceps-frances-polia-unilateral.json';
import p155 from './triceps-frances-unilateral-halter.json';
import p156 from './triceps-suspensao.json';
import p157 from './triceps-testa-halteres.json';
import p158 from './voador.json';
import p159 from './voador-invertido.json';
import p160 from './yt-suspensao.json';

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
  'barra-fixa-graviton': p26,
  'barra-fixa-negativa': p27,
  'barra-fixa-supinada': p28,
  'bulgaro': p29,
  'bulgaro-peso-corpo': p30,
  'bulgaro-suspensao': p31,
  'cadeira-extensora': p32,
  'cadeira-flexora': p33,
  'caminhada-lateral-mini-band': p34,
  'coice-caneleira': p35,
  'coice-elastico': p36,
  'coice-maquina': p37,
  'crucifixo-elastico': p38,
  'crucifixo-halteres': p39,
  'crucifixo-inclinado-halteres': p40,
  'crucifixo-inverso': p41,
  'crucifixo-invertido-caneleira': p42,
  'crucifixo-invertido-curvado': p43,
  'crucifixo-invertido-polia': p44,
  'crucifixo-invertido-sentado': p45,
  'crucifixo-polia': p46,
  'crucifixo-polia-baixo': p47,
  'desenvolvimento': p48,
  'desenvolvimento-barra': p49,
  'desenvolvimento-elastico': p50,
  'desenvolvimento-em-pe-halteres': p51,
  'desenvolvimento-maquina': p52,
  'desenvolvimento-unilateral': p53,
  'desenvolvimento-unilateral-kettlebell': p54,
  'elevacao-halteres': p55,
  'elevacao-joelhos': p56,
  'elevacao-joelhos-paralelas': p57,
  'elevacao-lateral': p58,
  'elevacao-lateral-caneleira': p59,
  'elevacao-lateral-deitado': p60,
  'elevacao-lateral-elastico': p61,
  'elevacao-lateral-unilateral': p62,
  'elevacao-lateral-unilateral-elastico': p63,
  'extensao-joelho-caneleira': p64,
  'extensao-joelho-elastico': p65,
  'extensao-joelho-mini-band': p66,
  'extensao-triceps-peso-corpo': p67,
  'face-pull': p68,
  'face-pull-elastico': p69,
  'face-pull-suspensao': p70,
  'flexao': p71,
  'flexao-bola': p72,
  'flexao-elastico': p73,
  'flexao-fechada': p74,
  'flexao-joelho-deslizante': p75,
  'flexao-joelho-elastico': p76,
  'flexao-joelho-suspensao': p77,
  'flexao-pes-elevados': p78,
  'goblet': p79,
  'goblet-kettlebell': p80,
  'hack': p81,
  'hip-thrust': p82,
  'leg-press': p83,
  'mergulho': p84,
  'mergulho-graviton': p85,
  'mesa-flexora': p86,
  'nordico': p87,
  'panturrilha': p88,
  'panturrilha-b': p89,
  'panturrilha-chao': p90,
  'panturrilha-degrau': p91,
  'panturrilha-em-pe-maquina': p92,
  'panturrilha-leg-press': p93,
  'panturrilha-sentada': p94,
  'panturrilha-sentada-halter': p95,
  'pike': p96,
  'ponte-gluteo': p97,
  'ponte-gluteo-halter': p98,
  'ponte-kettlebell': p99,
  'ponte-pes-bola': p100,
  'pull-through': p101,
  'puxada-barra-reta': p102,
  'puxada-elastico': p103,
  'puxada-frente': p104,
  'puxada-unilateral': p105,
  'remada-apoiada': p106,
  'remada-baixa': p107,
  'remada-baixa-estacao': p108,
  'remada-barra': p109,
  'remada-curvada-elastico': p110,
  'remada-curvada-halteres': p111,
  'remada-elastico': p112,
  'remada-suspensao': p113,
  'remada-unilateral': p114,
  'remada-unilateral-elastico': p115,
  'remada-unilateral-kettlebell': p116,
  'remada-unilateral-polia': p117,
  'remada-unilateral-sem-banco': p118,
  'roda-abdominal': p119,
  'rosca-alternada': p120,
  'rosca-barra-w': p121,
  'rosca-concentrada': p122,
  'rosca-elastico': p123,
  'rosca-inclinada': p124,
  'rosca-kettlebell': p125,
  'rosca-martelo': p126,
  'rosca-martelo-elastico': p127,
  'rosca-polia': p128,
  'rosca-polia-costas': p129,
  'rosca-scott-banco-inclinado': p130,
  'rosca-suspensao': p131,
  'stiff': p132,
  'stiff-elastico': p133,
  'stiff-kettlebell': p134,
  'stiff-unilateral': p135,
  'stiff-unilateral-kettlebell': p136,
  'supino-barra': p137,
  'supino-chao-halteres': p138,
  'supino-inclinado': p139,
  'supino-inclinado-polia': p140,
  'supino-maquina': p141,
  'supino-polia': p142,
  'supino-reto': p143,
  'supino-smith': p144,
  'terra-hexagonal': p145,
  'terra-romeno-barra': p146,
  'triceps-barra-reta': p147,
  'triceps-corda': p148,
  'triceps-elastico-acima': p149,
  'triceps-elastico-alto': p150,
  'triceps-frances': p151,
  'triceps-frances-halter': p152,
  'triceps-frances-kettlebell': p153,
  'triceps-frances-polia-unilateral': p154,
  'triceps-frances-unilateral-halter': p155,
  'triceps-suspensao': p156,
  'triceps-testa-halteres': p157,
  'voador': p158,
  'voador-invertido': p159,
  'yt-suspensao': p160,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
