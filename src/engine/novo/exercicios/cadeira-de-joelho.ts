// O núcleo das duas cadeiras de joelho (a cadeira flexora e a cadeira extensora): sentado na máquina
// (../pecas-de-cena/cadeira-flexora.ts e ./cadeira-extensora.ts), as costas no encosto, as mãos nas alças ao lado do
// assento, os dois joelhos no eixo da máquina; só as canelas giram em volta do joelho, e o rolo, preso na alavanca que
// gira no mesmo eixo, acompanha a canela (atrás do tornozelo na flexora, na frente da canela, logo acima do pé, na
// extensora). As placas sobem o arco do came.
//
// O que este arquivo resolve, em vez de receber pronto (uma vez por corpo, guardado em ../calibragens.ts):
//  - onde fica a bacia: o centro do joelho cai no eixo (a coxa tem o comprimento da tabela, então o quadril fica num
//    arco em volta do eixo) e o glúteo e a coxa apoiam no assento, afundando `amassa` cm;
//  - quanto o tronco deita para trás: até as costas ficarem paralelas ao encosto (a folga de cima igual à de baixo);
//  - as regulagens da máquina para esse corpo, como quem treina faz antes da série: o encosto anda até encostar nas
//    costas; o rolo corre na alavanca até a altura pedida da canela; a trava das coxas (na flexora) desce até elas.
import { formaDoBoneco, pontosDoBoneco } from "../boneco";
import { calibragem } from "../calibragens";
import { resolverMembros, resolverTronco, sinal } from "../esqueleto";
import type { Esq, Lado, PoseBraco, PosePerna, Tronco } from "../esqueleto";
import { resolver1 } from "../movimento";
import type { Quadro } from "../movimento";
import { chao } from "../pecas";
import {
  cadeiraFlexora,
  direcaoDaAlavanca,
  geometriaDaCadeiraFlexora,
} from "../pecas-de-cena/cadeira-flexora";
import type { ModeloDaCadeira, OpcoesDaPeca } from "../pecas-de-cena/cadeira-flexora";
import type { Corpo } from "../tabelas";
import { obj } from "../tabelas";
import { add, dot, mul, norm, sub } from "../vec";
import type { V3 } from "../vec";

const rad = Math.PI / 180;

export interface OpcoesDaCadeira {
  modelo: ModeloDaCadeira;
  /** Quanto o glúteo e a coxa afundam no assento (cm). */
  amassa: number;
  /** Sentado e encostado, a lombar fica menos curva que em pé (graus). */
  lombar: number;
  /** Quanto da inclinação do peito o pescoço devolve, para o olhar ficar quase na horizontal (fração). */
  pescoco: number;
  /** O centro do rolo, ao longo da canela, a partir do centro do joelho (cm). */
  roloAoLongo: number;
  /** Quanto o rolo afunda na pele (cm). */
  roloAmassa: number;
  /** A flexão plantar do pé (graus; 0 = em ângulo reto com a canela). */
  pe: number;
  /** As mãos nas alças: o centro da mão, a partir do começo da borracha da alça (cm, para a frente). */
  maoNaAlca: number;
  /** Na flexora: quanto a trava afunda nas coxas (cm). */
  travaAmassa: number;
  /** Quanto os ombros vão à frente para as mãos chegarem às alças (graus da clavícula). */
  prot: number; /** Quanto o tronco fica menos deitado que o encosto (graus): as costas encostam embaixo e se afastam em cima. */
  aFrente: number;
}

/** O que a calibração dá, para um corpo: a bacia, o tronco e as regulagens da máquina. */
export interface Sentado {
  /** O centro da bacia (y, z). */
  y: number;
  z: number;
  /** A inclinação do tronco para trás (graus). */
  deita: number;
  /** A regulagem do encosto (cm, de 0 a `encostoCurso`). */
  encosto: number;
  /** A distância do eixo da canela à pele, do lado do rolo, na altura do rolo (cm). */
  pele: number;
  /** A distância do eixo ao centro do rolo (cm): a regulagem do rolo na alavanca. */
  rolo: number;
  /** Na flexora: a altura da face de baixo da trava das coxas (cm). */
  trava: number;
}

const m_ = (o: OpcoesDaCadeira) => (id: string) => obj(o.modelo.objeto, id);

/** O tronco sentado, deitado `deita` graus para trás, com a lombar menos curva e o pescoço compensando. */
export function troncoNaCadeira(
  corpo: Corpo,
  o: OpcoesDaCadeira,
  y: number,
  z: number,
  deita: number,
): Tronco {
  const peito = deita - o.lombar;
  return resolverTronco(corpo, {
    pelve: [0, y, z],
    frente: -deita,
    lombar: o.lombar,
    cervical: peito * o.pescoco,
    cabeca: 0,
  });
}

/** O centro da mão na alça de cada lado (a alça é a da peça: borracha ao longo de z, ao lado do assento). */
export function alca(o: OpcoesDaCadeira, k: Lado): V3 {
  const G = geometriaDaCadeiraFlexora(o.modelo);
  const x = sinal(k) * (m_(o)("assentoLarg") / 2 + 4);
  return [
    x,
    G.meioTopo[1] - 2,
    G.meioTopo[2] + (o.modelo.alcaAFrente ?? 6) + o.maoNaAlca,
  ];
}
/** As mãos fechadas nas alças, o polegar para a frente, os cotovelos para fora e para trás. */
export function maosNasAlcas(o: OpcoesDaCadeira, elev = 0): Record<Lado, PoseBraco> {
  const b = (k: Lado): PoseBraco => ({
    pegada: alca(o, k),
    polo: [sinal(k) * 0.5, 0, -1],
    mao: { polegar: [0, 0, 1], forma: "pegada", diam: 4 },
    prot: o.prot,
    ...(elev ? { elev } : {}),
  });
  return { R: b("R"), L: b("L") };
}

/** O ângulo (graus, na convenção da alavanca: 0 = para baixo, 90 = para a frente) de uma direção no plano de lado. */
export const anguloNoPlano = (d: V3) => Math.atan2(d[2], -d[1]) / rad;
/** A normal à direção de ângulo `a`, no plano de lado, para o lado em que o ângulo cresce (a frente da canela). */
const normal = (a: number): V3 => [0, Math.sin(a * rad), Math.cos(a * rad)];

/** As duas pernas: as coxas na direção dada, as canelas dobradas `joelho` graus, o pé com a flexão plantar pedida. */
export function pernasNaCadeira(
  o: OpcoesDaCadeira,
  coxa: V3,
  joelho: number,
): Record<Lado, PosePerna> {
  const a = anguloNoPlano(coxa) - joelho;
  const canela = direcaoDaAlavanca(a);
  // o pé: em ângulo reto com a canela, para a frente (a normal), menos a flexão plantar
  const b = a + 90 - o.pe;
  const peDir = direcaoDaAlavanca(b);
  const p = (): PosePerna => ({
    coxa,
    canela,
    peDir,
    polo: norm(add(normal(anguloNoPlano(coxa)), mul(coxa, 0.05))),
  });
  return { R: p(), L: p() };
}

/** A pele do glúteo e da coxa sobre o assento: a menor distância ao plano do assento (cm; negativo = afunda). */
export function apoioNoAssentoDaCadeira(e: Esq, o: OpcoesDaCadeira): number {
  const G = geometriaDaCadeiraFlexora(o.modelo);
  const meia = m_(o)("assentoLarg") / 2,
    c = m_(o)("assentoComp") / 2;
  let min = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (!["pelve", "coxa", "cintura"].includes(parte) || Math.abs(p[0]) > meia)
      continue;
    const d = sub(p, G.meioTopo);
    if (Math.abs(dot(d, G.ao)) > c) continue;
    min = Math.min(min, dot(d, G.normal));
  }
  return min;
}

/** A frente do encosto (a linha onde as costas encostam), com a regulagem dada: a base, a direção para cima e a normal. */
export function frenteDoEncosto(o: OpcoesDaCadeira, encosto: number) {
  const r = cadeiraFlexora(
    { alavanca: 0, inicio: 0, rolo: 30, encosto, trava: 60 },
    o.modelo,
  );
  return r.frenteDoEncosto;
}
/** A folga das costas no encosto, na metade de baixo e na de cima dele (cm; negativo = entra). */
export function folgasDasCostas(
  e: Esq,
  o: OpcoesDaCadeira,
  encosto: number,
): { baixo: number; cima: number } {
  const E = frenteDoEncosto(o, encosto);
  const comp = m_(o)("encostoComp"),
    meia = m_(o)("assentoLarg") / 2 - 2;
  let baixo = 1e9,
    cima = 1e9;
  for (const { p, parte } of pontosDoBoneco(e)) {
    if (
      !["tronco", "cintura", "pelve"].includes(parte) ||
      Math.abs(p[0]) > meia
    )
      continue;
    const d = sub(p, E.base);
    const s = dot(d, E.sobe);
    if (s < 4 || s > comp - 4) continue;
    const g = dot(d, E.frente);
    if (s < comp / 2) baixo = Math.min(baixo, g);
    else cima = Math.min(cima, g);
  }
  return { baixo, cima };
}

/** O lado do rolo: +1 na frente da canela (extensora), −1 atrás dela (flexora). */
const ladoDoRolo = (o: OpcoesDaCadeira) => o.modelo.sobe;

/**
 * A calibração: a bacia, o tronco e as regulagens, com os joelhos no eixo e as canelas a `joelho` graus (a posição
 * inicial). `chave` diz de que exercício é (as regulagens dependem das opções).
 */
export function sentarNaCadeira(
  corpo: Corpo,
  o: OpcoesDaCadeira,
  chave: string,
  joelho: number,
): Sentado {
  return calibragem(corpo, `${chave}:sentado`, () => {
    const G = geometriaDaCadeiraFlexora(o.modelo);
    const L = corpo.m("coxa.comp");
    const zDe = (y: number) =>
      G.eixo[2] - Math.sqrt(Math.max(0, L * L - (G.eixo[1] - y) ** 2));
    const montar = (y: number, deita: number) => {
      const z = zDe(y);
      const coxa = norm([0, G.eixo[1] - y, G.eixo[2] - z]);
      return resolverMembros(
        troncoNaCadeira(corpo, o, y, z, deita),
        maosNasAlcas(o),
        pernasNaCadeira(o, coxa, joelho),
      );
    };
    let y = G.meioTopo[1] + 10,
      deita = 15;
    const assenta = (d: number) =>
      resolver1(
        (yy) => apoioNoAssentoDaCadeira(montar(yy, d), o) + o.amassa,
        G.meioTopo[1] - 5,
        G.eixo[1] + 5,
        30,
      );
    for (let i = 0; i < 4; i++) {
      y = assenta(deita);
      const y0 = y;
      // as costas paralelas ao encosto: a folga de baixo igual à de cima
      deita = resolver1(
        (d) => {
          const f = folgasDasCostas(
            montar(y0, d),
            o,
            m_(o)("encostoCurso") / 2,
          );
          return f.cima - f.baixo;
        },
        -5,
        40,
        24,
      );
    }
    // o tronco um pouco menos deitado que o encosto, se a ficha pede
    if (o.aFrente) {
      deita -= o.aFrente;
      y = assenta(deita);
    }
    const e = montar(y, deita);
    // o encosto anda até encostar nas costas (com o encosto no meio do curso, a folga cai na proporção da normal)
    const meio = m_(o)("encostoCurso") / 2;
    const f = folgasDasCostas(e, o, meio);
    const E = frenteDoEncosto(o, meio);
    const encosto = meio + Math.min(f.baixo, f.cima) / E.frente[2];
    // o rolo: a pele do lado do rolo, na altura dele, medida na perna direita
    const R = e.lado.R;
    const canela = norm(sub(R.tornozelo, R.joelho));
    const n = mul(normal(anguloNoPlano(canela)), ladoDoRolo(o));
    let pele = 0;
    for (const { p, parte } of pontosDoBoneco(e)) {
      if (!["canela", "pe"].includes(parte)) continue;
      const d = sub(p, R.joelho);
      if (
        Math.abs(p[0] - R.joelho[0]) > 5 ||
        Math.abs(dot(d, canela) - o.roloAoLongo) > 3
      )
        continue;
      pele = Math.max(pele, dot(d, n));
    }
    const off = pele + m_(o)("roloDiam") / 2 - o.roloAmassa;
    const rolo = Math.hypot(o.roloAoLongo, off);
    // a trava das coxas (flexora): logo acima da coxa, na altura da trava
    let trava = 0;
    if (o.modelo.trava) {
      const zT = G.frenteTopo[2] - m_(o)("travaComp") / 2 - 4;
      let max = -1e9;
      for (const { p, parte } of pontosDoBoneco(e))
        if (
          parte === "coxa" &&
          Math.abs(p[2] - zT) < m_(o)("travaComp") / 2 &&
          Math.abs(p[0]) < m_(o)("travaLarg") / 2
        )
          max = Math.max(max, p[1]);
      trava = max - o.travaAmassa;
    }
    return { y, z: zDe(y), deita, encosto, pele, rolo, trava };
  });
}

/** Os desvios dos erros: a bacia sobe (gira em volta do joelho), o tronco deita mais, o corpo recua no assento. */
export interface Desvio {
  /** Quanto a bacia sobe do assento (cm), com a coxa girando em volta do joelho. */
  sobe?: number;
  /** Quanto o tronco deita a mais (graus). */
  deita?: number;
  /** Quanto o corpo inteiro (e o encosto) está para trás no assento, ao longo dele (cm): o joelho sai do eixo. */
  recua?: number;
  /** Quanto os ombros descem (graus da clavícula, positivo = desce), para as mãos continuarem nas alças. */
  ombrosDescem?: number;
}

/** O corpo na cadeira, com as canelas a `joelho` graus, e a alavanca onde o rolo encosta na canela. */
export function naCadeira(
  corpo: Corpo,
  o: OpcoesDaCadeira,
  S: Sentado,
  joelho: number,
  dv: Desvio = {},
) {
  const G = geometriaDaCadeiraFlexora(o.modelo);
  const recua = dv.recua ?? 0;
  const joelhoC: V3 = add(G.eixo, mul(G.ao, -recua));
  let quadril: V3 = add([0, S.y, S.z], mul(G.ao, -recua));
  if (dv.sobe) {
    // a bacia sobe girando em volta do joelho: o quadril fica no arco de raio = coxa
    const L = corpo.m("coxa.comp");
    const y = quadril[1] + dv.sobe;
    quadril = [
      0,
      y,
      joelhoC[2] - Math.sqrt(Math.max(0, L * L - (joelhoC[1] - y) ** 2)),
    ];
  }
  const coxa = norm(sub(joelhoC, quadril));
  const e = resolverMembros(
    troncoNaCadeira(
      corpo,
      o,
      quadril[1],
      quadril[2],
      S.deita + (dv.deita ?? 0),
    ),
    maosNasAlcas(o, -(dv.ombrosDescem ?? 0)),
    pernasNaCadeira(o, coxa, joelho),
  );
  // a alavanca: o rolo, a `S.rolo` cm do eixo, encosta na canela (a `off` cm do eixo da canela, do lado do rolo)
  const lado = ladoDoRolo(o);
  const off = S.pele + obj(o.modelo.objeto, "roloDiam") / 2 - o.roloAmassa;
  const aCanela = anguloNoPlano(coxa) - joelho;
  const certo = aCanela + (lado * Math.atan2(off, o.roloAoLongo)) / rad;
  let alavanca = certo;
  if (recua) {
    // com o joelho fora do eixo, o rolo anda num arco que não é o da canela: ele escorrega ao longo dela
    const R = e.lado.R;
    const canela = norm(sub(R.tornozelo, R.joelho));
    const n = mul(normal(anguloNoPlano(canela)), lado);
    alavanca = resolver1(
      (a) =>
        dot(
          sub(add(G.eixo, mul(direcaoDaAlavanca(a), S.rolo)), [
            0,
            R.joelho[1],
            R.joelho[2],
          ]),
          n,
        ) - off,
      certo - 30,
      certo + 30,
      30,
    );
    // escorregando, o rolo chega ao tornozelo e ao pé, que saem da linha da canela: ele para na pele (afundando o
    // mesmo que na canela), em vez de entrar no pé (correção da auditoria de 18/11/2026: na extensora, 3,6 cm)
    const r = obj(o.modelo.objeto, "roloDiam") / 2,
      meio = obj(o.modelo.objeto, "roloComp") / 2;
    const pele = pontosDoBoneco(e).filter(
      ({ p, parte }) => (parte === "canela" || parte === "pe") && Math.abs(p[0]) <= meio,
    );
    const folga = (a: number) => {
      const c = add(G.eixo, mul(direcaoDaAlavanca(a), S.rolo));
      let min = 1e9;
      for (const { p } of pele) min = Math.min(min, Math.hypot(p[1] - c[1], p[2] - c[2]) - r);
      return min + o.roloAmassa;
    };
    // (e, onde a perna afina, ele não fica solto: encosta na pele, como no resto do ciclo)
    const f0 = folga(alavanca);
    if (Math.abs(f0) > 0.05) alavanca = resolver1(folga, alavanca, alavanca + (f0 < 0 ? lado : -lado) * 20, 24);
  }
  // o encosto: no erro do joelho fora do eixo, ele está regulado para trás, junto com as costas
  const encosto = recua
    ? S.encosto -
      (recua * dot(G.ao, frenteDoEncosto(o, S.encosto).frente)) /
        frenteDoEncosto(o, S.encosto).frente[2]
    : S.encosto;
  return { e, alavanca, encosto, joelhoNoEixo: joelhoC };
}

/** Quanto falta para as mãos chegarem às alças (cm), no pior dos dois lados. */
const faltaDasMaos = (e: Esq) => Math.max(e.lado.R.falta.braco, e.lado.L.falta.braco);

/** O erro com as mãos nas alças: quanto a bacia sobe, quanto o tronco deita a mais e quanto os ombros descem. */
export interface ErroComAsMaos {
  sobe: number;
  deita: number;
  ombrosDescem: number;
}

/**
 * As mãos ficam nas alças também nos erros (correção da auditoria de 18/11/2026: no quadril que sobe e no joelho fora
 * do eixo, as mãos subiam ou recuavam até 4,8 cm da alça, porque o braço já quase esticado não alcançava). Quem segura
 * as alças e tira o quadril do banco empurra as alças para baixo: os ombros descem (`ombrosDescem`, graus da
 * clavícula), até `desceMax`. Se nem assim as mãos alcançam, a bacia sobe só o que os braços deixam (menos que `sobe`).
 * `encosta`: o tronco deita o que precisa para as costas continuarem no encosto (o erro do quadril da extensora); sem
 * ele, deita `deita` graus. Para o erro inteiro (u = 1); uma vez por corpo (../calibragens.ts).
 */
export function erroComAsMaosNasAlcas(
  corpo: Corpo,
  o: OpcoesDaCadeira,
  S: Sentado,
  chave: string,
  joelho: number,
  dv: Desvio & { encosta?: boolean },
  desceMax: number,
): ErroComAsMaos {
  return calibragem(corpo, `${chave}:maos-nas-alcas`, () => {
    const pedido = dv.sobe ?? 0;
    const deitaPara = (sobe: number) =>
      dv.encosta
        ? resolver1(
            (d) => {
              const r = naCadeira(corpo, o, S, joelho, { ...dv, sobe, deita: d });
              const f = folgasDasCostas(r.e, o, r.encosto);
              return Math.min(f.baixo, f.cima);
            },
            0,
            20,
            24,
          )
        : (dv.deita ?? 0);
    const falta = (sobe: number, deita: number, desce: number) =>
      faltaDasMaos(naCadeira(corpo, o, S, joelho, { ...dv, sobe, deita, ombrosDescem: desce }).e) - 0.005;
    let sobe = pedido,
      deita = deitaPara(sobe);
    if (falta(sobe, deita, 0) <= 0) return { sobe, deita, ombrosDescem: 0 };
    if (falta(sobe, deita, desceMax) <= 0) return { sobe, deita, ombrosDescem: resolver1((d) => falta(sobe, deita, d), 0, desceMax, 24) };
    sobe = resolver1((s) => falta(s, deitaPara(s), desceMax), 0, pedido, 20);
    deita = deitaPara(sobe);
    return { sobe, deita, ombrosDescem: desceMax };
  });
}

/**
 * A ordem de pintura da parte da máquina que se mexe (correção da auditoria de 18/11/2026). `dz`: quanto ela vai para
 * trás (cm; ../pecas-de-cena/cadeira-flexora.ts, `OpcoesDaPeca.dz`); `pesNaFrente`: o rolo não cobre os pés onde eles
 * ficam na frente dele (`OpcoesDaPeca.naFrenteDoRolo`).
 */
export interface Pintura {
  dz?: OpcoesDaPeca["dz"];
  pesNaFrente?: boolean;
}

/**
 * O quadro: o corpo, a máquina regulada para ele (o encosto, o rolo, a trava, a posição inicial `inicio` da alavanca,
 * de onde as placas começam a subir) e as marcas que as regras leem (../regras/cadeiras.ts). A estrutura da máquina é
 * pintada atrás do corpo (cenário); a alavanca, o rolo e as placas, na ordem de profundidade, com o ajuste de `pintura`.
 */
export function quadroNaCadeira(
  corpo: Corpo,
  o: OpcoesDaCadeira,
  S: Sentado,
  joelho: number,
  inicio: number,
  placas: number,
  dv: Desvio = {},
  travaFolga = 0,
  pintura: Pintura = {},
): Quadro {
  const r = naCadeira(corpo, o, S, joelho, dv);
  const trava = S.trava + travaFolga;
  // a trava (na flexora) é pintada por cima das coxas; os estofados, na conferência, com os cantos redondos do desenho;
  // a parte que se mexe, na ordem de pintura que o exercício pede (`pintura`)
  const M = cadeiraFlexora(
    {
      alavanca: r.alavanca,
      inicio,
      rolo: S.rolo,
      encosto: r.encosto,
      trava,
      placas,
    },
    o.modelo,
    {
      travaAParte: true,
      cantosRedondos: true,
      dz: pintura.dz,
      naFrenteDoRolo: pintura.pesNaFrente
        ? formaDoBoneco(r.e)
            .grupos.filter((g) => g.id.startsWith("perna"))
            .flatMap((g) => g.volumes.filter((v) => v.nome === "pe").map((v) => v.vol.aneis))
        : undefined,
    },
  );
  const G = geometriaDaCadeiraFlexora(o.modelo);
  const g = m_(o);
  const zTrava =
    G.frenteTopo[2] - (o.modelo.trava ? g("travaComp") / 2 + 4 : 0);
  const f = folgasDasCostas(r.e, o, r.encosto);
  return {
    esq: r.e,
    prims: [chao(-90, 90, -90, 110), ...M.prims],
    pecas: [
      { ...M.fixa, cenario: true },
      M.movel,
      ...(M.trava ? [M.trava] : []),
    ],
    fios: [],
    cargas: [],
    marcas: {
      eixo: M.eixo,
      rolo: M.centroRolo,
      roloMeio: [g("roloComp") / 2, g("roloDiam") / 2, 0],
      roloPontaR: M.pontasDoRolo[0],
      roloPontaL: M.pontasDoRolo[1],
      alavanca: [r.alavanca, inicio, g("cameDiam") / 2],
      pilha: [M.subida, 0, 0],
      alcaR: alca(o, "R"),
      alcaL: alca(o, "L"),
      assento: [apoioNoAssentoDaCadeira(r.e, o), 0, 0],
      costas: [Math.min(f.baixo, f.cima), 0, 0],
      ...(o.modelo.trava
        ? { trava: [trava, zTrava, g("travaComp") / 2] as V3 }
        : {}),
    },
  };
}
