# Volume e frequência semanais

## Resumo

O número de séries que cada músculo recebe por semana é a variável com a evidência mais forte para hipertrofia. Cerca de 10 séries semanais rendem claramente mais que menos de 10, e acima de ~20 o ganho extra fica pequeno. Com o mesmo volume semanal, treinar o músculo 1, 2 ou 3 vezes por semana dá resultado parecido: a frequência serve para distribuir o volume sem passar de ~10 séries por músculo numa sessão. As faixas por nível (iniciante, intermediário, avançado) não vêm de estudo: são convenção de treinadores encaixada na curva.

## Conclusões

1. **A relação entre séries semanais e crescimento é côncava (sobe rápido até ~10, devagar até ~20, quase plana depois).** *Robusta.* Na meta-análise de Schoenfeld et al. (15 estudos), menos de 5, de 5 a 9 e 10 ou mais séries semanais renderam em média 5,4%, 6,6% e 9,8% de aumento de massa muscular [schoenfeld2017a]. A meta-regressão de Pelland et al. (67 estudos, 2.058 participantes) confirma a dose-resposta com retorno decrescente e mostra que a curva da força achata antes da curva da hipertrofia [pelland2026]. Baz-Valle et al. e Schoenfeld et al. 2019 apontam na mesma direção [bazvalle2022] [schoenfeld2019b]. O posicionamento do ACSM de 2026 recomenda cerca de 10 séries por grupo muscular, mas só foi lido o material de imprensa [acsm2026].
2. **Acima de ~20 séries semanais o ganho extra é pequeno e incerto.** *Moderada.* Em homens jovens treinados, 12–20 e mais de 20 séries não diferiram para quadríceps nem bíceps; só o tríceps favoreceu o volume alto [bazvalle2022]. Em pessoas muito treinadas, 12, 18 e 24 séries de pernas deram a mesma espessura muscular [aube2022]. Em atletas, ~60 séries semanais não superaram o volume normal [rantila2026]. Contraponto: 5 séries por exercício cresceram mais que 1 e 3 [schoenfeld2019b]. Por isso 20 é um teto prudente de custo e benefício, não um limite biológico.
3. **Há um piso baixo que ainda gera ganho.** *Moderada.* Menos de 5 séries semanais já deram ganho relevante, menor que o de 10 ou mais [schoenfeld2017a]. Para manter o que já se ganhou, 1 a 3 séries pesadas por músculo por semana, com a carga mantida, bastaram por 32 semanas em adultos jovens; idosos precisaram de mais [bickel2011] [spiering2021].
4. **Várias séries por exercício superam a série única, em treinados e não treinados.** *Moderada.* [krieger2010]. Isso desaconselha a série única como padrão, mesmo para iniciantes.
5. **Teto por sessão: o benefício adicional deixa de ser detectável perto de ~11 séries fracionadas por músculo por sessão.** *Um estudo (preprint).* O dado vem de uma meta-regressão ainda sem revisão por pares; os autores avisam que há poucos dados com volumes altos por sessão [remmert2025].
6. **A contagem "fracionada" (série indireta = 0,5) é a que melhor explica os dados de hipertrofia.** *Moderada.* Ela superou as contagens "total" (indireta = 1) e "direta" (indireta = 0) tanto na meta-regressão de volume semanal quanto na de volume por sessão [pelland2026] [remmert2025]. É uma aproximação estatística média, de um único grupo de pesquisa: não mede o estímulo real de cada sinergista. Qual músculo é primário ou secundário em cada exercício é anatomia e consenso.
7. **Com volume semanal igual, a frequência quase não muda a hipertrofia.** *Robusta.* Uma meta-análise de 25 estudos não achou diferença relevante com volume equalizado [schoenfeld2019a], e a meta-regressão de 2026 mostra efeito da frequência sobre a força, mas não sobre a hipertrofia [pelland2026]. A meta-análise de 2016 que favorecia 2x por semana tinha só 10 estudos e não conseguiu analisar os estudos com volume equalizado [schoenfeld2016a]. Uma revisão do mesmo grupo chega à mesma conclusão [grgic2019].
8. **Nenhuma fonte valida volumes por nível.** *Consenso.* As faixas iniciante 6–10, intermediário 10–16 e avançado 12–20 são convenção encaixada na curva de dose-resposta. O status de treinamento entrou como variável em Pelland et al., mas o resultado desse moderador não foi lido [pelland2026].

## O que isso significa para o app

- O gerador conta volume em **séries fracionadas por músculo por semana**: série direta = 1, série indireta = 0,5 (`volume.serie-indireta.peso`). Cada exercício da biblioteca declara seus músculos primários e secundários (campo `musculos`). O texto do app chama o 0,5 de "aproximação".
- Músculos prioritários vão ao alvo do nível: 8, 12 ou 14 séries (`volume.semanal.alvo`), dentro da faixa 6–10, 10–16 ou 12–20 (`volume.semanal.minimo`, `volume.semanal.maximo`).
- Músculos não prioritários podem ficar entre o piso eficaz de 4–6 (`volume.semanal.minimo-eficaz`) e o mínimo da faixa. É o caso das pernas no programa de referência.
- Nenhum padrão passa de 20 séries semanais (`volume.semanal.teto-padrao`). Para avançados, acima de 20 só por opção explícita.
- Modo manutenção, quando o tempo é muito curto: 1–3 séries pesadas por músculo por semana, com aviso de que mantém e não maximiza (`volume.manutencao.piso`).
- Cada exercício recebe pelo menos 2 séries de trabalho; o iniciante fica em 2–3 (`volume.series-por-exercicio`).
- Nenhum músculo recebe mais de 10 séries fracionadas numa sessão (`volume.sessao.teto`). Esse teto determina a frequência mínima: `ceil(volumeSemanal / 10)`. O padrão é 2x por semana; 1x é aceitável com volume ≤ 10 (`frequencia.musculo`).
- O texto do app diz que a frequência quase não muda o crescimento com o mesmo volume (`frequencia.efeito-hipertrofia`) e que o volume é dividido em 2 dias para respeitar o teto por sessão (apoiado num preprint).
- A dose-resposta (`volume.semanal.dose-resposta`) é a justificativa mostrada no "porquê" do volume: é a regra de selo mais forte deste arquivo.

## Lacunas

- Os tamanhos de efeito, os intervalos de credibilidade e a forma exata da curva de Pelland et al. não foram lidos (texto completo bloqueado). Há também um conflito sobre a probabilidade posterior de inclinação positiva (100% em uma síntese, 91,3% em um trecho, sem clareza de desfecho).
- O número "+0,37% por série adicional", muito citado sobre Schoenfeld et al. 2017, não foi confirmado e não deve ser usado.
- O preprint de volume por sessão não tem versão revisada por pares até 29/10/2026. Se sair, o teto de 10 é revalidado.
- Quase não há dados acima de ~30 séries semanais, e os estudos de teto são quase todos com homens jovens treinados.
- O PMID de Schoenfeld et al. 2017, o DOI e o PMID de Schoenfeld et al. 2019 (frequência) e os dados do ACSM 2026 continuam NÃO VERIFICADOS (ver `fontes.md`).
- Nenhuma fonte define operacionalmente iniciante, intermediário e avançado (ver `07-seguranca-triagem-niveis.md`).
