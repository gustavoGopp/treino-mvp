import { Link, Navigate, useParams } from 'react-router-dom';
import { BIBLIOTECA } from '../../domain/biblioteca';
import { evolucaoDoExercicio, type Marca } from '../../domain/acompanhamento/evolucao';
import { cargaDaMaquina, textoCarga } from '../../domain/sessao';
import { localDaSessao, localPorId } from '../../storage/esquema';
import { useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';

// Evolução de um exercício (acompanhamento.evolucao): a melhor série de cada treino, com "subiu a carga" e "recorde".
// Nunca uma carga máxima estimada. Nas máquinas, uma lista por local, com o nome do local.
const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
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
    <div className="wrap app">
      <Topo direita={<Link to="/semana">A sua semana</Link>} />
      <main className="conteudo evolucao">
        <Titulo>{ex.nome}</Titulo>
        <p className="ajuda">
          Sua evolução: a melhor série de cada treino. <Selo id="acompanhamento.evolucao" />
        </p>
        {!linhas.length && <p>Ainda não há treino registrado deste exercício.</p>}
        {linhas.map((l) => (
          <section key={l.localId ?? 'todos'} className="pilha" aria-label={l.localId ? `Em ${localPorId(estado, l.localId)?.nome ?? 'outro local'}` : ex.nome}>
            {cargaDaMaquina(exId) && variosLocais && <h2 className="secao">Em {localPorId(estado, l.localId)?.nome ?? 'outro local'}</h2>}
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
        <Link className="btn sec" to="/semana">
          Voltar à sua semana
        </Link>
      </main>
    </div>
  );
}
