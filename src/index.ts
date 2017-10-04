import * as Knex from 'knex';
import * as express from 'express';

import knexmiddleware from './knexmiddleware';

const app = express();

const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

// knex multi-tenant middleware
app.use(knexmiddleware);

app.get('/', wrap(async (req, res) => {
  console.log('route /');
  const knex = req['knex'] as Knex.QueryBuilder;

  const values = await knex.from('test');
  res.send(values);
}));

app.get('/insert', wrap(async (req, res) => {
  console.log('route /insert');
  const knex = req['knex'] as Knex.QueryBuilder;

  const values = await knex.insert({ name: req.query.name || 'bruno' }).into('test');
  res.send(values);
}));

app.listen(3000, '0.0.0.0', () => console.log('started'));
