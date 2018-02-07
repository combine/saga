const { Model } = require('objection');
const faker = require('faker');
const db = require('../index');

Model.knex(db);

const Product = require('../../models/Product').default;
const User = require('../../models/User').default;


exports.seed = async function(knex) {
  await knex('users').del();
  await knex('products').del();
  await knex('favorites').del();

  await User.query().insert({
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
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
      password: 'password'
    },
    {
      id: 3,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password'
    }
  ]);

  await knex('favorites').insert([
    { id: 1, userId: 2, productId: 1 },
    { id: 2, userId: 2, productId: 2 },
    { id: 3, userId: 3, productId: 2 }
  ]);
};
