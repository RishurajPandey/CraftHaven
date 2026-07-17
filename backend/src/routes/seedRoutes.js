const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

router.post('/seed-products', async (req, res, next) => {
  try {
    await Product.deleteMany({});

    const sampleProducts = [
      {
        name: 'Handwoven Ceramic Bowl Set',
        description: 'Beautiful handwoven ceramic bowl set perfect for serving and display',
        price: 85,
        category: 'Ceramics',
        image: 'https://images.pexels.com/photos/6195121/pexels-photo-6195121.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
        artisan: 'Sarah Chen',
        inStock: true,
        featured: true,
        tags: ['handmade', 'eco-friendly', 'dishwasher-safe']
      },
      {
        name: 'Artisan Wooden Cutting Board',
        description: 'Premium cutting board crafted from sustainably sourced hardwood',
        price: 65,
        category: 'Woodwork',
        image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
        artisan: 'Mike Rodriguez',
        inStock: true,
        featured: false,
        tags: ['sustainable', 'food-safe', 'custom-engraving']
      }
    ];

    const createdProducts = await Product.insertMany(sampleProducts);

    res.status(201).json({ success: true, count: createdProducts.length, data: createdProducts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
