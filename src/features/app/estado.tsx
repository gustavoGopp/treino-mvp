import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { gerarPrograma, type Programa } from '../../domain/gerador';
import { estadoVazio, inventarioPrincipal, localPrincipal, perfilDe, type Estado } from '../../storage/esquema';
import { apagar, carregar, guardarIlegivel, pedirPersistencia, salvar } from '../../storage/idb';

// Estado do app: carregado do IndexedDB uma vez e salvo a cada mudança feita pela pessoa.
// Sem biblioteca de estado: um contexto e funções puras sobre o Estado.

type Contexto = {
  estado: Estado;
  carregado: boolean;
  /** Erro ao ler os dados guardados (ex.: formato inválido). Os dados não são apagados na carga. */
  erroCarga?: string;
  /** A carga falhou e nada foi salvo por cima ainda: o que está guardado é o dado antigo, que o app não leu. */
  cargaFalhou: boolean;
  /** null = ainda não pediu; true/false = resposta do navegador. */
  persistente: boolean | null;
  atualizar: (f: (e: Estado) => Estado) => void;
  substituir: (e: Estado) => void;
  limpar: () => Promise<void>;
};

const Ctx = createContext<Contexto | null>(null);

export function EstadoProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<Estado>(estadoVazio);
  const [carregado, setCarregado] = useState(false);
  const [erroCarga, setErroCarga] = useState<string>();
  const [persistente, setPersistente] = useState<boolean | null>(null);
  const atual = useRef(estado);
  const [cargaFalhou, setCargaFalhou] = useState(false);
  const falhou = useRef(false);
  // As gravações saem em fila: depois de uma carga com erro, a primeira espera a cópia do dado antigo (guardarIlegivel).
  const fila = useRef<Promise<void>>(Promise.resolve());
  const marcarFalha = () => {
    falhou.current = true;
    setCargaFalhou(true);
  };

  useEffect(() => {
    let vivo = true;
    carregar()
      .then((c) => {
        if (!vivo) return;
        atual.current = c.estado;
        setEstado(c.estado);
        setErroCarga(c.erro);
        if (c.erro) marcarFalha();
      })
      .catch(() => {
        if (!vivo) return;
        setErroCarga('Não foi possível ler os dados guardados neste aparelho.');
        marcarFalha();
      })
      .finally(() => vivo && setCarregado(true));
    return () => {
      vivo = false;
    };
  }, []);

  const gravar = useCallback((novo: Estado) => {
    atual.current = novo;
    setEstado(novo);
    setErroCarga(undefined);
    if (falhou.current) {
      // O dado antigo (ilegível) é guardado à parte antes de ser trocado; se nem isso der, nada é salvo por cima dele.
      falhou.current = false;
      setCargaFalhou(false);
      fila.current = guardarIlegivel();
    }
    fila.current = fila.current.then(() => salvar(novo));
    fila.current.catch(() => setErroCarga('Não foi possível salvar neste aparelho. Exporte seus dados para não perdê-los.'));
    if (persistente === null) void pedirPersistencia().then(setPersistente);
  }, [persistente]);

  const valor = useMemo<Contexto>(
    () => ({
      estado,
      carregado,
      erroCarga,
      cargaFalhou,
      persistente,
      atualizar: (f) => gravar(f(atual.current)),
      substituir: gravar,
      limpar: async () => {
        await apagar();
        falhou.current = false;
        setCargaFalhou(false);
        fila.current = Promise.resolve();
        atual.current = estadoVazio();
        setEstado(atual.current);
        setErroCarga(undefined);
      },
    }),
    [estado, carregado, erroCarga, cargaFalhou, persistente, gravar],
  );
  // As telas só aparecem depois da carga: os formulários leem o estado salvo na primeira renderização.
  return <Ctx.Provider value={valor}>{carregado ? children : null}</Ctx.Provider>;
}

export function useApp(): Contexto {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp fora do EstadoProvider');
  return c;
}

/** Gera o programa com o perfil e o inventário do local principal. Devolve null se falta algo ou se a triagem bloqueia. */
export function gerarDoEstado(e: Estado): Programa | null {
  const perfil = perfilDe(e);
  const inventario = inventarioPrincipal(e);
  if (!perfil || !inventario) return null;
  const r = gerarPrograma(perfil, inventario);
  return r.status === 'ok' ? r.programa : null;
}

/** Programa salvo gerado de novo, montado para o local principal (R1b); se não dá para gerar, fica o anterior. */
export function comProgramaNovo(e: Estado, agora: string, semAnterior = false): Estado {
  const p = gerarDoEstado(e);
  const local = localPrincipal(e);
  if (!p) return semAnterior ? { ...e, programa: undefined } : e;
  return { ...e, programa: { programa: p, geradoEm: agora, ...(local ? { localId: local.id } : {}) } };
}

export const agoraIso = () => new Date().toISOString();
/** Fuso do aparelho em minutos somados ao UTC (Brasília: −180), para a semana de segunda a domingo do calendário local. */
export const fusoDoAparelho = () => -new Date().getTimezoneOffset();

/**
 * Compara dois valores JSON sem depender da ordem das chaves nem de campos undefined.
 * O zod devolve as chaves na ordem do esquema, então o programa salvo e o gerado agora podem diferir só na ordem.
 */
export function mesmoConteudo(a: unknown, b: unknown): boolean {
  const canon = (v: unknown): unknown =>
    Array.isArray(v)
      ? v.map(canon)
      : v && typeof v === 'object'
        ? Object.fromEntries(
            Object.keys(v)
              .filter((k) => (v as Record<string, unknown>)[k] !== undefined)
              .sort()
              .map((k) => [k, canon((v as Record<string, unknown>)[k])]),
          )
        : v;
  return JSON.stringify(canon(a)) === JSON.stringify(canon(b));
}
