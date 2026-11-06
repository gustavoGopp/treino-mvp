# Frente G: biblioteca ampliada e treinos que agradam (rodada 2, 06/11/2026)

**Em uma olhada.** O Gustavo pediu uma pesquisa ampla (internet, YouTube, fontes confiáveis) para criar mais opções de exercício, de modo que toda combinação de equipamento, nível, dias, minutos e foco tenha volume suficiente, e que os treinos saiam agradáveis, eficientes e dentro do esperado para cada pessoa. Cinco frentes pesquisaram em paralelo (`docs/pesquisa-v2/17-biblioteca-ampliada.md`); uma delas (G5) montou a **régua** dos testes, em dois níveis: **defeitos** (o programa não deveria sair assim; nenhum pode piorar) e **notas** (gosto e consenso; uma mudança é melhor se melhora alguma sem piorar defeito). Num protótipo descartável com **33 exercícios novos** (de 139 para 172) e três correções de geração, a grade de 108.900 programas dos 55 cenários de equipamento passa de **73,4% para 82,9% dos programas sem dor sem nenhum defeito**, **nenhum defeito piora**, e todas as notas melhoram, **menos uma: os cartões de texto** (exercício sem animação), que sobem de 8,4% para 79,4% dos programas com um dia de 3 ou mais cartões. A saída para isso é animar primeiro os 6 exercícios novos de corpo livre, que respondem pela maior parte. As costas continuam sem saída honesta sem algo para puxar. A revisão cega por um treinador independente está na seção 6.

## 1. Como foi feito

- **A régua** (frente G5, `17`, parte G5, tabela 4.7), medida por script em cada programa. **Defeitos:** A2 dia com menos de 3 exercícios ou sem multiarticular; A3 dia mais longo acima de 110% dos minutos; A4 dia típico abaixo de 70% dos minutos sem o aviso; B1 o mesmo exercício em todos os dias (3 ou mais) havendo outro equivalente do mesmo nível; C1 prioritário abaixo da meta com tempo sobrando (sem dor); D1 empurrar ÷ puxar acima de 1,5 quando há remada ou puxada possível; D3 quadríceps ÷ posteriores fora de 0,5–2 ou sem exercício direto de posteriores, quando os dois são possíveis; E1 músculo não prioritário com 1 a 3 séries havendo exercício e tempo; e os achados de segurança do avaliador (protótipo da frente B). **Notas:** A1 exercícios por dia fora da faixa (30 min: 3–5; 45: 4–7; 60: 5–8; 75 e 90: 5–10; consenso); A5 dia mais curto abaixo de 60% do mais longo; B2 o mesmo exercício em todos os dias sem opção do mesmo nível; B3 dois exercícios ou mais em todos os dias; C2 o foco não passa da mediana dos outros músculos; G1 dia com 3 ou mais cartões de texto. Selo e fonte de cada limite em `17`, G5, 4.7.
- **A grade:** os 55 cenários de equipamento de `scripts/auditoria/cenarios-55.ts` × 3 níveis × 2 a 6 dias (a divisão recomendada) × 30, 45, 60 e 90 min × 11 focos (nenhum, cada grupo, superiores, inferiores, peito+costas) × 3 situações de dor (nenhuma, ombro 7, joelho 7) = **108.900 programas**, 36.300 sem dor. Roda em ~2 min.
- **As personas:** as 6 de `tests/personas/` e 12 novas, fictícias, de perfis típicos (iniciante sem nada; intermediário sem nada com foco nos superiores, o caso do Gustavo; intermediária com elásticos e foco em glúteo; avançado com barra de porta; halteres leves com 30 min; kettlebell; fita de suspensão; mini-band e step; e outros).
- **As versões medidas,** cada uma numa cópia de `src/domain/` no rascunho (a cópia sem mudança dá o mesmo resultado que o repositório):

| Versão | O que muda | Sem defeito (sem dor) |
|---|---|---:|
| hoje (`main`) | — | 73,4% |
| rodada 1 | os 7 exercícios de corpo livre de `16` | não refeita depois da correção da régua (seção 1); a rodada 1 sozinha está medida em `f-corpo-livre.md` |
| biblioteca toda | rodada 1 + 20 da rodada 2 + 7 de equipamento de um item só | 78,3% |
| + "animado primeiro" | o desempate prefere o exercício animado à variedade | 52,6% (**descartada**: o mesmo exercício em todos os dias havendo opção vai de 0,3% a 29,5%) |
| + o pacote A do R5a | o ajuste de 30 min e "descer um nível antes de repetir" (frente A) | 81,1% |
| **final** | biblioteca sem o crucifixo no chão; o ajuste de 30 min e o corte de tempo respeitam o equilíbrio da coxa | **82,9%** |

## 2. As decisões técnicas tomadas pela sessão (o Gustavo pediu para não decidir as questões técnicas)

Cada uma com o motivo; todas medidas na grade.

1. **Variações equivalentes passam a entrar, mesmo sem abrir vaga nova** (antes, `11-catalogo-completo.md` recusava o que "só duplica"). Motivo novo: o pedido de variedade do Gustavo, e a evidência de que variar melhora o prazer e a motivação sem mudar a hipertrofia (moderada, `bazvalle2019`, `kassiano2022`). Medido: o mesmo exercício em todos os dias sem alternativa cai de 44,1% para 18,3% dos programas sem dor.
2. **Flexão com os pés elevados com complexidade 3:** o iniciante chega a ela pela escada da flexão, não no 1º programa (a carga é maior que a da flexão comum; pesquisador 1 de `16`).
3. **Panturrilha no degrau vale como "apoio"** (todo mundo tem um degrau ou soleira, ou faz no chão, como diz o cartão), sem item novo no cadastro nem migração.
4. **A rosca sem carga entra no protótipo, mas continua condicionada** à leitura do texto completo de `counts2016` antes de ir para o app (um estudo, 13 pessoas; o resumo não dá séries nem repetições).
5. **Barra fixa só na descida** entra no fim de `puxar-vertical`: só aparece como alternativa, e o programa de quem já faz a barra não muda.
6. **Elevação lateral deitado de lado num nível próprio,** depois da elevação com halteres: entra como alternativa, sem pôr mais um cartão nos dias da academia (onde 87% dos programas já têm um dia com 3 ou mais).
7. **Ficam de fora:** a elevação lateral apoiada na parede sem carga (nenhum dado no deltoide; a recusa de `16` continua); o crucifixo no chão com halteres (recusa antiga reaberta pela frente G3; medido: tirava os multiarticulares do dia de empurrar do iniciante com 30 min); a panturrilha com halter numa perna para quem só tem halteres (a mudança de `requer` proposta pela G3 alongava o dia e o corte tirava séries de quadríceps; a panturrilha no degrau já dá o alongamento em casa).
8. **"Animado primeiro" descartado** (seção 1): ele resolveria os cartões trocando um defeito com evidência (repetir havendo opção) por uma nota de opinião.
9. **Duas proteções do equilíbrio da coxa** (0,5–2 de quadríceps ÷ posteriores, consenso, `green2018`): no ajuste de 30 min da frente A, que trocava o único exercício direto de posteriores por outro isolador; e no corte de tempo de `cortarTempo`, que cortava séries de posteriores quando os exercícios novos de superiores ocupavam o dia. Medido: o defeito da coxa sai de 1,6% (hoje) e de 3,4% (com o pacote A sem a proteção) para 0%.
10. **Lote 3 (um equipamento só: caneleiras, mini-band, kettlebell, suspensão)** entra junto: custa pouco e fecha vagas dos itens sozinhos (a frente G3 o deixava para o backlog).

## 3. O resultado, medido

**Grade de 108.900 programas, os 36.300 sem dor:**

| Medida | Tipo | Hoje | Final |
|---|---|---:|---:|
| Programas sem nenhum defeito | — | 73,4% | **82,9%** |
| A2 dia com menos de 3 exercícios ou sem multiarticular | defeito | 7,5% | 1,7% |
| A2 (só "sem multiarticular") | defeito | 1,5% | 1,5% |
| A3 dia acima de 110% dos minutos | defeito | 9,8% | 8,7% |
| A4 dia típico abaixo de 70% sem aviso | defeito | 5,3% | 5,1% |
| B1 repete havendo outro do mesmo nível | defeito | 0,3% | 0,3% |
| C1 foco abaixo da meta com tempo | defeito | 4,1% | 1,4% |
| D1 empurra demais | defeito | 0,9% | 0,9% |
| D3 coxa desequilibrada | defeito | 1,6% | **0%** |
| A1 exercícios por dia fora da faixa | nota | 24,1% | 10,8% |
| A5 dias muito desiguais | nota | 22,5% | 14,6% |
| B2 repete sem alternativa | nota | 44,1% | 18,3% |
| B3 dois exercícios em todos os dias | nota | 14,4% | 8,5% |
| C2 foco que não aparece | nota | 33,0% | 28,5% |
| G1 dia com 3 ou mais cartões de texto | nota | **8,4%** | **79,4%** |
| Exercícios por dia (média) | — | 5,18 | 5,69 |
| Exercícios diferentes por semana | — | 12,9 | 16,2 |
| Prescrições sem nenhuma alternativa | — | 54,3% | 32,4% |
| Funções com 0 opção, somando os 55 cenários / com 1 | — | 348 / 509 | 245 / 383 |

**Por grupo de cenário** (sem dor; "sem defeito" e exercícios diferentes por semana):

| Grupo | Cenários | Sem defeito | Exercícios por dia | Diferentes por semana | 3+ cartões |
|---|---:|---|---|---|---|
| atalhos (casa, condomínio, academia, com e sem +) | 6 | 57,6% → 64,1% | 6,06 → 6,06 | 20,2 → 21,6 | 46,5% → 71,4% |
| personas (Ana, Bruno, Carla, Diego, ...) | 6 | 59,2% → 64,7% | 5,93 → 5,96 | 17,9 → 20,4 | 19,3% → 64,1% |
| sem nada | 1 | 89,8% → 92,3% | 4,91 → **5,70** | 9,5 → **13,5** | 0% → 87,3% |
| um item só | 38 | 79,0% → 90,3% | 4,86 → **5,57** | 10,7 → **14,4** | 1,1% → 85,2% |
| pares de casa | 4 | 60,8% → 65,8% | 5,85 → 5,87 | 16,5 → 19,4 | 6,6% → 57,7% |

Casa, elásticos e só halteres: o mesmo exercício em todos os dias sem alternativa vai de 20% a **0%**. Academia: quase nada muda (já tinha tudo).

**O caso do Gustavo** (intermediário, sem nada, 60 min, foco nos superiores):
- 3 dias, hoje: 5, 6 e 6 exercícios, 46 a 56 min; bíceps 0, ombro de trás 0. **Final:** 7, 8 e 7 exercícios, 60 min; Corpo todo A: flexão, flexão com os pés elevados, agachamento, extensão de tríceps, rosca sem carga, flexão de joelho deslizante, abdominal; bíceps 12, ombro de trás 4, peito 12, tríceps 12,5.
- 4 dias, hoje: 5 a 6 exercícios, 36 a 52 min. **Final:** 7 exercícios em todos os dias, 56 a 60 min; ombro de trás 8; pernas 12 cada.
- Costas: 0 nas duas versões, com o aviso.

**As 18 personas** (exercícios por dia; o que muda):
- Fábio (só barra fixa): 4, 6, 4, 6 → **6, 6, 6, 6** (33 a 45 min → 44 a 45).
- Elisa (sem nada, 30 min): 4, 4, 3 → 4, 4, 4.
- Avançado sem nada com 5 dias: 4, 4, 6, 5, 4 (26 a 55 min) → **5, 6, 6, 6, 6** (45 a 53 min).
- Iniciante sem nada: exercícios diferentes 9 → 12; elásticos com foco nos superiores 15 → 18; barra de porta 19 → 24; mini-band e step 12 → 16.
- Bruno, Carla, Diego, Ana: quase iguais (1 a 2 exercícios diferentes a mais na semana).
- **Duas personas ganham um defeito**, apesar da melhora no agregado: a intermediária com elásticos e foco em glúteo tem um dia de 50 min em 45 (A3); a intermediária com halteres e banco e foco em peito e ombros passa a empurrar mais de 1,5 vez o que puxa (D1). E a Ana continua com o B1 que já tinha (repete o mesmo exercício havendo opção). Os três vão para o marco como casos a corrigir.

## 4. A fila de animação (o custo dos cartões)

Programas sem dor em que cada exercício novo aparece (de 36.300):

| Exercício | Programas | % |
|---|---:|---:|
| Panturrilha no degrau | 29.700 | 81,8% |
| Extensão de tríceps com o peso do corpo | 21.472 | 59,2% |
| Rosca sem carga | 20.885 | 57,5% |
| Abdominal invertido | 20.317 | 56,0% |
| Flexão com os pés elevados | 19.528 | 53,8% |
| Abertura em T deitado | 17.121 | 47,2% |
| Elevação lateral unilateral com halter | 5.935 | 16,3% |
| Afundo para trás sem peso | 3.617 | 10,0% |
| Os outros 25 | de 3.021 a 18 | 8,3% a 0% |

Os 6 primeiros são de corpo livre e valem em todo cenário (pedem só apoio): eles respondem pela maior parte dos cartões. **Animá-los primeiro** (as animações de panturrilha, flexão e abdominal já existem e servem de base; `16`, pesquisador 3) devolve o guia animado à maioria dos programas sem tirar a variedade.

## 5. O que fica, e o que não se resolve com exercício

- **Costas sem algo para puxar:** nenhum programa de treinador, nenhum vídeo com credencial e nenhum estudo dá uma saída honesta (G1, G2, G4; `16`). Continua o aviso, com o texto novo (`equipamento.sem-ancoragem`).
- **As vagas que dependem de equipamento** (puxar sem ancoragem, extensora sem carga, ombro lateral sem peso, panturrilha sentada): 52 nos 10 equipamentos mínimos (G3).
- **Os 30 minutos:** 8,7% dos programas ainda têm um dia acima de 110% dos minutos (eram 9,8%).
- **O foco que não aparece** (C2, 28,5%) é sobretudo do desenho das metas (o iniciante tem meta 8 para o foco e 6 para os outros) e da competição entre focos: é a frente A (o 2º exercício do prioritário) e a pergunta da G5 sobre a meta do iniciante.

## 6. Revisão cega por um treinador independente

*(Preenchida quando a revisão voltar.)*

## 7. Opções

| Opção | O que entra | Esforço | Risco | Estado guardado | Choque |
|---|---|---|---|---|---|
| **1. Biblioteca ampliada inteira + as proteções** | os 33 exercícios com cartão textual e as funções; as 2 proteções da coxa; com o pacote A do R5a | ~5 a 6 dias (dado, cartões, regras, testes, a régua na auditoria) | médio: muda os snapshots de todas as personas que treinam fora da academia; 33 cartões novos | nada (a rosca sem carga precisa da carga `sem-carga` no registro: conferir; se pedir versão nova, junta com a v8) | as telas dos cartões e do registro sem carga são do design |
| 2. Só corpo livre (a rodada 1, o R5-CL anterior) | os 7 de `16` | ~4 dias | médio | idem | idem |
| 3. Biblioteca sem o lote 3 | 26 exercícios | ~4,5 dias | médio | idem | idem |
| + **Animação dos 6 de corpo livre** (em qualquer opção) | as 6 animações mais prescritas, a partir das que existem | sessão de animação, com regressão visual | o de toda animação nova | nada | é da fila do R5 de animação |

## 8. Recomendação

**Opção 1, com a animação dos 6 exercícios de corpo livre logo em seguida.** É a única que cobre o pedido do Gustavo ("todas as combinações"): o corpo livre e os itens sozinhos são os que mais ganham (exercícios por dia de 4,9 para 5,6 a 5,7; exercícios diferentes por semana de 10 para 14), sem piorar nenhum defeito, e a academia fica como está. O custo dos cartões é real e conhecido, e se paga com 6 animações.

## Pedidos à sessão de design

1. **Os 33 cartões textuais**, com a montagem segura de cada um (os de corpo livre em `16`; os de equipamento em `17`, G3 e G4). Motivo: 79,4% dos programas terão um dia com 3 ou mais cartões até as animações chegarem; o cartão precisa ser bom.
2. **A fila de animação** desta seção 4, começando pelos 6 de corpo livre.
3. **O registro de série sem carga** (rosca sem carga) e **o aviso das costas** com o texto novo (os mesmos pedidos de `f-corpo-livre.md`).
4. **Referências visuais** para os cartões: os vídeos de canais com credencial listados em `17`, G2, seção 6 (para o autor do cartão; o app não usa vídeo).

## Pedidos ao domínio

1. Os 33 exercícios em `exercicios.json` e `funcoes.json`, nos níveis da seção 2 e de `17` (G3, "Onde cada um entra"), com as regras em `regras.md`.
2. **A proteção da coxa no corte de tempo** (`cortarTempo`, `cabe`) e no ajuste de 30 min do R5a: nenhum corte tira quadríceps ÷ posteriores de 0,5–2, salvo se já estava fora. Teste: 0 programa com D3 na grade.
3. **A régua da G5 em `scripts/auditoria/qualidade.ts`** (os defeitos e as notas desta seção 1), com a regra "nenhum defeito piora" como teste da auditoria.
4. Os três casos de persona da seção 3 (A3 da intermediária com elásticos, D1 da intermediária com peito e ombros, B1 da Ana) como testes do marco.
5. A ancoragem do elástico (G3: não existe capacidade; hoje o cartão diz onde prender) e o aviso de segurança do elástico com a fonte nova (`ng2022`, série de casos de lesão de olho; G4).

## Como reproduzir

Os scripts ficaram no rascunho da sessão e foram descartados depois dos números. O que cada um mediu:
- `banco.ts` + `regua.ts`: a grade de 108.900 programas, a régua da G5 (defeitos e notas), as opções por função em cada cenário e as 18 personas; lê o domínio por um caminho (a `main` ou uma cópia).
- `montar2.cjs`: copia `src/domain/` e acrescenta os exercícios da rodada 1, da rodada 2 e do lote 3; `tirar.cjs` tira um exercício.
- `diff-def.ts`: acha os perfis em que um defeito aparece numa versão e não na outra, com os exercícios que entraram.
- As proteções da coxa foram escritas na cópia do gerador da frente A (que bate com o repositório sem nenhuma chave ligada: mesmo resultado em todos os 108.900 programas).
