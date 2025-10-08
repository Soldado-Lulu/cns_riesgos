import { Router } from 'express';
import * as ctrl from '../controllers/assets.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { assetSchema } from '../schemas/asset.schema.js';

const r = Router();

r.get('/', requireAuth, ctrl.list); // cualquier usuario autenticado
r.post('/', requireAuth, requireRole('admin'), validate(assetSchema), ctrl.create); // solo admin

export default r;
