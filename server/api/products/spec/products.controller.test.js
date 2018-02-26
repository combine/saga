import request from 'supertest';
import express from 'express';

let server, agent;

beforeAll(async () => {
  const app = express();

  app.use('/api/products', require('../index').default);

  server = app.listen();
  agent = request.agent(server);
});

afterAll(async function() {
  server.close();
});

describe('GET /api/products', function() {
  test('retrieves a list of products', function() {
    return agent
      .get('/api/products')
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });
});
