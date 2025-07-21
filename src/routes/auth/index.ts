import { Router } from 'express';
import { login, refresh, isAuth, logout } from '@/controllers/authController';
import { checkSchema } from 'express-validator';
import { authValidationSchema } from '@/validations/authValidationSchema';

const router = Router();

router.post('', checkSchema(authValidationSchema), login);
router.post('/refresh', refresh);
router.get('/isAuth', isAuth);
router.post('/logout', logout);


export default router;