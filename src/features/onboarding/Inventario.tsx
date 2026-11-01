import { useId, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITENS, type ItemId } from '../../domain/taxonomia/equipamentos';
import { useApp } from '../app/estado';
import { Erros, Escolha, Numero, Passo } from '../app/ui';
import { FotoEquipamento } from './FotoEquipamento';
import { IconeEquipamento } from './icones';
import { ALTURAS_POLIA, ESTACOES_MULTIFUNCIONAL } from '../../domain/taxonomia/equipamentos';
import {
  CATEGORIAS,
  comSugestoes,
  deForm,
  itensDaCategoria,
  NOME_ALTURA,
  NOME_CURTO,
  NOME_ESTACAO,
  paraForm,
  VALORES,
  type FormInventario,
} from './inventarioForm';

// Passo 5: equipamento. Cartões com desenho para tocar (quem não sabe o nome reconhece pela forma) e
// detalhes escolhidos por toque, com "outro" para valores fora da lista. A foto (M4) sugere; a pessoa confirma.

const SIM_NAO = [
  { id: 'sim', texto: 'Sim' },
  { id: 'nao', texto: 'Não' },
] as const;
const simNao = (v: boolean | undefined) => (v === undefined ? undefined : v ? 'sim' : 'nao');
const kg = (n: number) => `${n.toLocaleString('pt-BR')} kg`;
const ITENS_COM_DETALHES: ItemId[] = [
  'halteres_fixos',
  'anilhas_e_manoplas',
  'polia_simples',
  'banco_regulavel',
  'elasticos',
  'estacao_polia_dupla',
  'multifuncional',
  'kettlebell',
  'voador',
  'triceps_maquina',
];

/** Vários valores marcados por toque (estações do multifuncional, pesos do kettlebell). */
function MarcarVarios<T extends string | number>({
  legenda,
  opcoes,
  marcados,
  aoMudar,
  erro,
  ajuda,
}: {
  legenda: string;
  opcoes: { id: T; texto: string }[];
  marcados: T[];
  aoMudar: (v: T[]) => void;
  erro?: string;
  ajuda?: string;
}) {
  return (
    <fieldset className={`campo${erro ? ' com-erro' : ''}`}>
      <legend>{legenda}</legend>
      {ajuda && <p className="ajuda">{ajuda}</p>}
      {erro && <p className="erro">{erro}</p>}
      <div className="chips-valor">
        {opcoes.map((o) => (
          <label key={String(o.id)} className="chip-valor">
            <input
              type="checkbox"
              checked={marcados.includes(o.id)}
              onChange={(ev) => aoMudar(ev.target.checked ? [...marcados, o.id] : marcados.filter((m) => m !== o.id))}
            />
            <span>{o.texto}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Valor escolhido por toque entre os comuns, ou digitado em "Outro". */
function ValorPorToque({
  legenda,
  valores,
  valor,
  aoMudar,
  erro,
  formato = kg,
}: {
  legenda: string;
  valores: readonly number[];
  valor: string;
  aoMudar: (v: string) => void;
  erro?: string;
  formato?: (n: number) => string;
}) {
  const nome = useId();
  const n = valor.trim() === '' ? undefined : Number(valor.replace(',', '.'));
  const naLista = n !== undefined && valores.includes(n);
  const [outro, setOutro] = useState(valor.trim() !== '' && !naLista);
  return (
    <fieldset className={`campo${erro ? ' com-erro' : ''}`}>
      <legend>{legenda}</legend>
      {erro && <p className="erro">{erro}</p>}
      <div className="chips-valor">
        {valores.map((v) => (
          <label key={v} className="chip-valor">
            <input
              type="radio"
              name={nome}
              checked={!outro && n === v}
              onChange={() => {
                setOutro(false);
                aoMudar(String(v));
              }}
            />
            <span>{formato(v)}</span>
          </label>
        ))}
        <label className="chip-valor">
          <input
            type="radio"
            name={nome}
            checked={outro}
            onChange={() => {
              setOutro(true);
              aoMudar('');
            }}
          />
          <span>Outro</span>
        </label>
      </div>
      {outro && <Numero rotulo={`${legenda}: outro valor`} valor={valor} aoMudar={aoMudar} min={0} sufixo="kg" />}
    </fieldset>
  );
}

/** Contador com botões grandes de − e +. */
function Contador({
  rotulo,
  texto,
  valor,
  aoMudar,
  passo = 1,
}: {
  rotulo: string;
  texto: string;
  valor: number;
  aoMudar: (n: number) => void;
  passo?: number;
}) {
  return (
    <div className={`contador${valor > 0 ? ' ativo' : ''}`}>
      <span className="contador-rotulo">{texto}</span>
      <button type="button" aria-label={`Menos ${rotulo}`} disabled={valor <= 0} onClick={() => aoMudar(Math.max(0, valor - passo))}>
        −
      </button>
      <output aria-live="polite" aria-label={`Quantidade de ${rotulo}`}>
        {valor}
      </output>
      <button type="button" aria-label={`Mais ${rotulo}`} onClick={() => aoMudar(valor + passo)}>
        +
      </button>
    </div>
  );
}

function Detalhes({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section className="detalhes-eq" aria-label={`Detalhes: ${titulo}`}>
      <h2>{titulo}</h2>
      {children}
    </section>
  );
}

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

  // Anilhas: um contador por peso comum (de 2 em 2, porque vêm em pares) + pesos que a pessoa já tinha informado.
  const qtdAnilha = (p: number) => Number(f.anilhas.linhas.find((l) => Number(l.kg.replace(',', '.')) === p)?.qtd || 0);
  const mudarAnilha = (p: number, q: number) =>
    set('anilhas', {
      linhas: [...f.anilhas.linhas.filter((l) => Number(l.kg.replace(',', '.')) !== p), { kg: String(p), qtd: String(q) }]
        .filter((l) => l.qtd !== '0')
        .sort((a, b) => Number(a.kg) - Number(b.kg)),
    });
  const pesosAnilha = [...new Set([...VALORES.anilhaKg, ...f.anilhas.linhas.map((l) => Number(l.kg.replace(',', '.'))).filter((n) => n > 0)])].sort((a, b) => a - b);
  const [novoPeso, setNovoPeso] = useState('');

  const detalhes = (id: ItemId) => {
    switch (id) {
      case 'halteres_fixos':
        return (
          <Detalhes titulo="Halteres fixos">
            <p className="ajuda">Isso define as cargas que o app pode sugerir.</p>
            <ValorPorToque legenda="O mais leve" valores={VALORES.halterMin} valor={f.halteres.min} aoMudar={(v) => set('halteres', { min: v })} erro={e('halteres.min')} />
            <ValorPorToque legenda="O mais pesado" valores={VALORES.halterMax} valor={f.halteres.max} aoMudar={(v) => set('halteres', { max: v })} erro={e('halteres.max')} />
            <ValorPorToque legenda="De quanto em quanto" valores={VALORES.halterPasso} valor={f.halteres.passo} aoMudar={(v) => set('halteres', { passo: v })} erro={e('halteres.passo')} />
          </Detalhes>
        );
      case 'anilhas_e_manoplas':
        return (
          <Detalhes titulo="Anilhas e manoplas">
            <Escolha
              nome="manoplas"
              legenda="Quantas manoplas?"
              opcoes={[1, 2, 3, 4].map((n) => ({ id: String(n), texto: String(n) }))}
              valor={f.anilhas.manoplas || undefined}
              aoMudar={(v) => set('anilhas', { manoplas: v })}
              erro={e('anilhas.manoplas')}
              linha
            />
            <ValorPorToque legenda="Peso de cada manopla" valores={VALORES.manoplaKg} valor={f.anilhas.manoplaKg} aoMudar={(v) => set('anilhas', { manoplaKg: v })} erro={e('anilhas.manoplaKg')} />
            <fieldset className={`campo${e('anilhas.linhas') ? ' com-erro' : ''}`}>
              <legend>Quantas anilhas de cada peso?</legend>
              <p className="ajuda">Toque em + para cada par de anilhas.</p>
              {e('anilhas.linhas') && <p className="erro">{e('anilhas.linhas')}</p>}
              <div className="contadores">
                {pesosAnilha.map((p) => (
                  <Contador key={p} rotulo={`anilhas de ${kg(p)}`} texto={kg(p)} valor={qtdAnilha(p)} passo={2} aoMudar={(q) => mudarAnilha(p, q)} />
                ))}
              </div>
              <div className="outro-peso">
                <Numero rotulo="Outro peso de anilha" valor={novoPeso} aoMudar={setNovoPeso} min={0} sufixo="kg" />
                <button
                  type="button"
                  className="btn sec pequeno"
                  onClick={() => {
                    const p = Number(novoPeso.replace(',', '.'));
                    if (p > 0) mudarAnilha(p, Math.max(2, qtdAnilha(p)));
                    setNovoPeso('');
                  }}
                >
                  Adicionar
                </button>
              </div>
            </fieldset>
          </Detalhes>
        );
      case 'estacao_polia_dupla':
        return (
          <Detalhes titulo="Polia dupla">
            <details className="dobra">
              <summary>Placas da torre (opcional)</summary>
              <div className="trio">
                <Numero rotulo="Placas por torre" valor={f.poliaDupla.placas} aoMudar={(v) => set('poliaDupla', { placas: v })} passo={1} min={1} erro={e('poliaDupla.placas')} />
                <Numero rotulo="Peso de cada placa" valor={f.poliaDupla.kgPorPlaca} aoMudar={(v) => set('poliaDupla', { kgPorPlaca: v })} sufixo="kg" min={0} erro={e('poliaDupla.kgPorPlaca')} />
              </div>
            </details>
          </Detalhes>
        );
      case 'polia_simples':
        return (
          <Detalhes titulo="Polia simples">
            <Escolha
              nome="polia-altura"
              legenda="Onde fica a polia?"
              opcoes={ALTURAS_POLIA.map((a) => ({ id: a, texto: NOME_ALTURA[a] }))}
              valor={f.poliaSimples.altura}
              aoMudar={(v) => set('poliaSimples', { altura: v })}
              erro={e('poliaSimples.altura')}
              linha
            />
          </Detalhes>
        );
      case 'multifuncional':
        return (
          <Detalhes titulo="Multifuncional">
            <MarcarVarios
              legenda="Quais estações o seu tem?"
              ajuda="Cada estação vale como a máquina dela."
              opcoes={ESTACOES_MULTIFUNCIONAL.map((x) => ({ id: x, texto: NOME_ESTACAO[x] }))}
              marcados={f.multifuncional.estacoes}
              aoMudar={(v) => set('multifuncional', { estacoes: v })}
              erro={e('multifuncional.estacoes')}
            />
          </Detalhes>
        );
      case 'kettlebell':
        return (
          <Detalhes titulo="Kettlebell">
            <MarcarVarios
              legenda="Quais pesos você tem?"
              ajuda="O número costuma estar pintado no kettlebell."
              opcoes={[...new Set([...VALORES.kettlebellKg, ...f.kettlebell.pesos])].sort((a, b) => a - b).map((k) => ({ id: k, texto: kg(k) }))}
              marcados={f.kettlebell.pesos}
              aoMudar={(v) => set('kettlebell', { pesos: v })}
              erro={e('kettlebell.pesos')}
            />
          </Detalhes>
        );
      case 'voador':
        return (
          <Detalhes titulo="Voador">
            <Escolha
              nome="voador-invertido"
              legenda="O voador também vira para trás (para o ombro posterior)?"
              opcoes={SIM_NAO}
              valor={simNao(f.voador.invertido)}
              aoMudar={(v) => set('voador', { invertido: v === 'sim' })}
              erro={e('voador.invertido')}
              linha
            />
          </Detalhes>
        );
      case 'triceps_maquina':
        return (
          <Detalhes titulo="Máquina de tríceps">
            <Escolha
              nome="triceps-acima"
              legenda="O braço fica acima da cabeça nessa máquina?"
              opcoes={SIM_NAO}
              valor={simNao(f.tricepsMaquina.acimaDaCabeca)}
              aoMudar={(v) => set('tricepsMaquina', { acimaDaCabeca: v === 'sim' })}
              erro={e('tricepsMaquina.acimaDaCabeca')}
              linha
            />
          </Detalhes>
        );
      case 'banco_regulavel':
        return (
          <Detalhes titulo="Banco regulável">
            <Escolha
              nome="banco-declina"
              legenda="O banco também declina (cabeça abaixo dos pés)?"
              opcoes={SIM_NAO}
              valor={simNao(f.bancoRegulavel.declina)}
              aoMudar={(v) => set('bancoRegulavel', { declina: v === 'sim' })}
              erro={e('bancoRegulavel.declina')}
              linha
            />
          </Detalhes>
        );
      case 'elasticos':
        return (
          <Detalhes titulo="Elásticos">
            <Escolha
              nome="elasticos"
              legenda="Quantos elásticos de forças diferentes?"
              opcoes={[1, 2, 3, 4, 5, 6].map((n) => ({ id: String(n), texto: String(n) }))}
              valor={f.elasticos.intensidades || undefined}
              aoMudar={(v) => set('elasticos', { intensidades: v })}
              erro={e('elasticos.intensidades')}
              linha
            />
          </Detalhes>
        );
      default:
        return null;
    }
  };

  const nErros = Object.keys(erros).length;

  return (
    <Passo id="inventario" titulo="Que equipamento você tem?">
      <p className="lede">Toque em tudo o que você tem. Sem nada marcado, o programa usa o peso do corpo.</p>
      <FotoEquipamento aoUsar={(sug, conf) => setF((x) => comSugestoes(x, sug, conf))} />
      <form onSubmit={enviar} noValidate className="form">
        {tentou && nErros > 0 && <Erros erros={[nErros === 1 ? 'Há 1 detalhe para completar.' : `Há ${nErros} detalhes para completar.`]} />}
        {CATEGORIAS.map((c) => {
          const itens = itensDaCategoria(c.id);
          const comDetalhes = itens.filter((id) => f.marcados.includes(id) && ITENS_COM_DETALHES.includes(id));
          return (
            <fieldset key={c.id} className="campo categoria">
              <legend>{c.titulo}</legend>
              <div className="cartoes-eq">
                {itens.map((id) => (
                  <label key={id} className="cartao-eq" title={ITENS[id].nome}>
                    <input type="checkbox" checked={f.marcados.includes(id)} onChange={(ev) => marcar(id, ev.target.checked)} />
                    <IconeEquipamento id={id} />
                    <span>{NOME_CURTO[id]}</span>
                  </label>
                ))}
              </div>
              {comDetalhes.map((id) => (
                <div key={id}>{detalhes(id)}</div>
              ))}
            </fieldset>
          );
        })}
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
