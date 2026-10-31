import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GRUPOS, type Grupo } from '../../domain/gerador';
import { NOME_GRUPO } from '../../domain/gerador/opcoes';
import { useApp } from '../app/estado';
import { Erros, Escolha, Marcar, Numero, Passo, Selo, numeroOu } from '../app/ui';

// Passo 4: dias por semana, minutos por sessão e grupos prioritários.
const DIAS = [2, 3, 4, 5] as const;
const GRUPOS_IDS = Object.keys(GRUPOS) as Grupo[];

export function Rotina() {
  const { estado, atualizar } = useApp();
  const navigate = useNavigate();
  const salva = estado.rotina;
  const [dias, setDias] = useState<(typeof DIAS)[number] | undefined>(salva?.diasSemana);
  const [min, setMin] = useState(salva ? String(salva.minutosSessao) : '');
  const [prio, setPrio] = useState<Grupo[]>(salva?.prioridades ?? []);
  const [tentou, setTentou] = useState(false);

  const minutos = numeroOu(min);
  const minOk = minutos !== undefined && Number.isInteger(minutos) && minutos >= 20 && minutos <= 150;
  const erros = [!dias && 'Escolha quantos dias por semana.', !minOk && 'Informe os minutos por sessão (de 20 a 150).'].filter(
    (x): x is string => !!x,
  );

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    setTentou(true);
    if (erros.length) return;
    atualizar((s) => ({ ...s, rotina: { diasSemana: dias!, minutosSessao: minutos!, prioridades: GRUPOS_IDS.filter((g) => prio.includes(g)) } }));
    navigate('/comecar/inventario');
  };

  return (
    <Passo id="rotina" titulo="Sua rotina de treino">
      <form onSubmit={enviar} noValidate className="form">
        {tentou && <Erros erros={erros} />}
        <Escolha
          nome="dias"
          legenda="Quantos dias por semana você pode treinar?"
          ajuda={
            <>
              Com 2 a 5 dias dá para treinar cada músculo cerca de 2 vezes por semana. <Selo id="frequencia.musculo" />
            </>
          }
          opcoes={DIAS.map((d) => ({ id: d, texto: `${d} dias` }))}
          valor={dias}
          aoMudar={setDias}
          erro={tentou && !dias ? 'Escolha uma opção.' : undefined}
          linha
        />
        <Numero
          rotulo="Quantos minutos por treino?"
          ajuda="Tempo total, com aquecimento e descansos. Entre 20 e 150 minutos."
          valor={min}
          aoMudar={setMin}
          min={20}
          max={150}
          passo={5}
          sufixo="min"
          erro={tentou && !minOk ? 'Use um número inteiro de 20 a 150.' : undefined}
        />
        <fieldset className="campo">
          <legend>Quais grupos você quer priorizar? (opcional)</legend>
          <p className="ajuda">
            Os grupos prioritários recebem mais séries; os outros ficam no mínimo que já gera resultado. Priorizar muitos grupos pede mais
            tempo. <Selo id="volume.semanal.minimo-eficaz" />
          </p>
          <div className="opcoes grade">
            {GRUPOS_IDS.map((g) => (
              <Marcar key={g} marcado={prio.includes(g)} aoMudar={(v) => setPrio((p) => (v ? [...p, g] : p.filter((x) => x !== g)))}>
                {NOME_GRUPO[g][0]!.toUpperCase() + NOME_GRUPO[g].slice(1)}
              </Marcar>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="btn">
          Continuar
        </button>
      </form>
    </Passo>
  );
}
