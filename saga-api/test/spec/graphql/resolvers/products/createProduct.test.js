import createProduct from '@graphql/resolvers/products/createProduct';
import { createUser } from '@factories';

describe('Resolver: createProduct', function() {
  let user, admin;

  beforeAll(async () => {
    user = await createUser();
    admin = await createUser({ role: 'admin' });
  });

  describe('when not logged in', function() {
    test('is not allowed to create a product', function() {
      return expect(
        createProduct({}, { name: 'Bar' }, { user: null })
      ).rejects.toEqual(expect.objectContaining({ name: 'UnauthorizedError' }));
    });
  });

  describe('as a logged in user', function() {
    test('is not allowed to create a product', function() {
      return expect(
        createProduct({}, { name: 'Bar' }, { user })
      ).rejects.toEqual(expect.objectContaining({ name: 'ForbiddenError' }));
    });
  });

  describe('as an admin', function() {
    describe('with valid product values', function() {
      test('creates the product', function() {
        const variants = [
          { priceInCents: 100, options: { Size: 'S', Color: 'Blue' } },
          { priceInCents: 100, options: { Size: 'S', Color: 'Green' } },
          { priceInCents: 100, options: { Size: 'M', Color: 'Blue' } },
          { priceInCents: 100, options: { Size: 'M', Color: 'Green' } },
          { priceInCents: 100, options: { Size: 'L', Color: 'Blue' } },
          { priceInCents: 100, options: { Size: 'L', Color: 'Green' } }
        ];

        return expect(
          createProduct(
            {},
            {
              name: 'Bar Baz',
              description: 'A test product',
              variants
            },
            { user: admin }
          )
        ).resolves.toEqual(
          expect.objectContaining({
            name: 'Bar Baz',
            variants: expect.arrayContaining(
              variants.map(v =>
                expect.objectContaining({
                  options: v.options
                })
              )
            )
          })
        );
      });
    });
  });
});
