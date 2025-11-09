import request from 'supertest';
import app from '../../src/app.js';

describe('Auth: register', () => {
  it('registers a new customer and returns a JWT', async () => {
    const email = `u${Date.now()}@example.com`;
    const res = await request(app).post('/auth/register').send({
      name: 'Test User', email, password: 'secret123'
    });
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(email);
  });
});
