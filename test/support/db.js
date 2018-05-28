const knexDbManager = require('knex-db-manager');
const testConfig = require('../../knexfile.js')['test'];

const db = knexDbManager.databaseManagerFactory({
  knex: testConfig,
  dbManager: {
    superUser: testConfig.connection.user
  }
});

module.exports = db;

// const v = {
//   teardown: () => {
//     // close connection to the database
//     return db.close().then(() => {
//       console.log('Database connection closed.');
//       return db.closeKnex().then(() => {
//         console.log('Knex connection closed.');
//       }).catch(err => {
//         console.log('Could not close knex connection:', err);
//       });
//     }).catch(err => {
//       console.log('Could not close database connectiion:', err);
//     });
//   }
// };
