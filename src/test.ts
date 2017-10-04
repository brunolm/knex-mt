import * as Knex from 'knex';

import knexSettings from '../knexfile';

const settings = knexSettings[process.env.NODE_ENV];

(async function () {
  const values = await Knex(settings).withSchema('cli_1').from('test');
  console.log('values', values);

}());
