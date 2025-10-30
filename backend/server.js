require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedProducts = require('./utils/seedProducts');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Seed products from Fake Store API if database is empty
seedProducts().catch(err => {
  console.error('Failed to seed products:', err);
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));

// Health check
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Shopping Cart API is running',
    version: '1.0.0'
  });
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Centralized error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
