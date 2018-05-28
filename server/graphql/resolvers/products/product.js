import findProduct from './findProduct';

export default findProduct.createResolver(
  async (_, args, { product }) => {
    return product.toJSON();
  }
);
