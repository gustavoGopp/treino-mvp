# Inventário do texto do app

> Gerado por `scripts/textos/classificar.mjs` a partir de `colheita.json` (2026-11-16T14:17:15.052Z). Não edite à mão: rode o roteiro e o script de novo.

**81 telas, folhas e estados colhidos; 1739 textos (381 diferentes); 8784 palavras somadas** (a mesma frase conta de novo em cada tela em que aparece; as palavras de textos diferentes somam 3188).

## Por fluxo

| Fluxo | Telas | Palavras | Média por tela | Maior tela |
|---|---|---|---|---|
| cadastro | 81 | 8784 | 108 | Folha "Por que esta pergunta" (362) |

## Para que serve o texto (todas as telas somadas)

| Função | Textos | Palavras | Parte | Decididos à mão |
|---|---|---|---|---|
| ação | 450 | 1171 | 13% | 0 |
| opção | 630 | 2103 | 24% | 0 |
| título | 203 | 894 | 10% | 0 |
| estado | 11 | 105 | 1% | 0 |
| número | 36 | 54 | 1% | 0 |
| segurança | 62 | 976 | 11% | 0 |
| justificativa | 48 | 417 | 5% | 0 |
| privacidade | 27 | 601 | 7% | 0 |
| a decidir | 272 | 2463 | 28% | 0 |

## De quem é o texto

| Dono | Textos | Palavras | Parte |
|---|---|---|---|
| jurídico | 10 | 175 | 2% |
| conteúdo | 184 | 1140 | 13% |
| domínio | 407 | 3193 | 36% |
| motor | 0 | 0 | 0% |
| tela | 1138 | 4276 | 49% |

## cadastro

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `cadastro/01-boas-vindas` Boas-vindas | tela | ana | 68 | 68 | 0 | 0 | ação 25, a decidir 22, segurança 14, título 7 |
| `cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz` Folha "O que o app não faz" | folha | ana | 132 | 132 | 3 | 0 | segurança 70, a decidir 34, justificativa 15, ação 7, título 6 |
| `cadastro/03-boas-vindas-folha-seus-dados` Folha "Seus dados ficam no aparelho" | folha | ana | 93 | 93 | 1 | 1 | privacidade 90, ação 2, justificativa 1 |
| `cadastro/04-boas-vindas-folha-selo-da-foto` Folha "De onde vem isto" (o selo "fonte" do texto da foto) | folha | ana | 261 | 161 | 3 | 0 | privacidade 156, a decidir 73, justificativa 15, ação 13, título 4 |
| `cadastro/05-saude` Saúde: a pergunta geral, com as 9 condições | tela | ana | 87 | 87 | 0 | 0 | segurança 40, a decidir 26, ação 16, título 5 |
| `cadastro/06-saude-folha-por-que-perguntamos` Folha "Por que esta pergunta" | folha | ana | 362 | 152 | 6 | 0 | justificativa 252, segurança 90, ação 16, título 4 |
| `cadastro/07-saude-folha-perguntas-completas` Folha "As 9 perguntas completas" | folha | ana | 137 | 137 | 0 | 0 | segurança 76, a decidir 56, título 4, ação 1 |
| `cadastro/08-saude-quais-valem` Saúde: quais valem (as 9 perguntas para marcar) | tela | ana | 195 | 134 | 0 | 0 | opção 172, a decidir 17, título 4, ação 2 |
| `cadastro/09-saude-quais-valem-erro-nenhuma-marcada` Saúde: quais valem, sem nenhuma marcada | erro | ana | 208 | 111 | 0 | 0 | opção 172, a decidir 28, título 4, ação 2, estado 2 |
| `cadastro/10-saude-quais-valem-regioes-erro-sem-regiao` Saúde: quais valem, com "Quais regiões?" e nenhuma região marcada | erro | ana | 269 | 80 | 1 | 1 | opção 179, segurança 55, a decidir 24, título 6, ação 2, estado 2, justificativa 1 |
| `cadastro/11-saude-quais-valem-regioes-erro-sem-notas` Saúde: 3 regiões marcadas, sem as notas de dor | erro | ana | 360 | 84 | 1 | 1 | opção 212, segurança 105, a decidir 32, título 6, ação 2, estado 2, justificativa 1 |
| `cadastro/12-saude-quais-valem-regioes-erro-sem-uma-nota` Saúde: 3 regiões marcadas, faltando 1 nota de dor | erro | ana | 349 | 84 | 1 | 1 | opção 212, segurança 104, a decidir 22, título 6, ação 2, estado 2, justificativa 1 |
| `cadastro/13-saude-folha-confirmar-nao-marcadas` Folha "Nenhuma destas vale para você?" (8 não marcadas) | folha | ana | 114 | 114 | 0 | 0 | segurança 76, a decidir 26, ação 7, título 5 |
| `cadastro/14-saude-folha-confirmar-nao-marcada-uma` Folha "Nenhuma destas vale para você?" (1 não marcada) | folha | ana | 29 | 29 | 0 | 0 | a decidir 17, ação 7, título 5 |
| `cadastro/15-saude-pausa` Saúde: "Vamos pausar o programa automático" (8 respostas "sim") | aviso | ana | 184 | 116 | 1 | 1 | segurança 124, a decidir 37, opção 14, título 5, ação 3, justificativa 1 |
| `cadastro/16-saude-pausa-folha-selo` Folha "De onde vem isto" (o selo da pausa da triagem) | folha | ana | 237 | 141 | 5 | 0 | a decidir 149, segurança 53, ação 16, justificativa 15, título 4 |
| `cadastro/17-saude-pausa-liberacao-marcada` Saúde: a pausa, com a liberação marcada | aviso | ana | 184 | 116 | 1 | 1 | segurança 124, a decidir 37, opção 14, título 5, ação 3, justificativa 1 |
| `cadastro/18-experiencia-vazia` Experiência: a 1ª pergunta, sem resposta | estado vazio | ana | 40 | 40 | 0 | 0 | opção 14, a decidir 13, título 12, ação 1 |
| `cadastro/19-experiencia-erro-sem-resposta` Experiência: as mensagens de "falta" sem nenhuma resposta | erro | ana | 69 | 69 | 0 | 0 | a decidir 40, opção 14, título 12, estado 2, ação 1 |
| `cadastro/20-experiencia-2a-pergunta` Experiência: a 2ª pergunta aparece ("Você está treinando agora?") | tela | ana | 82 | 82 | 0 | 0 | opção 41, a decidir 24, título 16, ação 1 |
| `cadastro/21-experiencia-3a-pergunta` Experiência: a 3ª pergunta aparece (confiança na técnica) | tela | ana | 104 | 78 | 0 | 0 | opção 52, título 27, a decidir 24, ação 1 |
| `cadastro/22-experiencia-nivel-avancado` Experiência respondida: "Seu nível: Avançado", com "Quer começar num nível mais leve?" | tela | ana | 144 | 62 | 0 | 1 | opção 56, a decidir 49, título 36, ação 2, justificativa 1 |
| `cadastro/23-experiencia-nivel-intermediario` Experiência respondida: "Seu nível: Intermediário" | tela | ana | 145 | 94 | 0 | 1 | opção 55, a decidir 51, título 36, ação 2, justificativa 1 |
| `cadastro/24-experiencia-nivel-iniciante-pela-pausa` Experiência respondida: iniciante por mais de 6 meses parado | tela | ana | 130 | 93 | 0 | 1 | opção 52, a decidir 45, título 30, ação 2, justificativa 1 |
| `cadastro/25-experiencia-nivel-iniciante-pela-tecnica` Experiência respondida: iniciante por falta de confiança na técnica | tela | ana | 123 | 86 | 0 | 1 | opção 52, a decidir 38, título 30, ação 2, justificativa 1 |
| `cadastro/26-experiencia-respondida` Experiência respondida (a Ana: "Seu nível: Iniciante") | tela | ana | 121 | 77 | 0 | 1 | opção 52, a decidir 36, título 30, ação 2, justificativa 1 |
| `cadastro/27-experiencia-folha-selo-do-nivel` Folha "De onde vem isto" (o selo do nível) | folha | ana | 119 | 119 | 2 | 0 | a decidir 48, segurança 45, justificativa 15, ação 7, título 4 |
| `cadastro/28-rotina-vazia` Rotina: a 1ª pergunta, sem resposta | estado vazio | ana | 28 | 28 | 0 | 0 | título 11, opção 10, a decidir 4, ação 3 |
| `cadastro/29-rotina-folha-por-que-dias` Folha "Quantos dias" (por quê?) | folha | ana | 84 | 84 | 1 | 0 | a decidir 66, justificativa 15, título 2, ação 1 |
| `cadastro/30-rotina-erro-sem-resposta` Rotina: as mensagens de "falta" sem nenhuma resposta | erro | ana | 43 | 43 | 0 | 0 | a decidir 17, título 11, opção 10, ação 3, estado 2 |
| `cadastro/31-rotina-2a-pergunta` Rotina: a 2ª pergunta aparece ("Quantos minutos por treino?") | tela | ana | 49 | 49 | 0 | 0 | opção 21, título 15, a decidir 10, ação 3 |
| `cadastro/32-rotina-minutos-outro` Rotina: minutos em "Outro", com o campo vazio | tela | ana | 84 | 56 | 0 | 0 | opção 28, a decidir 22, título 21, privacidade 7, ação 6 |
| `cadastro/33-rotina-minutos-outro-erro` Rotina: "Outro" sem número válido | erro | ana | 103 | 54 | 0 | 0 | a decidir 39, opção 28, título 21, privacidade 7, ação 6, estado 2 |
| `cadastro/34-rotina-3a-pergunta` Rotina: a 3ª pergunta aparece (grupos a priorizar) | tela | ana | 75 | 63 | 0 | 0 | opção 28, título 21, a decidir 13, privacidade 7, ação 6 |
| `cadastro/35-rotina-folha-por-que-grupos` Folha "Grupos prioritários" (por quê?) | folha | ana | 329 | 181 | 5 | 0 | a decidir 285, justificativa 32, ação 10, título 2 |
| `cadastro/36-rotina-foco-3-grupos` Rotina: 3 grupos marcados (a nota "Com mais de 2 grupos…") | aviso | ana | 101 | 63 | 1 | 0 | opção 28, estado 26, título 21, a decidir 13, privacidade 7, ação 6 |
| `cadastro/37-rotina-foco-bracos` Rotina: Peito e Braços marcados (a nota "Braços conta como 2") | aviso | ana | 105 | 63 | 1 | 0 | estado 30, opção 28, título 21, a decidir 13, privacidade 7, ação 6 |
| `cadastro/38-rotina-respondida` Rotina respondida (a Ana: 3 dias, 45 min, Pernas e Glúteos) | tela | ana | 108 | 84 | 1 | 0 | estado 33, opção 28, título 21, a decidir 13, privacidade 7, ação 6 |
| `cadastro/39-equipamento-lugar` Equipamento: "Onde você treina?", sem nada marcado | estado vazio | ana | 73 | 73 | 0 | 0 | ação 45, privacidade 17, título 7, a decidir 4 |
| `cadastro/40-equipamento-folha-da-foto` Folha "Reconhecer pela foto" (como abre na 1ª vez) | folha | ana | 194 | 170 | 2 | 1 | a decidir 109, privacidade 58, opção 14, título 11, ação 1, justificativa 1 |
| `cadastro/41-equipamento-lugar-academia` Equipamento: depois do atalho "Academia completa" | tela | ana | 170 | 88 | 1 | 2 | a decidir 56, ação 50, título 24, opção 21, privacidade 17, justificativa 2 |
| `cadastro/42-equipamento-lugar-condominio` Equipamento: depois do atalho "Condomínio com multifuncional" | tela | ana | 124 | 89 | 0 | 1 | ação 50, a decidir 26, privacidade 17, título 15, opção 15, justificativa 1 |
| `cadastro/43-equipamento-lugar-casa` Equipamento: depois do atalho "Casa com halteres e elásticos" | tela | ana | 129 | 86 | 0 | 1 | ação 50, a decidir 26, opção 20, privacidade 17, título 15, justificativa 1 |
| `cadastro/44-equipamento-lugar-corpo` Equipamento: depois do atalho "Corpo livre" | tela | ana | 95 | 95 | 0 | 1 | ação 45, a decidir 25, privacidade 17, título 7, justificativa 1 |
| `cadastro/45-equipamento-folha-selo-dos-atalhos` Folha "De onde vem isto" (o selo dos atalhos de lugar) | folha | ana | 101 | 101 | 2 | 0 | a decidir 81, justificativa 15, título 4, ação 1 |
| `cadastro/46-equipamento-item-por-item-academia` Equipamento: item por item, com os itens da "Academia completa" marcados | tela | ana | 322 | 70 | 1 | 2 | a decidir 142, ação 101, título 30, opção 30, privacidade 17, justificativa 2 |
| `cadastro/47-equipamento-folha-selo-da-menor-anilha` Folha "De onde vem isto" (o selo da menor anilha) | folha | ana | 81 | 81 | 1 | 0 | a decidir 61, justificativa 15, título 4, ação 1 |
| `cadastro/48-equipamento-item-por-item-vazio` Equipamento: item por item, sem nada marcado (categoria "Halteres e anilhas") | estado vazio | ana | 120 | 78 | 0 | 1 | ação 56, a decidir 28, privacidade 17, título 9, opção 9, justificativa 1 |
| `cadastro/49-equipamento-categoria-bancos` Equipamento: item por item, categoria "Bancos" | tela | ana | 121 | 54 | 0 | 1 | ação 56, a decidir 28, privacidade 17, opção 10, título 9, justificativa 1 |
| `cadastro/50-equipamento-categoria-polias-e-acessorios` Equipamento: item por item, categoria "Polias e acessórios" | tela | ana | 128 | 59 | 0 | 1 | ação 56, a decidir 28, opção 17, privacidade 17, título 9, justificativa 1 |
| `cadastro/51-equipamento-categoria-barras` Equipamento: item por item, categoria "Barras" | tela | ana | 120 | 58 | 0 | 1 | ação 56, a decidir 28, privacidade 17, título 9, opção 9, justificativa 1 |
| `cadastro/52-equipamento-categoria-maquinas` Equipamento: item por item, categoria "Máquinas" | tela | ana | 156 | 58 | 0 | 1 | ação 56, opção 45, a decidir 28, privacidade 17, título 9, justificativa 1 |
| `cadastro/53-equipamento-categoria-outros-acessorios` Equipamento: item por item, categoria "Outros acessórios" | tela | ana | 122 | 56 | 0 | 1 | ação 56, a decidir 28, privacidade 17, opção 11, título 9, justificativa 1 |
| `cadastro/54-equipamento-busca-sem-resultado` Equipamento: busca sem resultado | estado vazio | ana | 123 | 83 | 0 | 1 | ação 56, a decidir 40, privacidade 17, título 9, justificativa 1 |
| `cadastro/55-equipamento-busca-com-resultado` Equipamento: busca com resultado | tela | ana | 113 | 56 | 0 | 1 | ação 56, a decidir 28, privacidade 17, título 9, opção 2, justificativa 1 |
| `cadastro/56-equipamento-folha-halteres-fixos` Folha de detalhes: Halteres fixos | folha | ana | 62 | 62 | 0 | 0 | opção 39, título 12, a decidir 9, ação 2 |
| `cadastro/57-equipamento-folha-halteres-fixos-outro` Folha de detalhes: Halteres fixos, com "Outro" em "O mais leve" | folha | ana | 68 | 67 | 0 | 0 | opção 39, a decidir 15, título 12, ação 2 |
| `cadastro/58-equipamento-folha-anilhas-e-manoplas` Folha de detalhes: Anilhas e manoplas | folha | ana | 90 | 58 | 0 | 0 | número 27, ação 21, opção 15, título 14, a decidir 13 |
| `cadastro/59-equipamento-folha-polia-simples` Folha de detalhes: Polia simples | folha | ana | 12 | 12 | 0 | 0 | título 6, opção 4, ação 2 |
| `cadastro/60-equipamento-folha-banco-regulavel` Folha de detalhes: Banco regulável | folha | ana | 14 | 14 | 0 | 0 | título 10, ação 2, opção 2 |
| `cadastro/61-equipamento-folha-elasticos` Folha de detalhes: Elásticos | folha | ana | 14 | 14 | 0 | 0 | título 6, opção 6, ação 2 |
| `cadastro/62-equipamento-folha-polia-dupla-crossover` Folha de detalhes: Polia dupla (crossover) | folha | ana | 9 | 9 | 0 | 0 | ação 6, título 3 |
| `cadastro/63-equipamento-folha-polia-dupla-placas` Folha de detalhes: Polia dupla, com "Placas da torre (opcional)" aberto | bloco aberto | ana | 17 | 17 | 0 | 0 | a decidir 8, ação 6, título 3 |
| `cadastro/64-equipamento-folha-multifuncional` Folha de detalhes: Multifuncional | folha | ana | 23 | 23 | 0 | 0 | opção 8, a decidir 7, título 6, ação 2 |
| `cadastro/65-equipamento-folha-kettlebell` Folha de detalhes: Kettlebell | folha | ana | 36 | 36 | 0 | 0 | opção 22, a decidir 7, título 5, ação 2 |
| `cadastro/66-equipamento-folha-caneleiras-de-peso` Folha de detalhes: Caneleiras de peso | folha | ana | 35 | 35 | 0 | 0 | opção 16, título 10, a decidir 7, ação 2 |
| `cadastro/67-equipamento-folha-mini-band` Folha de detalhes: Mini-band | folha | ana | 14 | 14 | 0 | 0 | título 6, opção 6, ação 2 |
| `cadastro/68-equipamento-folha-voador` Folha de detalhes: Voador | folha | ana | 15 | 15 | 0 | 0 | título 11, ação 2, opção 2 |
| `cadastro/69-equipamento-folha-maquina-de-triceps` Folha de detalhes: Máquina de tríceps | folha | ana | 15 | 15 | 0 | 0 | título 11, ação 2, opção 2 |
| `cadastro/70-equipamento-folha-halteres-fixos-erro` Folha de detalhes: Halteres fixos, com o que falta | erro | ana | 68 | 68 | 0 | 0 | opção 39, a decidir 15, título 12, ação 2 |
| `cadastro/71-equipamento-erro-detalhes-por-completar` Equipamento: "Falta pouco", com os itens marcados "falta completar" | erro | ana | 226 | 80 | 0 | 1 | ação 80, a decidir 68, opção 45, privacidade 17, título 13, estado 2, justificativa 1 |
| `cadastro/72-equipamento-folha-anilhas-e-manoplas-erro` Folha de detalhes: Anilhas e manoplas, com o que falta | erro | ana | 113 | 76 | 0 | 0 | a decidir 36, número 27, ação 21, opção 15, título 14 |
| `cadastro/73-equipamento-folha-polia-simples-erro` Folha de detalhes: Polia simples, com o que falta | erro | ana | 12 | 12 | 0 | 0 | título 6, opção 4, ação 2 |
| `cadastro/74-equipamento-folha-banco-regulavel-erro` Folha de detalhes: Banco regulável, com o que falta | erro | ana | 14 | 14 | 0 | 0 | título 10, ação 2, opção 2 |
| `cadastro/75-equipamento-folha-elasticos-erro` Folha de detalhes: Elásticos, com o que falta | erro | ana | 21 | 21 | 0 | 0 | a decidir 7, título 6, opção 6, ação 2 |
| `cadastro/76-equipamento-folha-multifuncional-erro` Folha de detalhes: Multifuncional, com o que falta | erro | ana | 23 | 23 | 0 | 0 | opção 8, a decidir 7, título 6, ação 2 |
| `cadastro/77-equipamento-folha-kettlebell-erro` Folha de detalhes: Kettlebell, com o que falta | erro | ana | 43 | 43 | 0 | 0 | opção 22, a decidir 14, título 5, ação 2 |
| `cadastro/78-equipamento-folha-caneleiras-de-peso-erro` Folha de detalhes: Caneleiras de peso, com o que falta | erro | ana | 42 | 42 | 0 | 0 | opção 16, a decidir 14, título 10, ação 2 |
| `cadastro/79-equipamento-folha-mini-band-erro` Folha de detalhes: Mini-band, com o que falta | erro | ana | 21 | 21 | 0 | 0 | a decidir 7, título 6, opção 6, ação 2 |
| `cadastro/80-equipamento-folha-voador-erro` Folha de detalhes: Voador, com o que falta | erro | ana | 15 | 15 | 0 | 0 | título 11, ação 2, opção 2 |
| `cadastro/81-equipamento-folha-maquina-de-triceps-erro` Folha de detalhes: Máquina de tríceps, com o que falta | erro | ana | 15 | 15 | 0 | 0 | título 11, ação 2, opção 2 |

## Os 60 textos que mais pesam (palavras × vezes em que aparecem)

| Palavras | Vezes | Dono | Função | Texto | Onde |
|---|---|---|---|---|---|
| 17 | 15 | tela | privacidade | Dá para mudar depois, em Meus dados. Sem nada marcado, o programa usa o peso do corpo. | cadastro/39-equipamento-lugar e mais 14 |
| 21 | 10 | domínio | a decidir | Sem equipamento: o programa usa o chão, uma parede e uma cadeira firme. Dá para marcar algum item depois, se aparecer. | cadastro/44-equipamento-lugar-corpo e mais 9 |
| 41 | 5 | conteúdo | justificativa | Projeto treino-mvp (2026). Inferência/consenso do projeto, sem fonte primária. Usada quando uma regra é escolha do projeto (por exemplo, margem de +10% no tempo… | cadastro/06-saude-folha-por-que-perguntamos e mais 4 |
| 12 | 15 | domínio | ação | Casa com halteres e elásticos Pergunta só o que muda o programa | cadastro/39-equipamento-lugar e mais 14 |
| 156 | 1 | domínio | privacidade | Texto da foto do equipamento e consentimento antes do 1º envio (R5c, 07/11/2026). A foto é o único dado que sai do aparelho e pode ser dado pessoal (mostra a ca… | cadastro/04-boas-vindas-folha-selo-da-foto |
| 15 | 10 | tela | justificativa | Consenso de especialistas. Prática de treinadores e posicionamentos, sem ensaio que teste este número. | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 8 |
| 28 | 5 | domínio | opção | Problema em osso, articulação, músculo ou tendão Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar c… | cadastro/08-saude-quais-valem e mais 4 |
| 9 | 15 | tela | ação | Condomínio com multifuncional Alguns halteres, banco e uma estação | cadastro/39-equipamento-lugar e mais 14 |
| 8 | 15 | tela | ação | Corpo livre Sem equipamento: chão, parede e cadeira | cadastro/39-equipamento-lugar e mais 14 |
| 39 | 3 | tela | segurança | Para cada região, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o app prefere outros; até 2, o programa… | cadastro/10-saude-quais-valem-regioes-erro-sem-regiao e mais 2 |
| 22 | 5 | domínio | opção | Perdeu o equilíbrio por tontura, ou desmaiou, no último ano Nos últimos 12 meses, você perdeu o equilíbrio por tontura ou desmaiou? | cadastro/08-saude-quais-valem e mais 4 |
| 21 | 5 | domínio | opção | Febre, gripe forte ou se recuperando de doença Você está com febre, gripe forte ou se recuperando de alguma doença agora? | cadastro/08-saude-quais-valem e mais 4 |
| 7 | 15 | tela | ação | Academia completa Halteres, polias, barras e máquinas | cadastro/39-equipamento-lugar e mais 14 |
| 19 | 5 | domínio | opção | Problema no coração ou pressão alta Algum médico já disse que você tem problema no coração ou pressão alta? | cadastro/08-saude-quais-valem e mais 4 |
| 91 | 1 | domínio | a decidir | Escolha até 2 grupos de foco (R5d, 08/11/2026; D-3 de `docs/revisoes/proximos-passos/a-qualidade.md`; R3 de `pesquisa-v2/15`): o cadastro recomenda até 2 grupos… | cadastro/35-rotina-folha-por-que-grupos |
| 18 | 5 | domínio | opção | Dor no peito Você sente dor no peito em repouso, no dia a dia ou quando faz esforço? | cadastro/08-saude-quais-valem e mais 4 |
| 18 | 5 | domínio | opção | Médico pediu exercício só com acompanhamento Algum médico já disse que você só deveria fazer exercício com acompanhamento? | cadastro/08-saude-quais-valem e mais 4 |
| 43 | 2 | conteúdo | justificativa | Schwartz J, Takito MY, Warburton DER, et al. (2021). Translation, Cultural Adaptation, and Reproducibility of the Physical Activity Readiness Questionnaire for … | cadastro/06-saude-folha-por-que-perguntamos e mais 1 |
| 85 | 1 | tela | privacidade | O seu perfil, as respostas de saúde, o programa e os treinos ficam guardados só neste aparelho. A única coisa que sai do aparelho é a foto do equipamento, se vo… | cadastro/03-boas-vindas-folha-seus-dados |
| 17 | 5 | domínio | opção | Outra doença crônica Você tem alguma doença crônica diagnosticada além de problema no coração ou pressão alta? | cadastro/08-saude-quais-valem e mais 4 |
| 17 | 5 | domínio | opção | Gravidez, ou bebê nos últimos 6 meses Você está grávida ou teve bebê nos últimos 6 meses? | cadastro/08-saude-quais-valem e mais 4 |
| 9 | 9 | tela | a decidir | Conte só o tempo contínuo, sem pausas de meses. | cadastro/18-experiencia-vazia e mais 8 |
| 40 | 2 | conteúdo | segurança | Warburton DER, Jamnik VK, Bredin SSD, Gledhill N (2011). The Physical Activity Readiness Questionnaire for Everyone (PAR-Q+) and Electronic Physical Activity Re… | cadastro/06-saude-folha-por-que-perguntamos e mais 1 |
| 11 | 7 | tela | a decidir | Depois de uma pausa, o programa começa com semanas mais leves. | cadastro/20-experiencia-2a-pergunta e mais 6 |
| 38 | 2 | conteúdo | justificativa | Riebe D, Franklin BA, Thompson PD, Garber CE, Whitfield GP, Magal M, Pescatello LS (2015). Updating ACSM's Recommendations for Exercise Preparticipation Health … | cadastro/06-saude-folha-por-que-perguntamos e mais 1 |
| 8 | 9 | tela | título | Há quanto tempo você treina musculação sem parar? | cadastro/18-experiencia-vazia e mais 8 |
| 34 | 2 | conteúdo | justificativa | Brasil, Ministério da Saúde, Secretaria de Atenção Primária à Saúde (2021). Guia de Atividade Física para a População Brasileira. Brasília: Ministério da Saúde,… | cadastro/06-saude-folha-por-que-perguntamos e mais 1 |
| 33 | 2 | conteúdo | justificativa | Bredin SSD, Gledhill N, Jamnik VK, Warburton DER (2013). PAR-Q+ and ePARmed-X+: New risk stratification and physical activity clearance strategy for physicians … | cadastro/06-saude-folha-por-que-perguntamos e mais 1 |
| 11 | 6 | tela | título | Você tem confiança na técnica dos exercícios básicos (agachamento, supino, remada)? | cadastro/21-experiencia-3a-pergunta e mais 5 |
| 13 | 5 | tela | a decidir | Marque as que valem. No fim, você confirma que as outras não valem. | cadastro/08-saude-quais-valem e mais 4 |
| 3 | 21 | tela | ação | abrir a fonte | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 5 |
| 21 | 3 | domínio | a decidir | Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar com exercício? | cadastro/07-saude-folha-perguntas-completas e mais 2 |
| 9 | 7 | domínio | opção | Estou treinando (ou parei há menos de 2 semanas) | cadastro/20-experiencia-2a-pergunta e mais 6 |
| 7 | 9 | tela | título | Quantos dias por semana você pode treinar? | cadastro/28-rotina-vazia e mais 8 |
| 15 | 4 | domínio | segurança | Você sente dor no peito em repouso, no dia a dia ou quando faz esforço? | cadastro/07-saude-folha-perguntas-completas e mais 3 |
| 12 | 5 | domínio | opção | Remédio para doença crônica Você toma remédio receitado para alguma doença crônica? | cadastro/08-saude-quais-valem e mais 4 |
| 4 | 15 | domínio | a decidir | Passo 4 de 4 | cadastro/39-equipamento-lugar e mais 14 |
| 4 | 15 | tela | título | Que equipamento você tem? | cadastro/39-equipamento-lugar e mais 14 |
| 30 | 2 | tela | a decidir | Vale para leg press, hack ou pendular, smith, panturrilha sentada, barra longa, barra hexagonal. É o passo para subir a carga. Se não souber, o app usa 2 kg. | cadastro/41-equipamento-lugar-academia e mais 1 |
| 14 | 4 | domínio | segurança | Você tem alguma doença crônica diagnosticada além de problema no coração ou pressão alta? | cadastro/07-saude-folha-perguntas-completas e mais 3 |
| 6 | 9 | domínio | opção | De 6 meses a 2 anos | cadastro/18-experiencia-vazia e mais 8 |
| 13 | 4 | domínio | segurança | Algum médico já disse que você tem problema no coração ou pressão alta? | cadastro/07-saude-folha-perguntas-completas e mais 3 |
| 1 | 51 | tela | ação | Tirar | cadastro/46-equipamento-item-por-item-academia e mais 1 |
| 7 | 7 | domínio | opção | Parei há 3 semanas a 6 meses | cadastro/20-experiencia-2a-pergunta e mais 6 |
| 12 | 4 | domínio | segurança | Nos últimos 12 meses, você perdeu o equilíbrio por tontura ou desmaiou? | cadastro/07-saude-folha-perguntas-completas e mais 3 |
| 12 | 4 | domínio | segurança | Algum médico já disse que você só deveria fazer exercício com acompanhamento? | cadastro/07-saude-folha-perguntas-completas e mais 3 |
| 16 | 3 | tela | segurança | Dor forte, que piora ou que dura mais de 1 a 2 semanas pede avaliação profissional. | cadastro/10-saude-quais-valem-regioes-erro-sem-regiao e mais 2 |
| 24 | 2 | domínio | segurança | Antes de começar, procure um médico ou profissional de Educação Física. O programa automático fica disponível quando você confirmar que foi avaliado e liberado. | cadastro/15-saude-pausa e mais 1 |
| 48 | 1 | jurídico | a decidir | A Anthropic diz que apaga o que recebe em até 30 dias, salvo se o envio for marcado como violação da política de uso dela (aí pode guardar até 2 anos) ou se a l… | cadastro/40-equipamento-folha-da-foto |
| 46 | 1 | conteúdo | a decidir | Remmert JF, Pelland JC, Robinson ZP, Hinson SR, Zourdos MC (2025). Is There Too Much of a Good Thing? Meta-Regressions of the Effect of Per-Session Volume on Hy… | cadastro/35-rotina-folha-por-que-grupos |
| 45 | 1 | conteúdo | segurança | Ratamess NA, Alvar BA, Evetovich TK, Housh TJ, Kibler WB, Kraemer WJ, Triplett NT (2009). American College of Sports Medicine position stand. Progression models… | cadastro/27-experiencia-folha-selo-do-nivel |
| 3 | 15 | tela | título | Onde você treina? | cadastro/39-equipamento-lugar e mais 14 |
| 3 | 15 | tela | ação | Item por item | cadastro/39-equipamento-lugar e mais 14 |
| 3 | 15 | tela | ação | Gerar meu programa | cadastro/39-equipamento-lugar e mais 14 |
| 22 | 2 | tela | a decidir | Um toque marcou 39 itens típicos. Confira e tire o que não tiver; a 1ª série de cada exercício acerta a carga. | cadastro/41-equipamento-lugar-academia e mais 1 |
| 6 | 7 | domínio | opção | Parei há mais de 6 meses | cadastro/20-experiencia-2a-pergunta e mais 6 |
| 7 | 6 | domínio | opção | Sim, faço os exercícios básicos com segurança | cadastro/21-experiencia-3a-pergunta e mais 5 |
| 6 | 7 | tela | a decidir | Tempo total, com aquecimento e descansos. | cadastro/31-rotina-2a-pergunta e mais 6 |
| 7 | 6 | tela | privacidade | Dá para mudar depois, em Meus dados. | cadastro/32-rotina-minutos-outro e mais 5 |
| 1 | 41 | tela | ação | Voltar | cadastro/05-saude e mais 40 |

## Controles sem nome acessível

Nenhum.

## Passos da colheita que falharam

- [claro/cadastro-ana] equipamento, um detalhe só por completar: TimeoutError: locator.evaluate: Timeout 8000ms exceeded.
- [claro/cadastro-ana] equipamento, os números dos halteres: TimeoutError: locator.getAttribute: Timeout 8000ms exceeded.
- [claro/cadastro-ana] o roteiro parou antes do fim: Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed
- [montagem] cadastro/01-boas-vindas: sem a captura do projeto escuro
- [montagem] cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz: sem a captura do projeto escuro
- [montagem] cadastro/03-boas-vindas-folha-seus-dados: sem a captura do projeto escuro
- [montagem] cadastro/04-boas-vindas-folha-selo-da-foto: sem a captura do projeto escuro
- [montagem] cadastro/05-saude: sem a captura do projeto escuro
- [montagem] cadastro/06-saude-folha-por-que-perguntamos: sem a captura do projeto escuro
- [montagem] cadastro/07-saude-folha-perguntas-completas: sem a captura do projeto escuro
- [montagem] cadastro/08-saude-quais-valem: sem a captura do projeto escuro
- [montagem] cadastro/09-saude-quais-valem-erro-nenhuma-marcada: sem a captura do projeto escuro
- [montagem] cadastro/10-saude-quais-valem-regioes-erro-sem-regiao: sem a captura do projeto escuro
- [montagem] cadastro/11-saude-quais-valem-regioes-erro-sem-notas: sem a captura do projeto escuro
- [montagem] cadastro/12-saude-quais-valem-regioes-erro-sem-uma-nota: sem a captura do projeto escuro
- [montagem] cadastro/13-saude-folha-confirmar-nao-marcadas: sem a captura do projeto escuro
- [montagem] cadastro/14-saude-folha-confirmar-nao-marcada-uma: sem a captura do projeto escuro
- [montagem] cadastro/15-saude-pausa: sem a captura do projeto escuro
- [montagem] cadastro/16-saude-pausa-folha-selo: sem a captura do projeto escuro
- [montagem] cadastro/17-saude-pausa-liberacao-marcada: sem a captura do projeto escuro
- [montagem] cadastro/18-experiencia-vazia: sem a captura do projeto escuro
- [montagem] cadastro/19-experiencia-erro-sem-resposta: sem a captura do projeto escuro
- [montagem] cadastro/20-experiencia-2a-pergunta: sem a captura do projeto escuro
- [montagem] cadastro/21-experiencia-3a-pergunta: sem a captura do projeto escuro
- [montagem] cadastro/22-experiencia-nivel-avancado: sem a captura do projeto escuro
- [montagem] cadastro/23-experiencia-nivel-intermediario: sem a captura do projeto escuro
- [montagem] cadastro/24-experiencia-nivel-iniciante-pela-pausa: sem a captura do projeto escuro
- [montagem] cadastro/25-experiencia-nivel-iniciante-pela-tecnica: sem a captura do projeto escuro
- [montagem] cadastro/26-experiencia-respondida: sem a captura do projeto escuro
- [montagem] cadastro/27-experiencia-folha-selo-do-nivel: sem a captura do projeto escuro
- [montagem] cadastro/28-rotina-vazia: sem a captura do projeto escuro
- [montagem] cadastro/29-rotina-folha-por-que-dias: sem a captura do projeto escuro
- [montagem] cadastro/30-rotina-erro-sem-resposta: sem a captura do projeto escuro
- [montagem] cadastro/31-rotina-2a-pergunta: sem a captura do projeto escuro
- [montagem] cadastro/32-rotina-minutos-outro: sem a captura do projeto escuro
- [montagem] cadastro/33-rotina-minutos-outro-erro: sem a captura do projeto escuro
- [montagem] cadastro/34-rotina-3a-pergunta: sem a captura do projeto escuro
- [montagem] cadastro/35-rotina-folha-por-que-grupos: sem a captura do projeto escuro
- [montagem] cadastro/36-rotina-foco-3-grupos: sem a captura do projeto escuro
- [montagem] cadastro/37-rotina-foco-bracos: sem a captura do projeto escuro
- [montagem] cadastro/38-rotina-respondida: sem a captura do projeto escuro
- [montagem] cadastro/39-equipamento-lugar: sem a captura do projeto escuro
- [montagem] cadastro/40-equipamento-folha-da-foto: sem a captura do projeto escuro
- [montagem] cadastro/41-equipamento-lugar-academia: sem a captura do projeto escuro
- [montagem] cadastro/42-equipamento-lugar-condominio: sem a captura do projeto escuro
- [montagem] cadastro/43-equipamento-lugar-casa: sem a captura do projeto escuro
- [montagem] cadastro/44-equipamento-lugar-corpo: sem a captura do projeto escuro
- [montagem] cadastro/45-equipamento-folha-selo-dos-atalhos: sem a captura do projeto escuro
- [montagem] cadastro/46-equipamento-item-por-item-academia: sem a captura do projeto escuro
- [montagem] cadastro/47-equipamento-folha-selo-da-menor-anilha: sem a captura do projeto escuro
- [montagem] cadastro/48-equipamento-item-por-item-vazio: sem a captura do projeto escuro
- [montagem] cadastro/49-equipamento-categoria-bancos: sem a captura do projeto escuro
- [montagem] cadastro/50-equipamento-categoria-polias-e-acessorios: sem a captura do projeto escuro
- [montagem] cadastro/51-equipamento-categoria-barras: sem a captura do projeto escuro
- [montagem] cadastro/52-equipamento-categoria-maquinas: sem a captura do projeto escuro
- [montagem] cadastro/53-equipamento-categoria-outros-acessorios: sem a captura do projeto escuro
- [montagem] cadastro/54-equipamento-busca-sem-resultado: sem a captura do projeto escuro
- [montagem] cadastro/55-equipamento-busca-com-resultado: sem a captura do projeto escuro
- [montagem] cadastro/56-equipamento-folha-halteres-fixos: sem a captura do projeto escuro
- [montagem] cadastro/57-equipamento-folha-halteres-fixos-outro: sem a captura do projeto escuro
- [montagem] cadastro/58-equipamento-folha-anilhas-e-manoplas: sem a captura do projeto escuro
- [montagem] cadastro/59-equipamento-folha-polia-simples: sem a captura do projeto escuro
- [montagem] cadastro/60-equipamento-folha-banco-regulavel: sem a captura do projeto escuro
- [montagem] cadastro/61-equipamento-folha-elasticos: sem a captura do projeto escuro
- [montagem] cadastro/62-equipamento-folha-polia-dupla-crossover: sem a captura do projeto escuro
- [montagem] cadastro/63-equipamento-folha-polia-dupla-placas: sem a captura do projeto escuro
- [montagem] cadastro/64-equipamento-folha-multifuncional: sem a captura do projeto escuro
- [montagem] cadastro/65-equipamento-folha-kettlebell: sem a captura do projeto escuro
- [montagem] cadastro/66-equipamento-folha-caneleiras-de-peso: sem a captura do projeto escuro
- [montagem] cadastro/67-equipamento-folha-mini-band: sem a captura do projeto escuro
- [montagem] cadastro/68-equipamento-folha-voador: sem a captura do projeto escuro
- [montagem] cadastro/69-equipamento-folha-maquina-de-triceps: sem a captura do projeto escuro
- [montagem] cadastro/70-equipamento-folha-halteres-fixos-erro: sem a captura do projeto escuro
- [montagem] cadastro/71-equipamento-erro-detalhes-por-completar: sem a captura do projeto escuro
- [montagem] cadastro/72-equipamento-folha-anilhas-e-manoplas-erro: sem a captura do projeto escuro
- [montagem] cadastro/73-equipamento-folha-polia-simples-erro: sem a captura do projeto escuro
- [montagem] cadastro/74-equipamento-folha-banco-regulavel-erro: sem a captura do projeto escuro
- [montagem] cadastro/75-equipamento-folha-elasticos-erro: sem a captura do projeto escuro
- [montagem] cadastro/76-equipamento-folha-multifuncional-erro: sem a captura do projeto escuro
- [montagem] cadastro/77-equipamento-folha-kettlebell-erro: sem a captura do projeto escuro
- [montagem] cadastro/78-equipamento-folha-caneleiras-de-peso-erro: sem a captura do projeto escuro
- [montagem] cadastro/79-equipamento-folha-mini-band-erro: sem a captura do projeto escuro
- [montagem] cadastro/80-equipamento-folha-voador-erro: sem a captura do projeto escuro
- [montagem] cadastro/81-equipamento-folha-maquina-de-triceps-erro: sem a captura do projeto escuro
