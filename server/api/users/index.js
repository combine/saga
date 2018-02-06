import express from 'express';
import { show } from './users.controller';

const router = express.Router();

router.get('/:id', show);

export default router;
