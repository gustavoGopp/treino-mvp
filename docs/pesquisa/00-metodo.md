# Método da pesquisa (M0-R)

Este arquivo explica de onde vêm as regras do gerador, como cada uma recebe um selo de evidência e o que ainda falta conferir. Vale para todos os arquivos de `docs/pesquisa/`.

## Hierarquia das fontes

Quando duas fontes discordam, vale a de nível mais alto, a menos que a de nível mais baixo seja mais recente e mais específica para a pergunta (isso é dito no texto quando acontece).

1. **Meta-análises e revisões sistemáticas.** Juntam vários ensaios e dão a estimativa mais estável. Exemplos: Pelland et al. 2026 (volume), Schoenfeld et al. 2017 (carga), Haugen et al. 2023 (máquina × peso livre).
2. **Ensaios randomizados (ECRs).** Testam uma intervenção contra outra. Em musculação, costumam ter 10 a 40 pessoas e durar 6 a 12 semanas.
3. **Posicionamentos (position stands) de ACSM, NSCA e ISSN.** Resumem a literatura com opinião de especialistas. São úteis como referência de prática, mas misturam evidência e opinião e às vezes relatam a literatura de forma seletiva.
4. **Consenso de treinadores.** Prática corrente sem ensaio que a valide: pesquisas de opinião, consensos Delphi, manuais de certificação e o raciocínio biomecânico do próprio projeto.

Estudos de EMG (ativação elétrica do músculo) e de modelagem biomecânica entram como apoio indireto. **EMG não mede hipertrofia**: uma diferença de ativação não prova diferença de crescimento.

## Os quatro selos

Cada conclusão e cada linha de `regras.md` recebe exatamente um selo.

| Selo | Quando usar | Como o app comunica |
|---|---|---|
| **robusta** | Várias meta-análises (ou uma meta-análise grande e ECRs) apontam na mesma direção. | "Evidência robusta." |
| **moderada** | Uma meta-análise, ou alguns ECRs coerentes, ou um único grupo de pesquisa com resultados consistentes. | "Evidência moderada." |
| **um estudo** | Um único ensaio, ou um preprint ainda sem revisão por pares. Quase sempre amostra pequena e curta duração. | "Apoiado por um estudo." |
| **consenso** | Prática de treinadores, posicionamentos, consensos Delphi e inferências do projeto, sem ensaio que teste o número. | "Consenso de treinadores (sem estudo que teste isso)." |

Regras de aplicação:

- **O selo vai para o número, não para o tema.** "Dez séries semanais rendem mais que menos de dez" é robusta. "Iniciante começa com 6–10 séries" é consenso, mesmo estando ancorado na mesma curva.
- **Quando uma regra junta evidência forte com um número escolhido pelo projeto, vale o selo mais fraco.** A explicação de cada arquivo diz qual parte é forte.
- **Ausência de estudo não é prova de que algo não funciona.** Dupla progressão, readaptação e deload ficam em "consenso" porque ninguém testou alternativas, e não porque foram refutados.
- **O app nunca promove consenso a "ciência comprovada".** O texto exibido repete o selo da regra.
- Quando não há nenhuma fonte para uma inferência do projeto, a linha cita a chave `consenso-projeto`, descrita em `fontes.md`.

## Como a verificação foi feita

- A pesquisa foi feita em 29/10/2026 por buscas na web. Os títulos, periódicos, anos, PMIDs e DOIs foram conferidos nos registros que apareceram nos resultados: PubMed e PMC exibidos na busca, DOAJ, BVS, sites das editoras, repositórios institucionais, QxMD e catálogos de bibliotecas.
- A rede da sessão **bloqueou** pubmed.ncbi.nlm.nih.gov, eutils.ncbi.nlm.nih.gov, pmc.ncbi.nlm.nih.gov, link.springer.com, frontiersin.org, peerj.com, sportrxiv.org e eparmedx.com. Por isso, **nenhum artigo foi lido na íntegra**. Os números citados vêm de resumos, registros e, quando dito, de fontes secundárias.
- Nenhum número foi tirado de memória sem marcação. O que veio da memória do pesquisador ou só de blog está marcado como **NÃO VERIFICADO** nos arquivos e não vira constante.

### Status de cada fonte em `fontes.md`

- **verificado-busca**: título, periódico e ano compatíveis e pelo menos um identificador persistente (PMID, DOI ou PMCID) confirmados num registro bibliográfico. Detalhes menores que faltam (coautores, páginas, título literal) aparecem entre parênteses.
- **NÃO VERIFICADO**: falta confirmar algo essencial da citação, como o identificador citado, os autores, o ano ou o título, ou a fonte só foi vista em material secundário. O que falta está escrito na própria linha.
- Em ambos os casos, **o texto completo não foi lido**. "verificado-busca" significa que a citação existe e bate com o registro, não que o número foi conferido no artigo.

## Limitações gerais da literatura

- **Amostras pequenas.** A maioria dos ensaios tem de 10 a 40 participantes. Diferenças pequenas entre condições não são detectáveis com segurança.
- **Homens jovens.** A maior parte dos estudos de volume, falha e técnica usa homens de 18 a 35 anos. Mulheres, pessoas de meia-idade e idosos estão sub-representados.
- **Não treinados.** Muitos estudos (comprimento muscular, inclinado, variação) usam pessoas sem experiência, que crescem com quase qualquer estímulo razoável. O efeito em treinados costuma ser menor ou sumir.
- **Curta duração.** Quase tudo dura de 6 a 12 semanas. Não há dados de vários anos.
- **Medidas indiretas.** Ultrassom e ressonância medem espessura ou área em pontos específicos. Massa magra por DXA ou bioimpedância é menos específica.
- **EMG e modelagem.** As decisões de técnica (altura da polia, pegada, ângulo do banco, cotovelos) dependem de EMG, modelagem e biomecânica, não de ensaios de hipertrofia.

## Política de pendências de verificação

1. **Antes de virar constante em `src/domain/` ou texto do app**, a fonte principal de cada regra é aberta e o número é conferido no texto completo. A conferência fica registrada em `fontes.md` (status e data).
2. **Uma regra apoiada só em fontes NÃO VERIFICADAS** pode ser implementada como provisória, mas o texto do app não cita o estudo até a conferência.
3. **Se a leitura do texto completo mudar um número**, a mudança é feita primeiro em `regras.md`, depois no arquivo de dados validado com zod. Os testes acusam a diferença. Nenhum selo sobe sem fonte nova.
4. **Preprints** (Remmert et al. 2025) são revalidados quando sair a versão revisada por pares.
5. **Diretrizes com texto bloqueado** (ACSM 2026, NSCA, PAR-Q+) não servem como fonte de números até a leitura do original.
6. A lista priorizada de pendências está em `README.md`.
