Guia de Contribuição - Genius Finance

Fluxo de Colaboração
Utilizaremos o GitHub Flow como padrão. O processo de contribuição será:

1.	Crie uma issue descrevendo claramente o problema ou sugestão.
2.	Após alinhamento, crie uma branch a partir da main seguindo a convenção de nomes.
3.	Desenvolva localmente e envie alterações via PR (Pull Request).
4.	O PR será revisado por membros do time.
5.	Após aprovação e sucesso nos testes automáticos, será feito o merge.

Convenções de Branches e Commits
Branches:
•	feature/nome-descritivo – novas funcionalidades
•	fix/descricao-do-bug – correções
•	discovery/estudo-tema – estudos, experimentos ou protótipos
Commits:
•	Escreva no tempo presente.
•	Seja objetivo e descritivo. Mensagens de commit devem ser claras e no tempo presente como no exemplo a seguir:
o	“adiciona integração com API do OpenAI”
o	“remove console.log desnecessários”
o	“adiciona tratamento para despesas por imagem”
o	“corrige erro na classificação de renda passiva"

Regras para Revisão de Código
- Todo código enviado será revisado por pelo menos uma pessoa do grupo com base em três pilares:
1.	Lixo no código: remoção de console.log, código comentado, variáveis não utilizadas.
2.	Padrões: manter organização, nomeação e estilo de acordo com o projeto.
3.	Lógica: revisar regras implementadas, clareza e performance.
- O PR só será aceito após:
  - Passar nos testes locais
  - Seguir o estilo do projeto (eslint/prettier)
  - Ter descrição clara e relacionada à issue
- Sugestões ou mudanças podem ser pedidas antes da aprovação final.

Configurando o Projeto Localmente
Siga os passos abaixo para rodar o backend localmente:
1. Clone o repositório:
git clone https://github.com/josebrunos/Assistente_financeiro_backend.git

2. Entre na pasta:
Acesse o diretório onde o backend está localizado:
cd Assistente_financeiro_backend 

3. Instale as dependências:
Instale as dependências necessárias para o projeto com o comando:
npm install

4. Configure a variável de ambiente:
Crie um arquivo .env na rai do projeto e adicione:
GITHUB_TOKEN="seu_github_token_aqui"

5. Rode o backend: 
Agora, inicie o servidor do backend com o comando:
npm run start

6. O backend ficará disponível em:
URL: http://localhost:3000/chat
Método: POST
Content-Type: application/json

Corpo da Requisição (JSON)
{
  "mensagem": "Recebi meu salário de 3000 reais e gastei 800 em mercado"
}	
Curl: 
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"mensagem\": \"Recebi meu salário de 3000 reais e gastei 800 em mercado\"}"

Resposta da API (JSON):
{
  "resposta": "Resumo financeiro:\n\n- Receita:\n  - Salário: R$ 3.000,00\n\n- Despesas:\n  - Alimentação: R$ 800,00\n\nSaldo mensal: R$ 2.200,00"
}
