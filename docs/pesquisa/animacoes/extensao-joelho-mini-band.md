# Extensão de joelho sentado com mini-band nos tornozelos (`extensao-joelho-mini-band`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 3; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/extensao-joelho-mini-band.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** uma mini-band e uma cadeira firme.
- **Função:** extensora (no nível da extensão de joelho com elástico).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, mini-band nos tornozelos, a perna parada segura | consenso ([mercado]) | Physitrack; The Prehab Guys (só na busca, `17`, G3) |
| Movimento | Estender o joelho até a perna ficar reta | consenso | idem |

## Por que assim
Na máquina, a extensora cresce o reto femoral (`kinoshita2026`, moderada). **Contra:** extensão de joelho e agachamento com elástico, sem restrição de fluxo, não cresceram a coxa em idosas (10 por grupo, 12 semanas, `yasuda2016`, um estudo; financiado pela KAATSU). A evidência com elástico é fraca, e o app diz isso. Fecha a vaga obrigatória da extensora em quem só tem mini-band.

## Segurança
- Joelho (dor de hoje acima de 5 tira o exercício).
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: quadríceps. Sem secundário. **Moderada** para a extensora em máquina; **um estudo, contra**, com elástico.

## Como a carga sobe
Mini-band: pelas intensidades da mini-band; descida de 3 s.

## Referência visual
> Nenhum vídeo com credencial em `17`; termo de busca: "seated knee extension mini band". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `kinoshita2026` (`docs/pesquisa/fontes.md`).
- `yasuda2016` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/extensao-joelho-mini-band.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (quadríceps, sem secundário) e a biblioteca; a nota, da posição do cartão e do erro "Levantar o quadril da cadeira" | moderada (extensora em máquina); um estudo, contra, com elástico | `kinoshita2026`; `yasuda2016` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | posição do cartão e a linha Posição da tabela de técnica | consenso ([mercado]) | Physitrack; The Prehab Guys (`17`, G3) |
| Variações (`vary`) | a linha Movimento da tabela de técnica e o erro "Parar longe da falha" do cartão | consenso | Physitrack; The Prehab Guys (`17`, G3) |
| Nota (`note`) | a montagem do cartão | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/extensao-joelho-mini-band.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz nada que varie de pessoa para pessoa: o `vary` só traz o que não muda. A ficha também não dá fonte para "perto da falha" com a mini-band (o cartão pede; as caneleiras usam `schoenfeld2017b`).
