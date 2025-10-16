import knexConfig from '../../knexfile';
import Knex from 'knex';
import { Model } from 'objection';

const knex = Knex(knexConfig);

export default async function initializeDatabase() {
	try {
		await knex.raw('SELECT 1');
		console.log('Database connected successfully');

		Model.knex(knex);

		return true;
	} catch (error: any) {
		console.error('Failed to connect to database:', error?.message || error);
		return false;
	}
}
