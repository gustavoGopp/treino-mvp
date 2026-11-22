import { lazy, Suspense, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { primeiroPassoPendente } from '../../storage/esquema';
import { agoraIso, useApp } from '../app/estado';
import { Folha } from '../app/Folha';
import { AvisoInstalar, AvisoSalvar } from '../app/avisos';
import { TextoFotoCurto } from '../app/privacidade';
import { Icone } from '../app/icones';
import { PorQue, Titulo, Topo } from '../app/ui';

// O Boneco da abertura é baixado à parte, depois que a tela aparece: fora do pacote inicial, que a tela do programa
// também baixa (tests/e2e/orcamento.spec.ts; medido em 22/11/2026, com ele dentro o programa passava do limite por 9 bytes).
const BonecoAbertura = lazy(() => import('./BonecoAbertura').then((m) => ({ default: m.BonecoAbertura })));
/** No celular mais baixo o Boneco não aparece (styles.css, max-height: 600px): aí nem o arquivo dele é pedido. */
const cabeOBoneco = () => typeof window === 'undefined' || !window.matchMedia?.('(max-height: 600px)').matches;

// A apresentação (redesign, lote 3; a proposta B, "o seu lugar", escolhida pelo Gustavo em 06/11/2026;
// docs/revisoes/redesign/agente-7-apresentacao.md). Desde o lote M1 da análise crítica (19/11/2026): o Boneco em
// movimento ao lado do título (no lugar dos 4 ícones de lugar), uma frase que diz o que a pessoa recebe, o aviso inteiro
// numa nota calma antes do botão (seguranca.sem-diagnostico, texto intacto, à vista em qualquer celular) e a privacidade
// a um toque. Sem promessa de resultado, sem prova social, sem contagem regressiva. Se já existe programa, abre direto nele.
/** O que a pessoa recebe, em uma frase (lote M1 da análise crítica). Texto escolhido pelo Gustavo em 22/11/2026. */
export const O_QUE_RECEBE = 'Um programa de musculação para o seu equipamento, com um boneco que mostra cada movimento.';

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
        {/* o Boneco ao lado do título: ele é alto e estreito, e assim não tira altura do aviso, que fica inteiro à vista */}
        <div className="boas-topo">
          {cabeOBoneco() && (
            <Suspense fallback={<div className="boneco-abertura stage esperando" />}>
              <BonecoAbertura />
            </Suspense>
          )}
          <Titulo>Treine onde estiver, com o que tiver</Titulo>
        </div>
        <p className="lede">{O_QUE_RECEBE}</p>
        {erroCarga && (
          <div className="caixa-erro" role="alert">
            {erroCarga} Em <Link to="/dados">Meus dados</Link> você pode importar um backup.
          </div>
        )}
        <AvisoSalvar />
        <section className="nota-aviso" aria-labelledby="nao-faz">
          <Icone nome="info" />
          <div>
            <h2 id="nao-faz">O app orienta, não diagnostica</h2>
            <p>
              Sentiu dor, tontura ou mal-estar? Pare e procure avaliação.{' '}
              <PorQue essencial regras={['seguranca.sem-diagnostico']} titulo="O que o app não faz" rotulo="o que o app não faz">
                <p>
                  O app não diagnostica e não substitui um médico ou um profissional de Educação Física. É uma ferramenta de orientação, não
                  uma prescrição. Se sentir dor, tontura ou mal-estar, pare e procure avaliação.
                </p>
              </PorQue>
            </p>
          </div>
        </section>
        <p className="privacidade-linha">
          <button type="button" aria-haspopup="dialog" onClick={() => setPrivacidade(true)}>
            <Icone nome="lock" />
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
        {/* o convite para instalar (iPhone) vem depois do que a tela tem a dizer, não antes */}
        <AvisoInstalar />
        {/* a única ação da tela fica presa embaixo, à vista em qualquer altura de celular; o aceite vem logo abaixo dela */}
        <div className="acao-fixa acao-boas">
          <button type="button" className="btn" onClick={comecar}>
            Começar
          </button>
          <p className="ajuda termos-linha">
            Ao começar, você concorda com os <Link to="/termos">termos de uso e o aviso de privacidade</Link>.
          </p>
        </div>
      </main>
    </div>
  );
}
