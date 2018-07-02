import { Model } from 'objection';
import faker from 'faker';
import db from '../index';
import Product from '../../models/Product';
import User from '../../models/User';

Model.knex(db);

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('products').del();
  await knex('favorites').del();

  await User.query().insert({
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    password: 'Password1',
    role: 'admin',
    email: 'admin@example.com'
  });

  await Product.query().insert([
    {
      name: faker.commerce.productName(),
      description: [
        faker.commerce.productAdjective(),
        faker.commerce.productMaterial()
      ].join(' ')
    },
    {
      name: faker.commerce.productName(),
      description: [
        faker.commerce.productAdjective(),
        faker.commerce.productMaterial()
      ].join(' ')
    }
  ]);

  await User.query().insert([
    {
      firstName: 'Moronius',
      lastName: 'Bario',
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'Password1'
    },
    {
      firstName: 'Thaddeus',
      lastName: 'Klein',
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'Password1'
    }
  ]);
};
