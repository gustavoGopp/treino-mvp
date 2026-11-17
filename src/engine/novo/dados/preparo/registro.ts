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
import p9 from './abertura-t-deitado.json';
import p10 from './aducao-caneleira.json';
import p11 from './aducao-deitado.json';
import p12 from './afundo.json';
import p13 from './afundo-kettlebell.json';
import p14 from './afundo-peso-corpo.json';
import p15 from './afundo-tras-peso-corpo.json';
import p16 from './agachamento-elastico.json';
import p17 from './agachamento-peso-corpo.json';
import p18 from './barra-fixa.json';
import p19 from './barra-fixa-supinada.json';
import p20 from './bulgaro.json';
import p21 from './bulgaro-peso-corpo.json';
import p22 from './bulgaro-suspensao.json';
import p23 from './caminhada-lateral-mini-band.json';
import p24 from './coice-elastico.json';
import p25 from './crucifixo-elastico.json';
import p26 from './crucifixo-halteres.json';
import p27 from './crucifixo-inclinado-halteres.json';
import p28 from './crucifixo-inverso.json';
import p29 from './crucifixo-invertido-polia.json';
import p30 from './crucifixo-polia.json';
import p31 from './desenvolvimento.json';
import p32 from './desenvolvimento-elastico.json';
import p33 from './desenvolvimento-unilateral-kettlebell.json';
import p34 from './elevacao-halteres.json';
import p35 from './elevacao-joelhos.json';
import p36 from './elevacao-joelhos-paralelas.json';
import p37 from './elevacao-lateral.json';
import p38 from './elevacao-lateral-elastico.json';
import p39 from './extensao-joelho-caneleira.json';
import p40 from './extensao-joelho-elastico.json';
import p41 from './extensao-joelho-mini-band.json';
import p42 from './extensao-triceps-peso-corpo.json';
import p43 from './face-pull.json';
import p44 from './face-pull-elastico.json';
import p45 from './flexao.json';
import p46 from './flexao-bola.json';
import p47 from './flexao-elastico.json';
import p48 from './flexao-fechada.json';
import p49 from './flexao-joelho-deslizante.json';
import p50 from './flexao-joelho-elastico.json';
import p51 from './flexao-joelho-suspensao.json';
import p52 from './flexao-pes-elevados.json';
import p53 from './goblet.json';
import p54 from './nordico.json';
import p55 from './panturrilha.json';
import p56 from './panturrilha-b.json';
import p57 from './panturrilha-chao.json';
import p58 from './panturrilha-degrau.json';
import p59 from './panturrilha-sentada-halter.json';
import p60 from './pike.json';
import p61 from './ponte-gluteo.json';
import p62 from './ponte-gluteo-halter.json';
import p63 from './ponte-kettlebell.json';
import p64 from './ponte-pes-bola.json';
import p65 from './puxada-elastico.json';
import p66 from './puxada-unilateral.json';
import p67 from './remada-apoiada.json';
import p68 from './remada-baixa.json';
import p69 from './remada-curvada-elastico.json';
import p70 from './remada-curvada-halteres.json';
import p71 from './remada-elastico.json';
import p72 from './remada-suspensao.json';
import p73 from './remada-unilateral.json';
import p74 from './remada-unilateral-elastico.json';
import p75 from './remada-unilateral-kettlebell.json';
import p76 from './remada-unilateral-polia.json';
import p77 from './remada-unilateral-sem-banco.json';
import p78 from './roda-abdominal.json';
import p79 from './rosca-alternada.json';
import p80 from './rosca-elastico.json';
import p81 from './rosca-inclinada.json';
import p82 from './rosca-kettlebell.json';
import p83 from './rosca-martelo.json';
import p84 from './rosca-polia.json';
import p85 from './rosca-scott-banco-inclinado.json';
import p86 from './rosca-suspensao.json';
import p87 from './stiff.json';
import p88 from './stiff-elastico.json';
import p89 from './stiff-kettlebell.json';
import p90 from './stiff-unilateral.json';
import p91 from './supino-chao-halteres.json';
import p92 from './supino-inclinado.json';
import p93 from './supino-reto.json';
import p94 from './triceps-corda.json';
import p95 from './triceps-elastico-acima.json';
import p96 from './triceps-frances.json';
import p97 from './triceps-frances-halter.json';
import p98 from './triceps-frances-kettlebell.json';
import p99 from './triceps-frances-polia-unilateral.json';
import p100 from './triceps-suspensao.json';
import p101 from './triceps-testa-halteres.json';
import p102 from './yt-suspensao.json';

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
  'abertura-t-deitado': p9,
  'aducao-caneleira': p10,
  'aducao-deitado': p11,
  'afundo': p12,
  'afundo-kettlebell': p13,
  'afundo-peso-corpo': p14,
  'afundo-tras-peso-corpo': p15,
  'agachamento-elastico': p16,
  'agachamento-peso-corpo': p17,
  'barra-fixa': p18,
  'barra-fixa-supinada': p19,
  'bulgaro': p20,
  'bulgaro-peso-corpo': p21,
  'bulgaro-suspensao': p22,
  'caminhada-lateral-mini-band': p23,
  'coice-elastico': p24,
  'crucifixo-elastico': p25,
  'crucifixo-halteres': p26,
  'crucifixo-inclinado-halteres': p27,
  'crucifixo-inverso': p28,
  'crucifixo-invertido-polia': p29,
  'crucifixo-polia': p30,
  'desenvolvimento': p31,
  'desenvolvimento-elastico': p32,
  'desenvolvimento-unilateral-kettlebell': p33,
  'elevacao-halteres': p34,
  'elevacao-joelhos': p35,
  'elevacao-joelhos-paralelas': p36,
  'elevacao-lateral': p37,
  'elevacao-lateral-elastico': p38,
  'extensao-joelho-caneleira': p39,
  'extensao-joelho-elastico': p40,
  'extensao-joelho-mini-band': p41,
  'extensao-triceps-peso-corpo': p42,
  'face-pull': p43,
  'face-pull-elastico': p44,
  'flexao': p45,
  'flexao-bola': p46,
  'flexao-elastico': p47,
  'flexao-fechada': p48,
  'flexao-joelho-deslizante': p49,
  'flexao-joelho-elastico': p50,
  'flexao-joelho-suspensao': p51,
  'flexao-pes-elevados': p52,
  'goblet': p53,
  'nordico': p54,
  'panturrilha': p55,
  'panturrilha-b': p56,
  'panturrilha-chao': p57,
  'panturrilha-degrau': p58,
  'panturrilha-sentada-halter': p59,
  'pike': p60,
  'ponte-gluteo': p61,
  'ponte-gluteo-halter': p62,
  'ponte-kettlebell': p63,
  'ponte-pes-bola': p64,
  'puxada-elastico': p65,
  'puxada-unilateral': p66,
  'remada-apoiada': p67,
  'remada-baixa': p68,
  'remada-curvada-elastico': p69,
  'remada-curvada-halteres': p70,
  'remada-elastico': p71,
  'remada-suspensao': p72,
  'remada-unilateral': p73,
  'remada-unilateral-elastico': p74,
  'remada-unilateral-kettlebell': p75,
  'remada-unilateral-polia': p76,
  'remada-unilateral-sem-banco': p77,
  'roda-abdominal': p78,
  'rosca-alternada': p79,
  'rosca-elastico': p80,
  'rosca-inclinada': p81,
  'rosca-kettlebell': p82,
  'rosca-martelo': p83,
  'rosca-polia': p84,
  'rosca-scott-banco-inclinado': p85,
  'rosca-suspensao': p86,
  'stiff': p87,
  'stiff-elastico': p88,
  'stiff-kettlebell': p89,
  'stiff-unilateral': p90,
  'supino-chao-halteres': p91,
  'supino-inclinado': p92,
  'supino-reto': p93,
  'triceps-corda': p94,
  'triceps-elastico-acima': p95,
  'triceps-frances': p96,
  'triceps-frances-halter': p97,
  'triceps-frances-kettlebell': p98,
  'triceps-frances-polia-unilateral': p99,
  'triceps-suspensao': p100,
  'triceps-testa-halteres': p101,
  'yt-suspensao': p102,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
