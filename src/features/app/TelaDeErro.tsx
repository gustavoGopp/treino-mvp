import { Component, useState, type ErrorInfo, type ReactNode } from 'react';
import { lerBruto } from '../../storage/idb';
import { baixarCopia } from './copia';
import { AvisarProblema } from './privacidade';
import { Titulo } from './ui';

// Tela de erro (R5c, P4): sem ela, um erro de tela no React 18 desmonta a árvore e a página fica em branco, sem caminho
// até "Exportar". Fica em volta de tudo (até do estado), não usa o roteador e lê o armazenamento direto.

type Props = { children: ReactNode };
type Estado = { erro: Error | null };

export class LimiteDeErro extends Component<Props, Estado> {
  state: Estado = { erro: null };

  static getDerivedStateFromError(erro: unknown): Estado {
    return { erro: erro instanceof Error ? erro : new Error(String(erro)) };
  }

  componentDidCatch(erro: unknown, info: ErrorInfo) {
    // Só no console do próprio aparelho: nada é enviado.
    console.error('Erro de tela', erro, info.componentStack);
  }

  render() {
    return this.state.erro ? <TelaDeErro erro={this.state.erro} /> : this.props.children;
  }
}

export function TelaDeErro({ erro }: { erro: Error }) {
  const [msg, setMsg] = useState('');
  const [falha, setFalha] = useState('');

  const exportar = async () => {
    setMsg('');
    setFalha('');
    try {
      const bruto = await lerBruto();
      if (bruto === undefined) {
        setFalha('Não há dados guardados neste aparelho.');
        return;
      }
      baixarCopia(bruto);
      setMsg('Arquivo exportado. Guarde-o num lugar seguro: ele tem seus dados de saúde.');
    } catch {
      setFalha('Não foi possível ler os dados deste aparelho.');
    }
  };

  return (
    <div className="wrap app">
      <header className="top">
        <div className="brand">
          <b>treino-mvp</b>
        </div>
      </header>
      <main className="conteudo">
        <Titulo>Algo deu errado nesta tela</Titulo>
        <p className="lede">Seus dados continuam guardados neste aparelho. Antes de tentar de novo, guarde uma cópia.</p>
        <section className="box pilha" aria-labelledby="erro-copia">
          <h2 id="erro-copia">Guardar uma cópia</h2>
          <p>O arquivo tem tudo o que está neste aparelho e pode ser importado depois, em “Meus dados”.</p>
          <button type="button" className="btn" onClick={() => void exportar()}>
            Exportar meus dados
          </button>
          <p role="status" className="status">
            {msg}
          </p>
          {falha && (
            <div className="caixa-erro" role="alert">
              {falha}
            </div>
          )}
        </section>
        <section className="box pilha" aria-labelledby="erro-tentar">
          <h2 id="erro-tentar">Tentar de novo</h2>
          <p>Recarrega o app. Se o erro voltar, avise o problema.</p>
          <button type="button" className="btn sec" onClick={() => window.location.reload()}>
            Tentar de novo
          </button>
        </section>
        <section className="box pilha" aria-labelledby="erro-avisar">
          <h2 id="erro-avisar">Avisar o problema</h2>
          <AvisarProblema erro={erro} />
        </section>
        <p className="muted">
          Versão do app: {__VERSAO__}, publicada em {new Date(__DATA_BUILD__).toLocaleDateString('pt-BR')}.{' '}
          <a href="/termos">Termos e privacidade</a>
        </p>
      </main>
    </div>
  );
}

/** Chave de sessão que força um erro de tela: só para o teste e2e da tela de erro (some ao fechar a aba). */
export const CHAVE_TESTE_ERRO = 'treino-teste-erro';

/** Lança um erro de tela quando o teste pede (sessionStorage). Sem a chave, não faz nada. */
export function ProvaDeErro() {
  let forcar = false;
  try {
    forcar = sessionStorage.getItem(CHAVE_TESTE_ERRO) === '1';
  } catch {
    /* sem armazenamento de sessão */
  }
  if (forcar) throw new Error('Erro de teste da tela de erro');
  return null;
}
