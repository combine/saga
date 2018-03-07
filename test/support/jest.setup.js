import '../../server/init';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Model } from 'objection';
import db from '$db/index';

// Bind all models to Knex
Model.knex(db);

// configure an adapter for enzyme
configure({ adapter: new Adapter() });
