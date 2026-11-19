// Gancho Stop do Claude Code (.claude/settings.json): quando o Claude termina uma resposta tendo mudado código nesta
// sessão, roda a camada barata (`npm run check`: lint, tipos e unitários). Se falha, devolve o erro e o Claude continua
// para consertar. Depois de 3 rodadas seguidas com falha, manda parar e explicar ao Gustavo. Ver docs/verificacao/README.md.
//
// Não roda (sai sem dizer nada) quando: só mudou texto livre; o retrato atual já passou; este mesmo retrato já foi
// relatado como falho (o Claude decidiu parar, por exemplo, para pedir um ok); há tarefas em segundo plano rodando (os
// testes disputariam o processador, e foi assim que limites de tempo estouraram em 17 e 18/11); ou faltam as dependências.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { aprovadaQueCobre, aprovar, arvoreAtual, gravar, ler, lerEntrada, registrar, soTextoLivre, tentarGit } from './estado.mjs';

const RODADAS = 3;

function sair(saida) {
  if (saida) process.stdout.write(JSON.stringify(saida));
  process.exit(0);
}

let entrada;
let atual;
try {
  entrada = lerEntrada();
  if (!existsSync('node_modules') || (entrada.background_tasks?.length ?? 0) > 0) sair();
  atual = arvoreAtual();
  const estado = ler();
  const sid = entrada.session_id ?? 'sem-sessao';
  let sessao = estado.sessoes[sid];
  if (!sessao?.inicio) {
    // o gancho de início não rodou (ou é uma sessão antiga): o começo passa a ser o último commit
    sessao = { falhas: 0, relatadas: [], bloqueiosEnvio: 0, ...sessao, inicio: tentarGit(['rev-parse', 'HEAD^{tree}']) ?? atual, quando: new Date().toISOString() };
    estado.sessoes[sid] = sessao;
    gravar(estado);
  }
  if (soTextoLivre(sessao.inicio, atual)) sair();
  if (aprovadaQueCobre(atual, 'check')) sair();
  if (sessao.relatadas.includes(atual)) sair();

  const r = spawnSync('npm', ['run', 'check'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const estadoDepois = ler();
  const s = estadoDepois.sessoes[sid] ?? sessao;
  s.quando = new Date().toISOString();
  if (r.status === 0) {
    s.falhas = 0;
    estadoDepois.sessoes[sid] = s;
    gravar(estadoDepois);
    aprovar(atual, 'check');
    sair();
  }

  s.falhas += 1;
  s.relatadas = [...s.relatadas, atual].slice(-20);
  estadoDepois.sessoes[sid] = s;
  gravar(estadoDepois);
  registrar(`parada sessão=${sid} árvore=${atual.slice(0, 10)} check falhou (rodada ${s.falhas})`);

  const saida = `${r.stdout ?? ''}\n${r.stderr ?? ''}`.trim().split('\n');
  const fim = saida.slice(-60).join('\n').slice(-5000);
  const instrucao =
    s.falhas >= RODADAS
      ? `É a rodada ${s.falhas} seguida com falha nesta sessão: pare de tentar. Explique ao Gustavo, em linguagem simples, o que falha, o que você já tentou e o que precisa dele, e encerre sem mudar mais código.`
      : `Rodada ${s.falhas} de ${RODADAS}. Ache e conserte a causa. Não pule o teste, não afrouxe o que ele confere, não acrescente esperas nem novas tentativas, e não regrave gabarito (CLAUDE.md, "Verificação"). Se a falha depende de uma decisão do Gustavo (regravar um gabarito, mudar uma regra), diga isso e encerre: este mesmo estado não será conferido de novo.`;
  sair({ decision: 'block', reason: `O \`npm run check\` falhou no estado atual dos arquivos (gancho de parada, docs/verificacao/README.md). ${instrucao}\n\nFim da saída:\n${fim}` });
} catch (erro) {
  // um erro do próprio gancho não prende o Claude; fica no registro do aparelho
  try {
    registrar(`parada: erro do gancho: ${String(erro).slice(0, 300)}`);
  } catch {
    // sem disco: nada a fazer
  }
  sair();
}
