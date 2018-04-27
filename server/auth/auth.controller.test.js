import request from 'supertest';
import express from 'express';
import { createUser } from '@factories';
import { User } from '$models';
import { db } from '@support/db';

let server, agent;

beforeAll(async () => {
  await db.truncateDb();
  const app = express();

  app.use('/auth', require('./index').default);

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
                password: expect.arrayContaining([
                  { message: expect.stringMatching(/Invalid password/) }
                ])
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

  describe('when username is already taken', function() {
    test('returns a validation error', function() {
      const data = {
        username: 'foobar',
        email: 'foo@bar.com',
        password: 'FoobarOne1'
      };

      return agent
        .post('/auth/signup')
        .send(data)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual(
            expect.objectContaining({
              errors: {
                email: expect.arrayContaining([
                  expect.objectContaining({
                    message: expect.stringMatching(/email already in use/)
                  })
                ]),
                username: expect.arrayContaining([
                  expect.objectContaining({
                    message: expect.stringMatching(/username already in use/)
                  })
                ])
              }
            })
          );
        });
    });

  });

  describe('with invalid signup data', function() {
    test('returns an error', function() {
      const data = {
        username: '!a',
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
              username: expect.arrayContaining([
                { message: expect.stringMatching(/can only contain letters/) },
                { message: expect.stringMatching(/must be at least/)}
              ]),
              email: expect.arrayContaining([{
                message: expect.stringMatching(/Invalid email/)
              }]),
              password: expect.arrayContaining([{
                message: expect.stringMatching(/must be at least/)
              }])
            })
          );
        });
    });
  });
});