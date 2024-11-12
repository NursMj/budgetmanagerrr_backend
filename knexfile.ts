/**
 * Dependence
 */
import 'dotenv/config';

import * as path from 'node:path';
import { knexSnakeCaseMappers } from 'objection';

/**
 * Types
 */
import type { Knex } from 'knex';

// Update with your config settings.
const config: Knex.Config = {
	client: 'mysql2',
	connection: {
		database: process.env.MYSQL_DATABASE,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		host: process.env.MYSQL_HOST,
		port: parseInt(process.env.MYSQL_PORT!),
	},
	pool: {
		min: 0,
		max: 10,
	},
	migrations: {
		directory: path.join('./src/migrations'),
	},
	...knexSnakeCaseMappers,
};

export default config;
