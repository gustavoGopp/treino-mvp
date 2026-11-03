import { Link, Navigate, useNavigate } from "react-router-dom";
import { primeiroPassoPendente } from "../../storage/esquema";
import { agoraIso, useApp } from "../app/estado";
import { useEstiloBoneco } from "../app/estiloBoneco";
import { Selo, Titulo, Topo } from "../app/ui";
import { quadro } from "../programa/Miniatura";

// Passo 1: o que o app faz e o que não faz (seguranca.sem-diagnostico). Se já existe programa, abre direto nele.
// Design v3, direção 2 (aprovada pelo Gustavo em 03/11/2026): o Boneco em cima, uma frase, o "não faz" inteiro e os
// dados no aparelho antes do botão, que registra o aceite (avisoAceitoEm). O resto fica em "Como funciona".
// A frase da foto (sem localização, nada no servidor) fica na tela da foto, antes do envio.
export function BoasVindas() {
  const { estado, carregado, erroCarga, atualizar } = useApp();
  const estilo = useEstiloBoneco();
  const navigate = useNavigate();
  if (!carregado) return null;
  if (estado.programa && !primeiroPassoPendente(estado))
    return <Navigate to="/programa" replace />;

  const comecar = () => {
    if (!estado.avisoAceitoEm)
      atualizar((e) => ({ ...e, avisoAceitoEm: agoraIso() }));
    navigate("/comecar/triagem");
  };
  const q = quadro("goblet", estilo);

  return (
    <div className="wrap app">
      <Topo direita={<Link to="/dados">Meus dados</Link>} />
      <main className="conteudo boas-vindas">
        {q && (
          <div
            className="miniatura heroi"
            role="img"
            aria-label="O Boneco, o guia animado do app, num agachamento"
          >
            <svg
              className={q.classe || undefined}
              viewBox={q.viewBox}
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: q.html }}
            />
          </div>
        )}
        <Titulo>Musculação com o que você tem</Titulo>
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga} Em <Link to="/dados">Meus dados</Link> você pode
            importar um backup.
          </div>
        )}
        <p className="lede">
          O app monta seu treino só com o seu equipamento e mostra como fazer
          cada exercício.
        </p>
        <ul className="garantias">
          <li>
            <svg className="ic aviso" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 3v5a4 4 0 0 0 8 0V3M9 12v3a5 5 0 0 0 10 0v-2M17 11a2 2 0 1 0 4 0a2 2 0 1 0-4 0" />
            </svg>
            <span>
              Não diagnostica nem substitui médico ou profissional de Educação
              Física. Dor, tontura ou mal-estar? Pare e procure avaliação.{" "}
              <Selo id="seguranca.sem-diagnostico" />
            </span>
          </li>
          <li>
            <svg className="ic privado" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 13h4v4h-4zM10.5 13v-1.5a1.5 1.5 0 0 1 3 0V13" />
            </svg>
            <span>Seus dados ficam só neste aparelho.</span>
          </li>
        </ul>
        <details className="saiba">
          <summary>Como funciona</summary>
          <ul className="lista">
            <li>Monta o treino com o seu equipamento, para ganhar músculo.</li>
            <li>
              Mostra como fazer cada exercício: com o Boneco, quando há
              animação, ou em texto.
            </li>
            <li>Sugere a carga da próxima vez, pelo que você registrou.</li>
            <li>Mostra de onde vem cada escolha e a força da evidência.</li>
            <li>
              Perfil, treino e respostas ficam só neste aparelho. Exporte ou
              apague tudo em “Meus dados”.
            </li>
          </ul>
          <Link className="link-sec" to="/guia">
            Ver o guia de exercícios
          </Link>
        </details>
      </main>
      <div className="acao-fixa">
        <button type="button" className="btn" onClick={comecar}>
          Entendi, vamos começar
        </button>
      </div>
    </div>
  );
}
