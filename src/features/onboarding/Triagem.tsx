import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ARTICULACOES, type Articulacao } from '../../domain/biblioteca';
import { avaliarTriagem, PERGUNTAS, type PerguntaId, type Respostas } from '../../domain/triagem';
import { agoraIso, useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Passo, Selo } from '../app/ui';

// Passo 2: triagem no estilo do PAR-Q+ (seguranca.triagem). Perguntas próprias do app (seguranca.triagem.texto).
// Qualquer "sim" bloqueia o programa automático até a pessoa confirmar a liberação. "Sim" só no osteoarticular
// abre a escolha de regiões, e os exercícios que as carregam saem (seguranca.triagem.osteoarticular).

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

export function Triagem() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.triagem;
  const [resp, setResp] = useState<Partial<Record<PerguntaId, boolean>>>(() => salva?.respostas ?? {});
  const [regioes, setRegioes] = useState<Articulacao[]>(() => salva?.regioes ?? []);
  const [erros, setErros] = useState<string[]>([]);
  const [tentou, setTentou] = useState(false);
  const [bloqueio, setBloqueio] = useState<{ respostas: Respostas; regioes: Articulacao[] } | null>(null);
  const [liberado, setLiberado] = useState(false);

  const faltam = PERGUNTAS.filter((p) => resp[p.id] === undefined);
  const osteo = resp.osteoarticular === true;

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    const lista: string[] = [];
    if (faltam.length) lista.push(faltam.length === 1 ? 'Responda a pergunta que ficou sem resposta.' : `Responda as ${faltam.length} perguntas que ficaram sem resposta.`);
    if (osteo && !regioes.length) lista.push('Marque pelo menos uma região com problema.');
    setErros(lista);
    if (lista.length) return;

    const respostas = resp as Respostas;
    const regs = osteo ? [...regioes].sort() : [];
    const r = avaliarTriagem({ respostas, regioes: regs });
    if (r.bloqueado) {
      setBloqueio({ respostas, regioes: regs });
      setLiberado(false);
      return;
    }
    atualizar((s) => ({ ...s, triagem: { respostas, ...(regs.length ? { regioes: regs } : {}) } }));
    navigate('/comecar/nivel');
  };

  const confirmarLiberacao = () => {
    if (!bloqueio) return;
    atualizar((s) => ({
      ...s,
      triagem: {
        respostas: bloqueio.respostas,
        ...(bloqueio.regioes.length ? { regioes: bloqueio.regioes } : {}),
        liberacaoConfirmada: true,
        liberacaoConfirmadaEm: agoraIso(),
      },
    }));
    navigate('/comecar/nivel');
  };

  if (bloqueio) {
    const r = avaliarTriagem({ respostas: bloqueio.respostas, regioes: bloqueio.regioes });
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

  return (
    <Passo id="triagem" titulo="Antes de começar, 9 perguntas rápidas">
      <p className="lede">
        São perguntas de segurança no estilo do PAR-Q+. Um “sim” não impede você de treinar, mas pede uma avaliação antes do programa
        automático. <Selo id="seguranca.triagem" />
      </p>
      <form onSubmit={enviar} noValidate className="form">
        <Erros erros={erros} />
        {PERGUNTAS.map((p, i) => (
          <div key={p.id}>
            <Escolha
              nome={`triagem-${p.id}`}
              legenda={
                <>
                  <span className="num">{i + 1}.</span> {p.texto}
                </>
              }
              opcoes={SIM_NAO}
              valor={resp[p.id] === undefined ? undefined : resp[p.id] ? 'sim' : 'nao'}
              aoMudar={(v) => setResp((r) => ({ ...r, [p.id]: v === 'sim' }))}
              erro={tentou && resp[p.id] === undefined ? 'Responda sim ou não.' : undefined}
              linha
            />
            {p.id === 'osteoarticular' && osteo && (
              <fieldset className={`campo sub${tentou && !regioes.length ? ' com-erro' : ''}`}>
                <legend>Quais regiões?</legend>
                <p className="ajuda">Os exercícios que carregam essas regiões ficam fora do programa.</p>
                <div className="opcoes grade">
                  {ARTICULACOES.map((a) => (
                    <Marcar
                      key={a}
                      marcado={regioes.includes(a)}
                      aoMudar={(v) => setRegioes((rs) => (v ? [...rs, a] : rs.filter((x) => x !== a)))}
                    >
                      {NOME_ARTICULACAO[a]}
                    </Marcar>
                  ))}
                </div>
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
