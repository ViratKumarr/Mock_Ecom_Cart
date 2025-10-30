const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  deleteCartItem, 
  checkout 
} = require('../controllers/cartController');

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);
router.post('/checkout', checkout);

module.exports = router;
