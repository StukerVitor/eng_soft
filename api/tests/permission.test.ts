
import request from 'supertest';
import app from '../src/server';

describe('Permissões', () => {
  let userToken = '';
  let adminToken = '';
  let taskId = 0;

  beforeAll(async () => {
    // Cria usuário comum
    await request(app)
      .post('/users')
      .send({ name: 'Normal', email: 'normal@example.com', password: 'normal123' });

    const userLogin = await request(app)
      .post('/auth/login')
      .send({ email: 'normal@example.com', password: 'normal123' });
    userToken = userLogin.body.token;

    const adminLogin = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });
    adminToken = adminLogin.body.token;

    const task = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ title: 'Tarefa Protegida', description: 'Permissões', assignedTo: 1 });
    taskId = task.body.id;
  });

  it('Usuário comum não pode deletar tarefa', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it('Usuário comum não pode deletar outro usuário', async () => {
    const res = await request(app)
      .delete(`/users/1`)
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });
});
