// Gancho PreToolUse do Claude Code (.claude/settings.json): a guarda dos gabaritos. Os snapshots das personas e as
// linhas de base do motor julgam as mudanças; uma mudança não pode reescrever o que a julga. Quando um comando ou uma
// edição regravaria um gabarito, o Claude Code pede a confirmação da pessoa (o "ok do Gustavo" do CLAUDE.md).
import { relative } from 'node:path';
import { lerEntrada } from './estado.mjs';
import { ehGabarito, regravaGabarito } from './regras.mjs';

try {
  const { tool_name: ferramenta, tool_input: dados = {} } = lerEntrada();
  const caminho = dados.file_path ?? dados.notebook_path;
  const regrava = ferramenta === 'Bash' ? regravaGabarito(String(dados.command ?? '')) : !!caminho && ehGabarito(relative(process.cwd(), caminho));
  if (regrava) {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'ask',
          permissionDecisionReason:
            'Isto regrava um gabarito dos testes (snapshots das personas ou linha de base do motor). Pelo CLAUDE.md, só com o ok do Gustavo, depois de ele ver o antes e o depois. Confirme só se ele já aprovou.',
        },
      }),
    );
  }
} catch {
  // na dúvida, a guarda não atrapalha: a regra continua no CLAUDE.md
}
