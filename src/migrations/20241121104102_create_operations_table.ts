import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('operations', (table) => {
		table.increments('id').primary();
		table.integer('user_id').unsigned().notNullable();
		table.integer('category_id').unsigned().notNullable();
		table.enu('operation_type', ['income', 'outcome']).notNullable();
		table.dateTime('created_at').defaultTo(knex.fn.now());
		table.dateTime('updated_at').defaultTo(knex.fn.now());
		table.float('sum').notNullable();
		table.text('description');

		// Foreign keys
		table.foreign('user_id').references('users.id');
		table.foreign('category_id').references('categories.id');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('operations');
}