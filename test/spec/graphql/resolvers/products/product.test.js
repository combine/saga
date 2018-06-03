import product from '$graphql/resolvers/products/product';
import { createProduct } from '@factories';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: product', function() {
  let p;

  beforeAll(async () => {
    p = await createProduct({ name: 'Foo' });
  });

  describe('with a valid product id', function() {
    test('responds with product data', function() {
      return expect(product({}, { id: p.id })).resolves.toEqual(
        expect.objectContaining({
          id: p.id
        })
      );
    });
  });

  describe('with a valid product slug', function() {
    test('responds with product data', function() {
      return expect(product({}, { slug: p.slug }, {})).resolves.toEqual(
        expect.objectContaining({
          slug: p.slug
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
