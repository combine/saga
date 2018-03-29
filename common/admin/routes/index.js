import Error from '@admin/pages/Error';
import Home from '@admin/pages/Home';
import Products from '@admin/pages/Products';

export default [
  { path: '/admin', exact: true, component: Home },
  { path: '/admin/products', exact: true, component: Products },
  { path: '*', component: Error }
];
