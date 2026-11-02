import { EX } from '../../engine';
import { montarPrevia, type Estilo } from '../../engine/estilo';
import { definirEstiloBoneco, useEstiloBoneco } from '../app/estiloBoneco';

// "Meus dados" → Estilo do boneco: o boneco novo é o padrão; o clássico e a silhueta ficam como opção.
const OPCOES: { id: Estilo; nome: string; desc: string }[] = [
  { id: 'a', nome: 'Boneco (padrão)', desc: 'Corpo com volume, contorno e músculos com forma de músculo.' },
  { id: 'atual', nome: 'Clássico', desc: 'O boneco de traços do guia original.' },
  { id: 'b', nome: 'Silhueta', desc: 'Corpo liso, sem contorno; o músculo é o que mais aparece.' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const goblet: any = EX.find((e: { id: string }) => e.id === 'goblet');
const previas = new Map<Estilo, { viewBox: string; html: string; classe: string }>();
function previa(e: Estilo) {
  if (!previas.has(e)) {
    const fundo = goblet.seq[2];
    previas.set(e, montarPrevia(goblet, 'lateral', 'mus', fundo.t0 + fundo.dur / 2, e));
  }
  return previas.get(e)!;
}

export function EscolhaEstiloBoneco() {
  const estilo = useEstiloBoneco();
  return (
    <section className="box">
      <h2>Estilo do boneco</h2>
      <p>Como o guia desenha os exercícios. Vale para o guia e para as miniaturas do programa, neste aparelho.</p>
      <div className="estilos-boneco" role="radiogroup" aria-label="Estilo do boneco">
        {OPCOES.map((o) => {
          const q = previa(o.id);
          return (
            <label key={o.id} className="estilo-boneco">
              <input type="radio" name="estilo-boneco" value={o.id} checked={estilo === o.id} onChange={() => definirEstiloBoneco(o.id)} />
              <svg className={q.classe || undefined} viewBox={q.viewBox} aria-hidden="true" dangerouslySetInnerHTML={{ __html: q.html }} />
              <span>
                <b>{o.nome}</b>
                <small>{o.desc}</small>
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
