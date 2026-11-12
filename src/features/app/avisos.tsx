import { useId, useState } from 'react';
import { avisarInstalar, lembrarCopia } from '../../domain/dados';
import type { Estado } from '../../storage/esquema';
import { baixarCopia } from './copia';
import { agoraIso, useApp } from './estado';
import { gravarLocal, lerLocal, LOCAL } from './local';
import { Selo } from './ui';

// Avisos que protegem os dados (R5c): instalar no iPhone (dados.instalar-iphone) e o lembrete de cópia (dados.copia).

/** Aberto pela tela de início (iOS: navigator.standalone; os outros: display-mode standalone). */
function estaInstalado(): boolean {
  const nav = navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true || !!window.matchMedia?.('(display-mode: standalone)').matches;
}

/**
 * O aparelho recusou a gravação (sem espaço, aba anônima): avisa em toda tela onde a pessoa registra ou confere algo,
 * com a saída ali mesmo, porque o que está na memória ainda pode ser exportado.
 */
export function AvisoSalvar() {
  const { erroAoSalvar, estado } = useApp();
  if (!erroAoSalvar) return null;
  return (
    <div className="caixa-erro pilha" role="alert">
      <p>
        <b>Não foi possível salvar neste aparelho.</b> O que você registrar agora pode se perder ao fechar o app. Exporte uma cópia para
        não perder seus dados.
      </p>
      <button type="button" className="btn sec" onClick={() => baixarCopia(estado)}>
        Exportar meus dados
      </button>
    </div>
  );
}

/** dados.instalar-iphone: no iPhone ou iPad aberto no navegador, os passos para instalar, até a pessoa tocar em "Entendi". */
export function AvisoInstalar() {
  const id = useId();
  const [visto, setVisto] = useState(() => !!lerLocal(LOCAL.avisoInstalar));
  const [mostrar] = useState(() =>
    avisarInstalar({ userAgent: navigator.userAgent, maxTouchPoints: navigator.maxTouchPoints ?? 0, instalado: estaInstalado() }),
  );
  if (visto || !mostrar) return null;
  return (
    <section className="aviso-instalar" aria-labelledby={id}>
      <h2 id={id} className="secao">
        Instale o app para não perder seus dados
      </h2>
      <p>
        No iPhone, o Safari apaga os dados de um site depois de 7 dias de uso sem abri-lo. Instalado na tela de início, o app não entra
        nessa contagem. <Selo id="dados.instalar-iphone" />
      </p>
      <ol>
        <li>Toque em Compartilhar (o quadrado com a seta para cima).</li>
        <li>Toque em “Adicionar à Tela de Início”.</li>
        <li>Abra o app pelo ícone novo.</li>
      </ol>
      <p className="ajuda">Se já tem treinos aqui, exporte uma cópia antes em “Meus dados”: o app instalado pode começar vazio, e aí é só importar.</p>
      <button
        type="button"
        className="btn sec pequeno"
        onClick={() => {
          gravarLocal(LOCAL.avisoInstalar, agoraIso());
          setVisto(true);
        }}
      >
        Entendi
      </button>
    </section>
  );
}

/** dados.copia: lembrete discreto de exportar, abaixo de "Começar o treino". Exporta ali mesmo ou espera 7 dias. */
export function LembreteCopia({ estado }: { estado: Estado }) {
  const id = useId();
  const [ultima, setUltima] = useState(() => lerLocal(LOCAL.ultimaCopia));
  const [adiado, setAdiado] = useState(() => lerLocal(LOCAL.copiaAdiada));
  const [feito, setFeito] = useState('');
  const fins = estado.historico.map((s) => s.fim);
  if (feito)
    return (
      <p role="status" className="status">
        {feito}
      </p>
    );
  if (!lembrarCopia({ ultimaCopia: ultima || undefined, adiadoEm: adiado || undefined, fins, agora: agoraIso() })) return null;
  return (
    <section className="aviso-instalar" aria-labelledby={id}>
      <h2 id={id} className="secao">
        Guarde uma cópia dos seus treinos
      </h2>
      <p>
        {ultima ? 'Você tem treinos novos desde a última cópia.' : 'Você ainda não exportou nenhuma cópia.'} Os dados ficam só neste
        aparelho, e o navegador pode apagá-los. <Selo id="dados.copia" />
      </p>
      <div className="opcoes linha">
        <button
          type="button"
          className="btn sec pequeno"
          onClick={() => {
            baixarCopia(estado);
            setUltima(lerLocal(LOCAL.ultimaCopia));
            setFeito('Arquivo exportado. Guarde-o num lugar seguro: ele tem seus dados de saúde.');
          }}
        >
          Exportar agora
        </button>
        <button
          type="button"
          className="btn sec pequeno"
          onClick={() => {
            const agora = agoraIso();
            gravarLocal(LOCAL.copiaAdiada, agora);
            setAdiado(agora);
          }}
        >
          Agora não
        </button>
      </div>
    </section>
  );
}
