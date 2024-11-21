import Token from '@/models/Token';
import User from '@/models/User';
import { isEmpty } from '@/utils';

import type { NextFunction, Request, Response } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const bearerHeader = req.headers['authorization'];

		if (isEmpty(bearerHeader)) throw new Error('An unexpected error has occurred');

		const access_token = bearerHeader?.split(/\s/)[1];
		const user_token = await Token.query().findOne({
			access_token,
		});

		if (!user_token) throw new Error('An unexpected error has occurred');

		const user = await User.query().findOne({
			id: user_token.user_id,
		});

		if (!user) {
			throw new Error('An unexpected error has occurred');
		}

		req.user_id = user.id

		next();
	} catch (e: any) {
		res
			.status(401)
			.json({
				success: false,
				message: 'Unauthorized',
			})
			.end();
	}
};
