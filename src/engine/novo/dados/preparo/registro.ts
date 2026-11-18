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
import p79 from './hack.json';
import p80 from './hip-thrust.json';
import p81 from './leg-press.json';
import p82 from './mergulho.json';
import p83 from './mesa-flexora.json';
import p84 from './nordico.json';
import p85 from './panturrilha.json';
import p86 from './panturrilha-b.json';
import p87 from './panturrilha-chao.json';
import p88 from './panturrilha-degrau.json';
import p89 from './panturrilha-leg-press.json';
import p90 from './panturrilha-sentada-halter.json';
import p91 from './pike.json';
import p92 from './ponte-gluteo.json';
import p93 from './ponte-gluteo-halter.json';
import p94 from './ponte-kettlebell.json';
import p95 from './ponte-pes-bola.json';
import p96 from './pull-through.json';
import p97 from './puxada-barra-reta.json';
import p98 from './puxada-elastico.json';
import p99 from './puxada-frente.json';
import p100 from './puxada-unilateral.json';
import p101 from './remada-apoiada.json';
import p102 from './remada-baixa.json';
import p103 from './remada-baixa-estacao.json';
import p104 from './remada-barra.json';
import p105 from './remada-curvada-elastico.json';
import p106 from './remada-curvada-halteres.json';
import p107 from './remada-elastico.json';
import p108 from './remada-suspensao.json';
import p109 from './remada-unilateral.json';
import p110 from './remada-unilateral-elastico.json';
import p111 from './remada-unilateral-kettlebell.json';
import p112 from './remada-unilateral-polia.json';
import p113 from './remada-unilateral-sem-banco.json';
import p114 from './roda-abdominal.json';
import p115 from './rosca-alternada.json';
import p116 from './rosca-barra-w.json';
import p117 from './rosca-concentrada.json';
import p118 from './rosca-elastico.json';
import p119 from './rosca-inclinada.json';
import p120 from './rosca-kettlebell.json';
import p121 from './rosca-martelo.json';
import p122 from './rosca-martelo-elastico.json';
import p123 from './rosca-polia.json';
import p124 from './rosca-polia-costas.json';
import p125 from './rosca-scott-banco-inclinado.json';
import p126 from './rosca-suspensao.json';
import p127 from './stiff.json';
import p128 from './stiff-elastico.json';
import p129 from './stiff-kettlebell.json';
import p130 from './stiff-unilateral.json';
import p131 from './stiff-unilateral-kettlebell.json';
import p132 from './supino-barra.json';
import p133 from './supino-chao-halteres.json';
import p134 from './supino-inclinado.json';
import p135 from './supino-inclinado-polia.json';
import p136 from './supino-polia.json';
import p137 from './supino-reto.json';
import p138 from './supino-smith.json';
import p139 from './terra-hexagonal.json';
import p140 from './terra-romeno-barra.json';
import p141 from './triceps-barra-reta.json';
import p142 from './triceps-corda.json';
import p143 from './triceps-elastico-acima.json';
import p144 from './triceps-elastico-alto.json';
import p145 from './triceps-frances.json';
import p146 from './triceps-frances-halter.json';
import p147 from './triceps-frances-kettlebell.json';
import p148 from './triceps-frances-polia-unilateral.json';
import p149 from './triceps-frances-unilateral-halter.json';
import p150 from './triceps-suspensao.json';
import p151 from './triceps-testa-halteres.json';
import p152 from './yt-suspensao.json';

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
  'hack': p79,
  'hip-thrust': p80,
  'leg-press': p81,
  'mergulho': p82,
  'mesa-flexora': p83,
  'nordico': p84,
  'panturrilha': p85,
  'panturrilha-b': p86,
  'panturrilha-chao': p87,
  'panturrilha-degrau': p88,
  'panturrilha-leg-press': p89,
  'panturrilha-sentada-halter': p90,
  'pike': p91,
  'ponte-gluteo': p92,
  'ponte-gluteo-halter': p93,
  'ponte-kettlebell': p94,
  'ponte-pes-bola': p95,
  'pull-through': p96,
  'puxada-barra-reta': p97,
  'puxada-elastico': p98,
  'puxada-frente': p99,
  'puxada-unilateral': p100,
  'remada-apoiada': p101,
  'remada-baixa': p102,
  'remada-baixa-estacao': p103,
  'remada-barra': p104,
  'remada-curvada-elastico': p105,
  'remada-curvada-halteres': p106,
  'remada-elastico': p107,
  'remada-suspensao': p108,
  'remada-unilateral': p109,
  'remada-unilateral-elastico': p110,
  'remada-unilateral-kettlebell': p111,
  'remada-unilateral-polia': p112,
  'remada-unilateral-sem-banco': p113,
  'roda-abdominal': p114,
  'rosca-alternada': p115,
  'rosca-barra-w': p116,
  'rosca-concentrada': p117,
  'rosca-elastico': p118,
  'rosca-inclinada': p119,
  'rosca-kettlebell': p120,
  'rosca-martelo': p121,
  'rosca-martelo-elastico': p122,
  'rosca-polia': p123,
  'rosca-polia-costas': p124,
  'rosca-scott-banco-inclinado': p125,
  'rosca-suspensao': p126,
  'stiff': p127,
  'stiff-elastico': p128,
  'stiff-kettlebell': p129,
  'stiff-unilateral': p130,
  'stiff-unilateral-kettlebell': p131,
  'supino-barra': p132,
  'supino-chao-halteres': p133,
  'supino-inclinado': p134,
  'supino-inclinado-polia': p135,
  'supino-polia': p136,
  'supino-reto': p137,
  'supino-smith': p138,
  'terra-hexagonal': p139,
  'terra-romeno-barra': p140,
  'triceps-barra-reta': p141,
  'triceps-corda': p142,
  'triceps-elastico-acima': p143,
  'triceps-elastico-alto': p144,
  'triceps-frances': p145,
  'triceps-frances-halter': p146,
  'triceps-frances-kettlebell': p147,
  'triceps-frances-polia-unilateral': p148,
  'triceps-frances-unilateral-halter': p149,
  'triceps-suspensao': p150,
  'triceps-testa-halteres': p151,
  'yt-suspensao': p152,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
