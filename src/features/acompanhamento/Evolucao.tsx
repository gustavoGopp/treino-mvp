import { useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { diaEMes as dataCurta, textoDoRir } from '../../domain/numero';
import { RIR } from '../../domain/regras';
import { POR_ID } from '../../domain/biblioteca';
import { evolucaoDoExercicio, type Marca, type PontoDaEvolucao } from '../../domain/acompanhamento/evolucao';
import { cargaDaMaquina, opcoesCarga, textoCarga } from '../../domain/sessao';
import { localDaSessao, localPorId } from '../../storage/esquema';
import { useApp } from '../app/estado';
import { Folha } from '../app/Folha';
import { NavInferior, Titulo, Topo } from '../app/ui';
import { apagarSerie, corrigirSerie, type OndeSerie } from '../treino/acoes';
import { CorrigirSerie } from '../treino/CorrigirSerie';

// Evolução de um exercício (acompanhamento.evolucao): a melhor série de cada treino, com "subiu a carga" e "recorde".
// Nunca uma carga máxima estimada. Nas máquinas, uma lista por local, com o nome do local. Lote 4 do redesign: o resumo
// em 1 linha em cima ("Começou com 8 kg × 10 · agora 9 kg × 12 · 5 treinos").
const TEXTO_MARCA: Record<Marca, string> = { 'subiu-a-carga': 'subiu a carga', recorde: 'recorde' };

export function Evolucao() {
  const { exId = '' } = useParams();
  const [busca] = useSearchParams();
  const { estado } = useApp();
  // Corrigir depois do treino (26/11/2026; registro.treino-feito): o treino aberto na folha e a série em correção
  const [aberto, setAberto] = useState<string | null>(null);
  const [corrigindo, setCorrigindo] = useState<OndeSerie | null>(null);
  const ex = POR_ID[exId];
  if (!ex) return <Navigate to="/semana" replace />;
  const linhas = evolucaoDoExercicio(estado.historico, exId, (s) => localDaSessao(estado, s));
  const variosLocais = (estado.locais?.length ?? 0) > 1;
  // quem veio da folha do exercício, no início, volta para lá (e a barra acende "Treino")
  const dePrograma = busca.get('de') === 'programa';

  return (
    <div className="wrap app com-nav">
      <Topo voltar={dePrograma ? { para: '/programa', rotulo: 'Treino' } : { para: '/semana', rotulo: 'Semana' }} />
      <main className="conteudo evolucao">
        <Titulo>{ex.nome}</Titulo>
        {!linhas.length && <p>Ainda sem treino registrado deste exercício.</p>}
        {linhas.map((l) => (
          <section key={l.localId ?? 'todos'} className="pilha" aria-label={l.localId ? `Em ${localPorId(estado, l.localId)?.nome ?? 'outro local'}` : ex.nome}>
            {cargaDaMaquina(exId) && variosLocais && <h2 className="secao">Em {localPorId(estado, l.localId)?.nome ?? 'outro local'}</h2>}
            <Resumo pontos={l.pontos} exId={exId} />
            <ol className="pontos-evolucao">
              {l.pontos.map((p) => (
                <li key={p.sessaoId}>
                  <button type="button" className="pe-linha" aria-haspopup="dialog" aria-label={`Ver e corrigir as séries de ${dataCurta(p.data)}`} onClick={() => setAberto(p.sessaoId)}>
                  <span className="pe-data">{dataCurta(p.data)}</span>
                  <span className="pe-serie">
                    {textoCarga(p.carga, exId)} × {p.reps}
                    <small>
                      <span className="pe-ponto"> · </span>sobrando {textoDoRir(p.rir, RIR.registroMax)}
                    </small>
                  </span>
                  <span className="pe-marcas">
                    {p.acerto ? <span className="marca neutra">acertando o peso</span> : p.marcas.map((m) => <span key={m} className="marca">{TEXTO_MARCA[m]}</span>)}
                  </span>
                  </button>
                </li>
              ))}
            </ol>
          </section>
        ))}
        {aberto && !corrigindo && <SeriesDoTreino sessaoId={aberto} exId={exId} aoCorrigir={setCorrigindo} aoFechar={() => setAberto(null)} />}
        {corrigindo && <Correcao onde={corrigindo} exId={exId} aoFim={() => setCorrigindo(null)} />}
      </main>
      <NavInferior atual={dePrograma ? 'treino' : 'semana'} />
    </div>
  );
}

/** O resumo em 1 linha (lote 4; agente 1, 4.5C): de onde começou, onde está e em quantos treinos. */
function Resumo({ pontos, exId }: { pontos: PontoDaEvolucao[]; exId: string }) {
  const validos = pontos.filter((p) => !p.acerto);
  const [primeiro, ultimo] = [validos[0], validos.at(-1)];
  if (!primeiro || !ultimo) return null;
  const serie = (p: PontoDaEvolucao) => `${textoCarga(p.carga, exId)} × ${p.reps}`;
  const treinos = pontos.length === 1 ? '1 treino' : `${pontos.length} treinos`;
  return (
    <p className="resumo-evolucao num">
      {primeiro === ultimo ? (
        <>
          <b>{serie(primeiro)}</b> · {treinos}
        </>
      ) : (
        <>
          Começou com <b>{serie(primeiro)}</b> · agora <b>{serie(ultimo)}</b> · {treinos}
        </>
      )}
    </p>
  );
}

/** As séries de um treino antigo deste exercício, cada uma com "Corrigir" (26/11/2026; registro.treino-feito). */
function SeriesDoTreino({ sessaoId, exId, aoCorrigir, aoFechar }: { sessaoId: string; exId: string; aoCorrigir: (o: OndeSerie) => void; aoFechar: () => void }) {
  const { estado } = useApp();
  const sessao = estado.historico.find((s) => s.id === sessaoId);
  if (!sessao) return null;
  const doExercicio = sessao.exercicios.flatMap((e, exIndex) => (e.exId === exId ? [{ e, exIndex }] : []));
  return (
    <Folha titulo={`Treino de ${dataCurta(sessao.inicio)}`} aoFechar={aoFechar}>
      {doExercicio.every(({ e }) => !e.series.length) && <p>Nenhuma série deste exercício nesse treino.</p>}
      {doExercicio.map(({ e, exIndex }) => (
        <ol key={exIndex} className="linhas-dados" aria-label="Séries do treino">
          {e.series.map((s, n) => (
            <li key={n}>
              <button type="button" aria-haspopup="dialog" aria-label={`Corrigir a ${n + 1}ª série`} onClick={() => aoCorrigir({ sessaoId, exIndex, n })}>
                <span>
                  {n + 1}ª série: {textoCarga(s.carga, exId)} × {s.reps}
                  <small className="ajuda">
                    sobrando {textoDoRir(s.rir, RIR.registroMax)}
                    {s.calibracao ? ' · acertando o peso' : ''}
                    {s.dor ? ` · dor ${s.dor}` : ''}
                  </small>
                </span>
                <span aria-hidden="true">Corrigir</span>
              </button>
            </li>
          ))}
        </ol>
      ))}
    </Folha>
  );
}

/** A folha de correção de uma série de um treino antigo; o inventário é o do local daquele treino (para os degraus). */
function Correcao({ onde, exId, aoFim }: { onde: OndeSerie; exId: string; aoFim: () => void }) {
  const { estado, atualizar } = useApp();
  const sessao = estado.historico.find((s) => s.id === onde.sessaoId);
  const serie = sessao?.exercicios[onde.exIndex]?.series[onde.n];
  if (!sessao || !serie) return null;
  const inventario = localPorId(estado, localDaSessao(estado, sessao))?.inventario ?? {};
  return (
    <CorrigirSerie
      exId={exId}
      numero={onde.n + 1}
      serie={serie}
      degraus={opcoesCarga(exId, inventario).degraus?.length}
      aoGuardar={(nova) => {
        atualizar((e) => corrigirSerie(e, onde, nova));
        aoFim();
      }}
      aoApagar={() => {
        atualizar((e) => apagarSerie(e, onde));
        aoFim();
      }}
      aoFechar={aoFim}
    />
  );
}
