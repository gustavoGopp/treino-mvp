// Gerado por scripts/animacao-nova/preparo.mjs: não edite. Entrega ao motor, de uma vez, o que foi calculado de antemão
// para todos os exercícios (para os scripts e os testes; o app carrega o arquivo de cada exercício junto com ele).
import { registrarPreparo } from '../../preparo';
import type { Preparo } from '../../preparo';
import p0 from './abdominal-bola.json';
import p1 from './abdominal-chao.json';
import p2 from './abdominal-declinado.json';
import p3 from './abdominal-invertido.json';
import p4 from './abdominal-polia.json';
import p5 from './abducao-caneleira.json';
import p6 from './abducao-deitado.json';
import p7 from './abducao-deitado-mini-band.json';
import p8 from './abducao-elastico.json';
import p9 from './abducao-maquina.json';
import p10 from './abducao-mini-band.json';
import p11 from './abertura-elastico.json';
import p12 from './abertura-t-deitado.json';
import p13 from './aducao-caneleira.json';
import p14 from './aducao-deitado.json';
import p15 from './aducao-maquina.json';
import p16 from './afundo.json';
import p17 from './afundo-kettlebell.json';
import p18 from './afundo-peso-corpo.json';
import p19 from './afundo-tras.json';
import p20 from './afundo-tras-peso-corpo.json';
import p21 from './agachamento-barra.json';
import p22 from './agachamento-elastico.json';
import p23 from './agachamento-halteres.json';
import p24 from './agachamento-peso-corpo.json';
import p25 from './agachamento-smith.json';
import p26 from './barra-fixa.json';
import p27 from './barra-fixa-graviton.json';
import p28 from './barra-fixa-negativa.json';
import p29 from './barra-fixa-supinada.json';
import p30 from './bulgaro.json';
import p31 from './bulgaro-peso-corpo.json';
import p32 from './bulgaro-suspensao.json';
import p33 from './cadeira-extensora.json';
import p34 from './cadeira-flexora.json';
import p35 from './caminhada-lateral-mini-band.json';
import p36 from './coice-caneleira.json';
import p37 from './coice-elastico.json';
import p38 from './coice-maquina.json';
import p39 from './crucifixo-elastico.json';
import p40 from './crucifixo-halteres.json';
import p41 from './crucifixo-inclinado-halteres.json';
import p42 from './crucifixo-inverso.json';
import p43 from './crucifixo-invertido-caneleira.json';
import p44 from './crucifixo-invertido-curvado.json';
import p45 from './crucifixo-invertido-polia.json';
import p46 from './crucifixo-invertido-sentado.json';
import p47 from './crucifixo-polia.json';
import p48 from './crucifixo-polia-baixo.json';
import p49 from './desenvolvimento.json';
import p50 from './desenvolvimento-barra.json';
import p51 from './desenvolvimento-elastico.json';
import p52 from './desenvolvimento-em-pe-halteres.json';
import p53 from './desenvolvimento-maquina.json';
import p54 from './desenvolvimento-unilateral.json';
import p55 from './desenvolvimento-unilateral-kettlebell.json';
import p56 from './elevacao-halteres.json';
import p57 from './elevacao-joelhos.json';
import p58 from './elevacao-joelhos-paralelas.json';
import p59 from './elevacao-lateral.json';
import p60 from './elevacao-lateral-caneleira.json';
import p61 from './elevacao-lateral-deitado.json';
import p62 from './elevacao-lateral-elastico.json';
import p63 from './elevacao-lateral-unilateral.json';
import p64 from './elevacao-lateral-unilateral-elastico.json';
import p65 from './extensao-joelho-caneleira.json';
import p66 from './extensao-joelho-elastico.json';
import p67 from './extensao-joelho-mini-band.json';
import p68 from './extensao-triceps-peso-corpo.json';
import p69 from './face-pull.json';
import p70 from './face-pull-elastico.json';
import p71 from './face-pull-suspensao.json';
import p72 from './flexao.json';
import p73 from './flexao-bola.json';
import p74 from './flexao-elastico.json';
import p75 from './flexao-fechada.json';
import p76 from './flexao-joelho-deslizante.json';
import p77 from './flexao-joelho-elastico.json';
import p78 from './flexao-joelho-suspensao.json';
import p79 from './flexao-pes-elevados.json';
import p80 from './goblet.json';
import p81 from './goblet-kettlebell.json';
import p82 from './hack.json';
import p83 from './hip-thrust.json';
import p84 from './hiperextensao.json';
import p85 from './leg-press.json';
import p86 from './mergulho.json';
import p87 from './mergulho-graviton.json';
import p88 from './mesa-flexora.json';
import p89 from './nordico.json';
import p90 from './panturrilha.json';
import p91 from './panturrilha-b.json';
import p92 from './panturrilha-chao.json';
import p93 from './panturrilha-degrau.json';
import p94 from './panturrilha-leg-press.json';
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
import p130 from './rosca-scott.json';
import p131 from './rosca-scott-banco-inclinado.json';
import p132 from './rosca-suspensao.json';
import p133 from './stiff.json';
import p134 from './stiff-elastico.json';
import p135 from './stiff-kettlebell.json';
import p136 from './stiff-unilateral.json';
import p137 from './stiff-unilateral-kettlebell.json';
import p138 from './supino-barra.json';
import p139 from './supino-chao-halteres.json';
import p140 from './supino-inclinado.json';
import p141 from './supino-inclinado-polia.json';
import p142 from './supino-maquina.json';
import p143 from './supino-polia.json';
import p144 from './supino-reto.json';
import p145 from './supino-smith.json';
import p146 from './terra-hexagonal.json';
import p147 from './terra-romeno-barra.json';
import p148 from './triceps-barra-reta.json';
import p149 from './triceps-corda.json';
import p150 from './triceps-elastico-acima.json';
import p151 from './triceps-elastico-alto.json';
import p152 from './triceps-frances.json';
import p153 from './triceps-frances-halter.json';
import p154 from './triceps-frances-kettlebell.json';
import p155 from './triceps-frances-polia-unilateral.json';
import p156 from './triceps-frances-unilateral-halter.json';
import p157 from './triceps-suspensao.json';
import p158 from './triceps-testa-halteres.json';
import p159 from './voador.json';
import p160 from './voador-invertido.json';
import p161 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-declinado': p2,
  'abdominal-invertido': p3,
  'abdominal-polia': p4,
  'abducao-caneleira': p5,
  'abducao-deitado': p6,
  'abducao-deitado-mini-band': p7,
  'abducao-elastico': p8,
  'abducao-maquina': p9,
  'abducao-mini-band': p10,
  'abertura-elastico': p11,
  'abertura-t-deitado': p12,
  'aducao-caneleira': p13,
  'aducao-deitado': p14,
  'aducao-maquina': p15,
  'afundo': p16,
  'afundo-kettlebell': p17,
  'afundo-peso-corpo': p18,
  'afundo-tras': p19,
  'afundo-tras-peso-corpo': p20,
  'agachamento-barra': p21,
  'agachamento-elastico': p22,
  'agachamento-halteres': p23,
  'agachamento-peso-corpo': p24,
  'agachamento-smith': p25,
  'barra-fixa': p26,
  'barra-fixa-graviton': p27,
  'barra-fixa-negativa': p28,
  'barra-fixa-supinada': p29,
  'bulgaro': p30,
  'bulgaro-peso-corpo': p31,
  'bulgaro-suspensao': p32,
  'cadeira-extensora': p33,
  'cadeira-flexora': p34,
  'caminhada-lateral-mini-band': p35,
  'coice-caneleira': p36,
  'coice-elastico': p37,
  'coice-maquina': p38,
  'crucifixo-elastico': p39,
  'crucifixo-halteres': p40,
  'crucifixo-inclinado-halteres': p41,
  'crucifixo-inverso': p42,
  'crucifixo-invertido-caneleira': p43,
  'crucifixo-invertido-curvado': p44,
  'crucifixo-invertido-polia': p45,
  'crucifixo-invertido-sentado': p46,
  'crucifixo-polia': p47,
  'crucifixo-polia-baixo': p48,
  'desenvolvimento': p49,
  'desenvolvimento-barra': p50,
  'desenvolvimento-elastico': p51,
  'desenvolvimento-em-pe-halteres': p52,
  'desenvolvimento-maquina': p53,
  'desenvolvimento-unilateral': p54,
  'desenvolvimento-unilateral-kettlebell': p55,
  'elevacao-halteres': p56,
  'elevacao-joelhos': p57,
  'elevacao-joelhos-paralelas': p58,
  'elevacao-lateral': p59,
  'elevacao-lateral-caneleira': p60,
  'elevacao-lateral-deitado': p61,
  'elevacao-lateral-elastico': p62,
  'elevacao-lateral-unilateral': p63,
  'elevacao-lateral-unilateral-elastico': p64,
  'extensao-joelho-caneleira': p65,
  'extensao-joelho-elastico': p66,
  'extensao-joelho-mini-band': p67,
  'extensao-triceps-peso-corpo': p68,
  'face-pull': p69,
  'face-pull-elastico': p70,
  'face-pull-suspensao': p71,
  'flexao': p72,
  'flexao-bola': p73,
  'flexao-elastico': p74,
  'flexao-fechada': p75,
  'flexao-joelho-deslizante': p76,
  'flexao-joelho-elastico': p77,
  'flexao-joelho-suspensao': p78,
  'flexao-pes-elevados': p79,
  'goblet': p80,
  'goblet-kettlebell': p81,
  'hack': p82,
  'hip-thrust': p83,
  'hiperextensao': p84,
  'leg-press': p85,
  'mergulho': p86,
  'mergulho-graviton': p87,
  'mesa-flexora': p88,
  'nordico': p89,
  'panturrilha': p90,
  'panturrilha-b': p91,
  'panturrilha-chao': p92,
  'panturrilha-degrau': p93,
  'panturrilha-leg-press': p94,
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
  'rosca-scott': p130,
  'rosca-scott-banco-inclinado': p131,
  'rosca-suspensao': p132,
  'stiff': p133,
  'stiff-elastico': p134,
  'stiff-kettlebell': p135,
  'stiff-unilateral': p136,
  'stiff-unilateral-kettlebell': p137,
  'supino-barra': p138,
  'supino-chao-halteres': p139,
  'supino-inclinado': p140,
  'supino-inclinado-polia': p141,
  'supino-maquina': p142,
  'supino-polia': p143,
  'supino-reto': p144,
  'supino-smith': p145,
  'terra-hexagonal': p146,
  'terra-romeno-barra': p147,
  'triceps-barra-reta': p148,
  'triceps-corda': p149,
  'triceps-elastico-acima': p150,
  'triceps-elastico-alto': p151,
  'triceps-frances': p152,
  'triceps-frances-halter': p153,
  'triceps-frances-kettlebell': p154,
  'triceps-frances-polia-unilateral': p155,
  'triceps-frances-unilateral-halter': p156,
  'triceps-suspensao': p157,
  'triceps-testa-halteres': p158,
  'voador': p159,
  'voador-invertido': p160,
  'yt-suspensao': p161,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
