import { Router } from 'express';
import {
  getCardsByAlbum,
  getCardById,
  createCard,
  updateCard,
  deleteCard
} from '../controllers/cardController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// Rutas públicas
router.get('/album/:albumId', getCardsByAlbum);
router.get('/:id', getCardById);

// Rutas protegidas (solo admin)
router.post('/', protect, admin, createCard);
router.put('/:id', protect, admin, updateCard);
router.delete('/:id', protect, admin, deleteCard);

export default router;