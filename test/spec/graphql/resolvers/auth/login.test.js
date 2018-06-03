import login from '$graphql/resolvers/auth/login';
import { createUser } from '@factories';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: Login', function() {
  // mock response object
  let mockRes = { cookie: () => true };
  let user,
    credentials = { usernameOrEmail: 'foobar', password: 'SecurePass1' };

  beforeAll(async function() {
    user = await createUser({
      username: credentials.usernameOrEmail,
      password: credentials.password
    });
  });

  describe('with valid credentials', function() {
    test('it logs the user in', async function() {
      const { token, currentUser } = await login({}, credentials, {
        res: mockRes
      });

      expect(token).not.toEqual(null);
      expect(currentUser).toEqual(
        expect.objectContaining({
          id: user.id,
          email: user.email
        })
      );
    });
  });

  describe('with invalid credentials', function() {
    test('responds with ValidationError', function() {
      return expect(
        login(
          {},
          { usernameOrEmail: 'foobar', password: 'badpassword' },
          { res: mockRes }
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
