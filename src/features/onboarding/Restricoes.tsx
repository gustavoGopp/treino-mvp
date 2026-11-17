import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BIBLIOTECA } from '../../domain/biblioteca';
import { capacidades, ITENS, ITEM_IDS, type ItemId } from '../../domain/taxonomia/equipamentos';
import { inventarioDeTodos, primeiroPassoPendente } from '../../storage/esquema';
import { agoraIso, comProgramaNovo, useApp } from '../app/estado';
import { Marcar, Titulo, Topo } from '../app/ui';

// "Algo a evitar" (lote 3 do redesign; pedido 5): saiu do cadastro e fica em Meus dados. Equipamentos que a pessoa tem
// mas prefere não usar e exercícios a evitar; ao salvar, o programa é gerado de novo. Sem nada aqui, vale "nada a evitar".

export function Restricoes() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.restricoes;
  const [evitarEq, setEvitarEq] = useState<ItemId[]>(salva?.evitarEquipamentos ?? []);
  const [evitarEx, setEvitarEx] = useState<string[]>(salva?.evitarExercicios ?? []);

  const inventario = useMemo(() => inventarioDeTodos(estado), [estado]);
  const meusItens = ITEM_IDS.filter((id) => inventario && id in inventario);
  const possiveis = useMemo(() => {
    const caps = capacidades(inventario ?? {});
    return BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((c) => caps.has(c)))).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }, [inventario]);

  const pendente = primeiroPassoPendente(estado);
  if (pendente) return <Navigate to={pendente.rota} replace />;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    atualizar((s) => {
      const restricoes = {
        evitarExercicios: evitarEx.filter((id) => possiveis.some((p) => p.id === id)).sort(),
        evitarEquipamentos: ITEM_IDS.filter((id) => evitarEq.includes(id) && meusItens.includes(id)),
      };
      return { ...comProgramaNovo({ ...s, restricoes }, agoraIso()), ajustes: undefined };
    });
    navigate('/programa');
  };

  return (
    <div className="wrap app">
      <Topo voltar={{ para: '/dados', rotulo: 'Meus dados' }} />
      <main className="conteudo">
        <Titulo>Algo a evitar</Titulo>
        <p className="lede">Opcional. O programa é gerado de novo sem o que você marcar.</p>
        <form onSubmit={enviar} noValidate className="form">
          {meusItens.length > 0 && (
            <fieldset className="campo">
              <legend>Algum equipamento que você tem, mas prefere não usar? (opcional)</legend>
              <div className="opcoes">
                {meusItens.map((id) => (
                  <Marcar key={id} marcado={evitarEq.includes(id)} aoMudar={(v) => setEvitarEq((x) => (v ? [...x, id] : x.filter((y) => y !== id)))}>
                    {ITENS[id].nome}
                  </Marcar>
                ))}
              </div>
            </fieldset>
          )}
          <details className="campo dobra" open={evitarEx.length > 0}>
            <summary>Algum exercício que você quer evitar? (opcional)</summary>
            <div className="opcoes">
              {possiveis.map((ex) => (
                <Marcar
                  key={ex.id}
                  marcado={evitarEx.includes(ex.id)}
                  aoMudar={(v) => setEvitarEx((x) => (v ? [...x, ex.id] : x.filter((y) => y !== ex.id)))}
                >
                  {ex.nome}
                </Marcar>
              ))}
            </div>
          </details>
          <div className="acao-fixa">
            <button type="submit" className="btn">
              Salvar e gerar o programa
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
