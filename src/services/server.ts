import express from 'express';
import routes from '@/routes';
import config from '@/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import initializeDatabase from './database';

export default async function startServer() {
	const dbConnected = await initializeDatabase();

	if (!dbConnected) {
		console.error('Server startup aborted due to database connection failure');
		process.exit(1);
	}

	const app = express();

	app.use(
		cors({
			origin: true,
			credentials: true,
		})
	);

	app.use(express.json());
	app.use(cookieParser());
	app.use(routes);

	const PORT = config.port ? +config.port : 3000;
	const HOST = config.host || 'localhost';

	app.listen(PORT, HOST, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}
