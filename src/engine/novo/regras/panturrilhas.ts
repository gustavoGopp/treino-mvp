// Regras medidas das panturrilhas em pé (no chão, no degrau da escada e no step) e da sentada com halter. Os alvos
// que vêm da ficha do movimento (a altura do calcanhar em cima e embaixo, a superfície do apoio) chegam pelas marcas
// do quadro: `apoioDosPes` (y = a superfície onde a bola do pé pisa), `calcanharEmCima` e `calcanharEmbaixo` (y = a
// altura pedida do calcanhar), `maoNoApoioR` e `maoNoApoioL` (a pegada da mão que só equilibra).
import { formaDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { medirErroDoHalter } from '../exercicios/panturrilha-sentada-halter';
import { centroDeMassa } from '../movimento';
import type { Quadro } from '../movimento';
import { pesoNoCorpo, pontosDoPeso } from './peso-fora-do-corpo';
import { comb, dist, dot, norm, sub } from '../vec';
import type { V3 } from '../vec';

/** A menor distância (cm) da pele da mão esquerda (a mão e o polegar) à superfície do halter (as cabeças e o cabo). */
function maoEsquerdaAoHalter(q: Quadro): number {
  const peso: V3[] = q.prims.filter((p) => (p.t === 'prisma' && p.cls === 'ferro') || (p.t === 'volume' && p.cls === 'aco')).flatMap((p) => pontosDoPeso(p as Parameters<typeof pontosDoPeso>[0]));
  let min = Infinity;
  for (const g of formaDoBoneco(q.esq).grupos) {
    if (g.lado !== 'L') continue;
    for (const v of g.volumes) {
      if (v.nome !== 'mao' && v.nome !== 'polegar') continue;
      for (const an of v.vol.aneis)
        for (let k = 0; k < 16; k++) {
          const th = (k * Math.PI) / 8,
            sn = Math.sin(th);
          const p = comb([1, an.c], [an.a * Math.cos(th), an.x], [(sn >= 0 ? an.f : an.b) * sn, an.z]);
          for (const h of peso) min = Math.min(min, dist(p, h));
        }
    }
  }
  return min;
}

export const regrasDasPanturrilhas: Record<string, Regra> = {
  'joelhos-estendidos-na-panturrilha': (q) => {
    const j = q.map((x) => angulosDoLado(x.esq, 'R').joelho);
    const [a, b] = faixa(j);
    return { medido: `o joelho de apoio dobra de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: b <= 10 && b - a <= 3 };
  },
  'calcanhar-sobe-o-maximo': (q) => {
    // o quadro com o calcanhar mais alto (a primeira fase com movimento pode ser a subida ou a descida)
    const fim = q.reduce((a, x) => (x.esq.lado.R.calcanhar[1] > a.esq.lado.R.calcanhar[1] ? x : a));
    const sobe = fim.esq.lado.R.calcanhar[1] - fim.marcas.apoioDosPes![1],
      pede = fim.marcas.calcanharEmCima![1] - fim.marcas.apoioDosPes![1];
    return { medido: `em cima, o calcanhar fica ${f1(sobe)} cm acima do apoio (a ficha: ${f1(pede)} cm)`, ok: Math.abs(sobe - pede) <= 0.5 };
  },
  'calcanhar-abaixo-da-beirada': (q) => {
    // o quadro com o calcanhar mais baixo
    const ini = q.reduce((a, x) => (x.esq.lado.R.calcanhar[1] < a.esq.lado.R.calcanhar[1] ? x : a));
    const desce = ini.marcas.apoioDosPes![1] - ini.esq.lado.R.calcanhar[1],
      pede = ini.marcas.apoioDosPes![1] - ini.marcas.calcanharEmbaixo![1];
    return { medido: `embaixo, o calcanhar fica ${f1(desce)} cm abaixo da beirada (a ficha: ${f1(pede)} cm)`, ok: desce >= 2 && Math.abs(desce - pede) <= 0.5 };
  },
  'peso-sobre-a-bola-do-pe': (q) => {
    const d = q.map((x) => centroDeMassa(x.esq, 'homem', x.cargas)[2] - x.esq.lado.R.bola[2]);
    const [a, b] = faixa(d);
    const cab = faixa(q.map((x) => x.esq.cabeca.o[2]));
    return { medido: `o centro de massa (corpo + carga) fica de ${f1(a)} a ${f1(b)} cm da vertical da bola do pé; a cabeça anda ${f1(cab[1] - cab[0])} cm para a frente ou para trás na subida`, ok: Math.max(-a, b) <= 1 && cab[1] - cab[0] <= 2 };
  },
  'joelhos-a-90-sentado': (q) => {
    const [a, b] = faixa(q.map((x) => angulosDoLado(x.esq, 'R').joelho));
    return { medido: `o joelho dobra de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: a >= 80 && b <= 100 };
  },
  'halter-sobre-a-coxa-perto-do-joelho': (q) => {
    // o centro do halter: quanto fica do joelho, ao longo da coxa, e quanto fica acima do eixo da coxa (do lado da
    // frente da coxa, que sentado fica para cima)
    const d = q.map((x) => {
      const L = x.esq.lado.R;
      const v = sub(x.marcas.halter!, L.joelho);
      const eixo = norm(sub(L.joelho, L.quadril));
      return { ao: -dot(v, eixo), acima: dot(v, L.coxa.z) };
    });
    const [a, b] = faixa(d.map((x) => x.ao));
    const [c, e] = faixa(d.map((x) => x.acima));
    return { medido: `o centro do halter fica de ${f1(a)} a ${f1(b)} cm do joelho, ao longo da coxa, e de ${f1(c)} a ${f1(e)} cm acima do eixo da coxa`, ok: b <= 20 && c > 0 };
  },
  'maos-paradas-no-apoio': (q) => {
    const nomes = (['maoNoApoioR', 'maoNoApoioL'] as const).filter((k) => q[0]!.marcas[k]);
    const anda = Math.max(...nomes.map((k) => Math.max(...q.map((x) => dist(x.marcas[k]!, q[0]!.marcas[k]!)))));
    return { medido: `a mão que equilibra anda no máximo ${f1(anda)} cm no ciclo`, ok: nomes.length > 0 && anda <= 0.1 };
  },
  'panturrilha-sentada-maos-no-halter': (q, corpo, ex) => {
    // a mão que segura fica parada no halter: a distância do centro da mão ao centro da cabeça que ela segura não muda
    // (a direita na cabeça de fora, a esquerda na de dentro), no ciclo e, para a direita, no erro "Halter escorregando"
    const dR = (x: Quadro) => dist(x.esq.lado.R.pegada, x.marcas.cabecaFora!),
      dL = (x: Quadro) => dist(x.esq.lado.L.pegada, x.marcas.cabecaDentro!);
    const [r0, r1] = faixa(q.map(dR)),
      [l0, l1] = faixa(q.map(dL));
    const erro = ex?.ficha.erros.find((e) => e.id === 'halter');
    if (!erro) return { medido: 'o erro "Halter escorregando" não está na ficha', ok: false };
    const eq = Array.from({ length: 9 }, (_, i) => ({ u: i / 8, q: ex!.quadro(corpo, i / 8, 'halter') }));
    const [e0, e1] = faixa(eq.map((x) => dR(x.q)));
    // a mão que soltou (a esquerda): não entra no halter e fica perto dele, sem tocá-lo, depois de soltar
    const entra = Math.max(...eq.filter((x) => x.u >= 0.25).map((x) => pesoNoCorpo(x.q, { partes: (p) => p === 'mao:L' || p === 'polegar:L', maosSoltas: ['L'] }).cm));
    const folgas = eq.filter((x) => x.u >= 0.25).map((x) => maoEsquerdaAoHalter(x.q));
    const [g0, g1] = faixa(folgas);
    const solta = dL(eq[8]!.q) - l1;
    const ok = r1 - r0 <= 0.1 && l1 - l0 <= 0.1 && Math.max(e1, r1) - Math.min(e0, r0) <= 0.1 && entra === 0 && g0 >= 0.5 && g1 <= 12 && solta >= 4;
    return {
      medido: `no ciclo, o centro da mão direita fica de ${f1(r0)} a ${f1(r1)} cm do centro da cabeça de fora, e o da esquerda de ${f1(l0)} a ${f1(l1)} cm do da de dentro; no erro "${erro.titulo}", a direita continua segurando (${f1(e0)} a ${f1(e1)} cm) e a esquerda solta (sai ${f1(solta)} cm do lugar na cabeça de dentro, entra ${f1(entra)} cm no halter e fica de ${f1(g0)} a ${f1(g1)} cm dele, da metade do primeiro quarto em diante)`,
      ok,
    };
  },
  'panturrilha-sentada-halter-sai-de-lado': (_q, corpo, ex) => {
    if (!ex?.ficha.erros.some((e) => e.id === 'halter')) return { medido: 'o erro "Halter escorregando" não está na ficha', ok: false };
    // 33 instantes do erro (a descida do halter é calculada em 9 e, entre eles, é a reta)
    const M = Array.from({ length: 33 }, (_, i) => medirErroDoHalter(corpo, i / 32));
    const naToalha = Math.max(...M.map((x) => x.naToalha));
    const fim = M[32]!;
    return {
      medido: `no fim do erro, o centro do halter fica ${f1(fim.foraDaCoxa)} cm por fora da lateral da coxa direita, a cabeça de fora desceu ${f1(fim.desce)} cm e o halter girou ${f1(fim.gira)}°; em 33 instantes, ele entra no máximo ${f1(naToalha)} cm na toalha`,
      ok: fim.foraDaCoxa > 0 && fim.desce > 0 && naToalha <= 0.05,
    };
  },
};
