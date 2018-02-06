import expect from 'expect';
import User from './User';

describe('User', function() {
  describe('.create', function() {
    let user;

    before(async function() {
      user = await User.query().insert({
        firstName: 'Foo',
        lastName: 'Bar',
        password: 'foobar'
      });
    });

    it('creates the user', async function() {
      expect(user.firstName).toEqual('Foo');
    });

    it('hashes the password', async function() {
      expect(user.password).not.toEqual('foobar');
    });
  });
});
