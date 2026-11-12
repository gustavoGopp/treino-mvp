import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { gerarPrograma, type Programa, type Resultado } from '../../domain/gerador';
import { estadoVazio, inventarioPrincipal, localPrincipal, perfilDe, type Estado } from '../../storage/esquema';
import { anotarPendente, apagar, carregar, guardarIlegivel, pedirPersistencia, salvar } from '../../storage/idb';

// Estado do app: carregado do IndexedDB uma vez e salvo a cada mudança feita pela pessoa.
// Sem biblioteca de estado: um contexto e funções puras sobre o Estado.

type Contexto = {
  estado: Estado;
  carregado: boolean;
  /** Erro ao ler os dados guardados (ex.: formato inválido). Os dados não são apagados na carga. */
  erroCarga?: string;
  /** A carga falhou e nada foi salvo por cima ainda: o que está guardado é o dado antigo, que o app não leu. */
  cargaFalhou: boolean;
  /** A última gravação foi recusada pelo aparelho (sem espaço, aba anônima): o que está na tela pode se perder. */
  erroAoSalvar: boolean;
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
  const [erroAoSalvar, setErroAoSalvar] = useState(false);
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
        const lido = comProgramaQueFalta(c.estado, agoraIso());
        atual.current = lido;
        setEstado(lido);
        setErroCarga(c.erro);
        if (c.naoSalvo) setErroAoSalvar(true);
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
    // Na hora do toque, antes de qualquer espera: se a página sair agora, a carga seguinte recupera daqui.
    const anotacao = anotarPendente(novo);
    if (falhou.current) {
      // O dado antigo (ilegível) é guardado à parte antes de ser trocado; se nem isso der, nada é salvo por cima dele.
      falhou.current = false;
      setCargaFalhou(false);
      // Se a cópia falhar, a gravação desta vez não acontece e a próxima tenta copiar de novo.
      fila.current = guardarIlegivel().catch((e: unknown) => {
        marcarFalha();
        throw e;
      });
    }
    // Uma gravação recusada não trava as seguintes: cada uma tenta de novo, e o aviso some quando uma der certo.
    fila.current = fila.current.then(() => salvar(novo, anotacao)).then(
      () => setErroAoSalvar(false),
      () => setErroAoSalvar(true),
    );
    if (persistente === null) void pedirPersistencia().then(setPersistente);
  }, [persistente]);

  const valor = useMemo<Contexto>(
    () => ({
      estado,
      carregado,
      erroCarga,
      cargaFalhou,
      erroAoSalvar,
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
        setErroAoSalvar(false);
      },
    }),
    [estado, carregado, erroCarga, cargaFalhou, erroAoSalvar, persistente, gravar],
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
  const r = resultadoDoEstado(e);
  return r?.status === 'ok' ? r.programa : null;
}

/** O resultado do gerador para o cadastro atual (ok, bloqueado pela triagem ou sem exercício possível); null se falta algo. */
export function resultadoDoEstado(e: Estado): Resultado | null {
  const perfil = perfilDe(e);
  const inventario = inventarioPrincipal(e);
  return perfil && inventario ? gerarPrograma(perfil, inventario) : null;
}

/** Programa salvo gerado de novo, montado para o local principal (R1b); se não dá para gerar, fica o anterior. */
export function comProgramaNovo(e: Estado, agora: string, semAnterior = false): Estado {
  // Com um treino aberto, o programa salvo não muda: o treino lê dele as séries e o descanso de cada vaga, e um
  // exercício que saísse do dia passava a usar os da 1ª vaga. A mudança do cadastro fica guardada, e a tela do
  // programa oferece "Atualizar" quando o treino terminar.
  if (e.sessaoAtual) return e;
  const p = gerarDoEstado(e);
  const local = localPrincipal(e);
  if (!p) return semAnterior ? { ...e, programa: undefined } : e;
  return { ...e, programa: { programa: p, geradoEm: agora, ...(local ? { localId: local.id } : {}) } };
}

/**
 * Cadastro completo e nenhum programa salvo: acontece quando o programa guardado citava um exercício que saiu da
 * biblioteca (storage/ids.ts). O programa é derivado do cadastro, então é gerado de novo ao abrir, mesmo com um treino
 * aberto (não há programa antigo para proteger). Com a triagem bloqueando, continua sem programa.
 */
export function comProgramaQueFalta(e: Estado, agora: string): Estado {
  if (e.programa) return e;
  const p = gerarDoEstado(e);
  const local = localPrincipal(e);
  return p ? { ...e, programa: { programa: p, geradoEm: agora, ...(local ? { localId: local.id } : {}) } } : e;
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
