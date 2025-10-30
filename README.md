<p align="left">
  © 2025 Virat Kumar | Built with ❤️ using React.js, Node.js, Express & MongoDB by Virat
</p>

<div align="center">
  <h2>🛒 Mock E-Commerce Cart</h2>
  <p>
    A fully functional full-stack <strong>shopping cart application</strong> built using <strong>React.js, Node.js, Express, and MongoDB</strong> for the <em>Full Stack Internship Assignment</em> at <strong>Nexora</strong>.
  </p>

  ![image alt](https://github.com/ViratKumarr/Mock_Ecom_Cart/blob/main/assets/mock-cart-banner.png)
</div>

---

## 📌 Project Overview

**Mock_Ecom_Cart** is a **MERN-stack shopping application** featuring real-time cart updates, product listings, mock checkout functionality, and MongoDB persistence.  
It showcases a clean, responsive UI powered by **React + TailwindCSS** and a secure, modular **Express.js + MongoDB** backend.

---

## ✨ Highlights & Features

### 🧩 Core Features
- 🛍️ **Product Listing** – Browse products fetched from an API  
- 🛒 **Add to Cart / Remove / Update Quantity**  
- ⚡ **Real-Time Cart Sync** – Dynamic cart total and item count  
- 💳 **Mock Checkout** – Name & email validation, receipt generation  
- 📦 **Persistent Cart Data** – Stored in MongoDB  
- 🧱 **Clean Folder Structure** – Modular controllers, routes, and models  
- 🌗 **Responsive UI** – Optimized for desktop, tablet, and mobile  

---

### ⚙️ Stack Overview

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js + TailwindCSS + Axios |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (via Mongoose) |
| **API** | RESTful endpoints for products & cart |
| **Environment** | `.env` variables for configuration |

---

### 📊 Folder Structure

mock-ecom-cart/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── package.json
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api.js
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ ├── tailwind.config.js
│ └── vite.config.js
│
└── README.md

---

## 🧠 API Endpoints

| Type | Endpoint | Description |
|------|-----------|-------------|
| **Products** | `GET /api/products` | Fetch all products |
| **Cart** | `GET /api/cart`, `POST /api/cart`, `DELETE /api/cart/:id`, `PUT /api/cart/:id` | Manage cart items |
| **Health Check** | `GET /api/health` | Confirm API status |

---

## 🧰 Environment Variables

Create a `.env` file inside your `backend/` folder:

```env
MONGO_URI=mongodb://localhost:27017/shopping-cart
PORT=5000
NODE_ENV=development
```

🚀 Getting Started
Prerequisites

Ensure you have installed:

Node.js v18+

MongoDB (Local or Atlas)

npm or yarn

Setup Instructions

# Clone the repository
git clone https://github.com/ViratKumarr/Mock_Ecom_Cart.git
cd Mock_Ecom_Cart

🧩 Backend Setup
cd backend
npm install
npm run dev

🎨 Frontend Setup
cd ../frontend
npm install
npm run dev

📸 Screenshots:

🏠 Product Listing
![image alt](https://github.com/ViratKumarr/Mock_Ecom_Cart/blob/main/assets/mock-cart-banner.png)

🛒 Cart Page
![image alt](https://github.com/ViratKumarr/Mock_Ecom_Cart/blob/main/assets/mock-cart-banner.png)

💳 Checkout Page
![image alt](https://github.com/ViratKumarr/Mock_Ecom_Cart/blob/main/assets/mock-cart-banner.png)

🧑‍💻 Developer Notes:
Modular and scalable project architecture

Centralized error middleware

Uses modern ES6+ syntax

Follows RESTful best practices

🧠 Future Enhancements:
🔐 JWT Authentication & User Login

📦 Order History Tracking

💬 Product Reviews System

📱 PWA Support for offline use

📜 License:
This project is licensed under the MIT License.

<p align="center"> © 2025 Virat Kumar | Made with ❤️ by <strong>Virat</strong><br/> <a href="https://virat-portfolio-personal.vercel.app">Portfolio</a> • <a href="https://github.com/ViratKumarr">GitHub</a> • <a href="https://www.linkedin.com/in/viratkumar04/">LinkedIn</a> </p> ```

