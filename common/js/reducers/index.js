import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your reducers here
import auth from './auth';
import products from './products';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  products
});

export default rootReducer;
