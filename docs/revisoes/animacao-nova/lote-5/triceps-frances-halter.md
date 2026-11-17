# Lote 5 · Tríceps francês sentado com halter (`triceps-frances-halter`)

De 15/11/2026. Segunda animação da família dos tríceps franceses no motor novo, sobre o mesmo núcleo do tríceps francês na polia (`exercicios/triceps-frances-base.ts`). Sentado na ponta de um banco reto, costas retas, um halter seguro pelas duas mãos sob a cabeça de cima. Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/triceps-frances-halter.md` (a posição: **sentado**; a carga: **um halter, as duas mãos pela parte de cima**).
- Ficha de movimento: `src/engine/novo/dados/movimentos/triceps-frances-halter.json`.
- Animação: `src/engine/novo/exercicios/triceps-frances-halter.ts`.
- Regras: as da família (`regras/triceps-frances.ts`), mais `triceps-frances-halter-nas-palmas`.
- Folha ao lado da de hoje: `../prototipos/folha-triceps-frances-halter.png`. Quadros grandes: `../quadros/triceps-frances-halter.png`.

## Como o núcleo resolve o halter

- **O braço e o antebraço:** como no tríceps francês na polia (o braço numa direção fixa no tronco; o antebraço dobra e gira em volta do braço até as duas mãos ficarem a 12 cm uma da outra).
- **O halter nas palmas:** a palma de cada mão fica sob a cabeça de cima do halter (a normal da palma é o eixo do halter) e os dedos seguem o antebraço o mais possível. O centro do halter fica meio cabo abaixo da palma, ao longo do eixo. O halter não pende solto: as duas mãos o seguram pela cabeça, então a inclinação dele nas mãos é dada pela ficha (`carga.giro.*`, a partir do antebraço) e o punho fica no ângulo que isso dá, medido pela conferência. No alongado ele pende quase na vertical atrás da cabeça; estendido, fica acima da cabeça, um pouco inclinado, com a cabeça de baixo atrás dos antebraços (sem bater neles).
- **Sentado:** a pelve desce até a nádega afundar 1,5 cm no estofado; o peito fica na vertical; o banco é posto pela ponta (14 cm à frente do meio da pelve) e segue para trás.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sente com as costas retas e os pés firmes no chão | consenso | peito a 0° da vertical, lombar e torácica na curva de repouso em todos os quadros; pés a 16 cm do meio, inteiros no chão, joelhos a 80°; a pelve e os pés não saem do lugar (0 cm) | sim |
| Halter seguro pelas duas mãos, pela parte de cima, acima da cabeça (correção de 04/11: mãos juntas na anilha, 12 cm) | consenso | centros das mãos a 12 cm em todos os quadros; a face de baixo da cabeça de cima fica a 1,8 cm do centro de cada mão (a palma); a distância da mão ao centro do halter não muda (7,6 cm) | sim |
| Cotovelos apontando para cima, perto da cabeça | consenso | braço a 163° do braço pendurado (no tronco), 8° para o meio; cotovelos a 28 cm um do outro (ombros: 40,8 cm) | sim |
| Alongado: halter atrás da cabeça, cotovelos para cima | consenso | cotovelo a 129,7°; o centro das mãos fica 22 cm atrás da parte de trás da cabeça; o halter pende quase na vertical atrás dela | sim |
| Extensão em ~1 s; os cotovelos ficam parados | consenso | 1,1 s; o cotovelo anda 0 cm e o braço gira 0° no ombro | sim |
| Braços estendidos, halter acima da cabeça | consenso | cotovelo a 8°; o halter acima da cabeça | sim |
| Volta em ~2–3 s até o halter descer atrás da cabeça | consenso | 2,4 s, pelo mesmo caminho | sim |
| O halter não bate na cabeça, na nuca nem no banco | desenho | a carga passa a no mínimo 1,4 cm da pele (o antebraço, com o halter estendido) e a 49,5 cm do banco; da cabeça e da nuca, mais longe | sim |

Conferência automática: **0 falha, 3 avisos**: (1) a pronação do antebraço chega a 104,6° (média 80°, máximo observado 108°): com as palmas para cima sob a cabeça do halter e os braços acima da cabeça, o antebraço fica bem pronado; (2) as linhas de desenho da ficha de movimento; (3) a vista de lado não serve ao modo Músculos (de frente 205 cm², de lado 60). Outras medidas: extensão do punho até 62° (média 70°; no alongado o punho flexiona 22°); elevação do braço 163° (média 170°); ritmo com salto de 5,9%; a nádega afunda 1,5 cm no estofado (de propósito).

## As vistas

De lado (a primeira) e de frente (a segunda). Com os braços acima da cabeça, o tríceps fica virado para a frente: de frente 205 cm², de três quartos 103, de lado 60, de trás e de três quartos de trás 0. **A vista padrão do modo Músculos é a de frente.** De trás o halter atrás da cabeça se lê muito bem, mas o tríceps some; a vista de frente mostra os cotovelos perto da cabeça e o erro de abri-los, e no alongado o halter fica escondido atrás da cabeça.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Abrir os cotovelos (de frente; quadro parado no alongado) | o braço abre 20° para fora (no certo, 8° para dentro) no alongado e volta estendendo, com as duas mãos sempre no halter |
| Arquear as costas (de lado; quadro parado em cima) | a lombar estende 14° e a torácica 4° além da curva de repouso enquanto o halter sobe |
| Amplitude curta (de lado; quadro parado no alongado) | a volta para com o cotovelo a 75°: o halter fica acima da cabeça |

## O equipamento

- **Halter:** o sextavado de 25 lb da tabela de objetos, seguro em pé pela cabeça de cima.
- **Banco reto:** o da tabela de objetos (a ficha aceita banco ou cadeira firme; o banco reto não tem encosto que atrapalhe o halter atrás da cabeça). Só a ponta conta para o enquadramento.

## Correções já feitas que esta animação respeita (`correcoes-ja-feitas.md`)

- Mãos juntas na anilha, 12 cm (04/11): medido, 12 cm entre os centros das mãos, as palmas sob a cabeça de cima.

## O que não ficou bom

- **De frente, no alongado, o halter não aparece** (fica atrás da cabeça). Testei a vista de trás, onde ele se lê bem, mas nela o tríceps some (0 cm²) e o modo Músculos precisa da de frente.
- **A pronação do antebraço fica alta (até 104,6°, aviso).** É a pegada pela cabeça do halter com as palmas para cima; a regulei (os dedos girados 5° na palma e o braço 8° para o meio) para ficar abaixo do máximo observado.
- **O braço gira um pouco em volta de si mesmo** perto da extensão completa (para as duas mãos continuarem a 12 cm, o plano em que o cotovelo dobra muda). A direção do braço não muda (0°).
