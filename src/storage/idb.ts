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

export const salvar = (estado: Estado) => set(CHAVE, estado);
export const apagar = () => del(CHAVE);

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
