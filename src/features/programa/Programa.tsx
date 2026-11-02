import { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BIBLIOTECA, type Musculo } from '../../domain/biblioteca';
import { ALTERNATIVAS_A_MOSTRA, NOME_MUSCULO, type ExercicioPrescrito, type Programa as TipoPrograma } from '../../domain/gerador';
import { opcoesDeAjuste, type Opcao } from '../../domain/gerador/opcoes';
import { NOME_NIVEL } from '../../domain/nivel';
import { avaliarTriagem } from '../../domain/triagem';
import { faseDaSemana, proximoDia, semanaDoPrograma } from '../../domain/sessao';
import { linkDoGuia } from '../guia/link';
import { prescricaoDaSemana } from '../../domain/gerador';
import { inventarioPrincipal, localDoTreino, perfilDe, primeiroPassoPendente, type Estado } from '../../storage/esquema';
import { alternarPreferencia, diaDoTreino, iniciarSessao } from '../treino/acoes';
import { Preferencias } from './Prefiro';
import { agoraIso, comProgramaNovo, gerarDoEstado, mesmoConteudo, useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';
import { Miniatura } from './Miniatura';
import { CartaoTexto, temCartao } from './CartaoTexto';

// Tela do treino: vai direto ao que importa (o treino de cada dia, com a imagem de cada exercício e
// séries × repetições em destaque). Ajustes, avisos e o porquê ficam um toque abaixo. Nada muda sem a escolha da pessoa.

const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const tempo = (seg: number) => (seg % 60 ? `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, '0')}` : `${seg / 60} min`);
const faixa = ([a, b]: [number, number]) => (a === b ? `${a}` : `${a}–${b}`);
const musculos = (ms: readonly Musculo[]) => ms.map((m) => NOME_MUSCULO[m]).join(', ');

export function Programa() {
  const { estado, atualizar } = useApp();
  const [aviso, setAviso] = useState('');
  const navigate = useNavigate();
  const [diaSel, setDiaSel] = useState(() => {
    const p = estado.programa?.programa;
    return p ? Math.max(0, p.dias.findIndex((d) => d.id === proximoDia(p, estado.historico).id)) : 0;
  });
  const [verAjustes, setVerAjustes] = useState(false);
  // "Onde vou treinar hoje?" (R1b): o último local usado vem lembrado; a escolha continua visível.
  const [localHoje, setLocalHoje] = useState(() => localDoTreino(estado)?.id);
  const perfil = useMemo(() => perfilDe(estado), [estado]);
  const inventario = inventarioPrincipal(estado);
  const opcoes = useMemo(() => (perfil && inventario ? opcoesDeAjuste(perfil, inventario) : []), [perfil, inventario]);
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
    return comProgramaNovo(e, agoraIso());
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
        rotina: {
          diasSemana: o.perfil.diasSemana,
          // A divisão escolhida só vale para o mesmo número de dias (divisao.recomendacao).
          ...(o.perfil.divisao ? { divisao: o.perfil.divisao } : {}),
          minutosSessao: o.perfil.minutosSessao,
          prioridades: o.perfil.prioridades,
        },
        ajustes: undefined,
      }),
    );
    setDiaSel(0);
    setAviso(`Programa gerado de novo: ${o.titulo.charAt(0).toLowerCase() + o.titulo.slice(1)}.`);
  };

  // Mostra a prescrição desta semana (fases de readaptação e aprendizado mudam séries e RIR).
  const semana = semanaDoPrograma(estado.historico, agoraIso());
  const diasDaSemana = prescricaoDaSemana(salvo, semana);
  const diaDoPrograma = diasDaSemana[Math.min(diaSel, diasDaSemana.length - 1)]!;
  const locais = estado.locais ?? [];
  // O dia no local escolhido (local.treino-do-dia): as trocas e o motivo, antes de começar.
  const noLocal = locais.length > 1 ? diaDoTreino(estado, { diaId: diaDoPrograma.id, semana, localId: localHoje }) : null;
  const dia = noLocal && !noLocal.noLocalDoPrograma ? noLocal.dia : diaDoPrograma;
  const nomeLocal = locais.find((l) => l.id === localHoje)?.nome;
  const preferir = (funcao: string, id: string) => {
    atualizar((s) => alternarPreferencia(s, funcao, id));
    setAviso('Preferência salva. Ela entra quando você atualizar o programa e nas trocas de local.');
  };
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
            <b>Você está na semana {semana}.</b> {faseDaSemana(salvo, semana)?.texto ?? faseAtual.texto}
          </p>
        )}

        {estado.sessaoAtual ? (
          <Link className="btn" to="/treino">
            Continuar o treino em andamento
          </Link>
        ) : null}

        {locais.length > 1 ? null : (
          <Link className="link-sec" to="/locais">
            Treina em mais de um lugar? Cadastre outro local
          </Link>
        )}

        <div className="abas" role="tablist" aria-label="Dias de treino">
          {diasDaSemana.map((d, i) => (
            <button
              key={d.id}
              type="button"
              role="tab"
              id={`aba-${d.id}`}
              aria-selected={d === diaDoPrograma}
              aria-controls={`painel-${d.id}`}
              tabIndex={d === diaDoPrograma ? 0 : -1}
              onClick={() => setDiaSel(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  const n = (i + (e.key === 'ArrowRight' ? 1 : diasDaSemana.length - 1)) % diasDaSemana.length;
                  setDiaSel(n);
                  document.getElementById(`aba-${diasDaSemana[n]!.id}`)?.focus();
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
            {dia.id === proximoDia(salvo, estado.historico).id && estado.historico.length > 0 ? ' · próximo da rotação' : ''}
          </h2>
          {!estado.sessaoAtual && locais.length > 1 && (
            <fieldset className="campo onde-hoje">
              <legend>Onde vou treinar hoje?</legend>
              <div className="opcoes">
                {locais.map((l) => (
                  <button key={l.id} type="button" className="btn sec pequeno" aria-pressed={l.id === localHoje} onClick={() => setLocalHoje(l.id)}>
                    {l.nome}
                  </button>
                ))}
              </div>
              {noLocal && !noLocal.noLocalDoPrograma && (
                <div className="box">
                  <p>
                    <b>Em {nomeLocal}:</b>{' '}
                    {noLocal.trocas.length ? 'o que muda neste treino.' : 'tudo do programa é possível aqui.'} <Selo id="local.treino-do-dia" />
                  </p>
                  {noLocal.trocas.length > 0 && (
                    <ul className="trocas-local" aria-label={`Trocas em ${nomeLocal}`}>
                      {noLocal.trocas.map((t) => (
                        <li key={t.vaga}>{t.motivo.charAt(0).toUpperCase() + t.motivo.slice(1)}.</li>
                      ))}
                    </ul>
                  )}
                  <p className="ajuda">Séries, RIR e descanso de cada vaga continuam os mesmos. Num aparelho novo, a 1ª série acerta a carga.</p>
                </div>
              )}
              <Link className="link-sec" to="/locais">
                Meus locais
              </Link>
            </fieldset>
          )}
          {!estado.sessaoAtual && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                atualizar((s) => iniciarSessao(s, agoraIso(), dia.id, localHoje));
                navigate('/treino');
              }}
            >
              Começar o treino {dia.nome}
              {locais.length > 1 && nomeLocal ? ` em ${nomeLocal}` : ''}
            </button>
          )}
          <ol className="cartoes-ex">
            {dia.exercicios.map((x, i) => (
              <CartaoExercicio
                key={x.exId}
                x={x}
                n={i + 1}
                dia={dia.exercicios}
                diaId={dia.id}
                preferidos={estado.preferidos}
                aoPreferir={preferir}
              />
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

function CartaoExercicio({
  x,
  n,
  dia,
  diaId,
  preferidos,
  aoPreferir,
}: {
  x: ExercicioPrescrito & { noLugarDe?: string };
  n: number;
  dia: ExercicioPrescrito[];
  diaId: string;
  preferidos?: Record<string, string>;
  aoPreferir: (funcao: string, id: string) => void;
}) {
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
          {x.dropSet && ' · última série em drop set'}
        </p>
      </div>
    </>
  );
  return (
    <li className="cartao-ex">
      {x.animacaoId ? (
        <Link className="cartao-ex-corpo" to={linkDoGuia(x.animacaoId, { de: 'programa', diaId, exId: x.exId, vaga: x.noLugarDe })}>
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
          {!x.animacaoId && ex && !temCartao(x.exId) && (
            <p>
              Animação em breve. Trabalha {musculos(ex.musculos.primarios)}
              {ex.musculos.secundarios.length ? `; também ${musculos(ex.musculos.secundarios)}` : ''}.
            </p>
          )}
          {!x.animacaoId && <CartaoTexto exId={x.exId} />}
          {x.alternativas.length > 0 && <Alternativas ids={x.alternativas} diaId={diaId} vaga={x.noLugarDe ?? x.exId} />}
          <Preferencias funcao={x.funcao} atual={x.exId} alternativas={x.alternativas} preferidos={preferidos} aoPreferir={aoPreferir} />
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

/** Alternativas da mesma função: as 3 melhores à mostra e o resto em "ver mais" (decisão de 01/11/2026). */
function Alternativas({ ids, diaId, vaga }: { ids: string[]; diaId: string; vaga: string }) {
  const nome = (id: string) => {
    const alt = POR_ID[id];
    if (!alt) return null;
    return alt.animacaoId ? (
      <Link to={linkDoGuia(alt.animacaoId, { de: 'programa', diaId, exId: alt.id, vaga })}>{alt.nome.toLowerCase()}</Link>
    ) : (
      alt.nome.toLowerCase()
    );
  };
  const lista = (xs: string[]) =>
    xs.map((id, i) => (
      <span key={id}>
        {i > 0 && (i === xs.length - 1 ? ' ou ' : ', ')}
        {nome(id)}
      </span>
    ));
  const [mostra, resto] = [ids.slice(0, ALTERNATIVAS_A_MOSTRA), ids.slice(ALTERNATIVAS_A_MOSTRA)];
  return (
    <div className="alternativas">
      <p>Se o equipamento estiver ocupado: {lista(mostra)}.</p>
      {resto.length > 0 && (
        <details className="ver-mais">
          <summary>Ver mais {resto.length === 1 ? '1 opção' : `${resto.length} opções`}</summary>
          <p>{lista(resto)}.</p>
        </details>
      )}
    </div>
  );
}
