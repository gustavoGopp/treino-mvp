import type { CartaoDaSemana } from '../../domain/acompanhamento/semana';

// O cartão da semana (lote M5 da análise crítica, 22/11/2026): uma imagem com os treinos da semana e as semanas com
// treino, que a pessoa manda pelo botão de compartilhar do próprio celular (no grupo da família, por exemplo). Sem conta
// e sem servidor: a imagem é desenhada aqui, no aparelho, e só sai dele quando a pessoa escolhe para onde mandar.
// Só frequência: nunca carga, exercício ou dado de saúde (o que entra está em cartaoDaSemana, no domínio).
// O cartão não leva o nome do app por enquanto (o nome foi adiado em 21/11/2026).

const LADO = 1080;
const MARGEM = 96;
// as cores claras do app (styles.css): o cartão é sempre claro, para ser lido em qualquer conversa
const FUNDO = '#F6F6F4';
const TEXTO = '#0E0E10';
const TEXTO_2 = '#55565A';
const BORDA = '#77787C';

export function desenharCartao(c: CartaoDaSemana): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = LADO;
  canvas.height = LADO;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('canvas indisponível');
  const fonte = getComputedStyle(document.body).fontFamily || 'sans-serif';
  g.fillStyle = FUNDO;
  g.fillRect(0, 0, LADO, LADO);
  g.textBaseline = 'alphabetic';

  g.fillStyle = TEXTO_2;
  g.font = `600 40px ${fonte}`;
  g.fillText('MINHA SEMANA DE TREINO', MARGEM, 190);

  g.fillStyle = TEXTO;
  g.font = `700 300px ${fonte}`;
  const numero = String(c.feitos);
  g.fillText(numero, MARGEM - 12, 520);
  const largura = g.measureText(numero).width;
  g.font = `600 96px ${fonte}`;
  g.fillText(`de ${c.planejados}`, MARGEM + largura + 24, 520);
  g.fillStyle = TEXTO_2;
  g.font = `500 56px ${fonte}`;
  g.fillText(c.feitos === 1 && c.planejados === 1 ? 'treino nesta semana' : 'treinos nesta semana', MARGEM, 610);

  if (c.linha) {
    g.fillStyle = TEXTO;
    g.font = `700 72px ${fonte}`;
    g.fillText(c.linha, MARGEM, 810);
  }
  // um quadrado por semana da janela (até 8): cheio com treino, só o contorno sem
  if (c.semanas.length > 1) {
    const lado = 72;
    const vao = 20;
    c.semanas.forEach((comTreino, i) => {
      const x = MARGEM + i * (lado + vao);
      if (comTreino) {
        g.fillStyle = TEXTO;
        g.fillRect(x, 870, lado, lado);
      } else {
        g.strokeStyle = BORDA;
        g.lineWidth = 4;
        g.strokeRect(x + 2, 872, lado - 4, lado - 4);
      }
    });
  }
  return canvas;
}

/** O que a imagem diz, para leitor de tela e para o texto que acompanha o envio. */
export function textoDoCartao(c: CartaoDaSemana): string {
  return `${c.feitos} de ${c.planejados} treinos nesta semana.${c.linha ? ` ${c.linha}.` : ''}`;
}

/**
 * Manda o cartão pelo compartilhar do celular; onde não há compartilhar com imagem (ou ele falha), salva a imagem.
 * "cancelado": a pessoa fechou a tela de compartilhar sem escolher.
 */
export async function mandarCartao(c: CartaoDaSemana): Promise<'mandado' | 'salvo' | 'cancelado'> {
  const canvas = desenharCartao(c);
  const blob = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, 'image/png'));
  if (!blob) throw new Error('não foi possível gerar a imagem');
  const arquivo = new File([blob], 'minha-semana-de-treino.png', { type: 'image/png' });
  if (navigator.canShare?.({ files: [arquivo] })) {
    try {
      await navigator.share({ files: [arquivo], text: textoDoCartao(c) });
      return 'mandado';
    } catch (e) {
      if ((e as Error).name === 'AbortError') return 'cancelado';
      // o compartilhar existe mas recusou (acontece em alguns navegadores): cai na imagem salva
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = arquivo.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'salvo';
}
