# Crucifixo invertido sentado, com o peito nas coxas, com halteres (`crucifixo-invertido-sentado`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 1; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/crucifixo-invertido-sentado.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** um par de halteres e uma cadeira firme ou um banco.
- **Função:** ombro posterior (no nível do crucifixo invertido curvado).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Sentado, peito nas coxas, halteres pendurados | consenso | `17`, G3 |
| Movimento | Abrir os braços para os lados até a altura dos ombros, cotovelos quase retos | um estudo (modelagem) | `zhu2025`, `schoenfeld2013` |

## Por que assim
O crucifixo invertido curvado ficou ao lado do face pull e acima da remada curvada para o deltoide posterior (modelagem, 10 homens, `zhu2025`, um estudo); a posição da mão muda a ativação do posterior (EMG, `schoenfeld2013`, `franke2015`). É a versão apoiada do curvado: com o peito nas coxas, a lombar carrega menos (**[opinião]**), e o iniciante a recebe pelo desempate de estabilidade (`selecao.estabilidade`).

## Segurança
- Ombro (dor de hoje acima de 5 tira o exercício). A curvada sem apoio teve a maior carga lombar (`fenwick2009`): aqui o tronco fica apoiado.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: ombro posterior. Sem secundário: os crucifixos invertidos não contam costas (revisão de anatomia, achado 5). **Um estudo** (`zhu2025`).

## Como a carga sobe
Halter: o próximo peso da lista; pausa de 2 s no alto. **Consenso**.

## Referência visual
> Nenhum vídeo levantado em `17`; termo de busca: "seated bent over rear delt fly". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `zhu2025` (`docs/pesquisa/fontes.md`).
- `schoenfeld2013` (`docs/pesquisa/fontes.md`).
- `franke2015` (`docs/pesquisa/fontes.md`).
- `fenwick2009` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/crucifixo-invertido-sentado.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (ombro posterior, sem secundário) e a biblioteca; a nota, dos erros "Encolher os ombros" e "Virar remada" e da pausa do cartão ("sem juntar as escápulas") | um estudo | `zhu2025` (modelagem); `schoenfeld2013` (EMG) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | equipamento e posição do cartão; a linha Posição da tabela | consenso | `17`, G3 |
| Variações (`vary`) | o equipamento do cartão e a linha Movimento da tabela | um estudo (modelagem) e consenso | `zhu2025`; `17`, G3 |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/crucifixo-invertido-sentado.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa; o `vary` usa a escolha entre cadeira e banco do cartão.
