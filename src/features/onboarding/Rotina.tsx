import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GRUPOS, metaMaxima, type Grupo, type Objetivo } from '../../domain/gerador';
import { opcoesDeDivisao, type DivisaoId } from '../../domain/gerador/divisoes';
import { exerciciosPorSessao } from '../../domain/regras';
import { NOME_GRUPO, notaDoFoco } from '../../domain/gerador/opcoes';
import { useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Numero, Passo, Revelar, Selo, numeroOu } from '../app/ui';

// Passo 4: dias por semana, minutos por sessão e grupos prioritários, uma pergunta por vez. A divisão (opcional) saiu
// do cadastro na reformulação visual (design v2, item E): sem escolha, o gerador usa a recomendada; ela é escolhida
// depois, em "Meus dados", que abre esta mesma tela com ?de=dados.
const DIAS = [2, 3, 4, 5, 6] as const;
/** Minutos por toque (R1); "outro" abre o campo numérico. Nada vem marcado. */
export const MINUTOS = [30, 45, 60, 75, 90] as const;
type OpcaoMinutos = (typeof MINUTOS)[number] | 'outro';
const GRUPOS_IDS = Object.keys(GRUPOS) as Grupo[];
/** "O que você quer agora?" (objetivo.pergunta; decisão do Gustavo em 04/11/2026). Nada vem marcado. */
const OBJETIVOS_TEXTO: { id: Objetivo; texto: string }[] = [
  { id: 'hipertrofia', texto: 'Ganhar músculo' },
  { id: 'cutting', texto: 'Manter o músculo enquanto perco peso' },
  { id: 'forca', texto: 'Ficar mais forte' },
  { id: 'saude', texto: 'Saúde e disposição' },
];

export function Rotina() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.rotina;
  const [busca] = useSearchParams();
  const deDados = busca.get('de') === 'dados';
  // "Objetivo", em Meus dados, abre esta tela já na pergunta do objetivo
  const noObjetivo = useRef<HTMLDivElement>(null);
  const focoNoObjetivo = deDados && busca.get('foco') === 'objetivo';
  useEffect(() => {
    if (focoNoObjetivo) noObjetivo.current?.scrollIntoView?.({ block: 'start' });
  }, [focoNoObjetivo]);
  const [dias, setDias] = useState<(typeof DIAS)[number] | undefined>(salva?.diasSemana);
  const [min, setMin] = useState(salva ? String(salva.minutosSessao) : '');
  // Um valor salvo fora dos botões abre em "Outro", com o número dele.
  const [opMin, setOpMin] = useState<OpcaoMinutos | undefined>(() =>
    salva ? ((MINUTOS as readonly number[]).includes(salva.minutosSessao) ? (salva.minutosSessao as OpcaoMinutos) : 'outro') : undefined,
  );
  const escolherMin = (v: OpcaoMinutos) => {
    setOpMin(v);
    setMin(v === 'outro' ? '' : String(v));
  };
  const [prio, setPrio] = useState<Grupo[]>(salva?.prioridades ?? []);
  // Nada vem marcado (divisao.recomendacao): sem escolha, o gerador usa a recomendada.
  const [divisao, setDivisao] = useState<DivisaoId | undefined>(salva?.divisao);
  const [objetivo, setObjetivo] = useState<Objetivo | undefined>(salva?.objetivo);
  const [tentou, setTentou] = useState(false);

  const minutos = numeroOu(min);
  const minOk = minutos !== undefined && Number.isInteger(minutos) && minutos >= 20 && minutos <= 150;
  const prioOrdenadas = GRUPOS_IDS.filter((g) => prio.includes(g));
  const opcoesDivisao = dias ? opcoesDeDivisao(dias, metaMaxima(estado.nivel?.escolhido ?? 'intermediario', prioOrdenadas)) : [];
  const divisaoValida = divisao && opcoesDivisao.some((o) => o.id === divisao) ? divisao : undefined;
  const mudarDias = (d: (typeof DIAS)[number]) => {
    setDias(d);
    if (d !== dias) setDivisao(undefined); // a divisão é de um número de dias
  };

  const erros = [
    !dias && 'Escolha quantos dias por semana.',
    !minOk && (opMin === 'outro' ? 'Informe os minutos por sessão (de 20 a 150).' : 'Escolha quantos minutos por treino.'),
  ].filter((x): x is string => !!x);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    if (erros.length) return;
    atualizar((s) => ({
      ...s,
      rotina: {
        diasSemana: dias!,
        ...(divisaoValida ? { divisao: divisaoValida } : {}),
        minutosSessao: minutos!,
        prioridades: prioOrdenadas,
        ...(objetivo ? { objetivo } : {}),
      },
    }));
    navigate(deDados ? '/programa' : '/comecar/inventario');
  };

  return (
    <Passo id="rotina" titulo="Sua rotina de treino" deDados={deDados}>
      <form onSubmit={enviar} noValidate className="form">
        {tentou && <Erros erros={erros} />}
        <Escolha
          nome="dias"
          legenda="Quantos dias por semana você pode treinar?"
          ajuda={
            <>
              Com 2 a 6 dias dá para treinar cada músculo cerca de 2 vezes por semana. <Selo id="divisao.seis-dias" />
            </>
          }
          opcoes={DIAS.map((d) => ({ id: d, texto: `${d} dias` }))}
          valor={dias}
          aoMudar={mudarDias}
          erro={tentou && !dias ? 'Escolha uma opção.' : undefined}
          linha
        />
        {(dias || deDados) && (
          <Revelar semRolar={deDados}>
            <Escolha
              nome="minutos"
              legenda="Quantos minutos por treino?"
              ajuda="Tempo total, com aquecimento e descansos."
              opcoes={[
                ...MINUTOS.map((m) => ({
                  id: m as OpcaoMinutos,
                  texto: `${m} min`,
                })),
                { id: 'outro' as OpcaoMinutos, texto: 'Outro' },
              ]}
              valor={opMin}
              aoMudar={escolherMin}
              erro={tentou && !opMin ? 'Escolha uma opção.' : undefined}
              linha
            />
            {opMin === 'outro' && (
              <Numero
                rotulo="Outro: quantos minutos?"
                ajuda="Entre 20 e 150 minutos."
                valor={min}
                aoMudar={setMin}
                min={20}
                max={150}
                passo={5}
                sufixo="min"
                erro={tentou && !minOk ? 'Use um número inteiro de 20 a 150.' : undefined}
              />
            )}
          </Revelar>
        )}
        {((dias && opMin) || deDados) && (
          <Revelar semRolar={deDados}>
            <fieldset className="campo">
              <legend>Quais grupos você quer priorizar? (opcional)</legend>
              <p className="ajuda">
                Os grupos prioritários recebem mais séries; os outros ficam no mínimo que já gera resultado. Escolha até 2: com mais, o foco se divide.{' '}
                <Selo id="volume.semanal.minimo-eficaz" /> <Selo id="volume.prioridade.ate-dois" />
              </p>
              <div className="opcoes grade">
                {GRUPOS_IDS.map((g) => (
                  <Marcar key={g} marcado={prio.includes(g)} aoMudar={(v) => setPrio((p) => (v ? [...p, g] : p.filter((x) => x !== g)))}>
                    {NOME_GRUPO[g][0]!.toUpperCase() + NOME_GRUPO[g].slice(1)}
                  </Marcar>
                ))}
              </div>
              {notaDoFoco(prio) && (
                <p className="ajuda" role="status">
                  {notaDoFoco(prio)}
                </p>
              )}
            </fieldset>
            {/* lote 3 do redesign: o objetivo saiu do cadastro ("ganhar músculo" é o padrão) e fica em Meus dados */}
            {!deDados && (
              <p className="ajuda">Dá para mudar depois, em Meus dados. O objetivo (“ganhar músculo” é o padrão) e “algo a evitar” também ficam lá.</p>
            )}
            {deDados && (
            <div ref={noObjetivo} className="ancora-objetivo">
            <Escolha
              nome="objetivo"
              legenda="O que você quer agora? (opcional)"
              ajuda={
                <>
                  O treino é de força em todos. Só "ficar mais forte" muda números: menos repetições e mais descanso nos exercícios grandes. Sem escolha,
                  o programa é para ganhar músculo. O app não cuida de alimentação nem de cardio. <Selo id="objetivo.pergunta" />
                </>
              }
              opcoes={OBJETIVOS_TEXTO}
              valor={objetivo}
              aoMudar={setObjetivo}
            />
            </div>
            )}
          </Revelar>
        )}
        {deDados && dias && opcoesDivisao.length > 1 && (
          <fieldset className="campo">
            <legend>Como prefere dividir? (opcional)</legend>
            <p className="ajuda">
              Com o mesmo volume, as divisões rendem o mesmo crescimento; escolha a que encaixa melhor na sua semana. Se não escolher, o app usa a
              recomendada. <Selo id="divisao.equivalencia" /> <Selo id="divisao.recomendacao" />
            </p>
            <div className="opcoes">
              {opcoesDivisao.map((o) => (
                <label key={o.id} className="opcao divisao">
                  <input type="radio" name="divisao" checked={divisaoValida === o.id} onChange={() => setDivisao(o.id)} />
                  <span>
                    <b>{o.nome}</b>
                    {o.recomendada && <span className="etiqueta"> Recomendada</span>}
                    <br />
                    <small>
                      Cada músculo {o.frequencia === '1' ? '1 vez' : `${o.frequencia} vezes`} por semana
                      {minOk ? ` · cerca de ${exerciciosPorSessao(minutos!)} exercícios por treino` : ''}. {o.descricao}
                      {o.aviso && <> {o.aviso}</>}
                    </small>
                  </span>
                </label>
              ))}
            </div>
            {divisaoValida && (
              <button type="button" className="btn sec" onClick={() => setDivisao(undefined)}>
                Deixar o app escolher
              </button>
            )}
            <p className="ajuda">Os minutos de cada treino aparecem no programa, porque dependem do seu equipamento.</p>
          </fieldset>
        )}
        {((dias && opMin) || deDados) && (
          <div className="acao-fixa">
            <button type="submit" className="btn">
              {deDados ? 'Salvar' : 'Continuar'}
            </button>
          </div>
        )}
      </form>
    </Passo>
  );
}
