import { isAdminResolver } from '../acl';
import { Product } from '@models';

export default isAdminResolver.createResolver(
  async (_, args) => {
    let product = await Product.query().insertGraphAndFetch(args);

    return product.toJSON();
  }
);
