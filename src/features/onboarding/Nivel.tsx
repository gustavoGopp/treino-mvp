import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CONFIANCA_TECNICA,
  classificarNivel,
  niveisPermitidos,
  NOME_NIVEL,
  PAUSAS,
  pausaDe,
  tecnicaMudaNivel,
  TEMPOS_DE_TREINO,
  type ConfiancaTecnica,
  type PausaId,
  type TempoDeTreino,
} from '../../domain/nivel';
import type { Nivel as TipoNivel } from '../../domain/regras';
import { useApp } from '../app/estado';
import { Escolha, Passo, Selo } from '../app/ui';

// Passo 3: experiência de treino → nível (nivel.classificacao). Na dúvida, para baixo; a pessoa pode baixar, não subir.
// Design v3 (C1 e C2, aprovados pelo Gustavo em 03/11/2026): uma pergunta por tela, cada uma com o seu endereço
// (?q=…, para o "voltar" do celular funcionar). O toque responde e segue depois de 0,3 s; na volta, a resposta fica
// marcada e a tela não avança sozinha ("Continuar" segue). A técnica só é perguntada quando pode mudar o nível. O
// resultado, com o motivo e o selo, aparece no "Tudo certo?"; a tela do resultado só abre quando dá para escolher um
// nível mais leve (intermediário ou avançado).
export const ESPERA_AVANCO = 300;
type Q = 'tempo' | 'pausa' | 'tecnica' | 'resultado';

export function Nivel() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const salvo = estado.nivel;
  // Refazer o nível depois de uma pausa longa (readaptacao.durante-uso): a pausa e o nível ficam sem resposta, para a
  // pessoa responder de novo; ao salvar, volta ao programa.
  const deVolta = params.get('de') === 'programa';
  const q = (params.get('q') as Q | null) ?? 'tempo';
  const [tempo, setTempo] = useState<TempoDeTreino | undefined>(salvo?.respostas.tempoContinuo);
  const [pausa, setPausa] = useState<PausaId | undefined>(salvo && !deVolta ? pausaDe(salvo.respostas.semanasParado) : undefined);
  const [tecnica, setTecnica] = useState<ConfiancaTecnica | undefined>(salvo?.respostas.tecnica);
  const [escolhido, setEscolhido] = useState<TipoNivel | undefined>(deVolta ? undefined : salvo?.escolhido);
  const espera = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(espera.current), []);

  const semanas = PAUSAS.find((p) => p.id === pausa)?.semanas;
  const precisaTecnica = !!tempo && semanas !== undefined && tecnicaMudaNivel(tempo, semanas);
  const sugestao =
    tempo && semanas !== undefined && (!precisaTecnica || tecnica)
      ? classificarNivel({ tempoContinuo: tempo, semanasParado: semanas, ...(precisaTecnica ? { tecnica } : {}) })
      : null;
  const permitidos = sugestao ? niveisPermitidos(sugestao.nivel) : [];
  const nivelFinal = escolhido && permitidos.includes(escolhido) ? escolhido : sugestao?.nivel;

  const ir = (proxima: Q) => {
    const n = new URLSearchParams(params);
    n.set('q', proxima);
    setParams(n);
  };
  // As respostas vão por parâmetro: no avanço automático, o estado desta renderização ainda não tem a última resposta.
  const salvarCom = (t: TempoDeTreino, sem: number, tec: ConfiancaTecnica | undefined) => {
    const precisa = tecnicaMudaNivel(t, sem);
    const c = classificarNivel({ tempoContinuo: t, semanasParado: sem, ...(precisa && tec ? { tecnica: tec } : {}) });
    const final = escolhido && niveisPermitidos(c.nivel).includes(escolhido) ? escolhido : c.nivel;
    atualizar((s) => ({
      ...s,
      nivel: { respostas: { tempoContinuo: t, semanasParado: sem, ...(precisa && tec ? { tecnica: tec } : {}) }, escolhido: final },
    }));
    navigate(deVolta ? '/programa' : '/comecar/rotina');
  };
  /** Depois da última resposta: a tela do resultado só quando há um nível mais leve para escolher. */
  const fechar = (t: TempoDeTreino, sem: number, tec?: ConfiancaTecnica) => {
    const c = classificarNivel({ tempoContinuo: t, semanasParado: sem, ...(tecnicaMudaNivel(t, sem) && tec ? { tecnica: tec } : {}) });
    if (niveisPermitidos(c.nivel).length > 1) ir('resultado');
    else salvarCom(t, sem, tec);
  };
  const seguir = () => {
    if (q === 'tempo' && tempo) ir('pausa');
    else if (q === 'pausa' && semanas !== undefined) {
      if (precisaTecnica) ir('tecnica');
      else fechar(tempo!, semanas);
    } else if (q === 'tecnica' && tecnica) fechar(tempo!, semanas!, tecnica);
    else if (q === 'resultado' && sugestao) salvarCom(tempo!, semanas!, tecnica);
  };
  // O toque responde e segue: a marca fica à vista 0,3 s antes de seguir (WCAG 3.2.2: a troca vem do toque da pessoa).
  const responder =
    <T,>(set: (v: T) => void, depois: (v: T) => void) =>
    (v: T) => {
      set(v);
      window.clearTimeout(espera.current);
      espera.current = window.setTimeout(() => depois(v), ESPERA_AVANCO);
    };

  // Chegou a uma pergunta sem ter respondido as anteriores (endereço digitado, recarga): volta para a primeira que falta.
  const falta: Q | undefined = !tempo ? 'tempo' : semanas === undefined ? 'pausa' : precisaTecnica && !tecnica ? 'tecnica' : undefined;
  const ordem: Q[] = ['tempo', 'pausa', 'tecnica', 'resultado'];
  const atual: Q = falta && ordem.indexOf(falta) < ordem.indexOf(q) ? falta : q === 'tecnica' && !precisaTecnica ? 'pausa' : q;
  const respondida = atual === 'tempo' ? !!tempo : atual === 'pausa' ? semanas !== undefined : atual === 'tecnica' ? !!tecnica : !!sugestao;

  return (
    <Passo id="nivel" titulo="Sua experiência com musculação">
      <div className="form">
        {atual === 'tempo' && (
          <Escolha
            nome="tempo"
            legenda="Há quanto tempo você treina musculação sem parar?"
            ajuda="Conte só o tempo contínuo, sem pausas de meses."
            opcoes={TEMPOS_DE_TREINO}
            valor={tempo}
            aoMudar={responder(setTempo, () => ir('pausa'))}
          />
        )}
        {atual === 'pausa' && (
          <Escolha
            nome="pausa"
            legenda="Você está treinando agora?"
            ajuda="Depois de uma pausa, o programa começa com semanas mais leves."
            opcoes={PAUSAS}
            valor={pausa}
            aoMudar={responder(setPausa, (v: PausaId) => {
              const sem = PAUSAS.find((p) => p.id === v)!.semanas;
              if (tecnicaMudaNivel(tempo!, sem)) ir('tecnica');
              else fechar(tempo!, sem);
            })}
          />
        )}
        {atual === 'tecnica' && (
          <Escolha
            nome="tecnica"
            legenda="Você tem confiança na técnica dos exercícios básicos (agachamento, supino, remada)?"
            opcoes={CONFIANCA_TECNICA}
            valor={tecnica}
            aoMudar={responder(setTecnica, (v: ConfiancaTecnica) => fechar(tempo!, semanas!, v))}
          />
        )}
        {atual === 'resultado' && sugestao && (
          <section className="resultado" aria-live="polite">
            <h2>Seu nível: {NOME_NIVEL[sugestao.nivel]}</h2>
            <p>
              {sugestao.motivo} Na dúvida, começamos mais leve. <Selo id={sugestao.regraId} />
            </p>
            <Escolha
              nome="nivel-escolhido"
              legenda="Quer começar num nível mais leve?"
              ajuda="Você pode escolher um nível abaixo do sugerido, nunca acima."
              opcoes={[...permitidos].reverse().map((n) => ({
                id: n,
                texto: n === sugestao.nivel ? `${NOME_NIVEL[n]} (sugerido)` : NOME_NIVEL[n],
              }))}
              valor={nivelFinal}
              aoMudar={setEscolhido}
            />
          </section>
        )}
        {respondida && (
          <div className="acao-fixa">
            <button type="button" className="btn" onClick={seguir}>
              Continuar
            </button>
          </div>
        )}
      </div>
    </Passo>
  );
}
