const assert = require('node:assert/strict');
const test = require('node:test');
const JWT = require('jsonwebtoken');

process.env.JWT_SECRET ||= 'test-secret-key-that-is-long-enough';

const { createTokenForUser, validateToken } = require('../services/authentication');

const user = {
  _id: 'test-user-id',
  username: 'Test User',
  email: 'test@example.com',
  role: 'user',
  profileImage: '/images/default.png',
};

test('created authentication tokens expire after 24 hours', () => {
  const token = createTokenForUser(user);
  const claims = JWT.decode(token);

  assert.equal(claims.exp - claims.iat, 24 * 60 * 60);
  assert.equal(validateToken(token).id, user._id);
  assert.throws(
    () => JWT.verify(token, process.env.JWT_SECRET, { clockTimestamp: claims.exp }),
    { name: 'TokenExpiredError' },
  );
});

test('invalid authentication tokens are rejected', () => {
  assert.throws(() => validateToken('not-a-valid-token'));
});