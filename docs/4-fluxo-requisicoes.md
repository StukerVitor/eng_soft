# 🔁 Fluxo de Endpoints

## Autenticação
| Método | Endpoint          | Descrição                |
|--------|-------------------|--------------------------|
| POST   | /auth/login       | Autentica e devolve JWT  |
| POST   | /auth/logout      | Logout (frontend)        |

## Usuários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /users              | Cria usuário        |
| GET    | /users?page=&limit= | Lista usuários      |
| GET    | /users/{id}         | Detalhes de usuário |
| PUT    | /users/{id}         | Atualiza usuário    |
| DELETE | /users/{id}         | Remove (ADMIN)      |
| GET    | /users/me           | Perfil autenticado  |

## Tarefas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /tasks                   | Cria tarefa |
| GET    | /tasks?status=&assignedTo= | Lista tarefas |
| GET    | /tasks/{id}              | Detalhes |
| PUT    | /tasks/{id}              | Atualiza |
| PATCH  | /tasks/{id}/complete     | Marca como concluída |
| DELETE | /tasks/{id}              | Exclui (RBAC) |

## Comentários
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /tasks/{taskId}/comments             | Cria comentário   |
| GET    | /tasks/{taskId}/comments             | Lista comentários |
| DELETE | /tasks/{taskId}/comments/{commentId} | Remove comentário |
