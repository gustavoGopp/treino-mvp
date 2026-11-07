import { Link, Navigate } from 'react-router-dom';
import { BIBLIOTECA } from '../../domain/biblioteca';
import { exerciciosComHistorico } from '../../domain/acompanhamento/evolucao';
import { TEXTO_ESTADO, type ResumoDaSemana } from '../../domain/acompanhamento/semana';
import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { NavInferior, Selo, Titulo, Topo } from '../app/ui';
import { aceitarMenosDias, manterDias, semanaDoEstado } from './acoes';
import { SemanaLeve } from './SemanaLeve';

// "A sua semana" (acompanhamento.semana e acompanhamento.mensagens): registro + meta + retorno, sem culpa e sem vermelho.
const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const dataCurta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;
const num = (n: number) => n.toLocaleString('pt-BR');

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

/** A faixa curta no topo do "Seu treino": um toque abre a tela completa (decisão do Gustavo, 02/11/2026). */
export function FaixaSemana({ r }: { r: ResumoDaSemana }) {
  return (
    <Link className="faixa-semana" to="/semana">
      <span className="fs-topo">
        <b>A sua semana</b>
        <span>
          {r.feitos} de {r.planejados} <span aria-hidden="true">›</span>
        </span>
      </span>
      <Pontos r={r} />
      <span className="fs-msg">{r.mensagem}</span>
    </Link>
  );
}

export function Semana() {
  const { estado, atualizar } = useApp();
  const r = semanaDoEstado(estado, agoraIso(), fusoDoAparelho());
  if (!r) return <Navigate to="/programa" replace />;
  const exercicios = exerciciosComHistorico(estado.historico);

  return (
    <div className="wrap app com-nav">
      <Topo />
      <main className="conteudo semana">
        <div className="cabeca-treino">
          <Titulo>A sua semana</Titulo>
          <p className="ajuda">
            {dataCurta(r.segunda)} a {dataCurta(r.domingo)}, em qualquer local <Selo id={r.regraId} />
          </p>
        </div>

        <section aria-labelledby="treinos" className="pilha">
          <h2 id="treinos" className="numero-grande">
            {r.feitos} <small>de {r.planejados} treinos</small>
          </h2>
          <Pontos r={r} />
          <p className="fase">{r.mensagem}</p>
        </section>

        {r.revisao && (
          <section className="box volta" aria-labelledby="revisao">
            <h2 id="revisao">Um programa que cabe melhor?</h2>
            <p>
              {r.revisao.texto} <Selo id={r.revisao.regraId} />
            </p>
            <p className="ajuda">O programa só muda se você escolher.</p>
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

        <section aria-labelledby="musculos" className="pilha">
          <h2 id="musculos" className="secao">
            Séries por músculo
          </h2>
          <ul className="musculos" aria-label="Séries efetivas por músculo nesta semana">
            {r.musculos.map((m) => (
              <li key={m.musculo} className={`m-${m.estado}`}>
                <span className="m-nome">{m.nome.charAt(0).toUpperCase() + m.nome.slice(1)}</span>
                <span className="m-barra" aria-hidden="true">
                  <i style={{ width: `${Math.min(100, Math.round((m.feitas / m.meta) * 100))}%` }} />
                </span>
                <span className="m-num">
                  {num(m.feitas)} de {num(m.meta)}
                </span>
                <span className="m-estado">
                  {TEXTO_ESTADO[m.estado]}
                  {m.planejado ? ` · o seu programa planeja ${num(m.planejado.series)} de ${num(m.meta)}: ${m.planejado.motivo}` : ''}
                </span>
              </li>
            ))}
          </ul>
          <p className="ajuda">
            Conta a série com até 4 repetições de reserva e amplitude completa; a série que trabalha o músculo de forma indireta vale meia.{' '}
            {r.metaPrescrita ? 'Nesta semana, a meta é o que o programa prescreveu para ela.' : 'A meta é a do seu programa.'} <Selo id="rir.serie-efetiva" />
          </p>
          <p className="ajuda legenda-estados">Cheio: na meta · médio: crescendo (4 séries ou mais) · claro: mantendo · vazio: ainda não treinou nesta semana.</p>
        </section>

        <section aria-labelledby="semanas" className="pilha">
          <h2 id="semanas" className="secao">
            {r.comTreino} {r.comTreino === 1 ? 'semana' : 'semanas'} com treino {r.semanas.length === 1 ? 'na última semana' : `nas últimas ${r.semanas.length}`}
          </h2>
          <span className="semanas" role="img" aria-label={`${r.comTreino} de ${r.semanas.length} semanas com treino`}>
            {r.semanas.map((t, i) => (
              <i key={i} className={t ? 'on' : ''} />
            ))}
          </span>
        </section>

        {exercicios.length > 0 && (
          <section aria-labelledby="evolucao" className="pilha">
            <h2 id="evolucao" className="secao">
              Sua evolução
            </h2>
            <ul className="lista-evolucao">
              {exercicios.map((id) => (
                <li key={id}>
                  <Link to={`/evolucao/${id}`}>{POR_ID[id]?.nome ?? id}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link className="btn sec" to="/programa">
          Voltar ao seu treino
        </Link>
      </main>
      <NavInferior atual="semana" />
    </div>
  );
}
