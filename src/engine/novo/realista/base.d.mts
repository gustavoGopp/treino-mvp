// Tipos do gerador realista (base.mjs): o mesmo código que desenha os 49 cartões de equipamento do app.
// O arquivo continua em JavaScript porque os scripts dos cartões o importam direto pelo Node.
type V3 = [number, number, number];
type P2 = [number, number];
/** Um material: quatro tons, do mais escuro (traço) ao mais claro. */
export type Material = string[];
export const MAT: Record<'metal' | 'metalClaro' | 'cromo' | 'estofado' | 'anilha' | 'placa' | 'borracha' | 'plataforma' | 'ferro', Material>;
export function mix(c1: string, c2: string, t: number): string;
export function retArred(w: number, h: number, r: number, n?: number): P2[];
export function circulo(r: number, n?: number): P2[];
/** A câmera: ponto 3D → [x na tela, y na tela (para baixo), profundidade (maior = mais longe)]; `rot` gira uma direção. */
export interface CameraRealista {
  P(p: V3): V3;
  rot(v: V3): V3;
  s: number;
}
interface Opcoes {
  dz?: number;
  lados?: number;
  up?: V3;
  contorno?: boolean;
}
export interface CenaRealista {
  /** Peças desenhadas até agora: profundidade (maior = mais longe) e o SVG de cada uma. */
  itens: { z: number; svg: string }[];
  defs: string[];
  tubo(a: V3, b: V3, w: number, h: number, mat: Material, o?: Opcoes): void;
  cilindro(a: V3, b: V3, r: number, mat: Material, o?: Opcoes): void;
  prisma(perfil: P2[], origem: V3, e1: V3, e2: V3, extrusao: V3, mat: Material, o?: Opcoes): void;
  estofado(base: V3, ao: V3, normal: V3, lado: V3, comp: number, esp: number, larg: number, mat?: Material, o?: Opcoes): void;
  anilha(a: V3, b: V3, r: number, mat?: Material, o?: Opcoes): void;
  pilha(base: V3, larg: V3, tras: V3, w: number, h: number, prof: number, nPlacas: number, o?: Opcoes): number;
  furos(centros: V3[], e1: V3, e2: V3, r?: number, o?: Opcoes): void;
  linha(a: V3, b: V3, cor?: string, w?: number, o?: Opcoes & { z?: number }): void;
  polilinha(pts: V3[], cor: string, w: number, o?: Opcoes & { z?: number }): void;
  sombra(cx: number, cz: number, rx: number, rz: number, opacidade?: number): void;
}
export function cena(id: string, cam: CameraRealista): CenaRealista;
