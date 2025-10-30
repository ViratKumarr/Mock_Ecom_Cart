import { useState } from 'react';

const CartItem = ({ item, onUpdate, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    setLoading(true);
    try {
      await onUpdate(item._id, newQty);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      await onRemove(item._id);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 flex flex-col sm:flex-row gap-4">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-full sm:w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
        <p className="text-primary font-bold text-xl mt-1">${item.price}</p>
      </div>
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(item.qty - 1)}
            disabled={loading || item.qty <= 1}
            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            −
          </button>
          <span className="px-4 py-1 font-semibold">{item.qty}</span>
          <button
            onClick={() => handleQuantityChange(item.qty + 1)}
            disabled={loading}
            className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${(item.price * item.qty).toFixed(2)}
          </span>
          <button
            onClick={handleRemove}
            disabled={loading}
            className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
