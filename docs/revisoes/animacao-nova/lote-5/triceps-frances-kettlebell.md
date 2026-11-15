# Lote 5 · Tríceps francês sentado com kettlebell (`triceps-frances-kettlebell`)

De 15/11/2026. Terceira animação da família dos tríceps franceses no motor novo, sobre o mesmo núcleo (`exercicios/triceps-frances-base.ts`) e com o mesmo corpo e o mesmo braço do tríceps francês com halter, como a ficha da técnica pede ("base do desenho: o `triceps-frances-halter` aprovado, com o kettlebell seguro pelos lados da alça"). Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-kettlebell.md` (a posição: **sentado num banco ou cadeira firme**; a carga: **um kettlebell, as duas mãos pelos lados da alça, a bola para baixo**).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-frances-kettlebell.json`.
- Animação: `src/engine/novo/exercicios/triceps-frances-kettlebell.ts`.
- Regras: as da família (`regras/triceps-frances.ts`), mais `triceps-frances-kettlebell-nas-hastes`.
- Folha ao lado da de hoje: `../prototipos/folha-triceps-frances-kettlebell.png`. Quadros grandes: `../quadros/triceps-frances-kettlebell.png`.

## Como o núcleo resolve o kettlebell

- **As mãos nas hastes:** as duas mãos ficam nas hastes da alça ("chifres"), a 12,3 cm uma da outra (a distância entre as hastes do kettlebell da tabela), palmas para dentro, os dedos em volta da haste. A alça passa pelas duas mãos e a bola fica embaixo do meio delas (correção de 04/11).
- **A inclinação do kettlebell nas mãos** sai da ficha (`carga.giro.*`, a partir do antebraço). No alongado, o eixo do kettlebell fica quase na vertical: a bola pende para baixo, atrás da cabeça. Estendido, ele fica quase deitado atrás das mãos, acima da cabeça, com a bola ainda abaixo das mãos (2,2 cm) e o punho quase reto. Sem essa inclinação, com os antebraços na vertical a bola (20,8 cm) não cabe entre eles.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado num banco ou cadeira firme, costas retas, pés firmes no chão | consenso | na ponta de um banco reto; peito a 0° da vertical, lombar e torácica na curva de repouso; pés a 16 cm do meio, joelhos a 80°; a pelve e os pés não saem do lugar | sim |
| As duas mãos pelos lados da alça, a bola para baixo, atrás da cabeça | consenso | centros das mãos a 12,3 cm (as hastes); o centro da bola fica de 2,2 a 14,6 cm abaixo do meio das mãos; a distância da mão ao meio da alça não muda (6,1 a 6,2 cm) | sim |
| Cotovelos apontando para cima, perto da cabeça, parados | consenso | braço a 163° do braço pendurado (no tronco), 8° para o meio; cotovelos a 28 cm um do outro; o cotovelo anda 0 cm e o braço gira 0° | sim |
| Alongado: kettlebell atrás da cabeça | consenso | cotovelo a 129,6°; o centro das mãos 22 cm atrás da parte de trás da cabeça; a bola pende atrás da cabeça | sim |
| Estende os braços acima da cabeça | consenso | cotovelo a 8° | sim |
| Cadência: ~1 s estendendo, ~2–3 s descendo devagar | consenso | 1,1 s e 2,4 s | sim |
| Segurança: o kettlebell passa atrás da cabeça (o risco é deixá-lo cair) | consenso | a bola passa a no mínimo 5 cm da pele (o antebraço) e a 52,7 cm do banco; da cabeça e da nuca, mais longe | sim |

Conferência automática: **0 falha, 1 aviso** (as linhas de desenho da ficha de movimento). Outras medidas: o "punho" da conferência chega a 24° (média 70°; nesta pegada o que muda é sobretudo o desvio da mão para o lado do polegar ou do dedo mínimo, que a conferência conta junto com a extensão); a supinação do antebraço chega a 40° estendido (média 87,5°); elevação do braço 163°; ritmo com salto de 5,9%.

## As vistas

De lado (a primeira) e de frente (a segunda), como no halter. De frente aparecem 168 cm² do tríceps, de três quartos 101, de lado 60, de trás 0. **A vista padrão do modo Músculos é a de frente.** De trás o kettlebell atrás da cabeça, com as mãos nas hastes, se lê muito bem, mas o tríceps some.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Abrir os cotovelos (de frente; quadro parado no alongado) | o braço abre 20° para fora no alongado e volta estendendo, com as mãos sempre nas hastes |
| Arquear as costas (de lado; quadro parado em cima) | a lombar estende 14° e a torácica 4° além da curva de repouso enquanto o kettlebell sobe |
| Amplitude curta (de lado; quadro parado no alongado) | a volta para com o cotovelo a 75°: o kettlebell fica acima da cabeça |

## O equipamento

- **Kettlebell:** o da tabela de objetos (modelo de competição, 28,2 cm de altura, bola de 20,8 cm, hastes a 12,3 cm), com o desenho do gerador realista.
- **Banco reto:** o da tabela de objetos; só a ponta conta para o enquadramento.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- "O kettlebell nunca fica solto entre as mãos" (04/11): a alça passa pelas duas mãos (medido: as mãos a 12,3 cm, nas hastes) e a bola fica embaixo do meio delas.

## O que não ficou bom

- **De lado, a alça quase não aparece** (fica atrás das mãos); a bola e as mãos se leem. De trás ela aparece inteira, mas essa vista não mostra o tríceps.
- **De frente, no alongado, o kettlebell fica escondido atrás da cabeça**, como o halter.
- **A linha do rótulo "desce devagar atrás da cabeça" cruza o braço** nos quadros em que a mão está no alto (o texto fica fora do corpo).
