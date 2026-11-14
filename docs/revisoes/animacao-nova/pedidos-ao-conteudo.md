# Pedidos ao conteúdo (animação nova)

Esta frente não corrige texto técnico nem lista de músculos por conta própria. O que ela encontra fica aqui, com a fonte, para o Gustavo decidir em separado. Nada abaixo foi alterado em `src/conteudo/`, `src/domain/` nem no guia de hoje.

## 1. Supino reto com halteres: o ângulo dos cotovelos aparece com dois intervalos (14/11/2026)

| Onde | O que diz |
|---|---|
| Pesquisa da técnica (`docs/pesquisa/08-tecnica-guia.md`, conclusão 4, `tecnica.supino-halteres.cotovelos`) | cotovelos a **~30–60°** do tronco (consenso com apoio biomecânico) |
| Ficha da técnica da animação (`docs/pesquisa/animacoes/supino-reto.md`) | **~30–60°**, citando a conclusão acima |
| Texto do app (`src/conteudo/exercicios/supino-reto.json`, campo `vary`) | "entre **~30° e ~70°** do tronco" |
| Rótulo do guia de hoje, vista de cima (`src/engine/exercicios/supino-reto.ts`) | "cotovelo **~30–70°** do tronco" |

O que a animação nova faz: usa **30–60°** no rótulo e na regra conferida (o boneco desce com o braço a 50° do tronco), porque é o que a pesquisa lida sustenta.

Pedido: decidir qual intervalo vale e alinhar o texto do app (e o rótulo do guia de hoje, enquanto ele existir). Recomendação: 30–60°, o da pesquisa. Se o 70° veio de outra leitura (o campo `vary` cita um estudo de modelagem com supino de barra), a fonte precisa entrar na pesquisa.

## 2. Músculos: o que a conferência nova mostra (14/11/2026)

A conferência passou a comparar o músculo realçado em cada animação com a biblioteca do app (`src/domain/biblioteca/exercicios.json`). Não há divergência de papel nas quatro âncoras. Ficam três observações, que não são erro do conteúdo:

- **Flexão de braço:** o desenho realça o reto abdominal como "só ajuda a firmar", e a biblioteca não lista o abdômen na flexão. O guia de hoje já desenha assim. Confirmar se fica.
- **Puxada unilateral:** o trapézio aparece como secundário, e a biblioteca conta "costas" como um grupo só (principal). O guia de hoje desenha trapézio médio e inferior e romboides como secundários (decisão de 02/11/2026). Confirmar se fica.
- **Supino, flexão e puxada:** a biblioteca separa o ombro em anterior, lateral e posterior; o desenho novo só tem o deltoide inteiro. É a decisão aberta sobre as porções que o desenho não separa (proposta, seção 9, item 11).
