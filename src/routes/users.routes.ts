import { Router, Request } from 'express';
import { authenticate } from '../middleware/auth.js';
import { requireRole, allowSelfOrAdmin } from '../middleware/rbac.js';
import { listUsers, getUser, updateUser, deleteUser } from '../controllers/users.controller.js';

const r = Router();

r.use(authenticate);
r.get('/', requireRole('ADMIN'), listUsers);
r.get('/:id', allowSelfOrAdmin((req: Request) => Number(req.params.id)), getUser);
r.patch('/:id', allowSelfOrAdmin((req: Request) => Number(req.params.id)), updateUser);
r.delete('/:id', requireRole('ADMIN'), deleteUser);

export default r;
