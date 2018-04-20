import request from 'supertest';
import express from 'express';
import { createProduct } from '@factories';
import { db } from '@support/db';

let server, agent;

beforeAll(async () => {
  await db.truncateDb();

  const app = express();

  app.use('/api/products', require('../index').default);

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
        expect(body).toEqual([p1.toJSON()]);
      });
  });
});

describe('GET /api/products/:slug', function() {
  let p;

  beforeAll(async () => {
    p = await createProduct();
  });

  test('retrieves a list of products', function() {
    return agent
      .get(`/api/product/${p.slug}`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(p.toJSON());
      });
  });
});
