exports.up = function(knex) {
  return knex.schema.createTable('option_types', table => {
    table.increments('id').primary();
    table.integer('product_id');
    table.string('name');
    table.json('values');
    table.timestamps();

    table.index(['product_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('option_types');
};
