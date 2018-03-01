import express from 'express';
import bodyParser from 'body-parser';
import products from './products';
import todos from './todos';
import users from './users';
import { jsonHeaders } from '$middleware';

const Api = express();

// always send JSON headers
Api.use(jsonHeaders);

// parse JSON body
Api.use(bodyParser.json());

// Add all API endpoints here
Api.use('/products', products);
Api.use('/users', users);
Api.use('/todos', todos);

export default Api;
