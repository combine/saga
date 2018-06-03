import findUser from '$graphql/resolvers/users/findUser';
import { createUser } from '@factories';
import db from '@support/db';

beforeAll(async () => {
  await db.truncateDb();
});

describe('Resolver: findUser', function() {
  let user;

  beforeAll(async () => {
    user = await createUser({ username: 'foobar' });
  });

  describe('with a valid product id', function() {
    test('adds product to context', function() {
      return expect(findUser({}, { id: user.id }, {})).resolves.not.toThrow();
    });
  });

  describe('with a non existing user', function() {
    test('throws an error', function() {
      return expect(findUser({}, { id: 9999 }, {})).rejects.toEqual(
        expect.objectContaining({
          name: 'NotFoundError'
        })
      );
    });
  });
});
