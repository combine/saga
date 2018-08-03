import signup from '@graphql/resolvers/auth/signup';
import faker from 'faker';

describe('Resolver: Signup', function() {
  // mock response object
  const mockRes = { cookie: () => true };
  const validData = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  describe('with valid signup data', function() {
    test('signs up the user', function() {
      const data = validData;
      return expect(signup({}, data, { res: mockRes })).resolves.toEqual({
        currentUser: expect.objectContaining({
          username: data.username,
          email: data.email
        }),
        token: expect.any(String)
      });
    });
  });

  describe('when username is already taken', function() {
    test('returns a validation error', function() {
      const data = {
        username: validData.username,
        email: validData.email,
        password: faker.internet.password()
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
