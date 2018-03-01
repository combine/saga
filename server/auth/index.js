import express from 'express';
import bodyParser from 'body-parser';
import * as controller from './auth.controller';
import setupPassport from '$auth/passport';
import { jsonHeaders } from '$middleware';

const router = setupPassport(express.Router());

router.use(jsonHeaders);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Authentication routes
router.post('/login', controller.login);
router.delete('/logout', controller.logout);

// Registration routes
router.post('/signup', controller.signup);

// Password reset
// router.post('/forgot-password', controller.forgotPassword);
// router.put('/reset-password', controller.resetPassword);

export default router;
