import { Router } from 'express';
import { getAllCategories, createCategory } from "@/controllers/categoryController"
import { checkSchema } from 'express-validator';
import { createCategoryValidationSchema } from '@/validations/categoryValidationSchemas';
import { auth } from '@/middlewares/auth'

const router = Router();

router.get('/', auth, getAllCategories);

// router.get('/:id', getUserById);

router.post('/', auth, checkSchema(createCategoryValidationSchema), createCategory);

// router.delete('/:id', deleteUser);

export default router;