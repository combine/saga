'use strict';

import Home from '@pages/Home';
import Products from '@pages/Products';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import Error from '@pages/Error';

export default [
  { path: '/', exact: true, component: Home },
  { path: '/products', exact: true, component: Products },
  { path: '/login', exact: true, component: Login },
  { path: '/signup', exact: true, component: Signup },
  { path: '*', component: Error }
];
