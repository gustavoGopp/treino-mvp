# Lote A2 · Rosca martelo com elástico (`rosca-martelo-elastico`)

De 17/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Em pé, os dois pés inteiros no meio do tubo com pegadores, um pegador em cada mão, palmas uma para a outra; os dois antebraços sobem juntos até as mãos chegarem perto dos ombros. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-martelo-elastico.md`. Cartão do app: `src/conteudo/exercicios/rosca-martelo-elastico.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-martelo-elastico.json`.
- Animação: `src/engine/novo/exercicios/rosca-martelo-elastico.ts`, sobre o braço das roscas (`dobrar-o-cotovelo.ts`) e o caminho do tubo da rosca com elástico aprovada (`bordasDaSola`, de `rosca-elastico.ts`, que já era exportada). Sem regra nova: todas as regras já existiam (`regras/roscas.ts`, `regras/elasticos.ts`, `conferir.ts`).
- Quadros grandes: `../quadros/rosca-martelo-elastico.png`. **Sem folha** ao lado da de hoje: este exercício não tinha animação.

## Onde os números saem

A ficha da técnica dá a técnica em palavras (pegada neutra; cotovelos colados, só eles dobram) e a segurança (pés inteiros sobre o elástico, `ng2022`). Como não há animação de hoje, o que ela não dá em número saiu das duas animações aprovadas de que este exercício é a soma: a **rosca com elástico** (o corpo em pé, os pés no meio do tubo, os ângulos do cotovelo, os erros de cotovelo e de tronco) e a **rosca martelo com halteres** (a pegada neutra, sem girar). Cada linha da ficha de movimento diz de onde.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, os dois pés inteiros no meio do elástico | consenso | os dois pés parados no chão (0 cm no ciclo), o calcanhar no chão (0 cm acima da bola do pé); o tubo passa sob a sola a 50% do caminho do calcanhar à bola, a 0,6 cm do chão | sim |
| Uma ponta em cada mão | consenso | o centro de cada mão fica a 0 cm do pegador; o tubo desce pelo lado de fora das pernas e passa a no mínimo 2,9 cm da pele | sim |
| Pegada neutra (palmas uma para a outra), sem girar | consenso | o polegar fica a 0° da posição neutra o ciclo todo | sim |
| Braços estendidos ao lado do corpo (embaixo, "quase estendidos") | consenso | embaixo, o cotovelo dobra 8° | sim |
| Cotovelos colados, só eles dobram | consenso | o cotovelo anda 0 cm enquanto dobra de 8° a 132°; o braço fica a 0° à frente da linha do tronco e 10° aberto para o lado | sim |
| Mãos em direção aos ombros, "perto dos ombros" em cima | consenso | em cima, o centro da mão fica a 26,3 cm do centro do ombro (8,4 cm abaixo dele) | sim |
| ~1 s subindo, pausa curta no alto, ~2 s descendo | consenso | 1,1 s, 0,4 s e 2,2 s (mais 0,5 s embaixo, como a rosca com elástico aprovada); salto de velocidade de 6,1% (limite 15%) | sim |
| Tronco parado | consenso | a base do pescoço não se mexe (0 cm) | sim |
| O elástico estica sem passar do máximo do fabricante | medida (objetos) | de 1,4 a 2,3 vezes o comprimento em repouso (o máximo é 3) | sim |

**Conferência automática: 0 falha, 4 avisos**, os mesmos quatro da rosca com elástico aprovada: (1) o elástico está mais esticado em cima do que no primeiro quadro (o aviso mede "mais esticado no começo"; numa rosca o tubo estica ao subir, como deve); (2) as linhas de escolha de desenho (`braco.paraFora`, `elastico.folgaNaPerna`); (3) o antebraço "só ajuda", fora da lista do conteúdo (como na rosca martelo aprovada); (4) de lado o bíceps aparece pouco (54 cm²); o modo Músculos abre de frente (192 cm²).

## As vistas

As da rosca com elástico aprovada: **de lado** (padrão do modo Técnica: o cotovelo parado e o antebraço subindo) e **de frente** (padrão do modo Músculos; mostra os dois pés no tubo e a pegada neutra). Rótulos: "cotovelos colados" de lado; "pegada neutra" e "pés inteiros no elástico" de frente (de lado, o fio do rótulo da pegada cruzava a coxa no quadro de baixo).

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro (texto do app) | Vista | O que o boneco faz (medido) |
|---|---|---|
| Cotovelos para a frente | de lado | o braço sobe 36° à frente do tronco e o antebraço dobra só 115°: o ombro ajuda a subir |
| Balançar o tronco | de lado | o peito vai a 11° atrás da vertical enquanto as mãos sobem, com a lombar arqueando 6°; o quadril vai à frente pelo equilíbrio |
| Pisar só com a ponta do pé | de lado | o pé direito fica na ponta: o calcanhar sobe 20° (6,8 cm acima da bola do pé) e o joelho dobra 36°; o tubo, que embaixo passa sob a bola do pé, escorrega para a frente enquanto estica e no alto já está na borda da ponta dos dedos (0,4 cm à frente dela): é o elástico que escapa |

O cartão diz a consequência do terceiro erro ("o elástico pode escapar e voltar no rosto"); o que se desenha é o tubo saindo de baixo dos dedos, e não o tubo voando (que seria um instante depois, já fora do exercício). A distância que ele escorrega (`erro.pe.escapa`) e o quanto o calcanhar sobe são escolha de desenho.

## O equipamento

- **Elástico:** o tubo com pegadores de 48 pol da tabela (Rogue; máximo de 3 vezes, TheraBand), o mesmo da rosca com elástico aprovada, afinando ao esticar. Os pegadores ficam de frente para trás na mão (pegada neutra).

## Correções já feitas que esta animação respeita

Não há correção registrada para este exercício em `correcoes-ja-feitas.md` (ele nunca teve animação). Das correções dos exercícios com elástico, valem: o tubo afina ao esticar; o caminho do tubo passa por baixo dos pés, que é o que se desenha; os rótulos fora do corpo; e o antebraço listrado ("só ajuda") das roscas.

## O que não ficou bom

- **No erro do pé, o joelho direito dobra 36°.** O quadril fica parado (só o pé erra), e para o calcanhar subir 6,8 cm o joelho dobra. Numa pessoa de verdade parte disso viria do quadril subindo daquele lado; o núcleo do corpo em pé não inclina a bacia para o lado, e não mexi nele. Lê-se como "o peso na ponta do pé", mas o joelho dobrado chama mais atenção que o calcanhar.
- **De lado, o tubo de perto passa por cima da perna** (a mesma limitação registrada na rosca com elástico aprovada).

## Risco de o Gustavo não gostar

**Baixo.** É a rosca com elástico aprovada com a pegada da rosca martelo aprovada; a técnica confere em tudo. O ponto mais fraco é o erro do pé (joelho dobrado).
