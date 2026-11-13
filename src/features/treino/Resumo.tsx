import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { POR_ID } from '../../domain/biblioteca';
import { marcasDaSessao, type Marca } from '../../domain/acompanhamento/evolucao';
import { resumoSessao, sugestaoDoExercicio, textoCarga } from '../../domain/sessao';
import { localDaSessao } from '../../storage/esquema';
import { AvisoSalvar } from '../app/avisos';
import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { apagarUltimoTreino, hojeDoTreino, inventarioDoTreino, opcoesDaCarga } from './acoes';
import { marcarHojeFoi, semanaDoEstado } from '../acompanhamento/acoes';
import { Pontos } from '../acompanhamento/Semana';
import { SemanaLeve } from '../acompanhamento/SemanaLeve';
import { PorQue, Selo, Titulo } from '../app/ui';

// Fim do treino: resumo e a sugestão de cada exercício para a próxima vez (decisão 9 do M5). Lote 4 do redesign: primeiro
// "O que mudou hoje" (a semana, os recordes e as cargas que sobem), depois "Hoje foi" e a próxima vez, com o motivo no
// "por quê?". Sem confete e sem som.
const ACAO: Record<string, string> = {
  subir: 'Subir',
  manter: 'Manter',
  reduzir: 'Reduzir',
  voltar: 'Voltar à anterior',
  estagnado: 'Estagnado',
  ajustar: 'Ajustar',
  interromper: 'Trocar',
  calibrar: 'Calibrar',
};

const HOJE_FOI = [
  ['leve', 'leve'],
  ['normal', 'normal'],
  ['pesado', 'pesado demais'],
] as const;

const TEXTO_MARCA: Record<Marca, string> = { 'subiu-a-carga': 'subiu a carga', recorde: 'recorde' };

export function Resumo() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  // "Apagar este treino" (registro.treino-feito; R5a): o mínimo funcional, com confirmação; a tela é pedido ao design.
  const [apagar, setApagar] = useState(false);
  const s = estado.historico.at(-1);
  const programa = estado.programa?.programa;
  if (!s || !programa) return <Navigate to="/programa" replace />;
  const fuso = fusoDoAparelho();
  const hoje = hojeDoTreino(estado, s, fuso)!;
  const dia = hoje.dias.find((d) => d.id === s.diaId) ?? hoje.dias[0]!;
  const r = resumoSessao(s);
  const itens = s.exercicios
    .filter((e) => e.series.length > 0)
    .map((e) => {
      const orig = dia.exercicios.find((x) => x.exId === (e.noLugarDe ?? e.exId));
      const alvo = { exId: e.exId, reps: (e.noLugarDe ? POR_ID[e.exId]?.faixaReps : orig?.reps) ?? [8, 12], rir: orig?.rir ?? [1, 2] };
      const sug = sugestaoDoExercicio(estado.historico, alvo as { exId: string; reps: [number, number]; rir: [number, number] }, inventarioDoTreino(estado, s), opcoesDaCarga(estado, s, fuso));
      return { e, sug };
    });
  // "O que mudou hoje" (lote 4; agente 1, 4.1): a semana já com o treino de hoje, os recordes do dia e as cargas que sobem.
  const semana = semanaDoEstado(estado, agoraIso(), fuso);
  const marcas = marcasDaSessao(estado.historico, s.id, (x) => localDaSessao(estado, x));
  const sobem = itens.filter((i) => i.sug.acao === 'subir').length;

  return (
    <div className="wrap app">
      <main className="conteudo fim-do-treino">
        <AvisoSalvar />
        <p className="rotulo subtitulo">{dia.nome}</p>
        <Titulo>{s.encerradaPorAlerta ? 'Treino encerrado por segurança' : 'Treino concluído'}</Titulo>
        {s.encerradaPorAlerta && (
          <div className="caixa-erro" role="alert">
            <p>
              Pare o treino agora e descanse. Se o sintoma não passar em poucos minutos ou for forte, ligue para o SAMU: <b>192</b>. Antes de
              voltar a treinar, procure avaliação. <Selo id="seguranca.alerta.cardiovascular" />
            </p>
            {/* o número a um toque (o texto da orientação não muda) */}
            <a className="btn ligar" href="tel:192">
              Ligar para o SAMU: 192
            </a>
          </div>
        )}
        {/* o placar do treino: os números de hoje são o maior elemento da tela */}
        <div className={`numeros num${s.encerradaPorAlerta ? '' : ' placar'}`}>
          <div>
            <b>{r.series}</b>
            <span className="rotulo">{r.series === 1 ? 'série' : 'séries'}</span>
          </div>
          {r.minutos !== undefined && (
            <div>
              <b>{r.minutos}</b>
              <span className="rotulo">{r.minutos === 1 ? 'minuto' : 'minutos'}</span>
            </div>
          )}
          <div>
            <b>{itens.length}</b>
            <span className="rotulo">{itens.length === 1 ? 'exercício' : 'exercícios'}</span>
          </div>
        </div>
        {(semana || marcas.length > 0 || sobem > 0) && (
          <section className="mudou" aria-labelledby="mudou">
            <h2 id="mudou">O que mudou hoje</h2>
            {semana && (
              <>
                <p className="mudou-semana">
                  <b>A sua semana</b> <Pontos r={semana} />{' '}
                  <b className="num">
                    {semana.feitos} de {semana.planejados}
                  </b>
                </p>
                <p>
                  {semana.mensagem} <Selo id={semana.regraId} />
                </p>
              </>
            )}
            {marcas.length > 0 && (
              <ul className="marcas-hoje" aria-label="Recordes de hoje">
                {marcas.map((m) => (
                  <li key={m.exId + (m.localId ?? '')}>
                    {m.marcas.map((x) => (
                      <span key={x} className="marca">
                        {TEXTO_MARCA[x]}
                      </span>
                    ))}{' '}
                    {POR_ID[m.exId]?.nome}:{' '}
                    <b className="num">
                      {textoCarga(m.carga, m.exId)} × {m.reps}
                    </b>
                  </li>
                ))}
              </ul>
            )}
            {sobem > 0 && <p>{sobem === 1 ? '1 exercício com carga para subir na próxima vez.' : `${sobem} exercícios com carga para subir na próxima vez.`}</p>}
          </section>
        )}
        <fieldset className="campo hoje-foi">
          <legend>Hoje foi: (opcional)</legend>
          <div className="opcoes linha">
            {HOJE_FOI.map(([v, t]) => (
              <button key={v} type="button" className="btn sec pequeno" aria-pressed={s.hojeFoi === v} onClick={() => atualizar((e) => marcarHojeFoi(e, s.id, v))}>
                {t}
              </button>
            ))}
          </div>
          <p className="ajuda">
            Nada vem marcado.{' '}
            <PorQue regras={['deload.semana-leve']} titulo="Hoje foi">
              <p>Nada vem marcado. Com "pesado demais" em 2 dos últimos 3 treinos, o app sugere uma semana leve.</p>
            </PorQue>
          </p>
        </fieldset>
        <section aria-labelledby="proxima" className="pilha">
          <h2 id="proxima" className="rotulo">
            Para a próxima vez
          </h2>
          <ul className="lista-proxima">
            {/* a chave leva a posição: o mesmo exercício pode aparecer duas vezes no treino (feito e, depois, como alternativa de outra vaga) */}
            {itens.map(({ e, sug }, i) => (
              <li key={`${e.exId}-${i}`} className="resumo-ex">
                <b>{POR_ID[e.exId]?.nome}</b>
                <span>
                  <span className={`acao acao-${sug.acao}`}>{ACAO[sug.acao]}</span>
                  {sug.proxima && <> · próxima: {textoCarga(sug.proxima, e.exId)}</>}{' '}
                  <PorQue regras={[sug.regraId]} titulo={POR_ID[e.exId]?.nome}>
                    <p>Hoje: {e.series.map((x) => `${textoCarga(x.carga, e.exId)} × ${x.reps}`).join(' · ')}.</p>
                    <p>{sug.motivo}</p>
                  </PorQue>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <SemanaLeve />
        <Link className="btn" to="/semana">
          Ver a sua semana
        </Link>
        <Link className="btn sec" to="/programa">
          Voltar ao início
        </Link>
        {apagar ? (
          <div className="warnbox" role="group" aria-label="Apagar este treino?">
            <p>
              Apagar este treino? As séries dele saem do histórico, e o próximo treino volta a ser {dia.nome}. <Selo id="registro.treino-feito" />
            </p>
            <div className="dois">
              <button type="button" className="btn sec" autoFocus onClick={() => setApagar(false)}>
                Manter
              </button>
              <button
                type="button"
                className="btn ter"
                onClick={() => {
                  atualizar((e) => apagarUltimoTreino(e, s.id));
                  navigate('/programa', { replace: true });
                }}
              >
                Apagar
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="link-sec" onClick={() => setApagar(true)}>
            Registrei algo errado: apagar este treino
          </button>
        )}
      </main>
    </div>
  );
}
