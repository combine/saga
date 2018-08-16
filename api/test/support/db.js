const knexDbManager = require('knex-db-manager');
const testConfig = require('../../knexfile.js')['test'];

const db = knexDbManager.databaseManagerFactory({
  knex: testConfig,
  dbManager: {
    superUser: testConfig.connection.user
  }
});

module.exports = db;
