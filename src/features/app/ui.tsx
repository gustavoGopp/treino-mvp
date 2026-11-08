import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { REGRAS, type Selo as TipoSelo } from '../../domain/regras';
import { PASSOS, primeiroPassoPendente, type PassoId } from '../../storage/esquema';
import { useApp } from './estado';
import { Folha } from './Folha';
import { carregarFontes, TEXTO_LEITURA, type Fonte } from '../../conteudo/fontes';

// Peças de interface comuns às telas do app (onboarding, programa, dados).

// A palavra que aparece na tela, curta e apagada (retorno do Gustavo, 06/11: "tem que ser uma coisa muito sutil").
// O nome completo fica no nome acessível e na folha.
const CURTO_SELO: Record<TipoSelo, string> = { robusta: 'robusta', moderada: 'moderada', 'um estudo': '1 estudo', consenso: 'consenso' };

const TEXTO_SELO: Record<TipoSelo, string> = {
  robusta: 'evidência robusta',
  moderada: 'evidência moderada',
  'um estudo': 'um estudo',
  consenso: 'consenso de especialistas',
};

// O que cada selo quer dizer (docs/pesquisa/00-metodo.md, tabela dos níveis), em palavras simples.
const SENTIDO_SELO: Record<TipoSelo, string> = {
  robusta: 'Várias meta-análises (ou uma grande, com ensaios) apontam na mesma direção.',
  moderada: 'Uma meta-análise, alguns ensaios coerentes ou um único grupo de pesquisa com resultados consistentes.',
  'um estudo': 'Um único ensaio, quase sempre com amostra pequena e curta duração.',
  consenso: 'Prática de treinadores e posicionamentos, sem ensaio que teste este número.',
};

/**
 * Selo de evidência de uma regra de docs/pesquisa/regras.md. A pílula mostra o nível; um toque abre uma folha com a
 * regra, o que o nível quer dizer e as fontes por extenso (src/conteudo/fontes.json, baixado só nessa hora).
 */
export function Selo({ id }: { id: string }) {
  const [aberto, setAberto] = useState(false);
  const regra = REGRAS[id];
  if (!regra) return null;
  const texto = TEXTO_SELO[regra.selo];
  return (
    <>
      <button type="button" className={`selo selo-${regra.selo.replace(' ', '-')}`} aria-label={`${texto}: ver de onde vem`} aria-haspopup="dialog" onClick={() => setAberto(true)}>
        {CURTO_SELO[regra.selo]}
      </button>
      {aberto && (
        <Folha titulo="De onde vem isto" aoFechar={() => setAberto(false)} livre={() => document.querySelector<HTMLElement>('.alerta-topo')}>
          <SeloFolha regra={regra} />
        </Folha>
      )}
    </>
  );
}

/**
 * "por quê?" (retorno do Gustavo, 06/11: menos texto na tela). A explicação e as regras saem da tela e ficam a um toque:
 * a folha mostra o texto de apoio da tela (se houver) e, para cada regra, o texto da regra, o selo e as fontes, como a
 * folha do selo. O texto da regra não muda; só muda de lugar.
 */
export function PorQue({ regras, titulo = 'Por quê', children }: { regras: string[]; titulo?: string; children?: ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const lista = regras.map((id) => REGRAS[id]).filter((r): r is (typeof REGRAS)[string] => !!r);
  return (
    <>
      <button type="button" className="porque" aria-haspopup="dialog" onClick={() => setAberto(true)}>
        por quê?
      </button>
      {aberto && (
        <Folha titulo={titulo} aoFechar={() => setAberto(false)} livre={() => document.querySelector<HTMLElement>('.alerta-topo')}>
          {children && <div className="porque-texto">{children}</div>}
          {lista.map((r) => (
            <SeloFolha key={r.id} regra={r} />
          ))}
        </Folha>
      )}
    </>
  );
}

function SeloFolha({ regra }: { regra: (typeof REGRAS)[string] }) {
  const [fontes, setFontes] = useState<Record<string, Fonte> | null | 'erro'>(null);
  useEffect(() => {
    let vivo = true;
    carregarFontes().then(
      (f) => vivo && setFontes(f),
      () => vivo && setFontes('erro'),
    );
    return () => {
      vivo = false;
    };
  }, []);
  const texto = TEXTO_SELO[regra.selo];
  return (
    <div className="selo-folha">
      <p className="regra">{regra.regra}</p>
      <p className="sentido">
        <b>{texto[0]!.toUpperCase() + texto.slice(1)}.</b> {SENTIDO_SELO[regra.selo]}
      </p>
      {regra.fontes.length > 0 && (
        <div>
          <p className="rotulo">Fontes</p>
          {fontes === null ? (
            <p role="status">Carregando as fontes…</p>
          ) : fontes === 'erro' ? (
            <p role="status">Não deu para carregar as fontes agora. As chaves são: {regra.fontes.join(', ')}.</p>
          ) : (
            <ol>
              {regra.fontes.map((k) => {
                const f = fontes[k];
                return (
                  <li key={k}>
                    {f ? f.citacao : k}
                    {f && (
                      <small>
                        {TEXTO_LEITURA[f.leitura]}
                        {f.link && (
                          <>
                            {' · '}
                            <a href={f.link} target="_blank" rel="noreferrer">
                              abrir a fonte
                            </a>
                          </>
                        )}
                      </small>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Topo das telas: marca e, à direita, um atalho opcional. Nas telas filhas (lote 5 do redesign: Evolução, Locais), o
 * "‹ Pai" ocupa o lugar da marca, e a barra de baixo continua com o pai aceso.
 */
export function Topo({ direita, voltar }: { direita?: ReactNode; voltar?: { para: string; rotulo: string } }) {
  return (
    <header className="top">
      <div className="brand">
        {voltar ? (
          <Link className="topo-volta" to={voltar.para}>
            ‹ {voltar.rotulo}
          </Link>
        ) : (
          <b>
            <Link to="/">treino-mvp</Link>
          </b>
        )}
        {direita}
      </div>
    </header>
  );
}

/**
 * Navegação fixa embaixo, ao alcance do polegar (design v2, item H): o treino, a semana e os dados.
 * Fica nas telas de início; no treino em andamento e no cadastro, não (ali a tela é uma tarefa só).
 */
export function NavInferior({ atual }: { atual: 'treino' | 'semana' | 'dados' }) {
  const item = (id: typeof atual, para: string, rotulo: string, d: string) => (
    <Link to={para} aria-current={atual === id ? 'page' : undefined}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={d} />
      </svg>
      {rotulo}
    </Link>
  );
  return (
    <nav className="nav-inferior" aria-label="Seções">
      {item('treino', '/programa', 'Treino', 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11')}
      {item('semana', '/semana', 'Semana', 'M4 5h16v15H4zM4 10h16M9 3v4M15 3v4')}
      {item('dados', '/dados', 'Meus dados', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0')}
    </nav>
  );
}

/**
 * Uma pergunta por vez (design v2, item B; GOV.UK "one thing per page"): a próxima pergunta só aparece depois da
 * resposta à anterior, e a tela rola até ela. Envolve a pergunta que acabou de aparecer.
 */
export function Revelar({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduz = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    ref.current?.scrollIntoView?.({ behavior: reduz ? 'auto' : 'smooth', block: 'nearest' });
  }, []);
  return (
    <div ref={ref} className="revelar">
      {children}
    </div>
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
  // lote 3 do redesign: "‹ Voltar" no alto e "Passo N de 4", sem contar a boas-vindas (que não é uma pergunta)
  const total = PASSOS.length - 1;
  return (
    <div className="wrap app">
      <Topo direita={estado.programa && !pendente ? <Link to="/programa">Meu programa</Link> : undefined} />
      <div className="progresso">
        <div className="progresso-linha">
          {anterior && (
            <Link className="volta-passo" to={anterior.rota} aria-label={`Voltar para ${anterior.titulo.toLowerCase()}`}>
              ‹ Voltar
            </Link>
          )}
          <span>
            Passo {indice} de {total}
          </span>
        </div>
        <div className="barra" aria-hidden="true">
          <i style={{ width: `${(indice / total) * 100}%` }} />
        </div>
      </div>
      <main className="conteudo">
        <Titulo>{titulo}</Titulo>
        {children}
      </main>
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
