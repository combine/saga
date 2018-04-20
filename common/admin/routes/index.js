import Error from '@admin/pages/Error';
import Home from '@admin/pages/Home';
import Product from '@admin/pages/Product';
import Products from '@admin/pages/Products';

export default [
  { path: '/admin', exact: true, component: Home },
  { path: '/admin/products', exact: true, component: Products },
  { path: '/admin/products/:slug', exact: true, component: Product },
  { path: '*', component: Error }
];
