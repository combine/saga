import findProduct from '$graphql/resolvers/products/findProduct';
import { createProduct } from '@factories';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: findProduct', function() {
  let product;

  beforeAll(async () => {
    product = await createProduct({ name: 'Foo' });
  });

  describe('with a valid product id', function() {
    test('adds product to context', function() {
      return expect(
        findProduct({}, { id: product.id }, {})
      ).resolves.not.toThrow();
    });
  });

  describe('with an invalid product id', function() {
    test('throws an error', function() {
      return expect(findProduct({}, { id: 9999 }, {})).rejects.toEqual(
        expect.objectContaining({
          name: 'NotFoundError'
        })
      );
    });
  });
});
