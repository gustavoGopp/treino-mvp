import { Navigate, useParams } from 'react-router-dom';
import { POR_ID } from '../../domain/biblioteca';
import { evolucaoDoExercicio, type Marca, type PontoDaEvolucao } from '../../domain/acompanhamento/evolucao';
import { cargaDaMaquina, textoCarga } from '../../domain/sessao';
import { localDaSessao, localPorId } from '../../storage/esquema';
import { useApp } from '../app/estado';
import { NavInferior, Selo, Titulo, Topo } from '../app/ui';

// Evolução de um exercício (acompanhamento.evolucao): a melhor série de cada treino, com "subiu a carga" e "recorde".
// Nunca uma carga máxima estimada. Nas máquinas, uma lista por local, com o nome do local. Lote 4 do redesign: o resumo
// em 1 linha em cima ("Começou com 8 kg × 10 · agora 9 kg × 12 · 5 treinos").
const TEXTO_MARCA: Record<Marca, string> = { 'subiu-a-carga': 'subiu a carga', recorde: 'recorde' };
const dataCurta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

export function Evolucao() {
  const { exId = '' } = useParams();
  const { estado } = useApp();
  const ex = POR_ID[exId];
  if (!ex) return <Navigate to="/semana" replace />;
  const linhas = evolucaoDoExercicio(estado.historico, exId, (s) => localDaSessao(estado, s));
  const variosLocais = (estado.locais?.length ?? 0) > 1;

  return (
    <div className="wrap app com-nav">
      <Topo voltar={{ para: '/semana', rotulo: 'Semana' }} />
      <main className="conteudo evolucao">
        <Titulo>{ex.nome}</Titulo>
        <p className="ajuda">
          Sua evolução: a melhor série de cada treino. <Selo id="acompanhamento.evolucao" />
        </p>
        {!linhas.length && <p>Ainda não há treino registrado deste exercício.</p>}
        {linhas.map((l) => (
          <section key={l.localId ?? 'todos'} className="pilha" aria-label={l.localId ? `Em ${localPorId(estado, l.localId)?.nome ?? 'outro local'}` : ex.nome}>
            {cargaDaMaquina(exId) && variosLocais && <h2 className="secao">Em {localPorId(estado, l.localId)?.nome ?? 'outro local'}</h2>}
            <Resumo pontos={l.pontos} exId={exId} />
            <ol className="pontos-evolucao">
              {l.pontos.map((p) => (
                <li key={p.sessaoId}>
                  <span className="pe-data">{dataCurta(p.data)}</span>
                  <span className="pe-serie">
                    {textoCarga(p.carga, exId)} × {p.reps}
                    <small> · RIR {p.rir}</small>
                  </span>
                  <span className="pe-marcas">
                    {p.acerto ? <span className="marca neutra">acerto da carga</span> : p.marcas.map((m) => <span key={m} className="marca">{TEXTO_MARCA[m]}</span>)}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}
        {cargaDaMaquina(exId) && variosLocais && <p className="ajuda">Nas máquinas, cada local tem a sua lista: a placa de uma torre não pesa o mesmo que a de outra.</p>}
      </main>
      <NavInferior atual="semana" />
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
