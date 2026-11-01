import { useState } from 'react';
import { Link } from 'react-router-dom';
import { gerarPrograma } from '../../domain/gerador';
import { REGRAS } from '../../domain/regras';
import { PERSONAS } from '../../../tests/personas';

// Tela de inspeção do gerador (só em desenvolvimento): escolhe uma persona fictícia e mostra o programa
// com o "porquê" de cada decisão e o selo de evidência da regra.

const Selo = ({ id }: { id: string }) => {
  const r = REGRAS[id];
  return (
    <span className="selo" title={r?.regra}>
      {r?.selo ?? '?'} · <code>{id}</code>
    </span>
  );
};

export function GeradorDev() {
  const [nome, setNome] = useState<keyof typeof PERSONAS>('bruno');
  const persona = PERSONAS[nome];
  const resultado = gerarPrograma(persona.perfil, persona.inventario);

  return (
    <div className="wrap dev">
      <header className="top">
        <div className="brand">
          <b>
            <Link to="/">Inspeção do gerador</Link>
          </b>
          <span>só em desenvolvimento · personas fictícias</span>
        </div>
        <nav className="days" aria-label="Personas">
          {Object.entries(PERSONAS).map(([k, p]) => (
            <button key={k} className="day" aria-pressed={k === nome} onClick={() => setNome(k as keyof typeof PERSONAS)}>
              {p.nome}
            </button>
          ))}
        </nav>
        <p className="note">{persona.descricao}</p>
      </header>

      {resultado.status === 'bloqueado' ? (
        <div className="warnbox">{resultado.triagem.mensagem}</div>
      ) : (
        <>
          <section className="box">
            <h2>{resultado.programa.divisao}</h2>
            <ul className="porques">
              {resultado.programa.porque.map((q) => (
                <li key={q.regraId}>
                  {q.texto} <Selo id={q.regraId} />
                </li>
              ))}
            </ul>
            {resultado.programa.avisos.map((a, i) => (
              <div key={i} className="warnbox">
                {a.texto} <Selo id={a.regraId} />
              </div>
            ))}
          </section>

          {resultado.programa.fases.length > 0 && (
            <section className="box">
              <h2>Fases</h2>
              <ul className="porques">
                {resultado.programa.fases.map((f) => (
                  <li key={f.semanas}>
                    <b>Semana {f.semanas}:</b> {f.texto} <Selo id={f.regraId} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {resultado.programa.dias.map((d) => (
            <section key={d.id} className="box">
              <h2>
                {d.nome} · ~{d.minutosEstimados} min
              </h2>
              {d.exercicios.map((x) => (
                <details key={x.exId} className="exdev">
                  <summary>
                    <b>{x.nome}</b> — {x.series} × {x.reps.join('–')} · RIR {x.rir.join('–')} · {(Math.round(x.descansoSeg / 15) / 4).toLocaleString('pt-BR')} min
                    {x.supersetCom && ' · bi-set'}
                    {x.dropSet && ' · drop set'}
                  </summary>
                  <ul className="porques">
                    {x.porque.map((q) => (
                      <li key={q.regraId}>
                        {q.texto} <Selo id={q.regraId} />
                      </li>
                    ))}
                    <li>
                      {x.animacaoId ? <Link to={`/guia/${x.animacaoId}`}>Abrir o guia animado</Link> : 'Sem animação aprovada: cartão de texto.'}
                    </li>
                    {x.alternativas.length > 0 && <li>Se estiver ocupado: {x.alternativas.join(', ')}</li>}
                  </ul>
                </details>
              ))}
            </section>
          ))}

          <section className="box">
            <h2>Volume semanal (séries fracionadas)</h2>
            <table className="vol">
              <thead>
                <tr>
                  <th>Músculo</th>
                  <th>Meta</th>
                  <th>Programa</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(resultado.programa.metas).map(([m, meta]) => (
                  <tr key={m}>
                    <td>{m}</td>
                    <td>{meta}</td>
                    <td>{resultado.programa.volumeSemanal[m as keyof typeof resultado.programa.volumeSemanal] ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}
