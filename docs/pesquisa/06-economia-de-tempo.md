# Economia de tempo e duração da sessão

## Resumo

Superséries, drop sets e rest-pause encurtam a sessão sem perder hipertrofia. Cluster sets não economizam tempo, e a pré-exaustão não traz ganho. Não existe fórmula validada para estimar a duração de uma sessão: o modelo do app usa parâmetros dentro das faixas com evidência (duração da repetição, descanso), e a estrutura é consenso. A alavanca de tempo dominante é o descanso, não a execução. Quando falta tempo, o app segue uma escada fixa de cortes e só reduz o volume semanal no último passo.

## Conclusões

1. **Superséries reduzem a duração e mantêm volume e adaptações crônicas.** *Moderada* (19 estudos, 313 participantes) [zhang2025]. O pareamento agonista-antagonista até aumenta as repetições; o par do mesmo padrão biomecânico reduz a carga-volume [zhang2025] [robbins2010].
2. **O drop set é equivalente ao treino tradicional em hipertrofia, com mais esforço percebido.** *Robusta para não inferioridade* (três meta-análises concordantes) [sodal2023] [coleman2022] [dropset2026].
3. **O rest-pause foi igual ou melhor que o tradicional em ensaios pequenos.** *Um estudo.* [prestes2019].
4. **Cluster sets se equivalem em hipertrofia, mas não economizam tempo.** *Moderada* (29 estudos) [davies2021].
5. **A pré-exaustão não traz ganho.** *Um estudo.* [trindade2019].
6. **A revisão narrativa de referência resume que superséries, drop sets e rest-pause cortam o tempo pela metade com volume semelhante, e prioriza multiarticulares e aquecimento específico.** *Consenso* (revisão narrativa) [iversen2021]. Os detalhes sobre aquecimento e descansos vieram da memória do pesquisador e estão NÃO VERIFICADOS no texto.
7. **Para manter o que já se ganhou, ~1–3 séries pesadas por músculo por semana bastaram em adultos jovens, com a carga mantida.** *Moderada.* [bickel2011] [spiering2021]. Doses mínimas aumentam a força em iniciantes [nuzzo2024].
8. **Não existe fórmula validada de duração de sessão.** *Consenso.* Os parâmetros vêm de faixas com evidência: repetições de 0,5–8 s se equivalem [schoenfeld2015], e o descanso tem platô em ~90 s [singer2024].
9. **Não há ensaio mostrando que sessões curtas aumentam a adesão medida em adultos que treinam hipertrofia.** *Um estudo* (preferência declarada em idosos) [plosone-preferencia]. Perguntar o tempo real disponível e montar o programa para caber nele é inferência sensata, não resultado testado.

## O que isso significa para o app

- **Modelo de duração**, determinístico, a recalibrar com o tempo real que o app registrar no aparelho:
  - série = repetições × 3 s + 5–10 s de preparo (`tempo.serie`);
  - descanso pelas regras de `descanso.por-tipo` (no modo curto, 90 s nos compostos e 60 s nos isoladores, respeitando `descanso.piso`);
  - transição entre exercícios de 60–120 s, que substitui o descanso; não há descanso depois da última série do último exercício (`tempo.transicao`);
  - aquecimento específico de 1–2 séries leves, ~2–4 min por exercício principal; o geral é opcional (`tempo.aquecimento`);
  - margem de +10% para fila de equipamento (`tempo.colchao`).
- Exemplo ilustrativo (inferência, não dado): 3 compostos e 2 isoladores com 3 × 10 cada dão 15 séries × 40 s ≈ 10 min, 10 descansos ≈ 17 min, 4 transições ≈ 6 min e 2 aquecimentos ≈ 6 min, total ~39 min, ou ~43 min com a margem.
- **Escada de corte** quando a sessão não cabe (`tempo.corte`), sempre na mesma ordem:
  1. menos exercícios, priorizando os multiarticulares (isoladores saem primeiro, `selecao.multi-mono`);
  2. só aquecimento específico;
  3. supersérie entre músculos que não competem (`tempo.superserie`);
  4. 1 drop set ou rest-pause na última série de isoladores em máquina, polia ou halter (`tempo.drop-set`, `tempo.outras-tecnicas`);
  5. só por último, menos séries semanais, sem passar do piso de manutenção (`volume.manutencao.piso`).
- **Supersérie**: pares agonista-antagonista ou superior com inferior; ~15 s entre A e B e descanso só entre as rodadas; nunca dois multiarticulares pesados de pernas, nunca o mesmo músculo para economizar tempo (`tempo.superserie`). Na academia, a supersérie ocupa dois equipamentos ao mesmo tempo.
- **Drop set**: 1 série + 2 quedas com ~10–15 s, valendo ~2–3 séries; no máximo 1 por exercício, só onde a carga pode ser reduzida e nunca em multiarticular livre pesado (`tempo.drop-set`).
- Cluster sets e pré-exaustão não entram no modo curto (`tempo.outras-tecnicas`).
- O app pergunta o tempo por sessão e mostra, com honestidade, o que o modo curto deixa de fora (por exemplo, menos volume de braço).
- **Ponto para revisão**: o pseudocódigo da seção f do `docs/PLANO-MVP.md` corta primeiro séries de isoladores, depois propõe bi-set e só então corta exercícios. A escada desta pesquisa troca a ordem (menos exercícios e técnicas de economia antes de reduzir séries). A mudança no plano depende da aprovação do usuário.

## Lacunas

- Nenhum estudo valida uma fórmula de duração de sessão de musculação, nem mede o tempo de transição em academias reais.
- A economia de tempo em minutos por técnica (os "~37%" da supersérie e "1/2 a 1/3" ou "30–70%" do drop set) só apareceu em blogs e não é usada.
- O texto completo de Zhang et al. 2025 (tamanho do efeito por tipo de pareamento) e de Iversen et al. 2021 (tabelas de recomendação) não foi lido.
- Os protocolos literais de Bickel et al. (1/3 e 1/9 da dose) e o trecho "1 sessão, 1 série" de Spiering et al. não foram conferidos.
- Os PMIDs de Zhang et al. 2025, Sødal et al. 2023 e Bickel et al. 2011, e os autores da meta-análise de drop set de 2026, continuam NÃO VERIFICADOS.
- Não há ensaio comparando a adesão a sessões de 30 min e de 60 min com o mesmo volume semanal.
