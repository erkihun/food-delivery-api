import request from 'supertest';
import app from '../../src/app';

describe('Flow: register → login → place order', () => {
  it('completes the happy path', async () => {
    const email = `flow${Date.now()}@example.com`;
    const reg = await request(app).post('/auth/register').send({ name:'Flow', email, password:'secret' });
    expect(reg.status).toBe(201);

    const login = await request(app).post('/auth/login').send({ email, password:'secret' });
    expect(login.status).toBe(200);
    const token = login.body.token;

    const order = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ restaurantId: 1, items: [{ menuItemId: 1, quantity: 1 }] });

    expect(order.status).toBe(201);
  });
});
