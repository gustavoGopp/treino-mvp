# Lote A3 · Resumo dos ombros (crucifixo invertido curvado e elevação lateral unilateral)

De 17/11/2026. Duas animações novas no motor novo, de exercícios que até aqui eram só cartão de texto. Nenhuma está aprovada nem ligada ao app: quem integra registra em `aprovados.ts` e no catálogo do guia. Um commit por exercício.

| Exercício | Conferência automática | Erros desenhados | Erros fora | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `crucifixo-invertido-curvado` | 0 falha, 1 aviso (linhas de desenho na ficha) | os 4 do cartão: arredondar as costas, subir o tronco, encolher os ombros, dobrar os cotovelos | nenhum | **baixo**: a postura é a da remada curvada aprovada e o arco é o do crucifixo inverso, com os mesmos números; o que pode incomodar é a vista de trás, que parece de pé (por isso a que abre é a de três quartos de trás), e o ombro de trás pequeno no modo Músculos (como no crucifixo inverso) |
| `elevacao-lateral-unilateral` | 0 falha, 3 avisos (linhas de desenho; frente do ombro "só ajuda", como nas outras elevações; de cima o músculo quase não aparece, como na unilateral com elástico aprovada) | os 3 do cartão: encolher o ombro, jogar o tronco, subir acima do ombro | nenhum | **médio**: o tronco inclinado 15° "para longe do apoio" com a mão que "só equilibra" obrigou a pôr a inclinação toda na coluna (a bacia nivelada, indo 7 cm para o lado da parede); de frente se lê como uma inclinação na cintura, não o corpo inteiro tombado a partir dos pés do "leaning lateral raise" de poste. É a parte nova, sem precedente aprovado |

Conferências escritas: `crucifixo-invertido-curvado.md` e `elevacao-lateral-unilateral.md` (nesta pasta). Quadros grandes: `../quadros/crucifixo-invertido-curvado.png` e `../quadros/elevacao-lateral-unilateral.png`.

## Arquivos comuns

**Nenhuma mudança.** Só arquivos novos e uma linha em cada registro (`exercicios/registro.ts` para os dois; `regras/registro.ts` para a regra nova da elevação). O preparo (`dados/preparo/`) ganhou os dois arquivos e o `registro.ts` regravado; o preparo das outras animações não mudou. Reaproveitado sem mexer: `dobrarOQuadril` (stiff), `bracoNaLinha` e `dobrar` (`na-fita.ts`), `halterNaMao` (`dobrar-o-cotovelo.ts`), `noPlano` (`elevar-o-braco.ts`), `folgaDasPernas` (`dobrar-o-quadril.ts`), a peça `parede-ao-lado.ts` e as regras do crucifixo inverso, das remadas, dos ombros e da mão na parede da abdução.

## Escolhas que valem um olhar

- **Crucifixo invertido curvado:** peito a 62° da vertical (o da remada curvada aprovada; a ficha diz "perto de 45° ou mais"). Vista padrão de três quartos de trás; a segunda é de trás. O erro "arredondar as costas" fica curvo a série toda e o quadro parado é de braços pendurados, de lado (com os braços abertos, o halter de perto tapava a cabeça).
- **Elevação lateral unilateral:** parede à esquerda, mão espalmada nela com o cotovelo a 60°; tronco 15° para longe dela; o centro de massa fica entre os pés (medido: de −1,5 a 3,1 cm do meio, as bordas de dentro a 4,1 cm). No alto, o cotovelo na altura do ombro, que no tórax inclinado dá 109° de elevação. O erro "jogar o tronco" é o tronco que balança (de 24° embaixo a 0° no alto, a base do pescoço andando 14,7 cm), diferente da inclinação parada da técnica.

## Teste esperado que falha

`tests/unit/motor-novo-ponte.test.ts` ("todas as animações estão aprovadas e no catálogo") falha nos dois ids até quem integra registrá-los. Os outros 914 testes passam.
