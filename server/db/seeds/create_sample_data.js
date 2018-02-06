const faker = require('faker');

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('products').del();
  await knex('favorites').del();

  await knex('users').insert([
    {
      id: 1,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      email: 'admin@example.com'
    }
  ]);

  await knex('products').insert([
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

  await knex('users').insert([
    {
      id: 2,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    },
    {
      id: 3,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    }
  ]);

  await knex('favorites').insert([
    { id: 1, userId: 2, productId: 1 },
    { id: 2, userId: 2, productId: 2 },
    { id: 3, userId: 3, productId: 2 }
  ]);
};
