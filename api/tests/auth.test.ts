
import request from 'supertest';
import app from '../src/server';

describe('Autenticação', () => {
  it('Deve fazer login com sucesso', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('Deve falhar com senha incorreta', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'senhaErrada' });

    expect(response.status).toBe(401);
  });
});
