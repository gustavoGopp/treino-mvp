# Tríceps francês na polia com corda (`triceps-frances`)

Ficha curta, escrita na conferência das 40 animações antigas (sessão de catálogo, 04/11/2026; `docs/revisoes/catalogo/conferencia/antigas.md`). Esta animação é uma das 25 do guia original (`referencia/guia-execucao-fase1.html`), portada para o motor em M1 (`scripts/extrair-motor.mjs`, "port mecânico"), e o texto do app é `src/conteudo/exercicios/triceps-frances.json`. A técnica é a do guia: **consenso de treinadores**, sem estudo próprio, salvo o que está indicado abaixo. Os músculos seguem a revisão de anatomia de 02/11/2026 (`docs/revisoes/anatomia.md`).

- **Animação:** `triceps-frances` (aprovada; a linha de base clássica é conferida contra o guia original em `tests/motor/equivalencia.spec.ts`).

## Técnica (o que o guia e o texto do app pedem)
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Um pé à frente do outro, joelhos destravados. Tronco inclinado à frente ~25–30°, abdômen firme. Braços acima da cabeça, ao lado das orelhas, cotovelos apontando para a frente. | consenso | guia original |
| Alongado (pausa) | Mãos atrás da cabeça, cotovelos bem dobrados. | consenso | guia original |
| Extensão (concêntrica) | ~1 s. Estenda só o cotovelo, levando as mãos para a frente e para cima. | consenso | guia original |
| Fim (pausa) | Braços estendidos na linha do tronco. | consenso | guia original |
| Volta (excêntrica) | ~2–3 s, deixando as mãos irem bem para trás da cabeça. | consenso | guia original |
| Amplitude | Embaixo: mãos atrás da cabeça, cotovelos bem dobrados, sem dor. Em cima: cotovelos estendidos. Os cotovelos ficam no mesmo lugar do início ao fim. | consenso | guia original |

## Erros a animar
1. **Cotovelos abrem para os lados** (`abre`): O ombro gira e a carga sai do tríceps. Mantenha os cotovelos apontando para a frente.
2. **Cotovelos sobem e descem** (`cotovelo`): O ombro entra no movimento e o exercício vira um pullover. Só o antebraço se mexe.
3. **Não alongar atrás da cabeça** (`curta`): Parar com o cotovelo a 90° perde a parte alongada, que é o motivo deste exercício.

## Músculos
Primário: tríceps. Secundários: —. É o que a biblioteca conta (`src/domain/biblioteca/exercicios.json`), decidido na revisão de anatomia.

## Fontes
- Guia original: `referencia/guia-execucao-fase1.html` (consenso de treinadores; sem estudo que compare técnicas deste exercício, salvo o indicado acima).
- `../08-tecnica-guia.md`: as quatro decisões de técnica do guia que tiveram pesquisa própria.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.
