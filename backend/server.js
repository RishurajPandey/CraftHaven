require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const seedRoutes = require('./src/routes/seedRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://craft-haven-phi.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('CraftHaven backend is running. Use /api/health for health checks.');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CraftHaven backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api', seedRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
