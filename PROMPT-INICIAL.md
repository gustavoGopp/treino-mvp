# Prompt inicial — MVP do app de treino com o equipamento que a pessoa tem

Você está no **modo plan**. Nesta etapa você só lê, pergunta e planeja: não escreva código, não instale nada e não crie arquivos. A implementação começa depois que eu aprovar o plano.

## 1. Contexto

Nos últimos dias montei com o Claude um sistema pessoal de treino. Mandei fotos da academia do meu prédio, ele identificou os equipamentos, montou um programa de hipertrofia baseado em evidência e criou um guia animado de execução de cada exercício, com temporizador de descanso. Funcionou tão bem que quero transformar isso num produto, desenvolver aqui com você, versionar no git e publicar o processo no LinkedIn.

O que já existe nesta pasta:

- `referencia/guia-execucao-fase1.html`: o guia em funcionamento. São 4 treinos e 26 exercícios num arquivo único, em JavaScript puro com SVG, com um motor de animação próprio (IK, várias vistas, modos Técnica/Erros/Músculos/Trajetória, temporizador). **Leia antes `referencia/motor-de-animacao.md`**.
- `referencia/programa-fase-1.md`: o programa gerado para mim, com a lógica (volume, repetições, RIR, descanso, readaptação, dupla progressão) e as fontes científicas. É o exemplo de saída que o gerador precisa conseguir produzir.
- `referencia/especificacao-guia-visual.md`: o pedido que gerou o guia. Define o padrão de qualidade das animações.
- `referencia/qa/check-motor.cjs`: o QA do motor com Playwright (checagem de IK e folha de contatos).
- `privado/`: meus dados pessoais. São o perfil, o pedido original que deu início a tudo (é praticamente a especificação do produto), 5 fotos da minha academia e um gabarito com o inventário confirmado. Pode ler e usar como caso de teste, mas **nunca versione, copie para o código, fixtures públicas, README ou posts**. A pasta já está no `.gitignore`. Para testes versionados, crie personas fictícias.

## 2. O produto

**Problema.** Quem treina em academia de prédio, em casa ou em academia pequena recebe treinos genéricos que pedem equipamento que não existe ali. Adaptar exige um conhecimento que a pessoa não tem, e na hora de executar ela não sabe se está fazendo certo.

**Proposta.** A pessoa mostra o que tem (fotos ou checklist) e informa objetivo, dias e tempo disponíveis. O app monta um programa de hipertrofia baseado em evidência, só com exercícios possíveis naquele lugar, e conduz cada sessão com o guia animado de execução, o temporizador de descanso e o registro com sugestão de progressão.

**Público inicial (hipótese a validar):** adultos iniciantes e intermediários, com foco em hipertrofia, que treinam com equipamento limitado.

## 3. Escopo do MVP

Dentro:
1. **Perfil e triagem.** Objetivo (hipertrofia), nível, dias por semana (2 a 5), tempo por sessão, grupos prioritários, exercícios que a pessoa não gosta ou quer evitar, dores e limitações. Inclui uma triagem curta de prontidão (no estilo do PAR-Q+): qualquer resposta de risco leva à recomendação de avaliação profissional antes de começar. Se houver dor numa articulação, o app não prescreve exercícios que a sobrecarreguem e avisa a pessoa. O app não diagnostica.
2. **Inventário de equipamentos.** Checklist com taxonomia controlada, incluindo os detalhes que mudam a prescrição: faixa dos halteres fixos, halteres montáveis e anilhas, polia simples ou dupla com altura regulável, acessórios de polia, barra fixa, banco reto ou regulável, step, bola, elásticos etc. Também há a opção **tirar foto**: a visão sugere itens da taxonomia, cada um com confiança, e a pessoa confirma ou corrige. Nada entra no inventário sem confirmação.
3. **Gerador de programa.** Escolhe divisão, exercícios, séries, repetições, RIR, descanso e ordem, respeitando inventário, tempo, preferências e triagem. Mostra o porquê de cada escolha, com o nível de evidência.
4. **Execução.** Tela do treino do dia com o guia animado de cada exercício (reaproveitando o motor), temporizador de descanso e marcação das séries.
5. **Registro e progressão.** A pessoa anota carga × repetições × RIR, e o app sugere subir, manter ou recuar a carga pela dupla progressão, incluindo as semanas de readaptação.

Fora do MVP (anote como próximos passos): nutrição, login e sincronização na nuvem, pagamentos, app nativo, recursos sociais, integração com relógios, outros objetivos (emagrecimento, força máxima, corrida) e treinador humano.

## 4. Princípios (não negociáveis)

- **Evidência.** Toda regra do gerador e todo texto técnico indicam o nível de evidência (robusta, moderada, um estudo ou consenso de treinadores) e a fonte. Nada de inventar estudos. As fontes atuais estão no programa.
- **Gerador determinístico e testável.** O treino sai de regras e dados (biblioteca de exercícios e metas de volume), não de texto livre gerado por um modelo. A mesma entrada gera a mesma saída. A IA entra só onde é necessária: reconhecer equipamento nas fotos e, se fizer sentido, redigir explicações a partir do que as regras escolheram.
- **Segurança.** Se aparecer dor articular, dor aguda, formigamento, tontura ou perda de força incomum, o app interrompe aquele exercício, oferece uma alternativa e recomenda avaliação profissional. Sem diagnóstico.
- **Privacidade.** Dado de saúde é dado sensível na LGPD. No MVP, tudo fica no aparelho da pessoa. As fotos são redimensionadas e têm os metadados removidos (inclusive GPS) no próprio aparelho antes do envio, e não ficam guardadas no servidor. A chave de API fica só no servidor. Nenhum dado pessoal vai para o repositório.
- **Qualidade do guia.** O padrão da especificação continua valendo: precisão vale mais que quantidade. Exercício sem animação aprovada aparece como um cartão textual claro, nunca com uma animação improvisada.
- **Uso na academia.** Mobile-first, em português do Brasil, acessível (contraste, áreas de toque, `prefers-reduced-motion`) e utilizável com uma mão só.
- **Simplicidade.** Poucas dependências, código legível e testes em tudo que é regra.

## 5. Ponto de partida técnico (proposta: avalie e recomende)

- Web app mobile-first instalável (PWA), em TypeScript. Minha sugestão inicial é Vite + React, com uma função serverless na Vercel só para a chamada de visão. Compare com Next.js e recomende um dos dois.
- Dados locais em IndexedDB (ou localStorage, se bastar), com opção de exportar e importar em JSON.
- Visão: API do Claude com saída estruturada (JSON validado contra a taxonomia). Compare custo × acerto dos modelos atuais usando as fotos de `privado/fotos-academia/` e o `gabarito.json`. Confira a documentação atual da API antes de escolher.
- Motor de animação: extrair do HTML para módulos TypeScript (matemática/IK, renderização, dados dos exercícios separados do código) **sem mudar o resultado visual**. O QA atual (checagem de IK e folha de contatos) vira teste de regressão visual.
- Testes com Vitest para as regras do gerador e da progressão, e com Playwright para os fluxos principais e a regressão visual.
- Git desde o primeiro commit, com commits pequenos e descritivos, CI simples (lint + testes) e deploy contínuo na Vercel.

## 6. O que eu quero de você agora

1. **Leia** tudo em `referencia/` e `privado/`. No guia, entenda o motor e a estrutura dos dados de exercício antes de propor a arquitetura.
2. **Pergunte** o que falta para fechar o plano: no máximo 8 perguntas, todas de uma vez, cada uma com a sua recomendação e o porquê. Já sei que estas estão em aberto:
   - nome do produto;
   - repositório público ou privado, e qual licença;
   - se o MVP terá login;
   - limite de uso da API de visão e quem paga por ela;
   - quais níveis de usuário entram no MVP.
3. **Planeje.** Depois das minhas respostas, entregue o plano com:
   - a. **Objetivo do MVP numa frase** e critérios de sucesso mensuráveis. Exemplos: uma pessoa nova monta o programa em menos de 5 minutos; X testadores usam por 2 semanas.
   - b. **Personas e jornada principal**, da primeira abertura ao primeiro treino concluído.
   - c. **Escopo** dentro e fora, confirmado.
   - d. **Arquitetura**: estrutura de pastas, módulos, fluxo de dados e onde roda cada coisa.
   - e. **Modelos de dados**: taxonomia de equipamentos; exercício (equipamento exigido, padrão de movimento, músculos, complexidade/coordenação, composto ou isolador, faixas padrão, unilateral, alternativas, id da animação); perfil; programa; sessão; registro.
   - f. **Algoritmo do gerador em pseudocódigo**: escolha da divisão por dias e tempo, metas de volume por grupo, preenchimento por padrão de movimento, filtro por equipamento e preferências, orçamento de tempo, ordem dos exercícios, readaptação e progressão. Inclua 4 cenários de teste com o resultado esperado:
     1. a minha academia (`privado/`), em que o resultado deve ficar próximo do `programa-fase-1.md`;
     2. só halteres e banco;
     3. casa com elásticos e barra fixa;
     4. academia completa.
   - g. **Fluxo da foto**: captura, redução e remoção de metadados, chamada, validação, confirmação e erros, mais o método para medir o acerto com o gabarito.
   - h. **Migração do motor de animação**: como portar sem regressão, quais exercícios entram no MVP, o que acontece com exercícios sem animação e qual a ordem dos próximos a animar (começando pelas alternativas do programa).
   - i. **Marcos**, do M0 (fundação e deploy vazio) ao lançamento. Cada marco com entregáveis, critérios de aceite verificáveis e estimativa de esforço.
   - j. **Riscos e mitigação**: precisão da visão, segurança e responsabilidade, custo da API, qualidade das animações e crescimento do escopo.
   - k. **Estratégia de testes e de QA visual.**
   - l. **Build in public**: um `docs/devlog.md` atualizado a cada marco, com o que mudou, uma imagem ou GIF e um rascunho curto de post para o LinkedIn.
4. **Quando eu aprovar:**
   - salve o plano em `docs/PLANO-MVP.md`;
   - crie o `CLAUDE.md` do projeto com os princípios da seção 4 e as convenções combinadas;
   - inicialize o git respeitando o `.gitignore` que já existe e confira que nada de `privado/` foi versionado;
   - comece pelo M0.

   Ao fim de cada marco, pare, me mostre o resultado e espere o meu ok antes de seguir.

Explique as decisões técnicas de um jeito que alguém de negócios entenda.
