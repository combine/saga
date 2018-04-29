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
      id: 1,
      name: faker.commerce.productName(),
      description: [
        faker.commerce.productAdjective(),
        faker.commerce.productMaterial()
      ].join(' ')
    },
    {
      id: 2,
      name: faker.commerce.productName(),
      description: [
        faker.commerce.productAdjective(),
        faker.commerce.productMaterial()
      ].join(' ')
    }
  ]);

  await User.query().insert([
    {
      id: 2,
      firstName: 'Moronius',
      lastName: 'Bario',
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'Password1'
    },
    {
      id: 3,
      firstName: 'Thaddeus',
      lastName: 'Klein',
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'Password1'
    }
  ]);

  await knex('favorites').insert([
    { id: 1, userId: 2, productId: 1 },
    { id: 2, userId: 2, productId: 2 },
    { id: 3, userId: 3, productId: 2 }
  ]);
};
