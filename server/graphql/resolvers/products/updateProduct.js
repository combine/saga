import { isAdminResolver } from '../acl';
import findProduct from './findProduct';

export default isAdminResolver.createResolver(
  findProduct.createResolver(
    async (_, args, context) => {
      let { product } = context;

      product = await product.$query().patchAndFetch({
        name: args.name,
        description: args.description
      });

      return product.toJSON();
    }
  )
);
