# Pacote 5: o aviso de "sem melhora" no longo prazo

> Sessão "treino para todos", etapa 2 (16/11/2026). **Está no ramo `claude/nifty-albattani-mltt95`, não na `main`.** Parado aqui para a revisão do Gustavo. Todas as pessoas são fictícias. O simulador de meses usa um corpo que é um modelo, sem pretensão de evidência.

## 1. O que mudou

**O problema:** quem progride no ritmo normal do seu nível lia "três sessões sem melhora" em metade dos treinos, por meses. O aviso contava 3 sessões paradas para todo mundo, e o ganho de um intermediário ou de um avançado é lento demais para aparecer em 3 sessões.

**A regra (`progressao.estagnacao`):** a janela do aviso cresce com o nível.

| Nível | Antes | Agora |
| --- | ---: | ---: |
| Iniciante | 3 sessões | 4 sessões |
| Intermediário | 3 sessões | 8 sessões |
| Avançado | 3 sessões | 16 sessões |

São sessões do mesmo exercício, com a mesma carga, sem ganhar nenhuma repetição no total. O texto do aviso acompanha ("Oito sessões sem melhora: …"), e o motivo da semana leve também ("2 exercícios sem progresso em 8 treinos").

**Um acerto que a janela maior pediu:** as sessões da janela passam a ser comparadas pelas séries que todas têm em comum. Antes, o exercício com 3 séries num dia e 2 no outro "ganhava" e "perdia" repetição só por causa disso (30, 20, 30, 20…), e o aviso piscava de um treino para o outro.

**O que é ciência, o que é costume e o que é aposta.** Ciência: o ganho de força desacelera muito com o tempo de treino (`steele2023`). Aposta: os números 4, 8 e 16. **Nenhum estudo define essa janela**; eles são escolha do projeto, e a decisão de 02/11 foi recalibrá-los quando houver um export de uso real.

## 2. O dado guardado mudou (versão 9), com a sua decisão

A regra precisa saber o nível, e o programa guardado no aparelho não dizia para que nível tinha sido montado. **Decisão do Gustavo em 16/11/2026: o programa passa a guardar o nível.** Nenhuma tela mudou.

- **O que entrou:** um campo novo e opcional no programa (`nivel`), e a versão do estado guardado foi de 8 para 9.
- **A migração 8 → 9 não inventa nada:** ela só grava o nível quando o programa guardado foi gerado com o cadastro de agora (a conta que identifica as entradas do programa bate). Se a pessoa mudou o cadastro e ainda não atualizou o programa, ele fica sem nível, continua valendo a janela de antes (3 sessões), e a tela do programa já oferece a versão nova.
- **Ninguém vê "há uma versão nova do seu programa" só por causa do campo:** para quem tem o programa em dia, o programa migrado fica igual ao que o app geraria hoje (testado com três personas).
- **Um app antigo (versão 8) recusa o dado da versão 9**, em vez de regravá-lo sem o campo (testado).
- **Antes de a mudança ir para a `main`, vale exportar os dados** ("Meus dados" → "Guardar uma cópia"), como combinado para qualquer mudança de formato.

## 3. O antes e o depois, em pessoas

Os programas das doze personas são os mesmos de antes (a única diferença é o campo do nível). O que muda é o que a pessoa lê depois de treinar:

- **O Bruno (intermediário), com tudo parado.** Antes, lia "três sessões sem melhora" a partir da 3ª semana em quase todos os exercícios, e a semana leve era sugerida no fim da 2ª semana. Agora, o aviso de um exercício feito 1 vez por semana aparece na 8ª semana ("oito sessões sem melhora"), e a semana leve é sugerida no fim da 4ª (pelos dois exercícios que ele faz 2 vezes por semana).
- **A iniciante.** O aviso passa da 3ª para a 4ª sessão parada; na fase de aprendizado (as duas primeiras semanas) continua sem aviso, como antes.
- **Quem tem o programa antigo e não atualizou:** nada muda (3 sessões) até aceitar a versão nova.

## 4. O antes e o depois, medido

No simulador de meses (`medidas/longo-prazo.md`): 48 sessões de um exercício em 24 semanas, 15 casos de equipamento, força subindo 1%, 0,4% e 0,15% por semana para iniciante, intermediário e avançado. Em quantas das 48 sessões a pessoa lê o aviso:

| Nível | Antes (3 sessões) | **Agora (o app, com a janela do nível)** | A carga sobe |
| --- | ---: | ---: | ---: |
| Iniciante | 24,1 | **16,7** | 1,9 vez (igual) |
| Intermediário | 35,9 | **16,9** | 0,7 vez (igual) |
| Avançado | 40,7 | **17,2** | 0,5 vez (igual) |

A medida agora usa a regra do próprio app (antes, a janela era aplicada por fora, num protótipo), e dá o mesmo número da proposta.

**O que piora, e para quem:**
- **Quem está parado de verdade demora mais para ouvir.** Um avançado que estagnou num exercício feito 1 vez por semana só lê o aviso depois de 16 semanas (antes, 3). É o preço de não avisar à toa quem progride devagar.
- **A semana leve é sugerida mais tarde** quando o sinal é a estagnação (o Bruno: fim da 4ª semana, em vez da 2ª). Os outros dois sinais ("pesado demais" e dor que se repete) não mudaram.
- **Depois de uma volta de pausa**, a carência de 3 semanas deixou de fazer diferença para a estagnação do intermediário e do avançado: a janela de 8 ou 16 sessões só enche depois dela.
- **Mesmo com a janela, o aviso ainda aparece em 17 das 48 sessões do simulador** para os três níveis: uma vez parado por tempo bastante, ele se repete a cada treino até a pessoa mudar algo. Não mexi nisso.

## 5. O que não foi feito (da proposta, mesmo assunto)

- **Oferecer a revisão do nível aos ~6 meses:** pede estado novo e tela. Fica como pedido.
- **Mostrar o degrau de partida na semana para quem treina com o peso do corpo:** é tela (já está em `pedidos-ao-design.md`, item 3).

## 6. Os testes

- **Novos:** 12 em `tests/unit/sem-melhora.test.ts` (a janela de cada nível, a comparação pelas séries em comum, o nível no programa e na prescrição de hoje, o exemplo do Bruno) e 4 da migração 8 → 9 em `tests/unit/armazenamento.test.ts`.
- **Ajustados:** 7 testes antigos da semana leve e do leitor de export contavam com "3 treinos parados" para o Bruno, que é intermediário; passaram a usar 8, sem tirar nenhuma verificação e com controles a mais. Um por um em [`testes-ajustados-pacote-5.md`](testes-ajustados-pacote-5.md). Uma verificação antiga que passava sem provar nada (o iniciante na fase de aprendizado) foi fortalecida.
- **Nenhum registro de programa (snapshot) mudou.**

## 7. Conferências

| | |
| --- | --- |
| `npm run check` | limpo (1.013 testes) |
| Gerador: protótipo de conferência = app | 0 programas diferentes em 23.470 (o gerador não mudou; só o programa passou a dizer o nível) |
| A régua e os 20 cuidados na população | não mudam: nenhuma regra do gerador mudou neste pacote |
| Revisão cega | não se aplica: os programas são os mesmos; o que muda é o aviso depois do treino |
| `npm run test:e2e` | limpo (158 testes), já com a versão 9 dos dados |
| A auditoria oficial em duas rodadas | limpa: 39 arquivos idênticos nas duas rodadas e nenhum defeito acima da linha de base da régua |
| `src/engine/`, telas, `src/styles.css`, `api/`, `CLAUDE.md` | sem mudança |
| `src/storage/` | mudou, com decisão do Gustavo, migração e teste (seção 2) |

## 8. Decisões (uma por vez)

1. **Os números da janela (4, 8 e 16) ficam assim até haver um export de uso real?** *Recomendo sim.* São os da proposta; a alternativa medida (3, 5 e 8) reduz bem menos o aviso (24, 28 e 31 sessões em 48).
2. **Fechar a etapa 2?** Com o pacote 5, a proposta inteira está no ramo. O fechamento é: a revisão cega final contra a `main` (todas as mudanças juntas), a simulação, os doze exemplos finais, o resumo e a lista do que fica para depois. *Recomendo sim.* Depois disso vem a sua decisão sobre a ida para a `main`.
