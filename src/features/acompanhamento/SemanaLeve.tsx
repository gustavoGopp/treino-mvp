import { agoraIso, fusoDoAparelho, useApp } from '../app/estado';
import { Selo } from '../app/ui';
import { aceitarSemanaLeve, encerrarSemanaLeve, recusarSemanaLeve, semanaLeveDoEstado } from './acoes';

// A semana leve (deload.semana-leve): sugerida só com sinal, sempre opcional e manual. O aviso de dor que se repete
// (seguranca.dor.escala) aparece sempre que houver, com ou sem a sugestão: a semana leve soma, nunca substitui.
const dataCurta = (iso: string) => `${iso.slice(8, 10)}/${iso.slice(5, 7)}`;

type Parte = 'dor' | 'ativa' | 'oferta';

/** `partes` escolhe o que mostrar: no início, a dor fica sempre à vista e a semana leve entra na fila de avisos. */
export function SemanaLeve({ partes = ['dor', 'ativa', 'oferta'] }: { partes?: Parte[] }) {
  const { estado, atualizar } = useApp();
  const s0 = semanaLeveDoEstado(estado, agoraIso(), fusoDoAparelho());
  if (!s0) return null;
  const s = { ...s0, dor: partes.includes('dor') && s0.dor, ativa: partes.includes('ativa') && s0.ativa, mostrar: partes.includes('oferta') && s0.mostrar };
  return (
    <>
      {s.dor && (
        <div className="warnbox" role="note">
          <p>
            {s.dor.texto} <Selo id={s.dor.regraId} />
          </p>
        </div>
      )}
      {s.ativa && (
        <section className="box volta" aria-labelledby="leve-ativa">
          <h2 id="leve-ativa">Semana leve{s.ate ? ` até ${dataCurta(s.ate)}` : ''}</h2>
          <p>
            Cerca de metade das séries, RIR 3–4 e a mesma carga. Para descansar, não para crescer. <Selo id={s.regraId} />
          </p>
          <button type="button" className="btn sec pequeno" onClick={() => atualizar((e) => encerrarSemanaLeve(e, agoraIso()))}>
            Voltar ao normal
          </button>
        </section>
      )}
      {s.mostrar && (
        <section className="box volta" aria-labelledby="leve">
          <h2 id="leve">Semana leve? (opcional)</h2>
          <p>
            <b>Motivo:</b> {s.motivos.join('; ')}.
          </p>
          <p>
            {s.texto} <Selo id={s.regraId} />
          </p>
          <div className="opcoes linha">
            <button type="button" className="btn sec pequeno" onClick={() => atualizar((e) => aceitarSemanaLeve(e, agoraIso()))}>
              Fazer a semana leve
            </button>
            <button type="button" className="btn sec pequeno" onClick={() => atualizar((e) => recusarSemanaLeve(e, agoraIso()))}>
              Agora não
            </button>
          </div>
        </section>
      )}
    </>
  );
}
