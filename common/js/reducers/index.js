import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Import your reducers here
import products from './products';

const rootReducer = combineReducers({
  routing: routerReducer,
  products
});

export default rootReducer;
