# Shopping Cart Web Application

A full-stack e-commerce shopping cart application built with Node.js, Express, MongoDB, React, and TailwindCSS.

## 🚀 Features

- **Product Listing**: Browse through a catalog of products with images, descriptions, and prices
- **Shopping Cart**: Add, update quantities, and remove items from cart
- **Real-time Cart Updates**: Cart count updates automatically across the app
- **Mock Checkout**: Complete orders with name and email validation
- **Order Receipt**: View detailed order confirmation with timestamp
- **Responsive Design**: Fully responsive UI for mobile, tablet, and desktop
- **Modern UI**: Clean interface with TailwindCSS and smooth animations
- **MongoDB Persistence**: All cart and product data persists in MongoDB
- **Fake Store API Integration**: Products automatically seeded from external API
- **Mock User System**: Cart operations linked to mock user ID for persistence
- **Comprehensive Error Handling**: User-friendly error messages and validation
- **Centralized Error Middleware**: Robust server-side error handling

## 📁 Project Structure

```
mock-ecom-cart/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── cartController.js   # Cart business logic
│   │   └── productController.js # Product business logic
│   ├── models/
│   │   ├── CartItem.js         # Cart item schema
│   │   └── Product.js          # Product schema
│   ├── routes/
│   │   ├── cart.js             # Cart API routes
│   │   └── products.js         # Product API routes
│   ├── .env.example            # Environment variables template
│   ├── package.json
│   └── server.js               # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItem.jsx       # Cart item component
│   │   │   ├── CheckoutModal.jsx  # Checkout modal with receipt
│   │   │   └── ProductCard.jsx    # Product card component
│   │   ├── pages/
│   │   │   ├── Cart.jsx           # Cart page
│   │   │   ├── Checkout.jsx       # Checkout page
│   │   │   └── Home.jsx           # Home/Products page
│   │   ├── api.js                 # Axios API client
│   │   ├── App.jsx                # Main app component
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # React entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **TailwindCSS** - Utility-first CSS framework

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## ⚙️ Installation

### 1. Clone or Navigate to Project

```bash
cd mock-ecom-cart
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/shopping-cart
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, use your connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopping-cart
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

Backend will run on `http://localhost:5000`

The server will automatically seed the database with 8 sample products on first run.

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

All API responses follow this format:
```json
{
  "success": true,
  "message": "Optional message",
  "data": { /* response data */ }
}
```

### Products
- `GET /api/products` - Get all products
  - Returns: `{ success: true, count: number, data: Product[] }`
- `GET /api/products/:id` - Get single product
  - Returns: `{ success: true, data: Product }`

### Cart
- `GET /api/cart` - Get cart items and total
  - Returns: `{ success: true, cartItems: CartItem[], total: string }`
- `POST /api/cart` - Add item to cart
  ```json
  { "productId": "...", "qty": 1 }
  ```
  - Returns: `{ success: true, message: string, data: CartItem }`
- `PUT /api/cart/:id` - Update cart item quantity
  ```json
  { "qty": 2 }
  ```
  - Returns: `{ success: true, message: string, data: CartItem }`
- `DELETE /api/cart/:id` - Remove item from cart
  - Returns: `{ success: true, message: string }`

### Checkout
- `POST /api/cart/checkout` - Complete checkout
  ```json
  {
    "cartItems": [...],
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
  - Returns: `{ success: true, message: string, data: Receipt }`

## 🎨 Design Features

- **Color Scheme**: Teal primary color with clean white backgrounds
- **Responsive Grid**: 1-4 columns based on screen size
- **Loading States**: Spinners during API requests
- **Hover Effects**: Smooth transitions on buttons and cards
- **Receipt Modal**: Glassmorphism design for order confirmation
- **Error Handling**: User-friendly error messages

## 🔄 User Flow

1. **Browse Products** - View product catalog on home page
2. **Add to Cart** - Click "Add to Cart" on desired products
3. **View Cart** - Navigate to cart to review items
4. **Adjust Quantities** - Update quantities or remove items
5. **Checkout** - Proceed to checkout and enter details
6. **Confirmation** - View order receipt with total and timestamp

## 🧪 Testing the App

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Add products to cart
4. View cart and modify quantities
5. Complete checkout with test data
6. Verify receipt shows correct information

## 📝 Notes

- **Mock User System**: The app uses a mock user ID (`mockUser123`) for cart management
- **Product Seeding**: Products are automatically fetched from Fake Store API and seeded on first backend startup
- **Data Persistence**: All cart items and products persist in MongoDB across server restarts
- **Cart Lifecycle**: Cart is automatically cleared after successful checkout
- **Error Handling**: All API endpoints include comprehensive validation and error messages
- **Response Format**: All API responses follow a consistent format with `success`, `message`, and `data` fields

## 🚧 Future Enhancements

- User authentication and registration
- Product search and filtering
- Payment gateway integration
- Order history
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for product management

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

**Happy Shopping! 🛒**
