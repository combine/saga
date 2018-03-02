const db = require('../../server/db');

module.exports = async () => {
  await db.migrate.rollback();
  return await db.migrate.latest();
};
