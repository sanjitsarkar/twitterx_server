import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('follows', (table) => {
    table.increments('id').primary();
    table.integer('follower_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('following_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);

    table.unique(['follower_id', 'following_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('follows');
}
