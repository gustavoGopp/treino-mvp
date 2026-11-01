import { Link, Navigate } from 'react-router-dom';
import { BIBLIOTECA } from '../../domain/biblioteca';
import { diaDaSemana, resumoSessao, sugestaoDoExercicio, textoCarga } from '../../domain/sessao';
import { useApp } from '../app/estado';
import { Selo, Titulo, Topo } from '../app/ui';

// Fim do treino: resumo e a sugestão de cada exercício para a próxima vez (decisão 9 do M5).
const POR_ID = Object.fromEntries(BIBLIOTECA.map((e) => [e.id, e]));
const ACAO: Record<string, string> = {
  subir: 'Subir',
  manter: 'Manter',
  reduzir: 'Reduzir',
  voltar: 'Voltar à anterior',
  estagnado: 'Estagnado',
  ajustar: 'Ajustar',
  interromper: 'Trocar',
};

const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

export function Resumo() {
  const { estado } = useApp();
  const s = estado.historico.at(-1);
  const programa = estado.programa?.programa;
  if (!s || !programa) return <Navigate to="/programa" replace />;
  const dia = diaDaSemana(programa, s.diaId, s.semana);
  const r = resumoSessao(s);

  return (
    <div className="wrap app">
      <Topo direita={<Link to="/programa">Meu programa</Link>} />
      <main className="conteudo">
        <Titulo>{s.encerradaPorAlerta ? 'Treino encerrado por segurança' : 'Treino concluído'}</Titulo>
        {s.encerradaPorAlerta && (
          <div className="caixa-erro" role="alert">
            Pare o treino agora e descanse. Se o sintoma não passar em poucos minutos ou for forte, ligue para o SAMU: <b>192</b>. Antes de
            voltar a treinar, procure avaliação. <Selo id="seguranca.alerta.cardiovascular" />
          </div>
        )}
        <ul className="fichas" aria-label="Resumo do treino">
          <li>{dia.nome}</li>
          <li>{plural(r.exercicios, 'exercício', 'exercícios')}</li>
          <li>
            {plural(r.series, 'série', 'séries')} ({plural(r.efetivas, 'efetiva', 'efetivas')})
          </li>
          {r.minutos !== undefined && <li>{r.minutos} min</li>}
        </ul>
        <section aria-labelledby="proxima" className="pilha">
          <h2 id="proxima" className="secao">
            Para a próxima vez
          </h2>
          <ol className="cartoes-ex">
            {s.exercicios
              .filter((e) => e.series.length > 0)
              .map((e) => {
                const orig = dia.exercicios.find((x) => x.exId === (e.noLugarDe ?? e.exId));
                const alvo = { exId: e.exId, reps: (e.noLugarDe ? POR_ID[e.exId]?.faixaReps : orig?.reps) ?? [8, 12], rir: orig?.rir ?? [1, 2] };
                const sug = sugestaoDoExercicio(estado.historico, alvo as { exId: string; reps: [number, number]; rir: [number, number] }, estado.inventario ?? {});
                return (
                  <li key={e.exId} className="cartao-ex resumo-ex">
                    <div className="mais-corpo">
                      <h3>{POR_ID[e.exId]?.nome}</h3>
                      <p className="sub-rx">{e.series.map((x) => `${textoCarga(x.carga, e.exId)} × ${x.reps}`).join(' · ')}</p>
                      <p>
                        <b className={`acao acao-${sug.acao}`}>{ACAO[sug.acao]}</b>
                        {sug.proxima && <> · próxima: {textoCarga(sug.proxima, e.exId)}</>}
                      </p>
                      <p className="ajuda">
                        {sug.motivo} <Selo id={sug.regraId} />
                      </p>
                    </div>
                  </li>
                );
              })}
          </ol>
        </section>
        <Link className="btn" to="/programa">
          Voltar ao programa
        </Link>
      </main>
    </div>
  );
}
