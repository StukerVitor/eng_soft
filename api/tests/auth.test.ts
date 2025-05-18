
process.env.NODE_ENV = 'test';
import request from 'supertest';
import { randEmail } from './testUtils';
const app = require('../src/server').default;

describe('Autenticação', () => {
  const adminEmail = randEmail('admin');
  const password = 'admin123';

  it('Registra admin e faz login com sucesso', async () => {
    await request(app)
      .post('/users')
      .send({ name: 'Administrador', email: adminEmail, password, role: 'ADMIN' })
      .expect(res => { expect([201, 400]).toContain(res.status); });

    const resLogin = await request(app)
      .post('/auth/login')
      .send({ email: adminEmail, password });

    expect(resLogin.status).toBe(200);
    expect(resLogin.body).toHaveProperty('token');
  });
});
