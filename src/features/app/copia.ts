import { exportarJson, nomeDoArquivo } from '../../storage/arquivo';
import { gravarLocal, LOCAL } from './local';

/**
 * Baixa o arquivo de cópia (JSON) e guarda a data da última cópia no aparelho (dados.copia).
 * Usado em Meus dados e na tela de erro, que passa o que estiver guardado, mesmo ilegível.
 */
export function baixarCopia(estado: unknown, agora = new Date()): void {
  const blob = new Blob([exportarJson(estado, agora.toISOString())], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeDoArquivo(agora);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  gravarLocal(LOCAL.ultimaCopia, agora.toISOString());
}
