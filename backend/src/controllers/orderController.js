const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
  try {
    const { name, email, phone, address, notes, items } = req.body || {};
    const customerName = typeof name === 'string' ? name.trim() : '';
    const customerEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const customerPhone = typeof phone === 'string' ? phone.trim() : '';
    const customerAddress = typeof address === 'string' ? address.trim() : '';

    if (!customerName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) ||
        !customerPhone || !customerAddress) {
      res.status(400).json({
        success: false,
        message: 'Name, a valid email, phone, and delivery address are required'
      });
      return;
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      res.status(400).json({
        success: false,
        message: 'An order must contain between 1 and 50 items'
      });
      return;
    }

    const orderItems = [];
    for (const item of items) {
      if (
        !item ||
        item.productId === undefined ||
        typeof item.name !== 'string' ||
        !item.name.trim() ||
        typeof item.artisan !== 'string' ||
        !item.artisan.trim() ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        res.status(400).json({
          success: false,
          message: 'Each item must have a product, valid price, and positive whole-number quantity'
        });
        return;
      }

      orderItems.push({
        productId: String(item.productId),
        name: item.name.trim(),
        artisan: item.artisan.trim(),
        price: item.price,
        quantity: item.quantity
      });
    }

    const total = Math.round(
      orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100
    ) / 100;

    const order = await Order.create({
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        notes: typeof notes === 'string' ? notes.trim() : ''
      },
      items: orderItems,
      total
    });

    res.status(201).json({
      success: true,
      message: 'Order request received',
      data: { id: order.id, total: order.total, status: order.status }
    });
  } catch (error) {
    next(error);
  }
};
