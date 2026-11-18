# Panturrilha em pé na máquina (`panturrilha-em-pe-maquina`)

Exercício **proposto no T7** (`../../pesquisa-v2/08-equipamentos-v2.md`). Ainda não está na biblioteca, nem no motor de animação. **Ficha de técnica para revisão do Gustavo.**

- **Equipamento:** máquina de panturrilha em pé (`panturrilha_em_pe_maquina`, novo)
- **Função do T3:** flexão plantar em pé (panturrilha, 1ª função). Selo da função no T3: um estudo (efeito grande e coerente).
- **Frequência estimada:** 0,44 vaga por semana na academia completa (divide com o leg press e o step). Modelo de estimativa: `08`, seção 6.

## Técnica a animar
| Ponto | O que a animação mostra | Selo | Fonte |
|---|---|---|---|
| Posição | Ombros sob as almofadas; ponta dos pés na borda da plataforma; joelhos estendidos sem travar | consenso | `nsca2021` (não verificado) |
| Embaixo | Calcanhar desce bem abaixo da plataforma, até o alongamento máximo, com pausa de ~1 s | um estudo | `kassiano2023b` |
| Em cima | Sobe o calcanhar o máximo possível | consenso | `nsca2021` (não verificado) |
| Joelhos | Ficam estendidos o tempo todo, para o gastrocnêmio trabalhar alongado | um estudo | `kinoshita2023` |

## Por que assim
A panturrilha em pé cresceu muito mais o gastrocnêmio do que a sentada: +9% a +12% × +1% a +2% (Kinoshita 2023; um estudo). Treinar na parte alongada cresceu mais o gastrocnêmio que a amplitude completa (Kassiano 2023; um estudo). A máquina permite carga alta, o que falta no step com halter (`selecao.panturrilha-alongada`).

## Erros a animar
1. **Subida e descida curtas** (sem passar da linha da plataforma).
2. **Dobrar os joelhos** para dar impulso.
3. **Quicar** embaixo.

## Músculos
Primário: panturrilha (gastrocnêmio e sóleo). Na biblioteca: `panturrilha`.

## Como a carga sobe (para a progressão e a calibração do T6)
Placa da torre (número) ou kg de anilhas por passos, conforme o modelo da máquina.

## Fontes
- `kinoshita2023`: Kinoshita M, Maeo S, Kobayashi Y et al. Triceps surae muscle hypertrophy is greater after standing versus seated calf-raise training. Front Physiol 2023;14:1272106. PMID 38156065. Resumo lido no PubMed em 01/11/2026.
- `kassiano2023b`: Kassiano W, Costa B, Kunevaliki G et al. Greater Gastrocnemius Muscle Hypertrophy After Partial Range of Motion Training Performed at Long Muscle Lengths. J Strength Cond Res 2023;37(9):1746-1753. PMID 37015016. Resumo lido no PubMed em 01/11/2026.
- `nsca2021`: NSCA. Exercise Technique Manual for Resistance Training, 4ª ed. Human Kinetics, 2021. **Não verificado** (livro pago, não acessado); referência de consenso de treinadores, a confirmar.

## Texto do guia (18/11/2026)
Preparado para a ligação da fase C, sem mexer no app: `docs/revisoes/animacoes-restantes/textos/panturrilha-em-pe-maquina.json`. Os campos do cartão ficam como estão; os campos novos saem daqui:

| Campo | De onde sai | Selo | Fonte |
|---|---|---|---|
| Onde sentir (`feel`, `feelNote`) | seção Músculos (panturrilha: gastrocnêmio e sóleo); a nota, da linha Joelhos (estendidos para o gastrocnêmio trabalhar alongado) e do erro "Dobrar os joelhos" | um estudo (os joelhos estendidos); consenso | `kinoshita2023`; `nsca2021` (não verificado) |
| Respiração (`breath`) | a regra comum das animadas ("solte o ar na fase de esforço, inspire na volta, sem prender o ar a série inteira"), nas fases da ficha de movimento | consenso | `macdougall1985` (a pressão sobe mais perto da falha e com a respiração presa; `docs/pesquisa-v2/06-populacoes-e-seguranca.md`) e consenso de treinadores |
| Conferência (`check`) | linha Posição da tabela de técnica | consenso | `nsca2021` (não verificado) |
| Variações (`vary`) | linhas Embaixo (pausa de ~1 s no alongamento), Em cima e Joelhos e o erro "Quicar" | um estudo (embaixo e os joelhos); consenso | `kassiano2023b`; `kinoshita2023`; `nsca2021` (não verificado) |
| Rótulos do contorno (`extLabels`) | as posições de começo e fim da ficha de movimento (`src/engine/novo/dados/movimentos/panturrilha-em-pe-maquina.json`) e a amplitude do cartão | não se aplica (nomes das posições) | cartão |

**O que faltou na ficha:** o cartão não tem montagem, então a altura das almofadas dos ombros não aparece como regulagem: a conferência só diz "ombros sob as almofadas". A ficha não diz como regular a altura das almofadas nem nada que varie de pessoa para pessoa (o `vary` só traz o que não muda). O erro "Quicar" não tem desenho (está em `SEM_DESENHO`): o texto o mantém, e o `vary` repete a pausa embaixo. O cabeçalho ainda diz que o exercício não está na biblioteca nem no motor.
