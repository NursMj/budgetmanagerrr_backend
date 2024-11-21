import { Router } from 'express';
import { login, refresh, isAuth, logout } from '@/controllers/authController';

const router = Router();

router.post('', login);
router.post('/refresh', refresh);
router.get('/isAuth', isAuth);
router.post('/logout', logout);


export default router;