
exports.up = function(knex) {
  return knex.schema.createTable('favorites', table => {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('product_id');
    table.timestamps();

    table.unique(['user_id', 'product_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('favorites');
};
