# Barra fixa só na descida (negativa) (`barra-fixa-negativa`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G4; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/barra-fixa-negativa.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** a barra fixa e um banco ou degrau firme.
- **Função:** puxar vertical (o último nível).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Subir pelo banco, nunca pular nem usar cadeira giratória | um estudo (quedas) | `shabbir2026` |
| Descida | 3 a 5 s, até os braços estenderem; 3 a 6 descidas por série | consenso | `17`, G4 |
| Pegada | Pronada, um pouco mais aberta que os ombros | consenso | `tecnica.barra-fixa.pegada` |

## Por que assim
Só a descida cresce como só a subida (duas meta-análises; `schoenfeld2017`, `dasilva2025`, moderada; certeza baixa). O treino só de descida melhorou a força na barra (`vigouroux2024`, um estudo), e quem não faz uma barra precisa de um começo: universitárias fazem, em média, 0,73 do peso do corpo na barra (`johnson2009`, um estudo). Entra no fim do puxar vertical (decisão 4 de `g-biblioteca-ampliada.md`): é a 2ª puxada de quem só tem a barra e a alternativa de quem ainda não faz a barra. **Para o iniciante, falta a regressão pelo nível** (marco seguinte).

## Segurança
- Ombro e cotovelo (dor de hoje acima de 5 tira o exercício). Queda ao subir ou ao soltar: metade dos atendimentos por barra fixa teve trauma na cabeça ou no rosto, a maioria em casa (`shabbir2026`, um estudo): subir pelo banco (`seguranca.montagem`). Dor tardia forte na 1ª semana (**[opinião]**): começar com 2 séries.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: costas. Secundários: bíceps e ombro posterior, como a barra fixa. **Consenso**.

## Como a carga sobe
Peso do corpo, pela escada própria: descida de 5 s → pausa em cima e descida de 5 s → pausa em cima e no meio. No topo, passar para a barra fixa (como `progressao.incremento.assistido` faz do graviton para a barra). **Consenso**. Escada em `src/domain/progressao/escadas.json`: descida de 5 s → pausa de 2 s em cima e descida de 5 s → pausa de 2 s em cima e no meio, e descida de 5 s.

## Referência visual
> Nenhum vídeo com credencial em `17` além dos degraus da barra (megsquats, ATHLEAN-X); termo de busca: "negative pull up". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `schoenfeld2017` (`docs/pesquisa/fontes.md`).
- `dasilva2025` (`docs/pesquisa/fontes.md`).
- `vigouroux2024` (`docs/pesquisa/fontes.md`).
- `johnson2009` (`docs/pesquisa/fontes.md`).
- `shabbir2026` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/barra-fixa-negativa.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (costas; bíceps e ombro posterior) e a biblioteca; a nota, do erro "Soltar o corpo" do cartão e da seção Segurança (dor tardia na 1ª semana) | consenso; a dor tardia é **[opinião]** | `17`, G4 |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | montagem e posição do cartão; as linhas Montagem e Pegada da tabela | um estudo (quedas) e consenso | `shabbir2026`; `tecnica.barra-fixa.pegada` |
| Variações (`vary`) | o equipamento do cartão (banco, degrau ou caixa) e as linhas Montagem e Descida | um estudo (quedas) e consenso | `shabbir2026`; `17`, G4 |
| Nota (`note`) | a montagem do cartão, num texto só | um estudo | `shabbir2026`; `seguranca.montagem` |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/barra-fixa-negativa.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz o que varia de pessoa para pessoa; o `vary` usa a escolha do apoio do cartão. A respiração segue as fases da ficha de movimento (inspira em cima, expira na descida), porque aqui não há subida pela barra; a ficha não fala de respiração, e o texto não acrescenta nada além da regra comum.
