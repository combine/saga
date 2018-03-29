import Error from '@app/pages/Error';
import Home from '@app/pages/Home';
import Products from '@app/pages/Products';
import Login from '@app/pages/Login';
import Signup from '@app/pages/Signup';

export default [
  { path: '/', exact: true, component: Home },
  { path: '/products', exact: true, component: Products },
  { path: '/login', exact: true, component: Login },
  { path: '/signup', exact: true, component: Signup },
  { path: '*', component: Error }
];
