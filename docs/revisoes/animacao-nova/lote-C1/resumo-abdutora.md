# Lote C1 · Cadeira abdutora e adutora: resumo (a peça, a abdução e a adução na máquina)

De 18/11/2026. A peça nova da cadeira abdutora e adutora e as duas primeiras animações dos exercícios nela (antes, só cartão de texto). Nenhuma está aprovada nem ligada às telas: quem integra registra em `aprovados.ts` e no catálogo do guia.

## A peça: a cadeira abdutora e adutora

`src/engine/novo/pecas-de-cena/cadeira-abdutora.ts`, medidas em `src/engine/novo/dados/objetos/cadeira-abdutora.json`, folha em `docs/revisoes/animacoes-restantes/pecas/folha-cadeira-abdutora-adutora.png` (`node scripts/animacao-nova/folha-pecas.mjs cadeira-abdutora-adutora`: o cartão de hoje ao lado, no tamanho do cartão e ampliado, a máquina funcionando de frente e de cima nas duas regulagens, e as medidas). Uma máquina só faz as duas, como o cartão: a almofada gira no alto do montante e fica por fora (abdução) ou por dentro (adução) do joelho.

**Medidas com fonte (páginas públicas, lidas em 18/11/2026):**

- Life Fitness, manual público da linha Insignia (`kb.cybexintl.com/.../Life_Fitness_Insignia_Series_Owners_Manual_9481201_Rev_BE.pdf`, p. 22 a 24): a SS-HAA, que faz as duas, tem **170 × 161 × 148 cm** (226 cm de largura com as pernas abertas); as separadas SS-HAB e SS-HAD, 159 × 126 × 148. O mesmo manual manda sentar com **os pés nos apoios e os joelhos a 90°**, as almofadas por fora ou por dentro dos joelhos, as mãos nos pegadores e a pausa no fim; e diz que a posição inicial se regula. A SS-SHB que estava na pesquisa de objetos (160 × 168 × 148) é a abdutora de sentar e de ficar em pé, outra máquina.
- Precor RSL0626 Inner/Outer Thigh (`precor.com/en-US/products/RSL0626`): 180 × 76 × 147 cm, torre de **148 cm**, **estofados de 6,5 cm**, "slightly reclined seat back", "rotating thigh pads", "Max leg open width: 73 in / 185 cm".
- Hammer Strength HS-HAB e HS-HAD (155 × 67 × 140) e Movement Next (167 × 81 × 146, com a torre à frente de quem senta e o apoio dos pés em duas alturas), da pesquisa de objetos (seção 13.1).

**A medida que faltava, o eixo das almofadas, sai do corpo:** cada braço gira num eixo vertical embaixo do **centro do quadril** de quem senta encostado (24 cm atrás da borda do assento, 8,35 cm do meio: `quadril.meiaDistancia` da tabela do corpo). Sentado, abrir a perna é girar a coxa em volta desse eixo; com o braço no mesmo eixo, a almofada não escorrega pela coxa e o pé não sai do apoio (medido: 0 cm). Nenhuma ficha ou manual lido dá esse ponto; ficou com o tipo `derivada` e o motivo. Também derivados do corpo: a posição e a altura da almofada (o lado do joelho), o apoio do pé (a sola com o joelho a 90°) e o encosto (as costas encostam).

**De desenho (sem ficha):** a altura do assento (50 cm), o comprimento e a largura do assento, o ângulo do encosto (15°: a Precor só diz "um pouco deitado"), o comprimento do encosto, o braço que passa por fora da perna e o montante à frente do pé, o tamanho das almofadas (do cartão: 24 × 17 cm), os pegadores, o came de 28 cm de raio (as placas sobem 0,49 cm por grau), a torre e a pilha (as da cadeira flexora).

**A máquina funciona:** os dois braços giram juntos (engrenagens nos eixos); o came do braço esquerdo enrola o cabo e as placas do pino sobem o arco do came, quando as pernas abrem na abdução e quando fecham na adução; a posição inicial (onde as placas descansam) se regula.

**O que não fecha com as fichas:** a largura desenhada é **109 cm** com os braços fechados (o comprimento, 170 cm, é o da Life Fitness). A Life Fitness tem 161 cm, com a torre ao lado; as outras, 67 a 81 cm. A torre ficou junto do encosto e atrás dele, como no cartão (106 cm de largura), e não a 50 cm do assento, que é o que a largura da Life Fitness pediria sem nenhuma ficha dizer onde a torre fica. **A torre fica à esquerda de quem senta (no cartão, à direita):** de lado, a vista do tronco, ela fica atrás do corpo. O gerador dos cartões desenha espelhado em relação à animação; a folha explica.

**Abdutora × cadeira flexora a 96 px:** não se confundem (as almofadas nos joelhos e os dois braços abertos de um lado e do outro do assento; a flexora tem o rolo atrás da perna e a trava das coxas). O cartão do app (`public/equipamento/cadeira_abdutora_adutora.svg`) não foi mexido.

## As animações

| | Abdução na cadeira abdutora (`abducao-maquina`) | Adução na cadeira adutora (`aducao-maquina`) |
|---|---|---|
| Conferência automática | 0 falha, 2 avisos (linhas de desenho; de frente e de cima o glúteo não aparece, o modo Músculos abre de lado) | 0 falha, 2 avisos (linhas de desenho; de frente os adutores não aparecem, o modo Músculos abre de cima) |
| Vistas | de frente, de cima e de lado | de frente e de cima |
| Movimento | cada coxa de 8° a 36°, pausa de 1 s; as placas de 3,9 a 17,6 cm | cada coxa de 34° a 11° (as almofadas a 1,2 cm uma da outra); as placas de 3,9 a 15,1 cm |
| Erros desenhados | embalar o tronco; abrir pouco; soltar a volta (as placas batem) | abrir demais; bater as placas |
| Erros não desenhados | nenhum | nenhum |
| Conferência escrita | `abducao-maquina.md` | `aducao-maquina.md` |
| Quadros grandes | `../quadros/abducao-maquina.png` | `../quadros/aducao-maquina.png` |
| Risco de o Gustavo não gostar | médio | médio |

Os dois erros de ritmo ("Soltar a volta" e "Bater as placas") foram desenhados pela consequência que o cartão dá (as placas batem): o começo certo de cada repetição fica 8° antes do fim da máquina, com as placas 3,9 cm acima das outras; no erro, a perna vai até o fim da máquina e as placas encostam.

## Mudanças em arquivos comuns

Nas peças comuns e nos exercícios aprovados, nenhuma. No núcleo, só um acréscimo em `boneco.ts`: a opção `vies.cabeca`, desligada por padrão (ver a correção no fim deste arquivo). O resto é novo, mais uma linha em cada registro:

- Peça e objeto novos: `pecas-de-cena/cadeira-abdutora.ts`, `dados/objetos/cadeira-abdutora.json` (linha em `dados/objetos/registro.ts`).
- Núcleo novo: `exercicios/quadril-na-maquina.ts` (sentado na máquina, a calibração da bacia e da coxa gravada pelo `preparo.mjs`).
- Regras novas: `regras/cadeira-abdutora.ts` (`abdutora-sentado-encostado`, `abdutora-eixo-no-quadril`, `abdutora-pes-nos-apoios`, `abdutora-almofada-no-joelho`, `abdutora-placas-sem-bater`, `abdutora-pernas-abrem`, `adutora-pernas-fecham`), linha em `regras/registro.ts`.
- `scripts/animacao-nova/folha-pecas.mjs`: a folha da peça, sem mudar as outras.
- O `dados/preparo/registro.ts` é o gerado pelo `preparo.mjs`; ele só gravou os dois arquivos novos e o registro.
- De frente, o quadro usa `viesNaVista` (opção que já existia): o corpo e as pernas são pintados numa camada só, na profundidade do tronco, e o eixo e as engrenagens, atrás das canelas, eram pintados por cima delas.

## Pontos para quem integra

- O teste da ponte que falha ("todas as animações estão aprovadas e no catálogo") é o esperado; os outros 7 passam.
- Nenhum erro ficou fora da ficha: nada a pôr em `SEM_DESENHO`.
- Os músculos: glúteo (principal) na abdução, adutores (principal) na adução, dos dois lados, como as fichas da técnica.

## O que não ficou bom (nas duas)

- De frente, as coxas (que apontam para quem olha) viram uma mancha clara, o colo, como na abdução com mini band aprovada.
- O corpo ocupa dois terços (adução) a três quartos (abdução) da altura do quadro de frente: a torre e os braços abertos entram no quadro. A torre fica porque é nela que se veem as placas subindo e batendo.
- Os ângulos (36° e 8° na abdução; 34°, 11° e 55° na adução) são escolhas dentro do que a ficha diz em palavras; o de 11° sai das almofadas quase se tocando.
- Só um rótulo de técnica de frente em cada; o segundo ficava em cima da torre ou com o fio atravessando o corpo.

## Correção de 18/11 (a vista de cima)

Na revisão, a cabeça não aparecia na vista de cima, e uma linha preta solta subia do encosto até a borda do quadro. **As causas:**

- **A cabeça.** O Boneco desenha o corpo com um contorno só, por fora. De cima, sentado, a cabeça fica dentro da silhueta dos ombros: ela era pintada, mas sem contorno e da mesma cor do tronco, e sumia. Além disso, o corpo inteiro era pintado na altura média dele (~90 cm), e o alto do encosto (118 cm) ia por cima. Nas vistas de cima aprovadas de quem está em pé ou sentado (a elevação lateral, por exemplo), a cabeça também não aparece; nas de quem está deitado, aparece.
- **A linha preta** era o cabo, que corre no chão do came até a polia do pé da torre, e a torre é cortada pelo quadro.

**O que mudou:**

- O Boneco ganhou uma opção nova, desligada por padrão: `vies.cabeca` > 0 pinta a cabeça (e o cabelo) de novo por cima do corpo, com o contorno próprio, como já se fazia com o polegar por cima da mão. A mudança em `boneco.ts` só acrescenta esse trecho e não muda nada nas animações aprovadas: nenhuma usa a chave `cabeca` no `vies`.
- O quadro da máquina usa a opção só na vista de cima e sobe o corpo e os braços na ordem de pintura (`viesNaVista.cima`), para ficarem por cima do encosto.
- O cabo não é desenhado quando a vista é de cima (nem na folha da peça); nas outras vistas continua.
