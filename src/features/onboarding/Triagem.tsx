import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICULACOES, type Articulacao } from '../../domain/biblioteca';
import { avaliarTriagem, PERGUNTAS, respostasNenhuma, type DorRegiao, type PerguntaId, type Respostas } from '../../domain/triagem';
import { agoraIso, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Passo, Selo } from '../app/ui';
import { Folha } from '../app/Folha';

// Passo 2: triagem no estilo do PAR-Q+ (seguranca.triagem). Perguntas próprias do app (seguranca.triagem.texto).
// Qualquer "sim" bloqueia o programa automático até a pessoa confirmar a liberação. "Sim" só no osteoarticular
// abre a escolha de regiões e a nota da dor de hoje, de 0 a 10 (seguranca.triagem.osteoarticular). É o único lugar
// do cadastro onde a dor é perguntada (seguranca.dor.programa). Desde o lote 3 do redesign, uma pergunta geral com as 9
// condições em poucas palavras: "Não, nenhuma" marca "não" em todas; "Sim, alguma (ou não tenho certeza)" leva a marcar
// só as que valem, com a pergunta inteira, e a confirmar as não marcadas (seguranca.triagem.nenhuma).

export { NOME_ARTICULACAO } from './articulacoes';
import { NOME_ARTICULACAO } from './articulacoes';

const NOTAS = Array.from({ length: 11 }, (_, i) => ({ id: i, texto: String(i) }));
const artigo = (a: Articulacao) => (a === 'lombar' ? 'na' : 'no');

export function Triagem() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.triagem;
  // As que valem (marcadas na tela do "sim"); as outras viram "não" depois da confirmação.
  const [marcadas, setMarcadas] = useState<PerguntaId[]>(() => PERGUNTAS.filter((p) => salva?.respostas[p.id]).map((p) => p.id));
  // Região marcada → nota de hoje (undefined = ainda sem nota, por exemplo num estado antigo).
  const [dores, setDores] = useState<Partial<Record<Articulacao, number | undefined>>>(() =>
    Object.fromEntries((salva?.dores ?? []).map((d) => [d.articulacao, d.nota])),
  );
  const [erros, setErros] = useState<string[]>([]);
  const [tentou, setTentou] = useState(false);
  const [bloqueio, setBloqueio] = useState<{ respostas: Respostas; dores: DorRegiao[] } | null>(null);
  const [liberado, setLiberado] = useState(false);
  // Lote 3 do redesign (seguranca.triagem.nenhuma): uma pergunta geral com as 9 condições em poucas palavras; quem
  // tem alguma marca só as que valem, com a pergunta inteira embaixo, e confirma as que ficaram sem marcar.
  const [geral, setGeral] = useState(() => !salva || PERGUNTAS.every((p) => salva.respostas[p.id] === false));
  const [completas, setCompletas] = useState(false);
  const [confirmar, setConfirmar] = useState(false);

  const osteo = marcadas.includes('osteoarticular');
  const regioes = ARTICULACOES.filter((a) => a in dores);
  const semNota = regioes.filter((a) => dores[a] === undefined);
  const naoMarcadas = PERGUNTAS.filter((p) => !marcadas.includes(p.id));
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
    setErros(lista);
    if (lista.length) return;
    if (naoMarcadas.length) setConfirmar(true);
    else concluir();
  };

  /** Depois da confirmação: as marcadas são "sim", as outras "não"; o resto (bloqueio, liberação, dor) como sempre. */
  const concluir = () => {
    setConfirmar(false);
    const respostas = Object.fromEntries(PERGUNTAS.map((p) => [p.id, marcadas.includes(p.id)])) as Respostas;
    const ds: DorRegiao[] = osteo ? regioes.map((a) => ({ articulacao: a, nota: dores[a]! })) : [];
    const r = avaliarTriagem({ respostas, dores: ds });
    if (r.bloqueado) {
      setBloqueio({ respostas, dores: ds });
      setLiberado(false);
      // Ao refazer a triagem com um programa já montado, as respostas antigas (sem "sim") continuavam salvas, e bastava
      // sair desta tela para o programa seguir como se nada tivesse mudado. As novas ficam salvas, sem a liberação, e o
      // programa aparece pausado até a pessoa confirmar. No 1º cadastro nada é salvo, como antes.
      atualizar((s) => (s.triagem ? { ...s, triagem: { respostas, ...(ds.length ? { dores: ds } : {}) } } : s));
      return;
    }
    atualizar((s) => ({ ...s, triagem: { respostas, ...(ds.length ? { dores: ds } : {}) } }));
    navigate('/comecar/nivel');
  };

  const confirmarLiberacao = () => {
    if (!bloqueio) return;
    atualizar((s) => ({
      ...s,
      triagem: {
        respostas: bloqueio.respostas,
        ...(bloqueio.dores.length ? { dores: bloqueio.dores } : {}),
        liberacaoConfirmada: true,
        liberacaoConfirmadaEm: agoraIso(),
      },
    }));
    navigate('/comecar/nivel');
  };

  if (bloqueio) {
    const r = avaliarTriagem({ respostas: bloqueio.respostas, dores: bloqueio.dores });
    return (
      <Passo id="triagem" titulo="Vamos pausar o programa automático">
        <div className="warnbox">
          <p>Você respondeu “sim” em:</p>
          <ul className="lista">
            {r.motivos.map((m) => (
              <li key={m}>{PERGUNTAS.find((p) => p.id === m)!.texto}</li>
            ))}
          </ul>
        </div>
        <p>
          {r.mensagem} <Selo id={r.regraId} />
        </p>
        <p className="ajuda">O app não pede o nome nem o registro do profissional: só guarda, neste aparelho, a data da sua confirmação.</p>
        <Marcar marcado={liberado} aoMudar={setLiberado}>
          Confirmo que fui avaliado e liberado por um médico ou profissional de Educação Física
        </Marcar>
        <button type="button" className="btn" disabled={!liberado} onClick={confirmarLiberacao}>
          Continuar com a liberação
        </button>
        <button type="button" className="btn sec" onClick={() => setBloqueio(null)}>
          Revisar respostas
        </button>
      </Passo>
    );
  }

  if (geral)
    return (
      <Passo id="triagem" titulo="Alguma destas vale para você?">
        <p className="lede">
          Treinar é seguro para a maioria das pessoas. Esta pergunta vê se vale falar com um profissional antes. <Selo id="seguranca.triagem" />
        </p>
        <p className="ajuda">
          Hoje, ou algo que um médico já disse. Um “sim” não impede o treino; pede uma avaliação antes do programa automático. Suas respostas
          ficam só neste celular.
        </p>
        <ul className="condicoes" aria-label="As 9 condições">
          {PERGUNTAS.map((p) => (
            <li key={p.id}>{p.curta}</li>
          ))}
        </ul>
        <p className="ajuda">
          Se nenhuma vale, um toque responde “não” a todas. <Selo id="seguranca.triagem.nenhuma" />{' '}
          <button type="button" className="link-botao" aria-haspopup="dialog" onClick={() => setCompletas(true)}>
            Ver as perguntas completas
          </button>
        </p>
        {completas && (
          <Folha titulo="As 9 perguntas completas" aoFechar={() => setCompletas(false)}>
            <ol className="lista">
              {PERGUNTAS.map((p) => (
                <li key={p.id}>{p.texto}</li>
              ))}
            </ol>
            <p className="ajuda">São perguntas próprias do app, no estilo do PAR-Q+; não é o questionário oficial.</p>
          </Folha>
        )}
        {/* Os botões ficam no fim da lista, não grudados embaixo: a pessoa passa pelas 9 antes de responder. */}
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
    <Passo id="triagem" titulo="Quais valem para você?">
      <p className="lede">Marque as que valem. No fim, você confirma que as outras não valem.</p>
      <form onSubmit={continuar} noValidate className="form">
        <Erros erros={erros} />
        <div className="pilha">
          {PERGUNTAS.map((p) => (
            <div key={p.id} className="pilha">
              <Marcar marcado={marcadas.includes(p.id)} aoMudar={(v) => marcar(p.id, v)}>
                <span className="curta">{p.curta}</span>
                <span className="longa">{p.texto}</span>
              </Marcar>
              {p.id === 'osteoarticular' && osteo && (
                <fieldset className={`campo sub${tentou && (!regioes.length || semNota.length) ? ' com-erro' : ''}`}>
                  <legend>Quais regiões?</legend>
                  <p className="ajuda">
                    Para cada região, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o
                    app prefere outros; até 2, o programa fica normal, com um lembrete. <Selo id="seguranca.dor.programa" />
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
        <button type="button" className="btn ter" onClick={() => setGeral(true)}>
          ‹ Voltar à pergunta geral
        </button>
      </form>
      {confirmar && (
        <Folha titulo="Nenhuma destas vale para você?" aoFechar={() => setConfirmar(false)}>
          <p>{naoMarcadas.length === 1 ? 'Você não marcou esta:' : `Você não marcou estas ${naoMarcadas.length}:`}</p>
          <ul className="lista nao-marcadas">
            {naoMarcadas.map((p) => (
              <li key={p.id}>{p.texto}</li>
            ))}
          </ul>
          <div className="pilha">
            <button type="button" className="btn" onClick={concluir}>
              Isso, nenhuma destas
            </button>
            <button type="button" className="btn sec" onClick={() => setConfirmar(false)}>
              Voltar e marcar
            </button>
          </div>
        </Folha>
      )}
    </Passo>
  );
}
