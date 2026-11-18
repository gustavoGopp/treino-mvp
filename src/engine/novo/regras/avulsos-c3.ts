// Regras medidas dos exercícios avulsos do lote C3: o abdominal na máquina, o coice e a abdução na polia com a
// tornozeleira e a remada invertida no smith.
// Cada uma recebe os quadros do começo até o fim da primeira fase com movimento. O limite vem do que a ficha da técnica
// pede, não do que a pose deu. O que já existe e serve é usado como está: na remada invertida, as mãos fechadas na
// barra, a pegada pronada, o corpo reto, os calcanhares no chão, os cotovelos para trás e as escápulas que se juntam
// (./pendurado.ts, ../conferir.ts, ./suspensao.ts, ./remadas.ts); nas polias, o tronco reto, a perna que sobe pouco, o
// peso no pé de apoio (./abducao-em-pe.ts), os dedos para a frente, as pernas que não se atravessam
// (./quadril-abrir-e-fechar.ts), o cabo livre do corpo e a pilha (./polia-bracos.ts); no abdominal, a coluna que enrola
// (./polia-puxar.ts).
// Marcas que o quadro da remada invertida dá: `barra` (o centro da barra), `guia` (o ponto da linha da guia na altura
// dela), `pino` (y = a altura do pino em que o gancho prende) e `linhaDoPeito` (x = quantos cm abaixo da sétima
// cervical, ao longo do tronco, a ficha pede a barra no peito).
import { pontosDoBoneco } from '../boneco';
import { angulosDoLado, f1, faixa } from '../conferir-util';
import type { Regra } from '../conferir-util';
import type { Esq } from '../esqueleto';
import { anguloDoCorpo } from '../exercicios/na-fita';
import type { Quadro } from '../movimento';
import { obj } from '../tabelas';
import { angulo, cross, dist, dot, norm, paraRef, sub } from '../vec';
import type { V3 } from '../vec';
import { folgaDaBarraNaPele } from './smith';

const primeiro = <T>(q: T[]) => q[0]!;
const ultimo = <T>(q: T[]) => q[q.length - 1]!;
/** Quanto a barra fica abaixo da sétima cervical, ao longo do tronco (cm). */
const abaixoDoC7 = (e: Esq, barra: V3) => -dot(sub(barra, e.torax.o), e.torax.y);

/** O quanto a pele do tronco entra na face de uma almofada do peito (cm; negativo = longe), só sobre a almofada. */
function peitoNaAlmofada(q: Quadro, k: 'R' | 'L'): number {
  const c = q.marcas[`almofada.${k}`]!,
    n = q.marcas[`almofadaNormal.${k}`]!,
    ao = q.marcas[`almofadaAo.${k}`]!;
  const lado = norm(cross(ao, n));
  let max = -1e9;
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (parte !== 'tronco') continue;
    const v = sub(p, c);
    if (Math.abs(dot(v, ao)) > obj('abdominalMaquina', 'almofadaComp') / 2 - 3 || Math.abs(dot(v, lado)) > obj('abdominalMaquina', 'almofadaLarg') / 2) continue;
    if (dot(v, n) < -12) continue;
    max = Math.max(max, dot(v, n));
  }
  return max;
}
/**
 * Se a almofada fica sobre o peito, e não para fora dele: a maior distância (cm) de um ponto da face dela (uma grade de
 * 3 × 3, a 80% das bordas) até a pele do tronco mais perto; e onde fica o centro do contato (a pele a menos de 1,5 cm
 * da face), em fração da meia largura e do meio comprimento (0 = no centro, 1 = na borda).
 */
function coberturaDaAlmofada(q: Quadro, k: 'R' | 'L'): { longe: number; centro: number } {
  const c = q.marcas[`almofada.${k}`]!,
    n = q.marcas[`almofadaNormal.${k}`]!,
    ao = q.marcas[`almofadaAo.${k}`]!;
  const lado = norm(cross(ao, n));
  const C = obj('abdominalMaquina', 'almofadaComp') / 2,
    L = obj('abdominalMaquina', 'almofadaLarg') / 2;
  const pele = pontosDoBoneco(q.esq)
    .filter((x) => x.parte === 'tronco')
    .map((x) => x.p);
  let longe = 0;
  for (const i of [-0.8, 0, 0.8])
    for (const j of [-0.8, 0, 0.8]) {
      const g: V3 = [c[0] + ao[0] * i * C + lado[0] * j * L, c[1] + ao[1] * i * C + lado[1] * j * L, c[2] + ao[2] * i * C + lado[2] * j * L];
      longe = Math.max(longe, Math.min(...pele.map((p) => dist(p, g))));
    }
  let sa = 0,
    sl = 0,
    n1 = 0;
  for (const p of pele) {
    const v = sub(p, c);
    const a = dot(v, ao),
      l = dot(v, lado),
      h = dot(v, n);
    if (Math.abs(a) > C || Math.abs(l) > L || h < -1.5 || h > 1.5) continue;
    sa += a;
    sl += l;
    n1++;
  }
  const centro = n1 ? Math.max(Math.abs(sa / n1) / C, Math.abs(sl / n1) / L) : 9;
  return { longe, centro };
}
/** A pele das costas contra a face do apoio da lombar (cm; positivo = entra), só na frente dele. */
function costasNoApoio(q: Quadro): number {
  const c = q.marcas.lombar!;
  let max = -1e9;
  for (const { p, parte } of pontosDoBoneco(q.esq)) {
    if (!['tronco', 'cintura', 'emendaDaCintura', 'pelve'].includes(parte)) continue;
    if (Math.abs(p[0] - c[0]) > obj('abdominalMaquina', 'lombarLarg') / 2 || Math.abs(p[1] - c[1]) > obj('abdominalMaquina', 'lombarAlt') / 2) continue;
    if (p[2] - c[2] > 15) continue;
    max = Math.max(max, c[2] - p[2]);
  }
  return max;
}

export const REGRAS_AVULSOS_C3: Record<string, Regra> = {
  // ----- o abdominal na máquina (../exercicios/abdominal-maquina.ts): marcas `assento` (y = o topo), `lombar` (o centro
  // da face do apoio, virada para +z), `almofada.R/L`, `almofadaNormal.R/L`, `almofadaAo.R/L` (o centro da face de cada
  // almofada, a direção para fora do peito e a direção ao longo dela), `pegador.R/L`, `eixo`, `alavanca` (x = o ângulo do
  // braço), `pilha` (y = quanto as placas subiram) e `rolos` (o centro dos rolos dos pés) -----
  'abdominal-maquina-sentado': (q) => {
    const x0 = primeiro(q);
    // os dois lados do glúteo e da coxa, cada um sobre o assento (dentro das bordas dele)
    const baixo = [1e9, 1e9];
    for (const { p, parte } of pontosDoBoneco(x0.esq)) if (['pelve', 'coxa', 'cintura'].includes(parte) && p[2] < 0 && p[2] > -obj('abdominalMaquina', 'assentoComp') && Math.abs(p[0]) < obj('abdominalMaquina', 'assentoLarg') / 2) baixo[p[0] < 0 ? 0 : 1] = Math.min(baixo[p[0] < 0 ? 0 : 1]!, p[1]);
    const noAssento = Math.max(...baixo) - x0.marcas.assento![1];
    const apoio0 = costasNoApoio(x0);
    const [, pior] = faixa(q.map(costasNoApoio));
    const pes = Math.max(...(['R', 'L'] as const).map((k) => Math.max(x0.esq.lado[k].bola[1], x0.esq.lado[k].calcanhar[1])));
    return { medido: `os dois lados do glúteo ficam no máximo ${f1(noAssento)} cm do topo do assento (negativo = afunda); no começo, as costas ficam a ${f1(-apoio0)} cm do apoio da lombar e no ciclo entram no máximo ${f1(pior)} cm nele; os pés ficam a ${f1(pes)} cm do chão`, ok: noAssento >= -1.5 && noAssento <= 0 && apoio0 >= -1 && apoio0 <= 0.5 && pior <= 0.5 && pes <= 0.3 };
  },
  'abdominal-maquina-quadril-parado': (q) => {
    const a = primeiro(q).esq;
    const anda = Math.max(...q.map((x) => dist(x.esq.pelve.o, a.pelve.o)));
    const gira = Math.max(...q.map((x) => Math.max(angulo(x.esq.pelve.y, a.pelve.y), angulo(x.esq.pelve.z, a.pelve.z))));
    return { medido: `a bacia anda no máximo ${f1(anda)} cm e gira no máximo ${f1(gira)}°`, ok: anda <= 0.1 && gira <= 0.5 };
  },
  'abdominal-maquina-almofadas-no-peito': (q) => {
    // dos dois lados: a pele do peito junto da face de cada almofada (nem longe, nem dentro) e a almofada sobre o peito,
    // não para fora dele: cada ponto da face (até 80% das bordas) a no máximo 5,5 cm do ponto da pele do tronco mais
    // perto (a pele é amostrada a cada 3 a 4 cm: mesmo onde a almofada encosta, o ponto mais perto fica a 1 a 4 cm; o
    // peito é curvo e o estofado de 6,5 cm amassa), e o centro do contato longe das bordas
    const amostra = q.filter((_, i) => i % 3 === 0 || i === q.length - 1);
    const v = amostra.flatMap((x) => (['R', 'L'] as const).map((k) => peitoNaAlmofada(x, k)));
    const [a, b] = faixa(v);
    const cobre = amostra.flatMap((x) => (['R', 'L'] as const).map((k) => coberturaDaAlmofada(x, k)));
    const longe = Math.max(...cobre.map((c) => c.longe)),
      centro = Math.max(...cobre.map((c) => c.centro));
    return {
      medido: `nas duas almofadas, a pele do peito fica de ${f1(-b)} a ${f1(-a)} cm da face delas (negativo = entra nelas); todo ponto da face (até 80% das bordas) fica a no máximo ${f1(longe)} cm da pele do tronco, e o centro do contato a no máximo ${f1(centro * 100)}% do caminho do centro à borda`,
      ok: a >= -1.5 && b <= 0.8 && longe <= 5.5 && centro <= 0.6,
    };
  },
  'abdominal-maquina-braco-gira-no-eixo': (q) => {
    const [a, b] = faixa(q.map((x) => x.marcas.alavanca![0]));
    const [p0, p1] = faixa(q.map((x) => x.marcas.pilha![1]));
    const esperado = ((b - Math.max(0, a)) * Math.PI) / 180 * (obj('abdominalMaquina', 'cameDiam') / 2);
    const e = primeiro(q).esq;
    const eixo = primeiro(q).marcas.eixo!;
    const atras = e.pelve.o[2] - eixo[2];
    return {
      medido: `o braço da máquina gira de ${f1(a)}° a ${f1(b)}° e a pilha sobe ${f1(p1 - p0)} cm (o arco do came: ${f1(esperado)} cm); o eixo fica ${f1(eixo[1] - e.pelve.o[1])} cm acima do centro do quadril e ${f1(Math.abs(atras))} cm ${atras >= 0 ? 'atrás' : 'à frente'} dele`,
      ok: Math.abs(a) <= 1 && b >= 25 && Math.abs(p1 - p0 - esperado) <= 0.3,
    };
  },
  'abdominal-maquina-maos-nos-pegadores': (q) => {
    const d = q.flatMap((x) => (['R', 'L'] as const).map((k) => dist(x.esq.lado[k].pegada, x.marcas[`pegador.${k}`]!)));
    const fecha = q.every((x) => x.esq.lado.R.formaMao === 'pegada' && x.esq.lado.L.formaMao === 'pegada');
    const [c0, c1] = faixa(q.map((x) => x.esq.lado.R.ang.cotovelo));
    // os braços só seguram: a mão anda junto com o tórax (no referencial dele, ela quase não se mexe)
    const a = primeiro(q).esq;
    const p0 = paraRef(a.torax, a.lado.R.pegada);
    const anda = Math.max(...q.map((x) => dist(paraRef(x.esq.torax, x.esq.lado.R.pegada), p0)));
    const [, pior] = faixa(d);
    return { medido: `o centro da pegada fica a no máximo ${f1(pior)} cm do pegador, ${fecha ? 'com a mão fechada nele' : 'SEM a mão fechada'}; em relação ao tórax, a mão anda ${f1(anda)} cm e o cotovelo vai de ${f1(c0)}° a ${f1(c1)}°`, ok: pior <= 0.5 && fecha && anda <= 8 && c1 - c0 <= 15 };
  },
  'abdominal-maquina-pes-presos': (q) => {
    // os dois pés: o peito de cada um sob o rolo do seu lado (dentro do comprimento dele), encostado
    const x = primeiro(q);
    const r = obj('abdominalMaquina', 'roloDiam') / 2,
      c = obj('abdominalMaquina', 'roloComp');
    const lados = (['R', 'L'] as const).map((k) => {
      const s = k === 'R' ? -1 : 1;
      let topo = -1e9;
      for (const { p, parte } of pontosDoBoneco(x.esq)) if (parte === 'pe' && Math.abs(p[2] - x.marcas.rolos![2]) < 1.5 && s * p[0] > 0) topo = Math.max(topo, p[1]);
      const xp = s * x.esq.lado[k].tornozelo[0];
      return { k, folga: x.marcas.rolos![1] - r - topo, dentro: xp >= 1.5 && xp <= 1.5 + c };
    });
    return { medido: lados.map((l) => `pé ${l.k === 'R' ? 'direito' : 'esquerdo'}: o rolo a ${f1(l.folga)} cm do peito do pé, ${l.dentro ? 'dentro do comprimento do rolo' : 'FORA do rolo'}`).join('; '), ok: lados.every((l) => l.folga >= -0.3 && l.folga <= 1 && l.dentro) };
  },
  // ----- na polia baixa com a tornozeleira (o coice e a abdução: ../exercicios/polia-no-tornozelo.ts) -----
  // Marcas: `tornozeleira` (o centro da faixa), `tornozeleiraRaio` (x = o raio por fora da faixa, y = o da pele),
  // `cabo.roldana` (o centro da roldana), `trilho` (o centro da pegada pedida no trilho da torre, que fica em pé).
  'polia-tornozelo-tornozeleira-no-tornozelo': (q) => {
    const alturas = q.map((x) => {
      const R = x.esq.lado.R;
      return dot(sub(x.marcas.tornozeleira!, R.tornozelo), norm(sub(R.joelho, R.tornozelo)));
    });
    const folgas = q.map((x) => x.marcas.tornozeleiraRaio![0] - x.marcas.tornozeleiraRaio![1]);
    const [a, b] = faixa(alturas),
      [c, d] = faixa(folgas);
    const meia = obj('tornozeleira', 'larg') / 2;
    return { medido: `o meio da faixa fica ${f1(a)}–${f1(b)} cm acima do centro do tornozelo (a borda de baixo, ${f1(a - meia)} cm); por fora, ela fica ${f1(c)}–${f1(d)} cm além da pele (o neoprene tem ${f1(obj('tornozeleira', 'esp'))} cm)`, ok: a - meia >= 0.5 && b - meia <= 5 && Math.abs(c - obj('tornozeleira', 'esp')) <= 0.05 && Math.abs(d - obj('tornozeleira', 'esp')) <= 0.05 };
  },
  'polia-tornozelo-polia-embaixo': (q) => {
    const y = primeiro(q).marcas['cabo.roldana']![1];
    const yMin = obj('torre', 'poliaMin');
    return { medido: `o carrinho fica a ${f1(yMin)} cm (o ponto mais baixo da coluna), o centro da roldana a ${f1(y)} cm do chão`, ok: Math.abs(y - yMin - obj('torre', 'roldanaDiam') / 2) <= 0.1 || Math.abs(y - yMin) <= 0.1 };
  },
  'polia-tornozelo-mao-na-torre': (q) => {
    // o centro da pegada esquerda no eixo do trilho (em pé), parado
    const d = q.map((x) => Math.hypot(x.esq.lado.L.pegada[0] - x.marcas.trilho![0], x.esq.lado.L.pegada[2] - x.marcas.trilho![2]));
    const anda = Math.max(...q.map((x) => dist(x.esq.lado.L.pegada, primeiro(q).esq.lado.L.pegada)));
    const fecha = q.every((x) => x.esq.lado.L.formaMao === 'pegada');
    const [, pior] = faixa(d);
    return { medido: `o centro da pegada fica a no máximo ${f1(pior)} cm do eixo do trilho da torre e anda ${f1(anda)} cm, ${fecha ? 'com a mão fechada nele' : 'SEM a mão fechada'}`, ok: pior <= 0.5 && anda <= 0.1 && fecha };
  },
  // ----- o coice na polia (../exercicios/coice-polia.ts): marcas `montante.R` e `montante.L` (o centro de cada pegada
  // pedida nos montantes da torre, que ficam em pé) -----
  'coice-polia-coxa-passa-a-linha-do-corpo': (q) => {
    // de lado: a coxa no começo, à frente da vertical; no fim, atrás da linha do corpo (a que desce dos ombros ao quadril
    // e continua), um pouco (até 12°)
    const deLado = (v: V3): V3 => [0, v[1], v[2]];
    const frente = (e: Esq) => (Math.atan2(e.lado.R.joelho[2] - e.lado.R.quadril[2], e.lado.R.quadril[1] - e.lado.R.joelho[1]) * 180) / Math.PI;
    const a = primeiro(q).esq,
      b = ultimo(q).esq;
    const linha = deLado(sub(b.pelve.o, b.torax.o));
    const coxa = deLado(sub(b.lado.R.joelho, b.lado.R.quadril));
    // atrás (+) ou à frente (−) da linha do corpo
    const passa = (Math.atan2(linha[1] * coxa[2] - linha[2] * coxa[1], linha[1] * coxa[1] + linha[2] * coxa[2]) * 180) / Math.PI;
    return { medido: `de lado, a coxa vai de ${f1(frente(a))}° à frente da vertical a ${f1(-frente(b))}° atrás dela, ${f1(Math.abs(passa))}° ${passa >= 0 ? 'além' : 'antes'} da linha do corpo (que desce dos ombros ao quadril)`, ok: frente(a) >= 10 && passa >= 0 && passa <= 12 };
  },
  'coice-polia-joelho-quase-estendido': (q) => {
    // nas pontas do caminho, quase estendido; no meio, quando o pé passa embaixo do quadril, ele pode dobrar um pouco
    // para o pé não raspar o chão (como no passo), sem virar uma flexora
    const [a, b] = faixa(q.map((x) => x.esq.lado.R.ang.joelho));
    const pontas = Math.max(primeiro(q).esq.lado.R.ang.joelho, ultimo(q).esq.lado.R.ang.joelho);
    return { medido: `o joelho da perna que trabalha dobra ${f1(pontas)}° no máximo nas pontas do caminho e de ${f1(a)}° a ${f1(b)}° no caminho todo`, ok: pontas <= 15 && b <= 35 };
  },
  'coice-polia-tronco-parado-a-frente': (q) => {
    const peito = (e: Esq) => (Math.atan2(e.torax.y[2], e.torax.y[1]) * 180) / Math.PI;
    const [a, b] = faixa(q.map((x) => peito(x.esq)));
    const lombar = Math.min(...q.map((x) => x.esq.pose.lombar ?? 0));
    return { medido: `o peito fica de ${f1(a)}° a ${f1(b)}° à frente da vertical; a lombar dobra no mínimo ${f1(lombar)}° além da curva de repouso (negativo = arqueia)`, ok: a >= 5 && b <= 25 && b - a <= 1.5 && lombar >= -1 };
  },
  'coice-polia-bacia-nao-gira': (q) => {
    const graus = (x: number) => (Math.asin(Math.max(-1, Math.min(1, x))) * 180) / Math.PI;
    const rola = Math.max(...q.map((x) => Math.abs(graus(x.esq.pelve.x[1]))));
    const gira = Math.max(...q.map((x) => Math.abs(graus(x.esq.pelve.z[0]))));
    const abre = Math.max(...q.map((x) => Math.abs(angulosDoLado(x.esq, 'R').abducaoDoQuadril)));
    return { medido: `a linha dos quadris fica a no máximo ${f1(rola)}° da horizontal e a bacia gira ${f1(gira)}°; a coxa abre no máximo ${f1(abre)}° para o lado`, ok: rola <= 2 && gira <= 2 && abre <= 6 };
  },
  'coice-polia-maos-na-torre': (q) => {
    const d = q.flatMap((x) => (['R', 'L'] as const).map((k) => Math.hypot(x.esq.lado[k].pegada[0] - x.marcas[`montante.${k}`]![0], x.esq.lado[k].pegada[2] - x.marcas[`montante.${k}`]![2])));
    const anda = Math.max(...q.flatMap((x) => (['R', 'L'] as const).map((k) => dist(x.esq.lado[k].pegada, primeiro(q).esq.lado[k].pegada))));
    const fecha = q.every((x) => x.esq.lado.R.formaMao === 'pegada' && x.esq.lado.L.formaMao === 'pegada');
    const [, pior] = faixa(d);
    return { medido: `o centro de cada pegada fica a no máximo ${f1(pior)} cm do eixo do montante e anda ${f1(anda)} cm, ${fecha ? 'com as mãos fechadas neles' : 'SEM as mãos fechadas'}`, ok: pior <= 0.5 && anda <= 0.1 && fecha };
  },
  'polia-tornozelo-cruza-a-frente': (q) => {
    // no começo, o tornozelo de fora passa para o outro lado do tornozelo de apoio (em x) e fica à frente dele (em z)
    const e = primeiro(q).esq;
    const cruza = e.lado.R.tornozelo[0] - e.lado.L.tornozelo[0];
    const frente = e.lado.R.tornozelo[2] - e.lado.L.tornozelo[2];
    const meio = e.lado.R.tornozelo[0] - e.pelve.o[0];
    return { medido: `no começo, o tornozelo de fora fica ${f1(Math.abs(meio))} cm ${meio >= 0 ? 'além do meio do corpo, para o lado do de apoio' : 'antes do meio do corpo'} (${f1(cruza)} cm do tornozelo de apoio, em x) e ${f1(frente)} cm à frente dele`, ok: meio >= 0 && frente >= 8 };
  },
  'remada-invertida-barra-travada': (q, corpo) => {
    const a = primeiro(q).marcas.barra!;
    const anda = Math.max(...q.map((x) => dist(x.marcas.barra!, a)));
    const naGuia = Math.max(...q.map((x) => dist(x.marcas.barra!, x.marcas.guia!)));
    const sobre = a[1] - primeiro(q).marcas.pino![1];
    const cintura = a[1] - corpo.m('altura.cintura');
    // o pino é um da régua (30 cm, depois de 16 em 16)
    const k = (primeiro(q).marcas.pino![1] - obj('smith', 'pinoMin')) / obj('smith', 'ganchosEntre');
    return {
      medido: `a barra anda ${f1(anda)} cm no ciclo e fica a ${f1(naGuia)} cm da linha da guia; o centro dela fica ${f1(sobre)} cm acima do pino (o ${f1(k + 1)}º da régua), ${f1(Math.abs(cintura))} cm ${cintura >= 0 ? 'acima' : 'abaixo'} da cintura`,
      ok: anda <= 0.05 && naGuia <= 0.1 && Math.abs(k - Math.round(k)) < 0.01 && sobre > 0 && sobre <= 4 && Math.abs(cintura) <= 10,
    };
  },
  'remada-invertida-maos-e-calcanhares-dos-dois-lados': (q, corpo) => {
    // cada mão inteira na barra, entre os carros (dentro das bordas da parte lisa), e cada calcanhar no chão
    const meia = (obj('smith', 'guiasEntre') - obj('smith', 'carroLarg')) / 2;
    const folgaDoCarro = Math.min(...(['R', 'L'] as const).map((k) => meia - Math.abs(primeiro(q).esq.lado[k].pegada[0]) - corpo.m('mao.largura') / 2));
    const calc = (['R', 'L'] as const).map((k) => {
      let m = 1e9;
      for (const { p, parte } of pontosDoBoneco(primeiro(q).esq)) if (parte === 'pe' && Math.sign(p[0]) === (k === 'R' ? -1 : 1)) m = Math.min(m, p[1]);
      return m;
    });
    return { medido: `as duas mãos ficam inteiras na barra, a no mínimo ${f1(folgaDoCarro)} cm do carro; o calcanhar direito fica a ${f1(calc[0]!)} cm do chão e o esquerdo a ${f1(calc[1]!)} cm`, ok: folgaDoCarro >= 2 && calc.every((c) => Math.abs(c) <= 1) };
  },
  'remada-invertida-bracos-estendidos-embaixo': (q) => {
    const c = Math.max(primeiro(q).esq.lado.R.ang.cotovelo, primeiro(q).esq.lado.L.ang.cotovelo);
    return { medido: `embaixo, o cotovelo dobra ${f1(c)}°`, ok: c >= 2 && c <= 15 };
  },
  'remada-invertida-peito-na-barra': (q) => {
    const x = ultimo(q);
    const folga = folgaDaBarraNaPele(x.esq, x.marcas.barra!);
    const onde = abaixoDoC7(x.esq, x.marcas.barra!);
    const pede = x.marcas.linhaDoPeito![0];
    return { medido: `em cima, a pele do peito fica a ${f1(folga)} cm da barra, que encosta ${f1(onde)} cm abaixo da sétima cervical, ao longo do tronco (pedido: ${f1(pede)} cm)`, ok: folga >= 0 && folga <= 1.5 && Math.abs(onde - pede) <= 3 };
  },
  'remada-invertida-corpo-sobe-inteiro': (q) => {
    // o corpo gira no tornozelo: o ângulo do corpo diminui (sobe), e o peito chega à barra sem a barra afundar no corpo
    const a = anguloDoCorpo(primeiro(q).esq),
      b = anguloDoCorpo(ultimo(q).esq);
    const [pior] = faixa(q.filter((_, i) => i % 4 === 0).map((x) => folgaDaBarraNaPele(x.esq, x.marcas.barra!)));
    return { medido: `o corpo vai de ${f1(a)}° a ${f1(b)}° da vertical (do tornozelo ao ombro); a barra fica no mínimo a ${f1(pior)} cm da pele do tronco`, ok: a - b >= 8 && pior >= 0 };
  },
};
