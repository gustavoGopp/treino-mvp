# Remada curvada em pé com elástico, pisando no meio (`remada-curvada-elastico`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G2 e G3, lote 2; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/remada-curvada-elastico.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** um elástico longo, sem ancoragem.
- **Função:** puxar horizontal (no nível da remada com elástico).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pés inteiros no meio do elástico, tronco inclinado, costas retas | consenso | Will Harlow (vídeo, `17`, G2) |
| Puxada | Cotovelos para trás, perto do corpo | consenso | idem |

## Por que assim
Na força, o elástico iguala a carga convencional (meta-análise, `lopes2019`, moderada); na remada com elástico, o trapézio médio e o inferior ativaram menos que com peso livre (EMG, `isiklar2026`, um estudo). É a 2ª remada sem ponto de ancoragem: quem só tem elástico deixa de repetir a mesma remada em todos os dias.

## Segurança
- Ombro, cotovelo e **lombar** (tronco inclinado; dor de hoje acima de 5 tira o exercício). Numa série de 11 casos de lesão de olho, em todos o elástico escapou da ancoragem, sob ou à frente da pessoa (`ng2022`, um estudo): pé inteiro sobre o elástico e conferir rachaduras.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: costas. Secundários: bíceps e ombro posterior, como as outras remadas. **Consenso**.

## Como a carga sobe
Elástico: pelas intensidades que a pessoa tem (`progressao.escada-elastico`).

## Referência visual
> Will Harlow (https://www.youtube.com/watch?v=Z9-VEzx-8mA, 8:25). Listado em `17`, G2, seção 6. A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `lopes2019` (`docs/pesquisa/fontes.md`).
- `isiklar2026` (`docs/pesquisa/fontes.md`).
- `fenwick2009` (`docs/pesquisa/fontes.md`).
- `ng2022` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/remada-curvada-elastico.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (costas; bíceps e ombro posterior) e a biblioteca; a nota, da seção Segurança (lombar) e dos erros 1 e 2 | consenso | `17`, G2 |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | posição do cartão e a tabela de técnica | consenso | Will Harlow (vídeo, `17`, G2); `ng2022` (pés inteiros) |
| Variações (`vary`) | a tabela de técnica e as dicas do cartão | consenso | Will Harlow (vídeo, `17`, G2) |
| Nota (`note`) | a montagem do cartão, num texto só | um estudo | `ng2022` (lesões de olho com elástico que escapou) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/remada-curvada-elastico.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz nada que varie de pessoa para pessoa: o `vary` só traz o que não muda.
