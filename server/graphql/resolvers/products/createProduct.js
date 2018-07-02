import { isAdminResolver } from '../acl';
import { Product } from '$models';

export default isAdminResolver.createResolver(
  async (_, args) => {
    let product = await Product.query().insertWithRelated({
      name: args.name,
      description: args.description,
      optionTypes: args.optionTypes.map(ot => ({
        name: ot.name,
        values: JSON.stringify(ot.values)
      })),
      variants: args.variants.map(variant => ({
        ...variant,
        options: JSON.stringify(variant.options)
      }))
    }).debug();

    return product.toJSON();
  }
);
