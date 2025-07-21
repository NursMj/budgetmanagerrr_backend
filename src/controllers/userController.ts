import { Request, Response } from 'express';
import User from '@/models/User';
import { matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

export const getAllUsers = async (_: Request, res: Response) => {
	try {
		const users: User[] = await User.query();

		const data = users.map((user) => {
			return { ...user, password: undefined };
		});

		res.send({
			success: true,
			data,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || err,
		});
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) {
			res.status(400).json({
				success: true,
				message: 'Bad Request. Invalid ID',
			});
			return;
		}

		const foundUser: User | undefined = await User.query().findById(parsedId);

		if (!foundUser) {
			res.status(404).json({
				success: true,
				message: 'User not found',
			});
			return;
		}

		const data = { ...foundUser, password: undefined };

		res.json({
			success: true,
			data,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || err,
		});
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const result = validationResult(req);

		if (!result.isEmpty()) {
			res.status(400).json({
				success: false,
				message: result
					.array()
					.map((err) => err.msg)
					.join(', '),
			});
			return;
		}

		const { email, name, password } = matchedData(req);

		const isExists = await User.query().findOne({ email });

		if (isExists) {
			res.status(409).json({
				success: false,
				message: 'User with email nurs@gmail.com already exists',
			});
			return;
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.query().insertAndFetch({
			email,
			name,
			password: hashedPassword,
		});

		res.json({
			success: true,
			data: {
				id: user.id,
				email: user.email,
				name: user.name,
			},
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || err,
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const parsedId = parseInt(req.params.id);
		if (isNaN(parsedId)) {
			res.status(400).json({
				success: true,
				message: 'Bad Request. Invalid ID',
			});
			return;
		}

		const resultDelete = await User.query().deleteById(parsedId);

		if (!resultDelete) throw new Error('Failed to delete user');

		res.json({
			success: true,
		});
	} catch (err: any) {
		res.status(500).json({
			success: false,
			message: err.message || err,
		});
	}
};
