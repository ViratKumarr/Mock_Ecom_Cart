# Testing Guide

## Testing the Upgraded Backend

### Prerequisites
- MongoDB running (local or Atlas)
- Node.js 18+ installed
- Backend and frontend dependencies installed

---

## 1. Test Product Seeding from Fake Store API

### Steps:
1. Clear your MongoDB products collection (optional, for fresh test):
   ```bash
   mongosh
   use shopping-cart
   db.products.deleteMany({})
   ```

2. Start the backend:
   ```bash
   cd backend
   npm start
   ```

3. **Expected Console Output**:
   ```
   MongoDB Connected: localhost
   📦 Fetching products from Fake Store API...
   ✅ Products seeded successfully from Fake Store API
   🚀 Server running on port 5000
   ```

4. Verify products in database:
   ```bash
   mongosh
   use shopping-cart
   db.products.find().count()  // Should return 10
   db.products.findOne()       // Check structure includes title, category, rating
   ```

5. **Expected Response**: 10 products with fields: `title`, `price`, `description`, `category`, `image`, `rating`

---

## 2. Test MongoDB Persistence (Cart Survives Restart)

### Steps:
1. Start frontend and backend
2. Add 3 products to cart via the UI
3. **Stop the backend server** (Ctrl+C)
4. **Restart the backend server**
5. Refresh the frontend
6. Check cart - **items should still be there**

### Verify in MongoDB:
```bash
mongosh
use shopping-cart
db.cartitems.find({ userId: "mockUser123" })
```

**Expected**: All cart items persisted with `userId: "mockUser123"`

---

## 3. Test Error Handling

### Test 3.1: Invalid Product ID
**Request**:
```bash
curl http://localhost:5000/api/products/invalid-id
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Invalid product ID format"
}
```

### Test 3.2: Add to Cart with Missing Fields
**Request**:
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"qty": 1}'
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Product ID and quantity are required"
}
```

### Test 3.3: Checkout with Invalid Email
**Request**:
```bash
curl -X POST http://localhost:5000/api/cart/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "cartItems": [{"name": "Test", "price": 10, "qty": 1}],
    "name": "John Doe",
    "email": "invalid-email"
  }'
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

### Test 3.4: 404 Route
**Request**:
```bash
curl http://localhost:5000/api/nonexistent
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Route /api/nonexistent not found"
}
```

---

## 4. Test Mock User System

### Steps:
1. Add products to cart from frontend
2. Check MongoDB:
   ```bash
   db.cartitems.find({ userId: "mockUser123" })
   ```
3. **Expected**: All cart items have `userId: "mockUser123"`

### Test Duplicate Product Addition:
1. Add Product A to cart (qty: 1)
2. Add Product A again (qty: 1)
3. Check cart - **Product A should have qty: 2** (not two separate items)

---

## 5. Test API Response Format

### Test GET Products
**Request**:
```bash
curl http://localhost:5000/api/products
```

**Expected Response Structure**:
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "Product Name",
      "price": 19.99,
      "description": "...",
      "category": "...",
      "image": "...",
      "rating": {
        "rate": 4.5,
        "count": 120
      }
    }
  ]
}
```

### Test GET Cart
**Request**:
```bash
curl http://localhost:5000/api/cart
```

**Expected Response Structure**:
```json
{
  "success": true,
  "cartItems": [...],
  "total": "99.99"
}
```

---

## 6. Test Complete User Flow

### End-to-End Test:
1. **Start Fresh**:
   - Clear cart in MongoDB: `db.cartitems.deleteMany({ userId: "mockUser123" })`
   - Restart servers

2. **Browse Products**:
   - Open http://localhost:5173
   - Verify 10 products from Fake Store API display

3. **Add to Cart**:
   - Add 3 different products
   - Add same product twice
   - Verify cart badge shows correct count

4. **View Cart**:
   - Navigate to cart page
   - Verify all items present
   - Update quantity using +/- buttons
   - Remove one item

5. **Checkout**:
   - Click "Proceed to Checkout"
   - Enter name and email
   - Submit order
   - Verify receipt displays

6. **Verify Cart Cleared**:
   - After checkout, cart should be empty
   - Check MongoDB: `db.cartitems.find({ userId: "mockUser123" }).count()` → 0

7. **Test Persistence**:
   - Add new items to cart
   - Restart backend
   - Refresh frontend
   - Cart items should still be present

---

## 7. Error Scenarios to Test

### Frontend Error Handling:
- [ ] Try to checkout with empty cart
- [ ] Add item with network offline
- [ ] Remove item that was already removed
- [ ] Submit checkout with invalid email format

### Expected Behavior:
- User-friendly error messages displayed
- No crashes or white screens
- Proper error logging in console

---

## 8. Performance Tests

### Database Queries:
1. Check query performance:
   ```bash
   db.cartitems.find({ userId: "mockUser123" }).explain("executionStats")
   ```

2. Verify indexes exist:
   ```bash
   db.cartitems.getIndexes()
   ```

---

## ✅ Success Criteria

- [x] Products seed automatically from Fake Store API
- [x] Cart persists across server restarts
- [x] All error scenarios return proper messages
- [x] Frontend displays products and cart correctly
- [x] Checkout flow works end-to-end
- [x] Mock user system isolates cart data
- [x] No console errors or warnings
- [x] API responses follow consistent format

---

## 🐛 Debugging Tips

### If products don't seed:
- Check MongoDB connection
- Verify internet connection (Fake Store API)
- Check console for error messages
- Manually test: `curl https://fakestoreapi.com/products?limit=10`

### If cart doesn't persist:
- Verify MongoDB is running
- Check `userId` in cart items: `db.cartitems.find()`
- Ensure all items have `userId: "mockUser123"`

### If errors occur:
- Check backend console for detailed error logs
- Verify MongoDB connection string in `.env`
- Ensure Node.js version 18+ for native fetch support

---

**Happy Testing! 🚀**
