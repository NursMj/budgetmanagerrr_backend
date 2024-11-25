import { Request, Response } from 'express';
import Category from '@/models/Category';
import { matchedData, validationResult } from 'express-validator';

export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const { user_id } = req;
		const { page, limit } = req.query;

		let query = Category.query().where('user_id', user_id!);
		
		if (page && limit) {
			const offset = (Number(page) - 1) * Number(limit);
			query = query.offset(offset).limit(Number(limit));
		}

		const categories: Category[] = await query;

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

export const getCategoryById = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) throw new Error('Bad Request. Invalid ID');

		const foundCategory: Category | undefined = await Category.query().findById(parsedId);

		if (!foundCategory) throw new Error('Category not found');

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
		const { user_id } = req;

		const isExists = await Category.query().findOne({ name, user_id });

		if (isExists) throw new Error('Category already exists');

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

export const updateCategory = async (req: Request, res: Response) => {
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
		const categoryId = req.params.id;
		const { user_id } = req;

		const category = await Category.query().findById(categoryId).where('user_id', user_id!);
		if (!category) throw new Error('Category not found or access denied');

		const isExists = await Category.query().findOne({ name, user_id });
		if (isExists && isExists.id !== parseInt(categoryId))
			throw new Error('Another category with this name already exists');

		const updatedCategory = await Category.query().patchAndFetchById(categoryId, { name }).where('user_id', user_id!);

		res.json({
			success: true,
			data: {
				id: updatedCategory.id,
				name: updatedCategory.name,
			},
		});
	} catch (err: any) {
		res.json({
			success: false,
			message: err.message || err,
		});
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) throw new Error('Bad Request. Invalid ID');

		const resultDelete = await Category.query().deleteById(parsedId);

		if (!resultDelete) throw new Error('An unexpected error has occurred. Failed to delete category');

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
