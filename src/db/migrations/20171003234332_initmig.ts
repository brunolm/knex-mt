import * as Knex from "knex";

import knexSettings from '../../../knexfile';

const settings = knexSettings[process.env.NODE_ENV];

export async function up(knex: Knex): Promise<any> {
  await Knex(settings).raw('create schema cli_1');
  await Knex(settings).schema.withSchema('cli_1').createTable('test', (table) => {
    table.increments('id').primary();
    table.string('name', 256);
  });
};

export async function down(knex: Knex): Promise<any> {
  await Knex(settings).schema.withSchema('cli_1').dropTable('test');
  await Knex(settings).raw('drop schema cli_1');
};
