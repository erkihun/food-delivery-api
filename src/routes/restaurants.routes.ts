import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { cache60s } from '../middleware/cache.js';
import { createRestaurant, listRestaurants, getRestaurant, updateRestaurant, deleteRestaurant } from '../controllers/restaurants.controller.js';
const r = Router();

r.get('/', cache60s, listRestaurants);
r.get('/:id', getRestaurant);
r.post('/', authenticate, requireRole('ADMIN'), createRestaurant);
r.patch('/:id', authenticate, requireRole('ADMIN'), updateRestaurant);
r.delete('/:id', authenticate, requireRole('ADMIN'), deleteRestaurant);

export default r;
