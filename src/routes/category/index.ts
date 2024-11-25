import { Router } from 'express';
import { getAllCategories, createCategory, getCategoryById, deleteCategory, updateCategory } from "@/controllers/categoryController"
import { checkSchema } from 'express-validator';
import { createCategoryValidationSchema } from '@/validations/categoryValidationSchemas';
import { auth } from '@/middlewares/auth'

const router = Router();

router.get('/', auth, getAllCategories);

router.get('/:id', auth, getCategoryById);

router.post('/', auth, checkSchema(createCategoryValidationSchema), createCategory);

router.patch('/:id', auth, checkSchema(createCategoryValidationSchema), updateCategory);

router.delete('/:id', auth, deleteCategory);

export default router;