import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from '@app/reducers/auth';
import product from '@admin/reducers/product';
import products from '@app/reducers/products';
import search from '@admin/reducers/search';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  product,
  products,
  search
});

export default rootReducer;
