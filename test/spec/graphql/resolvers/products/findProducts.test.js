import findProducts from '$graphql/resolvers/products/findProducts';
import { createProduct } from '@factories';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: findProducts', function() {
  let p1, p2, p3, p4;

  beforeAll(async () => {
    p1 = await createProduct({ name: 'Foo' });
    p2 = await createProduct({ name: 'Bar' });
    p3 = await createProduct({ name: 'Baz' });
    p4 = await createProduct({ name: 'Ban' });
  });

  describe('without a search query', function() {
    test('retrieves all products', function() {
      return expect(findProducts({}, {}, {})).resolves.toEqual(
        expect.objectContaining({
          meta: expect.objectContaining({
            total: 4,
            query: null
          }),
          products: [
            expect.objectContaining({ id: p1.id }),
            expect.objectContaining({ id: p2.id }),
            expect.objectContaining({ id: p3.id }),
            expect.objectContaining({ id: p4.id })
          ]
        })
      );
    });
  });

  describe('with search query', function() {
    test('retrieves products with the query name', function() {
      return expect(findProducts({}, { query: 'foo' }, {})).resolves.toEqual(
        expect.objectContaining({
          meta: expect.objectContaining({
            total: 1,
            query: 'foo'
          }),
          products: [expect.objectContaining({ name: 'Foo' })]
        })
      );
    });

    describe('and a count parameter', function() {
      test('retrieves a products with the query name', function() {
        return expect(
          findProducts({}, { query: 'ba', count: 2 }, {})
        ).resolves.toEqual(
          expect.objectContaining({
            meta: expect.objectContaining({
              count: 2,
              total: 3,
              query: 'ba'
            }),
            products: [
              expect.objectContaining({ name: 'Bar' }),
              expect.objectContaining({ name: 'Baz' })
            ]
          })
        );
      });
    });
  });
});
