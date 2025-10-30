const Product = require('../models/Product');

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    
    if (count === 0) {
      console.log('📦 Fetching products from Fake Store API...');
      
      const response = await fetch('https://fakestoreapi.com/products?limit=10');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      await Product.insertMany(data);
      console.log('✅ Products seeded successfully from Fake Store API');
    } else {
      console.log(`✅ Database already contains ${count} products`);
    }
  } catch (error) {
    console.error('❌ Error seeding products:', error.message);
    throw error;
  }
};

module.exports = seedProducts;
