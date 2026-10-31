import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { REGRAS, type Selo as TipoSelo } from '../../domain/regras';
import { PASSOS, primeiroPassoPendente, type PassoId } from '../../storage/esquema';
import { useApp } from './estado';

// Peças de interface comuns às telas do app (onboarding, programa, dados).

const TEXTO_SELO: Record<TipoSelo, string> = {
  robusta: 'evidência robusta',
  moderada: 'evidência moderada',
  'um estudo': 'um estudo',
  consenso: 'consenso de especialistas',
};

/** Selo de evidência de uma regra de docs/pesquisa/regras.md. */
export function Selo({ id }: { id: string }) {
  const regra = REGRAS[id];
  if (!regra) return null;
  return (
    <span className={`selo selo-${regra.selo.replace(' ', '-')}`} title={regra.regra}>
      {TEXTO_SELO[regra.selo]}
    </span>
  );
}

/** Topo das telas: marca e, à direita, um atalho opcional. */
export function Topo({ direita }: { direita?: ReactNode }) {
  return (
    <header className="top">
      <div className="brand">
        <b>
          <Link to="/">treino-mvp</Link>
        </b>
        {direita}
      </div>
    </header>
  );
}

/** Título que recebe o foco quando a tela abre (leitores de tela anunciam a troca de tela). */
export function Titulo({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <h1 ref={ref} tabIndex={-1} className="titulo">
      {children}
    </h1>
  );
}

/**
 * Moldura de um passo do onboarding: barra de progresso "Passo X de N" (padrão do GOV.UK) e guarda de rota.
 * Se um passo anterior está pendente, manda a pessoa para ele.
 */
export function Passo({ id, titulo, children }: { id: PassoId; titulo: string; children: ReactNode }) {
  const { estado, carregado } = useApp();
  if (!carregado) return null;
  const indice = PASSOS.findIndex((p) => p.id === id);
  const pendente = primeiroPassoPendente(estado);
  if (pendente && PASSOS.findIndex((p) => p.id === pendente.id) < indice) return <Navigate to={pendente.rota} replace />;
  const anterior = PASSOS[indice - 1];
  return (
    <div className="wrap app">
      <Topo direita={estado.programa && !pendente ? <Link to="/programa">Meu programa</Link> : undefined} />
      <div className="progresso">
        <span>
          Passo {indice + 1} de {PASSOS.length}
        </span>
        <div className="barra" aria-hidden="true">
          <i style={{ width: `${((indice + 1) / PASSOS.length) * 100}%` }} />
        </div>
      </div>
      <main className="conteudo">
        <Titulo>{titulo}</Titulo>
        {children}
      </main>
      {anterior && (
        <Link className="voltar" to={anterior.rota}>
          Voltar para {anterior.titulo.toLowerCase()}
        </Link>
      )}
    </div>
  );
}

/** Grupo de opções exclusivas (rádio), sem nada pré-selecionado. */
export function Escolha<T extends string | number>({
  legenda,
  ajuda,
  opcoes,
  valor,
  aoMudar,
  erro,
  nome,
  linha,
}: {
  legenda: ReactNode;
  ajuda?: ReactNode;
  opcoes: readonly { id: T; texto: ReactNode }[];
  valor: T | undefined;
  aoMudar: (v: T) => void;
  erro?: string;
  nome?: string;
  linha?: boolean;
}) {
  const auto = useId();
  const n = nome ?? auto;
  return (
    <fieldset className={`campo${erro ? ' com-erro' : ''}`} aria-invalid={erro ? true : undefined} aria-describedby={erro ? `${n}-erro` : undefined}>
      <legend>{legenda}</legend>
      {ajuda && <p className="ajuda">{ajuda}</p>}
      {erro && (
        <p className="erro" id={`${n}-erro`}>
          {erro}
        </p>
      )}
      <div className={linha ? 'opcoes linha' : 'opcoes'}>
        {opcoes.map((o) => (
          <label key={String(o.id)} className="opcao">
            <input type="radio" name={n} checked={valor === o.id} onChange={() => aoMudar(o.id)} />
            <span>{o.texto}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Caixa de seleção com área de toque grande. */
export function Marcar({ marcado, aoMudar, children }: { marcado: boolean; aoMudar: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="opcao">
      <input type="checkbox" checked={marcado} onChange={(e) => aoMudar(e.target.checked)} />
      <span>{children}</span>
    </label>
  );
}

/** Campo numérico com rótulo e texto de ajuda sempre visíveis (sem placeholder: docs/pesquisa/09-decisoes-m3.md, seção 7). */
export function Numero({
  rotulo,
  ajuda,
  valor,
  aoMudar,
  erro,
  min,
  max,
  passo,
  sufixo,
}: {
  rotulo: ReactNode;
  ajuda?: ReactNode;
  valor: string;
  aoMudar: (v: string) => void;
  erro?: string;
  min?: number;
  max?: number;
  passo?: number;
  sufixo?: string;
}) {
  const id = useId();
  const desc = [ajuda ? `${id}-ajuda` : '', erro ? `${id}-erro` : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div className={`campo${erro ? ' com-erro' : ''}`}>
      <label htmlFor={id} className="rotulo">
        {rotulo}
      </label>
      {ajuda && (
        <p className="ajuda" id={`${id}-ajuda`}>
          {ajuda}
        </p>
      )}
      {erro && (
        <p className="erro" id={`${id}-erro`}>
          {erro}
        </p>
      )}
      <div className="numero">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={valor}
          min={min}
          max={max}
          step={passo ?? 'any'}
          onChange={(e) => aoMudar(e.target.value)}
          aria-invalid={erro ? true : undefined}
          aria-describedby={desc}
        />
        {sufixo && <span>{sufixo}</span>}
      </div>
    </div>
  );
}

/** Lista de erros no topo do formulário, anunciada ao aparecer. */
export function Erros({ erros }: { erros: string[] }) {
  if (!erros.length) return null;
  return (
    <div className="caixa-erro" role="alert">
      <b>Falta pouco:</b>
      <ul>
        {erros.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  );
}

export const numeroOu = (s: string): number | undefined => {
  if (s.trim() === '') return undefined;
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : undefined;
};
