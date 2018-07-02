
exports.up = function(knex) {
  return knex.schema.createTable('variants', table => {
    table.increments('id').primary();
    table.boolean('is_master');
    table.integer('product_id');
    table.integer('price_in_cents');
    table.json('options');
    table.string('sku');
    table.string('barcode');
    table.timestamps();

    table.index(['product_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('variants');
};
