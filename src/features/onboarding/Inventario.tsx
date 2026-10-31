import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITENS, type ItemId } from '../../domain/taxonomia/equipamentos';
import { useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Numero, Passo } from '../app/ui';
import { CATEGORIAS, deForm, itensDaCategoria, paraForm, type FormInventario } from './inventarioForm';

// Passo 5: checklist do equipamento, por categoria, com os atributos que mudam a prescrição.
// A foto entra no M4: aqui fica só o lugar reservado, sem botão.

const SIM_NAO = [
  { id: 'sim', texto: 'Sim' },
  { id: 'nao', texto: 'Não' },
] as const;
const simNao = (v: boolean | undefined) => (v === undefined ? undefined : v ? 'sim' : 'nao');

export function Inventario() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const [f, setF] = useState<FormInventario>(() => paraForm(estado.inventario));
  const [erros, setErros] = useState<Record<string, string>>({});
  const [tentou, setTentou] = useState(false);

  const marcar = (id: ItemId, v: boolean) => setF((x) => ({ ...x, marcados: v ? [...x.marcados, id] : x.marcados.filter((m) => m !== id) }));
  const set = <K extends keyof FormInventario>(k: K, v: Partial<FormInventario[K]>) => setF((x) => ({ ...x, [k]: { ...(x[k] as object), ...v } }));
  const e = (k: string) => (tentou ? erros[k] : undefined);

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTentou(true);
    const r = deForm(f);
    setErros(r.erros);
    if (!r.inventario) return;
    atualizar((s) => ({ ...s, inventario: r.inventario! }));
    navigate('/comecar/restricoes');
  };

  const nErros = Object.keys(erros).length;

  const atributos = (id: ItemId) => {
    switch (id) {
      case 'halteres_fixos':
        return (
          <div className="sub">
            <p className="ajuda">Ex.: de 2 a 20 kg, de 2 em 2. Isso define as cargas que o app pode sugerir.</p>
            <div className="trio">
              <Numero rotulo="Mais leve" valor={f.halteres.min} aoMudar={(v) => set('halteres', { min: v })} sufixo="kg" min={0} erro={e('halteres.min')} />
              <Numero rotulo="Mais pesado" valor={f.halteres.max} aoMudar={(v) => set('halteres', { max: v })} sufixo="kg" min={0} erro={e('halteres.max')} />
              <Numero rotulo="De quanto em quanto" valor={f.halteres.passo} aoMudar={(v) => set('halteres', { passo: v })} sufixo="kg" min={0} erro={e('halteres.passo')} />
            </div>
          </div>
        );
      case 'anilhas_e_manoplas':
        return (
          <div className="sub">
            <div className="trio">
              <Numero rotulo="Manoplas" valor={f.anilhas.manoplas} aoMudar={(v) => set('anilhas', { manoplas: v })} passo={1} min={1} erro={e('anilhas.manoplas')} />
              <Numero rotulo="Peso de cada manopla" valor={f.anilhas.manoplaKg} aoMudar={(v) => set('anilhas', { manoplaKg: v })} sufixo="kg" min={0} erro={e('anilhas.manoplaKg')} />
            </div>
            <fieldset className={`campo${e('anilhas.linhas') ? ' com-erro' : ''}`}>
              <legend>Anilhas</legend>
              <p className="ajuda">Uma linha por peso. Ex.: 4 anilhas de 2 kg.</p>
              {e('anilhas.linhas') && <p className="erro">{e('anilhas.linhas')}</p>}
              {f.anilhas.linhas.map((l, i) => (
                <div key={i} className="trio anilha">
                  <Numero
                    rotulo={`Peso (linha ${i + 1})`}
                    valor={l.kg}
                    aoMudar={(v) => set('anilhas', { linhas: f.anilhas.linhas.map((x, j) => (j === i ? { ...x, kg: v } : x)) })}
                    sufixo="kg"
                    min={0}
                    erro={e(`anilhas.${i}.kg`)}
                  />
                  <Numero
                    rotulo={`Quantidade (linha ${i + 1})`}
                    valor={l.qtd}
                    aoMudar={(v) => set('anilhas', { linhas: f.anilhas.linhas.map((x, j) => (j === i ? { ...x, qtd: v } : x)) })}
                    passo={1}
                    min={1}
                    erro={e(`anilhas.${i}.qtd`)}
                  />
                  {f.anilhas.linhas.length > 1 && (
                    <button type="button" className="btn sec pequeno" onClick={() => set('anilhas', { linhas: f.anilhas.linhas.filter((_, j) => j !== i) })}>
                      Remover linha {i + 1}
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="btn sec pequeno" onClick={() => set('anilhas', { linhas: [...f.anilhas.linhas, { kg: '', qtd: '' }] })}>
                Adicionar outro peso de anilha
              </button>
            </fieldset>
          </div>
        );
      case 'estacao_polia_dupla':
        return (
          <div className="sub">
            <p className="ajuda">Opcional: ajuda a sugerir a carga em placas.</p>
            <div className="trio">
              <Numero rotulo="Placas por torre (opcional)" valor={f.poliaDupla.placas} aoMudar={(v) => set('poliaDupla', { placas: v })} passo={1} min={1} erro={e('poliaDupla.placas')} />
              <Numero rotulo="Peso de cada placa (opcional)" valor={f.poliaDupla.kgPorPlaca} aoMudar={(v) => set('poliaDupla', { kgPorPlaca: v })} sufixo="kg" min={0} erro={e('poliaDupla.kgPorPlaca')} />
            </div>
          </div>
        );
      case 'polia_simples':
        return (
          <div className="sub">
            <Escolha
              nome="polia-regulavel"
              legenda="A altura da polia é regulável?"
              opcoes={SIM_NAO}
              valor={simNao(f.poliaSimples.regulavel)}
              aoMudar={(v) => set('poliaSimples', { regulavel: v === 'sim' })}
              erro={e('poliaSimples.regulavel')}
              linha
            />
            <Numero rotulo="Placas (opcional)" valor={f.poliaSimples.placas} aoMudar={(v) => set('poliaSimples', { placas: v })} passo={1} min={1} erro={e('poliaSimples.placas')} />
          </div>
        );
      case 'banco_regulavel':
        return (
          <div className="sub">
            <Escolha
              nome="banco-declina"
              legenda="O banco também declina (cabeça abaixo dos pés)?"
              opcoes={SIM_NAO}
              valor={simNao(f.bancoRegulavel.declina)}
              aoMudar={(v) => set('bancoRegulavel', { declina: v === 'sim' })}
              erro={e('bancoRegulavel.declina')}
              linha
            />
          </div>
        );
      case 'elasticos':
        return (
          <div className="sub">
            <Numero
              rotulo="Quantas intensidades (cores) diferentes?"
              ajuda="Ex.: 3 elásticos de forças diferentes."
              valor={f.elasticos.intensidades}
              aoMudar={(v) => set('elasticos', { intensidades: v })}
              passo={1}
              min={1}
              erro={e('elasticos.intensidades')}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Passo id="inventario" titulo="Que equipamento você tem?">
      <p className="lede">Marque só o que você tem à disposição. Sem nada marcado, o programa usa o peso do corpo.</p>
      <div className="reservado" aria-label="Foto do equipamento">
        <b>Foto do equipamento</b>
        <span>Em breve: tire uma foto e o app reconhece o equipamento. Por enquanto, use a lista.</span>
      </div>
      <form onSubmit={enviar} noValidate className="form">
        {tentou && nErros > 0 && <Erros erros={[nErros === 1 ? 'Há 1 campo para corrigir.' : `Há ${nErros} campos para corrigir.`]} />}
        {CATEGORIAS.map((c) => (
          <fieldset key={c.id} className="campo categoria">
            <legend>{c.titulo}</legend>
            <div className="opcoes">
              {itensDaCategoria(c.id).map((id) => (
                <div key={id}>
                  <Marcar marcado={f.marcados.includes(id)} aoMudar={(v) => marcar(id, v)}>
                    {ITENS[id].nome}
                  </Marcar>
                  {f.marcados.includes(id) && atributos(id)}
                </div>
              ))}
            </div>
          </fieldset>
        ))}
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
