import { combineReducers } from 'redux';
import products from './products';

const searchReducer = combineReducers({
  products
});

export default searchReducer;
