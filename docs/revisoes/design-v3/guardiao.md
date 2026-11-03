# Parecer do guardião das regras (design v3, papel 7, 03/11/2026)

> Revisão independente da síntese (`../design-v3.md`), dos arquivos dos papéis e do protótipo (`canvas/`). Conferi tudo contra `CLAUDE.md`, `briefing.md`, `pesquisa/00-metodo.md`, `pesquisa/regras.md` (`seguranca.*`, `equipamento.atalhos`, `nivel.*`), `pesquisa/07-seguranca-triagem-niveis.md` e o código (`src/domain/triagem/index.ts`, `src/domain/nivel/index.ts`, `BoasVindas.tsx`, `Triagem.tsx`). Li o texto exato do protótipo nos arrays `COND` (Main, direção 1), `CONDS` (D2) e `GRUPOS` (D3). **Não mexi em código nem em outros arquivos.**
>
> Vereditos: **passa**, **passa com ajuste** (o ajuste vem escrito) ou **não passa**.

## Em uma frase
As 3 direções do protótipo mantêm as 9 condições e o "não faz" antes do botão, e nenhuma vaza dado privado. Mas **a síntese diz que "nenhum critério sai", e isso não é exato em 2 condições** (remédio e gravidez perdem o "agora"). **Os rótulos curtos e a frase curta do `visual.md` não passam.** E faltam na tabela "Para decidir" a tela de pausa e uma marcação de regra da direção 3.

## 0. Não passa e ajustes obrigatórios (resumo)
| # | O quê | Veredito | Ajuste exato |
|---:|---|---|---|
| A | `visual.md`: rótulos da triagem (§4, §6 e `visual/triagem-412.png`) e a frase "Não diagnostica nem substitui o médico" (1ª tela A e C) | **não passa** | Não usar nenhum desses textos. Os textos vêm de `textos.md` 2.1, com os ajustes do item B. Detalhe na seção 3. |
| B | Texto das 9 condições, nas direções 1 e 3 | passa com ajuste | Nº 5: "**Remédio receitado** que você toma para doença crônica". Nº 8: "**Grávida agora, ou parto** nos últimos 6 meses". Na direção 2, nº 5: "Que você toma, para alguma doença crônica." |
| C | Tabela "Para decidir" | passa com ajuste | Acrescentar o item "Tela de pausa: título, mensagem e a frase que a pessoa confirma" (**muda regra**: texto de `seguranca.triagem`). No item 2, anotar que a direção 3 também mexe em `seguranca.triagem.nenhuma` (rótulos e ordem dos botões). |
| D | Síntese, seção 2: "Papel e tela dão o mesmo resultado… (Schwartz 2021) · robusta" | passa com ajuste | Citar Gwaltney 2008 e Muehlhausen 2015 para o "robusta". Schwartz 2021 é **um estudo**. Acrescentar a ressalva do próprio `pesquisa.md`: vale "desde que a pergunta e a resposta continuem as mesmas", o que **não** é o caso das 3 direções. |
| E | "O Boneco mostra cada exercício" (D2) e "Com o Boneco em cada exercício" (D3) | passa com ajuste | Só 31 dos 106 exercícios têm animação aprovada; os outros aparecem como cartão de texto (princípio "Qualidade do guia"). Trocar por "mostra como fazer cada exercício". |
| F | Botão da 1ª tela na direção 3 ("Começar pela saúde") | passa com ajuste | Esse toque grava `avisoAceitoEm`. O rótulo precisa dizer que a pessoa leu: "Entendi, começar pela saúde". |
| G | "Por que estas perguntas?" (D1 e D3) | passa com ajuste | Hoje é um link dentro de uma frase de 15 px, com área de toque abaixo de 44 px. Tem de virar uma linha própria de 48 px. |

## 1. Primeira tela
| Direção | Veredito | Por quê |
|---|---|---|
| **1 · Três linhas** | **passa** | A frase inteira de `seguranca.sem-diagnostico` aparece antes de "Entendi, vamos começar", com o selo, e o mesmo vale para "Seus dados ficam só neste aparelho". Nada obrigatório fica escondido. |
| **2 · Boneco** | **passa com ajuste** | O "não faz" inteiro, o selo e a linha de dados vêm antes do botão. "Como funciona" esconde só a promessa de evidência e o link do guia, e nada disso é obrigatório. Ajuste E: "o Boneco mostra cada exercício" promete mais do que o app entrega. O Boneco do topo é um quadro parado do goblet, que tem animação aprovada, e o motor não muda: ok. |
| **3 · Caminho em 4 passos** | **passa com ajuste** | O "não faz" inteiro e a linha de dados vêm antes do botão. Ajustes E e F. "Sem digitar nada" não vale para "Outro" nos minutos nem para o código da foto. Sugiro "Quase sem digitar" ou tirar a frase. |

Nas 3, sai "É uma ferramenta de orientação, não uma prescrição". O "não substitui profissional de Educação Física" já cobre a ideia, então aceito. **Recomendo** guardar a frase no "Saiba mais"/"Como funciona", porque prescrever é atribuição do profissional (CONFEF 488/2023, em `07`).

## 2. Triagem
| Direção | Veredito | Por quê |
|---|---|---|
| **1 · Três blocos** | **passa com ajuste** (e **muda regra**) | As 9 aparecem, 3 por tela, com os botões de mesmo peso, e o "sim" abre Sim/Não nas 3 do bloco. Ajustes: B, G, e **a 360 px cada bloco precisa caber inteiro junto com os botões**. Se não couber, os botões vão para o fim do bloco, para nenhum botão aparecer antes da 3ª condição (a mesma solução do `visual.md` para a lista). Quem decide é o Gustavo (`seguranca.triagem.nenhuma` e `.texto`). |
| **2 · Uma por tela** | **passa com ajuste** (e **muda regra**) | O rótulo nunca aparece sozinho: o critério inteiro fica logo abaixo, nas 9. Sim e Não têm 64 px, com 12 px entre eles, e "‹" desfaz. Ajuste B (nº 5). É o formato com mais apoio na evidência (Smyth 2006, moderada) e o mais próximo do PAR-Q+. |
| **3 · Lista curta** | **passa com ajuste** (e **muda regra**) | As 9 aparecem antes dos botões, e os botões ficam no fim da lista, não fixos. Ajustes B e G. Além disso, a síntese marca "só `.texto`", mas os botões mudam de rótulo ("Não tenho nenhuma destas"), de ordem (o "sim" vem antes) e de peso. A regra `seguranca.triagem.nenhuma` cita os rótulos de hoje, então precisa ser reescrita também. |

Nas 3, o selo continua à vista ("No estilo do PAR-Q+ · consenso" em D1 e D3; "Um sim não impede o treino · consenso" em D2). A pílula única cobre `seguranca.triagem` e `.nenhuma`, as duas com o selo consenso. **Ajuste:** ao tocar, ela abre as duas regras (e `.texto`), cada uma com a sua fonte.

**Recomendação (não obrigatória):** `pesquisa.md` (item 7) pedia "suas respostas ficam só neste aparelho" visível também na triagem, por causa da LGPD (art. 11, dado sensível). A síntese deixou isso de fora sem dizer. São 6 palavras no pé da triagem.

## 3. O texto das 9 condições (palavra a palavra)
Comparei com `PERGUNTAS` em `src/domain/triagem/index.ts`. O texto da síntese e o do `COND` (D1) e do `GRUPOS` (D3) são idênticos. D2 usa o rótulo como pergunta, com o critério logo abaixo.

| # | Critério de hoje | Síntese / D1 / D3 | D2 | `visual.md` (esboço e imagem) |
|---:|---|---|---|---|
| 1 | médico disse; coração; pressão alta | ok | ok | ok ("dito por médico") |
| 2 | repouso, dia a dia, esforço | ok | ok | **perde "dia a dia"** |
| 3 | 12 meses; perder o equilíbrio por tontura; desmaio | ok | ok | **perde "perda de equilíbrio"** |
| 4 | diagnosticada; além de coração ou pressão alta | ok ("pressão" sem "alta": sugiro "pressão alta") | ok | **perde "além de coração ou pressão"** (na imagem) |
| 5 | **toma** (uso atual); receitado; doença crônica | **perde "toma"** → ajuste B | **perde "toma"** → ajuste B | perde "toma" |
| 6 | 4 tecidos; hoje ou 12 meses; pode piorar com exercício | ok | ok | **perde "pode piorar com exercício" e "hoje"** |
| 7 | médico disse; só com acompanhamento; **fazer exercício** | ok ("treinar": sugiro "fazer exercício", como na D2) | ok | ok |
| 8 | **está** grávida; teve bebê; 6 meses | **"Gravidez" sem "agora"**: dá para ler como qualquer gravidez → ajuste B | ok ("Grávida agora") | ok |
| 9 | febre; gripe forte; se recuperando; agora | ok | ok (o "agora" está no rótulo) | **perde "se recuperando"** (na imagem) |

**Veredito:** texto da síntese, **passa com ajuste** (B). `visual.md`, **não passa** (item A). O esboço e as imagens do `visual.md` estão versionados e são fáceis de copiar na hora de implementar, por isso o veto precisa ficar escrito.

**Ordem:** a 6ª e a 7ª trocam de lugar. Isso passa, porque o dado salvo usa o `id` da condição (`Respostas` é um registro por `id`), e não a posição.

**Teste que sugiro na implementação:** um teste no Vitest que confira, em `PERGUNTAS`, as palavras de cada critério: "12 meses", "6 meses", "receitado", "toma", "diagnosticada", "pode piorar com exercício", "médico", "agora", "dia a dia", "equilíbrio". Assim, nenhum texto encurtado passa sem ninguém ver.

## 4. Resto do cadastro (C1 a C10)
| # | Veredito | Por quê |
|---|---|---|
| **C1** Nível em 3 telas, avanço automático | **passa** | O toque responde e segue depois de 0,3 s. Dá para desfazer com o "‹" de 48 px e com o voltar do celular, porque cada pergunta tem o seu endereço. Na volta, a resposta fica marcada e a tela não avança sozinha. Com "reduzir movimento", não há deslize, e a pausa de 0,3 s não é movimento. O selo de `nivel.classificacao` vai para o "Tudo certo?". |
| **C2** Pular a técnica quando não muda o nível | **passa com ajuste** | Conferi: `classificarNivel` dá "iniciante" com menos de 6 meses ou mais de 26 semanas parado, e a técnica não é usada em mais nada. Ajustes: (1) o esquema em `storage/esquema.ts` passa a aceitar a técnica em branco, com migração; (2) se a pessoa mudar o tempo no "Tudo certo?", a pergunta da técnica volta; (3) técnica em branco nunca vale "sim" (hoje o código já trata qualquer coisa diferente de "sim" como iniciante). |
| **C3** Rotina em 2 telas | **passa** | Muda só a tela, e "Outro" não avança sozinho. |
| **C4** Prioridade no "Tudo certo?" | **passa** | Sem escolha, o padrão é "nenhuma", como hoje. `volume.semanal.minimo-eficaz` não muda. |
| **C5** Equipamento em 2 passos | **passa** | Nada vem marcado, os "às vezes tem" aparecem desmarcados e o atalho nunca desmarca nada. O comportamento de `equipamento.atalhos` fica igual. Na implementação, trocar "logo abaixo" por "na tela seguinte" no texto da regra (registro, não decisão). |
| **C6** Frase da foto só na tela da foto | **passa com ajuste** | Obrigatório: usar o texto de `textos.md` (reduzida, sem localização, nada no servidor), acima de "Escolher fotos", sem dobra. A versão do `visual.md` ("não fica guardada") não serve. Recomendado: o "Seus dados ficam só neste aparelho" da 1ª tela é absoluto, mas a foto sai do aparelho. Uma frase mais exata: "Seu perfil e seus treinos ficam só neste aparelho." |
| **C7** Regiões e dor em telas próprias | **passa** (e **muda regra**, leve: marcado certo) | O aviso "dor forte… pede avaliação" continua na tela da nota. O efeito de cada nota precisa aparecer no "Tudo certo?" com o selo de `seguranca.dor.programa`. A decisão é do Gustavo. |
| **C8** Selo de uma palavra, um por bloco | **passa com ajuste** | Na rua, "consenso" quer dizer "consenso científico", e `00-metodo` proíbe promover consenso a ciência. Ajustes: (1) o selo abre com um toque e mostra o nome inteiro: "Consenso de especialistas (sem estudo que teste isso)". Hoje é um `title`, que não abre no celular. (2) Área de toque de 44 px. (3) Um selo por bloco só quando todas as regras do bloco têm o mesmo selo; se forem diferentes, vale um por regra ou o mais fraco. |
| **C9** Botão principal sempre embaixo | **passa com ajuste** | Na triagem, o botão fixo só vale se tudo o que ele responde estiver à vista. A 360 px, a direção 1 segue o ajuste da seção 2, e a direção 3 já põe os botões no fim da lista. |
| **C10** Glossário único | **passa** | Muda só palavras de tela. As frases que moram em `src/domain/` mudam junto com os testes que as conferem. |

## 5. A recomendação do líder (direção 1)
**Passa com ajuste.** Ela vem marcada como **[opinião]** e como "muda regra", e isso está certo. Ajuste: dizer ao Gustavo, na própria recomendação, que a direção 1 é uma **versão agrupada** ("nenhuma destas 3" vale como uma resposta só). `pesquisa.md` (item 5) desaconselha agrupar as 9 em 3 ou 4 perguntas, porque não há estudo de versão agrupada. Então o selo da nova `seguranca.triagem.nenhuma` fica **consenso** (`consenso-projeto`). A direção 2 é a que tem apoio de estudos (escolha forçada: Smyth 2006 e Callegaro 2015, moderada). O teste com 5 pessoas que a síntese sugere para as direções 1 e 3 deveria vir **antes** de implementar, e não depois.

## 6. Tabela "Para decidir": as marcações
| Item | Marcação | Confere? |
|---:|---|---|
| 1 | só tela | sim, com os ajustes E e F |
| 2 | muda regra | sim. Corrigir o texto: as 3 direções mudam `.texto`, e a direção 3 também muda `.nenhuma` (rótulos e ordem) |
| 3 | muda regra | sim, com o ajuste B |
| 4 | só tela | sim: o peso igual tira o empurrão para o "nenhuma" e vai no sentido mais seguro. Mas a ordem dos botões na direção 3 entra no item 2 |
| 5 | só tela | sim, desde que a pílula abra as duas regras. O "Por que" esconde só explicação, e cada botão diz o que faz |
| 6 | só tela | sim, com o ajuste do C8 |
| 7 | só tela | sim, com o ajuste do C6 |
| 8 a 12, 14 | só tela | sim (C2 muda o dado salvo, não a regra) |
| 13 | muda regra (leve) | sim |
| 15 | — | Acrescentar: "cada bloco da triagem cabe com os botões a 360 px" e o teste de palavras da seção 3 |
| **falta** | — | **A tela de pausa.** `textos.md` 2.6 troca o título, a mensagem de `avaliarTriagem` e a frase que a pessoa confirma ("…me avaliou e me liberou"). É o texto de `seguranca.triagem` que a pessoa "assina": **muda regra (texto)** e precisa do OK do Gustavo. |

Nenhum item marcado "só tela" muda o que a pessoa responde numa regra de segurança. O item que muda isso sem estar na tabela é a pausa.

## 7. Evidência: amostra de 6 citações de `pesquisa.md`
| Citação | Selo / status | Coerente com `00-metodo`? |
|---|---|---|
| Smyth et al. 2006 (*POQ*, doi) | moderada, verificado-busca | **sim** ("um grupo, resultados consistentes") |
| Höhne e Lenzner 2015 (doi) | um estudo, verificado-busca | **sim** |
| Krosnick 1991 | robusta | **não**: robusta pede várias meta-análises, e esta é uma teoria. Rebaixar para **moderada**, ou citar as meta-análises |
| Callegaro et al. 2015 | moderada, verificado-busca | **status não**: sem DOI, PMID ou PMCID, não é "verificado-busca". Anotar o DOI ou marcar NÃO VERIFICADO |
| Morkes e Nielsen 1997 | um estudo, "verificado-busca (via páginas secundárias)" | **status não**: "só visto em material secundário" é NÃO VERIFICADO pela própria definição. O mesmo vale para NN/g *Icon usability* e para a LGPD ("só fontes secundárias") |
| Schwartz 2021, na síntese | "robusta (formato)" | **não**: ver o ajuste D |

Não achei sinal de estudo inventado. O que não foi lido está marcado (PAR-Q+ 2025 e Kaplan 2025 como NÃO VERIFICADO). Nenhuma dessas fontes vira texto do app nem constante em `src/domain/`. São justificativa para o Gustavo, por isso os ajustes não bloqueiam a decisão, mas devem ser feitos antes de a síntese ir para ele.

## 8. Privacidade e repositório
- `git ls-files | grep -i privado`: vazio. Fora `.env.example`, nenhum `.env` nem foto versionada. `tests/repo/privacidade.test.ts`: 3 de 3 passam.
- As medidas usam a persona fictícia Ana (`scripts/design/palavras.spec.ts`), e as imagens do protótipo são do Boneco, hospedadas no canvas e não no repositório.
- As 3 direções dizem "dados no aparelho" antes da triagem. A frase da foto fica antes do envio (C6, com o ajuste). Fora a foto (`/api/vision`), o app não envia nada (conferi os `fetch` em `src/`).
- A leitura jurídica da LGPD antes de abrir o app para outras pessoas continua pendente, e a síntese diz isso.

## 9. Toque, contraste e movimento
- Toques: botões de 56 a 64 px, chips de 48 e links de 48. As exceções são o link "Por que estas perguntas?" (ajuste G) e o selo tocável (C8).
- Contraste: as combinações novas do `visual.md` passam (a mais baixa, a borda de controle sobre a superfície, dá 3,42:1). A proibida (a mesma borda sobre `--surface-2`, 2,84:1) não aparece no protótipo.
- Movimento: o protótipo não tem transição. O Boneco do topo é um quadro parado. O avanço automático pode ser desfeito (C1). A tabela de `interacao.md` 1.6 cobre `prefers-reduced-motion`.

## 10. O que mais o Gustavo precisa saber
1. **O que está "à vista" no protótipo ainda não foi medido a 360 px** na triagem da direção 1. É a meta que mais pesa na segurança.
2. **O texto final da triagem é um só para a lista, para o Sim/Não e para a pausa** ("Você respondeu sim em:"). Os ajustes do item B valem para os três lugares.
3. **Mais "sim" (direções 1 e 2) significa mais gente na pausa.** A triagem com perguntas de acompanhamento continua no backlog, e é ela que reduz esse custo.
4. **Em todas as direções, um "Não" tocado por engano passa sem revisão** (hoje também é assim com "Nenhuma vale para mim"). Na direção 2, com avanço automático, isso pesa mais. Fica para o teste com gente.
