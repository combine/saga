import path from 'path';
import { Model } from 'objection';
import { addPath } from 'app-module-path';

// allow relative path for root /server directory
addPath(path.join(__dirname, '../..', 'server'));

// allow relative path for root /lib directory
addPath(path.join(__dirname, '../..', 'lib'));

// test directory
addPath(path.join(__dirname, '..'));

const db = require('db');

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
