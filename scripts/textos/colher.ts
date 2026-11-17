import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page, TestInfo } from '@playwright/test';
import type { Estado } from '../../src/storage/esquema';

// A colheita dos textos de uma tela (ou da folha aberta por cima dela). A conta de palavras é a régua de 13/11/2026,
// copiada sem mudar de scripts/design/frontend-novo/capturas.spec.ts; o resto (os blocos, os nomes acessíveis, as
// listas, o texto que vem do CSS e o que está escrito dentro dos desenhos) sai do mesmo DOM, com os mesmos critérios
// de visibilidade. Nada aqui inventa texto: tudo vem do app rodando.

export const FLUXOS = ['cadastro', 'inicio', 'treino', 'guia', 'fim-e-semana', 'dados-e-locais', 'termos-e-foto', 'avisos-e-erros'] as const;
export type Fluxo = (typeof FLUXOS)[number];
export type Tipo = 'tela' | 'folha' | 'bloco aberto' | 'estado vazio' | 'carregando' | 'erro' | 'aviso';

export type Bloco = {
  texto: string;
  palavras: number;
  tag: string;
  papel: string;
  classes: string;
  contexto: string;
  aVista: boolean;
  dentroDe: 'folha' | 'bloco aberto' | 'tela';
  /** o rótulo do bloco que abre (o `summary` do `<details open>`) onde este texto está; null fora de um bloco aberto */
  blocoAberto: string | null;
};
export type Nome = { nome: string; tag: string; papel: string; origem: string };

export type Medida = {
  palavrasAVista: number;
  palavrasNaTela: number;
  blocosLongos: { palavras: number; comeco: string }[];
  selos: number;
  porques: number;
  alturaDaPagina: number;
  alturaDaTela: number;
  blocos: Bloco[];
  nomesAcessiveis: Nome[];
  /** as opções de cada lista do aparelho (`<select>`): só aparecem quando a pessoa toca no campo */
  listas: { rotulo: string; opcoes: string[] }[];
  /** texto que o CSS escreve (::before e ::after) e que não está no DOM: fora da conta de palavras */
  textoDoCss: { texto: string; em: string; vezes: number }[];
  /** texto escrito dentro de um desenho (SVG): fora da conta de palavras, como na régua */
  textoEmDesenho: string[];
  /** texto que sai da tela ou é cortado por quem o contém (na horizontal), pela mesma conta de tests/e2e/criterios.ts */
  textoCortado: string[];
  tituloDoDocumento: string;
  temFolha: boolean;
};

export type Tela = Omit<Medida, 'temFolha'> & {
  id: string;
  fluxo: Fluxo;
  titulo: string;
  persona: string;
  comoChegar: string;
  tipo: Tipo;
  /** o caminho do navegador na hora da colheita */
  rota: string;
  captura: string;
  capturaInteira: string | null;
  /** textos que se alternam sozinhos na tela (a fase do movimento e a respiração do guia), vistos durante a colheita */
  textosQueAlternam?: string[];
};

/** Uma tela colhida, ainda sem número: `nome` é único dentro do fluxo. */
export type TelaDaParte = Omit<Tela, 'id' | 'captura' | 'capturaInteira'> & { nome: string; inteira: boolean };
export type Parte = { chave: string; ordem: number; projeto: string; telas: TelaDaParte[]; fotos: { fluxo: Fluxo; nome: string }[]; falhas: string[] };

export const RAIZ = resolve(process.cwd());
// fora do git e fora de test-results/, que o Playwright (deste roteiro ou dos testes do app) limpa a cada rodada
export const PASTA_DAS_PARTES = resolve(RAIZ, 'node_modules/.cache/inventario-textos/partes');
// A medida de antes dos cortes (16/11/2026) fica guardada em docs/revisoes/textos/inventario; cada medição nova vai para
// docs/revisoes/textos/depois, para não passar por cima dela. INVENTARIO=<pasta> escolhe outra saída.
export const SAIDA = resolve(RAIZ, process.env.INVENTARIO ?? 'docs/revisoes/textos/depois');

/** Roda dentro da página (page.evaluate): não pode usar nada de fora dela. */
export function colherNaPagina(): Medida {
  const h = window.innerHeight;
  // ---- a régua de 13/11/2026 (cópia de scripts/design/frontend-novo/capturas.spec.ts): não mudar ----
  let palavras = 0;
  const anda = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let no = anda.nextNode(); no; no = anda.nextNode()) {
    const pai = no.parentElement;
    const texto = no.textContent?.trim();
    if (!pai || !texto || pai.closest('svg, [inert], [hidden], script, style')) continue;
    const r = pai.getBoundingClientRect();
    const s = getComputedStyle(pai);
    if (r.width === 0 || r.height === 0 || r.bottom <= 0 || r.top >= h || s.visibility === 'hidden' || !pai.checkVisibility()) continue;
    palavras += texto.split(/\s+/).length;
  }
  // o texto da tela inteira: da folha aberta por cima, se houver; senão, da página
  const folhas = Array.from(document.querySelectorAll<HTMLElement>('.folha')).filter((f) => !f.closest('[inert]'));
  const raiz = folhas.at(-1) ?? document.body;
  const visivel = (el: Element) => {
    const r = el.getBoundingClientRect();
    // checkVisibility: o que está dentro de um bloco fechado (<details>) não conta, mesmo tendo caixa
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== 'hidden' && el.checkVisibility() && !el.closest('svg, [inert], [hidden], script, style');
  };
  const conta = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);
  let naTela = 0;
  const anda2 = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
  for (let no = anda2.nextNode(); no; no = anda2.nextNode()) if (no.parentElement && visivel(no.parentElement) && !no.parentElement.closest('.sr')) naTela += conta(no.textContent ?? '');
  const blocosLongos = Array.from(raiz.querySelectorAll<HTMLElement>('p, li, dd, .warnbox, .caixa-erro'))
    .filter((el) => visivel(el) && !el.closest('.sr') && !el.querySelector('p, li, dd'))
    .map((el) => ({ palavras: conta(el.innerText), comeco: el.innerText.trim().split(/\s+/).slice(0, 9).join(' ') }))
    .filter((b) => b.palavras >= 25);
  const quantos = (sel: string) => Array.from(raiz.querySelectorAll(sel)).filter(visivel).length;
  // ---- fim da régua ----

  const limpo = (t: string | null | undefined) => (t ?? '').replace(/\s+/g, ' ').trim();
  const tagDe = (el: Element) => el.tagName.toLowerCase();
  const classesDe = (el: Element) => (typeof el.className === 'string' ? el.className : (el.getAttribute('class') ?? ''));

  // ---- os blocos: o texto visível, agrupado pelo bloco mais próximo, na ordem do documento ----
  const SELETOR_DO_BLOCO = 'button, a, label, h1, h2, h3, h4, h5, h6, p, li, dt, dd, summary, legend, th, td, caption, figcaption, output, option, [role=tab], [role=alert], [role=status]';
  const grupos = new Map<Element, Text[]>();
  const anda3 = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
  for (let no = anda3.nextNode(); no; no = anda3.nextNode()) {
    const pai = no.parentElement;
    if (!pai || !visivel(pai) || pai.closest('.sr') || !conta(no.textContent ?? '')) continue;
    const perto = pai.closest(SELETOR_DO_BLOCO);
    const bloco = perto && raiz.contains(perto) && perto !== raiz ? perto : pai;
    const lista = grupos.get(bloco);
    if (lista) lista.push(no as Text);
    else grupos.set(bloco, [no as Text]);
  }
  const caixasDe = (no: Text) => {
    const faixa = document.createRange();
    faixa.selectNodeContents(no);
    return Array.from(faixa.getClientRects()).filter((c) => c.width > 0 && c.height > 0);
  };
  // junta os pedaços de texto de um bloco como eles aparecem: colados quando estão colados na tela ("4" e "+"),
  // com um espaço quando há um vão ou uma quebra de linha entre eles (o título e a 2ª linha de um botão)
  const juntar = (nos: Text[]) => {
    let s = '';
    let ultima: DOMRect | undefined;
    for (const no of nos) {
      const bruto = no.textContent ?? '';
      const caixas = caixasDe(no);
      const primeira = caixas[0];
      if (s && !/\s$/.test(s) && !/^\s/.test(bruto)) {
        const mesmaLinha = !!ultima && !!primeira && Math.min(ultima.bottom, primeira.bottom) - Math.max(ultima.top, primeira.top) > Math.min(ultima.height, primeira.height) / 2;
        if (!(mesmaLinha && Math.abs(primeira!.left - ultima!.right) < 1.5)) s += ' ';
      }
      s += bruto;
      if (caixas.length) ultima = caixas[caixas.length - 1];
    }
    return limpo(s);
  };
  const papelDe = (el: Element): string => {
    const explicito = el.getAttribute('role');
    if (explicito) return explicito;
    const t = tagDe(el);
    if (t === 'label') {
      const para = (el as HTMLLabelElement).htmlFor;
      const campo = el.querySelector('input, select, textarea') ?? (para ? document.getElementById(para) : null);
      if (campo instanceof HTMLInputElement) return campo.type === 'radio' || campo.type === 'checkbox' ? campo.type : `label (${campo.type})`;
      if (campo instanceof HTMLSelectElement) return 'label (combobox)';
      return 'label';
    }
    if (/^h[1-6]$/.test(t)) return 'heading';
    const implicito: Record<string, string> = {
      button: 'button',
      a: el.hasAttribute('href') ? 'link' : '',
      p: 'paragraph',
      li: 'listitem',
      dt: 'term',
      dd: 'definition',
      summary: 'summary',
      legend: 'legend',
      th: el.getAttribute('scope') === 'row' ? 'rowheader' : 'columnheader',
      td: 'cell',
      caption: 'caption',
      figcaption: 'figcaption',
      output: 'status',
      option: 'option',
    };
    return implicito[t] ?? '';
  };
  // o título mais próximo acima: h1 a h3, a legenda do grupo em que o bloco está, ou o nome da folha
  const semBotoes = (el: Element) => {
    const copia = el.cloneNode(true) as Element;
    copia.querySelectorAll('button').forEach((b) => b.remove());
    return limpo(copia.textContent);
  };
  const titulos = Array.from(raiz.querySelectorAll('h1, h2, h3, legend')).filter((t) => t.checkVisibility() && !t.closest('[inert], [hidden]'));
  const nomeDaFolha = raiz === document.body ? '' : limpo(document.getElementById(raiz.getAttribute('aria-labelledby') ?? '')?.textContent);
  const contextoDe = (bloco: Element): string => {
    for (let i = titulos.length - 1; i >= 0; i--) {
      const t = titulos[i]!;
      if (t === bloco || !(t.compareDocumentPosition(bloco) & Node.DOCUMENT_POSITION_FOLLOWING)) continue;
      if (tagDe(t) === 'legend' && !t.parentElement?.contains(bloco)) continue;
      return semBotoes(t);
    }
    return nomeDaFolha;
  };
  // na 1ª dobra: dentro da tela e sem estar cortado por uma área que rola (a lista comprida dentro de uma folha)
  const naPrimeiraDobra = (el: Element) => {
    const r = el.getBoundingClientRect();
    let [topo, base] = [Math.max(0, r.top), Math.min(h, r.bottom)];
    for (let a = el.parentElement; a && a !== document.documentElement; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (s.overflowY === 'visible' && s.overflowX === 'visible') continue;
      const c = a.getBoundingClientRect();
      [topo, base] = [Math.max(topo, c.top), Math.min(base, c.bottom)];
    }
    return base - topo > 1;
  };
  const blocos: Medida['blocos'] = [];
  for (const [bloco, nos] of grupos) {
    const aVista = nos.some((no) => naPrimeiraDobra(no.parentElement!));
    // o `summary` do próprio bloco fica de fora: ele aparece com o bloco fechado também
    const aberto = bloco.closest('details[open]');
    const dentro = aberto && !(tagDe(bloco) === 'summary' && bloco.parentElement === aberto) ? aberto : (aberto?.parentElement?.closest('details[open]') ?? null);
    blocos.push({
      texto: juntar(nos),
      palavras: nos.reduce((t, no) => t + conta(no.textContent ?? ''), 0),
      tag: tagDe(bloco),
      papel: papelDe(bloco),
      classes: classesDe(bloco),
      contexto: contextoDe(bloco),
      aVista,
      dentroDe: raiz !== document.body ? 'folha' : dentro ? 'bloco aberto' : 'tela',
      blocoAberto: dentro ? limpo(dentro.querySelector(':scope > summary')?.textContent) : null,
    });
  }

  // ---- os nomes acessíveis: o que o leitor de tela ouve e não está escrito ----
  const naArvore = (el: Element) => el.checkVisibility() && !el.closest('[aria-hidden="true"], [inert], [hidden]');
  const comCaixa = (el: Element) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const textoAcessivel = (el: Element, soVisivel: boolean) => {
    const copia = el.cloneNode(true) as Element;
    copia.querySelectorAll('[aria-hidden="true"], script, style').forEach((x) => x.remove());
    if (soVisivel) copia.querySelectorAll('.sr').forEach((x) => x.remove());
    // imagens e desenhos com nome contam como texto do nome
    copia.querySelectorAll('img[alt], svg[aria-label], [role=img][aria-label]').forEach((x) => x.replaceWith(document.createTextNode(` ${x.getAttribute('alt') ?? x.getAttribute('aria-label') ?? ''} `)));
    if (soVisivel) copia.querySelectorAll('svg').forEach((x) => x.remove());
    return limpo(copia.textContent);
  };
  const nomeDe = (el: Element): { nome: string; origem: string } => {
    const rotulo = limpo(el.getAttribute('aria-label'));
    if (rotulo) return { nome: rotulo, origem: 'aria-label' };
    const por = el.getAttribute('aria-labelledby');
    if (por) {
      const t = limpo(por.split(/\s+/).map((id) => document.getElementById(id)?.textContent ?? '').join(' '));
      if (t) return { nome: t, origem: 'aria-labelledby' };
    }
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
      const rotulos = Array.from(el.labels ?? []);
      const t = limpo(rotulos.map((l) => textoAcessivel(l, false)).join(' '));
      if (t) {
        const escrito = limpo(rotulos.map((l) => (l.closest('.sr') ? '' : textoAcessivel(l, true))).join(' '));
        return { nome: t, origem: !escrito ? 'texto oculto (.sr)' : escrito !== t ? 'label + texto oculto (.sr)' : 'label' };
      }
      const dica = limpo(el.getAttribute('title')) || limpo(el.getAttribute('placeholder'));
      return dica ? { nome: dica, origem: el.getAttribute('title') ? 'title' : 'placeholder' } : { nome: '', origem: 'SEM NOME' };
    }
    if (el instanceof HTMLImageElement) {
      if (el.hasAttribute('alt')) return { nome: limpo(el.alt), origem: limpo(el.alt) ? 'alt' : 'decorativa' };
      const dica = limpo(el.getAttribute('title'));
      return dica ? { nome: dica, origem: 'title' } : { nome: '', origem: 'SEM NOME' };
    }
    const tudo = textoAcessivel(el, false);
    if (tudo) {
      const escrito = textoAcessivel(el, true);
      return { nome: tudo, origem: !escrito ? 'texto oculto (.sr)' : escrito !== tudo ? 'texto + texto oculto (.sr)' : 'texto' };
    }
    const dica = limpo(el.getAttribute('title'));
    return dica ? { nome: dica, origem: 'title' } : { nome: '', origem: 'SEM NOME' };
  };
  const nomesAcessiveis: Medida['nomesAcessiveis'] = [];
  const vistos = new Set<Element>();
  const COM_FUNCAO = 'button, a[href], input:not([type=hidden]), select, textarea, summary, img, [role=button], [role=tab], [role=link], [role=radio], [role=checkbox], [role=img], [role=timer]';
  const ehCampo = (el: Element) => el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement;
  for (const el of Array.from(raiz.querySelectorAll(COM_FUNCAO))) {
    // dentro de um desenho, só o próprio desenho conta; o campo escondido por cima do rótulo conta mesmo sem caixa
    if (!naArvore(el) || (el.closest('svg') && tagDe(el) !== 'svg') || !(ehCampo(el) || comCaixa(el))) continue;
    const { nome, origem } = nomeDe(el);
    vistos.add(el);
    if (origem === 'texto' || origem === 'label' || origem === 'decorativa') continue;
    nomesAcessiveis.push({ nome, tag: tagDe(el), papel: papelDe(el) || (ehCampo(el) ? (el as HTMLInputElement).type : ''), origem });
  }
  // regiões, grupos e listas com nome só para o leitor de tela (aria-label)
  for (const el of Array.from(raiz.querySelectorAll('[aria-label]'))) {
    if (vistos.has(el) || !naArvore(el) || (el.closest('svg') && tagDe(el) !== 'svg') || !comCaixa(el)) continue;
    vistos.add(el);
    nomesAcessiveis.push({ nome: limpo(el.getAttribute('aria-label')), tag: tagDe(el), papel: papelDe(el), origem: 'aria-label' });
  }
  // texto só para o leitor de tela (.sr) que não entrou no nome de um controle acima
  for (const el of Array.from(raiz.querySelectorAll('.sr'))) {
    const t = limpo(el.textContent);
    if (!t || vistos.has(el) || !naArvore(el) || el.parentElement?.closest('.sr')) continue;
    const dono = el.closest(COM_FUNCAO);
    if (dono && vistos.has(dono)) continue;
    const perto = el.closest(SELETOR_DO_BLOCO) ?? el;
    nomesAcessiveis.push({ nome: perto === el ? t : `${t} (em: ${textoAcessivel(perto, false)})`, tag: tagDe(el), papel: papelDe(el) || papelDe(perto), origem: 'texto oculto (.sr)' });
  }
  // a dica que só aparece com o ponteiro parado (title): no celular, ninguém vê
  for (const el of Array.from(raiz.querySelectorAll('[title]'))) {
    const t = limpo(el.getAttribute('title'));
    if (!t || !naArvore(el) || el.closest('svg') || !comCaixa(el)) continue;
    if (nomesAcessiveis.some((n) => n.nome === t && n.origem === 'title' && n.tag === tagDe(el))) continue;
    nomesAcessiveis.push({ nome: t, tag: tagDe(el), papel: papelDe(el), origem: 'title' });
  }

  // ---- as listas do aparelho, o texto que o CSS escreve e o texto dentro dos desenhos ----
  const listas = Array.from(raiz.querySelectorAll('select'))
    .filter(naArvore)
    .map((s) => ({ rotulo: nomeDe(s).nome, opcoes: Array.from(s.options).map((o) => limpo(o.textContent)) }));
  const doCss = new Map<string, { texto: string; em: string; vezes: number }>();
  for (const el of Array.from(raiz.querySelectorAll('*'))) {
    if (el.closest('svg') || !comCaixa(el) || !el.checkVisibility() || el.closest('[inert], [hidden]')) continue;
    for (const pseudo of ['::before', '::after']) {
      const c = getComputedStyle(el, pseudo).content;
      if (!c || c === 'none' || c === 'normal' || !c.startsWith('"')) continue;
      const texto = c.slice(1, -1).trim();
      if (!texto) continue;
      const em = `${tagDe(el)}${classesDe(el) ? `.${classesDe(el).trim().split(/\s+/).join('.')}` : ''}${pseudo}`;
      const chave = `${texto}|${em}`;
      const ja = doCss.get(chave);
      if (ja) ja.vezes++;
      else doCss.set(chave, { texto, em, vezes: 1 });
    }
  }
  // um rótulo de 2 linhas dentro do desenho são 2 pedaços (tspan) sem espaço entre eles: aqui, com espaço
  const rotuloDoDesenho = (t: Element) => {
    const linhas = Array.from(t.querySelectorAll('tspan'));
    return limpo(linhas.length ? linhas.map((x) => x.textContent ?? '').join(' ') : t.textContent);
  };
  const textoEmDesenho = [...new Set(Array.from(raiz.querySelectorAll('svg text')).filter((t) => t.checkVisibility() && !t.closest('[inert], [hidden]')).map(rotuloDoDesenho).filter(Boolean))];

  // ---- texto cortado: sai da tela, ou de um ancestral que esconde o que passa da borda (como tests/e2e/criterios.ts) ----
  const textoCortado: string[] = [];
  for (const e of Array.from(raiz.querySelectorAll<HTMLElement>('*'))) {
    if (e.closest('svg, .stage, .miniatura, [inert], .sr') || !e.checkVisibility({ contentVisibilityAuto: true, visibilityProperty: true })) continue;
    if (!Array.from(e.childNodes).some((n) => n.nodeType === 3 && n.textContent!.trim())) continue;
    const r = e.getBoundingClientRect();
    const s = getComputedStyle(e);
    if (!r.width || !r.height || s.visibility === 'hidden') continue;
    let limite = { left: 0, right: innerWidth };
    let rolavel = false;
    for (let x = e.parentElement; x; x = x.parentElement) {
      const sx = getComputedStyle(x);
      if (sx.overflowX === 'auto' || sx.overflowX === 'scroll') {
        rolavel = true;
        break;
      }
      if (sx.overflowX !== 'visible') {
        const q = x.getBoundingClientRect();
        limite = { left: Math.max(limite.left, q.left), right: Math.min(limite.right, q.right) };
      }
    }
    if (rolavel) continue;
    const proprio = s.overflowX !== 'visible' && e.scrollWidth > e.clientWidth + 1;
    if (proprio || r.right > limite.right + 1 || r.left < limite.left - 1) textoCortado.push(`${tagDe(e)}${classesDe(e) ? `.${classesDe(e).trim().split(/\s+/)[0]}` : ''}: ${limpo(e.innerText).slice(0, 80)}`);
  }


  return {
    palavrasAVista: palavras,
    palavrasNaTela: naTela,
    blocosLongos,
    selos: quantos('.selo'),
    porques: quantos('.porque'),
    alturaDaPagina: document.documentElement.scrollHeight,
    alturaDaTela: h,
    blocos,
    nomesAcessiveis,
    listas,
    textoDoCss: [...doCss.values()],
    textoEmDesenho,
    textoCortado: [...new Set(textoCortado)],
    tituloDoDocumento: document.title,
    temFolha: raiz !== document.body,
  };
}

export type OpcoesDaFoto = {
  titulo: string;
  comoChegar: string;
  tipo?: Tipo;
  fluxo?: Fluxo;
  persona?: string;
  /** os textos que se alternam sozinhos (o guia tocando), vistos por alguns segundos */
  alternam?: string;
};

/** O roteiro de um teste: fotografa, colhe e guarda a parte dele em PASTA_DAS_PARTES/<projeto>/<chave>/. */
export class Roteiro {
  readonly telas: TelaDaParte[] = [];
  readonly fotos: { fluxo: Fluxo; nome: string }[] = [];
  readonly falhas: string[] = [];
  readonly pasta: string;
  readonly colhe: boolean;
  persona: string;

  constructor(
    readonly page: Page,
    readonly info: TestInfo,
    readonly chave: string,
    readonly ordem: number,
    readonly fluxo: Fluxo,
    persona: string,
  ) {
    this.persona = persona;
    this.colhe = info.project.name === 'claro';
    this.pasta = resolve(PASTA_DAS_PARTES, info.project.name, chave);
    rmSync(this.pasta, { recursive: true, force: true });
    mkdirSync(this.pasta, { recursive: true });
  }

  /** Fotografa a 1ª dobra e, no projeto claro, colhe o texto da tela (ou da folha aberta por cima). */
  async foto(nome: string, o: OpcoesDaFoto) {
    const { page } = this;
    const fluxo = o.fluxo ?? this.fluxo;
    if (this.fotos.some((f) => f.fluxo === fluxo && f.nome === nome)) {
      this.falhas.push(`${fluxo}/${nome}: nome repetido no mesmo teste; a 2ª colheita foi ignorada`);
      return;
    }
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);
    // as miniaturas do Boneco chegam do Worker depois da tela: espera até 8 s
    await page
      .waitForFunction(() => Array.from(document.querySelectorAll('.miniatura:not(.vazia)')).every((e) => e.querySelector('svg')), undefined, { timeout: 8000 })
      .catch(() => undefined);
    const arquivo = `${fluxo}--${nome}`;
    await page.screenshot({ path: resolve(this.pasta, `${arquivo}.png`), animations: 'disabled' });
    this.fotos.push({ fluxo, nome });
    if (!this.colhe) return;
    const m = await page.evaluate(colherNaPagina);
    const { temFolha, ...medida } = m;
    const inteira = !temFolha && m.alturaDaPagina > m.alturaDaTela;
    if (inteira) await page.screenshot({ path: resolve(this.pasta, `${arquivo}-inteira.png`), fullPage: true, animations: 'disabled' });
    const soma = m.blocos.reduce((t, b) => t + b.palavras, 0);
    if (soma !== m.palavrasNaTela) this.falhas.push(`${fluxo}/${nome}: a soma dos blocos (${soma}) não bate com palavrasNaTela (${m.palavrasNaTela})`);
    if (!m.blocos.length) this.falhas.push(`${fluxo}/${nome}: nenhum texto visível`);
    let textosQueAlternam: string[] | undefined;
    if (o.alternam) {
      const vistos = new Set<string>();
      for (let i = 0; i < 45; i++) {
        for (const t of await page.locator(o.alternam).allInnerTexts()) if (t.trim()) vistos.add(t.replace(/\s+/g, ' ').trim());
        await page.waitForTimeout(200);
      }
      textosQueAlternam = [...vistos];
    }
    this.telas.push({
      nome,
      fluxo,
      titulo: o.titulo,
      persona: o.persona ?? this.persona,
      comoChegar: o.comoChegar,
      tipo: o.tipo ?? (temFolha ? 'folha' : 'tela'),
      rota: new URL(page.url()).pathname + new URL(page.url()).search,
      ...medida,
      inteira,
      ...(textosQueAlternam ? { textosQueAlternam } : {}),
    });
  }

  /** Um passo que pode falhar sem derrubar os seguintes; a falha fica anotada. */
  async passo(nome: string, f: () => Promise<void>) {
    try {
      await f();
    } catch (e) {
      this.falhas.push(`${nome}: ${String(e).split('\n')[0]}`);
      // uma folha que ficou aberta no passo que falhou não atrapalha o seguinte
      for (let i = 0; i < 3 && (await this.page.locator('.folha').count().catch(() => 0)); i++) await this.fecharFolha().catch(() => undefined);
    }
  }

  async fecharFolha() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(250);
  }

  /** Abre uma folha por um toque, fotografa e fecha. */
  async folha(nome: string, abrir: () => Promise<unknown>, o: OpcoesDaFoto) {
    await this.passo(nome, async () => {
      await abrir();
      await this.page.locator('.folha').last().evaluate((e) => Promise.all(e.getAnimations().map((a) => a.finished)));
      await this.foto(nome, { tipo: 'folha', ...o });
      await this.fecharFolha();
    });
  }

  /** Guarda a parte deste teste e passa as imagens para 256 cores (ImageMagick), como o roteiro de 13/11. */
  gravar() {
    const parte: Parte = { chave: this.chave, ordem: this.ordem, projeto: this.info.project.name, telas: this.telas, fotos: this.fotos, falhas: this.falhas };
    writeFileSync(resolve(this.pasta, 'parte.json'), JSON.stringify(parte, null, 1) + '\n');
    try {
      for (const f of readdirSync(this.pasta).filter((x) => x.endsWith('.png'))) execFileSync('convert', [resolve(this.pasta, f), '-strip', '-dither', 'None', '-colors', '256', `png8:${resolve(this.pasta, f)}`]);
    } catch {
      console.log(`[${this.info.project.name}/${this.chave}] sem o ImageMagick: as capturas ficaram sem compressão`);
    }
    if (this.falhas.length) console.log(`[${this.info.project.name}/${this.chave}] passos com falha:\n  ${this.falhas.join('\n  ')}`);
  }
}

// ---- os estados das personas fictícias, gravados direto no aparelho (como tests/e2e/registro.spec.ts) ----

type Apoio = { estados: Record<string, Estado>; cargas: Record<string, string> };
let APOIO: Apoio | undefined;
const apoio = (): Apoio => (APOIO ??= JSON.parse(execFileSync('npx', ['vite-node', 'scripts/textos/estados.ts'], { encoding: 'utf8', cwd: RAIZ, maxBuffer: 64 * 1024 * 1024 })) as Apoio);
/** O estado pronto de cada persona fictícia (scripts/textos/estados.ts, rodado pelo vite-node). */
export function estadoDaPersona(nome: string): Estado {
  const e = apoio().estados[nome];
  if (!e) throw new Error(`sem estado para a persona ${nome}`);
  return structuredClone(e);
}

/** Grava um valor no IndexedDB do app (a chave `estado`, ou outra) e abre a rota pedida. */
export async function semear(page: Page, estado: unknown, rota = '/programa') {
  await page.goto('/termos');
  await page.evaluate(async (e) => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onupgradeneeded = () => r.result.createObjectStore('keyval');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    await new Promise<void>((ok) => {
      const r = db.transaction('keyval', 'readwrite').objectStore('keyval').put(e, 'estado');
      r.onsuccess = () => ok();
    });
  }, estado);
  await page.goto(rota);
}

/** Lê o estado guardado no aparelho. */
export async function estadoGuardado(page: Page): Promise<Estado> {
  return page.evaluate(async () => {
    const db = await new Promise<IDBDatabase>((ok, erro) => {
      const r = indexedDB.open('keyval-store');
      r.onsuccess = () => ok(r.result);
      r.onerror = () => erro(r.error);
    });
    return new Promise<Estado>((ok) => {
      const r = db.transaction('keyval').objectStore('keyval').get('estado');
      r.onsuccess = () => ok(r.result as Estado);
    });
  });
}

export type SessaoSemeada = {
  /** índice do dia no programa salvo */
  dia: number;
  /** início do treino (ISO) */
  quando: string;
  minutos?: number;
  hojeFoi?: 'leve' | 'normal' | 'pesado';
  /** as séries de um exercício, em kg × repetições (no lugar das prescritas) */
  series?: Record<string, [number, number][]>;
  /** nota de dor na 1ª série de um exercício */
  dor?: Record<string, number>;
};

/** Uma carga típica para o tipo de carga do exercício (como `serieTipica` em tests/unit/apoio-treino.ts). */
function cargaTipica(exId: string) {
  const c = apoio().cargas[exId];
  if (c === 'polia' || c === 'maquina') return { tipo: 'placa' as const, placa: 8 };
  if (c === 'anilha') return { tipo: 'anilha' as const, kgPorLado: 20 };
  if (c === 'assistida') return { tipo: 'contrapeso' as const, placa: 3 };
  if (c === 'peso-corpo' || c === 'elastico') return { tipo: 'degrau' as const, degrau: 0 };
  return { tipo: 'kg' as const, kg: c === 'barra' ? 40 : 10 };
}

/**
 * Um histórico fictício a partir do programa de um estado: cada sessão faz o dia `dia`, com as séries prescritas de
 * cada exercício (10 kg × 10, RIR 2; no peso do corpo e no elástico, o 1º degrau; na máquina, a placa 8), como em
 * tests/e2e/acompanhamento.spec.ts. Devolve o estado com o histórico.
 */
export function comHistorico(estado: Estado, sessoes: SessaoSemeada[], localId = 'local-1'): Estado {
  const dias = estado.programa!.programa.dias;
  const historico = sessoes.map((s) => {
    const d = dias[s.dia]!;
    const fim = new Date(Date.parse(s.quando) + (s.minutos ?? 50) * 60_000).toISOString();
    return {
      id: s.quando,
      diaId: d.id,
      semana: 1,
      inicio: s.quando,
      fim,
      localId,
      ...(s.hojeFoi ? { hojeFoi: s.hojeFoi } : {}),
      exercicios: d.exercicios.map((x) => {
        const series = s.series?.[x.exId]
          ? s.series[x.exId]!.map(([kg, reps]) => ({ carga: { tipo: 'kg' as const, kg }, reps, rir: 2 }))
          : Array.from({ length: x.series }, () => ({ carga: cargaTipica(x.exId), reps: 10, rir: 2 }));
        const nota = s.dor?.[x.exId];
        return { exId: x.exId, series: nota === undefined ? series : series.map((y, i) => (i === 0 ? { ...y, dor: nota } : y)) };
      }),
    };
  });
  return { ...estado, historico: historico as Estado['historico'] };
}
