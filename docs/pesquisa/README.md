# Pesquisa M0-R: regras de hipertrofia com evidência

Esta pasta reúne a pesquisa que alimenta o gerador de treino, a progressão e a segurança do app. Cada regra tem um id estável, um selo de evidência e fontes rastreáveis. Pesquisa de 29/10/2026, feita por busca na web, sem leitura de textos completos (ver `00-metodo.md`).

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| [00-metodo.md](00-metodo.md) | Hierarquia das fontes, os quatro selos, como a verificação foi feita, limitações e política de pendências |
| [01-volume-frequencia.md](01-volume-frequencia.md) | Séries semanais por músculo, teto por sessão, série indireta, frequência, volumes por nível |
| [02-intensidade-rir-descanso.md](02-intensidade-rir-descanso.md) | Faixas de repetição, proximidade da falha (RIR), estimativa do RIR, descanso e cadência |
| [03-progressao-readaptacao-deload.md](03-progressao-readaptacao-deload.md) | Dupla progressão, incrementos, estagnação, readaptação após pausa, fase de aprendizado, deload |
| [04-selecao-ordem-exercicios.md](04-selecao-ordem-exercicios.md) | Equivalência de equipamentos, amplitude, comprimento muscular, variação, complementos regionais, ordem |
| [05-equipamento-limitado.md](05-equipamento-limitado.md) | Halter leve, elástico, peso do corpo, pernas sem máquina, falta de puxada vertical, exclusão do BFR |
| [06-economia-de-tempo.md](06-economia-de-tempo.md) | Superséries, drop sets, rest-pause, modelo de duração da sessão e escada de cortes |
| [07-seguranca-triagem-niveis.md](07-seguranca-triagem-niveis.md) | Triagem no estilo PAR-Q+, sinais de alerta, dor, comunicação de risco, níveis, CONFEF e LGPD |
| [08-tecnica-guia.md](08-tecnica-guia.md) | Remada baixa (altura da polia), barra fixa (pegada), supino inclinado (ângulo), cotovelos no supino |
| [regras.md](regras.md) | **Tabela única de regras** com id, valores por nível, selo e fontes: é o que vai para `src/domain/` |
| [fontes.md](fontes.md) | Bibliografia única, com PMID, DOI, link e status de verificação de cada fonte |
| [anexo-auditoria-programa-fase-1.md](anexo-auditoria-programa-fase-1.md) | Comparação do programa de referência com a pesquisa: o que confirma, o que ajustar, o que mudar |

## Resumo executivo

1. Duas variáveis decidem quase tudo: **volume semanal por músculo** (~10 séries rendem mais que menos de 10; pouco ganho acima de ~20) e **esforço por série** (terminar a 0–3 repetições da falha). As duas têm evidência robusta.
2. Carga (~6 a ~30 repetições), frequência, ordem, periodização e tipo de equipamento mudam pouco a hipertrofia quando volume e esforço são atendidos. Isso favorece um app que só usa o equipamento que a pessoa tem.
3. O que precisa ser exato é a **contabilidade**: séries fracionadas (indireta = 0,5), teto de ~10 séries por músculo por sessão, série efetiva pelo RIR e progressão pelo desempenho registrado.
4. As constantes mais frágeis são o teto por sessão (um preprint), os volumes por nível, os critérios de progressão, a readaptação e o deload: todos **consenso**.
5. A dupla progressão (repetições, depois carga) tem apoio de um estudo; o critério de 2 sessões no topo da faixa e os incrementos vêm da NSCA, vista só em fontes secundárias.
6. Com halter leve, o app segue uma escada fixa (repetições até ~30, unilateral, excêntrica lenta, pausa, comprar carga). **BFR fica fora do app.** Sem puxada vertical, remadas mantêm o volume, com aviso de evidência fraca.
7. Para caber no tempo, a ordem é: menos exercícios, aquecimento só específico, superséries, drop set ou rest-pause, e só por último menos séries. Não existe fórmula validada de duração; o modelo será recalibrado com o tempo registrado.
8. Segurança mais conservadora que os modelos clínicos: qualquer "sim" na triagem suspende a geração automática; sinais cardiovasculares encerram a sessão e orientam o SAMU 192; dor acima de 5/10 encerra o exercício; o app nunca diagnostica.
9. As quatro decisões de técnica são biomecânica e EMG, não ensaio: polia na altura do umbigo ou 1–2 furos abaixo, barra fixa pronada com neutra e supinada equivalentes, inclinado a ~30°, cotovelos a 30–60°.
10. `regras.md` tem 77 regras; `fontes.md` tem 114 fontes, das quais 52 estão NÃO VERIFICADAS. Nada no programa de referência muda sem aprovação do usuário (ver o anexo).

## Decisões aprovadas (29/10/2026)

1. Série efetiva = série de trabalho com RIR ≤ 4 (`rir.serie-efetiva`).
2. Grupos não prioritários podem ficar no mínimo eficaz de 4–6 séries semanais (`volume.semanal.minimo-eficaz`).
3. Qualquer "sim" na triagem bloqueia o programa automático até a pessoa confirmar que foi avaliada.
4. Ordem de corte quando falta tempo: menos exercícios, aquecimento específico, bi-set, drop set ou rest-pause e, por último, menos séries.

## Pendências de verificação

Em ordem de impacto no app. Cada item está detalhado em `fontes.md` e nas "Lacunas" de cada arquivo.

1. **Pelland et al. 2026** (`pelland2026`): tamanhos de efeito, forma da curva, efeito do nível de treino e o conflito na probabilidade posterior (100% contra 91,3%). Afeta todas as constantes de volume.
2. **ACSM 2026** (`acsm2026`): DOI, autores e texto completo, especialmente o RIR recomendado (fontes secundárias divergem entre 1–2 e 2–3). Até lá, não serve como fonte de números.
3. **NSCA, regra "2 por 2" e incrementos** (`nsca2008`): o livro não foi acessado. Afeta o critério de subir a carga.
4. **PAR-Q+** (`parq2025`, `schwartz2021`): texto oficial em português, versão vigente e licença de uso. Até lá, o app usa perguntas próprias no estilo do PAR-Q+.
5. **Santos Junior et al. 2021** (`santosjunior2021`): parâmetros, pontos de corte e DOI do modelo de nível.
6. **~18 PMIDs a confirmar**: Schoenfeld 2017 de volume (27433992), Schoenfeld 2019 de frequência (30558493), Refalo 2023 (36334240), Grgic 2022 (33497853), Robinson 2024 (38970765), Zourdos 2016 (26049792), Schoenfeld 2015 de cadência (25601394), Ogasawara 2013, Psilander 2019, Blocquiaux 2020, Bickel 2011, Zhang 2025, Sødal 2023, Pallarés 2021, Rodríguez-Ridao 2020, Noteboom 2024, Lehman 2004 e Calatayud 2015.
7. **Resoluções CONFEF 436/2022 e 617/2026** (`confef436`, `confef617`): conteúdo não lido. Afeta o posicionamento regulatório do app.
8. Remmert et al. 2025 (`remmert2025`): continua preprint; revalidar o teto de 10 séries por sessão quando sair a versão revisada.
9. Detalhes de Iversen et al. 2021 (aquecimento, descansos), protocolos de Bickel et al. 2011 e Spiering et al. 2021, e os números de segurança de Patterson et al. 2019 sobre BFR.
10. Técnica: altura da polia em Lehman et al. 2004, valores do latíssimo em Youdas et al. 2010 e Dickie et al. 2017, e o "~9%" de Lusk et al. 2010.

**Para liberar:** adicionar pubmed.ncbi.nlm.nih.gov, eutils.ncbi.nlm.nih.gov, pmc.ncbi.nlm.nih.gov, link.springer.com, frontiersin.org, peerj.com, eparmedx.com à rede do ambiente. Depois disso, a verificação pode ser refeita e o status de cada fonte atualizado em `fontes.md`.
