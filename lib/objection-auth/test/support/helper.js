import { Model } from 'objection';
import db from '../db';

// Bind all models to Knex
Model.knex(db);

// Global before()
before(async function() {
  // Add stubs, etc. here.
  await db.migrate.rollback();
  await db.migrate.latest();
});

after(async function() {
  await db.migrate.rollback();
});
