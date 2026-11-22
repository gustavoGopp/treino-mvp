// Peça de cena: a estação de barra fixa (torre de barra), para a barra fixa pronada e supinada e a elevação de joelhos
// pendurado. Partes, como no cartão de hoje (scripts/desenhos-equipamento/realista/itens.mjs, `barra_fixa`: a barra
// reta cromada com os trechos emborrachados debaixo das mãos), montada numa torre de chão, porque o texto do app fala
// em "barra no topo da estação": dois montantes de tubo retangular, a base no chão e dois braços curtos que levam a
// barra para a frente dos montantes. Medidas em ../dados/objetos/barra-fixa.json.
//
// A barra corre ao longo de x, com o centro em (0, altura, zBarra). Duas peças: a barra (o equipamento do exercício,
// que entra no enquadramento) e a estrutura (`cenario`: pintada atrás do corpo e cortada pelo quadro; ela é alta e
// encolheria o corpo no quadro).
import type { Prim } from '../desenho';
import type { PecaPropria } from '../pecas';
import { obj } from '../tabelas';
import { REF0 } from '../vec';
import type { V3 } from '../vec';

const g = (id: string) => obj('barraFixa', id);
/** Altura do centro da barra e raio dela (cm). */
export const alturaDaBarra = () => g('altura');
export const raioDaBarra = () => g('diam') / 2;

const caixa = (o: V3, meias: V3, cls: string, vies: number): Prim => ({ t: 'caixa', ref: { ...REF0, o }, meias, cls, vies });

/**
 * A estação com a barra em z = zBarra. `maos`: o x do centro de cada mão, para o trecho emborrachado ficar debaixo
 * dela e ser pintado um pouco atrás (a mão fecha por cima). `altura`: o centro da barra numa regulagem mais baixa da
 * torre (por omissão, a mais alta, a da tabela).
 */
export function estacaoDeBarra(zBarra: number, maos: number[], altura = g('altura')): { prims: Prim[]; barra: PecaPropria; estrutura: PecaPropria } {
  const H = altura,
    r = g('diam') / 2,
    L = g('larg'),
    tl = g('tuboLarg'),
    tp = g('tuboProf'),
    zM = zBarra - g('balanco'),
    xM = L / 2 - tl / 2,
    prof = g('prof');
  const prims: Prim[] = [
    // a barra (uma caixa do tamanho do cilindro: a conferência mede se o corpo a atravessa)
    caixa([0, H, zBarra], [xM - tl / 2, r, r], 'barra', -1),
    ...[-1, 1].map((s) => caixa([s * xM, H / 2, zM], [tl / 2, H / 2, tp / 2], 'esc', -40)),
  ];
  const barra: PecaPropria = {
    t: 'propria',
    nome: 'barra fixa',
    // a regulagem só entra na chave do desenho quando não é a da tabela (o desenho das aprovadas não muda)
    fixa: altura === g('altura') ? [zBarra, maos] : [zBarra, maos, altura],
    desenhar(C, M) {
      // a barra, de um braço da estrutura ao outro, em trechos: os emborrachados debaixo das mãos vão um pouco para
      // trás na pintura (a mão fecha por cima deles)
      const x0 = -xM,
        x1 = xM,
        meia = g('pegaComp') / 2;
      const cortes = [...maos].sort((a, b) => a - b).flatMap((x) => [x - meia, x + meia]);
      const pts = [x0, ...cortes, x1];
      for (let i = 0; i < pts.length - 1; i++) {
        const pega = i % 2 === 1;
        const a: V3 = [pts[i]!, H, zBarra],
          b: V3 = [pts[i + 1]!, H, zBarra];
        if (pega) C.cilindro(a, b, r + 0.15, M.borracha, { lados: 14, dz: 6 });
        else C.cilindro(a, b, r, M.cromo, { lados: 14 });
      }
      // as pontas da barra entram nos braços da estrutura (uma luva curta)
      for (const s of [-1, 1]) C.cilindro([s * (xM - tl / 2 - 2.5), H, zBarra], [s * (xM - tl / 2), H, zBarra], r + 1, M.metal, { lados: 14 });
    },
  };
  const estrutura: PecaPropria = {
    t: 'propria',
    nome: 'estrutura da barra fixa',
    cenario: true,
    fixa: altura === g('altura') ? [zBarra] : [zBarra, altura],
    desenhar(C, M, o) {
      // de perfil (olhando ao longo da barra), o braço da estrutura cai bem onde a cabeça passa no topo e o montante
      // corta o corpo ao meio: como a coluna de polia que é cenário, a estrutura não aparece de perfil
      const a0 = C.P([0, 0, 0]),
        a1 = C.P([10, 0, 0]);
      if (Math.hypot(a1[0] - a0[0], a1[1] - a0[1]) < 1.5) return;
      const tubo = (a: V3, b: V3, w: number, h: number) => C.tubo(a, b, w, h, M.metal, { up: [0, 0, 1] });
      for (const s of [-1, 1]) {
        const x = s * xM;
        // o montante, o braço que leva a barra para a frente e o pé no chão (ao longo de z)
        tubo([x, 4, zM], [x, H + 6, zM], tl, tp);
        C.tubo([x, H + 3, zM - tp / 2], [x, H + 3, zBarra + 2], tl, 6, M.metal, { up: [0, 1, 0] });
        C.tubo([x, 2, zM - prof / 2], [x, 2, zM + prof / 2], tl + 1, 4, M.metal, { up: [0, 1, 0] });
        for (const dz of [-1, 1]) C.cilindro([x, 0, zM + (dz * prof) / 2 - dz * 3], [x, 1.5, zM + (dz * prof) / 2 - dz * 3], 3.2, M.borracha, { lados: 10 });
      }
      // a travessa de cima, entre os montantes
      C.tubo([-xM, H + 3, zM], [xM, H + 3, zM], tp, 6, M.metal, { up: [0, 1, 0] });
      if (o.comSombra) C.sombra(0, zM, L / 2, prof / 2, 0.16);
    },
  };
  return { prims, barra, estrutura };
}
