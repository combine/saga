
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.enu('role', ['admin', 'user']);
    table.string('username');
    table.string('email');
    table.string('password');
    table.string('reset_password_token');
    table.string('reset_password_exp');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
