import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICULACOES, type Articulacao } from '../../domain/biblioteca';
import { avaliarTriagem, GRUPOS_TRIAGEM, PERGUNTAS, respostasNenhuma, type DorRegiao, type PerguntaId, type Respostas } from '../../domain/triagem';
import { agoraIso, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Passo, Selo } from '../app/ui';
import { IconeSaude } from './iconesSaude';
import { ESPERA_AVANCO } from './Nivel';

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
  // Design v3 (C7, aprovado pelo Gustavo em 03/11/2026): quem diz "sim" em osso ou articulação marca as regiões numa
  // tela e dá a nota de hoje de cada uma numa tela própria (o toque responde e segue). O efeito da nota aparece no
  // "Tudo certo?"; o aviso de avaliação fica na tela da nota (seguranca.triagem.osteoarticular, seguranca.dor.programa).
  const [etapa, setEtapa] = useState<'perguntas' | 'regioes' | Articulacao>('perguntas');
  const espera = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(espera.current), []);

  const faltam = PERGUNTAS.filter((p) => resp[p.id] === undefined);
  const osteo = resp.osteoarticular === true;
  const regioes = ARTICULACOES.filter((a) => a in dores);

  const nenhuma = () => {
    const respostas = respostasNenhuma();
    atualizar((s) => ({ ...s, triagem: { respostas } }));
    navigate('/comecar/nivel');
  };

  // Os valores vão por parâmetro: no avanço automático, o estado desta renderização ainda não tem a última nota.
  const finalizar = (ds: DorRegiao[]) => {
    const respostas = resp as Respostas;
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

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    const lista: string[] = [];
    if (faltam.length)
      lista.push(
        faltam.length === 1 ? 'Responda a pergunta que ficou sem resposta.' : `Responda as ${faltam.length} perguntas que ficaram sem resposta.`,
      );
    setErros(lista);
    if (lista.length) return;
    if (osteo) {
      setTentou(false);
      setEtapa('regioes');
      return;
    }
    finalizar([]);
  };

  /** Depois das regiões: a nota de hoje de cada uma, uma por tela, na ordem do corpo. */
  const proximaDor = (d: Partial<Record<Articulacao, number | undefined>>, depoisDe?: Articulacao) => {
    const marcadas = ARTICULACOES.filter((a) => a in d);
    const seguinte = depoisDe ? marcadas[marcadas.indexOf(depoisDe) + 1] : marcadas[0];
    if (seguinte) setEtapa(seguinte);
    else finalizar(marcadas.map((a) => ({ articulacao: a, nota: d[a]! })));
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

  if (etapa === 'regioes')
    return (
      <Passo id="triagem" titulo="Onde é o problema?">
        <fieldset className={`campo${tentou && !regioes.length ? ' com-erro' : ''}`}>
          <legend>Quais regiões?</legend>
          <p className="ajuda">Para cada uma, o app pergunta a dor de hoje.</p>
          {tentou && !regioes.length && <p className="erro">Marque pelo menos uma região com problema.</p>}
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
        </fieldset>
        <button type="button" className="btn sec" onClick={() => setEtapa('perguntas')}>
          Voltar às perguntas
        </button>
        <div className="acao-fixa">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setTentou(true);
              if (regioes.length) {
                setTentou(false);
                proximaDor(dores);
              }
            }}
          >
            Continuar
          </button>
        </div>
      </Passo>
    );

  if (etapa !== 'perguntas') {
    const a = etapa;
    return (
      <Passo id="triagem" titulo={`E hoje, dói ${artigo(a)} ${NOME_ARTICULACAO[a].toLowerCase()}?`}>
        <Escolha
          nome={`dor-${a}`}
          legenda="De 0 (nada) a 10 (a pior dor)"
          opcoes={NOTAS}
          valor={dores[a]}
          aoMudar={(n) => {
            const d = { ...dores, [a]: n };
            setDores(d);
            window.clearTimeout(espera.current);
            espera.current = window.setTimeout(() => proximaDor(d, a), ESPERA_AVANCO);
          }}
          linha
        />
        <p className="ajuda">
          Dor forte, que piora ou que dura mais de 1 a 2 semanas pede avaliação profissional. <Selo id="seguranca.dor.programa" />
        </p>
        <button
          type="button"
          className="btn sec"
          onClick={() => {
            const marcadas = ARTICULACOES.filter((x) => x in dores);
            const i = marcadas.indexOf(a);
            setEtapa(i > 0 ? marcadas[i - 1]! : 'regioes');
          }}
        >
          Voltar
        </button>
        {dores[a] !== undefined && (
          <div className="acao-fixa">
            <button type="button" className="btn" onClick={() => proximaDor(dores, a)}>
              Continuar
            </button>
          </div>
        )}
      </Passo>
    );
  }

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
          </div>
        ))}
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
