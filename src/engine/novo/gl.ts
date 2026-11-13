// Motor novo: pintor 3D (WebGL puro, sem biblioteca). Desenha a malha do corpo e os objetos da cena numa vista
// ortográfica, em três acabamentos: 0 = chapado (cor lisa e contorno), 1 = ilustração (três tons e contorno),
// 2 = volume suave (luz contínua). A geometria é a mesma nos três; só o sombreamento muda.
import type { Volume } from './corpo3d';
import type { Camera, Prim } from './desenho';
import { add, comb, cross, dot, mul, norm, sub } from './vec';
import type { V3 } from './vec';

/** Geometria pronta para a placa de vídeo: posição, normal (luz), direção de expansão (contorno), material e triângulos. */
export interface Geo {
  pos: Float32Array;
  nor: Float32Array;
  exp: Float32Array;
  mat: Float32Array;
  /** Músculo principal e secundário (0 a 1 por ponto); a borda fica em 0,5. Opcionais. */
  mp?: Float32Array;
  ms?: Float32Array;
  /** Cobertura (roupa, calçado, cabelo): 0 a 1 por ponto, com a borda em 0,5, e o material que cobre. Opcionais. */
  cob?: Float32Array;
  alvo?: Float32Array;
  tri: Uint16Array | Uint32Array;
}
export const MATERIAIS = ['pele', 'musculoP', 'musculoS', 'obj', 'esc', 'ferro', 'aco', 'estofado', 'tapete', 'chao', 'cabo', 'musculoA', 'peleLonge', 'junta', 'roupa', 'cabelo', 'calcado', 'juntaLonge'] as const;
export type Material = (typeof MATERIAIS)[number];
const iMat = (m: string) => Math.max(0, MATERIAIS.indexOf(m as Material));

/* ============================== objetos → triângulos ============================== */
class Monta {
  pos: number[] = [];
  nor: number[] = [];
  exp: number[] = [];
  mat: number[] = [];
  tri: number[] = [];
  v(p: V3, n: V3, e: V3, m: number) {
    this.pos.push(p[0], p[1], p[2]);
    this.nor.push(n[0], n[1], n[2]);
    this.exp.push(e[0], e[1], e[2]);
    this.mat.push(m);
    return this.pos.length / 3 - 1;
  }
  geo(): Geo {
    return { pos: new Float32Array(this.pos), nor: new Float32Array(this.nor), exp: new Float32Array(this.exp), mat: new Float32Array(this.mat), tri: new Uint32Array(this.tri) };
  }
}
function tubo(g: Monta, vol: Volume, m: number, lados = 18) {
  const A = vol.aneis,
    n = A.length;
  const base = g.pos.length / 3;
  // se x × z aponta contra o eixo, a ordem dos pontos em volta do anel se inverte (e a face de fora com ela)
  const horario = dot(cross(A[0]!.x, A[0]!.z), sub(A[n - 1]!.c, A[0]!.c)) > 0;
  for (let i = 0; i < n; i++) {
    const an = A[i]!;
    const eixo = norm(sub(A[Math.min(n - 1, i + 1)]!.c, A[Math.max(0, i - 1)]!.c));
    for (let j = 0; j < lados; j++) {
      const t = (2 * Math.PI * j) / lados,
        c = Math.cos(t),
        s = Math.sin(t);
      const rz = s >= 0 ? an.f : an.b;
      const p = comb([1, an.c], [an.a * c, an.x], [rz * s, an.z]);
      const nn = norm(comb([c / an.a, an.x], [s / rz, an.z]));
      // nas pontas, a normal de expansão abre para fora da tampa (o contorno fecha a ponta)
      const ex = i === 0 ? norm(sub(nn, mul(eixo, 0.7))) : i === n - 1 ? norm(add(nn, mul(eixo, 0.7))) : nn;
      g.v(p, nn, ex, m);
    }
  }
  for (let i = 0; i < n - 1; i++)
    for (let j = 0; j < lados; j++) {
      const a = base + i * lados + j,
        b = base + i * lados + ((j + 1) % lados),
        c = a + lados,
        d = b + lados;
      if (horario) g.tri.push(a, b, c, b, d, c);
      else g.tri.push(a, c, b, b, c, d);
    }
  // tampas
  for (const [i, sent] of [[0, -1], [n - 1, 1]] as [number, number][]) {
    const an = A[i]!;
    const eixo = mul(norm(sub(A[Math.min(n - 1, i + 1)]!.c, A[Math.max(0, i - 1)]!.c)), sent);
    const centro = g.v(an.c, eixo, eixo, m);
    const anel: number[] = [];
    for (let j = 0; j < lados; j++) {
      const t = (2 * Math.PI * j) / lados,
        c = Math.cos(t),
        s = Math.sin(t);
      const rz = s >= 0 ? an.f : an.b;
      const p = comb([1, an.c], [an.a * c, an.x], [rz * s, an.z]);
      anel.push(g.v(p, eixo, norm(add(eixo, mul(norm(sub(p, an.c)), 0.7))), m));
    }
    for (let j = 0; j < lados; j++) {
      const a = anel[j]!,
        b = anel[(j + 1) % lados]!;
      if (sent > 0 === !horario) g.tri.push(centro, a, b);
      else g.tri.push(centro, b, a);
    }
  }
}
/** Converte as peças da cena (caixas, volumes, fios, chão) em triângulos. */
export function geoDosPrims(prims: Prim[]): Geo {
  const g = new Monta();
  for (const p of prims) {
    if (p.t === 'volume') tubo(g, p.vol, iMat(p.cls));
    else if (p.t === 'fio') {
      const r = p.larg / 2;
      for (let i = 0; i < p.pts.length - 1; i++) {
        const a = p.pts[i]!,
          b = p.pts[i + 1]!;
        const u = norm(sub(b, a));
        const x = norm(cross(u, Math.abs(u[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
        const z = cross(u, x);
        tubo(g, { aneis: [{ c: a, x, z, a: r, f: r, b: r }, { c: b, x, z, a: r, f: r, b: r }] }, iMat(p.cls === 'cabo' || p.cls === 'fita' ? 'cabo' : p.cls), 8);
      }
    } else if (p.t === 'caixa') {
      const { ref: r, meias: h } = p;
      const m = iMat(p.cls);
      const eixos: [V3, V3, V3, number, number, number][] = [
        [r.x, r.y, r.z, h[0], h[1], h[2]],
        [r.y, r.z, r.x, h[1], h[2], h[0]],
        [r.z, r.x, r.y, h[2], h[0], h[1]],
      ];
      for (const [nn, u, w, hn, hu, hw] of eixos)
        for (const s of [-1, 1]) {
          const c0 = add(r.o, mul(nn, s * hn));
          const q = ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as [number, number][]).map(([a, b]) => {
            const pt = comb([1, c0], [a * hu, u], [b * hw, w]);
            return g.v(pt, mul(nn, s), norm(comb([s, nn], [a, u], [b, w])), m);
          });
          if (s > 0) g.tri.push(q[0]!, q[1]!, q[2]!, q[0]!, q[2]!, q[3]!);
          else g.tri.push(q[0]!, q[2]!, q[1]!, q[0]!, q[3]!, q[2]!);
        }
    } else if (p.t === 'chao') {
      const m = iMat('chao');
      const q = ([[p.x0, p.z0], [p.x1, p.z0], [p.x1, p.z1], [p.x0, p.z1]] as [number, number][]).map(([x, z]) => g.v([x, p.y - 0.05, z], [0, 1, 0], [0, 0, 0], m));
      g.tri.push(q[0]!, q[2]!, q[1]!, q[0]!, q[3]!, q[2]!);
    } else if (p.t === 'esfera') {
      const an = (y: number, rr: number) => ({ c: add(p.c, [0, y, 0] as V3), x: [1, 0, 0] as V3, z: [0, 0, 1] as V3, a: rr, f: rr, b: rr });
      const aneis = [];
      for (let i = 0; i <= 8; i++) {
        const t = -Math.PI / 2 + (Math.PI * i) / 8;
        aneis.push(an(p.r * Math.sin(t), Math.max(0.05, p.r * Math.cos(t))));
      }
      tubo(g, { aneis }, iMat(p.cls));
    }
  }
  return g.geo();
}

/* ============================== programa ============================== */
const VERT = `
precision mediump float;
attribute vec3 aPos; attribute vec3 aNor; attribute vec3 aExp; attribute float aMat; attribute float aMp; attribute float aMs; attribute float aCob; attribute float aAlvo;
uniform vec3 uDir, uCima, uPara; uniform vec4 uCaixa; uniform float uExp; uniform vec3 uCor[18];
varying vec3 vNor; varying vec3 vBase; varying float vChao; varying float vMp; varying float vMs; varying vec3 vVista; varying float vCob; varying vec3 vCorCob;
void main(){
  vMp = aMp; vMs = aMs; vCob = aCob;
  int al = int(aAlvo + 0.5);
  vCorCob = uCor[0];
  for (int i = 0; i < 18; i++) if (i == al) vCorCob = uCor[i];
  vec3 p = aPos + aExp * uExp;
  vec3 q = vec3(dot(p,uDir), dot(p,uCima), dot(p,uPara));
  vVista = q;
  vNor = vec3(dot(aNor,uDir), dot(aNor,uCima), dot(aNor,uPara));
  // a cor do material é escolhida no ponto (e não entre pontos), para a borda entre dois materiais não passar por outros
  int m = int(aMat + 0.5);
  vBase = uCor[0];
  for (int i = 0; i < 18; i++) if (i == m) vBase = uCor[i];
  vChao = m == 9 ? 1.0 : 0.0;
  gl_Position = vec4((q.x-uCaixa.x)/uCaixa.z*2.0-1.0, (q.y-uCaixa.y)/uCaixa.w*2.0-1.0, -q.z/600.0, 1.0);
}`;
const FRAG = `
#extension GL_OES_standard_derivatives : enable
precision mediump float;
uniform vec3 uCor[18]; uniform vec3 uContorno; uniform vec3 uSombra; uniform vec3 uLuz; uniform int uModo; uniform float uTraco; uniform vec3 uFundo; uniform float uFacetado;
varying vec3 vNor; varying vec3 vBase; varying float vChao; varying float vMp; varying float vMs; varying vec3 vVista; varying float vCob; varying vec3 vCorCob;
void main(){
  if (uTraco > 0.5) { gl_FragColor = vec4(uContorno, 1.0); return; }
  vec3 base = vBase;
  if (vChao > 0.5) { gl_FragColor = vec4(base, 1.0); return; }
  if (vCob > 0.5) base = vCorCob;
  if (abs(vCob - 0.5) < 0.04 && uModo < 2) base = mix(base, uContorno, 0.55);
  if (vMs > 0.5) base = uCor[2];
  if (vMp > 0.5) base = uCor[1];
  float bd = min(abs(vMp - 0.5), abs(vMs - 0.5));
  if (bd < 0.03 && uModo == 1) base = mix(base, uContorno, 0.75);
  vec3 n = normalize(vNor);
  if (uFacetado > 0.5) n = normalize(cross(dFdx(vVista), dFdy(vVista)));
  float d = dot(n, uLuz);
  vec3 cor = base;
  if (uModo == 1) {
    float f = d > 0.28 ? 1.0 : (d > -0.22 ? 0.84 : 0.66);
    cor = mix(uSombra, base, f);
  } else if (uModo == 2) {
    float w = clamp(d * 0.5 + 0.5, 0.0, 1.0);
    float f = 0.52 + 0.48 * w * w * (3.0 - 2.0 * w);
    float borda = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.5);
    cor = mix(uSombra, base, f);
    cor = mix(cor, uFundo, borda * 0.22);
  } else if (uModo == 3) {
    // facetas: cada face com um tom, em degraus suaves
    float f = 0.5 + 0.5 * clamp(d * 0.6 + 0.5, 0.0, 1.0);
    cor = mix(uSombra, base, f);
  }
  gl_FragColor = vec4(cor, 1.0);
}`;

export interface Paleta {
  cores: Record<Material, [number, number, number]>;
  contorno: [number, number, number];
  /** Para onde a cor escurece na sombra. */
  sombra: [number, number, number];
  fundo: [number, number, number];
}
export interface OpcoesDePintura {
  /** false = desenha por cima do que já está na tela (segunda camada). */
  limpar?: boolean;
  /** false = ignora a profundidade (o que for desenhado fica por cima de tudo: o esqueleto visto através do corpo). */
  profundidade?: boolean;
  /** true = cada face com a própria luz (aspecto facetado). */
  facetado?: boolean;
}
export interface Pintor {
  /** Desenha as geometrias. caixa = [x0, y0 (embaixo), largura, altura] em cm, na tela. modo: 0 chapado, 1 três tons, 2 volume suave, 3 facetas. tracoCm = contorno em cm (0 = sem). */
  pintar(geos: Geo[], cam: Camera, caixa: [number, number, number, number], modo: 0 | 1 | 2 | 3, paleta: Paleta, tracoCm: number, opcoes?: OpcoesDePintura): void;
}
export function criarPintor(canvas: HTMLCanvasElement | OffscreenCanvas): Pintor {
  const gl = canvas.getContext('webgl', { antialias: true, alpha: false, preserveDrawingBuffer: true }) as WebGLRenderingContext | null;
  if (!gl) throw new Error('WebGL indisponível');
  gl.getExtension('OES_element_index_uint');
  gl.getExtension('OES_standard_derivatives');
  const sh = (tipo: number, src: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'erro no shader');
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'erro ao ligar o programa');
  gl.useProgram(prog);
  const U = (n: string) => gl.getUniformLocation(prog, n);
  const bufs = new WeakMap<Geo, { p: WebGLBuffer; n: WebGLBuffer; e: WebGLBuffer; m: WebGLBuffer; t: WebGLBuffer; mp: WebGLBuffer; ms: WebGLBuffer; cb: WebGLBuffer; al: WebGLBuffer }>();
  let zeros = new Float32Array(0);
  const liga = (nome: string, buf: WebGLBuffer, dados: Float32Array, tam: number) => {
    const loc = gl.getAttribLocation(prog, nome);
    if (loc < 0) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, dados, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, tam, gl.FLOAT, false, 0, 0);
  };
  return {
    pintar(geos, cam, caixa, modo, pal, tracoCm, o = {}) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (o.limpar !== false) {
        gl.clearColor(pal.fundo[0], pal.fundo[1], pal.fundo[2], 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
      if (o.profundidade === false) gl.disable(gl.DEPTH_TEST);
      else gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.CULL_FACE);
      gl.uniform3fv(U('uDir'), cam.dir);
      gl.uniform3fv(U('uCima'), cam.cima);
      gl.uniform3fv(U('uPara'), cam.para);
      gl.uniform4fv(U('uCaixa'), caixa);
      gl.uniform3fv(U('uLuz'), norm([-0.42, 0.62, 0.66]));
      gl.uniform1i(U('uModo'), modo);
      gl.uniform1f(U('uFacetado'), o.facetado ? 1 : 0);
      gl.uniform3fv(U('uContorno'), pal.contorno);
      gl.uniform3fv(U('uSombra'), pal.sombra);
      gl.uniform3fv(U('uFundo'), pal.fundo);
      gl.uniform3fv(U('uCor[0]'), new Float32Array(MATERIAIS.flatMap((m) => pal.cores[m])));
      for (const g of geos) {
        if (!g.tri.length) continue;
        let b = bufs.get(g);
        if (!b) {
          b = { p: gl.createBuffer()!, n: gl.createBuffer()!, e: gl.createBuffer()!, m: gl.createBuffer()!, t: gl.createBuffer()!, mp: gl.createBuffer()!, ms: gl.createBuffer()!, cb: gl.createBuffer()!, al: gl.createBuffer()! };
          bufs.set(g, b);
        }
        liga('aPos', b.p, g.pos, 3);
        liga('aNor', b.n, g.nor, 3);
        liga('aExp', b.e, g.exp, 3);
        liga('aMat', b.m, g.mat, 1);
        if (zeros.length < g.mat.length) zeros = new Float32Array(g.mat.length);
        liga('aMp', b.mp, g.mp ?? zeros.subarray(0, g.mat.length), 1);
        liga('aMs', b.ms, g.ms ?? zeros.subarray(0, g.mat.length), 1);
        liga('aCob', b.cb, g.cob ?? zeros.subarray(0, g.mat.length), 1);
        liga('aAlvo', b.al, g.alvo ?? zeros.subarray(0, g.mat.length), 1);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, b.t);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, g.tri, gl.DYNAMIC_DRAW);
        const tipo = g.tri instanceof Uint32Array ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
        // 1) a forma
        gl.cullFace(gl.BACK);
        gl.uniform1f(U('uExp'), 0);
        gl.uniform1f(U('uTraco'), 0);
        gl.drawElements(gl.TRIANGLES, g.tri.length, tipo, 0);
        // 2) o contorno: a mesma forma, inflada, mostrando só as faces de trás (aparece só na borda)
        if (tracoCm > 0) {
          gl.cullFace(gl.FRONT);
          gl.uniform1f(U('uExp'), tracoCm);
          gl.uniform1f(U('uTraco'), 1);
          gl.drawElements(gl.TRIANGLES, g.tri.length, tipo, 0);
        }
      }
    },
  };
}
