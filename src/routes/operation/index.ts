import { Router } from 'express';
import { getAllOperations } from "@/controllers/operationController"
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '@/validations/userValidationSchemas';
import { auth } from '@/middlewares/auth'

const router = Router();

router.get('/', auth, getAllOperations);

// router.get('/:id', getUserById);

// router.post('/', checkSchema(createUserValidationSchema), createUser);

// router.delete('/:id', deleteUser);

export default router;