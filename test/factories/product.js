import Product from '$models/Product';
import faker from 'faker';

export const productParams = (params = {}) => ({
  name: faker.commerce.productName(),
  description: [
    faker.commerce.productAdjective(),
    faker.commerce.productMaterial()
  ].join(' '),
  ...params
});

export default async (params = {}) => {
  return await Product.query().insert(productParams(params));
};
