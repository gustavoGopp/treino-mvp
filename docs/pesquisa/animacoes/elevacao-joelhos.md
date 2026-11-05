# Elevação de joelhos na barra fixa (`elevacao-joelhos`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/elevacao-joelhos.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `elevacao-joelhos` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Pendure com a pegada na largura dos ombros ou um pouco mais aberta. Ombros ativos: afaste-os um pouco das orelhas. Corpo parado, pernas juntas. | consenso | guia original |
| Pendurado (pausa) | Corpo parado. | consenso | guia original |
| Subida (concêntrica) | ~1 s. Suba os joelhos e, no fim, enrole a pelve para cima, como se levasse os joelhos ao peito. | consenso | guia original |
| Topo (pausa) | Joelhos acima do quadril, pelve enrolada. | consenso | guia original |
| Descida (excêntrica) | ~2 s, sem deixar o corpo balançar. | consenso | guia original |
| Amplitude | Em cima: joelhos pelo menos na altura do quadril, com a pelve enrolada. Embaixo: pernas estendidas, sem embalo. Se a pegada cansar antes do abdômen, troque pelo abdominal na polia. | consenso | guia original |

## Erros a animar
1. **Balançar o corpo** (`balanco`): O balanço sobe as pernas por impulso e o abdômen quase não trabalha.
2. **Só levantar as pernas** (`pelve`): Subir os joelhos sem enrolar a pelve trabalha a frente do quadril e quase não usa o abdômen.

## Músculos
Primário: abdômen. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.
