const knexDbManager = require('knex-db-manager');
const testConfig = require('../../knexfile.js')['test'];

const { database: dbName } = testConfig.connection;
const db = knexDbManager.databaseManagerFactory({
  knex: testConfig,
  dbManager: {
    superUser: testConfig.connection.user
  }
});

module.exports = {
  db,

  setup: () => {
    // Drop database and re-create it.
    return db.dropDb(dbName).then(() => {
      console.log(`\nDropped database \`${dbName}\`, re-creating...`);

      return db.createDb(dbName).then(() => {
        console.log(`Created database \`${dbName}\`.`);

        return db.migrateDb().then(res => {
          if (res[0] === 1) {
            res[1].forEach(migration => {
              console.log(`Ran migration: ${migration}.`);
            });
          }
        });
      });
    }).catch(err => {
      console.log(`Could not drop database ${dbName}:`, err);
    });
  },

  teardown: () => {
    // close connection to the database
    return db.close().then(() => {
      console.log('Database connection closed.');
      return db.closeKnex().then(() => {
        console.log('Knex connection closed.');
      }).catch(err => {
        console.log('Could not close knex connection:', err);
      });
    }).catch(err => {
      console.log('Could not close database connectiion:', err);
    });
  }
};
