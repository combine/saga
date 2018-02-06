import expect from 'expect';
import createUser from 'factories/user';
import User from './User';

describe('User', function() {
  let user;

  before(async function() {
    user = await createUser({
      firstName: 'Foo',
      lastName: 'Bar',
      password: 'foobar'
    });
  });

  describe('creation', function() {
    it('creates the user', function() {
      expect(user.firstName).toEqual('Foo');
    });
  });

  describe('Authenticatable', function() {
    it('hashes the password', function() {
      expect(user.password).not.toEqual('foobar');
      expect(User.isBcryptHash(user.password)).toBe(true);
    });

    it('verifies password correctly', async function() {
      const verified = await user.verifyPassword('foobar');
      expect(verified).toBe(true);
    });

    context('when updating', function() {
      before(async function() {
        await user.$query().patch({ password: 'newpass' });
      });

      it('updates the password hash', async function() {
        const verified = await user.verifyPassword('newpass');
        expect(user.password).not.toEqual('newpass');
        expect(verified).toBe(true);
      });
    });
  });
});
