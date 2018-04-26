import request from 'supertest';
import express from 'express';
import { createProduct } from '@factories';
import { db } from '@support/db';

let server, agent;

beforeAll(async () => {
  await db.truncateDb();

  const app = express();

  app.use('/api/products', require('./index').default);

  server = app.listen();
  agent = request.agent(server);
});

afterAll(async function() {
  server.close();
});

describe('GET /api/products', function() {
  let p1;

  beforeAll(async () => {
    p1 = await createProduct();
    await p1.$query().patch({});
  });

  test('retrieves a list of products', function() {
    return agent
      .get('/api/products')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            meta: expect.objectContaining({
              total: 1
            }),
            products: [p1.toJSON()]
          })
        );
      });
  });
});

describe('GET /api/products/:slug', function() {
  let p;

  beforeAll(async () => {
    p = await createProduct();
    await p.$query().patch({});
  });

  test('retrieves the specific product', function() {
    return agent
      .get(`/api/products/${p.slug}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(p.toJSON());
      });
  });
});
