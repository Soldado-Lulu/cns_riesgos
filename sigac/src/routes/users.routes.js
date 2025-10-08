import { Router } from 'express';
import { list, getById, create, update, remove, updateActive } from '../controllers/users.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const r = Router();

r.get('/',     requireAuth, requireRole('admin'), list);
r.get('/:id',  requireAuth, getById);
r.post('/',    requireAuth, requireRole('admin'), create);
r.put('/:id',  requireAuth, requireRole('admin'), update);

// 👇 PATCH dedicado a activar/desactivar
r.patch('/:id/active', requireAuth, requireRole('admin'), updateActive);

r.delete('/:id', requireAuth, requireRole('admin'), remove);

export default r;
