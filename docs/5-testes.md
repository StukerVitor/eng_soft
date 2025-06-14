# 🧪 Testes Automatizados

- **Framework:** Jest + Supertest  
- **Cobertura Global Requerida:** ≥ 78 % (`npm run test:coverage`)  
- Suites organizadas por domínio:

```
tests/
├─ auth.test.ts
├─ users.test.ts
├─ tasks.test.ts
└─ comments.test.ts
```

Exemplo de saída:

```
PASS tests/auth.test.ts
PASS tests/tasks.test.ts
PASS tests/users.test.ts
----------------------|---------|----------|---------|---------|-----------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
----------------------|---------|----------|---------|---------|-----------------
All files             |   86.2% |    83.5% |   87.1% |  85.0% |
----------------------|---------|----------|---------|---------|-----------------
```
