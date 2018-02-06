import express from 'express';
import { index } from './products.controller';

const router = express.Router();

router.get('/', index);

export default router;
