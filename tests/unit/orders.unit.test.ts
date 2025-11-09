import request from 'supertest';
import app from '../../src/app.js';

describe('Orders: place', () => {
  it('places an order as a newly registered customer', async () => {
    const email = `c${Date.now()}@example.com`;
    const reg = await request(app).post('/auth/register').send({ name:'C', email, password:'p@ssw0rd' });
    expect(reg.status).toBe(201);
    const token = reg.body.token;

    const order = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ restaurantId: 1, items: [{ menuItemId: 1, quantity: 2 }] });

    expect(order.status).toBe(201);
    expect(order.body.status).toBe('PENDING');
    expect(order.body.items.length).toBeGreaterThan(0);
  });
});
