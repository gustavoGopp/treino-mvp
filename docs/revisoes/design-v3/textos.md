# Textos das telas iniciais (design v3, papel 3: redação de interface)

> Subagente de redação, 03/11/2026. Lê junto com `briefing.md`. **Nada mudou no código.** Este arquivo propõe palavras: cada texto novo, onde ele fica e quantas palavras custa.
>
> **Como contei:** a mesma regra do `scripts/design/palavras.spec.ts`, ou seja, conta todo pedaço com letra ou número dentro do `<main>`. A conta bate com a medida de hoje (boas-vindas 180, triagem 171). O selo conta como palavra porque aparece na tela. **Nas propostas, o selo vale 1 palavra** ("consenso", "moderada"), como a design v2 aprovou ("pílula cinza de uma palavra"). Hoje o código ainda escreve "consenso de especialistas" (3 palavras): se isso ficar, some 2 palavras por selo.

## Em uma frase
Dá para cortar **cerca de dois terços das palavras da 1ª tela (180 → 63)** e **um terço da triagem (171 → 118)** sem perder nenhuma das 9 condições, nenhum prazo, o "não diagnostica" nem a frase de privacidade. Na triagem, o que mais ajuda não é cortar: é **pôr em negrito as 2 a 4 palavras do começo de cada condição**, para a pessoa bater o olho e ver que nenhuma vale.

## Resumo em números
| Tela | Hoje | Proposta | Como |
|---|---:|---:|---|
| Boas-vindas | 180 | **63** (A), 46 (B, + 52 numa dobra fechada), 61 (C) | 3 linhas curtas, aviso de segurança numa faixa, privacidade numa linha |
| Triagem (lista das 9) | 171 | **118** (T-A); 123 (T-B); 118 (T-C) | título vira a pergunta; condições em frase sem "Você…?"; começo em negrito |
| Nível (respondido) | 118 | ~84 | perguntas e opções mais curtas; tira a frase que as opções já dizem |
| Rotina (respondida) | 98 | ~83 | ajudas mais curtas; "2 dias" vira "2" |
| Equipamento | 263 / 383 | ~231 / ~351 | tira a abertura repetida. **O peso aqui são os nomes dos cartões, não frases**: o ganho grande é de layout (ver Conflitos) |
| Tudo certo? | 27 | 27 | já está enxuta; só o botão muda |
| **Até o programa** | **~857 / ~977** | **~606 / ~726** | −29% (lista) e −26% (academia) |
| Seu treino | 177 | ~158 | fase em linguagem do dia a dia; "RIR" vira "reserva" |

Tempo de leitura a 200 palavras por minuto (mesma conta do briefing): 1ª tela de ~54 s para ~19 s; triagem de ~51 s para ~35 s, e ~10 s para quem só bate o olho nos negritos (27 palavras) **[opinião: estimativa, a medir]**.

## Como escrevi (regras usadas em todo o arquivo)
- **Uma ideia por frase, até ~12 palavras.** Frase longa só quando um critério de segurança precisa dela (a do osso tem 18). *Consenso: GOV.UK, guia de conteúdo ("plain English", frases curtas); Nielsen Norman Group: no celular a pessoa passa o olho antes de ler.*
- **O título faz a pergunta**, e o texto embaixo não a repete. *[opinião]*
- **Tirar o supérfluo e realçar o essencial** (negrito no começo da condição). *Moderada: Mayer 2017, já citada na design v2 (coerência e sinalização).*
- **Palavras do dia a dia**, com o termo técnico só quando não há outro (ver o glossário).
- **Nada some por ficar curto:** quando cortar perderia algo, a tabela diz e o corte não é proposto.

### Glossário (vale para todas as telas)
| Hoje | Proposta | Por quê |
|---|---|---|
| hipertrofia | ganhar músculo; musculação | palavra técnica |
| baseado em evidência | mostra a fonte de cada escolha | diz o que a pessoa vê, não o conceito |
| programa automático | o app monta seu treino | "automático" não diz nada a quem lê |
| gerar meu programa | montar meu treino | "gerar" é palavra de sistema |
| triagem (na tela) | perguntas de saúde | "triagem" lembra pronto-socorro; no código continua "triagem" |
| execução / guia de execução | como fazer / guia de exercícios | mais curto e comum |
| priorizar grupos | focar em algum músculo | "grupo muscular" é jargão |
| RIR 3–4 | reserva 3–4 (uma vez por tela: "pare 3 a 4 repetições antes do limite") | sigla em inglês; "Reserva" já é a palavra da caixa de volta de pausa |
| classificamos para baixo | começamos mais leve | diz o efeito |
| avaliado e liberado (masculino) | me avaliou e me liberou | neutro, sem "(a)" |

---

## 1. Primeira tela (boas-vindas)

### O que precisa ficar, e onde
| Exigência | Onde fica | Palavras |
|---|---|---:|
| **O que o app não faz** (não diagnostica; não substitui médico nem profissional de Educação Física; pare com dor, tontura ou mal-estar e procure avaliação) | Na própria 1ª tela, numa faixa de alerta **antes do botão**, com o selo de `seguranca.sem-diagnostico`. **Não pode ir para uma dobra:** o botão "Entendi, vamos começar" grava `avisoAceitoEm`, ou seja, registra que a pessoa viu o aviso. | 20 a 23 + selo |
| **Privacidade**, parte 1: os dados ficam no aparelho | Uma linha na 1ª tela, antes do botão. A pesquisa pede o aviso "destacado antes da triagem" (`docs/pesquisa/07`, seção LGPD), e as respostas da triagem são dado de saúde. | 6 |
| **Privacidade**, parte 2: a foto sai reduzida, sem localização, e não fica no servidor | **Só no bloco da foto**, onde ela já está hoje, logo acima do botão "Escolher fotos". É o momento em que a pessoa decide mandar a foto. Na 1ª tela, ela só ocupava espaço. | 23 (ver seção 3) |
| Exportar ou apagar em "Meus dados" | Fica no link "Meus dados" do topo (já existe nessa tela). | 0 |
| "Leva cerca de 1 minuto…" | **Sai.** A medida de hoje dá 13 a 17 toques e 4 a 5 minutos de leitura: a promessa não se sustenta. | 0 |

### Versão A: "Três linhas" (recomendada) **[opinião]**
Três promessas com ícone, uma faixa de segurança, uma linha de privacidade e o botão. Tudo cabe numa tela de 412 px sem rolar **[opinião: estimativa, a medir]**.

| Tela | Elemento | Texto atual | Texto proposto | Palavras | Muda regra? |
|---|---|---|---|---:|---|
| Boas-vindas | Título | Seu treino, com o equipamento que você tem | **Treino de musculação com o que você tem** | 8 → 8 | só tela |
| Boas-vindas | Abertura | Montamos um programa de hipertrofia baseado em evidência, só com o seu equipamento, e mostramos o porquê de cada escolha. Leva cerca de 1 minuto, mais o tempo de marcar o seu equipamento. | (sai: as 3 linhas abaixo dizem o mesmo) | 33 → 0 | só tela |
| Boas-vindas | "O que o app faz" (título e 3 itens) | O que o app faz · Monta o programa a partir de regras com fonte e selo de evidência. · Mostra como executar cada exercício. · Sugere a carga da próxima vez, pelo que você registrou. | (sem título, com ícone em cada linha) Monta seu treino com o seu equipamento. · Mostra como fazer cada exercício. · Mostra a fonte de cada escolha. | 33 → 18 | só tela |
| Boas-vindas | "O que o app não faz" | O que o app não faz · O app não diagnostica e não substitui um médico ou um profissional de Educação Física. É uma ferramenta de orientação, não uma prescrição. Se sentir dor, tontura ou mal-estar, pare e procure avaliação. + selo | (faixa de alerta, sem título) O app não diagnostica e não substitui médico ou profissional de Educação Física. Sentiu dor, tontura ou mal-estar? Pare e procure avaliação. + selo | 42 → 23 | só tela (`seguranca.sem-diagnostico` segue dita inteira) |
| Boas-vindas | Privacidade | Seus dados ficam no aparelho · O seu perfil, o programa e os treinos ficam guardados só neste aparelho. A única coisa que sai é a foto… (51 palavras) | Seus dados ficam só neste aparelho. | 56 → 6 | só tela (a parte da foto vai para o bloco da foto) |
| Boas-vindas | Botão | Entendi, vamos começar | Entendi, vamos começar | 3 → 3 | — |
| Boas-vindas | Link | Ver o guia de execução | Ver o guia de exercícios | 5 → 5 | só tela |
| | **Total** | | | **180 → 63** | |

O que se perde: "É uma ferramenta de orientação, não uma prescrição" (o "não substitui profissional de Educação Física" já diz isso) e "pelo que você registrou" (detalhe de como a carga é sugerida; aparece no treino). A promessa de evidência fica ("mostra a fonte de cada escolha"), e o selo aparece já na faixa de segurança.

### Versão B: "Uma frase e um botão"
Uma frase do que o app faz, a segurança e a privacidade visíveis, e o resto num "Como funciona" fechado. Sobra espaço para uma imagem grande (o Boneco, por exemplo), se o papel visual quiser.

| Tela | Elemento | Texto proposto | Palavras |
|---|---|---|---:|
| Boas-vindas | Título | **Musculação com o que você tem** | 6 |
| Boas-vindas | Frase | Em 5 passos, o app monta seu treino. | 8 |
| Boas-vindas | Faixa de alerta | O app não diagnostica nem substitui médico ou profissional de Educação Física. Dor, tontura ou mal-estar? Pare e procure avaliação. + selo | 21 |
| Boas-vindas | Privacidade | Seus dados ficam só neste aparelho. | 6 |
| Boas-vindas | Botão e link | Entendi, vamos começar · Como funciona | 5 |
| | **Total à vista** | | **46** |
| Boas-vindas | Dentro de "Como funciona" (fechado) | Monta o treino com o seu equipamento, para ganhar músculo. · Mostra como fazer cada exercício. · Sugere a carga da próxima vez. · Mostra a fonte de cada escolha e a força da evidência. · Perfil, treino e respostas ficam só neste aparelho. Exporte ou apague tudo em Meus dados. · Ver o guia de exercícios | 52 |

Risco: a promessa de evidência e o guia ficam um toque abaixo, e quem não abre não sabe que o app mostra a fonte. "Em 5 passos" precisa continuar verdade se o cadastro mudar de tamanho. Muda regra? Só tela.

### Versão C: "O combinado"
Duas colunas curtas que dizem quem faz o quê. A segurança vira a parte da pessoa no acordo, em vez de um aviso jurídico.

| Tela | Elemento | Texto proposto | Palavras |
|---|---|---|---:|
| Boas-vindas | Título | **Seu treino, com o que você tem** | 7 |
| Boas-vindas | Coluna "O app" | Monta o treino com o seu equipamento. · Mostra como fazer e sugere a carga. | 2 + 14 |
| Boas-vindas | Coluna "O app não" | Diagnostica nem substitui médico ou profissional de Educação Física. + selo | 3 + 10 |
| Boas-vindas | Coluna "Você" | Para e procura avaliação se sentir dor, tontura ou mal-estar. | 1 + 10 |
| Boas-vindas | Privacidade | Seus dados ficam só neste aparelho. | 6 |
| Boas-vindas | Botão e link | Combinado, vamos começar · Ver o guia de exercícios | 8 |
| | **Total** | | **61** |

Risco: some a promessa de evidência (ela teria de voltar como 4ª linha, +6 palavras). "Combinado" grava o mesmo `avisoAceitoEm` que "Entendi", e soa mais como compromisso **[opinião]**. Muda regra? Só tela.

### Comparação
| Versão | Palavras à vista | Diz evidência? | Diz "não faz"? | Diz privacidade? | Risco principal |
|---|---:|---|---|---|---|
| Hoje | 180 | sim | sim | sim (longo) | ninguém lê até o botão (ele fica a 130% da altura) |
| **A, "Três linhas"** | **63** | sim | sim | sim | nenhum que eu veja |
| B, "Uma frase e um botão" | 46 (+52 fechadas) | só na dobra | sim | sim | evidência escondida |
| C, "O combinado" | 61 | não (+6 para pôr) | sim | sim | tom de contrato |

---

## 2. Triagem

### 2.1 As 9 condições, uma a uma
Formato: a pergunta fica no título ("Alguma destas vale para você?"), e cada condição vira uma frase sem "Você…?". **O começo em negrito é o rótulo** (seção 2.2). O mesmo texto serve na lista, no modo uma a uma (com Sim e Não embaixo) e na tela de pausa ("Você respondeu sim em:").

| # | Atual | Proposta | Palavras | O que se perderia | Muda regra? |
|---:|---|---|---:|---|---|
| 1 | Algum médico já disse que você tem problema no coração ou pressão alta? | **Problema no coração ou pressão alta**, dito por um médico | 13 → 10 | nada ("dito por um médico" = "algum médico já disse") | ver nota abaixo |
| 2 | Você sente dor no peito em repouso, no dia a dia ou quando faz esforço? | **Dor no peito**: parado, no dia a dia ou no esforço | 15 → 11 | nada ("parado" = "em repouso") | ver nota |
| 3 | Nos últimos 12 meses, você perdeu o equilíbrio por tontura ou desmaiou? | **Desmaio, ou tontura com perda de equilíbrio**, nos últimos 12 meses | 12 → 11 | nada | ver nota |
| 4 | Você tem alguma doença crônica diagnosticada além de problema no coração ou pressão alta? | **Outra doença crônica** diagnosticada, além de coração ou pressão | 14 → 9 | nada | ver nota |
| 5 | Você toma remédio receitado para alguma doença crônica? | **Remédio receitado** para doença crônica | 8 → 5 | nada ("receitado" fica) | ver nota |
| 6 | Você tem hoje (ou teve nos últimos 12 meses) problema em osso, articulação, músculo ou tendão que pode piorar com exercício? | **Problema em osso, articulação, músculo ou tendão** que pode piorar com exercício, agora ou nos últimos 12 meses | 21 → 18 | nada (os 4 tecidos, "agora", "12 meses" e "pode piorar com exercício" ficam) | ver nota |
| 7 | Algum médico já disse que você só deveria fazer exercício com acompanhamento? | **Um médico disse** para você só treinar com acompanhamento | 12 → 9 | nada | ver nota |
| 8 | Você está grávida ou teve bebê nos últimos 6 meses? | **Gravidez, ou parto** nos últimos 6 meses | 10 → 7 | nada ("parto" = "teve bebê", inclui cesárea) | ver nota |
| 9 | Você está com febre, gripe forte ou se recuperando de alguma doença agora? | **Febre, gripe forte** ou se recuperando de alguma doença, agora | 13 → 10 | nada | ver nota |
| | **Soma** | | **118 → 90** | | |

**Nota "muda regra?":** nenhum critério muda, e o texto continua próprio, no estilo do PAR-Q+, sem copiar o oficial (`seguranca.triagem.texto`). Mas é o texto que a pessoa responde sobre a própria saúde: **trate como mudança que só entra com o OK explícito do Gustavo**, e registre a data da revisão na nota de `seguranca.triagem.texto`. A troca de pergunta ("Você…?") por frase debaixo de uma pergunta só também pede esse OK **[opinião: continua no estilo do PAR-Q+, porque cada linha ainda é respondida com sim ou não]**. Os textos ficam em `src/domain/triagem/index.ts` (`PERGUNTAS`): mudar quebra os testes que conferem o texto.

**Cortes que considerei e não proponho** (cada um perde um critério):
| Corte | O que se perderia |
|---|---|
| "Dor no peito" sozinho, ou "em qualquer momento" | a lista dos 3 momentos ajuda a lembrar da dor que só aparece no esforço |
| "Tontura ou desmaio" sem "perda de equilíbrio" | qualquer tontura leve vira "sim"; o critério de hoje é a tontura que derrubou o equilíbrio |
| "no último ano" no lugar de "nos últimos 12 meses" | pode ser lido como o ano passado do calendário |
| "Remédio contínuo" ou "remédio de uso diário" | troca o critério ("receitado para doença crônica") |
| "Problema ortopédico" ou "lesão" | jargão, e deixa de fora músculo e tendão, ou o problema que não é lesão |
| "Grávida" sozinho | perde os 6 meses depois do parto |
| "Doente agora" sozinho | perde quem está se recuperando |
| Exemplos em "doença crônica" (diabetes, asma, rim…) | ajudaria quem não sabe o que é "crônica", mas muda quem responde "sim": **muda regra**, fica só registrado |

### 2.2 Rótulos curtos (2 a 4 palavras, com ícone) e a frase completa
Duas formas de usar:
- **T-A (recomendada):** o rótulo é o **começo em negrito da própria frase** (tabela 2.1). Nada se repete, e a frase nunca aparece sem o resto.
- **T-B:** o rótulo numa linha, com ícone, e o complemento logo abaixo, em letra normal. Rótulo e complemento juntos dizem o critério inteiro.

| # | Rótulo (T-B) | Palavras | Complemento logo abaixo (T-B) | Palavras |
|---:|---|---:|---|---:|
| 1 | Coração ou pressão alta | 4 | um médico já disse que você tem | 7 |
| 2 | Dor no peito | 3 | parado, no dia a dia ou no esforço | 8 |
| 3 | Desmaio ou tontura | 3 | com perda de equilíbrio, nos últimos 12 meses | 7 |
| 4 | Outra doença crônica | 3 | diagnosticada, além de coração ou pressão | 6 |
| 5 | Remédio receitado | 2 | para doença crônica | 3 |
| 6 | Osso, articulação, músculo, tendão | 4 | problema agora ou nos últimos 12 meses que pode piorar com exercício | 12 |
| 7 | Só com acompanhamento | 3 | um médico disse para você só treinar assim | 8 |
| 8 | Gravidez ou parto | 3 | grávida agora, ou parto nos últimos 6 meses | 8 |
| 9 | Doente agora | 2 | febre, gripe forte ou se recuperando de alguma doença | 9 |
| | **Soma** | **27** | | **68** |

**O rótulo nunca pode ficar sozinho**, nem numa versão "compacta" e nem com o complemento escondido num "ver mais": sozinho, ele perde o prazo (12 e 6 meses), o "receitado", o "pode piorar com exercício" e o "dito por um médico". Isso seria **mudança de regra**, e eu não proponho.

### 2.3 Introdução e botões
| Tela | Elemento | Texto atual | Texto proposto | Palavras | Muda regra? |
|---|---|---|---|---:|---|
| Triagem | Título | Antes de começar, 9 perguntas rápidas | **Alguma destas vale para você?** | 6 → 5 | só tela |
| Triagem | Abertura | Alguma destas vale para você? São perguntas de segurança no estilo do PAR-Q+. Um "sim" não impede o treino; pede uma avaliação antes do programa automático. + selo | Um "sim" não impede o treino. Pode pedir uma avaliação antes. + selo | 29 → 12 | só tela (ver 2.5 sobre o PAR-Q+) |
| Triagem | Explicação do botão | "Nenhuma vale para mim" responde "não" às 9. + selo | (sai: o botão já diz isso; a frase e o selo de `seguranca.triagem.nenhuma` vão para "Por que estas perguntas?") | 11 → 0 | só tela, ver Conflitos |
| Triagem | Botão principal | Nenhuma vale para mim | Nenhuma vale para mim | 4 → 4 | — |
| Triagem | Botão secundário | Sim, alguma vale | Sim, alguma vale | 3 → 3 | — |
| Triagem | Link novo, fechado | — | Por que estas perguntas? | 0 → 4 | só tela |
| Triagem | Dentro do link (fechado) | — | Perguntas do próprio app, no estilo do PAR-Q+, um questionário de segurança antes do exercício. O app não diagnostica. + selo · "Nenhuma vale para mim" responde "não" às 9. + selo | (+29, fechado) | só tela |
| | **Introdução e botões** | | | **53 → 28** | |

"Pode pedir" é mais exato que o "pede" de hoje, porque um "sim" só na condição 6 não pausa o programa (`seguranca.triagem.osteoarticular`). Os botões continuam **no fim da lista**, não fixos embaixo: é o que garante que a pessoa passe pelas 9 (`seguranca.triagem.nenhuma`).

### 2.4 Três formatos para a lista (alternativas bem diferentes)
| Formato | Como fica | Palavras (intro + lista) | Para bater o olho | Risco |
|---|---|---:|---:|---|
| Hoje | 9 perguntas "Você…?" numeradas | 171 | 171 | ler tudo para dizer "nenhuma" |
| **T-A, "Lista enxuta" (recomendada)** | 9 frases, cada uma começando em negrito (tabela 2.1) | **28 + 90 = 118** | ~27 em negrito | pequeno: o critério está na mesma linha do negrito |
| T-B, "Rótulo e ícone" | rótulo com ícone + complemento embaixo (tabela 2.2) | 28 + 27 + 68 = 123 | 27 | ler só os rótulos e pular os prazos; mais alto na tela (2 linhas por item) |
| T-C, "Por quando" | 3 grupos com cabeçalho: **"Um médico já disse que você:"** (coração ou pressão alta; só treinar com acompanhamento) · **"Agora, você:"** (dor no peito parado, no dia a dia ou no esforço; outra doença crônica diagnosticada; remédio receitado para doença crônica; febre, gripe forte ou se recuperando; grávida ou teve bebê há menos de 6 meses) · **"Nos últimos 12 meses, você:"** (desmaiou ou perdeu o equilíbrio por tontura; teve ou tem problema em osso, articulação, músculo ou tendão que pode piorar com exercício) | 28 + 90 = 118 | 3 cabeçalhos | o prazo fica no cabeçalho, longe do item; o modo uma a uma e a tela de pausa precisam das frases completas de qualquer jeito (dois textos para manter) |

Altura **[opinião: estimativa, a medir]**: com T-A, a maioria das condições cabe em 1 ou 2 linhas (a 6 ocupa 3), e a tela deve cair de 1,52 para ~1,2 alturas a 412 px, com os botões ainda no fim da lista.

### 2.5 "No estilo do PAR-Q+": pode ficar só no "saiba mais"?
**Sim, e isso não muda regra.** `seguranca.triagem` fala do método (as perguntas seguem o estilo do PAR-Q+), não de mostrar o nome na tela. E `seguranca.triagem.texto` pede para **não usar a marca** até confirmar a licença: tirar o nome da abertura deixa o app **mais perto** dessa regra, não mais longe. Proponho que o nome apareça só dentro de "Por que estas perguntas?" e na fonte do selo (`parq2025`), sempre como referência ("no estilo do"), nunca no título nem como se fosse o questionário oficial.

Detalhe técnico que afeta isso: hoje o selo é um texto com `title`, que **não abre no toque do celular**. Se a menção vai para o "saiba mais", ele precisa ser um elemento que abre de verdade (ver Conflitos).

### 2.6 As outras telas da triagem
| Tela | Elemento | Texto atual | Texto proposto | Palavras | Muda regra? |
|---|---|---|---|---:|---|
| Triagem, uma a uma | Título | Antes de começar, 9 perguntas rápidas | Quais valem para você? | 6 → 4 | só tela |
| Triagem, uma a uma | Abertura | Responda uma a uma. Um "sim" não impede você de treinar, mas pede uma avaliação antes do programa automático. + selo | Marque Sim ou Não em cada uma. + selo | 22 → 8 | só tela (o "um sim não impede" já foi dito na tela anterior) |
| Triagem, uma a uma | Cada item | a pergunta "Você…?" | a frase da tabela 2.1, com Sim e Não | 118 → 90 | ver nota de 2.1 |
| Triagem, osso | Ajuda das regiões | Para cada região, o app pergunta a dor de hoje. Acima de 5, os exercícios que carregam a região ficam de fora; de 3 a 5, o app prefere outros; até 2, o programa fica normal, com um lembrete. + selo | Acima de 5, saem os exercícios que forçam a região; de 3 a 5, o app evita esses; até 2, segue com um lembrete. + selo | 42 → 25 | só tela (os 3 limites ficam) |
| Triagem, osso | Pergunta da dor | E hoje, dói no ombro? De 0 (nada) a 10 (a pior dor) | (igual) | — | — |
| Triagem, osso | Fim | Dor forte, que piora ou que dura mais de 1 a 2 semanas pede avaliação profissional. | (igual: segurança, não encurto) | 16 → 16 | — |
| Triagem, pausa | Título | Vamos pausar o programa automático | Primeiro, uma avaliação | 5 → 3 | só tela |
| Triagem, pausa | Mensagem (`avaliarTriagem`, em `src/domain/triagem`) | Antes de começar, procure um médico ou profissional de Educação Física. O programa automático fica disponível quando você confirmar que foi avaliado e liberado. + selo | Procure um médico ou profissional de Educação Física. Depois da liberação, confirme aqui e o app monta seu treino. + selo | 27 → 20 | só tela (texto do domínio: quebra teste que confere a frase) |
| Triagem, pausa | Ajuda | O app não pede o nome nem o registro do profissional: só guarda, neste aparelho, a data da sua confirmação. | O app não pede nome nem registro. Guarda só a data, neste aparelho. | 20 → 13 | só tela |
| Triagem, pausa | Caixa de confirmar | Confirmo que fui avaliado e liberado por um médico ou profissional de Educação Física | Um médico ou profissional de Educação Física me avaliou e me liberou | 14 → 12 | só tela, **mas pede OK**: é a frase que a pessoa "assina" (`seguranca.triagem`) |
| Triagem, pausa | Botões | Continuar com a liberação · Revisar respostas | Continuar com a liberação · Rever respostas | 6 → 6 | — |

**Não proponho, mas registro:** trocar as 9 perguntas uma a uma de "Sim, alguma vale" por "marque as que valem" encurtaria muito esse caminho. Isso é **mudança de regra** (`seguranca.triagem.nenhuma` diz "leva às 9 perguntas, uma a uma") e é decisão de fluxo, não de texto.

---

## 3. Resto do cadastro
| Tela | Elemento | Texto atual | Texto proposto | Palavras | Muda regra? |
|---|---|---|---|---:|---|
| Nível | Título | Sua experiência com musculação | Sua experiência | 4 → 2 | só tela |
| Nível | 1ª pergunta | Há quanto tempo você treina musculação sem parar? | Há quanto tempo você treina sem parar? | 8 → 7 | só tela |
| Nível | Ajuda da 1ª | Conte só o tempo contínuo, sem pausas de meses. | Conte desde a última pausa de meses. | 9 → 7 | só tela |
| Nível | Opções da 1ª (`domain/nivel`) | Menos de 6 meses · De 6 meses a 2 anos · Mais de 2 anos | Menos de 6 meses · 6 meses a 2 anos · Mais de 2 anos | 14 → 13 | só tela |
| Nível | Ajuda da 2ª | Depois de uma pausa, o programa começa com semanas mais leves. | Depois de uma pausa, o começo é mais leve. | 11 → 9 | só tela |
| Nível | Opções da 2ª (`domain/nivel`) | Estou treinando (ou parei há menos de 2 semanas) · … | Sim, ou parei há menos de 2 semanas · (as outras 3, iguais) | 27 → 26 | só tela. "Sim" sozinho perderia o "menos de 2 semanas": não proponho |
| Nível | 3ª pergunta | Você tem confiança na técnica dos exercícios básicos (agachamento, supino, remada)? | Você faz agachamento, supino e remada com confiança? | 11 → 8 | só tela ("confiança" fica, porque é o critério de `nivel.classificacao`) |
| Nível | Opções da 3ª (`domain/nivel`) | Sim, faço os exercícios básicos com segurança · Mais ou menos · Não | Sim · Mais ou menos · Não | 11 → 5 | só tela |
| Nível | Motivo (exemplo: iniciante pela técnica) | Sem confiança total na técnica básica: começamos pelo aprendizado. | Técnica ainda sem confiança: começamos aprendendo. | 9 → 6 | só tela |
| Nível | Regra | Na dúvida, classificamos para baixo. + selo | Na dúvida, começamos mais leve. + selo | 8 → 6 | só tela |
| Nível | Baixar o nível | Quer começar num nível mais leve? | Prefere um nível mais leve? | 6 → 5 | só tela |
| Nível | Ajuda de baixar | Você pode escolher um nível abaixo do sugerido, nunca acima. | (sai: as opções já só mostram os níveis abaixo) | 10 → 0 | só tela; a regra continua no código |
| Rotina | Título | Sua rotina de treino | Sua rotina | 4 → 2 | só tela |
| Rotina | Ajuda dos dias | Com 2 a 6 dias dá para treinar cada músculo cerca de 2 vezes por semana. + selo | Com qualquer opção dá para treinar cada músculo umas 2 vezes por semana. + selo | 19 → 14 | só tela |
| Rotina | Opções de dias | 2 dias · 3 dias · 4 dias · 5 dias · 6 dias | 2 · 3 · 4 · 5 · 6 (a pergunta já diz "dias por semana") | 10 → 5 | só tela |
| Rotina | Minutos | Quantos minutos por treino? · Tempo total, com aquecimento e descansos. | (igual) | — | — |
| Rotina | 3ª pergunta | Quais grupos você quer priorizar? (opcional) | Quer focar em algum músculo? (opcional) | 6 → 6 | só tela |
| Rotina | Ajuda da 3ª | Os grupos prioritários recebem mais séries; os outros ficam no mínimo que já gera resultado. Priorizar muitos grupos pede mais tempo. + selo | Os escolhidos ganham mais séries; os outros ficam no mínimo que já dá resultado. Escolher muitos pede mais tempo. + selo | 23 → 20 | só tela (o "mínimo que já dá resultado" fica: é o que o selo de `volume.semanal.minimo-eficaz` sustenta) |
| Equipamento | Abertura | Comece pelo lugar: um toque marca o equipamento típico. Depois é só ajustar. | (sai: repetia a ajuda logo abaixo) | 13 → 0 | só tela |
| Equipamento | Ajuda dos atalhos | Um toque marca o equipamento típico do lugar; depois é só tirar o que não tiver. + selo | Um toque marca o que esse lugar costuma ter. Depois, tire o que faltar. + selo | 19 → 15 | só tela |
| Equipamento | "Às vezes tem" | Às vezes tem (toque no que você tiver) | Também tem algum destes? | 8 → 4 | só tela |
| Equipamento | Foto | Tire ou escolha até 3 fotos do lugar onde você treina. As fotos são reduzidas e perdem a localização no seu celular antes de sair; nada fica guardado no servidor. | Até 3 fotos do lugar onde você treina. Antes de sair do celular, elas encolhem e perdem a localização. Nada fica no servidor. | 30 → 23 | só tela. **A privacidade da foto continua inteira**: reduzida, sem localização, nada no servidor, antes do envio |
| Equipamento | Ponte para a lista | Ou toque item por item. Sem nada marcado, o programa usa o peso do corpo. | Ou marque item por item. Sem nada marcado, o treino usa o peso do corpo. | 15 → 15 | só tela |
| Equipamento | Halteres | Isso define as cargas que o app pode sugerir. | Assim o app só sugere cargas que você tem. | 9 → 9 | só tela (mais claro, mesmo tamanho) |
| Equipamento | Menor anilha (exemplo) | … É o passo para subir a carga. Se não souber, o app usa 2 kg. + selo | … É o quanto a carga sobe. Não sabe? O app usa 2 kg. + selo | 23 → 19 | só tela |
| Tudo certo? | Dor da triagem | Pela triagem: + selo | Pelas perguntas de saúde: + selo | 5 → 5 | só tela |
| Tudo certo? | Botão | Gerar meu programa | Montar meu treino | 3 → 3 | só tela |

Somas das linhas acima: nível 128 → 94 (a tela respondida ~118 → ~84); rotina 62 → 47 (~98 → ~83); equipamento 117 → 85 (~263 → ~231, e ~383 → ~351 com "academia completa"); "Tudo certo?" 27 → 27.

**Equipamento:** depois do corte, o que sobra são os **nomes dos cartões e dos detalhes** (com "academia completa", dezenas de itens marcados à vista). Isso é varredura, não leitura, e o ganho de verdade é de layout: por exemplo, depois do atalho, mostrar "Marcamos 17 itens de academia. Tire o que faltar." (9 palavras) e as categorias fechadas. Fica para o papel de fluxo ou visual (ver Conflitos).

---

## 4. "Seu treino" (a 1ª tela depois do cadastro)
**Onde o texto pesa (177 palavras, 105 à vista):** os nomes dos 6 exercícios (~30), a linha "RIR 3–4 · descanso 1:45" repetida 6 vezes (24), os 6 "Detalhes", e três frases: a faixa de ajuste, a fase da semana e o link de outro local. Só essas três são texto corrido, e a fase é a única com jargão ("volume", "RIR", "superséries").

| Tela | Elemento | Texto atual | Texto proposto | Palavras | Muda regra? |
|---|---|---|---|---:|---|
| Seu treino | Faixa de ajuste | Alguns músculos ficaram abaixo da meta. Dá para ajustar. · Ver opções | Alguns músculos abaixo da meta. · Ver opções | 11 → 7 | só tela |
| Seu treino | Fase (iniciante; prefixo em `Programa.tsx`, texto em `domain/gerador`) | **Você está na semana 1.** Fase de aprendizado: foco na técnica, volume no mínimo, RIR 3–4 e sem superséries. + selo | **Semana 1: aprender a técnica.** Menos séries, e pare 3 a 4 repetições antes do limite. + selo | 22 → 17 | só tela. "Sem superséries" sai porque a pessoa não tem o que fazer com a informação (o app já não monta superséries); continua em "Sobre o programa" e na regra `iniciante.fase-aprendizado` |
| Seu treino | Outro local | Treina em mais de um lugar? Cadastre outro local | + Outro lugar de treino | 9 → 4 | só tela |
| Seu treino | Linha de cada exercício (×6) | RIR 3–4 · descanso 1:45 | reserva 3–4 · descanso 1:45 | 4 → 4 | só tela (a palavra fica explicada uma vez, na fase) |
| Seu treino | Botão | Começar o treino Corpo todo A | Começar Corpo todo A | 6 → 4 | só tela |
| Seu treino | Dobra do fim | Sobre o programa: avisos e o porquê | Avisos e o porquê | 7 → 4 | só tela |

Total: ~177 → ~158. Quem lê só o que está à vista lê ~85 palavras, quase todas nomes de exercício e números.

---

## Conflitos com outros papéis
1. **Selo de 1 palavra × evidência visível.** Minhas contas supõem a pílula de uma palavra ("consenso"), como a design v2 aprovou. O código ainda escreve "consenso de especialistas". Se o papel de evidência quiser o nome completo, some 2 palavras por selo (1ª tela +2, triagem +2).
2. **O selo não abre no celular.** Ele é um `<span title>`, e o `title` não aparece com o toque. Mover "no estilo do PAR-Q+", a frase do "Nenhuma vale" e as fontes para um "saiba mais" só funciona se o selo, ou o link, abrir de verdade com um toque.
3. **"No estilo do PAR-Q+" sai da abertura** (vai para "Por que estas perguntas?"). Não muda regra e reduz o uso da marca, mas o papel de segurança ou de evidência pode querer o nome à vista.
4. **A frase "Nenhuma vale para mim responde não às 9" sai da tela**, com o selo de `seguranca.triagem.nenhuma`, e vai para o "saiba mais". O botão continua dizendo o que faz. Se o papel de evidência exigir esse selo à vista, ele pode ficar junto do botão (+1 palavra).
5. **Rótulo com ícone (T-B) × segurança.** O papel visual pode preferir ícone e rótulo grande. Eu recomendo T-A (negrito no começo da própria frase), porque o rótulo sozinho esconde prazos. **Nenhum layout pode mostrar só o rótulo.**
6. **Botões da triagem no fim da lista × botão fixo embaixo.** O resto do cadastro usa o botão fixo (`acao-fixa`). Na triagem, ele fica no fim de propósito (`seguranca.triagem.nenhuma`). Se o papel de fluxo quiser o botão fixo ali, é **mudança de regra**.
7. **"Sim, alguma vale" → "marque as que valem"**: encurtaria o 2º passo, mas é **mudança de regra** e decisão de fluxo.
8. **Mudar a pergunta para frase debaixo de uma pergunta só** (e a caixa "me avaliou e me liberou"): o texto é de segurança e pede o OK do Gustavo, mesmo sem mudar critério.
9. **Boas-vindas B ("Como funciona") × aceite do aviso.** O botão grava `avisoAceitoEm`: o "não faz" não pode ir para a dobra em nenhuma versão.
10. **Imagem na 1ª tela.** Se o papel visual puser o Boneco grande, a versão B é a que deixa espaço; a A ocupa a tela com as 3 linhas e a faixa.
11. **Equipamento:** o texto corta só ~32 palavras; o grosso (os nomes dos cartões) depende de recolher as categorias depois do atalho, que é layout.
12. **Glossário em todo o app:** "reserva" no lugar de "RIR", "treino" no lugar de "programa", "perguntas de saúde" no lugar de "triagem". Isso precisa valer também nas telas de treino, guia e semana (outros papéis); senão, a mesma coisa terá dois nomes.
13. **Textos que moram em `src/domain/`** (as perguntas, a mensagem de pausa, as fases, as opções de nível): mudar exige ajustar os testes que conferem o texto. Não é regra, mas é trabalho de implementação.
