import { Router } from 'express';
import { getProfile } from '../controllers/user.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.get('/profile', authenticateJWT, getProfile);

export default router;