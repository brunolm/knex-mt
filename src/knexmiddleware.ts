import * as Knex from 'knex';
import * as express from 'express';
import * as lru from 'lru-cache';

import knexSettings from '../knexfile';

const settings = knexSettings[process.env.NODE_ENV];
const wrap = (fn) => (...args) => fn(...args).catch(args[2]);

const app = express.Router();

const cache = lru({});

app.use(wrap(async (req, res, next) => {
  // const cli = `${req.headers['x-client-id'] || '1'}`;
  const cli = `c${req.query['x-client-id'] || '1'}`;
  const schema = `${cli}${settings.client === 'mysql' ? `_${settings.connection.database}` : ''}`;

  const cachedKnex = cache.get(cli) as Knex;

  const knex = cachedKnex || Knex({ ...settings, schema });

  if (!cachedKnex) {
    if (settings.migrations) {
      await knex.migrate.latest();
    }

    if (settings.seeds) {
      await knex.seed.run();
    }

    cache.set(cli, knex);
  }

  req['knex'] = knex.withSchema(schema);
  req['knexRaw'] = knex;

  next();
}));

export default app;
