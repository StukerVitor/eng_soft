
# 🧪 Testes Automatizados

## Estratégia

- Divididos por domínio (`auth`, `user`, `task`, `comment`, `permission`)
- Cobertura mínima de 80%
- Executados via `npm run test` com `jest --coverage`

## Exemplo

```bash
PASS tests/auth.test.ts
PASS tests/task.test.ts
PASS tests/user.test.ts
...
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------|---------|----------|---------|---------|-------------------
All files             |    85%  |    83%   |   86%   |  84.5%  |
----------------------|---------|----------|---------|---------|-------------------
```

## Execução
```bash
npm run test
npx jest --coverage
```
