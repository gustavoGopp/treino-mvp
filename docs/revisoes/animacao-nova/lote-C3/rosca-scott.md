# Lote C3 · Rosca Scott no banco Scott (`rosca-scott`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no banco Scott, a parte de trás dos dois braços deitada na almofada a 45°, as axilas na borda de cima; a barra W nas duas mãos, pegada nas partes inclinadas, uma anilha de 5 kg de cada lado. Só os antebraços se mexem. **Ainda não aprovada nem ligada às telas** (quem integra registra em `aprovados.ts` e no catálogo do guia).

- Ficha da técnica: `docs/pesquisa/animacoes/rosca-scott.md`. Cartão do app: `src/conteudo/exercicios/rosca-scott.json` (só leitura). Nenhuma correção anterior em `correcoes-ja-feitas.md` (o exercício nunca teve animação).
- Ficha de movimento: `src/engine/novo/dados/movimentos/rosca-scott.json`.
- Animação: `src/engine/novo/exercicios/rosca-scott.ts`. Regras medidas novas: `src/engine/novo/regras/banco-scott.ts`.
- Peça nova: o banco Scott (`pecas-de-cena/banco-scott.ts`, `dados/objetos/banco-scott.json`, folha `docs/revisoes/animacoes-restantes/pecas/folha-banco-scott.png`). A barra W é a peça aprovada (`pecas-de-cena/barra-w.ts`), sem mudança.
- Quadros grandes: `../quadros/rosca-scott.png`. Sem folha ao lado da animação de hoje (não havia animação).

## Onde os números saem

O cartão diz "barra W ou halter"; a animação usa a barra W, a primeira das duas (e a da biblioteca: `[banco_scott, barra_w]`). A técnica segue a **rosca Scott no banco inclinado, aprovada pelo Gustavo** (`rosca-scott-banco-inclinado`): o braço paralelo à face do estofado, o centro do ombro 8 cm além da borda de cima, o estofado amassando 1 cm, o cotovelo de 14° a 125°, o pescoço um pouco estendido (olhar à frente) e os três erros com os mesmos números. Da rosca com barra W aprovada vêm a barra (uma anilha de 5 kg de cada lado) e a pegada (a mão girada pela parte inclinada da barra, o antebraço aberto o que leva a mão ao meio dela). O que muda: são os dois braços, a pessoa está sentada e a almofada tem 45° (da ficha da Deltech DF308), em vez dos 60° do encosto do banco regulável.

**A regulagem sai do corpo, não de um número escolhido:** o assento fica a 50 cm (a faixa do banco é 47 a 62 cm), com os pés inteiros no chão e o joelho a 85°; a bacia desce até o glúteo amassar 1 cm o assento; a almofada sobe até a borda de cima ficar onde o ombro cai 8 cm além dela e o tríceps encosta. Deu a almofada a 100,5 cm, dentro da faixa do banco (84 a 109 cm). A conta fica guardada (`calibragem`, chave `rosca-scott:parado`).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Banco na altura em que o tronco fica reto | consenso | a linha da bacia à base do pescoço fica 1,2° da vertical (a bacia 4° à frente); assento a 50 cm, almofada a 100,5 cm, as duas dentro da regulagem do banco; o glúteo amassa 1 cm o assento, com o meio da bacia 4,2 cm à frente do meio dele | sim |
| Parte de trás do braço inteira apoiada na almofada | consenso | nos dois braços, o ponto mais fundo do tríceps na almofada fica a 0,4 cm (amassa) em todos os quadros; o cotovelo anda 0 cm | sim |
| Axilas encostadas na borda | consenso | o centro do ombro fica 8 cm além da borda de cima; nos 6 cm de cima da almofada, a pele do braço encosta (0,4 cm); o peito amassa 1,6 cm a almofada (a Precor diz que a almofada "amortece o peito e o braço") | sim |
| Desce até o cotovelo quase estender, sem soltar o peso | consenso | embaixo, o cotovelo para dobrado 14° (o mínimo do ciclo) | sim |
| Desce controlando (~2–3 s) | consenso | descida de 2,6 s, subida de 1 s; o ritmo não dá salto (6% da velocidade de pico) | sim |
| Sobe sem tirar o braço até o antebraço ficar quase vertical | consenso | em cima, o cotovelo dobra 125° e o antebraço fica 10° antes da vertical (o peso continua no bíceps); a pegada a 29,8 cm do centro do ombro | sim |
| Barra W, pegada nas partes inclinadas, palmas para cima | consenso | o centro da pegada no eixo e no meio da parte inclinada (0 cm), a linha da palma na linha dela (0°); supinação de 67° (90° menos os 23° da parte inclinada); as mãos a 37 cm uma da outra em todo o ciclo | sim |
| A barra não atravessa nada | desenho | a menor folga até a pele (fora as mãos) é 3,4 cm (antebraço); até a almofada, 12,6 cm; passa 13,3 cm acima dos ganchos do suporte | sim |
| Só o antebraço se mexe | consenso | a base do pescoço anda 0 cm; a bacia e os pés, 0 cm; a lombar sem flexão (0°) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs rosca-scott`): **0 falhas, 2 avisos**. Os avisos: (1) as linhas de desenho da ficha de movimento (assento, amassa, braço paralelo, pescoço e cabeça, joelho, pés, anilhas), cada uma com o motivo no campo `o`; (2) o antebraço aparece como "só ajuda", fora da lista do conteúdo (bíceps), como em todas as roscas aprovadas. O corpo entra até 2 cm num estofado (o peito na almofada e o glúteo no assento, dentro da tolerância de 2,5 cm).

## As vistas

`lateral` (a que o app abre) e `quina`. De lado, o arco dos antebraços e o braço deitado na almofada se leem de relance. Como na rosca com barra W aprovada, em cima a anilha de perto passa na frente do queixo (ela está 42 cm ao lado da cabeça, fora do corpo: a regra mede 3,4 cm de folga mínima). De três quartos, a almofada, os dois braços e a barra aparecem inteiros. Os músculos: de lado e de três quartos o bíceps aparece; o modo Músculos abre de lado.

## Erros (os três do cartão, com o mesmo título e na mesma ordem)

| Erro do cartão | O que o boneco faz | Vista |
|---|---|---|
| Tirar o braço da almofada | na subida, os braços giram 30° no ombro para fora da almofada e o cotovelo dobra só 100°: o cotovelo descola e o ombro ajuda | lateral, em cima |
| Soltar o peso embaixo ("o cotovelo trava de uma vez") | embaixo, o cotovelo estica até 0° (travado); a barra continua 6 cm acima dos ganchos | lateral, embaixo |
| Descer pouco | a volta para com o cotovelo dobrado 55° | lateral, embaixo |

Todos os erros do cartão estão desenhados.

## O equipamento

O banco Scott é peça nova (folha: `folha-banco-scott.png`): a almofada a 45° com 61 × 30,5 × 5 cm, o assento de 23 × 30,5 cm e as faixas de regulagem vêm da Deltech DF308; o tamanho total fica entre os da Precor, da Life Fitness e da Hammer Strength. De desenho (sem ficha): a distância do assento à almofada (9 cm, do corpo da tabela), o poste de viés com o pé 54 cm à frente da borda da almofada (as canelas ficam dos dois lados dele e a travessa da frente fica à frente das pontas dos pés) e os ganchos da barra. A almofada regula num tubo em pé preso no alto do poste de viés, perto da borda de baixo dela (com o tubo no meio da almofada, ele entrava na barriga). Pintura: o assento vai para trás (a pessoa senta por cima), o poste e o tubo da almofada vão um pouco para trás (ficam entre as pernas).

## Mudança em arquivo comum

Nenhuma. As peças e núcleos aprovados (barra W, regras das roscas e da barra W) são usados como estão; nada foi exportado de novo.

## O que não ficou bom

- O tríceps amassa a almofada só 0,4 cm (a ficha pede 1 cm, como na Scott aprovada): a conta põe 1 cm no ponto mais fundo do braço, e esse ponto fica logo acima da borda de cima, fora da almofada. A diferença não aparece no desenho.
- De lado, em cima, a anilha de perto cobre o queixo (é a mesma coisa da rosca com barra W aprovada; a anilha está ao lado da cabeça).
- A peça desenhada tem 88 cm de fundo, contra 102 da Deltech: o poste de viés não precisa ir mais longe para as pernas passarem.

**Risco de o Gustavo não gostar: médio.** A técnica copia a Scott que ele aprovou, mas a peça é nova e quem olha pode estranhar a almofada mais baixa e deitada (45°) que a do cartão de hoje e a anilha na frente do rosto em cima, na vista de lado.
