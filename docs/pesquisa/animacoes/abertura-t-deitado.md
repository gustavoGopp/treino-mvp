# Abertura em T deitado de bruços, sem carga (`abertura-t-deitado`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/16-corpo-livre-e-casa.md`, parte 2; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/abertura-t-deitado.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** o chão, um colchonete e uma toalha.
- **Função:** ombro posterior (nível novo, o último, sem carga).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | De bruços, testa na toalha, braços em T, polegares para cima | um estudo (EMG da rotação) | `lim2015`, `yu2024` |
| Movimento | Erguer os braços abrindo para trás, sem levantar a cabeça nem encolher os ombros | consenso | TSAOG (vídeo, `17`, G2) |
| Cadência | ~1 s subindo, 1 s parado, ~2 s descendo | consenso | `tempo.serie` |

## Por que assim
É o único isolador do ombro de trás possível sem nada. A abertura de bruços sem carga ativa o trapézio médio e o inferior (EMG, **moderada**, `rabello2024`, `lim2015`, `yu2024`); **o deltoide posterior e o crescimento sem carga não foram medidos** (consenso). A 1ª revisão cega achou que ela ocupa uma série com pouco estímulo, mas sem ela, nos cenários com pouco para puxar, os exercícios novos de empurrar passam do limite de empurrar ÷ puxar (decisão 10 de `g-biblioteca-ampliada.md`). **Não conta como série de costas** (o projeto não conta o trapézio).

## Segurança
- Ombro (dor de hoje acima de 5 tira o exercício, como os outros da função). Risco baixo.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: ombro posterior. Sem secundário: o trapézio médio e o inferior trabalham, mas não são músculos do app. **Moderada** para a ativação do trapézio; **consenso** para o deltoide.

## Como a carga sobe
Peso do corpo, pela escada própria: pausa de 3 s no alto → descida de 3 s → braços em Y → Y com pausa. No topo do último degrau, vale `equipamento.fim-da-escada`. A faixa segue `reps.faixa.degrau` (12–20, como o face pull), e não os 15–30 propostos em `16`. **Consenso**. Escada em `src/domain/progressao/escadas.json`: pausa de 3 s no alto → descida de 3 s → braços em Y (polegares para cima) → Y com pausa de 3 s no alto.

## Referência visual
> TSAOG Orthopaedics & Spine, "Prone I's, T's, Y's" (https://www.youtube.com/watch?v=rKVuKuR4SA4); [P]rehab, "Prone Y's, T's, & I's" (https://www.youtube.com/watch?v=aFtzZl4ySMo); Jeremy Ethier (https://www.youtube.com/watch?v=ccLoSTz0a_I, 6:23, polegares para cima). Listados em `17`, G2, seção 6. A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `rabello2024` (`docs/pesquisa/fontes.md`).
- `lim2015` (`docs/pesquisa/fontes.md`).
- `yu2024` (`docs/pesquisa/fontes.md`).
