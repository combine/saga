import express from 'express';
import bodyParser from 'body-parser';
import products from './products';
import users from './users';
import { errorHandler, jsonHeaders } from '$middleware';

const Api = express();

// always send JSON headers
Api.use(jsonHeaders);

// parse JSON body
Api.use(bodyParser.json());

// Add all API endpoints here
Api.use('/products', products);
Api.use('/users', users);

// Handle errors with middleware
// NOTE: This must be at the end of the router in order for the errors to be
// propertly routed via next().
Api.use(errorHandler);

export default Api;
