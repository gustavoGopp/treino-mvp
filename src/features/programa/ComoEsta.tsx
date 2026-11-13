import { useEffect, useState } from 'react';
import type { Achado, Avaliacao, Gravidade } from '../../domain/avaliador';
import type { Perfil, Programa } from '../../domain/gerador';
import type { Inventario } from '../../domain/taxonomia/equipamentos';
import { Selo } from '../app/ui';

// "Como está o seu programa" (R5b): a saída do avaliador (src/domain/avaliador; regra avaliador.gravidade) sobre o
// programa salvo, com os componentes de hoje. A tela própria é pedido ao design (revisoes/proximos-passos.md, 2.5, item 7).
// O avaliador vem num pacote à parte, carregado quando a folha abre: a tela do programa está no limite do orçamento.

const ROTULO: Record<Gravidade, string> = {
  seguranca: 'Segurança',
  alerta: 'Alerta',
  ajustar: 'Ajustar',
  limite: 'Limite',
  info: 'Para saber',
};

export function ComoEsta({ programa, perfil, inventario }: { programa: Programa; perfil: Perfil; inventario: Inventario }) {
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null | 'erro'>(null);
  const [tentativa, setTentativa] = useState(0);
  useEffect(() => {
    let vivo = true;
    setAvaliacao(null);
    import('../../domain/avaliador').then(
      ({ avaliar }) => vivo && setAvaliacao(avaliar(programa, perfil, inventario)),
      // sem rede e sem o arquivo guardado, ou versão nova publicada: a folha diz e deixa tentar de novo
      () => vivo && setAvaliacao('erro'),
    );
    return () => {
      vivo = false;
    };
  }, [programa, perfil, inventario, tentativa]);
  if (avaliacao === 'erro')
    return (
      <div className="pilha">
        <p role="status" className="ajuda">
          Não deu para conferir o programa agora. O seu treino continua valendo.
        </p>
        <button type="button" className="btn sec pequeno" onClick={() => setTentativa((n) => n + 1)}>
          Tentar de novo
        </button>
      </div>
    );
  if (!avaliacao) return <p className="ajuda">Conferindo o programa…</p>;
  const fortes = avaliacao.achados.filter((a) => a.gravidade === 'seguranca' || a.gravidade === 'alerta' || a.gravidade === 'ajustar');
  const leves = avaliacao.achados.filter((a) => a.gravidade === 'limite' || a.gravidade === 'info');
  return (
    <section aria-labelledby="como-esta" className="pilha">
      <h3 id="como-esta">Como está o seu programa</h3>
      <p>
        <b>{avaliacao.resumo}</b> <Selo id="avaliador.gravidade" />
      </p>
      {fortes.map((a) => (
        <LinhaDoAchado key={`${a.gravidade}-${a.tipo}-${a.regraId}`} a={a} className="warnbox" />
      ))}
      {leves.length > 0 && (
        <details className="box dobra">
          <summary>Limites e observações ({leves.length})</summary>
          <ul className="lista">
            {leves.map((a) => (
              <li key={`${a.gravidade}-${a.tipo}-${a.regraId}-${a.itens[0]}`}>
                <LinhaDoAchado a={a} />
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}

function LinhaDoAchado({ a, className }: { a: Achado; className?: string }) {
  return (
    <div className={className}>
      {/* num parágrafo: dentro da caixa de aviso, o rótulo, o texto e o selo seguem na mesma linha */}
      <p>
        <b>{ROTULO[a.gravidade]}:</b> {a.texto} {a.passo} <Selo id={a.regraId} />
      </p>
    </div>
  );
}
