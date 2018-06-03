import currentUser from '$graphql/resolvers/auth/currentUser';
import { createUser } from '@factories';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: currentUser', function() {
  let user;

  beforeAll(async function() {
    user = await createUser({
      username: 'foo',
      password: 'Password1'
    });
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
