# Lote 5 · Tríceps francês na polia com corda (`triceps-frances`)

De 15/11/2026. Primeira animação da família dos tríceps franceses no motor novo. Em pé, um pé à frente do outro, tronco inclinado à frente, de costas para a polia na altura do ombro, a corda segura pelas duas mãos atrás da cabeça. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances.md` (a posição: **em pé**, de costas para a polia; a carga: **polia com corda**).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-frances.json`.
- Animação: `src/engine/novo/exercicios/triceps-frances.ts`, sobre o núcleo da família (`exercicios/triceps-frances-base.ts`), que o halter e o kettlebell também usam.
- Peça nova: a corda de tríceps (`pecas-de-cena/corda-triceps.ts`, medidas em `dados/objetos/corda-triceps.json`).
- Regras novas medidas: `src/engine/novo/regras/triceps-frances.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-triceps-frances.png`. Quadros grandes: `../quadros/triceps-frances.png`.

## Como o núcleo resolve cada quadro

- **O braço parado:** o braço (ombro → cotovelo) é uma direção fixa no tronco: elevado `braco.elevacao` a partir do braço pendurado e puxado `braco.paraDentro` para o meio. Como a direção não muda, a clavícula e a escápula (que acompanham a elevação) também não mudam: o ombro e o cotovelo ficam parados. A conferência mede isso (regra `triceps-frances-braco-parado`: 0 cm e 0°).
- **Só o antebraço:** ele dobra o ângulo do cotovelo da ficha a partir do braço, para trás da cabeça, e gira em volta do braço até as duas mãos ficarem na distância pedida (as duas seguram a mesma corda).
- **A corda:** cada ramo vai reto do centro da mão até a bucha, esticado pelo cabo; a bucha fica onde os dois ramos de 25,2 cm (fora a ponta de borracha e meia mão) se encontram, do lado da polia. O punho fecha com o polegar virado para a bucha (a corda atravessa a mão até ela), e a ponta de borracha fica do lado do dedo mínimo, como na pegada de corda.
- **A polia:** a roldana fica na altura do centro do ombro ("carro mais ou menos na altura do ombro") e a 42 cm da bucha no alongado (o passo à frente que deixa o cabo tenso). A pilha sobe o curso do cabo dividido pela relação da máquina.
- **O corpo:** a inclinação do peito (27°) e a altura da pelve (joelho da frente a 16°) são calibradas a partir da ficha.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Carro mais ou menos na altura do ombro, com a corda | consenso | roldana a 136,9 cm do chão, a altura do centro do ombro; corda de 71 cm (Rogue) | sim |
| Um pé à frente do outro, joelhos destravados | consenso | pé direito 30 cm à frente do meio do corpo, inteiro no chão; o esquerdo 30 cm atrás, na ponta (calcanhar a 30°); joelhos a 16° (frente) e 13° (trás); os pés não saem do lugar (0 cm) | sim |
| Tronco inclinado à frente ~25–30° | consenso | o peito inclina 27° em todos os quadros; a lombar fica na curva de repouso | sim |
| Braços acima da cabeça, ao lado das orelhas, cotovelos apontando para a frente | consenso | braço a 166,6° do braço pendurado (no tronco), 6° para o meio; cotovelos a 30 cm um do outro (ombros: 40,8 cm) | sim |
| Alongado: mãos atrás da cabeça, cotovelos bem dobrados | consenso | cotovelo a 134,8°; o centro da mão fica 20,2 cm atrás da parte de trás da cabeça | sim |
| Extensão em ~1 s, só o cotovelo | consenso | 1,1 s; o cotovelo anda 0 cm e o braço gira 0° no ombro | sim |
| Fim: braços estendidos na linha do tronco | consenso | cotovelo a 8° (sem travar); o braço fica 13° à frente da linha do tronco (é o limite da elevação média do braço, 170°) | sim, com a ressalva |
| Volta em ~2–3 s, as mãos bem para trás da cabeça | consenso | 2,4 s, pelo mesmo caminho | sim |
| Os cotovelos ficam no mesmo lugar do início ao fim | consenso | 0 cm no mundo e no tronco | sim |

Conferência automática: **0 falha, 1 aviso** (as linhas da ficha de movimento que são escolha de desenho: pés, pelve, pescoço, quanto o braço vai para o meio, distância das mãos e o comprimento do cabo no alongado). A conferência completa (`npm run conferir:animacao`) acrescenta o aviso das vistas do modo Músculos (ver abaixo). Medidas: ritmo com salto de 6,4% (limite 15%); a pilha sobe 29,9 cm para 59,8 cm de cabo (2:1); a corda e o cabo passam a no mínimo 16,6 cm da pele (a cabeça); cada ramo fica esticado com o mesmo comprimento em todos os quadros; a pronação do antebraço vai de 26° a 67° (pegada neutra, punho reto: extensão do punho 0°); elevação do braço 166,6° (média 170°); centro de massa sempre dentro do apoio dos pés.

## As vistas

- **De lado** (a primeira): mostra o tronco inclinado, a polia, o cabo, a corda e o antebraço indo para trás da cabeça.
- **De frente** (a segunda): os cotovelos perto da cabeça, o erro de abrir os cotovelos e o tríceps. Com os braços acima da cabeça e os cotovelos à frente, a parte de trás do braço fica virada para a frente: de frente aparecem 172 cm² do tríceps, de lado 60, de três quartos 59, de três quartos de trás e de trás 0 (a coluna da polia fica atrás do corpo e o tríceps está virado para o outro lado). **A vista padrão do modo Músculos é a de frente.**
- De trás e de três quartos de trás ficaram de fora: a coluna da polia fica entre a câmera e o corpo.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Cotovelos abrem para os lados (de frente; quadro parado no alongado) | o braço abre 22° para fora (no certo, 6° para dentro); os cotovelos ficam a 58,6 cm um do outro no alongado e voltam para perto da cabeça estendendo (as mãos continuam na corda) |
| Cotovelos sobem e descem (de lado; quadro parado no alongado) | no alongado o braço desce a 135° (no certo, 167°), com o cotovelo a 100°: o ombro entra no movimento, como num pullover; as mãos passam acima da testa, sem entrar na cabeça |
| Não alongar atrás da cabeça (de lado; quadro parado no alongado) | a volta para com o cotovelo a 90°; as mãos ficam acima da cabeça |

## O equipamento

- **Corda de tríceps (peça nova):** 71,1 cm de ponta a ponta e ramos de 29,2 cm (Rogue, página do produto); 2,5 cm de diâmetro (living.fit, outro fabricante: a Rogue não dá). A ponta de borracha (4,5 × 4 cm) e a bucha (4 cm) são **provisórias** (nenhuma ficha lida informa). O desenho é o do gerador realista: a corda em cilindros com luz, náilon preto; a ponta em borracha; a bucha em cromo.
- **Coluna de polia:** a da tabela de objetos (a mesma da puxada unilateral), com a pilha que sobe.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

Nenhuma correção registrada para `triceps-frances`. Os músculos seguem a biblioteca (tríceps principal, sem secundário); a animação de hoje desenhava também o reto do abdômen em laranja, que a biblioteca não conta: ficou fora.

## O que não ficou bom

- **O realce do erro "cotovelos abrem" pinta só o braço direito.** Com um pé à frente do outro, a ficha de movimento não é simétrica (a conferência compara pernas), e a cena só realça o lado direito quando a ficha não é simétrica. O braço esquerdo também abre, em cinza. Não mexi na cena (arquivo comum).
- **De lado, o braço de perto passa na frente da orelha e cobre parte da cabeça** no alongado: é o "ao lado das orelhas" visto de lado, e acontece também na animação de hoje.
- **O corpo fica um pouco menor no quadro que no búlgaro**, porque a coluna da polia (2,39 m) entra no enquadramento; ela não pode virar cenário, porque é o equipamento do exercício (e o cenário some de perfil).
