import user from '@graphql/resolvers/users/user';
import { createUser } from '@factories';

describe('Resolver: user', function() {
  let u;

  beforeAll(async () => {
    u = await createUser();
  });

  describe('with a valid user id', function() {
    test('responds with user data', function() {
      return expect(user({}, { id: u.id })).resolves.toEqual(
        expect.objectContaining({
          id: u.id
        })
      );
    });
  });

  describe('with a valid username', function() {
    test('responds with user data', function() {
      return expect(user({}, { username: u.username }, {})).resolves.toEqual(
        expect.objectContaining({
          id: u.id,
          username: u.username
        })
      );
    });
  });

  describe('with a valid email', function() {
    test('responds with user data', function() {
      return expect(user({}, { email: u.email }, {})).resolves.toEqual(
        expect.objectContaining({
          id: u.id,
          email: u.email
        })
      );
    });
  });

  describe('with an invalid user id', function() {
    test('throws an error', function() {
      return expect(user({}, { id: 9999 }, {})).rejects.toEqual(
        expect.objectContaining({
          name: 'NotFoundError'
        })
      );
    });
  });
});
