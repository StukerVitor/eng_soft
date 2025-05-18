
process.env.NODE_ENV = 'test';
import request from 'supertest';
import { randEmail } from './testUtils';
const app = require('../src/server').default;

describe('Tarefas', () => {
  const email = randEmail('taskuser');
  const password = 'task123';
  let token: string;
  let taskId: number;

  beforeAll(async () => {
    await request(app).post('/users').send({ name: 'TaskUser', email, password });
    const resLogin = await request(app).post('/auth/login').send({ email, password });
    token = resLogin.body.token;
  });

  it('Cria nova tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarefa Teste', description: 'desc' });
    expect(res.status).toBe(201);
    taskId = res.body.id;
  });

  it('Busca tarefa por ID', async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('Lista tarefas atribuídas', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Atualiza tarefa', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Atualizada' });
    expect(res.status).toBe(200);
  });

  it('Deleta tarefa', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect([200,204]).toContain(res.status);
  });
});
