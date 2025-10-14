import { Router } from 'express';
import { login, refresh, me, logout } from '@/controllers/authController';
import { checkSchema } from 'express-validator';
import { authValidationSchema } from '@/validations/authValidationSchema';

const router = Router();

router.post('', checkSchema(authValidationSchema), login);
router.post('/refresh', refresh);
router.get('/me', me);
router.post('/logout', logout);


export default router;