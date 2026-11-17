# Inventário do texto do app

> Gerado por `scripts/textos/classificar.mjs` a partir de `colheita.json` (2026-11-16T14:50:59.829Z). Não edite à mão: rode o roteiro e o script de novo.

**458 telas, folhas e estados colhidos; 11687 textos (2070 diferentes); 66352 palavras somadas** (a mesma frase conta de novo em cada tela em que aparece; as palavras de textos diferentes somam 20514).

## Por fluxo

| Fluxo | Telas | Palavras | Média por tela | Maior tela |
|---|---|---|---|---|
| cadastro | 88 | 9301 | 106 | Folha "Por que esta pergunta" (362) |
| inicio | 90 | 14427 | 160 | Folha "Sobre o programa", com os 5 blocos abertos (a Ana com dor) (946) |
| treino | 80 | 6565 | 82 | Folha "Por quê" de "1ª vez: comece leve." (a calibração da carga) (295) |
| guia | 47 | 14979 | 319 | Guia de um exercício com a nota "Montagem segura" abaixo do palco (búlgaro na suspensão) (652) |
| fim-e-semana | 49 | 7965 | 163 | Folha "Bem-vindo de volta!" (por quê?), pausa de 200 dias (332) |
| dados-e-locais | 50 | 6820 | 136 | Refazer a triagem (quem tinha um "sim": abre em "Quais valem", com as marcas, as regiões e as notas) (334) |
| termos-e-foto | 29 | 3627 | 125 | Termos de uso e privacidade (792) |
| avisos-e-erros | 25 | 2668 | 107 | Início no iPhone (Safari, sem instalar): o aviso de instalar depois dos exercícios (190) |

## Para que serve o texto (todas as telas somadas)

| Função | Textos | Palavras | Parte | Decididos à mão |
|---|---|---|---|---|
| ação | 4206 | 15077 | 23% | 0 |
| opção | 1557 | 5431 | 8% | 0 |
| título ou rótulo | 1699 | 5138 | 8% | 16 |
| estado | 482 | 5585 | 8% | 235 |
| número | 1086 | 3325 | 5% | 112 |
| segurança | 361 | 8030 | 12% | 14 |
| definição | 80 | 717 | 1% | 59 |
| justificativa | 844 | 10374 | 16% | 65 |
| privacidade | 275 | 5469 | 8% | 27 |
| instrução | 1085 | 7104 | 11% | 54 |
| descreve o que já se vê | 12 | 102 | 0% | 12 |

## De quem é o texto

| Dono | Textos | Palavras | Parte |
|---|---|---|---|
| jurídico | 248 | 2342 | 4% |
| conteúdo | 1569 | 15461 | 23% |
| domínio | 2917 | 17654 | 27% |
| motor | 107 | 336 | 1% |
| tela | 6846 | 30559 | 46% |

## cadastro

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `cadastro/01-boas-vindas` Boas-vindas | tela | ana | 68 | 68 | 0 | 0 | ação 25, segurança 14, privacidade 12, descreve o que já se vê 10, título ou rótulo 7 |
| `cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz` Folha "O que o app não faz" | folha | ana | 132 | 132 | 3 | 0 | segurança 70, justificativa 48, título ou rótulo 7, ação 7 |
| `cadastro/03-boas-vindas-folha-seus-dados` Folha "Seus dados ficam no aparelho" | folha | ana | 93 | 93 | 1 | 1 | privacidade 90, ação 2, justificativa 1 |
| `cadastro/04-boas-vindas-folha-selo-da-foto` Folha "De onde vem isto" (o selo "fonte" do texto da foto) | folha | ana | 261 | 161 | 3 | 0 | privacidade 156, justificativa 88, ação 13, título ou rótulo 4 |
| `cadastro/05-saude` Saúde: a pergunta geral, com as 9 condições | tela | ana | 87 | 87 | 0 | 0 | segurança 62, ação 16, título ou rótulo 5, número 4 |
| `cadastro/06-saude-folha-por-que-perguntamos` Folha "Por que esta pergunta" | folha | ana | 362 | 152 | 6 | 0 | justificativa 252, segurança 90, ação 16, título ou rótulo 4 |
| `cadastro/07-saude-folha-perguntas-completas` Folha "As 9 perguntas completas" | folha | ana | 137 | 137 | 0 | 0 | segurança 132, título ou rótulo 4, ação 1 |
| `cadastro/08-saude-quais-valem` Saúde: quais valem (as 9 perguntas para marcar) | tela | ana | 195 | 134 | 0 | 0 | opção 172, instrução 13, número 4, título ou rótulo 4, ação 2 |
| `cadastro/09-saude-quais-valem-erro-nenhuma-marcada` Saúde: quais valem, sem nenhuma marcada | erro | ana | 208 | 111 | 0 | 0 | opção 172, instrução 13, estado 13, número 4, título ou rótulo 4, ação 2 |
| `cadastro/10-saude-quais-valem-regioes-erro-sem-regiao` Saúde: quais valem, com "Quais regiões?" e nenhuma região marcada | erro | ana | 269 | 80 | 1 | 1 | opção 179, segurança 55, instrução 13, estado 9, título ou rótulo 6, número 4, ação 2, justificativa 1 |
| `cadastro/11-saude-quais-valem-regioes-erro-sem-notas` Saúde: 3 regiões marcadas, sem as notas de dor | erro | ana | 360 | 84 | 1 | 1 | opção 212, segurança 105, estado 17, instrução 13, título ou rótulo 6, número 4, ação 2, justificativa 1 |
| `cadastro/12-saude-quais-valem-regioes-erro-sem-uma-nota` Saúde: 3 regiões marcadas, faltando 1 nota de dor | erro | ana | 349 | 84 | 1 | 1 | opção 212, segurança 104, instrução 13, estado 7, título ou rótulo 6, número 4, ação 2, justificativa 1 |
| `cadastro/13-saude-folha-confirmar-nao-marcadas` Folha "Nenhuma destas vale para você?" (8 não marcadas) | folha | ana | 114 | 114 | 0 | 0 | segurança 97, ação 7, título ou rótulo 5, estado 5 |
| `cadastro/14-saude-folha-confirmar-nao-marcada-uma` Folha "Nenhuma destas vale para você?" (1 não marcada) | folha | ana | 29 | 29 | 0 | 0 | segurança 13, ação 7, título ou rótulo 5, estado 4 |
| `cadastro/15-saude-pausa` Saúde: "Vamos pausar o programa automático" (8 respostas "sim") | aviso | ana | 184 | 116 | 1 | 1 | segurança 153, opção 14, título ou rótulo 5, número 4, estado 4, ação 3, justificativa 1 |
| `cadastro/16-saude-pausa-folha-selo` Folha "De onde vem isto" (o selo da pausa da triagem) | folha | ana | 237 | 141 | 5 | 0 | justificativa 164, segurança 53, ação 16, título ou rótulo 4 |
| `cadastro/17-saude-pausa-liberacao-marcada` Saúde: a pausa, com a liberação marcada | aviso | ana | 184 | 116 | 1 | 1 | segurança 153, opção 14, título ou rótulo 5, número 4, estado 4, ação 3, justificativa 1 |
| `cadastro/18-experiencia-vazia` Experiência: a 1ª pergunta, sem resposta | estado vazio | ana | 40 | 40 | 0 | 0 | opção 14, título ou rótulo 12, definição 9, número 4, ação 1 |
| `cadastro/19-experiencia-erro-sem-resposta` Experiência: as mensagens de "falta" sem nenhuma resposta | erro | ana | 69 | 69 | 0 | 0 | estado 29, opção 14, título ou rótulo 12, definição 9, número 4, ação 1 |
| `cadastro/20-experiencia-2a-pergunta` Experiência: a 2ª pergunta aparece ("Você está treinando agora?") | tela | ana | 82 | 82 | 0 | 0 | opção 41, título ou rótulo 16, justificativa 11, definição 9, número 4, ação 1 |
| `cadastro/21-experiencia-3a-pergunta` Experiência: a 3ª pergunta aparece (confiança na técnica) | tela | ana | 104 | 78 | 0 | 0 | opção 52, título ou rótulo 27, justificativa 11, definição 9, número 4, ação 1 |
| `cadastro/22-experiencia-nivel-avancado` Experiência respondida: "Seu nível: Avançado", com "Quer começar num nível mais leve?" | tela | ana | 144 | 62 | 0 | 1 | opção 56, título ou rótulo 36, justificativa 27, descreve o que já se vê 10, definição 9, número 4, ação 2 |
| `cadastro/23-experiencia-nivel-intermediario` Experiência respondida: "Seu nível: Intermediário" | tela | ana | 145 | 94 | 0 | 1 | opção 55, título ou rótulo 36, justificativa 29, descreve o que já se vê 10, definição 9, número 4, ação 2 |
| `cadastro/24-experiencia-nivel-iniciante-pela-pausa` Experiência respondida: iniciante por mais de 6 meses parado | tela | ana | 130 | 93 | 0 | 1 | opção 52, justificativa 33, título ou rótulo 30, definição 9, número 4, ação 2 |
| `cadastro/25-experiencia-nivel-iniciante-pela-tecnica` Experiência respondida: iniciante por falta de confiança na técnica | tela | ana | 123 | 86 | 0 | 1 | opção 52, título ou rótulo 30, justificativa 26, definição 9, número 4, ação 2 |
| `cadastro/26-experiencia-respondida` Experiência respondida (a Ana: "Seu nível: Iniciante") | tela | ana | 121 | 77 | 0 | 1 | opção 52, título ou rótulo 30, justificativa 24, definição 9, número 4, ação 2 |
| `cadastro/27-experiencia-folha-selo-do-nivel` Folha "De onde vem isto" (o selo do nível) | folha | ana | 119 | 119 | 2 | 0 | justificativa 63, segurança 45, ação 7, título ou rótulo 4 |
| `cadastro/28-rotina-vazia` Rotina: a 1ª pergunta, sem resposta | estado vazio | ana | 28 | 28 | 0 | 0 | título ou rótulo 11, opção 10, número 4, ação 3 |
| `cadastro/29-rotina-folha-por-que-dias` Folha "Quantos dias" (por quê?) | folha | ana | 84 | 84 | 1 | 0 | justificativa 80, título ou rótulo 3, ação 1 |
| `cadastro/30-rotina-erro-sem-resposta` Rotina: as mensagens de "falta" sem nenhuma resposta | erro | ana | 43 | 43 | 0 | 0 | estado 15, título ou rótulo 11, opção 10, número 4, ação 3 |
| `cadastro/31-rotina-2a-pergunta` Rotina: a 2ª pergunta aparece ("Quantos minutos por treino?") | tela | ana | 49 | 49 | 0 | 0 | opção 21, título ou rótulo 15, definição 6, número 4, ação 3 |
| `cadastro/32-rotina-minutos-outro` Rotina: minutos em "Outro", com o campo vazio | tela | ana | 84 | 56 | 0 | 0 | opção 28, título ou rótulo 24, instrução 8, descreve o que já se vê 7, ação 6, definição 6, número 5 |
| `cadastro/33-rotina-minutos-outro-erro` Rotina: "Outro" sem número válido | erro | ana | 103 | 54 | 0 | 0 | opção 28, título ou rótulo 24, estado 19, instrução 8, descreve o que já se vê 7, ação 6, definição 6, número 5 |
| `cadastro/34-rotina-3a-pergunta` Rotina: a 3ª pergunta aparece (grupos a priorizar) | tela | ana | 75 | 63 | 0 | 0 | opção 28, título ou rótulo 21, descreve o que já se vê 7, ação 6, definição 6, número 4, instrução 3 |
| `cadastro/35-rotina-folha-por-que-grupos` Folha "Grupos prioritários" (por quê?) | folha | ana | 329 | 181 | 5 | 0 | justificativa 315, ação 10, título ou rótulo 4 |
| `cadastro/36-rotina-foco-3-grupos` Rotina: 3 grupos marcados (a nota "Com mais de 2 grupos…") | aviso | ana | 101 | 63 | 1 | 0 | opção 28, estado 26, título ou rótulo 21, descreve o que já se vê 7, ação 6, definição 6, número 4, instrução 3 |
| `cadastro/37-rotina-foco-bracos` Rotina: Peito e Braços marcados (a nota "Braços conta como 2") | aviso | ana | 105 | 63 | 1 | 0 | estado 30, opção 28, título ou rótulo 21, descreve o que já se vê 7, ação 6, definição 6, número 4, instrução 3 |
| `cadastro/38-rotina-respondida` Rotina respondida (a Ana: 3 dias, 45 min, Pernas e Glúteos) | tela | ana | 108 | 84 | 1 | 0 | estado 33, opção 28, título ou rótulo 21, descreve o que já se vê 7, ação 6, definição 6, número 4, instrução 3 |
| `cadastro/39-equipamento-lugar` Equipamento: "Onde você treina?", sem nada marcado | estado vazio | ana | 73 | 73 | 0 | 0 | ação 45, privacidade 17, título ou rótulo 7, número 4 |
| `cadastro/40-equipamento-folha-da-foto` Folha "Reconhecer pela foto" (como abre na 1ª vez) | folha | ana | 194 | 170 | 2 | 1 | privacidade 157, título ou rótulo 16, opção 14, estado 5, ação 1, justificativa 1 |
| `cadastro/41-equipamento-item-por-item-vazio` Equipamento: item por item, sem nada marcado (categoria "Halteres e anilhas") | estado vazio | ana | 98 | 65 | 0 | 0 | ação 56, privacidade 17, título ou rótulo 12, opção 9, número 4 |
| `cadastro/42-equipamento-categoria-bancos` Equipamento: item por item, categoria "Bancos" | tela | ana | 99 | 47 | 0 | 0 | ação 56, privacidade 17, título ou rótulo 12, opção 10, número 4 |
| `cadastro/43-equipamento-categoria-polias-e-acessorios` Equipamento: item por item, categoria "Polias e acessórios" | tela | ana | 106 | 44 | 0 | 0 | ação 56, opção 17, privacidade 17, título ou rótulo 12, número 4 |
| `cadastro/44-equipamento-categoria-barras` Equipamento: item por item, categoria "Barras" | tela | ana | 98 | 46 | 0 | 0 | ação 56, privacidade 17, título ou rótulo 12, opção 9, número 4 |
| `cadastro/45-equipamento-categoria-maquinas` Equipamento: item por item, categoria "Máquinas" | tela | ana | 134 | 43 | 0 | 0 | ação 56, opção 45, privacidade 17, título ou rótulo 12, número 4 |
| `cadastro/46-equipamento-categoria-outros-acessorios` Equipamento: item por item, categoria "Outros acessórios" | tela | ana | 100 | 41 | 0 | 0 | ação 56, privacidade 17, título ou rótulo 12, opção 11, número 4 |
| `cadastro/47-equipamento-busca-sem-resultado` Equipamento: busca sem resultado | estado vazio | ana | 101 | 68 | 0 | 0 | ação 56, privacidade 17, título ou rótulo 12, estado 12, número 4 |
| `cadastro/48-equipamento-busca-com-resultado` Equipamento: busca com resultado | tela | ana | 91 | 63 | 0 | 0 | ação 56, privacidade 17, título ou rótulo 12, número 4, opção 2 |
| `cadastro/49-equipamento-folha-halteres-fixos` Folha de detalhes: Halteres fixos | folha | ana | 62 | 62 | 0 | 0 | opção 39, título ou rótulo 12, justificativa 9, ação 2 |
| `cadastro/50-equipamento-folha-halteres-fixos-outro` Folha de detalhes: Halteres fixos, com "Outro" em "O mais leve" | folha | ana | 68 | 67 | 0 | 0 | opção 39, título ou rótulo 17, justificativa 9, ação 2, número 1 |
| `cadastro/51-equipamento-folha-anilhas-e-manoplas` Folha de detalhes: Anilhas e manoplas | folha | ana | 90 | 58 | 0 | 0 | número 28, ação 21, título ou rótulo 18, opção 15, instrução 8 |
| `cadastro/52-equipamento-folha-polia-simples` Folha de detalhes: Polia simples | folha | ana | 12 | 12 | 0 | 0 | título ou rótulo 6, opção 4, ação 2 |
| `cadastro/53-equipamento-folha-banco-regulavel` Folha de detalhes: Banco regulável | folha | ana | 14 | 14 | 0 | 0 | título ou rótulo 10, ação 2, opção 2 |
| `cadastro/54-equipamento-folha-elasticos` Folha de detalhes: Elásticos | folha | ana | 14 | 14 | 0 | 0 | título ou rótulo 6, opção 6, ação 2 |
| `cadastro/55-equipamento-folha-polia-dupla-crossover` Folha de detalhes: Polia dupla (crossover) | folha | ana | 9 | 9 | 0 | 0 | ação 6, título ou rótulo 3 |
| `cadastro/56-equipamento-folha-polia-dupla-placas` Folha de detalhes: Polia dupla, com "Placas da torre (opcional)" aberto | bloco aberto | ana | 17 | 17 | 0 | 0 | título ou rótulo 10, ação 6, número 1 |
| `cadastro/57-equipamento-folha-multifuncional` Folha de detalhes: Multifuncional | folha | ana | 23 | 23 | 0 | 0 | opção 8, definição 7, título ou rótulo 6, ação 2 |
| `cadastro/58-equipamento-folha-kettlebell` Folha de detalhes: Kettlebell | folha | ana | 36 | 36 | 0 | 0 | opção 22, definição 7, título ou rótulo 5, ação 2 |
| `cadastro/59-equipamento-folha-caneleiras-de-peso` Folha de detalhes: Caneleiras de peso | folha | ana | 35 | 35 | 0 | 0 | opção 16, título ou rótulo 10, definição 7, ação 2 |
| `cadastro/60-equipamento-folha-mini-band` Folha de detalhes: Mini-band | folha | ana | 14 | 14 | 0 | 0 | título ou rótulo 6, opção 6, ação 2 |
| `cadastro/61-equipamento-folha-voador` Folha de detalhes: Voador | folha | ana | 15 | 15 | 0 | 0 | título ou rótulo 11, ação 2, opção 2 |
| `cadastro/62-equipamento-folha-maquina-de-triceps` Folha de detalhes: Máquina de tríceps | folha | ana | 15 | 15 | 0 | 0 | título ou rótulo 11, ação 2, opção 2 |
| `cadastro/63-equipamento-folha-halteres-fixos-erro` Folha de detalhes: Halteres fixos, com o que falta | erro | ana | 80 | 79 | 0 | 0 | opção 39, estado 18, título ou rótulo 12, justificativa 9, ação 2 |
| `cadastro/64-equipamento-erro-detalhes-por-completar` Equipamento: "Falta pouco", com os itens marcados "falta completar" | erro | ana | 214 | 67 | 0 | 0 | ação 80, estado 49, opção 45, título ou rótulo 19, privacidade 17, número 4 |
| `cadastro/65-equipamento-folha-anilhas-e-manoplas-erro` Folha de detalhes: Anilhas e manoplas, com o que falta | erro | ana | 113 | 76 | 0 | 0 | número 28, estado 23, ação 21, título ou rótulo 18, opção 15, instrução 8 |
| `cadastro/66-equipamento-folha-polia-simples-erro` Folha de detalhes: Polia simples, com o que falta | erro | ana | 22 | 22 | 0 | 0 | estado 10, título ou rótulo 6, opção 4, ação 2 |
| `cadastro/67-equipamento-folha-banco-regulavel-erro` Folha de detalhes: Banco regulável, com o que falta | erro | ana | 20 | 20 | 0 | 0 | título ou rótulo 10, estado 6, ação 2, opção 2 |
| `cadastro/68-equipamento-folha-elasticos-erro` Folha de detalhes: Elásticos, com o que falta | erro | ana | 21 | 21 | 0 | 0 | estado 7, título ou rótulo 6, opção 6, ação 2 |
| `cadastro/69-equipamento-folha-multifuncional-erro` Folha de detalhes: Multifuncional, com o que falta | erro | ana | 30 | 30 | 0 | 0 | opção 8, definição 7, estado 7, título ou rótulo 6, ação 2 |
| `cadastro/70-equipamento-folha-kettlebell-erro` Folha de detalhes: Kettlebell, com o que falta | erro | ana | 43 | 43 | 0 | 0 | opção 22, definição 7, estado 7, título ou rótulo 5, ação 2 |
| `cadastro/71-equipamento-folha-caneleiras-de-peso-erro` Folha de detalhes: Caneleiras de peso, com o que falta | erro | ana | 42 | 42 | 0 | 0 | opção 16, título ou rótulo 10, definição 7, estado 7, ação 2 |
| `cadastro/72-equipamento-folha-mini-band-erro` Folha de detalhes: Mini-band, com o que falta | erro | ana | 21 | 21 | 0 | 0 | estado 7, título ou rótulo 6, opção 6, ação 2 |
| `cadastro/73-equipamento-folha-voador-erro` Folha de detalhes: Voador, com o que falta | erro | ana | 23 | 23 | 0 | 0 | título ou rótulo 11, estado 8, ação 2, opção 2 |
| `cadastro/74-equipamento-folha-maquina-de-triceps-erro` Folha de detalhes: Máquina de tríceps, com o que falta | erro | ana | 26 | 26 | 0 | 0 | título ou rótulo 11, estado 11, ação 2, opção 2 |
| `cadastro/75-equipamento-erro-um-detalhe` Equipamento: "Há 1 detalhe para completar." | erro | ana | 151 | 67 | 0 | 0 | ação 58, opção 45, privacidade 17, título ou rótulo 16, estado 11, número 4 |
| `cadastro/76-equipamento-folha-halteres-fixos-erro-limites` Folha dos halteres: peso acima do limite e passo pequeno demais | erro | ana | 95 | 84 | 0 | 0 | opção 39, título ou rótulo 23, estado 20, justificativa 9, ação 2, número 2 |
| `cadastro/77-equipamento-folha-halteres-fixos-erro-ordem` Folha dos halteres: o mais pesado menor que o mais leve | erro | ana | 86 | 75 | 0 | 0 | opção 39, título ou rótulo 23, estado 11, justificativa 9, ação 2, número 2 |
| `cadastro/78-equipamento-folha-halteres-fixos-erro-passo` Folha dos halteres: passo maior que a diferença | erro | ana | 85 | 81 | 0 | 0 | opção 39, título ou rótulo 17, estado 17, justificativa 9, ação 2, número 1 |
| `cadastro/79-equipamento-lugar-academia` Equipamento: depois do atalho "Academia completa" | tela | ana | 170 | 88 | 1 | 2 | ação 50, definição 30, título ou rótulo 24, estado 22, opção 21, privacidade 17, número 4, justificativa 2 |
| `cadastro/80-equipamento-lugar-condominio` Equipamento: depois do atalho "Condomínio com multifuncional" | tela | ana | 124 | 89 | 0 | 1 | ação 50, estado 22, privacidade 17, título ou rótulo 15, opção 15, número 4, justificativa 1 |
| `cadastro/81-equipamento-lugar-casa` Equipamento: depois do atalho "Casa com halteres e elásticos" | tela | ana | 129 | 86 | 0 | 1 | ação 50, estado 22, opção 20, privacidade 17, título ou rótulo 15, número 4, justificativa 1 |
| `cadastro/82-equipamento-lugar-corpo` Equipamento: depois do atalho "Corpo livre" | tela | ana | 95 | 95 | 0 | 1 | ação 45, estado 21, privacidade 17, título ou rótulo 7, número 4, justificativa 1 |
| `cadastro/83-equipamento-folha-selo-dos-atalhos` Folha "De onde vem isto" (o selo dos atalhos de lugar) | folha | ana | 101 | 101 | 2 | 0 | justificativa 96, título ou rótulo 4, ação 1 |
| `cadastro/84-equipamento-item-por-item-academia` Equipamento: item por item, com os itens da "Academia completa" marcados | tela | ana | 322 | 70 | 1 | 2 | título ou rótulo 116, ação 101, opção 30, definição 30, estado 22, privacidade 17, número 4, justificativa 2 |
| `cadastro/85-equipamento-folha-selo-da-menor-anilha` Folha "De onde vem isto" (o selo da menor anilha) | folha | ana | 81 | 81 | 1 | 0 | justificativa 76, título ou rótulo 4, ação 1 |
| `cadastro/86-equipamento-folha-do-item` Folha de detalhes: Halteres fixos (a 1ª folha de item da Ana) | folha | ana | 62 | 62 | 0 | 0 | opção 39, título ou rótulo 12, justificativa 9, ação 2 |
| `cadastro/87-equipamento-folha-do-item-respondida` Folha de detalhes: Halteres fixos, respondida (1 a 12 kg, de 1 em 1) | folha | ana | 62 | 62 | 0 | 0 | opção 39, título ou rótulo 12, justificativa 9, ação 2 |
| `cadastro/88-equipamento-item-por-item` Equipamento: item por item, com os 2 itens da Ana marcados | tela | ana | 110 | 49 | 0 | 0 | ação 59, título ou rótulo 20, privacidade 17, opção 10, número 4 |

## inicio

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `inicio/01-inicio-depois-do-1o-treino` Início, depois do 1º treino (com a faixa "A sua semana") | tela | ana | 109 | 106 | 0 | 0 | ação 90, estado 9, número 5, título ou rótulo 5 |
| `inicio/02-folha-do-exercicio-com-historico` Folha do exercício com histórico ("Ver a evolução deste exercício") | folha | ana | 98 | 85 | 0 | 1 | ação 54, título ou rótulo 17, segurança 16, número 10, justificativa 1 |
| `inicio/03-inicio` Início, antes do 1º treino (a Ana) | tela | ana | 105 | 105 | 0 | 0 | ação 86, estado 9, número 5, título ou rótulo 5 |
| `inicio/04-inicio-aba-corpo-todo-b` Início, aba "Corpo todo B" (a Ana) | tela | ana | 103 | 103 | 0 | 0 | ação 84, estado 9, número 5, título ou rótulo 5 |
| `inicio/05-inicio-aba-corpo-todo-c` Início, aba "Corpo todo C" (a Ana) | tela | ana | 95 | 95 | 0 | 0 | ação 76, estado 9, número 5, título ou rótulo 5 |
| `inicio/06-folha-do-exercicio` Folha do exercício como abre (o 1º do dia A: agachamento búlgaro) | folha | ana | 93 | 85 | 0 | 1 | ação 49, título ou rótulo 17, segurança 16, número 10, justificativa 1 |
| `inicio/07-folha-do-exercicio-ver-mais-opcoes` Folha do exercício, com "Ver mais opções" aberto | bloco aberto | ana | 98 | 84 | 0 | 1 | ação 54, título ou rótulo 17, segurança 16, número 10, justificativa 1 |
| `inicio/08-folha-do-exercicio-por-que` Folha do exercício, com "Por que este exercício" aberto | bloco aberto | ana | 200 | 149 | 1 | 6 | justificativa 94, ação 49, título ou rótulo 17, segurança 16, privacidade 14, número 10 |
| `inicio/09-folha-do-exercicio-folha-selo` Folha "De onde vem isto" (o selo do 1º motivo do exercício) | folha | ana | 224 | 143 | 4 | 0 | justificativa 122, segurança 91, ação 7, título ou rótulo 4 |
| `inicio/10-sobre-o-programa` Folha "Sobre o programa" como abre (a Ana) | folha | ana | 104 | 92 | 1 | 3 | estado 59, ação 27, título ou rótulo 8, número 7, justificativa 3 |
| `inicio/11-sobre-o-programa-limites-e-observacoes` Folha "Sobre o programa", com "Limites e observações (3)" aberto (a Ana) | bloco aberto | ana | 229 | 127 | 4 | 6 | estado 181, ação 27, título ou rótulo 8, número 7, justificativa 6 |
| `inicio/12-sobre-o-programa-avisos` Folha "Sobre o programa", com "Avisos (9)" aberto (a Ana) | bloco aberto | ana | 452 | 110 | 9 | 12 | estado 398, ação 27, justificativa 12, título ou rótulo 8, número 7 |
| `inicio/13-sobre-o-programa-fases` Folha "Sobre o programa", com "Fases (2)" aberto (a Ana) | bloco aberto | ana | 128 | 92 | 1 | 5 | estado 81, ação 27, título ou rótulo 8, número 7, justificativa 5 |
| `inicio/14-sobre-o-programa-por-que-este-programa` Folha "Sobre o programa", com "Por que este programa (10)" aberto (a Ana) | bloco aberto | ana | 299 | 126 | 3 | 13 | justificativa 174, estado 59, ação 27, privacidade 24, título ou rótulo 8, número 7 |
| `inicio/15-sobre-o-programa-series-por-musculo-na-semana` Folha "Sobre o programa", com "Séries por músculo na semana" aberto (a Ana) | bloco aberto | ana | 152 | 104 | 1 | 4 | estado 59, número 29, ação 27, título ou rótulo 26, definição 6, justificativa 5 |
| `inicio/16-folha-avisos` Folha "Avisos" (os ajustes possíveis da Ana) | folha | ana | 94 | 94 | 0 | 1 | ação 75, instrução 15, título ou rótulo 3, justificativa 1 |
| `inicio/17-folha-avisos-folha-selo` Folha "De onde vem isto" (o selo dos ajustes possíveis) | folha | ana | 265 | 131 | 6 | 0 | justificativa 245, ação 16, título ou rótulo 4 |
| `inicio/18-como-ler-aberto` Início, com "Como ler o seu treino" aberto | bloco aberto | ana | 256 | 174 | 2 | 5 | definição 115, ação 86, privacidade 31, estado 9, número 5, título ou rótulo 5, justificativa 5 |
| `inicio/19-como-ler-folha-selo` Folha "De onde vem isto" (o selo de "Carga", em "Como ler o seu treino") | folha | ana | 268 | 158 | 6 | 0 | justificativa 251, ação 13, título ou rótulo 4 |
| `inicio/20-folha-do-exercicio-sem-animacao` Folha de um exercício sem animação (guia em texto): crucifixo invertido sentado | folha | ana | 87 | 87 | 0 | 1 | ação 39, título ou rótulo 20, segurança 16, número 8, estado 3, justificativa 1 |
| `inicio/21-folha-como-fazer-em-texto` Folha "Como fazer (em texto)" como abre | folha | ana | 78 | 78 | 0 | 0 | instrução 63, ação 8, título ou rótulo 7 |
| `inicio/22-folha-como-fazer-em-texto-passo-a-passo` Folha "Como fazer (em texto)", com "Posição, execução e carga, passo a passo" aberto | bloco aberto | ana | 204 | 122 | 1 | 0 | instrução 185, título ou rótulo 11, ação 8 |
| `inicio/23-inicio-com-treino-em-andamento` Início com um treino em andamento ("Continuar o treino em andamento") | tela | ana | 94 | 99 | 0 | 0 | ação 84, número 5, título ou rótulo 5 |
| `inicio/24-inicio-depois-de-mudar-a-rotina` Início depois de mudar o objetivo em Meus dados (a versão nova do programa) | aviso | ana | 106 | 98 | 0 | 0 | ação 89, estado 7, número 5, título ou rótulo 5 |
| `inicio/25-folha-do-exercicio-preferencia-salva` Folha do exercício, depois de "Prefiro…" | folha | ana | 217 | 102 | 1 | 6 | justificativa 94, ação 52, título ou rótulo 17, segurança 16, estado 14, privacidade 14, número 10 |
| `inicio/26-inicio-versao-nova` Início, com "Há uma versão nova do seu programa." | aviso | ana | 120 | 109 | 0 | 0 | ação 89, estado 21, número 5, título ou rótulo 5 |
| `inicio/27-inicio-versao-nova-folha-mais-avisos` Folha "Avisos" aberta por "Mais 1 aviso" | folha | ana | 94 | 94 | 0 | 1 | ação 75, instrução 15, título ou rótulo 3, justificativa 1 |
| `inicio/28-inicio-programa-atualizado` Início, depois de "Atualizar" | aviso | ana | 113 | 110 | 0 | 0 | ação 88, estado 15, número 5, título ou rótulo 5 |
| `inicio/29-inicio-programa-mantido` Início, depois de "Manter" nos ajustes possíveis | aviso | ana | 99 | 99 | 0 | 0 | ação 87, número 5, título ou rótulo 5, estado 2 |
| `inicio/30-sobre-o-programa-ver-ajustes` Folha "Sobre o programa", com "Ver ajustes possíveis" no fim | folha | ana | 107 | 93 | 1 | 3 | estado 59, ação 30, título ou rótulo 8, número 7, justificativa 3 |
| `inicio/31-inicio-programa-gerado-de-novo` Início, depois de escolher um ajuste | aviso | ana | 130 | 70 | 0 | 0 | ação 102, estado 18, número 5, título ou rótulo 5 |
| `inicio/32-inicio-com-treino-em-andamento-e-versao-nova` Início com um treino em andamento e uma mudança à espera ("O programa será atualizado depois do treino em andamento.") | aviso | ana | 133 | 116 | 0 | 0 | ação 100, estado 23, número 5, título ou rótulo 5 |
| `inicio/33-inicio-semana-completa` Início com a semana completa e o lembrete de cópia | tela | ana | 131 | 100 | 0 | 1 | ação 94, privacidade 23, número 5, título ou rótulo 5, justificativa 4 |
| `inicio/34-inicio-ana-na-3a-semana` Início da Ana na 3ª semana (passada a fase de aprendizado), com 5 treinos no histórico | tela | ana | 133 | 97 | 0 | 1 | ação 96, privacidade 23, número 5, título ou rótulo 5, justificativa 4 |
| `inicio/35-folha-do-exercicio-com-drop-set` Folha de um exercício em bi-set e com a última série em drop set (o último do dia A) | folha | ana | 111 | 98 | 0 | 1 | ação 44, instrução 19, número 16, segurança 16, título ou rótulo 15, justificativa 1 |
| `inicio/36-inicio-ana-saude` Início da Ana com dor no ombro (7), no joelho (4) e no punho (1): o aviso "Pela triagem" | tela | ana + saúde | 97 | 102 | 0 | 0 | ação 73, segurança 14, número 5, título ou rótulo 5 |
| `inicio/37-inicio-ana-saude-aba-corpo-todo-b` Início, aba "Corpo todo B" (a Ana com dor) | tela | ana + saúde | 98 | 103 | 0 | 0 | ação 74, segurança 14, número 5, título ou rótulo 5 |
| `inicio/38-inicio-ana-saude-aba-corpo-todo-c` Início, aba "Corpo todo C" (a Ana com dor) | tela | ana + saúde | 108 | 105 | 0 | 0 | ação 84, segurança 14, número 5, título ou rótulo 5 |
| `inicio/39-folha-avisos-ana-saude` Folha "Avisos": "Pela triagem" e os outros avisos | folha | ana + saúde | 131 | 121 | 0 | 2 | ação 59, segurança 47, instrução 15, título ou rótulo 8, justificativa 2 |
| `inicio/40-sobre-o-programa-ana-saude` Folha "Sobre o programa" como abre (a Ana com dor) | folha | ana + saúde | 103 | 91 | 1 | 3 | estado 58, ação 27, título ou rótulo 8, número 7, justificativa 3 |
| `inicio/41-sobre-o-programa-ana-saude-tudo-aberto` Folha "Sobre o programa", com os 5 blocos abertos (a Ana com dor) | bloco aberto | ana + saúde | 946 | 212 | 18 | 31 | estado 325, segurança 316, justificativa 193, número 29, ação 27, título ou rótulo 26, privacidade 24, definição 6 |
| `inicio/42-folha-do-exercicio-ana-saude` Folha do 1º exercício da Ana com dor, com os motivos abertos | bloco aberto | ana + saúde | 228 | 149 | 2 | 7 | justificativa 95, ação 49, segurança 43, título ou rótulo 17, privacidade 14, número 10 |
| `inicio/43-programa-pausado-pela-triagem` "Programa pausado" (a triagem refeita tem um "sim" sem liberação) | aviso | ana + saúde | 32 | 32 | 1 | 1 | segurança 24, ação 5, título ou rótulo 2, justificativa 1 |
| `inicio/44-programa-pausado-folha-selo` Folha "De onde vem isto" (o selo do programa pausado) | folha | ana + saúde | 237 | 141 | 5 | 0 | justificativa 164, segurança 53, ação 16, título ou rótulo 4 |
| `inicio/45-programa-pausado-sem-exercicio` "Programa pausado" (dor acima de 5 em todas as regiões: nenhum exercício possível) | aviso | ana + saúde | 74 | 74 | 1 | 1 | segurança 66, ação 5, título ou rótulo 2, justificativa 1 |
| `inicio/46-folha-avisos-dor-sem-nota` Folha "Avisos": "Pela triagem" com uma região sem a nota de hoje | folha | ana + saúde | 112 | 112 | 0 | 2 | ação 60, instrução 24, segurança 18, título ou rótulo 8, justificativa 2 |
| `inicio/47-inicio-com-2-locais-e-versao-nova` Início da Ana com 2 locais, depois de trocar o local principal ("Onde vou treinar hoje?" e a versão nova) | aviso | ana | 215 | 156 | 0 | 1 | estado 92, ação 89, privacidade 19, título ou rótulo 9, número 5, justificativa 1 |
| `inicio/48-sobre-o-programa-conferindo` Folha "Sobre o programa" enquanto o avaliador chega ("Conferindo o programa…") | carregando | ana | 60 | 60 | 0 | 1 | estado 28, ação 21, número 7, título ou rótulo 3, justificativa 1 |
| `inicio/49-inicio-diego` Início, antes do 1º treino (o Diego: iniciante em casa, com elásticos e barra fixa) | tela | diego | 94 | 94 | 0 | 0 | ação 75, estado 9, número 5, título ou rótulo 5 |
| `inicio/50-inicio-diego-aba-corpo-todo-b` Início, aba "Corpo todo B" (o Diego) | tela | diego | 94 | 99 | 0 | 0 | ação 75, estado 9, número 5, título ou rótulo 5 |
| `inicio/51-inicio-diego-aba-corpo-todo-c` Início, aba "Corpo todo C" (o Diego) | tela | diego | 99 | 99 | 0 | 0 | ação 80, estado 9, número 5, título ou rótulo 5 |
| `inicio/52-folha-avisos-diego` Folha "Avisos" (o Diego) | folha | diego | 78 | 78 | 0 | 1 | ação 59, instrução 15, título ou rótulo 3, justificativa 1 |
| `inicio/53-sobre-o-programa-diego` Folha "Sobre o programa" como abre (o Diego) | folha | diego | 93 | 88 | 1 | 2 | estado 49, ação 27, título ou rótulo 8, número 7, justificativa 2 |
| `inicio/54-sobre-o-programa-diego-tudo-aberto` Folha "Sobre o programa", com os 5 blocos abertos (o Diego) | bloco aberto | diego | 596 | 212 | 8 | 22 | estado 300, justificativa 184, número 29, ação 27, título ou rótulo 26, privacidade 24, definição 6 |
| `inicio/55-folha-do-exercicio-diego` Folha do 1º exercício (o Diego), com os motivos abertos | bloco aberto | diego | 124 | 106 | 1 | 5 | justificativa 74, ação 20, privacidade 14, título ou rótulo 8, número 8 |
| `inicio/56-inicio-elisa` Início, antes do 1º treino (a Elisa: iniciante, sem equipamento nenhum) | tela | elisa | 87 | 95 | 0 | 0 | ação 68, estado 9, número 5, título ou rótulo 5 |
| `inicio/57-inicio-elisa-aba-corpo-todo-b` Início, aba "Corpo todo B" (a Elisa) | tela | elisa | 86 | 94 | 0 | 0 | ação 67, estado 9, número 5, título ou rótulo 5 |
| `inicio/58-inicio-elisa-aba-corpo-todo-c` Início, aba "Corpo todo C" (a Elisa) | tela | elisa | 81 | 89 | 0 | 0 | ação 62, estado 9, número 5, título ou rótulo 5 |
| `inicio/59-folha-avisos-elisa` Folha "Avisos" (a Elisa) | folha | elisa | 67 | 67 | 0 | 1 | ação 48, instrução 15, título ou rótulo 3, justificativa 1 |
| `inicio/60-sobre-o-programa-elisa` Folha "Sobre o programa" como abre (a Elisa) | folha | elisa | 93 | 88 | 1 | 2 | estado 49, ação 27, título ou rótulo 8, número 7, justificativa 2 |
| `inicio/61-sobre-o-programa-elisa-tudo-aberto` Folha "Sobre o programa", com os 5 blocos abertos (a Elisa) | bloco aberto | elisa | 632 | 203 | 11 | 24 | estado 350, justificativa 170, número 29, ação 27, título ou rótulo 26, privacidade 24, definição 6 |
| `inicio/62-folha-do-exercicio-elisa` Folha do 1º exercício (a Elisa), com os motivos abertos | bloco aberto | elisa | 131 | 129 | 1 | 6 | justificativa 91, privacidade 14, ação 12, número 8, título ou rótulo 6 |
| `inicio/63-inicio-fabio` Início, antes do 1º treino (o Fábio: intermediário, só com uma barra fixa) | tela | fabio | 98 | 97 | 0 | 0 | ação 80, estado 9, número 5, título ou rótulo 4 |
| `inicio/64-inicio-fabio-aba-inferior-a` Início, aba "Inferior A" (o Fábio) | tela | fabio | 110 | 101 | 0 | 0 | ação 92, estado 9, número 5, título ou rótulo 4 |
| `inicio/65-inicio-fabio-aba-superior-b` Início, aba "Superior B" (o Fábio) | tela | fabio | 98 | 97 | 0 | 0 | ação 80, estado 9, número 5, título ou rótulo 4 |
| `inicio/66-inicio-fabio-aba-inferior-b` Início, aba "Inferior B" (o Fábio) | tela | fabio | 106 | 100 | 0 | 0 | ação 88, estado 9, número 5, título ou rótulo 4 |
| `inicio/67-folha-avisos-fabio` Folha "Avisos" (o Fábio) | folha | fabio | 30 | 30 | 0 | 1 | instrução 15, ação 11, título ou rótulo 3, justificativa 1 |
| `inicio/68-sobre-o-programa-fabio` Folha "Sobre o programa" como abre (o Fábio) | folha | fabio | 67 | 67 | 1 | 1 | estado 28, ação 23, título ou rótulo 8, número 7, justificativa 1 |
| `inicio/69-sobre-o-programa-fabio-tudo-aberto` Folha "Sobre o programa", com os 4 blocos abertos (o Fábio) | bloco aberto | fabio | 502 | 225 | 7 | 18 | justificativa 206, estado 188, número 29, título ou rótulo 26, privacidade 24, ação 23, definição 6 |
| `inicio/70-folha-do-exercicio-fabio` Folha do 1º exercício (o Fábio), com os motivos abertos | bloco aberto | fabio | 142 | 91 | 1 | 6 | justificativa 65, ação 26, segurança 16, privacidade 14, título ou rótulo 13, número 8 |
| `inicio/71-inicio-bruno` Início, antes do 1º treino (o Bruno: intermediário voltando de 12 semanas parado, com 2 locais) | tela | bruno | 135 | 97 | 0 | 0 | ação 122, título ou rótulo 8, número 5 |
| `inicio/72-inicio-bruno-aba-inferior-a` Início, aba "Inferior A" (o Bruno) | tela | bruno | 111 | 96 | 0 | 0 | ação 98, título ou rótulo 8, número 5 |
| `inicio/73-inicio-bruno-aba-superior-b` Início, aba "Superior B" (o Bruno) | tela | bruno | 142 | 93 | 0 | 0 | ação 129, título ou rótulo 8, número 5 |
| `inicio/74-inicio-bruno-aba-inferior-b` Início, aba "Inferior B" (o Bruno) | tela | bruno | 127 | 93 | 0 | 0 | ação 114, título ou rótulo 8, número 5 |
| `inicio/75-sobre-o-programa-bruno` Folha "Sobre o programa" como abre (o Bruno) | folha | bruno | 75 | 75 | 1 | 2 | estado 37, ação 21, título ou rótulo 8, número 7, justificativa 2 |
| `inicio/76-sobre-o-programa-bruno-tudo-aberto` Folha "Sobre o programa", com os 4 blocos abertos (o Bruno) | bloco aberto | bruno | 381 | 204 | 4 | 17 | justificativa 171, estado 104, número 29, título ou rótulo 26, privacidade 24, ação 21, definição 6 |
| `inicio/77-folha-do-exercicio-bruno` Folha do 1º exercício (o Bruno), com os motivos abertos | bloco aberto | bruno | 140 | 104 | 1 | 5 | justificativa 75, ação 24, título ou rótulo 19, privacidade 14, número 8 |
| `inicio/78-inicio-bruno-na-academia-do-bairro-superior-a` Início do Bruno, "Superior A" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 237 | 158 | 0 | 1 | ação 120, estado 84, privacidade 19, título ou rótulo 8, número 5, justificativa 1 |
| `inicio/79-inicio-bruno-na-academia-do-bairro-inferior-a` Início do Bruno, "Inferior A" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 199 | 153 | 0 | 1 | ação 91, estado 75, privacidade 19, título ou rótulo 8, número 5, justificativa 1 |
| `inicio/80-inicio-bruno-na-academia-do-bairro-superior-b` Início do Bruno, "Superior B" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 272 | 189 | 0 | 1 | ação 122, estado 117, privacidade 19, título ou rótulo 8, número 5, justificativa 1 |
| `inicio/81-inicio-bruno-na-academia-do-bairro-inferior-b` Início do Bruno, "Inferior B" no 2º local (Academia do bairro): o que muda no treino | tela | bruno | 216 | 152 | 0 | 1 | ação 109, estado 74, privacidade 19, título ou rótulo 8, número 5, justificativa 1 |
| `inicio/82-inicio-bruno-folha-selo-do-local` Folha "De onde vem isto" (o selo da troca de local) | folha | bruno | 75 | 75 | 1 | 0 | justificativa 70, título ou rótulo 4, ação 1 |
| `inicio/83-inicio-carla` Início, antes do 1º treino (a Carla: avançada, academia completa) | tela | carla | 121 | 97 | 0 | 0 | ação 113, número 5, título ou rótulo 3 |
| `inicio/84-inicio-carla-aba-inferior` Início, aba "Inferior" (a Carla) | tela | carla | 105 | 96 | 0 | 0 | ação 97, número 5, título ou rótulo 3 |
| `inicio/85-inicio-carla-aba-empurrar` Início, aba "Empurrar" (a Carla) | tela | carla | 104 | 98 | 0 | 0 | ação 96, número 5, título ou rótulo 3 |
| `inicio/86-inicio-carla-aba-puxar` Início, aba "Puxar" (a Carla) | tela | carla | 88 | 90 | 0 | 0 | ação 80, número 5, título ou rótulo 3 |
| `inicio/87-inicio-carla-aba-pernas` Início, aba "Pernas" (a Carla) | tela | carla | 106 | 97 | 0 | 0 | ação 98, número 5, título ou rótulo 3 |
| `inicio/88-sobre-o-programa-carla` Folha "Sobre o programa" como abre (a Carla) | folha | carla | 39 | 39 | 0 | 1 | ação 13, estado 10, título ou rótulo 8, número 7, justificativa 1 |
| `inicio/89-sobre-o-programa-carla-tudo-aberto` Folha "Sobre o programa", com os 2 blocos abertos (a Carla) | bloco aberto | carla | 310 | 205 | 3 | 13 | justificativa 202, número 29, título ou rótulo 26, privacidade 24, ação 13, estado 10, definição 6 |
| `inicio/90-folha-do-exercicio-carla` Folha do 1º exercício (a Carla), com os motivos abertos | bloco aberto | carla | 166 | 115 | 1 | 6 | justificativa 71, ação 36, título ou rótulo 21, segurança 16, privacidade 14, número 8 |

## treino

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `treino/01-serie-vazia` Treino: 1ª série do 1º exercício, vazia (1ª vez no exercício) | estado vazio | ana | 67 | 85 | 0 | 1 | título ou rótulo 17, ação 15, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/02-serie-vazia-guia-erros` Treino: a série com o guia no modo "Erros" | tela | ana | 70 | 88 | 0 | 1 | ação 18, título ou rótulo 17, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/03-serie-vazia-guia-musculos` Treino: a série com o guia no modo "Músculos" | tela | ana | 70 | 88 | 0 | 1 | ação 18, título ou rótulo 17, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/04-serie-vazia-guia-trajetoria` Treino: a série com o guia no modo "Trajetória" | tela | ana | 69 | 87 | 0 | 1 | ação 17, título ou rótulo 17, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/05-serie-vazia-guia-pausado` Treino: a série com o guia pausado | tela | ana | 70 | 88 | 0 | 1 | ação 18, título ou rótulo 17, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/06-folha-por-que-da-1a-vez` Folha "Por quê" de "1ª vez: comece leve." (a calibração da carga) | folha | ana | 295 | 117 | 7 | 0 | justificativa 251, segurança 29, ação 13, título ou rótulo 2 |
| `treino/07-folha-selo-do-aquecimento` Folha "De onde vem isto" (o selo do aquecimento) | folha | ana | 147 | 141 | 4 | 0 | justificativa 133, ação 10, título ou rótulo 4 |
| `treino/08-folha-por-que-da-reserva` Folha "Por quê" de "Quantas ainda conseguiria?" (o RIR) | folha | ana | 202 | 128 | 5 | 0 | justificativa 187, ação 13, título ou rótulo 2 |
| `treino/09-serie-falta-a-carga` Treino: série com a reserva e sem a carga ("Falta escolher a carga.") | erro | ana | 66 | 84 | 0 | 1 | ação 18, título ou rótulo 17, instrução 12, número 7, opção 6, estado 5, justificativa 1 |
| `treino/10-serie-falta-a-reserva` Treino: série com a carga e sem a reserva ("Falta dizer quantas ainda conseguiria.") | erro | ana | 67 | 85 | 0 | 1 | ação 18, título ou rótulo 17, instrução 12, número 8, opção 6, estado 5, justificativa 1 |
| `treino/11-serie-preenchida` Treino: 1ª série preenchida | tela | ana | 62 | 80 | 0 | 1 | ação 18, título ou rótulo 17, instrução 12, número 8, opção 6, justificativa 1 |
| `treino/12-descanso` Treino: descanso depois da 1ª série (com "Série 1 salva · Desfazer") | tela | ana | 51 | 56 | 0 | 0 | número 28, ação 12, título ou rótulo 8, estado 3 |
| `treino/13-folha-senti-algo` Folha "O que você sentiu?" | folha | ana | 73 | 65 | 0 | 1 | segurança 48, título ou rótulo 12, ação 12, justificativa 1 |
| `treino/14-folha-senti-algo-folha-selo` Folha "De onde vem isto" (o selo de "O app não diagnostica.") | folha | ana | 97 | 99 | 2 | 0 | justificativa 49, segurança 37, ação 7, título ou rótulo 4 |
| `treino/15-folha-mais-opcoes` Folha "Mais opções" (com uma série feita) | folha | ana | 15 | 17 | 0 | 0 | ação 13, título ou rótulo 2 |
| `treino/16-descanso-sem-o-desfazer` Treino: descanso, passados os 5 s do "Desfazer" | tela | ana | 51 | 56 | 0 | 0 | número 28, ação 12, título ou rótulo 8, estado 3 |
| `treino/17-serie-com-descanso` Treino: 2ª série com o descanso numa faixa (e a mensagem da calibração) | tela | ana | 64 | 82 | 0 | 1 | número 21, título ou rótulo 17, ação 11, estado 8, opção 6, justificativa 1 |
| `treino/18-folha-por-que-na-2a-serie` Folha "Por quê" (o 1º "por quê?" da tela na 2ª série: a reserva) | folha | ana | 202 | 128 | 5 | 0 | justificativa 187, ação 13, título ou rótulo 2 |
| `treino/19-folha-trocar-exercicio` Folha "Trocar só neste treino por:" | folha | ana | 45 | 47 | 0 | 0 | ação 40, título ou rótulo 5 |
| `treino/20-folha-trocar-exercicio-ver-mais` Folha "Trocar só neste treino por:", com "Ver mais opções" aberto | bloco aberto | ana | 56 | 58 | 0 | 0 | ação 51, título ou rótulo 5 |
| `treino/21-exercicio-2` Treino: 2º exercício do dia A, 1ª série vazia (Ponte de glúteo com halter) | estado vazio | ana | 59 | 75 | 0 | 0 | ação 17, título ou rótulo 16, estado 9, número 7, opção 6, instrução 4 |
| `treino/22-hora-da-proxima-serie` Treino: fim do descanso, com a tela invertida ("Hora da próxima série") | aviso | ana | 31 | 38 | 0 | 0 | número 8, estado 8, título ou rótulo 8, ação 7 |
| `treino/23-exercicio-3` Treino: 3º exercício do dia A, 1ª série vazia (Supino reto com halteres) | estado vazio | ana | 68 | 84 | 0 | 1 | ação 18, título ou rótulo 15, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/24-exercicio-4` Treino: 4º exercício do dia A, 1ª série vazia (Remada unilateral com halter apoiada no banco) | estado vazio | ana | 64 | 82 | 0 | 0 | título ou rótulo 20, ação 18, estado 9, número 7, opção 6, instrução 4 |
| `treino/25-exercicio-5` Treino: 5º exercício do dia A, 1ª série vazia (Flexão de joelho deslizando os pés no chão) | estado vazio | ana | 60 | 76 | 0 | 0 | título ou rótulo 21, ação 18, número 6, opção 6, estado 5, instrução 4 |
| `treino/26-exercicio-6` Treino: 6º exercício do dia A, 1ª série vazia (Tríceps francês sentado com halter) | estado vazio | ana | 60 | 76 | 0 | 0 | ação 18, título ou rótulo 16, estado 9, número 7, opção 6, instrução 4 |
| `treino/27-folha-terminar-com-serie` Folha "Terminar o treino agora?" (com série registrada) | folha | ana | 23 | 25 | 0 | 0 | estado 13, ação 6, título ou rótulo 4 |
| `treino/28-aviso-dor-0` Treino: depois da nota de dor 0 ("Pode seguir.") | aviso | ana | 68 | 86 | 0 | 2 | título ou rótulo 17, ação 13, instrução 12, estado 11, número 7, opção 6, justificativa 2 |
| `treino/29-aviso-dor-2-antes-da-serie` Treino: nota de dor 2 antes da 1ª série | aviso | ana | 75 | 93 | 0 | 2 | estado 20, título ou rótulo 17, instrução 12, ação 11, número 7, opção 6, justificativa 2 |
| `treino/30-aviso-dor-4-antes-da-serie` Treino: nota de dor 4 antes da 1ª série | aviso | ana | 91 | 109 | 1 | 2 | segurança 27, título ou rótulo 17, instrução 12, ação 11, estado 9, número 7, opção 6, justificativa 2 |
| `treino/31-aviso-dor-folha-selo` Folha "De onde vem isto" (o selo da escala de dor) | folha | ana | 185 | 174 | 3 | 0 | justificativa 111, segurança 63, ação 7, título ou rótulo 4 |
| `treino/32-aviso-dor-4-sem-carga-menor` Treino: nota de dor 4 com o halter mais leve (não há carga menor) | aviso | ana | 79 | 84 | 1 | 1 | segurança 40, número 15, ação 12, título ou rótulo 8, estado 3, justificativa 1 |
| `treino/33-serie-depois-da-calibracao` Treino: 2ª série, com a mensagem da calibração e as séries feitas (uma com dor) | tela | ana | 104 | 122 | 1 | 2 | segurança 40, estado 21, título ou rótulo 17, ação 10, número 8, opção 6, justificativa 2 |
| `treino/34-folha-selo-da-calibracao` Folha "De onde vem isto" (o selo da calibração) | folha | ana | 268 | 127 | 6 | 0 | justificativa 251, ação 13, título ou rótulo 4 |
| `treino/35-aviso-dor-4` Treino: nota de dor 4 depois de uma série ("Reduza a carga…") | aviso | ana | 95 | 100 | 1 | 1 | segurança 56, número 15, ação 12, título ou rótulo 8, estado 3, justificativa 1 |
| `treino/36-descanso-entre-exercicios` Treino: descanso depois da última série do exercício ("A seguir · exercício 2 de 6") | tela | ana | 100 | 105 | 1 | 1 | segurança 56, número 17, título ou rótulo 13, ação 10, estado 3, justificativa 1 |
| `treino/37-exercicio-completo` Treino: exercício com as séries completas | tela | ana | 103 | 113 | 1 | 1 | segurança 56, número 16, ação 11, instrução 10, estado 5, título ou rótulo 4, justificativa 1 |
| `treino/38-exercicio-trocado` Treino: exercício trocado pela alternativa ("No lugar de …, só neste treino.") | estado vazio | ana | 65 | 81 | 0 | 0 | estado 17, ação 16, título ou rótulo 16, número 6, opção 6, instrução 4 |
| `treino/39-folha-trocar-exercicio-com-preferencia` Folha "Trocar só neste treino por:", com um "Prefiro…" marcado | folha | ana | 31 | 33 | 0 | 0 | ação 26, título ou rótulo 5 |
| `treino/40-folha-trocar-depois-da-dor` Folha de troca aberta pela nota de dor 7, com a orientação | aviso | ana | 53 | 55 | 0 | 1 | ação 26, segurança 21, título ou rótulo 5, justificativa 1 |
| `treino/41-exercicio-encerrado-pela-dor` Treino: exercício encerrado pela dor (a orientação e "Exercício encerrado.") | aviso | ana | 73 | 81 | 0 | 1 | estado 25, segurança 21, ação 11, instrução 9, número 3, título ou rótulo 3, justificativa 1 |
| `treino/42-folha-trocar-depois-do-sinal` Folha de troca aberta por "Formigamento ou dormência", com a orientação | aviso | ana | 36 | 38 | 0 | 1 | ação 16, segurança 14, título ou rótulo 5, justificativa 1 |
| `treino/43-folha-trocar-depois-do-sinal-folha-selo` Folha "De onde vem isto" (o selo do sinal de alerta do exercício) | folha | ana | 151 | 151 | 4 | 0 | justificativa 79, segurança 61, ação 7, título ou rótulo 4 |
| `treino/44-ultimo-exercicio-completo` Treino: último exercício com as séries completas ("Terminar treino") | tela | ana | 61 | 69 | 0 | 0 | número 29, ação 12, instrução 10, estado 5, título ou rótulo 5 |
| `treino/45-folha-terminar-com-exercicios-por-fazer` Folha "Terminar o treino agora?" (com exercícios feitos e por fazer) | folha | ana | 23 | 25 | 0 | 0 | estado 13, ação 6, título ou rótulo 4 |
| `treino/46-serie-com-sugestao-do-dia` Treino: 1ª série de um exercício já feito, com a sugestão do dia ("Hoje: …") | tela | ana | 65 | 83 | 0 | 1 | ação 17, título ou rótulo 17, instrução 11, número 8, opção 6, estado 5, justificativa 1 |
| `treino/47-folha-por-que-da-sugestao-do-dia` Folha "Por quê" da sugestão do dia | folha | ana | 60 | 62 | 1 | 0 | justificativa 54, ação 4, título ou rótulo 2 |
| `treino/48-exercicio-com-drop-set` Treino: exercício com a última série em drop set (Tríceps francês sentado com halter) | tela | ana | 66 | 79 | 0 | 1 | ação 18, número 17, título ou rótulo 16, opção 6, estado 5, instrução 3, justificativa 1 |
| `treino/49-serie-com-drop-set` Treino: a última série, com "Drop set (opcional)" e as 2 quedas | tela | ana | 107 | 103 | 0 | 2 | número 34, instrução 24, título ou rótulo 23, ação 13, opção 6, estado 5, justificativa 2 |
| `treino/50-serie-com-drop-set-folha-selo` Folha "De onde vem isto" (o selo do drop set) | folha | ana | 201 | 137 | 5 | 0 | justificativa 184, ação 13, título ou rótulo 4 |
| `treino/51-folha-terminar-sem-serie` Folha "Terminar o treino agora?" (sem nenhuma série) | folha | ana | 32 | 34 | 0 | 1 | estado 18, ação 9, título ou rótulo 4, justificativa 1 |
| `treino/52-folha-mais-opcoes-sem-serie` Folha "Mais opções" (no 1º exercício, sem série feita) | folha | ana | 11 | 13 | 0 | 0 | ação 9, título ou rótulo 2 |
| `treino/53-exercicio-sem-animacao` Treino: exercício sem animação, com o cartão de texto fechado (Crucifixo invertido sentado, com o peito nas coxas, com halteres) | estado vazio | ana | 63 | 79 | 0 | 0 | título ou rótulo 21, ação 16, estado 9, número 7, opção 6, instrução 4 |
| `treino/54-exercicio-sem-animacao-folha-como-fazer` Treino: folha "Como fazer (em texto)" como abre | folha | ana | 78 | 80 | 0 | 0 | instrução 63, ação 8, título ou rótulo 7 |
| `treino/55-exercicio-sem-animacao-folha-como-fazer-passo-a-passo` Treino: folha "Como fazer (em texto)", com o passo a passo aberto | bloco aberto | ana | 204 | 111 | 1 | 0 | instrução 185, título ou rótulo 11, ação 8 |
| `treino/56-treino-na-volta` Treino na volta da pausa: a carga 10% menor já preenchida ("Hoje: 9 kg") | tela | ana | 66 | 84 | 0 | 1 | ação 18, título ou rótulo 17, instrução 11, número 8, opção 6, estado 5, justificativa 1 |
| `treino/57-treino-na-volta-folha-por-que` Folha "Por quê" da sugestão do dia na volta da pausa | folha | ana | 170 | 144 | 4 | 0 | justificativa 141, segurança 17, ação 10, título ou rótulo 2 |
| `treino/58-carla-inferior-1` Treino da Carla: dia "Inferior", 1º exercício, 1ª série vazia (Agachamento livre com barra (profundo)) | estado vazio | carla | 111 | 125 | 0 | 2 | segurança 42, título ou rótulo 18, ação 16, instrução 12, estado 9, número 6, opção 6, justificativa 2 |
| `treino/59-carla-inferior-2` Treino da Carla: dia "Inferior", 2º exercício, 1ª série vazia (Stiff com halteres) | estado vazio | carla | 58 | 72 | 0 | 0 | ação 18, título ou rótulo 14, estado 9, número 7, opção 6, instrução 4 |
| `treino/60-carla-inferior-3` Treino da Carla: dia "Inferior", 3º exercício, 1ª série vazia (Flexão de joelho na cadeira flexora (sentado)) | estado vazio | carla | 59 | 73 | 0 | 0 | título ou rótulo 18, ação 16, estado 9, número 6, opção 6, instrução 4 |
| `treino/61-carla-inferior-4` Treino da Carla: dia "Inferior", 4º exercício, 1ª série vazia (Cadeira extensora) | estado vazio | carla | 54 | 68 | 0 | 0 | ação 16, título ou rótulo 13, estado 9, número 6, opção 6, instrução 4 |
| `treino/62-carla-inferior-5` Treino da Carla: dia "Inferior", 5º exercício, 1ª série vazia (Panturrilha unilateral no step) | estado vazio | carla | 61 | 77 | 0 | 0 | ação 18, título ou rótulo 17, estado 9, número 7, opção 6, instrução 4 |
| `treino/63-carla-inferior-6` Treino da Carla: dia "Inferior", 6º exercício, 1ª série vazia (Panturrilha sentada na máquina) | estado vazio | carla | 87 | 101 | 0 | 1 | título ou rótulo 19, ação 16, segurança 15, definição 11, estado 9, número 6, opção 6, instrução 4, justificativa 1 |
| `treino/64-carla-inferior-7` Treino da Carla: dia "Inferior", 7º exercício, 1ª série vazia (Adução na cadeira adutora) | estado vazio | carla | 56 | 70 | 0 | 0 | ação 16, título ou rótulo 15, estado 9, número 6, opção 6, instrução 4 |
| `treino/65-carla-inferior-8` Treino da Carla: dia "Inferior", 8º exercício, 1ª série vazia (Abdominal na polia com corda, ajoelhado) | estado vazio | carla | 60 | 74 | 0 | 0 | ação 18, título ou rótulo 17, estado 9, número 6, opção 6, instrução 4 |
| `treino/66-carla-folha-trocar-exercicio` Folha de troca da Carla (Puxada unilateral ajoelhado na polia alta): 13 alternativas | bloco aberto | carla | 118 | 54 | 0 | 0 | ação 113, título ou rótulo 5 |
| `treino/67-carla-contrapeso` Treino da Carla: barra fixa assistida no graviton (a carga é o contrapeso) | estado vazio | carla | 85 | 99 | 0 | 0 | estado 22, instrução 18, título ou rótulo 17, ação 16, número 6, opção 6 |
| `treino/68-elisa-exercicio-1` Treino da Elisa (peso do corpo): 1º exercício, 1ª série vazia (Agachamento com o peso do corpo) | estado vazio | elisa | 66 | 82 | 0 | 1 | título ou rótulo 19, ação 17, instrução 12, número 6, opção 6, estado 5, justificativa 1 |
| `treino/69-elisa-folha-trocar-sem-alternativa` Folha de troca sem alternativa ("Este exercício não tem alternativa com o seu equipamento.") | estado vazio | elisa | 15 | 17 | 0 | 0 | estado 9, título ou rótulo 5, ação 1 |
| `treino/70-elisa-exercicio-2` Treino da Elisa (peso do corpo): 2º exercício, 1ª série vazia (Flexão de braço) | estado vazio | elisa | 64 | 80 | 0 | 1 | ação 18, título ou rótulo 16, instrução 12, número 6, opção 6, estado 5, justificativa 1 |
| `treino/71-elisa-exercicio-3` Treino da Elisa (peso do corpo): 3º exercício, 1ª série vazia (Flexão de joelho deslizando os pés no chão) | estado vazio | elisa | 60 | 76 | 0 | 0 | título ou rótulo 21, ação 18, número 6, opção 6, estado 5, instrução 4 |
| `treino/72-elisa-exercicio-4` Treino da Elisa (peso do corpo): 4º exercício, 1ª série vazia (Extensão de tríceps com o peso do corpo) | estado vazio | elisa | 60 | 76 | 0 | 0 | título ou rótulo 21, ação 18, número 6, opção 6, estado 5, instrução 4 |
| `treino/73-diego-exercicio-1` Treino do Diego (elásticos e barra fixa): 1º exercício, 1ª série vazia (Flexão de braço) | estado vazio | diego | 63 | 79 | 0 | 1 | ação 17, título ou rótulo 16, instrução 12, número 6, opção 6, estado 5, justificativa 1 |
| `treino/74-diego-exercicio-2` Treino do Diego (elásticos e barra fixa): 2º exercício, 1ª série vazia (Barra fixa só na descida (negativa)) | estado vazio | diego | 89 | 105 | 1 | 1 | segurança 30, título ou rótulo 21, ação 16, número 6, opção 6, estado 5, instrução 4, justificativa 1 |
| `treino/75-diego-exercicio-3` Treino do Diego (elásticos e barra fixa): 3º exercício, 1ª série vazia (Agachamento com elástico) | estado vazio | diego | 64 | 80 | 0 | 1 | ação 18, título ou rótulo 16, instrução 12, número 6, opção 6, estado 5, justificativa 1 |
| `treino/76-fabio-exercicio-1` Treino do Fábio (barra fixa): 1º exercício, 1ª série vazia (Barra fixa) | estado vazio | fabio | 63 | 78 | 0 | 1 | título ou rótulo 17, ação 16, instrução 12, número 6, opção 6, estado 5, justificativa 1 |
| `treino/77-fabio-exercicio-2` Treino do Fábio (barra fixa): 2º exercício, 1ª série vazia (Barra fixa só na descida (negativa)) | estado vazio | fabio | 91 | 106 | 1 | 1 | segurança 30, título ou rótulo 23, ação 16, número 6, opção 6, estado 5, instrução 4, justificativa 1 |
| `treino/78-fabio-exercicio-3` Treino do Fábio (barra fixa): 3º exercício, 1ª série vazia (Flexão de braço) | estado vazio | fabio | 57 | 72 | 0 | 0 | ação 18, título ou rótulo 18, número 6, opção 6, estado 5, instrução 4 |
| `treino/79-bruno-volta-da-pausa-exercicio-1` Treino do Bruno (voltando de pausa): 1º exercício (Supino reto com halteres) | estado vazio | bruno | 65 | 80 | 0 | 1 | ação 15, título ou rótulo 15, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `treino/80-bruno-troca-do-local-2` Treino do Bruno no 2º local: 2º exercício, trocado pelo local, com o motivo (Barra fixa) | estado vazio | bruno | 71 | 86 | 0 | 1 | estado 20, ação 17, título ou rótulo 17, número 6, opção 6, instrução 4, justificativa 1 |

## guia

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `guia/01-tecnica` Guia aberto pelo treino: agachamento búlgaro, modo Técnica | tela | ana | 295 | 59 | 2 | 0 | instrução 117, segurança 87, ação 37, opção 28, título ou rótulo 14, número 12 |
| `guia/02-tecnica-vista-frontal` Guia: modo Técnica, vista "Frontal" | tela | ana | 295 | 59 | 2 | 0 | instrução 117, segurança 87, ação 37, opção 28, título ou rótulo 14, número 12 |
| `guia/03-tecnica-pausado-e-lento` Guia: modo Técnica, pausado e com "Lento" ligado | tela | ana | 295 | 59 | 2 | 0 | instrução 117, segurança 87, ação 37, opção 28, título ou rótulo 14, número 12 |
| `guia/04-erros` Guia: agachamento búlgaro, modo Erros | tela | ana | 323 | 52 | 2 | 0 | instrução 132, segurança 87, ação 50, opção 28, título ou rótulo 14, número 12 |
| `guia/05-erros-2` Guia: modo Erros, 2º erro ("Pé da frente perto do banco") | tela | ana | 329 | 58 | 2 | 0 | instrução 138, segurança 87, ação 50, opção 28, título ou rótulo 14, número 12 |
| `guia/06-erros-3` Guia: modo Erros, 3º erro ("Descer pouco") | tela | ana | 325 | 54 | 2 | 0 | instrução 134, segurança 87, ação 50, opção 28, título ou rótulo 14, número 12 |
| `guia/07-musculos` Guia: agachamento búlgaro, modo Músculos | tela | ana | 340 | 73 | 2 | 0 | instrução 141, segurança 110, ação 37, opção 28, título ou rótulo 14, número 10 |
| `guia/08-trajetoria` Guia: agachamento búlgaro, modo Trajetória | tela | ana | 326 | 59 | 2 | 0 | instrução 148, segurança 87, ação 37, opção 28, título ou rótulo 14, número 12 |
| `guia/09-bloco-montagem` Guia: só o bloco "Montagem" aberto | bloco aberto | ana | 295 | 110 | 2 | 0 | instrução 117, segurança 87, ação 37, opção 28, título ou rótulo 14, número 12 |
| `guia/10-bloco-execucao-e-tempo` Guia: só o bloco "Execução e tempo" aberto | bloco aberto | ana | 267 | 89 | 2 | 0 | instrução 91, segurança 87, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/11-bloco-amplitude` Guia: só o bloco "Amplitude" aberto | bloco aberto | ana | 253 | 81 | 2 | 0 | segurança 99, instrução 65, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/12-bloco-respiracao` Guia: só o bloco "Respiração" aberto | bloco aberto | ana | 226 | 59 | 2 | 0 | segurança 87, instrução 50, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/13-bloco-onde-sentir` Guia: só o bloco "Onde sentir" aberto | bloco aberto | ana | 255 | 82 | 2 | 0 | segurança 110, instrução 56, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/14-bloco-erros-comuns` Guia: só o bloco "Erros comuns" aberto | bloco aberto | ana | 285 | 100 | 2 | 0 | instrução 109, segurança 87, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/15-bloco-o-que-varia-de-pessoa-para-pessoa` Guia: só o bloco "O que varia de pessoa para pessoa" aberto | bloco aberto | ana | 256 | 86 | 3 | 0 | segurança 87, instrução 80, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/16-folha-por-que-da-prescricao` Folha "A prescrição de hoje" (por quê?) | folha | ana | 314 | 140 | 7 | 0 | justificativa 267, instrução 22, ação 19, título ou rótulo 6 |
| `guia/17-lista-de-conferencia` Guia: "Confira em 5 segundos", com um item marcado | tela | ana | 215 | 88 | 2 | 0 | segurança 87, instrução 39, ação 37, opção 28, número 12, título ou rótulo 12 |
| `guia/18-tecnica-com-descanso` Guia aberto durante o descanso (a faixa "Descanso" no alto) | tela | ana | 297 | 51 | 2 | 0 | instrução 117, segurança 87, ação 39, opção 28, título ou rótulo 14, número 12 |
| `guia/19-pelo-programa-tecnica` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Técnica | tela | ana | 269 | 54 | 2 | 0 | instrução 102, segurança 87, ação 36, número 17, título ou rótulo 14, opção 13 |
| `guia/20-pelo-programa-erros` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Erros | tela | ana | 302 | 51 | 2 | 0 | instrução 123, segurança 87, ação 48, número 17, título ou rótulo 14, opção 13 |
| `guia/21-pelo-programa-musculos` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Músculos | tela | ana | 306 | 64 | 2 | 0 | instrução 139, segurança 87, ação 36, número 17, título ou rótulo 14, opção 13 |
| `guia/22-pelo-programa-trajetoria` Guia de halter (a Ana, pelo programa): Supino reto com halteres, modo Trajetória | tela | ana | 301 | 59 | 2 | 0 | instrução 136, segurança 87, ação 36, número 15, título ou rótulo 14, opção 13 |
| `guia/23-pelo-programa-tudo-aberto` Guia de halter (a Ana, pelo programa): Supino reto com halteres, com os 7 blocos abertos | bloco aberto | ana | 534 | 190 | 3 | 0 | instrução 369, segurança 87, ação 36, número 15, título ou rótulo 14, opção 13 |
| `guia/24-carla-polia-tecnica` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Técnica | tela | carla | 267 | 47 | 3 | 0 | instrução 89, segurança 87, ação 36, opção 24, número 17, título ou rótulo 14 |
| `guia/25-carla-polia-erros` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Erros | tela | carla | 296 | 47 | 3 | 0 | instrução 110, segurança 87, ação 44, opção 24, número 17, título ou rótulo 14 |
| `guia/26-carla-polia-musculos` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Músculos | tela | carla | 307 | 67 | 3 | 0 | instrução 129, segurança 87, ação 36, opção 24, número 17, título ou rótulo 14 |
| `guia/27-carla-polia-trajetoria` Guia de polia (a Carla): Crucifixo na polia (crossover), modo Trajetória | tela | carla | 300 | 60 | 3 | 0 | instrução 124, segurança 87, ação 36, opção 24, número 15, título ou rótulo 14 |
| `guia/28-carla-polia-tudo-aberto` Guia de polia (a Carla): Crucifixo na polia (crossover), com os 7 blocos abertos | bloco aberto | carla | 505 | 172 | 4 | 0 | instrução 329, segurança 87, ação 36, opção 24, número 15, título ou rótulo 14 |
| `guia/29-carla-polia-remada-tecnica` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Técnica | tela | carla | 257 | 55 | 2 | 0 | segurança 91, instrução 81, ação 38, opção 19, título ou rótulo 16, número 12 |
| `guia/30-carla-polia-remada-erros` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Erros | tela | carla | 282 | 50 | 2 | 0 | segurança 102, instrução 84, ação 49, opção 19, título ou rótulo 16, número 12 |
| `guia/31-carla-polia-remada-musculos` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Músculos | tela | carla | 291 | 63 | 2 | 0 | instrução 117, segurança 91, ação 38, opção 19, título ou rótulo 16, número 10 |
| `guia/32-carla-polia-remada-trajetoria` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, modo Trajetória | tela | carla | 277 | 55 | 2 | 0 | instrução 103, segurança 91, ação 38, opção 19, título ou rótulo 16, número 10 |
| `guia/33-carla-polia-remada-tudo-aberto` Guia de polia (a Carla): Puxada unilateral ajoelhado na polia alta, com os 7 blocos abertos | bloco aberto | carla | 457 | 169 | 3 | 0 | instrução 250, segurança 124, ação 38, opção 19, título ou rótulo 16, número 10 |
| `guia/34-elisa-corpo-livre-1-tecnica` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Técnica | tela | elisa | 247 | 54 | 2 | 0 | segurança 87, instrução 72, ação 35, opção 20, número 17, título ou rótulo 16 |
| `guia/35-elisa-corpo-livre-1-erros` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Erros | tela | elisa | 281 | 51 | 2 | 0 | instrução 97, segurança 87, ação 44, opção 20, número 17, título ou rótulo 16 |
| `guia/36-elisa-corpo-livre-1-musculos` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Músculos | tela | elisa | 291 | 70 | 2 | 0 | segurança 114, instrução 89, ação 35, opção 20, número 17, título ou rótulo 16 |
| `guia/37-elisa-corpo-livre-1-trajetoria` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, modo Trajetória | tela | elisa | 278 | 57 | 2 | 0 | segurança 100, instrução 92, ação 35, opção 20, título ou rótulo 16, número 15 |
| `guia/38-elisa-corpo-livre-1-tudo-aberto` Guia de corpo livre (a Elisa): Agachamento com o peso do corpo, com os 7 blocos abertos | bloco aberto | elisa | 562 | 220 | 7 | 0 | instrução 266, segurança 166, privacidade 44, ação 35, opção 20, título ou rótulo 16, número 15 |
| `guia/39-elisa-corpo-livre-2-tecnica` Guia de corpo livre (a Elisa): Flexão de braço, modo Técnica | tela | elisa | 248 | 51 | 2 | 0 | segurança 87, instrução 74, ação 36, opção 21, número 17, título ou rótulo 13 |
| `guia/40-elisa-corpo-livre-2-erros` Guia de corpo livre (a Elisa): Flexão de braço, modo Erros | tela | elisa | 272 | 47 | 2 | 0 | instrução 90, segurança 87, ação 44, opção 21, número 17, título ou rótulo 13 |
| `guia/41-elisa-corpo-livre-2-musculos` Guia de corpo livre (a Elisa): Flexão de braço, modo Músculos | tela | elisa | 291 | 66 | 2 | 0 | segurança 105, instrução 99, ação 36, opção 21, número 17, título ou rótulo 13 |
| `guia/42-elisa-corpo-livre-2-trajetoria` Guia de corpo livre (a Elisa): Flexão de braço, modo Trajetória | tela | elisa | 277 | 56 | 2 | 0 | instrução 103, segurança 87, ação 36, opção 21, número 17, título ou rótulo 13 |
| `guia/43-elisa-corpo-livre-2-tudo-aberto` Guia de corpo livre (a Elisa): Flexão de braço, com os 7 blocos abertos | bloco aberto | elisa | 434 | 165 | 3 | 0 | instrução 244, segurança 105, ação 36, opção 21, número 15, título ou rótulo 13 |
| `guia/44-catalogo` Guia sem contexto (o catálogo das animações): supino inclinado com halteres | tela | ninguém | 350 | 67 | 3 | 0 | instrução 164, segurança 87, ação 60, opção 19, título ou rótulo 14, número 6 |
| `guia/45-catalogo-novas` Guia sem contexto, grupo "Novas" (os nomes curtos de todas as animações novas) | tela | ninguém | 524 | 301 | 2 | 0 | ação 291, instrução 99, segurança 92, opção 19, título ou rótulo 17, número 6 |
| `guia/46-catalogo-nota-de-montagem-segura` Guia de um exercício com a nota "Montagem segura" abaixo do palco (búlgaro na suspensão) | tela | ninguém | 652 | 361 | 3 | 1 | ação 288, instrução 143, segurança 87, estado 72, opção 37, título ou rótulo 18, número 6, justificativa 1 |
| `guia/47-catalogo-nota-de-montagem-segura-folha-selo` Folha "De onde vem isto" (o selo da montagem segura) | folha | ninguém | 130 | 130 | 3 | 0 | segurança 74, justificativa 45, ação 7, título ou rótulo 4 |

## fim-e-semana

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `fim-e-semana/01-semana-vazia` Semana sem nenhum treino (programa novo) | estado vazio | ana | 79 | 79 | 0 | 1 | número 50, título ou rótulo 10, estado 10, ação 8, justificativa 1 |
| `fim-e-semana/02-semana-como-ler-este-quadro` Semana, com "Como ler este quadro" aberto | bloco aberto | ana | 149 | 138 | 2 | 2 | definição 69, número 50, título ou rótulo 10, estado 10, ação 8, justificativa 2 |
| `fim-e-semana/03-semana-como-ler-folha-selo` Folha "De onde vem isto" (o selo da série efetiva) | folha | ana | 74 | 74 | 1 | 0 | justificativa 66, título ou rótulo 4, ação 4 |
| `fim-e-semana/04-evolucao-vazia` Evolução de um exercício sem treino registrado | estado vazio | ana | 34 | 34 | 0 | 1 | estado 16, definição 8, ação 5, título ou rótulo 4, justificativa 1 |
| `fim-e-semana/05-fim-sem-serie` Fim do treino sem nenhuma série ("Guardar mesmo assim") | estado vazio | ana | 51 | 51 | 0 | 0 | ação 23, título ou rótulo 19, número 9 |
| `fim-e-semana/06-fim-do-treino` Fim do treino com 1 série (o 1º treino da Ana) | tela | ana | 62 | 62 | 0 | 0 | ação 25, título ou rótulo 19, número 18 |
| `fim-e-semana/07-fim-folha-o-que-conta` Folha "A sua semana" (o que conta) | folha | ana | 206 | 166 | 4 | 0 | justificativa 165, estado 24, ação 13, título ou rótulo 4 |
| `fim-e-semana/08-fim-folha-para-que-serve` Folha "Hoje foi" (para que serve) | folha | ana | 275 | 123 | 5 | 0 | justificativa 259, ação 13, título ou rótulo 3 |
| `fim-e-semana/09-fim-folha-por-que-da-proxima-vez` Folha do "por quê?" de "Para a próxima vez" (o 1º exercício) | folha | ana | 285 | 129 | 6 | 0 | justificativa 261, ação 13, número 6, título ou rótulo 5 |
| `fim-e-semana/10-fim-apagar-este-treino` Fim do treino, com a confirmação "Apagar este treino?" | aviso | ana | 79 | 71 | 0 | 1 | ação 21, estado 20, título ou rótulo 19, número 18, justificativa 1 |
| `fim-e-semana/11-semana-1-treino` Semana com 1 treino | tela | ana | 101 | 87 | 0 | 1 | número 52, estado 24, título ou rótulo 12, ação 12, justificativa 1 |
| `fim-e-semana/12-evolucao-1-treino` Evolução de um exercício com 1 treino | tela | ana | 29 | 29 | 0 | 1 | número 11, definição 8, ação 5, título ou rótulo 4, justificativa 1 |
| `fim-e-semana/13-evolucao-folha-selo` Folha "De onde vem isto" (o selo da evolução) | folha | ana | 170 | 168 | 4 | 0 | justificativa 159, ação 7, título ou rótulo 4 |
| `fim-e-semana/14-evolucao-pelo-programa` Evolução aberta pela folha do exercício (voltar: "Treino") | tela | ana | 29 | 29 | 0 | 1 | número 11, definição 8, ação 5, título ou rótulo 4, justificativa 1 |
| `fim-e-semana/15-fim-encerrado-por-seguranca` Fim do treino encerrado por um sinal de alerta ("Treino encerrado por segurança", SAMU 192) | aviso | ana | 89 | 83 | 1 | 1 | segurança 30, ação 28, título ou rótulo 21, número 9, justificativa 1 |
| `fim-e-semana/16-fim-encerrado-por-seguranca-folha-selo` Folha "De onde vem isto" (o selo do alerta cardiovascular) | folha | ana | 106 | 106 | 2 | 0 | justificativa 76, segurança 19, ação 7, título ou rótulo 4 |
| `fim-e-semana/17-semana-completa` Semana completa (3 de 3), com "O que subiu nesta semana", as últimas semanas e a evolução | tela | ana | 293 | 89 | 1 | 2 | número 119, ação 93, justificativa 38, título ou rótulo 23, estado 20 |
| `fim-e-semana/18-evolucao-com-historico` Evolução de um exercício com vários treinos ("Começou com … · agora …", recorde) | tela | ana | 85 | 85 | 0 | 1 | número 67, definição 8, ação 5, título ou rótulo 4, justificativa 1 |
| `fim-e-semana/19-fim-com-recorde` Fim do treino com recorde e carga para subir ("O que mudou hoje") | tela | ana | 180 | 79 | 1 | 1 | número 62, ação 41, justificativa 37, título ou rótulo 22, estado 18 |
| `fim-e-semana/20-fim-com-recorde-folha-por-que-subir` Folha do "por quê?" de um exercício com "Subir" | folha | ana | 136 | 136 | 2 | 0 | justificativa 119, número 11, título ou rótulo 5, ação 1 |
| `fim-e-semana/21-semana-2-de-3` Semana com 2 de 3 treinos e uma semana anterior sem treino | tela | ana | 174 | 76 | 0 | 1 | ação 78, número 67, título ou rótulo 15, estado 13, justificativa 1 |
| `fim-e-semana/22-semana-revisao-da-meta` Semana com a oferta "Um programa que cabe melhor?" | aviso | ana | 329 | 141 | 2 | 3 | número 112, ação 88, estado 67, justificativa 39, título ou rótulo 23 |
| `fim-e-semana/23-evolucao-por-local` Evolução de um exercício de polia com 2 locais (uma lista por local) | tela | bruno | 75 | 75 | 0 | 1 | número 30, definição 29, título ou rótulo 10, ação 5, justificativa 1 |
| `fim-e-semana/24-inicio-volta-22-dias` Início na volta de uma pausa de 22 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 145 | 109 | 0 | 1 | ação 97, privacidade 23, número 15, definição 6, título ou rótulo 3, justificativa 1 |
| `fim-e-semana/25-inicio-volta-22-dias-folha-por-que` Folha "Bem-vindo de volta!" (por quê?), pausa de 22 dias | folha | ana | 328 | 167 | 8 | 0 | justificativa 270, segurança 38, ação 16, título ou rótulo 4 |
| `fim-e-semana/26-sobre-o-programa-na-volta` Folha "Sobre o programa" na volta da pausa (a fase da semana 1) | folha | ana | 107 | 95 | 1 | 3 | estado 62, ação 27, título ou rótulo 8, número 7, justificativa 3 |
| `fim-e-semana/27-inicio-volta-15-dias` Início na volta de uma pausa de 15 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 145 | 109 | 0 | 1 | ação 97, privacidade 23, número 15, definição 6, título ou rótulo 3, justificativa 1 |
| `fim-e-semana/28-inicio-volta-15-dias-folha-por-que` Folha "Bem-vindo de volta!" (por quê?), pausa de 15 dias | folha | ana | 313 | 165 | 7 | 0 | justificativa 270, estado 23, ação 16, título ou rótulo 4 |
| `fim-e-semana/29-inicio-volta-60-dias` Início na volta de uma pausa de 60 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 145 | 109 | 0 | 1 | ação 97, privacidade 23, número 15, definição 6, título ou rótulo 3, justificativa 1 |
| `fim-e-semana/30-inicio-volta-60-dias-folha-por-que` Folha "Bem-vindo de volta!" (por quê?), pausa de 60 dias | folha | ana | 321 | 160 | 8 | 0 | justificativa 270, segurança 31, ação 16, título ou rótulo 4 |
| `fim-e-semana/31-inicio-volta-200-dias` Início na volta de uma pausa de 200 dias: o cartão "Bem-vindo de volta!" | aviso | ana | 150 | 111 | 0 | 1 | ação 102, privacidade 23, número 15, definição 6, título ou rótulo 3, justificativa 1 |
| `fim-e-semana/32-inicio-volta-200-dias-folha-por-que` Folha "Bem-vindo de volta!" (por quê?), pausa de 200 dias | folha | ana | 332 | 171 | 8 | 0 | justificativa 270, segurança 42, ação 16, título ou rótulo 4 |
| `fim-e-semana/33-inicio-volta-200-dias-agora-nao` Início na volta de 200 dias, depois de "Agora não" | aviso | ana | 155 | 108 | 0 | 1 | ação 97, privacidade 23, número 15, estado 10, definição 6, título ou rótulo 3, justificativa 1 |
| `fim-e-semana/34-inicio-oferta-de-semana-leve` Início com a oferta "Semana leve? (opcional)" na linha do aviso | aviso | ana | 123 | 88 | 0 | 1 | ação 86, privacidade 23, número 5, título ou rótulo 5, justificativa 4 |
| `fim-e-semana/35-inicio-oferta-de-semana-leve-folha-avisos` Folha "Avisos": "Semana leve? (opcional)" e os outros avisos | folha | ana | 199 | 109 | 1 | 3 | ação 83, justificativa 57, estado 30, instrução 15, título ou rótulo 14 |
| `fim-e-semana/36-semana-com-oferta-de-semana-leve` Semana com a oferta "Semana leve? (opcional)" | aviso | ana | 277 | 105 | 1 | 2 | número 114, ação 84, justificativa 38, estado 23, título ou rótulo 18 |
| `fim-e-semana/37-fim-com-oferta-de-semana-leve` Fim do treino com "pesado demais" marcado e a oferta "Semana leve? (opcional)" | aviso | ana | 175 | 77 | 1 | 1 | número 56, ação 41, justificativa 37, título ou rótulo 22, estado 19 |
| `fim-e-semana/38-fim-com-semana-leve-ativa` Fim do treino com a semana leve aceita ("Semana leve até …") | aviso | ana | 143 | 71 | 0 | 1 | número 56, ação 38, título ou rótulo 23, definição 16, estado 9, justificativa 1 |
| `fim-e-semana/39-inicio-semana-leve-ativa` Início com a semana leve ativa | aviso | ana | 124 | 89 | 0 | 1 | ação 86, privacidade 23, número 5, título ou rótulo 5, estado 4, justificativa 1 |
| `fim-e-semana/40-inicio-semana-leve-ativa-folha-avisos` Folha "Avisos": "Semana leve até …", com "Voltar ao normal" | folha | ana | 167 | 98 | 0 | 3 | ação 80, justificativa 21, estado 20, definição 16, título ou rótulo 15, instrução 15 |
| `fim-e-semana/41-sobre-o-programa-na-semana-leve` Folha "Sobre o programa" na semana leve (a fase diz "Semana leve: …") | folha | ana | 108 | 96 | 1 | 3 | estado 63, ação 27, título ou rótulo 8, número 7, justificativa 3 |
| `fim-e-semana/42-semana-na-semana-leve` Semana com a semana leve ativa (a meta é a prescrita para a semana) | aviso | ana | 205 | 82 | 0 | 2 | ação 81, número 74, título ou rótulo 19, definição 16, estado 13, justificativa 2 |
| `fim-e-semana/43-inicio-dor-que-se-repete` Início com o aviso de dor que se repete no mesmo exercício | aviso | ana | 162 | 109 | 1 | 2 | ação 86, segurança 38, privacidade 23, número 5, título ou rótulo 5, justificativa 5 |
| `fim-e-semana/44-inicio-dor-que-se-repete-folha-avisos` Folha "Avisos" com a dor que se repete como motivo da semana leve | folha | ana | 203 | 113 | 1 | 3 | ação 83, justificativa 57, estado 20, instrução 15, título ou rótulo 14, segurança 14 |
| `fim-e-semana/45-fim-com-dor` Fim do treino com dor registrada (a linha do exercício diz "Ajustar") | aviso | ana | 209 | 76 | 2 | 2 | número 56, segurança 52, ação 41, justificativa 38, título ou rótulo 22 |
| `fim-e-semana/46-fim-com-dor-folha-por-que` Folha do "por quê?" de um exercício com "Ajustar" (dor) | folha | ana | 215 | 152 | 3 | 0 | justificativa 110, segurança 82, número 11, ação 7, título ou rótulo 5 |
| `fim-e-semana/47-inicio-aviso-do-tempo` Início com o aviso "O tempo dos seus treinos" | aviso | ana | 135 | 99 | 0 | 1 | ação 96, privacidade 23, título ou rótulo 10, número 5, justificativa 1 |
| `fim-e-semana/48-inicio-aviso-do-tempo-folha-avisos` Folha "Avisos": "O tempo dos seus treinos" | folha | ana | 143 | 110 | 0 | 2 | ação 77, estado 20, justificativa 20, instrução 15, título ou rótulo 11 |
| `fim-e-semana/49-inicio-tempo-ajustado` Início depois de "Ajustar" o tempo (e a versão nova do programa que isso oferece) | aviso | ana | 146 | 99 | 0 | 1 | ação 99, privacidade 23, estado 13, número 5, título ou rótulo 5, justificativa 1 |

## dados-e-locais

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `dados-e-locais/01-meus-dados` Meus dados (a Ana) | tela | ana | 144 | 88 | 0 | 0 | ação 92, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/02-meus-dados-folha-o-que-sai-daqui` Folha "O que sai deste aparelho" | folha | ana | 65 | 65 | 1 | 1 | privacidade 62, ação 2, justificativa 1 |
| `dados-e-locais/03-meus-dados-folha-o-navegador-e-os-seus-dados` Folha "O navegador e os seus dados" (por quê?) | folha | ana | 115 | 115 | 2 | 0 | privacidade 67, justificativa 40, ação 7, título ou rótulo 1 |
| `dados-e-locais/04-meus-dados-folha-estilo-do-boneco` Folha do estilo do Boneco (os dois desenhos para escolher) | folha | ana | 6 | 6 | 0 | 0 | título ou rótulo 3, opção 2, ação 1 |
| `dados-e-locais/05-meus-dados-folha-guardar-uma-copia` Folha "Guardar uma cópia" (sem nenhuma cópia ainda) | folha | ana | 38 | 38 | 0 | 1 | privacidade 29, ação 5, título ou rótulo 3, justificativa 1 |
| `dados-e-locais/06-meus-dados-copia-exportada` Meus dados logo depois de exportar ("Arquivo exportado…", "Última cópia: hoje") | aviso | ana | 154 | 98 | 0 | 0 | ação 90, privacidade 27, segurança 19, título ou rótulo 9, estado 9 |
| `dados-e-locais/07-meus-dados-folha-guardar-uma-copia-com-copia` Folha "Guardar uma cópia" (com a cópia de hoje) | folha | ana | 38 | 38 | 0 | 1 | privacidade 29, ação 5, título ou rótulo 3, justificativa 1 |
| `dados-e-locais/08-meus-dados-folha-trazer-uma-copia` Folha "Trazer uma cópia" (sem arquivo escolhido) | folha | ana | 25 | 25 | 0 | 0 | privacidade 9, estado 7, título ou rótulo 6, ação 3 |
| `dados-e-locais/09-meus-dados-folha-trazer-uma-copia-erro` Folha "Trazer uma cópia", com um arquivo que não é do app | erro | ana | 37 | 37 | 0 | 0 | privacidade 26, título ou rótulo 6, ação 3, estado 2 |
| `dados-e-locais/10-meus-dados-folha-trazer-uma-copia-erro-de-leitura` Folha "Trazer uma cópia", com um arquivo que não é JSON | erro | ana | 37 | 37 | 0 | 0 | privacidade 26, título ou rótulo 6, ação 3, estado 2 |
| `dados-e-locais/11-meus-dados-copia-importada` Meus dados logo depois de importar ("Dados importados.") | aviso | ana | 144 | 107 | 0 | 0 | ação 90, segurança 19, privacidade 15, estado 11, título ou rótulo 9 |
| `dados-e-locais/12-meus-dados-avisar-um-problema` Meus dados, com "Avisar um problema" aberto (sem e-mail de contato no build) | bloco aberto | ana | 227 | 121 | 1 | 0 | privacidade 95, ação 93, segurança 19, estado 11, título ou rótulo 9 |
| `dados-e-locais/13-meus-dados-avisar-um-problema-copia-1` Meus dados: resposta de "Copiar as informações" (sem a permissão da área de transferência) | aviso | ana | 237 | 131 | 1 | 0 | privacidade 105, ação 93, segurança 19, estado 11, título ou rótulo 9 |
| `dados-e-locais/14-meus-dados-avisar-um-problema-copia-2` Meus dados: resposta de "Copiar as informações" (com a permissão da área de transferência) | aviso | ana | 239 | 117 | 1 | 0 | privacidade 107, ação 93, segurança 19, estado 11, título ou rótulo 9 |
| `dados-e-locais/15-meus-dados-com-a-foto-autorizada` Meus dados de quem já autorizou a foto (a linha "Foto do equipamento") | tela | ana | 148 | 86 | 0 | 0 | ação 96, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/16-meus-dados-folha-foto-do-equipamento` Folha "Foto do equipamento" (retirar a autorização) | folha | ana | 36 | 36 | 1 | 1 | privacidade 26, ação 6, título ou rótulo 3, justificativa 1 |
| `dados-e-locais/17-meus-dados-autorizacao-retirada` Meus dados logo depois de retirar a autorização da foto | aviso | ana | 146 | 99 | 0 | 0 | ação 90, segurança 19, privacidade 15, estado 13, título ou rótulo 9 |
| `dados-e-locais/18-meus-dados-folha-apagar-todos-os-dados` Folha "Apagar todos os dados?" | folha | ana | 27 | 27 | 0 | 0 | privacidade 23, ação 4 |
| `dados-e-locais/19-meus-dados-sem-dados` Meus dados de quem ainda não tem nada guardado | estado vazio | ninguém | 114 | 98 | 0 | 0 | ação 62, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/20-meus-dados-sem-dados-folha-guardar-uma-copia` Folha "Guardar uma cópia" de quem não tem nada guardado (o botão fica desligado) | estado vazio | ninguém | 38 | 38 | 0 | 1 | privacidade 29, ação 5, título ou rótulo 3, justificativa 1 |
| `dados-e-locais/21-meus-dados-com-copia-antiga` Meus dados com a última cópia de dias atrás ("Última cópia: há 16 dias") | tela | ana | 144 | 88 | 0 | 0 | ação 92, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/22-rotina-e-divisao` Rotina e divisão (a rotina aberta por Meus dados, com o objetivo e a divisão) | tela | ana | 296 | 64 | 1 | 0 | opção 180, estado 33, título ou rótulo 31, justificativa 31, ação 12, definição 6, instrução 3 |
| `dados-e-locais/23-rotina-e-divisao-folha-o-objetivo` Folha "O objetivo" (o que muda) | folha | ana | 150 | 148 | 3 | 0 | justificativa 146, título ou rótulo 3, ação 1 |
| `dados-e-locais/24-rotina-e-divisao-folha-as-divisoes` Folha "As divisões" (por quê?) | folha | ana | 282 | 124 | 6 | 0 | justificativa 265, ação 13, título ou rótulo 4 |
| `dados-e-locais/25-rotina-e-divisao-com-escolhas` Rotina e divisão, com um objetivo e uma divisão escolhidos ("Deixar o app escolher" aparece) | tela | ana | 300 | 174 | 1 | 0 | opção 180, estado 33, título ou rótulo 31, justificativa 31, ação 16, definição 6, instrução 3 |
| `dados-e-locais/26-rotina-e-divisao-2-dias` Rotina e divisão com 2 dias: as divisões oferecidas | tela | ana | 129 | 64 | 1 | 0 | opção 42, estado 33, título ou rótulo 27, ação 10, justificativa 8, definição 6, instrução 3 |
| `dados-e-locais/27-rotina-e-divisao-4-dias` Rotina e divisão com 4 dias: as divisões oferecidas | tela | ana | 294 | 171 | 1 | 0 | opção 178, estado 33, título ou rótulo 31, justificativa 31, ação 12, definição 6, instrução 3 |
| `dados-e-locais/28-rotina-e-divisao-5-dias` Rotina e divisão com 5 dias: as divisões oferecidas | tela | ana | 294 | 168 | 1 | 0 | opção 178, estado 33, título ou rótulo 31, justificativa 31, ação 12, definição 6, instrução 3 |
| `dados-e-locais/29-rotina-e-divisao-6-dias` Rotina e divisão com 6 dias: as divisões oferecidas | tela | ana | 247 | 127 | 1 | 0 | opção 131, estado 33, título ou rótulo 31, justificativa 31, ação 12, definição 6, instrução 3 |
| `dados-e-locais/30-meus-dados-com-objetivo` Meus dados com o objetivo "Ficar mais forte" | tela | ana | 143 | 87 | 0 | 0 | ação 91, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/31-objetivo` Objetivo (a mesma tela da rotina, aberta na pergunta do objetivo) | tela | ana | 296 | 177 | 1 | 0 | opção 180, estado 33, título ou rótulo 31, justificativa 31, ação 12, definição 6, instrução 3 |
| `dados-e-locais/32-algo-a-evitar` Algo a evitar | tela | ana | 43 | 43 | 0 | 0 | ação 14, título ou rótulo 13, definição 12, opção 4 |
| `dados-e-locais/33-algo-a-evitar-exercicios` Algo a evitar, com a lista de exercícios aberta | bloco aberto | ana | 308 | 79 | 0 | 0 | opção 269, ação 14, título ou rótulo 13, definição 12 |
| `dados-e-locais/34-meus-dados-com-algo-a-evitar` Meus dados com 1 exercício a evitar ("1 marcado") | tela | ana | 143 | 87 | 0 | 0 | ação 91, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/35-refazer-a-triagem` Refazer a triagem (a mesma tela da saúde, com "Meu programa" no alto) | tela | ana | 89 | 83 | 0 | 0 | segurança 62, ação 18, título ou rótulo 5, número 4 |
| `dados-e-locais/36-experiencia-com-o-programa-feito` Experiência de quem já tem programa (as respostas guardadas e "Meu programa" no alto) | tela | ana | 147 | 65 | 0 | 1 | opção 55, título ou rótulo 36, justificativa 29, descreve o que já se vê 10, definição 9, ação 4, número 4 |
| `dados-e-locais/37-equipamento-com-o-programa-feito` Equipamento de quem já tem programa (a lista já vem aberta, com os marcados) | tela | ana | 111 | 66 | 0 | 0 | ação 61, título ou rótulo 20, privacidade 17, opção 9, número 4 |
| `dados-e-locais/38-refazer-a-triagem-com-sim` Refazer a triagem (quem tinha um "sim": abre em "Quais valem", com as marcas, as regiões e as notas) | tela | ana + saúde | 334 | 112 | 1 | 1 | opção 212, segurança 94, instrução 13, título ou rótulo 6, ação 4, número 4, justificativa 1 |
| `dados-e-locais/39-refazer-a-triagem-pausa` Refazer a triagem: "Vamos pausar o programa automático" (com o programa já feito) | aviso | ana + saúde | 115 | 110 | 1 | 1 | segurança 82, opção 14, ação 5, título ou rótulo 5, número 4, estado 4, justificativa 1 |
| `dados-e-locais/40-locais` Meus locais, com 1 local (a Ana) | tela | ana | 38 | 38 | 0 | 0 | ação 16, número 10, definição 8, título ou rótulo 4 |
| `dados-e-locais/41-locais-folha-varios-locais` Folha "Vários locais" (e nos outros?) | folha | ana | 104 | 104 | 2 | 0 | justificativa 69, privacidade 31, título ou rótulo 3, ação 1 |
| `dados-e-locais/42-locais-editar` Editar local (nome e equipamento) | tela | ana | 125 | 67 | 0 | 0 | ação 63, título ou rótulo 29, privacidade 17, opção 9, instrução 7 |
| `dados-e-locais/43-locais-novo` Novo local, vazio | estado vazio | ana | 87 | 65 | 0 | 0 | ação 49, privacidade 17, título ou rótulo 14, instrução 7 |
| `dados-e-locais/44-locais-novo-erro-sem-nome` Novo local, sem nome | erro | ana | 99 | 77 | 0 | 0 | ação 49, privacidade 17, título ou rótulo 14, estado 12, instrução 7 |
| `dados-e-locais/45-locais-novo-com-nome` Novo local, com o nome "Academia" (o título do equipamento muda) | tela | ana | 87 | 65 | 0 | 0 | ação 49, privacidade 17, título ou rótulo 14, instrução 7 |
| `dados-e-locais/46-locais-2-locais` Meus locais, com 2 locais (a Ana com a "Academia") | tela | ana | 51 | 51 | 0 | 0 | ação 26, número 12, definição 8, título ou rótulo 5 |
| `dados-e-locais/47-locais-local-principal-trocado` Meus locais, depois de "Montar o programa para este local" | aviso | ana | 68 | 68 | 0 | 0 | ação 26, estado 17, número 12, definição 8, título ou rótulo 5 |
| `dados-e-locais/48-locais-bruno` Meus locais do Bruno (Prédio e Academia do bairro) | tela | bruno | 52 | 52 | 0 | 0 | ação 26, número 12, definição 8, título ou rótulo 6 |
| `dados-e-locais/49-meus-dados-bruno` Meus dados do Bruno (2 locais, 4 dias) | tela | bruno | 145 | 89 | 0 | 0 | ação 93, segurança 19, privacidade 15, título ou rótulo 9, estado 9 |
| `dados-e-locais/50-refazer-o-nivel` Experiência aberta por "Refazer o nível" (a pausa e o nível vêm sem resposta) | tela | ana | 84 | 84 | 0 | 0 | opção 41, título ou rótulo 16, justificativa 11, definição 9, número 4, ação 3 |

## termos-e-foto

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `termos-e-foto/01-termos` Termos de uso e privacidade | tela | ninguém | 792 | 155 | 13 | 3 | privacidade 670, segurança 84, título ou rótulo 29, número 5, justificativa 3, ação 1 |
| `termos-e-foto/02-termos-folha-selo-1` Folha "De onde vem isto" (o 1º selo dos termos) | folha | ninguém | 97 | 97 | 2 | 0 | justificativa 49, segurança 37, ação 7, título ou rótulo 4 |
| `termos-e-foto/03-termos-folha-selo-2` Folha "De onde vem isto" (o 2º selo dos termos) | folha | ninguém | 181 | 133 | 2 | 0 | justificativa 97, privacidade 70, ação 10, título ou rótulo 4 |
| `termos-e-foto/04-termos-folha-selo-3` Folha "De onde vem isto" (o 3º selo dos termos) | folha | ninguém | 261 | 161 | 3 | 0 | privacidade 156, justificativa 88, ação 13, título ou rótulo 4 |
| `termos-e-foto/05-foto-sem-autorizacao` Folha "Reconhecer pela foto": sem a autorização ("Falta marcar a autorização acima.") | folha | ana | 194 | 170 | 2 | 1 | privacidade 157, título ou rótulo 16, opção 14, estado 5, ação 1, justificativa 1 |
| `termos-e-foto/06-foto-autorizada` Folha da foto: com a autorização marcada | folha | ana | 189 | 170 | 2 | 1 | privacidade 157, título ou rótulo 16, opção 14, ação 1, justificativa 1 |
| `termos-e-foto/07-foto-erro-sem-codigo` Folha da foto: fotos escolhidas sem o código de convite | erro | ana | 204 | 170 | 2 | 1 | privacidade 172, título ou rótulo 16, opção 14, ação 1, justificativa 1 |
| `termos-e-foto/08-foto-erro-fotos-demais` Folha da foto: mais de 5 fotos | erro | ana | 193 | 187 | 2 | 1 | privacidade 157, título ou rótulo 16, opção 14, estado 4, ação 1, justificativa 1 |
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
| `termos-e-foto/29-foto-autorizacao-retirada` Folha da foto depois de "Retirar a autorização" (a caixa de consentimento volta) | folha | ana | 204 | 170 | 2 | 1 | privacidade 157, título ou rótulo 16, estado 15, opção 14, ação 1, justificativa 1 |

## avisos-e-erros

| Tela | O que é | Quem vê | Palavras | À vista | Blocos longos | Selos | Do que é feito (palavras por função) |
|---|---|---|---|---|---|---|---|
| `avisos-e-erros/01-instalar-no-iphone-boas-vindas` Boas-vindas no iPhone (Safari, sem instalar): o aviso "Instale o app para não perder seus dados" | aviso | ninguém | 153 | 136 | 1 | 1 | privacidade 72, ação 26, instrução 23, segurança 14, descreve o que já se vê 10, título ou rótulo 7, justificativa 1 |
| `avisos-e-erros/02-instalar-no-iphone-folha-selo` Folha "De onde vem isto" (o selo do aviso de instalar) | folha | ninguém | 88 | 88 | 1 | 0 | justificativa 80, título ou rótulo 4, ação 4 |
| `avisos-e-erros/03-instalar-no-iphone-inicio` Início no iPhone (Safari, sem instalar): o aviso de instalar depois dos exercícios | aviso | ana | 190 | 122 | 1 | 1 | ação 87, privacidade 60, instrução 23, estado 9, número 5, título ou rótulo 5, justificativa 1 |
| `avisos-e-erros/04-lembrete-de-copia` Início com o lembrete "Guarde uma cópia dos seus treinos" (nenhuma cópia ainda) | aviso | ana | 135 | 77 | 0 | 1 | ação 96, privacidade 23, título ou rótulo 10, número 5, justificativa 1 |
| `avisos-e-erros/05-lembrete-de-copia-folha-selo` Folha "De onde vem isto" (o selo do lembrete de cópia) | folha | ana | 181 | 133 | 2 | 0 | justificativa 97, privacidade 70, ação 10, título ou rótulo 4 |
| `avisos-e-erros/06-lembrete-de-copia-exportado` Início logo depois de "Exportar agora" no lembrete de cópia | aviso | ana | 119 | 76 | 0 | 0 | ação 92, privacidade 12, título ou rótulo 10, número 5 |
| `avisos-e-erros/07-lembrete-de-copia-com-treinos-novos` Início com o lembrete de cópia de quem já exportou ("Você tem treinos novos desde a última cópia.") | aviso | ana | 137 | 79 | 0 | 1 | ação 96, privacidade 25, título ou rótulo 10, número 5, justificativa 1 |
| `avisos-e-erros/08-dado-ilegivel-boas-vindas` Boas-vindas com um dado guardado que o app não leu | erro | ninguém | 84 | 84 | 0 | 0 | ação 27, privacidade 26, segurança 14, descreve o que já se vê 10, título ou rótulo 7 |
| `avisos-e-erros/09-dado-ilegivel-meus-dados` Meus dados com um dado guardado que o app não leu ("Exportar os dados que não foram lidos") | erro | ninguém | 145 | 79 | 0 | 0 | ação 69, privacidade 31, segurança 19, estado 17, título ou rótulo 9 |
| `avisos-e-erros/10-dado-ilegivel-exportado` Meus dados depois de exportar os dados que não foram lidos | aviso | ninguém | 163 | 97 | 0 | 0 | ação 69, privacidade 49, segurança 19, estado 17, título ou rótulo 9 |
| `avisos-e-erros/11-tela-de-erro` Tela de erro ("Algo deu errado nesta tela") | erro | ana | 76 | 73 | 0 | 0 | privacidade 31, título ou rótulo 14, ação 12, instrução 10, estado 9 |
| `avisos-e-erros/12-tela-de-erro-exportado-e-aviso-aberto` Tela de erro, depois de exportar e com "Avisar um problema" aberto | erro | ana | 180 | 113 | 1 | 0 | privacidade 132, ação 15, título ou rótulo 14, instrução 10, estado 9 |
| `avisos-e-erros/13-tela-de-erro-sem-dados` Tela de erro, ao exportar sem nada guardado | erro | ninguém | 82 | 70 | 0 | 0 | privacidade 37, título ou rótulo 14, ação 12, instrução 10, estado 9 |
| `avisos-e-erros/14-nao-foi-possivel-salvar-treino` Treino com o aviso "Não foi possível salvar neste aparelho." | erro | ana | 92 | 110 | 1 | 1 | privacidade 26, título ou rótulo 17, ação 14, instrução 12, estado 9, número 7, opção 6, justificativa 1 |
| `avisos-e-erros/15-nao-foi-possivel-salvar-serie` Descanso com "Série 1 anotada, mas não salva" | erro | ana | 83 | 88 | 1 | 0 | número 28, privacidade 26, ação 15, título ou rótulo 8, estado 6 |
| `avisos-e-erros/16-nao-foi-possivel-salvar-inicio` Início com o aviso "Não foi possível salvar neste aparelho." | erro | ana | 123 | 112 | 1 | 0 | ação 87, privacidade 26, número 5, título ou rótulo 5 |
| `avisos-e-erros/17-sobre-o-programa-sem-conferir` Folha "Sobre o programa" quando o avaliador não baixa | erro | ana | 72 | 72 | 0 | 1 | estado 37, ação 24, número 7, título ou rótulo 3, justificativa 1 |
| `avisos-e-erros/18-selo-carregando-a-regra` Folha "De onde vem isto" enquanto a regra chega ("Carregando a regra…") | carregando | ana | 8 | 8 | 0 | 0 | título ou rótulo 4, estado 3, ação 1 |
| `avisos-e-erros/19-selo-carregando-as-fontes` Folha "De onde vem isto" enquanto as fontes chegam ("Carregando as fontes…") | carregando | ana | 91 | 91 | 1 | 0 | justificativa 83, título ou rótulo 4, estado 3, ação 1 |
| `avisos-e-erros/20-selo-sem-as-fontes` Folha "De onde vem isto" quando as fontes não baixam | erro | ana | 104 | 104 | 1 | 0 | justificativa 83, estado 16, título ou rótulo 4, ação 1 |
| `avisos-e-erros/21-selo-sem-a-regra` Folha "De onde vem isto" quando a regra não baixa | erro | ana | 20 | 20 | 0 | 0 | estado 12, título ou rótulo 4, ação 4 |
| `avisos-e-erros/22-guia-animado-nao-carregou` Treino quando o guia animado não carrega (o registro da série continua) | erro | ana | 78 | 96 | 0 | 1 | estado 21, título ou rótulo 17, ação 14, instrução 12, número 7, opção 6, justificativa 1 |
| `avisos-e-erros/23-guia-em-texto-nao-baixou-na-folha` Folha do exercício sem animação quando o guia em texto não baixa ("Tentar de novo") | erro | ana | 96 | 96 | 0 | 1 | ação 37, título ou rótulo 20, segurança 16, estado 14, número 8, justificativa 1 |
| `avisos-e-erros/24-guia-em-texto-nao-baixou-2a-vez` Folha do exercício sem animação quando o guia em texto falha de novo ("Recarregar o app") | erro | ana | 96 | 96 | 0 | 1 | ação 37, título ou rótulo 20, segurança 16, estado 14, número 8, justificativa 1 |
| `avisos-e-erros/25-guia-em-texto-nao-baixou-no-treino` Treino num exercício sem animação quando o guia em texto não baixa | erro | ana | 72 | 88 | 0 | 0 | título ou rótulo 21, estado 20, ação 14, número 7, opção 6, instrução 4 |

## Os 60 textos que mais pesam (palavras × vezes em que aparecem)

| Palavras | Vezes | Dono | Função | Texto | Onde |
|---|---|---|---|---|---|
| 36 | 45 | tela | segurança | Pare o exercício e procure avaliação (fisioterapeuta ou médico do esporte) se aparecer dor articular forte ou em pontada, formigamento, perda de força incomum o… | guia/01-tecnica e mais 44 |
| 35 | 45 | tela | segurança | As animações usam um modelo simplificado com medidas aproximadas e não substituem uma avaliação presencial. A sensação muscular sozinha não prova que a execução… | guia/01-tecnica e mais 44 |
| 41 | 23 | conteúdo | justificativa | Projeto treino-mvp (2026). Inferência/consenso do projeto, sem fonte primária. Usada quando uma regra é escolha do projeto (por exemplo, margem de +10% no tempo… | cadastro/06-saude-folha-por-que-perguntamos e mais 22 |
| 15 | 48 | tela | justificativa | Consenso de especialistas. Prática de treinadores e posicionamentos, sem ensaio que teste este número. | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 46 |
| 16 | 45 | tela | segurança | Dor muscular de treino é esperada: queimação durante a série e dolorimento difuso por 1–3 dias. | guia/01-tecnica e mais 44 |
| 22 | 23 | tela | privacidade | Tire ou escolha até 5 fotos do lugar onde você treina. Usar a foto é opcional: a lista abaixo faz o mesmo. | cadastro/40-equipamento-folha-da-foto e mais 22 |
| 2 | 216 | tela | ação | por quê? | cadastro/28-rotina-vazia e mais 131 |
| 3 | 136 | tela | ação | abrir a fonte | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 40 |
| 67 | 6 | domínio | justificativa | Calibração da carga, série a série (R1b; pesquisa-v2/07, seção 2.3, e pesquisa-v2/09): vale na 1ª vez de um exercício, na 1ª vez de uma máquina de placa, anilha… | inicio/19-como-ler-folha-selo e mais 5 |
| 48 | 8 | jurídico | privacidade | A Anthropic diz que apaga o que recebe em até 30 dias, salvo se o envio for marcado como violação da política de uso dela (aí pode guardar até 2 anos) ou se a l… | cadastro/40-equipamento-folha-da-foto e mais 7 |
| 17 | 22 | tela | privacidade | Dá para mudar depois, em Meus dados. Sem nada marcado, o programa usa o peso do corpo. | cadastro/39-equipamento-lugar e mais 21 |
| 7 | 45 | tela | ação | O que varia de pessoa para pessoa | guia/01-tecnica e mais 44 |
| 21 | 15 | tela | ação | Termos de uso e privacidade O que o app faz e não faz, onde ficam os dados e os seus direitos | dados-e-locais/01-meus-dados e mais 14 |
| 156 | 2 | domínio | privacidade | Texto da foto do equipamento e consentimento antes do 1º envio (R5c, 07/11/2026). A foto é o único dado que sai do aparelho e pode ser dado pessoal (mostra a ca… | cadastro/04-boas-vindas-folha-selo-da-foto e mais 1 |
| 20 | 15 | domínio | estado | Você está na semana 1. Fase de aprendizado: foco na técnica, volume no mínimo, RIR 3–4 e sem superséries. | inicio/10-sobre-o-programa e mais 14 |
| 1 | 297 | domínio | justificativa | consenso | cadastro/10-saude-quais-valem-regioes-erro-sem-regiao e mais 126 |
| 36 | 8 | domínio | justificativa | Para descansar, não para crescer. Pode deixar a força um pouco mais baixa por alguns dias; o músculo não perde. Mesma frequência, cerca de metade das séries, RI… | fim-e-semana/17-semana-completa e mais 7 |
| 19 | 15 | tela | segurança | Refazer a triagem As 9 perguntas e a dor de hoje; o programa é gerado de novo no fim | dados-e-locais/01-meus-dados e mais 14 |
| 5 | 56 | tela | ação | Como ler o seu treino | inicio/01-inicio-depois-do-1o-treino e mais 55 |
| 34 | 8 | conteúdo | justificativa | Halperin I, et al. (2022). Accuracy in Predicting Repetitions to Task Failure in Resistance Exercise: A Scoping Review and Exploratory Meta-analysis. Sports Med… | inicio/19-como-ler-folha-selo e mais 7 |
| 33 | 8 | domínio | estado | "Pernas" conta como 3: frente da coxa, posterior e panturrilha. Com isso, o foco se divide e cada músculo cresce menos. Dá para seguir assim, mas o foco rende m… | cadastro/38-rotina-respondida e mais 7 |
| 12 | 22 | domínio | ação | Casa com halteres e elásticos Pergunta só o que muda o programa | cadastro/39-equipamento-lugar e mais 21 |
| 12 | 21 | conteúdo | ação | Remada unilateral com halter apoiada no banco 2 × 8–12 cada lado | inicio/01-inicio-depois-do-1o-treino e mais 20 |
| 27 | 9 | domínio | estado | Ajustar: Foco abaixo da meta: panturrilha 6 de 10 séries por semana. Suba 1 série em panturrilha no degrau da escada, no treino Corpo todo C. | inicio/10-sobre-o-programa e mais 8 |
| 11 | 22 | conteúdo | ação | Flexão de joelho deslizando os pés no chão 2 × 8–15 | inicio/03-inicio e mais 21 |
| 2 | 119 | jurídico | ação | Meus dados | cadastro/01-boas-vindas e mais 101 |
| 3 | 79 | tela | ação | Sobre o programa | inicio/01-inicio-depois-do-1o-treino e mais 78 |
| 4 | 56 | domínio | título ou rótulo | Agachamento búlgaro com apoio | inicio/02-folha-do-exercicio-com-historico e mais 55 |
| 37 | 6 | conteúdo | justificativa | Chen HL, Nosaka K, Chen TC (2012). Muscle damage protection by low-intensity eccentric contractions remains for 2 weeks but not 3 weeks. Eur J Appl Physiol 112(… | treino/57-treino-na-volta-folha-por-que e mais 5 |
| 17 | 13 | tela | privacidade | Você ainda não exportou nenhuma cópia. Os dados ficam só neste aparelho, e o navegador pode apagá-los. | inicio/33-inicio-semana-completa e mais 12 |
| 13 | 17 | tela | privacidade | Você autorizou o envio das fotos à Anthropic, nos EUA, em 16/11/2026. | termos-e-foto/09-foto-analisando e mais 16 |
| 27 | 8 | jurídico | privacidade | Ela vai para a Anthropic, empresa dos EUA, que faz o reconhecimento. A Anthropic guarda o dado nos EUA e pode processá-lo também em outros países. | cadastro/40-equipamento-folha-da-foto e mais 7 |
| 8 | 26 | tela | estado | Falta escolher a carga e quantas ainda conseguiria. | treino/01-serie-vazia e mais 25 |
| 41 | 5 | domínio | estado | Pouca carga para as pernas: o programa usa uma perna de cada vez, mais repetições e degraus de dificuldade. As pernas podem crescer menos que numa academia. Não… | inicio/12-sobre-o-programa-avisos e mais 4 |
| 20 | 10 | conteúdo | instrução | Pé da frente longe o bastante para o calcanhar ficar no chão embaixo: teste antes com o peso do corpo. | guia/01-tecnica e mais 9 |
| 9 | 22 | tela | ação | Condomínio com multifuncional Alguns halteres, banco e uma estação | cadastro/39-equipamento-lugar e mais 21 |
| 16 | 12 | tela | segurança | Prefere algum destes? Vale no próximo programa e nas trocas de local; a dor sempre manda. | inicio/02-folha-do-exercicio-com-historico e mais 11 |
| 8 | 24 | conteúdo | ação | Tríceps francês sentado com halter 2 × 10–15 | inicio/03-inicio e mais 23 |
| 38 | 5 | conteúdo | justificativa | Mayhew JL, Prinster JL, Ware JS, Zimmer DL, Arabas JR, Bemben MG (1995). Muscular endurance repetitions to predict bench press strength in men of different trai… | inicio/19-como-ler-folha-selo e mais 4 |
| 62 | 3 | domínio | opção | Corpo todo A/B/C Recomendada Cada músculo 3 vezes por semana · cerca de 6 exercícios por treino. Os três treinos passam por todos os grandes grupos, com exercíc… | dados-e-locais/22-rotina-e-divisao e mais 2 |
| 1 | 184 | domínio | ação | Fechar | cadastro/02-boas-vindas-folha-o-que-o-app-nao-faz e mais 183 |
| 8 | 23 | conteúdo | ação | Ponte de glúteo com halter 2 × 10–20 | inicio/03-inicio e mais 22 |
| 8 | 23 | tela | instrução | Antes: 1–2 séries leves de aquecimento, sem contar. | treino/01-serie-vazia e mais 22 |
| 4 | 45 | tela | título ou rótulo | Confira em 5 segundos | guia/01-tecnica e mais 44 |
| 8 | 22 | tela | ação | Corpo livre Sem equipamento: chão, parede e cadeira | cadastro/39-equipamento-lugar e mais 21 |
| 28 | 6 | domínio | opção | Problema em osso, articulação, músculo ou tendão Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar c… | cadastro/08-saude-quais-valem e mais 5 |
| 24 | 7 | domínio | privacidade | Cada vaga pede uma função (por exemplo, "tríceps com o braço acima da cabeça"), não um aparelho: máquina e peso livre valem o mesmo. | inicio/14-sobre-o-programa-por-que-este-programa e mais 6 |
| 4 | 42 | tela | instrução | 1ª vez: comece leve. | treino/01-serie-vazia e mais 41 |
| 42 | 4 | conteúdo | justificativa | Ogasawara R, Yasuda T, Sakamaki M, Ozaki H, Abe T (2011). Effects of periodic and continued resistance training on muscle CSA and strength in previously untrain… | fim-e-semana/25-inicio-volta-22-dias-folha-por-que e mais 3 |
| 15 | 11 | tela | instrução | Toque numa opção para gerar o programa de novo. Nada muda sem a sua escolha. | inicio/16-folha-avisos e mais 10 |
| 9 | 18 | tela | estado | Alguns músculos ficaram abaixo da meta. Dá para ajustar. | inicio/01-inicio-depois-do-1o-treino e mais 17 |
| 9 | 18 | tela | estado | Versão do app: 0b80e68, publicada em 16/11/2026. | dados-e-locais/01-meus-dados e mais 17 |
| 7 | 23 | conteúdo | ação | Supino reto com halteres 2 × 6–10 | inicio/01-inicio-depois-do-1o-treino e mais 22 |
| 5 | 32 | tela | ação | Série feita · descansar 1:45 | treino/01-serie-vazia e mais 31 |
| 40 | 4 | jurídico | privacidade | Mande este texto para quem te passou o link do app, contando o que aconteceu. Vão a versão do app, o modelo do aparelho e a tela. Não escreva nada sobre a sua s… | dados-e-locais/12-meus-dados-avisar-um-problema e mais 3 |
| 39 | 4 | tela | segurança | Para cada região, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o app prefere outros; até 2, o programa… | cadastro/10-saude-quais-valem-regioes-erro-sem-regiao e mais 3 |
| 39 | 4 | conteúdo | justificativa | Hwang PS, et al. (2017). Ensaio com 20 homens treinados: 2 semanas sem treinar não tiraram a força do leg press nem a massa magra de forma significativa (título… | fim-e-semana/25-inicio-volta-22-dias-folha-por-que e mais 3 |
| 7 | 22 | tela | ação | Academia completa Halteres, polias, barras e máquinas | cadastro/39-equipamento-lugar e mais 21 |
| 38 | 4 | conteúdo | justificativa | Riebe D, Franklin BA, Thompson PD, Garber CE, Whitfield GP, Magal M, Pescatello LS (2015). Updating ACSM's Recommendations for Exercise Preparticipation Health … | cadastro/06-saude-folha-por-que-perguntamos e mais 3 |
| 2 | 75 | tela | ação | Senti algo | treino/01-serie-vazia e mais 74 |

## Controles sem nome acessível

Nenhum.
