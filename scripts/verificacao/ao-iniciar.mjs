// Gancho SessionStart do Claude Code (.claude/settings.json): guarda o retrato dos arquivos no começo da sessão. O
// gancho de parada (ao-parar.mjs) só confere o que a própria sessão mudou depois disso; o que já estava assim antes
// não é dela (como o "já existia" das revisões de código).
import { arvoreAtual, gravar, ler, lerEntrada } from './estado.mjs';

try {
  const { session_id: sid = 'sem-sessao' } = lerEntrada();
  const estado = ler();
  if (!estado.sessoes[sid]) {
    estado.sessoes[sid] = { inicio: arvoreAtual(), falhas: 0, relatadas: [], bloqueiosEnvio: 0, quando: new Date().toISOString() };
    gravar(estado);
  }
} catch {
  // um gancho de verificação nunca impede a sessão de começar
}
