import path from 'path';
import Knex from 'knex';
import { getEnv } from '@lib/env';

const env = getEnv('NODE_ENV', 'development');
const knexfilePath = path.join(process.cwd(), 'knexfile.js');
const config = require(knexfilePath)[env];
const knex = Knex(config);

module.exports = knex;
