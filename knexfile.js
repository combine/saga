require('babel-register');
require('babel-polyfill');

const path = require('path');
const { addPath } = require('app-module-path');
const { knexSnakeCaseMappers } = require('objection');
const env = process.NODE_ENV || 'development';

addPath(path.join(__dirname, 'lib'));

if (env !== 'production') {
  require('dotenv').load();
}

const opts = {
  migrations: {
    tableName: 'knex_migrations',
    directory: './server/db/migrations'
  },
  seeds: {
    directory: './server/db/seeds'
  },
  ...knexSnakeCaseMappers()
};

const pg = {
  client: 'postgresql',
  connection: {
    host: process.env.PG_DB_HOST,
    user: process.env.PG_DB_USER,
    password: process.env.PG_DB_PASS,
    database: process.env.PG_DB_NAME
  },
  pool: {
    min: 2,
    max: 10
  },
  ...opts
};

module.exports = {
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './test/db.sqlite3'
    },
    ...opts
  },
  development: pg,
  production: pg
};
