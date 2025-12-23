# API Contracts & Integration Guide
**Restaurant Website: दिल्ली तंदूरी मोमो (Delhi Tandoori Momo)**

---

## 📋 Current Frontend Implementation (Mock Data)

### Mock Data Location: `/app/frontend/src/mock.js`

**Mock Data Includes:**
- Restaurant information (name, address, phone, timings, ratings)
- Menu categories (4 categories: Tandoori, Afghani, Chilli, Steamed)
- Menu items (12+ items with prices, descriptions, images)
- Customer reviews (4 reviews)
- Gallery images (8 images)
- Features/highlights

### Current Frontend Features Working:
1. ✅ Cart system (localStorage-based)
2. ✅ Add/remove items from cart
3. ✅ Quantity management
4. ✅ WhatsApp ordering integration
5. ✅ Mock checkout flow (3 steps: Details → Payment → Confirmation)
6. ✅ Contact form (mock submission)
7. ✅ All UI components and navigation

---

## 🔄 Backend Integration Plan

### Database Schema (MongoDB)

#### 1. **Menu Items Collection** (`menu_items`)
```javascript
{
  _id: ObjectId,
  item_id: Number,
  name: String,
  description: String,
  price: Number,
  category: String, // "Tandoori", "Afghani", "Chilli", "Steamed"
  image: String,
  is_veg: Boolean,
  is_available: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### 2. **Orders Collection** (`orders`)
```javascript
{
  _id: ObjectId,
  order_id: String, // unique order ID
  customer_name: String,
  customer_phone: String,
  customer_email: String,
  delivery_address: String,
  delivery_type: String, // "delivery" or "pickup"
  items: [
    {
      item_id: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  subtotal: Number,
  delivery_charge: Number,
  total: Number,
  payment_method: String, // "razorpay", "phonepe", "cod"
  payment_status: String, // "pending", "completed", "failed"
  order_status: String, // "pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"
  created_at: DateTime,
  updated_at: DateTime
}
```

#### 3. **Reviews Collection** (`reviews`)
```javascript
{
  _id: ObjectId,
  name: String,
  rating: Number, // 1-5
  review: String,
  avatar: String,
  date: DateTime,
  is_approved: Boolean,
  created_at: DateTime
}
```

#### 4. **Contact Messages Collection** (`contact_messages`)
```javascript
{
  _id: ObjectId,
  name: String,
  phone: String,
  email: String,
  message: String,
  is_read: Boolean,
  created_at: DateTime
}
```

---

## 🛠 API Endpoints to Implement

### Menu APIs

**GET `/api/menu/categories`**
- Returns all menu categories with items
- Response mirrors current `menuCategories` structure from mock.js

**GET `/api/menu/items`**
- Returns all available menu items
- Query params: `category` (optional)

**GET `/api/menu/item/:id`**
- Returns single item details

---

### Order APIs

**POST `/api/orders`**
- Create new order
- Request body:
  ```json
  {
    "customer_name": "string",
    "customer_phone": "string",
    "customer_email": "string",
    "delivery_address": "string",
    "delivery_type": "delivery|pickup",
    "items": [{"item_id": number, "quantity": number}],
    "payment_method": "razorpay|phonepe|cod"
  }
  ```
- Response: Order object with `order_id`

**GET `/api/orders/:order_id`**
- Get order details by order_id

**GET `/api/orders`**
- Get all orders (admin functionality for future)
- Query params: `status`, `limit`, `offset`

---

### Review APIs

**GET `/api/reviews`**
- Returns approved reviews
- Query params: `limit` (default: 10)

**POST `/api/reviews`**
- Submit new review
- Request body:
  ```json
  {
    "name": "string",
    "rating": number,
    "review": "string"
  }
  ```

---

### Contact APIs

**POST `/api/contact`**
- Submit contact form
- Request body:
  ```json
  {
    "name": "string",
    "phone": "string",
    "email": "string",
    "message": "string"
  }
  ```

**GET `/api/contact/messages`**
- Get all contact messages (admin functionality)

---

### Restaurant Info API

**GET `/api/restaurant/info`**
- Returns restaurant details (name, address, phone, timings, etc.)
- Can be cached on frontend

---

## 🔌 Frontend Integration Steps

### 1. Create API Service Layer
**File: `/app/frontend/src/services/api.js`**
- Centralized axios instance with baseURL
- Error handling wrapper
- All API calls in one place

### 2. Replace Mock Data
**Files to Update:**
- `Menu.js` → Fetch from `/api/menu/categories`
- `Reviews.js` → Fetch from `/api/reviews`
- `Contact.js` → POST to `/api/contact`
- `Checkout.js` → POST to `/api/orders`

### 3. Add Loading States
- Skeleton loaders for menu items
- Loading spinners for form submissions
- Error handling with user-friendly messages

### 4. Payment Gateway Integration
**Razorpay Integration:**
- Add Razorpay script in `public/index.html`
- Create payment handler in Checkout component
- Mock payment for now (will be real when API keys provided)

**PhonePe Integration:**
- Implement PhonePe payment flow
- Mock payment for now (will be real when API keys provided)

---

## ✅ Mock to Real Data Mapping

| Component | Mock Source | Backend API | Status |
|-----------|------------|-------------|--------|
| Menu Items | `mock.js → menuCategories` | `GET /api/menu/categories` | 🔄 To Implement |
| Reviews | `mock.js → reviews` | `GET /api/reviews` | 🔄 To Implement |
| Restaurant Info | `mock.js → restaurantInfo` | `GET /api/restaurant/info` | 🔄 To Implement |
| Gallery | `mock.js → gallery` | Static (can stay mock) | ✅ OK |
| Cart | localStorage | Backend (optional) | ✅ OK (localStorage sufficient) |
| Orders | Mock submission | `POST /api/orders` | 🔄 To Implement |
| Contact | Mock submission | `POST /api/contact` | 🔄 To Implement |

---

## 🔐 Environment Variables Needed

**Backend (`.env`):**
```
MONGO_URL=<already configured>
DB_NAME=restaurant_db
RAZORPAY_KEY_ID=<to be provided by user>
RAZORPAY_KEY_SECRET=<to be provided by user>
PHONEPE_MERCHANT_ID=<to be provided by user>
PHONEPE_SALT_KEY=<to be provided by user>
```

**Frontend (`.env`):**
```
REACT_APP_BACKEND_URL=<already configured>
REACT_APP_RAZORPAY_KEY_ID=<to be provided by user>
```

---

## 📝 Implementation Priority

1. **High Priority:**
   - Menu APIs (GET categories, items)
   - Order creation API (POST /api/orders)
   - Contact form API (POST /api/contact)

2. **Medium Priority:**
   - Review submission API
   - Order status tracking

3. **Low Priority (Future):**
   - Admin dashboard for order management
   - Admin panel for menu management
   - Real-time order status updates

---

## 🚀 Next Steps

1. Seed database with menu items from mock.js
2. Implement priority APIs
3. Update frontend components to use real APIs
4. Test full flow: Browse → Add to Cart → Checkout → Order Confirmation
5. Integrate payment gateways when keys are provided

---

**Note:** Currently all payment processing is mocked. WhatsApp ordering works immediately as it doesn't require backend integration.