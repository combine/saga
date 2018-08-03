import findUser from '@graphql/resolvers/users/findUser';
import { createUser } from '@factories';

describe('Resolver: findUser', function() {
  let user;

  beforeAll(async () => {
    user = await createUser();
  });

  describe('with a valid user id', function() {
    test('adds user to context', function() {
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
