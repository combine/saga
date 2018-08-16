import faker from 'faker';

export const variantParams = (params = {}) => ({
  sku: `sku-${faker.random.number()}`,
  barcode: `barcode-${faker.random.number()}`,
  price: faker.commerce.price(),
  ...params
});

export default (product, params = {}) => {
  return product.$relatedQuery('variants').insert(variantParams(params));
};
