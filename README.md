# 📦 Projeto: Sistema de Gestão de Tarefas Colaborativas

Este projeto consiste em uma aplicação **full-stack** com backend em **Node.js + TypeScript + Prisma** e frontend em **React + Vite + Tailwind**, que permite:

- Cadastro e login de usuários com JWT
- Criação, atribuição e gerenciamento de tarefas
- Comentários em tarefas
- Controle de permissões com papéis (ADMIN, USER, GUEST)
- Interface diferenciada para administradores

---

## ⚙️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, TypeScript, Prisma ORM, SQLite
- **Frontend**: React, Vite, TailwindCSS
- **Autenticação**: JWT + bcrypt
- **Documentação**: Swagger
- **Testes**: Jest + Supertest
- **Logs**: Winston + Morgan

---

## 🚀 Como executar localmente

### 🖥️ Backend

```bash
cd api
npm install
npx prisma generate --schema=src/prisma/schema.prisma
npx prisma db push --schema=src/prisma/schema.prisma
npx ts-node src/prisma/seed.ts
npm install --save-dev @types/swagger-ui-express
npm install cors
npm install --save-dev @types/cors
npm install winston
npm install --save-dev @types/winston
npm run dev
```

### 🌐 Frontend

```bash
cd web
npm install
npm install -D @vitejs/plugin-react
npm install --save-dev @types/react @types/react-dom
npm install react-icons
npm install -D @tailwindcss/postcss
npm run dev
```

---

## 🧪 Testes Automatizados

```bash
cd api
npm run test
npx jest --coverage
```

Cobertura mínima de 80% em toda a API:

- auth
- users
- tasks
- comments
- permissões

---

## 📁 Documentação

Documentação completa disponível em `/docs`:

- Visão geral
- Modelagem de dados
- Padrões arquiteturais
- Fluxo de requisições
- Estratégia de testes
- Deploy sugerido

---

## ✅ Funcionalidades Implementadas

- [x] Login + JWT + persistência local
- [x] Cadastro de novo usuário
- [x] Painel de tarefas atribuídas
- [x] Visualização detalhada de tarefa
- [x] Criação, edição e remoção de tarefas
- [x] Comentários com exclusão por autor ou admin
- [x] Interface separada para Admin (com avisos)
- [x] Confirmação antes de ações destrutivas
- [x] Feedback visual de erros e ações

---

## 📄 Licença

Projeto acadêmico sem fins lucrativos.

---

## 🧭 Visualizar banco de dados com Prisma Studio

Você pode ver e editar os dados diretamente usando o Prisma Studio:

```bash
cd api
npx prisma studio --schema=src/prisma/schema.prisma
```

Isso abrirá uma interface web interativa em `http://localhost:5555`, onde você pode:

- Ver usuários cadastrados
- Inspecionar tarefas e comentários
- Editar ou remover registros manualmente
