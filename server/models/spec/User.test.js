import expect from 'expect';
import sinon from 'sinon';
import createUser from '@factories/user';
import { User } from '$models';
import { db } from '@support/db';

beforeAll(async function() {
  await db.truncateDb();
});

describe('User', function() {
  let user;

  beforeAll(async function() {
    user = await createUser({
      firstName: 'Foo',
      lastName: 'Bar',
      username: 'foobar12',
      password: 'Foobar12',
      email: 'foo1@bar.com'
    });
  });

  describe('creation', function() {
    test('creates the user', function() {
      expect(user.username).toEqual('foobar12');
    });

    describe('with a username that is in use', function() {
      test('throws a validation error', function() {
        expect(createUser({
          username: 'foobar12',
          password: 'Foobar12'
        })).rejects.toThrow('username already in use.');
      });
    });

    describe('with an email that is in use', function() {
      test('throws a validation error', function() {
        expect(createUser({
          username: 'bazbar',
          email: 'foo1@bar.com',
          password: 'Foobar12'
        })).rejects.toThrow('email already in use.');
      });
    });
  });

  describe('roles', function() {
    test('has a default role of user', function() {
      expect(user.role).toEqual('user');
    });

    test('.hasRole works propertly', function() {
      expect(user.hasRole('user')).toEqual(true);
    });

    describe('when role is changed', function() {
      beforeAll(async function() {
        await user.$query().patch({ role: 'admin' });
      });

      test('correctly changes the role', function() {
        expect(user.role).toEqual('admin');
        expect(user.hasRole('admin')).toBe(true);
      });
    });
  });

  describe('Authenticatable', function() {
    test('hashes the password', function() {
      expect(user.password).not.toEqual('Foobar12');
      expect(User.isBcryptHash(user.password)).toBe(true);
    });

    test('verifies password correctly', async function() {
      const verified = await user.verifyPassword('Foobar12');
      expect(verified).toBe(true);
    });

    describe('when updating', function() {
      let originalHash;

      beforeAll(function() {
        originalHash = user.password;
      });

      describe('and password has not changed', function() {
        beforeAll(async function() {
          await user.$query().patch({ firstName: 'Baz' });
        });

        it('does not update the password hash', async function() {
          const verified = await user.verifyPassword('Foobar12');
          expect(verified).toBe(true);
          expect(user.password).toEqual(originalHash);
        });
      });

      describe('and password has changed', function() {
        beforeAll(async function() {
          await user.$query().patch({ password: 'Newpass12' });
        });

        it('updates the password hash', async function() {
          const verified = await user.verifyPassword('Newpass12');
          expect(user.password).not.toEqual('Newpass12');
          expect(user.password).not.toEqual(originalHash);
          expect(verified).toBe(true);
        });
      });
    });
  });

  describe('Recoverable', function() {
    describe('.generateResetToken', function() {
      let currTime;

      beforeAll(async function() {
        currTime = new Date();
        sinon.useFakeTimers(currTime);
      });

      it('exists as a function', function() {
        expect(user.generateResetToken).toBeDefined();
        expect(user.generateResetToken).toBeInstanceOf(Function);
      });

      it('saves a reset token on the user', async function() {
        await user.generateResetToken();
        expect(user.resetPasswordToken).toBeDefined();
        expect(user.resetPasswordToken).not.toEqual(null);
      });

      it('sets the expiration date to the specified time', async function() {
        await user.generateResetToken(7200);
        const exp = new Date(currTime.getTime() + (7200 * 1000));

        expect(user.resetPasswordExp).toEqual(exp);
      });
    });
  });

  describe('Tokenable', function() {
    let token;

    beforeAll(async function() {
      token = await user.generateJWT();
    });

    describe('.generateJWT', function() {
      it('generates a token with expiration', async function() {
        expect(token).toBeDefined();
        expect(token).not.toBe(null);
      });
    });

    describe('.decodeJWT', function() {
      it('verifies the given token against the user', async function() {
        const decoded = await user.decodeJWT(token);
        expect(decoded.id).toEqual(user.id);
        expect(decoded.email).toEqual(user.email);
      });
    });
  });
});
