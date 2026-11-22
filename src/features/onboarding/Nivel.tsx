import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CONFIANCA_TECNICA,
  classificarNivel,
  niveisPermitidos,
  NOME_NIVEL,
  PAUSAS,
  pausaDe,
  RESPOSTAS_DE_QUEM_NUNCA_TREINOU,
  TEMPOS_DE_TREINO,
  type ConfiancaTecnica,
  type PausaId,
  type TempoDeTreino,
} from '../../domain/nivel';
import type { Nivel as TipoNivel } from '../../domain/regras';
import { useApp } from '../app/estado';
import { Erros, Escolha, Passo, Revelar } from '../app/ui';

// Passo 3: experiência de treino → nível (nivel.classificacao). Na dúvida, para baixo; a pessoa pode baixar, não subir.
export function Nivel() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salvo = estado.nivel;
  // Refazer o nível depois de uma pausa longa (readaptacao.durante-uso): a pausa e o nível ficam sem resposta, para a
  // pessoa responder de novo; ao salvar, volta ao programa.
  const deVolta = useSearchParams()[0].get('de') === 'programa';
  const [tempo, setTempo] = useState<TempoDeTreino | undefined>(salvo?.respostas.tempoContinuo);
  const [pausa, setPausa] = useState<PausaId | undefined>(salvo && !deVolta ? pausaDe(salvo.respostas.semanasParado) : undefined);
  const [tecnica, setTecnica] = useState<ConfiancaTecnica | undefined>(salvo?.respostas.tecnica);
  const [escolhido, setEscolhido] = useState<TipoNivel | undefined>(deVolta ? undefined : salvo?.escolhido);
  const [tentou, setTentou] = useState(false);

  // "Nunca treinei" (lote M1 da análise crítica): não há pausa nem técnica a perguntar; as duas perguntas não aparecem.
  const nunca = tempo === 'nunca';
  const semanas = nunca ? RESPOSTAS_DE_QUEM_NUNCA_TREINOU.semanasParado : PAUSAS.find((p) => p.id === pausa)?.semanas;
  const semanasOk = semanas !== undefined;
  const tecnicaFinal = nunca ? RESPOSTAS_DE_QUEM_NUNCA_TREINOU.tecnica : tecnica;
  const sugestao =
    tempo && tecnicaFinal && semanasOk
      ? classificarNivel({
          tempoContinuo: tempo,
          semanasParado: semanas!,
          tecnica: tecnicaFinal,
        })
      : null;
  const permitidos = sugestao ? niveisPermitidos(sugestao.nivel) : [];
  const nivelFinal = escolhido && permitidos.includes(escolhido) ? escolhido : sugestao?.nivel;

  const erros = [
    !tempo && 'Diga há quanto tempo você treina sem parar.',
    !semanasOk && 'Diga se está treinando ou há quanto tempo parou.',
    !tecnicaFinal && 'Diga se tem confiança na técnica básica.',
  ].filter((x): x is string => !!x);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    if (erros.length || !sugestao || !nivelFinal) return;
    atualizar((s) => ({
      ...s,
      nivel: {
        respostas: {
          tempoContinuo: tempo!,
          semanasParado: semanas!,
          tecnica: tecnicaFinal!,
        },
        escolhido: nivelFinal,
      },
    }));
    navigate(deVolta ? '/programa' : '/comecar/rotina');
  };

  return (
    <Passo id="nivel" titulo="Experiência">
      <form onSubmit={enviar} noValidate className="form">
        {tentou && <Erros erros={erros} />}
        <Escolha
          nome="tempo"
          legenda="Há quanto tempo você treina musculação sem parar?"
          opcoes={TEMPOS_DE_TREINO}
          valor={tempo}
          aoMudar={setTempo}
          erro={tentou && !tempo ? 'Escolha uma opção.' : undefined}
        />
        {/* Uma pergunta por vez: a seguinte aparece depois da resposta (design v2, item B) */}
        {tempo && !nunca && (
          <Revelar>
            <Escolha
              nome="pausa"
              legenda="Você está treinando agora?"
              opcoes={PAUSAS}
              valor={pausa}
              aoMudar={setPausa}
              erro={tentou && !semanasOk ? 'Escolha uma opção.' : undefined}
            />
          </Revelar>
        )}
        {tempo && !nunca && semanasOk && (
          <Revelar>
            <Escolha
              nome="tecnica"
              legenda="Você tem confiança na técnica dos exercícios básicos (agachamento, supino, remada)?"
              opcoes={CONFIANCA_TECNICA}
              valor={tecnica}
              aoMudar={setTecnica}
              erro={tentou && !tecnica ? 'Escolha uma opção.' : undefined}
            />
          </Revelar>
        )}
        {sugestao && (
          <Revelar>
            <section className="resultado" aria-live="polite">
              {/* sessão de textos (16/11/2026): o motivo repete o que a pessoa acabou de responder; a regra do nível está em
                  "Entenda o treino" */}
              <h2>Seu nível: {NOME_NIVEL[sugestao.nivel]}</h2>
              {permitidos.length > 1 && (
                <Escolha
                  nome="nivel-escolhido"
                  legenda="Quer começar num nível mais leve?"
                  opcoes={[...permitidos].reverse().map((n) => ({
                    id: n,
                    texto: n === sugestao.nivel ? `${NOME_NIVEL[n]} (sugerido)` : NOME_NIVEL[n],
                  }))}
                  valor={nivelFinal}
                  aoMudar={setEscolhido}
                />
              )}
            </section>
          </Revelar>
        )}
        {sugestao && (
          <div className="acao-fixa">
            <button type="submit" className="btn">
              Continuar
            </button>
          </div>
        )}
      </form>
    </Passo>
  );
}
