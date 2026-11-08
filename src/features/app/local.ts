// Conveniências do aparelho guardadas no localStorage, fora do estado versionado (src/storage/), como o convite da foto.
// Nada daqui é dado de saúde. "Apagar tudo" em Meus dados apaga também estas chaves.

export const LOCAL = {
  /** Código de convite da foto (M4). */
  convite: 'treino-convite',
  /** Id aleatório do aparelho, só para o limite diário da foto. */
  aparelho: 'treino-aparelho',
  /** Data em que a pessoa autorizou o envio das fotos à Anthropic (privacidade.foto). */
  fotoConsentimento: 'treino-foto-consentimento',
  /** Data da última cópia exportada (dados.copia). */
  ultimaCopia: 'treino-ultima-copia',
  /** Data do último "Agora não" no lembrete de cópia (dados.copia). */
  copiaAdiada: 'treino-copia-adiada',
  /** Data do "Entendi" no aviso de instalar no iPhone (dados.instalar-iphone). */
  avisoInstalar: 'treino-aviso-instalar',
} as const;

export type ChaveLocal = (typeof LOCAL)[keyof typeof LOCAL];

export function lerLocal(k: ChaveLocal): string {
  try {
    return localStorage.getItem(k) ?? '';
  } catch {
    return '';
  }
}

export function gravarLocal(k: ChaveLocal, v: string): void {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* sem armazenamento: segue sem lembrar */
  }
}

export function apagarLocal(k: ChaveLocal): void {
  try {
    localStorage.removeItem(k);
  } catch {
    /* nada a apagar */
  }
}

/** "Apagar tudo": tira do aparelho também as conveniências guardadas fora do estado. */
export function apagarTodosLocais(): void {
  for (const k of Object.values(LOCAL)) apagarLocal(k);
}

/** Data curta em pt-BR (dd/mm/aaaa) de uma data ISO; vazio se inválida. */
export function dataCurta(iso: string): string {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? '' : new Date(t).toLocaleDateString('pt-BR');
}
