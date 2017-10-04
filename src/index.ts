import * as Knex from 'knex';
import * as express from 'express';

import knexSettings from '../knexfile';

const settings = knexSettings[process.env.NODE_ENV];

const app = express();

const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

// knex multi-tenant middleware
app.use((req, res, next) => {
  const schema = `cli_${req.headers['x-client-id'] || '1'}`;

  const knexConfig = knexSettings[req.query.db] || settings;

  req['knex'] = Knex(knexConfig).withSchema(schema);

  next();
});

app.get('/', wrap(async (req, res) => {
  console.log('route /');
  const knex = req['knex'] as Knex.QueryBuilder;

  const values = await knex.from('test');
  res.send(values);
}));

app.listen(3000, '0.0.0.0', () => console.log('started'));
