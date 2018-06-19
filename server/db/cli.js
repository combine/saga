import '../init';
import { get } from 'lodash';
import { getEnv } from '@lib/env';
import { argv } from 'yargs';
import knexDbManager from 'knex-db-manager';

const env = getEnv('NODE_ENV', 'development');
const knex = require('../../knexfile.js')[env];
const db = knexDbManager.databaseManagerFactory({
  knex,
  dbManager: {
    superUser: knex.connection.user
  }
});

const dbName = get(knex, 'connection.database');

const { task } = argv;

switch (task) {
  case 'create':
    db
      .createDb(dbName)
      .then(() => {
        console.log('Database', dbName, 'created.');
        process.exit(0);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });

    break;

  case 'drop':
    db
      .dropDb(dbName)
      .then(() => {
        console.log('Database', dbName, 'dropped.');
        process.exit(0);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });

    break;
}

// Drop database and re-create it.
// db.dropDb(dbName)
//   .then(() => {
//     console.log(`\nDropped database \`${dbName}\`, re-creating...`);
//
//     return db.createDb(dbName).then(() => {
//       console.log(`Created database \`${dbName}\`.`);
//
//       return db.migrateDb().then(res => {
//         if (res[0] === 1) {
//           res[1].forEach(migration => {
//             console.log(`Ran migration: ${migration}.`);
//           });
//
//           // Must exit the process to end the pre-test
//           process.exit(0);
//         }
//       });
//     });
//   }).catch(err => {
//     console.log(`Could not drop database ${dbName}:`, err);
//   });
