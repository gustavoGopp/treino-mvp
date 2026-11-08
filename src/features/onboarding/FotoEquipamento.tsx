import { SO_NA_FOTO } from '../../domain/taxonomia/atalhos';
import { useId, useRef, useState } from 'react';
import type { ItemId } from '../../domain/taxonomia/equipamentos';
import { marcacaoInicial, type Sugestao } from '../../domain/visao';
import { paraBase64, prepararFoto } from '../../lib/imagem';
import { IconeEquipamento } from './icones';
import { NOME_CURTO } from './inventarioForm';
import { agoraIso } from '../app/estado';
import { apagarLocal, dataCurta, gravarLocal, lerLocal, LOCAL } from '../app/local';
import { ParaOndeVaiAFoto } from '../app/privacidade';
import { Selo } from '../app/ui';

// Foto do equipamento (M4): reduz e limpa as fotos no aparelho, envia para /api/vision e mostra as sugestões.
// Nada entra na lista sem a confirmação da pessoa (plano, seção g.6). Qualquer erro leva de volta à lista.
// Antes do 1º envio, a caixa de consentimento diz para onde a foto vai (privacidade.foto; R5c).

const MAX_FOTOS = 5;
const TEXTO_CONFIANCA = { alta: 'Com certeza', media: 'Provável', baixa: 'Talvez' } as const;

/** Identificador aleatório do aparelho, só para o limite diário. Não identifica a pessoa. */
function aparelho(): string {
  let id = lerLocal(LOCAL.aparelho);
  if (!id) {
    id = crypto.randomUUID();
    gravarLocal(LOCAL.aparelho, id);
  }
  return id;
}

type Escolha = Record<string, boolean | undefined>;

export function FotoEquipamento({ aoUsar }: { aoUsar: (sugestoes: Sugestao[], confirmados: ItemId[]) => void }) {
  const idConvite = useId();
  const idArquivo = useId();
  const idConsentimento = useId();
  const arquivo = useRef<HTMLInputElement>(null);
  const [convite, setConvite] = useState(() => lerLocal(LOCAL.convite));
  const [consentidoEm, setConsentidoEm] = useState(() => lerLocal(LOCAL.fotoConsentimento));
  const [autorizou, setAutorizou] = useState(false);
  const podeEnviar = !!consentidoEm || autorizou;
  const [estado, setEstado] = useState<'inicio' | 'enviando' | 'sugestoes'>('inicio');
  const [erro, setErro] = useState('');
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [escolha, setEscolha] = useState<Escolha>({});

  const enviar = async (lista: FileList | null) => {
    setErro('');
    if (!lista?.length) return;
    if (!podeEnviar) {
      setErro('Para usar a foto, marque a autorização acima. Sem ela, use a lista abaixo.');
      return;
    }
    if (!convite.trim()) {
      setErro('Digite o código de convite para usar a foto. Sem código, use a lista abaixo.');
      return;
    }
    if (lista.length > MAX_FOTOS) {
      setErro(`Escolha até ${MAX_FOTOS} fotos.`);
      return;
    }
    gravarLocal(LOCAL.convite, convite.trim());
    if (!consentidoEm) {
      // privacidade.foto: a data do aceite fica só neste aparelho.
      const em = agoraIso();
      gravarLocal(LOCAL.fotoConsentimento, em);
      setConsentidoEm(em);
    }
    setEstado('enviando');
    try {
      const fotos = await Promise.all([...lista].map(async (f) => paraBase64(await prepararFoto(f))));
      const r = await fetch('/api/vision', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ convite: convite.trim(), aparelho: aparelho(), fotos }),
      });
      const corpo = (await r.json().catch(() => ({}))) as { itens?: Sugestao[]; erro?: string };
      if (!r.ok || !corpo.itens) throw new Error(corpo.erro || 'Não foi possível analisar as fotos agora. Use a lista.');
      setSugestoes(corpo.itens);
      setEscolha(Object.fromEntries(corpo.itens.map((s) => [s.itemId, { marcado: true, perguntar: undefined, desmarcado: false }[marcacaoInicial(s.confianca)]])));
      setEstado('sugestoes');
    } catch (e) {
      setErro(e instanceof TypeError ? 'Sem conexão. Use a lista abaixo.' : (e as Error).message);
      setEstado('inicio');
    } finally {
      if (arquivo.current) arquivo.current.value = '';
    }
  };

  if (estado === 'sugestoes') {
    const faltam = sugestoes.filter((s) => !SO_NA_FOTO.includes(s.itemId) && escolha[s.itemId] === undefined).length;
    return (
      <section className="foto-eq" aria-labelledby="sugestoes-foto">
        <h2 id="sugestoes-foto">O que encontramos nas fotos</h2>
        <p className="ajuda">Confira cada item. Só entra na lista o que você confirmar.</p>
        {sugestoes.length === 0 && <p>Não reconhecemos nenhum equipamento. Use a lista abaixo.</p>}
        <ul className="sugestoes-foto">
          {sugestoes.map((s) => (
            <li key={s.itemId} className={`sugestao-foto conf-${s.confianca}`}>
              <IconeEquipamento id={s.itemId} />
              <div className="sugestao-texto">
                <b>{NOME_CURTO[s.itemId]}</b>
                <span>
                  {TEXTO_CONFIANCA[s.confianca]}
                  {s.evidencia ? ` · ${s.evidencia}` : ''}
                </span>
              </div>
              {SO_NA_FOTO.includes(s.itemId) ? (
                <p className="ajuda">Reconhecida, mas o cardio não entra no treino.</p>
              ) : (
              <div className="sim-nao" role="group" aria-label={`Você tem ${NOME_CURTO[s.itemId]}?`}>
                <button type="button" aria-pressed={escolha[s.itemId] === true} onClick={() => setEscolha((x) => ({ ...x, [s.itemId]: true }))}>
                  Tenho
                </button>
                <button type="button" aria-pressed={escolha[s.itemId] === false} onClick={() => setEscolha((x) => ({ ...x, [s.itemId]: false }))}>
                  Não tenho
                </button>
              </div>
              )}
            </li>
          ))}
        </ul>
        {faltam > 0 && <p className="ajuda">{faltam === 1 ? 'Falta responder 1 item.' : `Faltam responder ${faltam} itens.`}</p>}
        <button
          type="button"
          className="btn"
          disabled={faltam > 0}
          onClick={() => {
            aoUsar(sugestoes, sugestoes.filter((s) => escolha[s.itemId]).map((s) => s.itemId));
            setEstado('inicio');
            setSugestoes([]);
          }}
        >
          Usar na lista
        </button>
        <button type="button" className="link-sec" onClick={() => setEstado('inicio')}>
          Descartar e voltar
        </button>
      </section>
    );
  }

  return (
    <section className="foto-eq" aria-labelledby="titulo-foto">
      <h2 id="titulo-foto">Reconhecer pela foto</h2>
      <p className="ajuda">Tire ou escolha até {MAX_FOTOS} fotos do lugar onde você treina. Usar a foto é opcional: a lista abaixo faz o mesmo.</p>
      {consentidoEm ? (
        <div className="pilha">
          <p className="ajuda">
            Você autorizou o envio das fotos à Anthropic, nos EUA, em {dataCurta(consentidoEm)}.{' '}
            <button
              type="button"
              className="link-texto"
              onClick={() => {
                apagarLocal(LOCAL.fotoConsentimento);
                setConsentidoEm('');
                setAutorizou(false);
              }}
            >
              Retirar a autorização
            </button>
          </p>
          <details className="mais">
            <summary>Para onde vai a foto</summary>
            <div className="mais-corpo">
              <ParaOndeVaiAFoto />
            </div>
          </details>
        </div>
      ) : (
        <section className="consentimento" aria-labelledby="para-onde">
          <h3 id="para-onde">Antes de enviar: para onde vai a foto</h3>
          <ParaOndeVaiAFoto />
          <label className="opcao" htmlFor={idConsentimento}>
            <input id={idConsentimento} type="checkbox" checked={autorizou} onChange={(e) => setAutorizou(e.target.checked)} />
            <span>Autorizo enviar as minhas fotos à Anthropic, nos EUA, só para reconhecer o equipamento.</span>
          </label>
          <p className="ajuda">
            Sem autorizar, a lista funciona igual. Você pode retirar a autorização quando quiser. <Selo id="privacidade.foto" />
          </p>
        </section>
      )}
      <label className="rotulo" htmlFor={idConvite}>
        Código de convite
      </label>
      <input id={idConvite} className="campo-texto" value={convite} onChange={(e) => setConvite(e.target.value)} autoCapitalize="characters" autoComplete="off" />
      <div className="arquivo-campo">
        <input id={idArquivo} ref={arquivo} type="file" accept="image/*" multiple onChange={(e) => void enviar(e.target.files)} disabled={estado === 'enviando' || !podeEnviar} />
        <label htmlFor={idArquivo} className="btn sec" aria-disabled={estado === 'enviando' || !podeEnviar}>
          {estado === 'enviando' ? 'Analisando as fotos…' : 'Escolher fotos'}
        </label>
      </div>
      <p role="status" className="status">
        {estado === 'enviando' ? 'Analisando as fotos…' : ''}
      </p>
      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}
    </section>
  );
}
