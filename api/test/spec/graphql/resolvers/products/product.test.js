import product from '@graphql/resolvers/products/product';
import { createProduct, createVariant } from '@factories';
import faker from 'faker';

describe('Resolver: product', function() {
  let p, variant;

  beforeAll(async () => {
    p = await createProduct({ name: faker.commerce.productName() });
    variant = await createVariant(p, {
      sku: 'sku-1',
      barcode: 'barcode-1'
    });
  });

  describe('with a valid product id', function() {
    test('responds with product data', function() {
      return expect(product({}, { id: p.id })).resolves.toEqual(
        expect.objectContaining({
          id: p.id,
          variants: expect.arrayContaining([
            expect.objectContaining({
              id: variant.id,
              sku: variant.sku
            })
          ])
        })
      );
    });
  });

  describe('with a valid product slug', function() {
    test('responds with product data', function() {
      return expect(product({}, { slug: p.slug }, {})).resolves.toEqual(
        expect.objectContaining({
          slug: p.slug,
          variants: expect.arrayContaining([
            expect.objectContaining({
              id: variant.id,
              sku: variant.sku
            })
          ])
        })
      );
    });
  });

  describe('with an invalid product id', function() {
    test('throws an error', function() {
      return expect(product({}, { id: 9999 }, {})).rejects.toEqual(
        expect.objectContaining({
          name: 'NotFoundError'
        })
      );
    });
  });
});
