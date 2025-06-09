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
### 4. Configure a variável de ambiente:
- #### Crie um arquivo .env na rai do projeto e adicione:
  ```bash
  GITHUB_TOKEN="seu_github_token_aqui"
  ```
### 5. Rode o backend:
- #### Agora, inicie o servidor do backend com o comando:
  ```bash
  npm run start
  ```

### 6. O backend ficará disponível em::

- **URL:** `http://localhost:3000/chat`
- **Método:** `POST`
- **Content-Type:** `application/json`
---

## Corpo da Requisição (JSON) 

```json
{
  "mensagem": "Recebi meu salário de 3000 reais e gastei 800 em mercado"
}
```
- #### Curl:
  ```bash
  curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"mensagem\": \"Recebi meu salário de 3000 reais e gastei 800 em mercado\"}"
  ```

## Resposta da API (JSON)
```json
{
  "resposta": "Resumo financeiro:\n\n- Receita:\n  - Salário: R$ 3.000,00\n\n- Despesas:\n  - Alimentação: R$ 800,00\n\nSaldo mensal: R$ 2.200,00"
}
```
