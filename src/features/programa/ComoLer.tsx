import { Selo } from '../app/ui';

// "Como ler o seu treino" (R5c, B2; treino.leitura): o vocabulário do programa em 5 linhas, para quem nunca treinou.
// Aberto até o 1º treino terminado; depois, recolhido. No iniciante, uma linha a mais com a fase de aprendizado.
// Estudo dos textos (13/11/2026, decisão do Gustavo): fica fechado, a um toque. Antes (R5c) abria sozinho até o 1º treino.
export function ComoLer({ iniciante }: { iniciante: boolean }) {
  return (
    <details className="box dobra como-ler">
      <summary>Como ler o seu treino</summary>
      <dl>
        <div>
          <dt>Série</dt>
          <dd>Repetições seguidas, sem parar. “3 × 8–12”: 3 séries de 8 a 12 repetições.</dd>
        </div>
        <div>
          <dt>Repetição</dt>
          <dd>Um movimento completo, ida e volta.</dd>
        </div>
        <div>
          <dt>Carga</dt>
          <dd>
            O peso que você usa. Na 1ª vez de um exercício, o app acerta a carga série a série. <Selo id="progressao.calibracao" />
          </dd>
        </div>
        <div>
          <dt>Descanso</dt>
          <dd>
            A pausa entre as séries. O relógio conta para você. <Selo id="descanso.por-tipo" />
          </dd>
        </div>
        <div>
          <dt>RIR</dt>
          <dd>
            Quantas repetições ainda sobravam quando você parou. RIR 2: dava para fazer mais 2. Errar por 1 no começo é normal.{' '}
            <Selo id="rir.leitura" />
          </dd>
        </div>
        {iniciante && (
          <div>
            <dt>As primeiras semanas</dt>
            <dd>
              Nas 2 a 3 primeiras, o foco é aprender: mais folga (RIR 3–4) e menos séries.{' '}
              <Selo id="iniciante.fase-aprendizado" />
            </dd>
          </div>
        )}
      </dl>
      <p className="ajuda">
        Termos comuns do treino de força. <Selo id="treino.leitura" />
      </p>
    </details>
  );
}
