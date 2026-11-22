// Regras medidas dos exercícios com a barra longa tirada do suporte (agachamento, supino reto e desenvolvimento em pé
// com barra). As marcas que elas leem vêm do quadro de cada exercício: `barra` (o centro da barra), `gancho` (o berço
// do gancho: a altura e onde fica), `pino` (o topo do pino de segurança) e, no agachamento, `meioDoPe`.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { folgaDaBarra, raioDaBarra } from '../exercicios/barra-nas-costas';
import { folgaDaBarraNosPontos, peleDensa } from '../exercicios/com-barra-longa';
import { obj } from '../tabelas';
import { add, dist, dot, mul, sub } from '../vec';

const marca = (q: Parameters<Regra>[0][number], nome: string) => {
  const m = q.marcas[nome];
  if (!m) throw new Error(`a regra precisa da marca "${nome}" no quadro`);
  return m;
};

export const REGRAS_BARRA_NO_SUPORTE: Record<string, Regra> = {
  // ----- agachamento -----
  'barra-sobre-o-meio-do-pe': (q) => {
    const d = q.map((x) => marca(x, 'barra')[2] - marca(x, 'meioDoPe')[2]);
    const [a, b] = faixa(d);
    const pior = Math.max(Math.abs(a), Math.abs(b));
    return { medido: `a barra fica de ${f1(a)} a ${f1(b)} cm do meio do pé (para a frente +), da posição em pé até embaixo`, ok: pior <= 1 };
  },
  'barra-apoiada-nas-costas': (q) => {
    const fol = faixa(q.filter((_, i) => i % 6 === 0 || i === q.length - 1).map((x) => folgaDaBarra(x.esq, marca(x, 'barra'), x.esq.torax.x, ['tronco', 'pescoco', 'cabeca'], 24).folga));
    const ombro = Math.min(...q.filter((_, i) => i % 6 === 0).map((x) => folgaDaBarra(x.esq, marca(x, 'barra'), x.esq.torax.x, ['braco'], 40).folga));
    const c7 = q.map((x) => dist(marca(x, 'barra'), x.esq.torax.o));
    return { medido: `da barra à pele das costas, de ${f1(fol[0])} a ${f1(fol[1])} cm (o centro dela a ${f1(Math.min(...c7))} cm da base do pescoço); até a pele dos ombros e dos braços, no mínimo ${f1(ombro)} cm`, ok: fol[0] >= -0.6 && fol[1] <= 0.6 && ombro >= -1 };
  },
  'ganchos-no-meio-do-peito': (q, corpo) => {
    const g = marca(q[0]!, 'gancho')[1],
      peito = corpo.m('altura.peito');
    return { medido: `o berço do gancho a ${f1(g)} cm do chão; a altura do peito (no mamilo) é ${f1(peito)} cm`, ok: Math.abs(g - peito) <= obj('suporte', 'passo') / 2 + 0.01 };
  },
  'pinos-logo-abaixo-da-barra': (q) => {
    const fim = q[q.length - 1]!;
    const baixo = Math.min(...q.map((x) => marca(x, 'barra')[1])) - raioDaBarra();
    const pino = marca(fim, 'pino');
    const folga = baixo - pino[1];
    // a barra embaixo fica sobre os pinos: entre a face do montante e a ponta do pino
    const zb = marca(fim, 'barra')[2],
      zFace = pino[2] - obj('suporte', 'tubo') / 2,
      zPonta = zFace - obj('suporte', 'pinoComp');
    const sobre = zb <= zFace && zb >= zPonta;
    return { medido: `embaixo, a barra passa ${f1(folga)} cm acima do topo dos pinos e fica ${f1(zb - zPonta)} cm para dentro da ponta deles`, ok: folga > 0 && folga <= 5.5 && sobre };
  },
  'barra-longe-dos-ganchos': (q) => {
    // a ponta do gancho fica a `ganchoProf` da face do montante; a barra passa atrás dela (do lado da pessoa)
    const g = marca(q[0]!, 'gancho');
    const zPonta = marca(q[0]!, 'pino')[2] - obj('suporte', 'tubo') / 2 - obj('suporte', 'ganchoProf');
    const d = Math.min(...q.map((x) => zPonta - marca(x, 'barra')[2] - raioDaBarra()));
    return { medido: `a barra passa no mínimo ${f1(d)} cm atrás da ponta do gancho (o berço a ${f1(g[1])} cm do chão)`, ok: d >= 5 };
  },
  // ----- supino reto -----
  'barra-toca-o-meio-do-peito': (q, corpo) => {
    const fim = q[q.length - 1]!;
    const b = marca(fim, 'barra');
    const fol = folgaDaBarra(fim.esq, b, [1, 0, 0], ['tronco'], 26).folga;
    // onde ela toca, ao longo do tronco, contra a linha do mamilo (abaixo da base do pescoço)
    const ao = -dot(sub(b, fim.esq.torax.o), fim.esq.torax.y);
    const linha = corpo.m('altura.cervical') - corpo.m('altura.peito');
    const ombro = Math.min(...q.filter((_, i) => i % 6 === 0).map((x) => folgaDaBarra(x.esq, marca(x, 'barra'), [1, 0, 0], ['tronco', 'pescoco', 'cabeca'], 26).folga));
    return { medido: `embaixo, a barra fica a ${f1(fol)} cm da pele do peito, ${f1(ao)} cm abaixo da base do pescoço ao longo do tronco (a linha do mamilo fica a ${f1(linha)} cm); no caminho, nunca menos de ${f1(ombro)} cm do corpo`, ok: Math.abs(fol) <= 0.6 && Math.abs(ao - linha) <= 2 && ombro >= -0.6 };
  },
  'barra-sobre-os-ombros-no-topo': (q) => {
    const ini = q[0]!.esq;
    const b = marca(q[0]!, 'barra');
    const d = Math.abs(b[2] - (ini.lado.R.ombro[2] + ini.lado.L.ombro[2]) / 2);
    const cot = ini.lado.R.ang.cotovelo;
    return { medido: `em cima, a barra fica a ${f1(d)} cm da vertical dos ombros e o cotovelo dobra ${f1(cot)}°`, ok: d <= 3 && cot >= 5 && cot <= 20 };
  },
  'olhos-embaixo-dos-ganchos': (q) => {
    const x = q[0]!;
    const g = marca(x, 'gancho'),
      o = marca(x, 'olhos'),
      b = marca(x, 'barra');
    const nos = g[1] + raioDaBarra();
    const cab = marca(x, 'cabecaDoBanco');
    const alem = marca(x, 'pino')[2] - cab[2];
    return {
      medido: `a barra nos ganchos fica ${f1(Math.abs(g[2] - o[2]))} cm à frente ou atrás dos olhos, com o centro a ${f1(nos)} cm do chão, ${f1(b[1] - nos)} cm abaixo da barra em cima (o berço a ${f1(g[1])} cm: a IPF regula de 75 a 110); a ponta do banco passa ${f1(alem)} cm do centro dos montantes (a IPF pede 22 ± 5)`,
      ok: Math.abs(g[2] - o[2]) <= 3 && b[1] - nos >= 2 && b[1] - nos <= 8 && g[1] >= obj('suporte', 'ganchoMin') && g[1] <= 110,
    };
  },
  'travas-logo-abaixo-do-peito': (q) => {
    const fim = q[q.length - 1]!;
    const baixo = marca(fim, 'barra')[1] - raioDaBarra();
    const pino = marca(fim, 'pino');
    const folga = baixo - pino[1];
    const zb = marca(fim, 'barra')[2],
      zFace = pino[2] + obj('suporte', 'tubo') / 2,
      zPonta = zFace + obj('suporte', 'pinoComp');
    return { medido: `com a barra no peito, o topo das travas fica ${f1(folga)} cm abaixo dela, e a barra ${f1(zPonta - zb)} cm para dentro da ponta delas`, ok: folga > 0 && folga <= 4.5 && zb >= zFace && zb <= zPonta };
  },
  // ----- desenvolvimento em pé -----
  'barra-no-alto-do-peito': (q, corpo, ex) => {
    const x = q[0]!;
    const b = marca(x, 'barra');
    // (acréscimo de 19/11/2026, só quando a ficha tem `barra.folgaNoPeito`: o desenvolvimento em pé com barra) a folga
    // medida na pele densa, a mesma em que a animação apoia a barra; nos 12 pontos de cada anel, a barra que encosta na
    // pele densa fica a 1,2 cm dos pontos, e a que encostava nos pontos entrava 1,3 cm no peito (regra peso-fora-do-corpo)
    const densa = !!ex && 'barra.folgaNoPeito' in ex.ficha.param;
    const fol = densa
      ? folgaDaBarraNosPontos(peleDensa(x.esq, new Set(['tronco', 'pescoco'])), add(b, mul(x.esq.torax.x, -21)), add(b, mul(x.esq.torax.x, 21)))
      : folgaDaBarra(x.esq, b, x.esq.torax.x, ['tronco', 'pescoco'], 21).folga;
    const ao = -dot(sub(b, x.esq.torax.o), x.esq.torax.y);
    const alto = corpo.m('altura.cervical') - corpo.m('altura.supraesternal');
    const frente = Math.min(x.esq.lado.R.cotovelo[2], x.esq.lado.L.cotovelo[2]) - b[2];
    return { medido: `embaixo, a barra fica a ${f1(fol)} cm da pele do peito${densa ? ' (pele densa)' : ''}, ${f1(ao)} cm abaixo da base do pescoço ao longo do tronco (o alto do esterno fica a ${f1(alto)} cm); os cotovelos ficam ${f1(frente)} cm à frente dela`, ok: Math.abs(fol) <= 0.6 && Math.abs(ao - alto) <= 1.5 && frente > 0 };
  },
  'barra-rente-ao-rosto': (q) => {
    let min = 1e9,
      qual = '';
    for (const x of q.filter((_, i) => i % 2 === 0)) {
      const r = folgaDaBarra(x.esq, marca(x, 'barra'), x.esq.torax.x, ['cabeca', 'pescoco'], 21);
      if (r.folga < min) {
        min = r.folga;
        qual = r.parte;
      }
    }
    const pesc = Math.min(...q.map((x) => x.esq.pose.cervical ?? 0));
    return { medido: `a barra passa a no mínimo ${f1(min)} cm da pele (${qual === 'cabeca' ? 'da cabeça' : 'do pescoço'}); o pescoço estende até ${f1(-pesc)}° para ela passar`, ok: min >= 0.5 && min <= 3 };
  },
  'barra-sobre-os-ombros-em-cima': (q) => {
    const x = q[q.length - 1]!;
    const b = marca(x, 'barra');
    const d = Math.abs(b[2] - (x.esq.lado.R.ombro[2] + x.esq.lado.L.ombro[2]) / 2);
    const cot = x.esq.lado.R.ang.cotovelo;
    return { medido: `em cima, a barra fica a ${f1(d)} cm da vertical dos ombros e o cotovelo dobra ${f1(cot)}°`, ok: d <= 3 && cot >= 5 && cot <= 20 };
  },
};
