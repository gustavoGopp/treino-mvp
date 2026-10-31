import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIANCA_TECNICA, classificarNivel, niveisPermitidos, NOME_NIVEL, TEMPOS_DE_TREINO, type ConfiancaTecnica, type TempoDeTreino } from '../../domain/nivel';
import type { Nivel as TipoNivel } from '../../domain/regras';
import { useApp } from '../app/estado';
import { Erros, Escolha, Numero, Passo, Selo, numeroOu } from '../app/ui';

// Passo 3: experiência de treino → nível (nivel.classificacao). Na dúvida, para baixo; a pessoa pode baixar, não subir.
export function Nivel() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salvo = estado.nivel;
  const [tempo, setTempo] = useState<TempoDeTreino | undefined>(salvo?.respostas.tempoContinuo);
  const [parado, setParado] = useState(salvo ? String(salvo.respostas.semanasParado) : '');
  const [tecnica, setTecnica] = useState<ConfiancaTecnica | undefined>(salvo?.respostas.tecnica);
  const [escolhido, setEscolhido] = useState<TipoNivel | undefined>(salvo?.escolhido);
  const [tentou, setTentou] = useState(false);

  const semanas = numeroOu(parado);
  const semanasOk = semanas !== undefined && Number.isInteger(semanas) && semanas >= 0 && semanas <= 520;
  const sugestao = tempo && tecnica && semanasOk ? classificarNivel({ tempoContinuo: tempo, semanasParado: semanas!, tecnica }) : null;
  const permitidos = sugestao ? niveisPermitidos(sugestao.nivel) : [];
  const nivelFinal = escolhido && permitidos.includes(escolhido) ? escolhido : sugestao?.nivel;

  const erros = [
    !tempo && 'Diga há quanto tempo você treina sem parar.',
    !semanasOk && 'Informe quantas semanas está sem treinar (0 se está treinando).',
    !tecnica && 'Diga se tem confiança na técnica básica.',
  ].filter((x): x is string => !!x);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    if (erros.length || !sugestao || !nivelFinal) return;
    atualizar((s) => ({
      ...s,
      nivel: { respostas: { tempoContinuo: tempo!, semanasParado: semanas!, tecnica: tecnica! }, escolhido: nivelFinal },
    }));
    navigate('/comecar/rotina');
  };

  return (
    <Passo id="nivel" titulo="Sua experiência com musculação">
      <form onSubmit={enviar} noValidate className="form">
        {tentou && <Erros erros={erros} />}
        <Escolha
          nome="tempo"
          legenda="Há quanto tempo você treina musculação sem parar?"
          ajuda="Conte só o tempo contínuo, sem pausas de meses."
          opcoes={TEMPOS_DE_TREINO}
          valor={tempo}
          aoMudar={setTempo}
          erro={tentou && !tempo ? 'Escolha uma opção.' : undefined}
        />
        <Numero
          rotulo="Há quantas semanas você está sem treinar?"
          ajuda="Use 0 se está treinando hoje. Depois de uma pausa, o programa começa com semanas mais leves."
          valor={parado}
          aoMudar={setParado}
          min={0}
          max={520}
          passo={1}
          sufixo="semanas"
          erro={tentou && !semanasOk ? 'Use um número inteiro, de 0 a 520.' : undefined}
        />
        <Escolha
          nome="tecnica"
          legenda="Você tem confiança na técnica dos exercícios básicos (agachamento, supino, remada)?"
          opcoes={CONFIANCA_TECNICA}
          valor={tecnica}
          aoMudar={setTecnica}
          erro={tentou && !tecnica ? 'Escolha uma opção.' : undefined}
        />
        {sugestao && (
          <section className="resultado" aria-live="polite">
            <h2>Seu nível: {NOME_NIVEL[sugestao.nivel]}</h2>
            <p>
              {sugestao.motivo} Na dúvida, classificamos para baixo. <Selo id={sugestao.regraId} />
            </p>
            {permitidos.length > 1 && (
              <Escolha
                nome="nivel-escolhido"
                legenda="Quer começar num nível mais leve?"
                ajuda="Você pode escolher um nível abaixo do sugerido, nunca acima."
                opcoes={[...permitidos].reverse().map((n) => ({ id: n, texto: n === sugestao.nivel ? `${NOME_NIVEL[n]} (sugerido)` : NOME_NIVEL[n] }))}
                valor={nivelFinal}
                aoMudar={setEscolhido}
              />
            )}
          </section>
        )}
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
