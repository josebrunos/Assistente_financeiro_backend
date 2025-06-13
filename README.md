# API - Assistente Financeiro com IA

## Como rodar o projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/josebrunos/Assistente_financeiro_backend.git
```
### 2. Entre na pasta:
- #### Acesse o diretório onde o backend está localizado:
  ```bash
  cd Assistente_financeiro_backend
  ```
### 3. Instale as dependências:  
- #### Instale as dependências necessárias para o projeto com o comando:
  ```bash
  npm install
  ```
### Avisos durante a instalação
### Ao rodar npm install, você pode ver avisos de vulnerabilidades em pacotes usados pelas dependências do projeto. Esses avisos geralmente são de baixa severidade e não impedem o funcionamento do sistema.
- ### Para corrigir as vulnerabilidades que não quebram o projeto, execute:
  ```bash
  npm audit fix
  ```

### 4. Configure a variável de ambiente:
- #### Crie um arquivo .env na raiz do projeto e adicione:
  ```bash
  GITHUB_TOKEN="seu_github_token_aqui"
  ```
### 5. Rode o backend:
- #### Agora, inicie o servidor do backend com o comando:
  ```bash
  npm run start
  ```

### 6. Rotas da API:
#### As rotas estão disponíveis localmente em:
- **URL:** `http://localhost:3000/chat`
---

- ### POST /chat - envia uma mensagem para a IA
- ### GET /chat/saldo - retornar o saldo atual
- ### GET /chat/categorias - retorna as categorias identificadas
- ### DELETE /chat/historico - remove todas as transações do histórico
---

## Exemplo com curl:

```json
{
  "mensagem": "Recebi meu salário de 3000 reais e gastei 800 em mercado"
}
```
- ### curl:
  ```bash
  curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"mensagem\": \"Recebi meu salário de 3000 reais e gastei 800 em mercado\"}"
  ```

