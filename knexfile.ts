/**
 * Dependence
 */
import config from "./src/config"

import * as path from 'node:path';
import { knexSnakeCaseMappers } from 'objection';

/**
 * Types
 */
import type { Knex } from 'knex';

// Update with your config settings.
const knexConfig: Knex.Config = {
	client: 'mysql2',
	connection: {
		database: config.db.database,
		user: config.db.username,
		password: config.db.password,
		host: config.db.host,
		port: parseInt(config.db.port!),
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

export default knexConfig;
