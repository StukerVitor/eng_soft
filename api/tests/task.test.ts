
import request from 'supertest';
import app from '../src/server';

describe('Tarefas', () => {
  let token = '';
  let taskId = 0;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });
    token = res.body.token;
  });

  it('Cria nova tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Tarefa Teste', description: 'desc', assignedTo: 1 });

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
      .get('/tasks?assignedTo=1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
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
    expect(res.status).toBe(200);
  });
});
