// Tipos centrais do motor de animação. Só tipos: este arquivo não gera código.
// Os arquivos do port (./exercicios/, ./esqueleto.ts, ./math.ts) continuam sem tipo; o que vem deles ganha tipo em
// ./port.ts, e os exercícios entram como Exercicio em ./index.ts.

/** Vetor 3D, em cm: [x (esquerda do corpo), y (cima), z (frente)]. */
export type V3 = [number, number, number];
/** Ponto 2D na tela (ou um par de ângulos, nas poses: [azimute, elevação]). */
export type V2 = [number, number];
/** Ponto já projetado: x e y na tela, e talvez a profundidade depois (aceita V2 e V3). */
export type PontoTela = readonly [number, number, ...number[]];
/** Caixa de visualização: [x0, y0, largura, altura]. */
export type Caixa = [number, number, number, number];
/** Limites medidos: [x mínimo, x máximo, y mínimo, y máximo]. */
export type Limites = [number, number, number, number];

export type Lado = 'R' | 'L';
/** Lados de um músculo na lista do exercício: um lado ou os dois. */
export type Lados = Lado | 'RL';
export type Vista = 'lateral' | 'frontal' | 'posterior' | 'top' | 'zoom';
export type Modo = 'tec' | 'mus' | 'traj' | 'err';
/** Paleta do corpo no estilo clássico: normal, erro e os dois fantasmas. */
export type Paleta = 'n' | 'e' | 'g' | 'g2';
/** Projeção em uso (CTX.PJ): do ponto 3D para [x na tela, y na tela, profundidade]. */
export type Projecao = (v: V3) => V3;
/** A projeção como VIEWS a guarda: recebe `number[]`, porque é assim que tests/unit/rotulos.test.ts a usa. */
export type ProjecaoDaVista = (v: number[]) => V3;

/* ================= pose e esqueleto (../esqueleto.ts) ================= */
/** Braço numa pose: por ângulos (ua e fa) ou por um alvo da mão (ikS, sph, head ou tr), resolvido por IK. */
export interface PoseBraco {
  ua?: V2;
  fa?: V2;
  ikS?: V3;
  sph?: V3;
  head?: V3;
  tr?: V3;
  poleRel?: V3;
}
/** Perna numa pose: por ângulos (th e sh) ou pelo alvo do tornozelo (ikS); ft = direção do pé. */
export interface PosePerna {
  th?: V2;
  sh?: V2;
  ikS?: V3;
  poleRel?: V3;
  ft: V2;
  heelV?: V3;
}
/** Pose do corpo (a entrada de skel). Alguns exercícios guardam outros números na pose, para o próprio equipamento. */
export interface Pose {
  P: V3;
  roll?: number;
  lumbar?: number;
  thor?: number;
  neck?: number;
  pro?: number;
  proR?: number;
  proL?: number;
  elev?: number;
  elevR?: number;
  elevL?: number;
  scapRot?: number;
  rotR?: number;
  rotL?: number;
  armR: PoseBraco;
  armL?: PoseBraco;
  legR: PosePerna;
  legL?: PosePerna;
  wrist?: number;
  wristR?: number;
  wristL?: number;
  wristDir?: V3;
}

/** Um lado do esqueleto: s = -1 (direito) ou +1 (esquerdo), a escápula e as juntas do braço e da perna. */
export interface LadoDoEsqueleto {
  s: number;
  pro: number;
  elev: number;
  rot: number;
  /** ombro */
  S: V3;
  /** quadril */
  Hp: V3;
  /** cotovelo */
  E: V3;
  /** mão (fim do antebraço) */
  H: V3;
  /** direção do antebraço */
  fa: V3;
  /** direção do braço */
  uad: V3;
  /** punho */
  W: V3;
  /** pegada */
  G: V3;
  /** joelho */
  K: V3;
  /** tornozelo */
  A: V3;
  toe: V3;
  heel: V3;
}
/** Pontos de um lado do esqueleto que são posições (sem as direções fa e uad). */
export type PontoDoLado = 'S' | 'Hp' | 'E' | 'H' | 'W' | 'G' | 'K' | 'A' | 'toe' | 'heel';
/** Pontos do eixo do corpo: pelve, meio do tronco, base do pescoço e cabeça. */
export type PontoCentral = 'P' | 'M' | 'N' | 'Hc';
/** O esqueleto resolvido (a saída de skel): o eixo do corpo, as bases da lombar (L), do tórax (T) e do pescoço (N) e os dois lados. */
export interface Esqueleto {
  P: V3;
  M: V3;
  N: V3;
  Hc: V3;
  uL: V3;
  fL: V3;
  xL: V3;
  uT: V3;
  fT: V3;
  xT: V3;
  uN: V3;
  fN: V3;
  xN: V3;
  side: Record<Lado, LadoDoEsqueleto>;
  pose: Pose;
}

/* ================= desenho ================= */
/** Opções comuns das primitivas: camada, ajuste de profundidade, tracejado, opacidade e espessura do contorno. */
export interface OpcoesPrim {
  layer?: number;
  bias?: number;
  dash?: string;
  op?: number;
  w?: number;
}
/** Opções de um rótulo (TX): scr = o ponto já está na tela; dx e dy em px de tela. */
export interface OpcoesTexto {
  scr?: boolean;
  dx?: number;
  dy?: number;
  cls?: string;
  size?: number;
  anchor?: string;
  layer?: number;
}
/** Opções de uma trajetória (PATH2): a ponta de seta (arrow: false tira), a classe e o tamanho dela. */
export interface OpcoesCaminho extends OpcoesPrim {
  arrow?: boolean;
  acls?: string;
  asz?: number;
}
/** Os três semieixos de uma caixa (BOX): [direção, meia medida]. */
export type Eixos = [[V3, number], [V3, number], [V3, number]];

/** Músculos do estilo clássico (MUS em ./desenho.ts). */
export type IdMusculo =
  | 'pecClav' | 'pecStern' | 'deltAnt' | 'deltLat' | 'deltPost' | 'lats' | 'midTrap' | 'upTrap' | 'biceps' | 'triceps'
  | 'forearm' | 'quads' | 'hams' | 'glutes' | 'calf' | 'erect' | 'rectus' | 'obliq' | 'adutores';
/** Forma de um músculo clássico: polígono, círculo (c, r) ou traço grosso (a, b, w). */
export type FormaClassica =
  | V3[]
  | { c: V3; r: number; a?: undefined; b?: undefined; w?: undefined }
  | { a: V3; b: V3; w: number; c?: undefined; r?: undefined };
export type MusculoDoExercicio = [IdMusculo, Lados];

/* ================= exercício ================= */
/** Uma fase do ciclo: as poses-chave por onde passa, a duração (s) e o tipo ('hold', 'conc', 'ecc'). t0 vem de prep(). */
export interface Fase {
  path: string[];
  dur: number;
  kind: string;
  label: string;
  tempo: string;
  breath: string;
  t0: number;
}
/** Um erro animado: as mesmas poses-chave com alguns campos trocados. K (as poses completas) vem de prep(). */
export interface ErroAnimado {
  id: string;
  view: Vista;
  base?: Partial<Pose>;
  keys?: Record<string, Partial<Pose>>;
  K: Record<string, Pose>;
}
/** Torre da polia: base em [x, 0, z], ac = vetor da largura, out = vetor de frente, py = altura da polia. */
export interface Torre {
  x: number;
  z: number;
  ac: V3;
  out: V3;
  py: number;
}
/** Ponto que uma trajetória pode seguir: a cabeça, a base do pescoço, a pelve ou uma junta de um lado. */
export type PontoDaTrajetoria = 'Hc' | 'N' | 'P' | PontoDoLado;
/** Uma trajetória do modo Trajetória: [ponto, lado, rótulo]. */
export type Trajetoria = [PontoDaTrajetoria, Lado, string?];
/**
 * Um exercício animado, como o motor o usa depois de prep() e calib() (./cena.ts). Os arquivos de ./exercicios/ são do
 * port e não têm tipo; os campos marcados com "prep" e "calib" não existem neles e são preenchidos na inicialização.
 */
export interface Exercicio {
  id: string;
  views: Vista[];
  base: Partial<Pose>;
  keys: Record<string, Partial<Pose>>;
  seq: Fase[];
  /** As duas poses extremas (início e fim), para os fantasmas do modo Trajetória. */
  ext: [string, string];
  paths?: Partial<Record<Vista, Trajetoria[]>>;
  bounds?: Partial<Record<Vista, Limites>>;
  tower?: Torre;
  towers?: Torre[];
  noCable?: boolean;
  ropeAttach?: boolean;
  barAttach?: boolean;
  equip(sk: Esqueleto): void;
  guides?: Partial<Record<Vista, (this: Exercicio, sk: Esqueleto) => void>>;
  muscles: { p: MusculoDoExercicio[]; s: MusculoDoExercicio[] };
  errors: ErroAnimado[];
  /** prep: as poses-chave completas (base + chave). */
  K: Record<string, Pose>;
  /** prep: duração do ciclo (s). */
  T: number;
  /** Paleta do equipamento que está sendo desenhado: normal ou erro. */
  _pal?: 'n' | 'e';
  /** calib: menor comprimento de cada cabo ou elástico durante a medição (null fora dela). */
  _cab?: Record<string, number> | null;
  /** calib: comprimento de repouso de cada cabo ou elástico. */
  L0?: Record<string, number>;
  /** calib: faixa de subida da pilha de pesos no ciclo correto. */
  _liftRange?: [number, number];
  /** Menor e maior comprimento de cada fita de suspensão vistos na medição. */
  _fita?: Record<string, { min: number; max: number }>;
}

/* ================= estilos novos (./estilo/) ================= */
/** Acabamento A2 do boneco (./estilo/corpo.ts explica cada opção); 1 = ligado. */
export interface Acabamento {
  tronco1?: number;
  quadril?: number;
  folga?: number;
  mao?: number;
  conico?: number;
  fantasmaDif?: number;
  erroInvertido?: number;
  erroEquip?: number;
  rotulosFora?: number;
  /** Juntas marcadas (ex.: ['E']); [] = nenhuma; ausente = todas. */
  juntas?: string[];
  /** Erro pequeno demais para uma cadeia: 'hoje' = a figura do erro de antes; 'contorno' = a figura errada em contorno. */
  erroPequeno?: 'hoje' | 'contorno';
}
/** O texto de um rótulo guardado na prim (./contexto.ts): a âncora projetada, a posição final e o texto. */
export interface TextoDaPrim {
  ax: number;
  ay: number;
  x: number;
  y: number;
  cls: string;
  size: number;
  anchor: string;
  str: string;
}
