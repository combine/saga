import express from 'express';
import { index, show } from './products.controller';

const router = express.Router();

router.get('/', index);
router.get('/:slug', show);

export default router;
