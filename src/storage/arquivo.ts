import { migrar, type ResultadoMigracao } from './migracao';

// Exportação e importação em JSON. O arquivo fica com a pessoa; nada sai do aparelho sem ela.
export const APP_ID = 'treino-mvp';

/** `estado` é o Estado do app ou, na tela de erro, o que estiver guardado (mesmo ilegível): a importação migra depois. */
export function exportarJson(estado: unknown, exportadoEm: string): string {
  return JSON.stringify({ app: APP_ID, exportadoEm, estado }, null, 2);
}

export function importarJson(texto: string): ResultadoMigracao {
  let bruto: unknown;
  try {
    bruto = JSON.parse(texto);
  } catch {
    return { ok: false, erro: 'O arquivo não é um JSON válido.' };
  }
  if (!bruto || typeof bruto !== 'object' || (bruto as { app?: unknown }).app !== APP_ID)
    return { ok: false, erro: 'Este arquivo não foi exportado pelo treino-mvp.' };
  return migrar((bruto as { estado?: unknown }).estado);
}

export const nomeDoArquivo = (data: Date) => `treino-mvp-${data.toISOString().slice(0, 10)}.json`;
