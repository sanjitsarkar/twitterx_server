import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                { firstName: 'John', lastName: 'Doe', password: 'hashed_password_1', email: 'john@example.com' },
                { firstName: 'Jane', lastName: 'Doe', password: 'hashed_password_2', email: 'jane@example.com' },
            ]);
        });
};


