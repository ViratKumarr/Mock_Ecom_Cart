import { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await onAddToCart(product._id);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card overflow-hidden group">
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img 
          src={product.image} 
          alt={product.title || product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <button 
            onClick={handleAddToCart}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
