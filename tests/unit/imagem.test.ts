import { describe, expect, it } from 'vitest';
import { dimensoesReduzidas, LADO_MAXIMO, temExif } from '../../src/lib/imagem';

// JPEG mínimo: SOI, um segmento opcional, SOS e EOI (o conteúdo da imagem não importa para o teste).
const jpeg = (...segmentos: number[][]) => new Uint8Array([0xff, 0xd8, ...segmentos.flat(), 0xff, 0xda, 0x00, 0x02, 0xff, 0xd9]);
const segmento = (marcador: number, conteudo: number[]) => [0xff, marcador, (conteudo.length + 2) >> 8, (conteudo.length + 2) & 0xff, ...conteudo];
const exif = segmento(0xe1, [...'Exif'].map((c) => c.charCodeAt(0)).concat([0, 0, 1, 2, 3]));
const jfif = segmento(0xe0, [...'JFIF'].map((c) => c.charCodeAt(0)).concat([0, 1, 1]));

describe('preparo da foto', () => {
  it('reduz para no máximo 1568 px no lado maior, sem distorcer nem aumentar', () => {
    expect(dimensoesReduzidas(4032, 3024)).toEqual({ largura: LADO_MAXIMO, altura: 1176 });
    expect(dimensoesReduzidas(3024, 4032)).toEqual({ largura: 1176, altura: LADO_MAXIMO });
    expect(dimensoesReduzidas(800, 600)).toEqual({ largura: 800, altura: 600 });
  });

  it('detecta o segmento EXIF (onde fica o GPS) e ignora os outros', () => {
    expect(temExif(jpeg(jfif, exif))).toBe(true);
    expect(temExif(jpeg(jfif))).toBe(false);
    expect(temExif(new Uint8Array([0x89, 0x50]))).toBe(false);
  });
});
