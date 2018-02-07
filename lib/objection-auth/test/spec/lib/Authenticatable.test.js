import expect from 'expect';
import User from '../../support/User';

describe('Authenticatable', function() {
  let user;

  before(async function() {
    user = await User.query().insert({
      name: 'Foo Bar',
      password: 'foobar',
      email: 'foo@bar.com'
    });
  });

  it('hashes the password', function() {
    expect(user.password).not.toEqual('foobar');
    expect(User.isBcryptHash(user.password)).toBe(true);
  });

  it('verifies password correctly', async function() {
    const verified = await user.verifyPassword('foobar');
    expect(verified).toBe(true);
  });

  context('when updating', function() {
    let originalHash;

    before(function() {
      originalHash = user.password;
    });

    context('and password has not changed', function() {
      before(async function() {
        await user.$query().patch({ name: 'Bar Baz' });
      });

      it('does not update the password hash', async function() {
        const verified = await user.verifyPassword('foobar');
        expect(verified).toBe(true);
        expect(user.password).toEqual(originalHash);
      });
    });

    context('and password has changed', function() {
      before(async function() {
        await user.$query().patch({ password: 'newpass' });
      });

      it('updates the password hash', async function() {
        const verified = await user.verifyPassword('newpass');
        expect(user.password).not.toEqual('newpass');
        expect(user.password).not.toEqual(originalHash);
        expect(verified).toBe(true);
      });
    });
  });
});
