import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, deleteCartItem } from '../api';
import CartItem from '../components/CartItem';

const Cart = ({ onCartUpdate, cartCount }) => {
  const [cartData, setCartData] = useState({ cartItems: [], total: '0.00' });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, [cartCount]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCartData(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, qty) => {
    try {
      await updateCartItem(id, qty);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      console.error('Error updating item:', err);
      alert('Failed to update item');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await deleteCartItem(id);
      await fetchCart();
      onCartUpdate();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (cartData.cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some products to get started</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartData.cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdate={handleUpdateItem}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({cartData.cartItems.length})</span>
                <span>${cartData.total}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-primary">${cartData.total}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary w-full text-lg"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/')}
              className="btn-secondary w-full text-lg mt-3"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
