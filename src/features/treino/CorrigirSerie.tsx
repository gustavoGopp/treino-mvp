import { useState } from 'react';
import type { Carga, SerieRegistrada } from '../../domain/progressao';
import { RIR } from '../../domain/regras';
import { textoCarga } from '../../domain/sessao';
import { Folha } from '../app/Folha';
import { Escolha, Numero, numeroOu } from '../app/ui';

// Corrigir uma série já registrada (registro.treino-feito; pedido do Gustavo, 26/11/2026): no treino aberto, pela lista
// "Séries feitas", e depois dele, pela evolução do exercício. A carga fica no mesmo tipo de registro (kg, placa, anilha
// por lado, contrapeso ou degrau); a nota de dor, as quedas e a marca de acerto não são mexidas aqui.

const SOBRANDO = Array.from({ length: RIR.registroMax + 1 }, (_, i) => ({ id: i, texto: i === RIR.registroMax ? `${i} ou mais` : String(i) }));

/** O número da carga, conforme o tipo de registro, e o rótulo do campo. */
function numeroDaCarga(c: Carga): { valor: number; rotulo: string; sufixo?: string } | null {
  switch (c.tipo) {
    case 'kg':
      return { valor: c.kg, rotulo: 'Carga', sufixo: 'kg' };
    case 'placa':
      return { valor: c.placa, rotulo: 'Placa' };
    case 'contrapeso':
      return { valor: c.placa, rotulo: 'Placa de contrapeso' };
    case 'anilha':
      return { valor: c.kgPorLado, rotulo: 'Anilhas por lado', sufixo: 'kg' };
    case 'degrau':
      return null;
  }
}

function comNumero(c: Carga, n: number): Carga {
  switch (c.tipo) {
    case 'kg':
      return { tipo: 'kg', kg: n };
    case 'placa':
      return { tipo: 'placa', placa: Math.round(n) };
    case 'contrapeso':
      return { tipo: 'contrapeso', placa: Math.round(n) };
    case 'anilha':
      return { tipo: 'anilha', kgPorLado: n };
    case 'degrau':
      return c;
  }
}

export function CorrigirSerie({
  exId,
  numero,
  serie,
  degraus,
  aoGuardar,
  aoApagar,
  aoFechar,
}: {
  exId: string;
  /** A posição da série (1ª, 2ª…), para o título. */
  numero: number;
  serie: SerieRegistrada;
  /** Os degraus do exercício (peso do corpo e elástico), para escolher outro. */
  degraus?: number;
  aoGuardar: (nova: Pick<SerieRegistrada, 'carga' | 'reps' | 'rir'>) => void;
  aoApagar: () => void;
  aoFechar: () => void;
}) {
  const doCarga = numeroDaCarga(serie.carga);
  const [carga, setCarga] = useState(doCarga ? String(doCarga.valor) : '');
  const [degrau, setDegrau] = useState(serie.carga.tipo === 'degrau' ? serie.carga.degrau : 0);
  const [reps, setReps] = useState(String(serie.reps));
  const [rir, setRir] = useState(serie.rir);
  const [apagando, setApagando] = useState(false);

  const nCarga = numeroOu(carga);
  const nReps = numeroOu(reps);
  const cargaOk = !doCarga || (nCarga !== undefined && nCarga >= 0 && nCarga <= 1000 && (serie.carga.tipo !== 'kg' || nCarga > 0));
  const repsOk = nReps !== undefined && Number.isInteger(nReps) && nReps >= 0 && nReps <= 100;
  const nova = (): Carga => (serie.carga.tipo === 'degrau' ? { tipo: 'degrau', degrau } : comNumero(serie.carga, Math.round(nCarga! * 100) / 100));

  return (
    <Folha titulo={`Corrigir a ${numero}ª série`} aoFechar={aoFechar}>
      <form
        className="form"
        onSubmit={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (!cargaOk || !repsOk) return;
          aoGuardar({ carga: nova(), reps: nReps!, rir });
        }}
      >
        {doCarga ? (
          <Numero rotulo={doCarga.rotulo} valor={carga} aoMudar={setCarga} min={0} {...(doCarga.sufixo ? { sufixo: doCarga.sufixo } : {})} />
        ) : (
          <Escolha
            nome="corrigir-degrau"
            legenda="Carga"
            opcoes={Array.from({ length: Math.max(degraus ?? 0, degrau + 1) }, (_, i) => ({ id: i, texto: textoCarga({ tipo: 'degrau', degrau: i }, exId) }))}
            valor={degrau}
            aoMudar={setDegrau}
          />
        )}
        <Numero rotulo="Repetições" valor={reps} aoMudar={setReps} min={0} passo={1} />
        <Escolha nome="corrigir-sobrando" legenda="Quantas ainda conseguiria?" opcoes={SOBRANDO} valor={rir} aoMudar={setRir} linha />
        <button type="submit" className="btn" disabled={!cargaOk || !repsOk}>
          Guardar a correção
        </button>
      </form>
      {apagando ? (
        <div className="warnbox" role="group" aria-label="Apagar esta série?">
          <p>Apagar esta série? Ela sai do registro do treino.</p>
          <div className="pilha">
            <button type="button" className="btn" onClick={aoApagar}>
              Apagar
            </button>
            <button type="button" className="btn sec" onClick={() => setApagando(false)}>
              Não apagar
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="btn sec" onClick={() => setApagando(true)}>
          Apagar esta série
        </button>
      )}
    </Folha>
  );
}
