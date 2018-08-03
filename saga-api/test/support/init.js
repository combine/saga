// NOTE: This file is run before tests via 'npm pretest'.
require('../../server/init');
const db = require('./db');
const get = require('lodash/get');
const dbName = get(db, 'config.knex.connection.database');

// Drop database and re-create it.
db.dropDb(dbName)
  .then(() => {
    console.log(`\nDropped database \`${dbName}\`, re-creating...`);

    return db.createDb(dbName).then(() => {
      console.log(`Created database \`${dbName}\`.`);

      return db.migrateDb().then(res => {
        if (res[0] === 1) {
          res[1].forEach(migration => {
            console.log(`Ran migration: ${migration}.`);
          });

          // Must exit the process to end the pre-test
          process.exit(0);
        }
      });
    });
  }).catch(err => {
    console.log(`Could not drop database ${dbName}:`, err);
  });
