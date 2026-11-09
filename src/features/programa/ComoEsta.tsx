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
  const [avaliacao, setAvaliacao] = useState<Avaliacao | null>(null);
  useEffect(() => {
    let vivo = true;
    void import('../../domain/avaliador').then(({ avaliar }) => {
      if (vivo) setAvaliacao(avaliar(programa, perfil, inventario));
    });
    return () => {
      vivo = false;
    };
  }, [programa, perfil, inventario]);
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
        <ul className="lista">
          {leves.map((a) => (
            <li key={`${a.gravidade}-${a.tipo}-${a.regraId}-${a.itens[0]}`}>
              <LinhaDoAchado a={a} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function LinhaDoAchado({ a, className }: { a: Achado; className?: string }) {
  return (
    <div className={className}>
      <b>{ROTULO[a.gravidade]}:</b> {a.texto} {a.passo} <Selo id={a.regraId} />
    </div>
  );
}
