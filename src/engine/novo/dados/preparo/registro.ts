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
import p35 from './elevacao-lateral-unilateral-elastico.json';
import p36 from './extensao-joelho-caneleira.json';
import p37 from './extensao-joelho-elastico.json';
import p38 from './extensao-triceps-peso-corpo.json';
import p39 from './face-pull.json';
import p40 from './face-pull-elastico.json';
import p41 from './flexao.json';
import p42 from './flexao-bola.json';
import p43 from './flexao-elastico.json';
import p44 from './flexao-fechada.json';
import p45 from './flexao-joelho-deslizante.json';
import p46 from './flexao-joelho-elastico.json';
import p47 from './flexao-joelho-suspensao.json';
import p48 from './flexao-pes-elevados.json';
import p49 from './goblet.json';
import p50 from './nordico.json';
import p51 from './panturrilha.json';
import p52 from './panturrilha-b.json';
import p53 from './panturrilha-chao.json';
import p54 from './panturrilha-degrau.json';
import p55 from './panturrilha-sentada-halter.json';
import p56 from './pike.json';
import p57 from './ponte-gluteo.json';
import p58 from './ponte-gluteo-halter.json';
import p59 from './ponte-kettlebell.json';
import p60 from './ponte-pes-bola.json';
import p61 from './puxada-elastico.json';
import p62 from './puxada-unilateral.json';
import p63 from './remada-apoiada.json';
import p64 from './remada-baixa.json';
import p65 from './remada-curvada-halteres.json';
import p66 from './remada-elastico.json';
import p67 from './remada-suspensao.json';
import p68 from './remada-unilateral.json';
import p69 from './remada-unilateral-kettlebell.json';
import p70 from './remada-unilateral-polia.json';
import p71 from './remada-unilateral-sem-banco.json';
import p72 from './roda-abdominal.json';
import p73 from './rosca-alternada.json';
import p74 from './rosca-elastico.json';
import p75 from './rosca-inclinada.json';
import p76 from './rosca-kettlebell.json';
import p77 from './rosca-martelo.json';
import p78 from './rosca-martelo-elastico.json';
import p79 from './rosca-polia.json';
import p80 from './rosca-scott-banco-inclinado.json';
import p81 from './rosca-suspensao.json';
import p82 from './stiff.json';
import p83 from './stiff-elastico.json';
import p84 from './stiff-kettlebell.json';
import p85 from './stiff-unilateral.json';
import p86 from './supino-chao-halteres.json';
import p87 from './supino-inclinado.json';
import p88 from './supino-reto.json';
import p89 from './triceps-corda.json';
import p90 from './triceps-elastico-acima.json';
import p91 from './triceps-elastico-alto.json';
import p92 from './triceps-frances.json';
import p93 from './triceps-frances-halter.json';
import p94 from './triceps-frances-kettlebell.json';
import p95 from './triceps-frances-polia-unilateral.json';
import p96 from './triceps-suspensao.json';
import p97 from './triceps-testa-halteres.json';
import p98 from './yt-suspensao.json';

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
  'elevacao-lateral-unilateral-elastico': p35,
  'extensao-joelho-caneleira': p36,
  'extensao-joelho-elastico': p37,
  'extensao-triceps-peso-corpo': p38,
  'face-pull': p39,
  'face-pull-elastico': p40,
  'flexao': p41,
  'flexao-bola': p42,
  'flexao-elastico': p43,
  'flexao-fechada': p44,
  'flexao-joelho-deslizante': p45,
  'flexao-joelho-elastico': p46,
  'flexao-joelho-suspensao': p47,
  'flexao-pes-elevados': p48,
  'goblet': p49,
  'nordico': p50,
  'panturrilha': p51,
  'panturrilha-b': p52,
  'panturrilha-chao': p53,
  'panturrilha-degrau': p54,
  'panturrilha-sentada-halter': p55,
  'pike': p56,
  'ponte-gluteo': p57,
  'ponte-gluteo-halter': p58,
  'ponte-kettlebell': p59,
  'ponte-pes-bola': p60,
  'puxada-elastico': p61,
  'puxada-unilateral': p62,
  'remada-apoiada': p63,
  'remada-baixa': p64,
  'remada-curvada-halteres': p65,
  'remada-elastico': p66,
  'remada-suspensao': p67,
  'remada-unilateral': p68,
  'remada-unilateral-kettlebell': p69,
  'remada-unilateral-polia': p70,
  'remada-unilateral-sem-banco': p71,
  'roda-abdominal': p72,
  'rosca-alternada': p73,
  'rosca-elastico': p74,
  'rosca-inclinada': p75,
  'rosca-kettlebell': p76,
  'rosca-martelo': p77,
  'rosca-martelo-elastico': p78,
  'rosca-polia': p79,
  'rosca-scott-banco-inclinado': p80,
  'rosca-suspensao': p81,
  'stiff': p82,
  'stiff-elastico': p83,
  'stiff-kettlebell': p84,
  'stiff-unilateral': p85,
  'supino-chao-halteres': p86,
  'supino-inclinado': p87,
  'supino-reto': p88,
  'triceps-corda': p89,
  'triceps-elastico-acima': p90,
  'triceps-elastico-alto': p91,
  'triceps-frances': p92,
  'triceps-frances-halter': p93,
  'triceps-frances-kettlebell': p94,
  'triceps-frances-polia-unilateral': p95,
  'triceps-suspensao': p96,
  'triceps-testa-halteres': p97,
  'yt-suspensao': p98,
};
for (const [id, p] of Object.entries(TODOS)) registrarPreparo(id, p);
