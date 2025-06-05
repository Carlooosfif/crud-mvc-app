import { Router } from 'express';
import { RankingController } from '../controllers/rankingController';
import { protect } from '../middleware/authMiddleware';

const router = Router();
const rankingController = new RankingController();

router.get('/ranking', protect, rankingController.getRanking);
router.get('/stats', protect, rankingController.getStats);

export default router;