# Barra fixa com pegada supinada (`barra-fixa-supinada`)

Exercício da biblioteca: puxar vertical, nível 1, junto com a `barra-fixa` (pronada). **Animação em revisão** (`src/engine/exercicios/revisao/barra-fixa-supinada.ts`), feita a partir da `barra-fixa` aprovada. Folha: `docs/revisoes/equipamento-minimo/folhas/barra-fixa-supinada.png`.

- **Equipamento:** barra fixa (`barra_fixa`).
- **Função:** puxar vertical (costas), nível 1.

## Técnica animada
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Pegada | Palmas viradas para você, mãos mais ou menos na largura dos ombros (mais fechada que a pronada da `barra-fixa`, ~1,5× os ombros) | consenso (a largura); moderada (a pegada muda pouco o dorsal, por EMG) | `youdas2010`; `dickie2017`; `../08-tecnica-guia.md`, conclusão 2 |
| Cotovelos | Na subida, os cotovelos descem à frente do corpo, rentes às costelas (na pronada, vão mais para os lados) | consenso [opinião: consequência mecânica da pegada; desenhado pelo ponto de flexão do cotovelo] | — |
| Começo | Pendurado com os braços estendidos; primeiro as escápulas descem, depois os braços dobram | consenso | mesma sequência da `barra-fixa` aprovada |
| Topo | Queixo acima da barra, peito perto dela, tronco um pouco inclinado para trás | consenso | mesma sequência da `barra-fixa` aprovada |
| Descida | ~2–3 s, controlada, até os braços estenderem de novo | consenso | mesma cadência da `barra-fixa` aprovada |
| Corpo | Pernas juntas, joelhos levemente dobrados, sem balanço | consenso | mesma pose da `barra-fixa` aprovada |

## Por que assim
A ativação do dorsal é parecida entre as pegadas; a supinada recruta mais o bíceps (e o peitoral), a pronada mais o trapézio inferior (`youdas2010`, `dickie2017`; EMG, **moderada** para "a pegada muda pouco o dorsal"). EMG não mede crescimento: não há estudo de hipertrofia comparando pegadas (`../08-tecnica-guia.md`, lacunas). A supinada costuma permitir mais repetições e serve para iniciantes [opinião, como em `../08-tecnica-guia.md`].

## Erros animados
1. **Balanço** (`balanco`, vista de lado): chutar e balançar para ganhar impulso.
2. **Meia repetição embaixo** (`meia`, vista de trás): não estender os braços.
3. **Ombros encolhidos no topo** (`encolher`, vista de trás): ombros sobem até as orelhas e o pescoço estica para passar o queixo.

## Músculos
Primário: costas (dorsal). Secundário: bíceps (biblioteca: `costas`; `biceps`). **Selo:** moderada (EMG; `youdas2010`, `dickie2017`), sem dado de hipertrofia. **No desenho:** dorsal (principal); bíceps e trapézio médio e inferior com romboides (secundários: são parte de `costas`, como na `barra-fixa` aprovada). Saíram o deltoide posterior (a biblioteca não conta `ombro_posterior` nesta pegada) e o antebraço (que na `barra-fixa` aparece listrado, "só ajuda", por `SO_AJUDA` no motor, que não foi mexido aqui).

## Como a carga sobe
Peso do corpo, pela escada do exercício (`src/domain/progressao/escadas.json`): descida de 3 s, pausa de 1 s em cima, descida de 5 s. Com menos de ~5 repetições, a alternativa da função.

## Referência visual
> Referência visual de movimento, **não fonte de regra; não assistido nesta sessão**. Achados por busca na web em 03/11/2026; canal não confirmado nos dois.

| Canal | Título | URL |
|---|---|---|
| não confirmado | Chin ups- supinated grip | https://www.youtube.com/watch?v=sNBS5iIu6Zg |
| não confirmado | Chin Up Demo | https://www.youtube.com/watch?v=-ggSDT68kk8 |

## Fontes
- `youdas2010` (já em `../fontes.md`): Youdas JW et al. Surface electromyographic activation patterns and elbow joint motion during a pull-up, chin-up, or perfect-pullup rotational exercise. J Strength Cond Res 2010. PMID 21068680. Status `verificado-busca` (valores do latíssimo não conferidos).
- `dickie2017` (já em `../fontes.md`): Dickie JA et al. Electromyographic analysis of muscle activation during pull-up variations. J Electromyogr Kinesiol 2017. PMID 28011412. Status `verificado-busca`.
