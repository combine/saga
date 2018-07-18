import express from 'express';

const env = process.env.NODE_ENV || 'development';
const router = express.Router();
const handleRender = require(
  env === 'production' ? './middlware.built' : './middleware'
).default;

router.use(handleRender);

module.exports = router;
