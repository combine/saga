import express from 'express';
import { index } from './todos.controller';

const router = express.Router();

router.get('/', index);

export default router;
