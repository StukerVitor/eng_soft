# 📊 Modelagem de Dados (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  USER
  GUEST
}

enum TaskStatus {
  PENDING
  DONE
}

model User {
  id        Int       @id @default(autoincrement())
  name      String
  email     String    @unique
  password  String
  role      Role      @default(USER)
  tasks     Task[]    @relation("AssignedTasks")
  comments  Comment[] @relation("UserComments")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  status      TaskStatus @default(PENDING)
  dueDate     DateTime?
  assignedTo  Int?
  user        User?     @relation("AssignedTasks", fields: [assignedTo], references: [id])
  comments    Comment[] @relation("TaskComments")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  taskId    Int
  authorId  Int
  task      Task     @relation("TaskComments", fields: [taskId], references: [id])
  author    User     @relation("UserComments", fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

## Relacionamentos

- **User 1:N Task** – um usuário pode ter várias tarefas atribuídas  
- **User 1:N Comment** – um usuário pode escrever diversos comentários  
- **Task 1:N Comment** – uma tarefa contém vários comentários
