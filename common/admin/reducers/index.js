import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from '@app/reducers/auth';
import products from '@app/reducers/products';
import search from '@admin/reducers/search';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth,
  products,
  search
});

export default rootReducer;
