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

## 1. Cadastro (proposta; esperando a decisão)

Folhas: `folhas/1a-cadastro-abertura-e-equipamento.png`, `1b-cadastro-experiencia-e-rotina.png`, `1c-cadastro-equipamento-marcado.png` e `1d-cadastro-saude.png`. A mudança inteira, como está na cópia de exemplo, está em `propostas/1-cadastro.patch`, já com os testes ajustados: 904 testes de regra, a conferência de tokens e os 161 de ponta a ponta passam com ela.

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
