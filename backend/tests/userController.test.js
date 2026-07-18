const test = require('node:test');
const assert = require('assert');
const { registerUser } = require('../src/controllers/userController');

const createRes = () => ({
  statusCode: 200,
  body: null,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(payload) {
    this.body = payload;
    return this;
  }
});

test('registerUser normalizes email addresses before creating or checking users', async () => {
  const req = {
    body: {
      name: 'Test User',
      email: '  Test@Example.com  ',
      password: 'password123'
    }
  };

  const res = createRes();
  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  await registerUser(req, res, next);

  assert.strictEqual(nextCalled, false);
  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.success, true);
  assert.strictEqual(res.body.data.email, 'test@example.com');
});
