# Desenvolvimento em pé com dois halteres (`desenvolvimento-em-pe-halteres`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 1; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/desenvolvimento-em-pe-halteres.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** um par de halteres, sem banco.
- **Função:** empurrar vertical (nível próprio, logo depois do desenvolvimento: o animado não perde o lugar nos programas da academia).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Em pé, halteres na altura dos ombros, abdômen e glúteos firmes | consenso | `saeterbakken2013` |
| Movimento | Empurrar até quase estender acima da cabeça, sem arquear a lombar | consenso | `saeterbakken2013` |

## Por que assim
Em pé com halteres, os deltoides ativaram mais e a carga foi menor que sentado (EMG, um estudo, `saeterbakken2013`); o equipamento não decide o crescimento (`haugen2023`, robusta). Abre o empurrar vertical para quem tem halteres e não tem banco.

## Segurança
- Ombro, cotovelo e lombar (dor de hoje acima de 5 tira o exercício): em pé, a lombar arqueia se a carga subir demais.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: frente do ombro. Secundários: lateral do ombro e tríceps, como o desenvolvimento sentado (revisão de anatomia, achado 4). **Consenso**.

## Como a carga sobe
Halter: o próximo peso da lista (`progressao.incremento.halteres`); sem um mais pesado, `equipamento.escada-carga-leve`.

## Referência visual
> Nenhum vídeo levantado em `17`; o mesmo movimento do desenvolvimento sentado, em pé. A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `saeterbakken2013` (`docs/pesquisa/fontes.md`).
- `haugen2023` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/desenvolvimento-em-pe-halteres.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (frente do ombro; lateral do ombro e tríceps) e a biblioteca; a nota, da seção Segurança (lombar) e do erro "Arquear a lombar" | consenso | revisão de anatomia, achado 4; `saeterbakken2013` (EMG) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | posição do cartão e a linha Posição da tabela de técnica | consenso | `saeterbakken2013` |
| Variações (`vary`) | a posição do cartão (palmas para a frente ou uma para a outra) e a linha Movimento | consenso | `saeterbakken2013` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/desenvolvimento-em-pe-halteres.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa; o `vary` usa a escolha de pegada do cartão.
