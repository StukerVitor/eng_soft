
# 🔁 Fluxo de Requisições

## Autenticação
```
POST /auth/login        # Login e retorno de token JWT
POST /auth/logout       # Logout (frontend + API)
```

## Usuários
```
POST   /users           # Criação
GET    /users/:id       # Perfil
PUT    /users/:id       # Atualização
DELETE /users/:id       # Soft delete (ADMIN)
```

## Tarefas
```
POST   /tasks                   # Criação
GET    /tasks/:id              # Detalhes
GET    /tasks?assignedTo=1     # Tarefas atribuídas
PUT    /tasks/:id              # Atualização
DELETE /tasks/:id             # Exclusão (ADMIN)
```

## Comentários
```
POST   /tasks/:id/comments
GET    /tasks/:id/comments
DELETE /tasks/:id/comments/:commentId
```
