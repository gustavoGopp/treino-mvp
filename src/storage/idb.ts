import { del, get, set } from 'idb-keyval';
import { estadoVazio, type Estado } from './esquema';
import { migrar } from './migracao';

// IndexedDB (idb-keyval). Uma chave só: o estado inteiro, pequeno e versionado.
const CHAVE = 'estado';

export type Carga = { estado: Estado; erro?: string };

export async function carregar(): Promise<Carga> {
  const bruto = await get(CHAVE);
  if (bruto === undefined) return { estado: estadoVazio() };
  const r = migrar(bruto);
  // Dado ilegível não é apagado na carga: a pessoa vê o erro e pode importar um backup antes de mexer em algo.
  return r.ok ? { estado: r.estado } : { estado: estadoVazio(), erro: r.erro };
}

/**
 * O que está guardado, sem migrar nem validar: a tela de erro exporta daqui, mesmo que o app não consiga mais ler o dado.
 * Devolve undefined se não há nada guardado.
 */
export const lerBruto = (): Promise<unknown> => get(CHAVE);

export const salvar = (estado: Estado) => set(CHAVE, estado);
export const apagar = () => Promise.all([del(CHAVE), del(CHAVE_ILEGIVEL)]).then(() => undefined);

// Quando a carga falha (dado ilegível), o app abre vazio e o primeiro "salvar" trocaria o que estava guardado pelo
// estado vazio: o histórico inteiro sumia num toque. Antes desse primeiro salvar, o dado antigo vai para esta chave.
const CHAVE_ILEGIVEL = 'estado-ilegivel';

/** Copia o que está guardado (sem validar) para a chave de reserva. Se a leitura falhar, rejeita: nada é sobrescrito. */
export async function guardarIlegivel(): Promise<void> {
  const bruto = await get(CHAVE);
  if (bruto !== undefined) await set(CHAVE_ILEGIVEL, bruto);
}

/** O dado antigo que o app não conseguiu ler e guardou antes de salvar por cima; undefined se não há. */
export const lerIlegivel = (): Promise<unknown> => get(CHAVE_ILEGIVEL);

/**
 * Pede ao navegador para não apagar os dados por falta de espaço (docs/pesquisa/09-decisoes-m3.md, seção 5).
 * Devolve se o armazenamento ficou persistente; nunca falha.
 */
export async function pedirPersistencia(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false;
    return (await navigator.storage.persisted()) || (await navigator.storage.persist());
  } catch {
    return false;
  }
}

/** Só consulta, sem pedir (dados.persistente): true/false, ou null se o navegador não tem a API. */
export async function consultarPersistencia(): Promise<boolean | null> {
  try {
    if (!navigator.storage?.persisted) return null;
    return await navigator.storage.persisted();
  } catch {
    return null;
  }
}
