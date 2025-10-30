import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { getCart } from './api';

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();
  }, []);

  const updateCartCount = async () => {
    try {
      const data = await getCart();
      const count = data.cartItems.reduce((acc, item) => acc + item.qty, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">ShopHub</span>
              </Link>

              <nav className="flex items-center space-x-3 sm:space-x-6">
                <Link 
                  to="/" 
                  className="text-sm sm:text-base text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Products
                </Link>
                <Link 
                  to="/cart" 
                  className="relative flex items-center space-x-1 text-sm sm:text-base text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <span className="hidden sm:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Routes>
            <Route path="/" element={<Home onCartUpdate={updateCartCount} />} />
            <Route path="/cart" element={<Cart onCartUpdate={updateCartCount} cartCount={cartCount} />} />
            <Route path="/checkout" element={<Checkout onCartUpdate={updateCartCount} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">ShopHub</h3>
                <p className="text-gray-400 text-sm">
                  Your one-stop shop for quality products at great prices.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
                  <li><Link to="/cart" className="text-gray-400 hover:text-white transition-colors">Shopping Cart</Link></li>
                </ul>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Email: support@shophub.com<br />
                  Phone: +91 98765 43210
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
              <p className="text-xs sm:text-sm text-gray-400 mb-2">
                &copy; 2025 Virat Kumar. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-2">
                Made with <span className="text-red-500 text-base sm:text-lg animate-pulse">❤️</span> by <span className="font-semibold text-primary">VIRAT</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
