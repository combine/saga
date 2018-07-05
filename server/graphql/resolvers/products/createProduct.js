import { isAdminResolver } from '../acl';
import { Product } from '$models';

export default isAdminResolver.createResolver(
  async (_, args) => {
    const { variants, ...rest } = args;

    let product = await Product.query().insertWithRelated({
      ...rest,
      variants: variants.map(({ options, ...rest }) => ({
        ...rest,
        options: JSON.stringify(options)
      }))
    });

    return product.toJSON();
  }
);
