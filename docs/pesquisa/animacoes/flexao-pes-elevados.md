# Flexão com os pés elevados (`flexao-pes-elevados`)

Exercício **novo** da biblioteca ampliada (R5-CL, 07/11/2026; `docs/pesquisa-v2/16-corpo-livre-e-casa.md`, parte 1; os níveis e o motivo de entrar em `docs/revisoes/proximos-passos/g-biblioteca-ampliada.md`, seção 2). Ainda sem animação aprovada: **ficha de técnica para o cartão de texto** (`src/conteudo/exercicios/flexao-pes-elevados.json`); a animação, se vier, sai desta ficha.

- **Equipamento:** o peso do corpo e um apoio firme para os pés (degrau de escada, cama ou sofá).
- **Função:** empurrar horizontal (no nível da flexão) e empurrar inclinado (no nível da flexão).

## Técnica
| Ponto | O que o cartão mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Mãos no chão um pouco mais abertas que os ombros; pés no apoio; corpo reto | consenso | `ebben2011` |
| Descida | Cotovelos a ~45° do corpo, até o peito quase tocar o chão, em ~2 a 3 s | consenso | `tempo.serie` |
| Subida | Empurra até os braços estenderem, sem travar | consenso | `ebben2011` |

## Por que assim
Com os pés elevados, as mãos carregam uma parte maior do peso do corpo que na flexão comum (cinética, um estudo, `ebben2011`); a flexão comum cresceu o peito como o supino com a carga igualada (`kikuchi2017`, um estudo). **Não há medida de que trabalhe mais a parte de cima do peito**: entra para variar dentro da função (`selecao.variacoes-equivalentes`), e o cartão não promete "peito de cima". Complexidade 3: o iniciante chega a ela pela escada da flexão, e não no 1º programa (decisão 2 de `g-biblioteca-ampliada.md`).

## Segurança
- Ombro, cotovelo e punho (dor de hoje acima de 5 tira o exercício). A cabeça fica abaixo do quadril. O apoio dos pés não pode deslizar (`seguranca.montagem`).
- Dor articular aguda, formigamento ou perda de força incomum: parar, usar a alternativa e procurar avaliação se persistir (`seguranca.alerta.musculoesqueletico`).

## Músculos
Primário: peito. Secundários: tríceps e frente do ombro, como a flexão. **Consenso** (o mesmo movimento da flexão; `kikuchi2017` para o peito).

## Como a carga sobe
Peso do corpo, pela escada própria (`progressao.escada-por-exercicio`): descida de 3 s → pés mais altos → pausa de 2 s embaixo → déficit com os pés elevados. **Consenso**. Escada em `src/domain/progressao/escadas.json`: descida de 3 s → pés mais altos (da cama para uma cadeira firme encostada na parede; sem ela: descida de 4 s) → pausa de 2 s embaixo → mãos em dois apoios firmes (déficit), com os pés elevados (sem eles: pausa de 2 s embaixo com descida de 3 s).

## Referência visual
> NASM, "How to do a Decline Push-Up" (https://www.youtube.com/watch?v=DBz85WuXqMk); Trident Physical Therapy, "Decline Push Ups" (https://www.youtube.com/watch?v=gvCUCnIBkF8). Listados em `17`, G2, seção 6; o app não usa vídeo. A técnica dos vídeos não foi conferida por dentro (`17`, G2, seção 6); o cartão segue a tabela acima.

## Fontes
- `ebben2011` (`docs/pesquisa/fontes.md`).
- `kikuchi2017` (`docs/pesquisa/fontes.md`).
