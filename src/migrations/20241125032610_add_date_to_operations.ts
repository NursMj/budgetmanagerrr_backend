import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.table('operations', (table) => {
		table.date('date').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.table('operations', (table) => {
		table.dropColumn('date');
	});
}
