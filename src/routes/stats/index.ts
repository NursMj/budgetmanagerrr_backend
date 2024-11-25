import { Router } from 'express';
import { getMonthlyStats, getYearlyStats } from '@/controllers/statsController';
import { auth } from '@/middlewares/auth'

const router = Router();

router.get('/monthly', auth, getMonthlyStats);
router.get('/yearly', auth, getYearlyStats);

export default router;