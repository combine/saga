const { Model } = require('objection');
const db = require('../../server/db');

module.exports = async () => {
  // Bind all models to Knex
  Model.knex(db);

  // Add stubs, etc. here.
  await db.migrate.rollback();
  await db.migrate.latest();
};
