
# 🧱 Decisões Arquiteturais

### 🧭 Padrão Escolhido: MVC Enxuto + Camada de Serviços

**Justificativa:**
- Organiza responsabilidades em camadas claras
- Facilita manutenção e testes
- Isola a lógica de negócio da lógica de controle

```
src/
├── controllers/  -> Requisições HTTP
├── services/     -> Lógica de negócio
├── routes/       -> Mapeamento de rotas
├── middlewares/  -> Segurança e logs
├── lib/prisma.ts -> Instância global do PrismaClient
├── utils/        -> Logger, Swagger
```

### 🧪 Testes
- `Jest` + `Supertest` com cobertura superior a 80%
- Testes separados por domínio: auth, users, tasks, comments, permissions
