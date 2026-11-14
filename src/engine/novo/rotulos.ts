// Motor novo: onde ficam os textos do palco (os rótulos de técnica e o nome do erro).
// Regra 15 do bloco B: rótulos e setas ficam fora do corpo e não se sobrepõem. O texto fica parado durante o ciclo
// (quem se mexe é o fio até o ponto do corpo), fora da caixa que contém o corpo e o equipamento no ciclo inteiro.
// O tamanho da letra é uma fração da largura do quadro: sai igual em pixels numa cena estreita e numa larga.
import type { P2 } from './desenho';

/** Caixa na tela: [x0, y0, x1, y1]. */
export type Caixa = [number, number, number, number];
export interface PedidoDeRotulo {
  texto: string;
  /** Posição média, no ciclo, do ponto do corpo de que o texto fala. */
  alvo: P2;
}
export interface RotuloPosto {
  linhas: string[];
  /** Canto de cima, à esquerda, do bloco de texto, e o seu tamanho. */
  x: number;
  y: number;
  larg: number;
  alt: number;
  lado: 'dir' | 'esq' | 'cima';
}
/** Largura média de uma letra, em frações do tamanho da fonte (peso 600, sem serifa). Sobra um pouco de propósito. */
const LETRA = 0.58;
const ENTRELINHA = 1.22;

/** Quebra o texto em linhas de até `max` letras, sem cortar palavra. */
export function quebrar(texto: string, max = 17): string[] {
  const linhas: string[] = [];
  let atual = '';
  for (const p of texto.split(' ')) {
    if (atual && atual.length + 1 + p.length > max) {
      linhas.push(atual);
      atual = p;
    } else atual = atual ? `${atual} ${p}` : p;
  }
  if (atual) linhas.push(atual);
  return linhas;
}
const cruza = (a: Caixa, b: Caixa, folga: number) => a[0] < b[2] + folga && b[0] < a[2] + folga && a[1] < b[3] + folga && b[1] < a[3] + folga;

/**
 * Põe cada texto ao lado do corpo (do lado em que o ponto está) ou, quando a cena é larga e não sobra lado, acima
 * dele. Devolve `null` para o texto que não coube: quem enquadra abre o quadro e tenta de novo.
 * `vb` = [x0, y0, largura, altura] do quadro; `corpo` = a caixa do corpo e do equipamento no ciclo inteiro.
 */
export function disporRotulos(pedidos: PedidoDeRotulo[], corpo: Caixa, vb: [number, number, number, number], tam: number, max = 17): (RotuloPosto | null)[] {
  const folga = tam * 0.9,
    borda = tam * 0.6;
  const x0 = vb[0] + borda,
    x1 = vb[0] + vb[2] - borda,
    y0 = vb[1] + borda,
    y1 = vb[1] + vb[3] - borda;
  const meio = (corpo[0] + corpo[2]) / 2;
  const postos: Caixa[] = [];
  let noMeio = 0;
  // acima do corpo só quando o fio não precisa atravessá-lo: numa cena larga, ou quando o ponto fica no alto
  const larga = corpo[2] - corpo[0] > 1.3 * (corpo[3] - corpo[1]);
  return pedidos.map((p) => {
    // o lado preferido é o do ponto; os textos de um ponto que fica no meio do corpo se alternam (direita, esquerda)
    const central = Math.abs(p.alvo[0] - meio) < (corpo[2] - corpo[0]) * 0.02;
    const direita = central ? noMeio++ % 2 === 0 : p.alvo[0] > meio;
    const noAlto = p.alvo[1] - corpo[1] < 0.4 * (corpo[3] - corpo[1]);
    const lados: RotuloPosto['lado'][] = direita ? ['dir', 'esq'] : ['esq', 'dir'];
    // ao lado do corpo, se a linha inteira não couber, o texto quebra em linhas mais curtas; a quebra em linhas
    // muito curtas (10 letras) é o último recurso, depois de tentar acima do corpo
    const quebra = (m: number) => quebrar(p.texto, Math.min(m, max));
    const tentativas: [RotuloPosto['lado'], string[]][] = [];
    for (const l of lados) tentativas.push([l, quebra(max)], [l, quebra(13)]);
    if (larga || noAlto) tentativas.push(['cima', quebra(max)]);
    for (const l of lados) tentativas.push([l, quebra(10)]);
    for (const [lado, linhas] of tentativas) {
      {
        const larg = Math.max(...linhas.map((l) => l.length)) * tam * LETRA,
          alt = linhas.length * tam * ENTRELINHA;
        const tenta = (x: number, y: number): RotuloPosto | null => {
          const c: Caixa = [x, y, x + larg, y + alt];
          if (c[0] < x0 - 0.01 || c[2] > x1 + 0.01 || c[1] < y0 - 0.01 || c[3] > y1 + 0.01) return null;
          if (postos.some((q) => cruza(c, q, tam * 0.35))) return null;
          postos.push(c);
          return { linhas, x, y, larg, alt, lado };
        };
        const passo = alt + tam * 0.5;
        if (lado === 'cima') {
          const x = Math.max(x0, Math.min(x1 - larg, p.alvo[0] - larg / 2));
          for (let i = 0; i < 4; i++) {
            const r = tenta(x, corpo[1] - folga - alt - i * passo);
            if (r) return r;
          }
          continue;
        }
        const x = lado === 'dir' ? corpo[2] + folga : corpo[0] - folga - larg;
        const yIdeal = Math.max(y0, Math.min(y1 - alt, p.alvo[1] - alt / 2));
        for (let i = 0; i < 9; i++) {
          // 0, +1, −1, +2, −2... passos a partir da altura do ponto
          const k = i === 0 ? 0 : (i % 2 ? 1 : -1) * Math.ceil(i / 2);
          const r = tenta(x, yIdeal + k * passo);
          if (r) return r;
        }
      }
    }
    return null;
  });
}
/** O ponto da borda do bloco de texto de onde sai o fio até o corpo. */
export function saidaDoFio(r: RotuloPosto, tam: number): P2 {
  if (r.lado === 'dir') return [r.x - tam * 0.3, r.y + r.alt / 2];
  if (r.lado === 'esq') return [r.x + r.larg + tam * 0.3, r.y + r.alt / 2];
  return [r.x + r.larg / 2, r.y + r.alt + tam * 0.25];
}
const f1 = (n: number) => (Math.round(n * 10) / 10).toString();
/** O bloco de texto em SVG (alinhado do lado do corpo, para o fio sair rente à letra). */
export function textoDoRotulo(r: RotuloPosto, tam: number, classe: string): string {
  const fim = r.lado === 'esq',
    centro = r.lado === 'cima';
  const x = fim ? r.x + r.larg : centro ? r.x + r.larg / 2 : r.x;
  const spans = r.linhas.map((l, i) => `<tspan x="${f1(x)}" y="${f1(r.y + tam * 0.92 + i * tam * ENTRELINHA)}">${l}</tspan>`).join('');
  return `<text class="${classe}" font-size="${f1(tam)}"${fim ? ' text-anchor="end"' : centro ? ' text-anchor="middle"' : ''}>${spans}</text>`;
}
