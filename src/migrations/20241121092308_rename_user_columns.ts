import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.alterTable('users', (table) => {
		table.renameColumn('userName', 'username');
		table.renameColumn('displayName', 'display_name');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.alterTable('users', (table) => {
		table.renameColumn('username', 'userName');
		table.renameColumn('display_name', 'displayName');
	});
}
