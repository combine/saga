const Knex = require('knex');
const env = process.env.NODE_ENV || 'development';
const path = require('path');
const knexfilePath = path.join(__dirname, '../..', 'knexfile.js');
const config = require(knexfilePath)[env];

module.exports = Knex(config);
