import { useId } from 'react';
import { comIdsUnicos, estiloDasListras } from '../programa/idsDoDesenho';
import { useDesenho } from '../programa/desenhoFora';
import { definirEstiloBoneco, useEstiloBoneco } from '../app/estiloBoneco';
import type { Estilo } from '../app/estiloBoneco';

// "Meus dados" → Estilo do boneco: o cinza é o padrão e o cor de pele é a opção (decisão do Gustavo, 16/11/2026). Os
// dois são o mesmo corpo do motor novo; muda a cor. O Boneco de antes, a Silhueta e o clássico saíram do app.
const OPCOES: { id: Estilo; nome: string; desc: string }[] = [
  { id: 'cinza', nome: 'Cinza (padrão)', desc: 'Corpo cinza, com as linhas dos músculos; o músculo trabalhado é o que mais aparece.' },
  { id: 'pele', nome: 'Cor de pele', desc: 'O mesmo corpo, com cor de pele, cabelo, short e tênis.' },
];

/** A prévia de um estilo, calculada no Worker do Boneco; até chegar, o quadro fica vazio. */
function Previa({ estilo }: { estilo: Estilo }) {
  const uid = useId();
  const q = useDesenho({ tipo: 'previa', estilo });
  if (!q) return <svg viewBox="0 0 4 3" aria-hidden="true" />;
  return <svg className={q.classe || undefined} viewBox={q.viewBox} aria-hidden="true" style={estiloDasListras(uid)} dangerouslySetInnerHTML={{ __html: comIdsUnicos(q.html, uid) }} />;
}

export function EscolhaEstiloBoneco() {
  const estilo = useEstiloBoneco();
  return (
    <section className="box">
      <h2>Estilo do boneco</h2>
      <p>Como o guia desenha os exercícios. Vale para o guia e para as miniaturas do programa, neste aparelho.</p>
      <div className="estilos-boneco" role="radiogroup" aria-label="Estilo do boneco">
        {OPCOES.map((o) => {
          return (
            <label key={o.id} className="estilo-boneco">
              <input type="radio" name="estilo-boneco" value={o.id} checked={estilo === o.id} onChange={() => definirEstiloBoneco(o.id)} />
              <Previa estilo={o.id} />
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
