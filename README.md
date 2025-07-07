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

  ## Testes Automatizados

Para garantir a qualidade, confiabilidade e manutenibilidade do projeto, tanto o front-end quanto o back-end contam com uma suíte robusta de testes automatizados.

---

### Testes no Front-end

A camada de interface, especialmente o Dashboard, foi priorizada com testes voltados a componentes críticos e lógica de aplicação.

**Estratégia de Testes:**  
Adotamos uma base sólida com testes unitários, garantindo isolamento total de cada componente. Aplicamos mocking estratégico para simular APIs e dependências externas, permitindo validar comportamento e estado de forma eficiente.

**Execução dos Testes:**  
npm test
Cobertura e Resultados:

Testes Abrangentes: 23 testes organizados em 5 suítes, todos executados com sucesso.

Alta Cobertura de Componentes:

Button: 90%

Card: 93%

Skeleton: 100%

Validação de Lógica:

useToast Hook: 84%

Dashboard Context: 79%

Confiabilidade: Testes cobrem renderização, estados de carregamento, tratamento de erros e interações do usuário, garantindo consistência visual e funcional.

Testes no Back-end
A API e o bot de comunicação foram testados com alto grau de precisão para assegurar estabilidade nas transações e mensagens automatizadas.

Cobertura e Resultados:

Testes Executados: 98 testes automatizados em 4 suítes, todos aprovados com sucesso.

Cobertura de Código:

Statements: 94.73%

Branches: 92.42%

Funções: 100%

Linhas: 94.59%

Linhas Não Cobertas: Algumas linhas da api.js (204–205, 222–223, 240–241) permanecem sem cobertura, mas estão mapeadas para futuras iterações.

Validação Completa das Funções: Todas as funções implementadas no bot foram testadas.

Confiabilidade da Lógica: Fluxos condicionais (if/else) com cobertura superior a 92%, testando múltiplos cenários e exceções.

Execução dos Testes:
npm run test

Esses testes garantem não apenas que funcionalidades estão corretas, mas também que mudanças futuras possam ser feitas com segurança.








