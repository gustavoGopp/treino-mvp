// Gerado por scripts/animacao-nova/preparo.mjs: não edite. Entrega ao motor, de uma vez, o que foi calculado de antemão
// para todos os exercícios (para os scripts e os testes; o app carrega o arquivo de cada exercício junto com ele).
import { registrarPreparo } from '../../preparo';
import type { Preparo } from '../../preparo';
import p0 from './abdominal-bola.json';
import p1 from './abdominal-chao.json';
import p2 from './abdominal-declinado.json';
import p3 from './abdominal-invertido.json';
import p4 from './abdominal-maquina.json';
import p5 from './abdominal-polia.json';
import p6 from './abducao-caneleira.json';
import p7 from './abducao-deitado.json';
import p8 from './abducao-deitado-mini-band.json';
import p9 from './abducao-elastico.json';
import p10 from './abducao-maquina.json';
import p11 from './abducao-mini-band.json';
import p12 from './abducao-polia.json';
import p13 from './abertura-elastico.json';
import p14 from './abertura-t-deitado.json';
import p15 from './aducao-caneleira.json';
import p16 from './aducao-deitado.json';
import p17 from './aducao-maquina.json';
import p18 from './afundo.json';
import p19 from './afundo-kettlebell.json';
import p20 from './afundo-peso-corpo.json';
import p21 from './afundo-tras.json';
import p22 from './afundo-tras-peso-corpo.json';
import p23 from './agachamento-barra.json';
import p24 from './agachamento-elastico.json';
import p25 from './agachamento-halteres.json';
import p26 from './agachamento-peso-corpo.json';
import p27 from './agachamento-smith.json';
import p28 from './barra-fixa.json';
import p29 from './barra-fixa-graviton.json';
import p30 from './barra-fixa-negativa.json';
import p31 from './barra-fixa-supinada.json';
import p32 from './bulgaro.json';
import p33 from './bulgaro-peso-corpo.json';
import p34 from './bulgaro-suspensao.json';
import p35 from './cadeira-extensora.json';
import p36 from './cadeira-flexora.json';
import p37 from './caminhada-lateral-mini-band.json';
import p38 from './coice-caneleira.json';
import p39 from './coice-elastico.json';
import p40 from './coice-maquina.json';
import p41 from './coice-polia.json';
import p42 from './crucifixo-elastico.json';
import p43 from './crucifixo-halteres.json';
import p44 from './crucifixo-inclinado-halteres.json';
import p45 from './crucifixo-inverso.json';
import p46 from './crucifixo-invertido-caneleira.json';
import p47 from './crucifixo-invertido-curvado.json';
import p48 from './crucifixo-invertido-polia.json';
import p49 from './crucifixo-invertido-sentado.json';
import p50 from './crucifixo-polia.json';
import p51 from './crucifixo-polia-baixo.json';
import p52 from './desenvolvimento.json';
import p53 from './desenvolvimento-barra.json';
import p54 from './desenvolvimento-elastico.json';
import p55 from './desenvolvimento-em-pe-halteres.json';
import p56 from './desenvolvimento-maquina.json';
import p57 from './desenvolvimento-unilateral.json';
import p58 from './desenvolvimento-unilateral-kettlebell.json';
import p59 from './elevacao-halteres.json';
import p60 from './elevacao-joelhos.json';
import p61 from './elevacao-joelhos-paralelas.json';
import p62 from './elevacao-lateral.json';
import p63 from './elevacao-lateral-caneleira.json';
import p64 from './elevacao-lateral-deitado.json';
import p65 from './elevacao-lateral-elastico.json';
import p66 from './elevacao-lateral-unilateral.json';
import p67 from './elevacao-lateral-unilateral-elastico.json';
import p68 from './extensao-joelho-caneleira.json';
import p69 from './extensao-joelho-elastico.json';
import p70 from './extensao-joelho-mini-band.json';
import p71 from './extensao-triceps-peso-corpo.json';
import p72 from './face-pull.json';
import p73 from './face-pull-elastico.json';
import p74 from './face-pull-suspensao.json';
import p75 from './flexao.json';
import p76 from './flexao-bola.json';
import p77 from './flexao-elastico.json';
import p78 from './flexao-fechada.json';
import p79 from './flexao-joelho-deslizante.json';
import p80 from './flexao-joelho-elastico.json';
import p81 from './flexao-joelho-suspensao.json';
import p82 from './flexao-pes-elevados.json';
import p83 from './goblet.json';
import p84 from './goblet-kettlebell.json';
import p85 from './hack.json';
import p86 from './hip-thrust.json';
import p87 from './hiperextensao.json';
import p88 from './leg-press.json';
import p89 from './mergulho.json';
import p90 from './mergulho-graviton.json';
import p91 from './mesa-flexora.json';
import p92 from './nordico.json';
import p93 from './panturrilha.json';
import p94 from './panturrilha-b.json';
import p95 from './panturrilha-chao.json';
import p96 from './panturrilha-degrau.json';
import p97 from './panturrilha-em-pe-maquina.json';
import p98 from './panturrilha-leg-press.json';
import p99 from './panturrilha-sentada.json';
import p100 from './panturrilha-sentada-halter.json';
import p101 from './pike.json';
import p102 from './ponte-gluteo.json';
import p103 from './ponte-gluteo-halter.json';
import p104 from './ponte-kettlebell.json';
import p105 from './ponte-pes-bola.json';
import p106 from './pull-through.json';
import p107 from './puxada-barra-reta.json';
import p108 from './puxada-elastico.json';
import p109 from './puxada-frente.json';
import p110 from './puxada-unilateral.json';
import p111 from './remada-apoiada.json';
import p112 from './remada-articulada.json';
import p113 from './remada-baixa.json';
import p114 from './remada-baixa-estacao.json';
import p115 from './remada-barra.json';
import p116 from './remada-curvada-elastico.json';
import p117 from './remada-curvada-halteres.json';
import p118 from './remada-elastico.json';
import p119 from './remada-invertida.json';
import p120 from './remada-suspensao.json';
import p121 from './remada-unilateral.json';
import p122 from './remada-unilateral-elastico.json';
import p123 from './remada-unilateral-kettlebell.json';
import p124 from './remada-unilateral-polia.json';
import p125 from './remada-unilateral-sem-banco.json';
import p126 from './roda-abdominal.json';
import p127 from './rosca-alternada.json';
import p128 from './rosca-barra-w.json';
import p129 from './rosca-concentrada.json';
import p130 from './rosca-elastico.json';
import p131 from './rosca-inclinada.json';
import p132 from './rosca-kettlebell.json';
import p133 from './rosca-maquina.json';
import p134 from './rosca-martelo.json';
import p135 from './rosca-martelo-elastico.json';
import p136 from './rosca-polia.json';
import p137 from './rosca-polia-costas.json';
import p138 from './rosca-scott.json';
import p139 from './rosca-scott-banco-inclinado.json';
import p140 from './rosca-suspensao.json';
import p141 from './stiff.json';
import p142 from './stiff-elastico.json';
import p143 from './stiff-kettlebell.json';
import p144 from './stiff-unilateral.json';
import p145 from './stiff-unilateral-kettlebell.json';
import p146 from './supino-barra.json';
import p147 from './supino-chao-halteres.json';
import p148 from './supino-inclinado.json';
import p149 from './supino-inclinado-polia.json';
import p150 from './supino-maquina.json';
import p151 from './supino-polia.json';
import p152 from './supino-reto.json';
import p153 from './supino-smith.json';
import p154 from './terra-hexagonal.json';
import p155 from './terra-romeno-barra.json';
import p156 from './triceps-barra-reta.json';
import p157 from './triceps-corda.json';
import p158 from './triceps-elastico-acima.json';
import p159 from './triceps-elastico-alto.json';
import p160 from './triceps-frances.json';
import p161 from './triceps-frances-halter.json';
import p162 from './triceps-frances-kettlebell.json';
import p163 from './triceps-frances-polia-unilateral.json';
import p164 from './triceps-frances-unilateral-halter.json';
import p165 from './triceps-maquina.json';
import p166 from './triceps-suspensao.json';
import p167 from './triceps-testa-halteres.json';
import p168 from './voador.json';
import p169 from './voador-invertido.json';
import p170 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-declinado': p2,
  'abdominal-invertido': p3,
  'abdominal-maquina': p4,
  'abdominal-polia': p5,
  'abducao-caneleira': p6,
  'abducao-deitado': p7,
  'abducao-deitado-mini-band': p8,
  'abducao-elastico': p9,
  'abducao-maquina': p10,
  'abducao-mini-band': p11,
  'abducao-polia': p12,
  'abertura-elastico': p13,
  'abertura-t-deitado': p14,
  'aducao-caneleira': p15,
  'aducao-deitado': p16,
  'aducao-maquina': p17,
  'afundo': p18,
  'afundo-kettlebell': p19,
  'afundo-peso-corpo': p20,
  'afundo-tras': p21,
  'afundo-tras-peso-corpo': p22,
  'agachamento-barra': p23,
  'agachamento-elastico': p24,
  'agachamento-halteres': p25,
  'agachamento-peso-corpo': p26,
  'agachamento-smith': p27,
  'barra-fixa': p28,
  'barra-fixa-graviton': p29,
  'barra-fixa-negativa': p30,
  'barra-fixa-supinada': p31,
  'bulgaro': p32,
  'bulgaro-peso-corpo': p33,
  'bulgaro-suspensao': p34,
  'cadeira-extensora': p35,
  'cadeira-flexora': p36,
  'caminhada-lateral-mini-band': p37,
  'coice-caneleira': p38,
  'coice-elastico': p39,
  'coice-maquina': p40,
  'coice-polia': p41,
  'crucifixo-elastico': p42,
  'crucifixo-halteres': p43,
  'crucifixo-inclinado-halteres': p44,
  'crucifixo-inverso': p45,
  'crucifixo-invertido-caneleira': p46,
  'crucifixo-invertido-curvado': p47,
  'crucifixo-invertido-polia': p48,
  'crucifixo-invertido-sentado': p49,
  'crucifixo-polia': p50,
  'crucifixo-polia-baixo': p51,
  'desenvolvimento': p52,
  'desenvolvimento-barra': p53,
  'desenvolvimento-elastico': p54,
  'desenvolvimento-em-pe-halteres': p55,
  'desenvolvimento-maquina': p56,
  'desenvolvimento-unilateral': p57,
  'desenvolvimento-unilateral-kettlebell': p58,
  'elevacao-halteres': p59,
  'elevacao-joelhos': p60,
  'elevacao-joelhos-paralelas': p61,
  'elevacao-lateral': p62,
  'elevacao-lateral-caneleira': p63,
  'elevacao-lateral-deitado': p64,
  'elevacao-lateral-elastico': p65,
  'elevacao-lateral-unilateral': p66,
  'elevacao-lateral-unilateral-elastico': p67,
  'extensao-joelho-caneleira': p68,
  'extensao-joelho-elastico': p69,
  'extensao-joelho-mini-band': p70,
  'extensao-triceps-peso-corpo': p71,
  'face-pull': p72,
  'face-pull-elastico': p73,
  'face-pull-suspensao': p74,
  'flexao': p75,
  'flexao-bola': p76,
  'flexao-elastico': p77,
  'flexao-fechada': p78,
  'flexao-joelho-deslizante': p79,
  'flexao-joelho-elastico': p80,
  'flexao-joelho-suspensao': p81,
  'flexao-pes-elevados': p82,
  'goblet': p83,
  'goblet-kettlebell': p84,
  'hack': p85,
  'hip-thrust': p86,
  'hiperextensao': p87,
  'leg-press': p88,
  'mergulho': p89,
  'mergulho-graviton': p90,
  'mesa-flexora': p91,
  'nordico': p92,
  'panturrilha': p93,
  'panturrilha-b': p94,
  'panturrilha-chao': p95,
  'panturrilha-degrau': p96,
  'panturrilha-em-pe-maquina': p97,
  'panturrilha-leg-press': p98,
  'panturrilha-sentada': p99,
  'panturrilha-sentada-halter': p100,
  'pike': p101,
  'ponte-gluteo': p102,
  'ponte-gluteo-halter': p103,
  'ponte-kettlebell': p104,
  'ponte-pes-bola': p105,
  'pull-through': p106,
  'puxada-barra-reta': p107,
  'puxada-elastico': p108,
  'puxada-frente': p109,
  'puxada-unilateral': p110,
  'remada-apoiada': p111,
  'remada-articulada': p112,
  'remada-baixa': p113,
  'remada-baixa-estacao': p114,
  'remada-barra': p115,
  'remada-curvada-elastico': p116,
  'remada-curvada-halteres': p117,
  'remada-elastico': p118,
  'remada-invertida': p119,
  'remada-suspensao': p120,
  'remada-unilateral': p121,
  'remada-unilateral-elastico': p122,
  'remada-unilateral-kettlebell': p123,
  'remada-unilateral-polia': p124,
  'remada-unilateral-sem-banco': p125,
  'roda-abdominal': p126,
  'rosca-alternada': p127,
  'rosca-barra-w': p128,
  'rosca-concentrada': p129,
  'rosca-elastico': p130,
  'rosca-inclinada': p131,
  'rosca-kettlebell': p132,
  'rosca-maquina': p133,
  'rosca-martelo': p134,
  'rosca-martelo-elastico': p135,
  'rosca-polia': p136,
  'rosca-polia-costas': p137,
  'rosca-scott': p138,
  'rosca-scott-banco-inclinado': p139,
  'rosca-suspensao': p140,
  'stiff': p141,
  'stiff-elastico': p142,
  'stiff-kettlebell': p143,
  'stiff-unilateral': p144,
  'stiff-unilateral-kettlebell': p145,
  'supino-barra': p146,
  'supino-chao-halteres': p147,
  'supino-inclinado': p148,
  'supino-inclinado-polia': p149,
  'supino-maquina': p150,
  'supino-polia': p151,
  'supino-reto': p152,
  'supino-smith': p153,
  'terra-hexagonal': p154,
  'terra-romeno-barra': p155,
  'triceps-barra-reta': p156,
  'triceps-corda': p157,
  'triceps-elastico-acima': p158,
  'triceps-elastico-alto': p159,
  'triceps-frances': p160,
  'triceps-frances-halter': p161,
  'triceps-frances-kettlebell': p162,
  'triceps-frances-polia-unilateral': p163,
  'triceps-frances-unilateral-halter': p164,
  'triceps-maquina': p165,
  'triceps-suspensao': p166,
  'triceps-testa-halteres': p167,
  'voador': p168,
  'voador-invertido': p169,
  'yt-suspensao': p170,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
