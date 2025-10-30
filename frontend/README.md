# Shopping Cart Frontend

React + Vite + TailwindCSS frontend for the shopping cart application.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## 📦 Scripts

- `npm run dev` - Start development server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎨 UI Components

### Pages
- **Home** - Product grid with add to cart functionality
- **Cart** - Shopping cart with quantity controls
- **Checkout** - Checkout form and receipt modal

### Components
- **ProductCard** - Displays product with image, price, and add button
- **CartItem** - Cart item with quantity controls and remove button
- **CheckoutModal** - Two-step modal for checkout form and receipt

## 🔧 Configuration

### Vite
- Port: 5173
- Proxy: `/api` routes to `http://localhost:5000`

### TailwindCSS
- Primary color: Teal (`#14b8a6`)
- Custom utility classes in `index.css`

## 🌐 API Integration

All API calls are centralized in `src/api.js` using Axios.

Ensure backend server is running on port 5000.

## 📱 Responsive Design

- Mobile: Single column product grid
- Tablet: 2 columns
- Desktop: 3-4 columns

## 🎯 Key Features

- Real-time cart badge updates
- Loading spinners for async operations
- Error handling with user feedback
- Smooth transitions and hover effects
- Sticky navigation header
- Empty state designs

---

Built with ⚡ Vite and 💙 React
