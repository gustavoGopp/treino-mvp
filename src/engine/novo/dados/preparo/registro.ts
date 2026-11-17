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
import p6 from './abducao-mini-band.json';
import p7 from './abertura-t-deitado.json';
import p8 from './aducao-caneleira.json';
import p9 from './aducao-deitado.json';
import p10 from './afundo.json';
import p11 from './afundo-kettlebell.json';
import p12 from './afundo-peso-corpo.json';
import p13 from './afundo-tras-peso-corpo.json';
import p14 from './agachamento-elastico.json';
import p15 from './agachamento-peso-corpo.json';
import p16 from './barra-fixa.json';
import p17 from './barra-fixa-supinada.json';
import p18 from './bulgaro.json';
import p19 from './bulgaro-peso-corpo.json';
import p20 from './bulgaro-suspensao.json';
import p21 from './crucifixo-elastico.json';
import p22 from './crucifixo-halteres.json';
import p23 from './crucifixo-inclinado-halteres.json';
import p24 from './crucifixo-inverso.json';
import p25 from './crucifixo-invertido-polia.json';
import p26 from './crucifixo-polia.json';
import p27 from './desenvolvimento.json';
import p28 from './desenvolvimento-elastico.json';
import p29 from './desenvolvimento-unilateral-kettlebell.json';
import p30 from './elevacao-halteres.json';
import p31 from './elevacao-joelhos.json';
import p32 from './elevacao-joelhos-paralelas.json';
import p33 from './elevacao-lateral.json';
import p34 from './elevacao-lateral-elastico.json';
import p35 from './extensao-joelho-caneleira.json';
import p36 from './extensao-joelho-elastico.json';
import p37 from './extensao-triceps-peso-corpo.json';
import p38 from './face-pull.json';
import p39 from './face-pull-elastico.json';
import p40 from './flexao.json';
import p41 from './flexao-bola.json';
import p42 from './flexao-elastico.json';
import p43 from './flexao-fechada.json';
import p44 from './flexao-joelho-deslizante.json';
import p45 from './flexao-joelho-elastico.json';
import p46 from './flexao-joelho-suspensao.json';
import p47 from './flexao-pes-elevados.json';
import p48 from './goblet.json';
import p49 from './nordico.json';
import p50 from './panturrilha.json';
import p51 from './panturrilha-b.json';
import p52 from './panturrilha-chao.json';
import p53 from './panturrilha-degrau.json';
import p54 from './panturrilha-sentada-halter.json';
import p55 from './pike.json';
import p56 from './ponte-gluteo.json';
import p57 from './ponte-gluteo-halter.json';
import p58 from './ponte-kettlebell.json';
import p59 from './ponte-pes-bola.json';
import p60 from './puxada-elastico.json';
import p61 from './puxada-unilateral.json';
import p62 from './remada-apoiada.json';
import p63 from './remada-baixa.json';
import p64 from './remada-curvada-halteres.json';
import p65 from './remada-elastico.json';
import p66 from './remada-suspensao.json';
import p67 from './remada-unilateral.json';
import p68 from './remada-unilateral-kettlebell.json';
import p69 from './remada-unilateral-polia.json';
import p70 from './remada-unilateral-sem-banco.json';
import p71 from './roda-abdominal.json';
import p72 from './rosca-alternada.json';
import p73 from './rosca-elastico.json';
import p74 from './rosca-inclinada.json';
import p75 from './rosca-kettlebell.json';
import p76 from './rosca-martelo.json';
import p77 from './rosca-martelo-elastico.json';
import p78 from './rosca-polia.json';
import p79 from './rosca-scott-banco-inclinado.json';
import p80 from './rosca-suspensao.json';
import p81 from './stiff.json';
import p82 from './stiff-elastico.json';
import p83 from './stiff-kettlebell.json';
import p84 from './stiff-unilateral.json';
import p85 from './supino-chao-halteres.json';
import p86 from './supino-inclinado.json';
import p87 from './supino-reto.json';
import p88 from './triceps-corda.json';
import p89 from './triceps-elastico-acima.json';
import p90 from './triceps-frances.json';
import p91 from './triceps-frances-halter.json';
import p92 from './triceps-frances-kettlebell.json';
import p93 from './triceps-frances-polia-unilateral.json';
import p94 from './triceps-suspensao.json';
import p95 from './triceps-testa-halteres.json';
import p96 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-invertido': p2,
  'abdominal-polia': p3,
  'abducao-caneleira': p4,
  'abducao-deitado': p5,
  'abducao-mini-band': p6,
  'abertura-t-deitado': p7,
  'aducao-caneleira': p8,
  'aducao-deitado': p9,
  'afundo': p10,
  'afundo-kettlebell': p11,
  'afundo-peso-corpo': p12,
  'afundo-tras-peso-corpo': p13,
  'agachamento-elastico': p14,
  'agachamento-peso-corpo': p15,
  'barra-fixa': p16,
  'barra-fixa-supinada': p17,
  'bulgaro': p18,
  'bulgaro-peso-corpo': p19,
  'bulgaro-suspensao': p20,
  'crucifixo-elastico': p21,
  'crucifixo-halteres': p22,
  'crucifixo-inclinado-halteres': p23,
  'crucifixo-inverso': p24,
  'crucifixo-invertido-polia': p25,
  'crucifixo-polia': p26,
  'desenvolvimento': p27,
  'desenvolvimento-elastico': p28,
  'desenvolvimento-unilateral-kettlebell': p29,
  'elevacao-halteres': p30,
  'elevacao-joelhos': p31,
  'elevacao-joelhos-paralelas': p32,
  'elevacao-lateral': p33,
  'elevacao-lateral-elastico': p34,
  'extensao-joelho-caneleira': p35,
  'extensao-joelho-elastico': p36,
  'extensao-triceps-peso-corpo': p37,
  'face-pull': p38,
  'face-pull-elastico': p39,
  'flexao': p40,
  'flexao-bola': p41,
  'flexao-elastico': p42,
  'flexao-fechada': p43,
  'flexao-joelho-deslizante': p44,
  'flexao-joelho-elastico': p45,
  'flexao-joelho-suspensao': p46,
  'flexao-pes-elevados': p47,
  'goblet': p48,
  'nordico': p49,
  'panturrilha': p50,
  'panturrilha-b': p51,
  'panturrilha-chao': p52,
  'panturrilha-degrau': p53,
  'panturrilha-sentada-halter': p54,
  'pike': p55,
  'ponte-gluteo': p56,
  'ponte-gluteo-halter': p57,
  'ponte-kettlebell': p58,
  'ponte-pes-bola': p59,
  'puxada-elastico': p60,
  'puxada-unilateral': p61,
  'remada-apoiada': p62,
  'remada-baixa': p63,
  'remada-curvada-halteres': p64,
  'remada-elastico': p65,
  'remada-suspensao': p66,
  'remada-unilateral': p67,
  'remada-unilateral-kettlebell': p68,
  'remada-unilateral-polia': p69,
  'remada-unilateral-sem-banco': p70,
  'roda-abdominal': p71,
  'rosca-alternada': p72,
  'rosca-elastico': p73,
  'rosca-inclinada': p74,
  'rosca-kettlebell': p75,
  'rosca-martelo': p76,
  'rosca-martelo-elastico': p77,
  'rosca-polia': p78,
  'rosca-scott-banco-inclinado': p79,
  'rosca-suspensao': p80,
  'stiff': p81,
  'stiff-elastico': p82,
  'stiff-kettlebell': p83,
  'stiff-unilateral': p84,
  'supino-chao-halteres': p85,
  'supino-inclinado': p86,
  'supino-reto': p87,
  'triceps-corda': p88,
  'triceps-elastico-acima': p89,
  'triceps-frances': p90,
  'triceps-frances-halter': p91,
  'triceps-frances-kettlebell': p92,
  'triceps-frances-polia-unilateral': p93,
  'triceps-suspensao': p94,
  'triceps-testa-halteres': p95,
  'yt-suspensao': p96,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
