import { useEffect, useState } from 'react';
import { carregarTexto } from './textoDoExercicio';

/**
 * A nota do exercício (montagem segura ou segurança), à vista em todos os modos, logo abaixo do palco (lote 2). Os
 * textos marcam o título com <b>…</b>: só essa marca vira negrito; todo o resto é texto, sem HTML livre.
 * Fica num arquivo só seu para a tela do treino mostrar a mesma nota sem baixar a tela do guia (22/11/2026).
 */
export function NotaDoGuia({ nota }: { nota: string }) {
  const partes = nota.split(/<b>(.*?)<\/b>/);
  return (
    <div className="warnbox nota-guia">
      {partes.map((p, i) => (i % 2 ? <b key={i}>{p}</b> : p))}
    </div>
  );
}

/**
 * A nota de um exercício fora do guia (a folha do exercício no programa): baixa o texto e mostra só a nota. Se o texto
 * não baixar, não mostra nada ali: a nota continua no guia e na tela do treino.
 */
export function NotaDoExercicio({ animacaoId }: { animacaoId: string }) {
  const [nota, setNota] = useState<string>();
  useEffect(() => {
    let vivo = true;
    carregarTexto(animacaoId).then(
      (t) => vivo && setNota(t.note),
      () => undefined,
    );
    return () => {
      vivo = false;
    };
  }, [animacaoId]);
  return nota ? <NotaDoGuia nota={nota} /> : null;
}
