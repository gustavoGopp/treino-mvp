# Elevação lateral com caneleira presa no punho (`elevacao-lateral-caneleira`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/17-biblioteca-ampliada.md`, G3, lote 3; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/elevacao-lateral-caneleira.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** um par de caneleiras.
- **Função:** elevação lateral (no nível da elevação com elástico).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Montagem | Caneleira no antebraço, acima do punho, velcro firme | consenso | `17`, G3 |
| Movimento | Braços para os lados até a altura dos ombros | consenso | `coratella2020` |

## Por que assim
Carga baixa perto da falha cresce como carga alta (`schoenfeld2017b`, robusta, o princípio). **Contra:** uma aula com pesos de 0,5 a 5 kg e repetições fixas, sem ir até a falha, não mudou a espessura do deltoide médio (45 mulheres, 12 semanas, `svensen2025`, um estudo). Por isso a série vai perto da falha. Fecha a vaga do ombro lateral de quem só tem caneleiras.

## Segurança
- Ombro (dor de hoje acima de 5 tira o exercício). A caneleira escorrega: velcro firme no antebraço.
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: ombro lateral. Sem secundário. **Consenso** (o princípio é robusto).

## Como a carga sobe
Caneleira: a próxima da lista; sem uma mais pesada, mais repetições (`equipamento.escada-carga-leve`) e `equipamento.fim-da-escada`.

## Referência visual
> Nenhum vídeo levantado em `17`; termo de busca: "wrist weight lateral raise". A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `schoenfeld2017b` (`docs/pesquisa/fontes.md`).
- `svensen2025` (`docs/pesquisa/fontes.md`).
- `coratella2020` (`docs/pesquisa/fontes.md`).

## Texto do guia (18/11/2026)
Preparado para a ligação da fase A, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/elevacao-lateral-caneleira.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (ombro lateral, sem secundário) e a biblioteca; a nota, do erro "Encolher os ombros" do cartão | consenso | `coratella2020` |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linha Montagem da tabela e a posição do cartão | consenso | `17`, G3 |
| Variações (`vary`) | a linha Movimento e Por que assim (carga baixa perto da falha) | robusta (o princípio); um estudo, contra, sem ir à falha | `schoenfeld2017b`; `svensen2025` |
| Nota (`note`) | a montagem do cartão e a seção Segurança da ficha | consenso | `17`, G3 |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/elevacao-lateral-caneleira.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** a ficha não diz nada que varie de pessoa para pessoa: o `vary` só traz o que não muda.
