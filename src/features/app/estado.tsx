import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { gerarPrograma, type Programa } from '../../domain/gerador';
import { estadoVazio, perfilDe, type Estado } from '../../storage/esquema';
import { apagar, carregar, pedirPersistencia, salvar } from '../../storage/idb';

// Estado do app: carregado do IndexedDB uma vez e salvo a cada mudança feita pela pessoa.
// Sem biblioteca de estado: um contexto e funções puras sobre o Estado.

type Contexto = {
  estado: Estado;
  carregado: boolean;
  /** Erro ao ler os dados guardados (ex.: formato inválido). Os dados não são apagados na carga. */
  erroCarga?: string;
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

  useEffect(() => {
    let vivo = true;
    carregar()
      .then((c) => {
        if (!vivo) return;
        atual.current = c.estado;
        setEstado(c.estado);
        setErroCarga(c.erro);
      })
      .catch(() => vivo && setErroCarga('Não foi possível ler os dados guardados neste aparelho.'))
      .finally(() => vivo && setCarregado(true));
    return () => {
      vivo = false;
    };
  }, []);

  const gravar = useCallback((novo: Estado) => {
    atual.current = novo;
    setEstado(novo);
    setErroCarga(undefined);
    salvar(novo).catch(() => setErroCarga('Não foi possível salvar neste aparelho. Exporte seus dados para não perdê-los.'));
    if (persistente === null) void pedirPersistencia().then(setPersistente);
  }, [persistente]);

  const valor = useMemo<Contexto>(
    () => ({
      estado,
      carregado,
      erroCarga,
      persistente,
      atualizar: (f) => gravar(f(atual.current)),
      substituir: gravar,
      limpar: async () => {
        await apagar();
        atual.current = estadoVazio();
        setEstado(atual.current);
        setErroCarga(undefined);
      },
    }),
    [estado, carregado, erroCarga, persistente, gravar],
  );
  // As telas só aparecem depois da carga: os formulários leem o estado salvo na primeira renderização.
  return <Ctx.Provider value={valor}>{carregado ? children : null}</Ctx.Provider>;
}

export function useApp(): Contexto {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp fora do EstadoProvider');
  return c;
}

/** Gera o programa com o perfil e o inventário atuais. Devolve null se falta algo ou se a triagem bloqueia. */
export function gerarDoEstado(e: Estado): Programa | null {
  const perfil = perfilDe(e);
  if (!perfil || !e.inventario) return null;
  const r = gerarPrograma(perfil, e.inventario);
  return r.status === 'ok' ? r.programa : null;
}

export const agoraIso = () => new Date().toISOString();

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
