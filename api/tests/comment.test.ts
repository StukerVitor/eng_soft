
process.env.NODE_ENV = 'test';
import request from 'supertest';
import { randEmail } from './testUtils';
const app = require('../src/server').default;

describe('Comentários', () => {
  const email = randEmail('commentuser');
  const password = 'comment123';
  let token: string;
  let taskId: number;
  let commentId: number;

  beforeAll(async () => {
    await request(app).post('/users').send({ name: 'CommentUser', email, password });
    const resLogin = await request(app).post('/auth/login').send({ email, password });
    token = resLogin.body.token;

    const resTask = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarefa para Comentário', description: 'desc' });
    taskId = resTask.body.id;
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
    expect([200,204]).toContain(res.status);
  });
});
