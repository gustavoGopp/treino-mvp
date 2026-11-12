import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { primeiroPassoPendente } from '../../storage/esquema';
import { agoraIso, useApp } from '../app/estado';
import { Folha } from '../app/Folha';
import { AvisoInstalar, AvisoSalvar } from '../app/avisos';
import { TextoFotoCurto } from '../app/privacidade';
import { Selo, Titulo, Topo } from '../app/ui';
import { IconeLugar } from './lugares';

// A apresentação (redesign, lote 3; a proposta B, "o seu lugar", escolhida pelo Gustavo em 06/11/2026;
// docs/revisoes/redesign/agente-7-apresentacao.md). Os 4 lugares no topo, uma frase sobre o benefício, o aviso inteiro
// numa nota calma antes do botão (seguranca.sem-diagnostico, texto intacto) e a privacidade a um toque. Sem promessa de
// resultado, sem prova social, sem contagem regressiva. Se já existe programa, abre direto nele.
export function BoasVindas() {
  const { estado, carregado, erroCarga, atualizar } = useApp();
  const navigate = useNavigate();
  const [privacidade, setPrivacidade] = useState(false);
  if (!carregado) return null;
  if (estado.programa && !primeiroPassoPendente(estado)) return <Navigate to="/programa" replace />;

  const comecar = () => {
    if (!estado.avisoAceitoEm) atualizar((e) => ({ ...e, avisoAceitoEm: agoraIso() }));
    navigate('/comecar/triagem');
  };

  return (
    <div className="wrap app">
      <Topo direita={<Link to="/dados">Meus dados</Link>} />
      <main className="conteudo boas">
        <div className="lugares" aria-hidden="true">
          <IconeLugar lugar="academia" />
          <IconeLugar lugar="condominio" />
          <IconeLugar lugar="casa" />
          <IconeLugar lugar="corpo" />
        </div>
        <Titulo>Treine onde estiver, com o que tiver</Titulo>
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga} Em <Link to="/dados">Meus dados</Link> você pode importar um backup.
          </div>
        )}
        <AvisoSalvar />
        <AvisoInstalar />
        <p className="lede">Monta o programa, mostra cada exercício e diz o porquê.</p>
        <section className="nota-aviso" aria-labelledby="nao-faz">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v5M12 8h.01" />
          </svg>
          <div>
            <h2 id="nao-faz">O que o app não faz</h2>
            <p>
              O app não diagnostica e não substitui um médico ou um profissional de Educação Física. É uma ferramenta de orientação, não uma
              prescrição. Se sentir dor, tontura ou mal-estar, pare e procure avaliação. <Selo id="seguranca.sem-diagnostico" />
            </p>
          </div>
        </section>
        <p className="privacidade-linha">
          <button type="button" aria-haspopup="dialog" onClick={() => setPrivacidade(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v10H5z" />
            </svg>
            Seus dados ficam só neste celular. Sem login.
          </button>
        </p>
        {privacidade && (
          <Folha titulo="Seus dados ficam no aparelho" aoFechar={() => setPrivacidade(false)}>
            <p>
              O seu perfil, as respostas de saúde, o programa e os treinos ficam guardados só neste aparelho. <TextoFotoCurto /> Você pode
              exportar ou apagar tudo quando quiser em “Meus dados”.
            </p>
          </Folha>
        )}
        <div className="acao-boas">
          <p className="ajuda termos-linha">
            Ao começar, você concorda com os <Link to="/termos">termos de uso e o aviso de privacidade</Link>.
          </p>
          <button type="button" className="btn" onClick={comecar}>
            Começar
          </button>
          <p className="sob-botao">4 passos, uns 3 minutos</p>
        </div>
      </main>
    </div>
  );
}
