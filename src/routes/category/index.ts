import { Router } from 'express';
import { getAllCategories, createCategory, getCategoryById, deleteCategory, updateCategory } from "@/controllers/categoryController"
import { checkSchema } from 'express-validator';
import { createCategoryValidationSchema } from '@/validations/categoryValidationSchemas';
import { auth } from '@/middlewares/auth'

const router = Router();

router.get('/', auth, getAllCategories);

router.get('/:id', getCategoryById);

router.post('/', auth, checkSchema(createCategoryValidationSchema), createCategory);

router.patch('/:id', auth, checkSchema(createCategoryValidationSchema), updateCategory);

router.delete('/:id', deleteCategory);

export default router;