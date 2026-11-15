// Regras medidas dos exercícios de braço e ombro em pé na polia (../exercicios/polia-bracos.ts): o crucifixo, o
// crucifixo invertido, o face pull e a rosca na polia baixa. O tronco parado usa a regra comum "tronco-quase-parado"
// (../conferir.ts); o equilíbrio e o curso da primeira pilha, a conferência geral.
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { dist, dot, sub } from '../vec';
import type { V3 } from '../vec';

/** Distância de um ponto a um segmento. */
function aoSegmento(p: V3, a: V3, b: V3): number {
  const ab = sub(b, a);
  const t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, [a[0] + ab[0] * t, a[1] + ab[1] * t, a[2] + ab[2] * t]);
}
/** Os ids dos cabos de um quadro (os fios que não são elástico nem fita). */
const idsDosCabos = (q: Quadro) => q.fios.map((x) => x.id).filter((id) => q.marcas[`${id}.ponta`]);
/** A clavícula além do ritmo normal (graus; negativo = para trás), dos dois lados. */
const retracao = (q: Quadro, k: 'R' | 'L') => q.esq.lado[k].ang.claviculaRetr;

export const REGRAS_POLIA_BRACOS: Record<string, Regra> = {
  'polia-braco-cabos-livres-do-corpo': (q) => {
    // cada cabo, da ponta (o elo, a bucha, o meio da barra) à saída da roldana, não encosta no corpo; ficam de fora só a
    // mão que segura e o pedaço do antebraço junto do punho dela (a mão fecha em volta da peça)
    let min = 1e9,
      onde = '';
    for (const x of q.filter((_, i) => i % 3 === 0 || i === q.length - 1)) {
      const P = pontosDoBoneco(x.esq);
      for (const id of idsDosCabos(x)) {
        const a = x.marcas[`${id}.ponta`]!,
          b = x.marcas[`${id}.saida`]!;
        // as mãos que seguram este cabo: as que ficam perto da ponta dele
        const maos = (['R', 'L'] as const).filter((k) => dist(x.esq.lado[k].pegada, a) < 30);
        for (const { p, parte } of P) {
          const perto = maos.some((k) => ((parte === 'mao' || parte === 'polegar') && dist(p, x.esq.lado[k].pegada) < 14) || (parte === 'ante' && dist(p, x.esq.lado[k].punho) < 8));
          if (perto) continue;
          const d = aoSegmento(p, a, b);
          if (d < min) {
            min = d;
            onde = `${id}, ${parte}`;
          }
        }
      }
    }
    return { medido: `os cabos passam a no mínimo ${f1(min)} cm da pele (${onde})`, ok: min >= 0.5 };
  },
  'polia-braco-pilha-de-cada-coluna': (q) => {
    // a conferência geral mede a pilha da primeira coluna contra cada cabo; aqui, cada pilha contra o seu cabo
    const rel = obj('torre', 'relacao');
    const ids = idsDosCabos(q[0]!);
    const partes = ids.map((id, i) => {
      const [a, b] = faixa(q.map((x) => x.fios.find((y) => y.id === id)!.comp));
      const [p0, p1] = faixa(q.map((x) => x.marcas[i === 0 ? 'pilha' : `pilha${i + 1}`]![1]));
      return { id, curso: b - a, sobe: p1 - p0, ok: Math.abs((b - a) / rel - (p1 - p0)) <= 0.3 };
    });
    return { medido: partes.map((p) => `${p.id}: o cabo anda ${f1(p.curso)} cm e a pilha sobe ${f1(p.sobe)} cm (esperado ${f1(p.curso / rel)})`).join('; '), ok: partes.every((p) => p.ok) };
  },
  'polia-braco-polias-na-altura-do-ombro': (q) => {
    const x = q[0]!;
    const ds = idsDosCabos(x).map((id) => x.marcas[`${id}.roldana`]![1] - x.esq.lado.R.ombro[1]);
    const pior = Math.max(...ds.map(Math.abs));
    return { medido: `o centro de cada roldana fica a ${ds.map((d) => f1(d)).join(' e ')} cm da altura do centro do ombro (no começo)`, ok: pior <= 5 };
  },
  // ----- crucifixo -----
  'polia-braco-cotovelo-fixo': (q) => {
    const [a, b] = faixa(q.flatMap((x) => [angulosDoLado(x.esq, 'R').cotovelo, angulosDoLado(x.esq, 'L').cotovelo]));
    return { medido: `o cotovelo fica de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: b - a <= 3 && a >= 8 && b <= 35 };
  },
  'polia-braco-maos-na-linha-do-corpo': (q) => {
    // no alongado, o centro da mão, visto de cima, fica na linha do ombro ou um pouco atrás (no tórax)
    const e = q[0]!.esq;
    const d = (['R', 'L'] as const).map((k) => dot(sub(e.lado[k].pegada, e.lado[k].ombro), e.torax.z));
    return { medido: `no alongado, o centro da mão fica ${d.map((x) => f1(-x)).join(' e ')} cm atrás da linha do ombro (negativo = à frente)`, ok: d.every((x) => x <= 4 && x >= -15) };
  },
  'polia-braco-maos-se-encontram': (q) => {
    const e = q[q.length - 1]!.esq;
    const gap = dist(e.lado.R.pegada, e.lado.L.pegada);
    // a parte de baixo do peito: entre a altura das axilas e a da 10ª costela, medidas no tórax a partir de C7
    const m = (id: string) => e.corpo.m(id);
    const abaixoDeC7 = dot(sub(e.torax.o, e.lado.R.pegada), e.torax.y);
    const de = m('altura.cervical') - m('altura.axila'),
      ate = m('altura.cervical') - m('altura.costela10');
    const frente = dot(sub(e.lado.R.pegada, e.torax.o), e.torax.z);
    return { medido: `no fim, os centros das mãos ficam a ${f1(gap)} cm um do outro, ${f1(abaixoDeC7)} cm abaixo de C7 no tórax (parte de baixo do peito: de ${f1(de)} a ${f1(ate)} cm) e ${f1(frente)} cm à frente`, ok: gap <= 12 && abaixoDeC7 >= de && abaixoDeC7 <= ate + 3 && frente >= 20 };
  },
  // ----- crucifixo invertido -----
  'polia-braco-cabos-cruzados': (q) => {
    // cada cabo: a mão que o segura (a mais perto da ponta) e o lado da roldana
    const x = q[0]!;
    const pares = idsDosCabos(x).map((id) => {
      const a = x.marcas[`${id}.ponta`]!;
      const k = dist(x.esq.lado.R.pegada, a) < dist(x.esq.lado.L.pegada, a) ? 'R' : 'L';
      const r = x.marcas[`${id}.roldana`]![0];
      return { id, k, r, cruzado: (k === 'R' && r > 0) || (k === 'L' && r < 0) };
    });
    return { medido: pares.map((p) => `${p.id}: a mão ${p.k === 'R' ? 'direita' : 'esquerda'} puxa a coluna da ${p.r > 0 ? 'esquerda' : 'direita'}`).join('; '), ok: pares.length === 2 && pares.every((p) => p.cruzado) };
  },
  'polia-braco-bracos-quase-retos': (q) => {
    const [a, b] = faixa(q.flatMap((x) => [angulosDoLado(x.esq, 'R').cotovelo, angulosDoLado(x.esq, 'L').cotovelo]));
    return { medido: `o cotovelo fica de ${f1(a)}° a ${f1(b)}° no ciclo`, ok: b - a <= 3 && a >= 3 && b <= 20 };
  },
  'polia-braco-cruzados-a-frente': (q) => {
    const e = q[0]!.esq,
      R = e.lado.R,
      L = e.lado.L;
    const frente = dot(sub(R.pegada, R.ombro), e.torax.z);
    const alt = (k: 'R' | 'L') => e.lado[k].pegada[1] - e.lado[k].ombro[1];
    return { medido: `no começo, a mão direita fica ${f1(R.pegada[0])} cm e a esquerda ${f1(L.pegada[0])} cm do meio do corpo (positivo = lado esquerdo), ${f1(frente)} cm à frente do ombro; a mão direita ${f1(alt('R'))} cm e a esquerda ${f1(alt('L'))} cm da altura do ombro`, ok: R.pegada[0] > 0 && L.pegada[0] < 0 && frente >= 45 && Math.abs(alt('R')) <= 10 && Math.abs(alt('L')) <= 10 };
  },
  'polia-braco-maos-perto-da-linha-do-corpo': (q) => {
    const e = q[q.length - 1]!.esq;
    const d = (['R', 'L'] as const).map((k) => dot(sub(e.lado[k].pegada, e.lado[k].ombro), e.torax.z));
    const alt = (['R', 'L'] as const).map((k) => e.lado[k].pegada[1] - e.lado[k].ombro[1]);
    return { medido: `no fim, o centro da mão fica ${d.map((x) => f1(x)).join(' e ')} cm à frente da linha do ombro (no tórax) e ${alt.map((x) => f1(x)).join(' e ')} cm da altura do ombro`, ok: d.every((x) => x >= -5 && x <= 12) && alt.every((x) => Math.abs(x) <= 10) };
  },
  'polia-braco-escapulas-juntam-sem-encolher': (q, corpo) => {
    // juntar as escápulas: a clavícula vai para trás do ritmo normal no fim; sem encolher: ela não sobe além do ritmo
    const ritmo = (x: Quadro, k: 'R' | 'L') => Math.max(0, Math.min(1, (x.esq.lado[k].ang.elevacaoDoBraco - 20) / 130));
    const retr = (x: Quadro) => retracao(x, 'R') - (corpo.m('clavicula.retracaoRepouso') + corpo.m('clavicula.retracaoNaElevacao') * ritmo(x, 'R'));
    const elev = Math.max(...q.flatMap((x) => (['R', 'L'] as const).map((k) => x.esq.lado[k].ang.claviculaElev - (corpo.m('clavicula.elevacaoRepouso') + corpo.m('clavicula.elevacaoNaElevacao') * ritmo(x, k)))));
    const r0 = retr(q[0]!),
      r1 = retr(q[q.length - 1]!);
    const junta = dist(q[q.length - 1]!.esq.lado.R.escapula.raiz, q[q.length - 1]!.esq.lado.L.escapula.raiz) - dist(q[0]!.esq.lado.R.escapula.raiz, q[0]!.esq.lado.L.escapula.raiz);
    return { medido: `a clavícula vai de ${f1(r0)}° a ${f1(r1)}° em relação ao ritmo (positivo = para trás); as raízes das escápulas se aproximam ${f1(-junta)} cm; a clavícula sobe no máximo ${f1(elev)}° além do ritmo`, ok: r1 - r0 >= 5 && r1 <= 15 && elev <= 0.5 && junta < 0 };
  },
  'polia-braco-antebracos-nao-se-atravessam': (q) => {
    // a menor distância entre os eixos dos dois antebraços (do cotovelo ao centro da pegada), menos os dois raios
    let min = 1e9;
    const raio = q[0]!.esq.corpo.m('raio.antebraco');
    for (const x of q) {
      const R = x.esq.lado.R,
        L = x.esq.lado.L;
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const p: V3 = [R.cotovelo[0] + (R.pegada[0] - R.cotovelo[0]) * t, R.cotovelo[1] + (R.pegada[1] - R.cotovelo[1]) * t, R.cotovelo[2] + (R.pegada[2] - R.cotovelo[2]) * t];
        min = Math.min(min, aoSegmento(p, L.cotovelo, L.pegada) - 2 * raio);
      }
    }
    return { medido: `entre os dois antebraços (e as mãos), a menor folga é de ${f1(min)} cm (raio do antebraço ${f1(raio)} cm)`, ok: min >= 0 };
  },
  'polia-braco-ombros-para-tras': (q, corpo) => {
    // a clavícula fica mais para trás que o ritmo normal do ombro (o esqueleto soma o que a ficha pede ao ritmo)
    const alem = q.flatMap((x) => (['R', 'L'] as const).map((k) => {
      const frac = Math.max(0, Math.min(1, (x.esq.lado[k].ang.elevacaoDoBraco - 20) / 130));
      return retracao(x, k) - (corpo.m('clavicula.retracaoRepouso') + corpo.m('clavicula.retracaoNaElevacao') * frac);
    }));
    const [a, b] = faixa(alem);
    return { medido: `a clavícula fica de ${f1(a)}° a ${f1(b)}° mais para trás que o ritmo normal do ombro`, ok: a >= 2 };
  },
};
