import './server/init';
import path from 'path';
import { knexSnakeCaseMappers } from 'objection';

const { DB_DRIVER, DB_NAME, DB_HOST, DB_USER, DB_PASS, USER } = process.env;
const driver = DB_DRIVER || 'postgres';
const opts = {
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, 'server/db/migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'server/db/seeds')
  },
  ...knexSnakeCaseMappers()
};

const drivers = {
  postgres: {
    client: 'postgresql',
    connection: {
      database: DB_NAME,
      host: DB_HOST || 'localhost',
      user: DB_USER || USER || 'postgres',
      password: DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
  }
};

module.exports = {
  test: { ...drivers[driver], ...opts },
  development: { ...drivers[driver], ...opts },
  production: { ...drivers[driver], ...opts }
};
