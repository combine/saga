import updateProduct from '@graphql/resolvers/products/updateProduct';
import { createUser, createProduct } from '@factories';

describe('Resolver: updateProduct', function() {
  let p, user, admin;

  beforeAll(async () => {
    p = await createProduct();
    user = await createUser();
    admin = await createUser({ role: 'admin' });
  });

  describe('when not logged in', function() {
    test('is not allowed to update', function() {
      return expect(
        updateProduct({}, { id: p.id, name: 'Bar' }, { user: null })
      ).rejects.toEqual(expect.objectContaining({ name: 'UnauthorizedError' }));
    });
  });

  describe('as a logged in user', function() {
    test('is not allowed to update', function() {
      return expect(
        updateProduct({}, { id: p.id, name: 'Bar' }, { user })
      ).rejects.toEqual(expect.objectContaining({ name: 'ForbiddenError' }));
    });
  });

  describe('as an admin', function() {
    describe('with valid update values', function() {
      test('updates the product', function() {
        return expect(
          updateProduct({}, { id: p.id, name: 'Bar' }, { user: admin })
        ).resolves.toEqual(
          expect.objectContaining({
            id: p.id,
            name: 'Bar'
          })
        );
      });
    });

    describe('with slug as the identifier', function() {
      test('updates the product', function() {
        return expect(
          updateProduct({}, { slug: p.slug, name: 'Baz' }, { user: admin })
        ).resolves.toEqual(
          expect.objectContaining({
            id: p.id,
            name: 'Baz'
          })
        );
      });
    });

    describe('with an invalid product id', function() {
      test('throws an error', function() {
        return expect(
          updateProduct({}, { name: 'Bar' }, { user: admin })
        ).rejects.toEqual(
          expect.objectContaining({
            name: 'NotFoundError'
          })
        );
      });
    });
  });
});
