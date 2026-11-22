# Lote A1 · Resumo: os dois exercícios no banco inclinado

De 17/11/2026. Duas animações novas no motor novo, as primeiras desses exercícios (antes eram só cartão de texto). Nenhuma está aprovada nem ligada ao app: falta quem integra registrar em `aprovados.ts`, no catálogo do guia e no teste dos erros.

| Exercício | Conferência automática | Erros desenhados | Vistas | Risco de o Gustavo não gostar |
|---|---|---|---|---|
| `crucifixo-inverso` | 0 falha, 2 avisos (linhas de desenho; a vista de lado não serve ao modo Músculos) | 3 de 4: "Encolher os ombros", "Dobrar os cotovelos", "Tirar o peito do banco". **"Carga pesada demais" fica fora:** o cartão só diz "o movimento sai com tranco", que é ritmo, e o motor não desenha erro de ritmo | de trás; três quartos, de trás | **baixo a médio:** mesma cena da remada apoiada aprovada; o ombro de trás aparece fino no modo Músculos de trás, no topo |
| `rosca-scott-banco-inclinado` | 0 falha, 2 avisos (linhas de desenho; antebraço "só ajuda", como nas outras roscas) | 3 de 3 | de lado; três quartos | **médio:** pose nova (de pé atrás do encosto), braço esquerdo solto, braço direito perto da borda do encosto, erro "travar" discreto |

Conferências escritas: `crucifixo-inverso.md` e `rosca-scott-banco-inclinado.md` (nesta pasta). Quadros grandes: `../quadros/crucifixo-inverso.png` e `../quadros/rosca-scott-banco-inclinado.png`.

## Mudança em arquivo comum

- `src/engine/novo/exercicios/remada-apoiada.ts`: uma linha de exportação no fim (`export { base as baseNoEncostoDaRemada }`), para o crucifixo inverso usar o mesmo corpo deitado e a mesma cena. Nada muda na remada (o arquivo de preparo dela não mudou).
- Uma linha em cada registro (`exercicios/registro.ts`, `regras/registro.ts`) e os arquivos de preparo dos dois ids (`dados/preparo/`), gravados por `preparo.mjs`.

## O que quem integra precisa fazer

- `tests/unit/motor-novo-ponte.test.ts`, "os erros de cada animação nova têm os títulos do texto do app, na mesma ordem": falha em `crucifixo-inverso` até o título "Carga pesada demais" entrar em `SEM_DESENHO`, como o "Quicar embaixo" da panturrilha no degrau (ou até haver erro de ritmo no motor).
- O mesmo arquivo, "todas as animações estão aprovadas e no catálogo": falha esperada (as duas ainda não estão aprovadas).
- Fora isso, `npm run check` passa. Numa rodada, o teste de e-mail de `tests/repo/privacidade.test.ts` estourou o tempo com a máquina carregada (7,6 s); sozinho ele passa em 0,7 s.
