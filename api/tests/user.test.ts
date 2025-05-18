
import request from 'supertest';
import app from '../src/server';

describe('Usuários', () => {
  let token = '';
  let userId = 0;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });
    token = res.body.token;
  });

  it('Cria um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Teste', email: 'teste@example.com', password: 'teste123' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    userId = res.body.id;
  });

  it('Busca usuário por ID', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('Atualiza o usuário', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Novo Nome' });
    expect(res.status).toBe(200);
  });

  it('Remove o usuário (soft delete)', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
