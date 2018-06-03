import expect from 'expect';
import createProduct from '@factories/product';

describe('Variant', function() {
  let product;

  beforeAll(async function() {
    product = await createProduct({
      name: 'Oath Breaker'
    });
  });

  describe('with monetized columns', function() {
    describe('with cents column set explicitly', function() {
      test('uses the explicitly set value', async function() {
        const variant = await product
          .$relatedQuery('variants')
          .insert({ price: 10, priceInCents: 20000 });

        expect(variant).toEqual(
          expect.objectContaining({
            productId: product.id,
            priceInCents: 20000
          })
        );

      });
    });

    describe('with aliased column', function() {
      test('converts to cents', async function() {
        const variant = await product
          .$relatedQuery('variants')
          .insert({ price: 10 });

        expect(variant).toEqual(
          expect.objectContaining({
            productId: product.id,
            priceInCents: 1000
          })
        );
      });
    });
  });

  describe('.toJSON()', function() {
    let variant;

    beforeAll(async function() {
      variant = await product.$relatedQuery('variants').insert({ price: 1000 });
    });

    test('converts pricing from cents to a string', function() {
      expect(variant.toJSON()).toEqual(
        expect.objectContaining({
          formattedPrice: '$1,000.00'
        })
      );
    });
  });
});
