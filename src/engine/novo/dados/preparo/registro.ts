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
import p7 from './abertura-elastico.json';
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
import p22 from './crucifixo-elastico.json';
import p23 from './crucifixo-halteres.json';
import p24 from './crucifixo-inclinado-halteres.json';
import p25 from './crucifixo-inverso.json';
import p26 from './crucifixo-invertido-polia.json';
import p27 from './crucifixo-polia.json';
import p28 from './desenvolvimento.json';
import p29 from './desenvolvimento-elastico.json';
import p30 from './desenvolvimento-unilateral-kettlebell.json';
import p31 from './elevacao-halteres.json';
import p32 from './elevacao-joelhos.json';
import p33 from './elevacao-joelhos-paralelas.json';
import p34 from './elevacao-lateral.json';
import p35 from './elevacao-lateral-elastico.json';
import p36 from './elevacao-lateral-unilateral-elastico.json';
import p37 from './extensao-joelho-caneleira.json';
import p38 from './extensao-joelho-elastico.json';
import p39 from './extensao-triceps-peso-corpo.json';
import p40 from './face-pull.json';
import p41 from './face-pull-elastico.json';
import p42 from './flexao.json';
import p43 from './flexao-bola.json';
import p44 from './flexao-elastico.json';
import p45 from './flexao-fechada.json';
import p46 from './flexao-joelho-deslizante.json';
import p47 from './flexao-joelho-elastico.json';
import p48 from './flexao-joelho-suspensao.json';
import p49 from './flexao-pes-elevados.json';
import p50 from './goblet.json';
import p51 from './nordico.json';
import p52 from './panturrilha.json';
import p53 from './panturrilha-b.json';
import p54 from './panturrilha-chao.json';
import p55 from './panturrilha-degrau.json';
import p56 from './panturrilha-sentada-halter.json';
import p57 from './pike.json';
import p58 from './ponte-gluteo.json';
import p59 from './ponte-gluteo-halter.json';
import p60 from './ponte-kettlebell.json';
import p61 from './ponte-pes-bola.json';
import p62 from './puxada-elastico.json';
import p63 from './puxada-unilateral.json';
import p64 from './remada-apoiada.json';
import p65 from './remada-baixa.json';
import p66 from './remada-curvada-halteres.json';
import p67 from './remada-elastico.json';
import p68 from './remada-suspensao.json';
import p69 from './remada-unilateral.json';
import p70 from './remada-unilateral-kettlebell.json';
import p71 from './remada-unilateral-polia.json';
import p72 from './remada-unilateral-sem-banco.json';
import p73 from './roda-abdominal.json';
import p74 from './rosca-alternada.json';
import p75 from './rosca-elastico.json';
import p76 from './rosca-inclinada.json';
import p77 from './rosca-kettlebell.json';
import p78 from './rosca-martelo.json';
import p79 from './rosca-martelo-elastico.json';
import p80 from './rosca-polia.json';
import p81 from './rosca-scott-banco-inclinado.json';
import p82 from './rosca-suspensao.json';
import p83 from './stiff.json';
import p84 from './stiff-elastico.json';
import p85 from './stiff-kettlebell.json';
import p86 from './stiff-unilateral.json';
import p87 from './supino-chao-halteres.json';
import p88 from './supino-inclinado.json';
import p89 from './supino-reto.json';
import p90 from './triceps-corda.json';
import p91 from './triceps-elastico-acima.json';
import p92 from './triceps-elastico-alto.json';
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
  'abducao-mini-band': p6,
  'abertura-elastico': p7,
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
  'crucifixo-elastico': p22,
  'crucifixo-halteres': p23,
  'crucifixo-inclinado-halteres': p24,
  'crucifixo-inverso': p25,
  'crucifixo-invertido-polia': p26,
  'crucifixo-polia': p27,
  'desenvolvimento': p28,
  'desenvolvimento-elastico': p29,
  'desenvolvimento-unilateral-kettlebell': p30,
  'elevacao-halteres': p31,
  'elevacao-joelhos': p32,
  'elevacao-joelhos-paralelas': p33,
  'elevacao-lateral': p34,
  'elevacao-lateral-elastico': p35,
  'elevacao-lateral-unilateral-elastico': p36,
  'extensao-joelho-caneleira': p37,
  'extensao-joelho-elastico': p38,
  'extensao-triceps-peso-corpo': p39,
  'face-pull': p40,
  'face-pull-elastico': p41,
  'flexao': p42,
  'flexao-bola': p43,
  'flexao-elastico': p44,
  'flexao-fechada': p45,
  'flexao-joelho-deslizante': p46,
  'flexao-joelho-elastico': p47,
  'flexao-joelho-suspensao': p48,
  'flexao-pes-elevados': p49,
  'goblet': p50,
  'nordico': p51,
  'panturrilha': p52,
  'panturrilha-b': p53,
  'panturrilha-chao': p54,
  'panturrilha-degrau': p55,
  'panturrilha-sentada-halter': p56,
  'pike': p57,
  'ponte-gluteo': p58,
  'ponte-gluteo-halter': p59,
  'ponte-kettlebell': p60,
  'ponte-pes-bola': p61,
  'puxada-elastico': p62,
  'puxada-unilateral': p63,
  'remada-apoiada': p64,
  'remada-baixa': p65,
  'remada-curvada-halteres': p66,
  'remada-elastico': p67,
  'remada-suspensao': p68,
  'remada-unilateral': p69,
  'remada-unilateral-kettlebell': p70,
  'remada-unilateral-polia': p71,
  'remada-unilateral-sem-banco': p72,
  'roda-abdominal': p73,
  'rosca-alternada': p74,
  'rosca-elastico': p75,
  'rosca-inclinada': p76,
  'rosca-kettlebell': p77,
  'rosca-martelo': p78,
  'rosca-martelo-elastico': p79,
  'rosca-polia': p80,
  'rosca-scott-banco-inclinado': p81,
  'rosca-suspensao': p82,
  'stiff': p83,
  'stiff-elastico': p84,
  'stiff-kettlebell': p85,
  'stiff-unilateral': p86,
  'supino-chao-halteres': p87,
  'supino-inclinado': p88,
  'supino-reto': p89,
  'triceps-corda': p90,
  'triceps-elastico-acima': p91,
  'triceps-elastico-alto': p92,
  'triceps-frances': p93,
  'triceps-frances-halter': p94,
  'triceps-frances-kettlebell': p95,
  'triceps-frances-polia-unilateral': p96,
  'triceps-suspensao': p97,
  'triceps-testa-halteres': p98,
  'yt-suspensao': p99,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
