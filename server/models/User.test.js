import expect from 'expect';
import User from './User';

describe('User', function() {
  describe('creation', function() {
    let user;

    before(async function() {
      user = await User.query().insert({
        firstName: 'Foo',
        lastName: 'Bar',
        password: 'foobar'
      });
    });

    it('creates the user', function() {
      expect(user.firstName).toEqual('Foo');
    });

    it('hashes the password', function() {
      expect(user.password).not.toEqual('foobar');
      expect(User.isBcryptHash(user.password)).toBe(true);
    });

    it('verifies password correctly', async function() {
      const verified = await user.verifyPassword('foobar');
      expect(verified).toBe(true);
    });
  });
});
