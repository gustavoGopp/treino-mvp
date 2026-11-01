import { CARTOES, type CartaoTexto as Cartao } from '../../conteudo';
import { Selo } from '../app/ui';

// Cartão de texto do exercício sem animação aprovada (CLAUDE.md, qualidade do guia): nunca uma animação
// improvisada. O texto vem da ficha de técnica (docs/pesquisa/animacoes/<id>.md).

const FASE: Record<Cartao['exec'][number][0], string> = { hold: 'Pausa', ecc: 'Descida', conc: 'Subida' };

export const temCartao = (exId: string) => !!CARTOES[exId];

export function CartaoTexto({ exId, aberto = false }: { exId: string; aberto?: boolean }) {
  const c = CARTOES[exId];
  if (!c) return null;
  return (
    <details className="cartao-texto" open={aberto}>
      <summary>Como fazer (cartão de texto; animação em breve)</summary>
      <div className="cartao-texto-corpo">
        <p className="ajuda">Trabalha: {c.target}.</p>
        {c.montagem && (
          <>
            <h4>
              Montagem segura <Selo id="seguranca.montagem" />
            </h4>
            <ul className="lista">
              {c.montagem.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        )}
        <h4>Posição</h4>
        <ul className="lista">
          {[...c.setupEq, ...c.setupBody].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4>Execução</h4>
        <ol className="lista">
          {c.exec.map(([fase, titulo, texto]) => (
            <li key={titulo}>
              <b>{titulo}</b> <span className="sr">({FASE[fase]})</span>: {texto}
            </li>
          ))}
        </ol>
        <h4>Amplitude</h4>
        <ul className="lista">
          {c.range.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4>Dicas</h4>
        <ul className="lista">
          {c.cues.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h4>Erros comuns</h4>
        <ul className="lista">
          {c.errors.map((e) => (
            <li key={e.id}>
              <b>{e.title}</b>: {e.desc}
            </li>
          ))}
        </ul>
        <h4>Carga</h4>
        <p>{c.carga}</p>
      </div>
    </details>
  );
}
