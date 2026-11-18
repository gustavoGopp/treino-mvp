# Remada alta na suspensão, com os cotovelos abertos (`face-pull-suspensao`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 3; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/face-pull-suspensao.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** a fita de suspensão.
- **Função:** ombro posterior (no nível da abertura em Y e T na suspensão).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Corpo inclinado e reto, palmas para baixo | consenso | `aguileracastells2020` |
| Puxada | Cotovelos altos e abertos, mãos ao lado das orelhas | um estudo (EMG) | `youdas2021` |

## Por que assim
Na remada alta e na remada com abdução horizontal na suspensão, o deltoide posterior e o trapézio passaram de 60% da contração máxima (EMG, 28 adultos, `youdas2021`, um estudo). Variação com carga para quem só tem a suspensão.

## Segurança
- Ombro e cotovelo (dor de hoje acima de 5 tira o exercício). Ancoragem firme e testada (`seguranca.montagem`).
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: ombro posterior. Secundário: costas, porque a técnica junta as escápulas, como o face pull (revisão de anatomia, achado 5). **Um estudo** (EMG).

## Como a carga sobe
Peso do corpo, pela escada própria (copiada da remada na suspensão): pés mais à frente → pausa de 2 s → descida de 3 s → as duas. **Consenso**. Escada em `src/domain/progressao/escadas.json`: pés mais à frente (corpo mais deitado) → pausa de 2 s com as mãos ao lado das orelhas → descida de 3 s → pés mais à frente, com descida de 3 s.

## Referência visual
> Nenhum vídeo levantado em `17`; termo de busca: "TRX face pull". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `youdas2021` (`docs/pesquisa/fontes.md`).
- `aguileracastells2020` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/face-pull-suspensao.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (ombro posterior; costas, "porque a técnica junta as escápulas") e a biblioteca; a nota, do erro "Cotovelos baixos" do cartão | um estudo (EMG) | `youdas2021` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | equipamento e posição do cartão; a tabela de técnica e a seção Segurança (ancoragem testada) | consenso e um estudo (EMG) | `aguileracastells2020`; `youdas2021`; `seguranca.montagem` |
| Variações (`vary`) | a seção "Como a carga sobe" (pés mais à frente) e a tabela de técnica | consenso | `aguileracastells2020`; `youdas2021` |
| Nota (`note`) | a montagem do cartão | consenso | `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/face-pull-suspensao.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa; o `vary` usa o primeiro degrau da escada de carga.
