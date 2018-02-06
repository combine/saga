const Knex = require('knex');
const env = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[env];

module.exports = Knex(config);
