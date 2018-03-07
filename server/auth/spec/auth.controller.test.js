import request from 'supertest';
import express from 'express';
import clean from '@support/clean';
import { User } from '$models';

let server, agent;

beforeAll(async () => {
  await clean();

  const app = express();

  app.use('/auth', require('../index').default);

  server = app.listen();
  agent = request.agent(server);
});

afterAll(async function() {
  server.close();
});

describe('POST /api/signup', function() {
  describe('with valid signup data', function() {
    test('signs up the user', function() {
      const data = {
        username: 'foobar',
        password: 'FoobarOne1',
        email: 'foo@bar.com'
      };

      return agent
        .post('/auth/signup')
        .send(data)
        .expect(200)
        .then(async ({ body }) => {
          const user = await User.query().where('id', body.id);

          expect(body).toEqual(expect.objectContaining(user[0].toJSON()));
          expect(body.token).not.toEqual(null);
        });
    });
  });

  describe('with invalid signup data', function() {
    test('returns an error', function() {
      const data = {
        username: 'inval!d_username',
        password: 'invalid',
        email: 'notavalidemail'
      };

      return agent
        .post('/auth/signup')
        .send(data)
        .expect(400)
        .then(async ({ body }) => {
          expect(body.errors).toEqual(
            expect.objectContaining({
              username: {
                message: expect.stringMatching(/can only contain/)
              },
              email: {
                message: expect.stringMatching(/valid email/)
              },
              password: {
                message: expect.stringMatching(/must contain at least/)
              }
            })
          );
        });
    });
  });
});
