# Hipertrofia com equipamento limitado

## Resumo

Ter pouco equipamento custa pouco em hipertrofia, desde que cada série chegue perto da falha. Quando o halter fica leve, o app sobe as repetições até ~30 e depois aumenta a dificuldade sem carga, numa ordem fixa. A flexão de braço substitui o supino quando chega perto da falha. O elástico dá força equivalente à dos pesos, mas a equivalência em hipertrofia é inferência. Sem puxada vertical, as remadas mantêm o volume de costas, com evidência fraca para o latíssimo. A restrição de fluxo sanguíneo (BFR) funciona, mas fica fora do app por segurança.

## Conclusões

1. **Carga baixa até perto da falha gera hipertrofia semelhante à de carga alta.** *Robusta.* [schoenfeld2017b] [lopez2021]. É a base para treinar com halteres leves. O piso de ~20% de 1RM e o desconforto acima de 25–30 repetições limitam o teto prático (*um estudo* e *consenso*) [lasevicius2018] [schoenfeld2021].
2. **Elástico dá ganhos de força comparáveis aos de pesos e máquinas.** *Moderada para força* (8 estudos, populações variadas) [lopes2019]. **Nenhum ensaio comparou a hipertrofia com elástico e com peso livre em adultos jovens**: a equivalência em hipertrofia é inferência. Não há estudo sobre como progredir o elástico.
3. **A flexão de braço é um substituto válido do supino quando a carga ou o esforço são equiparados.** *Um estudo.* A 40% do 1RM, flexão e supino deram hipertrofia de peitoral e tríceps comparável em 8 semanas [kikuchi2017]. A flexão com elástico a 6RM deu força igual à do supino [calatayud2015]. Um programa de flexões progressivas aumentou o 1RM do supino, mas não detectou ganho de espessura em 4 semanas [kotarsky2018].
4. **Sem máquinas de perna, o agachamento búlgaro sozinho aumentou ~9% a espessura do vasto lateral em treinados.** *Um estudo.* [bulgaro2026]. Unilateral e bilateral se equivalem em hipertrofia (*moderada*) [kassiano2025], e o unilateral aumenta a carga relativa quando o halter é leve.
5. **Sem puxada vertical, a remada invertida tem EMG de dorsal comparável ou maior que a de outras remadas, com menos carga lombar.** *Um estudo* (EMG, n = 7) [fenwick2009]. **Não existe estudo de hipertrofia que mostre que remadas substituem puxadas para o latíssimo**, e o pullover com halter não tem nenhum dado.
6. **A cadência mais lenta ajuda a levar uma carga leve à falha com menos repetições, mas não aumenta a hipertrofia.** *Moderada.* Repetições de 0,5 a 8 s se equivalem e acima de 10 s parecem piores [schoenfeld2015]. Pausas e 1,5 repetição não têm nenhum ensaio de hipertrofia (*consenso*).
7. **BFR com carga baixa gera hipertrofia semelhante à da carga alta.** *Robusta* para eficácia [lixandrao2018]. As revisões de segurança relatam eventos raros e graves (trombose venosa profunda, rabdomiólise) e a literatura pressupõe pressão individualizada e supervisão [minniti2020] [patterson2019]. *Consenso* do projeto: fora do app.

## O que isso significa para o app

- O gerador só prescreve o que o inventário permite, e a premissa vem da equivalência de modalidades (`selecao.equivalencia-equipamento`). Elástico conta como carga válida se a série chega a 0–3 RIR; o texto do app diz "moderada para força; inferência para hipertrofia". A progressão do elástico segue `progressao.incremento.peso-corporal`.
- **Escada fixa para halter leve** (`equipamento.escada-carga-leve`), sempre na mesma ordem para ser determinística:
  1. subir repetições até ~30 (`reps.teto.carga-limitada`);
  2. passar para a variação unilateral ou mais difícil;
  3. excêntrica de 3–4 s, sem passar de ~8 s por repetição (`cadencia.repeticao`);
  4. pausa no ponto de maior alongamento ou 1,5 repetição (consenso, sem ensaio);
  5. sugerir comprar carga (halter ajustável ou elástico mais forte).
- Faixas de 15 repetições ou mais pedem RIR 0–2 (`rir.carga-baixa`).
- **Sem banco ou supino**: flexão com escada de dificuldade, da inclinada à com déficit ou pausa, até a série ficar perto da falha dentro da faixa (`equipamento.flexao-por-supino`). Uma flexão que a pessoa faz mais de 30 vezes pede variação mais difícil, não mais repetições.
- **Sem máquinas de perna**: o padrão de joelho passa a ser unilateral (búlgaro, afundo, split squat), e o gerador conta o tempo dobrado no orçamento da sessão (`selecao.equivalencia-equipamento`, `tempo.serie`).
- **Sem puxada vertical** (`equipamento.sem-puxada-vertical`): o volume de costas vem de remadas, na ordem remada invertida (se houver mesa robusta, barra baixa ou suspensão) > remada unilateral com halter > puxada com elástico ancorado alto. O pullover entra só como acessório marcado como consenso. O programa mostra um aviso de "lacuna" dizendo que a equivalência para o latíssimo tem evidência fraca, e o texto diz "ativação semelhante", nunca "mesmo crescimento". Isso cobre o cenário 2 do `docs/PLANO-MVP.md`.
- **BFR** nunca é prescrito (`equipamento.bfr`). O app pode citá-lo como opção "com profissional", sem instruções de uso.
- Drop set só é oferecido se a carga puder ser reduzida com o equipamento declarado (`tempo.drop-set`).

## Lacunas

- Não há ensaio de hipertrofia que compare elástico com peso livre ou máquina em adultos jovens; os estudos citados em blogs não foram encontrados.
- Não há estudo de hipertrofia com calistenia de longo prazo em treinados ou mulheres, nem com treino em suspensão.
- Não há ensaio que compare a hipertrofia do búlgaro com a do agachamento com barra, nem dado de hipertrofia de glúteo com hip thrust sem barra.
- Não há estudo de hipertrofia do latíssimo comparando remada e puxada vertical; o pullover e a puxada com elástico não têm dados.
- Pausas, 1,5 repetição e drop set mecânico com halter leve não têm ensaio de hipertrofia.
- Os números de segurança do posicionamento de Patterson et al. sobre BFR não foram lidos e não devem ser citados.
- Os autores do estudo de búlgaro de 2026, o PMID de Calatayud et al. e o DOI de Kotarsky et al. continuam NÃO VERIFICADOS.
