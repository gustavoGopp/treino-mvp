# Lote C3 · Panturrilha sentada na máquina (`panturrilha-sentada`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no assento da máquina, o tronco reto e parado, a almofada da alavanca em cima das coxas perto dos joelhos, as mãos no pegador na frente dela; a ponta dos pés na borda de trás do apoio, os joelhos a ~90°; o calcanhar desce abaixo da borda e sobe o máximo, e a alavanca gira com as coxas, levando a anilha. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-sentada.md`. Cartão do app: `src/conteudo/exercicios/panturrilha-sentada.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-sentada.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-sentada.ts` (o pé apoiado e o corpo sentado como na panturrilha sentada com halter aprovada). Regras: as das panturrilhas aprovadas (`regras/panturrilhas.ts`, `tronco-quase-parado` de `conferir.ts`) e duas novas em `regras/panturrilhas-maquinas.ts` (mais a das mãos nos pegadores, comum com a em pé).
- Peça nova: `pecas-de-cena/panturrilha-sentada.ts`, medidas em `dados/objetos/panturrilha-sentada.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-panturrilha-sentada.png`.
- Quadros grandes: `../quadros/panturrilha-sentada.png`. Sem folha ao lado da de hoje (não havia animação).

## Onde os números saem

A ficha da técnica só dá os joelhos a ~90°. O arco do pé é o da **panturrilha sentada com halter aprovada**: o calcanhar de 8,5 cm abaixo a 10 cm acima da borda do apoio, os pés na largura do quadril, a bola do pé 2 cm para dentro da borda; os erros também (a amplitude a 40%; o tronco que vai para trás, com a lombar a −10° e as costas de cima a −12°). Uma calibração por corpo põe a bacia no assento (afundando 1 cm), à distância do apoio em que o joelho fica a 90° com o calcanhar na altura dele, e regula a almofada na alavanca (o pino da "pull-pin thigh pad") até ela encostar no alto das coxas. O eixo da alavanca fica na linha do centro do quadril (derivado do corpo da tabela): a alavanca gira junto com a coxa, e em cada quadro ela gira até a almofada encostar nas coxas.

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Sentado, joelhos a ~90° sob a almofada | consenso | o joelho vai de 83,9° (embaixo) a 90,6° no ciclo; a almofada fica 9,3 cm atrás do centro do joelho, sem escorregar, e as coxas a afundam 1 cm em todos os quadros | sim |
| Ponta dos pés na borda da plataforma | consenso | a bola do pé a 2 cm da borda de trás do apoio, parada (0 cm no ciclo) | sim |
| Desce o calcanhar até o alongamento máximo, pausa ~1 s | consenso (`kassiano2023b`, um estudo) | 2 s descendo; embaixo o calcanhar fica 8,5 cm abaixo da borda (dorsiflexão de 24,1°); pausa de 1 s | sim (aviso da dorsiflexão, abaixo) |
| Sobe o calcanhar ao máximo | consenso | 1 s subindo; em cima o calcanhar fica 10 cm acima do apoio (flexão plantar de 41,8°) | sim |
| Tronco parado | consenso | a base do pescoço anda 0 cm; a bacia, 0 cm | sim |
| Solta a trava antes da série | consenso (`seguranca-t5`) | a alavanca fica no mínimo 2° acima do batente (o pé de borracha onde ela descansa com a trava): a trava está solta e as anilhas sobem 21 cm do calcanhar mais baixo ao mais alto | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs panturrilha-sentada`): **0 falhas, 2 avisos.**

- **Dorsiflexão 24,1°** (média da tabela 14,8°): é o alongamento da panturrilha sentada com halter aprovada, com o joelho dobrado.
- **Provisórios:** a largura dos pés, o quanto o assento e a almofada afundam, a bola do pé na borda, a altura em cima (da aprovada), as mãos no pegador e a anilha.

O resto: proporções exatas, nenhum membro deixa de alcançar, o corpo não atravessa o assento, o apoio nem a almofada, ritmo suave (6,5% da velocidade de pico), simetria e fecho do ciclo em 0 cm.

## A vista

De lado (a vista que o app abre) o corpo sentado enche o quadro e o pé é grande: o calcanhar abaixo da borda do apoio e o tornozelo se leem sem corte, com o corpo inteiro. **Não precisei do `enquadra`.** A segunda vista é de três quartos pela frente (como a panturrilha sentada com halter): os dois pés na borda do apoio, a almofada sobre as coxas e a alavanca com a anilha. A alavanca, o pino e a anilha ficam do lado esquerdo de quem senta, para não cobrir a perna direita de lado.

## Os erros

| Erro | O que o desenho mostra (medido) | Vista, instante |
|---|---|---|
| Amplitude curta | o calcanhar faz só 40% do caminho: embaixo para 3 cm abaixo da borda (no certo, 8,5) e em cima sobe só 4,7 cm (no certo, 10) | lateral, embaixo |
| Impulso com o quadril | "o tronco levanta para ajudar": na subida a lombar estende 10° e as costas de cima 12°, o tronco vai para trás (o erro do tronco da panturrilha sentada com halter aprovada) | lateral, em cima |

Nenhum erro do cartão ficou sem desenho.

## O que não ficou bom

- **De lado, a alavanca passa atrás do joelho** (ela corre do lado de fora da coxa esquerda, do quadril até a anilha na frente): parece sair do joelho. É onde ela fica, para girar junto com a coxa.
- **A anilha de 45 cm é grande na cena**, na frente das canelas (atrás delas, de lado); não cobre o tornozelo nem o pé.
- **"Impulso com o quadril" mostra o tronco indo para trás**, sem a bacia sair do assento: é a descrição do cartão ("o tronco levanta") e o erro aprovado da panturrilha com halter; o título fala do quadril.
- **O eixo na linha do quadril é escolha minha** (as fichas não dão o eixo; a foto da Atlantis M219 o põe debaixo da frente do assento, e o cartão de hoje, numa coluna à frente dos pés).

**Risco de o Gustavo não gostar: baixo a médio.** O pé se lê bem e o movimento é o da aprovada; a máquina tem um desenho novo (o eixo ao lado do quadril) diferente do cartão de hoje.
