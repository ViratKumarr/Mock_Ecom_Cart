# 🛍️ Mock E-Com Cart — Frontend

A modern and responsive e-commerce shopping cart frontend built with **React 18**, **Vite**, **TailwindCSS**, and **Axios**.  
This frontend interacts with the backend REST API (Node.js + Express + MongoDB) to deliver a seamless shopping experience.

---

## 🚀 Features

- **Product Listing** — Fetches products from backend or Fake Store API  
- **Add to Cart / Remove from Cart** — Smooth cart interactions with live updates  
- **Persistent Cart** — Cart data linked to a mock user and stored in MongoDB  
- **Checkout Modal** — Mock checkout with receipt generation  
- **Responsive Design** — Optimized for mobile, tablet, and desktop  
- **TailwindCSS UI** — Clean, minimal, and animated interface  
- **Error Handling** — Graceful fallback UI for API or network errors  

---

## 🧩 Tech Stack

- ⚛️ **React 18** — Component-based UI  
- ⚡ **Vite** — Blazing-fast build tool  
- 🎨 **TailwindCSS** — Utility-first CSS framework  
- 🔄 **Axios** — For REST API communication  
- 🧭 **React Router DOM** — Client-side navigation  

---

## 📁 Folder Structure

frontend/
├── src/
│ ├── api.js # Axios API client
│ ├── App.jsx # Main app component
│ ├── main.jsx # React entry point
│ ├── index.css # Global styles
│ ├── components/
│ │ ├── ProductCard.jsx # Product display card
│ │ ├── CartItem.jsx # Cart item UI
│ │ └── CheckoutModal.jsx # Checkout modal
│ └── pages/
│ ├── Home.jsx # Product list page
│ ├── Cart.jsx # Cart page
│ └── Checkout.jsx # Mock checkout page
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js

---

## ⚙️ Setup & Installation

### 1️⃣ Navigate to the frontend folder
```bash
cd frontend

