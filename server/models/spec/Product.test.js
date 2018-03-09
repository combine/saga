import expect from 'expect';
import createProduct from '@factories/product';
import { db } from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Product', function() {
  let product;

  beforeAll(async function() {
    product = await createProduct({
      name: 'Oath Breaker'
    });
  });

  describe('creation', function() {
    test('creates the product', function() {
      expect(product.name).toEqual('Oath Breaker');
    });
  });

  describe('Slugify', function() {
    test('slugs the product name', function() {
      expect(product.slug).toEqual('oath-breaker');
    });
  });
});
