import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BIBLIOTECA } from '../../domain/biblioteca';
import { efeitoDaDor } from '../../domain/triagem';
import { capacidades, ITENS, ITEM_IDS, type ItemId } from '../../domain/taxonomia/equipamentos';
import { inventarioDeTodos } from '../../storage/esquema';
import { agoraIso, comProgramaNovo, useApp } from '../app/estado';
import { NOME_NIVEL } from '../../domain/nivel';
import { NOME_GRUPO } from '../../domain/gerador/opcoes';
import { Marcar, Passo, Selo } from '../app/ui';
import { NOME_ARTICULACAO } from './Triagem';

// Passo 6: confirmar (design v2, item F). O resumo do que a pessoa respondeu, cada linha leva de volta ao passo; o que
// evitar (equipamentos e exercícios) fica numa linha opcional, recolhida. Ao terminar, gera o programa.
// A dor é perguntada só na triagem, com a nota de hoje (seguranca.dor.programa); aqui aparece o resumo.

const EFEITO = {
  exclui: 'os exercícios que carregam a região ficam de fora',
  'prefere-outros': 'o app prefere exercícios que poupam a região',
  lembrete: 'programa normal, com um lembrete nos exercícios da região',
} as const;

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
  const doresTriagem = estado.triagem?.dores ?? [];

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    atualizar((s) => {
      const restricoes = {
        evitarExercicios: evitarEx.filter((id) => possiveis.some((p) => p.id === id)).sort(),
        evitarEquipamentos: ITEM_IDS.filter((id) => evitarEq.includes(id) && meusItens.includes(id)),
      };
      const novo = { ...s, restricoes };
      return { ...comProgramaNovo(novo, agoraIso(), true), ajustes: undefined };
    });
    navigate('/programa');
  };

  const r = estado.rotina;
  const algumSim = estado.triagem ? Object.values(estado.triagem.respostas).some(Boolean) : false;
  const resumo = [
    { rotulo: 'Saúde', valor: algumSim ? 'Alguma condição marcada' : 'Nenhuma condição', para: '/comecar/triagem' },
    { rotulo: 'Nível', valor: estado.nivel ? NOME_NIVEL[estado.nivel.escolhido] : '—', para: '/comecar/nivel' },
    { rotulo: 'Rotina', valor: r ? `${r.diasSemana} dias por semana · até ${r.minutosSessao} min` : '—', para: '/comecar/rotina' },
    { rotulo: 'Prioridade', valor: r?.prioridades.length ? r.prioridades.map((g) => NOME_GRUPO[g]).join(', ') : 'Nenhuma', para: '/comecar/rotina' },
    {
      rotulo: 'Equipamento',
      valor: meusItens.length ? `${meusItens.length} ${meusItens.length === 1 ? 'item' : 'itens'}` : 'Só o peso do corpo',
      para: '/comecar/inventario',
    },
  ];
  const evitando = evitarEq.length + evitarEx.length;

  return (
    <Passo id="restricoes" titulo="Tudo certo?">
      <form onSubmit={enviar} noValidate className="form">
        <ul className="resumo-cadastro" aria-label="O que você respondeu">
          {resumo.map((x) => (
            <li key={x.rotulo}>
              <Link to={x.para}>
                <span>
                  {x.valor}
                  <small>{x.rotulo}</small>
                </span>
                <span aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
        {doresTriagem.length > 0 && (
          <div className="box">
            <p>
              Pela triagem: <Selo id="seguranca.dor.programa" />
            </p>
            <ul className="lista">
              {doresTriagem.map((d) => (
                <li key={d.articulacao}>
                  {NOME_ARTICULACAO[d.articulacao]}, {d.nota === undefined ? 'sem a nota de hoje' : `dor ${d.nota} hoje`}:{' '}
                  {EFEITO[efeitoDaDor(d.nota)]}.
                </li>
              ))}
            </ul>
            {doresTriagem.some((d) => d.nota === undefined) && (
              <p className="ajuda">
                Para dar a nota de hoje, volte à <Link to="/comecar/triagem">triagem</Link>.
              </p>
            )}
          </div>
        )}
        <details className="campo dobra evitar" open={evitando > 0}>
          <summary>Algo a evitar? (opcional){evitando ? ` · ${evitando} marcado${evitando > 1 ? 's' : ''}` : ''}</summary>
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
        </details>
        <div className="acao-fixa">
          <button type="submit" className="btn">
            Gerar meu programa
          </button>
        </div>
      </form>
    </Passo>
  );
}
