/**
 * Dependence
 */
import config from "./src/config"

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
};

export default knexConfig;
