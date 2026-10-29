# Progressão, readaptação após pausa e deload

## Resumo

Subir repetições com a carga fixa e subir a carga com repetições fixas deram hipertrofia parecida no único estudo que comparou as duas coisas. Isso sustenta a dupla progressão: primeiro as repetições sobem dentro da faixa, depois a carga. Periodizar volume e intensidade não aumenta a hipertrofia. Pausas de cerca de 3 semanas quase não atrapalham o resultado de longo prazo, e a readaptação pode ser curta. O deload é prática de treinadores: o único ensaio não mostrou ganho de hipertrofia, então no MVP ele é só uma sugestão opcional. Quase todos os números deste arquivo (2 sessões, 10%, 3 sessões, 50% das séries) são consenso.

## Conclusões

1. **Progredir por repetições e progredir por carga dão hipertrofia semelhante.** *Um estudo.* Ensaio de 8 semanas com membros inferiores em pessoas treinadas [plotkin2022]. Sustenta a dupla progressão, especialmente quando o próximo halter é muito mais pesado.
2. **A condição "2 sessões seguidas no topo da faixa" e os incrementos típicos (1–2,5 kg em membros superiores, 2,5–5 kg em inferiores) vêm do manual da NSCA, visto só em fontes secundárias.** *Consenso.* [nsca2008]. **Não há estudo sobre o tamanho ideal do incremento.** A faixa "2–10%" atribuída ao ACSM 2009 não foi confirmada [acsm2009].
3. **Com volume equalizado, periodizar não aumenta a hipertrofia (ES 0,13, IC cruzando zero) e melhora um pouco a força.** *Moderada.* [moesgaard2022]. Linear e ondulatória também se equivalem [grgic2017b].
4. **Pausas de ~3 semanas não comprometeram a hipertrofia final de iniciantes.** *Um estudo, replicado.* [ogasawara2013] [ogasawara2011] [pausa2024].
5. **Em pausas longas, o tamanho volta perto da linha de base e a força fica mais preservada.** *Um estudo.* Após ~20 semanas sem treino, o tamanho voltou ao basal com a força elevada [psilander2019]. Idosos recuperaram o 1RM em menos de 8 semanas de retreino [blocquiaux2020]. Uma meta-análise de 103 estudos mostra perda de força proporcional à duração da pausa, maior acima de 65 anos (*robusta para força*, não mede hipertrofia) [bosquet2013].
6. **Os mecanismos de "memória muscular" em humanos têm evidência mista.** *Um estudo cada.* Psilander et al. não acharam aumento de mionúcleos no treino inicial [psilander2019]; Cumming et al. acharam mionúcleos mantidos, mas espessura e força iguais entre os braços no fim do retreino [cumming2024]; Seaborne et al. acharam uma "memória" epigenética [seaborne2018]. Nenhum desses dados dá um número confiável de quanto músculo se perde ou se recupera.
7. **Uma sessão submáxima já protege contra dano e dor nas seguintes (efeito da sessão repetida), mas a proteção de sessões leves dura ~2 semanas e não 3.** *Moderada* para o efeito da sessão repetida como fenômeno [hyldahl2017]; o dado de 2 contra 3 semanas é de um único grupo de pesquisa [chen2012].
8. **Nas primeiras ~3 semanas, a síntese proteica responde ao dano e não se relaciona com o crescimento.** *Um estudo* (n = 10) [damas2016]. Justifica começar com volume moderado e longe da falha.
9. **Nenhum protocolo de readaptação foi testado experimentalmente.** *Consenso.* As regras de semana 1, 2 e 3 são inferência do efeito da sessão repetida e de Damas et al.
10. **O deload é prática de treinadores.** *Consenso.* Uma pesquisa com 246 atletas encontrou deloads a cada ~5,6 semanas, com ~6,4 dias, menos volume e mais RIR, usados também quando o desempenho estagna [rogerson2024]; há um consenso Delphi sobre o desenho [bell2023]. O único ensaio testou uma semana **sem treino** no meio de 9 semanas: a hipertrofia não mudou e a força ficou um pouco pior [coleman2024] (*um estudo*).
11. **Não existem estudos sobre como sair de platô.** *Consenso.* A escada de estagnação se apoia indiretamente em Plotkin et al., em Moesgaard et al. e na prática de deload por estagnação [plotkin2022] [moesgaard2022] [rogerson2024].

## O que isso significa para o app

- **Dupla progressão** (`progressao.subir`, `progressao.manter`, `progressao.reduzir`): todas as séries no topo da faixa com o RIR alvo em 2 sessões seguidas → sobe o menor incremento e volta ao fundo da faixa; repetições dentro da faixa → mantém e busca +1; abaixo do mínimo em 2 sessões, ou dor → reduz 5–10%.
- **Incrementos** pelo inventário: próximo par de halteres fixos ou menor combinação de anilhas (`progressao.incremento.halteres`); +1 placa na polia, registrando o número da placa (`progressao.incremento.polia`); peso do corpo e elástico pela ordem repetições → descida lenta ou pausa → variação mais difícil → carga externa (`progressao.incremento.peso-corporal`).
- **Salto grande** (acima de ~10%): o app exige 1–2 repetições extras antes de subir e manda voltar se a primeira série com a carga nova ficar abaixo do mínimo (`progressao.salto-grande`). **Carga leve demais**: 2 ou mais repetições acima do topo na primeira série → 2 incrementos (`progressao.carga-leve`).
- Repetições com amplitude encurtada ou embalo não contam, e a DOMS nunca é gatilho (`progressao.criterios-invalidos`).
- **Estagnação** = 3 sessões seguidas sem melhora; resposta pela escada fixa de `progressao.estagnacao`.
- O gerador mantém faixas fixas por exercício. Periodização não é vendida como necessária (base: conclusão 3).
- **Readaptação** (`readaptacao.gatilho`): menos de 2 semanas parado → retoma normal; de 2 a menos de 3 semanas → só a primeira sessão com RIR +1; 3 semanas ou mais → semana 1 com ~50–60% das séries, RIR 3–4 e carga 10–20% abaixo da última registrada (`readaptacao.semana1`), semana 2 com ~75% das séries e RIR 2–3 (`readaptacao.semana2`), semana 3 normal (`readaptacao.semana3`). "Voltando de pausa" é um modificador que vale para qualquer nível.
- **Iniciante**: fase de aprendizado de 2–3 semanas com RIR 3–4, volume no mínimo da faixa e foco técnico (`iniciante.fase-aprendizado`).
- **Deload**: o app só sugere uma semana leve, manual e opcional, com a mesma frequência, ~50% das séries, RIR 3–4 e carga mantida ou −10%, quando 2 ou mais exercícios estagnam, quando há fadiga ou dor persistente, ou depois de 6–8 semanas sem pausa (`deload.semana-leve`). A versão automática fica no `docs/backlog.md`, como já previsto.
- Texto sobre "memória muscular": "Depois de uma pausa, força e tamanho costumam voltar mais rápido do que na primeira vez (cada achado vem de um estudo; os mecanismos em humanos têm evidência mista)."

## Lacunas

- Não há comparação direta de dupla progressão contra progressão linear de carga além de Plotkin et al.; o protocolo deles (n, séries, regra exata) não foi lido.
- O manual da NSCA não foi acessado; a regra "2 por 2" e os incrementos são de fontes secundárias.
- Não há protocolo de readaptação validado nem dados de destreino de ~3 meses em pessoas que treinam há anos.
- Não há ensaio que compare deload por redução de volume com treino contínuo, nem deload agendado contra deload por gatilho.
- Os PMIDs de Ogasawara et al. 2013, Psilander et al. 2019, Blocquiaux et al. 2020, Grgic et al. 2017 e Hyldahl et al. 2017, e os autores e PMIDs dos estudos de Chen e Nosaka, continuam NÃO VERIFICADOS.
- Os números de readaptação (50–60%, 75%, 10–20%) e de estagnação (3 sessões, −10%) são heurísticas e devem aparecer no app como consenso.
