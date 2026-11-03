# Flexão com o quadril alto (`pike`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): `empurrar-v`, peso do corpo, sem equipamento. **Animação nova, em revisão** (`src/engine/exercicios/revisao/pike.ts`; folha em `../../revisoes/equipamento-minimo/folhas/pike.png`). Até a aprovação, o app mostra o cartão de texto (`src/conteudo/exercicios/pike.json`).

- **Equipamento:** nenhum (o chão; um degrau ou sofá firme para a versão mais difícil)
- **Função:** empurrar vertical sem halter, só alternativa (o ombro anterior já vem dos empurrares; P4)
- **Base do desenho:** a `flexao` aprovada (mãos no chão, punho e dedos iguais), com o quadril bem alto

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Mãos no chão um pouco mais abertas que os ombros; quadril bem alto, corpo num V de cabeça para baixo; pernas estendidas, na ponta dos pés | consenso | nenhuma fonte (P4: nenhum estudo achado) |
| Descida | Os cotovelos dobram para trás e a cabeça desce entre as mãos, até a linha delas, perto do chão | consenso | nenhuma fonte |
| Quadril | Continua alto: na descida ele gira sobre os pés, com as pernas estendidas, e vai um pouco para a frente | consenso | nenhuma fonte; **[opinião]** é o que mantém o tronco mais em pé |
| Subida | Empurra o chão até os braços estenderem, sem baixar o quadril | consenso | nenhuma fonte |
| Cadência | Descida ~2 s, subida ~1 s | consenso | mesma cadência da `flexao` aprovada |

## Por que assim
Não achei estudo de EMG, de hipertrofia nem de lesão com o pike (P4, buscas `pike push-up`, `pike push up shoulder`, `handstand push-up electromyography`). O raciocínio é biomecânico **[opinião]**: quanto mais em pé fica o tronco, mais a carga vai para a frente do ombro e mais o exercício se parece com o desenvolvimento. Por isso a animação mantém o quadril alto e marca como erro o quadril que desce e transforma o pike numa flexão.

## Erros animados
1. **Quadril desce e vira flexão** (`quadril`, vista lateral): os ombros passam à frente das mãos.
2. **Cotovelos abertos para os lados** (`cot`, vista de frente).
3. **Descer pouco** (`curta`, vista lateral).

## Músculos
Primário: ombro anterior. Secundários: ombro lateral e tríceps. É o que a biblioteca conta (`ombro_anterior` / `ombro_lateral`, `triceps`), pela regra da revisão de anatomia para todo empurrar vertical (achado 4, `docs/revisoes/anatomia.md`; `tests/unit/anatomia.test.ts`). Selo: **consenso** (sem estudo de EMG nem de crescimento com o pike; a divisão vem do desenvolvimento, em que a lateral trabalha mas não tem ensaio de crescimento).
**Escolha de desenho:** na vista de frente, o tríceps fica escondido (atrás do braço); aparece na lateral.

## Montagem segura
Texto da tabela 6.1 (P6), no cartão: "Mãos num piso que não escorrega. Se os pés estiverem num degrau ou sofá, comece baixo. Com dor no punho, apoie as mãos fechadas numa toalha dobrada." Selo: consenso.
**[opinião, da P4]** A cabeça fica abaixo do quadril: o texto pede respiração contínua. Quem marcar ombro na triagem não recebe o pike (`seguranca.dor.programa`, pela articulação `ombro`).

## Como a carga sobe
Peso do corpo: pés no chão → descida de 3 s → pausa de 2 s embaixo → pés num degrau ou sofá firme (o `pike-pes-elevados` da P4 ainda não está na biblioteca). Selo: consenso; é a escada genérica de `progressao.incremento.peso-corporal` com a variação mais difícil da P4.

## Referência visual
Referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. Canal pela busca (P7; o Gustavo confere ao abrir).
- FitnessFAQs (Daniel Vadnal), "Are You Doing Pike Push-Ups Correctly?": https://www.youtube.com/watch?v=eN6uwRVdNyY
- FitnessFAQs, "The Forgotten Exercise For Bigger Shoulders": https://m.youtube.com/watch?v=Tq1nYz7U5os

## Fontes
- Nenhum estudo sustenta a técnica do pike (P4 e P6 de `docs/pesquisa-v2/10-equipamento-minimo.md`). Todos os pontos da técnica são **consenso de treinadores**, sem fonte de regra.
- Músculos: regra da revisão de anatomia, achado 4 (`docs/revisoes/anatomia.md`), aplicada pela biblioteca a todo `empurrar-v`.
