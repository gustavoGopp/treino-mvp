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
import p71 from './mergulho.json';
import p72 from './nordico.json';
import p73 from './panturrilha.json';
import p74 from './panturrilha-b.json';
import p75 from './panturrilha-chao.json';
import p76 from './panturrilha-degrau.json';
import p77 from './panturrilha-sentada-halter.json';
import p78 from './pike.json';
import p79 from './ponte-gluteo.json';
import p80 from './ponte-gluteo-halter.json';
import p81 from './ponte-kettlebell.json';
import p82 from './ponte-pes-bola.json';
import p83 from './pull-through.json';
import p84 from './puxada-barra-reta.json';
import p85 from './puxada-elastico.json';
import p86 from './puxada-unilateral.json';
import p87 from './remada-apoiada.json';
import p88 from './remada-baixa.json';
import p89 from './remada-curvada-elastico.json';
import p90 from './remada-curvada-halteres.json';
import p91 from './remada-elastico.json';
import p92 from './remada-suspensao.json';
import p93 from './remada-unilateral.json';
import p94 from './remada-unilateral-elastico.json';
import p95 from './remada-unilateral-kettlebell.json';
import p96 from './remada-unilateral-polia.json';
import p97 from './remada-unilateral-sem-banco.json';
import p98 from './roda-abdominal.json';
import p99 from './rosca-alternada.json';
import p100 from './rosca-barra-w.json';
import p101 from './rosca-concentrada.json';
import p102 from './rosca-elastico.json';
import p103 from './rosca-inclinada.json';
import p104 from './rosca-kettlebell.json';
import p105 from './rosca-martelo.json';
import p106 from './rosca-martelo-elastico.json';
import p107 from './rosca-polia.json';
import p108 from './rosca-polia-costas.json';
import p109 from './rosca-scott-banco-inclinado.json';
import p110 from './rosca-suspensao.json';
import p111 from './stiff.json';
import p112 from './stiff-elastico.json';
import p113 from './stiff-kettlebell.json';
import p114 from './stiff-unilateral.json';
import p115 from './stiff-unilateral-kettlebell.json';
import p116 from './supino-chao-halteres.json';
import p117 from './supino-inclinado.json';
import p118 from './supino-inclinado-polia.json';
import p119 from './supino-polia.json';
import p120 from './supino-reto.json';
import p121 from './terra-hexagonal.json';
import p122 from './triceps-barra-reta.json';
import p123 from './triceps-corda.json';
import p124 from './triceps-elastico-acima.json';
import p125 from './triceps-elastico-alto.json';
import p126 from './triceps-frances.json';
import p127 from './triceps-frances-halter.json';
import p128 from './triceps-frances-kettlebell.json';
import p129 from './triceps-frances-polia-unilateral.json';
import p130 from './triceps-frances-unilateral-halter.json';
import p131 from './triceps-suspensao.json';
import p132 from './triceps-testa-halteres.json';
import p133 from './yt-suspensao.json';

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
  'mergulho': p71,
  'nordico': p72,
  'panturrilha': p73,
  'panturrilha-b': p74,
  'panturrilha-chao': p75,
  'panturrilha-degrau': p76,
  'panturrilha-sentada-halter': p77,
  'pike': p78,
  'ponte-gluteo': p79,
  'ponte-gluteo-halter': p80,
  'ponte-kettlebell': p81,
  'ponte-pes-bola': p82,
  'pull-through': p83,
  'puxada-barra-reta': p84,
  'puxada-elastico': p85,
  'puxada-unilateral': p86,
  'remada-apoiada': p87,
  'remada-baixa': p88,
  'remada-curvada-elastico': p89,
  'remada-curvada-halteres': p90,
  'remada-elastico': p91,
  'remada-suspensao': p92,
  'remada-unilateral': p93,
  'remada-unilateral-elastico': p94,
  'remada-unilateral-kettlebell': p95,
  'remada-unilateral-polia': p96,
  'remada-unilateral-sem-banco': p97,
  'roda-abdominal': p98,
  'rosca-alternada': p99,
  'rosca-barra-w': p100,
  'rosca-concentrada': p101,
  'rosca-elastico': p102,
  'rosca-inclinada': p103,
  'rosca-kettlebell': p104,
  'rosca-martelo': p105,
  'rosca-martelo-elastico': p106,
  'rosca-polia': p107,
  'rosca-polia-costas': p108,
  'rosca-scott-banco-inclinado': p109,
  'rosca-suspensao': p110,
  'stiff': p111,
  'stiff-elastico': p112,
  'stiff-kettlebell': p113,
  'stiff-unilateral': p114,
  'stiff-unilateral-kettlebell': p115,
  'supino-chao-halteres': p116,
  'supino-inclinado': p117,
  'supino-inclinado-polia': p118,
  'supino-polia': p119,
  'supino-reto': p120,
  'terra-hexagonal': p121,
  'triceps-barra-reta': p122,
  'triceps-corda': p123,
  'triceps-elastico-acima': p124,
  'triceps-elastico-alto': p125,
  'triceps-frances': p126,
  'triceps-frances-halter': p127,
  'triceps-frances-kettlebell': p128,
  'triceps-frances-polia-unilateral': p129,
  'triceps-frances-unilateral-halter': p130,
  'triceps-suspensao': p131,
  'triceps-testa-halteres': p132,
  'yt-suspensao': p133,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
