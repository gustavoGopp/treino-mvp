# Lote C1 · Panturrilha no leg press (`panturrilha-leg-press`)

De 18/11/2026. Primeira animação deste exercício (até aqui ele só aparecia como cartão de texto). Sentado no leg press 45° (a mesma máquina e o mesmo corpo no assento do leg press), os joelhos quase estendidos e parados, só a ponta dos pés na borda de baixo da chapa; o tornozelo estica e empurra o carro na guia, com a trava fechada a série inteira. **Ainda não aprovada nem ligada às telas.**

- Ficha da técnica: `docs/pesquisa/animacoes/panturrilha-leg-press.md`. Cartão do app: `src/conteudo/exercicios/panturrilha-leg-press.json` (só leitura).
- Ficha de movimento: `src/engine/novo/dados/movimentos/panturrilha-leg-press.json`.
- Animação: `src/engine/novo/exercicios/panturrilha-leg-press.ts`, sobre `exercicios/leg-press-base.ts`. Regras: `src/engine/novo/regras/leg-press.ts`; reaproveita a regra `joelhos-estendidos-na-panturrilha` (`regras/panturrilhas.ts`).
- Peça: o leg press (`pecas-de-cena/leg-press.ts`, folha `docs/revisoes/animacoes-restantes/pecas/folha-leg-press.png`).
- Quadros grandes: `../quadros/panturrilha-leg-press.png`. Sem folha ao lado da de hoje (não havia animação).

## Onde os números saem

A ficha da técnica não dá número. **O arco do tornozelo é o da panturrilha no step aprovada** (de 18,8° de dorsiflexão a 44,3° de flexão plantar: o calcanhar de 6,4 cm abaixo a 13,9 cm acima do step, com a canela em pé), e não a distância do calcanhar à chapa: aqui a perna chega à chapa inclinada (a 18° da perpendicular a ela), e o pé chapado já dobra o tornozelo 18°. Copiar os 6,4 cm do step daria 37° de dorsiflexão com o joelho esticado, além do que a tabela aceita como normal. Uma calibração por corpo acha o giro do pé na chapa que dá cada ângulo. Em cada quadro, o carro anda na guia até o joelho ficar nos 6° da ficha (a conta é a do leg press).

## O que a fonte pede × o que o boneco faz (medido) × confere?

| O que a ficha da técnica (e o cartão) pede | Selo | O que o boneco faz (medido) | Confere? |
|---|---|---|---|
| Trava de segurança fechada a série inteira | consenso | as alavancas fechadas no ciclo inteiro; no ponto mais baixo, o carro fica 4 cm acima dos suportes da trava (se o pé escapar, ele para ali) | sim |
| Costas e quadril apoiados | consenso | escápulas, bacia e glúteo a −1 cm dos estofados (afundam 1 cm); a bacia parada (0 cm); a lombar achatada 15° sem mudar | sim |
| Joelhos estendidos, sem travar | consenso | o joelho dobra 6° o ciclo inteiro (de 6° a 6°) | sim |
| Só a ponta dos pés na borda de baixo, calcanhares para fora | consenso | a bola do pé a 2,5 cm da borda de baixo, presa na chapa (anda 0 cm em relação a ela, a 0 cm da face); o calcanhar fica no mínimo 9,8 cm além da borda | sim |
| Descida de ~2 s até a panturrilha alongar bem; segura 1 s | consenso (regra `selecao.panturrilha-alongada`, um estudo) | 2 s descendo; embaixo o tornozelo dobra 18,8° para cima (o calcanhar 0,8 cm além do plano da chapa); pausa de 1 s | sim |
| Empurra com a ponta dos pés o máximo | consenso | 1 s subindo; em cima o tornozelo estica 44,3° (o calcanhar 15,7 cm acima do plano da chapa); pausa de 0,6 s | sim |
| O carro só anda na guia | medida | a chapa anda a 0° da guia; o carro anda 10,1 cm na guia | sim |
| Mãos nos pegadores | consenso | paradas (0 cm) | sim |

Conferência automática (`node scripts/animacao-nova/conferir.mjs panturrilha-leg-press`): **0 falhas, 2 avisos.**

- **Dorsiflexão 18,8°** (média da tabela 14,8°): é o alongamento da panturrilha no step aprovada, de propósito.
- **Provisórios:** a lombar, o pescoço, a cabeça, o quanto afunda, a largura e a direção dos pés, os dois ângulos do tornozelo (da animação aprovada, não da ficha), a anilha e o corte do quadro.

O resto: proporções exatas, ritmo suave (5,5% da velocidade de pico), simetria e fecho do ciclo em 0 cm.

## Os erros

| Erro | O que o desenho mostra (medido) | Vista, instante |
|---|---|---|
| Movimento curto | embaixo o tornozelo não dobra para cima (fica esticado 4,3°, no certo 18,8° para cima); em cima estica só 17,5° (no certo, 44,3°) | lateral, embaixo |
| Dobrar os joelhos | embaixo os joelhos dobram 22° (no certo, 6°) e esticam na subida, empurrando o carro com as coxas; o carro desce 1,6 cm a mais e continua acima da trava | lateral, embaixo |
| Quicar embaixo | **sem desenho**: é erro de ritmo ("bater e voltar sem a pausa"); a pose do quique é a mesma do movimento certo. Fica para o ritmo próprio por erro (plano, seção 5) ou para a lista `SEM_DESENHO` do teste da ponte | — |

## Correções da revisão de 18/11/2026 (quem integra)

1. **O movimento do tornozelo não se lia** (o corpo inteiro no quadro, o pé pequeno no canto). Agora o quadro de lado mostra só a perna, do pé ao joelho e 40% da coxa, com a borda de baixo da chapa e 16 cm dela acima dos dedos (`quadro.coxa`, `quadro.chapa`); o tronco e o alto da máquina são cortados pela borda (seção 7 do guia). O pé ficou umas três vezes maior: embaixo se vê o calcanhar abaixo da ponta, em cima a ponta do pé na borda da chapa. Para isso o motor ganhou um campo opcional no exercício, `enquadra` (`movimento.ts`, lido em `caixaDoCiclo`, `cena.ts`): numa vista, o quadro mostra só os pontos pedidos. Sem ele, nada muda nas outras animações (o `preparo.mjs` só regravou o arquivo deste exercício).
2. **A vista de três quartos escondia os pés atrás da chapa: saiu, e a animação fica com uma vista só.** Testei as outras com o mesmo corte: de frente e de cima, a chapa cobre os pés; de trás, o encosto cobre o corpo; de três quartos por trás, o carro e as anilhas ficam por cima das canelas e o pé se perde no canto. Nenhuma mostra o tornozelo melhor que de lado.
3. **No modo Trajetória ficou só o calcanhar** ("chapa" andava quase junto com ele, uma linha sobre a outra).

## A decisão do Gustavo (21/11/2026)

Na folha das duas versões (`../../animacoes-restantes/panturrilha-leg-press-as-duas.png`: só a perna, a de hoje, e o corpo inteiro, a primeira de 18/11), o Gustavo aprovou a de só a perna: "pode aprovar a só na perna". A animação entrou em `APROVADOS` e na linha de base do motor novo.

## O que não ficou bom

- **O calcanhar quase não passa do plano da chapa** (0,8 cm embaixo): o alongamento está no ângulo do tornozelo, igual ao da panturrilha aprovada. Para mostrar mais, o tornozelo teria de dobrar 25° a 37° com o joelho esticado, além da média da tabela.
- **Atrás do pé fica a anilha** (escura) e a alavanca da trava: o pé claro se destaca dela, mas a cena é carregada. Tirar a anilha da vista seria mudar a peça.
- **Uma vista só** (o guia pede duas): ver o item 2 acima. A miniatura mostra só a perna e o pé na chapa.
- **Um rótulo só** ("joelhos estendidos"); o nome do erro "Dobrar os joelhos" encosta na coxa, no canto do quadro.

**Risco de o Gustavo não gostar: médio.** O tornozelo agora se lê; a anilha atrás do pé e a vista única são os pontos a olhar.
