const path = require('path');
const { knexSnakeCaseMappers } = require('objection');
const env = process.NODE_ENV || 'development';

if (env !== 'production') {
  require('dotenv').load();
}

const opts = Object.assign({
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'server/db/migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'server/db/seeds')
  }
}, knexSnakeCaseMappers());

const pg = Object.assign({
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
  }
}, opts);

module.exports = {
  test: Object.assign({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: path.join(__dirname, 'test/db.sqlite3')
    }
  }, opts),
  development: pg,
  production: pg
};
