import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('categories', (table) => {
		table.increments('id').primary();
		table.integer('user_id').unsigned().notNullable();
		table.text('name').notNullable();
		table.dateTime('created_at').defaultTo(knex.fn.now());
		table.dateTime('updated_at').defaultTo(knex.fn.now());

		// Foreign keys
		table.foreign('user_id').references('users.id');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('categories');
}
