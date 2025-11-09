import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import {
  placeOrder,
  listOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  listOrderItems,
  updateOrderItem,
  removeOrderItem,
} from '../controllers/orders.controller.js';

const r = Router();

r.use(authenticate);
r.post('/', requireRole('CUSTOMER','ADMIN'), placeOrder);
r.get('/', listOrders);
r.get('/:id', getOrder);
r.patch('/:id/status', requireRole('ADMIN'), updateOrderStatus);
r.delete('/:id', cancelOrder);
r.get('/:id/items', listOrderItems);
r.patch('/:id/items/:itemId', updateOrderItem);
r.delete('/:id/items/:itemId', removeOrderItem);

export default r;
