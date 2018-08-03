
exports.up = function(knex) {
  return knex.schema
    .createTable('variants', table => {
      table.increments('id').primary();
      table.boolean('is_master').notNullable().defaultTo(false);
      table.integer('product_id').notNullable();
      table.integer('price_in_cents').defaultTo(0);
      table.jsonb('options').nullable().defaultTo(null);
      table.string('sku').defaultTo('');
      table.string('barcode').defaultTo('');
      table.timestamps();

      table.index(['product_id']);
      table.index(['sku']);
      table.index(['barcode']);

      table.unique(['product_id', 'options']);
    })
    .raw(
      'CREATE INDEX on ?? USING GIN (??)',
      ['variants', 'options']
    );
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('variants');
};
