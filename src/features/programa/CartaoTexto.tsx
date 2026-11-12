import { useEffect, useState } from 'react';
import { carregarCartao, temCartao } from '../../conteudo/cartoes';
import type { CartaoTexto as Cartao } from '../../conteudo/schema';
import { Selo } from '../app/ui';
import { Folha } from '../app/Folha';

// Cartão de texto do exercício sem animação aprovada (CLAUDE.md, qualidade do guia): nunca uma animação
// improvisada. O texto vem da ficha de técnica (docs/pesquisa/animacoes/<id>.md).

const FASE: Record<Cartao['exec'][number][0], string> = { hold: 'Pausa', ecc: 'Descida', conc: 'Subida' };

export { temCartao };

/** O cartão do exercício, baixado na 1ª vez em que aparece (do service worker, em milissegundos, depois da instalação). */
function useCartao(exId: string) {
  const [c, setC] = useState<Cartao | null | 'erro'>(null);
  const [tentativa, setTentativa] = useState(0);
  useEffect(() => {
    let vivo = true;
    setC(null);
    carregarCartao(exId).then(
      (x) => vivo && setC(x),
      () => vivo && setC('erro'),
    );
    return () => {
      vivo = false;
    };
  }, [exId, tentativa]);
  return { c, tentativa, tentarDeNovo: () => setTentativa((n) => n + 1) };
}

export function CartaoTexto({ exId }: { exId: string }) {
  const { c, tentativa, tentarDeNovo } = useCartao(exId);
  const [aberto, setAberto] = useState(false);
  // O cartão traz a montagem segura: se ele não baixou (sem rede, versão nova publicada), a tela diz e deixa tentar de
  // novo. Antes, a falha ficava guardada até recarregar a página e o cartão sumia sem aviso.
  if (c === 'erro')
    return (
      <div className="cartao-texto">
        <p role="status" className="ajuda">
          Não deu para carregar o guia em texto deste exercício agora.
        </p>
        {/* O navegador costuma guardar a falha de um arquivo que não baixou: se a 2ª tentativa também falhar, só
            recarregando. O treino em andamento e o descanso ficam guardados e voltam. */}
        {tentativa === 0 ? (
          <button type="button" className="btn sec pequeno" onClick={tentarDeNovo}>
            Tentar de novo
          </button>
        ) : (
          <button type="button" className="btn sec pequeno" onClick={() => window.location.reload()}>
            Recarregar o app
          </button>
        )}
      </div>
    );
  if (!c) return null;
  // Redesign, lote 2: a montagem segura fica sempre aberta, com o selo (nunca recolhida: segurança à mão); as dicas,
  // os erros e o passo a passo abrem numa folha, sem empurrar o painel da série.
  return (
    <div className="cartao-texto">
      {c.montagem && (
        <section className="montagem" aria-labelledby={`mont-${c.id}`}>
          <h4 id={`mont-${c.id}`}>
            Montagem segura <Selo id="seguranca.montagem" />
          </h4>
          <ul className="lista">
            {c.montagem.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}
      <button type="button" className="link-guia como-fazer" aria-haspopup="dialog" onClick={() => setAberto(true)}>
        Como fazer: dicas e erros ›
      </button>
      {aberto && (
        <Folha titulo="Como fazer (em texto)" aoFechar={() => setAberto(false)} livre={() => document.querySelector<HTMLElement>('.alerta-topo')}>
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
        </Folha>
      )}
    </div>
  );
}
