import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import User from '@/models/User';
import Token from '@/models/Token';
import { isEmpty } from '@/utils';

export const login = async (req: Request, res: Response) => {
	try {
		const { userName, password } = req.body;

		if (isEmpty(userName) || isEmpty(password)) throw new Error('All fields must be fill');

		const user = await User.query().findOne({ userName });

		if (!user) throw new Error('Authentication failed');

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) throw new Error('Authentication failed');

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
				refresh_token,
			},
		});
	} catch (e: any) {
		res.json({
			success: false,
			message: e.message || e,
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		console.log('req.cookies :>> ', req.cookies);
		console.log('req :>> ', req);
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
		res.json({
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
		res.json({
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
		res.json({
			success: false,
			message: e.message || e,
		});
	}
};