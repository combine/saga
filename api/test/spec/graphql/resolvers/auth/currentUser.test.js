import currentUser from '@graphql/resolvers/auth/currentUser';
import { createUser } from '@factories';

describe('Resolver: currentUser', function() {
  let user;

  beforeAll(async function() {
    user = await createUser();
  });

  describe('with user in context', function() {
    test('it returns the current user', async function() {
      return expect(currentUser({}, {}, { user })).toEqual(
        expect.objectContaining({
          id: user.id,
          email: user.email
        })
      );
    });
  });

  describe('without user in context', function() {
    test('it returns null', async function() {
      return expect(currentUser({}, {}, {})).toEqual(null);
    });
  });
});
