import { Model } from 'objection';
import db from './db';

// Bind Objection models to database
Model.knex(db.knexInstance());

afterAll(async () => {
  await db.close();
  await db.closeKnex();
});
