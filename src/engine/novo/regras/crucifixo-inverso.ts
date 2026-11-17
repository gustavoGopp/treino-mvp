// Regras medidas do crucifixo inverso com halteres, peito apoiado no banco inclinado (../exercicios/crucifixo-inverso.ts).
// O apoio no encosto (peito, queixo, pernas, halter longe do chão) usa as regras da remada apoiada (./remada-apoiada.ts),
// que tem a mesma cena; a carga longe do corpo e do banco, a das remadas (./remadas.ts). As daqui medem os braços e as
// escápulas. O limite vem do que a ficha da técnica pede, não do que a pose deu.
import { f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import { sinal } from '../esqueleto';
import type { Lado } from '../esqueleto';
import type { Quadro } from '../movimento';
import type { Corpo } from '../tabelas';
import { angulo, mul, norm, sub } from '../vec';
import type { V3 } from '../vec';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** A linha do ombro ao centro da mão (no mundo). */
const linhaDoBraco = (x: Quadro, k: Lado): V3 => sub(x.esq.lado[k].pegada, x.esq.lado[k].ombro);
/** Para onde aponta o polegar (o eixo x da mão aponta para o polegar no lado esquerdo e para o dedo mínimo no direito). */
const polegar = (x: Quadro, k: Lado): V3 => mul(x.esq.lado[k].mao.x, sinal(k));
/** A clavícula em relação ao ritmo normal do ombro (graus): para trás (retração) e para cima (elevação). */
function emRelacaoAoRitmo(x: Quadro, k: Lado, corpo: Corpo) {
  const L = x.esq.lado[k];
  const ritmo = Math.max(0, Math.min(1, (L.ang.elevacaoDoBraco - 20) / 130));
  return {
    retr: L.ang.claviculaRetr - (corpo.m('clavicula.retracaoRepouso') + corpo.m('clavicula.retracaoNaElevacao') * ritmo),
    elev: L.ang.claviculaElev - (corpo.m('clavicula.elevacaoRepouso') + corpo.m('clavicula.elevacaoNaElevacao') * ritmo),
  };
}

export const REGRAS_CRUCIFIXO_INVERSO: Record<string, Regra> = {
  'crucifixo-inverso-bracos-pendurados-no-comeco': (q) => {
    const a = Math.max(...(['R', 'L'] as Lado[]).map((k) => angulo(linhaDoBraco(primeiro(q), k), [0, -1, 0])));
    return { medido: `no começo, a linha do ombro à mão fica ${f1(a)}° da vertical`, ok: a <= 15 };
  },
  'crucifixo-inverso-cotovelos-fixos': (q) => {
    const [a, b] = faixa(q.flatMap((x) => [x.esq.lado.R.ang.cotovelo, x.esq.lado.L.ang.cotovelo]));
    return { medido: `o cotovelo fica dobrado de ${f1(a)}° a ${f1(b)}° o ciclo todo`, ok: a >= 5 && b <= 30 && b - a <= 3 };
  },
  'crucifixo-inverso-abre-para-os-lados': (q) => {
    // a mão em relação ao ombro: quanto sobe para o lado e quanto anda para a frente ou para trás
    const rel = q.map((x) => sub(x.esq.lado.R.pegada, x.esq.lado.R.ombro));
    const [z0, z1] = faixa(rel.map((p) => p[2]));
    const lado = Math.abs(ultimo(rel)[0]) - Math.abs(primeiro(rel)[0]);
    const sobe = ultimo(rel)[1] - primeiro(rel)[1];
    return { medido: `a mão vai ${f1(lado)} cm para o lado e sobe ${f1(sobe)} cm, e anda ${f1(z1 - z0)} cm para a frente ou para trás`, ok: lado >= 30 && sobe >= 30 && z1 - z0 <= 10 };
  },
  'crucifixo-inverso-ate-a-linha-dos-ombros': (q) => {
    const x = ultimo(q);
    const d = norm(linhaDoBraco(x, 'R'));
    const horiz = Math.asin(d[1]) / (Math.PI / 180);
    // a linha dos ombros: de um ombro ao outro
    const ombros = sub(x.esq.lado.R.ombro, x.esq.lado.L.ombro);
    const daLinha = angulo([d[0], 0, d[2]], [ombros[0], 0, ombros[2]]);
    return { medido: `no fim, a linha do ombro à mão fica ${f1(Math.abs(horiz))}° ${horiz < 0 ? 'abaixo' : 'acima'} da horizontal e, vista de cima, ${f1(daLinha)}° fora da linha dos ombros`, ok: Math.abs(horiz) <= 15 && daLinha <= 15 };
  },
  'crucifixo-inverso-escapulas-sem-encolher-nem-juntar': (q, corpo) => {
    // sem encolher: a clavícula não sobe além do ritmo; sem juntar com força: no fim, ela vai para trás do ritmo menos da
    // metade do que na remada apoiada, que junta as escápulas (10°)
    const elev = Math.max(...q.flatMap((x) => (['R', 'L'] as Lado[]).map((k) => emRelacaoAoRitmo(x, k, corpo).elev)));
    const r1 = emRelacaoAoRitmo(ultimo(q), 'R', corpo).retr;
    return { medido: `no fim, a clavícula fica ${f1(r1)}° atrás do ritmo (positivo = para trás; a remada, que junta as escápulas, chega a 10°); ela sobe no máximo ${f1(elev)}° além do ritmo`, ok: elev <= 0.5 && r1 <= 5 };
  },
  'crucifixo-inverso-palmas-uma-para-a-outra': (q) => {
    // o polegar aponta para a frente: embaixo, com os braços pendurados, as palmas ficam uma para a outra
    const a = Math.max(...q.flatMap((x) => (['R', 'L'] as Lado[]).map((k) => angulo(polegar(x, k), [0, 0, 1]))));
    return { medido: `o polegar fica no máximo ${f1(a)}° fora da direção para a frente (o cabo do halter de frente para trás, a mão sem girar)`, ok: a <= 20 };
  },
};
