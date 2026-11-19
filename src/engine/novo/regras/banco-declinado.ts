// Regras medidas do abdominal no banco declinado (../exercicios/abdominal-declinado.ts). As do abdominal no chão
// (./abdominais.ts) medem contra o chão; estas medem contra a face do encosto inclinado e os rolos das pernas. O pescoço
// que acompanha e as mãos no peito são as regras dos abdominais, como estão. O limite vem do que a ficha pede, não do
// que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { regioesDasCostas } from '../exercicios/abdominal';
import { abdominalDeclinado, bancoDoDeclinado, daFace } from '../exercicios/abdominal-declinado';
import type { Quadro } from '../movimento';
import { rolosDoDeclinado } from '../pecas-de-cena/banco-declinado';
import { sub } from '../vec';
import { estofadoEmCaixa, estofadoEmVolume, nadaPorBaixo, pinturaNasVistas, textoDaPintura } from './pintura-sobre-o-estofado';
import type { EstofadoMedido, ParteMedida } from './pintura-sobre-o-estofado';

const menor = (v: number[]) => (v.length ? Math.min(...v) : 1e9);

/** Os estofados do banco no quadro: o encosto (a caixa) e os quatro rolos das pernas (os volumes: os dos joelhos, o direito e o esquerdo, e os dos tornozelos), nesta ordem. */
function estofadosDoBanco(x: Quadro): EstofadoMedido[] {
  return x.prims.flatMap((p) => (p.cls !== 'estofado' ? [] : p.t === 'caixa' ? [estofadoEmCaixa(p)] : p.t === 'volume' ? [estofadoEmVolume(p.vol.aneis)] : []));
}
const SEM_AS_PERNAS: ParteMedida[] = [
  { grupo: 'corpo', volume: 'cabeca' },
  { grupo: 'corpo', volume: 'tronco' },
  { grupo: 'corpo', volume: 'pelve' },
  ...(['R', 'L'] as const).flatMap((k) => [
    { grupo: `braco${k}`, volume: 'braco' },
    { grupo: `braco${k}`, volume: 'ante' },
  ]),
];
const PERNAS: ParteMedida[] = (['R', 'L'] as const).flatMap((k) => ['coxa', 'canela', 'pe'].map((volume) => ({ grupo: `perna${k}`, volume })));
const NOMES_DOS_ESTOFADOS = ['o encosto', 'o rolo direito dos joelhos', 'o rolo esquerdo dos joelhos', 'o rolo direito dos tornozelos', 'o rolo esquerdo dos tornozelos'];

export const REGRAS_BANCO_DECLINADO: Record<string, Regra> = {
  'abdominal-declinado-corpo-por-cima-do-banco': (q, corpo) => {
    // (acréscimo de 18/11, a auditoria da fase C) em cada vista do exercício e na de cada erro: os anéis da cabeça,
    // do tronco, da bacia e dos braços e pernas dos dois lados que ficam na frente do encosto e por cima dele na tela
    // não podem ficar por baixo dele na pintura; nos rolos, o mesmo para a cabeça, o tronco, a bacia e os braços. As
    // pernas ficam fora da conta dos rolos: elas se enrolam neles (o rolo na frente do tornozelo amassa o peito do pé, e
    // o pé passa dos dois lados dele), e com um item por rolo o pintor não tem uma ordem que acerte as duas coisas
    // (a conferência escrita dá os números)
    const n = estofadosDoBanco(q[0]!).length;
    const r = Array.from({ length: n }, (_, i) => pinturaNasVistas(abdominalDeclinado, q, corpo, (x) => estofadosDoBanco(x)[i]!, i === 0 ? [...SEM_AS_PERNAS, ...PERNAS] : SEM_AS_PERNAS));
    const so = (v: ReturnType<typeof pinturaNasVistas>) => v.map((x) => ({ ...x, partes: Object.fromEntries(Object.entries(x.partes).filter(([, c]) => c.naFrente > 0)) }));
    const texto = (v: ReturnType<typeof pinturaNasVistas>) => (so(v).every((x) => !Object.keys(x.partes).length) ? 'nenhum anel na frente dele e por cima dele na tela' : textoDaPintura(so(v)));
    return {
      medido: `anéis pintados por baixo de cada estofado do banco, de quantos ficam na frente dele e por cima dele na tela (o pior quadro, nas vistas de lado e de três quartos e nos três erros): ${r.map((v, i) => `${NOMES_DOS_ESTOFADOS[i] ?? `estofado ${i + 1}`} (${i ? 'sem as pernas' : 'o corpo todo'}): ${texto(v)}`).join('; ')}`,
      ok: r.every(nadaPorBaixo),
    };
  },
  'abdominal-declinado-costas-saem-do-banco': (q) => {
    // embaixo, as costas na altura das escápulas encostam na face (amassam até 1,5 cm, sem folga de mais de 1 cm); em
    // cima, as costas da altura das escápulas e a parte de cima da lombar saem dela
    const ini = regioesDasCostas(q[0]!.esq),
      fim = regioesDasCostas(q[q.length - 1]!.esq);
    const e0 = menor(ini.escapulas.map(daFace)),
      e1 = menor(fim.escapulas.map(daFace)),
      l1 = menor(fim.lombar.filter((p) => daFace(p) > -50).map(daFace));
    return { medido: `embaixo, as costas na altura das escápulas ficam a ${f1(e0)} cm da face do encosto; em cima, a ${f1(e1)} cm (o ponto mais perto da lombar, a ${f1(l1)} cm)`, ok: e0 >= -1.5 && e0 <= 1 && e1 >= 5 };
  },
  'abdominal-declinado-bacia-no-banco': (q) => {
    const g = faixa(q.map((x) => menor(pontosDoBoneco(x.esq).filter((y) => y.parte === 'pelve').map((y) => daFace(y.p)))));
    const anda = Math.max(...q.map((x) => Math.hypot(...sub(x.esq.pelve.o, q[0]!.esq.pelve.o))));
    return { medido: `a pele do glúteo fica de ${f1(g[0])} a ${f1(g[1])} cm da face do encosto (negativo = amassa); o centro do quadril anda ${f1(anda)} cm`, ok: g[0] >= -1.5 && g[1] <= 0.5 && anda <= 0.3 };
  },
  'abdominal-declinado-pernas-presas': (q, corpo) => {
    // a pele das pernas encosta nos quatro rolos (atrás dos joelhos e na frente dos tornozelos), amassando até 1,5 cm
    const b = bancoDoDeclinado(corpo);
    const R = rolosDoDeclinado(b);
    const folgas = q
      .filter((_, i) => i % 6 === 0)
      .map((x) => {
        const pele = pontosDoBoneco(x.esq).filter((y) => y.parte === 'coxa' || y.parte === 'canela' || y.parte === 'pe');
        return R.map((r) => {
          const lo = Math.min(r.a[0], r.b[0]),
            hi = Math.max(r.a[0], r.b[0]);
          return menor(pele.filter((y) => y.p[0] >= lo && y.p[0] <= hi).map((y) => Math.hypot(y.p[1] - r.a[1], y.p[2] - r.a[2]) - r.r));
        });
      });
    const [a, c] = faixa(folgas.flat());
    return { medido: `a pele das pernas fica de ${f1(a)} a ${f1(c)} cm dos quatro rolos (negativo = amassa)`, ok: a >= -1.5 && c <= 0.5 };
  },
};
