// Regras medidas da hiperextensão no banco romano a 45° (../exercicios/hiperextensao.ts). A coluna neutra e as mãos no
// peito já existem (../conferir.ts, `lombar-neutra`, e ./abdominais.ts, `abdominal-maos-no-peito`). As daqui medem a
// regulagem do banco (a almofada abaixo do osso do quadril, os pés presos) e as pontas do movimento (a linha reta em
// cima, o quadril dobrado embaixo). O limite vem do que a ficha pede, não do que a pose deu.
import { pontosDoBoneco } from '../boneco';
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { bancoDaHiperextensao, coxasNasAlmofadas, solaNaChapa } from '../exercicios/hiperextensao';
import { eixosDoBancoRomano, foraDoRolo } from '../pecas-de-cena/banco-romano';
import { obj } from '../tabelas';
import type { Corpo } from '../tabelas';
import { anguloEm, dot, sub } from '../vec';
import type { V3 } from '../vec';

/** O ângulo (graus) do tronco (da bacia à base do pescoço) com a linha das pernas (do tornozelo ao quadril), de lado: positivo = o tronco dobrou para a frente (o quadril dobra); negativo = passou da linha. */
function troncoNaLinha(e: Esq): number {
  const lado = (v: V3): V3 => [0, v[1], v[2]];
  const pernas = lado(sub(e.lado.R.quadril, e.lado.R.tornozelo));
  const tronco = lado(sub(e.torax.o, e.pelve.o));
  // girando em volta de +x, a linha das pernas vai para o tronco: o tronco abaixo da linha (para a frente do corpo) dá positivo
  return anguloEm(pernas, tronco, [1, 0, 0]);
}
/** A crista do osso do quadril ao longo da viga, a partir do centro do quadril (cm): a da tabela do corpo. */
const cristaAcimaDoQuadril = (corpo: Corpo) => corpo.m('altura.cristaIliaca') - corpo.m('altura.trocanter');

export const REGRAS_BANCO_ROMANO: Record<string, Regra> = {
  'hiperextensao-almofada-abaixo-do-quadril': (q, corpo) => {
    // o alto das almofadas no alto da coxa: não mais de 8 cm abaixo do centro do quadril e abaixo da crista do osso do
    // quadril (com 6 cm de folga, para o quadril dobrar livre); as coxas apoiadas nelas em todos os quadros (amassa até 2,5 cm)
    const b = bancoDaHiperextensao(corpo);
    const { u } = eixosDoBancoRomano();
    const quadril = dot(sub(q[0]!.esq.pelve.o, b.placa), u);
    const alto = b.almofada - quadril;
    const crista = cristaAcimaDoQuadril(corpo);
    const [a, c] = faixa(q.map((x) => coxasNasAlmofadas(x.esq, b)));
    const g = (id: string) => obj('bancoRomano', id);
    return {
      medido: `o alto das almofadas fica ${f1(alto)} cm acima do centro do quadril (a crista do osso do quadril, ${f1(crista)} cm); a regulagem é de ${f1(b.almofada)} cm da chapa (a faixa da Body-Solid vai de ${g('almofadaMin')} a ${g('almofadaMax')}); as coxas entram de ${f1(a)} a ${f1(c)} cm nas almofadas (positivo = amassa)`,
      // a faixa do banco da tabela (Body-Solid) não entra no ok: com o corpo da tabela, a almofada no mínimo dela deixa a
      // barriga entrar 3,6 cm na almofada embaixo (ver a conferência escrita); o número aparece no medido
      ok: alto >= -8 && alto <= crista - 6 && a >= -0.5 && c <= 2.5,
    };
  },
  'hiperextensao-pes-presos': (q, corpo) => {
    const b = bancoDaHiperextensao(corpo);
    const [s0, s1] = faixa(q.map((x) => solaNaChapa(x.esq)));
    let rolo = 1e9;
    for (const { p, parte } of pontosDoBoneco(q[0]!.esq)) if (parte === 'canela' || parte === 'pe') rolo = Math.min(rolo, foraDoRolo(b, p));
    return { medido: `a sola fica de ${f1(s0)} a ${f1(s1)} cm da chapa (negativo = entra); a pele atrás do tornozelo fica a ${f1(rolo)} cm dos rolos (negativo = amassa)`, ok: s0 >= -0.5 && s1 <= 0.5 && rolo >= -1.5 && rolo <= 0.5 };
  },
  'hiperextensao-sobe-ate-a-linha': (q) => {
    const a = troncoNaLinha(q[0]!.esq);
    return { medido: `em cima, o tronco fica ${f1(a)}° da linha das pernas (positivo = ainda dobrado; negativo = passou da linha)`, ok: a >= -3 && a <= 8 };
  },
  'hiperextensao-desce-dobrando-o-quadril': (q) => {
    const fim = q[q.length - 1]!.esq;
    const a = troncoNaLinha(fim);
    const anda = Math.max(...q.map((x) => Math.hypot(...sub(x.esq.lado.R.tornozelo, q[0]!.esq.lado.R.tornozelo))));
    const lombar = Math.max(...q.map((x) => Math.abs(x.esq.pose.lombar ?? 0)));
    return { medido: `embaixo, o tronco dobra ${f1(a)}° da linha das pernas, com a lombar a ${f1(lombar)}° da curva de repouso; o tornozelo anda ${f1(anda)} cm`, ok: a >= 60 && lombar <= 5 && anda <= 0.3 };
  },
};
