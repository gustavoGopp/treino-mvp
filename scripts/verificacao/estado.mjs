// O estado da verificação neste aparelho: que árvores de arquivos já passaram por qual conferência, e o que cada sessão
// do Claude Code fez. Fica em .verificacao/ (fora do git): numa sessão na nuvem ele some com o contêiner, e tudo bem,
// porque o que importa fica nos commits e na verificação do GitHub.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { quePedemVerificacao } from './regras.mjs';

const PASTA = '.verificacao';
const ARQUIVO = join(PASTA, 'estado.json');

const git = (args, opcoes = {}) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], ...opcoes }).trim();

/**
 * O "retrato" da árvore de trabalho como está agora (com o que ainda não foi para commit e os arquivos novos, menos o
 * que o .gitignore exclui): o hash da árvore que um `git add -A` geraria, num índice temporário, sem tocar no real.
 */
export function arvoreAtual() {
  mkdirSync(PASTA, { recursive: true });
  const indice = join(PASTA, `indice-${process.pid}`);
  const real = git(['rev-parse', '--git-path', 'index']);
  try {
    if (existsSync(real)) copyFileSync(real, indice);
    const env = { ...process.env, GIT_INDEX_FILE: indice };
    git(['add', '-A'], { env });
    return git(['write-tree'], { env });
  } finally {
    rmSync(indice, { force: true });
  }
}

/** A árvore de um commit (ex.: HEAD). */
export function arvoreDe(commit) {
  return git(['rev-parse', `${commit}^{tree}`]);
}

/** Os caminhos que diferem entre duas árvores ou commits. */
export function diferencas(a, b) {
  if (a === b) return [];
  return git(['diff', '--name-only', '--no-renames', a, b]).split('\n').filter(Boolean);
}

/** Verdadeiro se, entre as duas árvores, só mudou texto livre (regras.mjs, ehLivre). */
export function soTextoLivre(a, b) {
  return quePedemVerificacao(diferencas(a, b)).length === 0;
}

export function tentarGit(args) {
  try {
    return git(args);
  } catch {
    return null;
  }
}

export function ler() {
  try {
    return JSON.parse(readFileSync(ARQUIVO, 'utf8'));
  } catch {
    return { aprovadas: {}, sessoes: {} };
  }
}

export function gravar(estado) {
  mkdirSync(PASTA, { recursive: true });
  // guarda só as 40 árvores aprovadas mais recentes e as 20 sessões mais recentes
  const recentes = (obj, n) => Object.fromEntries(Object.entries(obj).sort((x, y) => String(y[1].quando).localeCompare(String(x[1].quando))).slice(0, n));
  writeFileSync(ARQUIVO, JSON.stringify({ aprovadas: recentes(estado.aprovadas, 40), sessoes: recentes(estado.sessoes, 20) }, null, 2));
}

/** Marca uma árvore como aprovada num nível: "check" (o barato) ou "verificar" (o mesmo que o GitHub roda). */
export function aprovar(arvore, nivel) {
  const estado = ler();
  const antes = estado.aprovadas[arvore];
  if (antes?.nivel === 'verificar' && nivel === 'check') return;
  estado.aprovadas[arvore] = { nivel, quando: new Date().toISOString() };
  gravar(estado);
}

/**
 * A árvore aprovada (no nível pedido ou acima) que cobre a árvore dada: ela mesma, ou uma da qual a dada só difere em
 * texto livre. Devolve null se nenhuma cobre.
 */
export function aprovadaQueCobre(arvore, nivelMinimo) {
  const { aprovadas } = ler();
  const servem = Object.entries(aprovadas).filter(([, a]) => nivelMinimo === 'check' || a.nivel === 'verificar');
  if (servem.some(([h]) => h === arvore)) return arvore;
  for (const [h] of servem) {
    try {
      if (soTextoLivre(h, arvore)) return h;
    } catch {
      // árvore antiga que o git já não tem: ignora
    }
  }
  return null;
}

/** Uma linha no registro do aparelho (.verificacao/registro.log), para conferir depois o que o portão teria barrado. */
export function registrar(linha) {
  mkdirSync(PASTA, { recursive: true });
  appendFileSync(join(PASTA, 'registro.log'), `${new Date().toISOString()} ${linha}\n`);
}

/** Lê a entrada JSON que o Claude Code manda ao gancho. */
export function lerEntrada() {
  try {
    return JSON.parse(readFileSync(0, 'utf8') || '{}');
  } catch {
    return {};
  }
}
