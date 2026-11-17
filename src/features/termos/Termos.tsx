import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CONTATO_EMAIL, FOTO_LIGADA, RESPONSAVEL } from '../app/contato';
import { useApp } from '../app/estado';
import { ParaOndeVaiAFoto } from '../app/privacidade';
import { Selo, Titulo, Topo } from '../app/ui';

// Termos de uso e aviso de privacidade (R5c, P2). Sem revisão jurídica: o Gustavo decidiu dispensá-la em 08/11/2026.
// O conteúdo segue a LGPD (lgpd: arts. 5º, 8º, 9º, 11, 18 e 33), a Res. CD/ANPD 2/2022 (anpd2-2022) e o que a Anthropic
// diz por escrito (anthropic-retencao, anthropic-servidores, anthropic-termos). Nada aqui promete além disso.

/** Versão dos termos; muda quando o texto mudar. */
export const TERMOS_VERSAO = '1, de 07/11/2026';

export function Termos() {
  const { estado } = useApp();
  const { hash } = useLocation();
  useEffect(() => {
    // O link "veja os termos" da foto abre direto na seção da foto (depois do foco no título).
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  const voltar = estado.programa ? '/dados' : '/';
  const responsavel = RESPONSAVEL || 'quem te mandou o link do app';
  return (
    <div className="wrap app">
      <Topo voltar={{ para: voltar, rotulo: estado.programa ? 'Meus dados' : 'Início' }} />
      <main className="conteudo termos">
        <Titulo>Termos de uso e privacidade</Titulo>
        <p className="muted">
          Versão {TERMOS_VERSAO}.
        </p>

        <section aria-labelledby="t-app">
          <h2 id="t-app">O que é o app</h2>
          <p>
            O treino-mvp é um app gratuito, em fase de teste, aberto só para família e amigos de quem o mantém. Ele monta um programa de
            treino de força com o equipamento que você tem, mostra como fazer cada exercício e sugere a carga da próxima vez, a partir de
            regras com fonte e selo de evidência.
          </p>
        </section>

        <section aria-labelledby="t-nao-faz" className="warnbox">
          <h2 id="t-nao-faz">O que o app não faz</h2>
          <p>
            O app não diagnostica e não substitui um médico ou um profissional de Educação Física: é uma ferramenta de orientação, não
            uma prescrição. Se sentir dor, tontura ou mal-estar, pare e procure avaliação. <Selo id="seguranca.sem-diagnostico" />
          </p>
          <p>
            Por estar em teste, o app pode ter erros, mudar ou sair do ar sem aviso. Você decide o que fazer com as sugestões.
          </p>
        </section>

        <section aria-labelledby="t-quem">
          <h2 id="t-quem">Quem responde pelo app</h2>
          <p>
            Responsável: <b>{responsavel}</b>.{' '}
            {CONTATO_EMAIL ? (
              <>
                Contato: <a href={`mailto:${CONTATO_EMAIL}`}>{CONTATO_EMAIL}</a>.
              </>
            ) : (
              'Contato: fale direto com essa pessoa.'
            )}
          </p>
        </section>

        <section aria-labelledby="t-aparelho">
          <h2 id="t-aparelho">Seus dados ficam no aparelho</h2>
          <p>
            As respostas da triagem de saúde, o nível, a rotina, o equipamento, os locais, o programa e os treinos (cargas, repetições e
            as notas de dor) ficam guardados só no navegador deste aparelho. As respostas de saúde e as notas de dor são dados sensíveis
            pela lei (LGPD, art. 5º, II).
          </p>
          <p>
            Não há conta, login nem nuvem. O app não manda esses dados a ninguém e não mede o seu uso. Quem mantém o app não tem acesso a
            eles.
          </p>
          <p>
            O navegador pode apagar os dados de um site: o Safari do iPhone, depois de 7 dias de uso do Safari sem abrir o app (quando o
            app não está instalado na tela de início); qualquer navegador, se faltar espaço. Por isso, exporte uma cópia de vez em quando
            em “Meus dados”. <Selo id="dados.copia" /> O arquivo exportado tem os seus dados de saúde: guarde com cuidado e só mande a
            alguém se quiser.
          </p>
        </section>

        <section aria-labelledby="foto-titulo" id="foto">
          <h2 id="foto-titulo">A foto do equipamento</h2>
          {!FOTO_LIGADA && (
            <p>
              <b>Por enquanto, o reconhecimento pela foto está desligado: nada sai do aparelho.</b> Quando for ligado, valerá o que está
              abaixo.
            </p>
          )}
          <p>
            Usar a foto é opcional: a lista de equipamento faz o mesmo. A foto só sai do aparelho com a sua autorização, dada na tela da
            foto antes do 1º envio (LGPD, art. 11, I, e art. 33, VIII). <Selo id="privacidade.foto" />
          </p>
          <ParaOndeVaiAFoto />
          <p>
            Junto com a foto vão o código de convite e um número aleatório do aparelho, só para limitar quantas fotos cada aparelho manda
            por dia. Eles não dizem quem você é.
          </p>
          <p>
            A data da autorização fica só neste aparelho. Você pode retirá-la quando quiser, de graça, na tela da foto ou em “Meus dados”
            (LGPD, art. 8º, § 5º). As fotos já enviadas seguem o prazo de apagamento da Anthropic.
          </p>
        </section>

        <section aria-labelledby="t-outras">
          <h2 id="t-outras">O que outras empresas recebem</h2>
          <ul className="lista">
            <li>A Vercel, que hospeda o app, recebe os dados técnicos de cada acesso (o endereço IP e o navegador), como acontece com qualquer site.</li>
            <li>A Anthropic recebe só a foto, e só se a foto estiver ligada e você autorizar.</li>
          </ul>
        </section>

        <section aria-labelledby="t-direitos">
          <h2 id="t-direitos">Seus direitos</h2>
          <p>
            Pela LGPD (art. 18), você pode pedir a confirmação de que há tratamento dos seus dados, o acesso a eles, a correção, a
            eliminação, a portabilidade, a informação sobre com quem foram compartilhados e sobre a possibilidade de não consentir, e
            retirar o consentimento. Como os dados ficam no seu aparelho, quase tudo você faz sozinho:
          </p>
          <ul className="lista">
            <li>ver e levar os dados: “Meus dados” → “Guardar uma cópia”;</li>
            <li>corrigir: “Meus dados” → “Refazer a triagem”, “Rotina e divisão”, “Objetivo”, “Algo a evitar” ou “Meus locais”;</li>
            <li>apagar: “Meus dados” → “Apagar todos os dados”;</li>
            <li>retirar a autorização da foto: “Meus dados” → “Foto do equipamento”.</li>
          </ul>
          <p>
            Para o resto, ou para qualquer dúvida, fale com o contato acima; o pedido é atendido sem custo (art. 18, § 5º). Você também
            pode reclamar à Autoridade Nacional de Proteção de Dados, a ANPD (art. 18, § 1º).
          </p>
        </section>

        <section aria-labelledby="t-mudancas">
          <h2 id="t-mudancas">Mudanças nestes termos</h2>
          <p>Se o texto mudar, a versão e a data no topo mudam, e a nova versão fica nesta página.</p>
        </section>

        <p className="muted">
          Fontes: LGPD (Lei nº 13.709/2018), arts. 5º, 8º, 9º, 11, 18 e 33; Resolução CD/ANPD nº 2/2022; páginas da Anthropic sobre
          retenção de dados, localização dos servidores e termos comerciais, lidas em 07/11/2026.
        </p>
      </main>
    </div>
  );
}
