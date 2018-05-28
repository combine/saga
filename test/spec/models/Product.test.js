import expect from 'expect';
import createProduct from '@factories/product';
import createVariant  from '@factories/variant';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Product', function() {
  let product, variant;

  beforeAll(async function() {
    product = await createProduct({
      name: 'Oath Breaker'
    });

    variant = await createVariant(product, {
      sku: 'sku-1',
      barcode: 'barcode-1'
    });
  });

  describe('creation', function() {
    test('creates the product', function() {
      expect(product.name).toEqual('Oath Breaker');
    });

    test('creates a master variant', async function() {
      const master = await product.$relatedQuery('master');

      expect(master).toEqual(
        expect.objectContaining({
          productId: product.id,
          isMaster: true
        })
      );
    });

    describe('with missing required fields', async function() {
      await expect(createProduct({
        name: undefined
      })).rejects.toThrow('A product name is required.');
    });
  });

  describe('Slugify', function() {
    test('slugs the product name', function() {
      expect(product.slug).toEqual('oath-breaker');
    });
  });

  describe('.variants', function() {
    test('returns a list of variants', async function() {
      const variants = await product.$relatedQuery('variants');

      expect(variants).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            productId: product.id,
            sku: variant.sku,
            barcode: variant.barcode,
            isMaster: false
          })
        ])
      );
    });
  });
});
