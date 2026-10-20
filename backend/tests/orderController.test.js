const test = require('node:test');
const assert = require('assert');
const Order = require('../src/models/Order');
const { createOrder } = require('../src/controllers/orderController');

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

test('createOrder saves a normalized order request with a server-calculated total', async () => {
  const originalCreate = Order.create;
  let savedOrder;
  Order.create = async (order) => {
    savedOrder = order;
    return { id: 'order-123', total: order.total, status: 'pending' };
  };

  try {
    const req = {
      body: {
        name: '  Alex Buyer ',
        email: ' Alex@Example.com ',
        phone: '555-0100',
        address: '123 Craft Street',
        items: [
          { productId: 1, name: 'Ceramic Bowl', artisan: 'Sarah Chen', price: 85, quantity: 2 }
        ]
      }
    };
    const res = createRes();
    let nextCalled = false;

    await createOrder(req, res, () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, false);
    assert.strictEqual(res.statusCode, 201);
    assert.strictEqual(res.body.success, true);
    assert.strictEqual(savedOrder.customer.name, 'Alex Buyer');
    assert.strictEqual(savedOrder.customer.email, 'alex@example.com');
    assert.strictEqual(savedOrder.total, 170);
    assert.strictEqual(res.body.data.id, 'order-123');
  } finally {
    Order.create = originalCreate;
  }
});

test('createOrder rejects invalid items without saving', async () => {
  const originalCreate = Order.create;
  let saveCalled = false;
  Order.create = async () => {
    saveCalled = true;
  };

  try {
    const req = {
      body: {
        name: 'Alex Buyer',
        email: 'alex@example.com',
        phone: '555-0100',
        address: '123 Craft Street',
        items: [{ productId: 1, name: 'Ceramic Bowl', artisan: 'Sarah Chen', price: -5, quantity: 1 }]
      }
    };
    const res = createRes();

    await createOrder(req, res, assert.fail);

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.strictEqual(saveCalled, false);
  } finally {
    Order.create = originalCreate;
  }
});
