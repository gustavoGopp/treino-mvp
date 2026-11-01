# Plano do MVP: treino-mvp (codinome)

> Aprovado em 29/10/2026; critérios (seção a) e marcos (seção i) revisados em 01/11/2026. Mudanças de rumo são registradas no `docs/devlog.md`.

## Contexto
> **Atualização de 01/11/2026.** O projeto deixou de partir do programa pessoal de referência. A base do programa está sendo refeita para qualquer pessoa, sem premissas, em `docs/pesquisa-v2/`. O `referencia/programa-fase-1.md` vira só histórico e caso de comparação, e o público principal, por agora, é o Gustavo. O texto abaixo é o contexto original de 29/10.

Você já tem um sistema pessoal que funciona: fotos da academia → inventário → programa de hipertrofia baseado em evidência (`programa-fase-1.md`) → guia animado com temporizador (`guia-execucao-fase1.html`). O objetivo agora é transformar isso num produto para quem treina com equipamento limitado, construído em público (git + LinkedIn).

**Decisões já tomadas**
| Tema | Decisão |
|---|---|
| Nome | `treino-mvp` como codinome; a marca fica para depois da validação |
| Repositório | Público, com código fechado ("todos os direitos reservados", com LICENSE explícito) |
| Hospedagem | Repositório novo no seu GitHub + Vercel com deploy contínuo. Confirmo o nome do repositório antes de criar |
| Login | Não tem. Tudo fica no aparelho, com exportação e importação em JSON (o prompt deixa login fora do MVP) |
| Visão | Chave sua, só no servidor. Código de convite no beta, limite de ~10 fotos por aparelho por dia, teto de gasto mensal no console da Anthropic. O checklist manual funciona sempre |
| Níveis | Iniciante, intermediário e avançado. "Voltando de pausa" é um modificador que vale para qualquer nível |
| Pesquisa | Nova etapa **M0-R** (pesquisa aprofundada) antes das regras do gerador. Ela também resolve as divergências do guia (remada baixa e pegada da barra fixa) |


---

## a. Objetivo e critérios de sucesso
> Revisado em 01/11/2026, depois do diagnóstico (`planejamento/2026-11-diagnostico.md`) e das decisões do Gustavo registradas no `devlog.md`. As versões anteriores ficam no histórico do git e no `devlog.md`.

**Objetivo:** o Gustavo monta, em minutos, um programa de hipertrofia baseado em evidência que usa bem o equipamento que tem, treina com o guia animado e acompanha o próprio progresso no app, inclusive quando falta a treinos. Família e amigos podem testar, mas o plano não depende deles.

**Critérios mensuráveis**
1. **Cadastro rápido.** Para quem não tem condição de saúde nem dor, o caminho da abertura até o programa leva até 1 min e até 15 toques, sem contar a tela de equipamento. Com o botão "academia completa", o equipamento leva até 15 s. Medição: um teste automático conta os toques, e o Gustavo cronometra uma vez no celular.
2. **Programa com base, não com cópia.** O programa de cada persona, inclusive o do Gustavo, só usa regras com selo e fonte da pesquisa (`docs/pesquisa/` e `docs/pesquisa-v2/`), e uma revisão independente confere a montagem contra a pesquisa v2. O `programa-fase-1.md` deixa de ser meta: vira só um caso de comparação. *(Trocado em 01/11/2026 a pedido do Gustavo; antes: repetir ≥ 80% do programa de referência.)*
3. **Foto do equipamento.** No gabarito, recall ≥ 85% e precisão ≥ 90% dos itens com confiança alta, com o eval rodado pelo Gustavo.
4. **Aproveitar o equipamento.**
   - Numa academia completa, os programas usam 45 ou mais exercícios distintos (eram 32 de 60).
   - Todo equipamento marcado serve a pelo menos um exercício.
   - Todo exercício tem 2 ou mais alternativas de outro equipamento.
   - A meta de cada músculo é atingida, ou aparece um aviso com o motivo verdadeiro.
   - A divisão do treino é escolhida entre as opções equivalentes da pesquisa v2 (`pesquisa-v2/01-divisao-e-frequencia.md`), e não fixada pelo número de dias.
5. **Uso real.** O Gustavo treina 4 semanas só com o app, com 10 sessões ou mais registradas, e aponta os 5 maiores incômodos.
6. **Acompanhamento.**
   - Depois de uma pausa de 3 semanas ou mais, o próximo treino aplica a volta gradual.
   - Uma pausa de menos de 2 semanas mantém a carga.
   - A tela mostra os treinos feitos na semana e as séries por músculo contra a meta.

   Tudo verificado por testes automáticos.
7. **Animações.** As 31 animações aprovadas continuam com 0 pixel de diferença e 0 falha de IK. Todo exercício do programa do Gustavo tem animação.
8. **Uso no celular.** Acessibilidade ≥ 90 no Lighthouse; o app se instala no celular; uma sessão inteira feita com uma mão.


## b. Personas e jornada
Todas as personas são fictícias e ficam versionadas em `tests/personas/`:
- **Ana, 29, iniciante.** Academia do prédio com halteres fixos e banco. 3 dias × 45 min. Quer glúteos e pernas.
- **Bruno, 41, intermediário voltando de pausa.** Halteres, polia dupla, barra fixa e banco. 4 dias × 60 min. Sente desconforto no ombro.
- **Carla, 35, avançada.** Academia completa. 5 dias × 75 min.
- **Diego, 26, iniciante em casa.** Elásticos e barra fixa. 3 dias × 40 min.

**Jornada:** boas-vindas e aviso, com o que o app faz e o que não faz (não diagnostica) → triagem estilo PAR-Q+ (qualquer "sim" bloqueia a geração automática do programa até a pessoa confirmar que foi avaliada por um profissional; decisão do M0-R) → perfil (nível, dias, tempo, prioridades, exercícios a evitar, dores) → inventário (foto ou checklist, sempre com confirmação) → programa gerado, com o "porquê" de cada escolha → treino do dia → guia do exercício → séries marcadas com carga × repetições × RIR e temporizador → treino concluído → sugestão para a próxima sessão.

## c. Escopo
**Dentro:** os 5 itens da seção 3 do prompt (perfil e triagem, inventário com foto, gerador, execução, registro e progressão), PWA instalável, exportação e importação em JSON, devlog.

**Fora (próximos passos):** nutrição, login e nuvem, pagamentos, app nativo, social, relógios, outros objetivos (emagrecimento, força, corrida), treinador humano, cardio prescrito (no MVP fica só como texto informativo) e deload automático (no MVP o app só sugere).

## d. Arquitetura
**Recomendação: Vite + React + TypeScript, com uma função serverless na Vercel.**
Em linguagem de negócio: o app roda inteiro no celular da pessoa. O único serviço no servidor é "mandar a foto para a IA". O Next.js é feito para sites que montam páginas no servidor, o que não precisamos. Ele traria mais complexidade e mais custo de hospedagem sem ganho nenhum. O Vite gera um site estático, barato, rápido e fácil de transformar em app instalável.

```
treino-mvp/
  api/vision.ts              # única função no servidor: valida o convite, aplica o limite, chama o Claude e valida o JSON
  src/
    domain/                  # regras puras, sem React (100% testadas com Vitest)
      taxonomy/              # equipamentos.ts (taxonomia controlada)
      exercises/             # biblioteca.json + schema (dados, não código)
      rules/                 # volume.ts, reps.ts, rir.ts, descanso.ts, cada uma com fonte e nível de evidência
      generator/             # split.ts, select.ts, budget.ts, order.ts, readapt.ts
      progression/           # dupla progressão
      safety/                # parq.ts, contraindicações por articulação
    engine/                  # motor de animação portado
      math/ (ik, vec, proj)  skeleton/ (skel, poseAt)  render/ (primitivas, scene, equipamentos)
      data/exercicios/*.ts   # um arquivo por animação (base, keys, seq, errors…)
    features/                # telas: onboarding, inventario, programa, treino, registro, ajustes
    storage/                 # IndexedDB (idb-keyval) + export/import + migrações de versão
    lib/image/               # redimensiona e remove EXIF via canvas
  tests/ (unit, e2e, visual, personas/)
  docs/ (PLANO-MVP.md, devlog.md, pesquisa/, evidencias.md)
  privado/                   # gitignored: fotos, gabarito, perfil e o teste do cenário 1
```
**Fluxo de dados:** a UI grava Perfil e Inventário (IndexedDB). O `generate()`, uma função pura, devolve o Programa (salvo). Na Sessão, o `progression()` recebe o Registro e devolve a sugestão. A foto passa por `lib/image`, segue para `/api/vision` e de lá para o Claude. As sugestões voltam para confirmação.

**Dependências:** react, react-router, vite-plugin-pwa, idb-keyval, zod, @anthropic-ai/sdk (só no `api/`), vitest, @playwright/test, eslint e prettier. Não tem gerenciador de estado nem biblioteca de UI: CSS com tokens (os mesmos do guia).

## e. Modelos de dados (TypeScript + zod)
- **EquipmentItem:** `{ id, categoria: 'halter'|'polia'|'barra'|'banco'|'acessorio'|'peso-corpo'|'cardio', atributos }`. Os atributos que mudam a prescrição são: halteres fixos `{minKg,maxKg,passoKg}`, montáveis `{manoplas, anilhas:[{kg,qtd}]}` (daí sai a carga máxima), polia `{tipo:'simples'|'dupla', alturaRegulavel, placas?, kgPorPlaca?}`, acessórios de polia `['corda','triangulo','barra-reta','estribo','tornozeleira']`, banco `{tipo:'reto'|'regulavel', declinado}`, barra fixa, step, bola suíça, bosu, elásticos `{intensidades}`, barra longa e anilhas olímpicas, máquinas (leg press, cadeira extensora etc., para a "academia completa").
- **Exercise:** `{ id, nome, padrao:'empurrar-h'|'empurrar-v'|'puxar-h'|'puxar-v'|'agachar'|'dobrar-quadril'|'afundo'|'isolador-*'|'core', musculos:{primarios,secundarios}, requer: Requirement[] (lógica E/OU sobre a taxonomia, ex.: polia AND corda), complexidade:1-3, tipo:'composto'|'isolador', faixaReps, rirPadrao, descansoPadrao, unilateral, tempoPorSerieSeg, articulacoesCarregadas:['ombro','joelho','lombar',…], niveis, alternativas:id[], animacaoId|null, cuesTexto }`
- **Profile:** `{ nivel, voltandoDePausa, diasSemana:2-5, minutosSessao, prioridades, evitar:id[], dores:[{articulacao, intensidade}], parq:{respostas, risco} }`
- **Program:** `{ versao, seed, geradoEm, entradasHash, split, semanas:{readaptacao}, dias:[{nome, exercicios:[{exId, series, reps, rir, descanso, ordem, porque:[{regraId, evidencia, fonte}], alternativas}]}], volumePorGrupo }`
- **Session:** `{ id, programaId, dia, data, semana, exercicios:[{exId, series:[{kg|placa, reps, rir, ok}], sinalSeguranca?}] }`
- **LogEntry/Suggestion:** `{ exId, acao:'subir'|'manter'|'recuar', proximaCarga, motivo, regraId }`

## f. Algoritmo do gerador (pseudocódigo)
```
generate(perfil, inventario, biblioteca, regras) -> Programa   // determinístico: ordena por id e não usa aleatoriedade
  if perfil.parq.risco: programa.aviso = 'avaliação profissional recomendada'
  // 1. Exercícios possíveis
  E = biblioteca.filter(ex => satisfaz(ex.requer, inventario)
                          && ex.id ∉ perfil.evitar
                          && nivelOk(ex, perfil.nivel)
                          && !conflitaDor(ex.articulacoesCarregadas, perfil.dores))
  // 2. Divisão (R0b: a pessoa escolhe entre opções equivalentes; regras divisao.*; pesquisa-v2/01)
  split = perfil.divisao se servir para os dias e as metas, senão a recomendada (a 1ª de OPCOES_POR_DIAS)
     2d → CT A/B · 3d → CT A/B/C | S/I + CT · 4d → S/I 2x | CT 4x · 5d → S/I + E/P/P | CT 5x · 6d → E/P/P 2x | S/I 3x
     clássica (ABC, ABCD, ABCDE) só com meta ≤ 10 e por escolha, com o aviso das faltas
  // 3. Volume semanal por grupo (do M0-R)
  alvo[g] = baseNivel(nivel)  // ex.: iniciante 8–10, intermediário 10–14, avançado 12–18
  alvo[g] += bônus se g ∈ prioridades; grupos não prioritários podem ficar em volume.semanal.minimo-eficaz (4–6 séries)
  alvo[g] = min(alvo[g], capacidadeTempo(dias, minutos))
  // 4. Preenchimento por função, por dia (R0b: selecao.funcao-da-vaga; funções em níveis = tabela 2.1 do pesquisa-v2/08)
  for dia in split: vagas = funções do dia (as de prioridade só se o grupo for prioritário)
     mantém as obrigatórias (extensora, tríceps acima da cabeça, panturrilha em pé) + as N primeiras (tempo.exercicios-por-sessao)
     for vaga: 1º nível da função com exercício possível (ou a função seNada); desempate: dor leve, estabilidade (só iniciante),
       carga possível, variedade entre os dias, animação aprovada, id
     distribuir séries até alvo[g] (2–4 por exercício, ≤ 10 por músculo por sessão)
  // 5. Orçamento de tempo
  t = Σ (series × (tempoSerie + descanso)) + aquecimento(6–8min)
  while t > minutos (R0b, regra tempo.corte): 1) aquecimento só específico; 2) superséries (isoladores, depois multiarticulares de músculos diferentes);
     3) drop set na última série de isoladores (vale 2 séries); 4) menos exercícios, sem tirar multiarticular nem obrigatório;
     5) menos séries; 4 e 5 primeiro nos não prioritários (até o piso de 4) e só depois nos prioritários
  // 6. Ordem: compostos grandes → compostos menores → isoladores → core; unilaterais pela perna mais fraca
  // 7. Prescrição: faixas/RIR/descanso pelas regras de docs/pesquisa/regras.md (composto 6–10/8–12 RIR1–2, isolador 10–20 RIR0–1; iniciante RIR+1)
  //    série efetiva = série de trabalho com RIR ≤ 4 (inclui a semana 1 da readaptação)
  // 8. Readaptação: se voltandoDePausa ou iniciante: sem1 2 séries RIR3–4, sem2 cheio RIR2–3, sem3 completo
  // 9. Alternativas (selecao.equivalencia): até 3, da mesma função, de outro equipamento primeiro; se faltarem, do mesmo músculo
  // 10. Porquê: cada decisão grava {regraId, evidência, fonte}
progression(historico, ex, incrementoDisponivel) -> Sugestao  // regras 1–8 do programa-fase-1
```

**Cenários de teste (Vitest, com saída comparada a snapshot revisado)**
> Revisado em 01/11/2026: o cenário 1 deixa de ter como resultado esperado o `programa-fase-1.md`; ele passa a ser só comparação (critério 2 da seção a). Os resultados esperados dos 4 cenários serão refeitos com a pesquisa v2.
1. **Minha academia** (o teste fica em `privado/`, fora do CI). Entradas: o inventário do gabarito, intermediário voltando de pausa, 4 dias de 50–75 min, prioridade nos superiores, e evitar barra longa e exercícios de perna complexos com peso livre. Resultado esperado: Torso/Membros 4 dias, 10–12 séries para peito, costas e ombros, 6–8 para pernas, sessões de 55–65 min, sem barra longa, com os exercícios de `programa-fase-1.md`. Uma persona fictícia equivalente ("Bruno") fica versionada.
2. **Halteres + banco**, 3 dias. Resultado esperado: corpo todo A/B/C com supino, remada apoiada, goblet, stiff, búlgaro e elevação lateral. Nenhum exercício de polia ou barra fixa. Puxada vertical aparece como aviso de "lacuna" (pullover com halter entra como substituto parcial, com evidência indicada).
3. **Casa com elásticos + barra fixa**, 3 dias. Resultado esperado: barra fixa (ou negativas para iniciante), remada e desenvolvimento com elástico, agachamento e afundo com peso do corpo e repetições altas, flexão. Aviso de limitação para pernas.
4. **Academia completa**, 5 dias, avançado. Resultado esperado: inclui máquinas e barra longa, 12–18 séries por grupo e respeita o tempo.

Testes de propriedade: a mesma entrada gera a mesma saída (hash); nenhum exercício exige item fora do inventário; nenhum exercício carrega uma articulação com dor; o tempo estimado fica dentro do limite **ou** há aviso explícito; nenhum músculo desce do piso nos cortes; todo músculo abaixo da meta aparece num aviso (revisão de 30/10/2026).

## g. Fluxo da foto
1. Captura com `<input capture>` ou da galeria, até 5 fotos.
2. No aparelho: o canvas redimensiona para no máximo 1568 px no lado maior e gera JPEG com qualidade 0,8. Redesenhar no canvas descarta todo o EXIF, inclusive o GPS. Um teste confirma que a saída não tem segmento EXIF.
3. `POST /api/vision` com o código de convite. O servidor checa o limite (por aparelho e por IP, usando Vercel KV/Upstash ou, no início, um contador simples), o tamanho e o tipo do arquivo. Nada é salvo e os logs não levam a imagem.
4. Chamada ao Claude com saída estruturada (JSON schema gerado a partir da taxonomia). O retorno é `[{itemId, atributos, confianca:'alta'|'media'|'baixa', evidencia}]`.
5. Validação com zod. Ids fora da taxonomia são descartados.
6. A UI mostra cada item pré-marcado conforme a confiança (alta = marcado, média = pergunta, baixa = desmarcado) e pede os atributos que faltam (faixa dos halteres, anilhas). **Nada entra sem confirmação.**
7. Erros (sem rede, limite atingido, convite inválido, JSON inválido, timeout) sempre levam ao checklist manual, com uma mensagem clara.

**Medição de acerto:** o script `scripts/eval-vision.ts` roda as fotos de `privado/` contra cada modelo. Os itens de `tem` contam para o recall, e os de `nao_tem` (barra W, leg press, smith etc.) contam como falso positivo grave. Os modelos testados são os Haiku, Sonnet e Opus mais recentes, verificados na documentação da API quando chegarmos lá. O script compara com o `gabarito.json` e calcula precisão, recall por item e acerto dos atributos, além de custo e latência por foto, e gera uma tabela de custo × acerto. O resultado agregado entra no devlog, sem as fotos. A escolha é o modelo mais barato que atingir os critérios do item a.3.

## h. Migração do motor de animação
1. **Linha de base.** Copio o HTML para `referencia/` e estendo o `check-motor.cjs` com um modo `dump`. Esse modo usa o `window.__guia` existente para salvar, a 24 tempos por ciclo e em cada exercício × vista × modo × erro, o SVG gerado (`prims` ordenados, com `KS` fixo) e o `viewBox` de `fit()`. O resultado vai para `tests/visual/baseline/*.json`, junto com a saída de `check()` e a folha de contatos em PNG. É uma única alteração no QA (expor `prims` e `KS` no `__guia`), sem mexer em nenhuma pose.
2. **Port mecânico.** Divido em módulos TS sem alterar a lógica (`any` provisório é permitido):
   - `engine/math/` (vetores, `ik2`, `solveArm`/`solveLeg`)
   - `engine/skeleton/` (`skel`, `interp`, `ease`, `poseAt`, `prep`)
   - `engine/render/` (primitivas, `body`, `muscles`, equipamentos, `scene`, `fit`, `calib`)
   - `engine/data/exercicios/<id>.ts` (um arquivo por `EX.push`), com as constantes compartilhadas (`benchInc`, `RB`, `SH`, `BALL`, `RI`) num arquivo próprio

   O estado compartilhado (`VIEW`, `PJ`, `prims`, `MEAS`, `KS`) vira um objeto de contexto passado para `scene()`. O clone `elevacao-lateral-b` vira uma variante de prescrição (a prescrição sai da animação e vai para o programa), mantendo o mesmo id de animação.
3. **Teste de equivalência.** O `scene()` do módulo novo tem que gerar SVG idêntico, caractere por caractere, ao da linha de base, e os PNGs têm que ter diferença de 0 pixel. `check()` deve continuar com 0 falhas de IK e os mesmos `L0` e `lift`.
4. **Tipagem e limpeza** só com o teste verde.
5. A UI do guia vira um componente React que só monta o SVG (o motor continua sem React). O suporte a `prefers-reduced-motion` mostra quadros estáticos com setas.

**No MVP:** os 25 exercícios animados que já existem. Exercício sem animação aprovada aparece como **cartão textual** (setup, execução, 3 dicas, erros, onde sentir), com o selo "animação em breve".

**Próximas animações:** pela frequência com que cada exercício aparece nos programas gerados (tema T7 da pesquisa v2), começando pelos do programa do Gustavo. Cada animação nova passa pelo ritual de `docs/pesquisa/animacoes/README.md`.

As correções da remada baixa e da barra fixa entram depois do M0-R, como mudanças separadas e revisadas, com uma nova linha de base.

## i. Marcos
> Revisado em 01/11/2026. Os marcos M0 a M5, o R0b, o R0c e o R1 estão concluídos (ver `devlog.md`); a tabela original fica no histórico do git. O R1b entrou a pedido do Gustavo, ao fim do R0c.

| Marco | Entregáveis | Aceite | Esforço |
|---|---|---|---|
| **P Pesquisa v2: a base, sem premissas** | Refazer o estudo de como montar o programa, para todos e para o Gustavo, sem partir do programa de referência: divisão e frequência; panorama das variáveis; universo de equipamentos; escolha dos exercícios por músculo; montagem da sessão; iniciantes, pausas e populações; progressão e acompanhamento; e por fim o programa do Gustavo. Plano e resultados em `docs/pesquisa-v2/`. | Cada tema aprovado pelo Gustavo, com as mudanças em `regras.md` listadas; toda fonte com o resumo lido no PubMed (ou marcada como não verificada) | 1–2 semanas |
| **R0 Aproveitar o equipamento** | **R0a:** pesquisa curta dos exercícios novos e parada para revisão da lista. **R0b:** o gerador se adapta ao equipamento (vagas extras de extensora, glúteo e posteriores; máquina com o mesmo peso que o peso livre; preferências de função, não de equipamento; mais alternativas). **R0c:** catálogo ampliado (~12 equipamentos e ~25 exercícios, com cartão de texto e fonte; ids novos na visão). Linha de base em `pesquisa-v2/03-universo-de-equipamentos.md`; o conteúdo final, aprovado em 01/11/2026, está em `pesquisa-v2/04-exercicios-por-musculo.md` (funções) e `pesquisa-v2/08-equipamentos-v2.md` (46 equipamentos, 29 exercícios novos, funções em níveis, atalhos e fila das animações). Metas medidas: 45+ exercícios na academia completa, 0 equipamento sem exercício possível, 2+ alternativas, aviso com o motivo verdadeiro. | Critério 4; os snapshots das personas mudam só com revisão | 1–1,5 semana |
| **R1 Corrigir o que engana e cadastro em 1 min** | Triagem com "Nenhuma se aplica a mim"; articulação passa a usar a nota de dor de hoje; uma pergunta de dor só; minutos por toque; os 3 atalhos de cenário na tela de equipamento, com nada pré-marcado ("casa com halteres e elásticos", "condomínio com multifuncional" e "academia completa"; `pesquisa-v2/08`, seção 3); a esteira fora da lista de treino (continua na foto); a pergunta única "qual a menor anilha?"; o guia mostra a prescrição da pessoa; textos corrigidos; aviso de meta com o motivo verdadeiro | Critério 1; nenhum dia só com abdominal; o guia aberto pelo treino mostra a prescrição da pessoa | ~3 dias |
| **R1b Vários locais e trocas inteligentes** (pedido do Gustavo em 01/11/2026) | Pesquisa curta antes do código: como levar o progresso de um aparelho para outro equivalente, com selo e fonte, sem inventar. Mais de um local cadastrado, cada um com o seu inventário e um nome ("prédio", "academia do bairro"), e a escolha de "onde vou treinar hoje". O treino do dia se ajusta ao local: cada vaga troca para o equivalente possível ali, pela tabela de funções, com o motivo da troca. O histórico de cada exercício segue; no aparelho novo, a carga vem da calibração na 1ª série (que sai do R2). Preferência "prefiro este" entre equivalentes, usada nos programas e nas trocas. Regras novas em `regras.md` | Uma persona com 2 locais faz o mesmo dia nos dois, com as trocas explicadas, e a progressão dos exercícios repetidos continua; teste de propriedade: trocar de local nunca apaga nem mistura o histórico | ~1 semana |
| **R2 Acompanhamento personalizado** | Pausas detectadas sozinhas (`readaptacao.gatilho` aplicado durante o uso); "a sua semana" (treinos e séries por músculo contra a meta); evolução por exercício; semana leve sugerida; regras novas em `regras.md` (a calibração da carga na 1ª série foi para o R1b) | Critério 6 | ~1 semana |
| **R3 Uso real** | O Gustavo treina 4 semanas com o app; eval da foto com as fotos reais; lista dos incômodos; correções pequenas | Critérios 3 e 5 registrados no devlog | 4 semanas |
| **R4 Experimento do boneco** (durante o R3) | Segundo estilo de figura só no goblet, com comparação lado a lado; as 31 animações aprovadas não mudam | O Gustavo decide: seguir, ajustar ou parar | 2–3 dias |
| **R5 Decidir com o uso** | Escopo vem do R3 e do R4: boneco em tudo, animações que faltam, desenhos de equipamento, termos de uso e limite compartilhado se o app for aberto | Cada item com o motivo e o próprio aceite | a definir |

Ao fim de cada marco eu paro, mostro o resultado e espero o seu ok.


## j. Riscos e mitigação
- **Precisão da visão:** a confirmação é obrigatória, o checklist é sempre o caminho alternativo, e o acerto é medido com o gabarito.
- **Segurança e responsabilidade:** triagem PAR-Q+, aviso de que o app não diagnostica, regras de contraindicação testadas, interrupção do exercício quando surge um sinal de alerta e termos de uso simples. Sugiro uma revisão por um educador físico (CREF) antes do beta aberto.
- **Regulação e licença:** a prescrição de exercício é atribuição do profissional de educação física (CONFEF); o app se apresenta como ferramenta de orientação, com consulta jurídica antes do beta aberto. O texto do PAR-Q+ só entra no app depois de confirmada a licença; até lá, perguntas próprias no estilo do PAR-Q+.
- **Custo da API:** código de convite, limite por aparelho e IP, teto de gastos no console, redimensionamento das imagens (menos tokens) e o modelo mais barato que atingir a meta.
- **Qualidade das animações:** regressão em pixel, cartão textual em vez de improviso e aprovação humana a cada animação nova.
- **Crescimento do escopo:** a lista "fora do MVP" fica no `CLAUDE.md`, e qualquer item novo vai para `docs/backlog.md`.
- **Privacidade e LGPD:** os dados ficam no aparelho; nenhuma foto é guardada; um teste no CI falha se algum arquivo de `privado/` estiver versionado.
- **Avançado com evidência fraca:** as regras do nível avançado aparecem com o nível de evidência explícito, e o app avisa que o equipamento limitado também limita o resultado.

## k. Testes e QA visual
- **Vitest:** todo o `domain/` (regras, gerador, progressão, triagem), com snapshots revisados dos cenários e testes de propriedade.
- **Playwright E2E:** onboarding → programa; sessão completa; exportação e importação; caminho alternativo da visão (com a API simulada).
- **Regressão visual:** PNGs de linha de base do motor comparados com diferença de 0 pixel, mais `check()` com 0 falhas de IK e folha de contatos gerada como artefato do CI.
- **CI:** lint, typecheck, Vitest e Playwright a cada push e PR; preview da Vercel a cada PR.
- **Manual:** um treino real seu no celular ao fim do M5.

## l. Build in public
`docs/devlog.md` ganha uma entrada por marco: o que mudou, decisões tomadas, um GIF ou imagem (gerado pelo Playwright a partir das personas fictícias, nunca das suas fotos) e um rascunho de post para o LinkedIn de até 1.300 caracteres. Os posts nunca usam dados de `privado/`.


## Verificação
- Cada marco: os critérios de aceite da tabela da seção i, com prints ou GIFs no devlog.
- Cada tema da pesquisa v2: aprovado pelo Gustavo antes de mudar `regras.md`.
- Final: os critérios da seção a medidos no uso real do Gustavo (marco R3).
