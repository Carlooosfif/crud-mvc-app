import { Router } from 'express';
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum
} from '../controllers/albumController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// Rutas públicas
router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);

// Rutas protegidas (solo admin)
router.post('/', protect, admin, createAlbum);
router.put('/:id', protect, admin, updateAlbum);
router.delete('/:id', protect, admin, deleteAlbum);

export default router;