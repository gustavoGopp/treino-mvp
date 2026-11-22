# Abdução de quadril em pé com elástico preso sob o outro pé (`abducao-elastico`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 2; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/abducao-elastico.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** um elástico e uma parede para a mão.
- **Função:** abdução (no nível da abdução com caneleira e com mini-band).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | De lado para a parede, elástico sob o pé de dentro e no tornozelo de fora | consenso | `17`, G3 |
| Movimento | Perna para o lado, estendida, dedos para a frente, tronco reto | um estudo (revisão de EMG) | `macadam2015` |

## Por que assim
A abdução em pé com elástico no tornozelo está entre as que mais ativam o glúteo médio (revisão de 23 estudos de EMG, `macadam2015`, um estudo); a abdução na polia cresceu o glúteo médio e o mínimo (`attarieh2026`, um estudo). Troca a abdução sem carga por uma com carga em quem tem elástico (`selecao.gluteo`: complemento, não substitui a extensão de quadril).

## Segurança
- Quadril (dor de hoje acima de 5 tira o exercício). Equilíbrio numa perna: a mão na parede.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: glúteos (médio e mínimo). Sem secundário. **Um estudo** (`attarieh2026`).

## Como a carga sobe
Elástico: pelas intensidades que a pessoa tem.

## Referência visual
> Nenhum vídeo levantado em `17`; termo de busca: "standing banded hip abduction". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `macadam2015` (`docs/pesquisa/fontes.md`).
- `attarieh2026` (`docs/pesquisa/fontes.md`).
- `ng2022` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/abducao-elastico.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (glúteos médio e mínimo) e o alvo do cartão; a nota, dos erros "Girar o pé para fora" e "Inclinar o tronco" | um estudo | `attarieh2026`; `macadam2015` (EMG) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | posição do cartão e as linhas Posição e Movimento da tabela de técnica | um estudo (revisão de EMG) e consenso | `macadam2015`; `17`, G3 |
| Variações (`vary`) | o equipamento do cartão (laço ou elástico longo com nó) e a linha Movimento | consenso | `17`, G3 |
| Nota (`note`) | a montagem do cartão, num texto só | um estudo | `ng2022` (lesões de olho com elástico que escapou) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/abducao-elastico.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa; o `vary` só junta o tipo de elástico e o que não muda.
