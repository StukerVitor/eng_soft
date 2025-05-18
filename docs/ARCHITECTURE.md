
# Arquitetura

## Visão Geral

A aplicação segue o padrão **MVC “enxuto” + Camada de Serviços**, onde:

| Camada      | Responsabilidade principal | Observações |
|-------------|---------------------------|-------------|
| *Routes*    | Mapeia rotas HTTP para controllers. Sem lógica de negócio. |
| *Controllers* | Orquestram a chamada dos serviços, tratam requisições e respostas HTTP. |
| *Services*  | Contêm a lógica de negócio e interagem com o Prisma ORM. |
| *Middlewares* | Autenticação, autorização e tratamento global de erros. |
| *Utils*     | Utilitários genéricos como logger e documentação Swagger. |

## Diagrama Simplificado

```
Client
  │
  ▼
React + Vite (Web)
  │ HTTP/JSON
  ▼
Express Server (Node.js, TypeScript)
  ├── Routes
  ├── Controllers
  ├── Services
  ├── Middlewares
  └── Prisma (SQLite)
```

## Decisões Arquiteturais

* **TypeScript** garante tipagem estática e melhor DX.
* **Prisma** acelera a modelagem de dados e migrações.
* **JWT** simplifica autenticação sem estado para a API.
* **Winston + Morgan** fornecem logs estruturados em JSON.
* **Jest + Supertest** possibilitam testes unitários e de integração.

## Fluxo de Requisição

1. **Route** recebe o endpoint.
2. **Auth Middleware** valida JWT e extrai `user.id` e `role`.
3. **Controller** invoca o Service adequado.
4. **Service** executa validações, acessa o banco via Prisma e retorna dados.
5. **Controller** formata a resposta e delega ao Express.
6. **Error Handler** intercepta exceções não tratadas e retorna JSON de erro.

## Cobertura de Testes

O Jest é configurado para exigir >80% de cobertura global.  
Para visualizar o relatório:

```bash
cd api
npm run test:coverage
```
