// O núcleo comum dos tríceps franceses do motor novo (na polia com a corda, com um halter e com um kettlebell): o
// braço acima da cabeça fica parado e só o cotovelo dobra e estende, levando a carga para trás da cabeça e de volta.
// O que ele resolve em cada quadro, em vez de receber pronto:
//  - o braço (ombro → cotovelo) é uma direção fixa no tronco: elevado `braco.elevacao` graus a partir do braço
//    pendurado, à frente, e puxado `braco.paraDentro` graus para o meio (cotovelos perto da cabeça). Como a direção não
//    muda, a clavícula e a escápula (que acompanham a elevação do braço) também não mudam: o ombro e o cotovelo ficam
//    parados no tronco;
//  - o antebraço dobra `cotovelo` graus a partir do braço, para trás da cabeça, e gira em volta do braço até as duas
//    mãos ficarem na distância que a carga pede (as duas seguram a mesma carga);
//  - a carga segue as mãos: a corda vai da mão à bucha, esticada pelo cabo; o halter fica com a cabeça de cima nas
//    palmas; o kettlebell fica seguro pelas hastes da alça. A inclinação da carga nas mãos sai da ficha (`carga.giro.*`),
//    e a mão fecha nela com o punho no ângulo que essa inclinação dá (a conferência mede a extensão do punho).
// Cada variação traz a sua ficha de movimento; a postura sai da carga: em pé e inclinado à frente, de costas para a
// polia (corda, e o estribo de uma mão, com a polia embaixo), ou sentado na ponta de um banco reto (halter e
// kettlebell). Com o estribo, só o braço direito trabalha e a outra mão fica na cintura.
// Com o elástico (`carga: 'elastico'`), em pé como na corda, o núcleo devolve só o corpo e o chão: a faixa, pisada pelo
// pé de trás, é montada por quem usa o núcleo.
import { formaDoKettlebell } from '../equipamento';
import { resolverMembros, resolverTronco, sinal } from '../esqueleto';
import type { Lado, PoseBraco, PosePerna, Tronco } from '../esqueleto';
import { daFicha, fichaSchema, resolver1 } from '../movimento';
import type { Ficha, Quadro } from '../movimento';
import { pontosDoBoneco } from '../boneco';
import { bancoReto, cabo, centroDaRoldana, chao, estribo, halter, saidaDoCabo, torre } from '../pecas';
import type { Peca, Torre } from '../pecas';
import { cordaTriceps, montarCorda } from '../pecas-de-cena/corda-triceps';
import type { Corpo } from '../tabelas';
import { obj } from '../tabelas';
import { add, cross, dirRef, dist, girar, mix, mul, noRef, norm, paraRef, perp, sub } from '../vec';
import type { V3 } from '../vec';
import { alturaDaPegadaDoKettlebell } from './dobrar-o-quadril';

export type CargaDoFrances = 'corda' | 'halter' | 'kettlebell' | 'estribo' | 'elastico';
const rad = Math.PI / 180;

/** O que muda de um quadro para o outro (e nos erros). */
interface Pedido {
  /** Flexão do cotovelo (graus). */
  cotovelo: number;
  /** Elevação do braço a partir do braço pendurado e quanto ele vai para o meio (graus, no referencial do tronco). */
  elevacao: number;
  paraDentro: number;
  /** Giro da carga nas mãos (graus; ver `carga.giro.*` na ficha). */
  giro: number;
  /** Meia distância entre os centros das duas pegadas (cm). */
  meia: number;
  /** Extensão da lombar e da torácica (graus; o erro "arquear as costas"). */
  lombar: number;
  toracica: number;
}

export interface TricepsFrances {
  ficha: Ficha;
  quadro(corpo: Corpo, u: number, erro?: string): Quadro;
}

/**
 * O braço do lado k, no referencial do tronco: pendurado (0, −1, 0), elevado `elev` graus à frente (em torno do eixo
 * de um ombro ao outro) e puxado `dentro` graus para o meio.
 */
export function direcaoDoBraco(k: Lado, elev: number, dentro: number): V3 {
  const e = elev * rad;
  const plano: V3 = [0, -Math.cos(e), Math.sin(e)];
  // para o meio: gira em torno do eixo da frente do tronco (com o braço para cima, ele vai para o lado do outro ombro)
  return norm(girar(plano, [0, 0, 1], sinal(k) * dentro));
}

export function criarTricepsFrances(fichaJson: unknown, carga: CargaDoFrances): TricepsFrances {
  const F = fichaSchema.parse(fichaJson);
  const f = daFicha(F);
  const tem = (id: string) => id in F.param;
  const emPe = carga === 'corda' || carga === 'estribo' || carga === 'elastico';
  /** A carga sai das mãos por um cabo (corda ou estribo): sem giro da carga nas mãos. */
  const noCabo = emPe;
  const K = formaDoKettlebell();
  const CAL = new WeakMap<Corpo, { pelveY: number; frente: number; polia: Torre; zBanco: number; compMin: number; phi0?: number }>();

  /* ---------------- o tronco e as pernas ---------------- */
  function troncoEPernas(corpo: Corpo, pelveY: number, frente: number, p: Pedido): { t: Tronco; pernas: Record<Lado, PosePerna> } {
    const m = (id: string) => corpo.m(id);
    if (emPe) {
      // um pé à frente do outro: o direito à frente, apoiado inteiro; o esquerdo atrás, na ponta
      const w = f('pes.meiaDistancia');
      const pelve: V3 = [0, pelveY, f('pelve.z')];
      const t = resolverTronco(corpo, { pelve, frente, lombar: p.lombar, toracica: p.toracica, cervical: f('cervical'), cabeca: f('cabeca') });
      const pernas: Record<Lado, PosePerna> = {
        R: { pe: { bola: [-w, 0, f('pe.frente.z')], dir: [-0.12, 0, 1], calc: 0 }, polo: [-0.15, 0, 1] },
        L: { pe: { bola: [w, 0, f('pe.tras.z')], dir: [0.1, 0, 1], calc: f('pe.tras.calcanhar') }, polo: [0.1, 0, 1] },
      };
      return { t, pernas };
    }
    // sentado na ponta do banco: a pelve sobre o estofado, os pés no chão à frente, joelhos um pouco abertos
    const pelve: V3 = [0, pelveY, 0];
    const t = resolverTronco(corpo, { pelve, frente, lombar: p.lombar, toracica: p.toracica, cervical: f('cervical'), cabeca: f('cabeca') });
    const w = f('pes.meiaDistancia');
    const zPe = m('coxa.comp') * Math.cos(f('coxa.inclinacao') * rad) + f('pes.aFrenteDoJoelho');
    const perna = (k: Lado): PosePerna => ({ pe: { bola: [sinal(k) * w, 0, zPe + m('pe.calcanharABola') - m('pe.calcanharAoTornozelo')], dir: [sinal(k) * 0.15, 0, 1], calc: 0 }, polo: [sinal(k) * 0.35, 0.2, 1] });
    return { t, pernas: { R: perna('R'), L: perna('L') } };
  }

  /* ---------------- os braços e a carga ---------------- */
  const ua = (c: Corpo) => c.m('braco.comp'),
    fa = (c: Corpo) => c.m('antebraco.comp'),
    gp = (c: Corpo) => c.m('mao.punhoAoCentroDaPegada');

  /** O eixo da carga (de baixo para cima, no halter e no kettlebell: da bola à alça), dado o antebraço médio. */
  function eixoDaCarga(T: Tronco['torax'], aMedio: V3, giro: number): V3 {
    // gira o antebraço em torno do eixo de um ombro ao outro; giro positivo leva "para cima" para a frente
    return norm(girar(aMedio, T.x, giro));
  }

  interface Mao {
    pose: PoseBraco;
    pegada: V3;
    polegar: V3;
  }
  /**
   * A mão do lado k, dado o cotovelo, o antebraço (direção) e o eixo da carga. Na corda, a mão fecha em volta do ramo
   * com o punho reto (o polegar para a frente do antebraço). No halter, a palma fica sob a cabeça de cima (normal da
   * palma = eixo), os dedos seguindo o antebraço o mais possível. No kettlebell, a mão fecha na haste da alça (o eixo da
   * haste = eixo do kettlebell), os dedos em volta dela.
   */
  function mao(corpo: Corpo, T: Tronco['torax'], k: Lado, ombro: V3, cot: V3, a: V3, eixo: V3): Mao {
    const s = sinal(k);
    const umero = norm(sub(cot, ombro));
    if (carga === 'corda') {
      // provisório: o polegar certo (para a bucha) só se sabe com as duas mãos no lugar (ver `quadro`)
      const polegar = norm(cross(a, T.x));
      const pegada = add(cot, mul(a, fa(corpo) + gp(corpo)));
      return { pose: { umero, antebraco: a, polo: norm(sub(cot, ombro)), mao: { polegar, forma: 'pegada', diam: obj('cordaTriceps', 'diam') } }, pegada, polegar };
    }
    if (carga === 'estribo' || carga === 'elastico') {
      // a pegada neutra, como na corda: o polegar para o lado de trás do tronco (a palma para o meio); a pegada do
      // estribo atravessa a mão nessa direção, e o cabo puxa ao longo do antebraço, de través à pegada
      const polegar = norm(perp(dirRef(T, [0, -1, -0.4]), a));
      const pegada = add(cot, mul(a, fa(corpo) + gp(corpo)));
      return { pose: { umero, antebraco: a, polo: norm(sub(cot, ombro)), mao: { polegar, forma: 'pegada', diam: carga === 'elastico' ? obj('elasticoLongo', 'pegadaDiam') : obj('estribo', 'pegadaDiam') } }, pegada, polegar };
    }
    const punho = add(cot, mul(a, fa(corpo)));
    if (carga === 'halter') {
      // os dedos seguem o antebraço, girados na palma `maos.dedosGiro` graus (positivo = para fora)
      const d = norm(girar(perp(a, eixo), eixo, -s * (tem('maos.dedosGiro') ? f('maos.dedosGiro') : 0)));
      const polegar = mul(cross(d, eixo), -s);
      return { pose: { punho, polo: umero, mao: { dedos: d, polegar, forma: 'concha', diam: obj('halter', 'caboDiam') } }, pegada: add(punho, mul(d, gp(corpo))), polegar };
    }
    // kettlebell: a mão fecha na haste com a palma para dentro; o polegar aponta para o lado da bola, os dedos seguem o
    // antebraço o mais possível
    const d = norm(perp(a, eixo));
    const polegar = mul(eixo, -1);
    return { pose: { punho, polo: umero, mao: { dedos: d, polegar, forma: 'pegada', diam: obj('kettlebell', 'alcaDiam') } }, pegada: add(punho, mul(d, gp(corpo))), polegar };
  }

  /**
   * Os dois braços para um pedido: o braço na direção fixa; o antebraço dobra `cotovelo` graus para trás e gira em
   * volta do braço (ângulo φ) até a pegada ficar a `maos.meiaDistancia` do meio do tronco.
   */
  function bracos(corpo: Corpo, t: Tronco, pernas: Record<Lado, PosePerna>, p: Pedido, phiFixo?: number) {
    const T = t.torax;
    const meia = p.meia;
    const dir = (k: Lado) => dirRef(T, direcaoDoBraco(k, p.elevacao, p.paraDentro));
    // primeira passada: os ombros com o braço já na direção final (a clavícula acompanha a elevação)
    const reto = (k: Lado): PoseBraco => ({ umero: dir(k), antebraco: dir(k), polo: dirRef(T, [0, 0, 1]), mao: { polegar: dirRef(T, [0, 0, 1]) } });
    const e0 = resolverMembros(t, { R: reto('R'), L: reto('L') }, pernas);
    const c = p.cotovelo * rad;
    const antebracoDe = (k: Lado, phi: number): { cot: V3; a: V3 } => {
      const u = dir(k);
      const ombro = e0.lado[k].ombro;
      const cot = add(ombro, mul(u, ua(corpo)));
      const tras = norm(perp(mul(T.z, -1), u)),
        meio = norm(perp(dirRef(T, [-sinal(k), 0, 0]), u));
      const a = norm(add(mul(u, Math.cos(c)), mul(add(mul(tras, Math.cos(phi)), mul(meio, Math.sin(phi))), Math.sin(c))));
      return { cot, a };
    };
    // o eixo da carga depende do antebraço médio (os dois lados são simétricos): acha φ do lado direito e espelha
    const montaLado = (k: Lado, phi: number, eixo: V3) => {
      const { cot, a } = antebracoDe(k, phi);
      return { cot, a, m: mao(corpo, T, k, e0.lado[k].ombro, cot, a, eixo) };
    };
    const eixoDe = (phi: number) => {
      const r = antebracoDe('R', phi),
        l = antebracoDe('L', phi);
      return eixoDaCarga(T, norm(add(r.a, l.a)), p.giro);
    };
    const xNoTronco = (phi: number) => paraRef(T, montaLado('R', phi, eixoDe(phi)).m.pegada)[0] + meia;
    const phi = phiFixo ?? resolver1(xNoTronco, -1.2, 1.5, 40);
    const eixo = eixoDe(phi);
    const R = montaLado('R', phi, eixo),
      L = montaLado('L', phi, eixo);
    // com o estribo, a outra mão fica na cintura
    const poseL = carga === 'estribo' ? maoNaCintura(corpo, t) : L.m.pose;
    const e = resolverMembros(t, { R: R.m.pose, L: poseL }, pernas);
    return { e, eixo, maos: { R: R.m, L: L.m }, phi };
  }

  /**
   * A mão esquerda na cintura (só com o estribo): a palma aberta sobre a crista do osso do quadril, os dedos para a
   * frente e para baixo, o polegar para cima, o cotovelo para fora e para trás.
   */
  function maoNaCintura(corpo: Corpo, t: Tronco): PoseBraco {
    const P = t.pelve;
    const s = sinal('L');
    const punho = noRef(P, [s * f('maoNaCintura.x'), corpo.m('altura.cristaIliaca') - corpo.m('altura.trocanter') + f('maoNaCintura.acima'), f('maoNaCintura.z')]);
    const dedos = norm(dirRef(P, [0, -0.45, 1]));
    return { punho, polo: dirRef(P, [s * 0.6, 0, -1]), mao: { dedos, polegar: dirRef(P, [0, 1, 0]), forma: 'aberta' } };
  }

  /* ---------------- calibração (uma vez por corpo) ---------------- */
  const PEDIDO0 = (): Pedido => ({ meia: f('maos.meiaDistancia'), cotovelo: f('cotovelo.alongado'), elevacao: f('braco.elevacao'), paraDentro: f('braco.paraDentro'), giro: noCabo ? 0 : f('carga.giro.alongado'), lombar: 0, toracica: 0 });
  function calibrar(corpo: Corpo) {
    let c = CAL.get(corpo);
    if (c) return c;
    const p0 = PEDIDO0();
    let pelveY: number;
    // a inclinação do peito (eixo do tórax) que a ficha pede sai da inclinação da pelve
    const frente = resolver1((x) => {
      const { t } = troncoEPernas(corpo, 95, x, p0);
      return Math.atan2(t.torax.y[2], t.torax.y[1]) / rad - f('tronco.inclinacao');
    }, -30, 60, 30);
    if (emPe) {
      // a altura da pelve que dá o joelho da frente pedido
      pelveY = resolver1((y) => {
        const { t, pernas } = troncoEPernas(corpo, y, frente, p0);
        return resolverMembros(t, { R: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } }, L: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } } }, pernas).lado.R.ang.joelho - f('joelho.frente');
      }, 70, 100, 30);
    } else {
      // a pelve desce até a nádega (o ponto mais baixo da pelve e das coxas, perto da pelve) afundar no estofado
      const topo = obj('bancoReto', 'altura');
      pelveY = resolver1((y) => {
        const { t, pernas } = troncoEPernas(corpo, y, frente, p0);
        const e = resolverMembros(t, { R: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } }, L: { polo: [0, 0, -1], mao: { polegar: [0, 0, 1] } } }, pernas);
        let min = 1e9;
        for (const { p, parte } of pontosDoBoneco(e)) if ((parte === 'pelve' || parte === 'coxa') && p[2] < 8) min = Math.min(min, p[1]);
        return min - (topo - f('nadega.afunda'));
      }, topo, topo + 30, 30);
    }
    // a polia (só na corda): de costas para ela, na altura do ombro; a roldana fica a `cabo.alongado` cm da bucha
    let polia: Torre = { base: [0, 0, -200], frente: [0, 0, 1], alturaDaPolia: 140 };
    let compMin = 0;
    let phi0: number | undefined;
    if (carga === 'estribo') {
      // a polia embaixo, atrás: no alongado, o cabo desce do elo do estribo até a roldana `cabo.inclinacao` graus abaixo
      // da horizontal
      const { t, pernas } = troncoEPernas(corpo, pelveY, frente, p0);
      const b = bracos(corpo, t, pernas, p0);
      // com uma mão só, o giro do antebraço em volta do braço fica o do alongado (a mão atrás da cabeça, perto do meio)
      phi0 = b.phi;
      const L = b.e.lado.R;
      const alt = f('polia.altura');
      const eloPara = (rold: V3) => estribo(L.pegada, L.mao.x, sub(rold, L.pegada)).elo;
      polia = { base: [0, 0, 0], frente: [0, 0, 1], alturaDaPolia: alt };
      const z = resolver1((zz) => {
        const r = centroDaRoldana({ ...polia, base: [0, 0, zz] });
        const elo = eloPara(r);
        return Math.atan2(elo[1] - r[1], elo[2] - r[2]) / rad - f('cabo.inclinacao');
      }, -300, L.pegada[2] - 20, 40);
      polia = { ...polia, base: [0, 0, z] };
      const elo = eloPara(centroDaRoldana(polia));
      compMin = dist(elo, saidaDoCabo(polia, elo));
    } else if (carga === 'corda') {
      const { t, pernas } = troncoEPernas(corpo, pelveY, frente, p0);
      const b = bracos(corpo, t, pernas, p0);
      const ombro = b.e.lado.R.ombro[1];
      polia = { base: [0, 0, 0], frente: [0, 0, 1], alturaDaPolia: ombro + f('polia.acimaDoOmbro') };
      const rold0 = centroDaRoldana(polia);
      const cm = montarCorda([b.maos.R.pegada, b.maos.L.pegada], corpo.m('mao.largura'), add(b.e.lado.R.ombro, [0, 0, -100]));
      const z = cm.bucha[2] - f('cabo.alongado') - rold0[2];
      polia = { ...polia, base: [0, 0, z] };
      const cm2 = montarCorda([b.maos.R.pegada, b.maos.L.pegada], corpo.m('mao.largura'), centroDaRoldana(polia));
      compMin = dist(cm2.bucha, saidaDoCabo(polia, cm2.bucha));
    }
    // o banco (sentado): a nádega fica a `banco.daPonta` cm da ponta da frente, e o banco segue para trás
    const zBanco = f('banco.daPonta' in F.param ? 'banco.daPonta' : 'pelve.z') - obj('bancoReto', 'comp') / 2;
    c = { pelveY, frente, polia, zBanco: emPe ? 0 : zBanco, compMin, ...(phi0 === undefined ? {} : { phi0 }) };
    CAL.set(corpo, c);
    return c;
  }

  /* ---------------- cada quadro ---------------- */
  function pedido(u: number, erro?: string): Pedido {
    const ate = erro === 'curta' ? f('erro.curta.cotovelo') : erro === 'cotovelo' && tem('erro.cotovelo.cotovelo') ? f('erro.cotovelo.cotovelo') : f('cotovelo.alongado');
    const cotovelo = mix(ate, f('cotovelo.estendido'), u);
    // o erro "cotovelos sobem e descem": no alongado o braço desce à frente (vira um pullover)
    const elevacao = erro === 'cotovelo' ? mix(f('erro.cotovelo.elevacao'), f('braco.elevacao'), u) : f('braco.elevacao');
    // o erro "abrir os cotovelos": abertos no alongado (onde o ombro gira) e um pouco menos estendendo, para as duas
    // mãos ainda alcançarem a carga
    const paraDentro = erro === 'abre' ? mix(-f('erro.abre.fora'), f('braco.paraDentro'), f('erro.abre.volta') * u) : f('braco.paraDentro');
    const giro = noCabo ? 0 : mix(f('carga.giro.alongado'), f('carga.giro.estendido'), u);
    // o erro "arquear as costas": a lombar e a torácica estendem enquanto a carga sobe
    const arco = erro === 'arco' ? u : 0;
    const meia = tem('maos.meiaDistancia.estendido') ? mix(f('maos.meiaDistancia'), f('maos.meiaDistancia.estendido'), u) : f('maos.meiaDistancia');
    return { meia, cotovelo, elevacao, paraDentro, giro, lombar: arco ? -arco * f('erro.arco.lombar') : 0, toracica: arco ? -arco * f('erro.arco.toracica') : 0 };
  }

  function quadro(corpo: Corpo, u: number, erro?: string): Quadro {
    const c = calibrar(corpo);
    const p = pedido(u, erro);
    const { t, pernas } = troncoEPernas(corpo, c.pelveY, c.frente, p);
    const b = bracos(corpo, t, pernas, p, c.phi0);
    let e = b.e;
    const R = e.lado.R,
      L = e.lado.L;
    const marcas: Record<string, V3> = {};
    if (carga === 'corda') {
      // a bucha fica onde os dois ramos esticados se encontram; o punho fecha com o polegar virado para ela (a corda
      // atravessa a mão em linha reta até a bucha), e as mãos são resolvidas de novo com esse polegar
      const corda = montarCorda([R.pegada, L.pegada], corpo.m('mao.largura'), centroDaRoldana(c.polia));
      const pol = (k: Lado) => norm(perp(sub(corda.bucha, e.lado[k].pegada), mul(e.lado[k].antebraco.y, -1)));
      const comPolegar = (k: Lado): PoseBraco => ({ ...b.maos[k].pose, mao: { ...b.maos[k].pose.mao, polegar: pol(k) } });
      e = resolverMembros(t, { R: comPolegar('R'), L: comPolegar('L') }, pernas);
      const saida = saidaDoCabo(c.polia, corda.bucha);
      const comp = dist(corda.bucha, saida);
      const subida = Math.max(0, comp - c.compMin) / obj('torre', 'relacao') + 2;
      const pc = cordaTriceps(corda);
      const prims = [chao(-60, 60, c.polia.base[2] - 50, 80), ...torre(c.polia, subida), ...pc.prims, cabo(corda.bucha, saida)];
      const pecas: Peca[] = [{ t: 'torre', torre: c.polia, subida }, pc.peca, { t: 'cabo', a: corda.bucha, b: saida }];
      marcas.bucha = corda.bucha;
      marcas.pilha = [0, subida, 0];
      marcas.saiR = corda.ramos[0]!.sai;
      marcas.saiL = corda.ramos[1]!.sai;
      marcas.saida = saida;
      return { esq: e, prims, pecas, fios: [{ id: 'cabo', comp, estica: true }], cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
    }
    if (carga === 'elastico') {
      // o elástico: só o corpo e o chão; quem usa o núcleo desenha a faixa (ver ./triceps-elastico-acima.ts)
      return { esq: e, prims: [chao(-70, 70, -90, 80)], pecas: [], fios: [], cargas: [], marcas, vies: { maoR: 1, maoL: 1 } };
    }
    if (carga === 'estribo') {
      // o estribo na mão direita; o cabo vai reto do elo até a roldana, embaixo, atrás
      const rold = centroDaRoldana(c.polia);
      const est = estribo(R.pegada, R.mao.x, sub(rold, R.pegada));
      const saida = saidaDoCabo(c.polia, est.elo);
      const comp = dist(est.elo, saida);
      const subida = Math.max(0, comp - c.compMin) / obj('torre', 'relacao') + 2;
      const prims = [chao(-60, 60, c.polia.base[2] - 50, 80), ...torre(c.polia, subida), ...est.prims, cabo(est.elo, saida)];
      const pecas: Peca[] = [{ t: 'torre', torre: c.polia, subida, cortadaEmCima: 150 }, { t: 'estribo', pegada: R.pegada, eixo: R.mao.x, elo: est.elo }, { t: 'cabo', a: est.elo, b: saida }];
      marcas.elo = est.elo;
      marcas.pilha = [0, subida, 0];
      marcas.saida = saida;
      return { esq: e, prims, pecas, fios: [{ id: 'cabo', comp, estica: true }], cargas: [], marcas, vies: { maoR: 1 } };
    }
    const meio = mul(add(R.pegada, L.pegada), 0.5);
    const banco: Peca = { t: 'bancoReto', x0: 0, z0: c.zBanco, pontaNoQuadro: f('banco.noQuadro') };
    const prims = [chao(-70, 70, -60, 90), ...bancoReto(0, c.zBanco)];
    if (carga === 'halter') {
      // a cabeça de cima do halter fica nas palmas: o centro do halter fica meio cabo abaixo da palma, ao longo do eixo
      const centro = add(meio, mul(b.eixo, f('palma.espessura') - obj('halter', 'caboComp') / 2));
      prims.push(...halter(centro, b.eixo, 0.2));
      marcas.halter = centro;
      // o meio da face de baixo da cabeça de cima (onde as palmas apoiam)
      marcas.halterTopo = add(centro, mul(b.eixo, obj('halter', 'caboComp') / 2));
      return { esq: e, prims, pecas: [banco, { t: 'halter', centro, eixo: b.eixo }], fios: [], cargas: [{ massa: obj('halter', 'massa'), pos: centro }], marcas, vies: { maoR: 1, maoL: 1 } };
    }
    // kettlebell: as mãos nas hastes da alça; a base fica abaixo do meio delas, ao longo do eixo
    const base = add(meio, mul(b.eixo, -alturaDaPegadaDoKettlebell()));
    const centroBola = add(base, mul(b.eixo, K.centro));
    prims.push({ t: 'esfera', c: centroBola, r: K.R, cls: 'ferro' });
    marcas.kettlebell = meio;
    marcas.bola = centroBola;
    return { esq: e, prims, pecas: [banco, { t: 'kettlebell', base, cima: b.eixo, lado: [1, 0, 0] }], fios: [], cargas: [{ massa: obj('kettlebell', 'massa'), pos: centroBola }], marcas, vies: { maoR: 1, maoL: 1 } };
  }
  return { ficha: F, quadro };
}
