# 🧱 Decisões Arquiteturais

### 🧭 Padrão: MVC Enxuto + Camada de Serviços

**Justificativa:**
- Organiza responsabilidades em camadas claras
- Facilita manutenção e testes
- Isola a lógica de negócio da lógica de controle

| Camada        | Responsabilidade | Observações |
|---------------|------------------|-------------|
| **Routes**    | Mapear endpoints Express para Controllers | Ex.: `/tasks/:id/complete` |
| **Controllers** | Orquestra validações e chamadas de Service | Sem regra de negócio |
| **Services**  | Lógica de negócio + chamadas Prisma | Reutilizável em testes |
| **Middlewares** | JWT Auth, RBAC, logs e tratamento global de erros | |
| **Utils**     | Swagger, Winston Logger, helpers | |

```
src/
├── routes/
│   ├── authRoutes.ts
│   ├── userRoutes.ts    # inclui /users/me
│   ├── taskRoutes.ts    # inclui PATCH /:id/complete
│   └── commentRoutes.ts
├── controllers/
├── services/
├── middlewares/
├── lib/prisma.ts
└── utils/
```

### Stack & Ferramentas

- **Node.js 20 + TypeScript**
- **Prisma ORM** com SQLite (default) ou PostgreSQL
- **JWT** para autenticação stateless
- **Winston + Morgan** para logs estruturados
- **Jest + Supertest** com cobertura mínima global de 78 %

### Fluxo de Requisição

1. **Route** recebe HTTP request  
2. **Auth Middleware** valida JWT e injeta `req.user`  
3. **Controller** chama Service correspondente  
4. **Service** acessa banco via Prisma e devolve DTO  
5. **Controller** formata resposta JSON  
6. **Error Handler** captura exceções não tratadas e devolve HTTP error
