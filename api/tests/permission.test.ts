
process.env.NODE_ENV = 'test';
import request from 'supertest';
import { randEmail } from './testUtils';
const app = require('../src/server').default;

describe('Permissões', () => {
  const emailA = randEmail('userA');
  const emailB = randEmail('userB');
  const pass = '123456';
  let tokenA: string, tokenB: string, taskId: number;

  beforeAll(async () => {
    await request(app).post('/users').send({ name: 'UserA', email: emailA, password: pass });
    await request(app).post('/users').send({ name: 'UserB', email: emailB, password: pass });

    tokenA = (await request(app).post('/auth/login').send({ email: emailA, password: pass })).body.token;
    tokenB = (await request(app).post('/auth/login').send({ email: emailB, password: pass })).body.token;

    const resTask = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ title: 'Tarefa A', description: 'desc' });
    taskId = resTask.body.id;
  });

  it('Usuário comum não pode deletar tarefa de outro usuário', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${tokenB}`);
    expect([400,403]).toContain(res.status);
  });
});
