import { del, get, set } from 'idb-keyval';
import { estadoVazio, type Estado } from './esquema';
import { migrar } from './migracao';

// IndexedDB (idb-keyval). Uma chave só: o estado inteiro, pequeno e versionado.
const CHAVE = 'estado';

export type Carga = { estado: Estado; erro?: string; /** O estado veio do diário e o IndexedDB recusou a gravação. */ naoSalvo?: boolean };

export async function carregar(): Promise<Carga> {
  const pendente = await recuperarPendente();
  if (pendente) return pendente;
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

// A gravação no IndexedDB é assíncrona: quem recarrega ou fecha a aba logo depois do toque perdia a última mudança
// (o "sim" da triagem refeita não pausava o programa). Antes de gravar, o estado vai, de forma síncrona, para um
// diário no localStorage do próprio aparelho; o diário some quando o IndexedDB confirma, e a carga seguinte recupera
// o que tiver ficado nele. Se o localStorage não existe ou está cheio, vale só o IndexedDB, como antes.
const CHAVE_PENDENTE = 'treino-mvp:estado-pendente';
let serie = 0;

const diario = (): Storage | undefined => {
  try {
    return typeof localStorage === 'undefined' ? undefined : localStorage;
  } catch {
    return undefined;
  }
};

/** Anota o estado no diário, na hora (síncrono). Devolve o número desta anotação, para `salvar` saber se ainda é a última. */
export function anotarPendente(estado: Estado): number {
  serie += 1;
  try {
    diario()?.setItem(CHAVE_PENDENTE, JSON.stringify(estado));
  } catch {
    // sem espaço ou bloqueado: segue só com o IndexedDB
  }
  return serie;
}

function limparPendente() {
  try {
    diario()?.removeItem(CHAVE_PENDENTE);
  } catch {
    // nada a limpar
  }
}

/** O estado que ficou no diário (a página saiu antes de o IndexedDB confirmar), já gravado no lugar certo; ou undefined. */
async function recuperarPendente(): Promise<Carga | undefined> {
  let texto: string | null | undefined;
  try {
    texto = diario()?.getItem(CHAVE_PENDENTE);
  } catch {
    return undefined;
  }
  if (!texto) return undefined;
  let bruto: unknown;
  try {
    bruto = JSON.parse(texto);
  } catch {
    limparPendente();
    return undefined;
  }
  const r = migrar(bruto);
  if (!r.ok) {
    limparPendente();
    return undefined;
  }
  try {
    // Se o que está no IndexedDB é um dado que o app não lê, ele vai para a reserva antes de ser trocado.
    const guardado = await get(CHAVE);
    if (guardado !== undefined && !migrar(guardado).ok) await set(CHAVE_ILEGIVEL, guardado);
    await set(CHAVE, r.estado);
    limparPendente();
  } catch {
    // o IndexedDB recusou: o diário fica, e a tela avisa que nada foi salvo
    return { estado: r.estado, naoSalvo: true };
  }
  return { estado: r.estado };
}

/** Grava o estado. `anotacao` é o número devolvido por `anotarPendente`, quando quem chama já anotou no toque. */
export async function salvar(estado: Estado, anotacao = anotarPendente(estado)): Promise<void> {
  await set(CHAVE, estado);
  if (anotacao === serie) limparPendente();
}
export const apagar = () => {
  serie += 1;
  limparPendente();
  return Promise.all([del(CHAVE), del(CHAVE_ILEGIVEL)]).then(() => undefined);
};

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
