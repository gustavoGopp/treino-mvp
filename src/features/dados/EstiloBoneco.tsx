import { useId, useLayoutEffect, useRef } from 'react';
import { comIdsUnicos, estiloDasListras } from '../programa/idsDoDesenho';
import { useDesenho } from '../programa/desenhoFora';
import { definirEstiloBoneco, useEstiloBoneco } from '../app/estiloBoneco';
import type { Estilo } from '../app/estiloBoneco';
import { Icone } from '../app/icones';

// "Meus dados" → Estilo do Boneco: o cinza é o padrão e o cor de pele é a opção (decisão do Gustavo, 16/11/2026). Os
// dois são o mesmo corpo do motor novo; muda a cor. O Boneco de antes, a Silhueta e o clássico saíram do app.
// Sessão de textos (16/11/2026, decisões do Gustavo): a folha são os dois bonecos para tocar, cada um com um nome de
// uma palavra embaixo ("Manequim" e "Pessoa"; a pesquisa 04 de docs/revisoes/textos/pesquisa dá imagem com nome como o
// padrão). O escolhido tem contorno e a marca de "certo" (não depende só de cor). Saíram a frase de explicação e a
// descrição de cada opção (de 52 para 6 palavras à vista).
const OPCOES: { id: Estilo; nome: string }[] = [
  { id: 'cinza', nome: 'Manequim' },
  { id: 'pele', nome: 'Pessoa' },
];

/** A prévia de um estilo, calculada no Worker do Boneco; até chegar, o quadro fica vazio. */
function Previa({ estilo }: { estilo: Estilo }) {
  const uid = useId();
  const q = useDesenho({ tipo: 'previa', estilo });
  const svg = useRef<SVGSVGElement>(null);
  // A prévia vem enquadrada para o movimento inteiro, e o corpo ocupa uma parte pequena dela. Aqui o quadro fecha em
  // volta do que foi desenhado (menos a linha do chão, que atravessa tudo), para o Boneco encher o cartão.
  useLayoutEffect(() => {
    const el = svg.current;
    if (!el || !q) return;
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const filho of Array.from(el.children)) {
      if (!(filho instanceof SVGGraphicsElement) || ['line', 'defs', 'clipPath'].includes(filho.tagName)) continue;
      const b = filho.getBBox();
      if (!b.width && !b.height) continue;
      x0 = Math.min(x0, b.x);
      y0 = Math.min(y0, b.y);
      x1 = Math.max(x1, b.x + b.width);
      y1 = Math.max(y1, b.y + b.height);
    }
    if (!Number.isFinite(x0)) return;
    const folga = (y1 - y0) * 0.14;
    el.setAttribute('viewBox', `${x0 - folga} ${y0 - folga} ${x1 - x0 + 2 * folga} ${y1 - y0 + 2 * folga}`);
  }, [q]);
  if (!q) return <svg viewBox="0 0 3 4" aria-hidden="true" />;
  return <svg ref={svg} className={q.classe || undefined} viewBox={q.viewBox} aria-hidden="true" style={estiloDasListras(uid)} dangerouslySetInnerHTML={{ __html: comIdsUnicos(q.html, uid) }} />;
}

export function EscolhaEstiloBoneco() {
  const estilo = useEstiloBoneco();
  return (
    <section className="box">
      <h2>Estilo do Boneco</h2>
      <div className="estilos-boneco" role="radiogroup" aria-label="Estilo do Boneco">
        {OPCOES.map((o) => (
          <label key={o.id} className="estilo-boneco">
            <input type="radio" name="estilo-boneco" value={o.id} checked={estilo === o.id} onChange={() => definirEstiloBoneco(o.id)} />
            <Previa estilo={o.id} />
            <span className="marca" aria-hidden="true">
              <Icone nome="check" />
            </span>
            <b>{o.nome}</b>
          </label>
        ))}
      </div>
    </section>
  );
}
