# Banco Malvader - API Backend

API backend para o sistema bancário **Banco Malvader**, desenvolvido em Node.js com TypeScript. 

## Descrição

Sistema bancário completo com funcionalidades para gerenciamento de contas, autenticação segura, operações financeiras, controle de funcionários e clientes, e processamento de empréstimos. A avaliação de risco e aprovação dos empréstimos são realizadas via modelo de Machine Learning, implementado em um repositório separado.

## Funcionalidades principais

- Autenticação de usuários (clientes e funcionários) com senha e OTP.
- Gerenciamento de contas bancárias (corrente, poupança, investimento).
- Operações financeiras: depósitos, saques, transferências e extratos.
- Registro e controle de funcionários e clientes.
- Auditoria de ações no sistema.
- Solicitação de empréstimos com integração via API externa para avaliação por ML.
- Registro e acompanhamento de empréstimos aprovados.

## Tecnologias

- Node.js + TypeScript
- MySQL (banco de dados)
- REST API


## Integração com Machine Learning

A avaliação automática de empréstimos por Machine Learning é realizada por um serviço externo, acessado via API. Este serviço está em outro repositório e é chamado pela API backend para aprovar ou rejeitar empréstimos e definir a taxa de juros.

## Como executar

1. Configurar variáveis de ambiente (`.env`) com dados do banco e credenciais.

Ex: 

#Configurações do banco de dados:
DB_HOST=localhost
DB_DATABASE=banco_malvader
DB_PASSWORD=root
DB_USER=root

# Configurações API
API_PORT=3000
API_IP=localhost


2. Instalar dependências:
   ```bash
   npm install


Rodar em desenvolvimento:

# Comando
npm run dev
