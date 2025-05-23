import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.
        createTable('users', (table) => {
    		table.increments().primary();
    		table.string('userName').notNullable().unique();
    		table.string('displayName').notNullable();
    		table.string('password').notNullable();
    		table.timestamps(true, true);
    	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('users');
}
