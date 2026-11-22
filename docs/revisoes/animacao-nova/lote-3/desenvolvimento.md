# Lote 3 · Desenvolvimento sentado com halteres (`desenvolvimento`)

De 15/11/2026. Terceira animação da família dos ombros no motor novo. A ficha da técnica pede **sentado, com as costas e a cabeça apoiadas, encosto a 75–80°**: o banco reto não serve (não tem encosto). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/desenvolvimento.md`.
- Ficha de movimento: `src/engine/novo/dados/movimentos/desenvolvimento.json`.
- Animação: `src/engine/novo/exercicios/desenvolvimento.ts`, sobre o núcleo comum dos desenvolvimentos (`exercicios/empurrar-para-cima.ts`), que o desenvolvimento com kettlebell também usa.
- **Banco regulável:** `src/engine/novo/pecas-de-cena/banco-regulavel.ts` (ver "O equipamento"; até 15/11/2026 era a peça provisória `banco-regulavel-provisorio.ts`).
- Regras novas medidas: `src/engine/novo/regras/ombros.ts`; `lombar-neutra` e `antebraco-na-vertical` são as de `conferir.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-desenvolvimento.png`. Quadros grandes: `../quadros/desenvolvimento.png`.

## Como o núcleo resolve cada quadro

- **Sentado:** o banco regulável da tabela, com o encosto a 78°. A bacia inclina 16° para trás; a altura dela sai do contato das nádegas com o assento e a posição para trás, do contato das costas com o encosto (o estofado afunda 1 cm); a extensão do pescoço sai do contato da nuca com o encosto. Nada disso é número escolhido.
- **O braço:** o úmero sai do ombro com uma elevação (de 24° abaixo da horizontal embaixo a 80° acima no topo) e o cotovelo 30° à frente do plano do corpo; o antebraço fica na vertical o tempo todo, e o cotovelo dobra o que falta. Assim a mão sobe e "fecha um pouco" sozinha (de 43 para 23 cm do meio do corpo). A clavícula e a escápula acompanham pelo ritmo do esqueleto.
- **Os halteres:** palmas para a frente, cabo atravessado.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Encosto a 75–80°, não a 90° | consenso | encosto a 78° | sim |
| Sentado com as costas e a cabeça apoiadas, pés firmes no chão | consenso | costas e nuca encostadas (0 cm da face do encosto, afundando 1 cm); pés a 16 cm do meio, parados (0 cm); bacia parada (0 cm) | sim |
| Halteres na altura das orelhas | consenso | embaixo, o centro da mão fica 1 cm acima da orelha | sim |
| Cotovelos um pouco à frente do corpo (~20° a ~45°) | consenso | 30° à frente do plano do corpo | sim |
| Antebraços na vertical, palmas para a frente | consenso | o antebraço desvia 0° da vertical; palmas para a frente (pronação 30° a partir do polegar para cima) | sim |
| Subida ~1–1,5 s: para cima e levemente para dentro, sem bater os halteres | consenso | 1,3 s; a mão vai de 43 a 23 cm do meio do corpo; as pontas de dentro dos halteres ficam a no mínimo 12,4 cm uma da outra; a carga passa a no mínimo 14,3 cm da cabeça | sim |
| Topo: cotovelos quase estendidos, braços sobre os ombros | consenso | cotovelo a 10°; o centro da mão a 5,3 cm da vertical do ombro | sim |
| Descida ~2–3 s, até a altura das orelhas | consenso | 2,4 s, pelo mesmo caminho | sim |
| A lombar não arqueia | consenso | lombar sem flexão ou extensão além da curva de repouso (0°) | sim |

Conferência automática: **0 falha**. Avisos: as linhas que são escolha de desenho (a inclinação da bacia, a cabeça, quanto o estofado afunda, onde ficam os pés, a massa do halter) e o trapézio de cima listrado como "só ajuda" (fora da lista do conteúdo; é o desenho de hoje). Ritmo: salto de 7,1%. O corpo entra até 1 cm no estofado (tolerância 2,5). A elevação do braço chega a 158,5° (média 170°).

## As vistas

A primeira é a **de lado**: mostra o encosto, as costas e a cabeça apoiadas, os cotovelos à frente e o erro de arquear; é também a vista padrão do modo Músculos (a frente do ombro: 40 cm² de lado, 0 de frente). A segunda é a **de frente**: mostra os antebraços na vertical, o "sobe e fecha um pouco" e o erro de descer pouco. O erro "cotovelos para trás" é mostrado **de cima** (de frente e de lado, o cotovelo atrás da linha do corpo quase não se vê). Testei a de três quartos (`quina`): no começo o halter de perto cobre o rosto.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Arquear a lombar (de lado) | no topo, a lombar arqueia 22° e a torácica 8°, a bacia inclina 14° à frente no assento e as costas de baixo saem do encosto; o peito vai a 27° atrás da vertical (no certo, 15°) |
| Cotovelos para trás (de cima) | embaixo, os cotovelos ficam 15° atrás da linha do corpo (no certo, 30° à frente) |
| Descer pouco (de frente) | a descida para com o úmero 35° acima da horizontal: o centro da mão a 154 cm do chão, 32 cm acima da orelha |

## O equipamento

- **Banco regulável: peça provisória.** A tabela de objetos tem as medidas do banco regulável (`bancoRegulavel`, e os volumes da conferência em `pecas.ts`), mas não havia peça desenhada, e outro colega a desenha nesta rodada num ramo que este lote não vê. Como a ficha pede encosto (o banco reto não serve), desenhei uma peça mínima no mesmo gerador realista do banco reto (`pecas-de-cena/banco-regulavel-provisorio.ts`: dois estofados com costura, a viga e os pés de tubo, a coluna da dobradiça e a haste do encosto), com as mesmas medidas. **Quem integra deve trocá-la pela peça do colega** (a animação só usa `bancoRegulavelProvisorio` e `faceDoEncosto`). O assento e o que fica debaixo dele vão 30 cm para trás na pintura, para as coxas ficarem por cima (sem isso, de frente, o assento aparecia por cima do quadril).
- **Atualização (15/11/2026, lote 5):** a peça provisória e o banco inclinado da rosca inclinada viraram uma peça só, `pecas-de-cena/banco-regulavel.ts` (função `bancoRegulavelNaCena`), com o mesmo desenho e os mesmos volumes daqui, mais o trilho debaixo do encosto; o assento vai 50 cm para trás na pintura (eram 30). A conferência continua sem falha; os quadros e a folha foram refeitos (ver `lote-5/rosca-inclinada.md`).
- **Halteres:** o sextavado de 25 lb da tabela.

## Correções já feitas que esta animação respeita

- A lateral do ombro passa a laranja (secundária); a frente do ombro é a principal; o trapézio fica (achado 4 da anatomia, 02/11). O trapézio de cima fica listrado ("só ajuda"), como hoje.

## Músculos

Frente do ombro (principal), lateral do ombro e tríceps (secundários) e trapézio de cima listrado.

## O que não ficou bom

- **O banco era provisório** (ver acima): desde 15/11 é a peça única do banco regulável, `pecas-de-cena/banco-regulavel.ts`.
- **A base do banco é comprida:** de lado, a viga de 143,5 cm da tabela alarga a cena e o corpo fica um pouco menor que no búlgaro (quadro `lateral:tec:f0`). É a medida do banco.
- **De lado, o fio do rótulo "cotovelos um pouco à frente" passa sobre o braço** (é o ponto do cotovelo, que fica na frente do corpo).


## Correção de 19/11 (cabeça de cima; auditoria das aprovadas antigas)

O Gustavo autorizou em 19/11 corrigir as aprovadas antigas com o defeito achado nas auditorias das fases A e B: de cima, a cabeça fica dentro da silhueta dos ombros, e o contorno único do Boneco (um só, por fora) não a desenhava; sobrava o calombo do rosto. A vista de cima **não** está nas `vistas` do exercício (lateral e frontal): o guia a mostra só no erro "Cotovelos para trás". A regra mede as vistas do guia (as do exercício e as dos erros), e o quadro liga o contorno da cabeça de cima no ciclo e nos erros.

**A mudança.** O quadro liga, só na vista de cima (`viesNaVista: { cima: { cabeca: 1 } }`), a opção `cabeca` do Boneco (acréscimo de 18/11, desligada por padrão; a mesma das elevações corrigidas e do quadril na máquina): a cabeça é pintada de novo por cima do corpo, com o contorno próprio. A pose, o movimento, as peças, os rótulos e as outras vistas não mudam; o núcleo comum, quando há, também não (o exercício embrulha o quadro dele). A ficha liga a regra comum `cabeca-aparece-em-cada-vista` (`src/engine/novo/regras/vistas-do-guia.ts`).

| vista de cima | antes (`72d00fc`) | depois |
|---|---|---|
| quadros em que a cabeça sumiria / com contorno próprio | 8 / **0** | 8 / 8 |
| eixo do tórax e quem olha (mínimo); contorno da cabeça dentro da silhueta (máximo); a cabeça à frente do tronco (máximo) | 14,7°; 67,9%; 12,2 cm | iguais (a pose não mudou) |

No estado de antes, com a regra na ficha, a conferência dá 1 falha (esta regra). No estado novo: 0 falhas e os mesmos avisos de antes. O antes e depois está em `correcao-das-antigas/desenvolvimento.png`; os quadros grandes foram regravados (`quadros/desenvolvimento.png`).
