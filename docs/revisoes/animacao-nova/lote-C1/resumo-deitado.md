# Lote C1 · grupo "deitado": mesa flexora e coice na máquina de glúteo

De 18/11/2026. Duas peças novas e duas animações novas no motor novo (os dois exercícios eram cartão de texto). Nada foi ligado às telas; `aprovados.ts`, o catálogo do guia, `src/domain/`, `src/conteudo/` e `tests/` não mudaram. A cadeira flexora aprovada não mudou (nem o desenho, nem o preparo); da cadeira vieram as medidas e o jeito de desenhar o came, a alavanca, o rolo e a pilha.

## As peças

| Peça | Arquivos | Folha |
|---|---|---|
| Mesa flexora | `pecas-de-cena/mesa-flexora.ts`, `dados/objetos/mesa-flexora.json` | `docs/revisoes/animacoes-restantes/pecas/folha-mesa-flexora.png` |
| Glúteo na máquina (de quatro apoios) | `pecas-de-cena/gluteo-maquina.ts`, `dados/objetos/gluteo-maquina.json` | `docs/revisoes/animacoes-restantes/pecas/folha-gluteo-maquina.png` |

**Mesa flexora.** Medidas de fabricante: 159 × 106 cm (Life Fitness SS-LC; Hammer Strength HS-LC 166 × 100, Movement Next 155,3 × 108,1, Precor RSL0606 155 × 122), torre de 148 cm e estofados de 6,5 cm (Precor RSL0606, página pública lida em 18/11). A Precor e a Life Fitness dizem que o estofado do quadril e o do peito têm ângulos diferentes, para alinhar o joelho com o eixo, sem dar os ângulos. **De desenho:** a dobra (o estofado das coxas sobe 20°, o do peito desce 10°; o cartão de hoje tem uns 10°), a altura do eixo (64 cm), onde ele fica em relação ao estofado (6,5 cm acima, 5 cm atrás da ponta), os comprimentos dos estofados, os pegadores; o came, a alavanca, o rolo e a pilha com as medidas da cadeira flexora. O cartão de hoje não tem torre (a carga é um pino de anilha), por isso é 33% a 40% mais baixo que as fichas; a peça nova tem a torre ao lado do estofado do peito.

**Glúteo na máquina.** A ficha da técnica e o cartão pedem a **de quatro apoios com a sola na plataforma** ("o outro joelho apoiado"). As três fichas do plano (LF SS-GL, HS-HG, Movement Next Glute) e o cartão de equipamento de hoje são de **máquinas em pé**: não servem de medida. Li duas de quatro apoios, em páginas públicas: a **Precor Glutebuilder Pendulum Kickback GSL0617** (127 × 132 × 145 cm, torre de 148 cm, "double knee pad, chest pad and hand grips", "isolating movement at the hip joint") e a **Atlantis C-122** (168,8 × 111,4 × 159,9 cm, "forearm pads", "rubber footplates"). O tamanho total vem da Precor. **De desenho:** o eixo na linha do quadril (74 cm; a almofada dos joelhos regula na altura para o quadril cair nele), a almofada dos joelhos, os apoios dos antebraços (50 cm), os pegadores, a plataforma do pé; a espessura dos estofados é a da linha Resolute da Precor; o came e a pilha, os da cadeira flexora.

## As animações

| Exercício | Conferência (`node scripts/animacao-nova/conferir.mjs <id>`) | Quadros | Conferência escrita |
|---|---|---|---|
| `mesa-flexora` | 0 falha, 2 avisos (linhas de desenho; de lado o músculo quase não aparece, o modo Músculos abre de cima) | `quadros/mesa-flexora.png` | `lote-C1/mesa-flexora.md` |
| `coice-maquina` | 0 falha, 2 avisos (o peito do pé de apoio deitado na almofada, 80,7°, igual ao coice com caneleira aprovado; linhas de desenho) | `quadros/coice-maquina.png` | `lote-C1/coice-maquina.md` |

**Erros desenhados:** mesa flexora: "Levantar o quadril", "Rolo no lugar errado" (o rolo no meio da panturrilha; o corpo faz o certo, por isso nada é pintado de vermelho, como no erro do elástico no pescoço aprovado). Coice na máquina: "Arquear a lombar", "Girar o quadril" (os números do coice com caneleira aprovado).

**Sem desenho (ritmo):** "Volta solta" (mesa flexora) e "Soltar a volta" (coice na máquina): a pose é a do movimento certo, só a volta é mais rápida. Quem integra põe as duas em `SEM_DESENHO` do teste da ponte (como o "Soltar a volta" do supino entre as torres).

## Mudanças em arquivos comuns

- `scripts/animacao-nova/folha-pecas.mjs`: duas folhas novas (`mesa-flexora`, `gluteo-maquina`), sem mudar as outras.
- Uma linha em cada registro (`exercicios/registro.ts`, `regras/registro.ts`, `dados/objetos/registro.ts`) e o `dados/preparo/registro.ts` regravado pelo `preparo.mjs` (só entram os dois ids novos; nenhum outro arquivo de preparo mudou).
- Nenhum núcleo mudou: o coice usa `exercicios/quatro-apoios.ts` pelo que ele já exporta, e duas regras dos coices aprovados pelo id (`coice-coxa-na-linha-do-tronco`, `coice-quadril-nao-gira`).

## Risco de o Gustavo não gostar

- **Mesa flexora: médio.** O movimento e a máquina funcionam e se leem; os riscos são a dobra do estofado mais marcada que a do cartão (20° contra 10°: com 10° o peito do Boneco não deitava), a torre atrás da cabeça na vista de lado e o erro do rolo, que é da máquina e não do corpo.
- **Coice na máquina: alto.** A máquina é de outro tipo que a do cartão de equipamento de hoje e a das fichas do plano (em pé): o app mostraria a de quatro apoios na animação e a em pé na tela de marcar o equipamento. Cabe a ele decidir qual das duas o app mostra (a técnica escrita é a de quatro apoios). Também: a alavanca é pintada atrás do corpo (o corte do smith), e de lado parece passar por trás da perna.
