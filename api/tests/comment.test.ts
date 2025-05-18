
import request from 'supertest';
import app from '../src/server';

describe('Comentários', () => {
  let token = '';
  let taskId = 0;
  let commentId = 0;

  beforeAll(async () => {
    const login = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });
    token = login.body.token;

    const task = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarefa com Comentário', description: 'comentário', assignedTo: 1 });
    taskId = task.body.id;
  });

  it('Adiciona comentário', async () => {
    const res = await request(app)
      .post(`/tasks/${taskId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Comentário de teste' });
    expect(res.status).toBe(201);
    commentId = res.body.id;
  });

  it('Lista comentários', async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}/comments`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deleta comentário', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
