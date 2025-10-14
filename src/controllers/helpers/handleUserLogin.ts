import User from '@/models/User';
import Token from '@/models/Token';
import type { Response } from 'express';

const handleUserLogin = async (user: User, res: Response) => {
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

	return {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
		},
		access_token,
	};
};

export default handleUserLogin;
