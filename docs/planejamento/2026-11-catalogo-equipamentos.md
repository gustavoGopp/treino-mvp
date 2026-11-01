# Equipamentos e exercícios: o que o app aproveita hoje e o que falta (01/11/2026)

> Pedido do Gustavo: antes de qualquer outra coisa, avaliar se o app aproveita os equipamentos disponíveis, livres e máquinas, e se há opções para quem tem mais equipamento do que o app oferece hoje.
>
> Marcações: **[medido]** = medido nesta sessão rodando o gerador real com scripts temporários, fora do repositório; **[fonte]** = lido numa fonte ("não verificado" quando só vi o resumo da busca); **[opinião]** = avaliação minha. Nenhum código foi alterado.

## 1. Resumo

1. O app conhece **25 equipamentos** e **73 exercícios**. Mas, numa academia completa, o gerador usa só **32 dos 60 exercícios possíveis**, e as máquinas ocupam **8%** dos exercícios do programa **[medido]**.
2. **A causa não é falta de exercício, é o jeito de montar o treino.** Os modelos de cada dia têm vagas fixas, copiadas do programa de referência (uma academia de prédio). Por exemplo:
   - não existe vaga para extensora de joelho, então a **cadeira extensora nunca entra**;
   - não existe vaga de glúteo isolado;
   - a vaga de ombro lateral "prefere polia".

   Quem tem academia completa recebe, na prática, um programa de academia de prédio **[medido]**.
3. **Há buracos no catálogo:**
   - **glúteo** tem **um único** exercício principal (a ponte);
   - **paralelas** e **tornozeleira** estão na lista de equipamentos, mas **nenhum exercício as usa**;
   - faltam aparelhos comuns: puxador alto, voador (peck deck), máquinas articuladas de peito, ombro e remada, cadeira abdutora e adutora, hack, graviton, banco romano e kettlebell **[medido]**.
4. **Pela evidência, máquina e peso livre dão o mesmo crescimento muscular** (meta-análise de 13 estudos). Então "mais opções" não faz crescer mais por si só. O ganho real está em:
   - encaixar no que a academia tem;
   - ter alternativa quando o aparelho está ocupado;
   - estabilidade para quem está aprendendo;
   - cobrir músculos que hoje ficam mal servidos (glúteos, quadríceps isolado, ombro posterior);
   - poder variar, o que ajudou a motivação num estudo pequeno.
5. **Proposta:** um marco **R0** antes do R1, em duas partes:
   - **um gerador que se adapta ao equipamento:** vagas extras quando o equipamento e o tempo permitem, e máquina tratada como igual ao peso livre;
   - **um catálogo ampliado:** cerca de 12 equipamentos e 25 exercícios novos, escolhidos por valor.

   Os exercícios novos de máquina entram primeiro como **cartão de texto**. A animação deles depende de desenhar as máquinas no motor, que é a parte cara.

## 2. O que existe hoje

### Equipamentos (25 itens) e quantos exercícios usam cada um

| Grupo | Itens | Exercícios que usam |
|---|---|---|
| Halteres | halteres fixos; anilhas e manoplas | 19 |
| Polia | polia dupla; polia simples; corda; triângulo; barra reta; estribo; **tornozeleira** | 6 (polia alta) a 6 (polia baixa); tornozeleira: **0** |
| Bancos | reto; regulável (declina ou não) | 7 |
| Barras | barra fixa; barra longa; barra W; **paralelas** | barra fixa 3; barra longa 5; barra W 1; paralelas: **0** |
| Máquinas | rack; smith; leg press; cadeira extensora; mesa flexora; cadeira flexora | rack 3; smith 1 (só a remada invertida); leg press 2; cada cadeira e mesa: 1 |
| Outros | elásticos; step; bola suíça; esteira | elásticos 12; step 2; bola 1; esteira 0 (cardio) |

### Exercícios por músculo principal [medido]
- 11 a 12 exercícios: peito, costas, quadríceps.
- 9 exercícios: posteriores.
- 4 a 6 exercícios: bíceps, tríceps, panturrilha, abdômen.
- 3 exercícios cada: ombro lateral, ombro posterior.
- **1 exercício: glúteos.**
- **Nenhum:** adutores, glúteo médio, lombar, trapézio e antebraço não existem como músculo no app.

### O que o gerador escolhe numa academia completa [medido]

Rodei 144 programas para a persona Carla (academia completa): 3 níveis × 4 opções de dias × 4 durações × 3 escolhas de prioridade.

- **Possíveis com o equipamento:** 60 dos 73 exercícios.
- **Usados em algum programa:** 32.
- **Nunca escolhidos, mesmo podendo:** 28. Entre eles estão a cadeira extensora, a mesa flexora, o agachamento com halteres, o desenvolvimento com barra, a remada com barra, a rosca com barra W, o tríceps na barra reta e a ponte de glúteo.
- **Por tipo de equipamento, nos exercícios dos programas:** polia 40%, halter 34%, barra 9%, peso do corpo 9%, **máquina 8%**.

**Por quê** (no código, `src/domain/gerador/divisoes.ts` e `index.ts`):
- cada dia tem uma lista fixa de vagas por padrão de movimento, e os modelos não mudam com o equipamento;
- **nenhum modelo tem vaga "isolador de quadríceps"**, e não existe padrão de glúteo isolado;
- algumas vagas preferem um equipamento específico (ombro lateral → polia);
- cada exercício tem uma "ordem" fixa na biblioteca que desempata sempre igual.

O resultado é previsível e testável, o que é bom. Mas ele não usa a riqueza de uma academia maior.

## 3. O que a evidência diz sobre "mais opções"

| Pergunta | O que encontrei | Selo **[fonte]** |
|---|---|---|
| Máquina rende menos que peso livre? | Não, no crescimento muscular. Meta-análise com 13 estudos e 1.016 pessoas: hipertrofia igual (diferença padronizada de −0,06, sem significância). A força melhora mais no tipo de equipamento treinado. Os autores concluem que a escolha é de preferência e objetivo. ([Haugen et al. 2023](https://doaj.org/article/a7282dba5e674176bde2a8239832d2f7); já em `regras.md` como `haugen2023`) | moderada |
| Variar os exercícios ajuda? | Num estudo com 21 homens treinados por 8 semanas, variar os exercícios a cada sessão deu ganhos parecidos e **mais motivação**. Uma crítica aponta que o quadríceps cresceu mais no grupo fixo. ([Baz-Valle et al. 2019](https://doaj.org/article/725137a4c8ff4d64bec855877e948480), não verificado). O projeto já tem `selecao.variacao` (manter os exercícios no bloco e complementar). | um estudo |
| Flexora sentada ou deitada? | Sentada, 12 semanas: posteriores +14% contra +9% na deitada, atribuído ao músculo mais alongado. Um resumo secundário diz que a diferença não foi significativa. ([Maeo et al. 2021](https://pubmed.ncbi.nlm.nih.gov/33009197/), não verificado). Reforça preferir a **cadeira** flexora quando houver. | um estudo |
| Hip thrust é melhor para glúteo? | Contra o agachamento, crescimento do glúteo **parecido**. O agachamento cresceu mais o quadríceps e os adutores. 34 pessoas não treinadas, 9 semanas. ([Plotkin et al. 2023](https://pubmed.ncbi.nlm.nih.gov/37877099/), não verificado). Útil como opção de glúteo que carrega pouco o joelho, não como exercício "superior". | um estudo |
| Mais equipamento = mais resultado? | Não encontrei estudo. Pelo que está acima, o resultado vem de volume e esforço (as regras robustas do projeto). O equipamento muda o **encaixe**, a **adesão** e a **cobertura** dos músculos. | [opinião] |

**Prática de mercado.** Apps como o Fitbod deixam a pessoa montar um "perfil de academia" com o equipamento que tem, e recomendam só exercícios compatíveis. Para algumas redes de academia, o perfil já vem pronto **[fonte]** ([guia do Fitbod](https://help.fitbod.me/hc/en-us/articles/31891505074711-Welcome-to-Fitbod-A-Guide-for-Bannatyne-Members), não verificado). Não encontrei a lista completa de equipamentos deles. Nas lojas e em orçamentos de academia no Brasil aparecem com frequência: peck deck, cadeira abdutora e adutora, hack, graviton, puxador alto e remada **[fonte]** ([orçamento de montagem](https://form.jotform.com/61616630519657), [ArchiExpo](https://www.archiexpo.com/pt/fabricante-arquitetura-design/aparelho-musculacao-cadeira-abdutora-49197.html), não verificados; não achei uma lista oficial).

## 4. O que acrescentar, em ordem de valor

Critérios, em ordem:
1. fecha um buraco de músculo ou de padrão de movimento;
2. aparece em muitas academias;
3. dá alternativa quando o aparelho está ocupado;
4. custo: dados e texto são baratos; a animação de máquina é cara.

### Parte A. Gerador que aproveita o equipamento (sem equipamento novo)

| # | Mudança | Por quê | Esforço |
|---|---|---|---|
| A1 | **Vagas extras** quando o equipamento e o tempo permitem: extensora de joelho, glúteo isolado e um 2º exercício de posteriores | Cadeira extensora nunca entra; glúteo só tem a ponte; Carla fica com posteriores em 8 de 14 com tempo sobrando **[medido]** | M |
| A2 | **Máquina com o mesmo peso que o peso livre** na escolha; para iniciante, a máquina estável ganha um pouco (já é a regra `selecao.estabilidade`) | Haugen 2023: mesmo crescimento | P |
| A3 | Vaga de ombro lateral **sem preferir polia**; vagas com preferências de **função** ("alongado", "apoiado"), e não de equipamento | Hoje o modelo copia o programa de referência | P |
| A4 | **Alternativas de outro equipamento** para cada exercício (já existe; ganha mais opções) | Aparelho ocupado é a troca mais comum na academia **[opinião]** | P |
| A5 | **Usar o que já está no catálogo e nunca entra**: mergulho nas paralelas, coice e abdução na polia com tornozeleira, exercícios no smith | Equipamento marcado sem uso | P (dados) |

**Cuidado obrigatório:** o critério 2 (programa de referência, 80% iguais) **precisa continuar passando**. O cenário do Gustavo não pode piorar porque a academia completa melhorou. Isso é testável: o teste privado roda a cada mudança.

### Parte B. Catálogo ampliado

**Equipamentos novos (proposta: 12)** **[opinião]**, priorizados:

| Equipamento | O que abre | Músculo ou buraco que fecha |
|---|---|---|
| Puxador alto (estação de puxada) | Puxada aberta, fechada e supinada | Puxada vertical sem barra fixa |
| Voador (peck deck) | Voador para peito e voador invertido | Peito isolado e **ombro posterior** (3 opções hoje) |
| Cadeira abdutora e adutora | Abdução e adução | **Glúteo médio** e adutores (inexistentes hoje) |
| Hack (agachamento articulado) | Hack squat | Quadríceps com estabilidade |
| Máquinas articuladas (peito, ombro, remada) | Supino, desenvolvimento e remada na máquina | Opções estáveis para iniciante |
| Graviton (barra assistida) | Barra fixa e mergulho assistidos | Puxada vertical para quem ainda não faz barra |
| Banco romano (hiperextensão) | Extensão de quadril no banco romano | Glúteos e posteriores, com outra opção para a lombar |
| Panturrilha em pé (máquina) | Panturrilha com carga alta | Panturrilha quando o halter é leve |
| Kettlebell | Swing, goblet com kettlebell | Casa e academias pequenas |
| Suspensão (tipo TRX) | Remada e flexão na suspensão | Casa: puxar sem barra |
| Banco Scott | Rosca Scott | Bíceps com opção apoiada |
| Multiestação doméstica | Puxada, remada, voador, extensora numa peça | Comum em prédio e casa **[opinião]** |

**Exercícios novos (proposta: ~25):**
- os que esses equipamentos abrem;
- os que faltam com o que já existe:
  - hip thrust com halter ou barra;
  - mergulho nas paralelas;
  - coice e abdução na polia;
  - agachamento, supino inclinado e hip thrust no smith;
  - elevação pélvica unilateral;
  - remada curvada com halteres.

**Músculos novos:** "glúteo médio" e "adutores" entram só se houver meta de volume com fonte. Senão, os exercícios contam para "glúteos" e "quadríceps", como meia série indireta. Proposta: começar **sem** músculo novo e decidir na pesquisa do R0 **[opinião]**.

**A parte cara, as animações:**
- o motor não tem desenho de nenhuma máquina hoje: leg press, cadeiras e o resto aparecem como cartão de texto;
- cada exercício novo entra primeiro com **cartão de texto** (setup, execução, dicas, erros), com fonte, como manda o `CLAUDE.md`;
- a animação vem depois, pelo ritual de aprovação, e só para os que aparecerem nos seus programas.

## 5. Como saber se ficou melhor (critérios do R0)

| Medida | Hoje **[medido]** | Meta proposta |
|---|---|---|
| Exercícios distintos usados numa academia completa (os mesmos 144 programas) | 32 de 60 | 45 ou mais |
| Máquinas nos programas de academia completa | 8% | Sem meta fixa: a evidência diz que tanto faz. Medir e mostrar. |
| Carla (avançada, academia completa, 5 × 75 min, prioridade pernas): posteriores e panturrilha | 8/14 e 8/14 | Meta atingida, ou aviso com o motivo verdadeiro |
| Exercícios principais de glúteos | 1 | 5 ou mais |
| Equipamento marcado e nunca usado (paralelas, tornozeleira) | 2 | 0 (sem contar a esteira) |
| Alternativas de outro equipamento por exercício, numa academia completa | não medido | 2 ou mais para todo exercício |
| Programa de referência (critério 2) | 25/25, ±2 | Continua ≥ 80% e ±2 |
| Personas atuais (Ana, Bruno, Diego) | snapshots aprovados | Mudam só onde a mudança for revisada e explicada |

## 6. Esforço e ordem

**Proposta de R0, "aproveitar o equipamento"**, cerca de 1 a 1,5 semana, com parada para revisão no meio:
1. **R0a, pesquisa curta (1 dia).** Fichas de técnica e fontes dos exercícios novos, com a decisão sobre glúteo médio e adutores. Parada para a sua revisão da lista final.
2. **R0b, gerador (2 a 3 dias).** Parte A, com os testes de propriedade novos e a nova persona "academia grande".
3. **R0c, catálogo (2 a 3 dias).** Parte B: taxonomia, desenhos dos cartões de equipamento, exercícios em dados validados, textos com fonte e reconhecimento na foto (os ids novos entram no esquema da visão).

**Vem antes do R1?** Você pediu que sim, e o custo de esperar é baixo para você **[opinião]**:
- o defeito da triagem só aparece para quem marca uma articulação;
- o guia com a prescrição errada continua até o R1.

## 7. Perguntas
1. **Quais máquinas tem a academia onde você treina** (ou as que você usaria em viagem)?
   - **Recomendo:** listar uma vez, para eu priorizar o que você vai ver de fato.
   - **Lembrete:** essa lista fica em `privado/` e nunca no repositório.
2. **Posso começar sem músculos novos** (glúteo médio e adutores contando como glúteos e quadríceps)?
   - **Recomendo:** sim.
   - **Por quê:** acrescentar músculo pede uma meta de volume com fonte, e isso alonga a pesquisa.
