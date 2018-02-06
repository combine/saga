import request from 'supertest';
import express from 'express';
import expect from 'expect';

describe('/api/products', function() {
  let server, agent;

  before(async function() {
    const app = express();
    const router = require('./index').default;

    app.use('/api/products', router);

    server = app.listen();
    agent = request.agent(server);
  });

  after(async function() {
    server.close();
  });

  describe('GET /api/products', function() {
    it('retrieves a list of products', function() {
      return agent
        .get('/api/products')
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual([]);
        });
    });
  });
});
