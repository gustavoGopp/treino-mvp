// Gerado por scripts/animacao-nova/preparo.mjs: não edite. Entrega ao motor, de uma vez, o que foi calculado de antemão
// para todos os exercícios (para os scripts e os testes; o app carrega o arquivo de cada exercício junto com ele).
import { registrarPreparo } from '../../preparo';
import type { Preparo } from '../../preparo';
import p0 from './abdominal-bola.json';
import p1 from './abdominal-chao.json';
import p2 from './abdominal-invertido.json';
import p3 from './abdominal-maquina.json';
import p4 from './abdominal-polia.json';
import p5 from './abducao-caneleira.json';
import p6 from './abducao-deitado.json';
import p7 from './abducao-deitado-mini-band.json';
import p8 from './abducao-elastico.json';
import p9 from './abducao-maquina.json';
import p10 from './abducao-mini-band.json';
import p11 from './abducao-polia.json';
import p12 from './abertura-elastico.json';
import p13 from './abertura-t-deitado.json';
import p14 from './aducao-caneleira.json';
import p15 from './aducao-deitado.json';
import p16 from './aducao-maquina.json';
import p17 from './afundo.json';
import p18 from './afundo-kettlebell.json';
import p19 from './afundo-peso-corpo.json';
import p20 from './afundo-tras.json';
import p21 from './afundo-tras-peso-corpo.json';
import p22 from './agachamento-barra.json';
import p23 from './agachamento-elastico.json';
import p24 from './agachamento-halteres.json';
import p25 from './agachamento-peso-corpo.json';
import p26 from './agachamento-smith.json';
import p27 from './barra-fixa.json';
import p28 from './barra-fixa-graviton.json';
import p29 from './barra-fixa-negativa.json';
import p30 from './barra-fixa-supinada.json';
import p31 from './bulgaro.json';
import p32 from './bulgaro-peso-corpo.json';
import p33 from './bulgaro-suspensao.json';
import p34 from './cadeira-extensora.json';
import p35 from './cadeira-flexora.json';
import p36 from './caminhada-lateral-mini-band.json';
import p37 from './coice-caneleira.json';
import p38 from './coice-elastico.json';
import p39 from './coice-maquina.json';
import p40 from './coice-polia.json';
import p41 from './crucifixo-elastico.json';
import p42 from './crucifixo-halteres.json';
import p43 from './crucifixo-inclinado-halteres.json';
import p44 from './crucifixo-inverso.json';
import p45 from './crucifixo-invertido-caneleira.json';
import p46 from './crucifixo-invertido-curvado.json';
import p47 from './crucifixo-invertido-polia.json';
import p48 from './crucifixo-invertido-sentado.json';
import p49 from './crucifixo-polia.json';
import p50 from './crucifixo-polia-baixo.json';
import p51 from './desenvolvimento.json';
import p52 from './desenvolvimento-barra.json';
import p53 from './desenvolvimento-elastico.json';
import p54 from './desenvolvimento-em-pe-halteres.json';
import p55 from './desenvolvimento-maquina.json';
import p56 from './desenvolvimento-unilateral.json';
import p57 from './desenvolvimento-unilateral-kettlebell.json';
import p58 from './elevacao-halteres.json';
import p59 from './elevacao-joelhos.json';
import p60 from './elevacao-joelhos-paralelas.json';
import p61 from './elevacao-lateral.json';
import p62 from './elevacao-lateral-caneleira.json';
import p63 from './elevacao-lateral-deitado.json';
import p64 from './elevacao-lateral-elastico.json';
import p65 from './elevacao-lateral-unilateral.json';
import p66 from './elevacao-lateral-unilateral-elastico.json';
import p67 from './extensao-joelho-caneleira.json';
import p68 from './extensao-joelho-elastico.json';
import p69 from './extensao-joelho-mini-band.json';
import p70 from './extensao-triceps-peso-corpo.json';
import p71 from './face-pull.json';
import p72 from './face-pull-elastico.json';
import p73 from './face-pull-suspensao.json';
import p74 from './flexao.json';
import p75 from './flexao-bola.json';
import p76 from './flexao-elastico.json';
import p77 from './flexao-fechada.json';
import p78 from './flexao-joelho-deslizante.json';
import p79 from './flexao-joelho-elastico.json';
import p80 from './flexao-joelho-suspensao.json';
import p81 from './flexao-pes-elevados.json';
import p82 from './goblet.json';
import p83 from './goblet-kettlebell.json';
import p84 from './hack.json';
import p85 from './hip-thrust.json';
import p86 from './leg-press.json';
import p87 from './mergulho.json';
import p88 from './mergulho-graviton.json';
import p89 from './mesa-flexora.json';
import p90 from './nordico.json';
import p91 from './panturrilha.json';
import p92 from './panturrilha-b.json';
import p93 from './panturrilha-chao.json';
import p94 from './panturrilha-degrau.json';
import p95 from './panturrilha-leg-press.json';
import p96 from './panturrilha-sentada-halter.json';
import p97 from './pike.json';
import p98 from './ponte-gluteo.json';
import p99 from './ponte-gluteo-halter.json';
import p100 from './ponte-kettlebell.json';
import p101 from './ponte-pes-bola.json';
import p102 from './pull-through.json';
import p103 from './puxada-barra-reta.json';
import p104 from './puxada-elastico.json';
import p105 from './puxada-frente.json';
import p106 from './puxada-unilateral.json';
import p107 from './remada-apoiada.json';
import p108 from './remada-articulada.json';
import p109 from './remada-baixa.json';
import p110 from './remada-baixa-estacao.json';
import p111 from './remada-barra.json';
import p112 from './remada-curvada-elastico.json';
import p113 from './remada-curvada-halteres.json';
import p114 from './remada-elastico.json';
import p115 from './remada-invertida.json';
import p116 from './remada-suspensao.json';
import p117 from './remada-unilateral.json';
import p118 from './remada-unilateral-elastico.json';
import p119 from './remada-unilateral-kettlebell.json';
import p120 from './remada-unilateral-polia.json';
import p121 from './remada-unilateral-sem-banco.json';
import p122 from './roda-abdominal.json';
import p123 from './rosca-alternada.json';
import p124 from './rosca-barra-w.json';
import p125 from './rosca-concentrada.json';
import p126 from './rosca-elastico.json';
import p127 from './rosca-inclinada.json';
import p128 from './rosca-kettlebell.json';
import p129 from './rosca-martelo.json';
import p130 from './rosca-martelo-elastico.json';
import p131 from './rosca-polia.json';
import p132 from './rosca-polia-costas.json';
import p133 from './rosca-scott-banco-inclinado.json';
import p134 from './rosca-suspensao.json';
import p135 from './stiff.json';
import p136 from './stiff-elastico.json';
import p137 from './stiff-kettlebell.json';
import p138 from './stiff-unilateral.json';
import p139 from './stiff-unilateral-kettlebell.json';
import p140 from './supino-barra.json';
import p141 from './supino-chao-halteres.json';
import p142 from './supino-inclinado.json';
import p143 from './supino-inclinado-polia.json';
import p144 from './supino-maquina.json';
import p145 from './supino-polia.json';
import p146 from './supino-reto.json';
import p147 from './supino-smith.json';
import p148 from './terra-hexagonal.json';
import p149 from './terra-romeno-barra.json';
import p150 from './triceps-barra-reta.json';
import p151 from './triceps-corda.json';
import p152 from './triceps-elastico-acima.json';
import p153 from './triceps-elastico-alto.json';
import p154 from './triceps-frances.json';
import p155 from './triceps-frances-halter.json';
import p156 from './triceps-frances-kettlebell.json';
import p157 from './triceps-frances-polia-unilateral.json';
import p158 from './triceps-frances-unilateral-halter.json';
import p159 from './triceps-suspensao.json';
import p160 from './triceps-testa-halteres.json';
import p161 from './voador.json';
import p162 from './voador-invertido.json';
import p163 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-invertido': p2,
  'abdominal-maquina': p3,
  'abdominal-polia': p4,
  'abducao-caneleira': p5,
  'abducao-deitado': p6,
  'abducao-deitado-mini-band': p7,
  'abducao-elastico': p8,
  'abducao-maquina': p9,
  'abducao-mini-band': p10,
  'abducao-polia': p11,
  'abertura-elastico': p12,
  'abertura-t-deitado': p13,
  'aducao-caneleira': p14,
  'aducao-deitado': p15,
  'aducao-maquina': p16,
  'afundo': p17,
  'afundo-kettlebell': p18,
  'afundo-peso-corpo': p19,
  'afundo-tras': p20,
  'afundo-tras-peso-corpo': p21,
  'agachamento-barra': p22,
  'agachamento-elastico': p23,
  'agachamento-halteres': p24,
  'agachamento-peso-corpo': p25,
  'agachamento-smith': p26,
  'barra-fixa': p27,
  'barra-fixa-graviton': p28,
  'barra-fixa-negativa': p29,
  'barra-fixa-supinada': p30,
  'bulgaro': p31,
  'bulgaro-peso-corpo': p32,
  'bulgaro-suspensao': p33,
  'cadeira-extensora': p34,
  'cadeira-flexora': p35,
  'caminhada-lateral-mini-band': p36,
  'coice-caneleira': p37,
  'coice-elastico': p38,
  'coice-maquina': p39,
  'coice-polia': p40,
  'crucifixo-elastico': p41,
  'crucifixo-halteres': p42,
  'crucifixo-inclinado-halteres': p43,
  'crucifixo-inverso': p44,
  'crucifixo-invertido-caneleira': p45,
  'crucifixo-invertido-curvado': p46,
  'crucifixo-invertido-polia': p47,
  'crucifixo-invertido-sentado': p48,
  'crucifixo-polia': p49,
  'crucifixo-polia-baixo': p50,
  'desenvolvimento': p51,
  'desenvolvimento-barra': p52,
  'desenvolvimento-elastico': p53,
  'desenvolvimento-em-pe-halteres': p54,
  'desenvolvimento-maquina': p55,
  'desenvolvimento-unilateral': p56,
  'desenvolvimento-unilateral-kettlebell': p57,
  'elevacao-halteres': p58,
  'elevacao-joelhos': p59,
  'elevacao-joelhos-paralelas': p60,
  'elevacao-lateral': p61,
  'elevacao-lateral-caneleira': p62,
  'elevacao-lateral-deitado': p63,
  'elevacao-lateral-elastico': p64,
  'elevacao-lateral-unilateral': p65,
  'elevacao-lateral-unilateral-elastico': p66,
  'extensao-joelho-caneleira': p67,
  'extensao-joelho-elastico': p68,
  'extensao-joelho-mini-band': p69,
  'extensao-triceps-peso-corpo': p70,
  'face-pull': p71,
  'face-pull-elastico': p72,
  'face-pull-suspensao': p73,
  'flexao': p74,
  'flexao-bola': p75,
  'flexao-elastico': p76,
  'flexao-fechada': p77,
  'flexao-joelho-deslizante': p78,
  'flexao-joelho-elastico': p79,
  'flexao-joelho-suspensao': p80,
  'flexao-pes-elevados': p81,
  'goblet': p82,
  'goblet-kettlebell': p83,
  'hack': p84,
  'hip-thrust': p85,
  'leg-press': p86,
  'mergulho': p87,
  'mergulho-graviton': p88,
  'mesa-flexora': p89,
  'nordico': p90,
  'panturrilha': p91,
  'panturrilha-b': p92,
  'panturrilha-chao': p93,
  'panturrilha-degrau': p94,
  'panturrilha-leg-press': p95,
  'panturrilha-sentada-halter': p96,
  'pike': p97,
  'ponte-gluteo': p98,
  'ponte-gluteo-halter': p99,
  'ponte-kettlebell': p100,
  'ponte-pes-bola': p101,
  'pull-through': p102,
  'puxada-barra-reta': p103,
  'puxada-elastico': p104,
  'puxada-frente': p105,
  'puxada-unilateral': p106,
  'remada-apoiada': p107,
  'remada-articulada': p108,
  'remada-baixa': p109,
  'remada-baixa-estacao': p110,
  'remada-barra': p111,
  'remada-curvada-elastico': p112,
  'remada-curvada-halteres': p113,
  'remada-elastico': p114,
  'remada-invertida': p115,
  'remada-suspensao': p116,
  'remada-unilateral': p117,
  'remada-unilateral-elastico': p118,
  'remada-unilateral-kettlebell': p119,
  'remada-unilateral-polia': p120,
  'remada-unilateral-sem-banco': p121,
  'roda-abdominal': p122,
  'rosca-alternada': p123,
  'rosca-barra-w': p124,
  'rosca-concentrada': p125,
  'rosca-elastico': p126,
  'rosca-inclinada': p127,
  'rosca-kettlebell': p128,
  'rosca-martelo': p129,
  'rosca-martelo-elastico': p130,
  'rosca-polia': p131,
  'rosca-polia-costas': p132,
  'rosca-scott-banco-inclinado': p133,
  'rosca-suspensao': p134,
  'stiff': p135,
  'stiff-elastico': p136,
  'stiff-kettlebell': p137,
  'stiff-unilateral': p138,
  'stiff-unilateral-kettlebell': p139,
  'supino-barra': p140,
  'supino-chao-halteres': p141,
  'supino-inclinado': p142,
  'supino-inclinado-polia': p143,
  'supino-maquina': p144,
  'supino-polia': p145,
  'supino-reto': p146,
  'supino-smith': p147,
  'terra-hexagonal': p148,
  'terra-romeno-barra': p149,
  'triceps-barra-reta': p150,
  'triceps-corda': p151,
  'triceps-elastico-acima': p152,
  'triceps-elastico-alto': p153,
  'triceps-frances': p154,
  'triceps-frances-halter': p155,
  'triceps-frances-kettlebell': p156,
  'triceps-frances-polia-unilateral': p157,
  'triceps-frances-unilateral-halter': p158,
  'triceps-suspensao': p159,
  'triceps-testa-halteres': p160,
  'voador': p161,
  'voador-invertido': p162,
  'yt-suspensao': p163,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
