# Guia de Contribuição - Genius Finance
---

## Fluxo de Colaboração
### Utilizaremos o GitHub Flow como padrão. O processo de contribuição será:

- ### **1**. Crie uma **issue** descrevendo claramente o problema ou sugestão.
- ###	**2.** Após alinhamento, crie uma branch a partir da `main` seguindo a convenção de nomes.
- ###	**3.** Desenvolva localmente e envie alterações via **Pull Request (PR)**.
- ###	**4.** O PR será revisado por membros do time.
- ###	**5.** Após aprovação e sucesso nos testes automáticos, será feito o merge.
---

## Convenções de Branches e Commits
### Branches:
- ### `feature/nome-descritivo` – novas funcionalidades
- ### `fix/descricao-do-bug` – correções
- ### `discovery/estudo-tema` – estudos, experimentos ou protótipos

### Commits:
- ### Escreva no **tempo presente**.
- ### Seja objetivo e descritivo. Mensagens de commit devem ser claras e no tempo presente como no exemplo a seguir:
  - ### `adiciona integração com API do OpenAI`
  - ### `remove console.log desnecessários`
  - ### `adiciona tratamento para despesas por imagem`
  - ### `corrige erro na classificação de renda passiva` 
---

## Regras para Revisão de Código
- ### Todo código enviado será revisado por pelo menos uma pessoa do grupo com base em três pilares:

  - ### **1.**	**Código limpo**: remoção de `console.log`, código comentado, variáveis não utilizadas.
  - ### **2.**	**Padrões**: manter organização, nomeação e estilo de acordo com o projeto.
  - ### **3.**	**Lógica**: revisar regras implementadas, clareza e performance.

- ### O PR só será aceito após:
  - ### Passar nos testes locais
  - ### Seguir o estilo do projeto (eslint/prettier)
  - ### Ter descrição clara e relacionada à issue
  - ### Sugestões ou mudanças podem ser pedidas antes da aprovação final.
---

### Configurando o Projeto Localmente
- ### Para configurar o projeto localmente acesse o README e leia as instruções
- [Ir para o README](README.md)
---