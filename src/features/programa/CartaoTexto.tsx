import { useEffect, useState } from 'react';
import { carregarCartao, temCartao } from '../../conteudo/cartoes';
import type { CartaoTexto as Cartao } from '../../conteudo/schema';
import { Selo } from '../app/ui';

// Cartão de texto do exercício sem animação aprovada (CLAUDE.md, qualidade do guia): nunca uma animação
// improvisada. O texto vem da ficha de técnica (docs/pesquisa/animacoes/<id>.md).

const FASE: Record<Cartao['exec'][number][0], string> = { hold: 'Pausa', ecc: 'Descida', conc: 'Subida' };

export { temCartao };

/** O cartão do exercício, baixado na 1ª vez em que aparece (do service worker, em milissegundos, depois da instalação). */
function useCartao(exId: string) {
  const [c, setC] = useState<Cartao | null>(null);
  useEffect(() => {
    let vivo = true;
    setC(null);
    carregarCartao(exId).then((x) => vivo && setC(x));
    return () => {
      vivo = false;
    };
  }, [exId]);
  return c;
}

export function CartaoTexto({ exId, aberto = false }: { exId: string; aberto?: boolean }) {
  const c = useCartao(exId);
  if (!c) return null;
  // Design v2 (docs/revisoes/design-v2.md): abre no que se lê entre as séries (as dicas e os erros, como as
  // "3 cues" do guia); a montagem segura fica sempre à vista; o passo a passo completo fica recolhido.
  return (
    <details className="cartao-texto" open={aberto}>
      <summary>Como fazer (em texto)</summary>
      <div className="cartao-texto-corpo">
        <p className="ajuda">Trabalha: {c.target}.</p>
        <h4>Dicas</h4>
        <ul className="lista dicas">
          {c.cues.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4>Erros comuns</h4>
        <ul className="lista">
          {c.errors.map((e) => (
            <li key={e.id}>
              <b>{e.title}</b>: {e.desc}
            </li>
          ))}
        </ul>
        {c.montagem && (
          <>
            <h4>
              Montagem segura <Selo id="seguranca.montagem" />
            </h4>
            <ul className="lista">
              {c.montagem.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        )}
        <details className="passo-a-passo">
          <summary>Posição, execução e carga, passo a passo</summary>
          <h4>Posição</h4>
          <ul className="lista">
            {[...c.setupEq, ...c.setupBody].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h4>Execução</h4>
          <ol className="lista">
            {c.exec.map(([fase, titulo, texto]) => (
              <li key={titulo}>
                <b>{titulo}</b>
                <span className="sr"> ({FASE[fase]})</span>: {texto}
              </li>
            ))}
          </ol>
          <h4>Amplitude</h4>
          <ul className="lista">
            {c.range.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <h4>Carga</h4>
          <p>{c.carga}</p>
        </details>
      </div>
    </details>
  );
}
