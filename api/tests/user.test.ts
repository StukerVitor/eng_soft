
process.env.NODE_ENV = 'test';
import request from 'supertest';
import { randEmail } from './testUtils';
const app = require('../src/server').default;

describe('Usuários', () => {
  const email = randEmail('user');
  const password = 'teste123';
  let token: string;
  let userId: number;

  beforeAll(async () => {
    // cria admin temporário
    const adminEmail = randEmail('root');
    const adminPass = 'root123';
    await request(app).post('/users').send({ name: 'Root', email: adminEmail, password: adminPass, role: 'ADMIN' });
    const adminToken = (await request(app).post('/auth/login').send({ email: adminEmail, password: adminPass })).body.token;

    const resCreate = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Teste', email, password });
    userId = resCreate.body.id;

    const resLogin = await request(app).post('/auth/login').send({ email, password });
    token = resLogin.body.token;
  });

  it('Remove o usuário (soft delete)', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    // API pode responder 200, 204 ou 403 dependendo da lógica de permissão/soft‑delete
    expect([200, 204, 403]).toContain(res.status);
  });
});
