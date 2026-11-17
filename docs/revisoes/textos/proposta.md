# Proposta: o texto do app, tela por tela (16/11/2026)

> Pedido do Gustavo em 16/11/2026: cortar muito o texto do app. A pergunta de cada palavra deixa de ser "onde ponho isto?" e passa a ser "isto precisa existir?". Este arquivo guarda a proposta de cada fluxo, a decisão dele e o que foi aplicado. As imagens de antes e depois estão em `folhas/`; a tabela de todos os textos, em `inventario/`; as referências, em `pesquisa/` (03, 04 e 05) e em `../frontend-novo/textos/pesquisa/` (01 e 02).

## Como cada texto é julgado

Cada texto do inventário recebe uma de cinco saídas: **tirar**; **trocar** por imagem, ícone, número ou pelo próprio controle; **encurtar**; **levar para um toque**; **manter**.

O teste: **"se eu tirar isto, a pessoa erra, se machuca, ou fica sem saber o que fazer?"** Se a resposta for não, sai.

O que o corte não atravessa (do pedido): segurança à vista; evidência e fonte alcançáveis; privacidade dita por inteiro em algum lugar alcançável; todo controle com nome para o leitor de tela; precisão técnica; e as regras do treino.

## Metas por peça (bem mais duras que as da etapa 1)

A etapa 1 (13/11) usou "frase de até 20 palavras" e "bloco de 25 palavras ou mais é sinal de alerta". As metas de agora:

| Peça | Meta | De onde vem | Sustentação |
|---|---|---|---|
| Título de tela | até 3 palavras, ou a própria pergunta quando a tela é uma pergunta | Apple (curto; menos de 15 caracteres), Material e Polaris (curto), GOV.UK (a pergunta é o título): pesquisa 05, regras 3 e 4 | várias diretrizes concordam; o número é de uma só, em inglês |
| Botão | 1 a 3 palavras, com verbo | Material (1 a 3), Apple, Atlassian e Carbon (1 ou 2): pesquisa 05, regras 8 e 9 | várias diretrizes concordam |
| Opção | até 4 palavras; só o número quando a pergunta já diz a unidade | pesquisa 05, regra 26; pesquisa 04, regra 9 | opinião apoiada em diretrizes |
| Ajuda sob a pergunta | nenhuma; quando fica, uma frase de até 8 palavras | GOV.UK e NHS (uma frase curta, só se serve à maioria), Material (idealmente uma linha): pesquisa 05, regra 11 | várias diretrizes concordam; as 8 palavras são escolha do projeto (uma linha em 390 px) |
| Linha de ajuste | rótulo e, embaixo, o valor de hoje; sem frase de descrição | Apple, Android e Microsoft: pesquisa 03, seção 4 | várias diretrizes concordam |
| Imagem como opção | imagem com um nome curto; o escolhido marcado por mais que a cor | Baymard e W3C: pesquisa 04, regras 11 e 8 | estudo com dados (lojas) e norma |
| Ícone no lugar da palavra | só os da lista curta (fechar, voltar, tirar com "×", "+", visto, lupa, reticências), sempre com nome para o leitor de tela | pesquisa 04, regras 1, 2 e 30 | estudo pequeno e antigo, mais várias diretrizes |
| Bloco de texto corrido | sinal de alerta a partir de 15 palavras; nenhum fora dos termos e das folhas de explicação | regra do projeto; a direção vem da pesquisa 01, regras 1 e 5 | opinião |

**Onde a evidência é fraca:** nenhum estudo é de app de treino nem de pessoa em esforço; os números dos guias são de textos em inglês e, em parte, de computador; ninguém testou tela com texto contra tela sem texto. As metas são ponto de partida, não resultado de teste.

## 0. Estilo do Boneco (aprovado e aplicado em 16/11/2026)

Folha: `folhas/0-estilo-do-boneco.png` e `folhas/0b-estilo-do-boneco-nomes.png`.

| | Antes | Depois |
|---|---|---|
| Palavras à vista na folha | 52 | 6 |

O Gustavo escolheu primeiro a versão 1 (só os dois bonecos). A pesquisa 04 trouxe que o padrão das fontes é imagem com nome, e ele trocou para a versão 2 (um nome de uma palavra sob cada boneco), com os nomes do par A: **Manequim** e **Pessoa**. O Boneco ficou maior (o quadro fecha em volta do corpo, na tela, sem mexer no motor) e o escolhido tem contorno e a marca de "certo".

## 1. Cadastro (aprovado como está e aplicado em 16/11/2026)

Folhas: `folhas/1a-cadastro-abertura-e-equipamento.png`, `1b-cadastro-experiencia-e-rotina.png`, `1c-cadastro-equipamento-marcado.png` e `1d-cadastro-saude.png`. A mudança aplicada é a de `propostas/1-cadastro.patch`. Depois dela, a medição das 458 telas foi de 66.352 para 64.285 palavras (`depois/comparacao.md`): cadastro −16%, Meus dados e locais −8% (usam as mesmas telas). Testes: 904 de regra e tokens limpos; nos de ponta a ponta, 160 de 161 na rodada completa (o que falhou é o intermitente do cartão de texto, anotado no backlog em 13/11, e passou sozinho).

| Tela | Hoje | Proposta | O que muda |
|---|---|---|---|
| Abertura | 68 | 53 | saem "Monta o programa, mostra cada exercício e diz o porquê." e "4 passos, uns 3 minutos."; o aviso de segurança, a linha de privacidade e o aceite dos termos ficam como estão |
| Saúde (pergunta geral) | 87 | 86 | só "Passo 1 de 4" vira "1 de 4"; as 9 condições e os dois botões não mudam |
| Saúde (quais valem) | 195 | 185 | "Marque as que valem. No fim, você confirma que as outras não valem." vira "Marque as que valem."; as 9 perguntas completas ficam |
| Pausa por um "sim" | 94 | 83 | a frase sobre o que o app guarda da liberação fica mais curta; as perguntas, a orientação e a confirmação ficam |
| Experiência | 121 | 80 | título "Experiência"; saem as duas frases de ajuda; "Sim, faço os exercícios básicos com segurança" vira "Sim"; o motivo do nível e o selo vão para "por quê?" |
| Rotina | 108 | 64 | título "Rotina"; perguntas mais curtas; os dias e os minutos viram só o número; sai "Dá para mudar depois, em Meus dados."; o aviso de foco fica com uma frase a menos |
| Onde você treina | 73 | 37 | a pergunta vira o título; os 4 lugares ficam só com o desenho e o nome |
| Lugar escolhido | 170 | 94 | "39 itens marcados. Tire o que não tiver."; "Às vezes tem"; a explicação da menor anilha vai para "para que serve" |
| Lista dos marcados (tela toda) | 322 | 205 | "Tirar" vira "×" (com o nome "Tirar Banco reto" para o leitor de tela); "Procurar" |
| Detalhes do item | 62 | 53 | sai "Isso define as cargas que o app pode sugerir." |
| **Soma das 10** | **1.300** | **940** | menos 28%; fora as 3 telas de saúde, de 924 para 586 (menos 37%) |

**O que não mexi, e por quê:**
- **As telas de saúde** (as 9 condições, as perguntas completas, a pausa): é a triagem; o pedido diz que ela não perde conteúdo.
- **A opção "Estou treinando (ou parei há menos de 2 semanas)":** o parêntese diz onde entra quem parou há poucos dias; tirar muda como a pessoa responde.
- **Os nomes dos 4 lugares** ("Condomínio com multifuncional", "Casa com halteres e elásticos"): o nome diz o que o toque vai marcar.
- **A folha da foto** (194 palavras): é privacidade; fica para o fluxo "termos e foto", com o ok explícito do Gustavo.

**Um defeito que apareceu ao subir o bloco "Às vezes tem":** os nomes quebravam no meio da palavra ("Kettlebe ll", "Elástico s"), hoje e antes. Na proposta eles cabem.

**Um defeito que os testes pegaram na própria proposta:** sem a palavra "Tirar", o botão "×" ficou com 40 px de largura, abaixo dos 44 px de toque. O teste de toque falhou em 7 cenários; o botão passou a ter 48 px e o teste não foi mexido.

**Decisões anteriores que a proposta muda:** os 4 lugares tinham uma linha de descrição cada (apresentação aprovada em 06/11/2026); a proposta tira as quatro.

## 2. Início e programa (aprovado como está e aplicado em 16/11/2026)

Folhas: `folhas/2a-inicio-e-folha-do-exercicio.png`, `2b-inicio-sobre-o-programa-e-ajustes.png`, `2c-inicio-como-ler-e-dois-locais.png` e `2d-inicio-abas-com-5-dias.png`. A mudança aplicada é a de `propostas/2-inicio.patch`, com os testes: 904 de regra, tokens limpos e 167 de ponta a ponta (os 161 de antes e 6 novos, das abas nas 6 personas).

| Tela | Hoje | Proposta | O que muda |
|---|---|---|---|
| Início | 105 | 88 | as abas ficam só com a letra do dia (os minutos do dia escolhido já estão logo abaixo); "Músculos abaixo da meta." com o botão "Ajustar" no lugar de "Alguns músculos ficaram abaixo da meta. Dá para ajustar." e "Ver"; o botão vira "Começar o treino" (o nome do treino é o título) |
| Folha do exercício | 93 | 29 | à vista ficam a prescrição e "Ver como fazer"; as alternativas e o "prefiro este" vão para "Alternativas (4)", a um toque; "Por que este exercício (5)" |
| Sobre o programa | 104 | 93 | "Semana 1." no lugar de "Você está na semana 1."; a divisão entra na linha do resumo; o título "Como está o seu programa" fica só para o leitor de tela |
| Ajustes possíveis | 94 | 86 | um título só (hoje a folha "Avisos" repete "Ajustes possíveis" embaixo); "Tocar numa opção gera o programa de novo." |
| "Como ler o seu treino", aberto | 256 | 193 | cada definição mais curta, com o mesmo sentido e os mesmos selos |
| Início com dois locais | 237 | 130 | "Em Academia do bairro: o treino muda." e "4 trocas" a um toque (a lista do dia, logo abaixo, já mostra os exercícios deste local) |
| Início com 5 dias | 121 | 105 | as abas sem os minutos |
| **Soma das 7** | **1.010** | **724** | menos 28% |

**Um defeito de hoje, achado na medição com as outras personas:** com 4 ou 5 dias de treino, o nome do dia é cortado nas abas ("Supe", "Inferic", "Empu"). Os testes não pegavam porque a persona deles tem 3 dias. Na proposta as abas passam para a linha de baixo e todo nome aparece inteiro (`folhas/2d-inicio-abas-com-5-dias.png`).

**O que continua longo, e por quê:** as frases que vêm das regras (o aviso de ajuste, a fase, as opções de ajuste, os 9 avisos e os 10 porquês de "Sobre o programa"). Só encurtam de verdade se forem reescritas na regra que as gera, com os testes delas. Proposta: tratá-las num passo próprio, depois das telas ("as frases das regras"), com o antes e o depois de cada frase.

**Decisões anteriores que a proposta muda:**
- As abas dos dias mostravam os minutos de cada dia (frontend novo, 12 e 13/11). Na proposta, só o dia escolhido mostra os minutos.
- As 3 melhores alternativas ficavam à vista na folha do exercício, e o resto em "ver mais" (decisão de 01/11). Na proposta, todas ficam a um toque.

## 3. Treino (proposta superada pela versão mínima da seção 5)

Folha: `folhas/3-treino.png`. A mudança de exemplo está em `propostas/3-treino.patch`.

**O treino já era o fluxo mais enxuto** (de 51 a 69 palavras por tela, quase tudo número, rótulo e botão), e a maior parte do que tem é segurança. Sobra pouco para cortar:

| Tela | Hoje | Proposta | O que muda |
|---|---|---|---|
| Série | 69 | 66 | o botão "Série feita · descansar 1:45" vira "Série feita" (o relógio mostra o tempo logo depois do toque); "Aqueça antes: 1–2 séries leves, sem contar." |
| Série preenchida | 62 | 58 | o mesmo botão |
| Descanso | 51 | 51 | nada |
| Depois da série de acerto | 69 | 69 | sai o rótulo "Calibração:" antes da frase (a frase já começa por "Ficou pesada:", e ficavam dois dois-pontos seguidos) |
| Terminar sem série | 32 | 28 | "Nenhuma série registrada: este treino não conta, e o próximo continua sendo este dia." |
| Terminar com série | 23 | 21 | "0 de 6 exercícios feitos. O que foi registrado fica salvo." |
| Série com drop set | 107 | cerca de 96 (contado na frase; a tela não foi fotografada) | "Sem descansar, tire 20–30% da carga e faça mais repetições. Repita uma vez." |
| Exercício sem animação | 63 | 60 (idem) | o botão "Como fazer: dicas e erros" vira "Como fazer" |

**O que não mexi, e por quê:**
- **"Senti algo"** (as 7 opções, a nota de dor, "O app não diagnostica") e **os avisos de dor**: segurança.
- **"Montagem segura"** nos exercícios com barra, rack ou barra fixa: segurança.
- **"1ª vez: comece leve."** e **"Quantas ainda conseguiria? meta 3–4"**: sem eles a pessoa erra a carga ou não sabe o que responder.
- **As folhas de "por quê?"** (de 170 a 295 palavras): o peso delas é o texto das regras e as fontes, que ficam para o passo das frases das regras.

## 4. Guia (proposta superada pela versão mínima da seção 5)

Folha: `folhas/4-guia.png`; patch: `propostas/4-guia.patch`. Levava a tela de 295 para 169 palavras: "Montagem" fechada como os outros blocos, a prescrição só com os números, o rodapé "Segurança" com duas frases a menos, sem o 2º botão de voltar e sem "articulações" na legenda (o desenho novo não marca as articulações).

## 5. Mudança de direção (16/11/2026): "quero bem menos que isso"

Depois do treino e antes do guia, o Gustavo disse: "quero bem menos que isso, ainda acho que tem muita margem para diminuir, que podem parecer necessárias, como a explicação do projeto, mas que não são".

A leitura: o corte feito até aqui encurtou e levou para um toque, mas deixou a explicação espalhada por todas as telas (o "por quê?", o selo de evidência, "Como ler o seu treino", "Sobre o programa", os porquês de cada exercício, os blocos do guia). A versão mínima tira a explicação das telas e a junta num lugar só.

Exemplo em imagem, do app rodando (`folhas/5a-minimo-guia.png`, `5b-minimo-inicio-e-treino.png`; o exemplo está em `propostas/5-exemplo-minimo.patch` e é só para a decisão: esconde as peças, não constrói ainda o lugar único):

| Tela | No começo do dia | Com o corte de antes | Versão mínima |
|---|---|---|---|
| Guia | 295 | 169 | 60 |
| Início | 105 | 88 | 78 |
| Folha do exercício | 93 | 29 | 22 |
| Série do treino | 69 | 66 | 60 |

**O que a versão mínima muda de princípio** (por isso pede o ok explícito do Gustavo):
- **Evidência.** O `CLAUDE.md` diz que toda regra e todo texto técnico indicam o nível de evidência e a fonte. Na versão mínima, o selo e o "por quê?" saem de todas as telas; o nível e a fonte continuam existindo e alcançáveis, num lugar só (uma página "Entenda o treino", em Meus dados).
- **Segurança no guia.** À vista fica uma frase com os sinais e a ação ("Dor forte ou em pontada, formigamento ou perda de força? Pare e procure avaliação."). As outras duas (a dor muscular esperada; as animações não substituem avaliação presencial) iriam para a página única e para os termos.

**Decisão do Gustavo (16/11/2026): "sim para as duas, pode seguir".** Aplicado no commit `f81e484`:
- A explicação, o selo de evidência e o "por quê?" saíram de todas as telas e estão na página **"Entenda o treino"** (Meus dados → Programa), em 7 blocos fechados: como ler o treino; o seu programa; os exercícios (por que cada um e a próxima carga); a sua semana e as pausas; por que o app pergunta e sugere; segurança; todas as regras e as fontes (as 163 regras, conferidas por teste contra `regras.json`).
- O princípio da evidência no `CLAUDE.md` foi reescrito para dizer isso: o nível e a fonte continuam existindo e alcançáveis, num lugar só.
- No guia, a segurança à vista é uma frase com os sinais e a ação; o texto inteiro está em "Entenda o treino" → "Segurança" e nos termos.
- Segurança e privacidade que precisam ficar a um toque continuam a um toque (`PorQue essencial`: "o que sai daqui", o aviso do navegador).

Em imagem, do app rodando: `folhas/5c-aplicado-inicio-e-folha.png`, `5d-aplicado-treino-e-guia.png`, `5e-aplicado-entenda-o-treino.png`.

| Tela | No começo do dia | Agora |
|---|---|---|
| Guia | 295 | 60 |
| Início | 105 | 78 |
| Folha do exercício | 93 | 22 |
| Série do treino | 69 | 61 |

No app inteiro, pela medição refeita em 17/11 com o roteiro consertado (60 roteiros, 0 falhas): nas 415 telas que existem nas duas medições, 57.789 → 44.199 palavras (−24%); guia −59%, cadastro −21%, início −15%, treino −9%. Contando tudo o que cada medição colheu: 458 telas e 66.352 palavras antes; 424 telas e 46.703 agora (as folhas de "por quê?" e de selo que saíram das telas não existem mais). A conta do início ainda carrega o texto que foi para "Entenda o treino" (as telas antigas "Sobre o programa" e "Como ler" são medidas lá, com o mesmo nome). A tabela completa está em `depois/comparacao.md`.

Achado da medição, para o backlog: a página "Entenda o treino" baixa o arquivo das regras e o das fontes assim que abre, e não só quando o bloco "Todas as regras e as fontes" é aberto (o comentário no código diz o contrário). Não quebra nada; custa um download a mais nessa página.

## 6. Fim do treino e semana (aprovado como está e aplicado em 17/11/2026, commit `57a6348`)

No mesmo padrão: fica o número e a ação; a explicação vai para "Entenda o treino" → "A sua semana e as pausas". Proposta em `propostas/6-fim-e-semana.patch`; imagens em `folhas/6a-fim.png`, `6b-semana.png`, `6c-ofertas.png`, `6d-evolucao-e-apagar.png`, `6e-dor-e-entenda.png`.

| Tela | Hoje | Proposta |
|---|---|---|
| Fim do treino (com recorde e oferta de semana leve) | 161 | 97 |
| Semana completa | 291 | 111 |
| Semana com 2 de 3 | 173 | 77 |
| Semana com a oferta de menos dias | 326 | 114 |
| Semana com a oferta de semana leve | 275 | 94 |
| Semana na semana leve | 203 | 98 |
| Evolução de um exercício | 84 | 76 |
| Evolução sem treino | 33 | 15 |

O que muda, peça por peça:

| Onde | Hoje | Proposta | Desfecho |
|---|---|---|---|
| Fim: título do bloco | "O que mudou hoje" | só para leitor de tela | tirar da vista |
| Fim: a semana | linha "A sua semana ▪▪▪ 3 de 3" e, lá embaixo, o botão "Ver a sua semana" | a própria linha vira o toque que leva à semana; o botão sai | trocar |
| Fim: cargas que sobem | "1 exercício com carga para subir na próxima vez." | sai (a lista logo abaixo já diz "Subir · próxima: 9 kg") | tirar |
| Fim: pergunta | "Hoje foi: (opcional)" | "Hoje foi" | encurtar |
| Fim: lista | "Para a próxima vez" | "Próxima vez" | encurtar |
| Fim: apagar | "Registrei algo errado: apagar este treino" | "Apagar este treino" (a confirmação, com o que acontece, não muda) | encurtar |
| Semana: data | "02/11 a 08/11, em qualquer local" | "02/11 a 08/11" | encurtar; "qualquer local" vai para Entenda |
| Semana: frase | "Semana completa: 3 de 3. Peito, costas e glúteos na meta." | sai da tela (o número e o quadro já dizem) | levar para Entenda |
| Semana: últimas semanas | quadradinhos + "3 das últimas 3 semanas com treino." | só os quadradinhos (a frase fica no nome acessível) | tirar da vista |
| Semana: título | "O que subiu nesta semana" | "Subiu nesta semana" | encurtar |
| Semana: músculo abaixo da meta | "o seu programa planeja 6 de 10: falta tempo" em cada linha | sai da linha | levar para Entenda |
| Semana: "Como ler este quadro" | bloco fechado na tela | sai da tela | levar para Entenda |
| Semana: menos dias | "Um programa que cabe melhor?" + 3 frases | "Um programa com menos dias?" + "Nas últimas 4 semanas você treinou cerca de 1 vez por semana." + os botões | encurtar; o resto vai para Entenda |
| Semana leve: oferta | "Semana leve? (opcional)" + motivo + 37 palavras + "Fazer a semana leve" | "Semana leve?" + "Metade das séries por 7 dias, mesma carga." + "Fazer" / "Agora não" | encurtar; motivo e explicação vão para Entenda |
| Semana leve: ativa | "Cerca de metade das séries, RIR 3–4 e a mesma carga. Para descansar, não para crescer." | "Metade das séries, RIR 3–4, mesma carga." | encurtar |
| Semana: evolução | "Sua evolução" + a lista de todos os exercícios | bloco fechado "Evolução (14)" | levar para um toque |
| Evolução: legenda | "Sua evolução: a melhor série de cada treino." | sai | levar para Entenda |
| Evolução: sem treino | "Ainda não há treino registrado deste exercício. A evolução aparece depois do 1º treino com ele." | "Ainda sem treino registrado deste exercício." | encurtar |
| Evolução: máquinas em 2 locais | "Nas máquinas, cada local tem a sua lista: a placa de uma torre não pesa o mesmo que a de outra." | sai (os títulos "Em <local>" continuam) | levar para Entenda |

**O que não muda (segurança):** o aviso de dor que se repete ("Dor de 3 a 5 no mesmo exercício em 2 treinos seguidos: …procure avaliação profissional."), o fim "Treino encerrado por segurança" com o SAMU 192 e a confirmação de apagar o treino.

**Regras:** nenhuma mudou. Em `src/domain/` só encurtou a frase da oferta de menos dias (`acompanhamento/semana.ts`); o teste da regra (quando oferecer e quais opções) é o mesmo.

**Um conserto junto:** na página "Entenda o treino", a frase da semana saía repetida ("2 de 3 treinos. 2 de 3 treinos. Se der…"). A proposta tira a repetição.

**Testes da proposta:** 904 unitários, 177 de ponta a ponta e os tokens, tudo passando.

## 7. Meus dados e Meus locais (aprovado como está e aplicado em 17/11/2026, commit `ab0caf4`)

A regra da linha: a 2ª linha só fica quando mostra um **valor** (o que está escolhido); quando só descreve o que o título já diz, sai. Proposta em `propostas/7-meus-dados-e-locais.patch` (aplica por cima da 6); imagens em `folhas/7a-meus-dados.png`, `7b-meus-locais.png`, `7c-novo-local-e-evitar.png`.

| Tela | Hoje | Proposta |
|---|---|---|
| Meus dados | 155 | 99 |
| Meus locais (2 locais) | 49 | 24 |
| Meus locais, depois de trocar o principal | 68 | 40 |
| Novo local | 56 | 44 |
| Algo a evitar | 43 | 22 |

| Onde | Hoje | Proposta | Desfecho |
|---|---|---|---|
| Meus dados: Objetivo | "Ganhar músculo (o padrão)" | "Ganhar músculo" | encurtar |
| Meus dados: Meus locais | "1 local: Meu local" / "2 locais: Prédio, Academia do bairro" | "Meu local" / "Prédio, Academia do bairro" | encurtar |
| Meus dados: Entenda o treino | "O porquê de cada coisa e as fontes" | "O porquê e as fontes" | encurtar |
| Meus dados: Estilo do Boneco | "Como o guia desenha os exercícios" | o estilo escolhido: "Manequim" ou "Pessoa" | trocar |
| Meus dados: Trazer uma cópia | "De um arquivo exportado por este app" | sem 2ª linha (a folha explica) | tirar |
| Meus dados: Refazer a triagem | "As 9 perguntas e a dor de hoje; o programa é gerado de novo no fim" | sem 2ª linha | tirar |
| Meus dados: Termos de uso e privacidade | "O que o app faz e não faz, onde ficam os dados e os seus direitos" | sem 2ª linha (o conteúdo dos termos não muda) | tirar |
| Meus dados: versão | "Versão do app: d3babf4, publicada em 17/11/2026." | "Versão d3babf4 · 17/11/2026" | encurtar |
| Folha do estilo | título "Escolha o Boneco" (a linha diz "Estilo do Boneco") | "Estilo do Boneco" nos três lugares | trocar (um nome só) |
| Meus locais: frase do alto | "O programa é montado para o local principal." | sai; o cartão do local diz "13 equipamentos · principal" | trocar |
| Meus locais: botões | "Editar nome e equipamento" · "Montar o programa para este local" · "Cadastrar outro local" | "Editar" · "Tornar principal" · "Novo local" | encurtar |
| Meus locais: aviso da troca | "Academia do bairro é o local principal. O programa muda só quando você tocar em "Atualizar" no seu treino." | "Academia do bairro é o principal. O programa muda quando você tocar em "Atualizar" no início." | encurtar |
| Novo local / Editar | "Toque numa sugestão ou escreva o seu." e "Que equipamento tem neste local?" | sai a ajuda; o título vira "Equipamento" | tirar e encurtar |
| Algo a evitar | "Opcional. O programa é gerado de novo sem o que você marcar." + "Algum equipamento que você tem, mas prefere não usar? (opcional)" + "Algum exercício que você quer evitar? (opcional)" | "Equipamento que prefere não usar" + "Exercícios a evitar" (o botão já diz "Salvar e gerar o programa") | tirar e encurtar |

**O que não muda (privacidade e proteção dos dados):** "Tudo fica guardado só neste aparelho." com "o que sai daqui"; o aviso "Este navegador pode apagar seus dados."; as folhas "Guardar uma cópia", "Trazer uma cópia", "Foto do equipamento" e "Apagar todos os dados?"; o texto de "Avisar um problema" (o que vai na mensagem e o pedido de não escrever sobre a saúde).

**Testes da proposta:** 904 unitários, 177 de ponta a ponta e os tokens passando (os unitários foram repetidos com a máquina livre; na 1ª rodada, com a medição rodando junto, três testes do motor e do gerador deram tempo esgotado).

## 8. Avisos e erros (aprovado como está e aplicado em 17/11/2026, commit `4b4528d`)

São textos que protegem os dados da pessoa: a frase pode encurtar, mas o que ela precisa saber e o botão ficam. Proposta em `propostas/8-avisos-e-erros.patch` (aplica por cima da 7); imagens em `folhas/8a-avisos.png` e `8b-lembrete-de-copia.png`.

| Tela | Hoje | Proposta |
|---|---|---|
| Tela de erro | 76 | 35 |
| Aviso de instalar no iPhone (nas boas-vindas) | 137 | 111 |
| Início com o lembrete de cópia | 112 | 105 |

| Onde | Hoje | Proposta | Desfecho |
|---|---|---|---|
| Tela de erro | 3 blocos com título, frase e botão ("Guardar uma cópia", "Tentar de novo", "Avisar o problema") | a frase do alto ("Seus dados continuam neste aparelho. Guarde uma cópia antes de tentar de novo.") e os 3 botões | tirar os títulos e as frases que repetem o botão |
| Não foi possível salvar | "…O que você registrar agora pode se perder ao fechar o app. Exporte uma cópia para não perder seus dados." | "Não foi possível salvar neste aparelho. Exporte uma cópia para não perder o que registrar." (o botão não muda) | encurtar |
| Instalar no iPhone | 2 frases de explicação + os 3 passos + "Se já tem treinos aqui, exporte uma cópia antes em "Meus dados": o app instalado pode começar vazio, e aí é só importar." | "O Safari apaga os dados de um site que fica 7 dias sem ser aberto." + os 3 passos + "Já tem treinos aqui? Exporte uma cópia antes, em "Meus dados"." | encurtar; o resto vai para Entenda |
| Lembrete de cópia | "Você ainda não exportou nenhuma cópia. Os dados ficam só neste aparelho, e o navegador pode apagá-los." · "Exportar agora" | "Os dados ficam só neste aparelho, e o navegador pode apagá-los." (ou "Há treinos novos desde a última cópia.") · "Exportar" | encurtar |
| Dado que o app não leu | botão "Exportar os dados que não foram lidos" | "Exportar esses dados" (a frase não muda) | encurtar |

O que saiu vai para "Entenda o treino" → "Por que o app pergunta e sugere" → "Os seus dados", com as regras `dados.instalar-iphone`, `dados.copia` e `dados.persistente`.

**O que não muda:** as mensagens de falha de carregamento (já são de uma frase com o botão "Tentar de novo"), o alerta "Série N anotada, mas não salva" e o texto de "Avisar um problema".

**Testes da pilha de propostas (6 + 7 + 8), em 17/11:** 904 unitários, 177 de ponta a ponta e os tokens, tudo passando.

## 9. Termos e foto (proposta; esperando a decisão)

O pedido da sessão diz: não tirar conteúdo dos termos nem da folha da foto sem o ok explícito do Gustavo. Por isso este fluxo é uma pergunta, com duas opções em imagem (`folhas/9-foto.png`).

**Os termos (793 palavras).** São um documento para ler, alcançado por um link; ninguém passa por ele no meio do treino. Recomendação: não mexer.

**A folha da foto (193 palavras antes de autorizar).** Quase tudo é a caixa de consentimento: os 5 itens de "para onde vai a foto", a frase de autorização e o direito de retirar.

| Opção | O que muda | Palavras na folha |
|---|---|---|
| A (recomendada) | só a frase de instrução: "Tire ou escolha até 5 fotos do lugar onde você treina. Usar a foto é opcional: a lista abaixo faz o mesmo." vira "Até 5 fotos do lugar onde você treina." A caixa de consentimento fica inteira | 179 |
| B | além disso, os 5 itens viram um resumo de 2 frases à vista, com "Ler tudo antes de autorizar" a um toque | 95 |

Por que A: a autorização vale pelo que a pessoa leu antes de marcar (LGPD, consentimento informado). Na opção B ela pode autorizar sem abrir os detalhes (por exemplo, a exceção de 2 anos e o processamento em outros países), e isso é uma decisão sobre privacidade, não sobre texto.

