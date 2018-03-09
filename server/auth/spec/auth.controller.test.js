import request from 'supertest';
import express from 'express';
import { createUser } from '@factories';
import { User } from '$models';
import { db } from '@support/db';

let server, agent;

beforeAll(async () => {
  await db.truncateDb();
  const app = express();

  app.use('/auth', require('../index').default);

  server = app.listen();
  agent = request.agent(server);
});

afterAll(async function() {
  server.close();
});

describe('POST /api/login', function() {
  const testLogin = (credentials) => {
    return agent.post('/auth/login').send(credentials);
  };

  let user, validCredentials = { username: 'user', password: 'SecurePass1' };

  beforeAll(async function() {
    user = await createUser(validCredentials);
  });

  describe('with valid credentials', function() {
    test('it logs the user in', function() {
      return testLogin(validCredentials)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(expect.objectContaining(user.toJSON()));
        });
    });
  });

  describe('with invalid credentials', function() {
    test('responds with an error', function() {
      return testLogin({ username: 'user', password: 'badpassword' })
        .expect(401)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              errors: {
                password: expect.stringMatching(/Invalid password/)
              }
            })
          );
        });
    });
  });
});

describe('POST /api/signup', function() {
  describe('with valid signup data', function() {
    test('signs up the user', function() {
      const data = {
        username: 'foobar',
        email: 'foo@bar.com',
        password: 'FoobarOne1'
      };

      return agent
        .post('/auth/signup')
        .send(data)
        .expect(200)
        .then(async ({ body }) => {
          const user = await User.query().where('id', body.id).first();

          expect(body).toEqual(expect.objectContaining({
            id: user.id,
            username: 'foobar',
            email: 'foo@bar.com',
            token: expect.any(String)
          }));

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
