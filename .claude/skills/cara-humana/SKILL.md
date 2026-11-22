---
name: cara-humana
description: Régua de "cara humana" do treino-mvp. Use sempre que criar ou mudar uma tela, um texto de tela ou um campo (src/features/, src/styles.css, src/conteudo/), antes de mostrar a tela ao Gustavo. Confere, tela por tela, se cada frase, cada caixa e cada pergunta fazem falta a quem está treinando, e corta o resto.
---

# Cara humana: o que fica na tela e o que sai

Pedido do Gustavo em 22/11/2026: o app estava "com muita cara de IA", com "frasezinhas desnecessárias" e "quadrinhos que mostram coisas que não precisam". O levantamento e as fontes estão em `docs/revisoes/melhorias/cara-humana/README.md`. Esta régua vale para toda tela nova ou mudada.

## O teste, antes de qualquer regra

Para cada coisa na tela (frase, caixa, ícone, número, pergunta), responda: **o Gustavo diria isto em voz alta a um amigo na academia, neste momento do treino?** Se não diria, sai. Se diria com menos palavras, encurta.

## As sete perguntas, por tela

1. **Uma coisa principal.** Qual é a ação desta tela? Ela é a maior e a mais escura. Todo o resto pesa menos.
2. **Cada frase responde a uma dúvida que a pessoa tem agora?** Frase que explica o que o rótulo já diz, que repete um número da tela ou que avisa de algo que não vai acontecer, sai. Explicação de regra mora em "Entenda o treino" (decisão de 16/11), não embaixo do campo.
3. **Cada número aparece uma vez.** "Série 1 de 2" e dois quadradinhos dizem a mesma coisa: fica um. "1 de 3" e três quadradinhos: fica um.
4. **Cada caixa agrupa alguma coisa de verdade?** Fundo cinza, borda ou cartão só quando separam um grupo do resto. Caixa em volta de uma coisa só, ou caixa que guarda um lugar vazio ("guia em texto"), sai ou vira linha.
5. **Cada pergunta muda o que o app faz?** Se a resposta não muda o programa nem a sugestão de carga, a pergunta não existe. Se muda pouco, o app supõe e deixa corrigir depois (como o kit típico). Nunca peça uma conta que a pessoa faria de cabeça ao contrário (anilhas "por lado" em vez do total).
6. **A palavra é a que se usa na academia?** "Descida", não "excêntrica". "Sobrando 3", não "RIR 3". Sigla só com a explicação na primeira vez.
7. **O vazio diz o que fazer.** Tela sem dado, botão apagado e erro dizem o próximo passo em poucas palavras.

## O que esta régua não corta

- **Texto de segurança** (o aviso da abertura, "Senti algo", a montagem segura, a triagem): só muda com a revisão do Gustavo (`CLAUDE.md`, "Segurança").
- **O que a análise crítica mandou proteger:** o registro com um toque, a tela de descanso, o "Senti algo", a acessibilidade (toque de 44 px ou mais, contraste, leitor de tela). Um rótulo que some da tela continua existindo para o leitor de tela.
- **O motivo de um botão apagado** ("Falta escolher a carga…"): sem ele, a pessoa não sabe por que não consegue tocar.

## Como conferir

1. Fotografe a tela no app de verdade (o passo "Olhar o app" do roteiro `verificar`).
2. Passe as sete perguntas e anote o que sai.
3. Conte antes e depois: palavras visíveis, frases de apoio (`.ajuda`), caixas. O número tem de cair ou ficar igual; se subir, diga por quê no relato.
4. Corte de texto é decisão de produto: mostre ao Gustavo o antes e o depois, uma tela de cada vez.

## De onde vem

Resumo de quatro fontes lidas em 22/11/2026 (links e o que cada uma diz estão no README do levantamento): o artigo "The 3 C's of Microcopy" do Nielsen Norman Group ("every word must serve a purpose"); o guia "Spot the Slop", de Kosta Canatselis ("would our founder actually say this out loud?"); e duas páginas do projeto aberto `ux-skill`, de Laith Aljunaidy (cartão só onde há grupo; uma ação principal por tela). Nenhuma delas é estudo: são prática de quem desenha, e entram aqui como "consenso".
