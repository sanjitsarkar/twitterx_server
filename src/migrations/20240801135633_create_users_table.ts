import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');

}

