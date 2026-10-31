import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICULACOES, BIBLIOTECA, type Articulacao } from '../../domain/biblioteca';
import { capacidades, ITENS, ITEM_IDS, type ItemId } from '../../domain/taxonomia/equipamentos';
import { agoraIso, gerarDoEstado, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Passo, Selo } from '../app/ui';
import { NOME_ARTICULACAO } from './Triagem';

// Passo 6: dores, equipamentos e exercícios a evitar. Ao terminar, gera o programa.
// Dor > 5 exclui os exercícios que carregam a articulação; 3–5 favorece outros (seguranca.dor.escala).

const INTENSIDADES = Array.from({ length: 10 }, (_, i) => i + 1);

export function Restricoes() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.restricoes;
  const [temDor, setTemDor] = useState<'sim' | 'nao' | undefined>(salva ? (salva.dores.length ? 'sim' : 'nao') : undefined);
  const [dores, setDores] = useState<Partial<Record<Articulacao, number | undefined>>>(() =>
    Object.fromEntries((salva?.dores ?? []).map((d) => [d.articulacao, d.intensidade])),
  );
  const [evitarEq, setEvitarEq] = useState<ItemId[]>(salva?.evitarEquipamentos ?? []);
  const [evitarEx, setEvitarEx] = useState<string[]>(salva?.evitarExercicios ?? []);
  const [tentou, setTentou] = useState(false);

  const inventario = estado.inventario;
  const meusItens = ITEM_IDS.filter((id) => inventario && id in inventario);
  const possiveis = useMemo(() => {
    const caps = capacidades(inventario ?? {});
    return BIBLIOTECA.filter((e) => e.requer.some((g) => g.every((c) => caps.has(c)))).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }, [inventario]);
  const regioesTriagem = estado.triagem?.regioes ?? [];

  const marcadas = (Object.keys(dores) as Articulacao[]).filter((a) => a in dores);
  const semNota = marcadas.filter((a) => !dores[a]);
  const erros = [
    !temDor && 'Diga se sente dor em alguma articulação.',
    temDor === 'sim' && !marcadas.length && 'Marque onde dói.',
    temDor === 'sim' && semNota.length > 0 && 'Dê uma nota de 1 a 10 para cada dor marcada.',
  ].filter((x): x is string => !!x);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    if (erros.length) return;
    atualizar((s) => {
      const restricoes = {
        evitarExercicios: evitarEx.filter((id) => possiveis.some((p) => p.id === id)).sort(),
        evitarEquipamentos: ITEM_IDS.filter((id) => evitarEq.includes(id) && meusItens.includes(id)),
        dores: temDor === 'sim' ? ARTICULACOES.filter((a) => dores[a]).map((a) => ({ articulacao: a, intensidade: dores[a]! })) : [],
      };
      const novo = { ...s, restricoes };
      const programa = gerarDoEstado(novo);
      return { ...novo, programa: programa ? { programa, geradoEm: agoraIso() } : undefined, ajustes: undefined };
    });
    navigate('/programa');
  };

  return (
    <Passo id="restricoes" titulo="Dores e o que evitar">
      <form onSubmit={enviar} noValidate className="form">
        {tentou && <Erros erros={erros} />}
        <Escolha
          nome="tem-dor"
          legenda="Você sente dor em alguma articulação hoje?"
          ajuda={
            <>
              Dor acima de 5 tira do programa os exercícios que carregam a articulação; de 3 a 5, o app prefere outros. <Selo id="seguranca.dor.escala" />
            </>
          }
          opcoes={[
            { id: 'sim', texto: 'Sim' },
            { id: 'nao', texto: 'Não' },
          ]}
          valor={temDor}
          aoMudar={setTemDor}
          erro={tentou && !temDor ? 'Escolha uma opção.' : undefined}
          linha
        />
        {temDor === 'sim' && (
          <fieldset className={`campo sub${tentou && (semNota.length || !marcadas.length) ? ' com-erro' : ''}`}>
            <legend>Onde dói e quanto (de 1 a 10)?</legend>
            {ARTICULACOES.map((a) => (
              <div key={a} className="dor">
                <Marcar
                  marcado={a in dores}
                  aoMudar={(v) =>
                    setDores((d) => {
                      const n = { ...d };
                      if (v) n[a] = undefined;
                      else delete n[a];
                      return n;
                    })
                  }
                >
                  {NOME_ARTICULACAO[a]}
                </Marcar>
                {a in dores && (
                  <label className="nota">
                    <span>Nota da dor no {NOME_ARTICULACAO[a].toLowerCase()}</span>
                    <select value={dores[a] ?? ''} onChange={(e) => setDores((d) => ({ ...d, [a]: Number(e.target.value) || undefined }))}>
                      <option value="">Escolha</option>
                      {INTENSIDADES.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            ))}
            <p className="ajuda">Dor forte, que piora ou que dura mais de 1 a 2 semanas pede avaliação profissional.</p>
          </fieldset>
        )}
        {regioesTriagem.length > 0 && (
          <p className="ajuda">
            Pela triagem, já ficam fora os exercícios que carregam: {regioesTriagem.map((r) => NOME_ARTICULACAO[r].toLowerCase()).join(', ')}.
          </p>
        )}
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
        <details className="campo dobra">
          <summary>Algum exercício que você quer evitar? (opcional)</summary>
          <div className="opcoes">
            {possiveis.map((ex) => (
              <Marcar key={ex.id} marcado={evitarEx.includes(ex.id)} aoMudar={(v) => setEvitarEx((x) => (v ? [...x, ex.id] : x.filter((y) => y !== ex.id)))}>
                {ex.nome}
              </Marcar>
            ))}
          </div>
        </details>
        <button type="submit" className="btn">
          Gerar meu programa
        </button>
      </form>
    </Passo>
  );
}
