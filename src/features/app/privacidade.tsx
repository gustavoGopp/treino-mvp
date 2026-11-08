import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { linkDoProblema, textoDoProblema } from '../../domain/dados';
import { CONTATO_EMAIL, FOTO_LIGADA } from './contato';
import { Selo } from './ui';

// Textos e peças da abertura para família e amigos (R5c): a foto (privacidade.foto) e o "Avisar um problema" (P5).
// AvisarProblema não usa o react-router: a tela de erro o mostra fora do roteador.

/**
 * O que sai do aparelho, em uma frase curta (boas-vindas e Meus dados). O texto longo, com a caixa de consentimento,
 * fica na tela da foto; o completo, nos termos.
 */
export function TextoFotoCurto() {
  if (!FOTO_LIGADA) return <>Nada sai do aparelho: por enquanto, o reconhecimento pela foto está desligado.</>;
  return (
    <>
      A única coisa que sai do aparelho é a foto do equipamento, se você usar: ela vai reduzida e sem a localização para a
      Anthropic, empresa dos EUA que faz o reconhecimento. O servidor do app não guarda a foto; a Anthropic diz que apaga o que
      recebe em até 30 dias, com exceções (veja os <Link to="/termos#foto">termos</Link>). <Selo id="privacidade.foto" />
    </>
  );
}

/** Os itens do "para onde vai a foto", na caixa de consentimento e nos termos. */
export function ParaOndeVaiAFoto() {
  return (
    <ul className="lista">
      <li>No seu celular, cada foto é reduzida e perde a localização (GPS) e os outros dados da câmera.</li>
      <li>
        Ela vai para a <b>Anthropic, empresa dos EUA</b>, que faz o reconhecimento. A Anthropic guarda o dado nos EUA e pode
        processá-lo também em outros países.
      </li>
      <li>
        A Anthropic diz que apaga o que recebe <b>em até 30 dias</b>, salvo se o envio for marcado como violação da política de uso
        dela (aí pode guardar até 2 anos) ou se a lei exigir, e que <b>não usa</b> o conteúdo para treinar os modelos dela.
      </li>
      <li>O servidor do app não guarda a foto e não registra a imagem (só quantas fotos foram enviadas).</li>
      <li>Evite fotografar pessoas, documentos ou o que você não quer mostrar.</li>
    </ul>
  );
}

const versaoEscrita = () => `${__VERSAO__}`;
const dataBuild = () => new Date(__DATA_BUILD__).toLocaleDateString('pt-BR');

/**
 * "Avisar um problema" (P5): a versão, o aparelho e a tela já escritos, sem dado de saúde. Com o e-mail configurado no
 * build (VITE_CONTATO_EMAIL), abre o e-mail pronto; sem ele, mostra o texto para copiar e mandar a quem passou o link.
 */
export function AvisarProblema({ erro }: { erro?: Error }) {
  const id = useId();
  const [aberto, setAberto] = useState(false);
  const [copiado, setCopiado] = useState('');
  const texto = () =>
    textoDoProblema({
      versao: versaoEscrita(),
      publicadaEm: dataBuild(),
      aparelho: navigator.userAgent,
      tela: window.location.pathname,
      erro: erro ? { nome: erro.name, mensagem: erro.message } : undefined,
    });
  const link = CONTATO_EMAIL ? linkDoProblema(CONTATO_EMAIL, texto()) : null;
  const ajuda = 'Vão a versão do app, o modelo do aparelho e a tela. Não escreva nada sobre a sua saúde e não anexe o arquivo exportado.';

  if (link)
    return (
      <div className="pilha">
        <a className="btn sec" href={link}>
          Avisar um problema
        </a>
        <p className="ajuda">Abre o seu e-mail com a mensagem pronta. {ajuda}</p>
      </div>
    );

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto());
      setCopiado('Copiado. Cole numa mensagem para quem te mandou o link do app.');
    } catch {
      setCopiado('Não deu para copiar: selecione o texto acima e copie.');
    }
  };
  return (
    <div className="pilha">
      <button type="button" className="btn sec" aria-expanded={aberto} aria-controls={id} onClick={() => setAberto((a) => !a)}>
        Avisar um problema
      </button>
      {aberto && (
        <div id={id} className="pilha">
          <p className="ajuda">Mande este texto para quem te passou o link do app, contando o que aconteceu. {ajuda}</p>
          <pre className="texto-problema" tabIndex={0} aria-label="Informações do problema">
            {texto()}
          </pre>
          <button type="button" className="btn sec pequeno" onClick={() => void copiar()}>
            Copiar as informações
          </button>
          <p role="status" className="status">
            {copiado}
          </p>
        </div>
      )}
    </div>
  );
}
