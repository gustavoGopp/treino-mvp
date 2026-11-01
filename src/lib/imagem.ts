// Preparo da foto no aparelho, antes de qualquer envio (CLAUDE.md, privacidade; plano, seção g.2):
// redimensiona para no máximo 1568 px no lado maior e gera um JPEG novo (qualidade 0,8).
// Redesenhar no canvas descarta todos os metadados da foto original, inclusive o GPS.

export const LADO_MAXIMO = 1568;

/** Novas dimensões, mantendo a proporção e sem aumentar fotos pequenas. */
export function dimensoesReduzidas(largura: number, altura: number, max = LADO_MAXIMO): { largura: number; altura: number } {
  const maior = Math.max(largura, altura);
  if (maior <= max) return { largura, altura };
  const k = max / maior;
  return { largura: Math.round(largura * k), altura: Math.round(altura * k) };
}

/** true se o JPEG tem um segmento APP1 de EXIF (onde ficam câmera, data e GPS). */
export function temExif(bytes: Uint8Array): boolean {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return false;
  let i = 2;
  while (i + 4 <= bytes.length && bytes[i] === 0xff) {
    const marcador = bytes[i + 1]!;
    if (marcador === 0xda || marcador === 0xd9) break; // início da imagem comprimida ou fim
    const tamanho = (bytes[i + 2]! << 8) | bytes[i + 3]!;
    if (marcador === 0xe1 && String.fromCharCode(...bytes.slice(i + 4, i + 8)) === 'Exif') return true;
    i += 2 + tamanho;
  }
  return false;
}

/** Lê a foto (respeitando a orientação), reduz e devolve um JPEG novo, sem metadados. */
export async function prepararFoto(arquivo: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(arquivo, { imageOrientation: 'from-image' });
  const { largura, altura } = dimensoesReduzidas(bitmap.width, bitmap.height);
  const canvas = document.createElement('canvas');
  canvas.width = largura;
  canvas.height = altura;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas indisponível');
  ctx.drawImage(bitmap, 0, 0, largura, altura);
  bitmap.close();
  const blob = await new Promise<Blob | null>((ok) => canvas.toBlob(ok, 'image/jpeg', 0.8));
  if (!blob) throw new Error('não foi possível gerar o JPEG');
  return blob;
}

/** Base64 (sem o prefixo data:) para enviar no JSON. */
export async function paraBase64(blob: Blob): Promise<string> {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
