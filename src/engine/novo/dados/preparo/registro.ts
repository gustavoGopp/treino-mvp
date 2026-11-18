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
import p18 from './agachamento-elastico.json';
import p19 from './agachamento-halteres.json';
import p20 from './agachamento-peso-corpo.json';
import p21 from './barra-fixa.json';
import p22 from './barra-fixa-negativa.json';
import p23 from './barra-fixa-supinada.json';
import p24 from './bulgaro.json';
import p25 from './bulgaro-peso-corpo.json';
import p26 from './bulgaro-suspensao.json';
import p27 from './caminhada-lateral-mini-band.json';
import p28 from './coice-caneleira.json';
import p29 from './coice-elastico.json';
import p30 from './crucifixo-elastico.json';
import p31 from './crucifixo-halteres.json';
import p32 from './crucifixo-inclinado-halteres.json';
import p33 from './crucifixo-inverso.json';
import p34 from './crucifixo-invertido-caneleira.json';
import p35 from './crucifixo-invertido-curvado.json';
import p36 from './crucifixo-invertido-polia.json';
import p37 from './crucifixo-invertido-sentado.json';
import p38 from './crucifixo-polia.json';
import p39 from './crucifixo-polia-baixo.json';
import p40 from './desenvolvimento.json';
import p41 from './desenvolvimento-elastico.json';
import p42 from './desenvolvimento-em-pe-halteres.json';
import p43 from './desenvolvimento-unilateral.json';
import p44 from './desenvolvimento-unilateral-kettlebell.json';
import p45 from './elevacao-halteres.json';
import p46 from './elevacao-joelhos.json';
import p47 from './elevacao-joelhos-paralelas.json';
import p48 from './elevacao-lateral.json';
import p49 from './elevacao-lateral-caneleira.json';
import p50 from './elevacao-lateral-deitado.json';
import p51 from './elevacao-lateral-elastico.json';
import p52 from './elevacao-lateral-unilateral.json';
import p53 from './elevacao-lateral-unilateral-elastico.json';
import p54 from './extensao-joelho-caneleira.json';
import p55 from './extensao-joelho-elastico.json';
import p56 from './extensao-joelho-mini-band.json';
import p57 from './extensao-triceps-peso-corpo.json';
import p58 from './face-pull.json';
import p59 from './face-pull-elastico.json';
import p60 from './face-pull-suspensao.json';
import p61 from './flexao.json';
import p62 from './flexao-bola.json';
import p63 from './flexao-elastico.json';
import p64 from './flexao-fechada.json';
import p65 from './flexao-joelho-deslizante.json';
import p66 from './flexao-joelho-elastico.json';
import p67 from './flexao-joelho-suspensao.json';
import p68 from './flexao-pes-elevados.json';
import p69 from './goblet.json';
import p70 from './goblet-kettlebell.json';
import p71 from './hip-thrust.json';
import p72 from './mergulho.json';
import p73 from './nordico.json';
import p74 from './panturrilha.json';
import p75 from './panturrilha-b.json';
import p76 from './panturrilha-chao.json';
import p77 from './panturrilha-degrau.json';
import p78 from './panturrilha-sentada-halter.json';
import p79 from './pike.json';
import p80 from './ponte-gluteo.json';
import p81 from './ponte-gluteo-halter.json';
import p82 from './ponte-kettlebell.json';
import p83 from './ponte-pes-bola.json';
import p84 from './pull-through.json';
import p85 from './puxada-barra-reta.json';
import p86 from './puxada-elastico.json';
import p87 from './puxada-unilateral.json';
import p88 from './remada-apoiada.json';
import p89 from './remada-baixa.json';
import p90 from './remada-barra.json';
import p91 from './remada-curvada-elastico.json';
import p92 from './remada-curvada-halteres.json';
import p93 from './remada-elastico.json';
import p94 from './remada-suspensao.json';
import p95 from './remada-unilateral.json';
import p96 from './remada-unilateral-elastico.json';
import p97 from './remada-unilateral-kettlebell.json';
import p98 from './remada-unilateral-polia.json';
import p99 from './remada-unilateral-sem-banco.json';
import p100 from './roda-abdominal.json';
import p101 from './rosca-alternada.json';
import p102 from './rosca-concentrada.json';
import p103 from './rosca-elastico.json';
import p104 from './rosca-inclinada.json';
import p105 from './rosca-kettlebell.json';
import p106 from './rosca-martelo.json';
import p107 from './rosca-martelo-elastico.json';
import p108 from './rosca-polia.json';
import p109 from './rosca-polia-costas.json';
import p110 from './rosca-scott-banco-inclinado.json';
import p111 from './rosca-suspensao.json';
import p112 from './stiff.json';
import p113 from './stiff-elastico.json';
import p114 from './stiff-kettlebell.json';
import p115 from './stiff-unilateral.json';
import p116 from './stiff-unilateral-kettlebell.json';
import p117 from './supino-chao-halteres.json';
import p118 from './supino-inclinado.json';
import p119 from './supino-inclinado-polia.json';
import p120 from './supino-polia.json';
import p121 from './supino-reto.json';
import p122 from './terra-romeno-barra.json';
import p123 from './triceps-barra-reta.json';
import p124 from './triceps-corda.json';
import p125 from './triceps-elastico-acima.json';
import p126 from './triceps-elastico-alto.json';
import p127 from './triceps-frances.json';
import p128 from './triceps-frances-halter.json';
import p129 from './triceps-frances-kettlebell.json';
import p130 from './triceps-frances-polia-unilateral.json';
import p131 from './triceps-frances-unilateral-halter.json';
import p132 from './triceps-suspensao.json';
import p133 from './triceps-testa-halteres.json';
import p134 from './yt-suspensao.json';

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
  'agachamento-elastico': p18,
  'agachamento-halteres': p19,
  'agachamento-peso-corpo': p20,
  'barra-fixa': p21,
  'barra-fixa-negativa': p22,
  'barra-fixa-supinada': p23,
  'bulgaro': p24,
  'bulgaro-peso-corpo': p25,
  'bulgaro-suspensao': p26,
  'caminhada-lateral-mini-band': p27,
  'coice-caneleira': p28,
  'coice-elastico': p29,
  'crucifixo-elastico': p30,
  'crucifixo-halteres': p31,
  'crucifixo-inclinado-halteres': p32,
  'crucifixo-inverso': p33,
  'crucifixo-invertido-caneleira': p34,
  'crucifixo-invertido-curvado': p35,
  'crucifixo-invertido-polia': p36,
  'crucifixo-invertido-sentado': p37,
  'crucifixo-polia': p38,
  'crucifixo-polia-baixo': p39,
  'desenvolvimento': p40,
  'desenvolvimento-elastico': p41,
  'desenvolvimento-em-pe-halteres': p42,
  'desenvolvimento-unilateral': p43,
  'desenvolvimento-unilateral-kettlebell': p44,
  'elevacao-halteres': p45,
  'elevacao-joelhos': p46,
  'elevacao-joelhos-paralelas': p47,
  'elevacao-lateral': p48,
  'elevacao-lateral-caneleira': p49,
  'elevacao-lateral-deitado': p50,
  'elevacao-lateral-elastico': p51,
  'elevacao-lateral-unilateral': p52,
  'elevacao-lateral-unilateral-elastico': p53,
  'extensao-joelho-caneleira': p54,
  'extensao-joelho-elastico': p55,
  'extensao-joelho-mini-band': p56,
  'extensao-triceps-peso-corpo': p57,
  'face-pull': p58,
  'face-pull-elastico': p59,
  'face-pull-suspensao': p60,
  'flexao': p61,
  'flexao-bola': p62,
  'flexao-elastico': p63,
  'flexao-fechada': p64,
  'flexao-joelho-deslizante': p65,
  'flexao-joelho-elastico': p66,
  'flexao-joelho-suspensao': p67,
  'flexao-pes-elevados': p68,
  'goblet': p69,
  'goblet-kettlebell': p70,
  'hip-thrust': p71,
  'mergulho': p72,
  'nordico': p73,
  'panturrilha': p74,
  'panturrilha-b': p75,
  'panturrilha-chao': p76,
  'panturrilha-degrau': p77,
  'panturrilha-sentada-halter': p78,
  'pike': p79,
  'ponte-gluteo': p80,
  'ponte-gluteo-halter': p81,
  'ponte-kettlebell': p82,
  'ponte-pes-bola': p83,
  'pull-through': p84,
  'puxada-barra-reta': p85,
  'puxada-elastico': p86,
  'puxada-unilateral': p87,
  'remada-apoiada': p88,
  'remada-baixa': p89,
  'remada-barra': p90,
  'remada-curvada-elastico': p91,
  'remada-curvada-halteres': p92,
  'remada-elastico': p93,
  'remada-suspensao': p94,
  'remada-unilateral': p95,
  'remada-unilateral-elastico': p96,
  'remada-unilateral-kettlebell': p97,
  'remada-unilateral-polia': p98,
  'remada-unilateral-sem-banco': p99,
  'roda-abdominal': p100,
  'rosca-alternada': p101,
  'rosca-concentrada': p102,
  'rosca-elastico': p103,
  'rosca-inclinada': p104,
  'rosca-kettlebell': p105,
  'rosca-martelo': p106,
  'rosca-martelo-elastico': p107,
  'rosca-polia': p108,
  'rosca-polia-costas': p109,
  'rosca-scott-banco-inclinado': p110,
  'rosca-suspensao': p111,
  'stiff': p112,
  'stiff-elastico': p113,
  'stiff-kettlebell': p114,
  'stiff-unilateral': p115,
  'stiff-unilateral-kettlebell': p116,
  'supino-chao-halteres': p117,
  'supino-inclinado': p118,
  'supino-inclinado-polia': p119,
  'supino-polia': p120,
  'supino-reto': p121,
  'terra-romeno-barra': p122,
  'triceps-barra-reta': p123,
  'triceps-corda': p124,
  'triceps-elastico-acima': p125,
  'triceps-elastico-alto': p126,
  'triceps-frances': p127,
  'triceps-frances-halter': p128,
  'triceps-frances-kettlebell': p129,
  'triceps-frances-polia-unilateral': p130,
  'triceps-frances-unilateral-halter': p131,
  'triceps-suspensao': p132,
  'triceps-testa-halteres': p133,
  'yt-suspensao': p134,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
