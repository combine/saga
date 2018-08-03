import findProduct from './findProduct';
import findProducts from './findProducts';
import product from './product';
import createProduct from './createProduct';
import updateProduct from './updateProduct';

export const queries = {
  findProduct,
  findProducts,
  product
};

export const mutations = {
  createProduct,
  updateProduct
};
