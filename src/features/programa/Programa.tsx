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

// Tela do programa: divisão, dias e exercícios, o porquê com selo de evidência, avisos, fases,
// alternativas e as escolhas calculadas (opcoesDeAjuste). Nada muda sem a escolha da pessoa.

const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const tempo = (seg: number) => (seg % 60 ? `${Math.floor(seg / 60)}min${String(seg % 60).padStart(2, '0')}` : `${seg / 60} min`);
const faixa = ([a, b]: [number, number]) => (a === b ? `${a}` : `${a}–${b}`);
const musculos = (ms: readonly Musculo[]) => ms.map((m) => NOME_MUSCULO[m]).join(', ');

export function Programa() {
  const { estado, carregado, atualizar } = useApp();
  const [aviso, setAviso] = useState('');
  const perfil = useMemo(() => perfilDe(estado), [estado]);
  const opcoes = useMemo(() => (perfil && estado.inventario ? opcoesDeAjuste(perfil, estado.inventario) : []), [perfil, estado.inventario]);
  const atualizado = useMemo(() => gerarDoEstado(estado), [estado]);

  if (!carregado) return null;
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
    if (o.id === 'manter') {
      atualizar((s) => ({ ...s, ajustes: { recolhido: true } }));
      setAviso('Programa mantido. Você pode rever os ajustes quando quiser.');
      return;
    }
    atualizar((s) =>
      regerar({
        ...s,
        rotina: { diasSemana: o.perfil.diasSemana, minutosSessao: o.perfil.minutosSessao, prioridades: o.perfil.prioridades },
        ajustes: undefined,
      }),
    );
    setAviso(`Programa gerado de novo: ${o.titulo.charAt(0).toLowerCase() + o.titulo.slice(1)}.`);
  };

  const mostrarAjustes = opcoes.length > 0 && !estado.ajustes?.recolhido;

  return (
    <div className="wrap app">
      <Topo direita={<Link to="/dados">Meus dados</Link>} />
      <main className="conteudo">
        <Titulo>Seu programa</Titulo>
        <p className="resumo">
          <b>{salvo.divisao}</b> · {perfil!.diasSemana} treinos por semana · até {perfil!.minutosSessao} min · nível {NOME_NIVEL[perfil!.nivel].toLowerCase()}
        </p>
        <p role="status" className="status">
          {aviso}
        </p>

        {versaoNova && (
          <section className="box destaque" aria-labelledby="versao-nova">
            <h2 id="versao-nova">Há uma versão nova do seu programa</h2>
            <p>As regras do app foram atualizadas. Seu programa atual continua valendo até você decidir.</p>
            <button type="button" className="btn" onClick={() => { atualizar(regerar); setAviso('Programa atualizado com as regras novas.'); }}>
              Atualizar o programa
            </button>
          </section>
        )}

        {mostrarAjustes && <Ajustes opcoes={opcoes} escolher={escolher} />}
        {opcoes.length > 0 && !mostrarAjustes && (
          <button type="button" className="link-sec" onClick={() => atualizar((s) => ({ ...s, ajustes: { recolhido: false } }))}>
            Ver ajustes possíveis
          </button>
        )}

        {salvo.avisos.length > 0 && (
          <section aria-labelledby="avisos" className="pilha">
            <h2 id="avisos" className="secao">
              Avisos
            </h2>
            {salvo.avisos.map((a, i) => (
              <div key={i} className="warnbox">
                {a.texto} <Selo id={a.regraId} />
              </div>
            ))}
          </section>
        )}

        {salvo.fases.length > 0 && (
          <section className="box" aria-labelledby="fases">
            <h2 id="fases">Fases</h2>
            <ul className="lista">
              {salvo.fases.map((f) => (
                <li key={f.semanas}>
                  <b>{/^\d/.test(f.semanas) ? `Semana ${f.semanas}` : f.semanas}:</b> {f.texto} <Selo id={f.regraId} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {salvo.dias.map((d) => (
          <section key={d.id} className="dia" aria-labelledby={`dia-${d.id}`}>
            <header>
              <h2 id={`dia-${d.id}`}>{d.nome}</h2>
              <span>~{d.minutosEstimados} min</span>
            </header>
            <ol className="exercicios">
              {d.exercicios.map((x) => (
                <CartaoExercicio key={x.exId} x={x} dia={d.exercicios} />
              ))}
            </ol>
          </section>
        ))}

        <details className="box dobra">
          <summary>Por que este programa</summary>
          <ul className="lista">
            {salvo.porque.map((q) => (
              <li key={q.regraId}>
                {q.texto} <Selo id={q.regraId} />
              </li>
            ))}
          </ul>
        </details>
        <Volume programa={salvo} />
      </main>
    </div>
  );
}

function Ajustes({ opcoes, escolher }: { opcoes: Opcao[]; escolher: (o: Opcao) => void }) {
  return (
    <section className="box ajustes" aria-labelledby="ajustes">
      <h2 id="ajustes">Ajustes possíveis</h2>
      <p>
        Com a rotina atual, alguns músculos ficam abaixo da meta ou algum treino passa do tempo. Você escolhe o que fazer; nada muda sem a
        sua escolha. <Selo id="tempo.corte" />
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

function CartaoExercicio({ x, dia }: { x: ExercicioPrescrito; dia: ExercicioPrescrito[] }) {
  const ex = POR_ID[x.exId];
  const par = x.supersetCom ? dia.find((y) => y.exId === x.supersetCom) : undefined;
  return (
    <li className="exercicio">
      <div className="ex-topo">
        <h3>{x.nome}</h3>
        <p className="rx">
          {x.series} × {faixa(x.reps)}
          {x.unilateral ? ' (cada lado)' : ''} · RIR {faixa(x.rir)} · descanso {tempo(x.descansoSeg)}
        </p>
        {par && <p className="ajuda">Em bi-set com {par.nome.toLowerCase()}: alterne os dois e descanse depois da dupla.</p>}
      </div>
      {x.animacaoId ? (
        <Link className="link-guia" to={`/guia/${x.animacaoId}`}>
          Ver a execução animada
        </Link>
      ) : (
        <div className="cartao-texto">
          <b>Animação em breve</b>
          {ex && (
            <span>
              Trabalha: {musculos(ex.musculos.primarios)}
              {ex.musculos.secundarios.length ? `; também ${musculos(ex.musculos.secundarios)}` : ''}.
            </span>
          )}
        </div>
      )}
      {x.alternativas.length > 0 && (
        <p className="alternativas">
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
      <details className="porque">
        <summary>Por que este exercício</summary>
        <ul className="lista">
          {x.porque.map((q) => (
            <li key={q.regraId}>
              {q.texto} <Selo id={q.regraId} />
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
}

function Volume({ programa }: { programa: TipoPrograma }) {
  const linhas = (Object.entries(programa.metas) as [Musculo, number][]).map(([m, meta]) => ({ m, meta, v: programa.volumeSemanal[m] ?? 0 }));
  return (
    <details className="box dobra">
      <summary>Séries por músculo na semana</summary>
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
    </details>
  );
}
