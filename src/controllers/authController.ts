import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import Token from '@/models/Token';
import { isEmpty } from '@/utils';
import { matchedData, validationResult } from 'express-validator';

export const login = async (req: Request, res: Response) => {
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

		const { email, password } = matchedData(req);

		if (isEmpty(email) || isEmpty(password)) {
			res.status(400).json({
				success: false,
				message: 'All fields must be fill',
			});
			return;
		}

		const user = await User.query().findOne({ email });

		if (!user) {
			res.status(400).json({
				success: false,
				message: 'Incorrect email or password',
			});
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			res.status(400).json({
				success: false,
				message: 'Incorrect email or password',
			});
			return;
		}

		const access_token = user.getAccessToken();
		const refresh_token = user.getRefreshToken();

		const user_token = await Token.query().insert({
			user_id: user.id,
			access_token,
			refresh_token,
		});

		if (!user_token) throw new Error('An unexpected error has occurred');

		res.cookie('refreshToken', refresh_token, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.json({
			success: true,
			data: {
				id: user.id,
				access_token,
			},
		});
	} catch (e: any) {
		res.status(500).json({
			success: false,
			message: e.message || e,
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;
		await Token.query()
			.findOne({
				refresh_token: refreshToken,
			})
			.delete();
		res.clearCookie('refreshToken');
		res.json({
			success: true,
		});
	} catch (e: any) {
		res.status(500).json({
			success: false,
			message: e.message || e,
		});
	}
};

export const isAuth = async (req: Request, res: Response) => {
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

		if (!user) throw new Error('An unexpected error has occurred');

		user.getAccessToken();

		res.json({
			success: true,
		});
	} catch (e: any) {
		res.status(500).json({
			success: false,
			message: e.message || e,
		});
	}
};

export const refresh = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;

		if (isEmpty(refreshToken)) throw new Error('An unexpected error has occurred');

		const user_token = await Token.query().findOne({
			refresh_token: refreshToken,
		});

		if (!user_token) throw new Error('An unexpected error has occurred');

		const user = await User.query().findOne({
			id: user_token.user_id,
		});

		user_token.verifyAccessToken();
		user_token.verifyRefreshToken();

		if (!user) throw new Error('An unexpected error has occurred');

		const new_access_token = user.getAccessToken();
		const new_refresh_token = user.getRefreshToken();
		const newUA = await user_token.getUA(req.header('User-Agent'));

		await Token.query().patch({
			access_token: new_access_token,
			refresh_token: new_refresh_token,
			ua: newUA,
		});

		res.json({
			success: true,
			data: {
				id: user.id,
				access_token: new_access_token,
				refresh_token: new_refresh_token,
			},
		});
	} catch (e: any) {
		res.status(500).json({
			success: false,
			message: e.message || e,
		});
	}
};
