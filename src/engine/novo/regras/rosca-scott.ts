// Regras medidas da rosca Scott com o braço apoiado no encosto do banco inclinado
// (../exercicios/rosca-scott-banco-inclinado.ts). As outras (braço quase estendido embaixo, palma para cima, carga fora
// do corpo e do banco, tronco parado) já existem (./roscas.ts e ../conferir.ts). As daqui medem o contato do braço com o
// encosto, a axila no topo e as pontas do movimento. O limite vem do que a ficha pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { COMP_DO_ENCOSTO, aoLongoDoEncosto, naCaixaDoEncosto, pelaFaceDoEncosto, peleDoBracoDireito } from '../exercicios/rosca-scott-banco-inclinado';
import type { Quadro } from '../movimento';
import { dist, norm, sub } from '../vec';

/** O ponto do tríceps que mais entra pela face do encosto (cm; positivo = amassa; negativo = descolado). */
const fundoDoBraco = (x: Quadro) => Math.max(...peleDoBracoDireito(x.esq).map(pelaFaceDoEncosto));

export const REGRAS_ROSCA_SCOTT: Record<string, Regra> = {
  'rosca-scott-braco-no-encosto': (q) => {
    // a cada 3 quadros: o tríceps encosta (não descola mais de meio centímetro) e não atravessa o estofado (amassa até
    // 2,5 cm, a tolerância da conferência para o corpo no estofado); o cotovelo não sai do lugar
    const [a, b] = faixa(q.filter((_, i) => i % 3 === 0 || i === q.length - 1).map(fundoDoBraco));
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.R.cotovelo, q[0]!.esq.lado.R.cotovelo)));
    const [c0, c1] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `o ponto mais fundo do tríceps no estofado fica de ${f1(a)} a ${f1(b)} cm (positivo = amassa); o cotovelo anda ${f1(anda)} cm enquanto dobra de ${f1(c0)}° a ${f1(c1)}°`, ok: a >= -0.5 && b <= 2.5 && anda <= 1 && c1 - c0 >= 90 };
  },
  'rosca-scott-axila-no-topo': (q) => {
    // o braço deita no encosto desde o alto: a pele do braço encosta na face nos últimos 6 cm antes da ponta; o centro do
    // ombro fica logo além da ponta (até 12 cm); o peito encosta no alto do encosto sem atravessá-lo
    const x = q[0]!;
    const comp = COMP_DO_ENCOSTO,
      ao = aoLongoDoEncosto;
    const perto = peleDoBracoDireito(x.esq).filter((p) => ao(p) > comp - 6 && ao(p) <= comp);
    const noAlto = perto.length ? Math.max(...perto.map(pelaFaceDoEncosto)) : -Infinity;
    const ombro = ao(x.esq.lado.R.ombro) - comp;
    let peito = -1e9;
    for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'tronco' || parte === 'cintura') peito = Math.max(peito, naCaixaDoEncosto(p));
    return {
      medido: `nos 6 cm de cima do encosto, a pele do braço fica a ${f1(noAlto)} cm da face (positivo = amassa); o centro do ombro fica ${f1(ombro)} cm além da ponta; o peito ${peito >= 0 ? `amassa ${f1(peito)} cm` : `fica a ${f1(-peito)} cm`} do alto do encosto`,
      ok: noAlto >= -1 && ombro >= 0 && ombro <= 12 && peito >= -1 && peito <= 2.5,
    };
  },
  'rosca-scott-sem-travar-embaixo': (q) => {
    const c = Math.min(...q.map((x) => x.esq.lado.R.ang.cotovelo));
    return { medido: `o cotovelo dobra no mínimo ${f1(c)}° (0° = travado)`, ok: c >= 5 };
  },
  'rosca-scott-halter-perto-do-ombro': (q) => {
    const L = q[q.length - 1]!.esq.lado.R;
    const d = dist(L.pegada, L.ombro);
    // o antebraço ainda não passou da vertical (senão o peso sai do bíceps)
    const ante = norm(sub(L.pegada, L.cotovelo));
    const daVertical = Math.acos(Math.max(-1, Math.min(1, ante[1]))) / (Math.PI / 180);
    return { medido: `em cima, o centro da pegada fica a ${f1(d)} cm do centro do ombro, com o antebraço ${f1(daVertical)}° da vertical`, ok: d <= 30 && daVertical >= 5 };
  },
};
