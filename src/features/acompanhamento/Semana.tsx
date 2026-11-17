import { Link, Navigate } from 'react-router-dom';
import { diaEMes as dataCurta, numeroBr } from '../../domain/numero';
import { POR_ID } from '../../domain/biblioteca';
import { exerciciosComHistorico, marcasDaSemana, type Marca } from '../../domain/acompanhamento/evolucao';
import { textoCarga } from '../../domain/sessao';
import { localDaSessao } from '../../storage/esquema';
import { TEXTO_ESTADO, type ResumoDaSemana } from '../../domain/acompanhamento/semana';
import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { Icone } from '../app/icones';
import { NavInferior, Titulo, Topo } from '../app/ui';
import { aceitarMenosDias, manterDias, semanaDoEstado } from './acoes';
import { SemanaLeve } from './SemanaLeve';

// "A sua semana" (acompanhamento.semana e acompanhamento.mensagens): registro + meta + retorno, sem culpa e sem vermelho.
// Lote 4 do redesign: o dado antes da oferta (os treinos, as últimas semanas, o que subiu, as séries por músculo) e só
// então a revisão da meta e a semana leve.
const num = numeroBr;
const TEXTO_MARCA: Record<Marca, string> = { 'subiu-a-carga': 'subiu a carga', recorde: 'recorde' };

/** Os treinos da semana como quadradinhos: cheio = feito. O nome de cada um vai no texto para leitores de tela. */
export function Pontos({ r }: { r: ResumoDaSemana }) {
  return (
    <span className="pontos" role="img" aria-label={r.treinos.map((t) => `${t.nome}: ${t.feito ? 'feito' : 'a fazer'}`).join('; ')}>
      {r.treinos.map((t, i) => (
        <i key={i} className={t.feito ? 'on' : ''} title={t.nome} />
      ))}
    </span>
  );
}

/** A faixa curta no "Seu treino", em 1 linha: as bolinhas e "X de Y"; um toque abre a tela completa (lote 4). */
export function FaixaSemana({ r }: { r: ResumoDaSemana }) {
  return (
    <Link className="faixa-semana" to="/semana">
      <b>A sua semana</b>
      <Pontos r={r} />
      <span className="fs-num">
        {r.feitos} de {r.planejados}
      </span>
      <span className="seta" aria-hidden="true">
        <Icone nome="chevron-right" />
      </span>
    </Link>
  );
}

export function Semana() {
  const { estado, atualizar } = useApp();
  const r = semanaDoEstado(estado, agoraIso(), fusoDoAparelho());
  if (!r) return <Navigate to="/programa" replace />;
  const exercicios = exerciciosComHistorico(estado.historico);
  const subiu = marcasDaSemana(estado.historico, agoraIso(), fusoDoAparelho(), (s) => localDaSessao(estado, s));
  const escala = Math.max(1, ...r.musculos.map((m) => Math.max(m.meta, m.feitas))) * 1.15;

  return (
    <div className="wrap app com-nav">
      <Topo />
      <main className="conteudo semana">
        <div className="cabeca-treino">
          <Titulo>A sua semana</Titulo>
          <p className="ajuda">
            {dataCurta(r.segunda)} a {dataCurta(r.domingo)}
          </p>
        </div>

        <section aria-labelledby="treinos" className="pilha">
          <h2 id="treinos" className="numero-grande">
            {r.feitos} <small>de {r.planejados} treinos</small>
          </h2>
          <Pontos r={r} />
        </section>

        {/* sem semana nenhuma contada ainda (programa novo, sem treino), a faixa das semanas não aparece */}
        {r.semanas.length > 1 && (
          <section aria-labelledby="semanas" className="pilha">
            <h2 id="semanas" className="secao">
              {r.semanas.length === 1 ? 'Esta semana' : `Últimas ${r.semanas.length} semanas`}
            </h2>
            <span className="semanas" role="img" aria-label={`${r.comTreino} de ${r.semanas.length} semanas com treino`}>
              {r.semanas.map((t, i) => (
                <i key={i} className={t ? 'on' : ''} />
              ))}
            </span>
          </section>
        )}

        {subiu.length > 0 && (
          <section aria-labelledby="subiu" className="pilha">
            <h2 id="subiu" className="secao">
              Subiu nesta semana
            </h2>
            <ul className="lista-subiu">
              {subiu.map((m) => (
                <li key={m.exId + (m.localId ?? '')}>
                  <Link to={`/evolucao/${m.exId}`}>
                    <span>
                      <b>{POR_ID[m.exId]?.nome ?? m.exId}</b>
                      <span className="num">
                        {textoCarga(m.carga, m.exId)} × {m.reps}
                      </span>
                    </span>
                    {m.marcas.map((x) => (
                      <span key={x} className="marca">
                        {TEXTO_MARCA[x]}
                      </span>
                    ))}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="musculos" className="pilha">
          <h2 id="musculos" className="secao">
            Séries por músculo
          </h2>
          <ul className="musculos" aria-label="Séries efetivas por músculo nesta semana">
            {r.musculos.map((m) => (
              <li key={m.musculo} className={`m-${m.estado}`}>
                <span className="m-nome">{m.nome.charAt(0).toUpperCase() + m.nome.slice(1)}</span>
                <span className="m-barra" aria-hidden="true">
                  <i style={{ width: `${Math.round((m.feitas / escala) * 100)}%` }} />
                  <u style={{ left: `${Math.round((m.meta / escala) * 100)}%` }} />
                </span>
                <span className="m-num">
                  {num(m.feitas)} de {num(m.meta)}
                </span>
                {m.feitas > 0 && <span className="m-estado">{TEXTO_ESTADO[m.estado]}</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* Com um treino aberto, o programa não é gerado de novo: a oferta volta quando ele terminar. */}
        {r.revisao && !estado.sessaoAtual && (
          <section className="box volta" aria-labelledby="revisao">
            <h2 id="revisao">Um programa com menos dias?</h2>
            <p>{r.revisao.texto}</p>
            <div className="opcoes linha">
              {r.revisao.opcoes.map((n) => (
                <button key={n} type="button" className="btn sec pequeno" onClick={() => atualizar((s) => aceitarMenosDias(s, n as 2 | 3 | 4 | 5, agoraIso()))}>
                  {n} dias
                </button>
              ))}
              <button type="button" className="btn sec pequeno" onClick={() => atualizar((s) => manterDias(s, agoraIso()))}>
                Manter {r.planejados}
              </button>
            </div>
          </section>
        )}

        <SemanaLeve />

        {exercicios.length > 0 && (
          <details className="box dobra">
            <summary>Evolução ({exercicios.length})</summary>
            <ul className="lista-evolucao">
              {exercicios.map((id) => (
                <li key={id}>
                  <Link to={`/evolucao/${id}`}>
                    {POR_ID[id]?.nome ?? id}
                    <Icone nome="chevron-right" />
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        )}

      </main>
      <NavInferior atual="semana" />
    </div>
  );
}
