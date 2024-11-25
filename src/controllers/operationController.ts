import { Request, Response } from 'express';
import Operation from '@/models/Operation';
import { matchedData, validationResult } from 'express-validator';

export const getAllOperations = async (req: Request, res: Response) => {
	try {
		const { user_id } = req;
		const operations: Operation[] = await Operation.query().where('user_id', user_id!);

		res.send({
			success: true,
			data: operations,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err,
		});
	}
};

export const getOperationById = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) throw new Error('Bad Request. Invalid ID');

		const foundCategory: Operation | undefined = await Operation.query().findById(parsedId);

		if (!foundCategory) throw new Error('Operation not found');

		res.json({
			success: true,
			data: foundCategory,
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};

export const createOperation = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty())
			throw new Error(
				result
					.array()
					.map((err) => err.msg)
					.join(', ')
			);

		const user_id = req.user_id;

		const data = matchedData(req);

		const opearation = await Operation.query().insert({ user_id, ...data });

		res.json({
			success: true,
			data: opearation,
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};

export const updateOperation = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);
		if (!result.isEmpty())
			throw new Error(
				result
					.array()
					.map((err) => err.msg)
					.join(', ')
			);

		const data = matchedData(req);
		const opearationId = req.params.id;

		const category = await Operation.query().findById(opearationId);
		if (!category) throw new Error('Operation not found or access denied');

		const updatedCategory = await Operation.query().patchAndFetchById(opearationId, data);

		console.log('updatedCategory :>> ', updatedCategory);

		res.json({
			success: true,
			data: updatedCategory,
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};

export const deleteOperation = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) throw new Error('Bad Request. Invalid ID');

		const resultDelete = await Operation.query().deleteById(parsedId);

		if (!resultDelete) throw new Error('An unexpected error has occurred. Failed to delete operation');

		res.json({
			success: true,
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};
