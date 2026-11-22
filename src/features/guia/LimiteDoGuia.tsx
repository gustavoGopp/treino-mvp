import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Pacote D2 (22/11/2026). O guia completo vem num pedaço à parte do app, com os textos de todos os exercícios. Se esse
// pedaço não baixa (sem rede e sem a cópia guardada, ou uma versão nova publicada no meio do uso), a tela do guia caía
// na tela de erro do app inteiro ("Algo deu errado"), no meio do treino. Agora o guia diz que não carregou, deixa tentar
// de novo e leva de volta: o treino aberto continua guardado, e o Boneco da tela do treino não depende deste pedaço.

type Estado = { falhou: boolean };

export class LimiteDoGuia extends Component<{ children: ReactNode; emTreino: boolean }, Estado> {
  state: Estado = { falhou: false };

  static getDerivedStateFromError(): Estado {
    return { falhou: true };
  }

  componentDidCatch(erro: unknown, info: ErrorInfo) {
    // Só no console do próprio aparelho: nada é enviado.
    console.error('O guia não carregou', erro, info.componentStack);
  }

  render() {
    if (!this.state.falhou) return this.props.children;
    const volta = this.props.emTreino ? { para: '/treino', texto: 'Voltar ao treino' } : { para: '/programa', texto: 'Voltar ao início' };
    return (
      <div className="wrap app">
        <main className="conteudo">
          <h1 className="titulo">O guia não carregou agora</h1>
          <p role="status">Pode ser a internet, ou uma versão nova do app. O seu treino continua guardado.</p>
          <Link className="btn" to={volta.para}>
            {volta.texto}
          </Link>
          {/* recarregar é o que traz a versão nova do app, quando é esse o motivo */}
          <button type="button" className="btn sec" onClick={() => window.location.reload()}>
            Tentar de novo
          </button>
        </main>
      </div>
    );
  }
}
