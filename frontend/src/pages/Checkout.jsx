import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, checkout } from '../api';
import CheckoutModal from '../components/CheckoutModal';

const Checkout = ({ onCartUpdate }) => {
  const [cartData, setCartData] = useState({ cartItems: [], total: '0.00' });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      if (data.cartItems.length === 0) {
        navigate('/cart');
        return;
      }
      setCartData(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (cartItems, name, email) => {
    const receipt = await checkout(cartItems, name, email);
    onCartUpdate();
    return receipt;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        cartItems={cartData.cartItems}
        total={cartData.total}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Checkout;
