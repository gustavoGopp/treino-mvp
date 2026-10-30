# Seleção e ordem dos exercícios

## Resumo

Para hipertrofia, máquina, peso livre, polia e halter se equivalem, e o mesmo vale para exercícios com um ou com dois membros. Amplitude completa é igual ou melhor que parcial. Treinar com o músculo alongado tende a render um pouco mais, mas o efeito é pequeno e some em pessoas treinadas, então entra só como desempate. Alguns exercícios específicos têm apoio de um estudo cada (flexora sentada, tríceps acima da cabeça, panturrilha alongada, supino inclinado). Variar exercícios com critério ajuda o crescimento regional; trocar demais atrapalha. A ordem dos exercícios não muda a hipertrofia.

## Conclusões

1. **Máquina e peso livre dão hipertrofia equivalente; a força é específica à modalidade.** *Moderada* (meta-análise de 13 estudos e 1.016 participantes, com só 5 estudos medindo hipertrofia) [haugen2023].
2. **Unilateral e bilateral se equivalem em hipertrofia.** *Moderada* (9 estudos, intervalo de confiança muito largo) [kassiano2025]. O unilateral aumenta a carga relativa quando o halter é leve, mas dobra o tempo por série.
3. **Amplitude completa é igual ou melhor que parcial, sobretudo em membros inferiores, e claramente melhor que parciais na posição encurtada.** *Moderada.* [pallares2021] [schoenfeld2020] [kassiano2023a] [wolf2023].
4. **Treinar o músculo alongado tende a render igual ou um pouco mais.** *Moderada*, com efeito pequeno, poucos estudos e quase todos em não treinados [wolf2023] [kassiano2023a]. Em treinados, o efeito some [wolf2025]. Por isso entra só como desempate.
5. **Preferências específicas com um estudo cada.** *Um estudo.*
   - Flexora **sentada** em vez de deitada: +14% contra +9% no volume dos isquiotibiais, em não treinados [maeo2021].
   - Tríceps com o braço **acima da cabeça**: cabeça longa +28,5% contra +19,6%, em não treinados [maeo2023].
   - Panturrilha com ênfase no alongamento [kassiano2023b].
   - Supino **inclinado**: mais crescimento da porção superior do peitoral em destreinados treinando 1x por semana [chaves2020]. Corrige uma citação anterior: o estudo é de 2020, não de 2024.
   - Rosca na parte inicial da amplitude (bíceps alongado): mais crescimento distal do bíceps, em mulheres não treinadas [pedrosa2023].
6. **Variação sistemática melhora a hipertrofia regional; variação aleatória ou excessiva pode atrapalhar.** *Moderada* (8 estudos, só homens jovens) [kassiano2022]. Variar exercícios de quadríceps fez as quatro cabeças crescerem [fonseca2014]. Em conjunto com os estudos regionais acima, isso sustenta 2 exercícios complementares por semana para quadríceps, isquiotibiais, tríceps e peitoral (*moderada* no agregado).
7. **A ordem não altera a hipertrofia (ES = 0,03), só a força do exercício feito primeiro.** *Moderada* (11 estudos) [nunes2021]. O exercício feito no início acumula mais repetições [simao2012].
8. **Adicionar isoladores a um programa de multiarticulares não trouxe ganho extra de braço em estudos curtos.** *Um estudo.* [gentil2015]. Ainda assim, são os isoladores que cobrem cabeças biarticulares (tríceps longo, reto femoral, isquiotibiais na flexão do joelho) e a panturrilha.
9. **EMG e "razão estímulo/fadiga" não preveem hipertrofia.** *Consenso.* Nenhuma das duas foi validada como métrica [consenso-projeto].

## O que isso significa para o app

- A regra central do produto ("só com o equipamento que a pessoa tem") se apoia na equivalência de modalidades (`selecao.equivalencia-equipamento`): o gerador troca máquina, peso livre, polia, halter, unilateral e bilateral entre si quando o músculo e a progressão são os mesmos.
- Todo exercício tem amplitude completa e controlada como padrão (`selecao.amplitude`). Parciais alongadas ficam fora do MVP.
- A pontuação de candidatos usa o comprimento muscular só como desempate (`selecao.comprimento-longo`) e a estabilidade como critério para iniciantes e desempate para os demais (`selecao.estabilidade`). EMG não pontua.
- Os exercícios ficam fixos no mesociclo de 4–8 semanas para permitir progressão. O segundo exercício de cada músculo é escolhido por complementaridade (outro comprimento muscular, outra região), de forma determinística, nunca por sorteio (`selecao.variacao`, `selecao.complementos`).
- Complementos regionais, quando houver equipamento: variação inclinada para o peitoral (`selecao.peitoral-inclinado`), tríceps acima da cabeça (`selecao.triceps-acima-cabeca`), flexora sentada (`selecao.flexora-sentada`) e panturrilha alongada (`selecao.panturrilha-alongada`). Cada um aparece no "porquê" como "apoiado por um estudo".
- Multiarticulares formam a base; isoladores cobrem braços, cabeças biarticulares, panturrilha e deltoide lateral, e são os primeiros a sair quando falta tempo (`selecao.multi-mono`, `tempo.corte`).
- Ordem determinística: multiarticular → prioridade do usuário → ordem do modelo de divisão (que segue a exigência técnica) → core por último (`ordem.sessao`). O app não promete que a ordem muda o crescimento.

## Lacunas

- Quase todos os estudos têm 20–45 pessoas, não treinadas, por 8–12 semanas, muitos com desenho intra-sujeito. Faltam dados em treinados de longo prazo e em idosos.
- Peitoral, dorsais, deltoides e glúteos têm pouca evidência regional direta.
- O número de estudos e os dados por estudo de Wolf et al. 2023 não foram lidos.
- Os PMIDs de Pallarés et al. 2021 e de Schoenfeld e Grgic 2020, e os autores, o título literal e o DOI de Kassiano et al. 2025 continuam NÃO VERIFICADOS; o periódico de Gentil et al. 2015 também.
- A frequência ótima de troca de exercícios entre blocos é desconhecida.
- A atribuição de músculos primários e secundários por exercício (usada na contagem fracionada) é anatomia e consenso, não vem dessas fontes.
