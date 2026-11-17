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
import p7 from './abducao-mini-band.json';
import p8 from './abertura-t-deitado.json';
import p9 from './aducao-caneleira.json';
import p10 from './aducao-deitado.json';
import p11 from './afundo.json';
import p12 from './afundo-kettlebell.json';
import p13 from './afundo-peso-corpo.json';
import p14 from './afundo-tras-peso-corpo.json';
import p15 from './agachamento-elastico.json';
import p16 from './agachamento-peso-corpo.json';
import p17 from './barra-fixa.json';
import p18 from './barra-fixa-supinada.json';
import p19 from './bulgaro.json';
import p20 from './bulgaro-peso-corpo.json';
import p21 from './bulgaro-suspensao.json';
import p22 from './caminhada-lateral-mini-band.json';
import p23 from './coice-elastico.json';
import p24 from './crucifixo-elastico.json';
import p25 from './crucifixo-halteres.json';
import p26 from './crucifixo-inclinado-halteres.json';
import p27 from './crucifixo-inverso.json';
import p28 from './crucifixo-invertido-polia.json';
import p29 from './crucifixo-polia.json';
import p30 from './desenvolvimento.json';
import p31 from './desenvolvimento-elastico.json';
import p32 from './desenvolvimento-unilateral-kettlebell.json';
import p33 from './elevacao-halteres.json';
import p34 from './elevacao-joelhos.json';
import p35 from './elevacao-joelhos-paralelas.json';
import p36 from './elevacao-lateral.json';
import p37 from './elevacao-lateral-elastico.json';
import p38 from './extensao-joelho-caneleira.json';
import p39 from './extensao-joelho-elastico.json';
import p40 from './extensao-joelho-mini-band.json';
import p41 from './extensao-triceps-peso-corpo.json';
import p42 from './face-pull.json';
import p43 from './face-pull-elastico.json';
import p44 from './flexao.json';
import p45 from './flexao-bola.json';
import p46 from './flexao-elastico.json';
import p47 from './flexao-fechada.json';
import p48 from './flexao-joelho-deslizante.json';
import p49 from './flexao-joelho-elastico.json';
import p50 from './flexao-joelho-suspensao.json';
import p51 from './flexao-pes-elevados.json';
import p52 from './goblet.json';
import p53 from './nordico.json';
import p54 from './panturrilha.json';
import p55 from './panturrilha-b.json';
import p56 from './panturrilha-chao.json';
import p57 from './panturrilha-degrau.json';
import p58 from './panturrilha-sentada-halter.json';
import p59 from './pike.json';
import p60 from './ponte-gluteo.json';
import p61 from './ponte-gluteo-halter.json';
import p62 from './ponte-kettlebell.json';
import p63 from './ponte-pes-bola.json';
import p64 from './puxada-elastico.json';
import p65 from './puxada-unilateral.json';
import p66 from './remada-apoiada.json';
import p67 from './remada-baixa.json';
import p68 from './remada-curvada-halteres.json';
import p69 from './remada-elastico.json';
import p70 from './remada-suspensao.json';
import p71 from './remada-unilateral.json';
import p72 from './remada-unilateral-kettlebell.json';
import p73 from './remada-unilateral-polia.json';
import p74 from './remada-unilateral-sem-banco.json';
import p75 from './roda-abdominal.json';
import p76 from './rosca-alternada.json';
import p77 from './rosca-elastico.json';
import p78 from './rosca-inclinada.json';
import p79 from './rosca-kettlebell.json';
import p80 from './rosca-martelo.json';
import p81 from './rosca-polia.json';
import p82 from './rosca-scott-banco-inclinado.json';
import p83 from './rosca-suspensao.json';
import p84 from './stiff.json';
import p85 from './stiff-elastico.json';
import p86 from './stiff-kettlebell.json';
import p87 from './stiff-unilateral.json';
import p88 from './supino-chao-halteres.json';
import p89 from './supino-inclinado.json';
import p90 from './supino-reto.json';
import p91 from './triceps-corda.json';
import p92 from './triceps-elastico-acima.json';
import p93 from './triceps-frances.json';
import p94 from './triceps-frances-halter.json';
import p95 from './triceps-frances-kettlebell.json';
import p96 from './triceps-frances-polia-unilateral.json';
import p97 from './triceps-suspensao.json';
import p98 from './triceps-testa-halteres.json';
import p99 from './yt-suspensao.json';

const TODOS: Record<string, Preparo> = {
  'abdominal-bola': p0,
  'abdominal-chao': p1,
  'abdominal-invertido': p2,
  'abdominal-polia': p3,
  'abducao-caneleira': p4,
  'abducao-deitado': p5,
  'abducao-deitado-mini-band': p6,
  'abducao-mini-band': p7,
  'abertura-t-deitado': p8,
  'aducao-caneleira': p9,
  'aducao-deitado': p10,
  'afundo': p11,
  'afundo-kettlebell': p12,
  'afundo-peso-corpo': p13,
  'afundo-tras-peso-corpo': p14,
  'agachamento-elastico': p15,
  'agachamento-peso-corpo': p16,
  'barra-fixa': p17,
  'barra-fixa-supinada': p18,
  'bulgaro': p19,
  'bulgaro-peso-corpo': p20,
  'bulgaro-suspensao': p21,
  'caminhada-lateral-mini-band': p22,
  'coice-elastico': p23,
  'crucifixo-elastico': p24,
  'crucifixo-halteres': p25,
  'crucifixo-inclinado-halteres': p26,
  'crucifixo-inverso': p27,
  'crucifixo-invertido-polia': p28,
  'crucifixo-polia': p29,
  'desenvolvimento': p30,
  'desenvolvimento-elastico': p31,
  'desenvolvimento-unilateral-kettlebell': p32,
  'elevacao-halteres': p33,
  'elevacao-joelhos': p34,
  'elevacao-joelhos-paralelas': p35,
  'elevacao-lateral': p36,
  'elevacao-lateral-elastico': p37,
  'extensao-joelho-caneleira': p38,
  'extensao-joelho-elastico': p39,
  'extensao-joelho-mini-band': p40,
  'extensao-triceps-peso-corpo': p41,
  'face-pull': p42,
  'face-pull-elastico': p43,
  'flexao': p44,
  'flexao-bola': p45,
  'flexao-elastico': p46,
  'flexao-fechada': p47,
  'flexao-joelho-deslizante': p48,
  'flexao-joelho-elastico': p49,
  'flexao-joelho-suspensao': p50,
  'flexao-pes-elevados': p51,
  'goblet': p52,
  'nordico': p53,
  'panturrilha': p54,
  'panturrilha-b': p55,
  'panturrilha-chao': p56,
  'panturrilha-degrau': p57,
  'panturrilha-sentada-halter': p58,
  'pike': p59,
  'ponte-gluteo': p60,
  'ponte-gluteo-halter': p61,
  'ponte-kettlebell': p62,
  'ponte-pes-bola': p63,
  'puxada-elastico': p64,
  'puxada-unilateral': p65,
  'remada-apoiada': p66,
  'remada-baixa': p67,
  'remada-curvada-halteres': p68,
  'remada-elastico': p69,
  'remada-suspensao': p70,
  'remada-unilateral': p71,
  'remada-unilateral-kettlebell': p72,
  'remada-unilateral-polia': p73,
  'remada-unilateral-sem-banco': p74,
  'roda-abdominal': p75,
  'rosca-alternada': p76,
  'rosca-elastico': p77,
  'rosca-inclinada': p78,
  'rosca-kettlebell': p79,
  'rosca-martelo': p80,
  'rosca-polia': p81,
  'rosca-scott-banco-inclinado': p82,
  'rosca-suspensao': p83,
  'stiff': p84,
  'stiff-elastico': p85,
  'stiff-kettlebell': p86,
  'stiff-unilateral': p87,
  'supino-chao-halteres': p88,
  'supino-inclinado': p89,
  'supino-reto': p90,
  'triceps-corda': p91,
  'triceps-elastico-acima': p92,
  'triceps-frances': p93,
  'triceps-frances-halter': p94,
  'triceps-frances-kettlebell': p95,
  'triceps-frances-polia-unilateral': p96,
  'triceps-suspensao': p97,
  'triceps-testa-halteres': p98,
  'yt-suspensao': p99,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
