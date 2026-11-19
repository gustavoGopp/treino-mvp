// Motor novo: a conferência automática (npm run conferir:animacao). Percorre todos os quadros de uma animação e mede,
// em centímetros e graus: proporções, amplitudes, contatos, chão, objetos, cabos, velocidade, simetria, fecho do
// ciclo, equilíbrio e as regras da ficha. Cada item sai como "ok", "aviso" (dentro do possível, fora da média ou
// provisório) ou "falha".
import amplitudesJson from './dados/amplitudes.json';
import { angulosDoLado, f1, faixa } from './conferir-util';
import type { Regra } from './conferir-util';
import * as REGRAS_DAS_FAMILIAS from './regras/registro';
import { APROVADOS } from './aprovados';
import { AREA_MINIMA, EMPURRADA, PASSO_DA_GRADE, PERTO_DA_PEGADA, PERTO_DO_TORNOZELO, RAIO_DA_PEGADA, TOL_CONTATO, TOL_FIO, TOL_PESO, medirPinturaEFios, quadrosMedidos, resumoDaPintura, resumoDosFios, resumoDosPesos } from './conferir-pintura';
import type { PinturaEFios } from './conferir-pintura';
import { LADOS, sinal } from './esqueleto';
import type { Esq, Lado } from './esqueleto';
import { pontosDoBoneco } from './boneco';
import { centroDeMassa, duracao, instante } from './movimento';
import type { Exercicio, Quadro } from './movimento';
import type { Corpo } from './tabelas';
import { OBJETOS } from './tabelas';
import { angulo, dist, mul, norm, paraRef, sub } from './vec';
import type { V3 } from './vec';

export type Nivel = 'ok' | 'aviso' | 'falha';
export interface ItemConferido {
  grupo: string;
  oQue: string;
  medido: string;
  limite: string;
  nivel: Nivel;
}
const LIM = amplitudesJson.limites as Record<string, { media: number; max: number; fonte: string }>;


function contraLimite(grupo: string, oQue: string, valor: number, id: string): ItemConferido {
  const l = LIM[id]!;
  const nivel: Nivel = valor > l.max + 0.5 ? 'falha' : valor > l.media + 0.5 ? 'aviso' : 'ok';
  return { grupo, oQue, medido: `${f1(valor)}°`, limite: `média ${f1(l.media)}°, máximo observado ${f1(l.max)}° (${l.fonte})`, nivel };
}

export interface Relatorio {
  id: string;
  quadros: number;
  itens: ItemConferido[];
  /** Ângulos mínimo e máximo no ciclo (lado direito), para a ficha do movimento. */
  angulos: Record<string, [number, number]>;
  falhas: number;
  avisos: number;
  /** O que as conferências da pintura e dos fios acharam (./conferir-pintura.ts). */
  pinturaEFios?: PinturaEFios;
}

/** Regras da ficha da técnica: cada uma devolve o que mediu e se confere. */
const REGRAS: Record<string, Regra> = {
  'quadril-na-altura-do-joelho': (q) => {
    const f = q[q.length - 1]!.esq;
    const d = f.lado.R.quadril[1] - f.lado.R.joelho[1];
    return { medido: `embaixo, o centro do quadril fica ${f1(Math.abs(d))} cm ${d <= 0 ? 'abaixo' : 'acima'} do centro do joelho`, ok: d <= 0.5 };
  },
  'joelho-na-direcao-do-pe': (q) => {
    // para onde o joelho anda (do alto até embaixo), visto de cima, contra a direção da ponta do pé
    const ini = q[0]!.esq,
      fim = q[q.length - 1]!.esq;
    const pior = Math.max(...LADOS.map((k) => angulo([fim.lado[k].joelho[0] - ini.lado[k].joelho[0], 0, fim.lado[k].joelho[2] - ini.lado[k].joelho[2]], fim.lado[k].dedos.z)));
    return { medido: `o joelho anda numa direção a ${f1(pior)}° da direção do pé (visto de cima)`, ok: pior <= 10 };
  },
  // ----- afundos e búlgaros (a perna da frente é a direita) -----
  'desce-reto': (q) => {
    const z = q.map((x) => x.esq.pelve.o[2]);
    const d = Math.max(...z) - Math.min(...z);
    return { medido: `o quadril anda no máximo ${f1(d)} cm para a frente ou para trás na descida`, ok: d <= 1 };
  },
  'joelho-de-tras-perto-do-chao': (q, corpo) => {
    const f = q[q.length - 1]!.esq;
    const folga = f.lado.L.joelho[1] - corpo.secoes.coxa![corpo.secoes.coxa!.length - 1]!.b;
    return { medido: `embaixo, a pele do joelho de trás fica a ${f1(folga)} cm do chão (o centro do joelho a ${f1(f.lado.L.joelho[1])} cm)`, ok: folga >= 1 && folga <= 10 };
  },
  'coxa-da-frente-perto-da-horizontal': (q) => {
    const f = q[q.length - 1]!.esq.lado.R;
    const a = Math.abs(Math.asin((f.quadril[1] - f.joelho[1]) / dist(f.quadril, f.joelho)) / (Math.PI / 180));
    return { medido: `embaixo, a coxa da frente fica a ${f1(a)}° da horizontal`, ok: a <= 15 };
  },
  'joelhos-quase-estendidos-em-cima': (q) => {
    const a = angulosDoLado(q[0]!.esq, 'R').joelho,
      b = angulosDoLado(q[0]!.esq, 'L').joelho;
    return { medido: `em cima, o joelho da frente dobra ${f1(a)}° e o de trás ${f1(b)}°`, ok: a <= 25 && b <= 25 };
  },
  'joelho-da-frente-quase-estendido-em-cima': (q) => {
    const a = angulosDoLado(q[0]!.esq, 'R').joelho;
    return { medido: `em cima, o joelho da frente dobra ${f1(a)}°`, ok: a <= 25 };
  },
  'tronco-levemente-a-frente': (q) => {
    const a = q.map((x) => Math.atan2(x.esq.torax.y[2], x.esq.torax.y[1]) / (Math.PI / 180));
    const [min, max] = faixa(a);
    return { medido: `o peito inclina de ${f1(min)}° a ${f1(max)}° para a frente`, ok: min >= 5 && max <= 25 };
  },
  'peito-do-pe-no-banco': (q) => {
    // o ponto mais baixo do pé de trás (a superfície do Boneco), contra o tampo do apoio, e a sola virada para cima
    const topo = q[0]!.marcas.apoioDoPe![1];
    const folgas = q.map((x) => {
      const L = x.esq.lado.L;
      let min = 1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe' && dist(p, L.tornozelo) < 24) min = Math.min(min, p[1]);
      return min - topo;
    });
    const [a, b] = faixa(folgas);
    const solaParaCima = q.every((x) => x.esq.lado.L.pe.y[1] < -0.7);
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.L.tornozelo, q[0]!.esq.lado.L.tornozelo)));
    return { medido: `o pé de trás fica de ${f1(a)} a ${f1(b)} cm do tampo do apoio, ${solaParaCima ? 'com a sola para cima' : 'SEM a sola para cima'}, e o tornozelo anda ${f1(anda)} cm`, ok: a >= -1 && b <= 1 && solaParaCima && anda <= 0.1 };
  },
  'peso-na-perna-da-frente': (q) => {
    const partes = q.map((x) => {
      const cm = centroDeMassa(x.esq, 'homem', x.cargas)[2];
      return (cm - x.esq.lado.L.tornozelo[2]) / (x.esq.lado.R.tornozelo[2] - x.esq.lado.L.tornozelo[2]);
    });
    const [a, b] = faixa(partes);
    return { medido: `o centro de massa (corpo + carga) fica de ${f1(a * 100)}% a ${f1(b * 100)}% do caminho entre o tornozelo de trás e o da frente`, ok: a >= 0.5 };
  },
  'mao-de-apoio-parada': (q) => {
    const anda = Math.max(...q.map((x) => dist(x.marcas.maoDeApoio!, q[0]!.marcas.maoDeApoio!)));
    const cot = faixa(q.map((x) => angulosDoLado(x.esq, 'L').cotovelo));
    return { medido: `a mão de apoio anda ${f1(anda)} cm no ciclo; o cotovelo desse braço dobra de ${f1(cot[0])}° a ${f1(cot[1])}°`, ok: anda <= 0.1 };
  },
  'passo-largo-para-tras': (q) => {
    const f = q[q.length - 1]!.esq;
    const d = f.lado.R.tornozelo[2] - f.lado.L.tornozelo[2];
    return { medido: `do tornozelo da frente ao de trás: ${f1(d)} cm`, ok: d >= 60 };
  },
  'peso-no-pe-da-frente': (q) => {
    const f = q[q.length - 1]!;
    const cm = centroDeMassa(f.esq, 'homem', f.cargas)[2];
    const frente = f.esq.lado.R.tornozelo[2],
      tras = f.esq.lado.L.bola[2];
    const parte = (cm - tras) / (frente - tras);
    return { medido: `embaixo, o centro de massa fica a ${f1(parte * 100)}% do caminho entre a ponta do pé de trás e o tornozelo da frente`, ok: parte >= 0.5 };
  },
  'tronco-quase-vertical': (q) => {
    const pior = Math.max(...q.map((x) => angulo(x.esq.torax.y, [0, 1, 0])));
    return { medido: `o peito inclina no máximo ${f1(pior)}° da vertical`, ok: pior <= 12 };
  },
  'pe-da-frente-inteiro-no-chao': (q) => {
    const pior = Math.max(...q.map((x) => Math.max(x.esq.lado.R.calcanhar[1], x.esq.lado.R.bola[1])));
    return { medido: `o calcanhar e a bola do pé da frente ficam a no máximo ${f1(pior)} cm do chão`, ok: pior <= 0.3 };
  },
  'peso-no-meio-do-pe': (q, corpo) => {
    const dB = corpo.m('pe.calcanharABola');
    const pior = Math.max(...q.map((x) => Math.abs(centroDeMassa(x.esq, 'homem', x.cargas)[2] - (x.esq.lado.L.bola[2] + x.esq.lado.L.calcanhar[2]) / 2)));
    return { medido: `o centro de massa (corpo + carga) fica a no máximo ${f1(pior)} cm do meio do pé (pé de ${f1(dB)} cm do calcanhar à bola)`, ok: pior <= 1 };
  },
  'lombar-neutra': (q) => {
    const m = Math.max(...q.map((x) => Math.abs(x.esq.pose.lombar ?? 0)));
    return { medido: `flexão da lombar além da curva de repouso: ${f1(m)}°`, ok: m <= 5 };
  },
  'corpo-em-linha': (q) => {
    const lado = (v: V3): V3 => [0, v[1], v[2]];
    const pior = Math.min(...q.map(({ esq }) => angulo(lado(sub(esq.lado.R.ombro, esq.lado.R.quadril)), lado(sub(esq.lado.R.tornozelo, esq.lado.R.quadril)))));
    return { medido: `de lado, ombro, quadril e tornozelo fazem no mínimo ${f1(pior)}° (180° = linha reta)`, ok: pior >= 172 };
  },
  'peito-perto-do-chao': (q) => {
    const esq = q[q.length - 1]!.esq;
    let min = 1e9;
    // o ponto mais baixo do tronco entre os ombros e a cintura
    for (const { p, parte } of pontosDoBoneco(esq)) {
      if (parte !== 'tronco') continue;
      const l = paraRef(esq.torax, p);
      if (l[1] < -4 && l[1] > -32 && Math.abs(l[0]) < 12) min = Math.min(min, p[1]);
    }
    return { medido: `embaixo, o peito fica a ${f1(min)} cm do chão`, ok: min >= 1 && min <= 9 };
  },
  'cotovelos-a-meio-caminho': (q) => {
    const esq = q[q.length - 1]!.esq,
      L = esq.lado.R;
    const b = norm(sub(L.cotovelo, L.ombro));
    const a = angulo([b[0], 0, b[2]], mul(esq.torax.y, -1));
    return { medido: `embaixo, o braço faz ${f1(a)}° com o tronco, visto de cima`, ok: a >= 30 && a <= 60 };
  },
  'antebraco-na-vertical': (q) => {
    const pior = Math.max(...q.map(({ esq }) => angulo(sub(esq.lado.R.punho, esq.lado.R.cotovelo), [0, 1, 0])));
    return { medido: `o antebraço desvia no máximo ${f1(pior)}° da vertical`, ok: pior <= 2 };
  },
  'cotovelos-30-60': (q) => {
    const esq = q[q.length - 1]!.esq,
      L = esq.lado.R;
    const b = norm(sub(L.cotovelo, L.ombro));
    const a = angulo([b[0], 0, b[2]], mul(esq.torax.y, -1));
    return { medido: `embaixo, o braço faz ${f1(a)}° com o tronco, visto de cima`, ok: a >= 30 && a <= 60 };
  },
  'halter-sobre-o-ombro-no-topo': (q) => {
    const L = q[0]!.esq.lado.R;
    const d = Math.hypot(L.pegada[0] - L.ombro[0], L.pegada[2] - L.ombro[2]);
    return { medido: `no topo, o halter fica a ${f1(d)} cm da vertical do ombro`, ok: d <= 8 };
  },
  'antebraco-na-linha-do-cabo': (q) => {
    // no início o cotovelo quase estendido alinha braço e antebraço; a regra vale da metade da puxada em diante
    const pior = Math.max(...q.filter((_, i) => i > q.length * 0.5).map((x) => {
      const L = x.esq.lado.R;
      const fio = x.prims.find((p) => p.t === 'fio' && p.cls === 'cabo');
      if (!fio || fio.t !== 'fio') return 0;
      return angulo(sub(L.punho, L.cotovelo), sub(fio.pts[1]!, fio.pts[0]!));
    }));
    return { medido: `da metade da puxada em diante, o antebraço desvia no máximo ${f1(pior)}° da linha do cabo`, ok: pior <= 12 };
  },
  'ombro-desce': (q) => {
    const d = q[0]!.esq.lado.R.acromioclavicular[1] - q[q.length - 1]!.esq.lado.R.acromioclavicular[1];
    return { medido: `do início ao fim, a ponta do ombro desce ${f1(d)} cm`, ok: d >= 2 };
  },
  'tronco-quase-parado': (q) => {
    const pts = q.map((x) => x.esq.torax.o);
    const m = Math.max(...pts.map((p) => dist(p, pts[0]!)));
    return { medido: `a base do pescoço se move no máximo ${f1(m)} cm`, ok: m <= 2 };
  },
};

/** As regras daqui e as dos arquivos de cada família (./regras/registro.ts). */
const TODAS_AS_REGRAS: Record<string, Regra> = (() => {
  const todas: Record<string, Regra> = { ...REGRAS };
  // duas famílias não podem dar o mesmo nome a regras diferentes: a segunda trocaria a primeira sem ninguém ver
  for (const [familia, regras] of Object.entries(REGRAS_DAS_FAMILIAS) as [string, Record<string, Regra>][])
    for (const [id, regra] of Object.entries(regras)) {
      if (id in todas) throw new Error(`regra "${id}" definida duas vezes (a segunda em ${familia}): dê um nome próprio à da família`);
      todas[id] = regra;
    }
  return todas;
})();

export function conferir(ex: Exercicio, corpo: Corpo, qps = 60): Relatorio {
  const F = ex.ficha;
  const T = duracao(F.fases);
  const n = Math.round(T * qps);
  const quadros: Quadro[] = [];
  for (let i = 0; i < n; i++) quadros.push(ex.quadro(corpo, instante(F.fases, (i / n) * T).u));
  const itens: ItemConferido[] = [];
  const add = (grupo: string, oQue: string, medido: string, limite: string, nivel: Nivel) => itens.push({ grupo, oQue, medido, limite, nivel });
  const m = (id: string) => corpo.m(id);

  // 1) proporções: cada osso tem o comprimento da tabela em todos os quadros, e nenhum membro deixa de alcançar o alvo
  const ossos: [string, (L: Esq['lado'][Lado]) => number, string][] = [
    ['braço', (L) => dist(L.ombro, L.cotovelo), 'braco.comp'],
    ['antebraço', (L) => dist(L.cotovelo, L.punho), 'antebraco.comp'],
    ['coxa', (L) => dist(L.quadril, L.joelho), 'coxa.comp'],
    ['perna', (L) => dist(L.joelho, L.tornozelo), 'perna.comp'],
  ];
  for (const [nome, med, id] of ossos) {
    const d = Math.max(...quadros.flatMap((q) => LADOS.map((k) => Math.abs(med(q.esq.lado[k]) - m(id)))));
    add('Proporções', `comprimento do osso: ${nome}`, `desvio máximo ${f1(d)} cm`, `tabela: ${f1(m(id))} cm; tolerância 0,1 cm`, d <= 0.1 ? 'ok' : 'falha');
  }
  const falta = Math.max(...quadros.flatMap((q) => LADOS.flatMap((k) => [q.esq.lado[k].falta.braco, q.esq.lado[k].falta.perna])));
  add('Proporções', 'membro que não alcança o alvo', `falta máxima ${f1(falta)} cm`, 'tolerância 0,1 cm', falta <= 0.1 ? 'ok' : 'falha');

  // 2) amplitudes
  const ang = quadros.map((q) => ({ R: angulosDoLado(q.esq, 'R'), L: angulosDoLado(q.esq, 'L') }));
  const maxDe = (c: keyof ReturnType<typeof angulosDoLado>) => Math.max(...ang.flatMap((a) => [a.R[c], a.L[c]]));
  const minDe = (c: keyof ReturnType<typeof angulosDoLado>) => Math.min(...ang.flatMap((a) => [a.R[c], a.L[c]]));
  itens.push(contraLimite('Amplitudes', 'flexão do joelho (máxima no ciclo)', maxDe('joelho'), 'joelho.flexao'));
  itens.push(contraLimite('Amplitudes', 'flexão do cotovelo', maxDe('cotovelo'), 'cotovelo.flexao'));
  itens.push(contraLimite('Amplitudes', 'flexão do quadril', maxDe('quadril'), 'quadril.flexao'));
  itens.push(contraLimite('Amplitudes', 'extensão do quadril', Math.max(0, -minDe('quadril')), 'quadril.extensao'));
  itens.push(contraLimite('Amplitudes', 'abertura do quadril para o lado', maxDe('abducaoDoQuadril'), 'quadril.abducao'));
  itens.push(contraLimite('Amplitudes', 'elevação do braço', maxDe('ombro'), 'ombro.elevacao'));
  itens.push(contraLimite('Amplitudes', 'dorsiflexão do tornozelo', maxDe('dorsiflexao'), 'tornozelo.dorsiflexao'));
  itens.push(contraLimite('Amplitudes', 'flexão plantar do tornozelo', Math.max(0, -minDe('dorsiflexao')), 'tornozelo.flexaoPlantar'));
  itens.push(contraLimite('Amplitudes', 'pronação do antebraço (a partir do polegar para cima)', Math.max(0, maxDe('pronacao')), 'antebraco.pronacao'));
  itens.push(contraLimite('Amplitudes', 'supinação do antebraço', Math.max(0, -minDe('pronacao')), 'antebraco.supinacao'));
  itens.push(contraLimite('Amplitudes', 'extensão do punho', Math.max(0, maxDe('punho')), 'punho.extensao'));
  itens.push(contraLimite('Amplitudes', 'extensão dos dedos do pé', maxDe('dedosDoPe'), 'dedosDoPe.extensao'));

  // 3) contatos: o que a ficha declara preso não sai do lugar
  const pontos: Record<string, (e: Esq, k: Lado) => V3[]> = { pe: (e, k) => [e.lado[k].bola, e.lado[k].ponta], mao: (e, k) => [e.lado[k].punho], joelho: (e, k) => [e.lado[k].joelho], pelve: (e) => [e.pelve.o] };
  for (const c of F.contatos) {
    // "pe.R:noChao": o pé que sai do chão e volta (a caminhada lateral) fica preso só enquanto apoia; em cada trecho
    // seguido de quadros com a bola do pé no chão, ele não sai do lugar
    if (c.endsWith(':noChao')) {
      const k = c.slice(3, 4) as Lado;
      const apoia = quadros.map((q) => q.esq.lado[k].bola[1] <= 0.05);
      // começa a contar num quadro com o pé no ar, para o trecho que atravessa o fim do ciclo não ficar partido
      const i0 = Math.max(0, apoia.indexOf(false));
      let d = 0,
        ref: V3[] | undefined;
      for (let j = 0; j < n; j++) {
        const i = (i0 + j) % n;
        if (!apoia[i]) {
          ref = undefined;
          continue;
        }
        const ps = pontos.pe!(quadros[i]!.esq, k);
        if (!ref) ref = ps;
        d = Math.max(d, ...ps.map((p, x) => dist(p, ref![x]!)));
      }
      const parte = apoia.filter(Boolean).length / n;
      add('Contatos', `preso no lugar enquanto apoia: ${c.slice(0, 4)}`, `no chão em ${f1(parte * 100)}% do ciclo; desloca no máximo ${f1(d)} cm enquanto apoia`, 'tolerância 0,1 cm', d <= 0.1 && parte > 0 ? 'ok' : 'falha');
      continue;
    }
    const [parte, lado] = c.split('.') as [string, Lado | undefined];
    const le = pontos[parte];
    if (!le) continue;
    const serie = quadros.map((q) => le(q.esq, lado ?? 'R'));
    const d = Math.max(...serie.flatMap((ps) => ps.map((p, j) => dist(p, serie[0]![j]!))));
    add('Contatos', `preso no lugar: ${c}`, `desloca no máximo ${f1(d)} cm no ciclo`, 'tolerância 0,1 cm', d <= 0.1 ? 'ok' : 'falha');
  }

  // 4) chão: nenhum ponto do corpo passa para baixo do chão (medido na superfície do Boneco, em 8 quadros do ciclo)
  let maisBaixo = 1e9;
  for (let i = 0; i < 8; i++) for (const { p } of pontosDoBoneco(quadros[Math.floor((i / 8) * n)]!.esq)) maisBaixo = Math.min(maisBaixo, p[1]);
  add('Chão', 'ponto mais baixo do corpo', `${f1(maisBaixo)} cm`, 'não pode passar de −1,5 cm (a sola e o joelho amassam um pouco)', maisBaixo >= -1.5 ? 'ok' : 'falha');
  // o corpo do erro também não atravessa o chão (a revisão de 15/11/2026 achou o "quadril cai" da flexão 9,5 cm abaixo dele)
  let maisBaixoNoErro = 1e9,
    qualErro = '';
  // (os quadros dos erros ficam guardados: a conferência da pintura usa os de u = 0, 0,5 e 1)
  const quadrosDosErros = new Map<string, Quadro>();
  for (const er of F.erros)
    for (let i = 0; i <= 6; i++) {
      const qe = ex.quadro(corpo, i / 6, er.id);
      quadrosDosErros.set(`${er.id}|${i / 6}`, qe);
      for (const { p } of pontosDoBoneco(qe.esq))
        if (p[1] < maisBaixoNoErro) {
          maisBaixoNoErro = p[1];
          qualErro = er.titulo;
        }
    }
  if (F.erros.length) add('Chão', 'ponto mais baixo do corpo nos erros desenhados', `${f1(maisBaixoNoErro)} cm (${qualErro})`, 'não pode passar de −1,5 cm', maisBaixoNoErro >= -1.5 ? 'ok' : 'falha');

  // 5) objetos: a carga não voa (fica na mão) e o corpo não atravessa caixas (banco, colchonete)
  for (const [nome] of Object.entries(quadros[0]!.marcas).filter(([k]) => k === 'halter' || k === 'kettlebell')) {
    const d = quadros.map((q) => Math.min(...LADOS.map((k) => dist(q.esq.lado[k].pegada, q.marcas[nome]!))));
    const [a, b] = faixa(d);
    add('Objetos', `a carga fica na mão: ${nome}`, `distância da mão ao centro do objeto de ${f1(a)} a ${f1(b)} cm`, 'não pode variar mais de 0,5 cm no ciclo', b - a <= 0.5 ? 'ok' : 'falha');
  }
  {
    // mãos e pés ficam de fora: eles encostam nas peças de propósito
    const fora = new Set(['mao', 'polegar', 'pe']);
    let pior = 0,
      qual = '';
    for (let i = 0; i < 6; i++) {
      const q = quadros[Math.floor((i / 6) * n)]!;
      const P = pontosDoBoneco(q.esq).filter((x) => !fora.has(x.parte));
      for (const p of q.prims) {
        if (p.t !== 'caixa' || p.cls === 'tapete') continue;
        for (const { p: pt } of P) {
          const l = paraRef(p.ref, pt);
          const dentro = Math.min(p.meias[0] - Math.abs(l[0]), p.meias[1] - Math.abs(l[1]), p.meias[2] - Math.abs(l[2]));
          if (dentro > pior) {
            pior = dentro;
            qual = p.cls;
          }
        }
      }
    }
    add('Objetos', 'o corpo atravessa uma peça (banco, coluna)', pior > 0 ? `até ${f1(pior)} cm para dentro (${qual})` : 'não atravessa', 'tolerância 2,5 cm (o corpo amassa o estofado)', pior <= 2.5 ? 'ok' : 'falha');
  }

  // 6) cabos, elásticos e fitas
  const ids = [...new Set(quadros.flatMap((q) => q.fios.map((x) => x.id)))];
  for (const id of ids) {
    const comp = quadros.map((q) => q.fios.find((x) => x.id === id)!);
    const [a, b] = faixa(comp.map((x) => x.comp));
    if (!comp[0]!.estica) add('Cabos', `${id}: não estica`, `comprimento de ${f1(a)} a ${f1(b)} cm`, 'não pode variar mais de 0,3 cm', b - a <= 0.3 ? 'ok' : 'falha');
    else if (id.startsWith('elastico')) {
      // o elástico estica de verdade: o que se confere é quanto (contra o comprimento em repouso da tabela) e que ele
      // está mais esticado onde a ficha diz (em cima, com as pernas quase estendidas)
      // qual elástico: o tubo da tabela, ou o objeto que o quadro declarar (um tubo ou uma faixa mais longa)
      const doObjeto = OBJETOS.objetos[comp[0]!.objeto ?? 'elastico'];
      if (!doObjeto?.medidas.comp || !doObjeto.medidas.esticaAte) throw new Error(`elástico "${comp[0]!.objeto}": a tabela de objetos precisa ter "comp" e "esticaAte"`);
      const repouso = doObjeto.medidas.comp.v,
        maximo = doObjeto.medidas.esticaAte.v;
      const noComeco = comp[0]!.comp / repouso;
      add('Cabos', 'elástico: quanto estica no ciclo (1 = comprimento em repouso)', `de ${f1(a / repouso)} a ${f1(b / repouso)} vezes (${f1(a)} a ${f1(b)} cm); em cima, ${f1(noComeco)} vezes`, `nunca frouxo (1 ou mais), mais esticado em cima e nunca além de ${f1(maximo)} vezes (o máximo do fabricante)`, b / repouso > maximo ? 'falha' : a / repouso >= 0.98 && Math.abs(noComeco - b / repouso) < 0.02 ? 'ok' : 'aviso');
    } else {
      // a relação da máquina: a da coluna de polia, ou a do objeto que o quadro declarar no cabo (uma estação com a
      // relação dela; acréscimo de 18/11/2026)
      const rel = (comp[0]!.objeto ? OBJETOS.objetos[comp[0]!.objeto]?.medidas.relacao?.v : undefined) ?? OBJETOS.objetos.torre!.medidas.relacao!.v;
      const pilha = quadros.map((q) => q.marcas.pilha?.[1] ?? 0);
      const esperado = (b - a) / rel,
        medido = Math.max(...pilha) - Math.min(...pilha);
      add('Cabos', `${id}: a pilha sobe o curso do cabo dividido pela relação da máquina (${rel}:1)`, `o cabo anda ${f1(b - a)} cm e a pilha sobe ${f1(medido)} cm`, `esperado ${f1(esperado)} cm; tolerância 0,3 cm`, Math.abs(esperado - medido) <= 0.3 ? 'ok' : 'falha');
    }
  }

  // 7) velocidade sem salto, 8) simetria e 9) fecho do ciclo
  const acompanha: [string, (e: Esq) => V3][] = [['quadril', (e) => e.pelve.o], ['cabeça', (e) => e.cabeca.o], ['mão direita', (e) => e.lado.R.pegada], ['mão esquerda', (e) => e.lado.L.pegada], ['cotovelo direito', (e) => e.lado.R.cotovelo], ['joelho direito', (e) => e.lado.R.joelho]];
  let piorRazao = 0,
    onde = '',
    pico = 0;
  for (const [nome, le] of acompanha) {
    const P = quadros.map((q) => le(q.esq));
    const v = P.map((p, i) => mul(sub(P[(i + 1) % n]!, p), qps));
    const vmax = Math.max(...v.map((x) => Math.hypot(...x)));
    if (vmax < 5) continue;
    pico = Math.max(pico, vmax);
    v.forEach((x, i) => {
      const s = Math.hypot(...sub(v[(i + 1) % n]!, x)) / vmax;
      if (s > piorRazao) {
        piorRazao = s;
        onde = `${nome}, ${instante(F.fases, (i / n) * T).fase.nome}`;
      }
    });
  }
  add('Ritmo', 'maior salto de velocidade entre dois quadros (a 60 quadros por segundo)', `${f1(piorRazao * 100)}% da velocidade de pico (${onde || 'sem movimento'}); pico de ${f1(pico)} cm/s`, 'movimento suave: até 15%; acima de 25% é tranco', piorRazao <= 0.15 ? 'ok' : piorRazao <= 0.25 ? 'aviso' : 'falha');
  if (F.simetrico) {
    const d = Math.max(...quadros.flatMap((q) => (['pegada', 'cotovelo', 'joelho', 'tornozelo'] as const).map((c) => {
      const a = q.esq.lado.R[c],
        b = q.esq.lado.L[c];
      return dist([-a[0], a[1], a[2]], b);
    })));
    add('Simetria', 'esquerda contra o espelho da direita (mão, cotovelo, joelho, tornozelo)', `diferença máxima ${f1(d)} cm`, 'tolerância 0,1 cm', d <= 0.1 ? 'ok' : 'falha');
  }
  {
    const d = Math.max(...acompanha.map(([, le]) => dist(le(quadros[n - 1]!.esq), le(quadros[0]!.esq))));
    add('Ciclo', 'o último quadro emenda no primeiro', `distância máxima ${f1(d)} cm`, 'até 0,5 cm', d <= 0.5 ? 'ok' : 'falha');
  }

  // 10) equilíbrio: quando só os pés apoiam, o centro de massa cai dentro do apoio
  if (F.contatos.every((c) => c.startsWith('pe.'))) {
    const fora = Math.max(...quadros.map((q) => {
      const cm = centroDeMassa(q.esq, 'homem', q.cargas);
      const z0 = Math.min(q.esq.lado.L.calcanhar[2], q.esq.lado.R.calcanhar[2]),
        z1 = Math.max(q.esq.lado.L.ponta[2], q.esq.lado.R.ponta[2]);
      return Math.max(z0 - cm[2], cm[2] - z1, 0);
    }));
    add('Equilíbrio', 'centro de massa (corpo + carga) sobre o apoio dos pés', fora > 0 ? `sai ${f1(fora)} cm do apoio` : 'sempre dentro do apoio', 'do calcanhar à ponta do pé', fora <= 0 ? 'ok' : 'falha');
  }

  // 11) regras da ficha da técnica
  const meio = quadros.slice(0, Math.floor(n * (F.fases[0]!.dur + F.fases[1]!.dur) / T) + 1);
  for (const r of F.regras) {
    const regra = TODAS_AS_REGRAS[r.id];
    if (!regra) {
      add('Ficha', r.pede, 'sem medição automática', r.selo, 'aviso');
      continue;
    }
    const x = regra(meio, corpo);
    add('Ficha', `${r.pede} (${r.selo})`, x.medido, 'como a ficha pede', x.ok ? 'ok' : 'falha');
  }

  // 12) o que ainda é provisório nesta animação
  const desenho = Object.entries(F.param).filter(([, p]) => p.selo === 'desenho' && !/^erro\./.test(p.o) && !p.o.startsWith('erro'));
  if (desenho.length) add('Provisórios', 'linhas da ficha do movimento sem número na ficha da técnica (escolha de desenho)', desenho.map(([k]) => k).join(', '), 'cada uma precisa de fonte ou do ok do Gustavo', 'aviso');

  // 13) pintura e fios dentro do corpo (acréscimo de 19/11/2026, depois das auditorias de 18/11; ./conferir-pintura.ts):
  // nas animações aprovadas antes de 17/11 o achado é aviso (para não travar o trabalho); nas outras, falha
  const medidos = quadrosMedidos(ex, corpo, quadros, (erro, u) => quadrosDosErros.get(`${erro}|${u}`));
  const pinturaEFios = medirPinturaEFios(ex, medidos);
  const aprovada = APROVADOS[F.id];
  const nivelDoAchado: Nivel = aprovada && aprovada.em < '2026-11-17' ? 'aviso' : 'falha';
  const vistasMedidas = medidos.reduce((s, x) => s + x.vistas.length, 0);
  const curto = (l: string[]) => (l.length > 6 ? [...l.slice(0, 6), `e mais ${l.length - 6}`] : l).join('; ');
  {
    const erradas = pinturaEFios.pintura.filter((a) => !a.deProposito),
      dePropos = pinturaEFios.pintura.filter((a) => a.deProposito);
    const r = resumoDaPintura(erradas);
    const p = dePropos.length ? ` (fora ${resumoDaPintura(dePropos).length} caso(s) de peça que vai para trás do corpo de propósito: cenário ou empurrada)` : '';
    add(
      'Pintura',
      'peça pintada por cima de uma parte do corpo que está na frente dela, ou o contrário (cada vista, a técnica e os erros, os dois lados do corpo)',
      r.length ? curto(r) + p : `nada em ${medidos.length} quadros, ${vistasMedidas} quadro-vistas${p}`,
      `uma parte com ${f1(AREA_MINIMA)} cm² ou mais pintados do jeito errado (grade de ${f1(PASSO_DA_GRADE)} cm); contato: mais de ${f1(TOL_CONTATO)} cm à frente ao longo do raio e mais de ${f1(TOL_CONTATO)} cm fora da outra; a mão não conta contra a peça que segura (a ${f1(RAIO_DA_PEGADA)} cm da pegada, e a mesma peça até ${f1(PERTO_DA_PEGADA)} cm); peça de cenário ou empurrada ${EMPURRADA} cm para trás não conta`,
      r.length ? nivelDoAchado : 'ok',
    );
  }
  {
    const r = resumoDosFios(pinturaEFios.fios);
    add(
      'Fios',
      'cabo, corda, fita ou elástico dentro do corpo (a técnica e os erros)',
      r.length ? curto(r) : `nenhum entra além da tolerância em ${medidos.length} quadros`,
      `a linha do meio do fio até ${f1(TOL_FIO)} cm dentro da pele; fora a mão, o polegar, o pé e a canela até ${PERTO_DO_TORNOZELO} cm do tornozelo (onde o fio se prende)`,
      r.length ? nivelDoAchado : 'ok',
    );
  }
  {
    // 14) peso rígido dentro do corpo (acréscimo de 19/11/2026: o halter que entra no corpo no fim da remada)
    const r = resumoDosPesos(pinturaEFios.pesos);
    add(
      'Pesos',
      'halter, kettlebell, anilha ou barra dentro do corpo (a técnica e os erros)',
      r.length ? curto(r) : `nenhum entra além da tolerância em ${medidos.length} quadros`,
      `o volume do peso até ${f1(TOL_PESO)} cm dentro da pele; fora a mão e o polegar (onde a mão segura)`,
      r.length ? nivelDoAchado : 'ok',
    );
  }

  const esquerdo = (c: keyof ReturnType<typeof angulosDoLado>) => faixa(ang.map((a) => a.R[c]));
  return {
    id: F.id,
    quadros: n,
    itens,
    angulos: { joelho: esquerdo('joelho'), cotovelo: esquerdo('cotovelo'), quadril: esquerdo('quadril'), ombro: esquerdo('ombro'), dorsiflexao: esquerdo('dorsiflexao'), punho: esquerdo('punho'), pronacao: esquerdo('pronacao'), clavicula: esquerdo('clavicula') },
    falhas: itens.filter((i) => i.nivel === 'falha').length,
    avisos: itens.filter((i) => i.nivel === 'aviso').length,
    pinturaEFios,
  };
}
/** O que ainda é provisório nas tabelas (corpo e objetos): a conferência lista, para ninguém esquecer. */
export function provisorios(corpo: Corpo): { corpo: string[]; objetos: string[] } {
  return {
    corpo: Object.entries(corpo.medidas).filter(([, x]) => x.tipo === 'provisoria').map(([k, x]) => `${k} = ${x.v} ${x.un} (${x.onde})`),
    objetos: Object.entries(OBJETOS.objetos).flatMap(([o, ob]) => Object.entries(ob.medidas).filter(([, x]) => x.tipo === 'provisoria').map(([k, x]) => `${o}.${k} = ${x.v} ${x.un} (${x.onde})`)),
  };
}
export { sinal };
export { angulosDoLado, f1, faixa } from './conferir-util';
export type { Regra } from './conferir-util';
