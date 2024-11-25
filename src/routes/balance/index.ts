import { Router } from 'express';
import { getUserBalance } from "@/controllers/balanceController"
import { auth } from '@/middlewares/auth';

const router = Router();

router.get('/', auth, getUserBalance);


export default router;
