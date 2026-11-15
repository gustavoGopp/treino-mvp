# Lote 2 · Flexão de braço com elástico (`flexao-elastico`)

De 15/11/2026, revista na rodada de correção do mesmo dia (o elástico não aparecia de lado: a vista padrão passou a ser a de três quartos, de trás; o pegador no chão saiu). Terceira animação do lote 2. Ainda não aprovada nem ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-elastico.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-elastico.json`.
- Animação: `src/engine/novo/exercicios/flexao-elastico.ts`, sobre o núcleo das flexões (`exercicios/flexionar.ts`): o corpo é o da `flexao` (os quadros do corpo são os mesmos), e a variação acrescenta o elástico à cena.
- Regras novas (em `regras/flexoes.ts`): `elastico-nas-escapulas`, `pontas-sob-as-palmas`.
- Folha ao lado da de hoje: `../prototipos/folha-flexao-elastico.png`. Quadros grandes: `../quadros/flexao-elastico.png`.

## O elástico: o tubo, e não a faixa

A ficha diz "elásticos (qualquer intensidade)" e o texto do app, "um elástico com pegadores ou um elástico longo". Usei o **elástico em tubo** da tabela de objetos (o do `agachamento-elastico`, aprovado: 121,9 cm de tubo, alongamento máximo de 3 vezes, medidas de fabricante). Não fiz a faixa chata: o texto do app aceita o tubo, e ele já tem medida com fonte; a faixa longa seria um objeto novo sem ficha de fabricante lida. O tubo afina ao esticar (o desenho do `elastico` do motor).

Como ele fica: o meio passa pelas costas, sobre a pele (medida na superfície do Boneco), 12 cm abaixo da base do pescoço; de cada lado, passa por fora da parte de trás do ombro e desce até o dorso da mão; dá uma volta na mão (22 cm de tubo por volta, que entram na conta do alongamento) e a ponta fica presa sob a palma. Os pegadores não aparecem: a ponta dá a volta na mão e fica sob a palma, como o "elástico longo" do texto do app. Na primeira entrega, o pegador ficava no chão atrás da mão; ele se lia como um halter e, de três quartos, ficava pintado por cima da coxa.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| O meio do elástico passa pelas costas, na altura das escápulas (abaixo do pescoço) | consenso | 12 cm abaixo da base do pescoço (C7), ao longo da coluna, o ciclo inteiro | sim (o número é escolha de desenho) |
| Cada ponta dá uma volta na mão e fica presa entre a palma e o chão | consenso | a ponta sob a palma não sai do lugar (0 cm); a volta na mão é contada no comprimento, não desenhada | sim, em parte no desenho (ver abaixo) |
| Mãos um pouco mais abertas que os ombros, na linha do meio do peito; corpo em linha reta | consenso | as da `flexao`: mão a 30,4 cm do meio, 13 cm atrás do ombro embaixo; ombro, quadril e tornozelo a no mínimo 177,2° | sim |
| Descida ~2 s, cotovelos a meio caminho do tronco, até o peito chegar perto do chão | consenso | 2,0 s; embaixo, o braço faz 43,6° com o tronco, visto de cima; o peito para a 5 cm do chão | sim |
| Subida ~1 s até os braços estenderem | consenso | 1,0 s; em cima, o cotovelo dobra 10° | sim |
| O elástico estica mais em cima | consenso (física) | estica 1,7 vez em cima (206,6 cm) e 1,2 vez embaixo (149,7 cm); nunca frouxo, longe das 3 vezes do fabricante | sim |

Conferência automática: **0 falha**. Avisos: os mesmos da `flexao` (extensão do punho 94,3°, dedos do pé 76,1°, ritmo com salto de 16,2%, o abdômen listrado fora da lista do conteúdo, a vista de três quartos, de trás, que não serve ao modo Músculos: o modo Músculos usa a de lado, com 84 cm²), mais as linhas de desenho da ficha (`elastico.voltaNaMao`, `elastico.folgaNasCostas`, `elastico.atrasDoOmbro`, além de `tornozelo.dorsiflexao` e `escapula.retracaoEmbaixo`).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Quadril cai (de lado) | o da `flexao`: a lombar arqueia 16°; ombro, quadril e tornozelo fazem 166°; a barriga para a 1 cm do chão |
| Cotovelos abertos a 90° (de três quartos, de trás) | embaixo, o braço faz 72° com o tronco, visto de cima (o certo: 44°); de três quartos, os dois cotovelos se veem abertos |
| Descer pouco (de lado) | para na metade: o peito fica a 16 cm do chão, o cotovelo dobra 78° |
| Elástico sobe para o pescoço (de três quartos, de trás) | o corpo é o certo e não fica pintado (só o elástico muda); o meio do elástico passa 3 cm acima da base do pescoço. O quadro parado é o de cima (instante 0), onde o elástico está mais esticado |

## Músculos

Principal: peitoral; secundários: tríceps e frente do ombro (biblioteca); o abdômen listrado ("só ajuda"), como na `flexao` e na animação de hoje. Vista do modo Músculos: de lado.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- 05/11/2026: o erro `pescoco` ("erro pequeno"), pedido pelo cartão. Respeitado.
- 05/11/2026: o elástico afina quando estica e passa onde a ficha diz (aqui, pelas costas). Respeitado com o tubo.
- 05/11/2026: "de cima, a faixa da flexão aparece só como dois trechos curtos". Aqui, de três quartos por trás, o elástico aparece inteiro: atravessa as costas e desce pelos ombros até as mãos.

## As vistas (rodada de correção)

Testei de lado, de cima, de três quartos (`quina`), de três quartos de trás (`quinaTras`) e de trás (`posterior`). De lado, em cima, o elástico some atrás do braço. De cima, aparece só nas costas. De trás, o corpo vira um borrão de pernas. A de três quartos de trás mostra o elástico atravessando as escápulas e descendo pelos braços, do começo ao fim. Ela passou a ser a vista padrão (Técnica), com o rótulo "elástico nas escápulas". A de lado fica como segunda, para o corpo em linha, o quadril e a descida. O rótulo "cotovelos para trás" saiu, porque de três quartos o fio dele cruzava o corpo.

## Os nove itens do padrão (seção 8 do guia), nos quadros grandes

1. **Corpo:** a prancha da `flexao` aprovada.
2. **Rosto:** embaixo, a cabeça fica a 7,9 cm do chão.
3. **Quadro:** o corpo ocupa o quadro.
4. **Vistas:** ver acima.
5. **Equipamento:** o tubo do gerador realista, que afina ao esticar.
6. **Mãos:** espalmadas, com a ponta do elástico sob a palma.
7. **Erros:** os quatro se leem; o do pescoço não pinta mais o corpo.
8. **Rótulos:** um por vista.
9. **Tema escuro e cor de pele:** olhados.

## O que não ficou bom (com o que tentei)

- **A volta na mão não é desenhada**: o tubo termina no dorso da mão. O motor não tem um tubo que contorne a mão; o comprimento da volta (22 cm de cada lado) entra na conta do alongamento.
- O elástico não entra no equilíbrio (ele empurra o corpo para baixo; a conferência não mede isso).

## Risco de o Gustavo não gostar

**Médio.** O corpo é o da `flexao` aprovada, e o elástico agora aparece inteiro na vista padrão. A vista de três quartos de trás é nova nas flexões, e a volta na mão não aparece.
