import { Request, Response } from 'express';
import Category from '@/models/Category';
import { matchedData, validationResult } from 'express-validator';

export const getAllCategories = async (_: Request, res: Response) => {
	try {
		const categories: Category[] = await Category.query();

		res.send({
			success: true,
			data: categories,
		});
	} catch (err) {
		res.json({
			success: false,
			message: err,
		});
	}
};


export const createCategory = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty())
			throw new Error(
				result
					.array()
					.map((err) => err.msg)
					.join(', ')
			);

		const { name } = matchedData(req);

		const isExists = await Category.query().findOne({ name });

		if (isExists) throw new Error('Category already exists');

        const user_id = req.user_id

		const category = await Category.query().insertAndFetch({
            user_id,
			name,
		});

		res.json({
			success: true,
			data: {
				id: category.id,
				name: category.name,
			},
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};