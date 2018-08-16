
exports.up = function(knex) {
  return knex.schema.createTable('products', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('slug').unique();
    table.text('description').nullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products');
};
