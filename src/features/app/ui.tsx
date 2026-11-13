import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { SELOS, type Regra, type Selo as TipoSelo } from '../../domain/regras';
import { carregarRegras } from '../../domain/regras/carregar';
import { PASSOS, primeiroPassoPendente, type PassoId } from '../../storage/esquema';
import { useApp } from './estado';
import { Folha } from './Folha';
import { Icone, type NomeIcone } from './icones';
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
  const selo = SELOS[id];
  if (!selo) return null;
  const texto = TEXTO_SELO[selo];
  // Frases sobre como o app funciona (privacidade, onde os dados ficam, locais, registro): não são regra de treino, e a
  // palavra do nível ("consenso") solta ali não diz de quê. O selo mostra "fonte"; o nível continua na folha.
  const doApp = /^(privacidade|dados|local|registro)\./.test(id);
  return (
    <>
      <button type="button" className={`selo selo-${selo.replace(' ', '-')}`} aria-label={doApp ? 'ver de onde vem' : `${texto}: ver de onde vem`} aria-haspopup="dialog" onClick={() => setAberto(true)}>
        {doApp ? 'fonte' : CURTO_SELO[selo]}
      </button>
      {aberto && (
        <Folha titulo="De onde vem isto" aoFechar={() => setAberto(false)} livre={() => document.querySelector<HTMLElement>('.alerta-topo')}>
          <RegrasPorExtenso ids={[id]} />
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
  return (
    <>
      <button type="button" className="porque" aria-haspopup="dialog" onClick={() => setAberto(true)}>
        por quê?
      </button>
      {aberto && (
        <Folha titulo={titulo} aoFechar={() => setAberto(false)} livre={() => document.querySelector<HTMLElement>('.alerta-topo')}>
          {children && <div className="porque-texto">{children}</div>}
          <RegrasPorExtenso ids={regras.filter((id) => SELOS[id])} />
        </Folha>
      )}
    </>
  );
}

/** As regras por extenso, carregadas quando a folha abre (R5b: o texto das regras saiu do pacote inicial). */
function RegrasPorExtenso({ ids }: { ids: string[] }) {
  const [regras, setRegras] = useState<Record<string, Regra> | null | 'erro'>(null);
  useEffect(() => {
    let vivo = true;
    carregarRegras().then(
      (r) => vivo && setRegras(r),
      () => vivo && setRegras('erro'),
    );
    return () => {
      vivo = false;
    };
  }, []);
  if (regras === null) return <p role="status">Carregando a regra…</p>;
  if (regras === 'erro')
    return (
      <>
        <p role="status">Não deu para carregar a regra agora. Tente de novo com internet.</p>
        <button type="button" className="btn sec pequeno" onClick={() => window.location.reload()}>
          Recarregar o app
        </button>
      </>
    );
  return (
    <>
      {ids.map((id) => regras[id] && <SeloFolha key={id} regra={regras[id]!} />)}
    </>
  );
}

function SeloFolha({ regra }: { regra: Regra }) {
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
  // Frontend novo (12/11/2026): a faixa com o nome do app saiu das telas. Sem "voltar" e sem atalho, não há topo.
  if (!voltar && !direita) return null;
  return (
    <header className="top">
      <div className="brand">
        {voltar && (
          <Link className="topo-volta" to={voltar.para}>
            <Icone nome="chevron-left" />
            {voltar.rotulo}
          </Link>
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
  const item = (id: typeof atual, para: string, rotulo: string, icone: NomeIcone) => (
    <Link to={para} aria-current={atual === id ? 'page' : undefined}>
      <Icone nome={icone} />
      {rotulo}
    </Link>
  );
  return (
    <nav className="nav-inferior" aria-label="Seções">
      {item('treino', '/programa', 'Treino', 'dumbbell')}
      {item('semana', '/semana', 'Semana', 'calendar-days')}
      {item('dados', '/dados', 'Meus dados', 'user')}
    </nav>
  );
}

/**
 * Uma pergunta por vez (design v2, item B; GOV.UK "one thing per page"): a próxima pergunta só aparece depois da
 * resposta à anterior, e a tela rola até ela. Envolve a pergunta que acabou de aparecer.
 */
export function Revelar({ children, semRolar }: { children: ReactNode; semRolar?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // `semRolar`: a tela já abre com todas as perguntas (edição a partir de Meus dados) e começa do topo
    if (semRolar) return;
    const reduz = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    ref.current?.scrollIntoView?.({ behavior: reduz ? 'auto' : 'smooth', block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div ref={ref} className="revelar">
      {children}
    </div>
  );
}

/** Título que recebe o foco quando a tela abre (leitores de tela anunciam a troca de tela). */
export function Titulo({ children, soLeitor }: { children: ReactNode; soLeitor?: boolean }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  // o nome da tela vai para o título do documento (leitor de tela, histórico, multitarefa)
  useEffect(() => {
    const nome = ref.current?.textContent?.trim();
    if (nome) document.title = `${nome} · treino-mvp`;
  });
  // `soLeitor`: o nome da tela fica para o leitor de tela, e o título à vista é o conteúdo dela (o treino de hoje, o
  // número da semana), que vem logo em seguida, num h2. Frontend novo: título específico, não o nome do tipo da tela.
  return (
    <h1 ref={ref} tabIndex={-1} className={soLeitor ? 'titulo sr' : 'titulo'}>
      {children}
    </h1>
  );
}

/**
 * Moldura de um passo do onboarding: barra de progresso "Passo X de N" (padrão do GOV.UK) e guarda de rota.
 * Se um passo anterior está pendente, manda a pessoa para ele.
 */
export function Passo({
  id,
  titulo,
  children,
  deDados,
  aoVoltar,
}: {
  id: PassoId;
  titulo: string;
  children: ReactNode;
  deDados?: boolean;
  /** uma subtela do passo (as perguntas completas da triagem): o "Voltar" volta à tela anterior do próprio passo */
  aoVoltar?: () => void;
}) {
  const { estado, carregado } = useApp();
  if (!carregado) return null;
  const indice = PASSOS.findIndex((p) => p.id === id);
  const pendente = primeiroPassoPendente(estado);
  if (pendente && PASSOS.findIndex((p) => p.id === pendente.id) < indice) return <Navigate to={pendente.rota} replace />;
  const anterior = PASSOS[indice - 1];
  // lote 3 do redesign: "‹ Voltar" no alto e "Passo N de 4", sem contar a boas-vindas (que não é uma pergunta)
  const total = PASSOS.length - 1;
  // Aberto por "Meus dados" (com o programa já feito), o passo é uma tela de edição: sem "Passo N de 4" e com a volta
  // para Meus dados, não para o passo anterior do cadastro.
  if (deDados && estado.programa && !pendente)
    return (
      <div className="wrap app">
        <Topo voltar={{ para: '/dados', rotulo: 'Meus dados' }} />
        <main className="conteudo">
          <Titulo>{titulo}</Titulo>
          {children}
        </main>
      </div>
    );
  return (
    <div className="wrap app">
      <Topo direita={estado.programa && !pendente ? <Link to="/programa">Meu programa</Link> : undefined} />
      <div className="progresso">
        <div className="progresso-linha">
          {aoVoltar ? (
            <button type="button" className="volta-passo" onClick={aoVoltar}>
              <Icone nome="chevron-left" />
              Voltar
            </button>
          ) : (
            anterior && (
              <Link className="volta-passo" to={anterior.rota} aria-label={`Voltar para ${anterior.titulo.toLowerCase()}`}>
                <Icone nome="chevron-left" />
                Voltar
              </Link>
            )
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
