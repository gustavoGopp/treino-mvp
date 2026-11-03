# Interação e uso com uma mão (design v3, papel 5)

> Como cada tela responde ao toque: avanço automático, botão fixo, polegar, gestos, estados e movimento. E, na seção 2, quatro formatos de triagem com as contas. As contas usam: palavras lidas a 200 por minuto + 1 s por toque **[opinião]**. As fontes com selo vêm da v2 (`design-v2.md`), salvo onde digo outra coisa. Opinião minha está marcada **[opinião]**.

## Em uma frase
Pergunta em cima, resposta embaixo, e o toque responde e segue. O botão principal fica sempre no mesmo lugar, ao alcance do polegar. Nenhum gesto escondido. Na triagem, **três blocos de três**, com "Nenhuma destas" e "Sim, alguma destas" do mesmo tamanho e do mesmo peso.

## 1. Regras de interação para todo o cadastro

### 1.1 O toque responde e segue (avanço automático)
- **Onde vale:** perguntas de **uma resposta só** (nível, dias, minutos, nota da dor, "Onde você treina?").
- **Onde não vale:** quando dá para marcar várias (regiões, "às vezes tem", lista de equipamento, Sim/Não de um bloco da triagem), quando há campo para digitar ("Outro") e na tela de pausa da triagem. Aí há um botão fixo embaixo.
- **Como:** a opção tocada mostra a marca (borda grossa, fundo de ação e um ✓) na hora. Depois de **0,3 s**, a tela seguinte entra. A v2 usou 0,16 s; proponho um pouco mais, para a marca ser vista **[opinião]**.
- **As opções são botões, não "bolinhas" de formulário.** Escolher numa lista de bolinhas e a tela mudar sozinha vai contra a WCAG 3.2.2 ("ao mudar um campo, a página não muda de contexto sem aviso"; **consenso**, norma técnica). Um botão que responde e segue é uma ação esperada. Na volta, a resposta dada aparece marcada (`aria-pressed`).
- **Desfazer:** "‹" no topo, à esquerda, com 48 px, e o "voltar" do próprio celular (gesto ou botão). Para isso, **cada pergunta tem o seu endereço** (por exemplo, `/comecar/nivel/2`). Hoje as 3 perguntas do nível ficam no mesmo endereço, e o "voltar" do celular sai do passo inteiro. Ao voltar, a resposta anterior está marcada e **não** avança sozinha. Tocar outra resposta troca e segue; tocar a mesma também segue.
- **Nada se perde:** cada resposta é salva no aparelho na hora, como hoje. Quem fecha o app volta para a mesma pergunta.

### 1.2 O botão principal fixo embaixo
- Em toda tela que tem botão (boas-vindas, blocos da triagem, telas de marcar várias, "Tudo certo?"), o botão fica numa faixa fixa embaixo: 56 px de altura, toda a largura, com a margem de segurança do celular (`env(safe-area-inset-bottom)`). Hoje a faixa existe no nível, na rotina, no equipamento e no "Tudo certo?". Faltam a boas-vindas (botão a 130% da altura) e a triagem.
- **Dois botões na faixa** só na triagem (formato A) e na pausa. Ficam empilhados, com 8 px entre eles. Total da faixa: ~144 px. Sobram ~600 px de conteúdo num celular de 412 × 839 px, o bastante para um bloco de 3.
- **O texto do botão diz o que vai acontecer:** "Continuar só com o peso do corpo" quando nada está marcado no equipamento; "Continuar com 4 itens" quando há. Hoje a mesma frase fica numa ajuda no meio da lista.
- **Teclado aberto** (no "Outro" dos minutos e das anilhas): a faixa some enquanto o teclado está aberto, e o campo tem um "OK" ao lado. No iPhone, uma faixa fixa costuma pular ou ficar atrás do teclado **[opinião, a testar]**. O teclado é o numérico (`inputmode="numeric"`).

### 1.3 A zona do polegar
- O polegar alcança bem a metade de baixo da tela e mal os cantos de cima (Bergstrom-Lehtovirta e Oulasvirta 2014, **um estudo**).
- **Pergunta em cima, respostas embaixo.** Com até 5 opções, elas ficam encostadas na faixa de baixo, e o espaço vazio fica entre a pergunta e as opções **[opinião]**.
- **Opções em largura total, uma por linha**, com 56 px de altura. Nada de 3 opções lado a lado com texto quebrado. Exceções: dias (2 a 6) e minutos (30 a 90) em grade de 3 colunas de 56 px; a nota da dor (0 a 10) em grade de 4 colunas, de 0 a 10, com as palavras "nada" sob o 0 e "a pior" sob o 10.
- **O "voltar" fica em cima**, fora da zona boa. É de propósito: é o toque raro, e o "voltar" do celular cobre o resto. Hoje o "Voltar para..." fica no pé da página, abaixo do botão principal; com a faixa fixa, ele ficaria escondido.
- **"Meus dados" no topo da 1ª tela** continua (é para quem volta, não para quem chega).

### 1.4 Gestos
- **Nenhum gesto novo.** Deslizar para responder (como nos apps de namoro) é rápido, mas fácil de errar e não tem rótulo. Todo gesto de arrastar precisa de um toque simples que faça o mesmo (WCAG 2.5.1, **consenso**).
- **Deslizar para os lados entre perguntas:** não. Briga com o gesto de voltar do sistema, que nasce na borda **[opinião]**.
- **"Saiba mais" da 1ª tela** abre uma folha que sobe de baixo. Fecha com "Fechar" (botão de 48 px, embaixo) ou com o "voltar" do celular. Arrastar para baixo pode fechar também, mas nunca é o único jeito.
- **Vibração ao tocar:** não proponho. O iPhone não aceita vibração pelo navegador, e o ganho é pequeno **[opinião]**.

### 1.5 Estados
| Estado | Onde | Como fica |
|---|---|---|
| **Carregando o app** | qualquer tela | Hoje a tela fica em branco até ler os dados. Proposta: o fundo e o topo aparecem na hora; o conteúdo, quando pronto. Sem rodinha se levar menos de 1 s **[opinião]**. |
| **Carregando a foto** | foto | "Analisando 3 fotos..." com uma barra que corre, e "Usar a lista" logo abaixo, para não prender a pessoa. |
| **Gerando o programa** | "Tudo certo?" | O botão vira "Montando o seu programa..." e fica travado, para não gerar duas vezes. |
| **Vazio** | equipamento sem nada | O botão diz "Continuar só com o peso do corpo". |
| **Vazio** | foto sem nada reconhecido | "Não reconheci nenhum equipamento." Dois botões: "Tentar outra foto" e "Usar a lista". |
| **Vazio** | prioridade e "algo a evitar" | A linha diz "Nenhuma" e "Nada", com "(opcional)". |
| **Erro** | campos que sobram ("Outro", halteres, anilhas) | Com o avanço automático, quase não sobra o que errar. Onde sobra: o erro aparece **junto do campo**, com o que fazer ("Use um número de 20 a 150"), e o foco vai para ele. Sem tremer a tela. |
| **Erro** | foto | Sem internet: "Sem internet agora. Use a lista." com o botão "Abrir a lista". Código errado ou limite do dia: a mensagem do servidor e o mesmo botão. |
| **Erro** | dados que não abriram | A caixa de erro de hoje fica no topo da 1ª tela, com o link para importar a cópia. |
| **Pausa** | triagem, sim que pede avaliação | Igual a hoje no conteúdo. Interação: a caixa "Confirmo que fui avaliado..." vira uma linha inteira de 56 px; "Revisar respostas" volta ao bloco que teve o sim. |

### 1.6 Microinterações e movimento
| Momento | Normal | Com "reduzir movimento" ligado (`prefers-reduced-motion`) |
|---|---|---|
| Tocar uma opção | Borda, fundo e ✓ aparecem em 100 ms. | Aparecem na hora, sem transição. |
| Pausa antes de seguir | 0,3 s. | 0,3 s também: é para ver a marca, não é movimento. |
| Trocar de tela | A nova entra deslizando 16 px da direita e aparecendo, em 200 ms. Voltar faz o contrário. | Troca direta, sem deslizar. |
| Barra de progresso | Enche em 200 ms. | Salta. |
| "Às vezes tem" aparecendo | Aparece e a tela rola suave até ele (o `Revelar` de hoje). | Aparece e rola sem animação (já é assim). |
| Foto analisando | Barra que corre. | Barra parada com o texto "Analisando... pode levar alguns segundos". |
| Botão pressionado | Escurece um pouco enquanto o dedo está em cima. | Igual (não é movimento). |

Regras: nada pisca; nada se mexe sozinho por mais de 5 s (WCAG 2.2.2, **consenso**); o foco vai para o título de cada tela nova, para o leitor de tela anunciar (o componente `Titulo` já faz isso).

## 2. A triagem: quatro formatos

O que a segurança exige (briefing, regra 2): as 9 condições à vista; texto próprio, no estilo do PAR-Q+; um "sim" pede avaliação; sim só em osso ou articulação abre regiões e dor de hoje. **Todos os formatos abaixo mudam o que a pessoa vê ou responde: são mudança de regra** (`seguranca.triagem.nenhuma` e `seguranca.triagem.texto`) e precisam da decisão do Gustavo.

O PAR-Q+ tem 7 perguntas gerais; quem diz "não" em todas segue, e quem diz "sim" responde perguntas de acompanhamento (Warburton et al., PAR-Q+ 2023, **consenso**, citado na v2). Os quatro formatos mantêm essa lógica: a pergunta geral primeiro; o detalhe só para quem diz sim.

Em todos, cada condição começa pela **palavra-chave em destaque**, seguida da qualificação (rascunho na seção 2.4). Hoje a condição fica no meio da frase, e não dá para varrer a lista com os olhos.

### A. "Três blocos" (recomendado **[opinião]**)
```
┌──────────────────────────────┐
│ ‹            Saúde · 1 de 3  │
│ Alguma destas vale para você?│
│ Um sim não impede o treino:  │
│ pede uma avaliação antes.    │
│                   [consenso] │
│                              │
│ ♥ Coração ou pressão alta.   │
│   Um médico já disse que     │
│   você tem.                  │
│ ✚ Dor no peito.              │
│   Parado, no dia a dia ou no │
│   esforço.                   │
│ ◎ Tontura ou desmaio.        │
│   Nos últimos 12 meses.      │
│┌────────────────────────────┐│
││    Sim, alguma destas      ││
│└────────────────────────────┘│
│┌────────────────────────────┐│
││      Nenhuma destas        ││
│└────────────────────────────┘│
└──────────────────────────────┘
```
- **Blocos:** 1) coração e circulação: coração ou pressão alta, dor no peito, tontura ou desmaio. 2) doenças e remédios: outra doença crônica, remédio para doença crônica, médico pediu acompanhamento. 3) agora ou recente: osso, articulação, músculo ou tendão; gravidez ou parto recente; febre ou doença agora.
- **"Nenhuma destas"** responde "não" às 3 e vai para o próximo bloco. **"Sim, alguma destas"** mostra Sim/Não ao lado de cada uma das 3 (botões de 56 px) e um "Continuar" fixo, que se libera com as 3 respondidas.
- **Os dois botões têm o mesmo tamanho e o mesmo estilo** (contorno, sem o azul cheio). Hoje "Nenhuma vale para mim" é o botão azul principal, e isso empurra para o "nenhuma" **[opinião]**. "Nenhuma destas" fica embaixo, mais perto do polegar, porque é a resposta mais comum.
- Cada bloco cabe numa tela, sem rolar: os botões aparecem junto com as 3 condições, sem precisar travar nada.
- A tela de pausa (sim que pede avaliação) aparece depois do bloco 3, como hoje depois das 9.

### B. "Uma por tela"
```
┌──────────────────────────────┐
│ ‹            Saúde · 4 de 9  │
│                              │
│ Outra doença crônica?        │
│ Diagnosticada, fora coração  │
│ e pressão.                   │
│                              │
│┌────────────┐┌──────────────┐│
││    Sim     ││     Não      ││
│└────────────┘└──────────────┘│
└──────────────────────────────┘
```
- Uma condição por tela, em letra grande. "Sim" e "Não" lado a lado, de 64 px. O toque responde e segue.
- O mais fiel ao PAR-Q+: cada condição tem a sua resposta.
- Risco próprio: depois de 3 ou 4 "Não" no mesmo lugar, o dedo toca no ritmo, sem ler **[opinião]**. Não dá para trocar os botões de lugar para "acordar" a pessoa: isso causa erro de toque.

### C. "Lista com destaque"
```
┌──────────────────────────────┐
│ Alguma destas vale para você?│
│ ♥ Coração ou pressão alta. … │
│ ✚ Dor no peito. …            │
│ ◎ Tontura ou desmaio. …      │
│   ... (as 9, com ícone)      │
├──────────────────────────────┤
│ [ Role até o fim ↓ ]         │  ← antes de ver a última
│ [ Nenhuma vale para mim ]    │  ← depois de ver a última
│ [ Sim, alguma vale ]         │
└──────────────────────────────┘
```
- A regra de hoje, com outra apresentação: a lista curta com ícone e palavra-chave; "Nenhuma vale para mim" e "Sim, alguma vale" numa faixa fixa embaixo.
- A lista das 9 não cabe numa tela (~1,1 a 1,2 telas a 412 px; ~1,4 a 360 px). Então a faixa começa com "Role até o fim ↓" (tocar rola), e os dois botões só aparecem quando a última condição entra na tela. Isso garante que a pessoa **passou** pelas 9, não que leu.
- "Sim, alguma vale" leva às 9 com Sim/Não, como hoje.

### D. "Marque o que vale"
```
┌──────────────────────────────┐
│ Marque o que vale para você. │
│ ☐ ♥ Coração ou pressão alta. │
│ ☐ ✚ Dor no peito. …          │
│ ☐ ◎ Tontura ou desmaio. …    │
│   ... (as 9, cada uma 56 px) │
├──────────────────────────────┤
│ [ Nenhuma vale para mim ]    │  ← nada marcado
│ [ Continuar: 1 marcada ]     │  ← algo marcado
└──────────────────────────────┘
```
- Cada condição é uma linha que se marca com um toque. O botão de baixo muda: "Nenhuma vale para mim" sem nada marcado; "Continuar: 1 marcada" com algo marcado.
- Mesma trava de rolagem do C.
- Quem tem uma condição não responde as 9 de novo. Mas as 8 não marcadas viram "não" **sem a pessoa dizer**. Hoje, depois de "Sim, alguma vale", cada uma tem Sim/Não.

### 2.1 As contas
"Ler tudo" = todas as palavras da triagem. "Só os destaques" = título, palavras-chave e botões, que é o que a pessoa lê quando nenhuma condição parece ser com ela. Caminho "osso" = sim só em osso/articulação, joelho, nota 4 (inclui as telas de regiões e de dor: ~56 palavras, 3 toques).

| Formato | Toques ("nenhuma") | Ler tudo | Só os destaques | Caminho "osso": toques / tempo | Risco de responder sem ler **[opinião]** |
|---|---:|---:|---:|---:|---|
| **Hoje** | 1 | 171 palavras · ~52 s | não dá: a condição fica no meio da frase | 13 / ~141 s (427 palavras: lê as 9 duas vezes) | **alto**: 9 frases longas antes de um botão só |
| **A. Três blocos** | 3 | ~144 · ~46 s | ~69 · ~24 s | 10 / ~72 s | **baixo a médio**: 3 condições curtas à vista, junto dos botões |
| **B. Uma por tela** | 9 | ~163 · ~58 s | ~64 · ~28 s | 12 / ~78 s | **médio**: cada uma sozinha e grande, mas 9 "Não" viram ritmo |
| **C. Lista com destaque** | 1 (+1 rolagem) | ~130 · ~41 s | ~55 · ~19 s | 14 / ~110 s | **médio a alto**: uma decisão para 9; a trava prova que passou, não que leu |
| **D. Marque o que vale** | 1 (+1 rolagem) | ~127 · ~40 s | ~52 · ~18 s | 5 / ~60 s | **médio a alto**: como o C, e as não marcadas viram "não" sem resposta |

### 2.2 O que mudaria na regra, por formato
| Formato | `seguranca.triagem.nenhuma` | `seguranca.triagem.texto` |
|---|---|---|
| A | "Nenhuma" vale por bloco de 3; quem diz sim responde as 3 do bloco | texto com a palavra-chave primeiro |
| B | some o "nenhuma": Sim/Não em cada uma, como no PAR-Q+ | texto mais curto, uma por tela |
| C | igual a hoje, mais a trava de rolagem | texto com a palavra-chave primeiro |
| D | marcar substitui o Sim/Não; não marcada = "não" | texto com a palavra-chave primeiro |

### 2.3 Por que recomendo o A **[opinião]**
- É o único em que **os botões e todas as condições daquela resposta cabem juntos na tela**, sem trava. Ler 3 palavras-chave antes de tocar custa ~3 s.
- Fica no meio em velocidade (~24 s, lendo só os destaques; hoje ~52 s), mas tem o menor risco entre os rápidos.
- Quem tem condição responde Sim/Não só no bloco dela (10 toques; hoje 13) e não relê as 9.
- Se o Gustavo quiser o mais rápido: **D** (1 toque, ~18 s), sabendo do risco. Se quiser o mais fiel ao PAR-Q+: **B**.

### 2.4 Rascunho dos 9 textos (palavra-chave primeiro)
Para contar palavras e conferir que nada some. O texto final é do papel 3. A coluna da direita confere cada qualificação do texto de hoje (`src/domain/triagem/index.ts`).

| # | Proposto | Palavras (hoje) | O que precisa ficar |
|---:|---|---:|---|
| 1 | **Coração ou pressão alta.** Um médico já disse que você tem. | 11 (13) | médico disse; coração; pressão alta |
| 2 | **Dor no peito.** Parado, no dia a dia ou no esforço. | 11 (15) | repouso, dia a dia, esforço |
| 3 | **Tontura ou desmaio.** Perdeu o equilíbrio por tontura ou desmaiou nos últimos 12 meses. | 14 (12) | 12 meses; perder o equilíbrio |
| 4 | **Outra doença crônica.** Diagnosticada, fora coração e pressão alta. | 9 (14) | diagnosticada; além de coração e pressão |
| 5 | **Remédio para doença crônica.** Receitado, de uso atual. | 8 (8) | receitado; toma hoje |
| 6 | **Osso, articulação, músculo ou tendão.** Problema hoje ou nos últimos 12 meses que pode piorar com exercício. | 17 (21) | os 4 tecidos; hoje ou 12 meses; pode piorar com exercício |
| 7 | **Exercício só com acompanhamento.** Um médico já disse isso a você. | 11 (12) | médico; só com acompanhamento |
| 8 | **Gravidez ou parto recente.** Está grávida ou teve bebê nos últimos 6 meses. | 13 (10) | grávida; bebê; 6 meses |
| 9 | **Doente agora.** Febre, gripe forte ou se recuperando de alguma doença. | 11 (13) | febre; gripe forte; recuperação |
| | **Total** | **~105 (118)** | |

O texto encolhe pouco (~11%). O ganho é outro: **as palavras-chave somam ~32**, e é por elas que a pessoa varre a lista.

Os ícones (♥, ✚, ◎ nos desenhos) são marcadores para achar a linha, não substituem a palavra **[opinião]**. Ícone de saúde é fácil de ler errado (um coração pode parecer "amor" ou "favorito").

## 3. Tela a tela no resto do cadastro
- **Boas-vindas:** "Começar" fixo embaixo; "Saiba mais" é um link de 48 px logo acima da faixa. Ao tocar "Começar", grava o aceite do aviso, como hoje.
- **Nível:** 3 telas, toque que segue. Na 2ª ("Está treinando agora?"), as 4 opções têm textos longos ("Estou treinando (ou parei há menos de 2 semanas)"): largura total, uma por linha, 2 linhas de texto cabem em 64 px.
- **Rotina:** dias em grade (2 a 6) e minutos em grade (30 a 90 e "Outro"). "Outro" não avança: abre o campo, o teclado numérico e o "OK".
- **Onde você treina:** 5 cartões de 72 px em largura total, com desenho à esquerda. O toque segue. Tocar de novo um cartão já escolhido, na volta, leva à mesma tela seguinte, sem desmarcar nada (`equipamento.atalhos`: o atalho nunca desmarca).
- **Às vezes tem:** os itens em grade de 2 colunas, 56 px. Faixa fixa: "Nenhum destes" quando nada está marcado; "Continuar" quando há. Link "Ajustar item por item" acima da faixa.
- **A lista:** a de hoje, por categoria. Ao marcar um item com detalhes (halteres, polia), os detalhes aparecem logo abaixo e a tela rola até eles (o `Revelar` de hoje). A faixa fixa diz quantos itens estão marcados.
- **Foto:** a frase da privacidade fica **acima** do botão "Escolher fotos", nunca numa dobra. O código de convite só aparece aqui. Ao confirmar as sugestões, a pessoa cai na lista, com elas marcadas.
- **Tudo certo?:** cada linha leva à tela daquela resposta; depois de mudar, a pessoa volta direto ao "Tudo certo?", sem refazer as telas seguintes **[opinião]**.

## 4. O resto do app, curto
A v2 já resolveu o principal (série por vez, "Série feita" fixo de 64 px, descanso em tela cheia). Só acrescento:
- **"Série feita" pede a reserva (RIR) num 2º toque.** Os 5 botões da reserva aparecem na faixa de baixo, onde estava o "Série feita": o polegar não muda de lugar. Tocar a reserva salva e começa o descanso.
- **Descanso:** "−15 s / Pular / +15 s" na faixa de baixo. A tela continua sem apagar enquanto conta (o temporizador já usa o `Wake Lock`).
- **"Senti algo"** fica no topo, em contorno vermelho, como na v2. É longe do polegar, de propósito: não se toca sem querer.
- **Desfazer a última série** (já existe como botão): proponho que apareça também como aviso embaixo, por 5 s, logo depois de salvar, com "Desfazer" de 48 px **[opinião]**. Com "reduzir movimento", o aviso aparece e some sem deslizar.
- **Guia:** os controles de 48 px ficam embaixo do Boneco, não em cima.

## 5. Como saber se funcionou **[opinião]**
- O app não manda dados para fora (tudo fica no aparelho), então não dá para medir quantas pessoas voltam depois do avanço automático. O jeito é **testar com 3 a 5 pessoas**, no celular, com uma mão, e anotar: quem tocou sem ler (perguntar depois "o que dizia o bloco 2?"), quem voltou, quanto tempo levou.
- O papel 6 refaz as medidas (palavras, toques, tamanho dos alvos) no protótipo com o `palavras.spec.ts`.

## Conflitos com outros papéis
1. **Visual (4) × botões iguais na triagem:** a v2 diz "uma cor só para ação", e o botão principal é azul cheio. Na triagem eu peço os dois botões iguais, para não empurrar o "nenhuma". O líder decide se a triagem é exceção.
2. **Redação (3):** os 9 textos da seção 2.4 são rascunho para contar palavras. Se o texto final crescer, os tempos sobem. Se encurtar demais, pode esconder uma qualificação (a coluna "o que precisa ficar" serve de conferência).
3. **Acessibilidade (6):** o avanço automático só passa na WCAG 3.2.2 se as opções forem botões, não rádios; e o foco precisa ir para o título a cada tela. A trava de rolagem dos formatos C e D precisa funcionar com o leitor de tela (a "última condição vista" pelo foco, não só pela rolagem).
4. **Guardião (7):** os quatro formatos mudam regra. O D é o que mais muda (as não marcadas viram "não" sem resposta).
5. **Pesquisa (1):** o risco de "responder sem ler" de cada formato é opinião minha. Se a pesquisa achar estudo sobre triagem de saúde em lista × uma por tela, os riscos da tabela 2.1 devem ser revistos.
6. **Estrutura (2, eu mesmo):** os formatos de triagem mudam as contas do fluxo inteiro. `estrutura.md` usa o A e dá a conta com o D.
7. **Mais telas × "parecer rápido":** o avanço automático e a barra por etapas são o que faz 12 telas curtas parecerem mais rápidas que 6 longas. Se o líder tirar o avanço automático, cada tela ganha um "Continuar", e a academia completa passa de 12 para ~18 toques (6 telas de uma resposta ganham um "Continuar").
