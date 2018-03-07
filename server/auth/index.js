import express from 'express';
import bodyParser from 'body-parser';
import * as controller from './auth.controller';
import setupPassport from '$auth/passport';
import { errorHandler, jsonHeaders } from '$middleware';

const auth = setupPassport(express.Router());

// always send JSON headers
auth.use(jsonHeaders);


// parse JSON body
auth.use(bodyParser.json());

// auth.use(bodyParser.urlencoded({ extended: false }));

// Authentication routes
auth.post('/login', controller.login);
auth.delete('/logout', controller.logout);

// Registration routes
auth.post('/signup', controller.signup);

// Password reset
// auth.post('/forgot-password', controller.forgotPassword);
// auth.put('/reset-password', controller.resetPassword);

// Handle errors with middleware
auth.use(errorHandler);

export default auth;
