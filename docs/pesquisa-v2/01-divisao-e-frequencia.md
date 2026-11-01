# 1. Divisão do treino e frequência por músculo

> Pergunta do Gustavo: "qual é a melhor forma de treinar: AB, ABC, ABCD…?". Pesquisa de 01/11/2026. Todo estudo abaixo teve o **resumo oficial lido no PubMed** (resumo-PubMed, com PMID); o texto completo não foi lido.

## Os nomes, para começar
| Nome na academia | O que é | Vezes por semana que cada músculo treina |
|---|---|---|
| **Corpo todo** (full body) | Todos os grandes grupos em cada sessão | igual ao número de treinos (2 a 5) |
| **AB superior/inferior** (upper/lower, o "torso/membros" do app) | Um dia de tronco e braços, um de pernas | 2, com 4 treinos por semana |
| **AB empurrar/puxar**, ou **ABC empurrar/puxar/pernas** (push/pull/legs) | Peito, ombros e tríceps / costas e bíceps / pernas | 1 com 3 treinos; 2 com 6 treinos |
| **ABC, ABCD, ABCDE clássico** ("bro split") | Um ou dois grupos por dia (ex.: A peito e tríceps, B costas e bíceps, C pernas e ombros) | geralmente 1 |

O que muda de verdade entre eles são **3 coisas**:
- a **frequência** de cada músculo;
- quantas **séries de um mesmo músculo** cabem numa sessão;
- a **duração** de cada treino.

## O que a evidência diz

| Pergunta | Resposta | Selo | Fontes (resumo-PubMed) |
|---|---|---|---|
| Dividido ou corpo todo: qual cresce mais? | **Empate, com o mesmo volume semanal.** Meta-análise de 14 estudos e 392 pessoas: sem diferença em força (supino, pernas) nem em tamanho (bíceps, tríceps, quadríceps, massa magra). Os autores concluem que a pessoa pode escolher **por preferência**. | robusta (várias meta-análises na mesma direção) | Ramos-Campo et al. 2024, *J Strength Cond Res*, PMID 38595233 |
| Frequência por músculo importa? | **Com o mesmo volume, quase nada para hipertrofia.** 25 estudos: sem diferença entre frequências; quando o volume **não** é igualado, mais frequência ganha um pouco, porque traz mais volume. | robusta | Schoenfeld et al. 2019, *J Sports Sci*, PMID 30558493 |
| E na meta-análise mais nova? | 67 estudos, 2.058 pessoas: o volume aumenta o ganho (com retorno decrescente); o efeito da **frequência na hipertrofia é compatível com zero**, mas **na força é positivo** (mais vezes por semana, mais força). | robusta | Pelland et al. 2026, *Sports Med*, PMID 41343037 |
| O que o ACSM recomenda (posicionamento de 2026)? | Visão geral de 137 revisões e mais de 30 mil pessoas: a hipertrofia melhora com **≥ 10 séries por semana** e com sobrecarga na descida; a força melhora com cargas altas e **≥ 2 sessões por semana**. A periodização e o tipo de equipamento não mudaram o resultado de forma consistente. | robusta (visão geral de revisões) | Currier et al. 2026, *Med Sci Sports Exerc*, PMID 41843416 |
| 1 vez por semana é pior que 2? | A meta-análise antiga (10 estudos) achou 2x melhor que 1x. A rede de 2023 colocou "várias séries, 2x por semana" no topo para hipertrofia. Mas a diferença some quando o volume é igual. | moderada | Schoenfeld et al. 2016, *Sports Med*, PMID 27102172; Currier et al. 2023, *Br J Sports Med*, PMID 37414459 |

**Os ensaios individuais apontam para lados diferentes**, e é por isso que a soma dá empate:
- favorecem o corpo todo: Schoenfeld et al. 2015 (antebraço, PMID 25932981) e Zaroni et al. 2019 (antebraço e coxa, PMID 31260419);
- favorecem o dividido: Bartolomei et al. 2021 (coxa, PMID 32168178) e Lasevicius et al. 2019 (tendência, PMID 31531139);
- empate num estudo brasileiro com 67 iniciantes: Evangelista et al. 2021, *Einstein* (PMID 34468591).

Os estudos são pequenos (9 a 35 pessoas por grupo), duram de 8 a 10 semanas e foram feitos quase só com homens jovens.

## O que **de fato** pesa na escolha
Se o crescimento é o mesmo, a divisão vira uma **ferramenta de encaixe**. Os critérios, em ordem:

1. **Volume por sessão.** Concentrar muitas séries de um músculo num dia só parece render menos depois de ~10 séries por sessão. Isso vem de um *preprint* (Remmert et al. 2025, sem revisão por pares, já em `regras.md` como `volume.sessao.teto`, selo "um estudo").

   Daí sai uma conta simples: **frequência mínima = séries semanais do músculo ÷ 10, arredondado para cima**.
   - Quem quer 12 a 20 séries de um músculo precisa treiná-lo **pelo menos 2 vezes**.
   - O ABC clássico (1 vez) só comporta ~10 séries por músculo por semana.
2. **Dias disponíveis e minutos por treino.**
   - Corpo todo em 2 a 3 dias pede treinos mais longos.
   - Divisões com mais dias fazem treinos mais curtos, com menos músculos por dia.
3. **Faltas.**
   - Treinando cada músculo 2 vezes ou mais, faltar a um treino tira só uma parte do volume da semana daquele músculo.
   - No ABC/ABCD com 1 vez por semana, faltar ao dia de pernas é **uma semana inteira sem perna**. **[opinião]** Para um app que vai acompanhar faltas (marco R2), esse é um critério forte.
4. **Força, se for um objetivo secundário.** A frequência ajuda a força (Pelland 2026; ACSM 2026).
5. **Preferência.** É a recomendação explícita da meta-análise (Ramos-Campo 2024). Dar escolha também aumenta a autonomia; a evidência sobre adesão é fraca (`docs/pesquisa/09-decisoes-m3.md`, seção 4).

## Proposta para o gerador universal

**Mudança principal: a divisão deixa de ser fixa e passa a ser uma escolha entre opções equivalentes.** O app recomenda uma, explica por quê, e mostra as outras que cabem.

| Dias por semana | Opções que o app oferece (a 1ª é a recomendação padrão) | Frequência por músculo |
|---|---|---|
| 2 | Corpo todo A/B | 2 |
| 3 | **Corpo todo A/B/C**; superior/inferior + corpo todo | 3; ~2 |
| 4 | **Superior/inferior 2x**; corpo todo 4x | 2; 4 |
| 5 | **Superior/inferior + empurrar/puxar/pernas**; corpo todo 5x | ~2 |
| 6 | **Empurrar/puxar/pernas 2x**; superior/inferior 3x | 2; 3 |
| qualquer | **ABC/ABCD clássico (1x por músculo)**, só quando a meta semanal de cada músculo for de até ~10 séries e a pessoa escolher, com o aviso "faltar a um dia tira a semana inteira daquele músculo" | 1 |

**Regras que entram em `regras.md`** (proposta; só com aprovação):
- `divisao.equivalencia`: com volume igual, a divisão não muda a hipertrofia; escolher pelo encaixe e pela preferência. **robusta**. Fontes: Ramos-Campo 2024, Schoenfeld 2019, Pelland 2026.
- `divisao.frequencia-minima`: frequência por músculo ≥ ceil(meta semanal ÷ 10). **um estudo**. Fonte: Remmert 2025, preprint; a regra `frequencia.musculo` atual já usa essa conta.
- `divisao.recomendacao`: a ordem da tabela acima. **consenso** (decisão do projeto, com os critérios desta página).
- `divisao.seis-dias`: o app passa a aceitar 6 dias (hoje vai de 2 a 5). **consenso**.

**O que muda no app:**
1. Na tela de rotina, depois dos dias e minutos, um passo opcional "Como prefere dividir?". As opções que cabem aparecem já com o tempo estimado de cada uma, e a recomendada vem explicada (sem vir pré-marcada; ver a decisão 6 do M3).
2. Os modelos de dia deixam de copiar o programa de referência. A montagem das vagas depende do **tema 3** (escolha dos exercícios).

## O que fica sem resposta
- Quase todos os estudos são com homens jovens, por 8 a 12 semanas. Para mulheres e pessoas acima de 60, o resultado é provavelmente parecido, mas ainda não foi testado diretamente para divisões.
- O teto de ~10 séries por sessão vem de um único *preprint*. Ele muda a conclusão para quem quer volumes altos, então merece ser conferido quando sair a versão revisada.
- Nenhum estudo mediu **adesão** por tipo de divisão. O critério das faltas é raciocínio do projeto **[opinião]**.

## Para o programa do Gustavo
Nada aqui depende do equipamento dele. A divisão sai dos dias e minutos que ele tiver, e da preferência dele, entre as opções acima. O "torso/membros 4x" do programa de referência continua sendo **uma** boa opção para 4 dias; ele deixa de ser a única.

## 6. Consequência para o plano
O critério "o gerador repete ≥ 80% do programa de referência" deixa de fazer sentido: ele obrigava o gerador a copiar escolhas que agora estão sendo reavaliadas. **Proposta:** trocá-lo por "o programa de cada persona, inclusive o do Gustavo, só usa regras com selo e fonte, e uma revisão independente confere a montagem contra esta pesquisa".
