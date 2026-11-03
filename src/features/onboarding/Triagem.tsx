import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICULACOES, type Articulacao } from '../../domain/biblioteca';
import { avaliarTriagem, GRUPOS_TRIAGEM, PERGUNTAS, respostasNenhuma, type DorRegiao, type PerguntaId, type Respostas } from '../../domain/triagem';
import { agoraIso, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Passo, Selo } from '../app/ui';
import { IconeSaude } from './iconesSaude';

// Passo 2: triagem no estilo do PAR-Q+ (seguranca.triagem). Perguntas próprias do app (seguranca.triagem.texto).
// Qualquer "sim" bloqueia o programa automático até a pessoa confirmar a liberação. "Sim" só no osteoarticular
// abre a escolha de regiões e a nota da dor de hoje, de 0 a 10 (seguranca.triagem.osteoarticular). É o único lugar
// do cadastro onde a dor é perguntada (seguranca.dor.programa). Design v3 (direção 3): a lista das 9 em 3 grupos, com a
// palavra-chave primeiro; "Não tenho nenhuma destas" fica no fim da lista e marca "não" em todas (seguranca.triagem.nenhuma).

const PERGUNTA = Object.fromEntries(PERGUNTAS.map((p) => [p.id, p])) as Record<PerguntaId, (typeof PERGUNTAS)[number]>;

export const NOME_ARTICULACAO: Record<Articulacao, string> = {
  ombro: 'Ombro',
  cotovelo: 'Cotovelo',
  punho: 'Punho',
  lombar: 'Lombar',
  quadril: 'Quadril',
  joelho: 'Joelho',
  tornozelo: 'Tornozelo',
};

const SIM_NAO = [
  { id: 'sim', texto: 'Sim' },
  { id: 'nao', texto: 'Não' },
] as const;

const NOTAS = Array.from({ length: 11 }, (_, i) => ({
  id: i,
  texto: String(i),
}));
const artigo = (a: Articulacao) => (a === 'lombar' ? 'na' : 'no');

export function Triagem() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.triagem;
  const [resp, setResp] = useState<Partial<Record<PerguntaId, boolean>>>(() => salva?.respostas ?? {});
  // Região marcada → nota de hoje (undefined = ainda sem nota, por exemplo num estado antigo).
  const [dores, setDores] = useState<Partial<Record<Articulacao, number | undefined>>>(() =>
    Object.fromEntries((salva?.dores ?? []).map((d) => [d.articulacao, d.nota])),
  );
  const [erros, setErros] = useState<string[]>([]);
  const [tentou, setTentou] = useState(false);
  const [bloqueio, setBloqueio] = useState<{
    respostas: Respostas;
    dores: DorRegiao[];
  } | null>(null);
  const [liberado, setLiberado] = useState(false);
  // Design v2 (item C): primeiro as 9 condições numa lista curta, com "Nenhuma vale para mim" e "Sim, alguma vale";
  // quem marca alguma responde uma a uma, como antes (seguranca.triagem.nenhuma).
  const [lista, setLista] = useState(() => !salva || PERGUNTAS.every((p) => salva.respostas[p.id] === false));

  const faltam = PERGUNTAS.filter((p) => resp[p.id] === undefined);
  const osteo = resp.osteoarticular === true;
  const regioes = ARTICULACOES.filter((a) => a in dores);
  const semNota = regioes.filter((a) => dores[a] === undefined);

  const nenhuma = () => {
    const respostas = respostasNenhuma();
    atualizar((s) => ({ ...s, triagem: { respostas } }));
    navigate('/comecar/nivel');
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    const lista: string[] = [];
    if (faltam.length)
      lista.push(
        faltam.length === 1 ? 'Responda a pergunta que ficou sem resposta.' : `Responda as ${faltam.length} perguntas que ficaram sem resposta.`,
      );
    if (osteo && !regioes.length) lista.push('Marque pelo menos uma região com problema.');
    if (osteo && semNota.length)
      lista.push(semNota.length === 1 ? 'Dê a nota da dor de hoje na região marcada.' : 'Dê a nota da dor de hoje em cada região marcada.');
    setErros(lista);
    if (lista.length) return;

    const respostas = resp as Respostas;
    const ds: DorRegiao[] = osteo ? regioes.map((a) => ({ articulacao: a, nota: dores[a]! })) : [];
    const r = avaliarTriagem({ respostas, dores: ds });
    if (r.bloqueado) {
      setBloqueio({ respostas, dores: ds });
      setLiberado(false);
      return;
    }
    atualizar((s) => ({
      ...s,
      triagem: { respostas, ...(ds.length ? { dores: ds } : {}) },
    }));
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
    const r = avaliarTriagem({
      respostas: bloqueio.respostas,
      dores: bloqueio.dores,
    });
    return (
      <Passo id="triagem" titulo="Primeiro, uma avaliação">
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
        <p className="ajuda">O app não pede nome nem registro. Guarda só a data, neste aparelho.</p>
        <Marcar marcado={liberado} aoMudar={setLiberado}>
          Um médico ou profissional de Educação Física me avaliou e me liberou
        </Marcar>
        <button type="button" className="btn" disabled={!liberado} onClick={confirmarLiberacao}>
          Continuar com a liberação
        </button>
        <button type="button" className="btn sec" onClick={() => setBloqueio(null)}>
          Rever respostas
        </button>
      </Passo>
    );
  }

  if (lista)
    return (
      <Passo id="triagem" titulo="Alguma destas vale para você?">
        <p className="lede">
          Um “sim” não impede o treino. Pode pedir uma avaliação antes. <Selo id="seguranca.triagem" />
        </p>
        {GRUPOS_TRIAGEM.map((g) => (
          <section key={g.nome} className="grupo-triagem" aria-labelledby={`grupo-${g.ids[0]}`}>
            <h2 id={`grupo-${g.ids[0]}`}>{g.nome}</h2>
            <ul className="condicoes">
              {g.ids.map((id) => (
                <li key={id}>
                  <IconeSaude id={id} />
                  <span>
                    <b>{PERGUNTA[id].destaque}</b>
                    {PERGUNTA[id].resto}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="ajuda">
          Perguntas no estilo do PAR-Q+ <Selo id="seguranca.triagem.nenhuma" />. Suas respostas ficam só neste aparelho.
        </p>
        <details className="saiba">
          <summary>Por que estas perguntas?</summary>
          <p>
            São perguntas do próprio app, no estilo do PAR-Q+, um questionário de segurança usado antes de começar a se exercitar. O app não
            diagnostica: um “sim” pede uma avaliação de um médico ou de um profissional de Educação Física. <Selo id="seguranca.sem-diagnostico" />
          </p>
          <p>
            “Não tenho nenhuma destas” responde “não” às 9. <Selo id="seguranca.triagem.texto" />
          </p>
        </details>
        {/* Os botões ficam no fim da lista, não grudados embaixo: a pessoa passa pelas 9 antes de responder. */}
        <div className="pilha">
          <button type="button" className="btn sec" onClick={() => setLista(false)}>
            Sim, alguma destas vale
          </button>
          <p className="ou" aria-hidden="true">
            ou
          </p>
          <button type="button" className="btn sec" onClick={nenhuma}>
            Não tenho nenhuma destas
          </button>
        </div>
      </Passo>
    );

  return (
    <Passo id="triagem" titulo="Quais valem para você?">
      <p className="lede">
        Marque Sim ou Não em cada uma. <Selo id="seguranca.triagem" />
      </p>
      <form onSubmit={enviar} noValidate className="form">
        <Erros erros={erros} />
        {PERGUNTAS.map((p, i) => (
          <div key={p.id}>
            <Escolha
              nome={`triagem-${p.id}`}
              legenda={
                <>
                  <span className="num">{i + 1}.</span> <b>{p.destaque}</b>
                  {p.resto}
                </>
              }
              opcoes={SIM_NAO}
              valor={resp[p.id] === undefined ? undefined : resp[p.id] ? 'sim' : 'nao'}
              aoMudar={(v) => setResp((r) => ({ ...r, [p.id]: v === 'sim' }))}
              erro={tentou && resp[p.id] === undefined ? 'Responda sim ou não.' : undefined}
              linha
            />
            {p.id === 'osteoarticular' && osteo && (
              <fieldset className={`campo sub${tentou && (!regioes.length || semNota.length) ? ' com-erro' : ''}`}>
                <legend>Quais regiões?</legend>
                <p className="ajuda">
                  Acima de 5, saem os exercícios que forçam a região; de 3 a 5, o app evita esses; até 2, segue com um lembrete.{' '}
                  <Selo id="seguranca.dor.programa" />
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
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
