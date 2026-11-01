import { POR_ID } from '../../domain/biblioteca';
import { FUNCAO } from '../../domain/gerador/funcoes';
import { Selo } from '../app/ui';

/** Equivalentes do mesmo nível da função (selecao.equivalencia): os únicos entre os quais a preferência decide. */
export function equivalentes(funcao: string | undefined, atual: string, alternativas: string[]): string[] {
  const f = funcao ? FUNCAO[funcao] : undefined;
  if (!f) return [];
  const nivel = (x: string) => f.niveis.findIndex((n) => n.includes(x));
  return [atual, ...alternativas].filter((id) => nivel(id) >= 0 && nivel(id) === nivel(atual));
}

/**
 * "Prefiro este" (selecao.preferencia): só entre equivalentes do mesmo nível da função. Vale nos próximos programas e
 * nas trocas entre locais; tocar de novo desfaz. Nada vem preferido.
 */
export function BotaoPrefiro({
  funcao,
  id,
  atual,
  alternativas,
  preferidos,
  aoPreferir,
}: {
  funcao?: string;
  id: string;
  atual: string;
  alternativas: string[];
  preferidos?: Record<string, string>;
  aoPreferir: (funcao: string, id: string) => void;
}) {
  const eq = equivalentes(funcao, atual, alternativas);
  if (!funcao || eq.length < 2 || !eq.includes(id)) return null;
  const marcado = preferidos?.[funcao] === id;
  const nome = (POR_ID[id]?.nome ?? id).toLowerCase();
  return (
    <button type="button" className="link-sec prefiro" aria-pressed={marcado} onClick={() => aoPreferir(funcao, id)}>
      {marcado ? `Você prefere ${nome} · desfazer` : `Prefiro ${nome}`}
    </button>
  );
}

/** Bloco "Prefere algum destes?" nos detalhes do exercício (programa). */
export function Preferencias({
  funcao,
  atual,
  alternativas,
  preferidos,
  aoPreferir,
}: {
  funcao?: string;
  atual: string;
  alternativas: string[];
  preferidos?: Record<string, string>;
  aoPreferir: (funcao: string, id: string) => void;
}) {
  const eq = equivalentes(funcao, atual, alternativas);
  if (!funcao || eq.length < 2) return null;
  return (
    <div className="preferencias">
      <p className="ajuda">
        Prefere algum destes? Vale no próximo programa e nas trocas de local; a dor sempre manda. <Selo id="selecao.preferencia" />
      </p>
      {eq.map((id) => (
        <BotaoPrefiro key={id} funcao={funcao} id={id} atual={atual} alternativas={alternativas} preferidos={preferidos} aoPreferir={aoPreferir} />
      ))}
    </div>
  );
}
