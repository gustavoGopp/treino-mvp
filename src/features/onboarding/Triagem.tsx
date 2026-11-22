import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICULACOES, type Articulacao } from '../../domain/biblioteca';
import {
  avaliarTriagem,
  CUIDADOS_PRESSAO,
  PERGUNTAS,
  RESPOSTA_IDS,
  respostasNenhuma,
  SEGUIMENTO_PRESSAO,
  type DorRegiao,
  type PerguntaId,
  type Pressao,
  type Respostas,
} from '../../domain/triagem';
import { agoraIso, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Passo } from '../app/ui';
import { Folha } from '../app/Folha';

// Passo 2: triagem no estilo do PAR-Q+ (seguranca.triagem). Perguntas próprias do app (seguranca.triagem.texto).
// Qualquer "sim" bloqueia o programa automático até a pessoa confirmar a liberação. "Sim" só no osteoarticular
// abre a escolha de regiões e a nota da dor de hoje, de 0 a 10 (seguranca.triagem.osteoarticular). É o único lugar
// do cadastro onde a dor é perguntada (seguranca.dor.programa). Desde o lote 3 do redesign, uma pergunta geral com as 9
// condições em poucas palavras: "Não, nenhuma" marca "não" em todas; "Sim, alguma (ou não tenho certeza)" leva a marcar
// só as que valem, com a pergunta inteira (seguranca.triagem.nenhuma). Desde o lote M6 (22/11/2026): coração e pressão
// alta são duas perguntas; a pressão alta abre o seguimento e, controlada e sem restrição, libera com cuidados
// (seguranca.triagem.pressao); a folha de confirmação das não marcadas saiu (era a 3ª passada pelas mesmas perguntas);
// e a pausa tem a saída para quem ainda não foi avaliado (pedido 11).

export { NOME_ARTICULACAO } from './articulacoes';
import { NOME_ARTICULACAO } from './articulacoes';

// M6, pedido 11 (22/11/2026). TEXTO DE SEGURANÇA: só muda com a revisão do Gustavo.
export const SAIDA_SEM_AVALIACAO = 'Vou procurar avaliação e volto depois';
export const RESPOSTAS_GUARDADAS = 'Respostas guardadas neste aparelho. Quando tiver a liberação, abra o app e confirme aqui.';

const SIM_NAO = [
  { id: 'sim', texto: 'Sim' },
  { id: 'nao', texto: 'Não' },
] as const;
const SIM_NAO_NAO_SEI = [...SIM_NAO, { id: 'nao-sei', texto: 'Não sei' }] as const;
type SimNao = (typeof SIM_NAO)[number]['id'];
const simNao = (v: boolean | undefined): SimNao | undefined => (v === undefined ? undefined : v ? 'sim' : 'nao');

const NOTAS = Array.from({ length: 11 }, (_, i) => ({ id: i, texto: String(i) }));
const artigo = (a: Articulacao) => (a === 'lombar' ? 'na' : 'no');

type Resposta = { respostas: Respostas; dores: DorRegiao[]; pressao?: Pressao };
/** O que vai para o estado guardado: sem lista vazia de dores e sem a pressão de quem não a marcou. */
const paraGuardar = (r: Resposta) => ({ respostas: r.respostas, ...(r.dores.length ? { dores: r.dores } : {}), ...(r.pressao ? { pressao: r.pressao } : {}) });

export function Triagem() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.triagem;
  // As que valem (marcadas na tela do "sim"); as outras viram "não" depois da confirmação.
  const [marcadas, setMarcadas] = useState<PerguntaId[]>(() =>
    PERGUNTAS.filter((p) => (p.id === 'pressao' ? !!salva?.pressao : salva?.respostas[p.id])).map((p) => p.id),
  );
  // O seguimento da pressão alta (seguranca.triagem.pressao): cada resposta fica vazia até a pessoa escolher.
  const [pressao, setPressao] = useState<Partial<Pressao>>(() => salva?.pressao ?? {});
  // Região marcada → nota de hoje (undefined = ainda sem nota, por exemplo num estado antigo).
  const [dores, setDores] = useState<Partial<Record<Articulacao, number | undefined>>>(() =>
    Object.fromEntries((salva?.dores ?? []).map((d) => [d.articulacao, d.nota])),
  );
  const [erros, setErros] = useState<string[]>([]);
  const [tentou, setTentou] = useState(false);
  // M6 (pedido 11): quem guardou respostas que pausam o programa volta direto para a tela da pausa, sem refazer as perguntas.
  const [bloqueio, setBloqueio] = useState<Resposta | null>(() =>
    salva && avaliarTriagem(salva).bloqueado ? { respostas: salva.respostas, dores: salva.dores ?? [], ...(salva.pressao ? { pressao: salva.pressao } : {}) } : null,
  );
  const [liberado, setLiberado] = useState(false);
  const [guardado, setGuardado] = useState(false);
  // Lote 3 do redesign (seguranca.triagem.nenhuma): uma pergunta geral com as 9 condições em poucas palavras; quem
  // tem alguma marca só as que valem, com a pergunta inteira embaixo, e confirma as que ficaram sem marcar.
  const [geral, setGeral] = useState(() => !salva || (!salva.pressao && RESPOSTA_IDS.every((id) => salva.respostas[id] === false)));
  const [completas, setCompletas] = useState(false);
  // A tela dos cuidados, antes de seguir (seguranca.triagem.pressao).
  const [cuidados, setCuidados] = useState<Resposta | null>(null);

  const osteo = marcadas.includes('osteoarticular');
  const regioes = ARTICULACOES.filter((a) => a in dores);
  const semNota = regioes.filter((a) => dores[a] === undefined);
  const comPressao = marcadas.includes('pressao');
  const comRemedio = marcadas.includes('medicamento');
  const faltaPressao = comPressao && (pressao.controlada === undefined || pressao.restricao === undefined);
  const faltaRemedio = comPressao && comRemedio && pressao.soRemedioDaPressao === undefined;
  const marcar = (id: PerguntaId, v: boolean) => setMarcadas((m) => (v ? [...m, id] : m.filter((x) => x !== id)));

  const nenhuma = () => {
    const respostas = respostasNenhuma();
    atualizar((s) => ({ ...s, triagem: { respostas } }));
    navigate('/comecar/nivel');
  };

  const continuar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    const lista: string[] = [];
    if (!marcadas.length) lista.push('Nenhuma marcada. Se nenhuma vale, volte e toque em “Não, nenhuma”.');
    if (osteo && !regioes.length) lista.push('Marque pelo menos uma região com problema.');
    if (osteo && semNota.length) lista.push(semNota.length === 1 ? 'Dê a nota da dor de hoje na região marcada.' : 'Dê a nota da dor de hoje em cada região marcada.');
    if (faltaPressao || faltaRemedio) lista.push('Responda às perguntas sobre a pressão.');
    setErros(lista);
    if (lista.length) return;
    concluir();
  };

  /** As marcadas são "sim", as outras "não"; o resto (bloqueio, liberação, dor, pressão) segue as regras. */
  const concluir = () => {
    const respostas = Object.fromEntries(RESPOSTA_IDS.map((id) => [id, marcadas.includes(id)])) as Respostas;
    const ds: DorRegiao[] = osteo ? regioes.map((a) => ({ articulacao: a, nota: dores[a]! })) : [];
    const p: Pressao | undefined = comPressao
      ? { controlada: pressao.controlada!, restricao: pressao.restricao!, ...(comRemedio ? { soRemedioDaPressao: pressao.soRemedioDaPressao! } : {}) }
      : undefined;
    const resposta: Resposta = { respostas, dores: ds, ...(p ? { pressao: p } : {}) };
    const r = avaliarTriagem(resposta);
    if (r.bloqueado) {
      setBloqueio(resposta);
      setLiberado(false);
      // Ao refazer a triagem com um programa já montado, as respostas antigas (sem "sim") continuavam salvas, e bastava
      // sair desta tela para o programa seguir como se nada tivesse mudado. As novas ficam salvas, sem a liberação, e o
      // programa aparece pausado até a pessoa confirmar. No 1º cadastro nada é salvo, como antes.
      atualizar((s) => (s.triagem ? { ...s, triagem: paraGuardar(resposta) } : s));
      return;
    }
    // Liberado com cuidados: a pessoa lê os cuidados antes de seguir; as respostas só são guardadas no "Entendi".
    if (r.cuidadosPressao) return setCuidados(resposta);
    atualizar((s) => ({ ...s, triagem: paraGuardar(resposta) }));
    navigate('/comecar/nivel');
  };

  const seguirComCuidados = () => {
    if (!cuidados) return;
    atualizar((s) => ({ ...s, triagem: paraGuardar(cuidados) }));
    navigate('/comecar/nivel');
  };

  const confirmarLiberacao = () => {
    if (!bloqueio) return;
    atualizar((s) => ({
      ...s,
      triagem: {
        ...paraGuardar(bloqueio),
        liberacaoConfirmada: true,
        liberacaoConfirmadaEm: agoraIso(),
      },
    }));
    navigate('/comecar/nivel');
  };

  /** A 3ª saída da pausa (pedido 11): guarda as respostas, sem a liberação, para a pessoa voltar depois da avaliação. */
  const voltarDepois = () => {
    if (!bloqueio) return;
    atualizar((s) => ({ ...s, triagem: paraGuardar(bloqueio) }));
    if (estado.nivel) navigate('/programa');
    else setGuardado(true);
  };

  if (cuidados)
    return (
      <Passo id="triagem" titulo="Pode seguir, com estes cuidados" aoVoltar={() => setCuidados(null)}>
        <p className="lede">Pressão alta controlada e sem restrição do médico.</p>
        <ul className="lista cuidados-pressao">
          {CUIDADOS_PRESSAO.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="ajuda">Depois, os cuidados ficam em “Entenda o treino”, em Meus dados.</p>
        <button type="button" className="btn" onClick={seguirComCuidados}>
          Entendi, continuar
        </button>
      </Passo>
    );

  if (bloqueio) {
    const r = avaliarTriagem(bloqueio);
    return (
      <Passo id="triagem" titulo="Vamos pausar o programa automático">
        <div className="warnbox seguranca">
          <p>Você respondeu “sim” em:</p>
          <ul className="lista">
            {r.motivos.map((m) => (
              <li key={m}>{PERGUNTAS.find((p) => p.id === m)!.texto}</li>
            ))}
          </ul>
        </div>
        <p>
          {r.mensagem}
        </p>
        <p className="ajuda">As respostas e a data da confirmação ficam só neste aparelho.</p>
        <Marcar marcado={liberado} aoMudar={setLiberado}>
          Confirmo que fui avaliado e liberado por um médico ou profissional de Educação Física
        </Marcar>
        <button type="button" className="btn" disabled={!liberado} onClick={confirmarLiberacao}>
          Continuar com a liberação
        </button>
        <button type="button" className="btn sec" onClick={voltarDepois}>
          {SAIDA_SEM_AVALIACAO}
        </button>
        {guardado && (
          <p role="status" className="ajuda">
            {RESPOSTAS_GUARDADAS}
          </p>
        )}
        <button type="button" className="btn sec" onClick={() => { setBloqueio(null); setGuardado(false); setGeral(false); }}>
          Revisar respostas
        </button>
      </Passo>
    );
  }

  if (geral)
    return (
      <Passo id="triagem" titulo="Alguma destas vale para você?">
        <p className="ajuda">
          Hoje, ou algo que um médico já disse.
        </p>
        <ul className="condicoes" aria-label="As 10 condições">
          {PERGUNTAS.map((p) => (
            <li key={p.id}>{p.curta}</li>
          ))}
        </ul>
        <p className="ajuda">
          <button type="button" className="link-botao" aria-haspopup="dialog" onClick={() => setCompletas(true)}>
            Ver as perguntas completas
          </button>
        </p>
        {completas && (
          <Folha titulo="As 10 perguntas completas" aoFechar={() => setCompletas(false)}>
            <ol className="lista">
              {PERGUNTAS.map((p) => (
                <li key={p.id}>{p.texto}</li>
              ))}
            </ol>
            <p className="ajuda">São perguntas próprias do app, no estilo do PAR-Q+; não é o questionário oficial.</p>
          </Folha>
        )}
        {/* Os botões ficam no fim da lista, não grudados embaixo: a pessoa passa pelas 10 antes de responder. */}
        <div className="pilha">
          <button type="button" className="btn" onClick={nenhuma}>
            Não, nenhuma
          </button>
          <button type="button" className="btn sec" onClick={() => setGeral(false)}>
            Sim, alguma (ou não tenho certeza)
          </button>
        </div>
      </Passo>
    );

  return (
    <Passo id="triagem" titulo="Quais valem para você?" aoVoltar={() => setGeral(true)}>
      <p className="lede">Marque as que valem.</p>
      <form onSubmit={continuar} noValidate className="form">
        <Erros erros={erros} />
        <div className="pilha">
          {PERGUNTAS.map((p) => (
            <div key={p.id} className="pilha">
              <Marcar marcado={marcadas.includes(p.id)} aoMudar={(v) => marcar(p.id, v)}>
                <span className="curta">{p.curta}</span>
                <span className="longa">{p.texto}</span>
              </Marcar>
              {p.id === 'pressao' && comPressao && (
                <fieldset className={`campo sub${tentou && faltaPressao ? ' com-erro' : ''}`}>
                  <legend>Sobre a pressão</legend>
                  <Escolha
                    nome="pressao-controlada"
                    legenda={SEGUIMENTO_PRESSAO.controlada}
                    ajuda={SEGUIMENTO_PRESSAO.controladaAjuda}
                    opcoes={SIM_NAO_NAO_SEI}
                    valor={pressao.controlada}
                    aoMudar={(v) => setPressao((x) => ({ ...x, controlada: v }))}
                    erro={tentou && pressao.controlada === undefined ? 'Escolha uma resposta.' : undefined}
                  />
                  <Escolha
                    nome="pressao-restricao"
                    legenda={SEGUIMENTO_PRESSAO.restricao}
                    opcoes={SIM_NAO}
                    valor={simNao(pressao.restricao)}
                    aoMudar={(v) => setPressao((x) => ({ ...x, restricao: v === 'sim' }))}
                    erro={tentou && pressao.restricao === undefined ? 'Escolha uma resposta.' : undefined}
                  />
                </fieldset>
              )}
              {p.id === 'medicamento' && comRemedio && comPressao && (
                <fieldset className={`campo sub${tentou && faltaRemedio ? ' com-erro' : ''}`}>
                  <legend>Sobre o remédio</legend>
                  <Escolha
                    nome="pressao-remedio"
                    legenda={SEGUIMENTO_PRESSAO.remedio}
                    opcoes={SIM_NAO}
                    valor={simNao(pressao.soRemedioDaPressao)}
                    aoMudar={(v) => setPressao((x) => ({ ...x, soRemedioDaPressao: v === 'sim' }))}
                    erro={tentou && faltaRemedio ? 'Escolha uma resposta.' : undefined}
                  />
                </fieldset>
              )}
              {p.id === 'osteoarticular' && osteo && (
                <fieldset className={`campo sub${tentou && (!regioes.length || semNota.length) ? ' com-erro' : ''}`}>
                  <legend>Quais regiões?</legend>
                  <p className="ajuda">
                    Para cada região, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o
                    app prefere outros; até 2, o programa fica normal, com um lembrete.
                  </p>
                  <div className="opcoes grade">
                    {ARTICULACOES.map((a) => (
                      <Marcar
                        key={a}
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
                    ))}
                  </div>
                  {regioes.map((a) => (
                    <Escolha
                      key={a}
                      nome={`dor-${a}`}
                      legenda={`E hoje, dói ${artigo(a)} ${NOME_ARTICULACAO[a].toLowerCase()}? De 0 (nada) a 10 (a pior dor)`}
                      opcoes={NOTAS}
                      valor={dores[a]}
                      aoMudar={(n) => setDores((d) => ({ ...d, [a]: n }))}
                      erro={tentou && dores[a] === undefined ? 'Escolha a nota de hoje.' : undefined}
                      linha
                    />
                  ))}
                  <p className="ajuda">Dor forte, que piora ou que dura mais de 1 a 2 semanas pede avaliação profissional.</p>
                </fieldset>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
