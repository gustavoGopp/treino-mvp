// Gancho PreToolUse do Claude Code para `git push` (.claude/settings.json): o portão do envio. Se o que vai ser enviado
// muda código (não só texto livre) e o conteúdo do HEAD não passou pelo `npm run verificar` neste aparelho, o portão
// age conforme o MODO. Ver docs/verificacao/README.md.
//
// MODO 'observar' (o de agora, como o artigo recomenda para um portão novo): o envio segue; o caso fica no registro do
//   aparelho (.verificacao/registro.log) e o Claude é avisado, para dizer no relato que enviou sem a verificação completa.
// MODO 'exigir': o envio é barrado com o motivo. Depois de 2 barradas na mesma sessão, o 3º passa (e fica registrado),
//   para o Claude não ficar preso.
// MODO 'desligado': não faz nada.
// Mudar o modo é uma decisão registrada no devlog, num commit próprio.
import { aprovadaQueCobre, arvoreDe, diferencas, gravar, ler, lerEntrada, registrar, tentarGit } from './estado.mjs';
import { quePedemVerificacao } from './regras.mjs';

const MODO = 'observar';
const BARRADAS_ANTES_DE_LIBERAR = 2;

function sair(saida) {
  if (saida) process.stdout.write(JSON.stringify(saida));
  process.exit(0);
}

try {
  if (MODO === 'desligado') sair();
  const entrada = lerEntrada();
  const sid = entrada.session_id ?? 'sem-sessao';
  // o que este envio leva: do ramo remoto (ou, sem ele, do ponto em que o ramo saiu da main) até o HEAD
  const base = tentarGit(['rev-parse', '--verify', '-q', '@{upstream}']) ?? tentarGit(['merge-base', 'HEAD', 'origin/main']);
  const pedem = base ? quePedemVerificacao(diferencas(base, 'HEAD')) : ['(sem base para comparar)'];
  if (pedem.length === 0) sair();
  if (aprovadaQueCobre(arvoreDe('HEAD'), 'verificar')) sair();

  const lista = pedem.slice(0, 5).join(', ') + (pedem.length > 5 ? ` e mais ${pedem.length - 5}` : '');
  const head = (tentarGit(['rev-parse', '--short', 'HEAD']) ?? '?');
  const motivo = `O envio leva mudanças que pedem verificação (${lista}), e o conteúdo do HEAD (${head}) não passou pelo \`npm run verificar\` neste aparelho, o mesmo que a verificação do GitHub roda.`;

  if (MODO === 'observar') {
    registrar(`envio observar sessão=${sid} HEAD=${head} sem carimbo: ${lista}`);
    sair({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: `Portão do envio, em modo observar (docs/verificacao/README.md): ${motivo} O envio seguiu. Diga isso no seu relato ao Gustavo; se o envio for para a main, rode \`npm run verificar\` antes.` } });
  }

  const estado = ler();
  const s = estado.sessoes[sid] ?? { inicio: null, falhas: 0, relatadas: [], bloqueiosEnvio: 0 };
  s.bloqueiosEnvio = (s.bloqueiosEnvio ?? 0) + 1;
  s.quando = new Date().toISOString();
  estado.sessoes[sid] = s;
  gravar(estado);
  if (s.bloqueiosEnvio > BARRADAS_ANTES_DE_LIBERAR) {
    registrar(`envio liberado após ${BARRADAS_ANTES_DE_LIBERAR} barradas sessão=${sid} HEAD=${head}: ${lista}`);
    sair({ hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: `Portão do envio: ${motivo} Liberado depois de ${BARRADAS_ANTES_DE_LIBERAR} barradas nesta sessão; diga ao Gustavo que foi sem a verificação completa e por quê.` } });
  }
  registrar(`envio barrado sessão=${sid} HEAD=${head}: ${lista}`);
  sair({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: `Portão do envio (docs/verificacao/README.md): ${motivo} Rode \`npm run verificar\` e envie de novo.` } });
} catch (erro) {
  try {
    registrar(`envio: erro do gancho: ${String(erro).slice(0, 300)}`);
  } catch {
    // sem disco: nada a fazer
  }
  sair();
}
