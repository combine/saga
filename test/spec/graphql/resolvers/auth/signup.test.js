import signup from '$graphql/resolvers/auth/signup';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: Signup', function() {
  // mock response object
  let mockRes = { cookie: () => true };

  describe('with valid signup data', function() {
    test('signs up the user', function() {
      const data = {
        username: 'foobar',
        email: 'foo@bar.com',
        password: 'FoobarOne1'
      };

      return expect(signup({}, data, { res: mockRes })).resolves.toEqual({
        currentUser: expect.objectContaining({
          username: 'foobar',
          email: 'foo@bar.com'
        }),
        token: expect.any(String)
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

      return expect(signup({}, data, { res: mockRes })).rejects.toEqual(
        expect.objectContaining({
          name: 'ValidationError',
          data: {
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

  describe('with invalid signup data', function() {
    test('returns an error', function() {
      const data = {
        username: '!a',
        password: 'invalid',
        email: 'notavalidemail'
      };

      return expect(signup({}, data, { res: mockRes })).rejects.toEqual(
        expect.objectContaining({
          name: 'ValidationError',
          data: {
            username: expect.arrayContaining([
              { message: expect.stringMatching(/can only contain letters/) },
              { message: expect.stringMatching(/must be at least/) }
            ]),
            email: expect.arrayContaining([
              {
                message: expect.stringMatching(/Invalid email/)
              }
            ]),
            password: expect.arrayContaining([
              {
                message: expect.stringMatching(/must be at least/)
              }
            ])
          }
        })
      );
    });
  });
});
