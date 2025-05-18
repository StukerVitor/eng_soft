
# 📌 Visão Geral

O sistema de **Gestão de Tarefas Colaborativas** permite que usuários possam:
- Criar, editar, concluir e comentar tarefas
- Atribuir tarefas a membros específicos
- Controlar permissões com papéis de usuário (ADMIN, USER, GUEST)

### 🎯 Objetivo
Prover uma API RESTful e interface web responsiva para uso em ambientes corporativos e acadêmicos com foco em colaboração e controle de permissões.

### 🧠 Contexto de Uso
Aplicável a pequenas e médias equipes que desejam organizar atividades, atribuir responsabilidades e acompanhar progresso em tempo real.

### 🛠️ Instruções Rápidas de Instalação

```bash
# Backend
cd api
npm install
npx prisma generate --schema=src/prisma/schema.prisma
npx prisma db push --schema=src/prisma/schema.prisma
npx ts-node src/prisma/seed.ts
npm run dev

# Frontend
cd ../web
npm install
npm install -D tailwindcss postcss autoprefixer
npm run dev
```
