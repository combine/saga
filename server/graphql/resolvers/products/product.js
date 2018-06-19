import findProduct from './findProduct';

export default findProduct.createResolver(
  async (_, args, { product }) => {

    await product.$loadRelated('variants');

    return product;
  }
);
