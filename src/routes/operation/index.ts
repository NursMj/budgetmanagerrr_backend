import { Router } from 'express';
import { getAllOperations, getOperationById, createOperation, updateOperation, deleteOperation } from "@/controllers/operationController"
import { checkSchema } from 'express-validator';
import { createOperationValidationSchema, updateOperationValidationSchema } from '@/validations/operationValidationSchemas';
import { auth } from '@/middlewares/auth'

const router = Router();

router.get('/', auth, getAllOperations);

router.get('/:id', auth, getOperationById);

router.post('/', auth, checkSchema(createOperationValidationSchema), createOperation);

router.patch('/:id', auth, checkSchema(updateOperationValidationSchema), updateOperation);

router.delete('/:id', auth, deleteOperation);

export default router;