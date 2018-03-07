import express from 'express';
import { auth } from '$middleware';

const env = process.env.NODE_ENV || 'development';
const router = express.Router();
const handleRender = require(
  env === 'production' ? './handler.built' : './handler'
).default;

router.use(auth.withUser, handleRender);

module.exports = router;
