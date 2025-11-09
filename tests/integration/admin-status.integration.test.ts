import request from 'supertest';
import app from '../../src/app.js';

async function adminToken(){
  const res = await request(app).post('/auth/login').send({ email: 'admin@example.com', password: 'Admin@123' });
  return res.body.token as string;
}

describe('Admin updates order status', () => {
  it('moves order PENDING → PREPARING → DELIVERED', async () => {
    const email = `status${Date.now()}@example.com`;
    const reg = await request(app).post('/auth/register').send({ name:'S', email, password:'secret' });
    expect(reg.status).toBe(201);
    const token = reg.body.token as string;

    const created = await request(app).post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ restaurantId: 1, items: [{ menuItemId: 1, quantity: 1 }] });
    expect(created.status).toBe(201);
    const id = created.body.id as number;

    const adm = await adminToken();

    const p = await request(app).patch(`/orders/${id}/status`).set('Authorization', `Bearer ${adm}`).send({ status: 'PREPARING' });
    expect(p.status).toBe(200);
    expect(p.body.status).toBe('PREPARING');

    const d = await request(app).patch(`/orders/${id}/status`).set('Authorization', `Bearer ${adm}`).send({ status: 'DELIVERED' });
    expect(d.status).toBe(200);
    expect(d.body.status).toBe('DELIVERED');
  });
});
