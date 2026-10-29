# Intensidade: carga, repetições, proximidade da falha (RIR), descanso e cadência

## Resumo

Quando a série termina perto da falha, cargas leves e pesadas dão hipertrofia parecida, numa faixa útil de cerca de 6 a 30 repetições. Ir até a falha não é necessário: parar a 0–3 repetições dela (RIR) é suficiente, mas com carga leve a proximidade da falha pesa mais. As pessoas erram em média cerca de 1 repetição ao estimar o RIR. Descansar mais de 60 s entre séries dá uma vantagem pequena, e acima de ~90 s a diferença some. A velocidade da repetição importa pouco, desde que ela não seja muito lenta.

## Conclusões

1. **Com a série perto da falha, cargas baixas e altas dão hipertrofia semelhante; a carga alta dá mais força máxima.** *Robusta.* Uma meta-análise de 21 estudos [schoenfeld2017b] e uma meta-análise em rede de 28 estudos e 747 adultos, comparando ≤ 8 RM, 9–15 RM e > 15 RM [lopez2021], chegam à mesma conclusão.
2. **Existe um piso de carga.** *Um estudo.* A 20% de 1RM a hipertrofia foi subótima em comparação com 40–80% (coxa: 8,9% contra 19,5% a 80%) [lasevicius2018]. Os limites práticos de ~6 e ~30 repetições são *consenso*: são a conversão aproximada desse piso e o ponto em que o desconforto cresce e ameaça a adesão [schoenfeld2021].
3. **A divisão compostos em 6–12 repetições e isoladores em 10–20 é consenso.** *Consenso.* A evidência mostra só que todas essas faixas funcionam perto da falha [schoenfeld2017b] [lopez2021].
4. **Ir à falha não é necessário.** *Robusta.* Uma meta-análise de 15 estudos achou vantagem trivial para a falha (ES = 0,19; IC95% 0,00–0,37) [refalo2023]. Outra não achou diferença significativa no geral; no subgrupo de treinados, a falha favoreceu a hipertrofia (ES = 0,15) [grgic2022]. Um ensaio em treinados achou espessura do quadríceps igual com falha e com RIR [refalo2024].
5. **A hipertrofia parece crescer de forma não linear perto da falha; a força quase não depende disso.** *Moderada.* A meta-regressão de Robinson et al. trata o RIR como contínuo; os próprios autores chamam a análise de exploratória [robinson2024]. Daí vem que séries com RIR alto estimulam menos, e que o limiar exato de "série efetiva" é consenso.
6. **Com carga baixa, ir à falha pesa mais; com carga alta, não faz diferença.** *Um estudo.* [lasevicius2022], coerente com a interpretação de [robinson2024].
7. **As pessoas subestimam em ~1 repetição quantas ainda conseguiriam fazer.** *Moderada.* A heterogeneidade é enorme (I² ≈ 98%). A estimativa melhora perto da falha e em séries de até 12 repetições, e o nível de treino não mudou a precisão de forma relevante [halperin2022]. A escala de RPE baseada em RIR (RPE 10 = RIR 0) é a base do registro [zourdos2016] [helms2016].
8. **Descansos acima de 60 s dão uma vantagem pequena; acima de ~90 s não há diferença apreciável.** *Moderada.* Meta-análise bayesiana de 9 estudos; todos os intervalos de credibilidade cruzaram o zero [singer2024]. Uma revisão anterior aponta na mesma direção [grgic2017a]. Em homens treinados, 3 min superaram 1 min [schoenfeld2016b] (*um estudo*). Não há estudo que separe compostos de isoladores: descansar mais nos compostos é *consenso*.
9. **Repetições de 0,5 a 8 s dão hipertrofia equivalente; repetições muito lentas (mais de 10 s) parecem inferiores.** *Moderada.* [schoenfeld2015]. Ressalva: nos estudos incluídos, carga e critério de término variavam junto com a duração [lacerda2021].

## O que isso significa para o app

- O app prescreve em **repetições + RIR**, nunca em %1RM (`reps.equivalencia-cargas`). Faixas padrão: compostos 6–10 ou 8–12, isoladores 10–20 (`reps.faixa.por-tipo`). Com carga limitada, isoladores e exercícios de perna podem ir até 30 repetições (`reps.teto.carga-limitada`); passou disso, entra a escada de `equipamento.escada-carga-leve`.
- RIR alvo (`rir.alvo`): iniciante adaptado em compostos 2–3 e isoladores 1–2; intermediário e avançado em compostos 1–2 e isoladores 0–1. A falha nunca é exigida (`rir.falha.nao-necessaria`).
- Séries de 15 repetições ou mais pedem RIR 0–2 (`rir.carga-baixa`).
- Uma série conta como efetiva se terminar com RIR ≤ 4; RIR ≥ 5 e aquecimento não contam (`rir.serie-efetiva`). O relatório dá o limiar como "3–4". O projeto propõe ≤ 4 para que as séries da semana 1 da readaptação (RIR 3–4) entrem na contagem. É uma escolha do projeto e precisa da aprovação do usuário.
- Um "RIR 2" relatado é lido como RIR 2–3 (`rir.leitura`). A calibração é uma vez por semana a partir da semana 3, na última série de um isolador seguro, até a falha técnica; nunca em agachamento, terra ou supino livre sem segurança (`rir.calibracao`).
- Descanso padrão (`descanso.por-tipo`): iniciante com compostos em 90–120 s e isoladores em 60–90 s; intermediário e avançado com compostos em 2–3 min (piso 90 s) e isoladores em 60–90 s (piso 60 s). Nunca abaixo de 60 s como padrão (`descanso.piso`). O temporizador sugere o mínimo e permite estender.
- Cadência: o app não prescreve número. O texto diz "desça controlando, sem embalo" (~2–3 s) e nunca propõe repetições de mais de 10 s (`cadencia.repeticao`). A descida de 3 s só aparece como ferramenta de progressão.
- RIR das semanas de readaptação: ver `03-progressao-readaptacao-deload.md` (`readaptacao.semana1`, `readaptacao.semana2`, `iniciante.fase-aprendizado`).

## Lacunas

- Nenhum estudo testa diretamente "30 repetições" como teto, nem compara 20–30% com 30–40% de 1RM em treinados.
- A forma da curva de RIR (quanto se perde por repetição a mais em reserva) não é quantificável; os coeficientes de Robinson et al. não foram lidos.
- Os PMIDs de Refalo et al. 2023, Grgic et al. 2022, Robinson et al. 2024 e Zourdos et al. 2016, e o título, o DOI e o RIR alvo de Refalo et al. 2024, continuam NÃO VERIFICADOS.
- As fontes secundárias sobre o ACSM 2026 divergem no RIR (1–2 contra 2–3). O texto original não foi lido e não serve como fonte de números [acsm2026].
- A comparação de 2 contra 5 min de descanso, citada em blog, não teve a fonte primária identificada e não é usada.
- Não há meta-análise que compare descanso por tipo de exercício.
- Faltam dados com mulheres, idosos e pessoas com condições de saúde.
