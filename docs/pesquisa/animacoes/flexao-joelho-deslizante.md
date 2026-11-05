# Flexão de joelho deslizando os pés no chão (`flexao-joelho-deslizante`)

Exercício da biblioteca (sessão de equipamento mínimo, 03/11/2026): `flexao-joelho`, peso do corpo, sem equipamento (toalha ou meias num chão liso). **Animação nova, em revisão** (`src/engine/exercicios/revisao/flexao-joelho-deslizante.ts`; folha em `../../revisoes/equipamento-minimo/folhas/flexao-joelho-deslizante.png`). Até a aprovação, o app mostra o cartão de texto (`src/conteudo/exercicios/flexao-joelho-deslizante.json`).

- **Equipamento:** nenhum que o app veja: chão liso (piso frio, madeira) e uma toalha, ou meias
- **Função:** flexão de joelho sem máquina, para todos os níveis (P3: "≈ `flexao-bola`")
- **Base do desenho:** a `flexao-bola` (guia original), sem a bola. A toalha é uma caixa fina sob os calcanhares (o motor não tem peça de tecido)

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Deitado de costas, braços no chão ao lado do corpo, calcanhares na toalha | consenso | mesma técnica da `flexao-bola`; P3 |
| Quadril | Fora do chão o tempo todo: um pouco elevado com as pernas estendidas e em ponte (ombros, quadril e joelhos em linha) com os joelhos dobrados | consenso | mesma técnica da `flexao-bola` |
| Puxada | Os calcanhares deslizam até perto do glúteo em ~1 s, subindo o quadril | consenso | mesma técnica da `flexao-bola` |
| Volta | Os calcanhares deslizam para longe em ~2–3 s, sem o quadril encostar no chão | consenso | **[opinião]** volta um pouco mais lenta que na bola, porque o chão liso não freia |
| Ombros | Ficam no chão; a cabeça apoiada | consenso | mesma técnica da `flexao-bola` |

## Por que assim
Não achei ensaio de hipertrofia nem EMG publicado da flexão deslizante. Há um estudo registrado (ClinicalTrials NCT07171385) que vai comparar a EMG dela com a do nórdico, ainda sem resultado (P3). **[opinião, da P3]** É uma flexão de joelho com o quadril estendido, como a mesa flexora; pelo `maeo2021`, essa posição cresce os posteriores menos que a flexora sentada, mas cresce. É o mesmo movimento da flexão na bola, que já está na biblioteca (`selecao.equivalencia`).

## Erros animados
1. **Quadril encosta no chão** (`quadril`).
2. **Arquear a lombar** para subir o quadril (`lombar`).
3. **Puxar pouco** (`curta`).

## Músculos
Primário: posteriores da coxa. Secundário: glúteos. É o que a biblioteca conta (`posteriores` / `gluteos`), igual à `flexao-bola`. Selo: **consenso** (por analogia com a flexão na bola e com a mesa flexora, `maeo2021`; sem estudo do próprio exercício).
**Escolha de desenho:** a panturrilha, que na `flexao-bola` aparece listrada ("só ajuda"), fica fora: a lista de "só ajuda" é do motor (`src/engine/estilo/musculos.ts`, `SO_AJUDA`) e a revisão não a edita.

## Montagem segura
Texto da tabela 6.1 (P6), no cartão: "Use piso liso, longe de tapetes e de quinas. Toalha sob os calcanhares, ou meias. Se escorregar demais, faça com uma perna de cada vez e mais devagar." Selo: consenso (não há dado de lesão com este exercício, P6).

## Como a carga sobe
Peso do corpo, pela escada da flexão na bola (tabela 5.3): ponte parada com os calcanhares na toalha → só a volta devagar → completa → pausa de 2 s com os joelhos dobrados → uma perna. Selo: consenso.

## Referência visual
Referência visual de movimento, **não fonte de regra; não assistido nesta sessão** (P7).
- The Prehab Guys (biblioteca de vídeos, no Vimeo), "Single Leg Hamstring Curl – Slider": https://library.theprehabguys.com/vimeo-video/single-leg-hamstring-curl-slider/ (a versão de uma perna)
- Canal (canal Nick Brattain, conferido em 05/11/2026), "Towel Hamstring Curls": https://www.youtube.com/watch?v=cWSsWpuxmYM

## Fontes
- `maeo2021` (já em `../fontes.md`): Maeo S et al. Greater Hamstrings Muscle Hypertrophy but Similar Damage Protection after Training at Long versus Short Muscle Lengths. Med Sci Sports Exerc 2021;53(4):825–837. PMID 33009197. **Resumo lido no PubMed.** Usado aqui só por analogia.
- ClinicalTrials NCT07171385: estudo registrado, **sem resultado publicado**; visto só pelo registro na busca da P3. Não sustenta nada.
- Técnica: a da `flexao-bola` (guia original, `referencia/guia-execucao-fase1.html`), consenso de treinadores.
