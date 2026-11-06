import { expect, type Page } from '@playwright/test';
import type { Inventario, ItemId } from '../../../../src/domain/taxonomia/equipamentos';
import { ITEM_IDS } from '../../../../src/domain/taxonomia/equipamentos';
import { ITENS_DE_ANILHA, SO_NA_FOTO } from '../../../../src/domain/taxonomia/atalhos';
import { NOME_ALTURA, NOME_CURTO, NOME_ESTACAO, VALORES } from '../../../../src/features/onboarding/inventarioForm';
import { ana, bruno, brunoAcademiaDoBairro, carla, diego, elisa, fabio, type Persona } from '../../../../tests/personas/index';
import { grupo, type Percurso } from './instrumentos';

// Os percursos do cadastro, persona a persona, pela interface, como tests/e2e/jornada.ts faz com a Ana. Cada tela é
// marcada no Percurso (toques, caracteres, rolagem e tempo ficam por tela). Só personas fictícias (tests/personas).

const kg = (n: number) => `${n.toLocaleString('pt-BR')} kg`;

/** Marca um valor por toque (chip) ou, fora da lista, em "Outro" + digitação. */
async function chip(c: Percurso, legenda: string, valores: readonly number[], v: number) {
  const g = grupo(c.page, legenda);
  if (valores.includes(v)) await g.getByLabel(kg(v), { exact: true }).check();
  else {
    await g.getByLabel('Outro', { exact: true }).check();
    await c.digitar(c.page.getByLabel(`${legenda}: outro valor`), String(v).replace('.', ','));
  }
}

/** Marca um inventário item a item na tela de equipamento (o que já estiver marcado não recebe toque). */
export async function marcarInventario(c: Percurso, inv: Inventario) {
  const { page } = c;
  for (const id of ITEM_IDS) {
    if (!(id in inv) || SO_NA_FOTO.includes(id)) continue; // a esteira só entra pela foto
    await page.getByLabel(NOME_CURTO[id], { exact: true }).first().check();
    const a = inv[id] as Record<string, unknown>;
    switch (id) {
      case 'halteres_fixos':
        await chip(c, 'O mais leve', VALORES.halterMin, a.minKg as number);
        await chip(c, 'O mais pesado', VALORES.halterMax, a.maxKg as number);
        await chip(c, 'De quanto em quanto', VALORES.halterPasso, a.passoKg as number);
        break;
      case 'anilhas_e_manoplas': {
        await grupo(page, 'Quantas manoplas?').getByLabel(String(a.manoplas), { exact: true }).check();
        await chip(c, 'Peso de cada manopla', VALORES.manoplaKg, a.manoplaKg as number);
        for (const an of a.anilhas as { kg: number; qtd: number }[]) {
          let vezes = Math.ceil(an.qtd / 2);
          if (!(VALORES.anilhaKg as readonly number[]).includes(an.kg)) {
            await c.digitar(page.getByLabel('Outro peso de anilha'), String(an.kg).replace('.', ','));
            await page.getByRole('button', { name: 'Adicionar' }).click();
            vezes -= 1;
          }
          for (let i = 0; i < vezes; i++) await page.getByRole('button', { name: `Mais anilhas de ${kg(an.kg)}` }).click();
        }
        break;
      }
      case 'banco_regulavel':
        await grupo(page, /O banco também declina/).getByLabel(a.declina ? 'Sim' : 'Não', { exact: true }).check();
        break;
      case 'elasticos':
        await grupo(page, 'Quantos elásticos de forças diferentes?').getByLabel(String(a.intensidades), { exact: true }).check();
        break;
      case 'mini_band':
        await grupo(page, 'Quantas mini-bands de forças diferentes?').getByLabel(String(a.intensidades), { exact: true }).check();
        break;
      case 'polia_simples':
        if (a.altura) await grupo(page, 'Onde fica a polia?').getByLabel(NOME_ALTURA[a.altura as keyof typeof NOME_ALTURA], { exact: true }).check();
        break;
      case 'multifuncional':
        for (const [e, nome] of Object.entries(NOME_ESTACAO)) if (a[e] === true) await grupo(page, 'Quais estações o seu tem?').getByLabel(nome, { exact: true }).check();
        break;
      case 'kettlebell':
        for (const p of a.pesosKg as number[]) await grupo(page, 'Quais pesos você tem?').getByLabel(kg(p), { exact: true }).check();
        break;
      case 'caneleiras':
        for (const p of a.pesosKg as number[]) await grupo(page, /Quais pesos você tem \(de cada caneleira\)/).getByLabel(kg(p), { exact: true }).check();
        break;
      case 'voador':
        if (a.invertido !== undefined) await grupo(page, /O voador também vira/).getByLabel(a.invertido ? 'Sim' : 'Não', { exact: true }).check();
        break;
      case 'triceps_maquina':
        if (a.acimaDaCabeca !== undefined) await grupo(page, /O braço fica acima/).getByLabel(a.acimaDaCabeca ? 'Sim' : 'Não', { exact: true }).check();
        break;
    }
  }
  // A menor anilha (pergunta única dos itens de anilha), só se a persona a informou.
  const menor = ITENS_DE_ANILHA.map((id) => (inv as Record<string, { menorAnilhaKg?: number } | undefined>)[id]?.menorAnilhaKg).find((k) => k !== undefined);
  if (menor !== undefined) await chip(c, 'Qual a menor anilha?', VALORES.menorAnilhaKg, menor);
}

export type Nivel = { tempo: string; pausa: RegExp; tecnica: RegExp };
export type Rotina = { dias: number; minutos: number; prioridades: string[]; objetivo?: string };
export type Definicao = {
  persona: Persona;
  nivel: Nivel;
  rotina: Rotina;
  /** O que fazer na tela de equipamento; por padrão, marca o inventário da persona item a item. */
  equipamento?: (c: Percurso) => Promise<void>;
  /** Equipamentos a evitar no "Tudo certo?" (abre a dobra "Algo a evitar?"). */
  evitarEquipamentos?: string[];
  /** Triagem com alguma condição (por padrão, "Nenhuma vale para mim"). */
  triagem?: (c: Percurso) => Promise<void>;
};

const INICIANTE_TREINANDO: Nivel = { tempo: 'Menos de 6 meses', pausa: /^Estou treinando/, tecnica: /^Sim/ };
const INTERMEDIARIO: Nivel = { tempo: 'De 6 meses a 2 anos', pausa: /^Estou treinando/, tecnica: /^Sim/ };

const cap = (s: string) => s[0]!.toUpperCase() + s.slice(1);
const NOME_PRIORIDADE: Record<string, string> = { peito: 'Peito', costas: 'Costas', ombros: 'Ombros', bracos: 'Braços', pernas: 'Pernas', gluteos: 'Glúteos', abdomen: 'Abdômen' };

export const DEFINICOES: Record<string, Definicao> = {
  ana: { persona: ana, nivel: INICIANTE_TREINANDO, rotina: { dias: 3, minutos: 45, prioridades: ['gluteos', 'pernas'] } },
  bruno: {
    persona: bruno,
    nivel: { tempo: 'De 6 meses a 2 anos', pausa: /^Parei há 3 semanas a 6 meses/, tecnica: /^Sim/ },
    rotina: { dias: 4, minutos: 70, prioridades: ['peito', 'costas', 'ombros', 'bracos'] },
    evitarEquipamentos: ['Barra longa'],
  },
  carla: {
    persona: carla,
    nivel: { tempo: 'Mais de 2 anos', pausa: /^Estou treinando/, tecnica: /^Sim/ },
    rotina: { dias: 5, minutos: 75, prioridades: ['peito', 'costas', 'ombros', 'pernas'] },
    // Como uma pessoa faria: o atalho "Academia completa" e, depois, só o que falta para bater com o inventário da persona.
    equipamento: async (c) => {
      await c.page.getByRole('button', { name: /^(✓ )?Academia completa$/ }).click();
      await marcarInventario(c, carla.inventario);
    },
  },
  diego: { persona: diego, nivel: INICIANTE_TREINANDO, rotina: { dias: 3, minutos: 45, prioridades: ['peito', 'costas'] } },
  elisa: {
    persona: elisa,
    nivel: INICIANTE_TREINANDO,
    rotina: { dias: 3, minutos: 30, prioridades: [] },
    equipamento: async (c) => {
      await c.page.getByRole('button', { name: /^(✓ )?Corpo livre$/ }).click();
    },
  },
  fabio: { persona: fabio, nivel: INTERMEDIARIO, rotina: { dias: 4, minutos: 45, prioridades: ['costas'] } },
};

/** Triagem com "sim" só no osteoarticular (ombro, dor 4 hoje): não bloqueia, mas pede região e nota. */
export async function triagemOmbro(c: Percurso) {
  const { page } = c;
  await page.getByRole('button', { name: 'Sim, alguma vale' }).click();
  await c.tela('triagem-uma-a-uma');
  const grupos = page.locator('fieldset').filter({ has: page.getByRole('radio', { name: 'Sim' }) });
  const n = await grupos.count();
  for (let i = 0; i < n; i++) {
    const g = grupos.nth(i);
    const texto = (await g.locator('legend').innerText()).trim();
    await g.getByRole('radio', { name: texto.includes('osso, articulação') ? 'Sim' : 'Não', exact: true }).check();
    if (texto.includes('osso, articulação')) {
      await page.getByRole('group', { name: 'Quais regiões?' }).getByLabel('Ombro').check();
      await page.getByRole('group', { name: /E hoje, dói no ombro/ }).getByLabel('4', { exact: true }).check();
    }
  }
  await page.getByRole('button', { name: 'Continuar' }).click();
}

/** Triagem com "sim" no coração: bloqueia; a pessoa confirma a liberação e segue. */
export async function triagemBloqueio(c: Percurso) {
  const { page } = c;
  await page.getByRole('button', { name: 'Sim, alguma vale' }).click();
  await c.tela('triagem-uma-a-uma');
  const grupos = page.locator('fieldset').filter({ has: page.getByRole('radio', { name: 'Sim' }) });
  const n = await grupos.count();
  for (let i = 0; i < n; i++) {
    const g = grupos.nth(i);
    const texto = (await g.locator('legend').innerText()).trim();
    await g.getByRole('radio', { name: texto.includes('coração') ? 'Sim' : 'Não', exact: true }).check();
  }
  await page.getByRole('button', { name: 'Continuar' }).click();
  await expect(page.getByRole('heading', { name: 'Vamos pausar o programa automático' })).toBeVisible();
  await c.tela('triagem-bloqueio');
  await page.getByLabel('Confirmo que fui avaliado e liberado').check();
  await page.getByRole('button', { name: 'Continuar com a liberação' }).click();
}

/** Da abertura ("/") até o programa ("Seu treino"), marcando cada tela. */
export async function cadastro(c: Percurso, d: Definicao) {
  const { page } = c;
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Entendi, vamos começar' })).toBeVisible();
  await c.tela('boas-vindas');
  await page.getByRole('button', { name: 'Entendi, vamos começar' }).click();

  await expect(page.getByRole('heading', { name: 'Antes de começar, 9 perguntas rápidas' })).toBeVisible();
  await c.tela('triagem');
  if (d.triagem) await d.triagem(c);
  else await page.getByRole('button', { name: 'Nenhuma vale para mim' }).click();

  await expect(page.getByRole('heading', { name: 'Sua experiência com musculação' })).toBeVisible();
  await c.tela('nivel');
  await grupo(page, /sem parar/).getByLabel(d.nivel.tempo, { exact: true }).check();
  await grupo(page, /treinando agora/).getByLabel(d.nivel.pausa).check();
  await grupo(page, /confiança na técnica/).getByLabel(d.nivel.tecnica).check();
  await expect(page.getByRole('heading', { name: /^Seu nível: / })).toBeVisible();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Sua rotina de treino' })).toBeVisible();
  await c.tela('rotina');
  await grupo(page, /Quantos dias/).getByLabel(`${d.rotina.dias} dias`, { exact: true }).check();
  const g = grupo(page, /Quantos minutos/);
  if ([30, 45, 60, 75, 90].includes(d.rotina.minutos)) await g.getByLabel(`${d.rotina.minutos} min`, { exact: true }).check();
  else {
    await g.getByLabel('Outro', { exact: true }).check();
    await c.digitar(page.getByLabel('Outro: quantos minutos?'), String(d.rotina.minutos));
  }
  for (const p of d.rotina.prioridades) await page.getByLabel(NOME_PRIORIDADE[p] ?? cap(p), { exact: true }).check();
  if (d.rotina.objetivo) await grupo(page, /O que você quer agora/).getByLabel(d.rotina.objetivo).check();
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Que equipamento você tem?' })).toBeVisible();
  await c.tela('equipamento');
  if (d.equipamento) await d.equipamento(c);
  else await marcarInventario(c, d.persona.inventario);
  await page.getByRole('button', { name: 'Continuar' }).click();

  await expect(page.getByRole('heading', { name: 'Tudo certo?' })).toBeVisible();
  await c.tela('confirmar');
  if (d.evitarEquipamentos?.length) {
    await page.locator('details.evitar > summary').click();
    for (const nome of d.evitarEquipamentos) await grupo(page, /Algum equipamento que você tem/).getByLabel(new RegExp(`^${nome}`)).check();
  }
  await page.getByRole('button', { name: 'Gerar meu programa' }).click();

  await expect(page.getByRole('heading', { name: 'Seu treino', exact: true })).toBeVisible();
  c.terminar();
  await c.tela('programa');
}

/** O 2º local do Bruno (R1b), em /locais/novo: nome por toque ("Academia") e o inventário da academia do bairro. */
export async function segundoLocalDoBruno(c: Percurso) {
  const { page } = c;
  await c.recolher();
  await page.goto('/locais/novo');
  await expect(page.getByRole('heading', { name: 'Novo local' })).toBeVisible();
  await c.tela('local-2');
  await page.getByRole('button', { name: 'Academia', exact: true }).click();
  await marcarInventario(c, brunoAcademiaDoBairro);
  await page.getByRole('button', { name: 'Salvar local' }).click();
  await expect(page.getByRole('heading', { name: 'Meus locais' })).toBeVisible();
  c.terminar();
  await c.tela('locais');
}

export type { ItemId };
