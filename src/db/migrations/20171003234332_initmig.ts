import * as Knex from "knex";

function getSchema(knex: Knex) {
  const client = knex.client.config.schema;

  return {
    client,
    schema: client ? knex.schema.withSchema(client) : knex.schema,
  };
}

export async function up(knex: Knex): Promise<any> {
  const { client, schema } = getSchema(knex);

  await knex.raw(`create schema ${client}`);

  await schema.createTable('test', (table) => {
    table.increments('id').primary();
    table.string('name', 256);
  });
};

export async function down(knex: Knex): Promise<any> {
  const { client, schema } = getSchema(knex);

  await schema.dropTable('test');
  await knex.raw(`drop schema ${client}`);
};
