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
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    username: 'saga_admin',
    password: 'password',
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
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'password'
    },
    {
      id: 3,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: 'password'
    }
  ]);

  await knex('favorites').insert([
    { id: 1, userId: 2, productId: 1 },
    { id: 2, userId: 2, productId: 2 },
    { id: 3, userId: 3, productId: 2 }
  ]);
};
