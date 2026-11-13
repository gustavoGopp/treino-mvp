import { useId, useState, type ReactNode } from 'react';
import { numeroBr } from '../../domain/numero';
import { useNavigate } from 'react-router-dom';
import { ITENS, type Inventario as InventarioDados, type ItemId } from '../../domain/taxonomia/equipamentos';
import { comInventario, localPrincipal } from '../../storage/esquema';
import { agoraIso, comProgramaNovo, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Numero, Passo, Selo } from '../app/ui';
import { FOTO_LIGADA } from '../app/contato';
import { FotoEquipamento } from './FotoEquipamento';
import { IconeEquipamento } from './icones';
import { IconeLugar } from './lugares';
import { Folha } from '../app/Folha';
import { ALTURAS_POLIA, ESTACOES_MULTIFUNCIONAL } from '../../domain/taxonomia/equipamentos';
import { ATALHO, ITENS_DE_ANILHA, type Atalho } from '../../domain/taxonomia/atalhos';
import {
  aplicarAtalho,
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
const kg = (n: number) => `${numeroBr(n)} kg`;
const normalizar = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
/** Os lugares na ordem do protótipo aprovado, com o subtítulo de cada um (lote 3 do redesign). */
const ORDEM_LUGAR = ['academia', 'condominio', 'casa', 'corpo'] as const;
const SUB_LUGAR: Record<(typeof ORDEM_LUGAR)[number], string> = {
  academia: 'Halteres, polias, barras e máquinas',
  condominio: 'Alguns halteres, banco e uma estação',
  casa: 'Pergunta só o que muda o programa',
  corpo: 'Sem equipamento: chão, parede e cadeira',
};
/** O item de cada grupo de campos do formulário (para os erros de detalhe apontarem o item). */
const ITEM_DO_CAMPO: Record<string, ItemId> = {
  halteres: 'halteres_fixos',
  anilhas: 'anilhas_e_manoplas',
  poliaDupla: 'estacao_polia_dupla',
  poliaSimples: 'polia_simples',
  multifuncional: 'multifuncional',
  kettlebell: 'kettlebell',
  caneleiras: 'caneleiras',
  voador: 'voador',
  tricepsMaquina: 'triceps_maquina',
  bancoRegulavel: 'banco_regulavel',
  elasticos: 'elasticos',
  miniBand: 'mini_band',
};
const ITENS_COM_DETALHES: ItemId[] = [
  'halteres_fixos',
  'anilhas_e_manoplas',
  'polia_simples',
  'banco_regulavel',
  'elasticos',
  'estacao_polia_dupla',
  'multifuncional',
  'kettlebell',
  'caneleiras',
  'mini_band',
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

// Passo 5 do cadastro: o equipamento do 1º local. O mesmo formulário serve aos outros locais (R1b, /locais).
export function Inventario() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  return (
    <Passo id="inventario" titulo="Que equipamento você tem?">
      <FormularioInventario
        inicial={localPrincipal(estado)?.inventario}
        textoBotao="Gerar meu programa"
        aoSalvar={(inv) => {
          // lote 3 do redesign: o "Tudo certo?" saiu; o equipamento é o último passo e gera o programa
          atualizar((s) => ({ ...comProgramaNovo(comInventario(s, localPrincipal(s)?.id, inv), agoraIso(), true), ajustes: undefined }));
          navigate('/programa');
        }}
      />
    </Passo>
  );
}

/** Formulário de equipamento de um local: cartões, atalhos, foto e menor anilha (M3, R0c, R1; reaproveitado no R1b). */
export function FormularioInventario({
  inicial,
  aoSalvar,
  textoBotao = 'Continuar',
}: {
  inicial?: InventarioDados;
  aoSalvar: (inv: InventarioDados) => void;
  textoBotao?: string;
}) {
  const [f, setF] = useState<FormInventario>(() => paraForm(inicial));
  const [erros, setErros] = useState<Record<string, string>>({});
  const [tentou, setTentou] = useState(false);
  // Último atalho tocado (só na tela): mostra os "às vezes tem" logo abaixo. Nenhum vem selecionado.
  const [atalho, setAtalho] = useState<Atalho['id'] | undefined>();
  // lote 3 do redesign: a lista item por item abre sob demanda (já aberta quando o local tem itens); a foto e os
  // detalhes de cada item abrem em folhas.
  const [lista, setLista] = useState(() => !!inicial && Object.keys(inicial).length > 0);
  const [foto, setFoto] = useState(false);
  const [aberto, setAberto] = useState<ItemId | undefined>();
  const [procura, setProcura] = useState('');
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]['id']>('halter');

  const marcar = (id: ItemId, v: boolean) => setF((x) => ({ ...x, marcados: v ? [...x.marcados, id] : x.marcados.filter((m) => m !== id) }));
  const set = <K extends keyof FormInventario>(k: K, v: Partial<FormInventario[K]>) => setF((x) => ({ ...x, [k]: { ...(x[k] as object), ...v } }));
  const e = (k: string) => (tentou ? erros[k] : undefined);

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTentou(true);
    const r = deForm(f);
    setErros(r.erros);
    if (!r.inventario) return;
    aoSalvar(r.inventario);
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
      case 'caneleiras':
        return (
          <Detalhes titulo="Caneleiras de peso">
            <MarcarVarios
              legenda="Quais pesos você tem (de cada caneleira)?"
              ajuda="O peso costuma estar escrito na caneleira."
              opcoes={[...new Set([...VALORES.caneleiraKg, ...f.caneleiras.pesos])].sort((a, b) => a - b).map((k) => ({ id: k, texto: kg(k) }))}
              marcados={f.caneleiras.pesos}
              aoMudar={(v) => set('caneleiras', { pesos: v })}
              erro={e('caneleiras.pesos')}
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
      case 'mini_band':
        return (
          <Detalhes titulo="Mini-band">
            <Escolha
              nome="mini-band"
              legenda="Quantas mini-bands de forças diferentes?"
              opcoes={[1, 2, 3, 4, 5, 6].map((n) => ({ id: String(n), texto: String(n) }))}
              valor={f.miniBand.intensidades || undefined}
              aoMudar={(v) => set('miniBand', { intensidades: v })}
              erro={e('miniBand.intensidades')}
              linha
            />
          </Detalhes>
        );
      default:
        return null;
    }
  };

  const nErros = Object.keys(erros).length;
  // Qual item cada erro pede para completar (para a linha do item dizer "falta completar" e abrir os detalhes).
  const itemDoErro = (k: string): ItemId | undefined => ITEM_DO_CAMPO[k.split('.')[0]!];
  const comErro = new Set(Object.keys(tentou ? erros : {}).map(itemDoErro).filter((x): x is ItemId => !!x));
  const enviarComFolha = (ev: React.FormEvent) => {
    enviar(ev);
    const r = deForm(f);
    const primeiro = Object.keys(r.erros).map(itemDoErro).find((x) => x && f.marcados.includes(x));
    if (primeiro) {
      setLista(true);
      setAberto(primeiro);
    }
  };
  const marcarNaLista = (id: ItemId, v: boolean) => {
    marcar(id, v);
    // marcar um item que pede detalhes abre os detalhes dele (o mais leve, o mais pesado...)
    if (v && ITENS_COM_DETALHES.includes(id)) setAberto(id);
  };
  const busca = normalizar(procura.trim());
  const naGrade = busca
    ? CATEGORIAS.flatMap((c) => itensDaCategoria(c.id)).filter((id) => normalizar(`${NOME_CURTO[id]} ${ITENS[id].nome}`).includes(busca))
    : itensDaCategoria(categoria);
  const marcados = CATEGORIAS.flatMap((c) => itensDaCategoria(c.id)).filter((id) => f.marcados.includes(id));

  return (
    <form onSubmit={enviarComFolha} noValidate className="form equipamento">
      {tentou && nErros > 0 && <Erros erros={[nErros === 1 ? 'Há 1 detalhe para completar.' : `Há ${nErros} detalhes para completar.`]} />}
      <fieldset className="campo atalhos">
        <legend>Onde você treina?</legend>
        <div className="lugares-lista">
          {ORDEM_LUGAR.map((id) => {
            const a = ATALHO[id];
            return (
              <button
                key={id}
                type="button"
                className="lugar-linha"
                aria-pressed={atalho === id}
                aria-label={a.nome}
                aria-describedby={`lugar-${id}`}
                onClick={() => {
                  setF((x) => aplicarAtalho(x, id));
                  setAtalho(id);
                }}
              >
                <IconeLugar lugar={id} />
                <span>
                  <b>{a.nome}</b>
                  <small id={`lugar-${id}`}>{SUB_LUGAR[id]}</small>
                </span>
              </button>
            );
          })}
        </div>
        {atalho && (
          <div className="supos">
            <p>
              {ATALHO[atalho].ajuda ?? `Um toque marcou ${marcados.length} itens típicos. Confira e tire o que não tiver; a 1ª série de cada exercício acerta a carga.`}{' '}
              <Selo id="equipamento.atalhos" />
            </p>
            {ATALHO[atalho].asVezes.length > 0 && (
              <fieldset className="campo sub">
                <legend>Às vezes tem (toque no que você tiver)</legend>
                <div className="opcoes grade">
                  {ATALHO[atalho].asVezes.map((id) => (
                    <Marcar key={id} marcado={f.marcados.includes(id)} aoMudar={(v) => marcar(id, v)}>
                      {NOME_CURTO[id]}
                    </Marcar>
                  ))}
                </div>
              </fieldset>
            )}
            {marcados.length > 0 && !lista && (
              <button type="button" className="link-botao" onClick={() => setLista(true)}>
                Conferir os {marcados.length} itens ›
              </button>
            )}
          </div>
        )}
      </fieldset>

      <div className={FOTO_LIGADA ? 'dois' : undefined}>
        {/* R5c: a foto fica desligada até haver um convite por pessoa (contato.ts) */}
        {FOTO_LIGADA && (
          <button type="button" className="btn sec" aria-haspopup="dialog" onClick={() => setFoto(true)}>
            Pela foto
          </button>
        )}
        <button type="button" className="btn sec" aria-expanded={lista} onClick={() => setLista((v) => !v)}>
          Item por item
        </button>
      </div>
      {foto && (
        <Folha titulo="Reconhecer pela foto" aoFechar={() => setFoto(false)}>
          <FotoEquipamento
            aoUsar={(sug, conf) => {
              setF((x) => comSugestoes(x, sug, conf));
              setFoto(false);
              setLista(true);
            }}
          />
        </Folha>
      )}

      {lista && (
        <div className="lista-eq">
          {marcados.length > 0 && (
            <section aria-labelledby="marcados">
              <h2 id="marcados" className="secao">
                Marcados ({marcados.length})
              </h2>
              <ul className="marcados">
                {marcados.map((id) => (
                  <li key={id} className={comErro.has(id) ? 'com-falta' : undefined}>
                    <IconeEquipamento id={id} />
                    <span className="marcado-nome">
                      <b>{NOME_CURTO[id]}</b>
                      {comErro.has(id) && <small>falta completar</small>}
                    </span>
                    {ITENS_COM_DETALHES.includes(id) && (
                      <button type="button" className="btn ter pequeno" aria-label={`Mudar ${NOME_CURTO[id]}`} aria-haspopup="dialog" onClick={() => setAberto(id)}>
                        Mudar
                      </button>
                    )}
                    <button type="button" className="btn ter pequeno" aria-label={`Tirar ${NOME_CURTO[id]}`} onClick={() => marcar(id, false)}>
                      Tirar
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section aria-labelledby="marcar-mais" className="pilha">
            <h2 id="marcar-mais" className="secao">
              Marcar mais
            </h2>
            <label className="busca">
              <span>Procurar pelo nome</span>
              <input type="search" value={procura} onChange={(ev) => setProcura(ev.target.value)} />
            </label>
            <div className="chips" role="group" aria-label="Categorias">
              {CATEGORIAS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={!busca && categoria === c.id}
                  onClick={() => {
                    setCategoria(c.id);
                    setProcura('');
                  }}
                >
                  {c.titulo}
                </button>
              ))}
            </div>
            {busca && !naGrade.length && <p className="ajuda">Nada com “{procura.trim()}”. Confira a escrita ou procure pela categoria.</p>}
            <div className="grade-2">
              {naGrade.map((id) => (
                <label key={id} className="item-eq" title={ITENS[id].nome}>
                  <input type="checkbox" checked={f.marcados.includes(id)} onChange={(ev) => marcarNaLista(id, ev.target.checked)} />
                  <IconeEquipamento id={id} />
                  <span>{NOME_CURTO[id]}</span>
                  <span className="estado" aria-hidden="true" />
                </label>
              ))}
            </div>
          </section>
        </div>
      )}

      {aberto && f.marcados.includes(aberto) && (
        <Folha titulo={NOME_CURTO[aberto]} aoFechar={() => setAberto(undefined)}>
          {detalhes(aberto)}
          <button type="button" className="btn" onClick={() => setAberto(undefined)}>
            Pronto
          </button>
        </Folha>
      )}

      {f.marcados.some((id) => ITENS_DE_ANILHA.includes(id)) && (
        <Detalhes titulo="Anilhas das máquinas e barras">
          <p className="ajuda">
            Vale para {ITENS_DE_ANILHA.filter((id) => f.marcados.includes(id)).map((id) => NOME_CURTO[id].toLowerCase()).join(', ')}. É o passo para
            subir a carga. Se não souber, o app usa 2 kg. <Selo id="equipamento.menor-anilha" />
          </p>
          <ValorPorToque
            legenda="Qual a menor anilha?"
            valores={VALORES.menorAnilhaKg}
            valor={f.menorAnilha}
            aoMudar={(v) => setF((x) => ({ ...x, menorAnilha: v }))}
            erro={e('menorAnilha')}
          />
        </Detalhes>
      )}
      <p className="ajuda">Dá para mudar depois, em Meus dados. Sem nada marcado, o programa usa o peso do corpo.</p>
      <div className="acao-fixa">
        <button type="submit" className="btn">
          {textoBotao}
        </button>
      </div>
    </form>
  );
}
