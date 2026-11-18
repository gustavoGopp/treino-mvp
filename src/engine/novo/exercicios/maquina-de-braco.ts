// O núcleo das máquinas de braço (a rosca na máquina e o tríceps na máquina): sentado na máquina
// (../pecas-de-cena/rosca-maquina.ts e ./triceps-maquina.ts), o glúteo no assento, os pés no chão, o tronco um pouco à
// frente e o peito no alto do apoio dos braços; os dois braços deitados no apoio, com os cotovelos no eixo da máquina,
// e as mãos presas no pegador o tempo todo. Só os antebraços giram em volta do cotovelo; a alavanca, que gira no mesmo
// eixo, vai com a mão (o pegador anda num arco em volta do eixo), e as placas sobem o arco do came.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - quanto o braço se afasta da face do apoio no ombro (o cotovelo fica no eixo, que está a uma altura fixa da face):
//    o bastante para a pele do tríceps amassar o estofado o que a ficha pede;
//  - onde fica a bacia: o ombro cai onde o braço, do cotovelo no eixo, chega (o tronco com a inclinação da ficha);
//  - a regulagem do assento, como quem treina faz antes da série ("adjust the seat height so the back of arms rest fully
//    on arm pad, aligning the elbows with the machine pivot", o manual da Hammer Strength): ele sobe até o glúteo;
//  - onde ficam os pés, para o joelho dobrar o ângulo da ficha;
//  - a distância do eixo ao centro da mão (o pegador corre na alavanca até ela).
import { pontosDoBoneco } from '../boneco';
import { calibragem } from '../calibragens';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { resolver1 } from '../movimento';
import type { Quadro } from '../movimento';
import type { Prim } from '../desenho';
import { chao } from '../pecas';
import { anguloNoPlanoDeLado, geometriaDaMaquinaDeBraco, maquinaDeBraco } from '../pecas-de-cena/rosca-maquina';
import type { ModeloDeBraco } from '../pecas-de-cena/rosca-maquina';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, dot, mul, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';

const rad = Math.PI / 180;

export interface OpcoesDeBraco {
  modelo: ModeloDeBraco;
  /** Quanto o glúteo e a coxa afundam no assento (cm). */
  amassa: number;
  /** Quanto a pele do tríceps afunda no apoio dos braços (cm). */
  apoioAmassa: number;
  /** A inclinação do tronco à frente (graus da pelve). */
  frente: number;
  /** A flexão da lombar além da curva de repouso (graus; sentado, um pouco menos curva). */
  lombar: number;
  /** O pescoço e a cabeça (graus; negativo = estende). */
  cervical: number;
  cabeca: number;
  /** Meia distância entre os pés (do meio ao centro da bola do pé) e o ângulo do joelho com o pé chapado no chão. */
  pesMeia: number;
  joelho: number;
  /** A escápula (graus da clavícula): à frente e para cima. */
  prot: number;
  elev: number;
  /** O giro do antebraço a partir da pegada neutra (graus, para fora): 85 = palma para cima (rosca); 0 = neutra (tríceps). */
  supinacao: number;
}

const g_ = (o: OpcoesDeBraco) => (id: string) => obj(o.modelo.objeto, id);

/**
 * Um braço deitado no apoio: do ombro ao cotovelo, ao longo da face, para baixo, com o ombro `inclina` graus mais longe
 * da face que o cotovelo; `sobe` (os erros) gira o braço no ombro para fora da face. O antebraço dobra `cotovelo` graus
 * para o lado do bíceps (para fora da face); o cotovelo aponta para dentro do estofado.
 */
export function bracoNoApoio(o: OpcoesDeBraco, k: Lado, cotovelo: number, inclina: number, sobe = 0): PoseBraco {
  const G = geometriaDaMaquinaDeBraco(o.modelo);
  const desce = mul(G.sobe, -1);
  const a = (sobe - inclina) * rad;
  const umero = norm(add(mul(desce, Math.cos(a)), mul(G.normal, Math.sin(a))));
  const frente = norm(add(mul(G.normal, Math.cos(a)), mul(desce, -Math.sin(a))));
  const c = cotovelo * rad;
  const antebraco = norm(add(mul(umero, Math.cos(c)), mul(frente, Math.sin(c))));
  const frenteAnte = norm(add(mul(frente, Math.cos(c)), mul(umero, -Math.sin(c))));
  const fora: V3 = [sinal(k), 0, 0];
  const sup = o.supinacao * rad;
  const polegar = norm(add(mul(frenteAnte, Math.cos(sup)), mul(fora, Math.sin(sup))));
  return { umero, antebraco, polo: mul(frente, -1), mao: { polegar, forma: 'pegada', diam: g_(o)('barraDiam') + 1 }, prot: o.prot, elev: o.elev };
}

/** O tronco sentado, inclinado `frente` graus à frente, com a lombar e o pescoço da ficha. */
export function troncoNaMaquinaDeBraco(corpo: Corpo, o: OpcoesDeBraco, pelve: V3, frente: number): Tronco {
  return resolverTronco(corpo, { pelve, frente, lombar: o.lombar, cervical: o.cervical, cabeca: o.cabeca });
}

/** Os pés chapados no chão, `bolaZ` à frente, na largura pedida. */
function pesNoChao(o: OpcoesDeBraco, bolaZ: number): Record<Lado, PosePerna> {
  const p = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * o.pesMeia, 0, bolaZ], dir: [sinal(k) * 0.12, 0, 1] }, polo: [sinal(k) * 0.2, 0.2, 1] });
  return { R: p('R'), L: p('L') };
}

/** Os pontos da pele do braço de um lado (do ombro ao cotovelo), separados pela distância ao eixo dele. */
export function peleDoBraco(e: Esq, k: Lado): V3[] {
  const L = e.lado[k];
  const eixo = sub(L.cotovelo, L.ombro),
    comp = Math.hypot(...eixo);
  return pontosDoBoneco(e)
    .filter(({ p, parte }) => {
      if (parte !== 'braco') return false;
      const t = dot(sub(p, L.ombro), eixo) / (comp * comp);
      const perto = add(L.ombro, mul(eixo, Math.max(0, Math.min(1, t))));
      return Math.hypot(...sub(p, perto)) < 9;
    })
    .map((x) => x.p);
}

/** Quanto um ponto entra pela face do apoio dos braços (cm; positivo = dentro), ou −∞ se ele não fica sobre a face. */
export function pelaFaceDoApoio(mod: ModeloDeBraco, p: V3): number {
  const G = geometriaDaMaquinaDeBraco(mod);
  const r = sub(p, G.bordaBaixo);
  const ao = dot(r, G.sobe);
  if (ao < 0 || ao > obj(mod.objeto, 'apoioComp') || Math.abs(p[0]) > G.meiaLarg || Math.abs(p[0]) < G.meiaVao) return -Infinity;
  return -dot(r, G.normal);
}
/** Quanto um ponto entra na caixa do apoio dos braços (cm; negativo = fora), contando os cantos redondos do estofado. */
const CAIXAS_DO_APOIO = new Map<string, Extract<Prim, { t: 'caixa' }>[]>();
export function naCaixaDoApoio(mod: ModeloDeBraco, p: V3): number {
  let caixas = CAIXAS_DO_APOIO.get(mod.objeto);
  if (!caixas) {
    const G = geometriaDaMaquinaDeBraco(mod);
    // as duas caixas em cruz do apoio dos braços: as que têm o eixo y na normal da face
    caixas = maquinaDeBraco({ alavanca: 90, inicio: 90, pegador: 30, assento: 50 }, mod).prims.filter((x): x is Extract<Prim, { t: 'caixa' }> => x.t === 'caixa' && x.cls === 'estofado' && Math.abs(dot(x.ref.y, G.normal)) > 0.999);
    CAIXAS_DO_APOIO.set(mod.objeto, caixas);
  }
  let m = -1e9;
  for (const c of caixas) {
    const l = paraRef(c.ref, p);
    m = Math.max(m, Math.min(c.meias[0] - Math.abs(l[0]), c.meias[1] - Math.abs(l[1]), c.meias[2] - Math.abs(l[2])));
  }
  return m;
}

/** A pele do glúteo e da coxa sobre o assento na altura `h`: a menor distância acima do topo dele (cm; negativo = afunda). */
export function apoioNoAssentoDeBraco(e: Esq, o: OpcoesDeBraco, h: number): number {
  const g = g_(o);
  const meia = g('assentoLarg') / 2,
    c = g('assentoComp');
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    // do fundo do assento até 10 cm da borda da frente: perto do joelho, a coxa se dobra sobre a borda
    if (!['pelve', 'coxa', 'cintura'].includes(parte) || Math.abs(p[0]) > meia || p[2] > -10 || p[2] < -c) continue;
    min = Math.min(min, p[1] - h);
  }
  return min;
}

/** A folga das costas (a parte de baixo do tronco e a bacia) no apoio da lombar (cm; negativo = entra), no tríceps. */
export function folgaNaLombar(e: Esq, o: OpcoesDeBraco, h: number): number {
  const G = maquinaDeBraco({ alavanca: 90, inicio: 90, pegador: 30, assento: h }, o.modelo).lombar;
  if (!G) return Infinity;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!['tronco', 'cintura', 'pelve'].includes(parte) || Math.abs(p[0]) > G.larg / 2 - 2) continue;
    const d = sub(p, G.meio);
    if (Math.abs(dot(d, G.sobe)) > G.comp / 2 - 2) continue;
    min = Math.min(min, dot(d, G.frente));
  }
  return min;
}

/** O que a calibração dá, para um corpo: a bacia, o braço no apoio, as regulagens e onde ficam os pés. */
export interface SentadoNaMaquinaDeBraco {
  pelve: V3;
  /** A inclinação do tronco à frente (graus da pelve). */
  frente: number;
  /** Quanto o ombro fica mais longe da face que o cotovelo (graus). */
  inclina: number;
  /** A altura do topo do assento (cm). */
  assento: number;
  /** A distância do eixo ao centro da mão (cm). */
  pegador: number;
  /** Onde fica a bola do pé (z). */
  bola: number;
}

/** Os braços nos dois lados, com o cotovelo dobrado `cotovelo` graus. */
const bracos = (o: OpcoesDeBraco, cotovelo: number, inclina: number, sobe = 0) => ({ R: bracoNoApoio(o, 'R', cotovelo, inclina, sobe), L: bracoNoApoio(o, 'L', cotovelo, inclina, sobe) });

/**
 * A calibração (uma vez por corpo e por exercício): o braço deitado no apoio com o cotovelo no eixo, a bacia, o
 * assento, os pés e a distância do eixo à mão. `cotovelo` é o ângulo de referência (o do começo do movimento).
 */
export function sentarNaMaquinaDeBraco(corpo: Corpo, o: OpcoesDeBraco, chave: string, cotovelo: number): SentadoNaMaquinaDeBraco {
  return calibragem(corpo, `${chave}:sentado`, () => {
    const G = geometriaDaMaquinaDeBraco(o.modelo);
    const PERNAS: Record<Lado, PosePerna> = { R: { coxa: [0, 0, 1], canela: [0, -1, 0], peDir: [0, 0, 1], polo: [0, 1, 0] }, L: { coxa: [0, 0, 1], canela: [0, -1, 0], peDir: [0, 0, 1], polo: [0, 1, 0] } };
    const montar = (pelve: V3, inclina: number, frente: number) => resolverMembros(troncoNaMaquinaDeBraco(corpo, o, pelve, frente), bracos(o, cotovelo, inclina), PERNAS);
    // a bacia com o cotovelo direito no eixo (o ombro depende do braço e do tronco: algumas passadas)
    const pelveCom = (inclina: number, frente: number): V3 => {
      let pelve: V3 = [0, G.eixo[1] - 35, G.eixo[2] - 40];
      for (let i = 0; i < 5; i++) {
        const c = montar(pelve, inclina, frente).lado.R.cotovelo;
        pelve = add(pelve, [0, G.eixo[1] - c[1], G.eixo[2] - c[2]]);
      }
      return pelve;
    };
    const fundo = (e: Esq) => Math.max(...peleDoBraco(e, 'R').map((p) => pelaFaceDoApoio(o.modelo, p)), -1e3);
    // o braço no apoio: o ombro sobe da face até o tríceps amassar o estofado o que a ficha pede
    const frente = o.frente;
    const inclina = resolver1((a) => fundo(montar(pelveCom(a, frente), a, frente)) - o.apoioAmassa, -15, 25, 18);
    const pelve = pelveCom(inclina, frente);
    // o assento: sobe até o glúteo (que afunda `amassa` cm); os pés: o joelho no ângulo da ficha
    const t = troncoNaMaquinaDeBraco(corpo, o, pelve, frente);
    const bola = resolver1((z) => resolverMembros(t, bracos(o, cotovelo, inclina), pesNoChao(o, z)).lado.R.ang.joelho - o.joelho, pelve[2] + 10, pelve[2] + 90, 30);
    const e = resolverMembros(t, bracos(o, cotovelo, inclina), pesNoChao(o, bola));
    const assento = apoioNoAssentoDeBraco(e, o, 0) + o.amassa;
    const L = e.lado.R;
    const pegador = Math.hypot(L.pegada[1] - G.eixo[1], L.pegada[2] - G.eixo[2]);
    return { pelve, frente, inclina, assento, pegador, bola };
  });
}

/**
 * Um desvio (os erros): o braço que sai do apoio (graus, no ombro) e o tronco que vai à frente (graus; negativo = para
 * trás). Com `acharTronco`, o tronco vai à frente ou para trás o que for preciso para a mão ficar no arco do pegador
 * com o cotovelo no ângulo pedido (e não o cotovelo, com o tronco parado).
 */
export interface DesvioDeBraco {
  sobe?: number;
  frente?: number;
  acharTronco?: boolean;
}

/** O primeiro ponto, saindo de `x0` para os dois lados de grau em grau, em que `fn` troca de sinal (dentro de [a, b]). */
function maisPerto(fn: (x: number) => number, x0: number, a: number, b: number): number | undefined {
  const s0 = Math.sign(fn(x0));
  for (let d = 1; d <= b - a; d++) {
    if (x0 + d <= b && Math.sign(fn(x0 + d)) !== s0) return resolver1(fn, x0 + d - 1, x0 + d, 20);
    if (x0 - d >= a && Math.sign(fn(x0 - d)) !== s0) return resolver1(fn, x0 - d, x0 - d + 1, 20);
  }
  return undefined;
}

/**
 * O corpo com o cotovelo dobrado `cotovelo` graus. Com o braço fora do apoio (`sobe`), o cotovelo sai do eixo e a mão
 * continua presa no pegador: o cotovelo dobra o que for preciso para a mão ficar no arco do pegador (à mesma distância
 * do eixo), perto do ângulo pedido; ou, com `acharTronco`, o tronco se inclina o que for preciso.
 */
export function corpoNaMaquinaDeBraco(corpo: Corpo, o: OpcoesDeBraco, S: SentadoNaMaquinaDeBraco, cotovelo: number, dv: DesvioDeBraco = {}): Esq {
  const pes = pesNoChao(o, S.bola);
  const montar = (c: number, frente: number) => resolverMembros(troncoNaMaquinaDeBraco(corpo, o, S.pelve, S.frente + frente), bracos(o, c, S.inclina, dv.sobe ?? 0), pes);
  if (!dv.sobe && !dv.frente) return montar(cotovelo, 0);
  const G = geometriaDaMaquinaDeBraco(o.modelo);
  const raio = (e: Esq) => Math.hypot(e.lado.R.pegada[1] - G.eixo[1], e.lado.R.pegada[2] - G.eixo[2]) - S.pegador;
  if (dv.acharTronco) {
    const fr = maisPerto((x) => raio(montar(cotovelo, x)), 0, -40, 40);
    if (fr !== undefined) return montar(cotovelo, fr);
  }
  // a mão no arco do pegador: o ângulo do cotovelo mais perto do pedido em que ela fica à distância certa do eixo (o
  // arco da mão em volta do cotovelo cruza o do pegador em dois pontos: fica o mais perto)
  const fr = dv.frente ?? 0;
  const c = maisPerto((x) => raio(montar(x, fr)), cotovelo, 0, 170) ?? cotovelo;
  return montar(c, fr);
}

/** O ângulo da alavanca para um corpo: o do centro da mão direita em volta do eixo. */
export const alavancaDoCorpo = (o: OpcoesDeBraco, e: Esq) => anguloNoPlanoDeLado(sub(e.lado.R.pegada, geometriaDaMaquinaDeBraco(o.modelo).eixo));

/**
 * O quadro: o corpo, a máquina regulada para ele (o assento, o pegador na alavanca, a posição inicial, de onde as placas
 * começam a subir) e as marcas que as regras leem (../regras/maquinas-de-braco.ts e ../regras/cadeiras.ts).
 */
export function quadroNaMaquinaDeBraco(o: OpcoesDeBraco, S: SentadoNaMaquinaDeBraco, e: Esq, inicio: number, placas: number): Quadro {
  const alavanca = alavancaDoCorpo(o, e);
  const M = maquinaDeBraco({ alavanca, inicio, pegador: S.pegador, assento: S.assento, placas, pegadaMeia: Math.abs(e.lado.R.pegada[0]) }, o.modelo, { apoioAParte: true });
  const G = geometriaDaMaquinaDeBraco(o.modelo);
  const lombar = folgaNaLombar(e, o, S.assento);
  return {
    esq: e,
    prims: [chao(-90, 90, -110, 110), ...M.prims],
    pecas: [{ ...M.fixa, cenario: true }, M.apoio!, M.pilha, M.movel],
    fios: [],
    cargas: [],
    marcas: {
      pegadorR: M.pegadores.R,
      pegadorL: M.pegadores.L,
      eixo: G.eixo,
      apoioBase: G.bordaBaixo,
      apoioSobe: G.sobe,
      apoioNormal: G.normal,
      apoioMedidas: [g_(o)('apoioComp'), G.meiaLarg, g_(o)('estofadoEsp')],
      apoioVao: [G.meiaVao, 0, 0],
      alavanca: [alavanca, inicio, g_(o)('cameDiam') / 2],
      pilha: [M.subida, 0, 0],
      assento: [apoioNoAssentoDeBraco(e, o, S.assento), 0, 0],
      costas: [Number.isFinite(lombar) ? lombar : 0, 0, 0],
      regulagem: [S.assento, S.pegador, inicio],
      tronco: [S.frente, S.inclina, 0],
    },
    vies: { maoR: 1, maoL: 1 },
  };
}
