# Frente F: corpo livre e casa (rodada extra de 06/11/2026)

**Em uma olhada.** O Gustavo testou o app com "Corpo livre" (nada marcado) e foco nos superiores e recebeu treinos de corpo todo com 3 a 6 exercícios genéricos. A grade só de corpo livre (15.300 programas) confirma e mostra a causa: **a biblioteca tem 3 exercícios de superiores possíveis sem equipamento** (flexão, flexão fechada e pike). Com foco nos superiores, a semana tem em média **1,9 exercício diferente de superiores**; o mesmo exercício aparece em todos os dias em 69,3% dos programas. A pesquisa (3 pesquisadores, `docs/pesquisa-v2/16-corpo-livre-e-casa.md`) achou **7 exercícios novos que valem a pena** e um punhado de degraus de escada; com os 7, num protótipo descartável, a semana passa a ter **5,3 exercícios diferentes de superiores**, os dias com até 4 exercícios caem de 35,2% para 18,1%, e o bíceps e o ombro de trás saem do zero. **As costas continuam sem saída honesta** (nenhum estudo de porta, toalha, lençol ou mesa; e o dado novo sobre treinar pendurado em casa é de lesão). O custo medido: com 30 minutos, mais dias passam do tempo (42% → 71,3% dos programas), o que pede o ajuste de 30 min da frente A junto.

## Como foi feito

- **Grade só de corpo livre** (script descartável no rascunho, com o gerador da `main`): inventário vazio × 3 níveis × 2 a 6 dias × a divisão recomendada e cada divisão oferecida × 30 a 90 min × 32 combinações de foco (nenhum, cada grupo, os 21 pares, "superiores" = peito+costas+ombros+braços, "inferiores", peito+ombros+braços) × dor (nenhuma, e nota 4 e 7 em cada uma das 7 regiões, nos casos sem foco e com foco nos superiores) = **15.300 programas**, 8.160 sem dor ("limpos"). Roda em 18 s.
- **Protótipo:** uma cópia de `src/domain/` no rascunho, com os candidatos que a pesquisa aprovou acrescentados a `exercicios.json` e `funcoes.json`. A cópia sem mudança dá exatamente a mesma grade que o repositório (conferido byte a byte). Três pacotes medidos separados e juntos.
- **Pesquisa:** 3 subagentes em paralelo (empurrar; puxar e isolar; pernas, métodos e divisão), com o mesmo briefing e sem a hipótese do orquestrador, partindo de `pesquisa-v2/10-equipamento-minimo.md`. 58 PMIDs conferidos pelo orquestrador no PubMed (58 de 58 com autor, ano e título batendo; 1 retratado, já sinalizado pelo pesquisador).

## 1. O que existe hoje

- **Biblioteca:** 13 dos 139 exercícios precisam só de "apoio" (parede, porta, cadeira: `CAPACIDADES.apoio` em `src/domain/taxonomia/equipamentos.ts`), todos com animação. Superiores: `flexao`, `flexao-fechada`, `pike`. Pernas: agachamento, afundo, búlgaro, flexão de joelho deslizante, nórdico, ponte, abdução e adução deitado, panturrilha no chão. Abdômen: abdominal no chão.
- **Funções** (`src/domain/gerador/funcoes.json`): sem equipamento ficam **vazias** `puxar-vertical`, `puxar-horizontal`, `ombro-posterior`, `biceps`, `elevacao-lateral`, `crucifixo`, `triceps-acima-cabeca` (que é obrigatória, `selecao.triceps-acima-cabeca`), `extensora` e `dobrar-quadril`.
- **Divisão:** sem nenhum exercício de puxar, `divisao.sem-puxar` recomenda o corpo todo (70,6% dos programas com foco nos superiores saem de corpo todo; os outros são as divisões escolhidas à mão).
- **O tempo que sobra** (`tempo.sobra-series`) vira série nos músculos possíveis: com foco nos superiores, as pernas, que não são foco, recebem 12 séries por semana contra a meta de 6 (pesquisador 3). É por isso que o treino "parece de pernas".
- **As escadas** (`src/domain/progressao/escadas.json`) já usam várias variações como degraus de dificuldade do mesmo exercício (flexão com os pés elevados, déficit, pike com os pés na cadeira, búlgaro no degrau, 1,5 repetição, pausa, descida lenta).

## 2. O que falta, medido

**Linha de base, 15.300 programas de corpo livre** (os "limpos" não têm dor):

| Medida | Hoje |
|---|---:|
| Dias com até 3 exercícios, 45 min ou mais (limpos) | 22,6% |
| Dias com até 4 exercícios, 45 min ou mais (limpos) | 35,2% |
| Programas cujo dia mais longo usa menos de 70% dos minutos (45+, limpos) | 28,3% |
| O mesmo exercício em todos os dias (limpos) | 69,3% |
| Programas com algum dia acima dos minutos (limpos) / com 30 min | 9,1% / 42% |
| Exercícios diferentes na semana (limpos) | 10,1 |
| **Com foco nos superiores:** exercícios por dia / exercícios diferentes de superiores na semana | 4,5 / **1,9** |
| Com foco nos superiores: fatia das séries que vai para os superiores | 30% |
| Costas, bíceps, ombro de trás com 0 série | 100%, 100%, 100% |
| Ombro lateral com 0 série (o resto é a meia série do pike) | 64% |

**O caso do Gustavo** (intermediário, 3 dias, 60 min, foco peito+costas+ombros+braços): Corpo todo A (46 min) flexão 2, flexão fechada 4, agachamento 4, flexão de joelho deslizante 4, abdominal 2; B (53 min) flexão 2, pike 2, búlgaro 4, nórdico 4, panturrilha 4, abdominal 2; C (56 min) flexão 2, flexão fechada 4, afundo 4, ponte 2, flexão de joelho 4, abdominal 2. Por semana: peito 14, tríceps 12, ombro lateral 1, bíceps 0, ombro de trás 0, costas 0; quadríceps, posteriores e glúteo 12 cada. Com 4 dias, os dias têm 5 exercícios e 36 a 52 min.

## 3. O que a evidência diz

Detalhe, buscas registradas e tabelas completas em `docs/pesquisa-v2/16-corpo-livre-e-casa.md`.

| Pergunta | Resposta | Selo | Fontes (status) |
|---|---|---|---|
| Carga baixa perto da falha cresce como carga alta? | Sim, até ~30–35 repetições (já no projeto). | robusta; moderada (o teto) | `schoenfeld2017b`, `lopez2021`, `lasevicius2018` (no projeto) |
| Costas com porta, toalha, lençol, batente, mesa ou puxada no chão | 0 estudo de EMG, crescimento ou segurança (buscas refeitas com o PubMed aberto). | consenso (sem estudo) | buscas registradas em `16`, parte 2 |
| Treinar pendurado em casa machuca? | ~41 mil idas ao pronto-socorro em 10 anos nos EUA com barra fixa (inclusive de porta), quase metade com trauma na cabeça ou no rosto, a maioria em casa. | um estudo | `shabbir2026` (resumo) |
| Bíceps sem carga | Contrair ao máximo sem carga cresceu o braço como a rosca a 70% de 1RM; a co-contração cresceu ~4% em 12 semanas. | um estudo | `counts2016` (resumo; texto completo não lido), `maeo2014` (resumo) |
| Ombro de trás sem carga | A abertura em T de bruços ativa o trapézio médio e inferior; deltoide e crescimento sem carga não medidos. | moderada (EMG do trapézio); consenso | `ekstrom2003` e outros 2 em `16`, parte 2 |
| Tríceps acima da cabeça sem aparelho | A extensão com o peso do corpo deixa o ombro na mesma faixa da extensão na suspensão; o braço acima da cabeça cresceu mais o tríceps. | um estudo (posição); consenso (a versão sem aparelho) | `maeo2023`, `brandao2020` (no projeto) |
| Variações de flexão | Mudam pouco a ativação; a flexão com os pés elevados é mais pesada (mais % do peso do corpo), sem medida de que trabalhe mais a parte de cima do peito; o arqueiro carrega mais um lado. | um estudo cada (EMG e carga) | `intziegianni2026`, `kowalski2022`, `gouvali2005`, `freeman2006` e outros em `16`, parte 1 |
| Panturrilha no degrau (alongada) | A panturrilha em pé e as parciais no alongamento cresceram mais; com o peso do corpo, uma perna e descida lenta, cresceu. | um estudo (coerentes) | `kinoshita2023`, `kassiano2023b`, `goli2026`, `larsen2025a`, `nakamura2025` (no projeto) |
| Métodos (cadência, pausa, pré-exaustão, isometria) | A cadência quase não muda a hipertrofia; nenhum método avançado cresce mais que séries comuns; isometria no comprimento longo ≈ repetição completa. | moderada | `hermann2026`, `cowley2026`, `enes2025` e outros em `16`, parte 3 |
| Divisão | Com o mesmo volume, a divisão não muda o crescimento. | robusta | `pesquisa-v2/01` |

## 4. Valor para quem usa

- **Quem treina em casa sem nada** (Elisa, Fábio, e o Gustavo no teste): é o maior ganho desta sessão inteira para esse público. Com o protótipo, o Fábio passa de dias com 4 exercícios (33 min) para 6 exercícios (44 a 45 min) em todos os dias; a Elisa ganha a extensão de tríceps, a rosca sem carga e a panturrilha no degrau.
- **Quem quer foco nos superiores sem equipamento:** a semana passa de 1,9 para 5,3 exercícios diferentes de superiores, e o bíceps e o ombro de trás saem do zero (12 e 4 a 8 séries por semana no caso do Gustavo). **As costas continuam a zero**: o app continua dizendo que falta algo para puxar e que um elástico resolve (`pesquisa-v2/10`, [opinião]).
- **Quem tem equipamento** (Bruno, Carla): nada muda.
- **Iniciante:** com a complexidade 3 proposta, a flexão com os pés elevados não entra no 1º programa (ele chega a ela pela escada da flexão).

## 5. Opções

Medidas na grade de 15.300 programas (os percentuais são dos programas "limpos"; "45+" = 45 min ou mais).

| Pacote | O que entra | Efeito medido | Esforço | Risco | Regra / dado / estado | Choque |
|---|---|---|---|---|---|---|
| **E. Empurrar** | `extensao-triceps-peso-corpo` (nível 3 de `triceps-acima-cabeca`); `flexao-pes-elevados` (nível da `flexao` em `empurrar-horizontal` e `empurrar-inclinado`, complexidade 3); o arqueiro como degrau no fim da escada da flexão | superiores diferentes no foco 1,9 → 3,4; o mesmo exercício em todos os dias 69,3 → 58,5%; dias ≤ 4 (45+) 35,2 → 29,7%; com 30 min, acima do tempo 42 → 48,3% | ~1 dia + 2 cartões | baixo; punho e cotovelo na triagem | `selecao.triceps-acima-cabeca` ganha o 3º nível; a escada da flexão: decidir se o degrau "pés elevados" fica | snapshots: Elisa, Fábio (e Diego, se a complexidade for 2) |
| **P. Puxar e isolar** | `rosca-sem-carga` (nível 4 de `biceps`; carga nova `sem-carga`, sem progressão de carga, **só depois de ler o texto completo de `counts2016`**); `abertura-t-deitado` (nível 3 de `ombro-posterior`) | bíceps a zero 100 → 0,6%; ombro de trás a zero 100 → 13,5%; dias ≤ 4 (45+) 35,2 → 26%; uso < 70% (45+) 28,3 → 13,9%; com 30 min, acima do tempo 42 → 59,1% | ~1,5 dia + 2 cartões (+ a leitura) | médio: a rosca sem carga é um estudo só, com 13 pessoas, e o app não mede a força feita; o registro da série muda (sem carga, só repetições e esforço) | carga `sem-carga` em `biblioteca/index.ts` (zod) e no registro da série; texto novo para `equipamento.sem-ancoragem` | o registro sem carga é tela: pedido ao design |
| **L. Pernas e abdômen** | `panturrilha-degrau` (antes de `panturrilha-chao`); `afundo-tras-peso-corpo` (nível 2 de `afundo`); `abdominal-invertido` (nível 2 de `abdomen`, sai com dor lombar); 2 degraus no fim da escada do agachamento | o mesmo exercício em todos os dias 69,3 → 64,3%; panturrilha abaixo da meta 53 → 48,6%; com 30 min, acima do tempo 42 → 38,7% | ~1,5 dia + 3 cartões | baixo; o degrau pede a nota de segurança (mão no corrimão) | `selecao.panturrilha-alongada` ganha o degrau. **Decidir:** "degrau de escada" é apoio (todos têm) ou um item novo no cadastro (muda o inventário: migração). No protótipo ele valeu como apoio, por isso a Ana e o Diego também ganharam a panturrilha no degrau | — |
| **Os três juntos** | E + P + L | dias ≤ 3 (45+) 22,6 → 9,3%; dias ≤ 4 (45+) 35,2 → 18,1%; uso < 70% (45+) 28,3 → 13,6%; **o mesmo exercício em todos os dias 69,3 → 30,8%**; exercícios diferentes na semana 10,1 → 14,2; **foco nos superiores: 4,5 → 5,5 exercícios por dia, 1,9 → 5,3 superiores diferentes, fatia dos superiores 30 → 43%**; **com 30 min, acima do tempo 42 → 71,3%** | ~4 dias + 7 cartões | médio (a soma dos acima) | os três | snapshots: Ana, Diego, Elisa, Fábio; Bruno e Carla iguais |

**O caso do Gustavo com os três pacotes** (intermediário, 3 dias, 60 min, foco nos superiores):
- Corpo todo A (60 min, 7 exercícios): flexão 3, flexão com os pés elevados 2, agachamento 3, extensão de tríceps 4, rosca sem carga 4, flexão de joelho deslizante 3, abdominal 2.
- Corpo todo B (60 min, 8): flexão com os pés elevados 2, pike 2, búlgaro 2, rosca sem carga 4, nórdico 2, panturrilha no degrau 4, abertura em T 4, abdominal invertido 2.
- Corpo todo C (60 min, 7): flexão 2, flexão fechada 3, afundo 3, ponte 2, rosca sem carga 4, flexão de joelho 3, abdominal 2.
- Por semana: peito 12, tríceps 12,5, bíceps **12** (era 0), ombro de trás **4** (era 0), ombro lateral 1, costas 0; quadríceps 8, posteriores 8, glúteo 9 (eram 12: o tempo passou dos músculos que não são foco para os superiores).
- Com 4 dias: 7 exercícios em todos os dias, 56 a 60 min (eram 5, de 36 a 52 min); ombro de trás 8.

**O que não entra, e por quê** (detalhe em `16`): porta com toalha, batente, lençol na porta, mesa, puxada no chão (0 estudo; risco de queda e de a peça ceder); superman (não conta para nenhum músculo do app); rosca isométrica com toalha e auto-resistida (sem como medir nem progredir); mergulho na cadeira (não mudou nenhum programa medido e carrega o ombro); mergulho entre duas cadeiras (podem tombar); parada de mão na parede (queda); pseudo-planche e crucifixo deslizante (sem estudo, risco no punho e no ombro); flexão com palma (é potência); flexão aberta e diamante (não trabalham diferente; viram dica do cartão); ombro lateral sem carga (sem dado no deltoide); sissy squat, good morning, extensão de quadril de bruços, calcanhar elevado, pistol livre, afundo lateral, prancha, dead bug, hollow e Copenhagen (sem ganho medido ou fora das funções; o estudo do Copenhagen que apareceu é **retratado**). **Para o backlog:** resistência manual de um parceiro (há ensaios, mas a dose depende de outra pessoa).

**Uma opção medida e não recomendada:** trocar a divisão para Superior/Inferior quando não há como puxar. O dia de superiores fica com 19 a 29 min e 2 ou 3 exercícios, mesmo com as variações novas de empurrar (pesquisador 3), e a divisão não muda o crescimento com o mesmo volume (robusta). Fica o corpo todo, com um texto que explique por quê.

## 6. Recomendação

**Os três pacotes juntos, num marco próprio de corpo livre, feito junto com o ajuste de 30 minutos da frente A** (o R5a já o prevê), e com a rosca sem carga condicionada à leitura do texto completo de `counts2016`. Se a leitura não sustentar, o pacote P entra só com a abertura em T, e o bíceps continua a zero com o aviso.

Por quê:
1. É a mudança que mais muda o treino de quem não tem nada, e o caso do Gustavo mostra isso exercício por exercício: de 1,9 para 5,3 superiores diferentes na semana, de 5 a 6 para 7 a 8 exercícios por dia com 60 minutos, o bíceps e o ombro de trás saindo do zero.
2. A evidência sustenta cada entrada no nível em que ela entra (um estudo ou consenso, dito no selo), e o que não tem estudo de segurança (porta, mesa, parada de mão) fica de fora com o motivo.
3. Não mexe na lógica "vaga por função" nem no determinismo: só acrescenta opções nas funções que já existem.
4. O custo dos 30 minutos é real (71,3% dos programas de 30 min com um dia acima do tempo), mas a frente A já mediu a correção (proteger com 2 séries e trocar por um isolador do dia), e os dois têm de entrar juntos.

**Ordem dentro do marco:** L e E primeiro (baixo risco, 2,5 dias), depois P (a leitura de `counts2016`, a carga `sem-carga` no registro).

## Pedidos à sessão de design

1. **Cartões textuais dos 7 exercícios novos** (sem animação, como manda o `CLAUDE.md`), com a montagem segura: o degrau com a mão no corrimão; a cadeira encostada na parede para a flexão com os pés elevados; a testa sobre uma toalha dobrada na abertura em T.
2. **Registro de série sem carga** (rosca sem carga): só repetições e esforço, sem o campo de carga. Motivo: a carga `sem-carga` não tem número.
3. **O aviso das costas sem equipamento** com o texto novo (o que falta, por que não há substituto honesto e o que resolve), no mesmo lugar dos avisos de hoje.
4. **Se o degrau virar item de cadastro:** uma linha "Degrau de escada ou soleira firme" na lista de casa (o mesmo pedido A-2 da frente A).

## Pedidos ao domínio

1. Os 7 exercícios em `exercicios.json` e nas funções de `funcoes.json`, com as regras em `regras.md` (`selecao.triceps-acima-cabeca`, `selecao.panturrilha-alongada`, `equipamento.sem-ancoragem`, e a regra nova da rosca sem carga com selo "um estudo").
2. A carga `sem-carga` no esquema da biblioteca e no registro da série, com a progressão por repetições e por esforço (sem sugestão de carga).
3. Os degraus novos **só no fim** das escadas: o degrau é guardado como índice no estado (`esquema.ts:106`), e um degrau no meio mudaria o significado dos registros antigos.
4. Decidir se o degrau "pés elevados" sai da escada da flexão quando a flexão com os pés elevados virar exercício (pergunta do pesquisador 1).
5. O ajuste de 30 minutos da frente A (pacote A) no mesmo marco.

## Fontes novas

56 chaves novas e 4 atualizadas em `docs/pesquisa/fontes.md` (de 368 para 424), todas conferidas no PubMed ou no Crossref nesta sessão; a lista e o papel de cada uma estão em `docs/pesquisa-v2/16-corpo-livre-e-casa.md`. Destaques: `counts2016` (rosca sem carga; texto completo por ler), `shabbir2026` (lesões com barra fixa), `maeo2014` e `maeo2014b` (co-contração), `quintanacepedal2025` (**retratada**, não usar), `suzuki2017` e `mier2014` (NÃO VERIFICADO), `zhang2023pre` (preprint, não sustenta selo). Correção em `ponte-plataforma2025`: é um teste em velocidade máxima, não um treino.

## Como reproduzir

Os scripts ficaram no rascunho da sessão e foram descartados depois dos números. O que cada um mediu:
- `grade.ts`: a grade de 15.300 programas de corpo livre descrita em "Como foi feito", com as medidas da seção 2 e da tabela de opções; lê o domínio por um caminho, para rodar a `main` ou uma cópia.
- `montar.cjs`: copia `src/domain/` e acrescenta os pacotes E, P e L (as entradas JSON estão em `16`, partes 1 a 3).
- `caso.ts` e `personas.ts`: o caso do Gustavo e as 6 personas, antes e depois.
