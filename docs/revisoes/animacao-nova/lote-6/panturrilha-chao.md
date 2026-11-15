# Lote 6 · Panturrilha em pé no chão (`panturrilha-chao`)

De 15/11/2026. Primeira animação da família das panturrilhas no motor novo. Em pé, de frente para a parede, as palmas nela só para equilibrar: **sobe com as duas pernas, segura no topo e tira um pé do chão, desce em 3 s numa perna só e volta o outro pé.** Ainda não está ligada às telas do app.

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-chao.md` (seção "Uma perna de cada vez", de 12/11/2026).
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-chao.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-chao.ts`, sobre o núcleo comum da família (`exercicios/elevar-o-calcanhar.ts`).
- Peça nova: a parede em frente (`pecas-de-cena/degrau.ts`, `paredeEmFrente`), como cenário.
- Regras novas medidas: `src/engine/novo/regras/panturrilhas.ts`.
- Folha ao lado da de hoje: `../prototipos/folha-panturrilha-chao.png`. Quadros grandes: `../quadros/panturrilha-chao.png`.

## A decisão pendente (ler primeiro)

`correcoes-ja-feitas.md` (seções 2 e 6) registra: a animação aprovada em 01/11 mostra a descida com as duas pernas; a ficha da técnica e o texto do app, desde 12/11, pedem **subir com as duas e descer em 3 s com uma só** (`nakamura2025`, um estudo; regra `selecao.panturrilha-alongada`, decisão do Gustavo de 06/11). Refazer a animação ou trocá-la pelo cartão é decisão dele, ainda pendente. Como o guia manda seguir a ficha da técnica, esta animação nova faz a descida numa perna só. Se ela for aprovada, a linha do texto do app "A animação mostra a descida com as duas pernas; aqui, desça com uma só…" deixa de ser verdade (pedido em `pedidos-panturrilhas.md`; não mexi no texto).

## Como o núcleo resolve cada quadro

- **O pé:** a bola do pé de apoio fica parada no chão e o pé gira nela (`pe.calc` do esqueleto). O calcanhar sobe até a altura da ficha.
- **O quadril:** a distância do quadril ao tornozelo sai da flexão do joelho (4°, "estendidos sem travar"); a inclinação das pernas sai do equilíbrio: o centro de massa sobre a **bola do pé**. Com o calcanhar no chão, o tornozelo fica 13 cm atrás da bola, e as pernas inclinam um pouco para a frente (dorsiflexão de 8,8°); na ponta dos pés ficam em pé. O tronco fica na vertical: assim a cabeça sobe quase reta (anda 1 cm para trás na subida). Com o corpo inteiro em linha, ela recuaria 4,3 cm (medido e descartado).
- **Numa perna só:** o pé esquerdo sobe 6 cm e vai 12 cm para trás, com o joelho dobrado; o centro de massa vai de lado para cima do pé direito (a bacia anda 11,4 cm para a direita) e volta quando o pé esquerdo desce.
- **As mãos:** espalmadas na parede, paradas (0 cm no ciclo); os braços acompanham pelo cotovelo.
- O parâmetro do movimento vai de 0 a 4: subida com as duas (0→1), tira um pé (1→2), descida numa perna (2→3), volta o pé (3→4 = 0).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o texto do app) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Em pé, pés na largura do quadril, apontando para a frente | consenso | pés a 9 cm do meio (os centros do quadril ficam a 8,35), dedos para a frente; o pé direito não sai do lugar (0 cm) | sim |
| Mãos na parede, só para equilíbrio | consenso | palmas a 145 cm do chão, 20,7 cm do meio do corpo; não andam (0 cm); cotovelos de 79° a 87° | sim |
| Joelhos estendidos, sem travar | consenso | joelho de apoio a 4° o ciclo todo | sim |
| Subida ~1 s, com as duas pernas, o máximo que conseguir | consenso | 1 s; o calcanhar sobe de 0 a 12 cm (o que a animação de hoje sobe); flexão plantar de 33,7° | sim (12 cm é da animação de hoje: ver provisórias) |
| Topo: segure 1 s e tire um pé do chão | consenso / um estudo | 0,5 s parado + 0,6 s tirando o pé esquerdo (sobe 6 cm, vai 12 cm para trás) | sim |
| Descida ~3 s numa perna só, até o calcanhar tocar o chão | um estudo (`nakamura2025`) | 3 s só no pé direito; o calcanhar volta a 0 cm | sim |
| Volte o outro pé para subir de novo | um estudo | 0,6 s; o pé esquerdo volta ao lugar de partida e a bacia volta ao meio | sim |
| Equilíbrio (o corpo sobe reto, sem balançar) | consenso (mecânica) | o centro de massa fica a 0 cm da vertical da bola do pé (para a frente e para trás) em todos os quadros; numa perna só, a 0 cm do pé direito de lado | sim |

Conferência automática: **0 falha, 1 aviso** (as linhas de desenho da ficha de movimento: altura do calcanhar, posição da parede e das mãos, o pé que sai do chão). Ritmo suave: maior salto de 9,9% (limite 15%). Extensão do punho até 66,9° (média 70°); dorsiflexão até 12,3° (média 14,8°).

## As vistas

- **De lado** (a primeira): é onde o calcanhar subindo e o corpo subindo reto se leem melhor.
- **Três quartos, de trás** (`quinaTras`): mostra a panturrilha (298 cm² dela à vista, contra 108 de lado), as duas pernas e a descida numa perna só, com o outro pé fora do chão. É a vista padrão do modo Músculos. Testei as outras: de frente a parede ficaria entre a câmera e o corpo; de trás, o pé que sai do chão vem na direção da câmera e quase não se lê, e a parede vira um painel atrás do corpo inteiro; de três quartos pela frente a parede tapa metade do corpo.

## Erros

| Erro (texto do app) | O que o boneco faz (medido) |
|---|---|
| Subida curta (de lado) | o calcanhar sobe só 6 cm (metade, como na animação de hoje) |
| Dobrar os joelhos (de lado) | embaixo os joelhos dobram 30° e esticam na subida, dando impulso; voltam a dobrar na descida |

## O equipamento

Nenhum: só a parede, desenhada como cenário (lisa e clara, a mesma cor da parede da cadeira do búlgaro, atrás do corpo e fora do enquadramento).

## Correções já feitas que esta animação respeita

- A pendência de 12/11 (descida numa perna só): seguida, ver acima.
- Panturrilha em vermelho como único músculo: é o que a biblioteca conta.

## Medidas provisórias

`calcanhar.topo` (12 cm, da animação de hoje), `parede.aFrenteDaBola` (40 cm), `maos.altura` (145 cm), `maos.meiaDistancia` (20 cm), `livre.sobe` (6 cm), `livre.atras` (12 cm). A parede e as mãos não são as de hoje (44 cm e 128 cm): com elas, o punho passava de 85° de extensão (máximo observado 95°, média 70°); com a parede a 40 cm da bola do pé e as mãos mais altas, fica em 57° a 67°.

## O que não ficou bom

- **O movimento é pequeno no quadro inteiro:** o calcanhar sobe 12 cm num corpo de 176 cm. De lado ele se lê, mas é o pé que conta a história; não há uma vista de perto (o motor novo só tem as seis vistas). A trajetória do calcanhar ajuda.
- **No ar, o pé esquerdo fica com os dedos na horizontal** (o pé apoiado do esqueleto mantém os dedos deitados). Com o pé só 6 cm acima do chão isso quase não aparece; não mudei o esqueleto.
