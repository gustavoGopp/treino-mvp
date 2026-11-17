# Inventário do texto do app

> Gerado por `scripts/textos/classificar.mjs` a partir de `colheita.json` (2026-11-17T12:31:46.206Z). Não edite à mão: rode o roteiro e o script de novo.

**424 telas, folhas e estados colhidos; 9702 textos (1925 diferentes); 44338 palavras somadas** (a mesma frase conta de novo em cada tela em que aparece; as palavras de textos diferentes somam 16542).

## Por fluxo

| Fluxo | Telas | Palavras | Média por tela | Maior tela |
|---|---|---|---|---|
| cadastro | 80 | 6114 | 76 | Saúde: 3 regiões marcadas, sem as notas de dor (349) |
| inicio | 85 | 11400 | 134 | "O seu programa", com os 5 blocos abertos (a Ana com dor) (977) |
| treino | 69 | 4186 | 61 | Treino: folha "Como fazer (em texto)", com o passo a passo aberto (204) |
| guia | 45 | 5978 | 133 | Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, com os 7 blocos abertos (418) |
| fim-e-semana | 38 | 3693 | 97 | "Entenda o treino", com "A sua semana e as pausas" aberto, na volta de uma pausa de 22 dias (a semana e a mensagem da pausa) (243) |
| dados-e-locais | 53 | 7404 | 140 | "Entenda o treino", com "Todas as regras e as fontes" aberto (as regras fechadas) (1200) |
| termos-e-foto | 29 | 3622 | 125 | Termos de uso e privacidade (792) |
| avisos-e-erros | 25 | 1941 | 78 | Tela de erro, depois de exportar e com "Avisar um problema" aberto (139) |

## Para que serve o texto (todas as telas somadas)

| Função | Textos | Palavras | Parte | Decididos à mão |
|---|---|---|---|---|
| ação | 4036 | 13175 | 30% | 0 |
| opção | 1310 | 4231 | 10% | 0 |
| título ou rótulo | 1385 | 4078 | 9% | 16 |
| estado | 446 | 4581 | 10% | 205 |
| número | 882 | 2407 | 5% | 89 |
| segurança | 232 | 3718 | 8% | 15 |
| definição | 59 | 517 | 1% | 37 |
| justificativa | 383 | 2823 | 6% | 33 |
| privacidade | 243 | 4567 | 10% | 27 |
| instrução | 726 | 4241 | 10% | 58 |

## De quem é o texto

| Dono | Textos | Palavras | Parte |
|---|---|---|---|
| jurídico | 328 | 2547 | 6% |
| conteúdo | 986 | 7298 | 16% |
| domínio | 2661 | 13892 | 31% |
| motor | 124 | 398 | 1% |
| tela | 5603 | 20203 | 46% |

## cadastro

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `cadastro/01-boas-vindas` Boas-vindas | tela | ana | 53 | 53 | 0 | 0 | ação 25, segurança 14, título ou rótulo 7, privacidade 7 |
| `cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz` Folha "O que o app não faz" | folha | ana | 132 | 132 | 3 | 0 | segurança 70, justificativa 48, título ou rótulo 7, ação 7 |
| `cadastro/03-boas-vindas-folha-seus-dados` Folha "Seus dados ficam no aparelho" | folha | ana | 92 | 92 | 1 | 0 | privacidade 90, ação 2 |
| `cadastro/04-saude` Saúde: a pergunta geral, com as 9 condições | tela | ana | 83 | 84 | 0 | 0 | segurança 62, ação 13, título ou rótulo 5, número 3 |
| `cadastro/05-saude-folha-perguntas-completas` Folha "As 9 perguntas completas" | folha | ana | 137 | 137 | 0 | 0 | segurança 132, título ou rótulo 4, ação 1 |
| `cadastro/06-saude-quais-valem` Saúde: quais valem (as 9 perguntas para marcar) | tela | ana | 185 | 129 | 0 | 0 | opção 172, título ou rótulo 4, instrução 4, número 3, ação 2 |
| `cadastro/07-saude-quais-valem-erro-nenhuma-marcada` Saúde: quais valem, sem nenhuma marcada | erro | ana | 198 | 111 | 0 | 0 | opção 172, estado 13, título ou rótulo 4, instrução 4, número 3, ação 2 |
| `cadastro/08-saude-quais-valem-regioes-erro-sem-regiao` Saúde: quais valem, com "Quais regiões?" e nenhuma região marcada | erro | ana | 258 | 80 | 1 | 0 | opção 179, segurança 55, estado 9, título ou rótulo 6, instrução 4, número 3, ação 2 |
| `cadastro/09-saude-quais-valem-regioes-erro-sem-notas` Saúde: 3 regiões marcadas, sem as notas de dor | erro | ana | 349 | 84 | 1 | 0 | opção 212, segurança 105, estado 17, título ou rótulo 6, instrução 4, número 3, ação 2 |
| `cadastro/10-saude-quais-valem-regioes-erro-sem-uma-nota` Saúde: 3 regiões marcadas, faltando 1 nota de dor | erro | ana | 338 | 84 | 1 | 0 | opção 212, segurança 104, estado 7, título ou rótulo 6, instrução 4, número 3, ação 2 |
| `cadastro/11-saude-folha-confirmar-nao-marcadas` Folha "Nenhuma destas vale para você?" (8 não marcadas) | folha | ana | 114 | 114 | 0 | 0 | segurança 97, ação 7, título ou rótulo 5, estado 5 |
| `cadastro/12-saude-folha-confirmar-nao-marcada-uma` Folha "Nenhuma destas vale para você?" (1 não marcada) | folha | ana | 29 | 29 | 0 | 0 | segurança 13, ação 7, título ou rótulo 5, estado 4 |
| `cadastro/13-saude-pausa` Saúde: "Vamos pausar o programa automático" (8 respostas "sim") | aviso | ana | 172 | 105 | 0 | 0 | segurança 133, opção 14, privacidade 10, título ou rótulo 5, estado 4, ação 3, número 3 |
| `cadastro/14-saude-pausa-liberacao-marcada` Saúde: a pausa, com a liberação marcada | aviso | ana | 172 | 105 | 0 | 0 | segurança 133, opção 14, privacidade 10, título ou rótulo 5, estado 4, ação 3, número 3 |
| `cadastro/15-experiencia-vazia` Experiência: a 1ª pergunta, sem resposta | estado vazio | ana | 27 | 28 | 0 | 0 | opção 14, título ou rótulo 9, número 3, ação 1 |
| `cadastro/16-experiencia-erro-sem-resposta` Experiência: as mensagens de "falta" sem nenhuma resposta | erro | ana | 56 | 57 | 0 | 0 | estado 29, opção 14, título ou rótulo 9, número 3, ação 1 |
| `cadastro/17-experiencia-2a-pergunta` Experiência: a 2ª pergunta aparece ("Você está treinando agora?") | tela | ana | 58 | 59 | 0 | 0 | opção 41, título ou rótulo 13, número 3, ação 1 |
| `cadastro/18-experiencia-3a-pergunta` Experiência: a 3ª pergunta aparece (confiança na técnica) | tela | ana | 74 | 69 | 0 | 0 | opção 46, título ou rótulo 24, número 3, ação 1 |
| `cadastro/19-experiencia-nivel-avancado` Experiência respondida: "Seu nível: Avançado", com "Quer começar num nível mais leve?" | tela | ana | 88 | 43 | 0 | 0 | opção 50, título ou rótulo 33, número 3, ação 2 |
| `cadastro/20-experiencia-nivel-intermediario` Experiência respondida: "Seu nível: Intermediário" | tela | ana | 87 | 72 | 0 | 0 | opção 49, título ou rótulo 33, número 3, ação 2 |
| `cadastro/21-experiencia-nivel-iniciante-pela-pausa` Experiência respondida: iniciante por mais de 6 meses parado | tela | ana | 78 | 72 | 0 | 0 | opção 46, título ou rótulo 27, número 3, ação 2 |
| `cadastro/22-experiencia-nivel-iniciante-pela-tecnica` Experiência respondida: iniciante por falta de confiança na técnica | tela | ana | 78 | 51 | 0 | 0 | opção 46, título ou rótulo 27, número 3, ação 2 |
| `cadastro/23-experiencia-respondida` Experiência respondida (a Ana: "Seu nível: Iniciante") | tela | ana | 78 | 51 | 0 | 0 | opção 46, título ou rótulo 27, número 3, ação 2 |
| `cadastro/24-rotina-vazia` Rotina: a 1ª pergunta, sem resposta | estado vazio | ana | 14 | 20 | 0 | 0 | título ou rótulo 5, opção 5, número 3, ação 1 |
| `cadastro/25-rotina-erro-sem-resposta` Rotina: as mensagens de "falta" sem nenhuma resposta | erro | ana | 29 | 35 | 0 | 0 | estado 15, título ou rótulo 5, opção 5, número 3, ação 1 |
| `cadastro/26-rotina-2a-pergunta` Rotina: a 2ª pergunta aparece ("Quantos minutos por treino?") | tela | ana | 28 | 39 | 0 | 0 | opção 11, título ou rótulo 9, definição 4, número 3, ação 1 |
| `cadastro/27-rotina-minutos-outro` Rotina: minutos em "Outro", com o campo vazio | tela | ana | 52 | 45 | 0 | 0 | opção 18, título ou rótulo 16, instrução 8, número 4, definição 4, ação 2 |
| `cadastro/28-rotina-minutos-outro-erro` Rotina: "Outro" sem número válido | erro | ana | 71 | 51 | 0 | 0 | estado 19, opção 18, título ou rótulo 16, instrução 8, número 4, definição 4, ação 2 |
| `cadastro/29-rotina-3a-pergunta` Rotina: a 3ª pergunta aparece (grupos a priorizar) | tela | ana | 43 | 44 | 0 | 0 | opção 18, título ou rótulo 13, definição 4, número 3, instrução 3, ação 2 |
| `cadastro/30-rotina-foco-3-grupos` Rotina: 3 grupos marcados (a nota "Com mais de 2 grupos…") | aviso | ana | 52 | 53 | 0 | 0 | opção 18, título ou rótulo 13, estado 9, definição 4, número 3, instrução 3, ação 2 |
| `cadastro/31-rotina-foco-bracos` Rotina: Peito e Braços marcados (a nota "Braços conta como 2") | aviso | ana | 57 | 58 | 0 | 0 | opção 18, estado 14, título ou rótulo 13, definição 4, número 3, instrução 3, ação 2 |
| `cadastro/32-rotina-respondida` Rotina respondida (a Ana: 3 dias, 45 min, Pernas e Glúteos) | tela | ana | 60 | 61 | 0 | 0 | opção 18, estado 17, título ou rótulo 13, definição 4, número 3, instrução 3, ação 2 |
| `cadastro/33-equipamento-lugar` Equipamento: "Onde você treina?", sem nada marcado | estado vazio | ana | 37 | 41 | 0 | 0 | ação 21, estado 10, número 3, título ou rótulo 3 |
| `cadastro/34-equipamento-folha-da-foto` Folha "Reconhecer pela foto" (como abre na 1ª vez) | folha | ana | 193 | 170 | 2 | 0 | privacidade 157, título ou rótulo 16, opção 14, estado 5, ação 1 |
| `cadastro/35-equipamento-item-por-item-vazio` Equipamento: item por item, sem nada marcado (categoria "Halteres e anilhas") | estado vazio | ana | 60 | 45 | 0 | 0 | ação 32, estado 10, opção 9, título ou rótulo 6, número 3 |
| `cadastro/36-equipamento-categoria-bancos` Equipamento: item por item, categoria "Bancos" | tela | ana | 61 | 45 | 0 | 0 | ação 32, opção 10, estado 10, título ou rótulo 6, número 3 |
| `cadastro/37-equipamento-categoria-polias-e-acessorios` Equipamento: item por item, categoria "Polias e acessórios" | tela | ana | 68 | 31 | 0 | 0 | ação 32, opção 17, estado 10, título ou rótulo 6, número 3 |
| `cadastro/38-equipamento-categoria-barras` Equipamento: item por item, categoria "Barras" | tela | ana | 60 | 31 | 0 | 0 | ação 32, estado 10, opção 9, título ou rótulo 6, número 3 |
| `cadastro/39-equipamento-categoria-maquinas` Equipamento: item por item, categoria "Máquinas" | tela | ana | 96 | 32 | 0 | 0 | opção 45, ação 32, estado 10, título ou rótulo 6, número 3 |
| `cadastro/40-equipamento-categoria-outros-acessorios` Equipamento: item por item, categoria "Outros acessórios" | tela | ana | 62 | 32 | 0 | 0 | ação 32, opção 11, estado 10, título ou rótulo 6, número 3 |
| `cadastro/41-equipamento-busca-sem-resultado` Equipamento: busca sem resultado | estado vazio | ana | 63 | 46 | 0 | 0 | ação 32, estado 22, título ou rótulo 6, número 3 |
| `cadastro/42-equipamento-busca-com-resultado` Equipamento: busca com resultado | tela | ana | 53 | 41 | 0 | 0 | ação 32, estado 10, título ou rótulo 6, número 3, opção 2 |
| `cadastro/43-equipamento-folha-halteres-fixos` Folha de detalhes: Halteres fixos | folha | ana | 53 | 53 | 0 | 0 | opção 39, título ou rótulo 12, ação 2 |
| `cadastro/44-equipamento-folha-halteres-fixos-outro` Folha de detalhes: Halteres fixos, com "Outro" em "O mais leve" | folha | ana | 59 | 59 | 0 | 0 | opção 39, título ou rótulo 17, ação 2, número 1 |
| `cadastro/45-equipamento-folha-anilhas-e-manoplas` Folha de detalhes: Anilhas e manoplas | folha | ana | 90 | 58 | 0 | 0 | número 28, ação 21, título ou rótulo 18, opção 15, instrução 8 |
| `cadastro/46-equipamento-folha-polia-simples` Folha de detalhes: Polia simples | folha | ana | 12 | 12 | 0 | 0 | título ou rótulo 6, opção 4, ação 2 |
| `cadastro/47-equipamento-folha-banco-regulavel` Folha de detalhes: Banco regulável | folha | ana | 14 | 14 | 0 | 0 | título ou rótulo 10, ação 2, opção 2 |
| `cadastro/48-equipamento-folha-elasticos` Folha de detalhes: Elásticos | folha | ana | 14 | 14 | 0 | 0 | título ou rótulo 6, opção 6, ação 2 |
| `cadastro/49-equipamento-folha-polia-dupla-crossover` Folha de detalhes: Polia dupla (crossover) | folha | ana | 9 | 9 | 0 | 0 | ação 6, título ou rótulo 3 |
| `cadastro/50-equipamento-folha-polia-dupla-placas` Folha de detalhes: Polia dupla, com "Placas da torre (opcional)" aberto | bloco aberto | ana | 17 | 17 | 0 | 0 | título ou rótulo 10, ação 6, número 1 |
| `cadastro/51-equipamento-folha-multifuncional` Folha de detalhes: Multifuncional | folha | ana | 23 | 23 | 0 | 0 | opção 8, definição 7, título ou rótulo 6, ação 2 |
| `cadastro/52-equipamento-folha-kettlebell` Folha de detalhes: Kettlebell | folha | ana | 36 | 36 | 0 | 0 | opção 22, definição 7, título ou rótulo 5, ação 2 |
| `cadastro/53-equipamento-folha-caneleiras-de-peso` Folha de detalhes: Caneleiras de peso | folha | ana | 35 | 35 | 0 | 0 | opção 16, título ou rótulo 10, definição 7, ação 2 |
| `cadastro/54-equipamento-folha-mini-band` Folha de detalhes: Mini-band | folha | ana | 14 | 14 | 0 | 0 | título ou rótulo 6, opção 6, ação 2 |
| `cadastro/55-equipamento-folha-voador` Folha de detalhes: Voador | folha | ana | 15 | 15 | 0 | 0 | título ou rótulo 11, ação 2, opção 2 |
| `cadastro/56-equipamento-folha-maquina-de-triceps` Folha de detalhes: Máquina de tríceps | folha | ana | 15 | 15 | 0 | 0 | título ou rótulo 11, ação 2, opção 2 |
| `cadastro/57-equipamento-folha-halteres-fixos-erro` Folha de detalhes: Halteres fixos, com o que falta | erro | ana | 71 | 71 | 0 | 0 | opção 39, estado 18, título ou rótulo 12, ação 2 |
| `cadastro/58-equipamento-erro-detalhes-por-completar` Equipamento: "Falta pouco", com os itens marcados "falta completar" | erro | ana | 164 | 53 | 0 | 0 | estado 59, opção 45, ação 44, título ou rótulo 13, número 3 |
| `cadastro/59-equipamento-folha-anilhas-e-manoplas-erro` Folha de detalhes: Anilhas e manoplas, com o que falta | erro | ana | 113 | 76 | 0 | 0 | número 28, estado 23, ação 21, título ou rótulo 18, opção 15, instrução 8 |
| `cadastro/60-equipamento-folha-polia-simples-erro` Folha de detalhes: Polia simples, com o que falta | erro | ana | 22 | 22 | 0 | 0 | estado 10, título ou rótulo 6, opção 4, ação 2 |
| `cadastro/61-equipamento-folha-banco-regulavel-erro` Folha de detalhes: Banco regulável, com o que falta | erro | ana | 20 | 20 | 0 | 0 | título ou rótulo 10, estado 6, ação 2, opção 2 |
| `cadastro/62-equipamento-folha-elasticos-erro` Folha de detalhes: Elásticos, com o que falta | erro | ana | 21 | 21 | 0 | 0 | estado 7, título ou rótulo 6, opção 6, ação 2 |
| `cadastro/63-equipamento-folha-multifuncional-erro` Folha de detalhes: Multifuncional, com o que falta | erro | ana | 30 | 30 | 0 | 0 | opção 8, definição 7, estado 7, título ou rótulo 6, ação 2 |
| `cadastro/64-equipamento-folha-kettlebell-erro` Folha de detalhes: Kettlebell, com o que falta | erro | ana | 43 | 43 | 0 | 0 | opção 22, definição 7, estado 7, título ou rótulo 5, ação 2 |
| `cadastro/65-equipamento-folha-caneleiras-de-peso-erro` Folha de detalhes: Caneleiras de peso, com o que falta | erro | ana | 42 | 42 | 0 | 0 | opção 16, título ou rótulo 10, definição 7, estado 7, ação 2 |
| `cadastro/66-equipamento-folha-mini-band-erro` Folha de detalhes: Mini-band, com o que falta | erro | ana | 21 | 21 | 0 | 0 | estado 7, título ou rótulo 6, opção 6, ação 2 |
| `cadastro/67-equipamento-folha-voador-erro` Folha de detalhes: Voador, com o que falta | erro | ana | 23 | 23 | 0 | 0 | título ou rótulo 11, estado 8, ação 2, opção 2 |
| `cadastro/68-equipamento-folha-maquina-de-triceps-erro` Folha de detalhes: Máquina de tríceps, com o que falta | erro | ana | 26 | 26 | 0 | 0 | título ou rótulo 11, estado 11, ação 2, opção 2 |
| `cadastro/69-equipamento-erro-um-detalhe` Equipamento: "Há 1 detalhe para completar." | erro | ana | 112 | 50 | 0 | 0 | opção 45, ação 33, estado 21, título ou rótulo 10, número 3 |
| `cadastro/70-equipamento-folha-halteres-fixos-erro-limites` Folha dos halteres: peso acima do limite e passo pequeno demais | erro | ana | 86 | 78 | 0 | 0 | opção 39, título ou rótulo 23, estado 20, ação 2, número 2 |
| `cadastro/71-equipamento-folha-halteres-fixos-erro-ordem` Folha dos halteres: o mais pesado menor que o mais leve | erro | ana | 77 | 69 | 0 | 0 | opção 39, título ou rótulo 23, estado 11, ação 2, número 2 |
| `cadastro/72-equipamento-folha-halteres-fixos-erro-passo` Folha dos halteres: passo maior que a diferença | erro | ana | 76 | 75 | 0 | 0 | opção 39, título ou rótulo 17, estado 17, ação 2, número 1 |
| `cadastro/73-equipamento-lugar-academia` Equipamento: depois do atalho "Academia completa" | tela | ana | 90 | 55 | 0 | 0 | ação 26, opção 21, estado 18, título ou rótulo 15, definição 7, número 3 |
| `cadastro/74-equipamento-lugar-condominio` Equipamento: depois do atalho "Condomínio com multifuncional" | tela | ana | 68 | 52 | 0 | 0 | ação 26, estado 18, opção 15, título ou rótulo 6, número 3 |
| `cadastro/75-equipamento-lugar-casa` Equipamento: depois do atalho "Casa com halteres e elásticos" | tela | ana | 73 | 57 | 0 | 0 | ação 26, opção 20, estado 18, título ou rótulo 6, número 3 |
| `cadastro/76-equipamento-lugar-corpo` Equipamento: depois do atalho "Corpo livre" | tela | ana | 58 | 62 | 0 | 0 | estado 31, ação 21, número 3, título ou rótulo 3 |
| `cadastro/77-equipamento-item-por-item-academia` Equipamento: item por item, com os itens da "Academia completa" marcados | tela | ana | 201 | 55 | 0 | 0 | título ou rótulo 105, ação 38, opção 30, estado 18, definição 7, número 3 |
| `cadastro/78-equipamento-folha-do-item` Folha de detalhes: Halteres fixos (a 1ª folha de item da Ana) | folha | ana | 53 | 53 | 0 | 0 | opção 39, título ou rótulo 12, ação 2 |
| `cadastro/79-equipamento-folha-do-item-respondida` Folha de detalhes: Halteres fixos, respondida (1 a 12 kg, de 1 em 1) | folha | ana | 53 | 53 | 0 | 0 | opção 39, título ou rótulo 12, ação 2 |
| `cadastro/80-equipamento-item-por-item` Equipamento: item por item, com os 2 itens da Ana marcados | tela | ana | 70 | 39 | 0 | 0 | ação 33, título ou rótulo 14, opção 10, estado 10, número 3 |

## inicio

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `inicio/01-inicio-depois-do-1o-treino` Início, depois do 1º treino (com a faixa "A sua semana") | tela | ana | 82 | 90 | 0 | 0 | ação 70, título ou rótulo 5, estado 4, número 3 |
| `inicio/02-folha-do-exercicio-com-historico` Folha do exercício com histórico ("Ver a evolução deste exercício") | folha | ana | 27 | 27 | 0 | 0 | ação 13, número 10, título ou rótulo 4 |
| `inicio/03-inicio` Início, antes do 1º treino (a Ana) | tela | ana | 78 | 89 | 0 | 0 | ação 66, título ou rótulo 5, estado 4, número 3 |
| `inicio/04-inicio-aba-corpo-todo-b` Início, aba "Corpo todo B" (a Ana) | tela | ana | 76 | 87 | 0 | 0 | ação 64, título ou rótulo 5, estado 4, número 3 |
| `inicio/05-inicio-aba-corpo-todo-c` Início, aba "Corpo todo C" (a Ana) | tela | ana | 68 | 79 | 0 | 0 | ação 56, título ou rótulo 5, estado 4, número 3 |
| `inicio/06-folha-do-exercicio` Folha do exercício como abre (o 1º do dia A: agachamento búlgaro) | folha | ana | 22 | 22 | 0 | 0 | número 10, ação 8, título ou rótulo 4 |
| `inicio/07-folha-do-exercicio-ver-mais-opcoes` Folha do exercício, com "Alternativas" aberto | bloco aberto | ana | 83 | 77 | 0 | 0 | ação 46, título ou rótulo 17, número 10, segurança 10 |
| `inicio/08-sobre-o-programa` "Entenda o treino" → "O seu programa" como abre (a Ana; até 16/11, a folha "Sobre o programa") | bloco aberto | ana | 135 | 100 | 1 | 3 | ação 67, estado 55, número 7, título ou rótulo 3, justificativa 3 |
| `inicio/09-sobre-o-programa-limites-e-observacoes` "O seu programa", com "Limites e observações (3)" aberto (a Ana) | bloco aberto | ana | 260 | 185 | 4 | 6 | estado 177, ação 67, número 7, justificativa 6, título ou rótulo 3 |
| `inicio/10-sobre-o-programa-avisos` "O seu programa", com "Avisos (9)" aberto (a Ana) | bloco aberto | ana | 483 | 119 | 9 | 12 | estado 394, ação 67, justificativa 12, número 7, título ou rótulo 3 |
| `inicio/11-sobre-o-programa-fases` "O seu programa", com "Fases (2)" aberto (a Ana) | bloco aberto | ana | 159 | 126 | 1 | 5 | estado 77, ação 67, número 7, justificativa 5, título ou rótulo 3 |
| `inicio/12-sobre-o-programa-por-que-este-programa` "O seu programa", com "Por que este programa (10)" aberto (a Ana) | bloco aberto | ana | 330 | 156 | 3 | 13 | justificativa 174, ação 67, estado 55, privacidade 24, número 7, título ou rótulo 3 |
| `inicio/13-sobre-o-programa-series-por-musculo-na-semana` "O seu programa", com "Séries por músculo" aberto (a Ana) | bloco aberto | ana | 183 | 106 | 1 | 4 | ação 67, estado 55, número 29, título ou rótulo 21, definição 6, justificativa 5 |
| `inicio/14-folha-avisos` Folha "Avisos" (os ajustes possíveis da Ana) | folha | ana | 85 | 85 | 0 | 0 | ação 75, instrução 8, título ou rótulo 2 |
| `inicio/15-como-ler-aberto` "Entenda o treino", com "Como ler o treino" aberto (até 16/11, um bloco do início) | bloco aberto | ana | 151 | 121 | 0 | 5 | definição 100, ação 43, justificativa 5, título ou rótulo 3 |
| `inicio/16-como-ler-folha-selo` Folha "De onde vem isto" (o selo de "Carga", em "Como ler o treino") | folha | ana | 268 | 158 | 6 | 0 | justificativa 251, ação 13, título ou rótulo 4 |
| `inicio/17-folha-do-exercicio-sem-animacao` Folha de um exercício sem animação (guia em texto): crucifixo invertido sentado | folha | ana | 28 | 28 | 0 | 0 | título ou rótulo 10, número 8, ação 7, estado 3 |
| `inicio/18-folha-como-fazer-em-texto` Folha "Como fazer (em texto)" como abre | folha | ana | 78 | 78 | 0 | 0 | instrução 63, ação 8, título ou rótulo 7 |
| `inicio/19-folha-como-fazer-em-texto-passo-a-passo` Folha "Como fazer (em texto)", com "Posição, execução e carga, passo a passo" aberto | bloco aberto | ana | 204 | 122 | 1 | 0 | instrução 185, título ou rótulo 11, ação 8 |
| `inicio/20-inicio-com-treino-em-andamento` Início com um treino em andamento ("Continuar o treino em andamento") | tela | ana | 75 | 83 | 0 | 0 | ação 67, título ou rótulo 5, número 3 |
| `inicio/21-inicio-depois-de-mudar-a-rotina` Início depois de mudar o objetivo em Meus dados (a versão nova do programa) | aviso | ana | 81 | 92 | 0 | 0 | ação 69, título ou rótulo 5, estado 4, número 3 |
| `inicio/22-folha-do-exercicio-preferencia-salva` Folha do exercício, depois de "Prefiro…" | folha | ana | 100 | 86 | 0 | 0 | ação 49, título ou rótulo 17, estado 14, número 10, segurança 10 |
| `inicio/23-inicio-versao-nova` Início, com "Há uma versão nova do seu programa." | aviso | ana | 95 | 98 | 0 | 0 | ação 69, estado 18, título ou rótulo 5, número 3 |
| `inicio/24-inicio-versao-nova-folha-mais-avisos` Folha "Avisos" aberta por "Mais 1 aviso" | folha | ana | 85 | 85 | 0 | 0 | ação 75, instrução 8, título ou rótulo 2 |
| `inicio/25-inicio-programa-atualizado` Início, depois de "Atualizar" | aviso | ana | 86 | 97 | 0 | 0 | ação 68, estado 10, título ou rótulo 5, número 3 |
| `inicio/26-inicio-programa-mantido` Início, depois de "Manter" nos ajustes possíveis | aviso | ana | 77 | 88 | 0 | 0 | ação 67, título ou rótulo 5, número 3, estado 2 |
| `inicio/27-sobre-o-programa-ver-ajustes` "Entenda o treino" → "O seu programa", com "Ver ajustes possíveis" (até 16/11, no fim da folha "Sobre o programa") | bloco aberto | ana | 138 | 99 | 1 | 3 | ação 70, estado 55, número 7, título ou rótulo 3, justificativa 3 |
| `inicio/28-inicio-programa-gerado-de-novo` Início, depois de escolher um ajuste | aviso | ana | 103 | 97 | 0 | 0 | ação 82, estado 13, título ou rótulo 5, número 3 |
| `inicio/29-inicio-com-treino-em-andamento-e-versao-nova` Início com um treino em andamento e uma mudança à espera ("O programa será atualizado depois do treino em andamento.") | aviso | ana | 114 | 108 | 0 | 0 | ação 83, estado 23, título ou rótulo 5, número 3 |
| `inicio/30-inicio-semana-completa` Início com a semana completa e o lembrete de cópia | tela | ana | 100 | 88 | 0 | 0 | ação 73, privacidade 17, título ou rótulo 5, número 3, justificativa 2 |
| `inicio/31-inicio-ana-na-3a-semana` Início da Ana na 3ª semana (passada a fase de aprendizado), com 5 treinos no histórico | tela | ana | 102 | 90 | 0 | 0 | ação 75, privacidade 17, título ou rótulo 5, número 3, justificativa 2 |
| `inicio/32-folha-do-exercicio-com-drop-set` Folha de um exercício em bi-set e com a última série em drop set (o último do dia A) | folha | ana | 53 | 53 | 0 | 0 | instrução 19, número 16, ação 13, título ou rótulo 5 |
| `inicio/33-inicio-ana-saude` Início da Ana com dor no ombro (7), no joelho (4) e no punho (1): o aviso "Pela triagem" | tela | ana + saúde | 75 | 86 | 0 | 0 | ação 53, segurança 14, título ou rótulo 5, número 3 |
| `inicio/34-inicio-ana-saude-aba-corpo-todo-b` Início, aba "Corpo todo B" (a Ana com dor) | tela | ana + saúde | 76 | 87 | 0 | 0 | ação 54, segurança 14, título ou rótulo 5, número 3 |
| `inicio/35-inicio-ana-saude-aba-corpo-todo-c` Início, aba "Corpo todo C" (a Ana com dor) | tela | ana + saúde | 86 | 97 | 0 | 0 | ação 64, segurança 14, título ou rótulo 5, número 3 |
| `inicio/36-folha-avisos-ana-saude` Folha "Avisos": "Pela triagem" e os outros avisos | folha | ana + saúde | 122 | 122 | 0 | 0 | ação 59, segurança 47, título ou rótulo 8, instrução 8 |
| `inicio/37-sobre-o-programa-ana-saude` "Entenda o treino" → "O seu programa" como abre (a Ana com dor; até 16/11, a folha "Sobre o programa") | bloco aberto | ana + saúde | 134 | 99 | 1 | 3 | ação 67, estado 54, número 7, título ou rótulo 3, justificativa 3 |
| `inicio/38-sobre-o-programa-ana-saude-tudo-aberto` "O seu programa", com os 5 blocos abertos (a Ana com dor) | bloco aberto | ana + saúde | 977 | 180 | 18 | 31 | estado 321, segurança 316, justificativa 193, ação 67, número 29, privacidade 24, título ou rótulo 21, definição 6 |
| `inicio/39-folha-do-exercicio-ana-saude` Folha do 1º exercício da Ana com dor, com "Alternativas" aberto (até 16/11, com os motivos abertos) | bloco aberto | ana + saúde | 83 | 77 | 0 | 0 | ação 46, título ou rótulo 17, número 10, segurança 10 |
| `inicio/40-programa-pausado-pela-triagem` "Programa pausado" (a triagem refeita tem um "sim" sem liberação) | aviso | ana + saúde | 31 | 31 | 0 | 0 | segurança 24, ação 5, título ou rótulo 2 |
| `inicio/41-programa-pausado-sem-exercicio` "Programa pausado" (dor acima de 5 em todas as regiões: nenhum exercício possível) | aviso | ana + saúde | 73 | 73 | 1 | 0 | segurança 66, ação 5, título ou rótulo 2 |
| `inicio/42-folha-avisos-dor-sem-nota` Folha "Avisos": "Pela triagem" com uma região sem a nota de hoje | folha | ana + saúde | 103 | 103 | 0 | 0 | ação 60, segurança 18, instrução 17, título ou rótulo 8 |
| `inicio/43-inicio-com-2-locais-e-versao-nova` Início da Ana com 2 locais, depois de trocar o local principal ("Onde vou treinar hoje?" e a versão nova) | aviso | ana | 93 | 79 | 0 | 0 | ação 71, estado 10, título ou rótulo 9, número 3 |
| `inicio/44-sobre-o-programa-conferindo` "Entenda o treino" → "O seu programa" enquanto o avaliador chega ("Conferindo o programa…"; até 16/11, na folha "Sobre o programa") | carregando | ana | 96 | 82 | 0 | 1 | ação 61, estado 24, número 7, título ou rótulo 3, justificativa 1 |
| `inicio/45-inicio-diego` Início, antes do 1º treino (o Diego: iniciante em casa, com elásticos e barra fixa) | tela | diego | 67 | 78 | 0 | 0 | ação 55, título ou rótulo 5, estado 4, número 3 |
| `inicio/46-inicio-diego-aba-corpo-todo-b` Início, aba "Corpo todo B" (o Diego) | tela | diego | 67 | 78 | 0 | 0 | ação 55, título ou rótulo 5, estado 4, número 3 |
| `inicio/47-inicio-diego-aba-corpo-todo-c` Início, aba "Corpo todo C" (o Diego) | tela | diego | 72 | 83 | 0 | 0 | ação 60, título ou rótulo 5, estado 4, número 3 |
| `inicio/48-folha-avisos-diego` Folha "Avisos" (o Diego) | folha | diego | 69 | 69 | 0 | 0 | ação 59, instrução 8, título ou rótulo 2 |
| `inicio/49-sobre-o-programa-diego` "Entenda o treino" → "O seu programa" como abre (o Diego; até 16/11, a folha "Sobre o programa") | bloco aberto | diego | 124 | 99 | 1 | 2 | ação 67, estado 45, número 7, título ou rótulo 3, justificativa 2 |
| `inicio/50-sobre-o-programa-diego-tudo-aberto` "O seu programa", com os 5 blocos abertos (o Diego) | bloco aberto | diego | 627 | 174 | 8 | 22 | estado 296, justificativa 184, ação 67, número 29, privacidade 24, título ou rótulo 21, definição 6 |
| `inicio/51-folha-do-exercicio-diego` Folha do 1º exercício (o Diego), com "Alternativas" aberto, se houver (até 16/11, com os motivos abertos) | bloco aberto | diego | 32 | 32 | 0 | 0 | ação 16, título ou rótulo 8, número 8 |
| `inicio/52-inicio-elisa` Início, antes do 1º treino (a Elisa: iniciante, sem equipamento nenhum) | tela | elisa | 60 | 71 | 0 | 0 | ação 48, título ou rótulo 5, estado 4, número 3 |
| `inicio/53-inicio-elisa-aba-corpo-todo-b` Início, aba "Corpo todo B" (a Elisa) | tela | elisa | 59 | 70 | 0 | 0 | ação 47, título ou rótulo 5, estado 4, número 3 |
| `inicio/54-inicio-elisa-aba-corpo-todo-c` Início, aba "Corpo todo C" (a Elisa) | tela | elisa | 54 | 65 | 0 | 0 | ação 42, título ou rótulo 5, estado 4, número 3 |
| `inicio/55-folha-avisos-elisa` Folha "Avisos" (a Elisa) | folha | elisa | 58 | 58 | 0 | 0 | ação 48, instrução 8, título ou rótulo 2 |
| `inicio/56-sobre-o-programa-elisa` "Entenda o treino" → "O seu programa" como abre (a Elisa; até 16/11, a folha "Sobre o programa") | bloco aberto | elisa | 124 | 99 | 1 | 2 | ação 67, estado 45, número 7, título ou rótulo 3, justificativa 2 |
| `inicio/57-sobre-o-programa-elisa-tudo-aberto` "O seu programa", com os 5 blocos abertos (a Elisa) | bloco aberto | elisa | 663 | 164 | 11 | 24 | estado 346, justificativa 170, ação 67, número 29, privacidade 24, título ou rótulo 21, definição 6 |
| `inicio/58-folha-do-exercicio-elisa` Folha do 1º exercício (a Elisa), com "Alternativas" aberto, se houver (até 16/11, com os motivos abertos) | bloco aberto | elisa | 18 | 18 | 0 | 0 | número 8, título ou rótulo 6, ação 4 |
| `inicio/59-inicio-fabio` Início, antes do 1º treino (o Fábio: intermediário, só com uma barra fixa) | tela | fabio | 69 | 73 | 0 | 0 | ação 58, título ou rótulo 4, estado 4, número 3 |
| `inicio/60-inicio-fabio-aba-inferior-a` Início, aba "Inferior A" (o Fábio) | tela | fabio | 81 | 85 | 0 | 0 | ação 70, título ou rótulo 4, estado 4, número 3 |
| `inicio/61-inicio-fabio-aba-superior-b` Início, aba "Superior B" (o Fábio) | tela | fabio | 69 | 73 | 0 | 0 | ação 58, título ou rótulo 4, estado 4, número 3 |
| `inicio/62-inicio-fabio-aba-inferior-b` Início, aba "Inferior B" (o Fábio) | tela | fabio | 77 | 81 | 0 | 0 | ação 66, título ou rótulo 4, estado 4, número 3 |
| `inicio/63-folha-avisos-fabio` Folha "Avisos" (o Fábio) | folha | fabio | 21 | 21 | 0 | 0 | ação 11, instrução 8, título ou rótulo 2 |
| `inicio/64-sobre-o-programa-fabio` "Entenda o treino" → "O seu programa" como abre (o Fábio; até 16/11, a folha "Sobre o programa") | bloco aberto | fabio | 101 | 92 | 1 | 1 | ação 63, estado 27, número 7, título ou rótulo 3, justificativa 1 |
| `inicio/65-sobre-o-programa-fabio-tudo-aberto` "O seu programa", com os 4 blocos abertos (o Fábio) | bloco aberto | fabio | 536 | 158 | 7 | 18 | justificativa 206, estado 187, ação 63, número 29, privacidade 24, título ou rótulo 21, definição 6 |
| `inicio/66-folha-do-exercicio-fabio` Folha do 1º exercício (o Fábio), com "Alternativas" aberto, se houver (até 16/11, com os motivos abertos) | bloco aberto | fabio | 53 | 53 | 0 | 0 | ação 22, título ou rótulo 13, segurança 10, número 8 |
| `inicio/67-inicio-bruno` Início, antes do 1º treino (o Bruno: intermediário voltando de 12 semanas parado, com 2 locais) | tela | bruno | 111 | 83 | 0 | 0 | ação 100, título ou rótulo 8, número 3 |
| `inicio/68-inicio-bruno-aba-inferior-a` Início, aba "Inferior A" (o Bruno) | tela | bruno | 87 | 88 | 0 | 0 | ação 76, título ou rótulo 8, número 3 |
| `inicio/69-inicio-bruno-aba-superior-b` Início, aba "Superior B" (o Bruno) | tela | bruno | 118 | 84 | 0 | 0 | ação 107, título ou rótulo 8, número 3 |
| `inicio/70-inicio-bruno-aba-inferior-b` Início, aba "Inferior B" (o Bruno) | tela | bruno | 103 | 85 | 0 | 0 | ação 92, título ou rótulo 8, número 3 |
| `inicio/71-sobre-o-programa-bruno` "Entenda o treino" → "O seu programa" como abre (o Bruno; até 16/11, a folha "Sobre o programa") | bloco aberto | bruno | 106 | 97 | 1 | 2 | ação 61, estado 33, número 7, título ou rótulo 3, justificativa 2 |
| `inicio/72-sobre-o-programa-bruno-tudo-aberto` "O seu programa", com os 4 blocos abertos (o Bruno) | bloco aberto | bruno | 412 | 156 | 4 | 17 | justificativa 171, estado 100, ação 61, número 29, privacidade 24, título ou rótulo 21, definição 6 |
| `inicio/73-folha-do-exercicio-bruno` Folha do 1º exercício (o Bruno), com "Alternativas" aberto, se houver (até 16/11, com os motivos abertos) | bloco aberto | bruno | 53 | 53 | 0 | 0 | título ou rótulo 24, ação 21, número 8 |
| `inicio/74-inicio-bruno-na-academia-do-bairro-superior-a` Início do Bruno, "Superior A" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 119 | 80 | 0 | 0 | ação 100, título ou rótulo 8, estado 8, número 3 |
| `inicio/75-inicio-bruno-na-academia-do-bairro-inferior-a` Início do Bruno, "Inferior A" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 90 | 80 | 0 | 0 | ação 71, título ou rótulo 8, estado 8, número 3 |
| `inicio/76-inicio-bruno-na-academia-do-bairro-superior-b` Início do Bruno, "Superior B" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 121 | 79 | 0 | 0 | ação 102, título ou rótulo 8, estado 8, número 3 |
| `inicio/77-inicio-bruno-na-academia-do-bairro-inferior-b` Início do Bruno, "Inferior B" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 108 | 83 | 0 | 0 | ação 89, título ou rótulo 8, estado 8, número 3 |
| `inicio/78-inicio-carla` Início, antes do 1º treino (a Carla: avançada, academia completa) | tela | carla | 95 | 80 | 0 | 0 | ação 89, título ou rótulo 3, número 3 |
| `inicio/79-inicio-carla-aba-inferior` Início, aba "Inferior" (a Carla) | tela | carla | 79 | 79 | 0 | 0 | ação 73, título ou rótulo 3, número 3 |
| `inicio/80-inicio-carla-aba-empurrar` Início, aba "Empurrar" (a Carla) | tela | carla | 78 | 81 | 0 | 0 | ação 72, título ou rótulo 3, número 3 |
| `inicio/81-inicio-carla-aba-puxar` Início, aba "Puxar" (a Carla) | tela | carla | 62 | 65 | 0 | 0 | ação 56, título ou rótulo 3, número 3 |
| `inicio/82-inicio-carla-aba-pernas` Início, aba "Pernas" (a Carla) | tela | carla | 80 | 80 | 0 | 0 | ação 74, título ou rótulo 3, número 3 |
| `inicio/83-sobre-o-programa-carla` "Entenda o treino" → "O seu programa" como abre (a Carla; até 16/11, a folha "Sobre o programa") | bloco aberto | carla | 73 | 72 | 0 | 1 | ação 53, estado 9, número 7, título ou rótulo 3, justificativa 1 |
| `inicio/84-sobre-o-programa-carla-tudo-aberto` "O seu programa", com os 2 blocos abertos (a Carla) | bloco aberto | carla | 344 | 137 | 3 | 13 | justificativa 202, ação 53, número 29, privacidade 24, título ou rótulo 21, estado 9, definição 6 |
| `inicio/85-folha-do-exercicio-carla` Folha do 1º exercício (a Carla), com "Alternativas" aberto, se houver (até 16/11, com os motivos abertos) | bloco aberto | carla | 102 | 62 | 0 | 0 | título ou rótulo 43, ação 41, segurança 10, número 8 |

## treino

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `treino/01-serie-vazia` Treino: 1ª série do 1º exercício, vazia (1ª vez no exercício) | estado vazio | ana | 58 | 76 | 0 | 0 | título ou rótulo 17, instrução 11, estado 9, ação 8, número 7, opção 6 |
| `treino/02-serie-vazia-guia-erros` Treino: a série com o guia no modo "Erros" | tela | ana | 61 | 79 | 0 | 0 | título ou rótulo 17, ação 11, instrução 11, estado 9, número 7, opção 6 |
| `treino/03-serie-vazia-guia-musculos` Treino: a série com o guia no modo "Músculos" | tela | ana | 61 | 79 | 0 | 0 | título ou rótulo 17, ação 11, instrução 11, estado 9, número 7, opção 6 |
| `treino/04-serie-vazia-guia-trajetoria` Treino: a série com o guia no modo "Trajetória" | tela | ana | 60 | 78 | 0 | 0 | título ou rótulo 17, instrução 11, ação 10, estado 9, número 7, opção 6 |
| `treino/05-serie-vazia-guia-pausado` Treino: a série com o guia pausado | tela | ana | 60 | 78 | 0 | 0 | título ou rótulo 17, instrução 11, ação 10, estado 9, número 7, opção 6 |
| `treino/06-serie-falta-a-carga` Treino: série com a reserva e sem a carga ("Falta escolher a carga.") | erro | ana | 57 | 75 | 0 | 0 | título ou rótulo 17, ação 11, instrução 11, número 7, opção 6, estado 5 |
| `treino/07-serie-falta-a-reserva` Treino: série com a carga e sem a reserva ("Falta dizer quantas ainda conseguiria.") | erro | ana | 57 | 75 | 0 | 0 | título ou rótulo 17, instrução 11, ação 10, número 8, opção 6, estado 5 |
| `treino/08-serie-preenchida` Treino: 1ª série preenchida | tela | ana | 63 | 81 | 0 | 0 | instrução 21, título ou rótulo 17, ação 11, número 8, opção 6 |
| `treino/09-descanso` Treino: descanso depois da 1ª série (com "Série 1 salva · Desfazer") | tela | ana | 51 | 56 | 0 | 0 | número 28, ação 12, título ou rótulo 8, estado 3 |
| `treino/10-folha-senti-algo` Folha "O que você sentiu?" | folha | ana | 72 | 65 | 0 | 0 | segurança 48, título ou rótulo 12, ação 12 |
| `treino/11-folha-mais-opcoes` Folha "Mais opções" (com uma série feita) | folha | ana | 15 | 17 | 0 | 0 | ação 13, título ou rótulo 2 |
| `treino/12-descanso-sem-o-desfazer` Treino: descanso, passados os 5 s do "Desfazer" | tela | ana | 51 | 56 | 0 | 0 | número 28, ação 12, título ou rótulo 8, estado 3 |
| `treino/13-serie-com-descanso` Treino: 2ª série com o descanso numa faixa (e a mensagem da calibração) | tela | ana | 63 | 81 | 0 | 0 | número 21, título ou rótulo 17, ação 12, estado 7, opção 6 |
| `treino/14-folha-trocar-exercicio` Folha "Trocar só neste treino por:" | folha | ana | 45 | 47 | 0 | 0 | ação 40, título ou rótulo 5 |
| `treino/15-folha-trocar-exercicio-ver-mais` Folha "Trocar só neste treino por:", com "Ver mais opções" aberto | bloco aberto | ana | 56 | 58 | 0 | 0 | ação 51, título ou rótulo 5 |
| `treino/16-exercicio-2` Treino: 2º exercício do dia A, 1ª série vazia (Ponte de glúteo com halter) | estado vazio | ana | 55 | 71 | 0 | 0 | título ou rótulo 16, ação 13, estado 9, número 7, opção 6, instrução 4 |
| `treino/17-hora-da-proxima-serie` Treino: fim do descanso, com a tela invertida ("Hora da próxima série") | aviso | ana | 31 | 38 | 0 | 0 | número 8, estado 8, título ou rótulo 8, ação 7 |
| `treino/18-exercicio-3` Treino: 3º exercício do dia A, 1ª série vazia (Supino reto com halteres) | estado vazio | ana | 59 | 75 | 0 | 0 | título ou rótulo 15, ação 11, instrução 11, estado 9, número 7, opção 6 |
| `treino/19-exercicio-4` Treino: 4º exercício do dia A, 1ª série vazia (Remada unilateral com halter apoiada no banco) | estado vazio | ana | 57 | 75 | 0 | 0 | título ou rótulo 20, ação 11, estado 9, número 7, opção 6, instrução 4 |
| `treino/20-exercicio-5` Treino: 5º exercício do dia A, 1ª série vazia (Flexão de joelho deslizando os pés no chão) | estado vazio | ana | 53 | 69 | 0 | 0 | título ou rótulo 21, ação 11, número 6, opção 6, estado 5, instrução 4 |
| `treino/21-exercicio-6` Treino: 6º exercício do dia A, 1ª série vazia (Tríceps francês sentado com halter) | estado vazio | ana | 53 | 69 | 0 | 0 | título ou rótulo 16, ação 11, estado 9, número 7, opção 6, instrução 4 |
| `treino/22-folha-terminar-com-serie` Folha "Terminar o treino agora?" (com série registrada) | folha | ana | 21 | 23 | 0 | 0 | estado 11, ação 6, título ou rótulo 4 |
| `treino/23-aviso-dor-0` Treino: depois da nota de dor 0 ("Pode seguir.") | aviso | ana | 58 | 76 | 0 | 0 | título ou rótulo 17, estado 11, instrução 11, número 7, ação 6, opção 6 |
| `treino/24-aviso-dor-2-antes-da-serie` Treino: nota de dor 2 antes da 1ª série | aviso | ana | 68 | 86 | 0 | 0 | estado 20, título ou rótulo 17, instrução 11, número 7, ação 7, opção 6 |
| `treino/25-aviso-dor-4-antes-da-serie` Treino: nota de dor 4 antes da 1ª série | aviso | ana | 81 | 99 | 1 | 0 | segurança 27, título ou rótulo 17, instrução 11, estado 9, número 7, opção 6, ação 4 |
| `treino/26-aviso-dor-4-sem-carga-menor` Treino: nota de dor 4 com o halter mais leve (não há carga menor) | aviso | ana | 78 | 83 | 0 | 0 | segurança 40, número 15, ação 12, título ou rótulo 8, estado 3 |
| `treino/27-serie-depois-da-calibracao` Treino: 2ª série, com a mensagem da calibração e as séries feitas (uma com dor) | tela | ana | 96 | 114 | 0 | 0 | segurança 40, estado 20, título ou rótulo 17, número 8, opção 6, ação 5 |
| `treino/28-aviso-dor-4` Treino: nota de dor 4 depois de uma série ("Reduza a carga…") | aviso | ana | 94 | 99 | 0 | 0 | segurança 56, número 15, ação 12, título ou rótulo 8, estado 3 |
| `treino/29-descanso-entre-exercicios` Treino: descanso depois da última série do exercício ("A seguir · exercício 2 de 6") | tela | ana | 99 | 104 | 0 | 0 | segurança 56, número 17, título ou rótulo 13, ação 10, estado 3 |
| `treino/30-exercicio-completo` Treino: exercício com as séries completas | tela | ana | 103 | 113 | 0 | 0 | segurança 56, número 16, ação 12, instrução 10, estado 5, título ou rótulo 4 |
| `treino/31-exercicio-trocado` Treino: exercício trocado pela alternativa ("No lugar de …, só neste treino.") | estado vazio | ana | 58 | 74 | 0 | 0 | estado 17, título ou rótulo 16, ação 9, número 6, opção 6, instrução 4 |
| `treino/32-folha-trocar-exercicio-com-preferencia` Folha "Trocar só neste treino por:", com um "Prefiro…" marcado | folha | ana | 31 | 33 | 0 | 0 | ação 26, título ou rótulo 5 |
| `treino/33-folha-trocar-depois-da-dor` Folha de troca aberta pela nota de dor 7, com a orientação | aviso | ana | 52 | 54 | 0 | 0 | ação 26, segurança 21, título ou rótulo 5 |
| `treino/34-exercicio-encerrado-pela-dor` Treino: exercício encerrado pela dor (a orientação e "Exercício encerrado.") | aviso | ana | 69 | 77 | 0 | 0 | estado 22, segurança 21, ação 11, instrução 9, número 3, título ou rótulo 3 |
| `treino/35-folha-trocar-depois-do-sinal` Folha de troca aberta por "Formigamento ou dormência", com a orientação | aviso | ana | 35 | 37 | 0 | 0 | ação 16, segurança 14, título ou rótulo 5 |
| `treino/36-ultimo-exercicio-completo` Treino: último exercício com as séries completas ("Terminar treino") | tela | ana | 60 | 68 | 0 | 0 | número 29, ação 11, instrução 10, estado 5, título ou rótulo 5 |
| `treino/37-folha-terminar-com-exercicios-por-fazer` Folha "Terminar o treino agora?" (com exercícios feitos e por fazer) | folha | ana | 21 | 23 | 0 | 0 | estado 11, ação 6, título ou rótulo 4 |
| `treino/38-serie-com-sugestao-do-dia` Treino: 1ª série de um exercício já feito, com a sugestão do dia ("Hoje: …") | tela | ana | 56 | 74 | 0 | 0 | título ou rótulo 17, ação 10, instrução 10, número 8, opção 6, estado 5 |
| `treino/39-exercicio-com-drop-set` Treino: exercício com a última série em drop set (Tríceps francês sentado com halter) | tela | ana | 58 | 71 | 0 | 0 | número 17, título ou rótulo 16, ação 11, opção 6, estado 5, instrução 3 |
| `treino/40-serie-com-drop-set` Treino: a última série, com "Drop set (opcional)" e as 2 quedas | tela | ana | 89 | 95 | 0 | 0 | número 34, título ou rótulo 23, instrução 13, ação 8, opção 6, estado 5 |
| `treino/41-folha-terminar-sem-serie` Folha "Terminar o treino agora?" (sem nenhuma série) | folha | ana | 27 | 29 | 0 | 0 | estado 14, ação 9, título ou rótulo 4 |
| `treino/42-folha-mais-opcoes-sem-serie` Folha "Mais opções" (no 1º exercício, sem série feita) | folha | ana | 11 | 13 | 0 | 0 | ação 9, título ou rótulo 2 |
| `treino/43-exercicio-sem-animacao` Treino: exercício sem animação, com o cartão de texto fechado (Crucifixo invertido sentado, com o peito nas coxas, com halteres) | estado vazio | ana | 53 | 69 | 0 | 0 | título ou rótulo 21, estado 9, número 7, ação 6, opção 6, instrução 4 |
| `treino/44-exercicio-sem-animacao-folha-como-fazer` Treino: folha "Como fazer (em texto)" como abre | folha | ana | 78 | 80 | 0 | 0 | instrução 63, ação 8, título ou rótulo 7 |
| `treino/45-exercicio-sem-animacao-folha-como-fazer-passo-a-passo` Treino: folha "Como fazer (em texto)", com o passo a passo aberto | bloco aberto | ana | 204 | 111 | 1 | 0 | instrução 185, título ou rótulo 11, ação 8 |
| `treino/46-treino-na-volta` Treino na volta da pausa: a carga 10% menor já preenchida ("Hoje: 9 kg") | tela | ana | 56 | 74 | 0 | 0 | título ou rótulo 17, ação 10, instrução 10, número 8, opção 6, estado 5 |
| `treino/47-carla-inferior-1` Treino da Carla: dia "Inferior", 1º exercício, 1ª série vazia (Agachamento livre com barra (profundo)) | estado vazio | carla | 98 | 112 | 0 | 0 | segurança 42, título ou rótulo 18, instrução 11, estado 9, número 6, ação 6, opção 6 |
| `treino/48-carla-inferior-2` Treino da Carla: dia "Inferior", 2º exercício, 1ª série vazia (Stiff com halteres) | estado vazio | carla | 51 | 65 | 0 | 0 | título ou rótulo 14, ação 11, estado 9, número 7, opção 6, instrução 4 |
| `treino/49-carla-inferior-3` Treino da Carla: dia "Inferior", 3º exercício, 1ª série vazia (Flexão de joelho na cadeira flexora (sentado)) | estado vazio | carla | 49 | 63 | 0 | 0 | título ou rótulo 18, estado 9, número 6, ação 6, opção 6, instrução 4 |
| `treino/50-carla-inferior-4` Treino da Carla: dia "Inferior", 4º exercício, 1ª série vazia (Cadeira extensora) | estado vazio | carla | 44 | 58 | 0 | 0 | título ou rótulo 13, estado 9, número 6, ação 6, opção 6, instrução 4 |
| `treino/51-carla-inferior-5` Treino da Carla: dia "Inferior", 5º exercício, 1ª série vazia (Panturrilha unilateral no step) | estado vazio | carla | 54 | 70 | 0 | 0 | título ou rótulo 17, ação 11, estado 9, número 7, opção 6, instrução 4 |
| `treino/52-carla-inferior-6` Treino da Carla: dia "Inferior", 6º exercício, 1ª série vazia (Panturrilha sentada na máquina) | estado vazio | carla | 76 | 90 | 0 | 0 | título ou rótulo 19, segurança 15, definição 11, estado 9, número 6, ação 6, opção 6, instrução 4 |
| `treino/53-carla-inferior-7` Treino da Carla: dia "Inferior", 7º exercício, 1ª série vazia (Adução na cadeira adutora) | estado vazio | carla | 46 | 60 | 0 | 0 | título ou rótulo 15, estado 9, número 6, ação 6, opção 6, instrução 4 |
| `treino/54-carla-inferior-8` Treino da Carla: dia "Inferior", 8º exercício, 1ª série vazia (Abdominal na polia com corda, ajoelhado) | estado vazio | carla | 53 | 67 | 0 | 0 | título ou rótulo 17, ação 11, estado 9, número 6, opção 6, instrução 4 |
| `treino/55-carla-folha-trocar-exercicio` Folha de troca da Carla (Puxada unilateral ajoelhado na polia alta): 13 alternativas | bloco aberto | carla | 118 | 54 | 0 | 0 | ação 113, título ou rótulo 5 |
| `treino/56-carla-contrapeso` Treino da Carla: barra fixa assistida no graviton (a carga é o contrapeso) | estado vazio | carla | 75 | 89 | 0 | 0 | estado 22, instrução 18, título ou rótulo 17, número 6, ação 6, opção 6 |
| `treino/57-elisa-exercicio-1` Treino da Elisa (peso do corpo): 1º exercício, 1ª série vazia (Agachamento com o peso do corpo) | estado vazio | elisa | 57 | 73 | 0 | 0 | título ou rótulo 19, instrução 11, ação 10, número 6, opção 6, estado 5 |
| `treino/58-elisa-folha-trocar-sem-alternativa` Folha de troca sem alternativa ("Este exercício não tem alternativa com o seu equipamento.") | estado vazio | elisa | 15 | 17 | 0 | 0 | estado 9, título ou rótulo 5, ação 1 |
| `treino/59-elisa-exercicio-2` Treino da Elisa (peso do corpo): 2º exercício, 1ª série vazia (Flexão de braço) | estado vazio | elisa | 55 | 71 | 0 | 0 | título ou rótulo 16, ação 11, instrução 11, número 6, opção 6, estado 5 |
| `treino/60-elisa-exercicio-3` Treino da Elisa (peso do corpo): 3º exercício, 1ª série vazia (Flexão de joelho deslizando os pés no chão) | estado vazio | elisa | 53 | 69 | 0 | 0 | título ou rótulo 21, ação 11, número 6, opção 6, estado 5, instrução 4 |
| `treino/61-elisa-exercicio-4` Treino da Elisa (peso do corpo): 4º exercício, 1ª série vazia (Extensão de tríceps com o peso do corpo) | estado vazio | elisa | 53 | 69 | 0 | 0 | título ou rótulo 21, ação 11, número 6, opção 6, estado 5, instrução 4 |
| `treino/62-diego-exercicio-1` Treino do Diego (elásticos e barra fixa): 1º exercício, 1ª série vazia (Flexão de braço) | estado vazio | diego | 54 | 70 | 0 | 0 | título ou rótulo 16, instrução 11, ação 10, número 6, opção 6, estado 5 |
| `treino/63-diego-exercicio-2` Treino do Diego (elásticos e barra fixa): 2º exercício, 1ª série vazia (Barra fixa só na descida (negativa)) | estado vazio | diego | 78 | 94 | 1 | 0 | segurança 30, título ou rótulo 21, número 6, ação 6, opção 6, estado 5, instrução 4 |
| `treino/64-diego-exercicio-3` Treino do Diego (elásticos e barra fixa): 3º exercício, 1ª série vazia (Agachamento com elástico) | estado vazio | diego | 55 | 71 | 0 | 0 | título ou rótulo 16, ação 11, instrução 11, número 6, opção 6, estado 5 |
| `treino/65-fabio-exercicio-1` Treino do Fábio (barra fixa): 1º exercício, 1ª série vazia (Barra fixa) | estado vazio | fabio | 59 | 74 | 0 | 0 | título ou rótulo 17, ação 14, instrução 11, número 6, opção 6, estado 5 |
| `treino/66-fabio-exercicio-2` Treino do Fábio (barra fixa): 2º exercício, 1ª série vazia (Barra fixa só na descida (negativa)) | estado vazio | fabio | 80 | 95 | 1 | 0 | segurança 30, título ou rótulo 23, número 6, ação 6, opção 6, estado 5, instrução 4 |
| `treino/67-fabio-exercicio-3` Treino do Fábio (barra fixa): 3º exercício, 1ª série vazia (Flexão de braço) | estado vazio | fabio | 50 | 65 | 0 | 0 | título ou rótulo 18, ação 11, número 6, opção 6, estado 5, instrução 4 |
| `treino/68-bruno-volta-da-pausa-exercicio-1` Treino do Bruno (voltando de pausa): 1º exercício (Supino reto com halteres) | estado vazio | bruno | 56 | 71 | 0 | 0 | título ou rótulo 15, instrução 11, estado 9, ação 8, número 7, opção 6 |
| `treino/69-bruno-troca-do-local-2` Treino do Bruno no 2º local: 2º exercício, trocado pelo local, com o motivo (Barra fixa) | estado vazio | bruno | 63 | 78 | 0 | 0 | estado 20, título ou rótulo 17, ação 10, número 6, opção 6, instrução 4 |

## guia

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `guia/01-tecnica` Guia aberto pelo treino: agachamento búlgaro, modo Técnica | tela | ana | 60 | 40 | 0 | 0 | ação 24, instrução 16, segurança 14, título ou rótulo 4, número 2 |
| `guia/02-tecnica-vista-frontal` Guia: modo Técnica, vista "Frontal" | tela | ana | 60 | 40 | 0 | 0 | ação 24, instrução 16, segurança 14, título ou rótulo 4, número 2 |
| `guia/03-tecnica-pausado-e-lento` Guia: modo Técnica, pausado e com "Lento" ligado | tela | ana | 60 | 40 | 0 | 0 | ação 24, instrução 16, segurança 14, título ou rótulo 4, número 2 |
| `guia/04-erros` Guia: agachamento búlgaro, modo Erros | tela | ana | 92 | 52 | 0 | 0 | ação 37, instrução 35, segurança 14, título ou rótulo 4, número 2 |
| `guia/05-erros-2` Guia: modo Erros, 2º erro ("Pé da frente perto do banco") | tela | ana | 98 | 58 | 0 | 0 | instrução 41, ação 37, segurança 14, título ou rótulo 4, número 2 |
| `guia/06-erros-3` Guia: modo Erros, 3º erro ("Descer pouco") | tela | ana | 94 | 54 | 0 | 0 | ação 37, instrução 37, segurança 14, título ou rótulo 4, número 2 |
| `guia/07-musculos` Guia: agachamento búlgaro, modo Músculos | tela | ana | 109 | 69 | 0 | 0 | instrução 42, segurança 37, ação 24, título ou rótulo 4, número 2 |
| `guia/08-trajetoria` Guia: agachamento búlgaro, modo Trajetória | tela | ana | 95 | 59 | 0 | 0 | instrução 53, ação 24, segurança 14, título ou rótulo 4 |
| `guia/09-bloco-montagem` Guia: só o bloco "Montagem" aberto | bloco aberto | ana | 140 | 104 | 0 | 0 | instrução 96, ação 24, segurança 14, título ou rótulo 6 |
| `guia/10-bloco-execucao-e-tempo` Guia: só o bloco "Execução" aberto | bloco aberto | ana | 112 | 42 | 0 | 0 | instrução 68, ação 24, segurança 14, título ou rótulo 4, número 2 |
| `guia/11-bloco-amplitude` Guia: só o bloco "Amplitude" aberto | bloco aberto | ana | 98 | 73 | 0 | 0 | instrução 42, segurança 26, ação 24, título ou rótulo 4, número 2 |
| `guia/12-bloco-respiracao` Guia: só o bloco "Respiração" aberto | bloco aberto | ana | 71 | 48 | 0 | 0 | instrução 27, ação 24, segurança 14, título ou rótulo 4, número 2 |
| `guia/13-bloco-onde-sentir` Guia: só o bloco "Onde sentir" aberto | bloco aberto | ana | 100 | 73 | 0 | 0 | segurança 37, instrução 33, ação 24, título ou rótulo 4, número 2 |
| `guia/14-bloco-erros-comuns` Guia: só o bloco "Erros" aberto | bloco aberto | ana | 130 | 92 | 0 | 0 | instrução 86, ação 24, segurança 14, título ou rótulo 4, número 2 |
| `guia/15-bloco-o-que-varia-de-pessoa-para-pessoa` Guia: só o bloco "Variações" aberto | bloco aberto | ana | 101 | 74 | 1 | 0 | instrução 57, ação 24, segurança 14, título ou rótulo 4, número 2 |
| `guia/16-lista-de-conferencia` Guia: "Confira em 5 segundos", com um item marcado | tela | ana | 90 | 66 | 0 | 0 | opção 28, ação 26, instrução 18, segurança 14, título ou rótulo 4 |
| `guia/17-tecnica-com-descanso` Guia aberto durante o descanso (a faixa "Descanso" no alto) | tela | ana | 62 | 34 | 0 | 0 | ação 26, instrução 16, segurança 14, título ou rótulo 4, número 2 |
| `guia/18-pelo-programa-tecnica` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Técnica | tela | ana | 61 | 41 | 0 | 0 | ação 23, instrução 18, segurança 14, título ou rótulo 4, número 2 |
| `guia/19-pelo-programa-erros` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Erros | tela | ana | 98 | 51 | 0 | 0 | instrução 43, ação 35, segurança 14, título ou rótulo 4, número 2 |
| `guia/20-pelo-programa-musculos` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Músculos | tela | ana | 102 | 64 | 0 | 0 | instrução 59, ação 23, segurança 14, título ou rótulo 4, número 2 |
| `guia/21-pelo-programa-trajetoria` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Trajetória | tela | ana | 97 | 59 | 0 | 0 | instrução 56, ação 23, segurança 14, título ou rótulo 4 |
| `guia/22-pelo-programa-tudo-aberto` Guia de halter (a Ana, pelo programa): Supino reto com halteres, com os 7 blocos abertos | bloco aberto | ana | 398 | 164 | 1 | 0 | instrução 355, ação 23, segurança 14, título ou rótulo 6 |
| `guia/23-carla-polia-tecnica` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Técnica | tela | carla | 62 | 37 | 0 | 0 | ação 23, instrução 19, segurança 14, título ou rótulo 4, número 2 |
| `guia/24-carla-polia-erros` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Erros | tela | carla | 93 | 45 | 0 | 0 | instrução 44, ação 31, segurança 14, título ou rótulo 4 |
| `guia/25-carla-polia-musculos` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Músculos | tela | carla | 106 | 63 | 0 | 0 | instrução 63, ação 23, segurança 14, título ou rótulo 4, número 2 |
| `guia/26-carla-polia-trajetoria` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Trajetória | tela | carla | 99 | 60 | 0 | 0 | instrução 58, ação 23, segurança 14, título ou rótulo 4 |
| `guia/27-carla-polia-tudo-aberto` Guia de polia (a Carla): Crucifixo na polia (crossover), com os 7 blocos abertos | bloco aberto | carla | 365 | 146 | 2 | 0 | instrução 322, ação 23, segurança 14, título ou rótulo 6 |
| `guia/28-carla-polia-remada-tecnica` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Técnica | tela | carla | 62 | 42 | 0 | 0 | ação 25, instrução 15, segurança 14, título ou rótulo 6, número 2 |
| `guia/29-carla-polia-remada-erros` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Erros | tela | carla | 91 | 50 | 0 | 0 | ação 36, segurança 25, instrução 22, título ou rótulo 6, número 2 |
| `guia/30-carla-polia-remada-musculos` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Músculos | tela | carla | 100 | 63 | 0 | 0 | instrução 55, ação 25, segurança 14, título ou rótulo 6 |
| `guia/31-carla-polia-remada-trajetoria` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Trajetória | tela | carla | 85 | 54 | 0 | 0 | instrução 40, ação 25, segurança 14, título ou rótulo 6 |
| `guia/32-carla-polia-remada-tudo-aberto` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, com os 7 blocos abertos | bloco aberto | carla | 318 | 147 | 1 | 0 | instrução 238, segurança 47, ação 25, título ou rótulo 8 |
| `guia/33-elisa-corpo-livre-1-tecnica` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Técnica | tela | elisa | 64 | 44 | 0 | 0 | ação 22, instrução 20, segurança 14, título ou rótulo 6, número 2 |
| `guia/34-elisa-corpo-livre-1-erros` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Erros | tela | elisa | 102 | 51 | 0 | 0 | instrução 49, ação 31, segurança 14, título ou rótulo 6, número 2 |
| `guia/35-elisa-corpo-livre-1-musculos` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Músculos | tela | elisa | 112 | 66 | 0 | 0 | instrução 41, segurança 41, ação 22, título ou rótulo 6, número 2 |
| `guia/36-elisa-corpo-livre-1-trajetoria` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Trajetória | tela | elisa | 97 | 55 | 0 | 0 | instrução 40, segurança 27, ação 22, título ou rótulo 6, número 2 |
| `guia/37-elisa-corpo-livre-1-tudo-aberto` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, com os 7 blocos abertos | bloco aberto | elisa | 418 | 198 | 5 | 0 | instrução 249, segurança 93, privacidade 44, ação 22, título ou rótulo 8, número 2 |
| `guia/38-elisa-corpo-livre-2-tecnica` Guia de corpo livre (a Elisa): Flexão de braço, modo Técnica | tela | elisa | 62 | 42 | 0 | 0 | ação 23, instrução 20, segurança 14, título ou rótulo 3, número 2 |
| `guia/39-elisa-corpo-livre-2-erros` Guia de corpo livre (a Elisa): Flexão de braço, modo Erros | tela | elisa | 90 | 47 | 0 | 0 | instrução 40, ação 31, segurança 14, título ou rótulo 3, número 2 |
| `guia/40-elisa-corpo-livre-2-musculos` Guia de corpo livre (a Elisa): Flexão de braço, modo Músculos | tela | elisa | 107 | 64 | 0 | 0 | instrução 49, segurança 32, ação 23, título ou rótulo 3 |
| `guia/41-elisa-corpo-livre-2-trajetoria` Guia de corpo livre (a Elisa): Flexão de braço, modo Trajetória | tela | elisa | 95 | 56 | 0 | 0 | instrução 53, ação 23, segurança 14, título ou rótulo 3, número 2 |
| `guia/42-elisa-corpo-livre-2-tudo-aberto` Guia de corpo livre (a Elisa): Flexão de braço, com os 7 blocos abertos | bloco aberto | elisa | 292 | 145 | 1 | 0 | instrução 232, segurança 32, ação 23, título ou rótulo 5 |
| `guia/43-catalogo` Guia sem contexto (o catálogo das animações): supino inclinado com halteres | tela | ninguém | 100 | 63 | 0 | 0 | ação 53, instrução 27, segurança 14, título ou rótulo 4, número 2 |
| `guia/44-catalogo-novas` Guia sem contexto, grupo "Novas" (os nomes curtos de todas as animações novas) | tela | ninguém | 327 | 297 | 0 | 0 | ação 284, instrução 20, segurança 14, título ou rótulo 7, número 2 |
| `guia/45-catalogo-nota-de-montagem-segura` Guia de um exercício com a nota "Montagem segura" abaixo do palco (búlgaro na suspensão) | tela | ninguém | 403 | 357 | 1 | 0 | ação 281, estado 72, instrução 26, segurança 14, título ou rótulo 8, número 2 |

## fim-e-semana

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `fim-e-semana/01-semana-vazia` Semana sem nenhum treino (programa novo) | estado vazio | ana | 60 | 60 | 0 | 0 | número 46, título ou rótulo 10, ação 4 |
| `fim-e-semana/02-evolucao-vazia` Evolução de um exercício sem treino registrado | estado vazio | ana | 15 | 15 | 0 | 0 | estado 6, ação 5, título ou rótulo 4 |
| `fim-e-semana/03-fim-sem-serie` Fim do treino sem nenhuma série ("Guardar mesmo assim") | estado vazio | ana | 31 | 35 | 0 | 0 | ação 16, título ou rótulo 12, número 3 |
| `fim-e-semana/04-fim-do-treino` Fim do treino com 1 série (o 1º treino da Ana) | tela | ana | 40 | 44 | 0 | 0 | ação 16, título ou rótulo 12, número 12 |
| `fim-e-semana/05-fim-apagar-este-treino` Fim do treino, com a confirmação "Apagar este treino?" | aviso | ana | 59 | 63 | 0 | 0 | estado 20, ação 15, título ou rótulo 12, número 12 |
| `fim-e-semana/06-semana-1-treino` Semana com 1 treino | tela | ana | 66 | 66 | 0 | 0 | número 48, título ou rótulo 10, ação 8 |
| `fim-e-semana/07-semana-1-treino-evolucao-aberta` Semana com 1 treino, com "Evolução (1)" aberto | bloco aberto | ana | 70 | 64 | 0 | 0 | número 48, ação 12, título ou rótulo 10 |
| `fim-e-semana/08-evolucao-1-treino` Evolução de um exercício com 1 treino | tela | ana | 20 | 20 | 0 | 0 | número 11, ação 5, título ou rótulo 4 |
| `fim-e-semana/09-evolucao-pelo-programa` Evolução aberta pela folha do exercício (voltar: "Treino") | tela | ana | 20 | 20 | 0 | 0 | número 11, ação 5, título ou rótulo 4 |
| `fim-e-semana/10-fim-encerrado-por-seguranca` Fim do treino encerrado por um sinal de alerta ("Treino encerrado por segurança", SAMU 192) | aviso | ana | 68 | 72 | 1 | 0 | segurança 30, ação 21, título ou rótulo 14, número 3 |
| `fim-e-semana/11-semana-completa` Semana completa (3 de 3), com "Subiu nesta semana", as últimas semanas e a evolução | tela | ana | 111 | 65 | 0 | 0 | número 65, ação 20, título ou rótulo 18, instrução 8 |
| `fim-e-semana/12-evolucao-com-historico` Evolução de um exercício com vários treinos ("Começou com … · agora …", recorde) | tela | ana | 76 | 76 | 0 | 0 | número 67, ação 5, título ou rótulo 4 |
| `fim-e-semana/13-fim-com-recorde` Fim do treino com recorde e carga para subir ("O que mudou hoje") | tela | ana | 97 | 70 | 0 | 0 | número 56, ação 19, título ou rótulo 14, instrução 8 |
| `fim-e-semana/14-semana-2-de-3` Semana com 2 de 3 treinos e uma semana anterior sem treino | tela | ana | 77 | 63 | 0 | 0 | número 56, título ou rótulo 13, ação 8 |
| `fim-e-semana/15-semana-revisao-da-meta` Semana com a oferta "Um programa com menos dias?" | aviso | ana | 114 | 72 | 0 | 0 | número 59, título ou rótulo 20, ação 15, estado 12, instrução 8 |
| `fim-e-semana/16-evolucao-por-local` Evolução de um exercício de polia com 2 locais (uma lista por local) | tela | bruno | 45 | 45 | 0 | 0 | número 30, título ou rótulo 10, ação 5 |
| `fim-e-semana/17-inicio-volta-22-dias` Início na volta de uma pausa de 22 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 115 | 103 | 0 | 0 | ação 74, privacidade 17, número 15, definição 6, título ou rótulo 3 |
| `fim-e-semana/18-sobre-o-programa-na-volta` "Entenda o treino" → "O seu programa" na volta da pausa (a fase da semana 1; até 16/11, a folha "Sobre o programa") | bloco aberto | ana | 138 | 103 | 1 | 3 | ação 67, estado 58, número 7, título ou rótulo 3, justificativa 3 |
| `fim-e-semana/19-entenda-a-sua-semana-e-as-pausas` "Entenda o treino", com "A sua semana e as pausas" aberto, na volta de uma pausa de 22 dias (a semana e a mensagem da pausa) | bloco aberto | ana | 243 | 126 | 4 | 6 | definição 111, ação 43, segurança 41, justificativa 29, estado 10, título ou rótulo 9 |
| `fim-e-semana/20-inicio-volta-15-dias` Início na volta de uma pausa de 15 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 115 | 103 | 0 | 0 | ação 74, privacidade 17, número 15, definição 6, título ou rótulo 3 |
| `fim-e-semana/21-inicio-volta-60-dias` Início na volta de uma pausa de 60 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 115 | 103 | 0 | 0 | ação 74, privacidade 17, número 15, definição 6, título ou rótulo 3 |
| `fim-e-semana/22-inicio-volta-200-dias` Início na volta de uma pausa de 200 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 120 | 100 | 0 | 0 | ação 79, privacidade 17, número 15, definição 6, título ou rótulo 3 |
| `fim-e-semana/23-inicio-volta-200-dias-agora-nao` Início na volta de 200 dias, depois de "Agora não" | aviso | ana | 125 | 105 | 0 | 0 | ação 74, privacidade 17, número 15, estado 10, definição 6, título ou rótulo 3 |
| `fim-e-semana/24-inicio-oferta-de-semana-leve` Início com a oferta de semana leve ("Semana leve?") na linha do aviso | aviso | ana | 92 | 83 | 0 | 0 | ação 65, privacidade 17, título ou rótulo 5, número 3, justificativa 2 |
| `fim-e-semana/25-inicio-oferta-de-semana-leve-folha-avisos` Folha "Avisos": a oferta de semana leve e os outros avisos | folha | ana | 147 | 91 | 0 | 0 | ação 80, estado 20, justificativa 18, instrução 16, título ou rótulo 13 |
| `fim-e-semana/26-semana-com-oferta-de-semana-leve` Semana com a oferta de semana leve ("Semana leve?") | aviso | ana | 94 | 63 | 0 | 0 | número 60, título ou rótulo 15, ação 11, instrução 8 |
| `fim-e-semana/27-fim-com-oferta-de-semana-leve` Fim do treino com "pesado demais" marcado e a oferta de semana leve ("Semana leve?") | aviso | ana | 91 | 63 | 0 | 0 | número 50, ação 19, título ou rótulo 14, instrução 8 |
| `fim-e-semana/28-fim-com-semana-leve-ativa` Fim do treino com a semana leve aceita ("Semana leve até …") | aviso | ana | 92 | 54 | 0 | 0 | número 50, ação 19, título ou rótulo 16, instrução 7 |
| `fim-e-semana/29-inicio-semana-leve-ativa` Início com a semana leve ativa | aviso | ana | 94 | 85 | 0 | 0 | ação 65, privacidade 17, título ou rótulo 5, estado 4, número 3 |
| `fim-e-semana/30-inicio-semana-leve-ativa-folha-avisos` Folha "Avisos": "Semana leve até …", com "Voltar ao normal" | folha | ana | 148 | 92 | 0 | 0 | ação 80, estado 20, justificativa 18, título ou rótulo 15, instrução 15 |
| `fim-e-semana/31-sobre-o-programa-na-semana-leve` "Entenda o treino" → "O seu programa" na semana leve (a fase fala da semana leve; até 16/11, a folha "Sobre o programa") | bloco aberto | ana | 139 | 104 | 1 | 3 | ação 67, estado 59, número 7, título ou rótulo 3, justificativa 3 |
| `fim-e-semana/32-semana-na-semana-leve` Semana com a semana leve ativa (a meta é a prescrita para a semana) | aviso | ana | 98 | 69 | 0 | 0 | número 63, título ou rótulo 17, ação 11, instrução 7 |
| `fim-e-semana/33-inicio-dor-que-se-repete` Início com o aviso de dor que se repete no mesmo exercício | aviso | ana | 130 | 103 | 1 | 0 | ação 65, segurança 38, privacidade 17, título ou rótulo 5, número 3, justificativa 2 |
| `fim-e-semana/34-inicio-dor-que-se-repete-folha-avisos` Folha "Avisos" com a dor que se repete como motivo da semana leve | folha | ana | 147 | 91 | 0 | 0 | ação 80, estado 20, justificativa 18, instrução 16, título ou rótulo 13 |
| `fim-e-semana/35-fim-com-dor` Fim do treino com dor registrada (a linha do exercício diz "Ajustar") | aviso | ana | 129 | 63 | 1 | 0 | número 50, segurança 38, ação 19, título ou rótulo 14, instrução 8 |
| `fim-e-semana/36-inicio-aviso-do-tempo` Início com o aviso "O tempo dos seus treinos" | aviso | ana | 105 | 93 | 0 | 0 | ação 75, privacidade 17, título ou rótulo 10, número 3 |
| `fim-e-semana/37-inicio-aviso-do-tempo-folha-avisos` Folha "Avisos": "O tempo dos seus treinos" | folha | ana | 134 | 101 | 0 | 0 | ação 77, estado 20, justificativa 18, título ou rótulo 11, instrução 8 |
| `fim-e-semana/38-inicio-tempo-ajustado` Início depois de "Ajustar" o tempo (e a versão nova do programa que isso oferece) | aviso | ana | 113 | 93 | 0 | 0 | ação 78, privacidade 17, estado 10, título ou rótulo 5, número 3 |

## dados-e-locais

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `dados-e-locais/01-meus-dados` Meus dados (a Ana) | tela | ana | 99 | 77 | 0 | 0 | ação 71, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/02-meus-dados-folha-o-que-sai-daqui` Folha "O que sai deste aparelho" | folha | ana | 65 | 65 | 1 | 1 | privacidade 62, ação 2, justificativa 1 |
| `dados-e-locais/03-meus-dados-folha-o-navegador-e-os-seus-dados` Folha "O navegador e os seus dados" (por quê?) | folha | ana | 115 | 115 | 2 | 0 | privacidade 67, justificativa 40, ação 7, título ou rótulo 1 |
| `dados-e-locais/04-meus-dados-folha-estilo-do-boneco` Folha do estilo do Boneco (os dois desenhos para escolher) | folha | ana | 6 | 6 | 0 | 0 | título ou rótulo 3, opção 2, ação 1 |
| `dados-e-locais/05-meus-dados-folha-guardar-uma-copia` Folha "Guardar uma cópia" (sem nenhuma cópia ainda) | folha | ana | 37 | 37 | 0 | 0 | privacidade 29, ação 5, título ou rótulo 3 |
| `dados-e-locais/06-meus-dados-copia-exportada` Meus dados logo depois de exportar ("Arquivo exportado…", "Última cópia: hoje") | aviso | ana | 109 | 90 | 0 | 0 | ação 69, privacidade 27, título ou rótulo 9, número 4 |
| `dados-e-locais/07-meus-dados-folha-guardar-uma-copia-com-copia` Folha "Guardar uma cópia" (com a cópia de hoje) | folha | ana | 37 | 37 | 0 | 0 | privacidade 29, ação 5, título ou rótulo 3 |
| `dados-e-locais/08-meus-dados-folha-trazer-uma-copia` Folha "Trazer uma cópia" (sem arquivo escolhido) | folha | ana | 25 | 25 | 0 | 0 | privacidade 9, estado 7, título ou rótulo 6, ação 3 |
| `dados-e-locais/09-meus-dados-folha-trazer-uma-copia-erro` Folha "Trazer uma cópia", com um arquivo que não é do app | erro | ana | 37 | 37 | 0 | 0 | privacidade 26, título ou rótulo 6, ação 3, estado 2 |
| `dados-e-locais/10-meus-dados-folha-trazer-uma-copia-erro-de-leitura` Folha "Trazer uma cópia", com um arquivo que não é JSON | erro | ana | 37 | 37 | 0 | 0 | privacidade 26, título ou rótulo 6, ação 3, estado 2 |
| `dados-e-locais/11-meus-dados-copia-importada` Meus dados logo depois de importar ("Dados importados.") | aviso | ana | 99 | 56 | 0 | 0 | ação 69, privacidade 15, título ou rótulo 9, número 4, estado 2 |
| `dados-e-locais/12-meus-dados-avisar-um-problema` Meus dados, com "Avisar um problema" aberto (sem e-mail de contato no build) | bloco aberto | ana | 182 | 105 | 1 | 0 | privacidade 95, ação 72, título ou rótulo 9, número 4, estado 2 |
| `dados-e-locais/13-meus-dados-avisar-um-problema-copia-1` Meus dados: resposta de "Copiar as informações" (sem a permissão da área de transferência) | aviso | ana | 192 | 115 | 1 | 0 | privacidade 105, ação 72, título ou rótulo 9, número 4, estado 2 |
| `dados-e-locais/14-meus-dados-avisar-um-problema-copia-2` Meus dados: resposta de "Copiar as informações" (com a permissão da área de transferência) | aviso | ana | 194 | 112 | 1 | 0 | privacidade 107, ação 72, título ou rótulo 9, número 4, estado 2 |
| `dados-e-locais/15-meus-dados-com-a-foto-autorizada` Meus dados de quem já autorizou a foto (a linha "Foto do equipamento") | tela | ana | 103 | 75 | 0 | 0 | ação 75, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/16-meus-dados-folha-foto-do-equipamento` Folha "Foto do equipamento" (retirar a autorização) | folha | ana | 35 | 35 | 1 | 0 | privacidade 26, ação 6, título ou rótulo 3 |
| `dados-e-locais/17-meus-dados-autorizacao-retirada` Meus dados logo depois de retirar a autorização da foto | aviso | ana | 101 | 58 | 0 | 0 | ação 69, privacidade 15, título ou rótulo 9, estado 4, número 4 |
| `dados-e-locais/18-meus-dados-folha-apagar-todos-os-dados` Folha "Apagar todos os dados?" | folha | ana | 27 | 27 | 0 | 0 | privacidade 23, ação 4 |
| `dados-e-locais/19-meus-dados-sem-dados` Meus dados de quem ainda não tem nada guardado | estado vazio | ninguém | 73 | 65 | 0 | 0 | ação 45, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/20-meus-dados-sem-dados-folha-guardar-uma-copia` Folha "Guardar uma cópia" de quem não tem nada guardado (o botão fica desligado) | estado vazio | ninguém | 37 | 37 | 0 | 0 | privacidade 29, ação 5, título ou rótulo 3 |
| `dados-e-locais/21-entenda` "Entenda o treino", com os blocos fechados | tela | ana | 46 | 46 | 0 | 0 | ação 43, título ou rótulo 3 |
| `dados-e-locais/22-entenda-os-exercicios` "Entenda o treino", com "Os exercícios: por que cada um e a próxima carga" aberto | bloco aberto | ana | 275 | 126 | 1 | 6 | ação 134, justificativa 94, segurança 21, privacidade 14, título ou rótulo 12 |
| `dados-e-locais/23-entenda-a-sua-semana` "Entenda o treino", com "A sua semana e as pausas" aberto | bloco aberto | ana | 201 | 127 | 3 | 5 | definição 111, ação 43, justificativa 28, estado 10, título ou rótulo 9 |
| `dados-e-locais/24-entenda-por-que-o-app-pergunta` "Entenda o treino", com "Por que o app pergunta e sugere" aberto | bloco aberto | ana | 553 | 113 | 10 | 19 | justificativa 294, privacidade 158, segurança 48, ação 43, título ou rótulo 10 |
| `dados-e-locais/25-entenda-seguranca` "Entenda o treino", com "Segurança" aberto | bloco aberto | ana | 215 | 116 | 3 | 3 | segurança 166, ação 43, título ou rótulo 3, justificativa 3 |
| `dados-e-locais/26-entenda-todas-as-regras` "Entenda o treino", com "Todas as regras e as fontes" aberto (as regras fechadas) | bloco aberto | ana | 1200 | 72 | 0 | 0 | ação 1052, segurança 89, título ou rótulo 50, privacidade 9 |
| `dados-e-locais/27-meus-dados-com-copia-antiga` Meus dados com a última cópia de dias atrás ("Última cópia: há 16 dias") | tela | ana | 99 | 77 | 0 | 0 | ação 71, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/28-rotina-e-divisao` Rotina e divisão (a rotina aberta por Meus dados, com o objetivo e a divisão) | tela | ana | 251 | 51 | 0 | 0 | opção 170, justificativa 31, título ou rótulo 23, estado 17, definição 4, ação 3, instrução 3 |
| `dados-e-locais/29-rotina-e-divisao-com-escolhas` Rotina e divisão, com um objetivo e uma divisão escolhidos ("Deixar o app escolher" aparece) | tela | ana | 255 | 172 | 0 | 0 | opção 170, justificativa 31, título ou rótulo 23, estado 17, ação 7, definição 4, instrução 3 |
| `dados-e-locais/30-rotina-e-divisao-2-dias` Rotina e divisão com 2 dias: as divisões oferecidas | tela | ana | 86 | 51 | 0 | 0 | opção 32, título ou rótulo 19, estado 17, justificativa 8, definição 4, ação 3, instrução 3 |
| `dados-e-locais/31-rotina-e-divisao-4-dias` Rotina e divisão com 4 dias: as divisões oferecidas | tela | ana | 249 | 169 | 0 | 0 | opção 168, justificativa 31, título ou rótulo 23, estado 17, definição 4, ação 3, instrução 3 |
| `dados-e-locais/32-rotina-e-divisao-5-dias` Rotina e divisão com 5 dias: as divisões oferecidas | tela | ana | 249 | 166 | 0 | 0 | opção 168, justificativa 31, título ou rótulo 23, estado 17, definição 4, ação 3, instrução 3 |
| `dados-e-locais/33-rotina-e-divisao-6-dias` Rotina e divisão com 6 dias: as divisões oferecidas | tela | ana | 202 | 125 | 0 | 0 | opção 121, justificativa 31, título ou rótulo 23, estado 17, definição 4, ação 3, instrução 3 |
| `dados-e-locais/34-meus-dados-com-objetivo` Meus dados com o objetivo "Ficar mais forte" | tela | ana | 100 | 78 | 0 | 0 | ação 72, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/35-objetivo` Objetivo (a mesma tela da rotina, aberta na pergunta do objetivo) | tela | ana | 251 | 156 | 0 | 0 | opção 170, justificativa 31, título ou rótulo 23, estado 17, definição 4, ação 3, instrução 3 |
| `dados-e-locais/36-algo-a-evitar` Algo a evitar | tela | ana | 22 | 22 | 0 | 0 | ação 10, título ou rótulo 8, opção 4 |
| `dados-e-locais/37-algo-a-evitar-exercicios` Algo a evitar, com a lista de exercícios aberta | bloco aberto | ana | 287 | 65 | 0 | 0 | opção 269, ação 10, título ou rótulo 8 |
| `dados-e-locais/38-meus-dados-com-algo-a-evitar` Meus dados com 1 exercício a evitar ("1 marcado") | tela | ana | 100 | 78 | 0 | 0 | ação 72, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/39-refazer-a-triagem` Refazer a triagem (a mesma tela da saúde, com "Meu programa" no alto) | tela | ana | 85 | 80 | 0 | 0 | segurança 62, ação 15, título ou rótulo 5, número 3 |
| `dados-e-locais/40-experiencia-com-o-programa-feito` Experiência de quem já tem programa (as respostas guardadas e "Meu programa" no alto) | tela | ana | 89 | 49 | 0 | 0 | opção 49, título ou rótulo 33, ação 4, número 3 |
| `dados-e-locais/41-equipamento-com-o-programa-feito` Equipamento de quem já tem programa (a lista já vem aberta, com os marcados) | tela | ana | 71 | 44 | 0 | 0 | ação 35, título ou rótulo 14, estado 10, opção 9, número 3 |
| `dados-e-locais/42-refazer-a-triagem-com-sim` Refazer a triagem (quem tinha um "sim": abre em "Quais valem", com as marcas, as regiões e as notas) | tela | ana + saúde | 323 | 110 | 1 | 0 | opção 212, segurança 94, título ou rótulo 6, ação 4, instrução 4, número 3 |
| `dados-e-locais/43-refazer-a-triagem-pausa` Refazer a triagem: "Vamos pausar o programa automático" (com o programa já feito) | aviso | ana + saúde | 103 | 99 | 0 | 0 | segurança 62, opção 14, privacidade 10, ação 5, título ou rótulo 5, estado 4, número 3 |
| `dados-e-locais/44-locais` Meus locais, com 1 local (a Ana) | tela | ana | 17 | 17 | 0 | 0 | ação 9, título ou rótulo 4, número 4 |
| `dados-e-locais/45-locais-editar` Editar local (nome e equipamento) | tela | ana | 77 | 35 | 0 | 0 | ação 37, título ou rótulo 21, estado 10, opção 9 |
| `dados-e-locais/46-locais-novo` Novo local, vazio | estado vazio | ana | 44 | 34 | 0 | 0 | ação 25, estado 10, título ou rótulo 9 |
| `dados-e-locais/47-locais-novo-erro-sem-nome` Novo local, sem nome | erro | ana | 56 | 46 | 0 | 0 | ação 25, estado 22, título ou rótulo 9 |
| `dados-e-locais/48-locais-novo-com-nome` Novo local, com o nome "Academia" (o título do equipamento muda) | tela | ana | 44 | 44 | 0 | 0 | ação 25, estado 10, título ou rótulo 9 |
| `dados-e-locais/49-locais-2-locais` Meus locais, com 2 locais (a Ana com a "Academia") | tela | ana | 23 | 23 | 0 | 0 | ação 12, número 6, título ou rótulo 5 |
| `dados-e-locais/50-locais-local-principal-trocado` Meus locais, depois de "Montar o programa para este local" | aviso | ana | 37 | 37 | 0 | 0 | estado 14, ação 12, número 6, título ou rótulo 5 |
| `dados-e-locais/51-locais-bruno` Meus locais do Bruno (Prédio e Academia do bairro) | tela | bruno | 24 | 24 | 0 | 0 | ação 12, título ou rótulo 6, número 6 |
| `dados-e-locais/52-meus-dados-bruno` Meus dados do Bruno (2 locais, 4 dias) | tela | bruno | 100 | 78 | 0 | 0 | ação 72, privacidade 15, título ou rótulo 9, número 4 |
| `dados-e-locais/53-refazer-o-nivel` Experiência aberta por "Refazer o nível" (a pausa e o nível vêm sem resposta) | tela | ana | 60 | 61 | 0 | 0 | opção 41, título ou rótulo 13, ação 3, número 3 |

## termos-e-foto

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `termos-e-foto/01-termos` Termos de uso e privacidade | tela | ninguém | 792 | 155 | 13 | 3 | privacidade 670, segurança 84, título ou rótulo 29, número 5, justificativa 3, ação 1 |
| `termos-e-foto/02-termos-folha-selo-1` Folha "De onde vem isto" (o 1º selo dos termos) | folha | ninguém | 97 | 97 | 2 | 0 | justificativa 49, segurança 37, ação 7, título ou rótulo 4 |
| `termos-e-foto/03-termos-folha-selo-2` Folha "De onde vem isto" (o 2º selo dos termos) | folha | ninguém | 181 | 133 | 2 | 0 | justificativa 97, privacidade 70, ação 10, título ou rótulo 4 |
| `termos-e-foto/04-termos-folha-selo-3` Folha "De onde vem isto" (o 3º selo dos termos) | folha | ninguém | 261 | 161 | 3 | 0 | privacidade 156, justificativa 88, ação 13, título ou rótulo 4 |
| `termos-e-foto/05-foto-sem-autorizacao` Folha "Reconhecer pela foto": sem a autorização ("Falta marcar a autorização acima.") | folha | ana | 193 | 170 | 2 | 0 | privacidade 157, título ou rótulo 16, opção 14, estado 5, ação 1 |
| `termos-e-foto/06-foto-autorizada` Folha da foto: com a autorização marcada | folha | ana | 188 | 170 | 2 | 0 | privacidade 157, título ou rótulo 16, opção 14, ação 1 |
| `termos-e-foto/07-foto-erro-sem-codigo` Folha da foto: fotos escolhidas sem o código de convite | erro | ana | 203 | 170 | 2 | 0 | privacidade 172, título ou rótulo 16, opção 14, ação 1 |
| `termos-e-foto/08-foto-erro-fotos-demais` Folha da foto: mais de 5 fotos | erro | ana | 192 | 186 | 2 | 0 | privacidade 157, título ou rótulo 16, opção 14, estado 4, ação 1 |
| `termos-e-foto/09-foto-analisando` Folha da foto: "Analisando as fotos…" | carregando | ana | 53 | 56 | 0 | 0 | privacidade 35, título ou rótulo 9, ação 9 |
| `termos-e-foto/10-foto-resultado` Folha da foto: "O que encontramos nas fotos" (com certeza, provável, talvez e a esteira) | folha | ana | 68 | 58 | 0 | 0 | estado 38, ação 16, instrução 11, título ou rótulo 3 |
| `termos-e-foto/11-foto-ja-autorizada` Folha da foto de quem já autorizou ("Você autorizou o envio… em <data>") | folha | ana | 52 | 52 | 0 | 0 | privacidade 35, ação 9, título ou rótulo 8 |
| `termos-e-foto/12-foto-ja-autorizada-para-onde-vai` Folha da foto de quem já autorizou, com "Para onde vai a foto" aberto | bloco aberto | ana | 174 | 169 | 2 | 0 | privacidade 157, ação 9, título ou rótulo 8 |
| `termos-e-foto/13-foto-resultado-2-por-responder` Folha da foto: resultado com 2 itens por responder | folha | ana | 40 | 40 | 0 | 0 | ação 13, estado 13, instrução 11, título ou rótulo 3 |
| `termos-e-foto/14-foto-resultado-vazio` Folha da foto: nenhum equipamento reconhecido | estado vazio | ana | 29 | 29 | 0 | 0 | instrução 11, estado 8, ação 7, título ou rótulo 3 |
| `termos-e-foto/15-foto-erro-nao-abre` Folha da foto: a foto que o navegador não abre | erro | ana | 81 | 81 | 1 | 0 | privacidade 64, ação 9, título ou rótulo 8 |
| `termos-e-foto/16-foto-erro-servidor-nao-respondeu` Folha da foto: o servidor não respondeu | erro | ana | 70 | 70 | 0 | 0 | privacidade 53, ação 9, título ou rótulo 8 |
| `termos-e-foto/17-foto-erro-sem-conexao` Folha da foto: sem conexão | erro | ana | 58 | 58 | 0 | 0 | privacidade 35, ação 9, título ou rótulo 8, estado 6 |
| `termos-e-foto/18-foto-erro-grandes-demais` Folha da foto: as fotos ficaram grandes demais (o servidor recusa sem dizer por quê) | erro | ana | 70 | 70 | 0 | 0 | privacidade 53, ação 9, título ou rótulo 8 |
| `termos-e-foto/19-foto-erro-analise` Folha da foto: a análise falhou (o servidor responde com erro sem mensagem) | erro | ana | 62 | 62 | 0 | 0 | privacidade 35, estado 10, ação 9, título ou rótulo 8 |
| `termos-e-foto/20-foto-erro-demora` Folha da foto: a análise demorou demais | erro | ana | 68 | 68 | 0 | 0 | privacidade 35, segurança 16, ação 9, título ou rótulo 8 |
| `termos-e-foto/21-foto-erro-do-servidor-convite-invalido` Folha da foto: a mensagem do servidor "Código de convite inválido." | erro | ana | 56 | 56 | 0 | 0 | privacidade 39, ação 9, título ou rótulo 8 |
| `termos-e-foto/22-foto-erro-do-servidor-muitas-tentativas` Folha da foto: a mensagem do servidor "Muitas tentativas com o código errado hoje. Use a lista ou tente amanhã." | erro | ana | 65 | 65 | 0 | 0 | privacidade 35, estado 13, ação 9, título ou rótulo 8 |
| `termos-e-foto/23-foto-erro-do-servidor-limite-de-fotos` Folha da foto: a mensagem do servidor "Limite de fotos de hoje atingido. Use a lista ou tente amanhã." | erro | ana | 64 | 64 | 0 | 0 | privacidade 35, estado 12, ação 9, título ou rótulo 8 |
| `termos-e-foto/24-foto-erro-do-servidor-nao-configurado` Folha da foto: a mensagem do servidor "O reconhecimento por foto ainda não está configurado. Use a lista." | erro | ana | 63 | 63 | 0 | 0 | privacidade 35, estado 11, ação 9, título ou rótulo 8 |
| `termos-e-foto/25-foto-erro-do-servidor-pedido-invalido` Folha da foto: a mensagem do servidor "Pedido inválido." | erro | ana | 54 | 54 | 0 | 0 | privacidade 35, ação 9, título ou rótulo 8, estado 2 |
| `termos-e-foto/26-foto-erro-do-servidor-formato-nao-aceito` Folha da foto: a mensagem do servidor "Foto em formato ou tamanho não aceito." | erro | ana | 59 | 59 | 0 | 0 | privacidade 35, ação 9, título ou rótulo 8, estado 7 |
| `termos-e-foto/27-foto-erro-do-servidor-tamanho-no-servidor` Folha da foto: a mensagem do servidor "As fotos juntas passam do tamanho aceito. Envie menos fotos por vez." | erro | ana | 64 | 64 | 0 | 0 | privacidade 35, estado 12, ação 9, título ou rótulo 8 |
| `termos-e-foto/28-foto-erro-do-servidor-modelo` Folha da foto: a mensagem do servidor "Não foi possível analisar as fotos agora. Use a lista." | erro | ana | 62 | 62 | 0 | 0 | privacidade 35, estado 10, ação 9, título ou rótulo 8 |
| `termos-e-foto/29-foto-autorizacao-retirada` Folha da foto depois de "Retirar a autorização" (a caixa de consentimento volta) | folha | ana | 203 | 170 | 2 | 0 | privacidade 157, título ou rótulo 16, estado 15, opção 14, ação 1 |

## avisos-e-erros

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `avisos-e-erros/01-instalar-no-iphone-boas-vindas` Boas-vindas no iPhone (Safari, sem instalar): o aviso "Instale o app para não perder seus dados" | aviso | ninguém | 111 | 111 | 0 | 0 | privacidade 41, ação 26, instrução 23, segurança 14, título ou rótulo 7 |
| `avisos-e-erros/02-instalar-no-iphone-inicio` Início no iPhone (Safari, sem instalar): o aviso de instalar depois dos exercícios | aviso | ana | 136 | 99 | 0 | 0 | ação 67, privacidade 34, instrução 23, título ou rótulo 5, estado 4, número 3 |
| `avisos-e-erros/03-lembrete-de-copia` Início com o lembrete "Guarde uma cópia dos seus treinos" (nenhuma cópia ainda) | aviso | ana | 105 | 81 | 0 | 0 | ação 75, privacidade 17, título ou rótulo 10, número 3 |
| `avisos-e-erros/04-lembrete-de-copia-exportado` Início logo depois de "Exportar agora" no lembrete de cópia | aviso | ana | 97 | 83 | 0 | 0 | ação 72, privacidade 12, título ou rótulo 10, número 3 |
| `avisos-e-erros/05-lembrete-de-copia-com-treinos-novos` Início com o lembrete de cópia de quem já exportou ("Você tem treinos novos desde a última cópia.") | aviso | ana | 101 | 81 | 0 | 0 | ação 75, privacidade 13, título ou rótulo 10, número 3 |
| `avisos-e-erros/06-dado-ilegivel-boas-vindas` Boas-vindas com um dado guardado que o app não leu | erro | ninguém | 69 | 69 | 0 | 0 | ação 27, privacidade 21, segurança 14, título ou rótulo 7 |
| `avisos-e-erros/07-dado-ilegivel-meus-dados` Meus dados com um dado guardado que o app não leu ("Exportar os dados que não foram lidos") | erro | ninguém | 100 | 70 | 0 | 0 | ação 48, privacidade 31, título ou rótulo 9, estado 8, número 4 |
| `avisos-e-erros/08-dado-ilegivel-exportado` Meus dados depois de exportar os dados que não foram lidos | aviso | ninguém | 118 | 88 | 0 | 0 | privacidade 49, ação 48, título ou rótulo 9, estado 8, número 4 |
| `avisos-e-erros/09-tela-de-erro` Tela de erro ("Algo deu errado nesta tela") | erro | ana | 35 | 35 | 0 | 0 | privacidade 13, ação 12, título ou rótulo 5, número 5 |
| `avisos-e-erros/10-tela-de-erro-exportado-e-aviso-aberto` Tela de erro, depois de exportar e com "Avisar um problema" aberto | erro | ana | 139 | 131 | 1 | 0 | privacidade 114, ação 15, título ou rótulo 5, número 5 |
| `avisos-e-erros/11-tela-de-erro-sem-dados` Tela de erro, ao exportar sem nada guardado | erro | ninguém | 41 | 41 | 0 | 0 | privacidade 19, ação 12, título ou rótulo 5, número 5 |
| `avisos-e-erros/12-nao-foi-possivel-salvar-treino` Treino com o aviso "Não foi possível salvar neste aparelho." | erro | ana | 72 | 90 | 0 | 0 | título ou rótulo 17, privacidade 15, instrução 11, estado 9, número 7, ação 7, opção 6 |
| `avisos-e-erros/13-nao-foi-possivel-salvar-serie` Descanso com "Série 1 anotada, mas não salva" | erro | ana | 72 | 77 | 0 | 0 | número 28, ação 15, privacidade 15, título ou rótulo 8, estado 6 |
| `avisos-e-erros/14-nao-foi-possivel-salvar-inicio` Início com o aviso "Não foi possível salvar neste aparelho." | erro | ana | 93 | 93 | 0 | 0 | ação 70, privacidade 15, título ou rótulo 5, número 3 |
| `avisos-e-erros/15-sobre-o-programa-sem-conferir` "Entenda o treino" → "O seu programa" quando o avaliador não baixa (até 16/11, na folha "Sobre o programa") | erro | ana | 108 | 88 | 0 | 1 | ação 64, estado 33, número 7, título ou rótulo 3, justificativa 1 |
| `avisos-e-erros/16-selo-carregando-a-regra` Folha "De onde vem isto" enquanto a regra chega ("Carregando a regra…") | carregando | ana | 8 | 8 | 0 | 0 | título ou rótulo 4, estado 3, ação 1 |
| `avisos-e-erros/17-entenda-todas-as-regras-carregando` "Entenda o treino", com "Todas as regras e as fontes" aberto enquanto as regras chegam ("Carregando as regras…") | carregando | ana | 49 | 49 | 0 | 0 | ação 43, título ou rótulo 3, estado 3 |
| `avisos-e-erros/18-selo-carregando-as-fontes` Folha "De onde vem isto" enquanto as fontes chegam ("Carregando as fontes…") | carregando | ana | 91 | 91 | 1 | 0 | justificativa 83, título ou rótulo 4, estado 3, ação 1 |
| `avisos-e-erros/19-selo-sem-as-fontes` Folha "De onde vem isto" quando as fontes não baixam | erro | ana | 104 | 104 | 1 | 0 | justificativa 83, estado 16, título ou rótulo 4, ação 1 |
| `avisos-e-erros/20-selo-sem-a-regra` Folha "De onde vem isto" quando a regra não baixa | erro | ana | 20 | 20 | 0 | 0 | estado 12, título ou rótulo 4, ação 4 |
| `avisos-e-erros/21-entenda-todas-as-regras-sem-carregar` "Entenda o treino", com "Todas as regras e as fontes" aberto quando as regras não baixam | erro | ana | 58 | 58 | 0 | 0 | ação 43, estado 12, título ou rótulo 3 |
| `avisos-e-erros/22-guia-animado-nao-carregou` Treino quando o guia animado não carrega (o registro da série continua) | erro | ana | 69 | 87 | 0 | 0 | estado 21, título ou rótulo 17, instrução 11, número 7, ação 7, opção 6 |
| `avisos-e-erros/23-guia-em-texto-nao-baixou-na-folha` Folha do exercício sem animação quando o guia em texto não baixa ("Tentar de novo") | erro | ana | 40 | 40 | 0 | 0 | estado 14, título ou rótulo 10, ação 8, número 8 |
| `avisos-e-erros/24-guia-em-texto-nao-baixou-2a-vez` Folha do exercício sem animação quando o guia em texto falha de novo ("Recarregar o app") | erro | ana | 40 | 40 | 0 | 0 | estado 14, título ou rótulo 10, ação 8, número 8 |
| `avisos-e-erros/25-guia-em-texto-nao-baixou-no-treino` Treino num exercício sem animação quando o guia em texto não baixa | erro | ana | 65 | 81 | 0 | 0 | título ou rótulo 21, estado 20, número 7, ação 7, opção 6, instrução 4 |

## Os 60 textos que mais pesam (palavras × vezes em que aparecem)

| Palavras | Vezes | Dono | Função | Texto | Onde |
|---|---|---|---|---|---|
| 14 | 45 | tela | segurança | Dor forte ou em pontada, formigamento ou perda de força? Pare e procure avaliação. | guia/01-tecnica e mais 44 |
| 22 | 23 | tela | privacidade | Tire ou escolha até 5 fotos do lugar onde você treina. Usar a foto é opcional: a lista abaixo faz o mesmo. | cadastro/34-equipamento-folha-da-foto e mais 22 |
| 48 | 8 | jurídico | privacidade | A Anthropic diz que apaga o que recebe em até 30 dias, salvo se o envio for marcado como violação da política de uso dela (aí pode guardar até 2 anos) ou se a l… | cadastro/34-equipamento-folha-da-foto e mais 7 |
| 2 | 184 | jurídico | ação | Meus dados | cadastro/01-boas-vindas e mais 133 |
| 10 | 33 | tela | ação | Os exercícios: por que cada um e a próxima carga | inicio/08-sobre-o-programa e mais 32 |
| 17 | 15 | domínio | estado | Semana 1. Fase de aprendizado: foco na técnica, volume no mínimo, RIR 3–4 e sem superséries. | inicio/08-sobre-o-programa e mais 14 |
| 27 | 9 | domínio | estado | Ajustar: Foco abaixo da meta: panturrilha 6 de 10 séries por semana. Suba 1 série em panturrilha no degrau da escada, no treino Corpo todo C. | inicio/08-sobre-o-programa e mais 8 |
| 12 | 20 | conteúdo | ação | Remada unilateral com halter apoiada no banco 2 × 8–12 cada lado | inicio/01-inicio-depois-do-1o-treino e mais 19 |
| 11 | 21 | conteúdo | ação | Flexão de joelho deslizando os pés no chão 2 × 8–15 | inicio/03-inicio e mais 20 |
| 7 | 33 | tela | ação | Por que o app pergunta e sugere | inicio/08-sobre-o-programa e mais 32 |
| 13 | 17 | tela | privacidade | Você autorizou o envio das fotos à Anthropic, nos EUA, em 17/11/2026. | termos-e-foto/09-foto-analisando e mais 16 |
| 10 | 22 | tela | estado | Sem nada marcado, o programa usa o peso do corpo. | cadastro/33-equipamento-lugar e mais 21 |
| 27 | 8 | jurídico | privacidade | Ela vai para a Anthropic, empresa dos EUA, que faz o reconhecimento. A Anthropic guarda o dado nos EUA e pode processá-lo também em outros países. | cadastro/34-equipamento-folha-da-foto e mais 7 |
| 8 | 26 | tela | estado | Falta escolher a carga e quantas ainda conseguiria. | treino/01-serie-vazia e mais 25 |
| 41 | 5 | domínio | estado | Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não… | inicio/10-sobre-o-programa-avisos e mais 4 |
| 67 | 3 | domínio | justificativa | Calibração da carga, série a série (R1b; pesquisa-v2/07, seção 2.3, e pesquisa-v2/09): vale na 1ª vez de um exercício, na 1ª vez de uma máquina de placa, anilha… | inicio/16-como-ler-folha-selo e mais 2 |
| 4 | 50 | domínio | título ou rótulo | Agachamento búlgaro com apoio | inicio/02-folha-do-exercicio-com-historico e mais 49 |
| 6 | 33 | tela | ação | A sua semana e as pausas | inicio/08-sobre-o-programa e mais 32 |
| 6 | 33 | tela | ação | Todas as regras e as fontes | inicio/08-sobre-o-programa e mais 32 |
| 62 | 3 | domínio | opção | Corpo todo A/B/C Recomendada Cada músculo 3 vezes por semana · cerca de 6 exercícios por treino. Os três treinos passam por todos os grandes grupos, com exercíc… | dados-e-locais/28-rotina-e-divisao e mais 2 |
| 8 | 23 | conteúdo | ação | Tríceps francês sentado com halter 2 × 10–15 | inicio/03-inicio e mais 22 |
| 1 | 179 | domínio | justificativa | consenso | inicio/08-sobre-o-programa e mais 29 |
| 8 | 22 | conteúdo | ação | Ponte de glúteo com halter 2 × 10–20 | inicio/03-inicio e mais 21 |
| 28 | 6 | domínio | opção | Problema em osso, articulação, músculo ou tendão Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar c… | cadastro/06-saude-quais-valem e mais 5 |
| 24 | 7 | domínio | privacidade | Cada vaga pede uma função (por exemplo, "tríceps com o braço acima da cabeça"), não um aparelho: máquina e peso livre valem o mesmo. | inicio/12-sobre-o-programa-por-que-este-programa e mais 6 |
| 4 | 42 | tela | instrução | 1ª vez: comece leve. | treino/01-serie-vazia e mais 41 |
| 7 | 23 | tela | instrução | Aqueça antes: 1–2 séries leves, sem contar. | treino/01-serie-vazia e mais 22 |
| 40 | 4 | jurídico | privacidade | Mande este texto para quem te passou o link do app, contando o que aconteceu. Vão a versão do app, o modelo do aparelho e a tela. Não escreva nada sobre a sua s… | dados-e-locais/12-meus-dados-avisar-um-problema e mais 3 |
| 39 | 4 | tela | segurança | Para cada região, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o app prefere outros; até 2, o programa… | cadastro/08-saude-quais-valem-regioes-erro-sem-regiao e mais 3 |
| 156 | 1 | domínio | privacidade | Texto da foto do equipamento e consentimento antes do 1º envio (R5c, 07/11/2026). A foto é o único dado que sai do aparelho e pode ser dado pessoal (mostra a ca… | termos-e-foto/04-termos-folha-selo-3 |
| 7 | 22 | conteúdo | ação | Supino reto com halteres 2 × 6–10 | inicio/01-inicio-depois-do-1o-treino e mais 21 |
| 2 | 75 | tela | ação | Senti algo | treino/01-serie-vazia e mais 74 |
| 21 | 7 | domínio | justificativa | Ordem da sessão: multiarticulares primeiro, depois os grupos que você priorizou, core por último. A ordem quase não muda a hipertrofia. | inicio/12-sobre-o-programa-por-que-este-programa e mais 6 |
| 18 | 8 | jurídico | privacidade | No seu celular, cada foto é reduzida e perde a localização (GPS) e os outros dados da câmera. | cadastro/34-equipamento-folha-da-foto e mais 7 |
| 18 | 8 | jurídico | privacidade | O servidor do app não guarda a foto e não registra a imagem (só quantas fotos foram enviadas). | cadastro/34-equipamento-folha-da-foto e mais 7 |
| 3 | 48 | tela | título ou rótulo | Quantas ainda conseguiria? | treino/01-serie-vazia e mais 47 |
| 11 | 13 | tela | privacidade | Os dados ficam só neste aparelho, e o navegador pode apagá-los. | inicio/30-inicio-semana-completa e mais 12 |
| 23 | 6 | domínio | ação | Sem priorizar pernas quadríceps, posteriores da coxa, panturrilha voltam ao mínimo eficaz (sem prioridade); atinge a meta de ombro (lateral); ainda abaixo: glút… | inicio/14-folha-avisos e mais 5 |
| 17 | 8 | domínio | estado | "Pernas" conta como 3: frente da coxa, posterior e panturrilha. O foco rende mais com até 2. | cadastro/32-rotina-respondida e mais 7 |
| 9 | 15 | tela | privacidade | Este navegador pode apagar seus dados. Guarde uma cópia. | dados-e-locais/01-meus-dados e mais 14 |
| 7 | 19 | tela | ação | Por que este programa (10) | inicio/08-sobre-o-programa e mais 18 |
| 19 | 7 | domínio | justificativa | Com o mesmo volume semanal, as divisões rendem o mesmo crescimento; a escolha é pelo encaixe na sua rotina. | inicio/12-sobre-o-programa-por-que-este-programa e mais 6 |
| 22 | 6 | domínio | opção | Perdeu o equilíbrio por tontura, ou desmaiou, no último ano Nos últimos 12 meses, você perdeu o equilíbrio por tontura ou desmaiou? | cadastro/06-saude-quais-valem e mais 5 |
| 4 | 33 | tela | ação | Como ler o treino | inicio/08-sobre-o-programa e mais 32 |
| 33 | 4 | domínio | estado | Sem cadeira extensora: a parte da frente da coxa que vai até o quadril cresce pouco só com agachamento e afundo. Não precisa fazer nada: os outros exercícios do… | inicio/10-sobre-o-programa-avisos e mais 3 |
| 44 | 3 | domínio | opção | Clássica ABC Cada músculo 1 vez por semana · cerca de 6 exercícios por treino. A: peito, ombros e tríceps; B: costas e bíceps; C: pernas. Cada músculo treina 1 … | dados-e-locais/28-rotina-e-divisao e mais 2 |
| 1 | 129 | tela | opção | 6 | cadastro/09-saude-quais-valem-regioes-erro-sem-notas e mais 68 |
| 3 | 43 | tela | ação | Começar o treino | inicio/01-inicio-depois-do-1o-treino e mais 42 |
| 21 | 6 | domínio | opção | Febre, gripe forte ou se recuperando de doença Você está com febre, gripe forte ou se recuperando de alguma doença agora? | cadastro/06-saude-quais-valem e mais 5 |
| 1 | 123 | tela | ação | Erros | treino/01-serie-vazia e mais 77 |
| 1 | 121 | domínio | ação | Semana | inicio/01-inicio-depois-do-1o-treino e mais 116 |
| 11 | 11 | tela | ação | Rotina e divisão 3 × 45 min · Corpo todo A/B/C | dados-e-locais/01-meus-dados e mais 10 |
| 15 | 8 | tela | justificativa | Consenso de especialistas. Prática de treinadores e posicionamentos, sem ensaio que teste este número. | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 7 |
| 8 | 15 | tela | ação | Entenda o treino O porquê e as fontes | dados-e-locais/01-meus-dados e mais 14 |
| 40 | 3 | domínio | privacidade | Conte o que aconteceu e o que você esperava (por favor, sem dados de saúde e sem anexar o arquivo exportado): --- Versão: 4b4528d (publicada em 17/11/2026) Apar… | dados-e-locais/12-meus-dados-avisar-um-problema e mais 2 |
| 17 | 7 | domínio | justificativa | Os exercícios ficam os mesmos por 4 a 8 semanas; o programa só muda quando você pede. | inicio/12-sobre-o-programa-por-que-este-programa e mais 6 |
| 1 | 118 | domínio | ação | Fechar | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 117 |
| 1 | 118 | domínio | ação | Treino | inicio/01-inicio-depois-do-1o-treino e mais 116 |
| 9 | 13 | tela | ação | Agachamento búlgaro com apoio 3 × 8–12 cada lado | inicio/03-inicio e mais 12 |
| 3 | 39 | conteúdo | ação | Descida · excêntrica | treino/02-serie-vazia-guia-erros e mais 38 |

## Controles sem nome acessível

Nenhum.
