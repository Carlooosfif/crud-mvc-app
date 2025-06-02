import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Rutas de autenticación
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;