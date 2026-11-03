# Briefing comum dos subagentes (design v3, 03/11/2026)

> Escrito pelo agente líder. Todo subagente lê este arquivo inteiro antes de começar. O prompt original da sessão está em `docs/prompts/sessao-design-agentes.md`.

## O app
**treino-mvp**: web app (PWA) em pt-BR que monta um programa de hipertrofia baseado em evidência, só com o equipamento que a pessoa tem, e conduz cada treino com um guia animado (o "Boneco"). Publicado em https://treino-mvp-sigma.vercel.app (branch `main`). O dono, o Gustavo, não é programador nem designer: fala de produto e experiência e quer explicações simples, em pt-BR, sem jargão.

## Por que esta sessão (palavras do Gustavo, ao abrir no celular a reformulação visual de 03/11)
1. A primeira tela ("Seu treino, com o equipamento que você tem") é "só um texto corrido que você não consegue entender nada direito, tem que ficar lendo um monte de coisa".
2. Na triagem ("9 perguntas rápidas"), "você tem que ficar lendo primeiro tudo para depois falar que nenhuma vale". Tem que ser mais rápido e fácil.
3. A experiência no geral ainda pede leitura demais. Ele quer "melhorar bastante essa apresentação gráfica inicial".

## O que já existe (leia o que for do seu papel)
- `CLAUDE.md` (princípios não negociáveis): leia primeiro.
- `docs/revisoes/design-v2.md`: a reformulação visual aprovada e implementada (letra Atkinson Hyperlegible Next, paleta, toques de 48 px ou mais, uma pergunta por tela, ~35 fontes com selo). **Não repita a pesquisa dela: amplie.**
- `docs/revisoes/design.md`: a 1ª revisão.
- `docs/pesquisa/00-metodo.md`: os 4 selos (robusta, moderada, um estudo, consenso) e o status das fontes.
- `docs/pesquisa/regras.md`: as regras com selo; a triagem são as linhas `seguranca.triagem*`, `seguranca.sem-diagnostico`.
- `docs/pesquisa/07-seguranca-triagem-niveis.md` e `docs/pesquisa-v2/06-populacoes-e-seguranca.md`: a base da triagem.
- O código das telas: `src/features/onboarding/` (BoasVindas, Triagem, Nivel, Rotina, Inventario, Restricoes), `src/features/app/ui.tsx` (componentes), `src/styles.css`; as perguntas da triagem em `src/domain/triagem/index.ts`.
- **As medidas de hoje (fase 1):** `docs/revisoes/design-v3/medidas-claro.json` e `medidas-pequeno.json` (360 px), geradas por `scripts/design/palavras.spec.ts`. As imagens de cada tela: `reports/design/v3-antes/claro/` (lista-NN.png = caminho "monto a lista"; academia-NN.png = "academia completa"; a ordem está no JSON) e o painel `docs/img/v3-antes-cadastro.png`. Telas do resto do app: `reports/design/telas/claro/` (07-programa, 10-treino, 11-descanso, 09-guia-*, 13-fim-do-treino, 14-semana, 16-meus-dados). Nas capturas de página inteira, o "treino-mvp" que aparece no meio é o topo fixo, efeito da captura.

## Os números de hoje (celular de 412 px, tema claro)
| Tela | Palavras | À vista sem rolar | Leitura a 200/min | Altura (telas) |
|---|---:|---:|---:|---:|
| Boas-vindas | 180 | 116 | ~54 s | 1,49 (o botão "Entendi, vamos começar" fica a 130% da altura: fora da vista) |
| Triagem (lista das 9) | 171 | 130 | ~51 s | 1,52 (os botões ficam no fim da lista, de propósito) |
| Nível (3 perguntas, reveladas uma a uma) | 118 | 118 | ~35 s | 1,79 |
| Rotina (dias, minutos, prioridade opcional) | 98 | 98 | ~29 s | 1,48 |
| Equipamento, "monto a lista" | 263 | 190 | ~79 s | 4,93 |
| Equipamento, "academia completa" | 383 | 97 | ~115 s | 6,65 |
| Tudo certo? | 27 | 27 | ~8 s | 1 |
| **Até o programa** | **~860 ("lista") / ~980 ("academia")** | | **~4,3 a 4,9 min, se ler tudo** | |

Toques até o programa: 13 ("academia completa") e 17 ("monto a lista", halteres de 1 a 12 kg e banco). 0 caractere digitado. A 360 px, a boas-vindas tem 1,92 telas de altura.

## Regras inegociáveis (valem para toda proposta)
1. **O Boneco (`src/engine/`) não muda.** O gerador, os músculos de cada exercício e as animações também não (fora do escopo).
2. **Segurança:** a triagem segue o estilo do PAR-Q+. Qualquer mudança no que a pessoa precisa ver ou responder é **mudança de regra** (`seguranca.triagem.*`), com selo e fonte, e só entra com a decisão explícita do Gustavo: marque essas propostas como "muda regra". **Encurtar texto não pode esconder uma condição.** As 9 condições de hoje: coração ou pressão alta; dor no peito; tontura ou desmaio (12 meses); outra doença crônica; remédio para doença crônica; osso, articulação, músculo ou tendão (12 meses); médico pediu acompanhamento; gravidez ou parto há menos de 6 meses; febre, gripe forte ou doença aguda. O texto é próprio, no estilo do PAR-Q+, sem copiar o texto oficial nem usar a marca até confirmar a licença (`seguranca.triagem.texto`). O app não diagnostica (`seguranca.sem-diagnostico`), e "o que o app não faz" precisa continuar dito em algum lugar antes do programa.
3. **Evidência:** toda regra e todo texto técnico mostram o nível de evidência. O selo pode ficar mais discreto, mas não some. Nada de inventar estudos. Opinião é marcada **[opinião]**.
4. **Privacidade:** nada de `privado/`. Imagens só com as personas fictícias (`tests/personas/`). A frase de privacidade (os dados ficam no aparelho; a foto sai sem localização e não fica no servidor) pode encolher, mas a pessoa precisa saber disso antes de mandar foto.
5. **Uso na academia:** mobile-first, pt-BR, toque de 44 px ou mais (o sistema usa 48 a 64), `prefers-reduced-motion`, uma mão só, contraste WCAG 2.2 AA.
6. **Simplicidade:** poucas dependências novas.

## Prioridade do trabalho
1. A **primeira tela**: o que o app faz e o que não faz, dito em segundos.
2. A **triagem**: chegar a "nenhuma vale para mim" sem ler 9 frases longas, sem perder o que a segurança exige.
3. O **resto do cadastro**: nível, rotina, equipamento, "Tudo certo?".
4. Depois, mais curto: **o resto do app** (seu treino, treino, guia, fim, semana).

## Como entregar
- Escreva só o(s) arquivo(s) do seu papel, em `docs/revisoes/design-v3/`, em pt-BR, frases curtas, sem jargão (termo técnico inevitável: explique numa frase). Não mexa em código, não faça commit.
- Cada proposta diz: o que muda, por quê (com selo e fonte, ou [opinião]), o efeito medido ou estimado (palavras, toques, tempo) e se **muda regra** ou é **só tela**.
- Para a primeira tela e a triagem, monte **2 ou 3 alternativas bem diferentes** (não variações da mesma), cada uma com nome curto.
- Termine com uma lista "Conflitos com outros papéis" (por exemplo: menos texto × evidência visível) para o líder resolver.
- Na resposta final ao líder, dê um resumo de até 15 linhas: as alternativas, os números e os riscos.
