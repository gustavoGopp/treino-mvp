// Motor novo: a conferência automática (npm run conferir:animacao). Percorre todos os quadros de uma animação e mede,
// em centímetros e graus: proporções, amplitudes, contatos, chão, objetos, cabos, velocidade, simetria, fecho do
// ciclo, equilíbrio e as regras da ficha. Cada item sai como "ok", "aviso" (dentro do possível, fora da média ou
// provisório) ou "falha".
import amplitudesJson from './dados/amplitudes.json';
import { LADOS, sinal } from './esqueleto';
import type { Esq, Lado } from './esqueleto';
import { malhaBase, pele } from './malha';
import { centroDeMassa, duracao, instante } from './movimento';
import type { Exercicio, Quadro } from './movimento';
import type { Corpo } from './tabelas';
import { OBJETOS } from './tabelas';
import { angulo, dist, dot, mul, norm, paraRef, sub } from './vec';
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
const f1 = (x: number) => (Math.round(x * 10) / 10).toString().replace('.', ',');

/** Ângulos anatômicos de um lado, medidos no esqueleto resolvido (graus). */
export function angulosDoLado(e: Esq, k: Lado) {
  const L = e.lado[k];
  const coxa = norm(sub(L.joelho, L.quadril));
  // flexão do quadril no plano de lado da pelve; a abertura para o lado é medida à parte
  const flexQuadril = Math.atan2(dot(coxa, e.pelve.z), -dot(coxa, e.pelve.y)) / (Math.PI / 180);
  const abducao = Math.asin(Math.max(-1, Math.min(1, dot(coxa, e.pelve.x) * sinal(k)))) / (Math.PI / 180);
  const canelaAcima = norm(sub(L.joelho, L.tornozelo));
  const dorsi = 90 - angulo(canelaAcima, L.pe.z);
  const dedos = mul(L.mao.y, -1),
    ante = mul(L.antebraco.y, -1);
  // extensão do punho: positiva quando o dorso da mão vai para o lado de trás do antebraço
  const punho = angulo(ante, dedos) * (dot(dedos, L.mao.z) <= 0 && dot(ante, L.mao.z) > 0 ? 1 : dot(ante, L.mao.z) > 0 ? 1 : -1);
  const dedosDoPe = angulo(L.pe.z, L.dedos.z);
  return { joelho: L.ang.joelho, cotovelo: L.ang.cotovelo, quadril: flexQuadril, abducaoDoQuadril: abducao, ombro: L.ang.elevacaoDoBraco, dorsiflexao: dorsi, pronacao: L.ang.pronacao - 90, punho, dedosDoPe, clavicula: L.ang.claviculaElev };
}

function faixa(v: number[]) {
  return [Math.min(...v), Math.max(...v)] as [number, number];
}
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
}

/** Regras da ficha da técnica: cada uma devolve o que mediu e se confere. */
type Regra = (q: Quadro[], corpo: Corpo) => { medido: string; ok: boolean };
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
    const P = pele(q[q.length - 1]!.esq);
    const esq = q[q.length - 1]!.esq;
    let min = 1e9;
    // o ponto mais baixo do tronco entre os ombros e a cintura
    for (let i = 0; i < P.length; i += 3) {
      const l = paraRef(esq.torax, [P[i]!, P[i + 1]!, P[i + 2]!]);
      if (l[1] < -4 && l[1] > -32 && Math.abs(l[0]) < 12) min = Math.min(min, P[i + 1]!);
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
    const [parte, lado] = c.split('.') as [string, Lado | undefined];
    const le = pontos[parte];
    if (!le) continue;
    const serie = quadros.map((q) => le(q.esq, lado ?? 'R'));
    const d = Math.max(...serie.flatMap((ps) => ps.map((p, j) => dist(p, serie[0]![j]!))));
    add('Contatos', `preso no lugar: ${c}`, `desloca no máximo ${f1(d)} cm no ciclo`, 'tolerância 0,1 cm', d <= 0.1 ? 'ok' : 'falha');
  }

  // 4) chão: nenhum ponto do corpo passa para baixo do chão (medido na malha, em 8 quadros do ciclo)
  let maisBaixo = 1e9;
  for (let i = 0; i < 8; i++) {
    const P = pele(quadros[Math.floor((i / 8) * n)]!.esq);
    for (let j = 1; j < P.length; j += 3) maisBaixo = Math.min(maisBaixo, P[j]!);
  }
  add('Chão', 'ponto mais baixo do corpo', `${f1(maisBaixo)} cm`, 'não pode passar de −1,5 cm (a sola e o joelho amassam um pouco)', maisBaixo >= -1.5 ? 'ok' : 'falha');

  // 5) objetos: a carga não voa (fica na mão) e o corpo não atravessa caixas (banco, colchonete)
  for (const [nome] of Object.entries(quadros[0]!.marcas).filter(([k]) => k === 'halter')) {
    const d = quadros.map((q) => Math.min(...LADOS.map((k) => dist(q.esq.lado[k].pegada, q.marcas[nome]!))));
    const [a, b] = faixa(d);
    add('Objetos', `a carga fica na mão: ${nome}`, `distância da mão ao centro do objeto de ${f1(a)} a ${f1(b)} cm`, 'não pode variar mais de 0,5 cm no ciclo', b - a <= 0.5 ? 'ok' : 'falha');
  }
  {
    const malha = malhaBase();
    const doCorpo = (i: number) => {
      const s = malha.segs[malha.segIdx[i * malha.inf]!]!;
      return !/^(mao|f\d\d|pe|dedos)/.test(s);
    };
    let pior = 0,
      qual = '';
    for (let i = 0; i < 6; i++) {
      const q = quadros[Math.floor((i / 6) * n)]!;
      const P = pele(q.esq);
      for (const p of q.prims) {
        if (p.t !== 'caixa' || p.cls === 'tapete') continue;
        for (let j = 0; j < malha.pontos; j++) {
          if (!doCorpo(j)) continue;
          const l = paraRef(p.ref, [P[j * 3]!, P[j * 3 + 1]!, P[j * 3 + 2]!]);
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
    else {
      const rel = OBJETOS.objetos.torre!.medidas.relacao!.v;
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
    const regra = REGRAS[r.id];
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

  const esquerdo = (c: keyof ReturnType<typeof angulosDoLado>) => faixa(ang.map((a) => a.R[c]));
  return {
    id: F.id,
    quadros: n,
    itens,
    angulos: { joelho: esquerdo('joelho'), cotovelo: esquerdo('cotovelo'), quadril: esquerdo('quadril'), ombro: esquerdo('ombro'), dorsiflexao: esquerdo('dorsiflexao'), punho: esquerdo('punho'), pronacao: esquerdo('pronacao'), clavicula: esquerdo('clavicula') },
    falhas: itens.filter((i) => i.nivel === 'falha').length,
    avisos: itens.filter((i) => i.nivel === 'aviso').length,
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
