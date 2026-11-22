// Regras medidas das máquinas de trilho (o leg press 45°, a panturrilha no leg press e o hack). As marcas que o quadro
// dá: `chapa` (o centro da face da chapa dos pés), `carro` (y = a posição do carro na guia), `batente` (y = a posição
// em que o carro para nos batentes de baixo), `trava` (y = a posição dos suportes da trava fechada), `encosto` (um
// ponto da face do encosto) e `normalEncosto` (a normal dele, para quem treina), `assento` e `normalAssento`, e os
// alvos da panturrilha (`tornozeloEmbaixo`: y = a dorsiflexão pedida embaixo; `tornozeloEmCima`: y = a flexão plantar
// pedida em cima).
import { pontosDoBoneco } from '../boneco';
import { peleDensa } from '../pele-densa';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq, Lado } from '../esqueleto';
import type { Quadro } from '../movimento';
import { angulo, cross, dist, dot, norm, sub } from '../vec';
import type { V3 } from '../vec';
import { hack } from '../exercicios/hack';
import { legPress } from '../exercicios/leg-press';
import { dentroDaTolerancia, entradaDensa, textoDaEntrada } from './entrada-densa';
import { estofadoEmCaixa, nadaPorBaixo, pinturaNasVistas, textoDaPintura } from './pintura-sobre-o-estofado';
import type { ParteMedida } from './pintura-sobre-o-estofado';

const LADOS: Lado[] = ['R', 'L'];
/** As partes do corpo, dos dois lados, que a regra de pintura mede. */
const PARTES_DO_CORPO: ParteMedida[] = [
  ...LADOS.flatMap((k) => ['braco', 'ante'].map((volume) => ({ grupo: `braco${k}`, volume }))),
  ...LADOS.flatMap((k) => ['coxa', 'canela'].map((volume) => ({ grupo: `perna${k}`, volume }))),
  ...['tronco', 'pelve', 'cabeca'].map((volume) => ({ grupo: 'corpo', volume })),
];
/** A distância (cm) de um ponto ao plano da face da chapa: positiva do lado de quem treina. */
const naChapa = (q: Quadro, p: V3) => dot(sub(p, q.marcas.chapa!), q.marcas.normalChapa!);
/** O quanto o glúteo fica acima do assento e as costas na frente do encosto (cm; negativo = afunda). */
function folgas(e: Esq, q: Quadro) {
  const P = pontosDoBoneco(e).filter(({ p }) => Math.abs(p[0]) < 18);
  const minEm = (partes: string[], o: V3, n: V3) => Math.min(...P.filter((x) => partes.includes(x.parte)).map((x) => dot(sub(x.p, o), n)));
  return {
    assento: q.marcas.assento ? minEm(['pelve'], q.marcas.assento, q.marcas.normalAssento!) : 0,
    costasCima: minEm(['tronco'], q.marcas.encosto!, q.marcas.normalEncosto!),
    costasBaixo: minEm(['pelve', 'cintura'], q.marcas.encosto!, q.marcas.normalEncosto!),
  };
}

export const REGRAS_NO_TRILHO: Record<string, Regra> = {
  'joelho-passa-de-90-no-trilho': (q) => {
    const m = Math.max(...q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return { medido: `embaixo, o joelho dobra ${f1(m)}°`, ok: m > 90 };
  },
  'joelhos-sem-travar-no-trilho': (q) => {
    const m = Math.min(...q.flatMap((x) => LADOS.map((k) => angulosDoLado(x.esq, k).joelho)));
    return { medido: `em cima, o joelho dobra ${f1(m)}°`, ok: m >= 5 && m <= 20 };
  },
  'quadril-apoiado-no-assento-do-leg-press': (q) => {
    const F = q.map((x) => folgas(x.esq, x));
    const [a0, a1] = faixa(F.map((x) => x.assento));
    const [c0, c1] = faixa(F.map((x) => x.costasCima));
    const [b0, b1] = faixa(F.map((x) => x.costasBaixo));
    const lombar = faixa(q.map((x) => x.esq.pose.lombar ?? 0));
    return {
      medido: `o glúteo fica de ${f1(a0)} a ${f1(a1)} cm do assento; as escápulas, de ${f1(c0)} a ${f1(c1)} cm do encosto e a bacia, de ${f1(b0)} a ${f1(b1)} cm; a lombar não muda (${f1(lombar[0])}° a ${f1(lombar[1])}°)`,
      ok: a1 <= 0.5 && a0 >= -2.5 && c1 <= 0.5 && b1 <= 0.5 && Math.min(c0, b0) >= -2.5 && lombar[1] - lombar[0] < 0.1,
    };
  },
  'pes-presos-na-chapa': (q) => {
    // a bola e o calcanhar de cada pé, na chapa: a mesma posição em relação ao centro dela e encostados nela
    const rel = (x: Quadro, k: Lado) => [sub(x.esq.lado[k].bola, x.marcas.chapa!), sub(x.esq.lado[k].calcanhar, x.marcas.chapa!)];
    let anda = 0;
    for (const x of q) for (const k of LADOS) rel(x, k).forEach((v, i) => (anda = Math.max(anda, dist(v, rel(q[0]!, k)[i]!))));
    const sola = Math.max(...q.flatMap((x) => LADOS.map((k) => Math.abs(naChapa(x, x.esq.lado[k].bola)))));
    // o carro só anda na guia: o centro da chapa fica na linha dela
    const g = q.map((x) => x.marcas.chapa!);
    const dir = norm(sub(g[g.length - 1]!, g[0]!));
    const fora = Math.max(...g.map((p) => { const v = sub(p, g[0]!); return dist(v, [dir[0] * dot(v, dir), dir[1] * dot(v, dir), dir[2] * dot(v, dir)]); }));
    const ang = Math.min(angulo(dir, q[0]!.marcas.guia!), 180 - angulo(dir, q[0]!.marcas.guia!));
    return { medido: `os pés andam ${f1(anda)} cm em relação à chapa e a bola do pé fica a ${f1(sola)} cm dela; a chapa sai ${f1(fora)} cm da linha da guia, a ${f1(ang)}° dela`, ok: anda <= 0.1 && sola <= 0.1 && fora <= 0.1 && ang <= 0.5 };
  },
  'joelhos-na-linha-dos-pes-no-trilho': (q) => {
    // o plano da perna (quadril, joelho, tornozelo) contém a direção dos dedos: o joelho anda sobre a linha do pé
    let pior = 0;
    for (const x of q)
      for (const k of LADOS) {
        const L = x.esq.lado[k];
        const n = norm(cross(sub(L.joelho, L.quadril), sub(L.tornozelo, L.joelho)));
        pior = Math.max(pior, Math.abs(90 - angulo(n, L.pe.z)));
      }
    return { medido: `o plano da perna fica a até ${f1(pior)}° da direção dos dedos`, ok: pior <= 10 };
  },
  'maos-paradas-nos-pegadores-do-trilho': (q) => {
    const anda = Math.max(...LADOS.map((k) => Math.max(...q.map((x) => dist(x.esq.lado[k].pegada, q[0]!.esq.lado[k].pegada)))));
    const falta = Math.max(...q.flatMap((x) => LADOS.map((k) => x.esq.lado[k].falta.braco)));
    return { medido: `as mãos andam ${f1(anda)} cm no ciclo; falta ${f1(falta)} cm para alcançar o pegador`, ok: anda <= 0.1 && falta <= 0.1 };
  },
  'ponta-do-pe-na-borda-da-chapa': (q) => {
    // a bola do pé presa na chapa (no mesmo lugar dela e encostada), perto da borda de baixo; o calcanhar fora da chapa
    let anda = 0,
      sola = 0,
      borda = 1e9,
      bordaMax = -1e9;
    for (const x of q)
      for (const k of LADOS) {
        const b = x.esq.lado[k].bola;
        anda = Math.max(anda, dist(sub(b, x.marcas.chapa!), sub(q[0]!.esq.lado[k].bola, q[0]!.marcas.chapa!)));
        sola = Math.max(sola, Math.abs(naChapa(x, b)));
        const d = dot(sub(b, x.marcas.bordaDaChapa!), x.marcas.sobeChapa!);
        borda = Math.min(borda, d);
        bordaMax = Math.max(bordaMax, d);
      }
    const calc = Math.max(...q.flatMap((x) => LADOS.map((k) => dot(sub(x.esq.lado[k].calcanhar, x.marcas.bordaDaChapa!), x.marcas.sobeChapa!))));
    const g = q.map((x) => x.marcas.chapa!);
    const dir = norm(sub(g[g.length - 1]!, g[0]!));
    const ang = Math.min(angulo(dir, q[0]!.marcas.guia!), 180 - angulo(dir, q[0]!.marcas.guia!));
    return { medido: `a bola do pé anda ${f1(anda)} cm em relação à chapa, fica a ${f1(sola)} cm dela e a ${f1(borda)}–${f1(bordaMax)} cm da borda de baixo; o calcanhar fica no mínimo ${f1(-calc)} cm além da borda; a chapa anda a ${f1(ang)}° da guia`, ok: anda <= 0.1 && sola <= 0.1 && borda >= 1 && bordaMax <= 4 && calc < 0 && ang <= 0.5 };
  },
  'tornozelo-alonga-embaixo-na-chapa': (q) => {
    const d = q.map((x) => angulosDoLado(x.esq, 'R').dorsiflexao);
    const m = Math.max(...d),
      pede = q[0]!.marcas.tornozeloEmbaixo![1];
    const ini = q[d.indexOf(m)]!;
    const h = naChapa(ini, ini.esq.lado.R.calcanhar) - naChapa(ini, ini.esq.lado.R.bola);
    return { medido: `embaixo, o tornozelo dobra ${f1(m)}° para cima (a ficha: ${f1(pede)}°); o calcanhar fica ${f1(-h)} cm além do plano da chapa`, ok: Math.abs(m - pede) <= 0.5 && h < 0 };
  },
  'calcanhar-sobe-o-maximo-na-chapa': (q) => {
    const d = q.map((x) => -angulosDoLado(x.esq, 'R').dorsiflexao);
    const m = Math.max(...d),
      pede = q[0]!.marcas.tornozeloEmCima![1];
    const fim = q[d.indexOf(m)]!;
    const h = naChapa(fim, fim.esq.lado.R.calcanhar) - naChapa(fim, fim.esq.lado.R.bola);
    return { medido: `em cima, o tornozelo estica ${f1(m)}° (a ficha: ${f1(pede)}°); o calcanhar fica ${f1(h)} cm acima do plano da chapa`, ok: Math.abs(m - pede) <= 0.5 };
  },
  'carro-acima-da-trava-fechada': (q) => {
    const m = Math.min(...q.map((x) => x.marcas.carro![1] - x.marcas.trava![1]));
    return { medido: `no ponto mais baixo, o carro fica ${f1(m)} cm acima dos suportes da trava fechada`, ok: m > 0 && m <= 10 };
  },
  'costas-e-ombros-no-encosto-do-hack': (q) => {
    // as costas (escápulas e bacia) na face do encosto; o alto dos ombros sob a face de baixo das almofadas. Na pele
    // densa (../pele-densa.ts; correção de 19/11/2026, a auditoria da fase C): com os 12 pontos de cada anel, o alto
    // dos ombros saía 1,9 cm mais baixo que o desenhado, e a almofada entrava 2,8 cm nele
    let costas = -1e9,
      fundo = 1e9,
      ombro = -1e9,
      ombroMin = 1e9;
    for (const x of q) {
      const P = peleDensa(x.esq, ['tronco', 'pelve', 'cintura', 'pescoco']);
      const meia = 16;
      for (const partes of [['tronco'], ['pelve', 'cintura']]) {
        const d = Math.min(...P.filter((p) => partes.includes(p.parte) && Math.abs(p.p[0]) < meia).map((p) => dot(sub(p.p, x.marcas.encosto!), x.marcas.normalEncosto!)));
        costas = Math.max(costas, d);
        fundo = Math.min(fundo, d);
      }
      const o = Math.max(...P.filter((p) => ['tronco', 'pescoco'].includes(p.parte) && Math.abs(Math.abs(p.p[0]) - 13.5) < 5.5).map((p) => dot(sub(p.p, x.marcas.ombreira!), x.marcas.sobe!)));
      ombro = Math.max(ombro, o);
      ombroMin = Math.min(ombroMin, o);
    }
    const lombar = faixa(q.map((x) => x.esq.pose.lombar ?? 0));
    return {
      medido: `as escápulas e a bacia ficam de ${f1(fundo)} a ${f1(costas)} cm da face do encosto; o alto dos ombros, de ${f1(-ombro)} a ${f1(-ombroMin)} cm abaixo das almofadas; a lombar não muda (${f1(lombar[0])}° a ${f1(lombar[1])}°)`,
      ok: costas <= 0.5 && fundo >= -2.5 && ombro <= 2.5 && ombroMin >= -0.5 && lombar[1] - lombar[0] < 0.1,
    };
  },
  'carro-do-hack-so-anda-na-guia': (q) => {
    const p = q.map((x) => x.marcas.encosto!);
    const s = q[0]!.marcas.sobe!;
    const fora = Math.max(...p.map((x) => { const v = sub(x, p[0]!); return dist(v, [s[0] * dot(v, s), s[1] * dot(v, s), s[2] * dot(v, s)]); }));
    const inc = Math.atan2(s[1], Math.hypot(s[0], s[2])) / (Math.PI / 180);
    // a trava fica solta: o carro desce abaixo do suporte de cima dela (fechada, ele pararia ali)
    const [baixo, alto] = faixa(q.map((x) => x.marcas.carro![1] - x.marcas.trava![1]));
    return { medido: `o encosto sai ${f1(fora)} cm da linha da guia, a ${f1(inc)}° do chão; o carro anda de ${f1(alto)} cm acima a ${f1(-baixo)} cm abaixo do suporte de cima da trava (solta)`, ok: fora <= 0.1 && Math.abs(inc - 45) <= 0.5 && alto > 0 && baixo < 0 };
  },
  'maos-nos-pegadores-do-hack': (q) => {
    const d = Math.max(...q.flatMap((x) => [dist(x.esq.lado.R.pegada, x.marcas.pegadorR!), dist(x.esq.lado.L.pegada, x.marcas.pegadorL!)]));
    return { medido: `a mão fica a até ${f1(d)} cm do meio do pegador`, ok: d <= 0.1 };
  },
  'hack-pele-nos-estofados': (q, corpo) => {
    // (acréscimo de 19/11, a auditoria da fase C) a pele densa contra o encosto, as almofadas dos ombros e a chapa, na
    // técnica e nos erros, nos dois lados: a conferência automática mede só 12 pontos por anel
    const r = entradaDensa(hack, q, corpo);
    return { medido: `na pele densa, o quanto cada parte entra em cada peça (o pior quadro): ${textoDaEntrada(r)}`, ok: dentroDaTolerancia(r) };
  },
  'leg-press-corpo-por-cima-dos-estofados': (q, corpo) => {
    // (acréscimo de 19/11, a auditoria da fase C) de cima, o encosto era pintado por cima da raiz dos braços, que fica
    // acima dele: em cada vista do exercício e na de cada erro, os anéis do corpo, dos dois lados, que ficam na frente
    // do encosto (e do assento) e por cima dele na tela não podem ficar por baixo dele na pintura
    const doLegPress = (normal: 'normalEncosto' | 'normalAssento') => (x: Quadro) => {
      const c = x.prims.find((p) => p.t === 'caixa' && p.cls === 'estofado' && dot(p.ref.y, x.marcas[normal]!) > 0.99);
      if (!c || c.t !== 'caixa') throw new Error(`leg press: o estofado de ${normal} não foi achado`);
      return estofadoEmCaixa(c);
    };
    const enc = pinturaNasVistas(legPress, q, corpo, doLegPress('normalEncosto'), PARTES_DO_CORPO);
    const ass = pinturaNasVistas(legPress, q, corpo, doLegPress('normalAssento'), PARTES_DO_CORPO);
    return { medido: `anéis pintados por baixo, de quantos ficam na frente e por cima na tela (o pior quadro); do encosto: ${textoDaPintura(enc)}; do assento: ${textoDaPintura(ass)}`, ok: nadaPorBaixo(enc) && nadaPorBaixo(ass) };
  },
  'carro-acima-do-batente-do-leg-press': (q) => {
    const m = Math.min(...q.map((x) => x.marcas.carro![1] - x.marcas.batente![1]));
    return { medido: `no ponto mais baixo, o carro fica ${f1(m)} cm acima dos batentes`, ok: m > 0 && m <= 8 };
  },
};
