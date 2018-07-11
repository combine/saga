import { isAdminResolver } from '../acl';
import findProduct from './findProduct';

export default isAdminResolver.createResolver(
  findProduct.createResolver(
    async (_, args, context) => {
      let { product } = context;

      let updatedProduct = await product.$query().upsertGraphAndFetch(args);

      return updatedProduct.toJSON();
    }
  )
);
