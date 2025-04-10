import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController';

const router = Router();

// Rutas CRUD
router.post('/', createProduct);              // Create
router.get('/', getAllProducts);              // Read (todos)
router.get('/:id', getProductById);           // Read (uno)
router.put('/:id', updateProduct);            // Update
router.delete('/:id', deleteProduct);         // Delete

export default router;