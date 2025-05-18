
# 📊 Modelagem de Dados

## Modelo Prisma

```prisma
model User {
  id        Int
  name      String
  email     String
  password  String
  role      Role
  tasks     Task[]
  comments  Comment[]
}

model Task {
  id          Int
  title       String
  description String
  assignedTo  Int?
  comments    Comment[]
}

model Comment {
  id      Int
  content String
  userId  Int
  taskId  Int
}

enum Role {
  ADMIN
  USER
  GUEST
}
```

## Relacionamentos
- `User 1:N Task`
- `User 1:N Comment`
- `Task 1:N Comment`
