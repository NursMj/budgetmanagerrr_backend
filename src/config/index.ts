import * as dotenv from 'dotenv';
dotenv.config();

export default {
	port: process.env.PORT,
	host: process.env.HOST,
	clientUrl: process.env.CLIENT_URL,
	db: {
		database: process.env.MYSQL_DATABASE,
		username: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
	},
	jwt: {
		access_token_secret: process.env.ACCESS_TOKEN_SECRET || '',
		access_token_expiration: process.env.ACCESS_TOKEN_EXPIRATION,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || '',
		refresh_token_expiration: process.env.REFRESH_TOKEN_EXPIRATION,
	},
};
