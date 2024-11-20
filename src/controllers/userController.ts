import { Request, Response } from 'express';
import User from '@/models/User';
import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import type { IUser } from '@/routes/user/types';

export const getAllUsers = async (_: Request, res: Response) => {
	try {
		const users: IUser[] = await User.query();

		const data = users.map((user) => {
			return { ...user, password: undefined };
		});

		res.send({
			success: true,
			data,
		});
	} catch (err) {
		console.log('err :>> ', err);
		res.json({
			success: false,
			message: err,
		});
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) throw new Error('Bad Request. Invalid ID');

		const foundUser: IUser | undefined = await User.query().findById(parsedId);

		if (!foundUser) throw new Error('User not found');

		const data = { ...foundUser, password: undefined };

		res.json({
			success: true,
			data,
		});
	} catch (e: any) {
		res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty())
			throw new Error(
				result
					.array()
					.map((e) => e.msg)
					.join(', ')
			);

		const { userName, displayName, password } = matchedData(req);

		const isExists = await User.query().select('users.userName').where('users.userName', '=', userName);

		if (isExists.length > 0) throw new Error('Username already taken');

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.query().insertAndFetch({
			userName,
			displayName,
			password: hashedPassword,
		});

		res.json({
			success: true,
			data: {
				id: user.id,
				userName: user.userName,
				displayName: user.displayName,
			},
		});
	} catch (e: any) {
		res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) throw new Error('Bad Request. Invalid ID');

		const resultDelete = await User.query().deleteById(parsedId);

		if (!resultDelete) throw new Error('An unexpected error has occurred');

		res.json({
			success: true,
		});
	} catch (e: any) {
		res.json({
			success: false,
			message: e.message || e,
		});
	}
};
