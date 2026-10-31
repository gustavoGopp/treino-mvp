import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { BIBLIOTECA, type Musculo } from '../../domain/biblioteca';
import { NOME_MUSCULO, type ExercicioPrescrito, type Programa as TipoPrograma } from '../../domain/gerador';
import { opcoesDeAjuste, type Opcao } from '../../domain/gerador/opcoes';
import { NOME_NIVEL } from '../../domain/nivel';
import { avaliarTriagem } from '../../domain/triagem';
import { perfilDe, primeiroPassoPendente, type Estado } from '../../storage/esquema';
import { agoraIso, gerarDoEstado, mesmoConteudo, useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';
import { Miniatura } from './Miniatura';

// Tela do treino: vai direto ao que importa (o treino de cada dia, com a imagem de cada exercício e
// séries × repetições em destaque). Ajustes, avisos e o porquê ficam um toque abaixo. Nada muda sem a escolha da pessoa.

const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const tempo = (seg: number) => (seg % 60 ? `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}` : `${seg / 60} min`);
const faixa = ([a, b]: [number, number]) => (a === b ? `${a}` : `${a}–${b}`);
const musculos = (ms: readonly Musculo[]) => ms.map((m) => NOME_MUSCULO[m]).join(', ');

export function Programa() {
  const { estado, atualizar } = useApp();
  const [aviso, setAviso] = useState('');
  const [diaSel, setDiaSel] = useState(0);
  const [verAjustes, setVerAjustes] = useState(false);
  const perfil = useMemo(() => perfilDe(estado), [estado]);
  const opcoes = useMemo(() => (perfil && estado.inventario ? opcoesDeAjuste(perfil, estado.inventario) : []), [perfil, estado.inventario]);
  const atualizado = useMemo(() => gerarDoEstado(estado), [estado]);

  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;

  const triagem = avaliarTriagem(perfil!.triagem);
  const salvo = estado.programa?.programa;

  if (triagem.bloqueado || !salvo) {
    return (
      <div className="wrap app">
        <Topo direita={<Link to="/dados">Meus dados</Link>} />
        <main className="conteudo">
          <Titulo>Programa pausado</Titulo>
          <div className="warnbox">
            {triagem.mensagem} <Selo id={triagem.regraId} />
          </div>
          <Link className="btn" to="/comecar/triagem">
            Rever a triagem
          </Link>
        </main>
      </div>
    );
  }

  const versaoNova = !!atualizado && !mesmoConteudo(atualizado, salvo);
  const regerar = (e: Estado): Estado => {
    const p = gerarDoEstado(e);
    return { ...e, programa: p ? { programa: p, geradoEm: agoraIso() } : e.programa };
  };

  const escolher = (o: Opcao) => {
    setVerAjustes(false);
    if (o.id === 'manter') {
      atualizar((s) => ({ ...s, ajustes: { recolhido: true } }));
      setAviso('Programa mantido.');
      return;
    }
    atualizar((s) =>
      regerar({
        ...s,
        rotina: { diasSemana: o.perfil.diasSemana, minutosSessao: o.perfil.minutosSessao, prioridades: o.perfil.prioridades },
        ajustes: undefined,
      }),
    );
    setDiaSel(0);
    setAviso(`Programa gerado de novo: ${o.titulo.charAt(0).toLowerCase() + o.titulo.slice(1)}.`);
  };

  const dia = salvo.dias[Math.min(diaSel, salvo.dias.length - 1)]!;
  const abaixo = salvo.avisos.filter((a) => a.texto.startsWith('Abaixo da meta')).length;
  const faseAtual = salvo.fases[0];

  return (
    <div className="wrap app">
      <Topo direita={<Link to="/dados">Meus dados</Link>} />
      <main className="conteudo treino">
        <div className="cabeca-treino">
          <Titulo>Seu treino</Titulo>
          <ul className="fichas" aria-label="Resumo">
            <li>{perfil!.diasSemana}x por semana</li>
            <li>até {perfil!.minutosSessao} min</li>
            <li>{NOME_NIVEL[perfil!.nivel]}</li>
          </ul>
        </div>
        <p role="status" className="status">
          {aviso}
        </p>

        {versaoNova && (
          <div className="faixa destaque">
            <span>Há uma versão nova do seu programa.</span>
            <button type="button" className="btn pequeno" onClick={() => { atualizar(regerar); setAviso('Programa atualizado com as regras novas.'); }}>
              Atualizar
            </button>
          </div>
        )}

        {opcoes.length > 0 && !estado.ajustes?.recolhido && (
          <div className="faixa">
            <span>
              {abaixo ? 'Alguns músculos ficaram abaixo da meta.' : 'Algum treino passa do tempo.'} Dá para ajustar.
            </span>
            <button type="button" className="btn sec pequeno" aria-expanded={verAjustes} onClick={() => setVerAjustes((v) => !v)}>
              {verAjustes ? 'Fechar' : 'Ver opções'}
            </button>
          </div>
        )}
        {verAjustes && <Ajustes opcoes={opcoes} escolher={escolher} />}

        {faseAtual && (
          <p className="fase">
            <b>{/^\d/.test(faseAtual.semanas) ? `Semana ${faseAtual.semanas}` : faseAtual.semanas}:</b> {faseAtual.texto}
          </p>
        )}

        <div className="abas" role="tablist" aria-label="Dias de treino">
          {salvo.dias.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`aba-${d.id}`}
              aria-selected={d === dia}
              aria-controls={`painel-${d.id}`}
              tabIndex={d === dia ? 0 : -1}
              onClick={() => setDiaSel(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  const n = (i + (e.key === 'ArrowRight' ? 1 : salvo.dias.length - 1)) % salvo.dias.length;
                  setDiaSel(n);
                  document.getElementById(`aba-${salvo.dias[n]!.id}`)?.focus();
                }
              }}
            >
              {d.nome}
            </button>
          ))}
        </div>

        <section className="painel-dia" role="tabpanel" id={`painel-${dia.id}`} aria-labelledby={`aba-${dia.id}`}>
          <h2 className="info-dia">
            {dia.nome} · {dia.exercicios.length} exercícios · ~{dia.minutosEstimados} min
          </h2>
          <ol className="cartoes-ex">
            {dia.exercicios.map((x, i) => (
              <CartaoExercicio key={x.exId} x={x} n={i + 1} dia={dia.exercicios} />
            ))}
          </ol>
        </section>

        <Sobre programa={salvo} reabrirAjustes={opcoes.length > 0 && !!estado.ajustes?.recolhido ? () => { atualizar((s) => ({ ...s, ajustes: { recolhido: false } })); setVerAjustes(true); } : undefined} />
      </main>
    </div>
  );
}

function Ajustes({ opcoes, escolher }: { opcoes: Opcao[]; escolher: (o: Opcao) => void }) {
  return (
    <section className="box ajustes" aria-labelledby="ajustes">
      <h2 id="ajustes">Ajustes possíveis</h2>
      <p className="ajuda">
        Toque numa opção para gerar o programa de novo. Nada muda sem a sua escolha. <Selo id="tempo.corte" />
      </p>
      <ul className="opcoes-ajuste">
        {opcoes.map((o) => (
          <li key={o.id + o.titulo}>
            <button type="button" className="opcao-ajuste" onClick={() => escolher(o)}>
              <b>{o.titulo}</b>
              <span>{o.texto}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CartaoExercicio({ x, n, dia }: { x: ExercicioPrescrito; n: number; dia: ExercicioPrescrito[] }) {
  const ex = POR_ID[x.exId];
  const par = x.supersetCom ? dia.find((y) => y.exId === x.supersetCom) : undefined;
  const corpo = (
    <>
      <Miniatura animacaoId={x.animacaoId} />
      <div className="ex-texto">
        <h3>
          <span className="n">{n}</span> {x.nome}
        </h3>
        <p className="series">
          {x.series} × {faixa(x.reps)}
          {x.unilateral && <small> cada lado</small>}
        </p>
        <p className="sub-rx">
          RIR {faixa(x.rir)} · descanso {tempo(x.descansoSeg)}
          {par && ' · bi-set'}
        </p>
      </div>
    </>
  );
  return (
    <li className="cartao-ex">
      {x.animacaoId ? (
        <Link className="cartao-ex-corpo" to={`/guia/${x.animacaoId}`}>
          {corpo}
          <span className="sr">: ver como fazer</span>
        </Link>
      ) : (
        <div className="cartao-ex-corpo">{corpo}</div>
      )}
      <details className="mais">
        <summary>Detalhes</summary>
        <div className="mais-corpo">
          {par && <p>Bi-set com {par.nome.toLowerCase()}: alterne os dois e descanse depois da dupla.</p>}
          {!x.animacaoId && ex && (
            <p>
              Animação em breve. Trabalha {musculos(ex.musculos.primarios)}
              {ex.musculos.secundarios.length ? `; também ${musculos(ex.musculos.secundarios)}` : ''}.
            </p>
          )}
          {x.alternativas.length > 0 && (
            <p>
              Se o equipamento estiver ocupado:{' '}
              {x.alternativas.map((id, i) => {
                const alt = POR_ID[id];
                if (!alt) return null;
                return (
                  <span key={id}>
                    {i > 0 && ' ou '}
                    {alt.animacaoId ? <Link to={`/guia/${alt.animacaoId}`}>{alt.nome.toLowerCase()}</Link> : alt.nome.toLowerCase()}
                  </span>
                );
              })}
              .
            </p>
          )}
          <ul className="lista">
            {x.porque.map((q) => (
              <li key={q.regraId}>
                {q.texto} <Selo id={q.regraId} />
              </li>
            ))}
          </ul>
        </div>
      </details>
    </li>
  );
}

function Sobre({ programa, reabrirAjustes }: { programa: TipoPrograma; reabrirAjustes?: () => void }) {
  const linhas = (Object.entries(programa.metas) as [Musculo, number][]).map(([m, meta]) => ({ m, meta, v: programa.volumeSemanal[m] ?? 0 }));
  return (
    <details className="box dobra sobre">
      <summary>Sobre o programa: avisos e o porquê</summary>
      <div className="pilha">
        <p>
          <b>{programa.divisao}.</b>
        </p>
        {programa.avisos.map((a, i) => (
          <div key={i} className="warnbox">
            {a.texto} <Selo id={a.regraId} />
          </div>
        ))}
        {programa.fases.length > 0 && (
          <>
            <h3>Fases</h3>
            <ul className="lista">
              {programa.fases.map((f) => (
                <li key={f.semanas}>
                  <b>{/^\d/.test(f.semanas) ? `Semana ${f.semanas}` : f.semanas}:</b> {f.texto} <Selo id={f.regraId} />
                </li>
              ))}
            </ul>
          </>
        )}
        <h3>Por que este programa</h3>
        <ul className="lista">
          {programa.porque.map((q) => (
            <li key={q.regraId}>
              {q.texto} <Selo id={q.regraId} />
            </li>
          ))}
        </ul>
        <h3>Séries por músculo na semana</h3>
        <p className="ajuda">
          Séries indiretas contam como meia série. <Selo id="volume.serie-indireta.peso" />
        </p>
        <table className="vol">
          <thead>
            <tr>
              <th scope="col">Músculo</th>
              <th scope="col">Meta</th>
              <th scope="col">Programa</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map(({ m, meta, v }) => (
              <tr key={m} className={v < meta ? 'abaixo' : undefined}>
                <th scope="row">{NOME_MUSCULO[m]}</th>
                <td>{meta}</td>
                <td>
                  {v.toLocaleString('pt-BR')}
                  {v < meta && <span className="sr"> (abaixo da meta)</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reabrirAjustes && (
          <button type="button" className="btn sec" onClick={reabrirAjustes}>
            Ver ajustes possíveis
          </button>
        )}
      </div>
    </details>
  );
}
