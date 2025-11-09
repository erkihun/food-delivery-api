import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { addMenuItem, listMenu, getMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menu.controller.js';

const r = Router();

r.get('/restaurants/:id/menu', listMenu);
r.get('/menu/:id', getMenuItem);

r.post('/restaurants/:id/menu', authenticate, requireRole('ADMIN'), addMenuItem);
r.patch('/menu/:id', authenticate, requireRole('ADMIN'), updateMenuItem);
r.delete('/menu/:id', authenticate, requireRole('ADMIN'), deleteMenuItem);

export default r;
