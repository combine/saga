import express from 'express';
import { index, show, update } from './products.controller';
import { findResource } from '$middleware';

const router = express.Router();
const findProduct = findResource('product', { column: 'slug', param: 'slug' });

router.get('/', index);
router.get('/:slug', findProduct, show);
router.put('/:slug', findProduct, update);

export default router;
