const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

const MOCK_USER_ID = 'mockUser123';

// @desc    Get cart items
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find({ userId: MOCK_USER_ID });
    
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    
    res.status(200).json({
      success: true,
      cartItems,
      total: total.toFixed(2)
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve cart',
      error: error.message 
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    
    if (!productId || !qty) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID and quantity are required' 
      });
    }
    
    if (qty < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be at least 1' 
      });
    }
    
    if (!productId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid product ID format' 
      });
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    // Check if item already in cart
    const existingCartItem = await CartItem.findOne({ 
      productId, 
      userId: MOCK_USER_ID
    });
    
    if (existingCartItem) {
      existingCartItem.qty += qty;
      await existingCartItem.save();
      res.status(200).json({
        success: true,
        message: 'Cart item quantity updated',
        data: existingCartItem
      });
    } else {
      const cartItem = await CartItem.create({
        productId,
        name: product.title,
        price: product.price,
        image: product.image,
        qty,
        userId: MOCK_USER_ID
      });
      res.status(201).json({
        success: true,
        message: 'Item added to cart',
        data: cartItem
      });
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add item to cart',
      error: error.message 
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = async (req, res, next) => {
  try {
    const { qty } = req.body;
    
    if (!qty || qty < 1) {
      return res.status(400).json({ 
        success: false, 
        message: 'Quantity must be at least 1' 
      });
    }
    
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid cart item ID format' 
      });
    }
    
    const cartItem = await CartItem.findById(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }
    
    cartItem.qty = qty;
    await cartItem.save();
    
    res.status(200).json({
      success: true,
      message: 'Cart item updated',
      data: cartItem
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update cart item',
      error: error.message 
    });
  }
};

// @desc    Delete cart item
// @route   DELETE /api/cart/:id
// @access  Public
const deleteCartItem = async (req, res, next) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid cart item ID format' 
      });
    }
    
    const cartItem = await CartItem.findById(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Cart item not found' 
      });
    }
    
    await CartItem.deleteOne({ _id: req.params.id });
    res.status(200).json({ 
      success: true, 
      message: 'Cart item removed' 
    });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove cart item',
      error: error.message 
    });
  }
};

// @desc    Checkout
// @route   POST /api/checkout
// @access  Public
const checkout = async (req, res, next) => {
  try {
    const { cartItems, name, email } = req.body;
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }
    
    if (!name || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and email are required' 
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }
    
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    
    const receipt = {
      name,
      email,
      total: total.toFixed(2),
      timestamp: new Date().toISOString(),
      items: cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      }))
    };
    
    // Clear cart after successful checkout
    await CartItem.deleteMany({ userId: MOCK_USER_ID });
    
    res.status(200).json({
      success: true,
      message: 'Checkout completed successfully',
      data: receipt
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Checkout failed',
      error: error.message 
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  checkout
};
