# Lote 2 · Flexão de braço com as mãos juntas (`flexao-fechada`)

De 15/11/2026, revista na rodada de correção do mesmo dia (o erro dos cotovelos abre mais; os nove itens do padrão conferidos). Primeira animação do lote 2 (as flexões). Ainda não aprovada nem ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/flexao-fechada.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/flexao-fechada.json`.
- Animação: `src/engine/novo/exercicios/flexao-fechada.ts`, sobre o núcleo novo das flexões (`exercicios/flexionar.ts`), tirado da `flexao` sem mudar o resultado dela (os quadros da `flexao`, nos dois corpos, no certo e nos três erros, e a folha dela saíram idênticos antes e depois).
- Regras novas: `src/engine/novo/regras/flexoes.ts` (`maos-por-dentro-dos-ombros`, `cotovelos-rentes`).
- Folha ao lado da de hoje: `../prototipos/folha-flexao-fechada.png`. Quadros grandes: `../quadros/flexao-fechada.png`.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Mãos na largura dos ombros (um pouco menos); de cima, por dentro da linha dos ombros | consenso | o centro da mão fica a 14,4 cm do meio do corpo; a borda de fora da mão, a 18,7 cm; a linha de fora do ombro, a 23,9 cm | sim |
| Mãos abaixo da parte de baixo do peito | consenso | com o corpo embaixo, a mão fica 14 cm do ombro em direção aos pés (na `flexao`, 13 cm: a linha do meio do peito), 3,5 cm além da linha dos mamilos | **em parte**: ver "O que não ficou bom" |
| Cotovelos para trás, rentes ao corpo | consenso | embaixo, o braço faz 8,9° com o tronco, visto de cima (na `flexao`, 43,6°) | sim |
| Prancha: linha reta da cabeça aos calcanhares, o corpo desce inteiro | consenso | ombro, quadril e tornozelo fazem no mínimo 177,9° de lado; a lombar não dobra (0°) | sim |
| Desce até o peito chegar perto das mãos | consenso | embaixo, o peito fica a 5 cm do chão, entre as mãos; o cotovelo dobra 118° | sim |
| Sobe até os braços estenderem | consenso | em cima, o cotovelo dobra 10° | sim |
| Descida ~2 s, subida ~1 s | consenso | 2,0 s e 1,0 s, com as pausas de 0,4 s em cima e 0,35 s embaixo (a cadência da `flexao`) | sim |
| "Diamante" não animado | consenso | as mãos não se tocam (28,8 cm entre os centros) | sim |

Conferência automática: **0 falha**. Avisos: extensão do punho 94,6° em cima (média 70°, máximo observado 95°: o braço fica inclinado para trás porque a mão está mais para os pés que na `flexao`, que tem 94,3°); pronação do antebraço 84,5° (média 80°); extensão dos dedos do pé 76,1° (o mesmo da `flexao`); ritmo com salto de 17,2% no cotovelo na subida (a `flexao` tem 16,2%; abaixo de 25%); as linhas de desenho da ficha (`maos.abaixoDoOmbro`, `tornozelo.dorsiflexao`, `escapula.retracaoEmbaixo`); e a vista de cima, que não serve ao modo Músculos (34 cm² do principal; de lado, 145 cm², é a padrão).

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Cotovelos abertos para os lados (de cima) | embaixo, o braço faz 72,5° com o tronco, visto de cima, como no erro da `flexao` (72°); o certo: 9° |
| Quadril cai (de lado) | a lombar arqueia 16°; ombro, quadril e tornozelo fazem 167° (o certo: 178°); a barriga para a 1 cm do chão |
| Descer pouco (de lado) | para na metade: o peito fica a 17 cm do chão e o cotovelo dobra 83° |

## Músculos

Principais: tríceps e peitoral; secundário: a frente do ombro (`deltAnt`), como a biblioteca conta. O abdômen fica fora do desenho, como a ficha da técnica decidiu ("Se o Gustavo quiser o abdômen listrado, a entrada entra junto com a aprovação"): na `flexao` ele aparece listrado. A vista do modo Músculos é a de lado.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- 12/11/2026: o abdômen firma a prancha, mas fica fora do desenho até a decisão do Gustavo. Respeitada.
- As correções da `flexao` (mãos para fora dos ombros, o quadril que não atravessa o chão no erro) valem pelo núcleo comum; aqui as mãos ficam de propósito por dentro.

## Os nove itens do padrão (seção 8 do guia), nos quadros grandes

1. **Corpo:** a prancha da `flexao` aprovada; nada atravessa o chão.
2. **Rosto:** embaixo, a cabeça fica a 7,9 cm do chão.
3. **Quadro:** o corpo ocupa o quadro como na `flexao`.
4. **Vistas:** de lado e de cima (as mãos na largura dos ombros e os cotovelos rentes, como a ficha pede, "vista de cima"). Testei de três quartos (`quina`, `quinaTras`) e de frente: na de três quartos, os fios dos rótulos cruzam o braço, e o erro dos cotovelos aponta para quem olha; de frente, o corpo vira um borrão. Fica a de cima.
5. **Equipamento:** não tem.
6. **Mãos:** espalmadas no chão.
7. **Erros:** os três se leem. Na correção, o dos cotovelos passou de 51° para 72,5°, como o da `flexao`.
8. **Rótulos:** um de lado e dois de cima, fora do corpo.
9. **Tema escuro e cor de pele:** olhados.

## O que não ficou bom (com o que tentei)

- **As mãos ficam um pouco mais perto do ombro do que a ficha diz** (14 cm, e não 16): com 16 cm, em cima o punho dobra 96,8°, acima do máximo observado (95°). Não se vê no quadro.
- **De cima, o modo Músculos não serve** (o tríceps e o peito ficam por baixo do corpo); a vista de lado é a do modo Músculos (145 cm²).

## Risco de o Gustavo não gostar

**Baixo.** É a `flexao` aprovada com as mãos e os cotovelos trocados, como a ficha manda; as diferenças com a de hoje são pequenas e todas medidas. O erro dos cotovelos agora abre como o da `flexao`.
