import { Router } from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from "@/controllers/userController"
import { checkSchema } from 'express-validator';
import { createUserValidationSchema } from '@/validations/userValidationSchemas';

const router = Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', checkSchema(createUserValidationSchema), createUser);

router.delete('/:id', deleteUser);

export default router;
