import * as express from 'express';

import { KnexTenanty } from 'knex-tenanty';
import knexSettings from '../knexfile';

const app = express.Router();

const middleware = KnexTenanty(knexSettings[process.env.NODE_ENV], (req) => req.query['x-client-id'] || '1');
app.use(middleware);

export default app;
