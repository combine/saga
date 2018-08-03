import login from '@graphql/resolvers/auth/login';
import { createUser } from '@factories';
import faker from 'faker';

describe('Resolver: Login', function() {
  // mock response object
  let res = { cookie: () => true };
  let user;
  let credentials = {
    username: faker.internet.userName(),
    password: faker.internet.password()
  };

  beforeAll(async function() {
    user = await createUser(credentials);
  });

  describe('with valid credentials', function() {
    test('it logs the user in', async function() {
      const { token, currentUser } = await login(
        {},
        {
          usernameOrEmail: credentials.username,
          password: credentials.password
        },
        { res }
      );

      expect(token).not.toEqual(null);
      expect(currentUser).toEqual(
        expect.objectContaining({
          id: user.id,
          email: user.email
        })
      );
    });
  });

  describe('with invalid password', function() {
    test('responds with ValidationError', function() {
      return expect(
        login(
          {},
          { usernameOrEmail: credentials.username, password: 'badpassword' },
          { res }
        )
      ).rejects.toThrow(
        expect.objectContaining({
          name: 'ValidationError',
          data: {
            password: expect.arrayContaining([
              { message: expect.stringContaining('Invalid password') }
            ])
          }
        })
      );
    });
  });
});
