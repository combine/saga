import { configure } from 'enzyme';
import { Model } from 'objection';
import Adapter from 'enzyme-adapter-react-16';
import db from './db';

// Bind Objection models to database
Model.knex(db.knexInstance());

// configure an adapter for enzyme
configure({ adapter: new Adapter() });

afterAll(async () => {
  await db.close();
  await db.closeKnex();
});
