import { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, cartItems, total, onCheckout }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const receiptData = await onCheckout(cartItems, formData.name, formData.email);
      setReceipt(receiptData);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '' });
    setReceipt(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {!receipt ? (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Items in cart:</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-primary">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Complete Order'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-600">Thank you for your purchase</p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 mb-6 backdrop-blur">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Name:</span>
                  <span className="font-semibold">{receipt.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Email:</span>
                  <span className="font-semibold">{receipt.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Date:</span>
                  <span className="font-semibold">
                    {new Date(receipt.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="border-t border-primary-300 pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-primary-800">
                    <span>Total Paid:</span>
                    <span>${receipt.total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">Order Items:</h3>
              <div className="space-y-1 sm:space-y-2">
                {receipt.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-700">{item.name} × {item.qty}</span>
                    <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="btn-primary w-full"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
