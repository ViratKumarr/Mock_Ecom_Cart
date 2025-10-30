require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const clearProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const result = await Product.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} products`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

clearProducts();
