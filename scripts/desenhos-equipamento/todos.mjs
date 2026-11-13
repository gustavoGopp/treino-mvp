// Redesign, lote 5 (08/11/2026): os 49 desenhos de equipamento, só o aparelho, no estilo realista aprovado na 3ª
// rodada. Escreve um SVG autossuficiente por item em public/equipamento/<id>.svg (viewBox 0 0 160 120, fundo
// transparente, sem texto, sem fonte, sem referência externa) e as folhas de conferência para o Gustavo.
// Uso: node scripts/desenhos-equipamento/todos.mjs
//      (opcional: node .../todos.mjs <pasta-das-folhas> para gravar as folhas em outro lugar)
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { enquadrado, quantizar } from '../../src/engine/novo/realista/base.mjs';
import { TODOS } from './realista/itens.mjs';

// categorias e nomes curtos da tela do cadastro (src/features/onboarding/inventarioForm.ts: CATEGORIAS, NOME_CURTO)
const GRUPOS = [
  ['Halteres e anilhas', ['halteres_fixos', 'anilhas_e_manoplas', 'kettlebell', 'caneleiras']],
  ['Bancos', ['banco_regulavel', 'banco_reto', 'banco_scott', 'banco_romano']],
  [
    'Polias e acessórios',
    [
      'estacao_polia_dupla',
      'polia_simples',
      'acessorio_polia_corda',
      'acessorio_polia_triangulo',
      'acessorio_polia_barra_reta',
      'acessorio_polia_estribo',
      'acessorio_polia_tornozeleira',
      'estacao_puxada',
      'estacao_remada',
      'multifuncional',
    ],
  ],
  ['Barras', ['barra_fixa', 'barra_longa', 'barra_w', 'paralelas', 'barra_hexagonal']],
  [
    'Máquinas',
    [
      'rack_de_agachamento',
      'smith',
      'leg_press',
      'cadeira_extensora',
      'mesa_flexora',
      'cadeira_flexora',
      'supino_maquina',
      'voador',
      'desenvolvimento_maquina',
      'remada_articulada',
      'graviton',
      'rosca_maquina',
      'triceps_maquina',
      'abdominal_maquina',
      'hack',
      'cadeira_abdutora_adutora',
      'gluteo_maquina',
      'panturrilha_em_pe_maquina',
      'panturrilha_sentada_maquina',
    ],
  ],
  ['Outros acessórios', ['elasticos', 'step', 'bola_suica', 'suspensao', 'mini_band', 'roda_abdominal']],
  ['Só na foto', ['esteira']],
];
const NOME_CURTO = {
  estacao_polia_dupla: 'Polia dupla (crossover)',
  polia_simples: 'Polia simples',
  barra_fixa: 'Barra fixa',
  banco_regulavel: 'Banco regulável',
  banco_reto: 'Banco reto',
  halteres_fixos: 'Halteres fixos',
  anilhas_e_manoplas: 'Anilhas e manoplas',
  barra_longa: 'Barra longa',
  barra_w: 'Barra W',
  rack_de_agachamento: 'Rack de agachamento',
  smith: 'Smith',
  leg_press: 'Leg press',
  cadeira_extensora: 'Cadeira extensora',
  mesa_flexora: 'Mesa flexora',
  cadeira_flexora: 'Cadeira flexora',
  paralelas: 'Paralelas',
  acessorio_polia_corda: 'Corda',
  acessorio_polia_triangulo: 'Triângulo',
  acessorio_polia_barra_reta: 'Barra reta',
  acessorio_polia_estribo: 'Estribo',
  acessorio_polia_tornozeleira: 'Tornozeleira',
  elasticos: 'Elásticos',
  step: 'Step',
  bola_suica: 'Bola suíça',
  esteira: 'Esteira',
  barra_hexagonal: 'Barra hexagonal',
  kettlebell: 'Kettlebell',
  banco_scott: 'Banco Scott',
  banco_romano: 'Banco romano ou GHD',
  estacao_puxada: 'Puxador alto',
  estacao_remada: 'Remada baixa (estação)',
  multifuncional: 'Multifuncional',
  supino_maquina: 'Supino na máquina',
  voador: 'Voador',
  desenvolvimento_maquina: 'Desenvolvimento na máquina',
  remada_articulada: 'Remada articulada',
  graviton: 'Graviton',
  rosca_maquina: 'Máquina de rosca',
  triceps_maquina: 'Máquina de tríceps',
  abdominal_maquina: 'Máquina de abdominal',
  hack: 'Hack ou pendular',
  cadeira_abdutora_adutora: 'Abdutora e adutora',
  gluteo_maquina: 'Glúteo na máquina',
  panturrilha_em_pe_maquina: 'Panturrilha em pé',
  panturrilha_sentada_maquina: 'Panturrilha sentada',
  suspensao: 'Suspensão (TRX) ou argolas',
  caneleiras: 'Caneleiras de peso',
  mini_band: 'Mini-band',
  roda_abdominal: 'Roda abdominal',
};

// ---------- SVG por item ----------
quantizar(true);
const enxuga = (s) =>
  s
    .replace(/<text[\s\S]*?<\/text>/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .replace(/([\s,"(:-])0\.(\d)/g, '$1.$2');
const pasta = 'public/equipamento';
mkdirSync(pasta, { recursive: true });
const svgs = {};
let total = 0;
const tamanhos = [];
for (const [, ids] of GRUPOS)
  for (const id of ids) {
    const corpo = enquadrado(TODOS[id])(id);
    const svg = enxuga(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120">${corpo}</svg>`);
    writeFileSync(`${pasta}/${id}.svg`, svg);
    svgs[id] = svg;
    total += svg.length;
    tamanhos.push([id, svg.length]);
  }
const n = Object.keys(svgs).length;
console.log(`${n} SVG, ${(total / 1024).toFixed(1)} KB no total, média ${(total / n / 1024).toFixed(1)} KB`);
console.log(tamanhos.sort((a, b) => b[1] - a[1]).map(([id, t]) => `${id} ${(t / 1024).toFixed(1)} KB`).join('\n'));

// ---------- folhas de conferência ----------
const img = (id, cls) => `<img class="${cls}" alt="" src="data:image/svg+xml;base64,${Buffer.from(svgs[id]).toString('base64')}">`;
const celula = (id) => `<div class="c"><div class="g">${img(id, 'gi')}</div><div class="baixo"><div class="p">${img(id, 'pi')}</div><b>${NOME_CURTO[id]}</b></div></div>`;
const pagina = (grupos, parte, partes) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box}
body{font:15px/1.3 system-ui,sans-serif;margin:0;padding:16px;background:#FFFFFF;color:#1B1C1F;width:800px}
h1{font-size:24px;margin:0 0 4px}.intro{margin:0 0 10px;color:#464B51}
h2{font-size:19px;margin:14px 0 8px;color:#3F3AA8}
.grade{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.c{border:1.5px solid #D9D7D3;border-radius:14px;padding:8px;background:#fff}
.g{background:#F5F3EF;border-radius:10px;display:flex;justify-content:center}
.gi{width:220px;height:165px;display:block}
.baixo{display:flex;align-items:center;gap:10px;margin-top:8px}
.p{background:#F5F3EF;border-radius:8px;flex:none}
.pi{width:112px;height:84px;display:block}
.baixo b{font-size:15px;line-height:1.2}
</style>
<h1>Os 49 equipamentos, só o aparelho (${parte} de ${partes})</h1>
<p class="intro">Estilo realista aprovado na 3ª rodada. Em cada um: o desenho grande e, embaixo, no tamanho do cartão (112 × 84) com o nome curto do cadastro. Os arquivos são os SVG finais de public/equipamento/.</p>
${grupos.map(([t, ids]) => `<h2>${t}</h2><div class="grade">${ids.map(celula).join('')}</div>`).join('')}`;

const saida = process.argv[2] ?? 'docs/img';
const folhas = [GRUPOS.slice(0, 4), GRUPOS.slice(4)];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 800, height: 900 }, deviceScaleFactor: 2 });
for (const [i, g] of folhas.entries()) {
  await p.setContent(pagina(g, i + 1, folhas.length));
  await p.waitForLoadState('networkidle');
  const arq = `${saida}/redesign-lote-5-desenhos-49-${i + 1}.png`;
  await p.screenshot({ path: arq, fullPage: true });
  console.log(arq);
}
await b.close();
